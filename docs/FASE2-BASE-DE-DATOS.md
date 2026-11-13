# Fase 2 · Base de datos (proyecto Supabase "cumbre")

Versión 1 · 13 de noviembre de 2026. Migración escrita y probada en local; **todavía no aplicada en Supabase**.

Complementa `docs/ACREDITACION-2027.md` (diseño general de la fase 2). Si algo de aquí contradice ese documento, vale esto.

## El proyecto

| Dato | Valor |
| --- | --- |
| Proyecto | "cumbre", creado el 13 nov 2026 |
| Organización | Medical Shields, plan Free (la del CRM; proyecto separado) |
| Dirección | https://jjkerycznrxaqkbzvnjh.supabase.co |
| Región | East US (Ohio), us-east-2 |
| Seguridad al crear | API de datos activa; tablas nuevas **no** expuestas automáticamente; RLS automática activada |

**Plan Free:** sin copias de seguridad y con pausa tras una semana sin uso. Mientras siga en Free, solo datos de prueba. Los datos reales entran después de pasar a Pro ($25/mes con "cumbre" como único proyecto activo; $35 si además se reactiva GMS-Comercial; precios de supabase.com/pricing al 13 nov).

## Archivos

| Archivo | Qué es |
| --- | --- |
| `supabase/migrations/20261113000001_esquema_inicial.sql` | La migración: tablas, reglas, permisos y seguridad por filas |
| `supabase/reversiones/20261113000001_esquema_inicial.ROLLBACK.sql` | Deshace la migración (borra tablas y datos; solo con datos de prueba) |
| `supabase/pruebas/simulacion-supabase.sql` | Roles y funciones `auth` mínimos para probar en un Postgres local |
| `supabase/pruebas/pruebas-001.sql` | 67 pruebas de reglas y permisos |
| `supabase/pruebas/resultado-001-13nov.txt` | Resultado: 67 de 67 correctas (Postgres 16) |

## Decisiones del 13 nov (Jenny)

1. **Una inscripción por cédula.** El correo se puede repetir, porque la gente lo escribe mal o pone uno al que no tiene acceso.
2. **Si la cédula ya está inscrita:** la pantalla dice "Ya estás inscrito", muestra el correo registrado a medias (j•••@gmail.com) y un botón "Pedir ayuda" que abre un correo a informacion@cumbrechp.org con el asunto "Ayuda con mi inscripción" y la cédula escrita. Sin WhatsApp. Nunca se muestra el pase en pantalla con solo la cédula.
3. **Solo cédula, V o E.** Sin pasaporte.
4. **Staff de acreditación: una cuenta por persona, 8 cuentas.** Puestos: Puesto 1 a 6 y Mesa de soluciones 1 y 2. Las crea administración (registro libre cerrado), sin segundo factor en la puerta; la persona elige su puesto y el día al empezar, como en 2026. Se desactivan al terminar el evento. Antes del evento, prueba corta con las 8 personas.
5. **Panel de administración con segundo factor obligatorio**, exigido en la base (sesión aal2).
6. **Debajo del QR:** la cédula en grande y el código del pase en pequeño.
7. **Entrada con la cédula escrita a mano:** la app muestra el nombre en grande y pide "Confirmar que es esta persona".
8. **Mejoras de lectura del QR que entran:** QR negro puro sobre blanco con borde blanco; más corrección de errores; botón de linterna en la app del staff. (No entraron: aviso de brillo, lector nativo del teléfono y prueba con teléfonos variados.)
9. **Campos de patrocinio con los nombres de GMS Comercial** (ver abajo).

### Por qué no se leían los QR en 2026

Revisado en el código de 2026 (repositorio `infocumbrechp-beep/Acreditacion-CHP`). El QR llevaba un enlace con nombre, especialidad, correo, pase y días: unos 260 caracteres en un caso típico, 65 cuadritos por lado, 3,4 píxeles por cuadrito en pantalla, en azul oscuro y no en negro. En 2027 el QR lleva solo el código (14 caracteres): 21 cuadritos, 10,5 píxeles por cuadrito. La densidad es la causa más probable; no se puede asegurar sin saber qué teléfonos y qué luz hubo.

### Cómo entraba el staff en 2026

Sin usuario ni contraseña: se elegía un puesto (01 a 10) y el día. No hacía falta clave porque la app no guardaba datos de nadie; todo venía en el QR, y cada teléfono solo conocía sus propios escaneos. En 2027 el teléfono descarga la lista del día con nombres y cédulas, y por eso sí hace falta cuenta.

## Tablas

Todas con seguridad por filas. Ninguna se puede leer ni escribir desde la página pública.

| Tabla | Para qué | Quién escribe |
| --- | --- | --- |
| `configuracion` | Mínimo de charlas por día (5), versión del aviso de privacidad, venta del kit (false) | Servidor |
| `staff` | Cuentas del staff y del panel, con rol `puerta` o `admin` | Servidor (al crear la cuenta) |
| `inscritos` | Una fila por persona inscrita | Servidor; administración corrige datos de contacto |
| `charlas` | Programa de cada día con la clave secreta del QR de la sala | Servidor (vacía hasta tener el programa) |
| `asistencias` | Charlas registradas con el QR de la sala, una por persona y charla | Servidor |
| `registros_puerta` | Entradas, reingresos, kits y envíos a la mesa de soluciones | Servidor (cola del teléfono del staff) |
| `certificados` | Certificados emitidos, folio C27-00001 en adelante | Servidor |
| `solicitudes_patrocinio` | Formulario de patrocinio con seguimiento | Servidor; administración cambia el estado |

