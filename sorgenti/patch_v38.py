#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH38 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
js=open('/home/claude/work/art/raft_js_full.js',encoding='utf8').read()
rep("/* ---- 12d_kb.js ---- */",js+"\n/* ---- 12d_kb.js ---- */")
rep("GfxNew.nature();GfxNew.art()}}","GfxNew.nature();GfxNew.art();GfxNew.raft()}}")
rep("  const tgt=hd+Math.PI+o.side*.78;\n","  let tgt=hd+Math.PI+o.side*.78;if(GFXN&&GfxNew.rart)tgt=GfxNew.rart.tgt(o,hd,t,nrm);\n")
rep("function drawSailProc(g,mx,my,o,t,red){\n","function drawSailProc(g,mx,my,o,t,red){\n  if(GFXN&&GfxNew.rart&&GfxNew.rart.ok()){GfxNew.rart.draw(g,mx,my,o,t,red);return}\n")
rep('    "Funghi di bosco: ogni giorno','    "Grafica di prova: la zattera (scafo, albero e vele) ora è un disegno d\'arte. Il vento cambia direzione e forza: la vela si gonfia, sventola e si gira da sola sottovento, seguendo la rotta della zattera.",\n    "Funghi di bosco: ogni giorno')
open(P,'w',encoding='utf8').write(src)
print('patch38 ok')
