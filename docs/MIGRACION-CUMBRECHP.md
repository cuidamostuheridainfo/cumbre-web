# Migración de cumbrechp.org

Inventario del sitio actual hecho el 12 de noviembre de 2026, solo leyendo la parte pública (sin entrar al administrador de WordPress). Sirve para cambiar el dominio sin perder posicionamiento en Google, medición ni registros.

## Qué es hoy el sitio

- **WordPress** en GoDaddy (los scripts de GoDaddy aparecen en la página). El sitio reporta la versión 7.1.4.
- **Tema:** Exhibz (con tema hijo), una plantilla de eventos. Muchas páginas son restos de la demo de esa plantilla.
- **Plugins visibles:** Elementor, ElementsKit Lite, Contact Form 7, MetForm, Official Facebook Pixel, PixelYourSite y Google Site Kit.
- **Título del sitio:** "Cumbre Internacional para el Cuidado de Heridas y Piel" (nombre anterior).
- **Redes enlazadas:** Instagram y TikTok `@cumbreinternacionalchp`; YouTube `@cuidamostuherida` (es el canal de CTH, no el de la Cumbre, "Comunidad Cumbre Heridas y Piel", que usa la web nueva).

## Medición (no perderla)

| Qué | Identificador | Lo instala |
| --- | --- | --- |
| Píxel de Meta | 1318999152980581 | PixelYourSite |
| Píxel de Meta | 9088326394625436 | Official Facebook Pixel |
| Google (Site Kit) | GT-TNG37N97 | Google Site Kit |

- Hay **dos píxeles de Meta distintos** en la misma página. Antes de copiarlos a la web nueva hay que saber cuál usan las campañas de la Cumbre (conecta con la "medición de grupo" del plan del grupo: no se toca ningún conjunto de Meta sin confirmar con quien maneja las campañas).
- La web nueva no tiene todavía ningún píxel ni Google.

## Formularios (no perder registros)

| Página | Formulario | Campos |
| --- | --- | --- |
| /contacto | Contact Form 7 | nombre, teléfono, correo, asunto, mensaje |
| /proveedor | Contact Form 7 | rubro o actividad, nombre y apellido, lugar de trabajo, correo, WhatsApp, estado y ciudad, Instagram, encuesta (6 preguntas), mensaje |
| /faq | Contact Form 7 | nombre y apellido, correo, WhatsApp, estado y ciudad |
| /speakers | Contact Form 7 | nombre y apellido, correo |

- **Dónde quedan los registros:** desde afuera no se puede saber. Contact Form 7, por sí solo, solo envía un correo y no guarda nada en WordPress; si hay un plugin que los guarda (por ejemplo Flamingo), no se ve desde la parte pública. Hay que revisarlo en el administrador de WordPress.
- **/participar** muestra los perfiles (médico, estudiante de medicina, enfermería, farmacéutico, patrocinador, invitado, proveedor de servicios), pero las tarjetas ya no llevan a ningún formulario. **Los registros de 2026 ya se descargaron** (confirmado por Jenny, 12 nov).
- MetForm está instalado, pero no hay formularios de MetForm en las páginas públicas.

## Páginas y redirecciones propuestas

Las direcciones se ajustan cuando exista el sitio definitivo en Astro. Mientras tanto, la referencia es la propuesta actual.

| Página actual | Qué es | Propuesta de redirección |
| --- | --- | --- |
| / | Portada | / |
| /evento | Objetivo y público de la Cumbre | /#enfoque |
| /programa-general | Programa 2026 y "Registro" | /#inscripcion |
| /patrocinantes | Patrocinantes 2026 | /#patrocinio |
| /planes | Planes Diamante y Oro | /#opciones |
| /participar | Elegir perfil | /inscripcion.html |
| /proveedor | Formulario de proveedores | /#formulario-patrocinio |
| /contacto | Formulario de contacto | / (pie de página) hasta que exista contacto propio |
| /politica-de-privacidad | Política de privacidad | [Página de privacidad nueva, por crear] |
| /speakers y /speaker/comite-organizador | Ponentes 2026 | /ponencias.html |
| /faq | Preguntas de la plantilla, con un formulario | / |

**Restos de la demo de la plantilla** (contenido en inglés que no es de la Cumbre, pero está en el mapa del sitio y Google puede tenerlo): 3 entradas de blog (`/met-gala-planner-...`, `/adding-a-new-digital/`, `/west-elm-at-evantor/`), 8 ponentes ficticios en `/speaker/...`, `/schedule/workshop/`, `/schedule/15th-feb/`, `/schedule/16th-feb/`, etiquetas en `/tag/...`, `/category/news/` y `/speaker-categories/speakers/`. Propuesta: redirigirlos todos a la portada.

## Pasos el día del cambio (resumen)

1. Exportar los registros de formularios que tenga WordPress (las inscripciones de 2026 ya se descargaron).
2. Decidir qué píxel o píxeles de Meta y qué etiqueta de Google lleva la web nueva, y agregarlos antes del cambio.
3. Cargar las redirecciones en el servicio donde se publique (Vercel o Cloudflare Pages).
4. Cambiar el DNS en GoDaddy **sin tocar los registros de correo (MX)**.
5. Revisar en Google Search Console que las páginas viejas redirijan bien y enviar el mapa del sitio nuevo.

## Por confirmar

- Acceso al administrador de WordPress, para ver si los formularios guardan registros y exportarlos.
- Cuál de los dos píxeles de Meta usan las campañas, y quién maneja Google Site Kit.
- **El dominio tiene correo activo:** informacion@cumbrechp.org es el contacto oficial (13 nov). El cambio de DNS no puede tocar sus registros de correo.
