# Estado del proyecto

Última actualización: 14 de octubre de 2026.

## Fase actual

**Propuesta de portada en revisión.** El 14 de octubre se publicó la portada provisional en GitHub Pages y se envió al departamento de Marketing de Medical Shields para que den sus comentarios (por correo o WhatsApp, a Jenny).

La construcción del sitio definitivo (Astro, formularios, base de datos, panel) **no ha empezado**. Espera el cierre del diseño y los datos de la nueva edición.

## Qué existe y dónde

| Recurso | Dónde | Nota |
| --- | --- | --- |
| Propuesta publicada | https://cuidamostuheridainfo.github.io/cumbre-web/ | GitHub Pages, repo público, con `noindex` para no aparecer en Google. |
| Código de la propuesta | `index.html` + `assets/img/` en este repo | Fuente vigente de la portada. |
| Lienzo de diseño | https://claude.ai/artifact/Y3fY9ZsVsxjCkVx7hy3QpX | Misma portada en el lienzo de Claude (privado de Jenny). Se mantuvo sincronizado con `index.html` hasta el 14 oct. |
| Documento de estructura | https://claude.ai/code/artifact/960f03ad-7931-4096-b44d-ec686a8a1d73 | Versión colaborativa; el contenido vigente está en `docs/ESTRUCTURA.md`. |
| Logo original | Drive de infocumbrechp@gmail.com: https://drive.google.com/file/d/1DEoi97ksRyvtfmTBqj_F8--_kaV-_lEG/view | PNG 1664×576, versión blanca para fondo oscuro. Copia en `assets/img/logo-cumbre-original.png`. |
| Sitio actual | https://cumbrechp.org | WordPress con Elementor. Sigue activo hasta el cambio de DNS. |
| Repositorio | github.com/cuidamostuheridainfo/cumbre-web | Clonado en `C:\Users\Jenny Lopez\Documents\GitHub\cumbre-web`. |

## Qué tiene hoy la portada (en orden)

1. **Encabezado:** menú (Programa, Ponentes, La sede, Expón tu marca, Inscríbete), etiqueta "Nueva edición · [FECHA] · [SEDE]", nombre oficial con animación letra por letra, botones "Inscríbete como estudiante" y "Reserva tu stand", cuenta regresiva [00], y el anillo del logo girando.
2. **Cifras 2026:** +4.000 asistentes, 3 días, 4 países, [N] ponentes. Conteo animado al hacer scroll.
3. **Cinta de organizadores:** Medical Shields, Cuidamos tu Herida, C.C. Líder, Producciones 24, Espacio, y aval de la Sociedad Venezolana de Cirugía.
4. **Video de bienvenida:** espacio reservado, "Disponible pronto".
5. **Participa:** dos tarjetas, Estudiantes y Stand comercial.
6. **Programa:** pestañas por día y sesiones de ejemplo.
7. **Ponentes:** cuatro fichas de ejemplo con marco de colores del logo.
8. **La sede y los stands:** espacio para el plano (futuro plano 3D), leyenda de zonas y recuadro para expositores.
9. **Así se vivió la edición 2026:** tres fotos.
10. **Pie:** íconos de Instagram, YouTube y TikTok, Política de Privacidad, copyright con año automático.

Se adapta a celular (menú reducido, títulos y fichas ajustados). Una etiqueta fija abajo a la derecha dice "Propuesta de diseño · borrador para revisión".

## Cómo se publica un cambio

1. Editar `index.html` (o archivos en `assets/img/`).
2. Jenny hace commit en GitHub Desktop y Push origin.
3. GitHub Pages actualiza en uno o dos minutos. Si alguien ve la versión anterior, recargar la página.

## Relación con otros proyectos

- **Supabase:** los formularios irán a un proyecto nuevo dentro de la misma organización donde vive el CRM de Medical Shields (GMS Comercial), separado del proyecto del CRM.
- **Web de Medical Shields:** proyecto aparte, todavía no iniciado.
