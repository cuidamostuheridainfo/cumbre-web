/*
  LISTA DE PRUEBA — personas y conferencias FICTICIAS para probar la acreditación (fase 1).
  En la fase 2 este archivo se elimina: la lista se descarga de Supabase.
  Cada caso sirve para probar un resultado distinto en la puerta (ver la columna "prueba").
*/
window.ACRED_PRUEBA = {
  generado: '2026-11-09T15:00:00-04:00',
  asistentes: [
    // prueba: válido Día 1, gratuita
    { codigo: 'K7QM-3XRP-9TWA', nombre: 'Ana', apellido: 'Rivas', cedula: 'V12345678', perfil: 'enfermeria', pase: 'dia-1', modalidad: 'gratuita', pago: null },
    // prueba: válido Día 1, kit pagado (entregar kit)
    { codigo: 'B4HN-8MZD-2KLE', nombre: 'Carlos', apellido: 'Méndez', cedula: 'V14567890', perfil: 'enfermeria', pase: 'dia-1', modalidad: 'kit', pago: 'confirmado' },
    // prueba: kit con pago en verificación
    { codigo: 'P9RT-5VWC-6JHU', nombre: 'Lucía', apellido: 'Herrera', cedula: 'V18765432', perfil: 'enfermeria', pase: 'dia-1', modalidad: 'kit', pago: 'en_verificacion' },
    // prueba: válido Días 2 y 3, gratuita (día equivocado si se escanea el Día 1)
    { codigo: 'M2XK-7QAB-4NFS', nombre: 'Andrés', apellido: 'Salazar', cedula: 'V9876543', perfil: 'especialista', pase: 'dias-2-3', modalidad: 'gratuita', pago: null },
    // prueba: válido Días 2 y 3, kit pagado
    { codigo: 'T6GW-2HEP-8ZRY', nombre: 'Gabriela', apellido: 'Torres', cedula: 'V11222333', perfil: 'especialista', pase: 'dias-2-3', modalidad: 'kit', pago: 'confirmado' },
    // prueba: estudiante de medicina, Días 2 y 3
    { codigo: 'F3JD-9KCM-5WQX', nombre: 'Diego', apellido: 'Páez', cedula: 'V28555666', perfil: 'estudiante', pase: 'dias-2-3', modalidad: 'gratuita', pago: null },
    // prueba: pase interno de tres días
    { codigo: 'V8LS-4TNA-3PGE', nombre: 'Elena', apellido: 'Castro', cedula: 'E84111222', perfil: 'interno', pase: 'tres-dias', modalidad: 'kit', pago: 'confirmado' },
    // prueba: otras áreas, Día 1
    { codigo: 'R5YB-6DFU-7MKC', nombre: 'José', apellido: 'Lugo', cedula: 'V16333444', perfil: 'otras', pase: 'dia-1', modalidad: 'gratuita', pago: null }
  ],
  // QR de cada conferencia: CUMBRE27-CONF:<id>. Programa real pendiente del comité científico.
  conferencias: [
    { id: 'D1-01', dia: 1, hora: '9:00', titulo: 'Conferencia de prueba 1 · Día 1' },
    { id: 'D1-02', dia: 1, hora: '10:00', titulo: 'Conferencia de prueba 2 · Día 1' },
    { id: 'D1-03', dia: 1, hora: '11:00', titulo: 'Conferencia de prueba 3 · Día 1' },
    { id: 'D2-01', dia: 2, hora: '9:00', titulo: 'Conferencia de prueba 1 · Día 2' },
    { id: 'D2-02', dia: 2, hora: '10:00', titulo: 'Conferencia de prueba 2 · Día 2' },
    { id: 'D3-01', dia: 3, hora: '9:00', titulo: 'Conferencia de prueba 1 · Día 3' }
  ]
};
