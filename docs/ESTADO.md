# Estado del proyecto

Última actualización: 27 de octubre de 2026.

## Fase actual

**Segunda propuesta de diseño en revisión.** El 27 de octubre se aplicaron los comentarios de Marketing (informe del 27 oct) y se reemplazó la portada en GitHub Pages por la versión **"Claro B · Patrocinio"**: fondo claro, fotos reales de 2026 y una sección completa de expositores y patrocinadores con formulario. Se envía a Marketing para una segunda ronda.

La construcción del sitio definitivo (Astro, formularios reales, base de datos, panel) **no ha empezado**. Espera el visto bueno de esta propuesta.

El formulario de patrocinio de esta propuesta **no guarda datos**: valida los campos y simula el envío para mostrar el recorrido completo.

## Qué existe y dónde

| Recurso | Dónde | Nota |
| --- | --- | --- |
| Propuesta publicada | https://cuidamostuheridainfo.github.io/cumbre-web/ | GitHub Pages, repo público, con `noindex`. |
| Código de la propuesta | `index.html` + `assets/img/` + `assets/video/` | Generado desde el artboard `Claro-B-Patrocinio` del lienzo. |
| Versión anterior (fondo oscuro) | Historial de git, commit `5a6e76b` y anteriores | Reemplazada el 27 oct. |
| Lienzo de diseño | https://claude.ai/artifact/Y3fY9ZsVsxjCkVx7hy3QpX | Privado de Jenny. Artboards: `Main` (oscuro, v1), `Claro-A`, `Claro-B`, `Claro-C`, `Claro-B-Patrocinio` (**vigente**). |
| Documento de estructura | https://claude.ai/code/artifact/960f03ad-7931-4096-b44d-ec686a8a1d73 | El contenido vigente está en `docs/ESTRUCTURA.md`. |
| Fotos originales 2026 | PC de Jenny, `Documents\Cumbre-fotos-web` (dia-1, dia-2, dia 3, sponsor, head, drone) | Copia web optimizada en `assets/img/evento-*.jpg` y `hero-*.jpg`. |
| Plano del área de exhibición | `assets/img/plano-sede-v2.jpg` (27 oct, numeración corregida, stands 1 a 142). Original en PDF vectorial de Producciones 24 ("cumbrefinal copia"). | Reemplaza al plano de WhatsApp del 22 oct. |
| Informe de cambios de Marketing | `Documents\Cumbre-fotos-web\Informe de Cambios Pagina Web - Cumbre Internacional 2027 (1).pdf` | Fuente de los cambios del 27 oct. |
| Sitio actual | https://cumbrechp.org | WordPress. Activo hasta el cambio de DNS. |
| Repositorio | github.com/cuidamostuheridainfo/cumbre-web | Clonado en `C:\Users\Jenny Lopez\Documents\GitHub\cumbre-web\cumbre-web`. |

## Qué tiene hoy la portada (en orden)

1. **Cinta superior fija** (azul marino): "Expositores y patrocinadores · Haz que tu marca forme parte de la Cumbre 2027… · Ver oportunidades →".
2. **Encabezado claro:** 6 fotos de 2026 que rotan cada 6 s detrás de un velo blanco; logo, menú, "Regístrate ahora". Nombre oficial con "HERIDAS Y PIEL" escribiéndose letra por letra y la etiqueta "2da edición" al lado; "Heridas y protocolos de actuación en desastres"; "12 al 14 de mayo de 2027 · Centro Comercial Líder, Caracas"; botones "Regístrate ahora" (azul marino) y "Solicitar propuesta de patrocinio" (rojo); cuenta regresiva al 12 de mayo de 2027, 8:00 a. m.; anillo del logo girando.
3. **Franja de cifras:** +4.000 asistentes en la 1ra edición · +2.000 asistentes por día previstos en la 2da edición · 3 días de conferencias · 3 talleres especializados.
4. **Nuestro enfoque:** video del dron (24 s en bucle, sin sonido) y tres ejes: Manejo integral de heridas, Cuidado de la piel, Emergencias y desastres.
5. **Participa · Escoge tu participación en la Cumbre:** tarjetas Día 1 (Enfermería y rescate), Días 2 y 3 (Especialistas médicos) y Talleres, cada una con 9 fotos reales que rotan.
6. **Expositores y patrocinadores** (sección propia): presentación, beneficios, opciones de participación (Espacios de exposición / Activaciones y presencia de marca), fotos de stands 2026, plano del área de exhibición y formulario "Da el primer paso para participar con tu marca".
7. **Organizan y avalan:** cinta de logos en movimiento.
8. **Pie azul marino:** logo, menú y copyright.
9. **WhatsApp flotante** (abajo a la derecha): +58 414-2577408 con el mensaje "Hola, deseo información sobre los stands para la Cumbre".

Se adapta a celular. Una etiqueta fija abajo a la izquierda dice "Propuesta de diseño · borrador para revisión".

## Cómo se publica un cambio

1. Editar el artboard en el lienzo y regenerar `index.html` (Claude), o editar `index.html` directamente.
2. Jenny hace commit en GitHub Desktop y Push origin.
3. GitHub Pages actualiza en uno o dos minutos. Si alguien ve la versión anterior, recargar la página.

## Relación con otros proyectos

- **Supabase:** los formularios irán a un proyecto nuevo dentro de la misma organización donde vive el CRM de Medical Shields (GMS Comercial), separado del proyecto del CRM.
- **Web de Medical Shields:** proyecto aparte, todavía no iniciado.
