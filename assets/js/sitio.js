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

  // Opciones comerciales: abiertas en PC, plegadas en teléfono
  var opts = $$('details.opt');
  var ajustarOpts = function () { opts.forEach(function (d) { d.open = !movil.matches; }); };
  ajustarOpts(); if (movil.addEventListener) movil.addEventListener('change', ajustarOpts);

  // Videos de YouTube: el reproductor solo se carga al pulsar la miniatura
  var tarjetaVideo = function (p, extra) {
    var quien = p.ponente ? '<span class="pv-ponente">' + esc(p.ponente) + (p.especialidad ? ' · ' + esc(p.especialidad) : '') + '</span>' : '';
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
  var reproducir = function (frame, id, titulo) {
    frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0" title="' + esc(titulo) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-yt], [data-yt-btn]'); if (!b) return;
    var id = b.getAttribute('data-yt') || b.getAttribute('data-yt-btn');
    var card = b.closest('.pv-card, .yt-tile'); var frame = card && $('.yt-frame', card); if (!frame || $('iframe', frame)) return;
    var p = lista.filter(function (x) { return x.id === id; })[0] || window.VIDEO_RESUMEN || {};
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
