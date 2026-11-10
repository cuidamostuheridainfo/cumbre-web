/*
  Acreditación Cumbre 2027 — reglas compartidas por la inscripción, la app del participante y la app del staff.

  El QR de cada participante lleva SOLO un código aleatorio (por ejemplo K7QM-3XRP-9TWA), sin datos personales.
  Es imposible de adivinar: 12 caracteres de un alfabeto de 32 (sin O/0/I/1 para que no se confundan al dictarlo).
  El staff lo valida contra la lista de inscritos del día, que descarga antes y guarda en el teléfono (funciona sin internet).
  FASE 1: la lista sale de assets/js/acred-prueba.js (datos de prueba). FASE 2: sale de Supabase.
*/
(function () {
  var A = window.ACRED = {};

  A.MODO_PRUEBA = true; // fase 1: lista de prueba y sin envío al servidor

  // Días del evento. "n" es el número de día; la fecha manda en la app del staff.
  A.dias = {
    1: { fecha: '2027-05-12', nombre: 'Día 1', largo: 'Miércoles 12 de mayo' },
    2: { fecha: '2027-05-13', nombre: 'Día 2', largo: 'Jueves 13 de mayo' },
    3: { fecha: '2027-05-14', nombre: 'Día 3', largo: 'Viernes 14 de mayo' }
  };
  // Pases: qué días habilita cada uno. "tres-dias" lo carga el equipo (VIP, ponentes, invitados); no sale en la web.
  A.pases = {
    'dia-1': { dias: [1], nombre: 'Día 1' },
    'dias-2-3': { dias: [2, 3], nombre: 'Días 2 y 3' },
    'tres-dias': { dias: [1, 2, 3], nombre: 'Los tres días' }
  };
  A.perfiles = {
    especialista: 'Especialista médico',
    enfermeria: 'Enfermería, paramédicos y rescatistas',
    otras: 'Otras áreas de la salud',
    estudiante: 'Estudiante de medicina',
    interno: 'Invitado de la organización'
  };
  // Regla del certificado (en 2026 eran 5 conferencias). Por confirmar con la organización para 2027.
  A.conferenciasParaCertificado = 5;

  var ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  A.generarCodigo = function () {
    var b = new Uint8Array(12), s = '';
    (window.crypto || window.msCrypto).getRandomValues(b);
    for (var i = 0; i < 12; i++) { s += ALFABETO[b[i] % 32]; if (i === 3 || i === 7) s += '-'; }
    return s;
  };
  var RE_COD = /^[A-HJ-NP-Z2-9]{4}-?[A-HJ-NP-Z2-9]{4}-?[A-HJ-NP-Z2-9]{4}$/;
  // Acepta el código solo, con o sin guiones, o un enlace con ?c=CODIGO. Devuelve el código normalizado o null.
  A.leerCodigo = function (raw) {
    var t = String(raw || '').trim();
    var m = t.match(/[?&]c=([^&#\s]+)/); if (m) t = decodeURIComponent(m[1]);
    t = t.toUpperCase().replace(/\s+/g, '');
    if (!RE_COD.test(t)) return null;
    t = t.replace(/-/g, '');
    return t.slice(0, 4) + '-' + t.slice(4, 8) + '-' + t.slice(8);
  };
  // QR de las conferencias (se proyecta en la sala): CUMBRE27-CONF:D2-07
  A.leerConferencia = function (raw) {
    var m = String(raw || '').trim().toUpperCase().match(/CUMBRE27-CONF:(D[123]-\d{2})/);
    return m ? m[1] : null;
  };

  A.diaDeHoy = function () {
    var h = new Date(), f = h.getFullYear() + '-' + String(h.getMonth() + 1).padStart(2, '0') + '-' + String(h.getDate()).padStart(2, '0');
    for (var n in A.dias) if (A.dias[n].fecha === f) return +n;
    return null;
  };
  A.hora = function (iso) { var d = iso ? new Date(iso) : new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
  A.esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  // Almacenamiento local con protección (modo privado, navegador sin permiso, etc.)
  A.leer = function (k, def) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } };
  A.guardar = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  A.borrar = function (k) { try { localStorage.removeItem(k); } catch (e) {} };

  A.CLAVE_ASISTENTE = 'cumbre27_asistente';
})();
