# Pendientes

Última actualización: 11 de noviembre de 2026.

## Esperando de otros

| Pendiente | Quién | Bloquea |
| --- | --- | --- |
| Comentarios sobre la v3 (Marketing, Social media) | Marketing MS → Jenny | Cierre del diseño |
| Ponente de 6 videos sin nombre en el título (ver `docs/VIDEOS-2026.md`) | Organización / Social media | Tarjetas de ponencias |
| Especialidad de cada ponente | Organización | Tarjetas de ponencias y filtros por disciplina |
| Restricción de edad en 4 videos (hoy fuera de la página): solo si el canal la quita se vuelven a incluir | Social media | Opcional |
| Verificar título de Valentina Kube: el canal dice "Dra." y la miniatura dice "Lic." | Organización | Tarjeta destacada 2 |
| Revisión de títulos de ponencias por el comité o la Dra. Milagros (contenido médico) | Comité científico | Publicación |
| Datos de pago del kit: empresa, banco, cuentas, factura, dólares | Administración (vía Social media) | Pago del kit |
| Límite de kits y fecha de cierre de la venta (probable: unas semanas antes) | Organización | Inscripción |
| Talleres precumbre: fecha, hora, lugar, costo y cupos (se anunciarán más adelante) | Organización | Tarjeta e inscripción de talleres |
| Estudiantes de enfermería: ¿perfil Enfermería (Día 1)? Desde el 9 nov "Estudiante" es solo de medicina | Organización | Inscripción |
| · Contacto comercial (vacío en el brochure) | Comercial | Pie y patrocinio |
| Correcciones del brochure (no de la web): espacio libre a $750/m², "vigentes hasta" el 31/12/2026, "Día 1" = 12 de mayo, nombre con "Avanzado" | Social media | Brochure |
| Objetivos y contenidos de cada taller | Organización | Tarjeta de Talleres |
| Hora de inicio del 12 de mayo (la cuenta regresiva asume 8:00 a. m.) | Organización del evento | Cuenta regresiva |
| Fotos de talleres prácticos de 2026 (hoy la tarjeta usa fotos de ponencias) | Jenny | Tarjeta de Talleres |
| Logo de la Cumbre para fondo claro (hoy es una versión recoloreada provisional) | Diseño / Marketing | Encabezado |
| Logos de organizadores y aval en buena calidad (PNG transparente o SVG) | Jenny | Cinta "Organizan y avalan" |
| Video de bienvenida | Organización del evento | Por definir dónde va |
| Programa y ponentes de la nueva edición | Comité científico | Secciones Programa y Ponentes |
| Contenido del brochure y del kit del participante (en evaluación) | Marketing | Contenido |
| Contacto, redes y aviso de privacidad para el pie y el formulario | Jenny / Marketing | Pie y formulario |

| Otras áreas de la salud (farmacia, nutrición, psicología, investigación): ¿Día 1 o Días 2 y 3? Hoy eligen en el formulario | Organización | Inscripción |
| Contenido de la app del asistente: video de bienvenida, programa, plano con ubicaciones | Organización / Comité | App del asistente |

| Credencial física del kit: ¿la diseñamos nosotras? | Organización (consulta de Jenny) | Credenciales impresas |
| Acreditación: conferencias necesarias para el certificado, entrada de personas con pago del kit sin confirmar, cantidad de puertas y mesas | Organización | Acreditación |

| Enlaces de YouTube de los videos de promoción y las entrevistas de radio 2027, a medida que se publiquen (título, invitado, emisora y programa, fecha) | Social media | Sección Videos y entrevistas |

| Ecosistema del grupo: resultado de la encuesta del comité sobre el logo del grupo (propuestas 1 a 4, enviada el 11 nov). Si gana la 2, la 3 o la 4, encuesta corta de la franja del pie (clara o azul marino) | Comité | Video y fase 1 |
| Ecosistema del grupo: video de presentación al cliente, grabado sobre la maqueta `propuesta-ecosistema.html` | Claude con Jenny | Fase 0 del plan del grupo |
| Ecosistema del grupo: si gana una propuesta de Codex, sus archivos originales o vectoriales (en la maqueta son recortes de imágenes) | Jenny | Fase 1 |
| Ecosistema del grupo: dirección web de Ethical Shields AI, enlace de la propuesta corporativa y página "Conoce el grupo" (hoy sin destino en la maqueta) | Jenny / Marketing | Fase 1 |
| Ecosistema del grupo: aprobación del cliente (textos de barra y pie, sello, puentes) y logos de las cuatro marcas en buena calidad | Daniel / Marketing | Fase 1 (aplicar en la Cumbre) |
| Correcciones a la presentación del ecosistema: "Medical Shields" (no "Medical Shield"), nombre y logo nuevos de la Cumbre, teléfono de MS +58 412-2853958 | Social media | Antes de volver a presentarla |
| "Herida" o "lesión" en los textos clínicos, con criterio médico | Dra. Milagros y Social media | Antes de escribir los textos del ecosistema |
| Ethical Shields AI: confirmar el texto de su tarjeta (en la maqueta, "IA financiera para empresas"; alternativa: "Finanzas y operación con IA") | Jenny | Fase 1 |

## Decisiones por confirmar

- **Inscripción de asistentes:** tres perfiles (Estudiantes · Especialistas médicos · Enfermería, paramédicos y rescatistas) y dos modalidades (gratuita y con kit de $40). Página construida el 4 nov con envío simulado.
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
4. Crear con Jenny el proyecto de Supabase "cumbre" (fase 2 de la inscripción: tablas, función con QR firmado, comprobantes) y la app del asistente (bienvenida, programa, plano, conferencias, mi QR), reutilizando la de 2026. Incluye la función en Vercel para los formularios (patrocinio y asistentes).
5. Panel de registros con descarga CSV.
6. Pulido de interacción con las skills de Emil Kowalski.
7. Migración: exportar registros de WordPress, píxeles de Facebook, redirecciones, revisar correo del dominio, cambio de DNS en GoDaddy.

## Otro proyecto pendiente

- Nueva página web de Medical Shields: no iniciada.
