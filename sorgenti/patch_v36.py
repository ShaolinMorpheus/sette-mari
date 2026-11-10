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
rep('    "Funghi di bosco: ogni giorno','    "Grafica di prova: la palma ora è un disegno artistico (prova con immagini generate da IA).",\n    "Funghi di bosco: ogni giorno')
open(P,'w',encoding='utf8').write(src)
print('patch36 ok')
