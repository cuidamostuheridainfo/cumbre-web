# Pendientes

Última actualización: 13 de noviembre de 2026 (tarde: fase 2, base de datos).

**12 nov:** se envió a la organización la planilla "Cumbre-2027-datos-pendientes.xlsx" (24 datos: pagos y venta de kits, horarios, inscripción, talleres, acreditación, contacto y avisos). Cubre las filas marcadas con (planilla 12 nov). **13 nov: respondida en parte** (ver "Respuestas de la organización a la planilla" en DECISIONES-VIGENTES); se quitaron las filas ya resueltas. La planilla no va en el repositorio porque es público y tendrá datos bancarios.

## Esperando de otros

| Pendiente | Quién | Bloquea |
| --- | --- | --- |
| Comentarios sobre la v3 (Marketing, Social media) | Marketing MS → Jenny | Cierre del diseño |
| Ponente de 6 videos sin nombre en el título (ver `docs/VIDEOS-2026.md`) | Organización / Social media | Tarjetas de ponencias |
| Especialidad de cada ponente | Organización | Tarjetas de ponencias y filtros por disciplina |
| Restricción de edad en 4 videos (hoy fuera de la página): solo si el canal la quita se vuelven a incluir | Social media | Opcional |
| Verificar título de Valentina Kube: el canal dice "Dra." y la miniatura dice "Lic." | Organización | Tarjeta destacada 2 |
| Revisión de títulos de ponencias por el comité o la Dra. Milagros (contenido médico) | Comité científico | Publicación |
| Kit y pagos: diferidos hasta que se lance el kit (datos de pago, límite y cierre de la venta, credencial física). Mientras tanto, inscripción solo gratuita | Organización | Segunda etapa del kit |
| (planilla 12 nov) Talleres precumbre: fecha, hora, lugar, costo y cupos (se anunciarán más adelante) | Organización | Tarjeta e inscripción de talleres |
| Correcciones del brochure (no de la web): espacio libre a $750/m², "vigentes hasta" el 31/12/2026, "Día 1" = 12 de mayo, nombre con "Avanzado" | Social media | Brochure |
| (planilla 12 nov) Objetivos y contenidos de cada taller | Organización | Tarjeta de Talleres |
| (planilla 12 nov) Hora de inicio del 12 de mayo (la cuenta regresiva asume 8:00 a. m.) | Organización del evento | Cuenta regresiva |
| Fotos de talleres prácticos de 2026 (hoy la tarjeta usa fotos de ponencias) | Jenny | Tarjeta de Talleres |
| Logo de la Cumbre para fondo claro (hoy es una versión recoloreada provisional) | Diseño / Marketing | Encabezado |
| Logos de organizadores y aval en buena calidad (PNG transparente o SVG) | Jenny | Cinta "Organizan y avalan" |
| Video de bienvenida | Organización del evento | Por definir dónde va |
| Programa y ponentes de la nueva edición | Comité científico | Secciones Programa y Ponentes |
| Contenido del brochure y del kit del participante (en evaluación) | Marketing | Contenido |

| Contenido de la app del asistente: video de bienvenida, programa, plano con ubicaciones | Organización / Comité | App del asistente |

| Migración: acceso al administrador de WordPress (registros de los formularios de contacto y proveedor; las inscripciones de 2026 ya se descargaron), cuál de los dos píxeles de Meta usan las campañas y quién maneja Google Site Kit. Ver `docs/MIGRACION-CUMBRECHP.md` | Jenny / Marketing | Migración |

| Enlaces de YouTube de los videos de promoción y las entrevistas de radio 2027, a medida que se publiquen (título, invitado, emisora y programa, fecha) | Social media | Sección Videos y entrevistas |

