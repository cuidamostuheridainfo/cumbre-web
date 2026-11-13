-- Pruebas de la migración 001 (Cumbre 2027). Cada prueba imprime OK o FALLA.
\set ON_ERROR_STOP 0
set client_min_messages = notice;

create or replace function pg_temp.debe_fallar(nombre text, sql text) returns void language plpgsql as $$
begin
  execute sql;
  raise notice 'FALLA  % (se esperaba un error y no lo hubo)', nombre;
exception when others then
  raise notice 'OK     % → %', nombre, sqlerrm;
end $$;
create or replace function pg_temp.debe_pasar(nombre text, sql text) returns void language plpgsql as $$
begin
  execute sql;
  raise notice 'OK     %', nombre;
exception when others then
  raise notice 'FALLA  % → %', nombre, sqlerrm;
end $$;
create or replace function pg_temp.igual(nombre text, obtenido bigint, esperado bigint) returns void language plpgsql as $$
begin
  if obtenido is not distinct from esperado then raise notice 'OK     % (= %)', nombre, obtenido;
  else raise notice 'FALLA  % (obtuve %, esperaba %)', nombre, obtenido, esperado; end if;
end $$;
grant execute on all functions in schema pg_temp to public;

-- Usuarios de prueba en auth
insert into auth.users values
 ('00000000-0000-0000-0000-00000000000a','admin@prueba.test'),
 ('00000000-0000-0000-0000-00000000000b','puerta@prueba.test'),
 ('00000000-0000-0000-0000-00000000000c','admin-inactivo@prueba.test');

-- ================= Como service_role (las funciones del servidor) =================
set role service_role;
select pg_temp.debe_pasar('staff: crear admin, puerta y admin inactivo', $q$
 insert into public.staff (user_id,nombre,rol,activo) values
  ('00000000-0000-0000-0000-00000000000a','Admin Prueba','admin',true),
  ('00000000-0000-0000-0000-00000000000b','Puesto Prueba','puerta',true),
  ('00000000-0000-0000-0000-00000000000c','Admin Inactivo','admin',false) $q$);
reset role; insert into auth.users values ('00000000-0000-0000-0000-00000000000d','otro@prueba.test'); set role service_role;
select pg_temp.debe_fallar('staff: rol inexistente (pagos)', $q$ insert into public.staff (user_id,nombre,rol) values ('00000000-0000-0000-0000-00000000000d','Nombre Valido','pagos') $q$);

select pg_temp.debe_pasar('inscritos: inscripción web válida (gratuita)', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version,idempotency_key)
 values ('Ana','Rivas','V','12345678','ana@prueba.test','+584121234567','enfermeria','Enfermería','Hospital X','Caracas','dia-1','web',now(),'2026-11-13','k1') $q$);
select pg_temp.igual('inscritos: código generado con formato correcto',
  (select count(*) from public.inscritos where codigo ~ '^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$'), 1);
