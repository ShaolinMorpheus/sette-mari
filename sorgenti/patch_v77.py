#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH77 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# mare nuovo di Muse: via le vecchie caustiche a ragnatela, i brillantini a crocetta e la vecchia schiuma cotta
rep("    if(QL<3){\n      g.globalAlpha=.5+.5*Math.sin(t*.9);g.drawImage(CAUS_A","    if(QL<3&&!(PASTON&&MV2.ok)){\n      g.globalAlpha=.5+.5*Math.sin(t*.9);g.drawImage(CAUS_A")
rep("    g.globalAlpha=PASTON?.16:.5+.42*Math.sin(t*1.35);g.drawImage(FOAM_A,","    if(!(PASTON&&MV2.ok)){g.globalAlpha=PASTON?.16:.5+.42*Math.sin(t*1.35);g.drawImage(FOAM_A,")
rep("sw*FS,sh*FS,cx0,cy0,sw,sh);\n    if(QL<3){g.globalAlpha=PASTON?.1:","sw*FS,sh*FS,cx0,cy0,sw,sh);}\n    if(QL<3&&!(PASTON&&MV2.ok)){g.globalAlpha=PASTON?.1:")
rep("  if(QL<3)for(const gl of GLINTS){\n    if(gl[0]<vx0-10","  if(QL<3&&!(PASTON&&MV2.ok))for(const gl of GLINTS){\n    if(gl[0]<vx0-10")
open(P,'w',encoding='utf8').write(src);print('patch77 ok')
