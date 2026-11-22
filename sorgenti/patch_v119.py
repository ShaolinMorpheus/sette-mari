#!/usr/bin/env python3
# Pino Alto rifatto da Muse (22 nov, 2a consegna): stile dei pini in gioco, tronco robusto, chioma piena. Solo con Grafica/Mappa di prova.
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
B=open('/home/claude/work/pa_v2.b64').read().strip()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH119 FAIL',src.count(a),a[:80]);sys.exit(1)
    src=src.replace(a,b)
rep("const MZ22={",'const MZ22={"pino-alto-v2":"%s",'%B)
rep("  // (Pino Alto di Muse: NON montato finche' non viene rifatto con tronco largo e chioma piena)\n",
"""  // Pino Alto (Muse, 2a versione): 760x1920 -> 190x480; asse tronco a x=380 (=95), scala a +16, base a y=472
  {const[c,x]=mk(190,480);const o={c,w:190,h:480,ax:95,ay:473,_x:x,art:1,mzp:1,shk:.6};const im=new Image();
   im.onload=()=>{x.clearRect(0,0,190,480);x.drawImage(im,0,0,190,480);
     const[c2,x2]=mk(190,480);x2.drawImage(c,0,0,190,480);x2.globalCompositeOperation='source-in';x2.fillStyle='#0e1c0a';x2.fillRect(0,0,190,480)};
   const k=MZ22['pino-alto-v2'];im.src='data:image/webp;base64,'+k;SP.lookout=o}
""")
# radicato al terreno: ombra di contatto sotto le radici + ombra proiettata, e leggermente affondato come gli altri alberi
rep("  const s=spriteOf(e.spr);if(!s)return;\n  g.save();g.translate(e.x,e.y);\n  if(e.flip)g.scale(-1,1);",
"  const s=spriteOf(e.spr);if(!s)return;\n  if(s.mzp){const kk=e.k||1;g.save();g.translate(e.x,e.y);artGround(g,s,kk,34);shadow(g,12*kk,3*kk,58*kk,15*kk,.3);drawSp(g,s,0,3*kk,kk);g.restore();return}\n  g.save();g.translate(e.x,e.y);\n  if(e.flip)g.scale(-1,1);")
open(P,'w',encoding='utf8').write(src);print('patch119 ok')
