# Pendientes

Última actualización: 27 de octubre de 2026.

## Esperando de otros

| Pendiente | Quién | Bloquea |
| --- | --- | --- |
| Comentarios de Marketing sobre la segunda propuesta (Claro B · Patrocinio) | Marketing MS → Jenny | Cierre del diseño |
| ¿Activaciones va en "Espacios de exposición" o en "Activaciones y presencia de marca"? (hoy en la segunda) | Comité de la Cumbre | Opciones de patrocinio |
| Plano del área de exhibición en alta resolución, con la numeración corregida (salta de 141 a 144; Marketing pide 142) | Organización del evento / Producciones 24 | Sección del plano |
| ¿Se publican las cantidades disponibles (3 coffee breaks, 10 microcápsulas, 20 publicidades)? | Comercial | Opciones de patrocinio (hoy no se muestran) |
| ¿Se publican precios de stands y patrocinio? (la tabla del brochure los tiene) | Comercial / Daniel | Opciones de patrocinio (hoy sin precios) |
| Fecha de cierre de la venta anticipada, si existe | Comercial | Mensaje de urgencia |
| Hora de inicio del 12 de mayo (la cuenta regresiva asume 8:00 a. m.) | Organización del evento | Cuenta regresiva |
| Fechas y horarios de los talleres | Comité científico | Tarjeta de Talleres |
| Fotos de talleres prácticos de 2026 (hoy la tarjeta usa fotos de ponencias) | Jenny | Tarjeta de Talleres |
| Logo de la Cumbre para fondo claro (hoy es una versión recoloreada provisional) | Diseño / Marketing | Encabezado |
| Logos de organizadores y aval en buena calidad (PNG transparente o SVG) | Jenny | Cinta "Organizan y avalan" |
| Video de bienvenida | Organización del evento | Por definir dónde va |
| Programa y ponentes de la nueva edición | Comité científico | Secciones Programa y Ponentes |
| Contenido del brochure y del kit del participante (en evaluación) | Marketing | Contenido |
| Contacto, redes y aviso de privacidad para el pie y el formulario | Jenny / Marketing | Pie y formulario |

## Decisiones por confirmar

- **Inscripción de asistentes:** tres perfiles (Estudiantes · Especialistas médicos · Enfermería, paramédicos y rescatistas) y dos modalidades (gratuita y con kit de $25).
- **Pagos (kit y sponsors):** entidad que recibe, métodos (Pago Móvil, transferencia), moneda y tasa BCV, quién verifica, factura del kit, cupos, política de reembolso. Los sponsors pagan fuera de la web con propuesta comercial.
- ¿Se entregan certificados de asistencia? Si es así, el formulario de asistentes necesita la cédula.
- ¿Se envía correo de confirmación además del mensaje en pantalla? Requiere definir remitente.
- ¿Quién accede al panel de registros y quién recibe el aviso de nuevas solicitudes de patrocinio?
- Plan Pro en Vercel ($20/mes, uso comercial) o alternativa gratuita (Cloudflare Pages).
- Plan Pro de la organización de Supabase activo antes de publicar formularios.

## Trabajo de Claude, en orden

1. Aplicar los comentarios de Marketing a la segunda propuesta.
2. Secciones que faltan en el diseño: ponentes, programa, talleres y contenido del brochure.
3. Construir el sitio definitivo en Astro + Tailwind en este repo, con el contenido en archivos de datos.
4. Crear el proyecto de Supabase "cumbre" y la función en Vercel para los formularios (patrocinio y asistentes).
5. Panel de registros con descarga CSV.
6. Pulido de interacción con las skills de Emil Kowalski.
7. Migración: exportar registros de WordPress, píxeles de Facebook, redirecciones, revisar correo del dominio, cambio de DNS en GoDaddy.

## Otro proyecto pendiente

- Nueva página web de Medical Shields: no iniciada.
