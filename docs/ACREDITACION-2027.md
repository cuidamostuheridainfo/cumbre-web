# Acreditación Cumbre 2027

Versión 1 · 9 de noviembre de 2026. Fase 1 construida (con lista de prueba).

## Piezas y direcciones

| Pieza | Dirección | Para quién |
| --- | --- | --- |
| Inscripción | `/inscripcion.html` | Participantes (se comparte en redes) |
| Pase del participante | `/app/` | Participantes inscritos |
| Acreditación del staff | `/staff/` | Staff en las puertas y mesas |

Todo vive en el repositorio `cumbre-web` (decisión del 9 nov), con la misma dirección de la web.

## Identidad visual del participante

Distinta de la web (pedido de Jenny, 9 nov).

**Paletas en comparación (9 nov):** la app tiene tres paletas intercambiables. En todas, el fondo es el color más claro.
- **Arena:** la que se describe abajo. Es la de por defecto mientras se elige.
- **Opción A, Tierra:** café #5A4636, caramelo #B08A5E, arena #D9CDB8, salvia #A3AD97 y fondo crema #FAF7F1. Secciones: café en Inicio y La sede, caramelo en Mi QR, salvia en Conferencias. Franja del día: salvia en el Día 1, café en los Días 2 y 3, caramelo en el pase de tres días.
- **Opción B, Cielo:** azul pizarra #4A6A8A, azul claro #A9C1D9, azul pálido #DCE7F2, durazno #E8C9A0 y fondo blanco #FFFFFF. Secciones: azul pizarra en Inicio y La sede, durazno en Mi QR, azul claro en Conferencias. Franja del día: durazno en el Día 1, azul pizarra en los Días 2 y 3, azul claro en el pase de tres días.

Para verlas se agrega `?tema=tierra`, `?tema=cielo` o `?tema=arena` al enlace de la app; el teléfono recuerda la última elegida. Cuando Jenny elija, se fija como `TEMA_INICIAL` en `app-asistente.js` y se pueden quitar las otras.

Paleta arena:

- **Fondo:** arena (#F2EADB) con superficies claras (#FFFDF8).
- **Un color por sección:** azul (#1F4E9C) en Inicio y La sede, dorado (#C9A24A) en Mi QR y verde (#1D7A57) en Conferencias. El color de la sección aparece en la línea superior, el título, los botones y la pestaña activa.
- **Franja del día en la acreditación:** verde para el Día 1, azul para los Días 2 y 3 y dorado para el pase de tres días.
- **Tipografías:** Saira para títulos, nombre y día; Figtree para los textos. La web usa Barlow.
- **Interacción:** la acreditación digital gira para mostrar el QR. Al abrir "Mi QR", la tarjeta gira sola para que en la puerta el QR esté listo; si se toca, vuelve al frente.
- **Navegación:** barra inferior con Inicio, Mi QR, Conferencias y La sede.

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

Plan B si el QR no se lee: búsqueda por cédula, apellido o código, que reemplaza la lista impresa de 2026.

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

## Fases

1. **Construida (9 nov).** Staff completo y pase del participante, con lista de prueba. Nada se envía.
2. **Supabase.** Lista real, función que genera el código y valida duplicados por cédula, panel de pagos, inicio de sesión del staff, subida de la cola de registros y sincronización entre puertas, enlace por correo.
3. **Contenido.** Video de bienvenida, programa 2027 con los códigos de cada sala, plano con ubicaciones, expositores y regla del certificado confirmada.

## Por confirmar con la organización

- Cuántas conferencias hacen falta para el certificado (en 2026 eran 5).
- Si una persona con pago del kit sin confirmar puede entrar como inscripción gratuita.
- Cuántas puertas y mesas habrá (hoy: Puerta 1, 2 y 3, Mesa de kits y Mesa de soluciones).
