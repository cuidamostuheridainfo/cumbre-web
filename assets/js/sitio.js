/* Comportamiento compartido de index.html y ponencias.html */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var movil = window.matchMedia('(max-width: 760px)');

  // Menú del teléfono
  var mb = $('#menu-btn'), mm = $('#menu-movil');
  if (mb && mm) {
    var cerrar = function () { mm.hidden = true; mb.setAttribute('aria-expanded', 'false'); };
    mb.addEventListener('click', function () { var abrir = mm.hidden; mm.hidden = !abrir; mb.setAttribute('aria-expanded', abrir ? 'true' : 'false'); });
    $$('a', mm).forEach(function (a) { a.addEventListener('click', cerrar); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mm.hidden) { cerrar(); mb.focus(); } });
  }

  // Fotos del encabezado: una a la vez, 6 s cada una
  var sl = $$('.hero-slide'), i = 0;
  if (sl.length > 1) setInterval(function () { sl[i].classList.remove('on'); i = (i + 1) % sl.length; sl[i].classList.add('on'); }, 6000);

  // Fotos que rotan una a la vez (.gal-rota), 4,5 s cada una. Cada foto se descarga justo antes de mostrarse.
  $$('.gal-rota').forEach(function (t) {
    var c = [].slice.call(t.children), k = 0;
    function cargar(n) { var d = c[n % c.length]; if (d && d.getAttribute('data-bg')) { d.style.backgroundImage = 'url(' + d.getAttribute('data-bg') + ')'; d.removeAttribute('data-bg'); } }
    if (c.length < 2 || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    cargar(1);
    // data-inicio (ms): desfase para que los cuadros de una misma galería no cambien a la vez.
    setTimeout(function () {
      setInterval(function () {
        if (!t.offsetParent) return;
        c[k].classList.remove('on'); k = (k + 1) % c.length; c[k].classList.add('on'); cargar(k + 1);
      }, 4500);
    }, parseInt(t.getAttribute('data-inicio'), 10) || 0);
  });

  // Cuenta regresiva
  if ($('[data-cd]')) {
    var target = Date.parse('2027-05-12T08:00:00-04:00');
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var tick = function () {
      var s = Math.max(0, Math.floor((target - Date.now()) / 1000)); var d = Math.floor(s / 86400); s -= d * 86400;
      var h = Math.floor(s / 3600); s -= h * 3600; var m = Math.floor(s / 60); s -= m * 60;
      var v = { d: String(d), h: pad(h), m: pad(m), s: pad(s) };
      for (var k in v) { var el = $('[data-cd="' + k + '"]'); if (el) el.textContent = v[k]; }
    };
    tick(); setInterval(tick, 1000);
  }

  // Botones "ver más" del teléfono (disciplinas y fotos)
  $$('[data-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = document.getElementById(b.getAttribute('data-toggle')); if (!t) return;
      var abierto = t.classList.toggle('abierto');
      b.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      b.textContent = abierto ? b.getAttribute('data-menos') : b.getAttribute('data-mas');
    });
  });

  // Selector de participación: cada botón de día abre el diálogo; cada opción lleva a inscripcion.html con día y modalidad
  var dlg = $('#dlg-inscripcion');
  if (dlg && dlg.showModal) {
    $$('.btn-inscribir').forEach(function (b) {
      b.addEventListener('click', function () {
        $('#dlg-dia').textContent = b.getAttribute('data-dia-label');
        dlg.setAttribute('data-dia', b.getAttribute('data-dia'));
        $$('[data-modalidad]', dlg).forEach(function (a) { a.setAttribute('data-dia', b.getAttribute('data-dia')); a.setAttribute('href', 'inscripcion.html?dia=' + b.getAttribute('data-dia') + '&modalidad=' + a.getAttribute('data-modalidad')); });
        dlg.showModal();
      });
    });
    $$('[data-cerrar]', dlg).forEach(function (b) { b.addEventListener('click', function () { dlg.close(); }); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  }

  // Opciones comerciales: abiertas en PC, plegadas en teléfono
  var opts = $$('details.opt');
  var ajustarOpts = function () { opts.forEach(function (d) { d.open = !movil.matches; }); };
  ajustarOpts(); if (movil.addEventListener) movil.addEventListener('change', ajustarOpts);

  // Videos de YouTube: el reproductor solo se carga al pulsar la miniatura
  var tarjetaVideo = function (p, extra) {
    var quien = p.ponente ? '<span class="pv-ponente">' + esc(p.ponente) + (p.especialidad ? ' · ' + esc(p.especialidad) : '') + '</span>' : '';
    var yt = 'https://www.youtube.com/watch?v=' + encodeURIComponent(p.id);
    if (p.restringido) {
      return '<article class="pv-card' + (extra || '') + '">' +
        '<div class="yt-frame"><a class="yt-play" href="' + yt + '" target="_blank" rel="noopener" aria-label="Ver en YouTube: ' + esc(p.titulo) + '">' +
        '<img src="https://i.ytimg.com/vi/' + esc(p.id) + '/hqdefault.jpg" alt="" loading="lazy">' +
        '<span class="yt-ico" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M8 5.5v13l11-6.5z"></path></svg></span>' +
        '<span class="pv-tag">Edición 2026</span><span class="pv-dur">' + esc(p.duracion) + '</span></a></div>' +
        '<div class="pv-body"><h3 class="pv-titulo">' + esc(p.titulo) + '</h3>' + quien +
        '<span class="pv-aviso">Por su contenido médico, YouTube solo permite verla en su sitio.</span>' +
        '<div class="pv-acciones"><a class="pv-ver" href="' + yt + '" target="_blank" rel="noopener">Ver en YouTube ↗</a></div></div></article>';
    }
    return '<article class="pv-card' + (extra || '') + '">' +
      '<div class="yt-frame"><button type="button" class="yt-play" data-yt="' + esc(p.id) + '" data-titulo="' + esc(p.titulo) + '" aria-label="Ver ponencia: ' + esc(p.titulo) + '">' +
      '<img src="https://i.ytimg.com/vi/' + esc(p.id) + '/hqdefault.jpg" alt="" loading="lazy">' +
      '<span class="yt-ico" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M8 5.5v13l11-6.5z"></path></svg></span>' +
      '<span class="pv-tag">Edición 2026</span><span class="pv-dur">' + esc(p.duracion) + '</span></button></div>' +
      '<div class="pv-body"><h3 class="pv-titulo">' + esc(p.titulo) + '</h3>' + quien +
      '<div class="pv-acciones"><button type="button" class="pv-ver" data-yt-btn="' + esc(p.id) + '">Ver ponencia</button>' +
      '<a class="pv-yt" href="https://www.youtube.com/watch?v=' + esc(p.id) + '" target="_blank" rel="noopener">Ver en YouTube ↗</a></div></div></article>';
  };
  var lista = window.PONENCIAS || [];
  var dest = $('#pv-destacadas');
  if (dest) {
    dest.innerHTML = lista.filter(function (p) { return p.destacada; }).sort(function (a, b) { return a.destacada - b.destacada; })
      .map(function (p, k) { return tarjetaVideo(p, k > 0 ? ' pv-solo-pc' : ''); }).join('');
  }
  var gal = $('#pv-galeria');
  if (gal) {
    var POR_PAGINA = 9, mostradas = 0, mas = $('#pv-mas');
    var pintar = function () {
      var lote = lista.slice(mostradas, mostradas + POR_PAGINA);
      gal.insertAdjacentHTML('beforeend', lote.map(function (p) { return tarjetaVideo(p, ''); }).join(''));
      mostradas += lote.length;
      if (mas) mas.hidden = mostradas >= lista.length;
      var c = $('#pv-cuenta'); if (c) c.textContent = mostradas + ' de ' + lista.length + ' ponencias publicadas';
    };
    pintar(); if (mas) mas.addEventListener('click', pintar);
  }
  // Videos y entrevistas de la Cumbre 2027 (portada). Lista en assets/js/videos-2027.js.
  var v27 = (window.VIDEOS_2027 || []).filter(function (v) { return v && v.id; })
    .sort(function (a, b) { return String(b.fecha || '').localeCompare(String(a.fecha || '')); });
  var v27grid = $('#v27-grid');
  if (v27grid) {
    var MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    var fechaCorta = function (f) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(f || ''); return m ? (+m[3]) + ' ' + MESES[+m[2] - 1] + ' ' + m[1] : ''; };
    var tarjeta27 = function (v) {
      var ent = v.tipo === 'entrevista';
      var linea = [ent ? v.medio : '', v.invitado].filter(Boolean).map(esc).join(' · ');
      return '<article class="pv-card">' +
        '<div class="yt-frame"><button type="button" class="yt-play" data-yt="' + esc(v.id) + '" aria-label="Ver: ' + esc(v.titulo) + '">' +
        '<img src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="" loading="lazy">' +
        '<span class="yt-ico" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M8 5.5v13l11-6.5z"></path></svg></span>' +
        '<span class="pv-tag' + (ent ? ' v27-tag-ent' : '') + '">' + (ent ? 'Entrevista de radio' : 'Cumbre 2027') + '</span>' +
        (v.duracion ? '<span class="pv-dur">' + esc(v.duracion) + '</span>' : '') + '</button></div>' +
        '<div class="pv-body"><h3 class="pv-titulo">' + esc(v.titulo) + '</h3>' +
        (linea ? '<span class="pv-ponente">' + linea + '</span>' : '') +
        (v.fecha ? '<span class="v27-fecha">' + fechaCorta(v.fecha) + '</span>' : '') +
        '<div class="pv-acciones"><button type="button" class="pv-ver" data-yt-btn="' + esc(v.id) + '">Ver video</button>' +
        '<a class="pv-yt" href="https://www.youtube.com/watch?v=' + esc(v.id) + '" target="_blank" rel="noopener">Ver en YouTube ↗</a></div></div></article>';
    };
    var V_PAGINA = 6, vFiltro = 'todos', vMostradas = 0, vMas = $('#v27-mas');
    var vLista = function () { return v27.filter(function (v) { return vFiltro === 'todos' || v.tipo === vFiltro; }); };
    var vPintar = function (reiniciar) {
      if (reiniciar) { v27grid.innerHTML = ''; vMostradas = 0; }
      var l = vLista(), lote = l.slice(vMostradas, vMostradas + V_PAGINA);
      v27grid.insertAdjacentHTML('beforeend', lote.map(tarjeta27).join(''));
      vMostradas += lote.length; vMas.hidden = vMostradas >= l.length;
    };
    $('#v27-vacio').hidden = v27.length > 0;
    var hayDos = v27.some(function (v) { return v.tipo === 'entrevista'; }) && v27.some(function (v) { return v.tipo !== 'entrevista'; });
    $('#v27-filtros').hidden = !hayDos;
    $$('#v27-filtros [data-filtro]').forEach(function (b) {
      b.addEventListener('click', function () {
        vFiltro = b.getAttribute('data-filtro');
        $$('#v27-filtros [data-filtro]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        vPintar(true);
      });
    });
    vMas.addEventListener('click', function () { vPintar(false); });
    vPintar(true);
  }
  var reproducir = function (frame, id, titulo) {
    frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0" title="' + esc(titulo) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-yt], [data-yt-btn]'); if (!b) return;
    var id = b.getAttribute('data-yt') || b.getAttribute('data-yt-btn');
    var card = b.closest('.pv-card, .yt-tile'); var frame = card && $('.yt-frame', card); if (!frame || $('iframe', frame)) return;
    var p = lista.concat(window.VIDEOS_2027 || []).filter(function (x) { return x && x.id === id; })[0] || window.VIDEO_RESUMEN || {};
    reproducir(frame, id, p.titulo || 'Video de la Cumbre 2026');
  });

  // Formulario de patrocinio (envío SIMULADO: todavía no hay base de datos)
  var form = $('#pf-form'); if (!form) return;
  var btn = $('#pf-btn'), wrap = $('#pf-wrap'), ok = $('#pf-ok'), serr = $('#pf-senderr');
  var REQ = 'Completa este campo para continuar.', BAD = 'Escribe un correo electrónico válido.';
  var setErr = function (id, msg) {
    var f = document.getElementById(id), e = document.getElementById(id + '-err'); if (!f || !e) return;
    if (msg) { e.textContent = msg; e.hidden = false; f.setAttribute('aria-invalid', 'true'); } else { e.textContent = ''; e.hidden = true; f.setAttribute('aria-invalid', 'false'); }
  };
  ['pf-nombre', 'pf-empresa', 'pf-correo', 'pf-opcion'].forEach(function (id) {
    var f = document.getElementById(id);
    f.addEventListener('input', function () { setErr(id, ''); }); f.addEventListener('change', function () { setErr(id, ''); });
  });
  var pre = $('#pre-stand');
  if (pre) pre.addEventListener('click', function () { $('#pf-opcion').value = 'Stand o espacio de exposición'; setErr('pf-opcion', ''); if (!ok.hidden) { ok.hidden = true; wrap.hidden = false; } });
  form.addEventListener('submit', function (ev) {
    ev.preventDefault(); serr.hidden = true; var first = null;
    ['pf-nombre', 'pf-empresa', 'pf-correo', 'pf-opcion'].forEach(function (id) {
      var v = String(document.getElementById(id).value || '').trim(); var msg = v ? '' : REQ;
      if (!msg && id === 'pf-correo' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = BAD;
      setErr(id, msg); if (msg && !first) first = id;
    });
    if (first) { document.getElementById(first).focus(); return; }
    btn.disabled = true; btn.textContent = 'Enviando solicitud…';
    setTimeout(function () { wrap.hidden = true; ok.hidden = false; btn.disabled = false; btn.textContent = 'Solicitar propuesta de patrocinio'; }, 1200);
  });
})();
