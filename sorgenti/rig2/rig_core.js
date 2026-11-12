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
  if(!side&&!useTool){
    // fotogrammi: camminata e posa ferma di fronte / di spalle
    g.scale((o.flip?-1:1)*RIG.KF,RIG.KF);
    const n=mv?(back?'bk-':'fr-')+(1+Math.floor((((ph/(Math.PI*2))%1)+1)%1*4)):(back?'st-b':'st-f');
    rgFrame(g,n);
  }else if(!side&&useTool){
    g.scale((o.flip?-1:1)*K,K);
    const P=back?'r2':'r1';
    const legW=(k)=>{const L=k?'dx':'sx';
      g.save();g.translate((k?1:-1)*78*(back?-1:1),hipY);
      g.save();g.translate(0,rgH(P+'-coscia-'+L)-110);rgD(g,P+'-stinco-'+L,rgW(P+'-stinco-'+L)/2,90);g.restore();
      rgD(g,P+'-coscia-'+L,rgW(P+'-coscia-'+L)/2,40);g.restore()};
    legW(0);legW(1);
    const arm=(k)=>{const a=armA(k);
      const hx=(k?1:-1)*(back?-1:1)*(back?215:232),f=hx>0?1:-1;
      let l1,l2;
      if(k){l1=-a[0];l2=-a[1]}else{l1=-.07;l2=.1}
      g.save();g.translate(hx,hipY-bob-500);if(f<0)g.scale(-1,1);
      rgArm(g,P+'-braccio-sup-dx',P+'-avambraccio-dx',l1,l2,k?hook(rgH(P+'-avambraccio-dx')-100):null,null,null,70);g.restore()};
    g.save();g.translate(0,-bob);
    if(back){arm(0);arm(1)}
    g.save();g.translate(0,hipY-40);rgD(g,P+'-bacino',rgW(P+'-bacino')/2,rgH(P+'-bacino')*.5);g.restore();
    g.save();g.translate(0,hipY-300);rgD(g,P+'-busto',rgW(P+'-busto')/2,rgH(P+'-busto')/2);g.restore();
    const hn=back?'r2-testa':'r1-testa';
    g.save();g.translate(0,hipY-560);rgD(g,hn,rgW(hn)/2,rgH(hn)*.88);g.restore();
    if(!back){arm(0);arm(1)}
    g.restore();
  }else{
    g.scale((o.flip?-1:1)*K*1.12,K*1.12);
    const legAng=(k)=>{const s=k?s2:s1;return mv?[s*.6,s>0?-s*.85:0]:[0,0]};
    const leg=(far)=>{const L=legAng(far);g.save();g.translate(-5,hipY);
      rgLeg(g,far?'lato2-coscia-lontano':'lato2-coscia',far?'lato2-stinco-lontano':'lato2-stinco',L[0],L[1],100);g.restore()};
    const arm=(far)=>{const a=armA(far?0:1);g.save();g.translate(0,hipY-bob-395);
      const un=far?'lato2-braccio-sup-lontano':'lato2-braccio-sup',ln=far?'lato2-avambraccio-lontano':'lato2-avambraccio';
      const tl=(!far&&tool)?hook(300,170):null;
      rgArm(g,un,ln,a[0],a[1],tl,86,40,90);g.restore()};
    leg(1);arm(1);
    leg(0);
    g.save();g.translate(5,hipY-bob-310);g.scale(1.22,1.22);rgD(g,'lato2-testa',219,560);g.restore();
    g.save();g.translate(0,-bob);
    g.save();g.translate(0,hipY-40);rgD(g,'lato2-bacino',138,120);g.restore();
    g.save();g.translate(0,hipY-300);rgD(g,'lato2-busto',113,100);g.restore();
    g.restore();
    arm(0);
  }
  g.restore();
}
