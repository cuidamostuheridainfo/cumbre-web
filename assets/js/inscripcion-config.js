/*
  Configuración de la inscripción de asistentes — Cumbre 2027.
  Todo lo que la organización todavía no ha confirmado vive aquí: al recibir la respuesta se cambia
  en este archivo y la página se ajusta sola. Lo que va entre corchetes [ ] se muestra tal cual al público,
  así que antes del lanzamiento no debe quedar ninguno.
*/
window.INSCRIPCION_CONFIG = {
  // Precio de la inscripción con kit, en dólares. Se paga en bolívares a la tasa BCV del día del pago.
  precioKitUSD: 40,

  // Contenido del kit (confirmado el 4 nov 2026).
  kit: ['Bolso', 'Lanyard y credencial', 'Cooler de la Cumbre', 'Gorro de quirófano', 'Bolígrafo con lámpara',
        'Cartuchera', 'Certificado impreso', 'Hidratación: un agua o un café'],

  // Día que corresponde a cada perfil (decisión del 4 nov: el día lo define la especialidad).
  // null = todavía sin confirmar: mientras tanto, la persona elige su día en el formulario.
  diasPorPerfil: {
    especialista: 'dias-2-3',
    enfermeria: 'dia-1',
    otras: null,
    estudiante: null
  },

  dias: {
    'dia-1': { nombre: 'Día 1', fecha: 'Miércoles 12 de mayo de 2027', tema: 'Protocolos de emergencia, rescate y cuidado crítico' },
    'dias-2-3': { nombre: 'Días 2 y 3', fecha: 'Jueves 13 y viernes 14 de mayo de 2027', tema: 'Avances tecnológicos y quirúrgicos · Abordaje multidisciplinario y cicatrización' }
  },

  // Datos para recibir el pago del kit (pendientes: empresa, banco, factura, dólares).
  pagoMovil: { banco: '[Banco por confirmar]', telefono: '[Teléfono por confirmar]', documento: '[RIF por confirmar]' },
  transferencia: { titular: '[Titular por confirmar]', banco: '[Banco por confirmar]', cuenta: '[Número de cuenta por confirmar]', documento: '[RIF por confirmar]' },

  // Fecha límite para comprar el kit (AAAA-MM-DD). null = sin fecha todavía.
  cierreVentaKits: null,

  // Cupos. null = sin límite definido todavía.
  cupos: { gratuita: null, kit: null }
};
