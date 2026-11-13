# Estructura y contenido del sitio definitivo

Base para la construcción en Astro. Los campos y páginas son la propuesta vigente; lo marcado "por confirmar" está en PENDIENTES.

## Páginas

| Página | Contenido |
| --- | --- |
| Inicio | La portada actual (ver ESTADO), con todas sus secciones. |
| Programa | Agenda completa con filtros por día, sala y público (enfermería, médicos, talleres). Cada sesión enlaza a su ponente y tiene un botón para agregarla al calendario. Mientras no esté listo, muestra "Programa en preparación" y no aparece en el menú. |
| Ponentes | Ficha de cada ponente: foto, nombre, especialidad, país y sus sesiones. |
| Ponencias 2026 | Galería de las ponencias de la 1ra edición publicadas en YouTube (hoy `ponencias.html`). Filtros por disciplina cuando se tengan las especialidades. |
| Inscríbete | Formulario de asistentes. |
| Expón tu marca | Hoy es una sección de Inicio (presentación, beneficios, opciones, fotos de stands, plano y formulario de solicitud de patrocinio). En el sitio definitivo puede quedarse en Inicio o pasar a página propia. |
| Política de privacidad | Texto legal, actualizado para cubrir los formularios. |

Contacto y redes van en el pie de todas las páginas.

## Destino de cada botón (definido el 28 oct)

| Botón | Hoy lleva a | Cuando existan los formularios |
| --- | --- | --- |
| Conocer oportunidades / Conocer opciones de patrocinio / Patrocinios | Sección de patrocinio | Igual |
| Solicitar propuesta de patrocinio | Formulario de patrocinio | Igual, con envío real |
| Consultar disponibilidad de stands | Formulario con "Stand o espacio de exposición" elegido | Igual |
| Inscribirme al Día 1 / a los Días 2 y 3 | Ventana "Elige tu participación" (kit o gratuita) → `inscripcion.html?dia=…&modalidad=…` | Igual, con envío real |
| Enlace directo para redes y WhatsApp | `inscripcion.html` (sin parámetros: la persona elige todo en la página) | Igual |
| Inscribirme a un taller | Sección de modalidades | Por definir (costo y cupos de talleres pendientes) |
| Regístrate / Regístrate como asistente | Sección de modalidades | Registro de asistentes |
| Explorar ponencias 2026 / Ponencias 2026 | `ponencias.html` | Igual |

## Formulario de asistentes

Construido el 4 nov en `inscripcion.html` (fase 1, **envío simulado**). Funciona igual que el registro de 2026: es una página propia con su enlace, a la que llegan los botones de la portada y que Social media puede compartir sola. Tres pasos: 1) Tus datos (el día sale del perfil; si el perfil aún no tiene día confirmado, la persona lo elige), 2) Modalidad (y datos del pago si elige kit), 3) Confirmación (gratuita: QR de muestra; kit: "pago en verificación"). Los datos pendientes (pago, cupos, cierre de venta, día de estudiantes y otras áreas) se cambian solo en `assets/js/inscripcion-config.js`.

| Campo | Tipo | Obligatorio |
| --- | --- | --- |
| Perfil | Lista: Especialista médico · Enfermería, paramédicos y rescatistas (incluye estudiantes de enfermería) · Nutrición y psicología · Estudiante de medicina (13 nov: farmacia e investigación no participan) | Sí |
| Día o días | Se asigna según el perfil: Día 1 (miércoles 12) o Días 2 y 3 (jueves 13 y viernes 14). Estudiantes de medicina: Días 2 y 3. Otras áreas: eligen mientras se confirma | Automático |
| Modalidad | Gratuita · Inscripción + kit ($40) | Sí |
| Nombre y apellido | Texto | Sí |
| Cédula | V o E y solo números (5 a 9 dígitos). Sin pasaporte (13 nov) | Sí |
| Correo | Correo | Sí |
| WhatsApp | Teléfono con código de país | Sí |
| Especialidad o área | Texto o lista | Sí |
| Institución o universidad | Texto | Sí |
| Ciudad | Texto | Sí |
| ¿Cómo te enteraste de la Cumbre? | Lista | No |
| Aviso de privacidad | Casilla | Sí |
| Autorizo compartir mi nombre, correo, teléfono y especialidad con los patrocinantes | Casilla separada | **No** (opcional) |

