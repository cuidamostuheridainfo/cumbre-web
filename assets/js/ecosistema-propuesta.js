/* Maqueta "Un solo ecosistema" · Grupo Medical Shields
   Arma la barra, la sección y el pie del grupo, y el panel para cambiar de propuesta.
   Solo la usa propuesta-ecosistema.html. */
(function () {
  'use strict';

  var IMG = 'assets/img/ecosistema/';
  var GRUPO = 'assets/img/grupo/';

  // Las cuatro marcas, en el mismo orden en barra, sección y pie.
  var MARCAS = [
    {
      id: 'ms', nombre: 'Medical Shields', desc: 'Productos y tecnología',
      linea: 'Suministro de productos y tecnología para el cuidado de heridas y piel.',
      url: 'https://medicalshields.com', ir: 'Conocer Medical Shields',
      logo: IMG + 'ms.png', logoOsc: IMG + 'ms-blanco.png'
    },
    {
      id: 'cth', nombre: 'Cuidamos tu Herida', desc: 'Atención especializada',
      linea: 'Atención médica de heridas y piel y fisiatría avanzada, en sede, a domicilio y por telemedicina.',
      url: 'https://cuidamostuherida.com', ir: 'Conocer Cuidamos tu Herida',
      logo: IMG + 'cth.png', logoOsc: IMG + 'cth-blanco.png'
    },
    {
      id: 'cumbre', nombre: 'II Cumbre Internacional para el Cuidado Avanzado de Heridas, Piel y Longevidad',
      corto: 'Cumbre', desc: 'Formación y comunidad',
      linea: 'Formación y comunidad de los especialistas.',
      url: '#inicio', actual: true,
      logo: 'assets/img/logo-cumbre-27-oscuro.png', logoOsc: 'assets/img/logo-cumbre-27-blanco.png'
    },
    {
      id: 'es', nombre: 'Ethical Shields AI', desc: 'IA financiera para empresas',
      linea: 'Consultoría de negocio y finanzas con inteligencia artificial. GesPro, su panel de control financiero.',
      url: '#', pendiente: true, ir: 'Conocer Ethical Shields AI',
      es: true
    }
  ];

  // Las cuatro propuestas del logo del grupo.
  var PROPUESTAS = {
    1: { nombre: 'Anillos encadenados', nota: 'Cuatro anillos, uno por marca' },
    2: { nombre: 'Firma tipográfica', nota: 'Solo el nombre, con raya azul' },
    3: { nombre: 'Conexión esencial', nota: 'Dos piezas que forman un cuadrado' },
    4: { nombre: 'Evolución de origen', nota: 'La cruz de Medical Shields' }
  };

  var estado = { op: 1, franja: 'clara' };

  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Logo de Ethical Shields AI: su marca y su nombre, como en su web.
  function esLogo(oscuro) {
    return '<span class="es-logo' + (oscuro ? ' es-oscuro' : '') + '"><img src="' + IMG + 'es-marca.png" alt="">Ethical Shields AI</span>';
  }

  function logoMarca(m, oscuro) {
    if (m.es) return esLogo(oscuro);
    return '<img src="' + (oscuro ? m.logoOsc : m.logo) + '" alt="' + esc(m.nombre) + '">';
  }

  function atributosEnlace(m) {
    var d = ' data-marca="' + m.id + '"';
    return d + enlace(m);
  }
  function enlace(m) {
    if (m.actual) return ' href="' + m.url + '" aria-current="page"';
    if (m.pendiente) return ' href="#" title="Dirección por confirmar" data-pendiente="1"';
    return ' href="' + m.url + '" target="_blank" rel="noopener"';
  }

  // ---------- Logo del grupo según la propuesta ----------
  // pieza: "barra" (compacto), "firma" (con lema)
  function logoGrupo(op, tema, alto, pieza) {
    var osc = tema === 'oscuro';
    var lema = pieza === 'firma';
    var estilo = ' style="--gl-h:' + alto + 'px"';
    if (op === 1) {
      var archivo = pieza === 'barra' ? 'grupo-ms-sello-' : 'grupo-ms-firma-';
      return '<span class="glogo gl-firma" data-tema="' + tema + '"' + estilo + '><img src="' + GRUPO + archivo + (osc ? 'oscuro' : 'claro') + '.svg" alt="Grupo Medical Shields' + (lema ? ' · Ecosistema de Salud y Bienestar Integral' : '') + '"></span>';
    }
    var marca = '';
    if (op === 3) marca = '<img src="' + IMG + 'codex-02-' + (osc ? 'oscuro' : 'claro') + '.png" alt="">';
    if (op === 4) marca = '<img src="' + IMG + 'codex-03-' + (osc ? 'oscuro' : 'claro') + '.png" alt="">';
    var raya = op === 2 ? '<i class="gl-raya" aria-hidden="true"></i>' : '';
    return '<span class="glogo" data-tema="' + tema + '"' + estilo + ' role="img" aria-label="Grupo Medical Shields">' + marca +
      '<span class="gl-txt"><span class="gl-grupo">Grupo</span><span class="gl-nombre">Medical Shields</span>' + raya +
      (lema ? '<span class="gl-lema">Ecosistema de Salud y Bienestar Integral</span>' : '') + '</span></span>';
  }

  function pintarLogosGrupo() {
    var nodos = document.querySelectorAll('[data-glogo]');
    for (var i = 0; i < nodos.length; i++) {
      var n = nodos[i];
      var tema = n.getAttribute('data-tema') || 'claro';
      if (n.hasAttribute('data-sigue-franja')) tema = estado.franja === 'azul' ? 'oscuro' : 'claro';
      n.innerHTML = logoGrupo(estado.op, tema, parseInt(n.getAttribute('data-alto'), 10) || 32, n.getAttribute('data-glogo'));
    }
  }

  // ---------- Barra: nombres de las cuatro marcas (propuesta 1) ----------
  function pintarBarra() {
    var cont = document.getElementById('gbar-marcas');
    if (!cont) return;
    cont.innerHTML = MARCAS.map(function (m, i) {
      return (i ? '<span class="gbar-dot" aria-hidden="true">·</span>' : '') +
        '<a' + atributosEnlace(m) + '>' + esc(m.corto || m.nombre) + '</a>';
    }).join('');
  }

  // ---------- Selector desplegable de marcas ----------
  function pintarSelector() {
    var lista = document.getElementById('gsel-lista');
    if (!lista) return;
    lista.innerHTML = MARCAS.map(function (m) {
      return '<a' + atributosEnlace(m) + '><span class="gsel-logo">' + logoMarca(m, false) + '</span>' +
        '<span class="gsel-txt"><strong>' + esc(m.corto || m.nombre) + '</strong>' + esc(m.desc) + '</span>' +
        (m.actual ? '<span class="gsel-aqui">Estás aquí</span>' : '<span class="gsel-ir" aria-hidden="true">↗</span>') + '</a>';
    }).join('');
  }

  function prepararSelector() {
    var btns = document.querySelectorAll('[data-abre-gsel]');
    var panel = document.getElementById('gsel');
    if (!panel) return;
    function cerrar() {
      panel.hidden = true;
      for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-expanded', 'false');
    }
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        e.stopPropagation();
        var abrir = panel.hidden;
        cerrar();
        if (abrir) { panel.hidden = false; this.setAttribute('aria-expanded', 'true'); }
      });
    }
    document.addEventListener('click', function (e) { if (!panel.hidden && !panel.contains(e.target)) cerrar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
  }

  // ---------- Sección "Un solo ecosistema" ----------
  function pintarSeccion() {
    var grid = document.getElementById('eco-grid');
    if (!grid) return;
    grid.innerHTML = MARCAS.map(function (m) {
      var pie = m.actual
        ? '<span class="eco-aqui">Estás en la Cumbre</span>'
        : '<a class="eco-ir"' + atributosEnlace(m) + '>' + esc(m.ir) + ' ↗</a>';
      return '<article class="eco-card' + (m.actual ? ' actual' : '') + '" data-marca="' + m.id + '">' +
        '<div class="eco-card-logo">' + logoMarca(m, false) + '</div>' +
        '<h3>' + esc(m.desc) + '</h3><p>' + esc(m.linea) + '</p>' + pie + '</article>';
    }).join('');
  }

  // ---------- Pie del grupo ----------
  function pintarPie() {
    var a = document.getElementById('gpie-marcas');
    if (a) {
      a.innerHTML = MARCAS.map(function (m) {
        return '<a class="gpie-marca"' + atributosEnlace(m) + '><span class="gpie-marca-logo">' + logoMarca(m, true) + '</span><p>' + esc(m.linea) + '</p></a>';
      }).join('');
    }
    var c = document.getElementById('gpie-logos');
    if (c) {
      c.innerHTML = MARCAS.map(function (m) {
        return '<a' + atributosEnlace(m) + ' aria-label="' + esc(m.corto || m.nombre) + '">' +
          '<span class="solo-claro">' + logoMarca(m, false) + '</span>' +
          '<span class="solo-oscuro">' + logoMarca(m, true) + '</span></a>';
      }).join('');
    }
  }

  // Los enlaces sin dirección no se mueven a ninguna parte.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-pendiente]');
    if (a) e.preventDefault();
  });

  // ---------- Panel de propuestas ----------
  function aplicar() {
    var b = document.body;
    b.classList.remove('eco-op-1', 'eco-op-2', 'eco-op-3', 'eco-op-4', 'eco-franja-clara', 'eco-franja-azul');
    b.classList.add('eco-op-' + estado.op, 'eco-franja-' + estado.franja);
    pintarLogosGrupo();
    var ops = document.querySelectorAll('.prop-op');
    for (var i = 0; i < ops.length; i++) ops[i].setAttribute('aria-pressed', String(Number(ops[i].getAttribute('data-op')) === estado.op));
    var seg = document.querySelectorAll('[data-franja]');
    for (var j = 0; j < seg.length; j++) {
      seg[j].setAttribute('aria-pressed', String(seg[j].getAttribute('data-franja') === estado.franja));
      seg[j].disabled = estado.op === 1;
    }
    var nota = document.getElementById('prop-franja-nota');
    if (nota) nota.hidden = estado.op !== 1;
    try {
      var u = new URL(window.location.href);
      u.searchParams.set('p', estado.op);
      u.searchParams.set('franja', estado.franja);
      window.history.replaceState(null, '', u.toString());
    } catch (err) { /* sin URL: no pasa nada */ }
  }

  function prepararPanel() {
    var panel = document.getElementById('prop-panel');
    if (!panel) return;
    var ops = panel.querySelectorAll('.prop-op');
    for (var i = 0; i < ops.length; i++) {
      ops[i].addEventListener('click', function () { estado.op = Number(this.getAttribute('data-op')); aplicar(); });
    }
    var seg = panel.querySelectorAll('[data-franja]');
    for (var j = 0; j < seg.length; j++) {
      seg[j].addEventListener('click', function () { estado.franja = this.getAttribute('data-franja'); aplicar(); });
    }
    var ir = panel.querySelectorAll('[data-ir]');
    for (var k = 0; k < ir.length; k++) {
      ir[k].addEventListener('click', function () {
        var destino = document.getElementById(this.getAttribute('data-ir'));
        if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    var tog = document.getElementById('prop-toggle');
    function alternar() {
      var abierto = panel.getAttribute('data-abierto') !== 'false';
      panel.setAttribute('data-abierto', String(!abierto));
      tog.textContent = abierto ? 'Mostrar' : 'Ocultar';
      tog.setAttribute('aria-expanded', String(!abierto));
    }
    tog.addEventListener('click', alternar);
    // Teclas para grabar el video: 1 a 4 cambian de propuesta, F cambia la franja, H oculta el panel.
    document.addEventListener('keydown', function (e) {
      var t = e.target && e.target.tagName;
      if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key >= '1' && e.key <= '4') { estado.op = Number(e.key); aplicar(); }
      else if (e.key === 'f' || e.key === 'F') { if (estado.op !== 1) { estado.franja = estado.franja === 'clara' ? 'azul' : 'clara'; aplicar(); } }
      else if (e.key === 'h' || e.key === 'H') alternar();
    });
  }

  function leerURL() {
    try {
      var q = new URL(window.location.href).searchParams;
      var p = Number(q.get('p'));
      if (PROPUESTAS[p]) estado.op = p;
      if (q.get('franja') === 'azul' || q.get('franja') === 'clara') estado.franja = q.get('franja');
      if (q.get('panel') === 'no') {
        var panel = document.getElementById('prop-panel');
        if (panel) { panel.setAttribute('data-abierto', 'false'); document.getElementById('prop-toggle').textContent = 'Mostrar'; }
      }
    } catch (err) { /* sin URL */ }
  }

  pintarBarra();
  pintarSelector();
  prepararSelector();
  pintarSeccion();
  pintarPie();
  prepararPanel();
  leerURL();
  aplicar();
})();
