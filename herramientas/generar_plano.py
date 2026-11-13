"""Genera assets/img/plano-sede.svg desde el PDF de Producciones 24 (13 nov 2026).
Uso: python herramientas/generar_plano.py "ruta/cumbrefinal copia.pdf" assets/img/plano-sede.svg
Necesita PyMuPDF (pip install pymupdf). Toma del PDF las posiciones exactas de los 142 stands, la sala,
el área VIP, los cafés, el stand de Medical Shields y el contorno del local; los baños se ubican a mano."""
import sys, pymupdf as fitz, math
pg=fitz.open(sys.argv[1])[0]
dr=pg.get_drawings()
K=lambda d: tuple(round(v,2) for v in d['fill']) if d.get('fill') else None
f=lambda v: f'{v:.1f}'.rstrip('0').rstrip('.')
def path_d(d):
    out=[]; cur=None
    for it in d['items']:
        op=it[0]
        if op=='l':
            a,b=it[1],it[2]
            if cur is None or abs(cur.x-a.x)>.05 or abs(cur.y-a.y)>.05: out.append(f'M{f(a.x)} {f(a.y)}')
            out.append(f'L{f(b.x)} {f(b.y)}'); cur=b
        elif op=='c':
            a,c1,c2,b=it[1:5]
            if cur is None or abs(cur.x-a.x)>.05 or abs(cur.y-a.y)>.05: out.append(f'M{f(a.x)} {f(a.y)}')
            out.append(f'C{f(c1.x)} {f(c1.y)} {f(c2.x)} {f(c2.y)} {f(b.x)} {f(b.y)}'); cur=b
        elif op=='re':
            r=it[1]; out.append(f'M{f(r.x0)} {f(r.y0)}H{f(r.x1)}V{f(r.y1)}H{f(r.x0)}Z'); cur=None
        elif op=='qu':
            q=it[1]; out.append(f'M{f(q.ul.x)} {f(q.ul.y)}L{f(q.ur.x)} {f(q.ur.y)}L{f(q.lr.x)} {f(q.lr.y)}L{f(q.ll.x)} {f(q.ll.y)}Z'); cur=None
    if d.get('closePath'): out.append('Z')
    return ''.join(out)
def una(col): return [d for d in dr if K(d)==col]
piso=[d for d in una((0.0,0.43,0.47)) if len(d['items'])>5][0]
sala=una((0.31,0.78,0.47))[0]; cam=una((0.53,0.81,0.92))[0]; vip=una((0.66,0.9,0.81))[0]; patio=una((0.8,0.98,0.14))[0]
backings=[una((0.13,0.66,0.96))[0]]  # el segundo "Backing firma" del PDF se quitó a pedido de Jenny (13 nov)
tar=una((0.42,0.4,0.41)); tr=fitz.Rect(min(d['rect'].x0 for d in tar),min(d['rect'].y0 for d in tar),max(d['rect'].x1 for d in tar),max(d['rect'].y1 for d in tar))
cols=una((0.49,0.49,0.49))
cafes=una((0.68,0.46,0.13))
ms=una((0.53,0.36,0.96))
# sillas
sillas=[d['rect'] for d in dr if K(d)==(0.0,0.0,0.0) and len(d['items'])==6 and 3.5<d['rect'].width<5 and 260<d['rect'].x0<570 and 330<d['rect'].y0<515]
# stands
chars=[]
for b in pg.get_text('rawdict')['blocks']:
    for l in b.get('lines',[]):
        for s in l['spans']:
            for c in s['chars']:
                if c['c'].isdigit(): x0,y0,x1,y1=c['bbox']; chars.append(((x0+x1)/2,(y0+y1)/2,c['c']))
stands=[]
for d in dr:
    if K(d)==(1.0,1.0,1.0) and round(d['rect'].width)==13:
        r=d['rect']; cs=sorted([c for c in chars if r.x0<=c[0]<=r.x1 and r.y0<=c[1]<=r.y1],key=lambda c:c[0])
        stands.append((int(''.join(c[2] for c in cs)),(r.x0+r.x1)/2,(r.y0+r.y1)/2))
stands.sort()
assert [s[0] for s in stands]==list(range(1,143))
huellas=[d for d in dr if K(d) in [(0.16,0.71,0.93),(0.09,0.2,0.94)] and d['rect'].width<9]
def hull(pts):
    pts=sorted(set((round(p[0],2),round(p[1],2)) for p in pts))
    def cr(o,a,b): return (a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0])
    lo=[];up=[]
    for p in pts:
        while len(lo)>=2 and cr(lo[-2],lo[-1],p)<=0: lo.pop()
        lo.append(p)
    for p in reversed(pts):
        while len(up)>=2 and cr(up[-2],up[-1],p)<=0: up.pop()
        up.append(p)
    return lo[:-1]+up[:-1]
