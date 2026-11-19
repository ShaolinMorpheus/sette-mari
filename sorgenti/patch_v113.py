#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH113 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
rep("""  const mv=!!o.moving,fl=!!o.flip,ph=o.walk||0,i=1+Math.floor((((ph/(Math.PI*2))%1)+1)%1*4);
  const k=w+'/'+(mv?'profilo-'+(fl?'sinistro':'destro')+'-passo'+i:'fronte-fermo'),im=nomImg(k)||nomImg(w+'/fronte-fermo');if(!im)return false;""",
"""  const mv=!!o.moving,fl=!!o.flip,ph=o.walk||0,i=1+(((Math.floor(ph*2)%6)+6)%6);
  const dr=o.mdir||('profilo-'+(fl?'sinistro':'destro'));
  const k=w+'/'+(mv?dr+'-passo'+i:'fronte-fermo'),im=nomImg(k)||nomImg(w+'/fronte-fermo');if(!im)return false;""")
rep("  const m=Ch2.npcMark(e);if(m)o.emote=m;\n  if(!nomDraw(",
"  if(e.mv&&e.tgt){const ddx=e.tgt.x-e.x,ddy=e.tgt.y-e.y;o.mdir=Math.abs(ddy)>Math.abs(ddx)*1.25?(ddy>0?'fronte':'spalle'):(ddx<0?'profilo-sinistro':'profilo-destro')}\n  const m=Ch2.npcMark(e);if(m)o.emote=m;\n  if(!nomDraw(")
# i personaggi del campo camminano di piu'
rep("    e.wt=4+Math.random()*6;\n    const sps=Ch2.spots(w);","    e.wt=2+Math.random()*3.5;\n    const sps=Ch2.spots(w);")
rep("e.mv=0;e.wt=3+Math.random()*4;if(dist<5&&g.k)","e.mv=0;e.wt=1.5+Math.random()*3;if(dist<5&&g.k)")
src=src.replace("NOMF={ferro:1.06,nives:1,tito:.88,gnocco:1,giacomo:1}","NOMF={ferro:1.06,nives:1,tito:.88,gnocco:1,giacomo:1}")
open(P,'w',encoding='utf8').write(src);print('patch113 ok')
