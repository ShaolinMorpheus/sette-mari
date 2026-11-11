#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH48 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
rep("DA.sh('spiral',x,y,s,118)","DA.sh('spiral',x,y,s,78)")
rep("DA.sh('scallop',x,y,s,116)","DA.sh('scallop',x,y,s,76)")
rep("DA.sh('cone',x,y,s,88,rot)","DA.sh('cone',x,y,s,64,rot)")
NT="    \"Conchiglie più piccole (a spirale, a ventaglio e a cono) in «Grafica di prova».\",\n    "
k='    "Ombre più realistiche'
rep(k,NT+k)
open(P,'w',encoding='utf8').write(src);print('patch48 ok')
