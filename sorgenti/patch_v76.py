#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH76 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# 1 niente chiazze tonde di sabbia bagnata che compaiono/spariscono
rep("{const M=mareGet();g.save();g.globalAlpha=(dw<0?.34:.14)*(1-w);g.drawImage(M.sb,px+s.nx*16-52,py+s.ny*16-52,104,104);g.restore()}","")
# 2 laghetto: calmo, senza onde ne schiuma (e' acqua dolce)
rep("      if(!best)continue;\n      const f=clamp((WL-e)/(be-e),0,1);","      if(!best)continue;\n      if(hyp((x+.5-POND.x)/(POND.rx+1.8),(y+.5-POND.y)/(POND.ry+1.8))<1)continue;\n      const f=clamp((WL-e)/(be-e),0,1);")
rep("      if(e>WL-.135&&e<WL+.03){\n        const fn=","      if(e>WL-.135&&e<WL+.03&&hyp((tx-POND.x)/(POND.rx+1.8),(ty-POND.y)/(POND.ry+1.8))>=1){\n        const fn=")
open(P,'w',encoding='utf8').write(src);print('patch76 ok')
