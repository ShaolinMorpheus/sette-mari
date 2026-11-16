#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b,n=1):
    global src
    if src.count(a)!=n:print('PATCH103 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
rep("""  boots:{name:"Sandali di corda",""","""  pick:{name:"Piccone rinforzato",desc:"Servono meno colpi per spaccare una roccia e si lavora più in fretta.",cost:{legna:4,pietra:6},need:'pick',needText:'Prima ti serve un piccone (nella cassa del carpentiere).'},
  boots:{name:"Sandali di corda",""")
rep("function actSpeed(){return(S.up.axe?1.4:1)*(S.buff>0?1.3:1)}","function actSpeed(){return(S.up.axe?1.4:1)*(S.buff>0?1.3:1)}\nfunction pickSpeed(){return(S.up.pick?1.4:1)*(S.buff>0?1.3:1)}")
rep("mk('mine',0,4,'pick');P.act.per=.7/actSpeed();break;","mk('mine',0,S.up.pick?3:4,'pick');P.act.per=.7/pickSpeed();break;")
rep("S.up=Object.assign({axe:0,boots:0,flask:0,torch:0,rod:0,net:0},S.up);","S.up=Object.assign({axe:0,pick:0,boots:0,flask:0,torch:0,rod:0,net:0},S.up);")
open(P,'w',encoding='utf8').write(src);print('patch103 ok')
