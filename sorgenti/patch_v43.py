#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH43 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
mod=open('/home/claude/work/dec/dec_mod.js',encoding='utf8').read()
rep("  /* ---- decorazioni fisse sul terreno (cotte una volta nella mappa) ---- */",mod+"  /* ---- decorazioni fisse sul terreno (cotte una volta nella mappa) ---- */")
H=[("function daisy(x,y,s){\n","  if(DA.fl(0,x,y,s))return;\n"),
("function blossom(x,y,s,pc){\n","  if(DA.fl(DA.pc[pc]||1,x,y,s))return;\n"),
("function mushroom(x,y,s,cap,dots,glowy){\n","  if(!glowy&&DA.mu(DA.cap[cap],x,y,s))return;\n"),
("function scallop(x,y,s){\n","  if(DA.sh('scallop',x,y,s,116))return;\n"),
("function spiralShell(x,y,s){\n","  if(DA.sh('spiral',x,y,s,118))return;\n"),
("function coneShell(x,y,s,rot){\n","  if(DA.sh('cone',x,y,s,88,rot))return;\n"),
("function starfish(x,y,s,rot){\n","  if(DA.sh('starfish',x,y,s,84,rot))return;\n"),
("function urchin(x,y,s){\n","  if(DA.sh('urchin',x,y,s,72))return;\n"),
("function coconut(x,y,s,half){\n","  if(DA.sh(half?'cocoh':'coco',x,y,s,46))return;\n"),
("function driftwood(x,y,s,rot){\n","  if(DA.sh('wood',x,y,s,160,rot))return;\n"),
("function rock2(x,y,s){","  if(DA.rock(x,y,s))return;\n")]
for a,b in H:
    if a.endswith('{'): rep(a,a+b)
    else: rep(a,a+b)
rep("const fern=(x,y,s)=>{","const fern=(x,y,s)=>{if(DA.fern(x,y,s))return;")
rep("const dry=(x,y,s)=>{","const dry=(x,y,s)=>{if(DA.dry(x,y,s))return;")
rep("const clover=(x,y,s)=>{","const clover=(x,y,s)=>{if(DA.clover(x,y,s))return;")
rep("g.drawImage(G,-w/2,-h+2,w,h);g.restore()}","DA.tu(w,h)||g.drawImage(G,-w/2,-h+2,w,h);g.restore()}")
rep("X2.mushDraw=function(g,e,t){\n  if(e.got)return;\n","X2.mushDraw=function(g,e,t){\n  if(e.got)return;\n  if(window.__DA&&__DA.mg(g,e,t,e.gv|0))return;\n")
NEWTXT = "    \"Grafica di prova: fiori, funghi (anche quelli da raccogliere), felci, ciuffi d'erba, erba secca, trifoglio, conchiglie, stelle marine, ricci, noci di cocco, legni e sassi ora sono disegni d'arte.\",\n    \"Funghi di bosco: ogni giorno"
NEWTXT = NEWTXT.replace("'", "\\'")
rep('    "Funghi di bosco: ogni giorno', NEWTXT)
open(P,'w',encoding='utf8').write(src)
print('patch43 ok')
