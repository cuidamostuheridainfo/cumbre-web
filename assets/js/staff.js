/*
  App del staff — acreditación Cumbre 2027 (staff/index.html).
  Funciona SIN internet: antes de abrir la puerta se descarga la lista de inscritos y queda guardada en el teléfono.
  Cada registro (entrada, reingreso, kit, envío a la mesa de soluciones) se guarda en el teléfono y queda "por subir".
  FASE 1: lista de prueba (acred-prueba.js) y nada se envía. FASE 2: lista desde Supabase, inicio de sesión del staff
  y subida automática de la cola cuando haya conexión (así las otras puertas se enteran de quién ya entró).
*/
(function () {
  var A = window.ACRED, C = window.INSCRIPCION_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var K_CFG = 'cumbre27_staff_cfg', K_LISTA = 'cumbre27_staff_lista', K_REG = 'cumbre27_staff_registros';
  var cfg = A.leer(K_CFG, null), lista = A.leer(K_LISTA, null), regs = A.leer(K_REG, []), actual = null;

  var guardarRegs = function () { if (!A.guardar(K_REG, regs)) alert('Este teléfono no pudo guardar el registro. Avisa al coordinador y usa otro teléfono.'); };
  var nuevoId = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };
  var porCodigo = function (c) { return (lista ? lista.asistentes : []).filter(function (a) { return a.codigo === c; })[0] || null; };
  var nomDe = function (a) { return a.nombre + ' ' + a.apellido; };
  var modo = function () { return ($('input[name="modo"]:checked') || {}).value || 'entrada'; };

  // ---------- Preparación ----------
  var pintarLista = function () {
    $('#lista-txt').textContent = lista
      ? 'Lista descargada: ' + lista.asistentes.length + ' inscritos · ' + new Date(lista.descargada).toLocaleString('es-VE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
      : 'Lista de inscritos sin descargar.';
    $('#btn-lista').textContent = lista ? 'Actualizar lista' : 'Descargar lista';
  };
  $('#btn-lista').addEventListener('click', function () {
    // FASE 2: descargar desde la función del servidor (requiere sesión del staff).
    var p = window.ACRED_PRUEBA;
    lista = { descargada: new Date().toISOString(), generado: p.generado, asistentes: p.asistentes };
    if (!A.guardar(K_LISTA, lista)) { $('#prep-err').textContent = 'Este teléfono no permite guardar la lista. Revisa que no esté en modo privado.'; $('#prep-err').hidden = false; return; }
    $('#prep-err').hidden = true; pintarLista();
  });
  $('#f-prep').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!lista) { $('#prep-err').textContent = 'Descarga la lista de inscritos antes de comenzar.'; $('#prep-err').hidden = false; return; }
    cfg = { puesto: $('#sel-puesto').value, dia: +$('#sel-dia').value }; A.guardar(K_CFG, cfg); iniciar();
  });
  $('#btn-cambiar').addEventListener('click', function () { $('#v-puesto').hidden = true; $('#v-prep').hidden = false; });

  var iniciar = function () {
    $('#v-prep').hidden = true; $('#v-puesto').hidden = false;
    $('#lbl-puesto').textContent = cfg.puesto;
    $('#lbl-dia').textContent = A.dias[cfg.dia].nombre + ' · ' + A.dias[cfg.dia].largo;
    $('input[name="modo"][value="' + (cfg.puesto === 'Mesa de kits' ? 'kit' : 'entrada') + '"]').checked = true;
    limpiar(); contar(); historial();
  };

  // ---------- Validación ----------
  var entradaDe = function (c) { return regs.filter(function (r) { return r.codigo === c && r.dia === cfg.dia && (r.tipo === 'entrada' || r.tipo === 'reingreso'); }); };
  var kitDe = function (c) { return regs.filter(function (r) { return r.codigo === c && r.tipo === 'kit'; })[0] || null; };
  var validar = function (raw) {
    var cod = A.leerCodigo(raw);
    if (!cod) return { color: 'rojo', ver: 'Código no válido', det: 'Este QR no es un pase de la Cumbre 2027.', acc: ['derivar'] };
    var a = porCodigo(cod);
    if (!a) return { color: 'rojo', ver: 'No está en la lista', det: 'Código ' + cod + '. Si se inscribió hace poco, actualiza la lista; si no, envíalo a la mesa de soluciones.', acc: ['derivar'], cod: cod };
    var pase = A.pases[a.pase], det = (A.perfiles[a.perfil] || '') + ' · Pase ' + pase.nombre + ' · ' + (a.modalidad === 'kit' ? 'Con kit' : 'Gratuita');
    var base = { a: a, nom: nomDe(a), det: det };
    if (a.modalidad === 'kit' && a.pago !== 'confirmado') return Object.assign(base, { color: 'ambar', ver: 'Pago del kit sin confirmar', extra: 'Su inscripción con kit todavía no está aprobada. Envíala a la mesa de soluciones.', acc: ['derivar'] });
    if (pase.dias.indexOf(cfg.dia) < 0) return Object.assign(base, { color: 'amarillo', ver: 'Día equivocado', extra: 'Su pase es para ' + pase.nombre + ' (' + pase.dias.map(function (n, i) { var l = A.dias[n].largo; return i ? l.charAt(0).toLowerCase() + l.slice(1) : l; }).join(' y ') + ').', acc: ['derivar'] });
    if (modo() === 'kit') {
      if (a.modalidad !== 'kit') return Object.assign(base, { color: 'gris', ver: 'Sin kit', extra: 'Tiene inscripción gratuita: no incluye kit.', acc: [] });
      var k = kitDe(a.codigo);
      if (k) return Object.assign(base, { color: 'naranja', ver: 'Kit ya entregado', extra: 'Se entregó el ' + A.dias[k.dia].nombre + ' a las ' + A.hora(k.hora) + ' en ' + k.puesto + '.', acc: [] });
      return Object.assign(base, { color: 'verde', ver: 'Entregar kit', extra: (C.kit || []).join(' · '), acc: ['kit'] });
    }
    var prev = entradaDe(a.codigo);
    if (prev.length) return Object.assign(base, { color: 'naranja', ver: 'Ya entró hoy', extra: 'Entró a las ' + A.hora(prev[0].hora) + ' por ' + prev[0].puesto + '. Si salió y vuelve, registra el reingreso.', acc: ['reingreso', 'derivar'] });
    var r = registrar('entrada', a);
    var pendKit = a.modalidad === 'kit' && !kitDe(a.codigo);
    return Object.assign(base, { color: 'verde', ver: 'Puede entrar', extra: 'Entrada registrada a las ' + A.hora(r.hora) + '.' + (pendKit ? ' Tiene kit por retirar: indícale la mesa de kits.' : ''), acc: [] });
  };
  var registrar = function (tipo, a, motivo) {
    var r = { id: nuevoId(), tipo: tipo, codigo: a ? a.codigo : (actual && actual.cod) || '', nombre: a ? nomDe(a) : '', dia: cfg.dia, hora: new Date().toISOString(), puesto: cfg.puesto, motivo: motivo || '', subido: false };
    regs.push(r); guardarRegs(); contar(); historial(); return r;
  };

  // ---------- Resultado en pantalla ----------
  var ACC = {
    kit: '<button type="button" class="btn-pri" data-acc="kit">Confirmar entrega del kit</button>',
    reingreso: '<button type="button" class="btn-pri" data-acc="reingreso">Registrar reingreso</button>',
    derivar: '<button type="button" class="btn-sec" data-acc="derivar">Enviar a la mesa de soluciones</button>'
  };
  var mostrar = function (res) {
    actual = res;
    var el = $('#res'); el.className = 'res res-' + res.color; el.hidden = false;
    $('#res-ver').textContent = res.ver;
    $('#res-nom').textContent = res.nom || ''; $('#res-nom').hidden = !res.nom;
    $('#res-det').textContent = res.det || '';
    $('#res-extra').textContent = res.extra || ''; $('#res-extra').hidden = !res.extra;
    $('#res-acc').innerHTML = (res.acc || []).map(function (k) { return ACC[k]; }).join('') + '<button type="button" class="btn-sec" data-acc="siguiente">Siguiente</button>';
    if (navigator.vibrate) navigator.vibrate(res.color === 'verde' ? 60 : [80, 60, 80]);
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };
  var limpiar = function () { $('#res').hidden = true; actual = null; $('#resultados').innerHTML = ''; $('#inp-buscar').value = ''; };
  $('#res-acc').addEventListener('click', function (e) {
    var b = e.target.closest('[data-acc]'); if (!b) return;
    var k = b.getAttribute('data-acc');
    if (k === 'siguiente') { limpiar(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    if (k === 'kit') { var r = registrar('kit', actual.a); mostrar(Object.assign({}, actual, { color: 'verde', ver: 'Kit entregado', extra: 'Registrado a las ' + A.hora(r.hora) + '.', acc: [] })); return; }
    if (k === 'reingreso') { var r2 = registrar('reingreso', actual.a); mostrar(Object.assign({}, actual, { color: 'verde', ver: 'Reingreso registrado', extra: 'A las ' + A.hora(r2.hora) + '.', acc: [] })); return; }
    if (k === 'derivar') { $('#der-quien').textContent = actual.nom || ('Código ' + (actual.cod || 'sin leer')); $('#dlg-der').showModal(); }
  });
  $('#der-cancelar').addEventListener('click', function () { $('#dlg-der').close(); });
  $('#der-ok').addEventListener('click', function () {
    registrar('incidencia', actual && actual.a, $('#der-motivo').value); $('#dlg-der').close();
    mostrar(Object.assign({}, actual, { color: 'gris', ver: 'Enviado a la mesa de soluciones', extra: 'Motivo: ' + $('#der-motivo').value + '. Indícale dónde queda la mesa.', acc: [] }));
  });

  // ---------- Búsqueda manual (plan B si el QR no se lee) ----------
  var norm = function (t) { return String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  $('#f-buscar').addEventListener('submit', function (e) {
    e.preventDefault();
    var q = $('#inp-buscar').value.trim(); if (!q) return;
    var cod = A.leerCodigo(q); if (cod) { $('#resultados').innerHTML = ''; mostrar(validar(cod)); return; }
    var dig = q.replace(/\D/g, ''), t = norm(q);
    var hall = (lista ? lista.asistentes : []).filter(function (a) {
      return (dig.length >= 5 && a.cedula.replace(/\D/g, '').indexOf(dig) === 0) || (!dig && t.length >= 2 && (norm(a.apellido).indexOf(t) === 0 || norm(nomDe(a)).indexOf(t) >= 0));
    }).slice(0, 8);
    $('#resultados').innerHTML = hall.length ? hall.map(function (a) {
      return '<li><button type="button" data-cod="' + A.esc(a.codigo) + '"><strong>' + A.esc(nomDe(a)) + '</strong><span>' + A.esc(a.cedula) + ' · ' + A.esc(A.pases[a.pase].nombre) + '</span></button></li>';
    }).join('') : '<li class="vacio">No hay nadie con esos datos en la lista. Revisa la cédula o el apellido.</li>';
  });
  $('#resultados').addEventListener('click', function (e) { var b = e.target.closest('[data-cod]'); if (b) { $('#resultados').innerHTML = ''; mostrar(validar(b.getAttribute('data-cod'))); } });

  // ---------- Escáner ----------
  var dlg = $('#dlg-esc'), lector = null;
  var cerrarEsc = function () {
    if (lector) { var l = lector; lector = null; l.stop().catch(function () {}).then(function () { try { l.clear(); } catch (e) {} }); }
    if (dlg.open) dlg.close();
  };
  $('#btn-esc').addEventListener('click', function () {
    if (!window.Html5Qrcode) { alert('No se pudo cargar el lector. Usa la búsqueda por cédula.'); return; }
    limpiar(); dlg.showModal(); $('#esc-estado').textContent = 'Abriendo la cámara…';
    lector = new Html5Qrcode('lector');
    lector.start({ facingMode: 'environment' }, { fps: 12, qrbox: function (w, h) { var s = Math.min(w, h) * 0.72; return { width: s, height: s }; } },
      function (txt) { cerrarEsc(); mostrar(validar(txt)); }, function () {})
      .then(function () { $('#esc-estado').textContent = 'Cámara activa. Apunta al QR.'; })
      .catch(function () { $('#esc-estado').textContent = 'No hay permiso para la cámara. Actívalo en el navegador o usa la búsqueda por cédula.'; });
  });
  $('#esc-cerrar').addEventListener('click', cerrarEsc);
  dlg.addEventListener('close', cerrarEsc);

  // ---------- Contadores, historial y CSV ----------
  var contar = function () {
    var hoy = regs.filter(function (r) { return r.dia === cfg.dia; });
    $('#c-entradas').textContent = hoy.filter(function (r) { return r.tipo === 'entrada'; }).length;
    $('#c-kits').textContent = regs.filter(function (r) { return r.tipo === 'kit'; }).length;
    $('#c-cola').textContent = regs.filter(function (r) { return !r.subido; }).length;
  };
  var NOMBRE_TIPO = { entrada: 'Entrada', reingreso: 'Reingreso', kit: 'Kit entregado', incidencia: 'Mesa de soluciones' };
  var historial = function () {
    $('#hist').innerHTML = regs.filter(function (r) { return r.puesto === cfg.puesto; }).slice(-15).reverse().map(function (r) {
      return '<li><time>' + A.hora(r.hora) + '</time><span>' + A.esc(r.nombre || r.codigo || 'Sin código') + '</span><em>' + NOMBRE_TIPO[r.tipo] + (r.motivo ? ': ' + A.esc(r.motivo) : '') + '</em></li>';
    }).join('') || '<li class="vacio">Todavía no hay registros en este puesto.</li>';
  };
  $('#btn-csv').addEventListener('click', function () {
    var cab = ['fecha_hora', 'dia', 'puesto', 'tipo', 'codigo', 'nombre', 'motivo'];
    var q = function (v) { return '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'; };
    var csv = '﻿' + cab.join(',') + '\n' + regs.map(function (r) { return [r.hora, r.dia, r.puesto, r.tipo, r.codigo, r.nombre, r.motivo].map(q).join(','); }).join('\n');
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'acreditacion-' + cfg.puesto.replace(/\s+/g, '-').toLowerCase() + '-dia' + cfg.dia + '.csv'; a.click();
  });

  // ---------- Arranque ----------
  $('#prep-prueba').hidden = !A.MODO_PRUEBA;
  var hoyN = A.diaDeHoy(); if (hoyN) $('#sel-dia').value = String(hoyN);
  if (cfg) { $('#sel-puesto').value = cfg.puesto; $('#sel-dia').value = String(hoyN || cfg.dia); }
  pintarLista();
  if (cfg && lista && (!hoyN || hoyN === cfg.dia)) iniciar();
})();
