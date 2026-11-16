#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
a="""  const KF=RIG.KF,t=o.t||0,back=o.dir==='b',side=!!o.side&&!back,mv=o.moving?1:0,ph=o.walk||0,sw=o.swing,tool=o.tool;
  const v=back?'spalle':side?'profilo':'fronte';
  const MZ=RIGMZ(o,v,back,side,tool,sw,mv,ph);let FLX=o.flip?-1:1;if(MZ&&MZ.nf)FLX=1;"""
b="""  const KF=RIG.KF,t=o.t||0,mv=o.moving?1:0,ph=o.walk||0,sw=o.swing,tool=o.tool;
  let back=o.dir==='b',side=!!o.side&&!back,FQ=0;
  // marinaio che usa un attrezzo: esistono solo i fotogrammi di profilo, quindi tutto il personaggio (corpo, testa, cappello) si disegna di profilo, girato verso il bersaglio
  if(tool&&sw!=null&&!side&&o.k&&o.k.oid==='o_mar'&&RIGMAR&&RIGM.ok){back=false;side=true;FQ=1}
  const v=back?'spalle':side?'profilo':'fronte';
  const MZ=RIGMZ(o,v,back,side,tool,sw,mv,ph);let FLX=o.flip?-1:1;if(MZ&&MZ.nf)FLX=1;
  if(FQ&&typeof P!=='undefined'&&P.act&&P.act.e&&P.act.e.x!=null){const dx=P.act.e.x-P.x;if(Math.abs(dx)>3)FLX=dx<0?-1:1}"""
if src.count(a)!=1:print('PATCH99 FAIL',src.count(a));sys.exit(1)
src=src.replace(a,b)
open(P,'w',encoding='utf8').write(src);print('patch99 ok')
