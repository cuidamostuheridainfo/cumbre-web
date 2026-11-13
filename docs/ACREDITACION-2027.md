# Acreditación Cumbre 2027

Versión 3 · 13 de noviembre de 2026. Fase 1 construida (con lista de prueba). Fase 2: diseño aprobado por partes el 13 nov y base de datos escrita y probada en local (`docs/FASE2-BASE-DE-DATOS.md`), sin aplicar todavía.

## Piezas y direcciones

| Pieza | Dirección | Para quién |
| --- | --- | --- |
| Inscripción | `/inscripcion.html` | Participantes (se comparte en redes) |
| Pase del participante | `/app/` | Participantes inscritos |
| Acreditación del staff | `/staff/` | Staff en las puertas y mesas |

Todo vive en el repositorio `cumbre-web` (decisión del 9 nov), con la misma dirección de la web.

## Identidad visual del participante

Distinta de la web (pedido de Jenny, 9 nov).

**Paleta elegida: Cielo (12 nov, encuesta del equipo).** Es la de la app; Arena y Tierra quedan en el código solo para comparar. En todas, el fondo es el color más claro.
- **Arena:** la que se describe abajo. Fue la de por defecto mientras se elegía.
- **Opción A, Tierra:** café #5A4636, caramelo #B08A5E, arena #D9CDB8, salvia #A3AD97 y fondo crema #FAF7F1. Secciones: café en Inicio y La sede, caramelo en Mi QR, salvia en Conferencias. Franja del día: salvia en el Día 1, café en los Días 2 y 3, caramelo en el pase de tres días.
- **Opción B, Cielo (elegida):** azul pizarra #4A6A8A, azul claro #A9C1D9, azul pálido #DCE7F2, durazno #E8C9A0 y fondo blanco #FFFFFF. Secciones: azul pizarra en Inicio y La sede, durazno en Mi QR, azul claro en Conferencias. Franja del día: durazno en el Día 1, azul pizarra en los Días 2 y 3, azul claro en el pase de tres días.

Cielo está fijada como `TEMA_INICIAL` en `app-asistente.js` y en `data-tema` de `app/index.html`. Para ver las otras se agrega `?tema=arena` o `?tema=tierra` al enlace; vale solo para esa visita y el teléfono ya no la recuerda.

La descripción de abajo (tipografías, interacción, navegación) vale para las tres paletas; los colores son los de la paleta elegida.

Paleta arena (referencia):

