# Decisiones vigentes

Lo que está aquí ya se decidió. No se reabre salvo que Jenny lo pida o aparezca un motivo nuevo, y en ese caso se anota aquí la decisión que lo reemplaza.

## Plataforma y técnica (14 oct 2026)

- **Código propio, no Lovable**, por autonomía.
- **Stack del sitio definitivo:** Astro + Tailwind, páginas estáticas. Ponentes, agenda, patrocinantes y stands en archivos de datos, separados del diseño.
- **Publicación definitiva:** Vercel, con publicación automática en cada commit. El plan gratuito no permite uso comercial; queda por confirmar Pro o la alternativa Cloudflare Pages.
- **Publicación provisional:** GitHub Pages en este repo público, con `noindex`.
- **Repositorio:** `cumbre-web` en la cuenta cuidamostuheridainfo. Commits con GitHub Desktop.
- **Base de datos:** Supabase, en la misma organización del CRM de Medical Shields, pero en un **proyecto separado** ("cumbre"). Motivo: el formulario es público y su llave no debe tener acceso al CRM.
- **Formularios:** envían a una función en Vercel que valida, filtra spam y revisa duplicados; solo esa función escribe en la base. La página pública nunca lee los registros.
- **Stands y CRM:** los campos del formulario de stand (empresa, RIF, contacto, correo, WhatsApp) usan los mismos nombres y formatos que GMS, para pasarlos al CRM después. Primera versión: exportación manual desde el panel.
- **Dominio:** cumbrechp.org, DNS en GoDaddy (con acceso). WordPress sigue activo hasta el cambio de DNS; los registros de correo (MX) no se tocan.
- **Pulido final:** skills de Emil Kowalski (emil-design-eng, apple-design, mobile-native, break-ui, review-animations) en Claude Code, al terminar la construcción.

## Alcance

- **Inscripción:** igual que hoy, por formulario, pero guardando en nuestra base de datos.
- **Perfiles de asistentes:** ~~estudiantes de medicina y de enfermería~~. Reemplazado el 27 oct: tres perfiles (ver PENDIENTES, por confirmar).
- **Stand comercial:** cualquier empresa que quiera exhibir, por ejemplo laboratorios, clínicas o distribuidores.
- **Fuera de alcance de la primera versión:** venta de entradas, pagos en línea y registro el día del evento.
- **Programa, patrocinantes y stands:** son nuevos para esta edición; no se migra el contenido de 2026, solo fotos y cifras para la sección de trayectoria.

## Diseño (14 oct 2026)

> Varias líneas de esta sección fueron reemplazadas el 27 oct; ver "Segunda propuesta (27 oct 2026)" al final.

- **Sitio nuevo y moderno, no una réplica** del actual.
- **Identidad:** el logo real (anillo de tres cintas: azul degradado con puntas dorado, plateado dorado y rojo coral, sobre azul marino). Colores: azul marino #060A26 / #0A1040, dorado #CDB066 / #F3E3A6, azul #0A6CFF / #00BDFF, rojo #F7153B. Tipografía: Barlow Semi Condensed cursiva en mayúsculas para títulos, Barlow para texto.
- **Nombre en el encabezado:** misma jerarquía del logo, "Cumbre Internacional para el Cuidado Avanzado de" arriba y "HERIDAS Y PIEL" en grande.
- **Descartado:** tres propuestas iniciales (A Precisión clínica, B Noche de congreso, C Tejido y cuidado), por planas, poco elegantes o sin relación con la marca.
- **Orden de secciones:** encabezado → cifras → organizadores → video → participa → programa → ponentes → sede y stands → así se vivió 2026 → pie. Primero lo del asistente, luego lo del expositor.
- **Sede y stands en una sola sección**, con el plano del local como pieza central (vista 3D con CSS cuando exista el plano).
- **Títulos de sección centrados**, etiquetas de sección a 24 px (17 px en celular). "Dos formas de vivir la Cumbre" en una sola línea en computadora.
- **Pie:** íconos de redes en círculo, Política de Privacidad y copyright con el nombre completo. Sin la línea "Organizan…", porque la cinta ya lo dice.
- **Cinta de organizadores:** fondo blanco porque los logos actuales tienen fondo blanco. Con logos transparentes podría pasar a azul marino.

## Animaciones (14 oct 2026)

