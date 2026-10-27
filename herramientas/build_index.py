# Convierte el artboard "Claro-B-Patrocinio.dc.html" del lienzo de diseño en index.html (página estática).
#
# Uso (en una sesión de Claude):
#   1. Descargar del lienzo project/Claro-B-Patrocinio.dc.html (Artifact read) y guardarlo como SRC.
#   2. Tener las imágenes originales en las rutas U, L, W, Hd, D (o copiarlas desde assets/img de este repo).
#   3. Ajustar SP, SRC y REPO a las rutas de la sesión y ejecutar: python3 build_index.py
#
# Qué hace: cambia cada /_blob/<id> del lienzo por su archivo en assets/ (tabla M y web), resuelve las
# plantillas del lienzo ({{...}}, <sc-for>, <sc-if>) en HTML fijo, y agrega el JavaScript propio:
# rotación de fotos del encabezado (6 s), cuenta regresiva y validación del formulario de patrocinio
# (envío SIMULADO: todavía no hay base de datos). Si queda alguna plantilla sin resolver, se detiene.
#
import re, sys, os, shutil
SP='/tmp/claude-0/-home-claude/220b6a9c-791a-598d-b47b-963db34bf96b/scratchpad'
SRC=SP+'/cumbre/project/Claro-B-Patrocinio.dc.html'
REPO=SP+'/export/repo'
IMG=REPO+'/assets/img'; VID=REPO+'/assets/video'
os.makedirs(IMG,exist_ok=True); os.makedirs(VID,exist_ok=True)
U=SP+'/cumbre/upload/'; L=SP+'/cumbre/upload-logos/'; W=SP+'/fotos-web/web/'; Hd=SP+'/head/'; D=SP+'/drone/'
M={
'c6702d2aed5fb6e12eac734daf961280':(U+'foto-88A3286.jpg','foto-88A3286.jpg'),
'd538c1f5f293cf0be904bd129b7d5362':(U+'foto-88A3317.jpg','foto-88A3317.jpg'),
'3e2d6ce92c285114b86526f4fb8dd6f7':(U+'foto-88A4347.jpg','foto-88A4347.jpg'),
'7058eb4450a08e58f1890f88268e2665':(U+'logo-cumbre-blanco.png','logo-cumbre-blanco.png'),
'2173bd88d66fbe610bb7f89d1617e0f7':(U+'logo-cumbre-oscuro.png','logo-cumbre-oscuro.png'),
'2cb6d2bb594a062f984ae5bb7ba02309':(U+'anillo.png','anillo.png'),
'4344b2d0bd61a24bf0da7e9024f4a743':(U+'cinta-superior.png','cinta-superior.png'),
'2380b3771b88b80bdd987acb3e4c70c0':(U+'cinta-izquierda.png','cinta-izquierda.png'),
'983e5913ddd37236e04d2d007e5ab4b7':(U+'cinta-derecha.png','cinta-derecha.png'),
'5e6edf4f6e1f15809b41c889de29abfe':(U+'panal-claro-suave.svg','panal-claro-suave.svg'),
'8c391c075c2af140934c5f4b54cc3ff9':(U+'fondo-silicona.svg','fondo-silicona.svg'),
'b166cd522e8ae04fc0f3b97bebd40785':(U+'fondo-gasa.svg','fondo-gasa.svg'),
'eb37333e20fbe775a899b205e123a0bf':(L+'org-medical-shields.png','org-medical-shields.png'),
'f342fed16834599918f645bdb113a543':(L+'org-cuidamos-tu-herida.png','org-cuidamos-tu-herida.png'),
'5fbb09ca7501c3975248a3cfe5b31b9c':(L+'org-lider.png','org-lider.png'),
'8401235cd68cc3d288de163cc2ebdc50':(L+'org-producciones-24.png','org-producciones-24.png'),
'08f1873b5e8506667dfcecc5802d9373':(L+'org-espacio.png','org-espacio.png'),
'fc93e552d6f3c0bd5019f7cf76f174b5':(L+'aval-sociedad-venezolana-cirugia.png','aval-sociedad-venezolana-cirugia.png'),
'7b931501064388712a0d2426f43dd78f':(W+'plano-sede-v2.jpg','plano-sede-v2.jpg'),
'ef82a3e931a4568d7a0f2bc449ec76d5':(D+'dron-loop.mp4','VIDEO:dron-loop.mp4'),
'0c4d4c0db36024485677b9e0bde6ce0e':(D+'dron-poster.jpg','dron-poster.jpg'),
'05894c47dab978d70ee6aa404d8b6dd5':(Hd+'hero-_88A3359.jpg','hero-88A3359.jpg'),
'4c628ebe765474901a37f26df382b3c9':(Hd+'hero-_88A3236.jpg','hero-88A3236.jpg'),
'b6c4e566b7eaa038c805c7f2c3683c55':(Hd+'hero-_88A2431.jpg','hero-88A2431.jpg'),
'e915ab0f95ac9af5c7d926d8fe21472f':(Hd+'hero-_88A3276.jpg','hero-88A3276.jpg'),
'36a7943d6fe7eb3933d51a397a15895b':(Hd+'hero-_88A2394.jpg','hero-88A2394.jpg'),
'1ecf5df4938a6dd5c700d31514690a73':(Hd+'hero-_88A3297.jpg','hero-88A3297.jpg'),
}
web={'83c23c83bbb6e55254e93bd889bbbfbd':'IMG_7819','b1fe78612e6c3f9c34c6408083295189':'IMG_7825','872e5ba49b04a88881e1143b44f990de':'IMG_7826','e158d879a034d42bd5862287a1fde9a4':'IMG_7831','aaea91968b458ca42db6af0587428e31':'IMG_7844','8b974ad921657c9fffd7b84bdc67535e':'IMG_7847','67761697e88df5cf230c6e88dfba5de4':'IMG_7879','0c0b8dc47238d633cf1d87027867341e':'IMG_7882','40b6e4f5477dd336394219746993261e':'IMG_7900','41590352b63dfe786d15ec34bc1cd3bb':'_88A2516',
'b71250aa044faca202e00d3f0a4b6fb6':'IMG_7671','4cf56500d7f13b55b3b60d4429c24a1a':'_88A2667','169b66f268dcda650178903c6e95fe72':'_88A2298','11fe9cd3915f2a0cde80eedd358b35c4':'_88A2394','f48d1c40f826b933c0c0b752a9518cb2':'_88A2456','88793f88d419f6df7b4ab71b324a584f':'_88A2462','5d7e7274e74dd05d2b7502c8a1a93bfe':'_88A2749','c178bce60ad4c1925ba6e158d4f43d75':'_88A2774','5bd4c696dbe120e1914cf31989bca018':'IMG_7739','c6f5968a01381fabae45ae59c6c63317':'_88A3253','e00498151b153272973c1626eafa3f27':'_88A3261','a0cc71ff4f02c9fb2d70688db2746b8a':'_88A3276','6f68957ae1498ec670c8f62900d19ebd':'_88A2370','a4ee4e10eb2924f1ee193314e8a9aff4':'_88A3226','6c2ebc7d80332bf5004e5f3627ea778c':'_88A3297','0f54643afdddb48e32126fcd955c59c2':'_88A3319','e622f8f57d246472e9512b862cbe6d6f':'_88A3494','98a3b8c74294271ca9743e09e8586731':'_88A3692','bcdb29853e86a2882e11a123d9a9ffa9':'IMG_7771','11d563353b5e871ee6fefe58d8545d68':'_88A3482','5ff52582a5ed547ac41a4a474b7a3fb4':'IMG_7709','76c56eb183e3f21e7f86242d7033dc8f':'_88A3342','6c4d900cc27914f9bb6cd324543e5e80':'_88A3136','65e971ab82a98e4728e0a5256fed0ddf':'IMG_7677','c55d46b8ff0796d7df5e10fe9dbaf29c':'_88A3191','c29527bac4925b372303a71e5ff91f11':'_88A2513','f29d0c0ccf0b7b011615897385b95207':'_88A3147'}
for k,v in web.items(): M[k]=(W+v+'.jpg','evento-'+v.lstrip('_').replace('IMG_','img-').replace('88A','88a')+'.jpg')
def url(k):
    s,n=M[k]
    if n.startswith('VIDEO:'):
        n=n[6:]; shutil.copy(s,VID+'/'+n); return 'assets/video/'+n
    shutil.copy(s,IMG+'/'+n); return 'assets/img/'+n
