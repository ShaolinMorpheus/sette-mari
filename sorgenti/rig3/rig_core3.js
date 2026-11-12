/* ---- personaggio a pezzi + fotogrammi v3 (grafica personaggio prova) ---- */
var RIG={ok:false,im:{},dim:RIGART.dim,KF:0.19};
(function(){var n=0,tot=0;for(var k in RIGART.img)tot++;for(var k in RIGART.img){(function(k){var i=new Image();i.onload=function(){if(++n===tot)RIG.ok=true};i.src='data:image/webp;base64,'+RIGART.img[k];RIG.im[k]=i})(k)}})();
function rgP(g,n,px,py,sc){var d=RIG.dim[n];sc=sc||1;g.drawImage(RIG.im[n],-px*sc,-py*sc,d[0]*sc,d[1]*sc)}
function rgFrame(g,n){var d=RIG.dim[n];g.drawImage(RIG.im[n],-d[0]/2,-d[1],d[0],d[1])}
function drawRig(g,x,y,o){
  const KF=RIG.KF,t=o.t||0,back=o.dir==='b',side=!!o.side&&!back,mv=o.moving?1:0,ph=o.walk||0,sw=o.swing,tool=o.tool;
  const s1=Math.sin(ph),s2=-s1;
  const bob=mv?Math.abs(Math.sin(ph))*7:Math.sin(t*2.2)*2;
  g.save();g.translate(x,y);
  if(!o.noShadow){g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,0,12,4.6,0,0,7);g.fill()}
  if(o.alpha!=null)g.globalAlpha=o.alpha;
  let E=0;if(tool&&sw!=null)E=sw<.45?sw/.45:1-(sw-.45)/.55;
  g.scale((o.flip?-1:1)*KF,KF);
  const holdTool=(hx,hy,ang)=>{g.save();g.translate(hx,hy);g.rotate(ang);g.scale(1/KF,1/KF);drawTool(g,tool);g.restore()};
  if(!side){
    const n=mv?(back?'bk-':'fr-')+(1+Math.floor((((ph/(Math.PI*2))%1)+1)%1*4)):(back?'st-b':'st-f');
    const hx=back?-58:58,hy=-100;
    if(tool&&back)holdTool(hx,hy,tool&&sw!=null?-1.2+E*1.8:-.3);
    rgFrame(g,tool&&!mv?(back?'st-b':'st-f'):n);
    if(tool&&!back)holdTool(hx,hy,sw!=null?-1.2+E*1.8:-.3);
  }else{
    const S=.5,SL=.44;
    const hipY=-82-(mv?0:0),bd=-bob;
    const legA=(far)=>{const s=far?s2:s1;return mv?[s*.55,s>0?-s*.8:s*.15]:[0,0]};
    const leg=(far)=>{const L=legA(far),th=far?'s-coscia-lontano':'s-coscia',bo=far?'s-stinco-lontano':'s-stinco';
      g.save();g.translate(far?-4:2,hipY+bd);g.rotate(L[0]);
      g.save();g.translate(0,rgH(th,SL)-14);g.rotate(-L[0]*.7+L[1]);rgP(g,bo,28,18,SL);g.restore();
      rgP(g,th,RIG.dim[th][0]/2,26,SL);g.restore()};
    const arm=(far)=>{const nm=far?'s-braccio-sup-lontano':'s-braccio-sup';
      let a;if(tool&&!far)a=sw!=null?-2.3+E*2.3:-.9;else if(mv)a=(far?s1:s2)*.6;else a=(far?-.05:.05)+Math.sin(t*2.2)*.03;
      g.save();g.translate(-16,hipY+bd-86);g.rotate(a);
      if(tool&&!far){g.save();g.translate(0,RIG.dim[nm][1]*S-26);g.rotate(0);g.scale(1/KF,1/KF);drawTool(g,tool);g.restore()}
      rgP(g,nm,42,34,S);g.restore()};
    leg(1);arm(1);leg(0);
    g.save();g.translate(2,hipY+bd+4);rgP(g,'s-bacino',55,24,.42);g.restore();
    g.save();g.translate(5,hipY+bd-84);rgP(g,'s-testa',95,236,S);g.restore();
    g.save();g.translate(0,hipY+bd+6);rgP(g,'s-busto',78,220,S);g.restore();
    arm(0);
  }
  g.restore();
}
function rgH(n,s){return RIG.dim[n][1]*s}
