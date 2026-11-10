#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH34 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
NEW=open('/home/claude/work/new31.js',encoding='utf8').read()
rep("/* ---- 12d_kb.js ---- */",NEW+"\n/* ---- 12d_kb.js ---- */")
rep("v:(r()*(pine?4:6))|0","v:(r()*(pine?NGV.p:NGV.t))|0",2)
rep("initNatureSprites();initStructSprites();initPropSprites();","initNatureSprites();initStructSprites();initPropSprites();try{GfxNew.base();if(GFXN)GfxNew.nature()}catch(e){console.error('gfx',e)}")
rep("T('mVer','🔁',verLbl(),null)","T('mGfxN','🧪','Grafica di prova',GFXN?'accesa · b36':'spenta · b36','tgl'+(GFXN?' on':''))+T('mVer','🔁',verLbl(),null)")
rep("  c.querySelector('#mVer').onclick=verSwitch;","  {const gb=c.querySelector('#mGfxN');if(gb)gb.onclick=gfxSwitch}\n  c.querySelector('#mVer').onclick=verSwitch;")
rep('    "Diario, nuova scheda «Statistiche»','''    "Isola più viva: rocce più piccole (alcune al posto delle grandi), fiori gialli e bianchi nell'erba, conchiglie, legni sulla riva, funghetti e tartarughe nel mare.",
    "Il mercante di passaggio ora ha lo stesso stile del tuo personaggio, la barca a remi del gioco con le casse accanto, e sceglie una spiaggia libera, mai dietro agli alberi.",
    "Menu → Grafica di prova (facoltativa): in più sabbie diverse, felci, tronchi, gabbiani, pesci, un gufo di notte, tartarughe nel mare e noci di cocco più grandi. Il tasto «Grafica» resta quello di prima.",
    "Diario, nuova scheda «Statistiche»''')
rep("if(coco){for(const[ox,oy]of[[-6,6],[4,8],[-1,13]])ball(g,hx+ox,hy+oy,6.5,","if(coco){for(const[ox,oy]of(GFXN?[[-9,7],[6,9],[-2,17],[-3,-1]]:[[-6,6],[4,8],[-1,13]]))ball(g,hx+ox,hy+oy,GFXN?9.2:6.5,")
rep("g.quadraticCurveTo(x,y-2+r()*4,x+7,y+r()*3);g.stroke()}\n  }\n  g.restore();","g.quadraticCurveTo(x,y-2+r()*4,x+7,y+r()*3);g.stroke()}\n  }\n  try{GfxNew.decor(g)}catch(e){console.error('decor',e)}\n  g.restore();")
rep("  drawBeach(g,t,vx0,vy0,vx1,vy1);\n","  drawBeach(g,t,vx0,vy0,vx1,vy1);\n  if(WORLD<3){try{GfxNew.under(g,t,vx0,vy0,vx1,vy1)}catch(e){}}\n")
rep("  ambLeaves(t,vx0,vy0,vx1,vy1);drawParts(g);","  if(GFXN&&WORLD<3){try{GfxNew.over(g,t,vx0,vy0,vx1,vy1)}catch(e){}}\n  ambLeaves(t,vx0,vy0,vx1,vy1);drawParts(g);")
rep("shadow(g,6,3,34,10,.28);drawSp(g,SP.boulder[e.v],0,0,1)","shadow(g,6,3,(e.v===1||e.v===3)?22:34,(e.v===1||e.v===3)?7:10,.28);drawSp(g,SP.boulder[e.v],0,0,1)")
rep("      case'thief':drawThief(g,e,t);break;","      case'thief':drawThief(g,e,t);break;\n      case'mer':X2.merDraw(g,t);break;")
rep("  list.sort((a,b)=>key(a)-key(b));","  try{if(WORLD<3&&X2.merHere())list.push(X2.merE())}catch(e){}\n  list.sort((a,b)=>key(a)-key(b));")
rep('window.Pirati={X2,RS,','window.Pirati={SP,GFXN:()=>GFXN,X2,RS,')
open(P,'w',encoding='utf8').write(src)
print('patch34 ok')
