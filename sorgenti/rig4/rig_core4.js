/* ---- personaggio a pezzi + fotogrammi (grafica personaggio prova) ---- */
var RIG={ok:false,im:{},dim:RIGART.dim,K:0.0335,KF:0.0925};
(function(){var n=0,tot=0;for(var k in RIGART.img)tot++;for(var k in RIGART.img){(function(k){var i=new Image();i.onload=function(){if(++n===tot)RIG.ok=true};i.src='data:image/webp;base64,'+RIGART.img[k];RIG.im[k]=i})(k)}})();
function rgD(g,n,px,py){var d=RIG.dim[n];g.drawImage(RIG.im[n],-px,-py,d[0],d[1])}
function rgW(n){return RIG.dim[n][0]}function rgH(n){return RIG.dim[n][1]}
function rgFace(t,o){if(o&&o.emote)return o.emote;var c=(t*1000)%3400;return c>3250?'r4-occhi-chiusi':'r4-neutra'}
/* braccio: parte alta (pivot spalla) + avambraccio, che parte da (lpx,lpy) del suo disegno */
function rgArm(g,up,lo,a1,a2,hook,lpx,lpy,ov){
  ov=ov||120;if(lpx==null){lpx=rgW(lo)/2;lpy=90}
  g.save();g.rotate(a1);
  g.save();g.translate(0,rgH(up)-ov);g.rotate(a2);
  if(hook)hook(g);
  rgD(g,lo,lpx,lpy);g.restore();
  rgD(g,up,rgW(up)/2,40);g.restore()}
function rgLeg(g,th,sh,a1,a2,shx,ov){
  ov=ov||110;g.save();g.rotate(a1);
  g.save();g.translate(0,rgH(th)-ov);g.rotate(a2);rgD(g,sh,shx==null?rgW(sh)/2:shx,90);g.restore();
  rgD(g,th,rgW(th)/2,40);g.restore()}
function rgFrame(g,n){var d=RIG.dim[n];g.drawImage(RIG.im[n],-d[0]/2,-d[1],d[0],d[1])}
function drawRig(g,x,y,o){
  const K=RIG.K,t=o.t||0,back=o.dir==='b',side=!!o.side&&!back,mv=o.moving?1:0,ph=o.walk||0,sw=o.swing,tool=o.tool;
  const s1=Math.sin(ph),s2=-s1;
  const bob=mv?Math.abs(Math.sin(ph))*24:Math.sin(t*2.2)*8;
  g.save();g.translate(x,y);
  if(!o.noShadow){g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,0,12,4.6,0,0,7);g.fill()}
  if(o.alpha!=null)g.globalAlpha=o.alpha;
  let E=0;if(tool&&sw!=null)E=sw<.45?sw/.45:1-(sw-.45)/.55;
  const hipY=-600;
  const hook=(len,hx)=>tool?function(g2){g2.save();g2.translate(hx||0,len);g2.scale(1/K,1/K);drawTool(g2,tool);g2.restore()}:null;
  const armA=(k)=>{
    if(tool&&k&&sw!=null)return [-2.5+E*2.8,-.7+E*.7];
    if(tool&&k)return [-.9,-1.2];
    if(mv){const s=k?s2:s1;return [s*.7,s<0?-.5:-.1]}
    return [k?.06:-.06,-.08+Math.sin(t*2.2)*.03]};
  const useTool=!!tool;
  if(!side){
    // fotogrammi (camminata a 4 tempi, gambe che si muovono sempre) + attrezzo in mano
    g.scale((o.flip?-1:1)*RIG.KF,RIG.KF);
    const n=mv?(back?'bk-':'fr-')+(1+Math.floor((((ph/(Math.PI*2))%1)+1)%1*4)):(back?'st-b':'st-f');
    const hx=back?-128:128,hy=-215;
    const ht=(ang)=>{g.save();g.translate(hx,hy);g.rotate(ang);g.scale(1/RIG.KF,1/RIG.KF);drawTool(g,tool);g.restore()};
    const ang=sw!=null?-1.3+E*1.9:-.3;
    if(tool&&back)ht(ang);
    rgFrame(g,n);
    if(tool&&!back)ht(ang);
  }else{
    const KS=.034;g.scale((o.flip?-1:1)*KS,KS);
    const hipY=-620,bd=-bob*1.6;
    const hookS=(len,hx)=>tool?function(g2){g2.save();g2.translate(hx,len);g2.scale(1/KS,1/KS);drawTool(g2,tool);g2.restore()}:null;
    // gambe: oscillazione ampia, ginocchio che si piega quando la gamba va avanti
    const legP=(far)=>{const s=far?s2:s1;if(!mv)return [0,0];return [s*.75,Math.max(0,-s)*1.05+Math.max(0,s)*.12]};
    const leg=(far)=>{const L=legP(far);
      g.save();g.translate(far?-26:10,hipY+bd+20);g.rotate(L[0]);
      g.save();g.translate(0,330-120);g.rotate(L[1]);rgD(g,far?'lato2-stinco-lontano':'lato2-stinco',108,40);g.restore();
      rgD(g,far?'lato2-coscia-lontano':'lato2-coscia',64,40);g.restore()};
    const arm=(far)=>{const a=armA(far?0:1);
      g.save();g.translate(-102,hipY+bd-430);
      const un=far?'lato2-braccio-sup-lontano':'lato2-braccio-sup',ln=far?'lato2-avambraccio-lontano':'lato2-avambraccio';
      const tl=(!far&&tool)?hookS(250,80):null;
      rgArm(g,un,ln,far?-a[0]*.9:a[0],a[1],tl,62,50,100);g.restore()};
    leg(1);arm(1);leg(0);
    g.save();g.translate(0,hipY+bd+20);rgD(g,'lato2-bacino',107,110);g.restore();
    g.save();g.translate(24,hipY+bd-440);g.scale(1.2,1.2);rgD(g,'lato2-testa',200,560);g.restore();
    g.save();g.translate(0,hipY+bd+30);rgD(g,'lato2-busto',190,540);g.restore();
    arm(0);
  }
  g.restore();
}
