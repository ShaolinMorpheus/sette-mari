#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH67 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# heroSpec: porta l'id del cappello, per i livelli disegnati
rep("    if(!hid&&!oid)return base;\n    const key=(f?'f':'m')+'|'+hid+'|'+oid;\n    return WRSPEC[key]||(WRSPEC[key]=Object.assign({},base,(oid&&WRO[oid])||{},(hid&&WRH[hid])||{}));",
    "    const key=(f?'f':'m')+'|'+hid+'|'+oid;\n    return WRSPEC[key]||(WRSPEC[key]=Object.assign({},base,(oid&&WRO[oid])||{},(hid&&WRH[hid])||{},{rig:hid||'h_tri'}));")
# icone dei cappelli disegnati
rep("function wearImg(it){\n","function wearImg(it){\n  if(it.k==='hat'&&typeof RIGHAT!=='undefined'&&RIGHAT.map[it.id]&&RIGHAT.icons[RIGHAT.map[it.id]])return RIGHAT.icons[RIGHAT.map[it.id]];\n")
# nuovi cappelli
new="""
/* ---- cappelli nuovi (disegnati) ---- */
(function(){
  const N=[
   {id:'h_bandanera',n:'Bandana nera',l:4,spec:{hat:'bandana',hatc:'#1a1a1e'}},
   {id:'h_bandarighe',n:'Bandana a righe',l:5,spec:{hat:'bandana',hatc:'#d85a4a'}},
   {id:'h_cuoio',n:'Tricorno di cuoio',l:6,spec:{hat:'tricorn',hatc:'#7a5232',trim:'#b08a50'}},
   {id:'h_logoro',n:'Tricorno logoro',l:7,spec:{hat:'tricorn',hatc:'#2a2a2e',trim:'#6a5a30'}},
   {id:'h_cappiuma',n:'Cappello con la piuma',l:8,spec:{hat:'straw',hatc:'#8a5a30'}},
   {id:'h_blumerletto',n:'Tricorno blu col merletto',l:9,spec:{hat:'tricorn',hatc:'#1f2f55',trim:'#e0c070'}},
   {id:'h_piumabianca',n:'Tricorno con la piuma bianca',l:11,spec:{hat:'tricorn',hatc:'#1d2230',trim:'#e0b13a'}},
   {id:'h_morionescuro',n:'Morione scuro',l:12,spec:{hat:'morion'}}];
  for(const it of N){if(WEAR.some(w=>w.id===it.id))continue;
    const w={id:it.id,k:'hat',n:it.n,hint:'Raggiungi il livello '+it.l+'.',own:()=>NV.lvOk(it.l),spec:it.spec};
    WEAR.push(w);WRH[it.id]=it.spec}
})();
"""
rep("/* ---- 12d_kb.js ---- */",new+"/* ---- 12d_kb.js ---- */")
src_=src
open(P,'w',encoding='utf8').write(src);print('patch67 ok')