- **Nombre:** "HERIDAS Y PIEL" se escribe letra por letra con un destello dorado y un cursor dorado delante de cada letra. El cursor no aparece en la última letra (se descartó el parpadeo final porque dejaba una línea fija detrás de la L).
- **Cifras:** el conteo empieza solo cuando la persona hace scroll y la franja llega a la mitad de la pantalla. +4.000 cuenta rápido (2,2 s). Días y países van número por número con un pulso (3,8 s).
- **Anillo del logo:** es el logo real separado en sus tres cintas como capas, con sombra. **Solo gira**, una vuelta por minuto. Descartados: el 3D generado con three.js (no se parecía al logo) y el movimiento con el cursor o el scroll (deformaba la forma).
- **Movimiento reducido:** si el visitante tiene desactivado el movimiento, todo aparece quieto.
- **Pendiente para el sitio definitivo:** animación del nombre ligada al scroll y plano 3D de la sede.

## Segunda propuesta (27 oct 2026)

Basada en el informe de cambios de Marketing del 27 oct. Reemplaza lo que contradiga las secciones anteriores.

- **Nombre oficial:** Cumbre Internacional para el Cuidado Avanzado de Heridas y Piel (2da edición). "2da edición" va como etiqueta al lado de "HERIDAS Y PIEL".
- **Fondo claro** (dirección "Claro B · Alta luz"). Descartadas: Claro A (ventana) y Claro C (corte de cinta). La versión oscura queda en el historial.
- **Encabezado:** "Cumbre Internacional para el Cuidado Avanzado de" más grande y "HERIDAS Y PIEL" más pequeño que en la v1, para que no se distorsione. Debajo, "Heridas y protocolos de actuación en desastres" y luego fecha y sede.
- **Fotos del encabezado:** 6 fotos elegidas por Jenny (carpeta `head`), una a la vez cada 6 s con fundido. La rotación la maneja un solo reloj en JavaScript; se descartó la animación CSS con retrasos porque dejaba huecos en blanco y desigualaba los tiempos.
- **Cifras:** +4.000 asistentes en la 1ra edición; **+2.000 asistentes por día previstos** en la 2da (antes 1.500); 3 días de conferencias; 3 talleres especializados.
- **Nuestro enfoque:** con el video del dron en bucle (24 s, sin sonido) en lugar de una foto.
- **Participa:** "Escoge tu participación en la Cumbre" con tarjetas por día (Día 1 Enfermería y rescate; Días 2 y 3 Especialistas médicos; Talleres) y fotos reales que rotan. Al pasar el cursor, la tarjeta sube y se marca con borde azul marino.
- **Fondo de Participa:** panal suave como marca de agua (se probaron gasa y silicona; se eligió el panal).
- **Organizadores:** la cinta de logos en movimiento va **al pie de la página** ("Organizan y avalan"), con fondo blanco y líneas de color animadas.
- **Expositores y patrocinadores (propuesta de Codex, aceptada):** sección propia después de Participa, con presentación, beneficios, opciones, fotos de stands 2026, plano y formulario. **Un solo CTA:** "Solicitar propuesta de patrocinio", que siempre lleva al formulario. El enlace del plano abre el formulario con "Stand o espacio de exposición" ya elegido.
- **Visibilidad del expositor sin quitarle el primer lugar al asistente:** cinta superior fija, botón rojo en el encabezado y WhatsApp flotante. Se descartó reordenar la página por etapas, porque el sitio sale a producción con todo listo.
- **Opciones de patrocinio en dos grupos:** Espacios de exposición (stand con producción 2 × 2 m, metro cuadrado libre) y Activaciones y presencia de marca (activaciones, coffee breaks, microcápsulas, conferencia destacada, publicidad entre conferencias). Activaciones queda en el segundo grupo hasta que opine el comité.
- **No se publican** precios, cantidades disponibles ni fechas de preventa hasta que Comercial los confirme.
- **Formulario de patrocinio:** nombre, empresa, correo, opción de interés (obligatorios), WhatsApp y objetivo (opcionales). Aclara que enviar la solicitud no reserva un espacio. Confirmación solo cuando el envío se completa.
- **WhatsApp flotante:** +58 414-2577408 con el mensaje "Hola, deseo información sobre los stands para la Cumbre".

## Tercera versión (28 oct 2026)

Basada en los comentarios de Social media y la revisión de Codex. Reemplaza lo que contradiga las secciones anteriores.