| Ecosistema del grupo: decisión del comité sobre el logo del grupo (propuestas 1 a 4, enviada el 11 nov) y el pie. Al 13 nov sigue sin decisión (la encuesta del 12 nov fue de la paleta de la app, ganó Cielo). Si gana la 2, la 3 o la 4, encuesta corta de la franja del pie (clara o azul marino) | Comité | Video y fase 1 |
| Ecosistema del grupo: video de presentación al cliente, grabado sobre la maqueta `propuesta-ecosistema.html` | Claude con Jenny | Fase 0 del plan del grupo |
| Ecosistema del grupo: si gana una propuesta de Codex, sus archivos originales o vectoriales (en la maqueta son recortes de imágenes) | Jenny | Fase 1 |
| Ecosistema del grupo: dirección web de Ethical Shields AI, enlace de la propuesta corporativa y página "Conoce el grupo" (hoy sin destino en la maqueta) | Jenny / Marketing | Fase 1 |
| Ecosistema del grupo: aprobación del cliente (textos de barra y pie, sello, puentes) y logos de las cuatro marcas en buena calidad | Daniel / Marketing | Fase 1 (aplicar en la Cumbre) |
| Correcciones a la presentación del ecosistema: "Medical Shields" (no "Medical Shield"), nombre y logo nuevos de la Cumbre, teléfono de MS +58 412-2853958 | Social media | Antes de volver a presentarla |
| "Herida" o "lesión" en los textos clínicos, con criterio médico | Dra. Milagros y Social media | Antes de escribir los textos del ecosistema |
| Ethical Shields AI: confirmar el texto de su tarjeta (en la maqueta, "IA financiera para empresas"; alternativa: "Finanzas y operación con IA") | Jenny | Fase 1 |
| Pase de tres días (VIP, ponentes, invitados): si recibe certificado y cuál | Organización | Regla del certificado |

## Decisiones por confirmar

- **Pagos del kit:** entidad que recibe, métodos (Pago Móvil, transferencia), moneda y tasa BCV, quién verifica, factura, cupos y política de reembolso. Diferido hasta que se lance el kit (13 nov); hoy la inscripción es solo gratuita. Los sponsors pagan fuera de la web con propuesta comercial.
- **Correo de confirmación:** decidido que sale por Mailchimp, cuenta de Medical Shields (12 nov). Falta definir el remitente que verá la persona (nombre y dirección).
- Plan Pro en Vercel ($20/mes, uso comercial) o alternativa gratuita (Cloudflare Pages). Desde el 12 nov ya no bloquea los formularios (funciones en Supabase); solo decide dónde se publica el sitio.
- Plan Pro de la organización de Supabase activo antes de publicar formularios y antes de cargar datos reales (el plan Free no tiene copias de seguridad). Costo revisado el 13 nov en supabase.com/pricing: $25/mes con "cumbre" como único proyecto activo; $35 si además se reactiva GMS-Comercial; cada proyecto adicional desde $10.

## Trabajo de Claude, en orden

1. Aplicar los comentarios de Marketing a la segunda propuesta.
2. Secciones que faltan en el diseño: ponentes, programa, talleres y contenido del brochure.
3. Construir el sitio definitivo en Astro + Tailwind en este repo, con el contenido en archivos de datos.
4. Fase 2 en Supabase. **Hecho el 13 nov:** plan y costo revisados con Jenny, proyecto "cumbre" creado en Free, migración de la base escrita y probada en local (`docs/FASE2-BASE-DE-DATOS.md`). Migración aplicada el 13 nov y registro libre de cuentas cerrado. **Sigue:** segundo factor (TOTP) para administración; funciones `inscribir` y `mi-pase` conectadas a `inscripcion.html` y `/app/`; panel; staff con 8 cuentas; QR de las charlas y certificado; Mailchimp; app del asistente (bienvenida, programa, plano, conferencias, mi QR). Sin pagos hasta que se lance el kit.
   - Cambios de páginas decididos el 13 nov (se aplican al construir la fase 2): pantalla "Ya estás inscrito" con el correo a medias y el botón "Pedir ayuda" por correo; cédula grande y código pequeño debajo del QR; QR negro sobre blanco, con borde y más corrección de errores; linterna en la app del staff; confirmación del nombre cuando la entrada se hace con la cédula escrita; puestos del staff: Puesto 1 a 6 y Mesa de soluciones 1 y 2.
   - `inscripcion.html` todavía ofrece Farmacia e Investigación en la lista de especialidades, aunque no participan desde el 13 nov. Se corrige junto con los cambios de la fase 2.
   - El formulario de patrocinio no tiene casilla de aceptación del aviso de privacidad, solo el enlace. Si se quiere guardar la aceptación, hay que agregarla.
5. Panel de registros con descarga CSV.
6. Pulido de interacción con las skills de Emil Kowalski.
7. Migración: exportar registros de WordPress, píxeles de Facebook, redirecciones, revisar correo del dominio, cambio de DNS en GoDaddy. Inventario del sitio actual y redirecciones propuestas en `docs/MIGRACION-CUMBRECHP.md` (12 nov).

## Opcional, ofrecido y no pedido

- Agregar un número de versión a los enlaces de `sitio.css` y `sitio.js` (por ejemplo `sitio.js?v=20261113`) para que, después de un push, nadie tenga que recargar con Ctrl+F5 para ver los cambios.

## Otro proyecto pendiente

- Nueva página web de Medical Shields: no iniciada.
