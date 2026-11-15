#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
old="const wm=sstep(.3,.66,dd),a=mv2S(MV2.m,tx*TS,ty*TS,700),b=mv2S(MV2.l,tx*TS+137,ty*TS+61,820),mm=MV2.m.m,ml=MV2.l.m;"
if src.count(old)!=1:print('PATCH82 FAIL');sys.exit(1)
new="""const wx=tx*TS,wy=ty*TS,rx=wx*.825+wy*.565,ry=-wx*.565+wy*.825,av=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2,(p[2]+q[2])/2];
  const wm=sstep(.3,.66,dd),a=av(mv2S(MV2.m,wx,wy,700),mv2S(MV2.m,rx+300,ry,1130)),b=av(mv2S(MV2.l,wx+137,wy+61,820),mv2S(MV2.l,rx,ry+200,1290)),mm=MV2.m.m,ml=MV2.l.m;"""
src=src.replace(old,new)
src=src.replace("const k=1.15,f=[(a[0]/mm[0])","const k=.95,f=[(a[0]/mm[0])")
open(P,'w',encoding='utf8').write(src);print('patch82 ok')
