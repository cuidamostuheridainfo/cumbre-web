# Decisiones vigentes

Lo que está aquí ya se decidió. No se reabre salvo que Jenny lo pida o aparezca un motivo nuevo, y en ese caso se anota aquí la decisión que lo reemplaza.

## Plataforma y técnica (14 oct 2026)

- **Código propio, no Lovable**, por autonomía.
- **Stack del sitio definitivo:** Astro + Tailwind, páginas estáticas. Ponentes, agenda, patrocinantes y stands en archivos de datos, separados del diseño.
- **Publicación definitiva:** Vercel, con publicación automática en cada commit. El plan gratuito no permite uso comercial; queda por confirmar Pro o la alternativa Cloudflare Pages.
- **Publicación provisional:** GitHub Pages en este repo público, con `noindex`.
- **Repositorio:** `cumbre-web` en la cuenta cuidamostuheridainfo. Commits con GitHub Desktop.
- **Base de datos:** Supabase, en la misma organización del CRM de Medical Shields, pero en un **proyecto separado** ("cumbre"). Motivo: el formulario es público y su llave no debe tener acceso al CRM.
- **Formularios:** ~~envían a una función en Vercel~~ (reemplazado el 12 nov: funciones de Supabase, ver "Fase 2"). Una función valida, filtra spam y revisa duplicados; solo esa función escribe en la base. La página pública nunca lee los registros.
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

- **Nombre oficial (reemplazado el 9 y el 10 nov, ver abajo):** Cumbre Internacional para el Cuidado Avanzado de Heridas y Piel (2da edición). "2da edición" va como etiqueta al lado de "HERIDAS Y PIEL".
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
- **Paleta de la experiencia del participante:** ~~fondo claro arena; azul, verde y dorado (9 nov)~~. Reemplazada el 12 nov: **Cielo**, elegida por encuesta del equipo (azul pizarra en Inicio y La sede, durazno en Mi QR, azul claro en Conferencias; fondo blanco). Detalle en `docs/ACREDITACION-2027.md`. Credencial física solo para el kit; su diseño impreso queda en espera.

## Videos y entrevistas de la Cumbre 2027 (10 nov 2026)

- Pedido de la organización: después de las modalidades de inscripción va una sección con todos los videos de promoción de la Cumbre 2027 y las entrevistas de radio, que también se publican en video en YouTube.
- Se reproducen dentro de la página, igual que las ponencias 2026. Los videos con restricción de edad no se incluyen.
- Se cargan en `assets/js/videos-2027.js`, del más reciente al más antiguo y de seis en seis ("Cargar más videos").
- Mientras no hay videos, la sección muestra un aviso de "muy pronto" y la invitación a suscribirse al canal.
- **"Videos" en el menú (10 nov):** entre Ponencias 2026 y La sede, en las tres páginas y en el menú del teléfono. Como el menú completo ya no cabe en pantallas medianas, por debajo de 1020 px se usa el menú desplegable (antes era por debajo de 760 px).

## Nuevo nombre y logo (10 nov 2026)

- **Nombre oficial, elegido por el cliente:** "II Cumbre Internacional para el Cuidado Avanzado de Heridas, Piel y Longevidad". La línea "Edición Especial: Protocolos de actuación y medicina de emergencia en desastres" queda igual.
- **Dónde se cambió:** encabezado de la portada, títulos de las pestañas, textos alternativos de los logos, pie de las tres páginas, textos de patrocinio que nombran la Cumbre, y la app del participante.
- **Dónde no se cambió:**
  - el nombre del canal de YouTube ("Comunidad Cumbre Heridas y Piel"), porque es el nombre real del canal;
  - los textos que describen el tema ("el cuidado avanzado de heridas y piel"), porque no son el nombre.
- **Logo nuevo hecho por nosotras, a pedido del cliente:**
  - "II CUMBRE INTERNACIONAL / PARA EL CUIDADO AVANZADO DE / HERIDAS, PIEL / Y LONGEVIDAD", con el mismo símbolo.
  - Tipografía IBM Plex Sans Condensed Italic, la que más se parece a la del logo original.
  - Archivos: `assets/img/logo-cumbre-27-oscuro.png` y `logo-cumbre-27-blanco.png`. Son imágenes, sirven para la web pero no para imprenta; para impresos hace falta la versión vectorial de Diseño.
  - Los logos anteriores quedan en la carpeta, sin uso.