def pts_of(d):
    P=[]
    for it in d['items']:
        for v in it[1:]:
            if isinstance(v,fitz.Point): P.append((v.x,v.y))
            elif isinstance(v,fitz.Rect): P+= [(v.x0,v.y0),(v.x1,v.y0),(v.x1,v.y1),(v.x0,v.y1)]
            elif isinstance(v,fitz.Quad): P+= [(v.ul.x,v.ul.y),(v.ur.x,v.ur.y),(v.lr.x,v.lr.y),(v.ll.x,v.ll.y)]
    return P
def eje(P):
    cx=sum(p[0] for p in P)/len(P); cy=sum(p[1] for p in P)/len(P)
    sxx=sum((p[0]-cx)**2 for p in P); syy=sum((p[1]-cy)**2 for p in P); sxy=sum((p[0]-cx)*(p[1]-cy) for p in P)
    a=0.5*math.degrees(math.atan2(2*sxy,sxx-syy))
    if a>90: a-=180
    if a<-90: a+=180
    if a>45: a-=90 if False else 0
    return cx,cy,a
poly=lambda H:'M'+'L'.join(f'{f(x)} {f(y)}' for x,y in H)+'Z'
msP=[];[msP.extend(pts_of(d)) for d in ms]; msH=hull(msP); mcx,mcy,ma=eje(msH)
# baños (estimados desde la imagen; sin vector en el PDF)
banos=[(383,553),(420,553)]
S=[]
S.append('<svg xmlns="http://www.w3.org/2000/svg" viewBox="14 4 724 580" role="img" aria-labelledby="pl-tit pl-desc">')
S.append('<title id="pl-tit">Plano del área de exhibición · II Cumbre Internacional para el Cuidado Avanzado de Heridas, Piel y Longevidad</title>')
S.append('<desc id="pl-desc">Centro Comercial Líder, Caracas. 142 stands numerados, sala de conferencias, área VIP, cafés, puntos de comida y bebidas, stand de Medical Shields, entrada, salidas y baños.</desc>')
S.append('''<style>
.pl-fondo{fill:#FFFFFF}.pl-piso{fill:#F2EADB}.pl-patio{fill:#ECEDEF;stroke:#A7ADB8;stroke-width:.8;stroke-dasharray:3 2}
.pl-sala{fill:#BFE0F7}.pl-silla{fill:#5B8DBF}.pl-tarima{fill:#CDB066}.pl-cam{fill:#0086FF}.pl-vip{fill:#84B853}.pl-lab.pl-lab-oro{fill:#F3E3A6}.pl-ley{font-family:'Barlow','Arial',sans-serif;font-size:9px;fill:#0A1040;dominant-baseline:central}.pl-ley-t{font-family:'Barlow Semi Condensed','Arial',sans-serif;font-style:italic;font-weight:700;font-size:13px;fill:#0A1040;text-transform:uppercase}.pl-etq{fill:#FFFFFF;fill-opacity:.85}
.pl-col{fill:#9C9483}.pl-back{fill:#0A6CFF}.pl-cafe{fill:#C98A3B}.pl-ms{fill:#FFFFFF;stroke:#0086FF;stroke-width:1}.pl-huella{fill:#E1D3B4}.pl-arq{fill:none;stroke:#6E6656;stroke-linecap:round;stroke-linejoin:round}
.pl-lab{font-family:'Barlow','Arial',sans-serif;fill:#FFFFFF;font-weight:700;text-anchor:middle;dominant-baseline:central}
.pl-lab-o{fill:#0A1040}.pl-lab-s{font-weight:700;fill:#FFFFFF}
.st circle{fill:#FFFFFF;stroke:#0A1040;stroke-width:.8;transition:fill .15s}
.st text{font-family:'Barlow','Arial',sans-serif;font-size:6.1px;font-weight:700;letter-spacing:-.15px;fill:#0A1040;text-anchor:middle;dominant-baseline:central;pointer-events:none}
.st.cb circle{fill:#F7153B;stroke:#A50E27}.st.cb text{fill:#FFFFFF}
.st{cursor:pointer;outline:none}.st:hover circle,.st:focus-visible circle{fill:#F3E3A6}.st.cb:hover circle,.st.cb:focus-visible circle{fill:#FF6B84}
.st.sel circle{fill:#CDB066;stroke:#0A1040;stroke-width:1.4}.st.sel text{fill:#0A1040}
.pl-chip{fill:#CDB066}.pl-chip-s{fill:#FFFFFF;stroke:#0A1040;stroke-width:.7}.pl-chip-t{font-family:'Barlow','Arial',sans-serif;font-size:7.5px;font-weight:700;fill:#0A1040;text-anchor:middle;dominant-baseline:central;letter-spacing:.4px}
</style>''')
S.append('<rect class="pl-fondo" x="14" y="4" width="724" height="580"/>')
S.append(f'<path class="pl-patio" d="{path_d(patio)}"/>')
S.append(f'<path class="pl-piso" d="{path_d(piso)}"/>')
S.append(f'<path class="pl-vip" d="{path_d(vip)}"/>')
arq={}
for d in dr:
    if d.get('fill') or not d.get('color'): continue
    c=tuple(round(v,2) for v in d['color'])
    if c not in [(0.0,0.0,0.0),(0.0,0.49,1.0),(0.11,0.11,0.11),(0.01,0.0,0.0)]: continue
    r=d['rect']
    if 262<r.x0 and r.x1<568 and 332<r.y0 and r.y1<515 and r.width<6 and r.height<6: continue  # sillas: se dibujan aparte
    w=max(0.22,min(0.9,(d.get('width') or 0.1)*1.4))
    arq.setdefault(round(w,2),[]).append(path_d(d))
