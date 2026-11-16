#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH93 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
rep("function drawBeach(g,t,vx0,vy0,vx1,vy1){\n  if(!S||!S.live||WORLD>=3)return;","function drawBeach(g,t,vx0,vy0,vx1,vy1){\n  if(!S||!S.live||WORLD>=3)return;if(FPSC.test===1||FPSC.test===3)return;")
rep("    if(QL<3&&PASTON&&MV2.ok){\n      g.save();g.beginPath();g.rect(cx0,cy0,sw,sh);g.clip();","    if(QL<3&&PASTON&&MV2.ok&&FPSC.test!==2&&FPSC.test!==3){\n      g.save();g.beginPath();g.rect(cx0,cy0,sw,sh);g.clip();")
rep("var FPSC={js:0,","var FPSC={test:0,DM:0,names:['normale','senza riva','senza onde/riflessi','senza riva+onde','risoluzione 1.5'],js:0,")
rep("+T('mFps','📈','Contatore FPS',FPSC.on?'acceso':'spento','tgl'+(FPSC.on?' on':'')))","+T('mFps','📈','Contatore FPS',FPSC.on?'acceso':'spento','tgl'+(FPSC.on?' on':''))+T('mDiag','🧪','Test FPS',FPSC.names[FPSC.test]))")
rep("  {const fb=c.querySelector('#mFps');","  {const db=c.querySelector('#mDiag');if(db)db.onclick=()=>{if(!FPSC.DM)FPSC.DM=DPRMAX;FPSC.test=(FPSC.test+1)%FPSC.names.length;DPRMAX=FPSC.test===4?Math.min(1.5,FPSC.DM):FPSC.DM;try{resize()}catch(e){}const sb=db.querySelector('small');if(sb)sb.textContent=FPSC.names[FPSC.test];if(!FPSC.on)FPSC.set(true)}}\n  {const fb=c.querySelector('#mFps');")
rep("+'  QL '+QL;this.js=0","+'  QL '+QL+'\\ntest: '+this.names[this.test];this.js=0")
open(P,'w',encoding='utf8').write(src);print('patch93 ok')