src=open(SRC,encoding='utf-8').read()
helmet=re.search(r'<helmet>(.*?)</helmet>',src,re.S).group(1)
body=re.search(r'</helmet>(.*?)</x-dc>',src,re.S).group(1)
def sub1(pat,rep,flags=re.S):
    global body
    body,n=re.subn(pat,rep,body,flags=flags)
    assert n>=1,pat
# letters
word='HERIDAS Y PIEL'
spans=''.join('<span class="kt-letter%s" style="--d: %dms">%s</span>'%(' kt-last' if i==len(word)-1 else '',700+i*110,'&nbsp;' if c==' ' else c) for i,c in enumerate(word))
sub1(r'<sc-for list="\{\{letters\}\}".*?</sc-for>',lambda m:spans)
# hero slides
hero=[('05894c47dab978d70ee6aa404d8b6dd5','50% 40%'),('4c628ebe765474901a37f26df382b3c9','50% 50%'),('b6c4e566b7eaa038c805c7f2c3683c55','60% 50%'),('e915ab0f95ac9af5c7d926d8fe21472f','60% 40%'),('36a7943d6fe7eb3933d51a397a15895b','50% 50%'),('1ecf5df4938a6dd5c700d31514690a73','55% 40%')]
assert all(h in src for h,_ in hero)
sl=''.join(f'<div class="hero-slide{" on" if i==0 else ""}" style="background-image: url({url(h)}); background-position: {p}"></div>' for i,(h,p) in enumerate(hero))
sub1(r'<sc-for list="\{\{slides\}\}".*?</sc-for>',lambda m:sl)
# countdown
m=re.search(r'<sc-for list="\{\{cd\}\}"[^>]*>(.*?)</sc-for>',body,re.S); tpl=m.group(1)
cd=''.join(tpl.replace('{{c.v}}',f'<span data-cd="{k}">–</span>' if False else '–').replace('>–<',f' data-cd="{k}">–<',1) if False else tpl.replace('{{c.v}}','<span data-cd="%s">–</span>'%k).replace('{{c.l}}',l) for k,l in [('d','Días'),('h','Horas'),('m','Min'),('s','Seg')])
body=body[:m.start()]+cd+body[m.end():]
# form
sub1(r' value="\{\{f\.[a-z]+\}\}"','')
sub1(r' onChange="\{\{on\.[a-z]+\}\}"','')
sub1(r' aria-invalid="\{\{inv\.[a-z]+\}\}"',' aria-invalid="false"')
sub1(r'<sc-if value="\{\{e\.none\}\}"[^>]*>.*?</sc-if>','')
sub1(r'<sc-if value="\{\{e\.([a-z]+)\}\}"[^>]*><span id="([^"]+)" style="([^"]*)">\{\{e\.[a-z_]+\}\}</span></sc-if>',lambda m:f'<span id="{m.group(2)}" class="pf-err" hidden style="{m.group(3)}"></span>')
sub1(r'<sc-if value="\{\{showForm\}\}"[^>]*>\n<form onSubmit="\{\{submit\}\}"','<div id="pf-wrap">\n<form id="pf-form" action="#" method="post"')
sub1(r'</form>\n</sc-if>','</form>\n</div>')
sub1(r'<sc-if value="\{\{sendError\}\}"[^>]*><div role="alert"','<div id="pf-senderr" hidden role="alert"')
sub1(r'(intentalo|Inténtalo) de nuevo en unos momentos\.</div></sc-if>',lambda m:m.group(1)+' de nuevo en unos momentos.</div>')
sub1(r'<button type="submit" disabled="\{\{sending\}\}"','<button id="pf-btn" type="submit"')
sub1(r'\{\{btnLabel\}\}','Solicitar propuesta de patrocinio')
sub1(r'<sc-if value="\{\{sent\}\}"[^>]*>\n<div role="status"','<div id="pf-ok" hidden>\n<div role="status"')
sub1(r'(Hablar con el equipo por WhatsApp →</a>\n</div>)\n</sc-if>',r'\1\n</div>')
sub1(r' onClick="\{\{preStand\}\}"',' id="pre-stand"')
sub1(r'<option value="" disabled="disabled">','<option value="" disabled="disabled" selected="selected">')
left=re.findall(r'\{\{[^}]*\}\}|<sc-|</sc-',body)
if left: print('UNRESOLVED',left[:10]); sys.exit(1)
doc_all=helmet+body
for k in set(re.findall(r'/_blob/([0-9a-f]{32})',doc_all)):
    if k not in M: print('NOMAP',k); sys.exit(1)