- **Fondo:** arena (#F2EADB) con superficies claras (#FFFDF8).
- **Un color por sección:** azul (#1F4E9C) en Inicio y La sede, dorado (#C9A24A) en Mi QR y verde (#1D7A57) en Conferencias. El color de la sección aparece en la línea superior, el título, los botones y la pestaña activa.
- **Franja del día en la acreditación:** verde para el Día 1, azul para los Días 2 y 3 y dorado para el pase de tres días.
- **Tipografías:** Saira para títulos, nombre y día; Figtree para los textos. La web usa Barlow.
- **Interacción:** la acreditación digital gira para mostrar el QR. Al abrir "Mi QR", la tarjeta gira sola para que en la puerta el QR esté listo; si se toca, vuelve al frente.
- **Navegación:** barra inferior con Inicio, Mi QR, Conferencias y La sede.

**Kit en pausa (13 nov):** mientras `ventaKit` sea `false` en `inscripcion-config.js`, la inscripción es solo gratuita y la app del staff oculta la Mesa de kits, el modo "Entrega de kit" y el contador de kits.

**Credencial física:** solo la reciben quienes compran el kit, en la mesa de kits. Los de inscripción gratuita entran únicamente con el QR del teléfono. El diseño de la credencial impresa queda en espera: Jenny consulta si lo desarrollamos nosotras.

La app del staff usa las mismas tipografías, pero con fondo claro y alto contraste. Es una herramienta de puerta: el resultado aparece en un bloque de color a todo lo ancho.

## El código del QR

- **Qué lleva:** solo un código aleatorio de 12 caracteres, como `K7QM-3XRP-9TWA`. Usa un alfabeto sin O, 0, I ni 1, para que no se confundan al dictarlo. No lleva datos personales.
- **Por qué es seguro:** no se puede adivinar. El staff lo valida contra la lista de inscritos del día, descargada en el teléfono antes de abrir.
- **Cambio sobre el diseño anterior:** reemplaza al "código firmado". La firma solo hacía falta si el staff no tuviera la lista, y la lista igual se necesita para saber "ya entró" y "falta el kit".
- **QR de las conferencias:** cada sala proyecta `CUMBRE27-CONF:D2-07`.
- **Enlace del correo (fase 2):** `/app/?c=CODIGO` abre el pase. La app quita el código de la barra de direcciones apenas lo lee.

## Resultados en la puerta

| Resultado | Color | Cuándo | Qué hace |
| --- | --- | --- | --- |
| Puede entrar | Verde | Pase válido para el día, primera entrada | Registra la entrada sola; avisa si tiene kit por retirar |
| Ya entró hoy | Naranja | Ya hay entrada ese día | Muestra hora y puerta; permite registrar reingreso |
| Día equivocado | Amarillo | El pase no incluye ese día | Envío a la mesa de soluciones |
| Pago del kit sin confirmar | Ámbar | Kit con pago en verificación | Envío a la mesa de soluciones |
| No está en la lista / Código no válido | Rojo | Código desconocido o QR ajeno | Envío a la mesa de soluciones |
| Entregar kit / Kit ya entregado / Sin kit | Verde / Naranja / Gris | Modo "Entrega de kit" | Confirmar entrega una sola vez |

Plan B si el QR no se lee: búsqueda por cédula, apellido o código, que reemplaza la lista impresa de 2026. Cuando la entrada se hace así, la app muestra el nombre en grande y pide "Confirmar que es esta persona" (13 nov).

**Puestos (13 nov):** Puesto 1 a 6 y Mesa de soluciones 1 y 2, con una cuenta por persona (8 cuentas) creada por administración. Reemplaza Puerta 1, 2 y 3 y una Mesa de soluciones.

**Lectura del QR (13 nov):** QR negro puro sobre blanco con borde blanco, más corrección de errores, linterna en la app del staff, y debajo del QR la cédula en grande y el código en pequeño. En 2026 el QR llevaba todos los datos y muchos no se leían; ver `FASE2-BASE-DE-DATOS.md`.

Límite conocido: sin conexión, una puerta no se entera al instante de una entrada registrada en otra. Se cruza cuando se sincroniza (fase 2).

## Archivos

- `assets/js/acred-comun.js`: reglas compartidas (días, pases, perfiles, código, lectura de QR, regla del certificado).
- `assets/js/acred-prueba.js`: **lista de prueba con personas ficticias.** Se elimina en la fase 2.
- `app/index.html`, `assets/js/app-asistente.js`, `assets/css/app-asistente.css`: pase del participante.
- `staff/index.html`, `assets/js/staff.js`, `assets/css/staff.css`: acreditación del staff.
- `assets/js/vendor/html5-qrcode.min.js`: lector de QR, el mismo de 2026.
- Inscripción: al terminar, genera el código, guarda el pase en el teléfono y ofrece "Abrir mi pase".

## Códigos de prueba

| Código | Persona ficticia | Caso |
| --- | --- | --- |
| K7QM-3XRP-9TWA | Ana Rivas | Día 1, gratuita |
| B4HN-8MZD-2KLE | Carlos Méndez | Día 1, kit pagado |
| P9RT-5VWC-6JHU | Lucía Herrera | Día 1, kit con pago en verificación |
| M2XK-7QAB-4NFS | Andrés Salazar | Días 2 y 3, gratuita (día equivocado el Día 1) |
| T6GW-2HEP-8ZRY | Gabriela Torres | Días 2 y 3, kit pagado |
| F3JD-9KCM-5WQX | Diego Páez | Estudiante de medicina, Días 2 y 3 |
| V8LS-4TNA-3PGE | Elena Castro | Pase interno de tres días |
| R5YB-6DFU-7MKC | José Lugo | Otras áreas, Día 1 |

Conferencias de prueba: D1-01, D1-02, D1-03, D2-01, D2-02, D3-01.

## Fase 2: diseño (12 nov 2026, para aprobación de Jenny)

Objetivo: que la inscripción, la app del participante, la app del staff, los correos y el certificado salgan de una sola base, para no repetir los problemas de 2026. Nada de esto está construido todavía.

### Las piezas

| Pieza | Dónde vive | Qué hace |
| --- | --- | --- |
| Base de datos | Supabase, proyecto "cumbre" (organización del CRM, proyecto separado) | Inscritos, pagos, charlas, asistencias, registros de puerta, certificados y solicitudes de patrocinio |
| Comprobantes de pago | Supabase Storage, carpeta privada | Solo los ve quien verifica pagos |
| Funciones | Supabase Edge Functions | Son lo único que escribe en la base. La página pública nunca lee registros |
| Correos | Mailchimp, cuenta de Medical Shields | Confirmación con el enlace al pase, pago confirmado y avisos |
| Panel | Página interna con inicio de sesión | Pagos por verificar, inscritos, patrocinio, descarga CSV |
| Inscripción, app y staff | Las mismas páginas de la fase 1 | Cambian la lista de prueba por las funciones |

### Tablas

- **inscritos:** código (único), nombre, apellido, tipo y número de cédula (únicos: una inscripción por persona), correo, WhatsApp, perfil, especialidad, institución, ciudad, cómo se enteró, pase (`dia-1`, `dias-2-3` o `tres-dias`), modalidad (gratuita o kit), estado del pago (en verificación, confirmado o rechazado), autorización opcional para patrocinantes, aceptación de privacidad con fecha, origen (web o panel), fecha de inscripción y estado en Mailchimp.
- **pagos:** inscrito, método, banco, referencia, fecha del pago, monto en bolívares, archivo del comprobante, estado, quién lo revisó, cuándo y nota.
- **charlas:** identificador (por ejemplo `D2-07`), día, título, ponente, sala, hora de inicio y de fin, y una clave secreta que va dentro del QR de la sala.
- **asistencias:** inscrito, charla, hora del escaneo y hora en que llegó a la base. Una sola por persona y charla.
- **registros de puerta:** entrada, reingreso, kit entregado o envío a la mesa de soluciones, con día, puesto, hora y quién lo registró. Cada registro lleva un identificador hecho en el teléfono, para que subirlo dos veces no lo duplique.
- **certificados:** inscrito, tipo (Día 1 o Días 2 y 3), folio y fecha de emisión.
- **solicitudes de patrocinio:** nombre, empresa, correo, WhatsApp, opción y objetivo, con los mismos nombres de campo que GMS Comercial para pasarlas al CRM.
- **staff:** usuarios con su rol: puerta, verificación de pagos o administración.

### Funciones

1. **inscribir:** valida los datos, filtra spam y revisa si la cédula ya está inscrita (si lo está, no crea otra: reenvía el enlace del pase al correo registrado). Genera el código en el servidor, guarda el comprobante, pasa a la persona a Mailchimp y devuelve el código para abrir el pase.
2. **mi-pase:** con el código devuelve el pase (nombre, días, modalidad, estado del pago), las charlas registradas por día y los certificados disponibles. El código es la llave: 12 caracteres al azar, imposible de adivinar.
3. **registrar-charla:** recibe el código y el QR de la sala. Revisa que la clave del QR sea la de esa charla, que la charla sea de un día del pase de la persona y que el escaneo sea dentro del horario de la charla. Devuelve cuántas lleva ese día.
4. **certificado:** revisa la regla y, si se cumple, entrega el folio y los datos. La app arma el PDF en el teléfono y se descarga en el momento.
5. **staff-lista:** con sesión del staff, descarga la lista del día para trabajar sin internet.
6. **staff-subir:** sube la cola de registros de puerta y devuelve los de las otras puertas desde la última vez.
7. **patrocinio:** guarda la solicitud de patrocinio y avisa al equipo comercial.
8. **revisar-pago:** desde el panel, confirma o rechaza un pago. Al confirmar, Mailchimp envía el correo de pago confirmado y el QR del kit queda activo.

### Recorrido del participante

1. Se inscribe en `inscripcion.html`. Si eligió kit, carga el comprobante.
2. Ve en pantalla su código y "Abrir mi pase", y recibe el correo de confirmación con el enlace `/app/?c=CODIGO`.
3. Con kit, el pase dice "pago en verificación" hasta que alguien lo confirme en el panel; ahí recibe el segundo correo.
4. El día del evento muestra su QR en la puerta.
5. En cada charla escanea el QR de la sala. La app muestra cuántas lleva ese día y cuántas le faltan.
6. Al cumplir el mínimo, aparece "Descargar certificado". Si cambia de teléfono, abre el enlace del correo y lo recupera.

### Regla del certificado

- Certificado del Día 1: el mínimo de charlas el Día 1.
- Certificado de los Días 2 y 3: el mínimo el Día 2 **y** el mínimo el Día 3.
- El mínimo (5 por día) queda en un solo lugar de la configuración; se cambia sin tocar el código.
- Pase de tres días (internos): [por definir si reciben certificado y cuál].
- El certificado lleva un folio. Propuesta: una página `/verificar` donde cualquiera escribe el folio y ve si el certificado es válido.

### QR de las charlas

Hoy el QR de la sala dice solo `CUMBRE27-CONF:D2-07`, y cualquiera podría fabricarlo. En la fase 2 lleva además la clave secreta de la charla (`CUMBRE27-CONF:D2-07:clave`), y la función solo acepta escaneos dentro del horario de esa charla (con unos minutos de margen). Así una foto del QR que circule por WhatsApp no sirve fuera de la sala ni fuera de la hora.

Límite conocido: si la persona no tiene internet al escanear, la app guarda el escaneo y lo sube después. La hora del escaneo la pone el teléfono, que se puede adelantar o atrasar. Es un riesgo bajo y se acepta.

### Mailchimp (cuenta de Medical Shields)

- **Propuesta:** la audiencia que ya usa Medical Shields, con la etiqueta "Cumbre 2027", en vez de una audiencia nueva. Así el contacto queda en la base del grupo y no se cobra dos veces la misma persona.
- **Campos:** nombre, apellido, código, enlace al pase, pase, modalidad y estado del pago.
- **Correos automáticos:** al recibir la etiqueta de inscrito, la confirmación con el enlace; al confirmarse el pago, el correo de pago confirmado; antes del evento, recordatorios por segmento (Día 1 o Días 2 y 3).
- **La llave de Mailchimp** la escribe Jenny directamente en los secretos de Supabase. No pasa por este chat ni por el repositorio.

### Seguridad y datos personales

- Ninguna tabla se puede leer desde la página pública. El participante solo ve su propio pase, con su código.
- Los comprobantes y las cédulas solo los ven el staff y quien verifica pagos, según su rol.
- El texto de privacidad dice, en palabras simples, que los datos los usa el Grupo Medical Shields, y la autorización para patrocinantes sigue siendo opcional.
- Desde el panel se descarga todo en CSV, para no depender de nadie.

### Orden de construcción

1. Crear con Jenny el proyecto "cumbre" en Supabase (hecho el 13 nov) y las tablas (migración escrita y probada en local el 13 nov; falta aplicarla).
2. Inscripción y pase reales: funciones `inscribir` y `mi-pase`, conectadas a `inscripcion.html` y `/app/`.
3. Panel con verificación de pagos.
4. Staff con inicio de sesión, lista del día y subida de registros.
5. QR de las charlas y certificado.
6. Mailchimp.
7. Prueba completa con personas ficticias y, al terminar, borrar los datos de prueba.

### Lo que falta para terminarla

- Resuelto el 13 nov: 5 conferencias por día; las solicitudes de patrocinio llegan a informacion@cumbrechp.org (Marisol y Génesis); la verificación de pagos queda para cuando se lance el kit.
- Programa con el horario de cada charla, para generar sus QR.
- Diseño del certificado: modelo de 2026, firmas y logos.
- Plan de Mailchimp de Medical Shields: confirmar que permite correos automáticos.
- Plan Pro de la organización de Supabase: revisado el 13 nov ($25/mes con "cumbre" como único proyecto activo). El proyecto "cumbre" se creó en Free; se pasa a Pro antes de cargar datos reales.
- Filtro antispam: propuesta, Cloudflare Turnstile (gratuito).

## Fases

1. **Construida (9 nov).** Staff completo y pase del participante, con lista de prueba. Nada se envía.
2. **Supabase.** Lista real, función que genera el código y valida duplicados por cédula, panel de pagos, inicio de sesión del staff, subida de la cola de registros y sincronización entre puertas, enlace por correo.
3. **Contenido.** Video de bienvenida, programa 2027 con los códigos de cada sala, plano con ubicaciones, expositores y regla del certificado confirmada.

## Certificado (12 nov)

- Un certificado para el Día 1 y uno para los Días 2 y 3; el de los Días 2 y 3 exige el mínimo en cada uno de los dos días. Se descarga desde la app apenas la persona completa el mínimo de charlas registradas con el QR de cada sala.
- Mínimo: 5 conferencias por día, el mismo número de 2026 (confirmado el 13 nov). Hoy la app cuenta un total de 5 sin separar por día; se ajusta en la fase 2.
- Las asistencias se guardan también en Supabase, para recuperar el certificado si la persona cambia de teléfono.
- Propuesta: el QR de cada sala solo es válido durante el horario de su charla.

## Por confirmar con la organización

- Conferencias para el certificado: 5, como en 2026 (13 nov).
- Si una persona con pago del kit sin confirmar puede entrar como inscripción gratuita.
- Puertas y mesas: no se pregunta (13 nov). Se deja la lista actual y se ajusta en la configuración si hace falta.
