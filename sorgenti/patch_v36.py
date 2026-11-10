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
rep('    "Funghi di bosco: ogni giorno','    "Grafica di prova: palma, alberi, pino, rocce, cespugli, bacche, erba, ceppo e il relitto ora sono disegni artistici con ombra vera (prova con immagini generate da IA).",\n    "Funghi di bosco: ogni giorno')
rep("  g.save();g.translate(e.x,e.y);shadow(g,22,2,34,10,.26);\n  const sand=elevT[tIdx(e.tx,e.ty)]<WL+.2;","  if(s.art){g.save();g.translate(e.x,e.y);\n    if(s.sh){g.save();g.globalAlpha=.30;g.transform(1,0,-.55,-.30,0,0);g.drawImage(s.sh,-s.ax,-s.ay,s.w,s.h);g.restore()}\n    g.fillStyle='rgba(20,14,6,.30)';g.beginPath();g.ellipse(1,2,13,4,0,0,7);g.fill();\n    const sh0=e.shake>0?Math.sin(e.shake*60)*.05*(e.shake/.4):0;g.transform(1,0,Math.sin(t*1.4+e.x*.02)*.02+sh0,1,0,0);drawSp(g,s,0,0,1);g.restore();return}\n  g.save();g.translate(e.x,e.y);shadow(g,22,2,34,10,.26);\n  const sand=elevT[tIdx(e.tx,e.ty)]<WL+.2;")
rep("  if(e.alive){shadow(g,10*k,2,(isPine?24:32)*k,11*k,.26)}\n","  if(e.alive){if(s.art){if(s.sh){g.save();g.globalAlpha=.30;g.transform(k,0,-.55*k,-.30*k,0,0);g.drawImage(s.sh,-s.ax,-s.ay,s.w,s.h);g.restore()}g.fillStyle='rgba(20,14,6,.30)';g.beginPath();g.ellipse(1,2,12*k,4*k,0,0,7);g.fill()}else shadow(g,10*k,2,(isPine?24:32)*k,11*k,.26)}\n")
rep("  g.save();g.translate(e.x+(e.shake>0?Math.sin(e.shake*80)*2:0),e.y);shadow(g,6,3,(e.v===1||e.v===3)?22:34,(e.v===1||e.v===3)?7:10,.28);drawSp(g,SP.boulder[e.v],0,0,1);g.restore();","  const bs=SP.boulder[e.v];g.save();g.translate(e.x+(e.shake>0?Math.sin(e.shake*80)*2:0),e.y);\n  if(bs.art){if(bs.sh){g.save();g.globalAlpha=.30;g.transform(1,0,-.55,-.30,0,0);g.drawImage(bs.sh,-bs.ax,-bs.ay,bs.w,bs.h);g.restore()}g.fillStyle='rgba(20,14,6,.28)';g.beginPath();g.ellipse(0,2,bs.w*.34,bs.w*.1,0,0,7);g.fill()}\n  else shadow(g,6,3,(e.v===1||e.v===3)?22:34,(e.v===1||e.v===3)?7:10,.28);drawSp(g,bs,0,0,1);g.restore();")
rep("function drawTree(g,e,t){","function drawStump(g,e,isPine){const s=SP.stump;if(!s.art){drawSp(g,s,e.x,e.y+2);return}\n  const k=isPine?.72:(e.type==='tree'&&e.v%2?.8:1);g.save();g.translate(e.x,e.y+2);g.fillStyle='rgba(20,14,6,.28)';g.beginPath();g.ellipse(2,1,17*k,5*k,0,0,7);g.fill();drawSp(g,s,0,0,k);g.restore()}\nfunction drawTree(g,e,t){")
rep("drawSp(g,SP.stump,e.x,e.y+2);return}","drawStump(g,e,isPine);return}")
rep("if(!e.alive){drawSp(g,SP.stump,e.x,e.y+2)}","if(!e.alive){drawStump(g,e,isPine)}")
rep("  g.save();g.translate(e.x,e.y);shadow(g,4,3,26,8,.22);\n  g.transform(1,0,Math.sin(t*1.7+e.x)*.02,1,0,0);drawSp(g,e.type==='berry'?(e.ready?SP.berry[e.v]:SP.berry0):(e.ready?SP.bush[e.v]:SP.bush0),0,0,1);g.restore();","  const bsp=e.type==='berry'?(e.ready?SP.berry[e.v]:SP.berry0):(e.ready?SP.bush[e.v]:SP.bush0);\n  g.save();g.translate(e.x,e.y);\n  if(bsp.art){if(bsp.sh){g.save();g.globalAlpha=.26;g.transform(1,0,-.55,-.30,0,0);g.drawImage(bsp.sh,-bsp.ax,-bsp.ay,bsp.w,bsp.h);g.restore()}g.fillStyle='rgba(20,14,6,.26)';g.beginPath();g.ellipse(0,2,bsp.w*.38,bsp.w*.1,0,0,7);g.fill()}else shadow(g,4,3,26,8,.22);\n  g.transform(1,0,Math.sin(t*1.7+e.x)*.02,1,0,0);drawSp(g,bsp,0,0,1);g.restore();")
open(P,'w',encoding='utf8').write(src)
print('patch36 ok')
