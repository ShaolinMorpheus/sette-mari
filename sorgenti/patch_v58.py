#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH58 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# niente piu' "ci sei dentro, passa": il muro e' sempre pieno
rep("    if(o.ig){if(!(P.x>o.x0-14&&P.x<o.x1+14&&P.y>o.y0-14&&P.y<o.y1+14))window.__obrDirty=1;continue}   // ci sei dentro: puoi uscire; poi il muro torna\n","")
rep("      if(rs.some(r=>P.x>r[0]-12&&P.x<r[1]+12&&P.y>r[2]-12&&P.y<r[3]+12))o.ig=1;","")
rep("      if(P.x>o.x0-12&&P.x<o.x1+12&&P.y>o.y0-12&&P.y<o.y1+12)o.ig=1;\n","")
# se un oggetto compare addosso al giocatore (editor, apertura baule), viene spinto fuori piano piano verso lo spazio libero piu' vicino
rep("  if(!ok(P.x,P.y)){   // incastrato (es. una costruzione è finita addosso): torna sulla tile libera più vicina\n",
"""  if(!ok(P.x,P.y)){   // incastrato: esci con piccoli passi verso il punto libero piu' vicino (niente salti)
    for(let d=3;d<=60;d+=3){let bb=null,bq=1e9;for(let a=0;a<16;a++){const ang=a*Math.PI/8,qx=P.x+Math.cos(ang)*d,qy=P.y+Math.sin(ang)*d;if(!ok(qx,qy))continue;const q=Math.abs(Math.cos(ang)*dx+Math.sin(ang)*dy)*-1;if(q<bq){bq=q;bb=[qx,qy]}}
      if(bb){const mx=bb[0]-P.x,my=bb[1]-P.y,m=Math.hypot(mx,my),st=Math.min(m,2.6);P.x+=mx/m*st;P.y+=my/m*st;return}}
""")
k='    "Conchiglie più piccole'
rep(k,'    "Casse, forzieri e botti: il muro è sempre pieno, si gira attorno senza entrare; se un oggetto compare addosso, il personaggio viene spinto fuori piano piano.",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch58 ok')