select pg_temp.igual('inscritos: mailchimp queda pendiente', (select count(*) from public.inscritos where mailchimp_estado='pendiente'), 1);
select pg_temp.debe_fallar('inscritos: misma cédula otra vez', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Otra','Persona','V','12345678','otra@prueba.test','+584121234568','enfermeria','Enfermería','H','Caracas','dia-1','web',now(),'2026-11-13') $q$);
select pg_temp.debe_pasar('inscritos: mismo correo con otra cédula (permitido)', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Luis','Rivas','V','87654321','ana@prueba.test','+584121234569','especialista','Dermatología','Clínica Y','Valencia','dias-2-3','web',now(),'2026-11-13') $q$);
select pg_temp.debe_pasar('inscritos: misma cifra con E es otra cédula', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Eva','Paz','E','12345678','eva@prueba.test','+584121234570','otras','Nutrición','U','Maracay','dias-2-3','web',now(),'2026-11-13') $q$);
select pg_temp.debe_fallar('inscritos: tipo de documento P (pasaporte)', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Pe','Pa','P','11111111','p@prueba.test','+584121234571','especialista','X','Y','Z','dias-2-3','web',now(),'v') $q$);
select pg_temp.debe_fallar('inscritos: cédula con puntos', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Pe','Pa','V','12.345.679','p@prueba.test','+584121234571','especialista','X','Y','Z','dias-2-3','web',now(),'v') $q$);
select pg_temp.debe_fallar('inscritos: correo con mayúsculas', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Pe','Pa','V','22222222','Pe@Prueba.test','+584121234571','especialista','X','Y','Z','dias-2-3','web',now(),'v') $q$);
select pg_temp.debe_fallar('inscritos: WhatsApp sin +', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Pe','Pa','V','22222222','pe@prueba.test','04121234571','especialista','X','Y','Z','dias-2-3','web',now(),'v') $q$);
select pg_temp.debe_fallar('inscritos: web sin aceptar privacidad', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen)
 values ('Pe','Pa','V','22222222','pe@prueba.test','+584121234571','especialista','X','Y','Z','dias-2-3','web') $q$);
select pg_temp.debe_fallar('inscritos: web sin ciudad', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Pe','Pa','V','22222222','pe@prueba.test','+584121234571','especialista','X','Y','dias-2-3','web',now(),'v') $q$);
select pg_temp.debe_fallar('inscritos: pase de tres días desde la web', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Pe','Pa','V','22222222','pe@prueba.test','+584121234571','especialista','X','Y','Z','tres-dias','web',now(),'v') $q$);
select pg_temp.debe_fallar('inscritos: kit sin estado de pago', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,modalidad,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('Pe','Pa','V','22222222','pe@prueba.test','+584121234571','especialista','X','Y','Z','dias-2-3','kit','web',now(),'v') $q$);
select pg_temp.debe_fallar('inscritos: panel sin autor', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,pase,origen)
 values ('Vip','Uno','V','33333333','vip@prueba.test','+584121234572','interno','tres-dias','panel') $q$);
select pg_temp.debe_pasar('inscritos: pase de tres días desde el panel', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,pase,origen,creado_por)
 values ('Vip','Uno','V','33333333','vip@prueba.test','+584121234572','interno','tres-dias','panel','00000000-0000-0000-0000-00000000000a') $q$);
select pg_temp.debe_fallar('inscritos: misma idempotency_key (doble envío)', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version,idempotency_key)
 values ('Pe','Pa','V','44444444','pe@prueba.test','+584121234571','especialista','X','Y','Z','dias-2-3','web',now(),'v','k1') $q$);
select pg_temp.debe_fallar('inscritos: código con letra O', $q$
 insert into public.inscritos (codigo,nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('OOOO-2222-3333','Pe','Pa','V','55555555','pe@prueba.test','+584121234571','especialista','X','Y','Z','dias-2-3','web',now(),'v') $q$);

select pg_temp.debe_pasar('charlas: crear D1-01 y D2-07 (clave automática)', $q$
 insert into public.charlas (id,dia,titulo,inicio,fin) values
  ('D1-01',1,'Charla de prueba 1','2027-05-12 08:00-04','2027-05-12 08:45-04'),
  ('D2-07',2,'Charla de prueba 2','2027-05-13 10:00-04','2027-05-13 10:45-04') $q$);
select pg_temp.igual('charlas: clave de 16 caracteres', (select count(*) from public.charlas where clave ~ '^[0-9a-f]{16}$'), 2);
select pg_temp.debe_fallar('charlas: id D2 con día 1', $q$ insert into public.charlas (id,dia,titulo,inicio,fin) values ('D2-01',1,'x','2027-05-12 08:00-04','2027-05-12 09:00-04') $q$);
select pg_temp.debe_fallar('charlas: fin antes del inicio', $q$ insert into public.charlas (id,dia,titulo,inicio,fin) values ('D1-02',1,'x','2027-05-12 09:00-04','2027-05-12 08:00-04') $q$);

select pg_temp.debe_pasar('asistencias: registrar una', $q$
 insert into public.asistencias (inscrito_id,charla_id,escaneado_en) select id,'D1-01',now() from public.inscritos where cedula_numero='12345678' and cedula_tipo='V' $q$);
select pg_temp.debe_fallar('asistencias: la misma charla dos veces', $q$
 insert into public.asistencias (inscrito_id,charla_id,escaneado_en) select id,'D1-01',now() from public.inscritos where cedula_numero='12345678' and cedula_tipo='V' $q$);

select pg_temp.debe_pasar('puerta: registrar entrada', $q$
 insert into public.registros_puerta (id,inscrito_id,codigo_leido,tipo,dia,puesto,staff_id,registrado_en)
 select '11111111-1111-1111-1111-111111111111',id,codigo,'entrada',1,'Puesto 1','00000000-0000-0000-0000-00000000000b',now() from public.inscritos where cedula_numero='12345678' and cedula_tipo='V' $q$);
select pg_temp.debe_fallar('puerta: subir el mismo registro dos veces', $q$
 insert into public.registros_puerta (id,codigo_leido,tipo,dia,puesto,staff_id,registrado_en)
 values ('11111111-1111-1111-1111-111111111111','X','entrada',1,'Puesto 1','00000000-0000-0000-0000-00000000000b',now()) $q$);
select pg_temp.debe_fallar('puerta: mesa de soluciones sin motivo', $q$
 insert into public.registros_puerta (id,codigo_leido,tipo,dia,puesto,staff_id,registrado_en)
 values (gen_random_uuid(),'ZZZZ-ZZZZ-ZZZZ','incidencia',1,'Mesa de soluciones 1','00000000-0000-0000-0000-00000000000b',now()) $q$);
select pg_temp.debe_pasar('puerta: "No está en la lista" con motivo y búsqueda manual', $q$
 insert into public.registros_puerta (id,codigo_leido,tipo,motivo,manual,dia,puesto,staff_id,registrado_en)
 values (gen_random_uuid(),'V-99999999','incidencia','No está en la lista',true,1,'Mesa de soluciones 1','00000000-0000-0000-0000-00000000000b',now()) $q$);

select pg_temp.debe_pasar('certificados: emitir dos', $q$
 insert into public.certificados (inscrito_id,tipo) select id,case when pase='dia-1' then 'dia-1' else 'dias-2-3' end from public.inscritos where origen='web' and cedula_numero in ('12345678','87654321') and cedula_tipo='V' $q$);
select pg_temp.igual('certificados: folios C27-00001 y C27-00002', (select count(*) from public.certificados where folio in ('C27-00001','C27-00002')), 2);
select pg_temp.debe_fallar('certificados: segundo del mismo tipo', $q$
 insert into public.certificados (inscrito_id,tipo) select id,'dia-1' from public.inscritos where cedula_numero='12345678' and cedula_tipo='V' $q$);

select pg_temp.debe_pasar('patrocinio: solicitud desde el plano (stand 45)', $q$
 insert into public.solicitudes_patrocinio (contacto_nombre,contacto_empresa,contacto_correo,contacto_telefono,opcion_patrocinio,stand,notas,origen_lead_detalle)
 values ('Marta Gómez','Laboratorio Prueba','marta@prueba.test','+584141234567','stand','45','Me interesa el stand 45 del plano.','plano') $q$);
select pg_temp.debe_fallar('patrocinio: stand con opción "mesa"', $q$
 insert into public.solicitudes_patrocinio (contacto_nombre,contacto_empresa,contacto_correo,opcion_patrocinio,stand) values ('Mm','E','m@prueba.test','mesa','12') $q$);
select pg_temp.debe_fallar('patrocinio: opción inexistente', $q$
 insert into public.solicitudes_patrocinio (contacto_nombre,contacto_empresa,contacto_correo,opcion_patrocinio) values ('Mm','E','m@prueba.test','coffee_break') $q$);
reset role;

-- ================= Como visitante anónimo (la página pública) =================
set role anon; set request.jwt.claims = '{"role":"anon"}';
select pg_temp.debe_fallar('anon: leer inscritos', 'select * from public.inscritos');
select pg_temp.debe_fallar('anon: inscribirse directo en la tabla', $q$
 insert into public.inscritos (nombre,apellido,cedula_tipo,cedula_numero,correo,whatsapp,perfil,especialidad,institucion,ciudad,pase,origen,consentimiento_aceptado_en,consentimiento_version)
 values ('A','B','V','66666666','a@prueba.test','+584121234573','especialista','X','Y','Z','dias-2-3','web',now(),'v') $q$);
select pg_temp.debe_fallar('anon: leer solicitudes de patrocinio', 'select * from public.solicitudes_patrocinio');
select pg_temp.debe_fallar('anon: leer claves de charlas', 'select clave from public.charlas');
select pg_temp.debe_fallar('anon: leer staff', 'select * from public.staff');
select pg_temp.debe_fallar('anon: generar códigos', 'select public.generar_codigo_pase()');
reset role;

-- ================= Staff de puerta (sesión normal) =================
set role authenticated; set request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000b","role":"authenticated","aal":"aal1"}';
select pg_temp.igual('puerta: no ve inscritos directo', (select count(*) from public.inscritos), 0);
select pg_temp.igual('puerta: no ve charlas', (select count(*) from public.charlas), 0);
select pg_temp.igual('puerta: ve solo su propia fila de staff', (select count(*) from public.staff), 1);
select pg_temp.debe_fallar('puerta: escribir un registro directo', $q$
 insert into public.registros_puerta (id,codigo_leido,tipo,dia,puesto,staff_id,registrado_en) values (gen_random_uuid(),'X','entrada',1,'P','00000000-0000-0000-0000-00000000000b',now()) $q$);
select pg_temp.debe_fallar('puerta: hacerse admin', $q$ update public.staff set rol='admin' where user_id=auth.uid() $q$);
reset role;

-- ================= Administración SIN segundo factor =================
set role authenticated; set request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated","aal":"aal1"}';
select pg_temp.igual('admin sin segundo factor: no ve inscritos', (select count(*) from public.inscritos), 0);
reset role;

-- ================= Administración inactiva con segundo factor =================
set role authenticated; set request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000c","role":"authenticated","aal":"aal2"}';
select pg_temp.igual('admin inactivo: no ve inscritos', (select count(*) from public.inscritos), 0);
reset role;

-- ================= Administración con segundo factor =================
set role authenticated; set request.jwt.claims = '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated","aal":"aal2"}';
select pg_temp.igual('admin: ve todos los inscritos', (select count(*) from public.inscritos), 4);
select pg_temp.igual('admin: ve las solicitudes', (select count(*) from public.solicitudes_patrocinio), 1);
select pg_temp.igual('admin: ve a todo el staff', (select count(*) from public.staff), 3);
select pg_temp.debe_pasar('admin: corregir correo mal escrito y reenviar', $q$
 update public.inscritos set correo='ana.rivas@prueba.test', mailchimp_estado='pendiente' where cedula_tipo='V' and cedula_numero='12345678' $q$);
select pg_temp.igual('admin: el correo quedó corregido', (select count(*) from public.inscritos where correo='ana.rivas@prueba.test'), 1);
select pg_temp.debe_fallar('admin: cambiar la cédula', $q$ update public.inscritos set cedula_numero='99999998' where correo='ana.rivas@prueba.test' $q$);
select pg_temp.debe_fallar('admin: cambiar el código', $q$ update public.inscritos set codigo='AAAA-BBBB-CCCC' where correo='ana.rivas@prueba.test' $q$);
select pg_temp.debe_fallar('admin: cambiar el pase', $q$ update public.inscritos set pase='tres-dias' where correo='ana.rivas@prueba.test' $q$);
select pg_temp.debe_fallar('admin: borrar un inscrito', $q$ delete from public.inscritos where correo='ana.rivas@prueba.test' $q$);
select pg_temp.debe_pasar('admin: marcar solicitud como contactada', $q$ update public.solicitudes_patrocinio set estado_seguimiento='contactado' $q$);
select pg_temp.debe_fallar('admin: estado de seguimiento inválido', $q$ update public.solicitudes_patrocinio set estado_seguimiento='ganado' $q$);
select pg_temp.debe_fallar('admin: emitir certificado directo', $q$ insert into public.certificados (inscrito_id,tipo) select id,'dia-1' from public.inscritos limit 1 $q$);
select pg_temp.debe_fallar('admin: cambiar la configuración directo', $q$ update public.configuracion set valor='3' where clave='minimo_charlas_por_dia' $q$);
reset role;

select pg_temp.igual('actualizado_en se movió con la corrección del admin',
  (select count(*) from public.inscritos where correo='ana.rivas@prueba.test' and actualizado_en > creado_en), 1);

-- Generador de códigos: 50.000 seguidos, sin repetidos, solo el alfabeto, reparto parejo
create temp table codigos as select public.generar_codigo_pase() c from generate_series(1,50000);
select pg_temp.igual('códigos: 50.000 sin repetidos', (select count(distinct c) from codigos), 50000);
select pg_temp.igual('códigos: todos con el formato', (select count(*) from codigos where c ~ '^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$'), 50000);
select pg_temp.igual('códigos: usan los 32 caracteres', (select count(distinct ch) from codigos, regexp_split_to_table(replace(c,'-',''),'') ch), 32);
select pg_temp.igual('códigos: ningún carácter se aleja más de 5% del promedio',
  (select count(*) from (select ch, count(*) n from codigos, regexp_split_to_table(replace(c,'-',''),'') ch group by ch) t
   where abs(n - 600000/32.0)/(600000/32.0) > 0.05), 0);
