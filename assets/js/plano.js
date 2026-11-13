/*
  Plano interactivo del área de exhibición (13 nov 2026).
  El dibujo está en assets/img/plano-sede.svg (hecho desde el PDF de Producciones 24, mismas posiciones).
  Aquí se inserta dentro de la página para poder tocar cada stand: muestra su número y lleva al formulario
  de patrocinio con el stand ya escrito. No muestra disponibilidad: eso lo confirma el equipo comercial.
*/
(function () {
  var caja = document.getElementById('plano-mapa'); if (!caja || !window.fetch) return;
  var info = document.getElementById('plano-info'), tit = document.getElementById('plano-info-tit'),
      txt = document.getElementById('plano-info-txt'), btn = document.getElementById('plano-info-btn');
  var actual = null;

  fetch(caja.getAttribute('data-svg')).then(function (r) { if (!r.ok) throw r; return r.text(); }).then(function (svg) {
    caja.innerHTML = svg; caja.classList.add('listo');
    // En el teléfono el plano es más ancho que la pantalla: empieza mostrando la zona de stands.
    if (caja.scrollWidth > caja.clientWidth) caja.scrollLeft = (caja.scrollWidth - caja.clientWidth) * 0.55;
    caja.addEventListener('click', function (e) { var g = e.target.closest && e.target.closest('.st'); if (g) elegir(g); });
    caja.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var g = e.target.closest && e.target.closest('.st'); if (g) { e.preventDefault(); elegir(g); }
    });
  }).catch(function () { /* se queda la imagen */ });

  function elegir(g) {
    if (actual) actual.classList.remove('sel');
    actual = g; g.classList.add('sel');
    var n = g.getAttribute('data-n'), cb = g.classList.contains('cb');
    tit.textContent = cb ? 'Punto de comida y bebidas ' + n : 'Stand ' + n;
    txt.textContent = cb ? 'Espacio para comida y bebidas.' : 'Stand de 2 × 2 m.';
    info.hidden = false;
  }

  btn.addEventListener('click', function () {
    if (!actual) return;
    var n = actual.getAttribute('data-n'), cb = actual.classList.contains('cb');
    var obj = document.getElementById('pf-objetivo');
    var frase = cb ? 'Me interesa el punto de comida y bebidas ' + n + ' del plano.' : 'Me interesa el stand ' + n + ' del plano.';
    if (obj && (!obj.value.trim() || /^Me interesa (el stand|el punto de comida y bebidas) \d+ del plano\.$/.test(obj.value.trim()))) obj.value = frase;
    var pre = document.getElementById('pre-stand');
    if (pre) pre.click(); else location.hash = '#formulario-patrocinio';
  });
})();
