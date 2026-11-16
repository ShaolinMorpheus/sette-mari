#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH105 FAIL',src.count(a),a[:60]);sys.exit(1)
    src=src.replace(a,b)
# 1) nomi fotogrammi fronte/spalle per il marinaio con attrezzo
rep("""    nm=(tool==='axe'?'ascia':'piccone')+'-taglio'+(bj+1)+'-profilo-destro';
  }else if(tool&&sw!=null){
    var E=sw<.45?sw/.45:1-(sw-.45)/.55,k=E<.3?1:E<.75?2:3;nm='mani-nude-colpo'+k+'-profilo-destro';""",
"""    nm=(tool==='axe'?'ascia':'piccone')+'-taglio'+(bj+1)+'-'+(pf==='mar:'&&v!=='profilo'?v:'profilo-destro');if(pf==='mar:'&&v!=='profilo')nf=1;
  }else if(tool&&sw!=null){
    var E=sw<.45?sw/.45:1-(sw-.45)/.55,k=E<.3?1:E<.75?2:3;nm='mani-nude-colpo'+k+'-'+(pf==='mar:'&&v!=='profilo'?v:'profilo-destro');if(pf==='mar:'&&v!=='profilo')nf=1;""")
# 2) il profilo forzato resta solo se mancano i fotogrammi fronte/spalle
rep("if(tool&&sw!=null&&!side&&o.k&&o.k.oid==='o_mar'&&RIGMAR&&RIGM.ok){back=false;side=true;FQ=1}",
    "if(tool&&sw!=null&&!side&&o.k&&o.k.oid==='o_mar'&&RIGMAR&&RIGM.ok&&!RIGM.im['mar:ascia-taglio1-'+(back?'spalle':'fronte')]){back=false;side=true;FQ=1}")
open(P,'w',encoding='utf8').write(src);print('patch105 ok')