- **También hay que actualizar fuera de la web:** brochure, certificados, credenciales y redes.

## Grupo Medical Shields: un solo ecosistema web (10 nov 2026)

- **Objetivo del cliente:** que las webs de Medical Shields, Cuidamos tu Herida, la Cumbre y Ethical Shields se vean como un solo grupo que trabaja unido. Cada sitio mantiene su página y su dominio; las marcas se incluyen unas en otras.
- **Plan de trabajo y registro compartido:** documento "Grupo Medical Shields: un solo ecosistema web" (https://claude.ai/artifact/C9587Udj2jDw2fovZcsVv1). Es la referencia común de los chats de trabajo de cada marca (Cumbre, CTH, Medical Shields y Ethical Shields). Se lee al empezar y se anota en su "Registro de cambios" todo lo que afecte a las otras marcas.
- **Decisiones:**
  - nombre visible "Grupo Medical Shields";
  - cuatro marcas: Medical Shields, Cuidamos tu Herida, Cumbre y Ethical Shields (Ethical Shields entra el 10 nov, como en la presentación de Social media a Daniel; su web propia también se reestructura);
  - Ethical Shields es el área de implementación de inteligencia artificial en empresas, con IRIS y los demás productos de servicios, IA y apps (11 nov). En el ecosistema se llama **Ethical Shields AI** y su línea destaca GesPro (ver "Maqueta del ecosistema", abajo);
  - lema del grupo: "Ecosistema de Salud y Bienestar Integral";
  - barra de arriba y pie iguales en las cuatro webs;
  - prioridad del mensaje: la fuerza del grupo ante empresas y aseguradoras.
- **Componentes comunes previstos:** barra del grupo arriba, pie del grupo, sección "Un solo ecosistema", puentes en contexto (por ejemplo, desde Medical Shields "Nuestra unidad de cuidados" hacia CTH) y el sello del grupo.
- **Sello del grupo (diseño nuestro, propuesta):** el comité no quedó convencido; desde el 11 nov es una de las cuatro propuestas del logo del grupo (ver "Maqueta del ecosistema", abajo). Hasta la decisión, las piezas del grupo no se aplican en ningún sitio.
  - cuatro apósitos en forma de anillo, encadenados en rombo, uno por marca: azul Medical Shields, verde Cuidamos tu Herida, dorado Cumbre y turquesa a azul marino Ethical Shields;
  - con degradado y brillo como los logos;
  - luce mejor en fondo oscuro o arena; la versión clara lleva un borde fino;
  - la versión de tres anillos entrelazados queda como alternativa, por si el grupo vuelve a tres marcas.
- **Archivos del sello** en `assets/img/grupo/`, todos vectoriales:
  - `grupo-ms-icono`, `grupo-ms-firma` y `grupo-ms-sello`, cada uno con su versión `-claro` y `-oscuro` (cuatro anillos; la firma lleva el lema en la segunda línea);
  - los mismos con terminación `-3marcas`: la alternativa de tres anillos.
- **Nada de esto está aplicado todavía en la web de la Cumbre.** Primero se presenta al cliente en un video, con una maqueta (fase 0); después se aplica en la Cumbre (fase 1), en CTH (fase 2) y en Medical Shields y Ethical Shields (fase 3).
- **Datos confirmados (10 nov):** teléfono de Medical Shields +58 412-2853958. El término "herida" o "lesión" en los textos clínicos lo deciden la Dra. Milagros y Social media, con criterio médico.

## Maqueta del ecosistema (11 nov 2026)

- **Logo del grupo sin definir.** El comité no quedó convencido con los anillos. Jenny preparó con Codex otras opciones (carpeta "Prueba de logos para Grupo"). El comité vota entre cuatro propuestas por encuesta de WhatsApp (enviada el 11 nov):
  1. Anillos encadenados (nuestra, `assets/img/grupo/`);
  2. Firma tipográfica (solo el nombre, con raya azul);
  3. Conexión esencial (dos piezas que forman un cuadrado);
  4. Evolución de origen (a partir de la cruz de Medical Shields).
- **Maqueta aparte**, para no alterar lo construido: `propuesta-ecosistema.html`, con `noindex` y sin enlace en el menú. La portada (`index.html`) no cambia.
- **Panel para el comité y el video:** abajo a la izquierda. Cambia la propuesta y, en la 2 a la 4, la franja del pie (clara o azul marino). Teclas 1 a 4, F y H. Se puede abrir directo con `?p=3&franja=azul&panel=no`.
- **Cada propuesta lleva su barra y su pie:**
  - la 1: barra con las cuatro marcas por nombre; pie con la firma del grupo y una línea por marca;
  - la 2 a la 4 (diseño de Codex): barra "Parte del Grupo Medical Shields"; pie en dos franjas (la de la Cumbre y la común del grupo).
- **Comunes a las cuatro:** desplegable "Conoce el grupo" con las cuatro marcas y "Estás aquí", y sección "Un solo ecosistema" con cuatro tarjetas del mismo peso y una franja para empresas y aseguradoras. Título de la sección en la Cumbre: "Conocimiento que conecta con la práctica".
- **Logos reales de las cuatro marcas** (pedido de Jenny), en `assets/img/ecosistema/`: Medical Shields de medicalshields.com, Cuidamos tu Herida del repositorio cth-web-propuesta, la Cumbre de este repositorio y Ethical Shields AI de su web (marca y nombre). Las marcas de las propuestas 3 y 4 son recortes de las imágenes de Codex: sirven para la web, no para imprenta.
- **Ethical Shields AI:** se incorpora al ecosistema con ese nombre y con el mismo peso que las otras marcas. Su línea destaca **GesPro** (panel de control financiero con IA), porque IRIS y el CRM todavía no están listos para comercializar. Tarjeta: "IA financiera para empresas" (por confirmar). Pie: "Consultoría de negocio y finanzas con inteligencia artificial. GesPro, su panel de control financiero."
- **Cuidamos tu Herida:** su línea incluye la fisiatría avanzada: "Atención médica de heridas y piel y fisiatría avanzada, en sede, a domicilio y por telemedicina."

## Longevidad en los textos y más fotos de 2026 (12 nov 2026)

- **Longevidad:** el cuadro de "Nuestro enfoque" pasa a "Cuidado de la piel y longevidad", y el título de patrocinio a "Conecta tu marca con quienes trabajan por el cuidado avanzado de heridas, piel y longevidad".
- **"Así se vivió la Cumbre 2026" (reemplazado el mismo día, pedido de Jenny):** el video y **cinco cuadros**: dos al lado del video y tres debajo. Entre los cinco rotan **todas** las fotos de las carpetas `sponsor` y `variadas`, más la del equipo con la camioneta de CTH: 29 fotos, cada una en un solo cuadro, para que no parezca que hay pocas fotos. Cada cuadro cambia cada 4,5 s, con un desfase entre cuadros para que no cambien a la vez. En teléfono, el quinto cuadro va a lo ancho, y del tercero al quinto siguen detrás de "Ver más fotos".
- **Fotos repetidas, aceptadas por Jenny:** `_88A2667`, `_88A2749` e `IMG_7739` también están en las tarjetas de Modalidades, y las de `sponsor` también rotan en "Conecta tu marca".
- **Foto de "Conecta tu marca" (pedido de Jenny):** rota entre todas las fotos de la carpeta `sponsor` y la del equipo con la camioneta de CTH (19 fotos, una cada 4,5 s, con fundido). Cada foto se descarga justo antes de mostrarse, para no hacer más pesada la página. Las fotos se repiten en "Así se vivió la Cumbre" por decisión de Jenny. En teléfono esta foto no se muestra, como antes.

## Fase 2: inscripción, correos y certificado (12 nov 2026)

Pedido de Jenny, para no repetir los problemas de 2026 (inscripción en WordPress y certificados que meses después la gente decía no haber recibido).

- **La base de inscripción vive en Supabase** (proyecto "cumbre"), no en WordPress. La inscripción, la app del participante y la app del staff leen la misma base: al inscribirse, la persona ya existe para la app y para la puerta.
- **Correos con Mailchimp, cuenta de Medical Shields:** cada inscrito pasa a Mailchimp para la confirmación (con el enlace a su pase) y los avisos.
- **Funciones en Supabase:** las funciones que reciben los formularios (inscripción y patrocinio) y que pasan los datos a Mailchimp viven en Supabase, no en Vercel. Así la fase 2 no depende de elegir dónde se publica el sitio (Vercel Pro o Cloudflare Pages).
- **Certificado automático:** en cada charla la persona escanea el QR de la sala con su app; cuando completa el mínimo, el certificado se descarga directamente desde la app, sin esperar a que se envíe. Mínimo: ~~entre 3 y 5 charlas por día~~ 5 conferencias por día (13 nov, ver "Respuestas de la organización a la planilla").
- **Un certificado por modalidad:** uno para el Día 1 y uno para los Días 2 y 3 (un solo certificado que cubre los dos días). Para el de los Días 2 y 3 hay que cumplir el mínimo **en cada uno** de los dos días (confirmado por Jenny).
- Los registros de 2026 ya se descargaron de WordPress.

## Respuestas de la organización a la planilla (13 nov 2026)

Fuente: planilla "Cumbre-2027-datos-pendientes.xlsx" respondida, y aclaraciones de Jenny del mismo día. Reemplaza lo que contradiga las secciones anteriores. **Aplicado en la web el 13 nov** (portada, inscripción, ponencias, privacidad, maqueta del ecosistema, app y staff).

- **Inscripción solo gratuita por ahora.** El kit no se vende ni se paga en la web hasta que se lance oficialmente; entonces se habilitan los datos de pago (segunda etapa). Mientras tanto, el kit se muestra con una cinta "Próximamente", sin precio ni pago. **Sin su contenido** (13 nov, pedido de Jenny): la organización también lo está definiendo. La tarjeta dice solo "Kit de la Cumbre" y "Pronto estará disponible esta gran sorpresa."
- **Fase 2 sin pagos por ahora:** la tabla de pagos, los comprobantes, la función revisar-pago y el panel de pagos se dejan para cuando se lance el kit.
- **Estudiantes de enfermería:** se inscriben como Enfermería, Día 1.
- **Otras áreas de la salud:** solo nutrición y psicología, en los Días 2 y 3. Farmacia no participa. Investigación no entra por ahora.
- **Talleres precumbre:** sin fechas; se definirán más adelante.
- **Horarios de cada día:** por definir (la cuenta regresiva sigue suponiendo 8:00 a. m.).
- **Contacto:** correo informacion@cumbrechp.org · WhatsApp +58 414-2577408 (el mismo del botón flotante).
- **Redes (se mantienen las que existen):** Instagram y TikTok @cumbreinternacionalchp; YouTube "Comunidad Cumbre Heridas y Piel" (@ComunidadCumbreHeridasyPiel); LinkedIn https://www.linkedin.com/company/cumbre-internacional-para-el-cuidado-avanzado-de-heridas-y-piel-2026. El canal de YouTube de CTH no se enlaza desde la Cumbre.
- **Avisos de patrocinio y acceso a los inscritos:** Marisol y Génesis; los avisos llegan a informacion@cumbrechp.org.
- **Mínimo de conferencias para el certificado:** el mismo de 2026, 5 conferencias (Jenny, 13 nov). Se cuenta por día (confirmado por Jenny): 5 el Día 1 para su certificado, y 5 el Día 2 y 5 el Día 3 para el certificado de los Días 2 y 3.
- **Aviso de privacidad:** el mismo de 2026, el de cumbrechp.org/politica-de-privacidad, con el nombre nuevo de la Cumbre. Página propia `politica-de-privacidad.html`. Solo se cambió el nombre y dos errores de escritura ("estás" por "estas" y "comprometido" por "comprometida").
- **Pie de página:** las redes van como botones de texto (Instagram, TikTok, YouTube, LinkedIn), no como íconos de las marcas.
- **Kit desactivado con un interruptor:** `ventaKit: false` en `assets/js/inscripcion-config.js` desactiva el kit en la inscripción y oculta la Mesa de kits, el modo "Entrega de kit" y su contador en la app del staff. La ventana de la portada se cambió a mano; la versión con precio y botón está en el commit 0c15631.
- **Puertas y mesas:** no se le pregunta a la organización. La app del staff deja la lista actual (Puerta 1, 2 y 3, Mesa de soluciones) y se ajusta en la configuración si el día del evento hay otras.

## Plano interactivo del área de exhibición (13 nov 2026)

- **El plano se redibujó** con la identidad de la Cumbre, a pedido de Jenny ("mantener espacios y ubicaciones, solo mejorar el diseño"). Las posiciones salen del PDF vectorial de Producciones 24 (`cumbrefinal copia.pdf`): los 142 stands, la sala, el VIP, los cafés, el stand de Medical Shields y el contorno del local están en el mismo lugar. Los baños se ubicaron a mano desde la imagen, porque en el PDF no son vectoriales.
- **Archivos:** `assets/img/plano-sede.svg` (el dibujo, también es el enlace "Ampliar plano"), `assets/js/plano.js` (lo hace interactivo) y `herramientas/generar_plano.py` (vuelve a generar el SVG si Producciones 24 manda un plano nuevo). La imagen anterior, `plano-sede-v2.jpg`, queda en el repositorio sin uso.
- **Zonas (respuestas de Jenny):** el área lima es un patio del C.C. Líder que viene de la feria de comida (va como zona del centro comercial); el área celeste junto a Camerinos es parte de los camerinos; el rectángulo morado es el stand de Medical Shields (con su nombre, sin logo); los stands 116 a 122 son de comida y bebidas; "Backing firmas" se deja con ese nombre.
- **Colores (corrección de Jenny, 13 nov):** nada de azules oscuros, porque no dejaban ver las líneas. Piso del local en arena (#F2EADB); sala de conferencias en azul claro (#BFE0F7); área VIP en el verde claro del logo de Cuidamos tu Herida (#84B853); camerinos en el azul de la parte de abajo de la cruz de Medical Shields (#0086FF); stands blancos con borde azul marino; comida y bebidas en rojo; stand de Medical Shields en azul marino con su nombre al lado. Textos más grandes.
- **Se mantienen las líneas del local** (entradas, salidas, baños, escaleras, rotondas), tomadas del PDF y dibujadas en gris pardo. Se quitaron las flechas rojas, los extintores y los logos de las empresas.
- **Logos de los organizadores en el plano (13 nov):** Producciones 24, Espacio, Cuidamos tu Herida y Medical Shields, los mismos del plano original, tomados del PDF (Producciones 24 en vector; los otros, en imagen).
- **Orden del plano (corrección de Jenny, 13 nov):** a la izquierda solo los logos de los organizadores ("Organizan"); a la derecha una leyenda corta con Stand 2 × 2 m, Comida y bebidas y Café (las demás zonas llevan su nombre en el mapa). El plano se ve más grande (hasta 1240 px) y los stands más pequeños, para que no se vean montados.
- **Stand de Medical Shields:** blanco con borde azul y el logo de Medical Shields adentro (en vez del bloque oscuro).
- **Patio del C.C. Líder:** solo el color gris, sin texto (Jenny, 13 nov).
- **Plano aprobado por Jenny el 13 nov** (revisado como imagen sola, `plano-solo.png`, antes de colocarlo en la página).
- **"Backing firmas":** queda solo el de la Entrada. El PDF tenía un segundo "Backing firma" al centro, arriba de la sala; se quitó a pedido de Jenny porque se veía duplicado.
- **Interacción:** al tocar un stand aparece su número y "Consultar disponibilidad", que abre el formulario de patrocinio con "Stand o espacio de exposición" elegido y "Me interesa el stand N del plano." escrito. **No muestra disponibilidad** (decisión vigente: no se publica hasta que Comercial lo autorice).
- **En teléfono** el plano se desliza hacia los lados y empieza mostrando la zona de stands.

## Longevidad en su propio cuadro y opciones en pestañas (13 nov 2026)

- **Longevidad en su propio cuadro (pedido de la organización vía Jenny):** "Nuestro enfoque" pasa a cinco cuadros: Manejo integral de heridas, Cuidado de la piel, **Longevidad** (azul #0A6CFF, letra blanca), Emergencias y desastres, y Visión multidisciplinaria. Reemplaza el cuadro "Cuidado de la piel y longevidad" del 12 nov. En PC van los cinco en una fila; en tablet y teléfono, de dos en dos, con Visión multidisciplinaria a lo ancho.
- **"Elige cómo quieres participar" en pestañas (pedido de Jenny, en PC y teléfono):** cuatro pestañas, Niveles de patrocinio · Espacios de exposición · Otras opciones de marca · Complementos. Al tocar una, se ven solo las tarjetas de ese grupo, siempre abiertas (ya no son plegables). Se abre en Niveles de patrocinio. En teléfono las pestañas van en dos filas de dos. Así el teléfono no tiene un desplazamiento interminable.

## Fase 2: base de datos, inscripción y acreditación (13 nov 2026)

Detalle completo en `docs/FASE2-BASE-DE-DATOS.md`. Reemplaza lo que contradiga las secciones anteriores y `ESTRUCTURA.md`.

- **Proyecto Supabase "cumbre"** creado el 13 nov en la organización Medical Shields, plan Free, East US (Ohio). Se pasa a Pro antes de publicar formularios o cargar datos reales. Los tres proyectos del CRM siguen pausados y no se borran.
- **Primera migración sin pagos:** 8 tablas (configuración, staff, inscritos, charlas, asistencias, registros de puerta, certificados y solicitudes de patrocinio). Pagos, comprobantes y talleres quedan para después. Ninguna tabla se puede leer ni escribir desde la página pública; solo escriben las funciones del servidor.
- **Una inscripción por cédula.** El correo se puede repetir, porque la gente lo escribe mal o pone uno al que no tiene acceso (experiencia de 2026). Reemplaza "el mismo correo no se registra dos veces".
- **Cédula repetida:** "Ya estás inscrito", el correo registrado a medias y el botón "Pedir ayuda", que abre un correo a informacion@cumbrechp.org con la cédula escrita. Sin WhatsApp. Nunca se muestra el pase con solo la cédula. Administración corrige el correo desde el panel y reenvía el pase.
- **Solo cédula, V o E.** Sin pasaporte.
- **Staff de acreditación: una cuenta por persona, 8 cuentas** (Puesto 1 a 6 y Mesa de soluciones 1 y 2), creadas por administración, sin registro libre y sin segundo factor en la puerta. Se elige el puesto y el día al empezar, como en 2026. Reemplaza la lista Puerta 1, 2 y 3 y una Mesa de soluciones.
- **Panel de administración con segundo factor obligatorio**, exigido en la base.
- **Bajo el QR:** cédula en grande y código del pase en pequeño. **Entrada con la cédula escrita a mano:** la app pide confirmar que el nombre es el de la persona.
- **Lectura del QR:** QR negro sobre blanco con borde, más corrección de errores y linterna en la app del staff. Motivo: en 2026 el QR llevaba todos los datos (unos 260 caracteres, cuadritos de 3,4 píxeles en pantalla) y muchos no se leían; en 2027 lleva solo el código (cuadritos de 10,5 píxeles).
- **Solicitudes de patrocinio con los nombres de campo de GMS Comercial** (tabla `casos`): `contacto_nombre`, `contacto_empresa`, `contacto_correo`, `contacto_telefono`, `notas`, `origen_lead`, `origen_lead_detalle`, `consentimiento_aceptado_en`, `consentimiento_version` e `idempotency_key`. La opción de patrocinio y el estado de seguimiento son propios de la Cumbre.
