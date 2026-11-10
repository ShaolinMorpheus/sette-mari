#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH36 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)

js=open('/home/claude/work/art/art_js.js',encoding='utf8').read()
rep("/* ---- 12d_kb.js ---- */",js+"\n/* ---- 12d_kb.js ---- */")
rep("try{GfxNew.base();if(GFXN)GfxNew.nature()}","try{GfxNew.base();if(GFXN){GfxNew.nature();GfxNew.art()}}")
rep('    "Funghi di bosco: ogni giorno','    "Grafica di prova: palma e alberi normali ora sono disegni artistici con ombra vera (prova con immagini generate da IA).",\n    "Funghi di bosco: ogni giorno')
rep("  g.save();g.translate(e.x,e.y);shadow(g,22,2,34,10,.26);\n  const sand=elevT[tIdx(e.tx,e.ty)]<WL+.2;","  if(s.art){g.save();g.translate(e.x,e.y);\n    if(s.sh){g.save();g.globalAlpha=.30;g.transform(1,0,-.55,-.30,0,0);g.drawImage(s.sh,-s.ax,-s.ay,s.w,s.h);g.restore()}\n    g.fillStyle='rgba(20,14,6,.30)';g.beginPath();g.ellipse(1,2,13,4,0,0,7);g.fill();\n    const sh0=e.shake>0?Math.sin(e.shake*60)*.05*(e.shake/.4):0;g.transform(1,0,Math.sin(t*1.4+e.x*.02)*.02+sh0,1,0,0);drawSp(g,s,0,0,1);g.restore();return}\n  g.save();g.translate(e.x,e.y);shadow(g,22,2,34,10,.26);\n  const sand=elevT[tIdx(e.tx,e.ty)]<WL+.2;")
rep("  if(e.alive){shadow(g,10*k,2,(isPine?24:32)*k,11*k,.26)}\n","  if(e.alive){if(s.art){if(s.sh){g.save();g.globalAlpha=.30;g.transform(k,0,-.55*k,-.30*k,0,0);g.drawImage(s.sh,-s.ax,-s.ay,s.w,s.h);g.restore()}g.fillStyle='rgba(20,14,6,.30)';g.beginPath();g.ellipse(1,2,12*k,4*k,0,0,7);g.fill()}else shadow(g,10*k,2,(isPine?24:32)*k,11*k,.26)}\n")
open(P,'w',encoding='utf8').write(src)
print('patch36 ok')