- **Prioridad de esta etapa: patrocinadores.** El botón principal del encabezado es "Conocer opciones de patrocinio"; la inscripción de asistentes queda como acción secundaria. Reemplaza "primero lo del asistente, luego lo del expositor".
- **Orden:** portada → cifras por edición → enfoque y visión multidisciplinaria → patrocinio (con su formulario al cierre) → vista previa de Ponencias 2026 → modalidades de participación → organizadores y pie.
- **Cifras separadas por edición:** resultados de 2026 (+4.000 asistentes, +30 ponencias, confirmado por Jenny) y previsiones de 2027. No mezclar 2026 con 2027 en ninguna parte.
- **Nuestro enfoque se mantiene** con sus tres cuadros y un cuarto, "Visión multidisciplinaria" (dorado); debajo, las 11 disciplinas.
- **Videos:** solo del canal oficial "Comunidad Cumbre Heridas y Piel", solo videos ya publicados (no estrenos). El reproductor de YouTube carga solo al pulsar la miniatura; cada video tiene "Ver en YouTube" y la etiqueta "Edición 2026". Se usa youtube-nocookie.com.
- **Dos niveles de video:** video resumen dentro de la sección de patrocinio ("Así se vivió la Cumbre 2026"), y vista previa de 3 ponencias en la portada con la galería completa en `ponencias.html`.
- **Datos de ponencias:** títulos del canal, ponente según el canal; donde falta, no se inventa. La especialidad no se muestra hasta tenerla. La lista vive en `assets/js/ponencias.js`.
- **Invitar a suscribirse al canal** en la vista previa, en la página de ponencias y en el pie.
- **Menú:** "Programa 2027" (lleva por ahora a las modalidades) distinto de "Ponencias 2026". En teléfono hay menú desplegable y el botón "Patrocinios" siempre visible.
- **Teléfono más corto:** opciones comerciales plegables, selección de fotos con "Ver más fotos", menos espacio entre secciones, títulos largos sin mayúsculas sostenidas.
- **Fuente del diseño:** desde la v3 se edita el código del repositorio; el lienzo queda como referencia.
- **Videos con restricción de edad de YouTube no se incluyen en la página** (no se pueden ver incrustados); quien quiera verlos va al canal. Hoy son 4, entre ellos la ponencia de Dariela Ruiz. Destacadas: Valentina Kube, Carlos Durán e Irene Camacho.

## Brochure comercial 2da edición (2 nov 2026)

- **Talleres:** pasan a ser los del brochure: control de hemorragias masivas, manejo del síndrome por aplastamiento y atención en refugios ("Talleres prácticos de campo"). La organización enviará objetivos y contenidos. La cifra dice "3 talleres prácticos de campo".
- **Oferta comercial:** se adopta la estructura del brochure. Niveles: Diamante, Platino, Oro. Espacios: espacio libre, mesa de contacto, stand básico 2 × 2 m. Complementos: Premium Branding y Cursos Precumbre. Activaciones, coffee breaks, microcápsulas, conferencia destacada y publicidad entre conferencias se mantienen por ahora como "Otras opciones de presencia de marca", hasta que la organización confirme si siguen (el brochure no las menciona).
- **Sin precios en la página** hasta que Comercial confirme el precio por m² del espacio libre y las fechas de preventa.
- **No se publica "bases de datos segmentadas"** como beneficio hasta definir el consentimiento de los asistentes (formulario y aviso de privacidad).
- **Perfil de la audiencia** del brochure en la sección de patrocinio ("¿Quién asiste a la Cumbre?") y tema de cada día en las tarjetas de modalidades.
- **El nombre de la página no cambia:** el brochure omite "Avanzado"; el nombre oficial lo lleva.

## Respuestas de la organización (4 nov 2026)

- **Cifra oficial de 2027:** +5.000 asistentes previstos (3.000 especialistas médicos y 2.000 de enfermería). Reemplaza "+2.000 por día". En la web se dice "asistentes", no "prescriptores".
- **Días:** Día 1 miércoles 12, Día 2 jueves 13, Día 3 viernes 14 de mayo de 2027.
- **Talleres = cursos precumbre:** se dictan antes de la Cumbre, con los temas del brochure. Fecha, lugar, costo y cupos por confirmar. El complemento comercial pasa a "Patrocinio de talleres precumbre".
- **Autorización para compartir datos con patrocinantes:** casilla **opcional** y separada en la inscripción (la organización la pidió obligatoria; se acordó opcional).
- **Hospedaje, traslados y gastronomía:** solo en el brochure, no en la web.
- **Presencia de marca:** salen coffee breaks y activaciones; se mantienen las cápsulas (publicidad en pantalla) y la conferencia destacada. Publicidad entre conferencias, por confirmar.
- **Precios solo en el brochure.** Espacio libre $750/m² (2 × 2 m = $3.000); stand básico armado 2 × 2 m $4.600. Tarifas vigentes **hasta** el 31 de diciembre de 2026; la web lo anuncia sin precios.
- **Inscripción + kit: $40.** Kit: bolso, lanyard y credencial, cooler, gorro de quirófano, bolígrafo con lámpara, cartuchera, certificado impreso e hidratación (un agua o un café).
- **Cédula:** se pide en la inscripción.
- **QR del kit:** se entrega solo cuando el pago está confirmado. Mientras tanto, "pago en verificación" en pantalla y por correo. Propuesta: verificar en 24–48 h y cerrar la venta de kits unos días antes del evento.
- **Elección de modalidad dentro de cada día (4 nov):** se quita el bloque aparte "Elige tu modalidad". Los botones "Inscribirme al Día 1" y "Inscribirme a los Días 2 y 3" abren una ventana "Elige tu participación" con el día ya indicado: Inscripción + kit ($40, destacada con etiqueta "Incluye kit") e Inscripción gratuita. La tarjeta de Talleres no usa esta ventana hasta saber si tienen costo.
- **Página de inscripción propia (4 nov):** `inscripcion.html`, como el registro de 2026: se llega desde la ventana de la portada (con día y modalidad ya elegidos) o por el enlace directo que Social media comparte en redes. El día lo define el perfil (especialista → Días 2 y 3; enfermería, paramédicos y rescatistas → Día 1); para otras áreas y estudiantes la persona elige mientras la organización confirma. Fase 1 con envío simulado; fase 2 con Supabase.
- **Después de inscribirse, acceso a la app del asistente (4 nov, pedido de Jenny):** como en 2026, al terminar la inscripción la persona entra a la app de la Cumbre con su QR, video de bienvenida, ubicación (plano), programa y conferencias. Por construir; depende del programa y del video de bienvenida.

