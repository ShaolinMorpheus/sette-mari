#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH114 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
rep("function RIGMZ(o,v,back,side,tool,sw,mv,ph){\n",
r"""var RIGNP=__NP__;
(function(){RIGNP.im={};for(var k in RIGNP.img){(function(k){var i=new Image();i.src='data:image/webp;base64,'+RIGNP.img[k];RIGNP.im[k]=i;RIGM.im[k]=i;RIGM.fd[k]=RIGNP.fd[k];var sp=k.slice(0,4)==='mar:'?'mar:':'cap:',vw=k.indexOf('profilo')>0?'profilo-destro':k.indexOf('spalle')>0?'spalle':'fronte';RIGM.hq[k]=RIGM.hq[sp+vw+'-fermo']||RIGM.hq[vw+'-fermo']})(k)}
 RIGNP.tl={};for(var n in RIGNP.tools){var t=RIGNP.tools[n],i=new Image();i.src='data:image/webp;base64,'+t.b;RIGNP.tl[n]=i}})();
function npOk(k){var i=RIGNP.im[k];return !!(i&&i.complete&&i.naturalWidth)}
/* attrezzi v6: il corpo resta quello fermo in presa; inclinazione, abbassamento e angolo dell'attrezzo sono calcolati qui */
function RIGNPA(u,side){
  var lean=u<.36?-.07*(u/.36):u<.5?lerp(-.07,.11,sstep(.36,.5,u)):lerp(.11,0,sstep(.55,1,u));
  var dip=u>.36&&u<.7?1.6*Math.sin((u-.36)/.34*Math.PI):0;
  var aw=-1.15,as=1.35,rs=.2,ang=u<.36?lerp(rs,aw,sstep(0,.36,u)):u<.5?lerp(aw,as,sstep(.36,.5,u)):lerp(as,rs,sstep(.55,1,u));
  return {lean:side?lean:lean*.3,dip:dip*10,ang:side?ang:ang*.45};
}
function RIGMZ(o,v,back,side,tool,sw,mv,ph){
""")
rep("  if((tool==='axe'||tool==='pick')&&sw!=null){\n    /* attrezzi v5: corpo + attrezzo separati (Muse) */",
"  if((tool==='axe'||tool==='pick')&&sw!=null){\n    {var __nk=(pf==='mar:'?'mar:':'cap:')+'np-presa-'+(v==='profilo'?'profilo-destro':v);if(npOk(__nk))return {k:__nk,nf:v==='profilo'?0:1,np:1}}\n    /* attrezzi v5: corpo + attrezzo separati (Muse) */")
rep("  g.scale(FLX*KF,KF);\n  let n,hp,ang;const RIGU=",
"  g.scale(FLX*KF,KF);\n  const NPM=MZ&&MZ.np&&sw!=null?RIGNPA(sw,side):null;if(NPM){g.rotate(NPM.lean);g.translate(0,NPM.dip)}\n  let n,hp,ang;const RIGU=")
rep("  if(tool&&!back&&!MZ)ht();\n  g.restore();\n}",
"""  if(tool&&!back&&!MZ)ht();
  if(NPM){const info=RIGNP.np[MZ.k],tn=tool==='axe'?(side?'ascia-destra':'ascia'):'piccone',tm=RIGNP.tl[tn],td=RIGNP.tools[tn];
    if(info&&tm&&tm.complete&&tm.naturalWidth){const ts=info.k*.85;g.save();g.translate(info.fist[0],info.fist[1]);g.rotate(NPM.ang);g.scale(ts,ts);g.drawImage(tm,-td.grip[0],-170);g.restore()}}
  g.restore();
}""")
src=src.replace('__NP__',open('/home/claude/work/mz_np.json').read(),1)
open(P,'w',encoding='utf8').write(src);print('patch114 ok')
