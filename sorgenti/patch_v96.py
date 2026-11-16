#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b,n=1):
    global src
    if src.count(a)!=n:print('PATCH96 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
# riva pulita: per rimettere tutto basta CLEAN_SHORE=false
rep("function sandTile(g,tx,ty){\n","var CLEAN_SHORE=true;\nfunction sandTile(g,tx,ty){\n    if(CLEAN_SHORE)return 0;\n")
rep("function rock2(x,y,s){  if(DA.rock(x,y,s))return;","function rock2(x,y,s){  if(CLEAN_SHORE)return;if(DA.rock(x,y,s))return;")
rep("function driftwood(x,y,s,rot){","function driftwood(x,y,s,rot){if(CLEAN_SHORE)return;")
rep("function coconut(x,y,s,half){","function coconut(x,y,s,half){if(CLEAN_SHORE)return;")
rep("        if(nP){}\n        else if(s>.04&&s<.2&&q<.07){","        if(nP||CLEAN_SHORE){}\n        else if(s>.04&&s<.2&&q<.07){")
# pozza: torna il disegno originale finche' Muse non la rifa
rep("SP.rockpool=swapArt(mkRockpool(),'rockpool');if(VEGPG&&VEGZ['rockpool0'])SP.rockpool0=swapArt(mkRockpool(),'rockpool0');","SP.rockpool=mkRockpool();")
open(P,'w',encoding='utf8').write(src);print('patch96 ok')
