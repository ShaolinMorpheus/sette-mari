#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
a=src.index("  const hat=sp_.hat,hc=sp_.hatc;\n  g.save();g.translate(sv?1.6:0,hy+4)")
endm="NVH[hat](g,hy,hr,hc,back,sp_,dk);\n  g.restore();"
b=src.index(endm,a)+len(endm)
blk=src[a:b]
fn="function hatOnly(g,sp_,back,sv,hy,hr){\n"+blk+"\n}\n"
m="/* ---- 12d_kb.js ---- */"
assert src.count(m)==1
src=src.replace(m,fn+m)
assert src.count("Per ora senza cappello.")==1
src=src.replace("Per ora senza cappello.","Con i cappelli ridisegnati (11) e 8 cappelli nuovi, da sbloccare salendo di livello.")
assert src.count('farm:{GC,DRYR,WEAR,')==1
src=src.replace('farm:{GC,DRYR,WEAR,','farm:{drawRig,hatOnly,RIG,GC,DRYR,WEAR,')
open(P,'w',encoding='utf8').write(src);print('patch66 ok',len(blk))
