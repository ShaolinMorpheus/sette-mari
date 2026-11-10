#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH45 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
js=open('/home/claude/work/chest/chest_mod.js',encoding='utf8').read()
rep("/* ---- 12d_kb.js ---- */",js+"\n/* ---- 12d_kb.js ---- */")
rep("GfxNew.rub();GfxNew.bld()}","GfxNew.rub();GfxNew.bld();GfxNew.chest()}")
# forzieri: ombra e contatto
rep("g.save();g.translate(e.x,e.y);shadow(g,2,3,24,7,.26);drawSp(g,SP.chest[e.kind][e.got?1:0],0,0,1);g.restore();\n  if(!e.got)twinkle(g,e.x+16,e.y-34-Math.sin(t*2)*2,t,9,e.x,'#ffe27a');",
 "{const cs=SP.chest[e.kind][e.got?1:0];g.save();g.translate(e.x,e.y);if(cs.art)artGround(g,cs,1,cs.w*.36);else shadow(g,2,3,24,7,.26);drawSp(g,cs,0,0,1);g.restore();\n  if(!e.got)twinkle(g,e.x+16,e.y-(cs.art?cs.ay+2:34)-Math.sin(t*2)*2,t,9,e.x,'#ffe27a')}")
# falò costruito
rep("    if(spr.art)artGround(g,spr,1,spr.w*.46);\n    drawSp(g,spr,0,0,1);\n    if(id==='falo'){drawFlame(g,0,-12,t,1.05);drawSmoke(g,0,-30,t,5,.5,'96,92,92')}",
 "    const FA=id==='falo'&&GFXN&&spr.art&&spr.fl;\n    if(FA)GfxNew.faloDraw(g,t,1);else{if(spr.art)artGround(g,spr,1,spr.w*.46);\n    drawSp(g,spr,0,0,1)}\n    if(id==='falo'){if(!FA)drawFlame(g,0,-12,t,1.05);drawSmoke(g,0,-30,t,5,.5,'96,92,92')}")
# falò dell'altra isola
rep("function drawCampFire(g,t){\n","function drawCampFire(g,t){\n  if(GFXN&&SP.falo&&SP.falo.art&&SP.falo.fl&&SP.falo.ok&&SP.falo.fl.ok){GfxNew.faloDraw(g,t,1);return}\n")
NEW="    \"Grafica di prova: forzieri e bauli (chiusi e aperti, in ferro e in oro) e falò sono ora disegni d'arte. La fiamma del falò si muove, guizza e ogni tanto scoppietta lanciando faville.\",\n    "
rep('    "Funghi di bosco: ogni giorno',NEW+'"Funghi di bosco: ogni giorno')
open(P,'w',encoding='utf8').write(src)
print('patch45 ok')
