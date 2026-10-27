# Estructura y contenido del sitio definitivo

Base para la construcción en Astro. Los campos y páginas son la propuesta vigente; lo marcado "por confirmar" está en PENDIENTES.

## Páginas

| Página | Contenido |
| --- | --- |
| Inicio | La portada actual (ver ESTADO), con todas sus secciones. |
| Programa | Agenda completa con filtros por día, sala y público (enfermería, médicos, talleres). Cada sesión enlaza a su ponente y tiene un botón para agregarla al calendario. Mientras no esté listo, muestra "Programa en preparación" y no aparece en el menú. |
| Ponentes | Ficha de cada ponente: foto, nombre, especialidad, país y sus sesiones. |
| Inscríbete | Formulario de asistentes. |
| Expón tu marca | Hoy es una sección de Inicio (presentación, beneficios, opciones, fotos de stands, plano y formulario de solicitud de patrocinio). En el sitio definitivo puede quedarse en Inicio o pasar a página propia. |
| Política de privacidad | Texto legal, actualizado para cubrir los formularios. |

Contacto y redes van en el pie de todas las páginas.

## Formulario de asistentes

Por confirmar (ver PENDIENTES). Propuesta vigente desde el 27 oct:

| Campo | Tipo | Obligatorio |
| --- | --- | --- |
| Perfil | Lista: Estudiante · Especialista médico · Enfermería, paramédicos y rescatistas | Sí |
| Modalidad | Lista: Gratuita · Con kit ($25) — el kit se puede activar o desactivar desde el panel | Sí |
| Día o días | Según el perfil: Día 1 (enfermería y rescate), Días 2 y 3 (especialistas), Talleres | Sí |
| Nombre y apellido | Texto | Sí |
| Correo | Correo | Sí |
| WhatsApp | Teléfono con código de país | Sí |
| Institución o universidad | Texto | Sí |
| Ciudad | Texto | Sí |
| ¿Cómo te enteraste de la Cumbre? | Lista: Instagram · TikTok · Universidad · Recomendación · Otro | No |
| Aceptación del aviso de privacidad | Casilla | Sí |

Por confirmar: cédula (si hay certificados). Si la modalidad es con kit, el pago sigue el modelo de verificación manual: Pago Móvil o transferencia, monto en Bs a tasa BCV, referencia y foto del comprobante, estado "pendiente de verificación".

## Formulario de patrocinio (solicitud de propuesta)

Es el formulario de la sección "Expositores y patrocinadores" (propuesta de Codex aceptada el 27 oct). Hoy está maquetado en `index.html` con envío simulado.

| Campo | Tipo | Obligatorio |
| --- | --- | --- |
| Nombre y apellido | Texto | Sí |
| Empresa o marca | Texto | Sí |
| Correo electrónico | Correo | Sí |
| ¿Qué opción te interesa? | Lista: Stand o espacio de exposición · Patrocinio y publicidad · Activación de marca · Varias opciones · Necesito orientación | Sí |
| WhatsApp | Teléfono con código de país | No |
| ¿Qué te gustaría lograr con tu participación? | Texto largo | No |

- El enlace "Consultar disponibilidad de stands →" del plano abre el formulario con "Stand o espacio de exposición" ya elegido.
- Mensajes: "Completa este campo para continuar." · "Escribe un correo electrónico válido." · "Enviando solicitud…" · "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos momentos." · confirmación "¡Recibimos tu solicitud!" con enlace a WhatsApp.
- Aclara que enviar la solicitud no reserva un espacio ni genera compromiso de compra.
- Los sponsors pagan fuera de la web, con la propuesta comercial. Por eso este formulario no pide RIF ni datos de facturación; esos datos se piden en el seguimiento comercial (y ahí se usan los mismos nombres y formatos que GMS).

## Reglas comunes de los formularios

- El mismo correo no se registra dos veces en el mismo formulario; si lo intenta, ve un mensaje de que ya está registrado.
- Al enviar, mensaje en pantalla de registro recibido.
- Antispam: verificación invisible y campo trampa, sin acertijos.

## Base de datos y panel

- **Recorrido:** página → función en Vercel (valida, filtra spam, revisa duplicados) → Supabase. Solo la función tiene la llave de escritura.
- **Tablas:** `asistentes` (campos del formulario + modalidad + estado de pago + fecha de registro + origen) y `solicitudes_patrocinio` (campos + fecha + origen + estado de seguimiento: Nuevo · Contactado · Propuesta enviada · Confirmado · Descartado).
- **Panel:** acceso con cuenta, solo correos autorizados y segundo factor; lista con filtros por perfil, tipo de empresa y fecha; descarga CSV; cambio de estado en stands.
- **Aviso:** correo al responsable comercial por cada solicitud de patrocinio nueva (destinatario por definir).

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
