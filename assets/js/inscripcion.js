/*
  Inscripción de asistentes — Cumbre 2027 (inscripcion.html).
  Funciona sola: se puede compartir el enlace directo (redes, WhatsApp) o llegar desde los botones de la portada,
  que agregan ?dia=dia-1|dias-2-3&modalidad=kit|gratuita para dejar preseleccionado lo que la persona eligió.
  El día lo define el perfil (ver inscripcion-config.js). ENVÍO SIMULADO: todavía no hay base de datos (fase 2: Supabase).
*/
(function () {
  var C = window.INSCRIPCION_CONFIG; var form = document.getElementById('ins-form'); if (!C || !form) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var REQ = 'Completa este campo para continuar.', ELIGE = 'Elige una opción para continuar.';

  var q = new URLSearchParams(location.search);
  var diaURL = C.dias[q.get('dia')] ? q.get('dia') : null;
  var modURL = /^(kit|gratuita)$/.test(q.get('modalidad') || '') ? q.get('modalidad') : null;

  // Datos fijos desde la configuración
  $('#ins-precio').textContent = '$' + C.precioKitUSD; $('#ins-monto').textContent = '$' + C.precioKitUSD;
  $('#ins-kit-lista').innerHTML = C.kit.map(function (k) { return '<li>' + esc(k) + '</li>'; }).join('');
  var dl = function (o, etiquetas) { return Object.keys(etiquetas).map(function (k) { return '<dt>' + etiquetas[k] + '</dt><dd>' + esc(o[k]) + '</dd>'; }).join(''); };
  $('#dp-pagomovil').innerHTML = dl(C.pagoMovil, { banco: 'Banco', telefono: 'Teléfono', documento: 'RIF' });
  $('#dp-transferencia').innerHTML = dl(C.transferencia, { titular: 'Titular', banco: 'Banco', cuenta: 'Cuenta', documento: 'RIF' });
  // Kit "Próximamente" mientras no se vende (inscripcion-config.js, ventaKit: false): se ve, pero no se puede elegir.
  if (!C.ventaKit) {
    var kitIn = $('input[name="modalidad"][value="kit"]'), kitOp = kitIn.closest('.ins-op'), tag = $('.dlg-tag', kitOp);
    kitIn.disabled = true; kitOp.classList.add('ins-op-pronto'); kitOp.setAttribute('aria-disabled', 'true');
    if (tag) tag.parentNode.removeChild(tag);
    $('.ins-op-in', kitOp).insertAdjacentHTML('afterbegin', '<span class="cinta-pronto" aria-hidden="true">Próximamente</span>');
    $('strong', kitOp).textContent = 'Kit de la Cumbre';
    var lista = $('#ins-kit-lista'); if (lista) lista.parentNode.removeChild(lista); // el contenido del kit está en definición
    $('.ins-op-in', kitOp).insertAdjacentHTML('beforeend', '<span class="ins-pronto-nota">Pronto estará disponible esta gran sorpresa.</span>');
    $('.ins-mods').classList.add('sin-kit');
    modURL = 'gratuita';
  }
  if (modURL) $('input[name="modalidad"][value="' + modURL + '"]').checked = true;

  var val = function (name) { var r = $('input[name="' + name + '"]:checked', form); return r ? r.value : ''; };
  var setErr = function (id, msg) {
    var e = document.getElementById(id + '-err'), f = document.getElementById(id); if (!e) return;
    e.textContent = msg || ''; e.hidden = !msg; if (f) f.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  // Día según el perfil
  var diaFinal = function () { var p = val('perfil'); if (!p) return ''; return C.diasPorPerfil[p] || val('dia'); };
  var pintarDia = function () {
    var p = val('perfil'), box = $('#ins-dia-box'), elegir = $('#ins-dia-elegir');
    var est = p === 'estudiante';
    $('#lab-institucion').textContent = est ? 'Universidad*' : 'Institución donde trabajas*';
    $('#ins-institucion').placeholder = est ? 'Tu universidad' : 'Hospital, clínica o institución';
    $('#lab-especialidad').textContent = est ? 'Carrera*' : 'Especialidad o área*';
    if (!p) { box.hidden = true; elegir.hidden = true; return; }
    var fijo = C.diasPorPerfil[p];
    elegir.hidden = !!fijo;
    if (!fijo && diaURL && !val('dia')) $('input[name="dia"][value="' + diaURL + '"]').checked = true;
    var d = fijo || val('dia');
    if (!d) { box.hidden = true; return; }
    var info = C.dias[d], aviso = '';
    if (fijo && diaURL && diaURL !== fijo) aviso = '<span class="ins-dia-aviso">Elegiste ' + esc(C.dias[diaURL].nombre) + ', pero por tu perfil te corresponde ' + esc(info.nombre) + '.</span>';
    box.innerHTML = '<span class="ins-lab">' + (fijo ? 'Por tu perfil asistes' : 'Asistirás') + '</span><strong>' + esc(info.nombre) + ' · ' + esc(info.fecha) + '</strong><span>' + esc(info.tema) + '</span>' + aviso;
    box.hidden = false;
  };
  $$('input[name="perfil"], input[name="dia"]').forEach(function (r) { r.addEventListener('change', function () { setErr('ins-perfil', ''); setErr('ins-dia', ''); pintarDia(); }); });
  pintarDia();

  // Modalidad y pago
  var pintarPago = function () { $('#ins-pago').hidden = val('modalidad') !== 'kit'; };
  $$('input[name="modalidad"]').forEach(function (r) { r.addEventListener('change', function () { setErr('ins-modalidad', ''); pintarPago(); }); });
  pintarPago();
  var hoy = new Date(); $('#ins-fecha').max = hoy.getFullYear() + '-' + String(hoy.getMonth() + 1).padStart(2, '0') + '-' + String(hoy.getDate()).padStart(2, '0');

  // Limpieza de errores al escribir
  $$('input, select', form).forEach(function (f) {
    if (!f.id) return; var limpiar = function () { setErr(f.id === 'ins-ced-tipo' ? 'ins-cedula' : f.id, ''); };
    f.addEventListener('input', limpiar); f.addEventListener('change', limpiar);
  });
  $('#ins-cedula').addEventListener('input', function () { this.value = this.value.replace(/\D/g, '').slice(0, 9); });

  var revisar = function (ids, reglas) {
    var primero = null;
    ids.forEach(function (id) {
      var f = document.getElementById(id); var v = String(f.value || '').trim(); var msg = v ? '' : REQ;
      if (!msg && reglas[id]) msg = reglas[id](v, f) || '';
      setErr(id, msg); if (msg && !primero) primero = f;
    });
    return primero;
  };

  var paso1 = function () {
    var primero = null;
    if (!val('perfil')) { setErr('ins-perfil', ELIGE); primero = $('input[name="perfil"]'); }
    else if (!diaFinal()) { setErr('ins-dia', ELIGE); primero = $('input[name="dia"]'); }
    var p = revisar(['ins-nombre', 'ins-apellido', 'ins-cedula', 'ins-correo', 'ins-whatsapp', 'ins-especialidad', 'ins-institucion', 'ins-ciudad'], {
      'ins-cedula': function (v) { return /^\d{5,9}$/.test(v) ? '' : 'Escribe tu cédula solo con números (entre 5 y 9 dígitos).'; },
      'ins-correo': function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Escribe un correo electrónico válido.'; },
      'ins-whatsapp': function (v) { return v.replace(/\D/g, '').length >= 10 ? '' : 'Escribe tu número con el código de país, por ejemplo +58 412 1234567.'; }
    });
    primero = primero || p;
    if (!$('#ins-privacidad').checked) { setErr('ins-privacidad', 'Debes aceptar el aviso de privacidad para inscribirte.'); primero = primero || $('#ins-privacidad'); }
    return primero;
  };
  var paso2 = function () {
    if (!val('modalidad')) { setErr('ins-modalidad', ELIGE); return $('input[name="modalidad"]'); }
    if (val('modalidad') !== 'kit') return null;
    var p = revisar(['ins-metodo', 'ins-banco', 'ins-referencia', 'ins-fecha', 'ins-montobs'], {
      'ins-referencia': function (v) { return /^\d{4,20}$/.test(v.replace(/\s/g, '')) ? '' : 'Escribe solo los números de la referencia.'; },
      'ins-montobs': function (v) { return /\d/.test(v) ? '' : 'Escribe el monto en bolívares.'; }
    });
    var f = $('#ins-comprobante').files[0], msg = '';
    if (!f) msg = 'Adjunta el comprobante de pago.';
    else if (f.size > 5 * 1024 * 1024) msg = 'El archivo pesa más de 5 MB. Prueba con una captura de pantalla.';
    else if (!/^image\/|application\/pdf/.test(f.type)) msg = 'Adjunta una imagen o un PDF.';
    setErr('ins-comprobante', msg);
    return p || (msg ? $('#ins-comprobante') : null);
  };

  var irA = function (n) {
    $$('.ins-paso').forEach(function (s) { s.hidden = s.id !== 'paso-' + n; });
    $$('.ins-pasos li').forEach(function (li) { var k = +li.getAttribute('data-paso'); li.classList.toggle('activo', k === n); li.classList.toggle('hecho', k < n); });
    if (n === 2) { var d = C.dias[diaFinal()]; $('#ins-resumen-dia').innerHTML = 'Te inscribes a <strong>' + esc(d.nombre) + '</strong> · ' + esc(d.fecha) + '.'; }
    var top = $('.ins-pasos').getBoundingClientRect().top + window.pageYOffset - 100; window.scrollTo({ top: top, behavior: 'smooth' });
  };
  $$('[data-ir]').forEach(function (b) {
    b.addEventListener('click', function () {
      var n = +b.getAttribute('data-ir');
      if (n === 2) { var e = paso1(); if (e) { e.focus(); return; } }
      irA(n);
    });
  });

  // Envío SIMULADO. En la fase 2 se reemplaza por la llamada a la función de Supabase,
  // que valida la cédula (sin duplicados por día) y devuelve el código firmado del QR.
  var btn = $('#ins-enviar');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault(); $('#ins-senderr').hidden = true;
    var e = paso1(); if (e) { irA(1); e.focus(); return; }
    e = paso2(); if (e) { e.focus(); return; }
    btn.disabled = true; btn.textContent = 'Enviando inscripción…';
    setTimeout(function () {
      btn.disabled = false; btn.textContent = 'Completar inscripción';
      var mod = val('modalidad'), d = C.dias[diaFinal()];
      // FASE 2: el código lo genera y guarda el servidor; aquí se simula con el mismo formato.
      var codigo = window.ACRED ? ACRED.generarCodigo() : 'SIN-CODIGO';
      if (window.ACRED) ACRED.guardar(ACRED.CLAVE_ASISTENTE, { codigo: codigo, nombre: $('#ins-nombre').value.trim(), apellido: $('#ins-apellido').value.trim(),
        perfil: val('perfil'), pase: diaFinal(), modalidad: mod, pago: mod === 'kit' ? 'en_verificacion' : null });
      $$('.ok-nombre').forEach(function (x) { x.textContent = $('#ins-nombre').value.trim(); });
      $$('.ok-dia').forEach(function (x) { x.textContent = d.nombre + ' (' + d.fecha + ')'; });
      $$('.ins-qr-cod').forEach(function (x) { x.textContent = codigo; });
      $('#ok-gratuita').hidden = mod !== 'gratuita'; $('#ok-kit').hidden = mod !== 'kit';
      if (mod === 'gratuita' && window.QRCode) { var c = $('#ins-qr'); c.innerHTML = ''; new QRCode(c, { text: codigo, width: 200, height: 200, colorDark: '#0A1040', colorLight: '#FFFFFF' }); }
      $$('.ins-pasos li').forEach(function (li) { li.classList.remove('activo'); li.classList.add('hecho'); });
      $$('.ins-paso').forEach(function (s) { s.hidden = s.id !== 'paso-3'; });
      $('#paso-3').focus();
    }, 1200);
  });
})();
