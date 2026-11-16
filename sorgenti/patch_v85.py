#!/usr/bin/env python3
import sys,json,re
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH85 FAIL',a[:60],src.count(a));sys.exit(1)
    src=src.replace(a,b)
# 1) alberi: ricrescono solo fuori dall'inquadratura, tempo piu lungo
rep("e.t=170+Math.random()*80;sfx('fall');","e.t=420+Math.random()*180;sfx('fall');")
rep("if(e.t<=0&&!e.once&&!nearPl(e,2.2)&&","if(e.t<=0&&!e.once&&!inCam(e,3)&&!nearPl(e,2.2)&&")
rep("function updateEnts(dt){","function inCam(e,m){const z=camZoom()||1,hw=VW/2/z+m*TS,hh=VH/2/z+m*TS;return Math.abs(e.x-cam.x)<hw&&Math.abs(e.y-cam.y)<hh}\nfunction updateEnts(dt){")
# 2) cespugli: raccolto = cespuglio normale (stesso per liane e bacche)
rep("const bsp=e.type==='berry'?(e.ready?SP.berry[e.v]:SP.berry0):(e.ready?SP.bush[e.v]:SP.bush0);","const bsp=e.type==='berry'?(e.ready?SP.berry[e.v]:SP.berry0):(e.ready?SP.bush[e.v]:SP.berry0);")
Y=json.load(open('/home/claude/work/veg/y.json'))
rep('SP.berry=mkArt("','SP.berry=mkArt(VEGP&&VEGY["berry"]||"')
rep('SP.berry0=mkArt("','SP.berry0=mkArt(VEGP&&VEGY["berry0"]||"')
rep("  var VEGX=","  var VEGY=%s;\n  var VEGX="%json.dumps(Y))
open(P,'w',encoding='utf8').write(src);print('patch85 ok')
