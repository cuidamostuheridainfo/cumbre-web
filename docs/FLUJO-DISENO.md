# Flujo de diseño: del lienzo a `index.html`

Última actualización: 27 de octubre de 2026.

Leer solo si la sesión va a cambiar el diseño de la propuesta.

## Dónde está la fuente del diseño

- **Lienzo de Claude:** https://claude.ai/artifact/Y3fY9ZsVsxjCkVx7hy3QpX (privado de Jenny).
- **Artboard vigente:** `project/Claro-B-Patrocinio.dc.html`. Es la fuente de `index.html`.
- **Otros artboards (solo referencia):** `Main` (v1 oscura), `Claro-A`, `Claro-B` (igual a la vigente pero con el bloque de sponsors anterior), `Claro-C`, y `Artboard-e94t` (creado por Jenny a mano; no tocar sin preguntar).
- En el lienzo, las imágenes se referencian como `/_blob/<id>`. En el repo son archivos de `assets/`.

## Cómo se publica un cambio de diseño

1. Leer el artboard actual del lienzo (puede tener ediciones de Jenny hechas a mano).
2. Hacer el cambio en el artboard y publicarlo en el lienzo para que Jenny lo vea.
3. Cuando Jenny lo apruebe, regenerar `index.html` con `herramientas/build_index.py` (ver sus instrucciones arriba del archivo).
4. Revisar en navegador (computadora y 390 px de ancho): sin desplazamiento lateral, sin imágenes faltantes, formulario funcionando.
5. Copiar los archivos a la carpeta del repo en la PC de Jenny. Ella hace commit y push con GitHub Desktop.

Lección del 27 oct: al copiar a la PC, si un archivo con el mismo nombre ya se envió antes en la sesión, la copia puede repetir la versión vieja. Enviar desde una carpeta o nombre nuevo y comprobar con `md5sum` en la PC.

## Imágenes: qué es cada archivo

| Archivo en `assets/` | Qué es | Original |
| --- | --- | --- |
| `img/hero-88A3359.jpg`, `hero-88A3236.jpg`, `hero-88A2431.jpg`, `hero-88A3276.jpg`, `hero-88A2394.jpg`, `hero-88A3297.jpg` | Fotos del encabezado, en ese orden de rotación | PC: `Cumbre-fotos-web\head` |
| `img/evento-img-7671.jpg` … `evento-88a2774.jpg` (9) | Tarjeta Día 1 | `dia-1` |
| `img/evento-88a3253.jpg` … `evento-88a3319.jpg` (9) | Tarjeta Días 2 y 3 | `dia 3` (en el Drive se llamaba "DIA 2") |
| `img/evento-88a3482.jpg`, `evento-img-7771.jpg`, etc. (9) | Tarjeta Talleres (provisional: son ponencias) | `dia-2`, `dia 3`, `dia-1` |
| `img/evento-img-78xx.jpg`, `evento-img-7900.jpg`, `evento-88a2516.jpg` | Fotos de stands de expositores 2026 | `sponsor` |
| `img/plano-sede-v2.jpg` | Plano del área de exhibición, stands 1 a 142 | PDF de Producciones 24 ("cumbrefinal copia"), 27 oct |
| `video/dron-loop.mp4` + `img/dron-poster.jpg` | Video de "Nuestro enfoque": minuto 1:04 a 1:28 del dron, sin sonido, 4 MB | `drone\drone 2 cumbre.mp4` |
| `img/logo-cumbre-oscuro.png` | Logo para fondo claro (recoloreado provisional) | Logo original del Drive |
| `img/logo-cumbre-blanco.png`, `cinta-*.png`, `anillo.png` | Logo blanco y las tres cintas del anillo que gira | Logo original |
| `img/org-*.png`, `aval-sociedad-venezolana-cirugia.png` | Cinta "Organizan y avalan" | Logos de 200 px; pedir mejores |
| `img/panal-claro-suave.svg` | Fondo de "Participa" | Hecho a mano |
| `img/plano-sede.jpg`, `foto-88A*.jpg`, `fondo-gasa.svg`, `fondo-silicona.svg`, `logo-cumbre-original.png` | Ya no se usan en la portada | Se pueden borrar |

Las fotos web se generan desde los originales (HEIC o JPG) a 1800 px de ancho máximo, calidad 80; las del encabezado a 2200 px, calidad 76.

## Detalles técnicos que importan

- **Rotación del encabezado:** un solo reloj en JavaScript cambia la foto cada 6 s. No volver a la animación CSS con retrasos: dejaba huecos en blanco y desigualaba los tiempos. La primera foto está también como fondo fijo de respaldo.
- **Cinta superior fija:** usa `position: sticky`. Por eso el contenedor principal usa `overflow-x: clip` y no `overflow: hidden`, que la desactiva. Las secciones tienen `scroll-margin-top: 84px` para que la cinta no tape su inicio.
- **Celular (hasta 760 px):** títulos de sección a 30 px, subtítulos a 26 px, párrafos a 16 px, cifras a 34 px.
- **Formulario de patrocinio:** validación en el navegador y envío simulado de 1,2 s. Al construir el definitivo, el envío va a la función de Vercel y la confirmación solo aparece si el guardado fue exitoso.
- **WhatsApp:** `https://wa.me/584142577408` con el mensaje "Hola, deseo información sobre los stands para la Cumbre".
