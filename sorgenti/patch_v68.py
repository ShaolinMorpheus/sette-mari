#!/usr/bin/env python3
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH68 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
core7=open('/home/claude/work/r3d/rig_core7.js',encoding='utf8').read()
core8=open('/home/claude/work/r3d/rig_core8.js',encoding='utf8').read()
art=json.dumps(json.load(open('/home/claude/work/mz/rig_muse.json')),separators=(',',':'))
rep(core7,"var RIGMART="+art+";\n"+core8)
# l'id dell'abito arriva al disegno
rep("{rig:hid||'h_tri'}","{rig:hid||'h_tri',oid:oid||''}")
rep('Con i cappelli ridisegnati (11) e 8 cappelli nuovi, da sbloccare salendo di livello.','Con i cappelli ridisegnati (11) e 8 cappelli nuovi, da sbloccare salendo di livello. Giacca rossa del Capitano ridisegnata da Muse: camminata, torcia accesa, ascia e piccone.')
open(P,'w',encoding='utf8').write(src)
print('v68 ok')
