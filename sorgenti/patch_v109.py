#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH109 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
rep("var RIGM={ok:false,im:{},hq:RIGMART.hq,hand:RIGMART.hand,dim:RIGMART.dim,anc:RIGMART.anc};",
    "var RIGM={ok:false,im:{},hq:RIGMART.hq,hand:RIGMART.hand,dim:RIGMART.dim,anc:RIGMART.anc,fd:RIGMART.fd||{}};")
rep("  var nm=null,nf=0;\n  if((tool==='axe'||tool==='pick')&&sw!=null){\n",
    "  var nm=null,nf=0;\n  if((tool==='axe'||tool==='pick')&&sw!=null){\n    /* attrezzi v5: corpo + attrezzo separati (Muse) */\n    var __p5=sw<.2?'carica':sw<.45?'apice':sw<.6?'colpo':'ritorno',__k5=(pf==='mar:'?'mar:':'cap:')+'v5-'+(tool==='axe'?'ascia':'piccone')+'-'+__p5+'-'+(v==='profilo'?'profilo-destro':v);\n    if(RIGM.im[__k5])return {k:__k5,nf:v==='profilo'?0:1};\n")
rep("  const d=MZ?RIGM.dim:RIG.dim[n],ax=MZ?RIGM.anc[0]:RIG.anc[0],ay=MZ?RIGM.anc[1]:RIG.anc[1];",
    "  const FD=MZ&&RIGM.fd&&RIGM.fd[MZ.k],d=FD?FD.dim:(MZ?RIGM.dim:RIG.dim[n]),ax=FD?FD.anc[0]:(MZ?RIGM.anc[0]:RIG.anc[0]),ay=FD?FD.anc[1]:(MZ?RIGM.anc[1]:RIG.anc[1]);")
open(P,'w',encoding='utf8').write(src);print('patch109 ok')