S.append('<g class="pl-arq" aria-hidden="true">'+''.join('<path stroke-width="'+str(w)+'" d="'+''.join(v)+'"/>' for w,v in sorted(arq.items()))+'</g>')
S.append(f'<path class="pl-sala" d="{path_d(sala)}"/>')
S.append(f'<path class="pl-cam" d="{path_d(cam)}"/>')
S.append('<g aria-hidden="true">'+''.join(f'<rect class="pl-silla" x="{f(r.x0)}" y="{f(r.y0)}" width="{f(r.width)}" height="4.2" rx="1.2"/>' for r in sillas)+'</g>')
S.append(f'<rect class="pl-tarima" x="{f(tr.x0)}" y="{f(tr.y0)}" width="{f(tr.width)}" height="{f(tr.height)}" rx="2"/>')
S.append(''.join(f'<path class="pl-back" d="{path_d(d)}"/>' for d in backings))
S.append(''.join(f'<path class="pl-col" d="{path_d(d)}"/>' for d in cols))
S.append('<g aria-hidden="true">'+''.join(f'<path class="pl-huella" d="{path_d(d)}"/>' for d in huellas)+'</g>')
for d in cafes:
    P=pts_of(d); cx,cy,a=eje(P); a=a if abs(a)<=90 else a
    S.append(f'<path class="pl-cafe" d="{path_d(d)}"/><text class="pl-lab" font-size="6.4" transform="translate({f(cx)} {f(cy)}) rotate({f(a)})">Café</text>')
import os, base64 as _b64, io as _io
from PIL import Image as _Img
_ms=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','assets','img','ecosistema','ms.png')
_im=_Img.open(_ms).convert('RGBA'); _im=_im.crop(_im.split()[3].getbbox()); _bio=_io.BytesIO(); _im.save(_bio,'PNG',optimize=True)
_rad=math.radians(ma); _ux,_uy=math.cos(_rad),math.sin(_rad)
_largo=max(p[0]*_ux+p[1]*_uy for p in msH)-min(p[0]*_ux+p[1]*_uy for p in msH)
_ancho=max(-p[0]*_uy+p[1]*_ux for p in msH)-min(-p[0]*_uy+p[1]*_ux for p in msH)
_w=min(_largo*0.88,_ancho*0.8*_im.width/_im.height); _h=_w*_im.height/_im.width
S.append(f'<g aria-label="Stand de Medical Shields"><path class="pl-ms" d="{poly(msH)}"/><image transform="translate({f(mcx)} {f(mcy)}) rotate({f(ma)})" x="{f(-_w/2)}" y="{f(-_h/2)}" width="{f(_w)}" height="{f(_h)}" href="data:image/png;base64,{_b64.b64encode(_bio.getvalue()).decode()}"/></g>')
# stands
S.append('<g id="pl-stands">')
for n,x,y in stands:
    cb=116<=n<=122
    lab=f'Punto de comida y bebidas {n}' if cb else f'Stand {n}'
    S.append(f'<g class="st{" cb" if cb else ""}" data-n="{n}" tabindex="0" role="button" aria-label="{lab}"><circle cx="{f(x)}" cy="{f(y)}" r="6.1"/><text x="{f(x)}" y="{f(y)}">{n}</text></g>')
S.append('</g>')
# rótulos de zonas
def lab(x,y,t,sz,cls='pl-lab',rot=0): return f'<text class="{cls}" font-size="{sz}" transform="translate({x} {y}) rotate({rot})">{t}</text>'
S.append('<rect class="pl-etq" x="362" y="384" width="136" height="18" rx="9"/>'); S.append(lab(430,393,'SALA DE CONFERENCIAS',10.5,'pl-lab pl-lab-o'))
S.append(f'<text class="pl-lab pl-lab-o" font-size="8.5" x="{f((tr.x0+tr.x1)/2)}" y="{f((tr.y0+tr.y1)/2)}">Tarima</text>')
S.append(lab(130,478,'ÁREA VIP',14,'pl-lab',31))
S.append(lab(293,372,'Camerinos',8,'pl-lab pl-lab-s',0))
S.append(lab(540,334,'Backing firmas',6,'pl-lab pl-lab-o',13))
# entrada / salidas
def chip(x,y,t,cls,rot=0,w=38):
    return f'<g transform="translate({x} {y}) rotate({rot})"><rect class="{cls}" x="{-w/2}" y="-6.5" width="{w}" height="13" rx="6.5"/><text class="pl-chip-t">{t}</text></g>'