### Reglas que la base hace cumplir

**inscritos**
- Código del pase con el formato `K7QM-3XRP-9TWA`, generado por la base con el mismo alfabeto de la app (sin O, 0, I ni 1). Probado con 50.000 códigos: sin repetidos y con reparto parejo.
- Cédula V o E, solo números (5 a 9 dígitos), única. La misma cifra con V y con E son dos cédulas distintas.
- Correo en minúsculas; WhatsApp con + y código de país.
- Perfiles: especialista, enfermería, otras (nutrición y psicología), estudiante (de medicina) e interno.
- Pases: Día 1, Días 2 y 3, y tres días. El pase de tres días y el perfil interno **solo** desde el panel, y lo cargado desde el panel guarda quién lo cargó.
- Desde la web son obligatorios la especialidad, la institución, la ciudad y la aceptación del aviso (fecha y versión).
- Modalidad gratuita por defecto. El kit ya está previsto: si es kit, tiene que tener estado de pago.
- Estado en Mailchimp: pendiente, enviado, error o no aplica, con el motivo del error.
- `idempotency_key`: si el formulario se envía dos veces, no se crean dos inscripciones.

**charlas:** identificador `D2-07` que coincide con el día; el fin después del inicio; clave secreta de 16 caracteres generada sola.

**asistencias:** una sola por persona y charla. Guarda la hora del teléfono y la hora en que llegó.

**registros_puerta:** el identificador lo pone el teléfono, así que subir la cola dos veces no duplica. Se guarda el código leído aunque no exista. Un envío a la mesa de soluciones exige motivo. Marca `manual` cuando la entrada se hizo buscando por cédula o apellido.

**certificados:** uno de cada tipo por persona (Día 1; Días 2 y 3), con folio correlativo.

**solicitudes_patrocinio:** opción de la lista del formulario; el número de stand solo con "Stand" o "Varias opciones"; estados nuevo, contactado, propuesta enviada, confirmado y descartado.

### Quién ve qué

| Quién | Qué puede hacer |
| --- | --- |
| Página pública (anónimo) | Nada sobre las tablas. Todo pasa por las funciones del servidor |
| Staff de puerta | Ver solo su propia fila de staff (para saber su rol). La lista del día y la subida de registros, por sus funciones |
| Administración sin segundo factor | Lo mismo que la puerta: nada más |
| Administración inactiva | Nada |
| Administración con segundo factor | Leer todas las tablas. Corregir nombre, apellido, correo, WhatsApp, especialidad, institución, ciudad y volver a poner el correo en cola. Cambiar el estado de las solicitudes de patrocinio |
| Administración, siempre | **No** puede cambiar código, cédula, pase, modalidad ni consentimiento; no puede borrar inscritos, emitir certificados ni cambiar la configuración directamente |

## Campos de patrocinio iguales a GMS Comercial

Fuente: tabla `casos` de GMS (copia de tipos del 22 sep, proyecto GMS-Comercial-Externo) y las 20 migraciones posteriores aplicadas en GMS-Comercial-Pruebas hasta el 15 oct. Ninguna renombra ni borra columnas; los campos del caso se siguen usando con los mismos nombres en la función que crea casos (migración del 30 sep). No se revisaron las funciones del servidor posteriores al 16 oct, que no cambian tablas.

| Formulario | Columna (igual en GMS) |
| --- | --- |
| Nombre y apellido | `contacto_nombre` |
| Empresa o marca | `contacto_empresa` |
| Correo | `contacto_correo` |
| WhatsApp | `contacto_telefono` |
| Qué te gustaría lograr | `notas` |
| Origen | `origen_lead` = cumbre-2027, `origen_lead_detalle` = web o plano |
| Aviso de privacidad | `consentimiento_aceptado_en`, `consentimiento_version` |
| Doble envío | `idempotency_key` |

Propios de la Cumbre: `opcion_patrocinio` (al pasar a GMS se traduce a su `intencion_comercial`), `estado_seguimiento` (GMS tiene sus propios estados), `stand` y `aviso_enviado_en`. Los nombres de consentimiento se usan también en `inscritos`.

## Cómo se aplica (cuando Jenny lo autorice)

1. En Supabase, proyecto "cumbre": SQL Editor → pegar el contenido de la migración → Run. Se aplica todo o nada (va dentro de una transacción).
2. Comprobar en Table Editor que aparecen las 8 tablas, cada una con RLS activada.
3. Authentication → Sign In / Providers: desactivar "Allow new users to sign up" (registro libre cerrado).
4. Authentication → Multi-Factor: activar TOTP para el panel.

## Pendientes de esta fase

- Funciones del servidor, en el orden de `ACREDITACION-2027.md`: inscribir, mi-pase, panel, staff, charlas y certificado, Mailchimp.
- Cambios en las páginas que dependen de estas decisiones: pantalla "Ya estás inscrito" con el botón "Pedir ayuda"; cédula bajo el QR; confirmación de la entrada manual; QR negro con más corrección de errores; linterna; 8 puestos en la app del staff.
- El formulario de patrocinio no tiene casilla de aceptación del aviso, solo el enlace. Si se agrega, se guarda en `consentimiento_aceptado_en`.
- La lista de especialidades de `inscripcion.html` todavía ofrece Farmacia e Investigación, que no participan desde el 13 nov.
- Antes de pasar la primera solicitud de patrocinio al CRM: confirmar el esquema de `casos` en la base de GMS y la lista de `intencion_comercial`.
- Pase de tres días: si recibe certificado y cuál (por definir).
