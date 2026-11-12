/*
  App del participante — Cumbre 2027 (app/index.html).
  De dónde sale el pase, en orden:
    1. Enlace con ?c=CODIGO (el que llegará por correo) → se busca en la lista (fase 1: lista de prueba; fase 2: Supabase).
    2. El pase guardado en este teléfono (lo deja la página de inscripción al terminar).
    3. Si no hay ninguno, pide el código.
  Las conferencias registradas se guardan en el teléfono y quedan en cola para subir (fase 2).
*/
(function () {
  // Paleta elegida: Cielo (12 nov). Para comparar, ?tema=arena|tierra cambia la paleta solo en esa visita; ya no se recuerda.
  var TEMA_INICIAL = 'cielo';
  (function () {
    var t = new URLSearchParams(location.search).get('tema'), ok = { arena: 1, tierra: 1, cielo: 1 };
    try { localStorage.removeItem('cumbre27_tema'); } catch (e) {}
    document.documentElement.setAttribute('data-tema', ok[t] ? t : TEMA_INICIAL);
  })();
  var A = window.ACRED, C = window.INSCRIPCION_CONFIG || {}, P = window.ACRED_PRUEBA || { asistentes: [], conferencias: [] };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var yo = null;

  var buscar = function (codigo) {
    // FASE 2: consultar a la función del servidor en lugar de la lista de prueba.
    return P.asistentes.filter(function (a) { return a.codigo === codigo; })[0] || null;
  };

  // ---------- Entrada ----------
  var mostrarEntrada = function (msg) {
    $('#v-app').hidden = true; $('#v-entrar').hidden = false;
    if (msg) { $('#ent-err').textContent = msg; $('#ent-err').hidden = false; }
  };
  $('#f-entrar').addEventListener('submit', function (e) {
    e.preventDefault();
    var cod = A.leerCodigo($('#ent-cod').value);
    if (!cod) { $('#ent-err').textContent = 'Escribe el código completo: 12 letras y números, como aparece en tu correo.'; $('#ent-err').hidden = false; return; }
    var a = buscar(cod);
    if (!a) { $('#ent-err').textContent = 'No encontramos ese código. Revísalo o escríbenos por WhatsApp.'; $('#ent-err').hidden = false; return; }
    abrir(a);
  });
  $('#ent-cod').addEventListener('input', function () { $('#ent-err').hidden = true; });

  // ---------- Pase ----------
  var pintar = function () {
    var pase = A.pases[yo.pase] || A.pases['dia-1'];
    document.documentElement.setAttribute('data-pase', yo.pase);
    var dias = pase.dias.map(function (n) { return A.dias[n]; });
    var largo = dias.length === 1 ? dias[0].largo + ' de 2027' : dias.length === 2 ? dias[0].largo.replace(' de mayo', '') + ' y ' + dias[1].largo.toLowerCase() + ' de 2027' : '12, 13 y 14 de mayo de 2027';
    var tema = (C.dias && C.dias[yo.pase] && C.dias[yo.pase].tema) || 'Programa completo de la Cumbre';
    $$('.js-nombre').forEach(function (x) { x.textContent = yo.nombre; });
    $$('.js-apellido').forEach(function (x) { x.textContent = yo.apellido; });
    $$('.js-perfil').forEach(function (x) { x.textContent = A.perfiles[yo.perfil] || ''; });
    $$('.js-dias-largo').forEach(function (x) { x.textContent = largo; });
    $$('.js-tema').forEach(function (x) { x.textContent = tema; });
    $$('.js-pase-nombre').forEach(function (x) { x.textContent = pase.nombre; });
    $$('.js-codigo').forEach(function (x) { x.textContent = yo.codigo; });
    var kit = yo.modalidad === 'kit';
    $$('.js-modalidad').forEach(function (x) { x.textContent = kit ? 'Con kit' : 'Inscripción gratuita'; x.classList.toggle('kit', kit); });
    $$('.js-solo-kit').forEach(function (x) { x.hidden = !(kit && yo.pago === 'confirmado'); });
    var pendiente = kit && yo.pago !== 'confirmado';
    $('#qr-pend').hidden = !pendiente; $('#qr-caja').hidden = pendiente; $('.pase-dorso .js-codigo').hidden = pendiente;
    if (!pendiente && window.QRCode) { $('#qr-caja').innerHTML = ''; new QRCode($('#qr-caja'), { text: yo.codigo, width: 240, height: 240, colorDark: (getComputedStyle(document.documentElement).getPropertyValue('--tinta') || '#0B1E4A').trim(), colorLight: '#FFFFFF', correctLevel: QRCode.CorrectLevel.M }); }
    $('#top-prueba').hidden = !A.MODO_PRUEBA;
    cuenta(dias[0].fecha);
    pintarConf();
  };
  var reloj;
  var cuenta = function (fecha) {
    var meta = Date.parse(fecha + 'T08:00:00-04:00'), el = $('#cuenta');
    clearInterval(reloj);
    var tic = function () {
      var s = Math.floor((meta - Date.now()) / 1000);
      if (s <= 0) { el.innerHTML = '<div><b>Hoy</b><small>te esperamos</small></div>'; return; }
      var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
      el.innerHTML = '<div><b>' + d + '</b><small>días</small></div><div><b>' + h + '</b><small>horas</small></div><div><b>' + m + '</b><small>minutos</small></div>';
    };
    tic(); reloj = setInterval(tic, 30000);
  };
  var paseEl = $('#tarjeta-pase');
  var girar = function (g) {
    paseEl.classList.toggle('girado', g);
    paseEl.setAttribute('aria-pressed', g ? 'true' : 'false');
    paseEl.setAttribute('aria-label', g ? 'Código QR de acreditación. Toca para volver al frente' : 'Tu acreditación. Toca para ver el código QR');
  };
  paseEl.addEventListener('click', function () { girar(!paseEl.classList.contains('girado')); });

  // ---------- Navegación ----------
  var ir = function (p) {
    $$('.panel').forEach(function (s) { s.hidden = s.id !== 'p-' + p; });
    document.documentElement.setAttribute('data-seccion', p);
    $$('.tabs button').forEach(function (b) { if (b.getAttribute('data-ir') === p) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    // Al abrir "Mi pase" se ve el frente y la tarjeta gira sola para mostrar el QR (un solo gesto animado en toda la app).
    if (p === 'pase') {
      girar(false);
      setTimeout(function () { if (!$('#p-pase').hidden) girar(true); }, 700);
    }
    window.scrollTo(0, 0);
    try { history.replaceState(null, '', '#' + p); } catch (e) {}
  };
  $$('[data-ir]').forEach(function (b) { b.addEventListener('click', function () { ir(b.getAttribute('data-ir')); }); });

  // ---------- Conferencias ----------
  var claveConf = function () { return 'cumbre27_conf_' + yo.codigo; };
  var pintarConf = function () {
    var regs = A.leer(claveConf(), []), meta = A.conferenciasParaCertificado;
    $('#prog-segs').innerHTML = Array.apply(null, Array(meta)).map(function (_, i) { return '<span' + (i < regs.length ? ' class="on"' : '') + '></span>'; }).join('');
    $('#prog-txt').textContent = regs.length === 0 ? 'Todavía no registras conferencias.' : regs.length >= meta ? 'Registraste ' + regs.length + ' conferencias. Ya cumples el mínimo para el certificado.' : 'Registraste ' + regs.length + ' de ' + meta + ' conferencias.';
    $('#conf-lista').innerHTML = regs.slice().reverse().map(function (r) {
      var c = P.conferencias.filter(function (x) { return x.id === r.id; })[0] || { titulo: 'Conferencia ' + r.id };
      return '<li><span>' + A.esc(c.titulo) + '</span><time datetime="' + A.esc(r.hora) + '">' + A.hora(r.hora) + '</time></li>';
    }).join('');
  };
  var aviso = function (txt, mal) { var a = $('#conf-aviso'); a.textContent = txt; a.className = 'aviso' + (mal ? ' mal' : ''); a.hidden = false; };
  var registrarConf = function (raw) {
    var id = A.leerConferencia(raw) || (/^D[123]-\d{2}$/i.test(String(raw).trim()) ? String(raw).trim().toUpperCase() : null);
    if (!id) { aviso('Ese código no es de una conferencia de la Cumbre.', true); return; }
    var c = P.conferencias.filter(function (x) { return x.id === id; })[0]; // FASE 2: programa real
    if (!c) { aviso('No encontramos la conferencia ' + id + '. Pregunta al personal de la sala.', true); return; }
    if ((A.pases[yo.pase] || { dias: [] }).dias.indexOf(c.dia) < 0) { aviso('Esa conferencia es del ' + A.dias[c.dia].nombre + ', y tu acreditación es para ' + A.pases[yo.pase].nombre + '.', true); return; }
    if (!A.MODO_PRUEBA && A.diaDeHoy() !== c.dia) { aviso('Esa conferencia no es de hoy.', true); return; }
    var regs = A.leer(claveConf(), []);
    if (regs.some(function (r) { return r.id === id; })) { aviso('Ya tenías registrada esta conferencia.'); return; }
    var r = { id: id, hora: new Date().toISOString() };
    regs.push(r); A.guardar(claveConf(), regs);
    var cola = A.leer('cumbre27_cola_asistente', []); cola.push({ tipo: 'conferencia', codigo: yo.codigo, conferencia: id, hora: r.hora, subido: false }); A.guardar('cumbre27_cola_asistente', cola);
    aviso('Asistencia registrada: ' + c.titulo + '.');
    pintarConf();
  };
  $('#f-conf-manual').addEventListener('submit', function (e) { e.preventDefault(); registrarConf($('#conf-manual').value); $('#conf-manual').value = ''; });

  // Escáner (misma librería que la app de 2026)
  var dlg = $('#dlg-esc'), lector = null;
  var cerrarEsc = function () {
    if (lector) { var l = lector; lector = null; l.stop().catch(function () {}).then(function () { try { l.clear(); } catch (e) {} }); }
    if (dlg.open) dlg.close();
  };
  $('#btn-esc-conf').addEventListener('click', function () {
    if (!window.Html5Qrcode) { aviso('No se pudo abrir la cámara. Escribe el código de la sala.', true); return; }
    dlg.showModal(); $('#esc-estado').textContent = 'Abriendo la cámara…';
    lector = new Html5Qrcode('lector');
    lector.start({ facingMode: 'environment' }, { fps: 12, qrbox: function (w, h) { var s = Math.min(w, h) * 0.72; return { width: s, height: s }; } },
      function (txt) { cerrarEsc(); registrarConf(txt); }, function () {})
      .then(function () { $('#esc-estado').textContent = 'Apunta al código que se proyecta en la sala.'; })
      .catch(function () { $('#esc-estado').textContent = 'No tenemos permiso para usar la cámara. Actívalo en tu navegador o escribe el código de la sala.'; });
  });
  $('#esc-cerrar').addEventListener('click', cerrarEsc);
  dlg.addEventListener('close', cerrarEsc);

  // ---------- Inicio ----------
  var abrir = function (a) {
    yo = a; A.guardar(A.CLAVE_ASISTENTE, a);
    $('#v-entrar').hidden = true; $('#v-app').hidden = false;
    pintar();
    var h = (location.hash || '').slice(1);
    ir(['inicio', 'pase', 'conf', 'sede'].indexOf(h) >= 0 ? h : 'inicio');
  };
  $('#btn-salir').addEventListener('click', function () {
    A.borrar(A.CLAVE_ASISTENTE); yo = null; $('#ent-cod').value = '';
    try { history.replaceState(null, '', location.pathname); } catch (e) {}
    mostrarEntrada();
  });

  var q = new URLSearchParams(location.search), cod = q.get('c') ? A.leerCodigo(q.get('c')) : null;
  if (cod) {
    var a = buscar(cod) || ((A.leer(A.CLAVE_ASISTENTE, null) || {}).codigo === cod ? A.leer(A.CLAVE_ASISTENTE, null) : null);
    try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) {} // el código no queda en la barra
    if (a) abrir(a); else mostrarEntrada('No encontramos ese código. Revísalo o escríbenos por WhatsApp.');
  } else {
    var g = A.leer(A.CLAVE_ASISTENTE, null);
    if (g && g.codigo) abrir(g); else mostrarEntrada();
  }
})();
