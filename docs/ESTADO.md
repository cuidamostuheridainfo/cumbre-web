# Estado del proyecto

Última actualización: 12 de noviembre de 2026.

## Fase actual

**Tercera versión de la propuesta (v3, 28 oct).** Incorpora los comentarios de Social media y la revisión de Codex: prioridad al patrocinio, nuevo orden de secciones, cifras separadas por edición, visión multidisciplinaria, videos de YouTube y la página interna **Ponencias 2026**. Se publica en GitHub Pages para revisión.

Desde la v3, **la fuente del diseño son los archivos del repositorio** (`index.html`, `ponencias.html`, `assets/css/sitio.css`, `assets/js/`). El lienzo de Claude queda como referencia de la v2; no puede incrustar YouTube.

La construcción del sitio definitivo (Astro, formularios reales, base de datos, panel) **no ha empezado**. Los formularios de patrocinio y de inscripción (`inscripcion.html`, desde el 4 nov) validan los campos y **simulan** el envío; no guardan datos. Siguiente: proyecto de Supabase "cumbre" (fase 2) y app del asistente.

## Qué existe y dónde

| Recurso | Dónde | Nota |
| --- | --- | --- |
| Propuesta publicada | https://cuidamostuheridainfo.github.io/cumbre-web/ | GitHub Pages, repo público, con `noindex`. |
| Código de la propuesta | `index.html`, `ponencias.html`, `assets/css/sitio.css`, `assets/js/sitio.js`, `assets/js/ponencias.js`, `assets/img/`, `assets/video/` | Se edita directamente (desde la v3). |
| Canal de YouTube | https://www.youtube.com/@ComunidadCumbreHeridasyPiel | Fuente de los videos. Lista revisada en `docs/VIDEOS-2026.md`. |
| Versión anterior (fondo oscuro) | Historial de git, commit `5a6e76b` y anteriores | Reemplazada el 27 oct. |
| Lienzo de diseño | https://claude.ai/artifact/Y3fY9ZsVsxjCkVx7hy3QpX | Privado de Jenny. Referencia de la v2 (`Claro-B-Patrocinio`); ya no se mantiene sincronizado. |
| Documento de estructura | https://claude.ai/code/artifact/960f03ad-7931-4096-b44d-ec686a8a1d73 | El contenido vigente está en `docs/ESTRUCTURA.md`. |
| Fotos originales 2026 | PC de Jenny, `Documents\Cumbre-fotos-web` (dia-1, dia-2, dia 3, sponsor, head, drone) | Copia web optimizada en `assets/img/evento-*.jpg` y `hero-*.jpg`. |
| Plano del área de exhibición | `assets/img/plano-sede-v2.jpg` (27 oct, numeración corregida, stands 1 a 142). Original en PDF vectorial de Producciones 24 ("cumbrefinal copia"). | Reemplaza al plano de WhatsApp del 22 oct. |
| Informe de cambios de Marketing | `Documents\Cumbre-fotos-web\Informe de Cambios Pagina Web - Cumbre Internacional 2027 (1).pdf` | Fuente de los cambios del 27 oct. |
| Sitio actual | https://cumbrechp.org | WordPress. Activo hasta el cambio de DNS. |
| Maqueta del ecosistema del grupo (11 nov) | https://cuidamostuheridainfo.github.io/cumbre-web/propuesta-ecosistema.html | Página aparte (`propuesta-ecosistema.html`, `assets/css/ecosistema-propuesta.css`, `assets/js/ecosistema-propuesta.js`, `assets/img/ecosistema/`). Sin enlace en el menú, con `noindex`. La portada no cambia. |
| Repositorio | github.com/cuidamostuheridainfo/cumbre-web | Clonado en `C:\Users\Jenny Lopez\Documents\GitHub\cumbre-web\cumbre-web`. |

## Qué tiene hoy la portada (en orden, v3)

