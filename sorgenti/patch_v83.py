#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
old="im.onload=()=>{MSB.im=im};"
if src.count(old)!=1:print('PATCH83 FAIL');sys.exit(1)
# la texture di Muse sfuma a zero ai bordi: ripetuta lasciava una griglia di quadrati vuoti. La appoggio su un colore pieno uguale.
src=src.replace(old,"im.onload=()=>{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const x=c.getContext('2d');x.fillStyle='rgb(137,102,40)';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0);MSB.im=c};")
open(P,'w',encoding='utf8').write(src);print('patch83 ok')
