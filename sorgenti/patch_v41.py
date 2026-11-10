#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH41 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
js=open('/home/claude/work/hero/hero_js_full.js',encoding='utf8').read()
rep("/* ---- 12d_kb.js ---- */",js+"\n/* ---- 12d_kb.js ---- */")
rep("GfxNew.art();GfxNew.rub()}GfxNew.raft()}","GfxNew.art();GfxNew.rub();GfxNew.hero()}GfxNew.raft()}")
rep("function drawChar(g,x,y,o){\n","function drawChar(g,x,y,o){\n  if(o.player&&GFXN&&GfxNew.herop&&GfxNew.herop.ok()&&!o.sab&&!o.legacy)return GfxNew.herop.draw(g,x,y,o);\n")
rep("drawChar(g,P.x,P.y,{k:hs,dir:P.cl&&P.cl.ph===2?'b':P.dir,","drawChar(g,P.x,P.y,{player:1,k:hs,dir:P.cl&&P.cl.ph===2?'b':P.dir,")
rep('    "Funghi di bosco: ogni giorno','    "Grafica di prova: il capitano ora è un disegno d\'arte a strati. Le braccia si muovono in alternanza mentre cammini, impugna piccone, ascia e torcia, e le gambe fanno il passo (davanti, dietro e di profilo).",\n    "Funghi di bosco: ogni giorno')
open(P,'w',encoding='utf8').write(src)
print('patch41 ok')