rb=lambda t: re.sub(r'/_blob/([0-9a-f]{32})',lambda m:url(m.group(1)),t)
helmet=rb(helmet); body=rb(body)
JS=r'''
<script>
(function(){
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// fotos del encabezado: una a la vez, 6 s cada una
var sl=[].slice.call(document.querySelectorAll('.hero-slide')),i=0;
if(sl.length>1){setInterval(function(){sl[i].classList.remove('on');i=(i+1)%sl.length;sl[i].classList.add('on');},6000);}
// cuenta regresiva
var target=Date.parse('2027-05-12T08:00:00-04:00');
function pad(n){return String(n).padStart(2,'0');}
function tick(){var s=Math.max(0,Math.floor((target-Date.now())/1000));var d=Math.floor(s/86400);s-=d*86400;var h=Math.floor(s/3600);s-=h*3600;var m=Math.floor(s/60);s-=m*60;
var v={d:String(d),h:pad(h),m:pad(m),s:pad(s)};for(var k in v){var el=document.querySelector('[data-cd="'+k+'"]');if(el)el.textContent=v[k];}}
tick();setInterval(tick,1000);
// formulario de patrocinio (envio simulado: aun no hay base de datos)
var form=document.getElementById('pf-form');if(!form)return;
var btn=document.getElementById('pf-btn'),wrap=document.getElementById('pf-wrap'),ok=document.getElementById('pf-ok'),serr=document.getElementById('pf-senderr');
var REQ='Completa este campo para continuar.',BAD='Escribe un correo electrónico válido.';
function setErr(id,msg){var f=document.getElementById(id),e=document.getElementById(id+'-err');if(!f||!e)return;if(msg){e.textContent=msg;e.hidden=false;f.setAttribute('aria-invalid','true');}else{e.textContent='';e.hidden=true;f.setAttribute('aria-invalid','false');}}
['pf-nombre','pf-empresa','pf-correo','pf-opcion'].forEach(function(id){var f=document.getElementById(id);f.addEventListener('input',function(){setErr(id,'');});f.addEventListener('change',function(){setErr(id,'');});});
var pre=document.getElementById('pre-stand');if(pre)pre.addEventListener('click',function(){document.getElementById('pf-opcion').value='Stand o espacio de exposición';setErr('pf-opcion','');if(ok.hidden===false){ok.hidden=true;wrap.hidden=false;}});
form.addEventListener('submit',function(ev){ev.preventDefault();serr.hidden=true;var first=null;
['pf-nombre','pf-empresa','pf-correo','pf-opcion'].forEach(function(id){var v=String(document.getElementById(id).value||'').trim();var msg=v?'':REQ;if(!msg&&id==='pf-correo'&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))msg=BAD;setErr(id,msg);if(msg&&!first)first=id;});
if(first){document.getElementById(first).focus();return;}
btn.disabled=true;btn.textContent='Enviando solicitud…';
setTimeout(function(){wrap.hidden=true;ok.hidden=false;btn.disabled=false;btn.textContent='Solicitar propuesta de patrocinio';},1200);});
})();
</script>'''
html_doc='''<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Cumbre Internacional para el Cuidado Avanzado de Heridas y Piel · 2da edición</title>
'''+helmet+'''
<style>
html{scroll-behavior:smooth}
[hidden]{display:none!important}
.draft-badge{position:fixed;left:16px;bottom:16px;z-index:80;font-family:'Barlow',system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.04em;color:#0A1040;background:#F3E3A6;padding:8px 14px;border-radius:999px;box-shadow:0 6px 20px rgba(10,16,64,0.25)}
@media (max-width: 760px){.draft-badge{font-size:11px;left:10px;bottom:10px;padding:6px 10px}}
</style>
</head>
<body>
'''+body+'''
<div class="draft-badge">Propuesta de diseño · borrador para revisión</div>
'''+JS+'''
</body>
</html>
'''
open(REPO+'/index.html','w',encoding='utf-8').write(html_doc)
print('OK',len(html_doc))
