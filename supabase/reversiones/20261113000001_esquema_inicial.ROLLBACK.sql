-- =====================================================================================
-- Reversión de la migración 20261113000001_esquema_inicial.sql (proyecto Supabase "cumbre")
-- BORRA las tablas de la fase 2 y TODOS sus datos. Usar solo mientras haya datos de prueba.
-- No toca auth.users: las cuentas del staff creadas en Supabase Auth se borran aparte, desde el panel.
-- =====================================================================================

begin;

drop table if exists public.solicitudes_patrocinio;
drop table if exists public.certificados;
drop sequence if exists public.certificados_folio_seq;
drop table if exists public.registros_puerta;
drop table if exists public.asistencias;
drop table if exists public.charlas;
drop table if exists public.inscritos;
drop table if exists public.staff;
drop table if exists public.configuracion;
drop function if exists public.es_admin();
drop function if exists public.generar_clave_charla();
drop function if exists public.generar_codigo_pase();
drop function if exists public.tocar_actualizado_en();

commit;
