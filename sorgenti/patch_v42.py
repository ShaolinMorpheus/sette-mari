#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH42 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
js=open('/home/claude/work/art/bld_js_full.js',encoding='utf8').read()
rep("/* ---- 12d_kb.js ---- */",js+"\n/* ---- 12d_kb.js ---- */")
rep("GfxNew.art();GfxNew.rub()}GfxNew.raft()}","GfxNew.art();GfxNew.rub();GfxNew.bld()}GfxNew.raft()}")
rep("g.transform(k,0,-.45*k,-.27*k,0,0)","g.transform(k,0,-.45*k*(s.shk||1),-.27*k*(s.shk||1),0,0)")
# capanna e banco: ombra proiettata + contatto col terreno
rep("  }else{\n    drawSp(g,spr,0,0,1);\n    if(id==='falo')","  }else{\n    if(spr.art)artGround(g,spr,1,spr.w*.46);\n    drawSp(g,spr,0,0,1);\n    if(id==='falo')")
# ingresso miniera
rep("function drawCave1(g,e,t){\n  g.save();g.translate(e.x,e.y);shadow(g,0,4,64,12,.32);","function drawCave1(g,e,t){\n  if(GFXN&&SP.mina&&SP.mina.art){g.save();g.translate(e.x,e.y);artGround(g,SP.mina,1,66);drawSp(g,SP.mina,0,0,1);\n    for(let k=0;k<3;k++){const u=(t*.22+k/3)%1;g.strokeStyle='rgba(210,225,235,'+(.12*(1-u))+')';g.lineWidth=3;g.beginPath();g.moveTo(-14,-14-u*34);g.quadraticCurveTo(0,-20-u*34,14,-14-u*34);g.stroke()}\n    g.restore();return}\n  g.save();g.translate(e.x,e.y);shadow(g,0,4,64,12,.32);")
rep('    "Funghi di bosco: ogni giorno','    "Grafica di prova: capanna, banco da lavoro e ingresso della miniera (la grotta buia) ora sono disegni d\'arte, con ombra proiettata e ombra di contatto sul terreno.",\n    "Funghi di bosco: ogni giorno')
rep("const h={capanna:110,banco:80","const h={capanna:GFXN?156:110,banco:80")
open(P,'w',encoding='utf8').write(src)
print('patch42 ok')
