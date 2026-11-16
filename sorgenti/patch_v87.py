#!/usr/bin/env python3
import sys,re
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH87 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
# layer a meta' risoluzione, un solo disegno finale sullo schermo
rep("if(!drawBeach.L){drawBeach.L=document.createElement('canvas')}\n        const L=drawBeach.L;if(L.width<lw)L.width=lw;if(L.height<lh)L.height=lh;\n        const q=L.getContext('2d');",
"""const HS=.5,hw=Math.ceil(lw*HS)+2,hh=Math.ceil(lh*HS)+2;
        if(!drawBeach.L){drawBeach.L=document.createElement('canvas');drawBeach.A=document.createElement('canvas')}
        const L=drawBeach.L,AC=drawBeach.A;if(L.width<hw)L.width=hw;if(L.height<hh)L.height=hh;if(AC.width<hw)AC.width=hw;if(AC.height<hh)AC.height=hh;
        const q=L.getContext('2d'),ag=AC.getContext('2d');ag.setTransform(1,0,0,1,0,0);ag.globalCompositeOperation='source-over';ag.globalAlpha=1;ag.clearRect(0,0,hw,hh);let any=0;""")
rep("q.clearRect(0,0,bw+1,bh+1);\n          q.setTransform(1,0,0,1,-bx0,-by0);","q.clearRect(0,0,Math.ceil(bw*HS)+2,Math.ceil(bh*HS)+2);\n          q.setTransform(HS,0,0,HS,-bx0*HS,-by0*HS);")
rep("g.save();g.globalAlpha=al;g.drawImage(L,0,0,bw,bh,bx0,by0,bw,bh);g.restore();","ag.globalAlpha=al;ag.drawImage(L,0,0,Math.ceil(bw*HS),Math.ceil(bh*HS),(bx0-vx0)*HS,(by0-vy0)*HS,Math.ceil(bw*HS),Math.ceil(bh*HS));any=1;")
rep("layer(B.im,.6,120,.45,.85,(s,w,off)=>[s.x+s.nx*(off*.5+12),s.y+s.ny*(off*.5+12)]);",
"layer(B.im,.6,120,.45,.85,(s,w,off)=>[s.x+s.nx*(off*.5+12),s.y+s.ny*(off*.5+12)]);\n        if(any){g.save();g.imageSmoothingEnabled=true;g.drawImage(AC,0,0,Math.ceil(lw*HS),Math.ceil(lh*HS),vx0,vy0,Math.ceil(lw*HS)/HS,Math.ceil(lh*HS)/HS);g.restore()}")
open(P,'w',encoding='utf8').write(src);print('patch87 ok')
