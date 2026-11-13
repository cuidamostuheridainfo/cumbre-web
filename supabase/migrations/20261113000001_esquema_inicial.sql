-- =====================================================================================
-- Cumbre 2027 · Proyecto Supabase "cumbre" · Migración 001: esquema inicial (fase 2)
-- Fecha: 13 nov 2026. Diseño y decisiones: docs/FASE2-BASE-DE-DATOS.md
--
-- Qué crea: configuracion, staff, inscritos, charlas, asistencias, registros_puerta,
--           certificados, solicitudes_patrocinio, con seguridad por filas (RLS) en todas.
-- Qué NO crea todavía: pagos y comprobantes del kit (cuando se lance el kit) ni talleres.
--
-- Reglas de acceso:
--   · Visitantes anónimos (la página pública): ningún acceso a ninguna tabla.
--   · Las funciones del servidor (Edge Functions, con la llave service_role) son las únicas que escriben
--     inscripciones, asistencias, registros de puerta, certificados y solicitudes.
--   · Staff de puerta: sin acceso directo; trabaja solo a través de sus funciones.
--   · Administración: lee todo y corrige datos de contacto, SOLO con sesión de segundo factor (aal2).
--
-- Reversión: supabase/reversiones/20261113000001_esquema_inicial.ROLLBACK.sql
-- =====================================================================================

begin;

-- -------------------------------------------------------------------------------------
-- Utilidades
-- -------------------------------------------------------------------------------------

-- Fecha de última modificación, automática.
create or replace function public.tocar_actualizado_en()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.actualizado_en := now();
  return new;
end;
$$;

-- Código del pase: 12 caracteres de un alfabeto de 32 (sin O, 0, I ni 1), en grupos de 4: K7QM-3XRP-9TWA.
-- Mismo alfabeto que assets/js/acred-comun.js. Usa el generador aleatorio seguro de gen_random_uuid():
-- se toman 12 bytes del UUID evitando el byte 6 (lleva la versión fija). 256 es múltiplo de 32,
-- así que cada carácter es uniforme. Si choca con uno existente, la restricción UNIQUE lo rechaza
-- y la función que inscribe vuelve a intentar.
create or replace function public.generar_codigo_pase()
returns text
language plpgsql
volatile
set search_path = ''
as $$
declare
  alfabeto constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  b bytea := decode(replace(gen_random_uuid()::text, '-', ''), 'hex');
  posiciones constant int[] := array[0,1,2,3,4,5,7,8,9,10,11,12];
  s text := '';
  i int;
begin
  for i in 1..12 loop
    s := s || substr(alfabeto, (get_byte(b, posiciones[i]) % 32) + 1, 1);
    if i in (4, 8) then s := s || '-'; end if;
  end loop;
  return s;
end;
$$;

-- Clave secreta de una charla (va dentro del QR de la sala): 16 caracteres hexadecimales aleatorios.
create or replace function public.generar_clave_charla()
returns text
language sql
volatile
set search_path = ''
as $$
  select substr(replace(gen_random_uuid()::text, '-', ''), 1, 16);
$$;

-- -------------------------------------------------------------------------------------
-- configuracion: valores que se cambian sin tocar el código
-- -------------------------------------------------------------------------------------
create table public.configuracion (
  clave          text primary key,
  valor          jsonb not null,
  descripcion    text not null,
  actualizado_en timestamptz not null default now()
);

create trigger configuracion_actualizado_en
  before update on public.configuracion
  for each row execute function public.tocar_actualizado_en();

insert into public.configuracion (clave, valor, descripcion) values
  ('minimo_charlas_por_dia', '5'::jsonb,
   'Charlas registradas con el QR de la sala que hacen falta cada día para el certificado (5, como en 2026; confirmado el 13 nov 2026).'),
  ('version_aviso_privacidad', '"2026-11-13"'::jsonb,
   'Versión del aviso de privacidad vigente (politica-de-privacidad.html). Se guarda con cada inscripción.'),
  ('venta_kit', 'false'::jsonb,
   'Igual que ventaKit en assets/js/inscripcion-config.js. Mientras sea false, la inscripción es solo gratuita.');

