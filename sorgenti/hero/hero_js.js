/* ---- GRAFICA DI PROVA: personaggio d'arte a strati (braccia e gambe separate) ---- */
GfxNew.hero=function(){
  const PT=@PARTS@;
  const IMG={};for(const k in PT){const i=new Image();i.src='data:image/webp;base64,'+PT[k].b;IMG[k]=i}
  const H={};GfxNew.herop=H;
  H.ok=()=>{for(const k in IMG){const i=IMG[k];if(!(i.complete&&i.naturalWidth>0))return false}return true};
  const F=.0655,FY=1015;
  const part=(g,n,cx,dx)=>{const p=PT[n];g.drawImage(IMG[n],(p.ox-cx+(dx||0))*F,(p.oy-FY)*F,p.sw*F,p.sh*F)};
  let FAR=null;const farImg=()=>{if(FAR)return FAR;const p=PT.s_arm,c=document.createElement('canvas');c.width=IMG.s_arm.naturalWidth;c.height=IMG.s_arm.naturalHeight;const x=c.getContext('2d');x.drawImage(IMG.s_arm,0,0);x.globalCompositeOperation='source-atop';x.fillStyle='rgba(6,8,14,.5)';x.fillRect(0,0,c.width,c.height);return FAR=c};
  // braccio rigido: ruota attorno alla spalla, si accorcia (k) e porta l'attrezzo nella mano
  const arm=(g,n,cx,sx,sy,hx,hy,ang,k,tool,phi,far)=>{
    const px=(sx-cx)*F,py=(sy-FY)*F;
    g.save();g.translate(px,py);g.rotate(ang);if(k!==1)g.scale(1,k);g.translate(-px,-py);
    if(far){const p=PT[n];g.drawImage(farImg(),(p.ox-cx)*F,(p.oy-FY)*F,p.sw*F,p.sh*F)}else part(g,n,cx);
    if(tool){g.translate((hx-cx)*F,(hy-FY)*F);if(k!==1)g.scale(1,1/k);g.rotate(phi-ang);drawTool(g,tool)}
    g.restore()};
  const lerp=(a,b,k)=>a+(b-a)*k;
  H.draw=(g,x,y,o)=>{
    const t=o.t||0,back=o.dir==='b',mv=o.moving?1:0,ph=o.walk||0,s=o.s||1,side=!!o.side&&!back,sn=Math.sin(ph),sw=o.swing;
    const swinging=o.tool&&sw!=null;
    g.save();g.translate(x,y);g.scale((o.flip?-1:1)*s,s);
    if(o.alpha!=null)g.globalAlpha=o.alpha;
    if(!o.noShadow){g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,0,13,5,0,0,7);g.fill()}
    const bob=mv?Math.abs(sn)*1.8:Math.sin(t*2.2)*.45;
    let lean=0,dip=0;
    if(swinging){const u=sw;lean=u<.36?-.07*(u/.36):u<.5?lerp(-.07,.11,sstep(.36,.5,u)):lerp(.11,0,sstep(.55,1,u));dip=u>.36&&u<.7?1.6*Math.sin((u-.36)/.34*Math.PI):0}
    else if(mv)lean=side?.06+Math.sin(ph*2)*.015:sn*.035;
    g.translate(0,dip-bob-13);g.rotate(lean);g.translate(0,13);
    // angoli delle braccia (stessa logica del personaggio disegnato a codice)
    const idl=Math.sin(t*2)*.03;
    let L1,L2,R1,R2,phi=.45,tl=o.tool||null,kL=1,kR=1;
    if(mv){L1=.08;R1=-.08;L2=-.1;R2=-.1;kL=.86-.26*sn;kR=.86+.26*sn}else{L1=.07+idl;R1=-.07-idl;L2=.14;R2=-.14}
    if(side&&mv){const A=.8;R1=-sn*A;L1=sn*A;R2=-(.15+.4*Math.max(0,-R1/A));L2=-(.15+.4*Math.max(0,-L1/A));kL=1;kR=1}
    if(o.tool){R1=-.55;R2=-.9;phi=.4;kR=1}
    if(o.torchHand&&!swinging&&!o.tool){R1=-.25;R2=-1.9;phi=.1;tl='torch';kR=1}
    if(swinging){const u=sw,E=sstep,rd=[-.55,-.9,.45],up=[-2.35,-.35,-.35],hit=[-.7,-.15,2.2];let a;
      if(u<.36)a=rd.map((v,i)=>lerp(v,up[i],E(0,.36,u)));else if(u<.5)a=up.map((v,i)=>lerp(v,hit[i],E(.36,.5,u)));else if(u<.6)a=hit;else a=hit.map((v,i)=>lerp(v,rd[i],E(.6,1,u)));
      R1=a[0];R2=a[1];phi=a[2];const w=u<.36?E(0,.36,u):u<.5?1:1-E(.5,1,u);L1=lerp(.1,-.45,w);L2=-.5;kR=1}
    const aL=L1+.5*L2;let aR=R1+.5*R2;
    if(!side&&!swinging&&(o.tool||tl==='torch'))aR=-.5;
    if(!side){
      const f=!back,cx=f?512:508,pre=f?'f_':'b_';
      // gambe: una si alza, poi l'altra
      for(const sd of[-1,1]){const lf=mv?Math.sin(ph+(sd>0?Math.PI:0)):0;g.save();g.translate(lf*.9,-Math.max(0,lf)*3.2);part(g,pre+(sd<0?'legL':'legR'),cx);g.restore()}
      part(g,pre+'up',cx);
      const sL=f?[392,285,345,610]:[398,285,360,600],sR=f?[632,285,668,606]:[622,285,672,600];
      arm(g,pre+'armL',cx,sL[0],sL[1],sL[2],sL[3],aL,kL,null,0);
      arm(g,pre+'armR',cx,sR[0],sR[1],sR[2],sR[3],aR,kR,tl,phi);
    }else{
      const cx=512;
      arm(g,'s_arm',cx,470,285,512,622,aL,1,null,0,true);   // braccio lontano, dietro il corpo
      let lg='s_legs',dx=0;
      if(mv){const u=((ph/6.2832)%1+1)%1;if(u<.25){lg='s_legsA';dx=510-425}else if(u>=.5&&u<.75){lg='s_legsB';dx=510-465}}
      part(g,lg,cx,dx);part(g,'s_up',cx);
      arm(g,'s_arm',cx,470,285,512,622,aR,1,tl,phi);
    }
    g.restore();
  };
};