1. **Cinta superior fija:** "Tu marca en la Cumbre 2027: conoce las oportunidades de exposición y patrocinio" · "Conocer oportunidades →" (a la sección de patrocinio). Grande en PC; en teléfono, una línea con botón.
2. **Encabezado:** título "II Cumbre Internacional para el Cuidado Avanzado de Heridas, Piel y Longevidad" (10 nov) con la línea "Edición Especial: Protocolos de actuación y medicina de emergencia en desastres" (9 nov); 6 fotos de 2026 rotando; menú Programa 2027 · Ponencias 2026 · La sede · **Patrocinios** (rojo) · Regístrate (borde). En teléfono: logo, botón Patrocinios y menú desplegable. Botón principal rojo "Conocer opciones de patrocinio"; secundario "Regístrate como asistente". Cuenta regresiva.
3. **Cifras por edición:** 1ra edición · 2026: +4.000 asistentes, +30 ponencias de médicos especialistas. 2da edición · 2027: +5.000 asistentes previstos (3.000 médicos y 2.000 de enfermería), 3 días, 3 talleres precumbre.
4. **Nuestro enfoque:** video del dron, texto, cuatro cuadros (Manejo integral de heridas, Cuidado de la piel y longevidad, Emergencias y desastres, Visión multidisciplinaria) y bloque "Una primera edición con visión multidisciplinaria" con 11 disciplinas (en teléfono, 5 y "Ver todas las disciplinas").
5. **Patrocinio:** presentación, beneficios, "¿Quién asiste a la Cumbre?", opciones del brochure del 2 nov (niveles Diamante/Platino/Oro, espacios, complementos y "otras opciones" por confirmar, sin precios; plegables en teléfono), "Así se vivió la Cumbre 2026" con el video resumen y fotos que rotan de stands, ponentes y asistentes (12 nov: 11 fotos nuevas; en teléfono, "Ver más fotos"), plano del área de exhibición.
6. **Formulario de patrocinio** (envío simulado).
7. **Ponencias 2026 (vista previa):** "Más de 30 ponencias de médicos especialistas en nuestra primera edición", 3 tarjetas en PC y 1 en teléfono, "Explorar ponencias 2026" y "Suscríbete al canal".
8. **Modalidades de participación (2027):** Día 1 (miércoles 12), Días 2 y 3 (jueves 13 y viernes 14), Talleres precumbre. "Inscribirme al Día 1" y "a los Días 2 y 3" abren la ventana "Elige tu participación": inscripción + kit $40 (destacada, con su contenido) o gratuita, y cada opción lleva a `inscripcion.html` con el día y la modalidad ya elegidos.
9. **Videos y entrevistas (10 nov):** "Camino a la Cumbre 2027", con los videos de promoción y las entrevistas de radio en video. Se cargan en `assets/js/videos-2027.js`; mientras no hay ninguno, muestra "Muy pronto, los primeros videos" y la invitación a suscribirse al canal. Con videos de los dos tipos aparecen los filtros Todos, Videos y Entrevistas de radio.
10. **Organizan y avalan**, pie (con enlace al canal de YouTube), WhatsApp flotante y etiqueta de borrador.

**ponencias.html:** las 14 ponencias publicadas que se pueden ver dentro del sitio (9 y "Cargar más"; las 4 con restricción de edad de YouTube no se incluyen), cada una con miniatura, título, ponente, duración, etiqueta "Edición 2026", "Ver ponencia" (se reproduce en la misma tarjeta) y "Ver en YouTube". Cierra con la invitación a suscribirse y dos pasos: "Conocer opciones de patrocinio" (destacado) y "Ver modalidades de participación".

**inscripcion.html:** inscripción de asistentes en tres pasos (datos, modalidad, confirmación). Enlace propio para compartir en redes. Envío simulado; los datos de pago aparecen entre corchetes hasta que se confirmen.

**Acreditación 2027 (9 nov, fase 1 con lista de prueba):** `app/` (pase del participante, identidad visual propia) y `staff/` (acreditación en la puerta). Detalle en `docs/ACREDITACION-2027.md`.

## Cómo se publica un cambio

1. Editar `index.html`, `ponencias.html`, `assets/css/sitio.css` o `assets/js/` (ver `docs/FLUJO-DISENO.md`).
2. Jenny hace commit en GitHub Desktop y Push origin.
3. GitHub Pages actualiza en uno o dos minutos. Si alguien ve la versión anterior, recargar la página.

## Relación con otros proyectos

- **Ecosistema del Grupo Medical Shields (desde el 10 nov):** Medical Shields, CTH, la Cumbre y Ethical Shields AI se mostrarán como un solo grupo ("Ecosistema de Salud y Bienestar Integral"), con barra y pie iguales en las cuatro webs, logo del grupo y puentes comunes. El plan y el registro de cambios compartido están en el documento "Grupo Medical Shields: un solo ecosistema web" (https://claude.ai/artifact/C9587Udj2jDw2fovZcsVv1).
  - **Maqueta publicada (11 nov):** `propuesta-ecosistema.html`, con las cuatro propuestas del logo del grupo y sus pies, para el comité y el video. Ver "Maqueta del ecosistema" en `docs/DECISIONES-VIGENTES.md`.
  - **Logo del grupo:** sin definir. El 11 nov se envió al comité la maqueta con una encuesta de WhatsApp para votar entre las cuatro propuestas.
  - En la web real todavía no se aplica nada.

- **Supabase:** los formularios irán a un proyecto nuevo dentro de la misma organización donde vive el CRM de Medical Shields (GMS Comercial), separado del proyecto del CRM.
- **Web de Medical Shields:** proyecto aparte, todavía no iniciado.
