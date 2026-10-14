# Cumbre Internacional para el Cuidado Avanzado de Heridas y Piel · Sitio web

Repositorio del sitio web de la Cumbre, organizada por Medical Shields y Cuidamos tu Herida (CTH). Reemplazará al sitio actual en WordPress (cumbrechp.org).

## Ritual de inicio (obligatorio en cada sesión nueva)

Antes de proponer o tocar algo, leer en este orden:

1. `CLAUDE.md` (este archivo): qué es el proyecto y cómo se trabaja.
2. `docs/ESTADO.md`: en qué fase estamos, qué existe y dónde está.
3. `docs/PENDIENTES.md`: qué falta, quién lo tiene y qué está bloqueado.
4. `docs/DECISIONES-VIGENTES.md`: lo que ya se decidió y no se vuelve a discutir sin motivo.
5. `docs/ESTRUCTURA.md`: solo si la sesión toca contenido, formularios, base de datos o construcción.

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

- **Nombre oficial:** Cumbre Internacional para el Cuidado Avanzado de Heridas y Piel (con "Avanzado", igual que el logo).
- **Cifras confirmadas de la edición 2026:** más de 4.000 asistentes, 3 días, ponentes de 4 países (Venezuela, Argentina, España y Canadá). Mayo de 2026, Caracas.

## Mapa del repositorio

| Ruta | Qué es |
| --- | --- |
| `index.html` | Propuesta provisional de la portada, publicada en GitHub Pages. HTML, CSS y JS en un solo archivo. |
| `assets/img/` | Imágenes de la propuesta: fotos 2026, logo, cintas del anillo, logos de organizadores y aval. |
| `docs/` | Documentación del proyecto (ritual de inicio). |

Cuando empiece la construcción definitiva en Astro, la propuesta se reemplaza en este mismo repositorio.
