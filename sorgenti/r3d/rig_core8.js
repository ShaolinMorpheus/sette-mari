/* ---- personaggio 3D a fotogrammi (grafica personaggio prova) ---- */
var RIG={ok:false,im:{},dim:RIGART.dim,anc:RIGART.anc,KF:0.105,hand:RIGART.hand,hd:RIGART.hd,hq:RIGART.hq,hat:{},hatok:false,HS:12.8,HY:.7};
(function(){var n=0,tot=0;for(var k in RIGART.img)tot++;for(var k in RIGART.img){(function(k){var i=new Image();i.onload=function(){if(++n===tot)RIG.ok=true};i.src='data:image/webp;base64,'+RIGART.img[k];RIG.im[k]=i})(k)}})();
var RIGANG={fronte:{r:.25,c1:.12,c2:2.1,c3:2.8},spalle:{r:.25,c1:.12,c2:2.1,c3:2.8},profilo:{r:.35,c1:.1,c2:1.5,c3:2.6}};
/* frame disegnati da Muse (Giacca rossa del Capitano e Maglia da marinaio) */
var RIGM={ok:false,im:{},hq:RIGMART.hq,hand:RIGMART.hand,dim:RIGMART.dim,anc:RIGMART.anc};
(function(){var n=0,tot=0;for(var k in RIGMART.img)tot++;for(var k in RIGMART.img){(function(k){var i=new Image();i.onload=function(){if(++n===tot)RIGM.ok=true};i.src='data:image/webp;base64,'+RIGMART.img[k];RIGM.im[k]=i})(k)}})();
function RIGMZ(o,v,back,side,tool,sw,mv,ph){
  var pf=!o.k?null:(!o.k.oid||o.k.oid==='o_cap')?'':o.k.oid==='o_mar'?'mar:':null;
  if(!RIGM.ok||pf===null)return null;
  var nm=null,nf=0;
  if((tool==='axe'||tool==='pick')&&sw!=null){
    if(v!=='profilo')return null;
    var U=[0,.2,.36,.45,.55,.8],RU=[0,.1,.2,.3,.36,.42,.5,.6,.72,.86],bi=0,bd=9,i,d;
    for(i=0;i<RU.length;i++){d=Math.abs(RU[i]-sw);if(d<bd){bd=d;bi=i}}
    var u=RU[bi],bj=0;bd=9;for(i=0;i<U.length;i++){d=Math.abs(U[i]-u);if(d<bd){bd=d;bj=i}}
    nm=(tool==='axe'?'ascia':'piccone')+'-taglio'+(bj+1)+'-profilo-destro';
  }else if(tool&&sw!=null){
    if(v!=='profilo')return null;
    var E=sw<.45?sw/.45:1-(sw-.45)/.55,k=E<.3?1:E<.75?2:3;nm='mani-nude-colpo'+k+'-profilo-destro';
  }else if(!tool){
    var dir=v==='fronte'?'fronte':v==='spalle'?'spalle':(o.flip?'profilo-sinistro':'profilo-destro');
    nf=(v==='profilo'&&o.flip)?1:0;
    var st=mv?'passo'+(1+(Math.floor((((ph/(Math.PI*2))%1)+1)%1*8)>>1)):'fermo';
    nm=(o.torchHand?'torcia-':'')+dir+'-'+st;
  }
  return nm&&RIGM.im[pf+nm]?{k:pf+nm,nf:nf}:null;
}
function drawRig(g,x,y,o){
  const KF=RIG.KF,t=o.t||0,back=o.dir==='b',side=!!o.side&&!back,mv=o.moving?1:0,ph=o.walk||0,sw=o.swing,tool=o.tool;
  const v=back?'spalle':side?'profilo':'fronte';
  const MZ=RIGMZ(o,v,back,side,tool,sw,mv,ph);let FLX=o.flip?-1:1;if(MZ&&MZ.nf)FLX=1;
  g.save();g.translate(x,y);
  if(!o.noShadow){g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,0,12,4.6,0,0,7);g.fill()}
  if(o.alpha!=null)g.globalAlpha=o.alpha;
  g.scale(FLX*KF,KF);
  let n,hp,ang;const RIGU=[0,.1,.2,.3,.36,.42,.5,.6,.72,.86];
  if((tool==='axe'||tool==='pick')&&sw!=null){
    let bi=0,bd=9;for(let i=0;i<RIGU.length;i++){const d=Math.abs(RIGU[i]-sw);if(d<bd){bd=d;bi=i}}
    n=v+'-'+tool+'-'+(bi+1);hp=null;
  }else if(tool&&sw!=null){
    let E=sw<.45?sw/.45:1-(sw-.45)/.55;
    const k=E<.3?1:E<.75?2:3;
    n=v+'-colpo-'+k;hp=RIG.hand[n].hm;ang=RIGANG[v]['c'+k];
  }else{
    n=v+'-'+(mv?'cammina-'+(1+Math.floor((((ph/(Math.PI*2))%1)+1)%1*8)):'fermo');
    const h=RIG.hand[n];hp=side?h.hr:h.hl;ang=RIGANG[v].r;
  }
  const d=MZ?RIGM.dim:RIG.dim[n],ax=MZ?RIGM.anc[0]:RIG.anc[0],ay=MZ?RIGM.anc[1]:RIG.anc[1];
  const IM0=MZ?RIGM.im[MZ.k]:RIG.im[n],HQ=MZ?RIGM.hq[MZ.k]:(RIG.hq&&RIG.hq[n]);
  const ht=()=>{if(!hp)return;g.save();g.translate(hp[0],hp[1]);g.rotate(ang);g.scale(1/KF,1/KF);drawTool(g,tool);g.restore()};
  if(tool&&back&&!MZ)ht();
  var __hn=(o.k&&o.k.hat&&o.k.hat!=='bald')?RIGHATMAP(o.k):null,__hq=HQ,__he=__hn&&RIGHAT.E&&RIGHAT.E[__hn]&&RIG.hatok&&__hq?RIG.hat[__hn+'_E'+(back?'b':side?'s':'f')]:null;
  if(__he){
    const im0=IM0,sx=im0.width/d[0];let tc=RIG.tc;if(!tc){tc=RIG.tc=document.createElement('canvas')}
    if(tc.width<im0.width||tc.height<im0.height){tc.width=im0.width;tc.height=im0.height}
    const tg=tc.getContext('2d');tg.setTransform(1,0,0,1,0,0);tg.globalCompositeOperation='source-over';tg.clearRect(0,0,tc.width,tc.height);tg.drawImage(im0,0,0);
    const kk=back?'b':side?'s':'f',Wc=RIGHAT.WC[kk],Hc=RIGHAT.H,q=__hq;
    tg.globalCompositeOperation='destination-out';
    tg.setTransform(sx,0,0,sx,ax*sx,ay*sx);tg.transform((q[1][0]-q[0][0])/Wc,(q[1][1]-q[0][1])/Wc,(q[2][0]-q[0][0])/Hc,(q[2][1]-q[0][1])/Hc,q[0][0],q[0][1]);
    tg.drawImage(__he,-RIGHAT.ML,-RIGHAT.MT,RIGHAT.art[__hn]['w'+kk],RIGHAT.art[__hn].h);
    tg.setTransform(1,0,0,1,0,0);tg.globalCompositeOperation='source-over';
    g.drawImage(tc,0,0,im0.width,im0.height,-ax,-ay,d[0],d[1]);
  }else g.drawImage(IM0,-ax,-ay,d[0],d[1]);
  if(o.k&&o.k.hat&&o.k.hat!=='bald'){
    const nm=RIGHATMAP(o.k),ha=nm&&RIGHAT.art[nm],q=HQ;
    if(ha&&q&&RIG.hatok){
      const kk=back?'b':side?'s':'f',im=RIG.hat[nm+'_'+kk],Wc=RIGHAT.WC[kk],Hc=RIGHAT.H;
      g.save();g.transform((q[1][0]-q[0][0])/Wc,(q[1][1]-q[0][1])/Wc,(q[2][0]-q[0][0])/Hc,(q[2][1]-q[0][1])/Hc,q[0][0],q[0][1]);
      g.drawImage(im,-RIGHAT.ML,-RIGHAT.MT,ha['w'+kk],ha.h);g.restore();
    }else if(typeof hatOnly==='function'&&RIG.hd&&RIG.hd[n]){const q2=RIG.hd[n];g.save();g.translate(q2[0],q2[1]);g.rotate(q2[2]);g.scale(RIG.HS,RIG.HS);try{hatOnly(g,o.k,back,side,RIG.HY,9.6)}catch(e){}g.restore()}
  }
  if(tool&&!back&&!MZ)ht();
  g.restore();
}

/* cappelli disegnati (Muse): un livello per vista, agganciato al piano della testa */
(function(){var n=0,tot=0;for(var nm in RIGHAT.art)for(var k of ['f','s','b'])tot+=2;
 for(var nm in RIGHAT.art)for(var k of ['f','s','b']){(function(nm,k){var i=new Image();i.onload=function(){if(++n===tot)RIG.hatok=true};i.src='data:image/webp;base64,'+RIGHAT.art[nm][k];RIG.hat[nm+'_'+k]=i;
  var e=new Image();e.onload=function(){if(++n===tot)RIG.hatok=true};e.src='data:image/webp;base64,'+RIGHAT.E[nm][k];RIG.hat[nm+'_E'+k]=e})(nm,k)}})();
function RIGHATMAP(k){var r=k.rig;if(r&&RIGHAT.map[r])return RIGHAT.map[r];return null}
