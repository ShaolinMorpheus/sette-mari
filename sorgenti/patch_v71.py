#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH71 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
rep("const wOwned=it=>","const WOUT_OK={o_cap:1,o_mar:1};\nconst wHid=it=>it.k==='out'&&!WOUT_OK[it.id];   // gli altri abiti restano salvati ma non si vedono né si scelgono finché Muse non li ridisegna\nconst wOwned=it=>")
rep("let hid=sel.hat||null,oid=sel.out||null;","let hid=sel.hat||null,oid=(sel.out&&WOUT_OK[sel.out])?sel.out:null;")
rep("const it=WEAR.find(x=>x.id===id);\n  if(it)return it.n;","const it=WEAR.find(x=>x.id===id&&!wHid(x));\n  if(it)return it.n;")
rep("it=WEAR.find(x=>x.id===sel);return it?'<img","it=WEAR.find(x=>x.id===sel&&!wHid(x));return it?'<img")
rep("const list=WEAR.filter(x=>x.k===kind),own=","const list=WEAR.filter(x=>x.k===kind&&!wHid(x)),own=")
rep("const hero=WEAR.filter(x=>x.k!=='par'),","const hero=WEAR.filter(x=>x.k!=='par'&&!wHid(x)),")
rep("{id:'o_mar',k:'out',n:'Maglia da marinaio',hint:'Sopravvivi fino al giorno 4.',own:()=>(S.day||1)>=4,","{id:'o_mar',k:'out',n:'Maglia da marinaio',hint:'Sopravvivi fino al giorno 4.',own:()=>RIGT||(S.day||1)>=4,")
rep('Menu → Partita → «Grafica personaggio prova» (facoltativa)','Maglia da marinaio ridisegnata da Muse (camminata, torcia, ascia, piccone). Per ora nel Guardaroba restano solo Giacca rossa e Maglia da marinaio: gli altri abiti tornano quando saranno ridisegnati. Menu → Partita → «Grafica personaggio prova» (facoltativa)') if False else None
rep('Giacca rossa del Capitano ridisegnata da Muse: camminata, torcia accesa, ascia e piccone.','Giacca rossa del Capitano e Maglia da marinaio ridisegnate da Muse: camminata, torcia accesa, ascia e piccone. Nel Guardaroba restano solo questi due abiti: gli altri tornano quando saranno ridisegnati.')
open(P,'w',encoding='utf8').write(src);print('patch71 ok')
