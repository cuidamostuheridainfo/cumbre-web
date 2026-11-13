# II Cumbre Internacional para el Cuidado Avanzado de Heridas, Piel y Longevidad · Sitio web

Repositorio del sitio web de la Cumbre, organizada por Medical Shields y Cuidamos tu Herida (CTH). Reemplazará al sitio actual en WordPress (cumbrechp.org).

## Ritual de inicio (obligatorio en cada sesión nueva)

Antes de proponer o tocar algo, leer en este orden:

1. `CLAUDE.md` (este archivo): qué es el proyecto y cómo se trabaja.
2. `docs/ESTADO.md`: en qué fase estamos, qué existe y dónde está.
3. `docs/PENDIENTES.md`: qué falta, quién lo tiene y qué está bloqueado.
4. `docs/DECISIONES-VIGENTES.md`: lo que ya se decidió y no se vuelve a discutir sin motivo.
5. `docs/ESTRUCTURA.md`: solo si la sesión toca contenido, formularios, base de datos o construcción.
6. `docs/FLUJO-DISENO.md`: solo si la sesión cambia el diseño (lienzo, imágenes o `index.html`).
7. `docs/FASE2-BASE-DE-DATOS.md` y `docs/ACREDITACION-2027.md`: solo si la sesión toca Supabase, la inscripción real o la acreditación.

Después de leer, decir en dos o tres líneas en qué punto estamos y cuál es el siguiente paso, y esperar confirmación antes de cambiar archivos.

## Cómo se trabaja

- **Idioma:** español neutro, entendible en Venezuela. Tuteo siempre, nunca voseo.
- **Commits:** los hace Jenny con GitHub Desktop. Claude prepara los archivos y dice el mensaje de commit sugerido; no hace push.
- **Antes de cambiar `index.html`:** juntar primero todas las observaciones de Jenny y aplicarlas juntas, cuando ella lo indique.
- **Ejecución en vivo:** un paso a la vez. Claude lleva la lista de pendientes; no la repite completa en cada mensaje.
- **Incertidumbre:** decirla explícitamente; no rellenar con suposiciones.
- **Datos:** no inventar cifras ni nombres. Lo que falta va entre corchetes, por ejemplo [FECHA], [SEDE].
- **Al cerrar una sesión con cambios:** actualizar `docs/ESTADO.md`, `docs/PENDIENTES.md` y, si hubo decisiones, `docs/DECISIONES-VIGENTES.md`.

## Datos que no cambian

- **Nombre oficial (desde el 10 nov 2026):** II Cumbre Internacional para el Cuidado Avanzado de Heridas, Piel y Longevidad. Edición Especial: Protocolos de actuación y medicina de emergencia en desastres. Logo nuevo: `assets/img/logo-cumbre-27-oscuro.png` y `logo-cumbre-27-blanco.png`.
- **Cifras confirmadas de la edición 2026:** más de 4.000 asistentes, 3 días, ponentes de 4 países (Venezuela, Argentina, España y Canadá). Mayo de 2026, Caracas.
- **2da edición (según informe de Marketing del 27 oct):** 12 al 14 de mayo de 2027, Centro Comercial Líder, Caracas. Previsión oficial (4 nov): más de 5.000 asistentes (3.000 especialistas médicos y 2.000 de enfermería).

## Mapa del repositorio

| Ruta | Qué es |
| --- | --- |
| `index.html` | Portada de la propuesta (v3), publicada en GitHub Pages. Se edita directamente. |
| `assets/img/` | Imágenes: fotos 2026 (`hero-*`, `evento-*`), plano, logos, cintas del anillo, fondos. |
| `assets/video/` | Video del dron en bucle para "Nuestro enfoque". |
| `ponencias.html` | Página interna "Ponencias 2026". |
| `assets/css/sitio.css`, `assets/js/` | Estilos y comportamiento compartidos; `assets/js/ponencias.js` es la lista de videos. |
| `docs/` | Documentación del proyecto (ritual de inicio). |
| `supabase/` | Base de datos de la fase 2 (proyecto Supabase "cumbre"): `migrations/`, `reversiones/` y `pruebas/`. Ver `docs/FASE2-BASE-DE-DATOS.md`. Una migración se aplica solo con autorización de Jenny. |
| `herramientas/build_index.py` | Script de la v2 (lienzo → `index.html`). Ya no se usa desde la v3. |
| `herramientas/generar_plano.py` | Genera `assets/img/plano-sede.svg` desde el PDF de Producciones 24. |

Cuando empiece la construcción definitiva en Astro, la propuesta se reemplaza en este mismo repositorio.
