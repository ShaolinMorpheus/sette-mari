#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
a0=src.index("  for(let ty=ty0;ty<=ty1;ty++)for(let tx=tx0;tx<=tx1;tx++){\n    const el=elevT[ty*MW+tx];if(el<WL+.02||el>WL+.2)continue;")
a1=src.index("\n}\nfunction drawSunRays(g,t,L){",a0)
loop=src[a0:a1]
assert loop.count("for(let ty=ty0")==1
# corpo del ciclo: tra la prima '{' dopo l'intestazione e l'ultima '}' di chiusura
hdr="  for(let ty=ty0;ty<=ty1;ty++)for(let tx=tx0;tx<=tx1;tx++){\n"
body=loop[len(hdr):]
body=body[:body.rstrip().rfind('}')]      # toglie la graffa di chiusura del ciclo
body=body.replace('continue;','return 0;')
fn="""const SDCH=new Map(),SCS=8,SCR=2,SPD=16;
function sandTile(g,tx,ty){
"""+body.replace("const el=elevT","const el=elevT",1)+"""  return 1;
}
function sandChunk(cx,cy){
  const k=WORLD*100000+cy*1000+cx;let c=SDCH.get(k);if(c!==undefined){SDCH.delete(k);SDCH.set(k,c);return c}
  const W=SCS*TS,cc=document.createElement('canvas');cc.width=cc.height=(W+2*SPD)*SCR;const q=cc.getContext('2d');q.setTransform(SCR,0,0,SCR,(SPD-cx*W)*SCR,(SPD-cy*W)*SCR);
  let n=0;for(let ty=Math.max(1,cy*SCS);ty<Math.min(MH-1,(cy+1)*SCS);ty++)for(let tx=Math.max(1,cx*SCS);tx<Math.min(MW-1,(cx+1)*SCS);tx++)n+=sandTile(q,tx,ty)||0;
  c=n?cc:null;SDCH.set(k,c);
  if(SDCH.size>16){const f=SDCH.keys().next().value;SDCH.delete(f)}
  return c;
}
"""
new="""  {const c0=Math.floor(tx0/SCS),c1=Math.floor(tx1/SCS),r0=Math.floor(ty0/SCS),r1=Math.floor(ty1/SCS);
    for(let cy=r0;cy<=r1;cy++)for(let cx=c0;cx<=c1;cx++){const c=sandChunk(cx,cy);if(c)g.drawImage(c,cx*SCS*TS-SPD,cy*SCS*TS-SPD,SCS*TS+2*SPD,SCS*TS+2*SPD)}}"""
src=src[:a0]+new+src[a1:]
# inserisce le funzioni prima di drawBeach (dopo il commento/ancora)
anchor="function drawBeach(g,t,vx0,vy0,vx1,vy1){"
assert src.count(anchor)==1
src=src.replace(anchor,fn+anchor)
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH94 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
rep("const q0=g.createPattern(MV2.on,'repeat');","const q0=MV2.onp||(MV2.onp=g.createPattern(MV2.on,'repeat'));")
rep("const q1=g.createPattern(MV2.rf,'repeat');","const q1=MV2.rfp||(MV2.rfp=g.createPattern(MV2.rf,'repeat'));")
open(P,'w',encoding='utf8').write(src);print('patch94 ok')
