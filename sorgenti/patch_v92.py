#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH92 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
rep("ag.clearRect(0,0,hw,hh);let any=0;","const RU=drawBeach.ac&&((drawBeach.fc=(drawBeach.fc||0)+1)&1)===1&&Math.abs(drawBeach.ac.x-vx0)<8&&Math.abs(drawBeach.ac.y-vy0)<8&&drawBeach.ac.lw===lw&&drawBeach.ac.lh===lh;if(!RU)ag.clearRect(0,0,hw,hh);let any=0;")
rep("if(!img||!vis.length)return;\n          const ps=[]","if(RU||!img||!vis.length)return;\n          const ps=[]")
rep("if(any){g.save();g.imageSmoothingEnabled=true;g.drawImage(AC,0,0,Math.ceil(lw*HS),Math.ceil(lh*HS),vx0,vy0,Math.ceil(lw*HS)/HS,Math.ceil(lh*HS)/HS);g.restore()}",
"if(RU){const c=drawBeach.ac;if(c.any){g.save();g.imageSmoothingEnabled=true;g.drawImage(AC,0,0,Math.ceil(lw*HS),Math.ceil(lh*HS),c.x,c.y,Math.ceil(lw*HS)/HS,Math.ceil(lh*HS)/HS);g.restore()}}\n        else{drawBeach.ac={x:vx0,y:vy0,lw,lh,any};if(any){g.save();g.imageSmoothingEnabled=true;g.drawImage(AC,0,0,Math.ceil(lw*HS),Math.ceil(lh*HS),vx0,vy0,Math.ceil(lw*HS)/HS,Math.ceil(lh*HS)/HS);g.restore()}}")
open(P,'w',encoding='utf8').write(src);print('patch92 ok')
