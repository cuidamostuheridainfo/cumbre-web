# Pendientes

Última actualización: 14 de octubre de 2026.

## Esperando de otros

| Pendiente | Quién | Bloquea |
| --- | --- | --- |
| Comentarios de Marketing de Medical Shields sobre la portada | Marketing MS → Jenny | Cierre del diseño |
| Fecha y sede de la nueva edición | Daniel | Publicar el sitio definitivo |
| Fotos de la edición 2026 (8 a 12: público, escenario, talleres, stands, registro), en Drive | Jenny | Quitar fotos repetidas (hoy hay solo 3) |
| Confirmar qué organizadores van en la cinta | Daniel / Jenny | Cinta de organizadores |
| Logos de organizadores y aval en buena calidad (PNG transparente o SVG) | Jenny | Cinta de organizadores (los actuales son de 200 px) |
| Plano del local de la sede, en buena resolución | Organización del evento | Sección "La sede y los stands" y plano 3D |
| Paquetes de stand (tamaños, precios), si existen | Comercial | Campo "tipo de stand" del formulario |
| Video de bienvenida | Organización del evento | Sección de video |
| Programa y ponentes de la nueva edición | Comité científico | Secciones Programa y Ponentes |
| Textos: por qué asistir, beneficios para expositores, preguntas frecuentes | Equipo | Contenido definitivo |

## Decisiones por confirmar

- ¿El formulario de asistentes es solo para estudiantes de medicina y enfermería, o también para médicos y enfermeros graduados? (Hoy se interpreta: solo estudiantes.)
- ¿Se entregan certificados de asistencia? Si es así, el formulario de asistentes necesita la cédula.
- ¿Se envía correo de confirmación además del mensaje en pantalla? Requiere definir remitente.
- ¿Quién accede al panel de registros y quién recibe el aviso de nuevos stands?
- Plan Pro en Vercel ($20/mes, uso comercial) o alternativa gratuita (Cloudflare Pages).
- Plan Pro de la organización de Supabase activo antes de publicar formularios (en plan gratuito los proyectos se pausan tras una semana sin actividad).

## Trabajo de Claude, en orden

1. Aplicar los comentarios de Marketing a la portada.
2. Repartir las fotos nuevas de 2026 para que ninguna se repita.
3. Construir el sitio definitivo en Astro + Tailwind en este repo, con el contenido en archivos de datos.
4. Crear el proyecto de Supabase "cumbre" y la función en Vercel para los formularios.
5. Panel de registros con descarga CSV.
6. Plano de la sede en 3D (CSS), cuando exista el plano.
7. Pulido de interacción con las skills de Emil Kowalski.
8. Migración: exportar registros de WordPress, píxeles de Facebook, redirecciones, revisar correo del dominio, cambio de DNS en GoDaddy.

## Otro proyecto pendiente

- Nueva página web de Medical Shields: no iniciada.