**Modalidad con kit ($40):** pago por Pago Móvil o transferencia (monto en Bs a tasa BCV), referencia y comprobante; estado "pago en verificación"; el **QR se entrega solo cuando el pago se confirma**. Verificación manual al inicio; automática por API del banco después.

**Kit:** bolso, lanyard y credencial física, cooler, gorro de quirófano, bolígrafo con lámpara, cartuchera, certificado impreso (además del digital), hidratación (un agua o un café por día), obsequios exclusivos de los patrocinantes. **Gratuita:** QR en el teléfono y certificado digital.

**Conexión con la acreditación:** la app del staff de 2027 reutiliza la lógica de la de 2026 (repo `infocumbrechp-beep/Acreditacion-CHP`), pero lee y escribe en la misma base de Supabase. El QR lleva solo un código aleatorio (no los datos a la vista, como en 2026); el staff descarga la lista de inscritos antes de cada día y funciona sin internet. Al escanear muestra: válido, día equivocado, ya entró o entregar kit. Detalle en `ACREDITACION-2027.md` y `FASE2-BASE-DE-DATOS.md`.

## Formulario de patrocinio (solicitud de propuesta)

Es el formulario de la sección "Expositores y patrocinadores" (propuesta de Codex aceptada el 27 oct). Hoy está maquetado en `index.html` con envío simulado.

| Campo | Tipo | Obligatorio |
| --- | --- | --- |
| Nombre y apellido | Texto | Sí |
| Empresa o marca | Texto | Sí |
| Correo electrónico | Correo | Sí |
| ¿Qué opción te interesa? | Lista: Patrocinio Diamante, Platino u Oro · Stand o espacio de exposición · Mesa de contacto · Premium Branding o patrocinio de talleres precumbre · Cápsulas, conferencia destacada u otra opción de presencia de marca · Varias opciones · Necesito orientación (desde el 2 nov) | Sí |
| WhatsApp | Teléfono con código de país | No |
| ¿Qué te gustaría lograr con tu participación? | Texto largo | No |

- El enlace "Consultar disponibilidad de stands →" del plano abre el formulario con "Stand o espacio de exposición" ya elegido.
- Mensajes: "Completa este campo para continuar." · "Escribe un correo electrónico válido." · "Enviando solicitud…" · "No pudimos enviar tu solicitud. Inténtalo de nuevo en unos momentos." · confirmación "¡Recibimos tu solicitud!" con enlace a WhatsApp.
- Aclara que enviar la solicitud no reserva un espacio ni genera compromiso de compra.
- Los sponsors pagan fuera de la web, con la propuesta comercial. Por eso este formulario no pide RIF ni datos de facturación; esos datos se piden en el seguimiento comercial (y ahí se usan los mismos nombres y formatos que GMS).

## Reglas comunes de los formularios

- Inscripción de asistentes: una por cédula (13 nov). El correo se puede repetir. Si la cédula ya está inscrita, ve "Ya estás inscrito", el correo registrado a medias y el botón "Pedir ayuda" por correo.
- Al enviar, mensaje en pantalla de registro recibido.
- Antispam: verificación invisible y campo trampa, sin acertijos.

## Base de datos y panel

> Desde el 13 nov la fuente vigente de la base de datos es `docs/FASE2-BASE-DE-DATOS.md` (tablas, reglas y permisos). Lo de abajo queda como resumen.

- **Recorrido:** página → función en Supabase (valida, filtra spam, revisa duplicados por cédula) → base del proyecto "cumbre". Solo la función escribe. (Antes: función en Vercel; reemplazado el 12 nov.)
- **Tablas:** `inscritos` y `solicitudes_patrocinio`, más las de la acreditación (charlas, asistencias, registros de puerta, certificados) y `staff`. Estados de seguimiento del patrocinio: nuevo · contactado · propuesta enviada · confirmado · descartado.
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
