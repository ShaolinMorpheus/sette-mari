#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
old="g.globalAlpha=.55+.4*w;g.drawImage(M.ed2||M.ed,-48,-26,96,44);"
if src.count(old)!=1:print('PATCH81 FAIL');sys.exit(1)
src=src.replace(old,"{const a0=clamp((w-.1)/.55,0,1);g.globalAlpha=.95*a0*a0*(3-2*a0)}g.drawImage(M.ed2||M.ed,-48,-26,96,44);")
open(P,'w',encoding='utf8').write(src);print('patch81 ok')