-- -------------------------------------------------------------------------------------
-- staff: cuentas del staff de puerta y de administración (enlazadas a Supabase Auth)
-- Las crea administración; el registro libre de cuentas queda cerrado en Supabase.
-- -------------------------------------------------------------------------------------
create table public.staff (
  user_id        uuid primary key references auth.users (id) on delete restrict,
  nombre         text not null check (length(btrim(nombre)) between 2 and 120),
  rol            text not null check (rol in ('puerta', 'admin')),
  activo         boolean not null default true,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

comment on table public.staff is
  'Usuarios del staff. puerta = 8 cuentas de acreditación (Puesto 1 a 6 y Mesa de soluciones 1 y 2), sin segundo factor; '
  'admin = panel, con segundo factor obligatorio. Al terminar el evento se marcan activo = false.';

create trigger staff_actualizado_en
  before update on public.staff
  for each row execute function public.tocar_actualizado_en();

-- ¿La sesión actual es de administración, activa y con segundo factor (aal2)?
create or replace function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((auth.jwt() ->> 'aal') = 'aal2', false)
     and exists (
       select 1 from public.staff s
        where s.user_id = auth.uid() and s.rol = 'admin' and s.activo
     );
$$;

-- -------------------------------------------------------------------------------------
-- inscritos
-- -------------------------------------------------------------------------------------
create table public.inscritos (
  id                          uuid primary key default gen_random_uuid(),
  codigo                      text not null unique default public.generar_codigo_pase()
                                check (codigo ~ '^[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}$'),
  nombre                      text not null check (length(btrim(nombre)) between 1 and 80),
  apellido                    text not null check (length(btrim(apellido)) between 1 and 80),
  cedula_tipo                 text not null check (cedula_tipo in ('V', 'E')),
  cedula_numero               text not null check (cedula_numero ~ '^[0-9]{5,9}$'),
  correo                      text not null check (correo = lower(correo) and correo ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
  whatsapp                    text not null check (whatsapp ~ '^\+[0-9]{10,15}$'),
  perfil                      text not null check (perfil in ('especialista', 'enfermeria', 'otras', 'estudiante', 'interno')),
  especialidad                text,
  institucion                 text,
  ciudad                      text,
  como_se_entero              text,
  pase                        text not null check (pase in ('dia-1', 'dias-2-3', 'tres-dias')),
  modalidad                   text not null default 'gratuita' check (modalidad in ('gratuita', 'kit')),
  estado_pago                 text check (estado_pago in ('en_verificacion', 'confirmado', 'rechazado')),
  autoriza_patrocinantes      boolean not null default false,
  consentimiento_aceptado_en  timestamptz,
  consentimiento_version      text,
  origen                      text not null check (origen in ('web', 'panel')),
  idempotency_key             text unique,
  mailchimp_estado            text not null default 'pendiente'
                                check (mailchimp_estado in ('pendiente', 'enviado', 'error', 'no_aplica')),
  mailchimp_error             text,
  mailchimp_actualizado_en    timestamptz,
  creado_por                  uuid references public.staff (user_id) on delete restrict,
  creado_en                   timestamptz not null default now(),
  actualizado_en              timestamptz not null default now(),

  -- Una inscripción por cédula (decisión del 13 nov: el correo sí se puede repetir).
  constraint inscritos_cedula_unica unique (cedula_tipo, cedula_numero),
  -- El pase de tres días (VIP, ponentes, invitados) solo se carga desde el panel.
  constraint inscritos_tres_dias_solo_panel check (pase <> 'tres-dias' or origen = 'panel'),
  constraint inscritos_interno_solo_panel   check (perfil <> 'interno' or origen = 'panel'),
  -- Desde la web: especialidad, institución y ciudad obligatorias, y aceptación del aviso de privacidad.
  constraint inscritos_datos_web check (
    origen = 'panel' or (
      length(btrim(coalesce(especialidad, ''))) > 0 and
      length(btrim(coalesce(institucion, ''))) > 0 and
      length(btrim(coalesce(ciudad, ''))) > 0 and
      consentimiento_aceptado_en is not null and consentimiento_version is not null
    )),
  -- El estado del pago existe solo con kit.
  constraint inscritos_pago_segun_modalidad check (
    (modalidad = 'gratuita' and estado_pago is null) or (modalidad = 'kit' and estado_pago is not null)),
  -- Lo cargado desde el panel lleva quién lo cargó.
  constraint inscritos_panel_con_autor check (origen = 'web' or creado_por is not null)
);

comment on column public.inscritos.codigo is 'Código del pase (va en el QR). Lo genera la base, nunca el teléfono.';
comment on column public.inscritos.correo is 'Se guarda en minúsculas. Puede repetirse entre personas.';
comment on column public.inscritos.whatsapp is 'Formato internacional: + y solo números, por ejemplo +584121234567.';
comment on column public.inscritos.consentimiento_version is 'Versión del aviso de privacidad aceptado (clave version_aviso_privacidad). Mismo nombre que en GMS Comercial.';
comment on column public.inscritos.mailchimp_estado is 'pendiente → enviado o error. Permite ver a quién no le llegó la confirmación.';

create index inscritos_correo_idx   on public.inscritos (correo);
create index inscritos_apellido_idx on public.inscritos (lower(apellido));
create index inscritos_pase_idx     on public.inscritos (pase);
create index inscritos_mailchimp_pendientes_idx on public.inscritos (creado_en)
  where mailchimp_estado in ('pendiente', 'error');

create trigger inscritos_actualizado_en
  before update on public.inscritos
  for each row execute function public.tocar_actualizado_en();

-- -------------------------------------------------------------------------------------
-- charlas: el programa de cada día (vacía hasta tener el programa 2027)
-- -------------------------------------------------------------------------------------
create table public.charlas (
  id             text primary key check (id ~ '^D[1-3]-[0-9]{2}$'),
  dia            smallint not null check (dia between 1 and 3),
  titulo         text not null,
  ponente        text,
  sala           text,
  inicio         timestamptz not null,
  fin            timestamptz not null,
  clave          text not null default public.generar_clave_charla(),
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  constraint charlas_dia_coincide check (substr(id, 2, 1)::smallint = dia),
  constraint charlas_horario check (fin > inicio)
);

comment on column public.charlas.clave is 'Secreta. Solo sale de la base dentro del QR impreso de la sala: CUMBRE27-CONF:D2-07:clave.';

create trigger charlas_actualizado_en
  before update on public.charlas
  for each row execute function public.tocar_actualizado_en();

-- -------------------------------------------------------------------------------------
-- asistencias: cada charla registrada por una persona con el QR de la sala
-- -------------------------------------------------------------------------------------
create table public.asistencias (
  id            uuid primary key default gen_random_uuid(),
  inscrito_id   uuid not null references public.inscritos (id) on delete cascade,
  charla_id     text not null references public.charlas (id) on delete restrict,
  escaneado_en  timestamptz not null,
  recibido_en   timestamptz not null default now(),
  constraint asistencias_una_por_charla unique (inscrito_id, charla_id)
);

comment on column public.asistencias.escaneado_en is 'Hora del teléfono (puede llegar después si no había internet).';

create index asistencias_charla_idx on public.asistencias (charla_id);

-- -------------------------------------------------------------------------------------
-- registros_puerta: entradas, reingresos, kits y envíos a la mesa de soluciones
-- Mismos tipos que assets/js/staff.js.
-- -------------------------------------------------------------------------------------
create table public.registros_puerta (
  id             uuid primary key,          -- lo genera el teléfono: subir la cola dos veces no duplica
  inscrito_id    uuid references public.inscritos (id) on delete set null,
  codigo_leido   text not null,             -- se guarda aunque no exista ("No está en la lista")
  tipo           text not null check (tipo in ('entrada', 'reingreso', 'kit', 'incidencia')),
  motivo         text,
  manual         boolean not null default false,  -- true si se buscó por cédula o apellido en vez de leer el QR
  dia            smallint not null check (dia between 1 and 3),
  puesto         text not null check (length(btrim(puesto)) between 1 and 40),
  staff_id       uuid not null references public.staff (user_id) on delete restrict,
  registrado_en  timestamptz not null,      -- hora del teléfono
  recibido_en    timestamptz not null default now(),
  constraint registros_incidencia_con_motivo check (tipo <> 'incidencia' or length(btrim(coalesce(motivo, ''))) > 0)
);

create index registros_puerta_inscrito_dia_idx on public.registros_puerta (inscrito_id, dia);
create index registros_puerta_recibido_idx     on public.registros_puerta (recibido_en);

-- -------------------------------------------------------------------------------------
-- certificados
-- -------------------------------------------------------------------------------------
create sequence public.certificados_folio_seq start 1;

create table public.certificados (
  id           uuid primary key default gen_random_uuid(),
  inscrito_id  uuid not null references public.inscritos (id) on delete restrict,
  tipo         text not null check (tipo in ('dia-1', 'dias-2-3')),
  folio        text not null unique
                 default ('C27-' || lpad(nextval('public.certificados_folio_seq')::text, 5, '0')),
  emitido_en   timestamptz not null default now(),
  constraint certificados_uno_por_tipo unique (inscrito_id, tipo)
);

comment on column public.certificados.folio is 'C27-00001, C27-00002… Sirve para verificar el certificado.';

-- -------------------------------------------------------------------------------------
-- solicitudes_patrocinio
-- Nombres de columna iguales a la tabla casos de GMS Comercial (contacto_*, notas, origen_lead*,
-- consentimiento_*, idempotency_key), para pasarlas al CRM sin traducir campos.
-- -------------------------------------------------------------------------------------
create table public.solicitudes_patrocinio (
  id                          uuid primary key default gen_random_uuid(),
  contacto_nombre             text not null check (length(btrim(contacto_nombre)) between 2 and 120),
  contacto_empresa            text not null check (length(btrim(contacto_empresa)) between 1 and 160),
  contacto_correo             text not null check (contacto_correo = lower(contacto_correo)
                                                   and contacto_correo ~ '^[^\s@]+@[^\s@]+\.[^\s@]{2,}$'),
  contacto_telefono           text check (contacto_telefono ~ '^\+[0-9]{10,15}$'),
  opcion_patrocinio           text not null check (opcion_patrocinio in (
                                'niveles',            -- Patrocinio Diamante, Platino u Oro
                                'stand',              -- Stand o espacio de exposición
                                'mesa',               -- Mesa de contacto
                                'premium_talleres',   -- Premium Branding o patrocinio de talleres precumbre
                                'presencia_marca',    -- Cápsulas, conferencia destacada u otra opción de presencia de marca
                                'varias',             -- Varias opciones
                                'orientacion')),      -- Necesito orientación
  stand                       text check (stand ~ '^[0-9]{1,3}$'),
  notas                       text check (length(notas) <= 2000),
  origen_lead                 text not null default 'cumbre-2027',
  origen_lead_detalle         text not null default 'web' check (origen_lead_detalle in ('web', 'plano')),
  consentimiento_aceptado_en  timestamptz,
  consentimiento_version      text,
  estado_seguimiento          text not null default 'nuevo' check (estado_seguimiento in (
                                'nuevo', 'contactado', 'propuesta_enviada', 'confirmado', 'descartado')),
  aviso_enviado_en            timestamptz,
  idempotency_key             text unique,
  creado_en                   timestamptz not null default now(),
  actualizado_en              timestamptz not null default now(),
  constraint solicitudes_stand_solo_si_aplica check (stand is null or opcion_patrocinio in ('stand', 'varias'))
);

comment on column public.solicitudes_patrocinio.opcion_patrocinio is
  'Propio de la Cumbre. Al pasar la solicitud a GMS se traduce a su intencion_comercial.';
comment on column public.solicitudes_patrocinio.estado_seguimiento is
  'Propio de la Cumbre (GMS tiene sus propios estados de caso).';
comment on column public.solicitudes_patrocinio.consentimiento_aceptado_en is
  'Hoy el formulario de patrocinio no tiene casilla de aceptación, solo el enlace al aviso: queda vacío hasta que se agregue.';

create index solicitudes_estado_idx on public.solicitudes_patrocinio (estado_seguimiento, creado_en desc);

create trigger solicitudes_actualizado_en
  before update on public.solicitudes_patrocinio
  for each row execute function public.tocar_actualizado_en();

-- -------------------------------------------------------------------------------------
-- Permisos y seguridad por filas
-- -------------------------------------------------------------------------------------

-- Nadie fuera del servidor ejecuta las utilidades.
revoke all on function public.tocar_actualizado_en() from public, anon, authenticated;
revoke all on function public.generar_codigo_pase()  from public, anon, authenticated;
revoke all on function public.generar_clave_charla() from public, anon, authenticated;
revoke all on function public.es_admin()             from public, anon;
grant execute on function public.es_admin()          to authenticated;
-- Las funciones del servidor (service_role) usan los generadores en los valores por defecto.
grant execute on function public.generar_codigo_pase()  to service_role;
grant execute on function public.generar_clave_charla() to service_role;
grant usage on sequence public.certificados_folio_seq   to service_role;

-- Punto de partida: ningún permiso para anon ni authenticated en estas tablas.
revoke all on public.configuracion, public.staff, public.inscritos, public.charlas, public.asistencias,
              public.registros_puerta, public.certificados, public.solicitudes_patrocinio
  from anon, authenticated;
revoke all on sequence public.certificados_folio_seq from anon, authenticated;

alter table public.configuracion          enable row level security;
alter table public.staff                  enable row level security;
alter table public.inscritos              enable row level security;
alter table public.charlas                enable row level security;
alter table public.asistencias            enable row level security;
alter table public.registros_puerta       enable row level security;
alter table public.certificados           enable row level security;
alter table public.solicitudes_patrocinio enable row level security;

-- Lectura de administración (con segundo factor) en todas las tablas.
grant select on public.configuracion, public.staff, public.inscritos, public.charlas, public.asistencias,
                public.registros_puerta, public.certificados, public.solicitudes_patrocinio
  to authenticated;

create policy admin_lee on public.configuracion          for select to authenticated using (public.es_admin());
create policy admin_lee on public.inscritos              for select to authenticated using (public.es_admin());
create policy admin_lee on public.charlas                for select to authenticated using (public.es_admin());
create policy admin_lee on public.asistencias            for select to authenticated using (public.es_admin());
create policy admin_lee on public.registros_puerta       for select to authenticated using (public.es_admin());
create policy admin_lee on public.certificados           for select to authenticated using (public.es_admin());
create policy admin_lee on public.solicitudes_patrocinio for select to authenticated using (public.es_admin());

-- staff: administración ve a todos; cada persona del staff ve solo su propia fila (para saber su rol).
create policy admin_o_propio_lee on public.staff for select to authenticated
  using (public.es_admin() or user_id = auth.uid());

-- Administración corrige datos de contacto de un inscrito (por ejemplo, el correo mal escrito) y
-- vuelve a poner el correo en cola. No puede cambiar código, cédula, pase, modalidad ni consentimiento.
grant update (nombre, apellido, correo, whatsapp, especialidad, institucion, ciudad, mailchimp_estado)
  on public.inscritos to authenticated;
create policy admin_corrige on public.inscritos for update to authenticated
  using (public.es_admin()) with check (public.es_admin());

-- Administración lleva el seguimiento de las solicitudes de patrocinio.
grant update (estado_seguimiento) on public.solicitudes_patrocinio to authenticated;
create policy admin_sigue on public.solicitudes_patrocinio for update to authenticated
  using (public.es_admin()) with check (public.es_admin());

-- Todo lo demás (crear inscritos, registrar asistencias y entradas, emitir certificados, guardar
-- solicitudes, crear cuentas del staff, cargar charlas) lo hacen las funciones del servidor con service_role.

commit;
