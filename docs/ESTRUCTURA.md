# Estructura y contenido del sitio definitivo

Base para la construcción en Astro. Los campos y páginas son la propuesta vigente; lo marcado "por confirmar" está en PENDIENTES.

## Páginas

| Página | Contenido |
| --- | --- |
| Inicio | La portada actual (ver ESTADO), con todas sus secciones. |
| Programa | Agenda completa con filtros por día, sala y público (enfermería, médicos, talleres). Cada sesión enlaza a su ponente y tiene un botón para agregarla al calendario. Mientras no esté listo, muestra "Programa en preparación" y no aparece en el menú. |
| Ponentes | Ficha de cada ponente: foto, nombre, especialidad, país y sus sesiones. |
| Inscríbete | Formulario de asistentes. |
| Expón tu marca | Beneficios para expositores, plano de stands y formulario de stand comercial. |
| Política de privacidad | Texto legal, actualizado para cubrir los formularios. |

Contacto y redes van en el pie de todas las páginas.

## Formulario de asistentes

| Campo | Tipo | Obligatorio |
| --- | --- | --- |
| Perfil | Lista: Estudiante de medicina · Estudiante de enfermería | Sí |
| Nombre y apellido | Texto | Sí |
| Correo | Correo | Sí |
| WhatsApp | Teléfono con código de país | Sí |
| Universidad | Texto | Sí |
| Año o semestre | Lista | Sí |
| Ciudad | Texto | Sí |
| ¿Cómo te enteraste de la Cumbre? | Lista: Instagram · TikTok · Universidad · Recomendación · Otro | No |
| Aceptación de la política de privacidad | Casilla | Sí |

Por confirmar: cédula (si hay certificados) y si se agregan médicos y enfermeros graduados.

## Formulario de stand comercial

| Campo | Tipo | Obligatorio |
| --- | --- | --- |
| Empresa | Texto | Sí |
| RIF | Texto con formato validado | Sí |
| Tipo de empresa | Lista: Laboratorio · Clínica u hospital · Distribuidor o droguería · Equipos médicos · Otro | Sí |
| Persona de contacto | Texto | Sí |
| Cargo | Texto | Sí |
| Correo | Correo | Sí |
| WhatsApp | Teléfono con código de país | Sí |
| Ciudad | Texto | Sí |
| Tipo de stand de interés | Lista, según los paquetes (o el stand marcado en el plano) | No |
| Comentarios | Texto largo | No |
| Aceptación de la política de privacidad | Casilla | Sí |

Los nombres y formatos de empresa, RIF, contacto, correo y WhatsApp se verifican contra el esquema de GMS antes de construir.

## Reglas comunes de los formularios

- El mismo correo no se registra dos veces en el mismo formulario; si lo intenta, ve un mensaje de que ya está registrado.
- Al enviar, mensaje en pantalla de registro recibido.
- Antispam: verificación invisible y campo trampa, sin acertijos.

## Base de datos y panel

- **Recorrido:** página → función en Vercel (valida, filtra spam, revisa duplicados) → Supabase. Solo la función tiene la llave de escritura.
- **Tablas:** `asistentes` (campos del formulario + fecha de registro + origen) y `stands` (campos + fecha + origen + estado de seguimiento: Nuevo · Contactado · Confirmado · Descartado).
- **Panel:** acceso con cuenta, solo correos autorizados y segundo factor; lista con filtros por perfil, tipo de empresa y fecha; descarga CSV; cambio de estado en stands.
- **Aviso:** correo al responsable comercial por cada stand nuevo (destinatario por definir).

## Migración desde WordPress

| Qué | Acción |
| --- | --- |
| Registros de la edición anterior | Exportar desde WordPress antes de apagarlo. |
| Píxeles de Facebook (hay dos instalados) | Confirmar cuál se usa y en qué cuenta publicitaria; instalarlo en el sitio nuevo. |
| Fotos y cifras de 2026 | Para la sección de trayectoria. |
| Política de privacidad | Copiar y actualizar. |
| Direcciones del sitio actual | Redirigir /evento, /programa-general, /participar y /patrocinantes. |
| Correo del dominio | Revisar si existe correo @cumbrechp.org; sus registros MX no se tocan. |

El cambio se hace solo en el DNS de GoDaddy, con WordPress todavía activo para poder revertir.
