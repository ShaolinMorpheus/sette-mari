/* ---- personaggio 3D a fotogrammi (grafica personaggio prova) ---- */
var RIG={ok:false,im:{},dim:RIGART.dim,anc:RIGART.anc,KF:0.0902,hand:RIGART.hand};
(function(){var n=0,tot=0;for(var k in RIGART.img)tot++;for(var k in RIGART.img){(function(k){var i=new Image();i.onload=function(){if(++n===tot)RIG.ok=true};i.src='data:image/webp;base64,'+RIGART.img[k];RIG.im[k]=i})(k)}})();
var RIGANG={fronte:{r:.25,c1:.12,c2:2.1,c3:2.8},spalle:{r:.25,c1:.12,c2:2.1,c3:2.8},profilo:{r:.35,c1:.1,c2:1.5,c3:2.6}};
function drawRig(g,x,y,o){
  const KF=RIG.KF,t=o.t||0,back=o.dir==='b',side=!!o.side&&!back,mv=o.moving?1:0,ph=o.walk||0,sw=o.swing,tool=o.tool;
  const v=back?'spalle':side?'profilo':'fronte';
  g.save();g.translate(x,y);
  if(!o.noShadow){g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,0,12,4.6,0,0,7);g.fill()}
  if(o.alpha!=null)g.globalAlpha=o.alpha;
  g.scale((o.flip?-1:1)*KF,KF);
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
  const d=RIG.dim[n],ax=RIG.anc[0],ay=RIG.anc[1];
  const ht=()=>{if(!hp)return;g.save();g.translate(hp[0],hp[1]);g.rotate(ang);g.scale(1/KF,1/KF);drawTool(g,tool);g.restore()};
  if(tool&&back)ht();
  g.drawImage(RIG.im[n],-ax,-ay,d[0],d[1]);
  if(tool&&!back)ht();
  g.restore();
}
