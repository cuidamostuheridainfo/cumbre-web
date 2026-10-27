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

