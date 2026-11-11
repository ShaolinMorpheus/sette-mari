#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH59 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# barili/casse messi a mano nel mondo (con fp gia' bloccato) non avevano la sagoma: ora si
rep("    if(!e.bk||e.hid)continue;\n    const s=sprOf(e);","    if(!(e.bk||e.blocked)||e.hid)continue;\n    const s=sprOf(e);")
# margine attorno alla sagoma piu' stretto: il personaggio puo' sfiorare l'oggetto (metà del suo ingombro, non tutto)
rep("    if(x+rx>o.x0&&x-rx<o.x1&&y+ry>o.y0&&y-ry<o.y1){if(!o.rs)return false;for(const r of o.rs)if(x+rx>r[0]&&x-rx<r[1]&&y+ry>r[2]&&y-ry<r[3])return false}}",
    "    {const qx=rx*.45,qy=ry*.6;if(x+qx>o.x0&&x-qx<o.x1&&y+qy>o.y0&&y-qy<o.y1){if(!o.rs)return false;for(const r of o.rs)if(x+qx>r[0]&&x-qx<r[1]&&y+qy>r[2]&&y-qy<r[3])return false}}}")
k='    "Conchiglie più piccole'
rep(k,'    "Barili e casse del relitto ora hanno il muro sulla sagoma (prima ci si entrava); muro più aderente, si può sfiorare l\'oggetto.",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch59 ok')
