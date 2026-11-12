#!/usr/bin/env python3
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH65 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
art=open('/home/claude/work/rig/rig_art.json').read()
core=open('/home/claude/work/rig/rig_core.js').read()
js="var RIGT=false;try{RIGT=localStorage.getItem('sm_rigt')==='1'}catch(e){}\nvar RIGART="+art+";\n"+core+"\n"
rep("/* ---- 12d_kb.js ---- */",js+"/* ---- 12d_kb.js ---- */")
rep("  drawChar(g,P.x,P.y,{k:hs,dir:P.cl&&P.cl.ph===2?'b':P.dir,","  (RIGT&&RIG.ok?drawRig:drawChar)(g,P.x,P.y,{k:hs,dir:P.cl&&P.cl.ph===2?'b':P.dir,")
rep("+T('mGfxN','🧪','Grafica di prova',GFXN?'accesa · b38':'spenta · b38','tgl'+(GFXN?' on':''))","+T('mGfxN','🧪','Grafica di prova',GFXN?'accesa · b38':'spenta · b38','tgl'+(GFXN?' on':''))+T('mRigT','🧍','Grafica personaggio prova',RIGT?'accesa':'spenta','tgl'+(RIGT?' on':''))")
rep("{const gb=c.querySelector('#mGfxN');if(gb)gb.onclick=gfxSwitch}","{const gb=c.querySelector('#mGfxN');if(gb)gb.onclick=gfxSwitch}\n  {const rb=c.querySelector('#mRigT');if(rb)rb.onclick=()=>{RIGT=!RIGT;try{localStorage.setItem('sm_rigt',RIGT?'1':'0')}catch(e){}UI.openMenu();UI.toast(RIGT?'Personaggio di prova acceso':'Personaggio di prova spento')}}")
rep("    \"Conchiglie più piccole","    \"Menu → Partita → «Grafica personaggio prova» (facoltativa): il personaggio disegnato a pezzi, con fronte, schiena e profilo, camminata, colpi d'attrezzo e battito di ciglia. Per ora senza cappello.\",\n    \"Conchiglie più piccole")
open(P,'w',encoding='utf8').write(src);print('patch65 ok')