S.append(chip(589,358,'ENTRADA','pl-chip',13,46))
S.append(chip(247,361,'SALIDA','pl-chip-s',-12))
S.append(chip(547,508,'SALIDA','pl-chip-s',-52))
for x,y in banos:
    S.append(f'<g aria-label="Baños"><circle cx="{x}" cy="{y}" r="7.5" fill="#FFFFFF" stroke="#0A1040" stroke-width=".7"/><text class="pl-chip-t" x="{x}" y="{y}" font-size="6.5">WC</text></g>')
ley=['<g id="pl-leyenda" transform="translate(588 122)">']
items=[('<circle cx="5" cy="0" r="5" fill="#FFFFFF" stroke="#0A1040" stroke-width=".8"/>','Stand 2 × 2 m'),
('<circle cx="5" cy="0" r="5" fill="#F7153B" stroke="#A50E27" stroke-width=".8"/>','Comida y bebidas'),
('<rect x="0" y="-5" width="10" height="10" rx="1.5" fill="#C98A3B"/>','Café')]
for i,(sym,t) in enumerate(items):
    ley.append(f'<g transform="translate(0 {i*22})"><g transform="scale(1.25)">{sym}</g><text class="pl-ley" x="20" y="0" font-size="11.5">{t}</text></g>')
ley.append('</g>')
S.append(''.join(ley))
# Logos de los organizadores, tomados del mismo PDF (Producciones 24 es vectorial; los otros, imágenes).
import base64, io
from PIL import Image
doc=pg.parent
def logo_png(caja):
    for info in pg.get_image_info(xrefs=True):
        if [round(v) for v in info['bbox']]!=caja: continue
        x=info['xref']; pix=fitz.Pixmap(doc,x); sm=doc.extract_image(x).get('smask')
        if sm: pix=fitz.Pixmap(pix,fitz.Pixmap(doc,sm))
        if pix.n-pix.alpha>3: pix=fitz.Pixmap(fitz.csRGB,pix)
        im=Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGBA'); bb=im.split()[3].getbbox()
        if not bb: continue
        im=im.crop(bb); im.thumbnail((360,360)); bio=io.BytesIO(); im.save(bio,'PNG',optimize=True)
        return im.size, base64.b64encode(bio.getvalue()).decode()
    raise SystemExit('logo no encontrado '+str(caja))
prod=[d for d in dr if d.get('fill') and d['rect'].x1<220 and d['rect'].y1<62 and d['rect'].y0>10]
px0=min(d['rect'].x0 for d in prod); py0=min(d['rect'].y0 for d in prod); px1=max(d['rect'].x1 for d in prod); py1=max(d['rect'].y1 for d in prod)
L=['<g id="pl-organizan" transform="translate(46 112)">','<text class="pl-ley-t" x="0" y="0" font-size="12">Organizan</text>']
celdas=[(0,16),(0,72),(0,128),(0,184)]
ancho,alto=118,34
def encaja(w,h):
    k=min(ancho/w,alto/h); return w*k,h*k
# Producciones 24 (vector)
w,h=encaja(px1-px0,py1-py0); k=w/(px1-px0); cx,cy=celdas[0]
L.append(f'<g transform="translate({f(cx+(ancho-w)/2)} {f(cy+(alto-h)/2)}) scale({f(k)}) translate({f(-px0)} {f(-py0)})" fill="#000000">'+''.join(f'<path d="{path_d(d)}"/>' for d in prod)+'</g>')
for (cx,cy),caja,nombre in zip(celdas[1:],[[38,90,176,138],[34,152,179,234],[-36,196,244,353]],['Espacio','Cuidamos tu Herida','Medical Shields']):
    (iw,ih),b=logo_png(caja); w,h=encaja(iw,ih)
    L.append(f'<image x="{f(cx+(ancho-w)/2)}" y="{f(cy+(alto-h)/2)}" width="{f(w)}" height="{f(h)}" href="data:image/png;base64,{b}"><title>{nombre}</title></image>')
L.append('</g>')
S.append(''.join(L))
S.append('</svg>')
open(sys.argv[2],'w',encoding='utf-8').write('\n'.join(S))
print(len(stands),len(sillas),len(huellas),len('\n'.join(S))//1024,'KB')
