/* ---- personaggio a pezzi (grafica personaggio prova) ---- */
var RIG={ok:false,im:{},dim:RIGART.dim,K:0.0345};
(function(){var n=0,tot=0;for(var k in RIGART.img)tot++;for(var k in RIGART.img){(function(k){var i=new Image();i.onload=function(){if(++n===tot)RIG.ok=true};i.src='data:image/webp;base64,'+RIGART.img[k];RIG.im[k]=i})(k)}})();
function rgD(g,n,px,py){var d=RIG.dim[n];g.drawImage(RIG.im[n],-px,-py,d[0],d[1])}
function rgW(n){return RIG.dim[n][0]}function rgH(n){return RIG.dim[n][1]}
function rgFace(t,o){if(o&&o.emote)return o.emote;var c=(t*1000)%3400;return c>3250?'r4-occhi-chiusi':'r4-neutra'}
/* braccio a due pezzi: spalla a1, gomito a2 (rispetto al braccio); hook = disegno attrezzo alla mano */
function rgArm(g,up,lo,a1,a2,hook){
  g.save();g.rotate(a1);rgD(g,up,rgW(up)/2,40);
  g.translate(0,rgH(up)-70);g.rotate(a2);
  if(hook)hook(g);
  rgD(g,lo,rgW(lo)/2,40);g.restore()}
function rgLeg(g,th,sh,a1,a2,shx){
  g.save();g.rotate(a1);rgD(g,th,rgW(th)/2,40);
  g.translate(0,rgH(th)-70);g.rotate(a2);rgD(g,sh,shx==null?rgW(sh)/2:shx,40);g.restore()}
function drawRig(g,x,y,o){
  const K=RIG.K,t=o.t||0,back=o.dir==='b',side=!!o.side&&!back,mv=o.moving?1:0,ph=o.walk||0,sw=o.swing,tool=o.tool;
  const s1=Math.sin(ph),s2=-s1;
  const bob=mv?Math.abs(Math.sin(ph))*24:Math.sin(t*2.2)*8;
  g.save();g.translate(x,y);
  if(!o.noShadow){g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,0,12,4.6,0,0,7);g.fill()}
  g.scale((o.flip?-1:1)*K,K);
  if(o.alpha!=null)g.globalAlpha=o.alpha;
  let E=0;if(tool&&sw!=null)E=sw<.45?sw/.45:1-(sw-.45)/.55;
  const hipY=-600;
  const hook=(len)=>tool?function(g2){g2.save();g2.translate(0,len);g2.scale(1/K,1/K);drawTool(g2,tool);g2.restore()}:null;
  const armA=(k)=>{ // k=1: braccio con l'attrezzo/destro
    if(tool&&k&&sw!=null)return [-2.5+E*2.8,-.7+E*.7];
    if(tool&&k)return [-.9,-1.2];
    if(mv){const s=k?s2:s1;return side?[s*.7,s<0?-.5:-.1]:[s*.24,0]}
    return [k?.06:-.06,-.08+Math.sin(t*2.2)*.03]};
  if(side){
    const leg=(k)=>{const s=k?s2:s1;const a1=mv?s*.65:0,a2=mv?(s>0?-s*.8:0):0;
      g.save();g.translate(-5,hipY);rgLeg(g,'r3-coscia','r3-stinco',a1,a2,rgW('r3-stinco')*.40);g.restore()};
    const arm=(k)=>{const a=armA(k);g.save();g.translate(-5,hipY-440-bob);rgArm(g,'r3-braccio-sup','r3-avambraccio',a[0],a[1],k?hook(rgH('r3-avambraccio')-90):null);g.restore()};
    g.save();g.filter='brightness(.7)';leg(1);arm(0);g.restore();
    leg(0);
    g.save();g.translate(0,-bob);
    g.save();g.translate(0,hipY-60);rgD(g,'r3-bacino',rgW('r3-bacino')/2,rgH('r3-bacino')*.35);g.restore();
    g.save();g.translate(0,hipY-300);rgD(g,'r3-busto',rgW('r3-busto')/2,rgH('r3-busto')/2);g.restore();
    g.restore();
    g.save();g.translate(25,hipY-bob-640);rgD(g,'r3-testa',rgW('r3-testa')*.45,rgH('r3-testa')*.85);g.restore();
    arm(1);
  }else{
    const P=back?'r2':'r1';
    const leg=(k)=>{const L=k?'dx':'sx',s=k?s2:s1;const lift=mv?Math.max(0,s)*55:0;
      g.save();g.translate((k?1:-1)*78*(back?-1:1),hipY-lift*0);g.translate(0,0);
      rgLeg(g,P+'-coscia-'+L,P+'-stinco-'+L,0,0);g.restore()};
    // sollevamento del piede nel passo
    const legW=(k)=>{const L=k?'dx':'sx',s=k?s2:s1;const lift=mv?Math.max(0,s)*70:0;
      g.save();g.translate((k?1:-1)*78*(back?-1:1),hipY);
      rgD(g,P+'-coscia-'+L,rgW(P+'-coscia-'+L)/2,40);
      g.translate(0,rgH(P+'-coscia-'+L)-70-lift);rgD(g,P+'-stinco-'+L,rgW(P+'-stinco-'+L)/2,40);g.restore()};
    legW(0);legW(1);
    const arm=(k)=>{const a=armA(k);const L=k?'dx':'sx';
      const hx=(k?1:-1)*(back?-1:1)*215;
      g.save();g.translate(hx,hipY-bob-500);
      const mir=(k?-1:1)*(back?-1:1),sw2=mv&&!tool;rgArm(g,P+'-braccio-sup-'+L,P+'-avambraccio-'+L,sw2?a[0]*(back?-1:1):a[0]*mir,a[1]*mir,k?hook(rgH(P+'-avambraccio-'+L)-100):null);g.restore()};
    g.save();g.translate(0,-bob);
    if(back){arm(0);arm(1)}else arm(0);
    g.save();g.translate(0,hipY-40);rgD(g,P+'-bacino',rgW(P+'-bacino')/2,rgH(P+'-bacino')*.5);g.restore();
    g.save();g.translate(0,hipY-300);rgD(g,P+'-busto',rgW(P+'-busto')/2,rgH(P+'-busto')/2);g.restore();
    const hn=back?'r2-testa':rgFace(t,o);
    g.save();g.translate(0,hipY-560);rgD(g,hn,rgW(hn)/2,rgH(hn)*.88);g.restore();
    if(!back)arm(1);
    g.restore();
  }
  g.restore();
}
