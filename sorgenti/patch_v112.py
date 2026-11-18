#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH112 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
rep("  if(key==='biscotto'){const q=W/24.5;",
"  if(key==='giacomo'&&nomImg('giacomo/fronte-fermo')){const im=nomImg('giacomo/fronte-fermo'),sw=im.naturalWidth*.66,sx=(im.naturalWidth-sw)/2;g.drawImage(im,sx,im.naturalHeight*.02,sw,sw*H/W,0,0,W,H)}\n  else if(key==='biscotto'){const q=W/24.5;")
open(P,'w',encoding='utf8').write(src);print('patch112 ok')
