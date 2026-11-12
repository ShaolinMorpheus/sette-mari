/* ---- personaggio a fotogrammi v5 (grafica personaggio prova) ---- */
var RIG={ok:false,im:{},dim:RIGART.dim,anc:RIGART.anc,KF:0.0555};
(function(){var n=0,tot=0;for(var k in RIGART.img)tot++;for(var k in RIGART.img){(function(k){var i=new Image();i.onload=function(){if(++n===tot)RIG.ok=true};i.src='data:image/webp;base64,'+RIGART.img[k];RIG.im[k]=i})(k)}})();
/* posizione delle mani (px della tela 1200x1250) nei fotogrammi di colpo e a riposo, e inclinazione dell'attrezzo */
var RIGHAND={
 fronte:{rest:[790,960,.25],c1:[595,200,.12],c2:[594,990,2.1],c3:[585,1030,2.8]},
 spalle:{rest:[410,960,.25],c1:[615,219,.12],c2:[600,954,2.1],c3:[590,969,2.8]},
 profilo:{rest:[690,930,.35],c1:[615,213,.1],c2:[720,918,1.5],c3:[660,948,2.6]}};
function drawRig(g,x,y,o){
  const KF=RIG.KF,t=o.t||0,back=o.dir==='b',side=!!o.side&&!back,mv=o.moving?1:0,ph=o.walk||0,sw=o.swing,tool=o.tool;
  const v=back?'spalle':side?'profilo':'fronte';
  g.save();g.translate(x,y);
  if(!o.noShadow){g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,0,12,4.6,0,0,7);g.fill()}
  if(o.alpha!=null)g.globalAlpha=o.alpha;
  g.scale((o.flip?-1:1)*KF,KF);
  let n,H;
  if(tool&&sw!=null){
    let E=sw<.45?sw/.45:1-(sw-.45)/.55;
    const k=E<.3?'c1':E<.75?'c2':'c3';
    n=v+'-colpo-'+k.slice(1);H=RIGHAND[v][k];
  }else{
    n=v+'-'+(mv?'cammina-'+(1+Math.floor((((ph/(Math.PI*2))%1)+1)%1*4)):'fermo');H=RIGHAND[v].rest;
  }
  const d=RIG.dim[n],ax=RIG.anc[0],ay=RIG.anc[1];
  const ht=()=>{g.save();g.translate(H[0]-600,H[1]-1179);g.rotate(H[2]);g.scale(1/KF,1/KF);drawTool(g,tool);g.restore()};
  if(tool&&back)ht();
  g.drawImage(RIG.im[n],-ax,-ay,d[0],d[1]);
  if(tool&&!back)ht();
  g.restore();
}