## Respuestas de Social media y nuevo título (9 nov 2026)

- **Título oficial:** "II Cumbre Internacional para el Cuidado Avanzado de Heridas y Piel" · "Edición Especial: Protocolos de actuación y medicina de emergencia en desastres". Reemplaza al antetítulo con "2da edición" y al subtítulo "Heridas y protocolos de actuación en desastres". El logo (imagen) no cambia.
- **Publicidad entre conferencias:** se mantiene (mención del moderador y logo en pantallas LED, incluida en los paquetes). Solo sale el coffee break.
- **Talleres precumbre:** fecha, hora, lugar, costo y cupos se anunciarán más adelante. La web lo dice así ("se anunciarán próximamente"), sin corchetes.
- **Certificado:** digital para todos los asistentes; los del kit lo reciben además impreso.
- **Acceso:** todos entran con su código QR en el teléfono; los del kit reciben además lanyard y credencial física.
- **Hidratación del kit:** un agua o un café por cada día del evento.
- **Estudiantes:** solo estudiantes de medicina, Días 2 y 3.
- **Acceso a los tres días (VIP, ponentes, invitados):** existe, pero se gestiona internamente y no se publica. En la fase 2 se carga desde el panel, no desde el formulario público.
- **Venta de kits:** probablemente cierra unas semanas antes del evento para verificar pagos. Límite de kits y fecha exacta por definir (`cierreVentaKits` y `cupos` en `inscripcion-config.js`).
- **Datos de pago:** Administración los enviará.
- **Obsequios exclusivos de los patrocinantes:** se agregan al kit como noveno beneficio (9 nov). La organización evalúa otras ideas para darle más valor al pase pago (almuerzo, aval, kit patrocinado); la web cambia solo cuando lo decidan.

## Acreditación 2027 (9 nov 2026)

- Se empieza por la app del staff y el pase del participante, con una lista de prueba. Supabase se conecta en la fase 2.
- Vive dentro de `cumbre-web`: `/app/` para participantes y `/staff/` para el staff.
- La experiencia del participante tiene identidad propia, distinta de la web (pedido de Jenny): una credencial con franja de color por día que gira para mostrar el QR.
- El QR lleva un código aleatorio imposible de adivinar, validado contra la lista del día descargada en el teléfono. Reemplaza al "código firmado" porque la lista se necesita igual.
- Se reutilizan la lógica y la librería de escaneo de 2026, pero no el archivo de 2026.
- Detalle en `docs/ACREDITACION-2027.md`.
- **Paleta de la experiencia del participante (9 nov):** fondo claro arena; azul, verde y dorado, un color por sección. Reemplaza al fondo azul tinta de la primera versión. Credencial física solo para el kit; su diseño impreso queda en espera.

## Videos y entrevistas de la Cumbre 2027 (10 nov 2026)

- Pedido de la organización: después de las modalidades de inscripción va una sección con todos los videos de promoción de la Cumbre 2027 y las entrevistas de radio, que también se publican en video en YouTube.
- Se reproducen dentro de la página, igual que las ponencias 2026. Los videos con restricción de edad no se incluyen.
- Se cargan en `assets/js/videos-2027.js`, del más reciente al más antiguo y de seis en seis ("Cargar más videos").
- Mientras no hay videos, la sección muestra un aviso de "muy pronto" y la invitación a suscribirse al canal.
- **"Videos" en el menú (10 nov):** entre Ponencias 2026 y La sede, en las tres páginas y en el menú del teléfono. Como el menú completo ya no cabe en pantallas medianas, por debajo de 1020 px se usa el menú desplegable (antes era por debajo de 760 px).
