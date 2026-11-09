
/* ---- 12c_gfx_nuova.js: grafica nuova (cartoon con contorno) — attivabile dal menu ---- */
var GFXN=false;try{GFXN=localStorage.getItem('sm_gfx')==='new'}catch(e){}
var NGV={t:GFXN?8:6,p:GFXN?5:4};
var GfxNew=(function(){
  let g;const OW=3.2,OC='#16301a';let NOSH=true;const OPT={};
function shadow(x,y,rx,ry,a,col){if(NOSH)return;g.save();g.fillStyle=col||('rgba(20,40,20,'+a+')');if(col)g.globalAlpha=a;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill();g.restore()}
function line(pts,w,col){g.lineCap='round';g.lineJoin='round';g.strokeStyle=OC;g.lineWidth=w+OW*2;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();g.strokeStyle=col;g.lineWidth=w;g.stroke()}
function frond(len,arch,droop,wd,lite){
  const N=12,pt=t=>[len*t,-arch*4*t*(1-t)+droop*t*t];
  const nm=t=>{const a=pt(Math.max(0,t-.01)),b=pt(Math.min(1,t+.01));const dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy);return[-dy/l,dx/l,dx/l,dy/l]};
  const up=[],dn=[];
  for(let i=1;i<=N;i++){
    const t=i/N,p=pt(t),[nx,ny,tx,ty]=nm(t),w=wd*Math.pow(Math.sin(Math.PI*Math.min(.97,t*.88+.08)),.75)*(1-t*.2);
    const sw=len*.034;
    up.push([p[0]-nx*w*.32-tx*sw*.5,p[1]-ny*w*.32-ty*sw*.5],[p[0]-nx*w+tx*sw,p[1]-ny*w+ty*sw]);
    dn.push([p[0]+nx*w*.32-tx*sw*.5,p[1]+ny*w*.32-ty*sw*.5],[p[0]+nx*w+tx*sw,p[1]+ny*w+ty*sw]);
  }
  const sh=()=>{const p0=pt(0);g.moveTo(p0[0],p0[1]);for(const q of up)g.lineTo(q[0],q[1]);const e=pt(1);g.lineTo(e[0]+len*.05,e[1]);for(let i=dn.length-1;i>=0;i--)g.lineTo(dn[i][0],dn[i][1]);g.closePath()};
  path(sh,'#2f8f3a');
  g.save();g.beginPath();sh();g.clip();
  const q=g.createLinearGradient(0,-wd,0,wd);q.addColorStop(0,lite?'#c4f27a':'#9be060');q.addColorStop(.5,'#4eb04a');q.addColorStop(1,'#1f7a34');g.fillStyle=q;g.fillRect(-4,-wd-arch-8,len+14,wd*2+arch+droop+16);
  g.strokeStyle='rgba(16,80,34,.32)';g.lineWidth=1.6;g.lineCap='round';
  for(let i=0;i<up.length;i+=2){const t=(i/2+1)/N,p=pt(t);g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(up[i+1][0]-1,up[i+1][1]);g.moveTo(p[0],p[1]);g.lineTo(dn[i+1][0]-1,dn[i+1][1]);g.stroke()}
  g.restore();
  g.strokeStyle='#e4f9a6';g.lineWidth=2.6;g.lineCap='round';g.beginPath();const p0=pt(0);g.moveTo(p0[0]+3,p0[1]);for(let i=1;i<=N;i++){const p=pt(i/N*.96);g.lineTo(p[0],p[1])}g.stroke();
}
function palm(x,y,s,flip,coco){
  g.save();g.translate(x,y);g.scale((flip?-1:1)*s,s);
  shadow(30,6,70,15,.3);
  const L=164,P=t=>[Math.sin(t*1.2)*54,-t*L],Wd=t=>14-t*5;
  // tronco
  const side=sg=>{const a=[];for(let i=0;i<=16;i++){const t=i/16,p=P(t);a.push([p[0]+sg*Wd(t),p[1]])}return a};
  const L1=side(-1),R1=side(1);
  path(()=>{g.moveTo(L1[0][0]-4,6);for(const p of L1)g.lineTo(p[0],p[1]);for(let i=R1.length-1;i>=0;i--)g.lineTo(R1[i][0],R1[i][1]);g.lineTo(R1[0][0]+5,6);g.closePath()},'#b98252');
  g.save();g.beginPath();g.moveTo(L1[0][0]-4,6);for(const p of L1)g.lineTo(p[0],p[1]);for(let i=R1.length-1;i>=0;i--)g.lineTo(R1[i][0],R1[i][1]);g.lineTo(R1[0][0]+5,6);g.closePath();g.clip();
  for(let i=0;i<R1.length;i++){const t=i/16,p=P(t);g.fillStyle='rgba(50,24,6,.28)';g.fillRect(p[0]+Wd(t)*.15,p[1]-12,Wd(t)*.9,12)}
  g.strokeStyle='rgba(255,224,170,.5)';g.lineWidth=4;g.lineCap='round';g.beginPath();for(let i=1;i<=15;i++){const t=i/16,p=P(t);i===1?g.moveTo(p[0]-Wd(t)*.55,p[1]):g.lineTo(p[0]-Wd(t)*.55,p[1])}g.stroke();
  g.strokeStyle='rgba(80,42,14,.75)';g.lineWidth=2.6;
  for(let i=0;i<=15;i++){const t=(i+.5)/16,p=P(t),w=Wd(t);g.beginPath();g.moveTo(p[0]-w-2,p[1]+3);g.quadraticCurveTo(p[0],p[1]+10,p[0]+w+2,p[1]+3);g.stroke()}
  g.restore();
  const top=P(1),tx=top[0],ty=top[1];
  // fronde dietro
  const back=[[-3.05,96,14,46,15],[-2.55,106,16,40,16],[-2.05,104,16,30,16],[-1.57,96,14,22,15],[-1.08,104,16,30,16],[-.58,106,16,40,16],[-.08,96,14,46,15]];
  for(const[a,len,ar,dr,wd]of back){g.save();g.translate(tx,ty);g.rotate(a);if(Math.cos(a)<0)g.scale(1,-1);frond(len,ar,dr,wd,false);g.restore()}
  // noci di cocco
  // fronde davanti
  const front=[[.75,74,8,36,14],[2.39,74,8,36,14]];
  for(const[a,len,ar,dr,wd]of front){g.save();g.translate(tx,ty+4);g.rotate(a);if(Math.cos(a)<0)g.scale(1,-1);frond(len,ar,dr,wd,true);g.restore()}
  for(const[cx,cy,r]of(coco?[[-13,12,14],[9,13,14.5],[-2,26,14],[-3,2,13],[18,27,12]]:[])){path(()=>{g.arc(tx+cx,ty+cy,r,0,7)},'#8a5226');g.fillStyle='rgba(255,214,160,.55)';g.beginPath();g.arc(tx+cx-3.4,ty+cy-3.6,3.4,0,7);g.fill();g.fillStyle='rgba(40,18,6,.45)';g.beginPath();g.arc(tx+cx+3,ty+cy+4,2,0,7);g.arc(tx+cx-2,ty+cy+5,1.6,0,7);g.fill()}
  g.restore();
}
function stump(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);shadow(2,6,40,10,.3);
  path(()=>{g.moveTo(-28,-32);g.lineTo(-33,0);g.quadraticCurveTo(0,12,33,0);g.lineTo(28,-32);g.closePath()},'#8a5a34');
  g.fillStyle='rgba(40,18,4,.35)';g.beginPath();g.moveTo(8,-30);g.lineTo(28,-32);g.lineTo(33,0);g.quadraticCurveTo(22,6,12,6);g.closePath();g.fill();
  g.strokeStyle='rgba(70,36,12,.6)';g.lineWidth=2;for(const x0 of[-14,-4,6]){g.beginPath();g.moveTo(x0,-24);g.lineTo(x0-2,0);g.stroke()}
  path(()=>{g.ellipse(0,-32,29,12,0,0,7)},'#e2b46e');
  g.strokeStyle='rgba(120,70,24,.6)';g.lineWidth=2;for(const[rx,ry]of[[20,8],[12,5],[5,2.4]]){g.beginPath();g.ellipse(0,-32,rx,ry,0,0,7);g.stroke()}
  g.restore();
}
function logp(x,y,len,r,rot){
  g.save();g.translate(x,y);g.rotate(rot||0);
  path(()=>{g.rect(-len/2,-r,len,r*2)},'#9a6638');
  g.fillStyle='rgba(255,214,160,.32)';g.fillRect(-len/2,-r,len,r*.5);g.fillStyle='rgba(40,18,4,.35)';g.fillRect(-len/2,r*.45,len,r*.55);
  g.strokeStyle='rgba(70,36,12,.5)';g.lineWidth=2;g.beginPath();g.moveTo(-len/2+6,-r*.2);g.lineTo(len/2-18,-r*.2);g.moveTo(-len/2+20,r*.2);g.lineTo(len/2-6,r*.2);g.stroke();
  path(()=>{g.ellipse(len/2,0,r*.55,r,0,0,7)},'#e2b46e');g.strokeStyle='rgba(120,70,24,.6)';g.beginPath();g.ellipse(len/2,0,r*.3,r*.58,0,0,7);g.stroke();
  g.restore();
}
function rock2(x,y,s){   // roccia piccola, tonda
  g.save();g.translate(x,y);g.scale(s,s);shadow(2,5,36,8,.3);
  const sh=()=>{g.moveTo(-30,2);g.quadraticCurveTo(-34,-24,-8,-32);g.quadraticCurveTo(24,-38,32,-10);g.quadraticCurveTo(36,2,24,4);g.closePath()};
  path(sh,'#9aa2ab');g.save();g.beginPath();sh();g.clip();
  g.fillStyle='#cdd4da';g.beginPath();g.moveTo(-34,-10);g.quadraticCurveTo(-20,-38,12,-36);g.quadraticCurveTo(-4,-22,-16,-6);g.closePath();g.fill();
  g.fillStyle='rgba(70,78,90,.45)';g.beginPath();g.ellipse(10,2,34,12,0,0,7);g.fill();
  g.strokeStyle='rgba(40,46,56,.5)';g.lineWidth=2;g.beginPath();g.moveTo(8,-26);g.lineTo(4,-10);g.lineTo(10,2);g.stroke();
  g.restore();g.restore();
}

/* ---- gabbiano, granchio, pappagallo, farfalla, rana, pesce, tartaruga, pipistrello, gufo, lucciole ---- */
function rnd(seed){let a=seed;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function blobs(L,fill){                      // unione di cerchi con un solo contorno esterno
  if(OW){g.strokeStyle=OC;g.lineWidth=OW*2;g.lineJoin='round';for(const b of L){g.beginPath();g.arc(b[0],b[1],b[2],0,7);g.stroke()}}
  g.fillStyle=fill;for(const b of L){g.beginPath();g.arc(b[0],b[1],b[2],0,7);g.fill()}
}
function clipBlobs(L,fn){g.save();g.beginPath();for(const b of L){g.moveTo(b[0]+b[2],b[1]);g.arc(b[0],b[1],b[2],0,7)}g.clip();fn();g.restore()}
function path(fn,fill){g.beginPath();fn();if(OW){g.strokeStyle=OC;g.lineWidth=OW*2;g.lineJoin='round';g.stroke()}g.fillStyle=fill;g.fill()}
function leafDabs(L,seed,n,col,sz){const r=rnd(seed);g.fillStyle=col;for(let i=0;i<n;i++){const b=L[(r()*L.length)|0],a=r()*6.28,d=Math.sqrt(r())*b[2]*.8,x=b[0]+Math.cos(a)*d,y=b[1]+Math.sin(a)*d;g.save();g.translate(x,y);g.rotate(-.6+r()*.5);g.beginPath();g.ellipse(0,0,sz*(.8+r()*.6),sz*.45,0,0,7);g.fill();g.restore()}}
function oak(x,y,s,fruit){
  g.save();g.translate(x,y);g.scale(s,s);
  shadow(6,6,70,17,.3);
  // tronco con radici, corteccia e ombra della chioma
  path(()=>{g.moveTo(-30,4);g.quadraticCurveTo(-16,-4,-14,-34);g.lineTo(-11,-96);g.lineTo(13,-96);g.lineTo(15,-34);g.quadraticCurveTo(18,-4,32,4);g.quadraticCurveTo(12,0,4,6);g.quadraticCurveTo(-8,0,-30,4);g.closePath()},'#8a5a34');
  g.save();g.beginPath();g.moveTo(-30,4);g.quadraticCurveTo(-16,-4,-14,-34);g.lineTo(-11,-96);g.lineTo(13,-96);g.lineTo(15,-34);g.quadraticCurveTo(18,-4,32,4);g.closePath();g.clip();
  const tg=g.createLinearGradient(-16,0,18,0);tg.addColorStop(0,'rgba(255,214,150,.35)');tg.addColorStop(.45,'rgba(0,0,0,0)');tg.addColorStop(1,'rgba(40,18,6,.5)');g.fillStyle=tg;g.fillRect(-34,-100,70,110);
  g.strokeStyle='rgba(60,32,14,.55)';g.lineWidth=2;g.lineCap='round';for(const[a,b,cc,d]of[[-6,-80,-7,-52],[3,-70,2,-40],[-3,-34,-6,-12],[8,-50,9,-26]]){g.beginPath();g.moveTo(a,b);g.quadraticCurveTo(a+3,(b+d)/2,cc,d);g.stroke()}
  g.fillStyle='rgba(30,16,6,.5)';g.fillRect(-34,-100,70,26);
  g.beginPath();g.ellipse(2,-44,4,6,0,0,7);g.fillStyle='#4a2a14';g.fill();
  g.restore();
  // chioma: tre strati di verde
  const B=[[-52,-118,36],[-22,-150,44],[26,-146,46],[58,-112,36],[4,-106,48],[-34,-92,30],[40,-88,30]];
  blobs(B,'#2f7d32');
  clipBlobs(B,()=>{
    const q=g.createRadialGradient(-26,-158,10,0,-116,112);q.addColorStop(0,'#8fdc5a');q.addColorStop(.42,'#4fae3e');q.addColorStop(1,'rgba(47,125,50,0)');g.fillStyle=q;g.fillRect(-110,-210,220,170);
    g.fillStyle='rgba(18,70,40,.42)';g.beginPath();g.ellipse(20,-70,96,30,0,0,7);g.fill();
    // lobi in ombra e in luce
    for(const[bx,by,br]of[[-52,-118,36],[26,-146,46],[58,-112,36],[4,-106,48]]){g.strokeStyle='rgba(20,84,40,.35)';g.lineWidth=5;g.beginPath();g.arc(bx,by,br-5,.5,2.4);g.stroke();g.strokeStyle='rgba(200,255,150,.5)';g.lineWidth=4;g.beginPath();g.arc(bx,by,br-6,3.5,5.2);g.stroke()}
    leafDabs(B,7,60,'rgba(170,236,110,.55)',5);leafDabs(B,19,40,'rgba(24,96,44,.4)',5);
  });
  if(fruit){const r=rnd(5);for(let i=0;i<7;i++){const b=B[(r()*B.length)|0],xx=b[0]+(r()-.5)*b[2],yy=b[1]+(r()-.3)*b[2]*.8;g.fillStyle='#d8322a';g.beginPath();g.arc(xx,yy,5,0,7);g.fill();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.arc(xx-1.6,yy-1.8,1.6,0,7);g.fill()}}
  g.restore();
}
/* ---- pino ---- */
function pine(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  shadow(4,6,54,14,.3);
  path(()=>{g.moveTo(-12,4);g.lineTo(-7,-40);g.lineTo(8,-40);g.lineTo(13,4);g.closePath()},'#7a4c2a');
  g.fillStyle='rgba(30,14,4,.4)';g.fillRect(2,-40,10,44);
  const T=[[0,-36,74,58],[0,-78,60,54],[0,-116,46,50],[0,-150,32,46]];
  for(let i=0;i<T.length;i++){const[tx,ty,w,h]=T[i];
    const sh=()=>{g.moveTo(tx,ty-h);g.quadraticCurveTo(tx+w*.34,ty-h*.5,tx+w,ty);g.quadraticCurveTo(tx+w*.72,ty+3,tx+w*.6,ty-8);g.quadraticCurveTo(tx+w*.42,ty+8,tx+w*.24,ty-4);g.quadraticCurveTo(tx,ty+10,tx-w*.24,ty-4);g.quadraticCurveTo(tx-w*.42,ty+8,tx-w*.6,ty-8);g.quadraticCurveTo(tx-w*.72,ty+3,tx-w,ty);g.quadraticCurveTo(tx-w*.34,ty-h*.5,tx,ty-h);g.closePath()};
    path(sh,'#1f6a4c');
    g.save();g.beginPath();sh();g.clip();
    const q=g.createLinearGradient(tx-w,0,tx+w,0);q.addColorStop(0,'#5fc48a');q.addColorStop(.45,'#2f8a5e');q.addColorStop(1,'#124a36');g.fillStyle=q;g.fillRect(tx-w,ty-h,w*2,h+12);
    g.fillStyle='rgba(8,40,30,.35)';g.beginPath();g.ellipse(tx,ty-h+6,w*.9,10,0,0,7);if(i<3)g.fill();
    g.strokeStyle='rgba(190,255,200,.45)';g.lineWidth=3;g.lineCap='round';for(let k=0;k<4;k++){g.beginPath();g.moveTo(tx-w*.15-k*w*.16,ty-h*.62+k*h*.14);g.lineTo(tx-w*.3-k*w*.16,ty-h*.4+k*h*.14);g.stroke()}
    g.restore()}
  g.restore();
}
/* ---- cespuglio di bacche ---- */
function bush(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  shadow(2,6,52,12,.3);
  const B=[[-30,-18,24],[-6,-34,28],[24,-24,26],[36,-6,18],[0,-10,26],[-36,-2,16]];
  blobs(B,'#2c7a36');
  clipBlobs(B,()=>{const q=g.createRadialGradient(-14,-44,6,0,-14,62);q.addColorStop(0,'#96e06a');q.addColorStop(.5,'#48a843');q.addColorStop(1,'rgba(44,122,54,0)');g.fillStyle=q;g.fillRect(-60,-70,120,80);
    g.fillStyle='rgba(14,64,36,.4)';g.beginPath();g.ellipse(6,6,60,14,0,0,7);g.fill();leafDabs(B,3,34,'rgba(180,240,120,.6)',4.5);leafDabs(B,11,22,'rgba(20,90,44,.4)',4.5)});
  const r=rnd(9);for(let i=0;i<(OPT.berries?11:0);i++){const b=B[(r()*4)|0],xx=b[0]+(r()-.5)*b[2]*1.2,yy=b[1]+(r()-.5)*b[2]*.9;path(()=>{g.arc(xx,yy,5.4,0,7)},'#c2264a');g.fillStyle='rgba(255,255,255,.75)';g.beginPath();g.arc(xx-1.8,yy-2,1.7,0,7);g.fill()}
  if(OPT.flowers){const r2=rnd(21);for(let i=0;i<9;i++){const b=B[(r2()*5)|0],xx=b[0]+(r2()-.5)*b[2]*1.3,yy=b[1]+(r2()-.4)*b[2]*.9;for(let k=0;k<5;k++){const a=k/5*6.283;g.fillStyle=OPT.fc||'#fff';g.beginPath();g.arc(xx+Math.cos(a)*2.6,yy+Math.sin(a)*2.6,1.9,0,7);g.fill()}g.fillStyle='#ffd23a';g.beginPath();g.arc(xx,yy,1.7,0,7);g.fill()}}
  g.restore();
}
/* ---- roccia con muschio ---- */
function rock(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  shadow(4,6,56,12,.3);
  const sh=()=>{g.moveTo(-48,2);g.lineTo(-42,-26);g.lineTo(-20,-50);g.lineTo(12,-56);g.lineTo(38,-36);g.lineTo(50,-8);g.lineTo(44,4);g.closePath()};
  path(sh,'#8f97a0');
  g.save();g.beginPath();sh();g.clip();
  g.fillStyle='#c9d0d6';g.beginPath();g.moveTo(-42,-26);g.lineTo(-20,-50);g.lineTo(12,-56);g.lineTo(2,-30);g.lineTo(-24,-18);g.closePath();g.fill();
  g.fillStyle='#a9b1ba';g.beginPath();g.moveTo(-48,2);g.lineTo(-42,-26);g.lineTo(-24,-18);g.lineTo(-14,4);g.closePath();g.fill();
  g.fillStyle='#6c7480';g.beginPath();g.moveTo(12,-56);g.lineTo(38,-36);g.lineTo(50,-8);g.lineTo(44,4);g.lineTo(16,4);g.lineTo(2,-30);g.closePath();g.fill();
  g.strokeStyle='rgba(40,46,56,.55)';g.lineWidth=2;g.lineCap='round';g.beginPath();g.moveTo(2,-30);g.lineTo(8,-12);g.lineTo(2,2);g.moveTo(-24,-18);g.lineTo(-30,-4);g.stroke();
  g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2.4;g.beginPath();g.moveTo(-38,-26);g.lineTo(-19,-46);g.lineTo(8,-52);g.stroke();
  // muschio
  g.fillStyle='#5aa843';g.beginPath();g.moveTo(-22,-50);g.quadraticCurveTo(-6,-60,14,-56);g.quadraticCurveTo(18,-44,6,-46);g.quadraticCurveTo(0,-36,-8,-44);g.quadraticCurveTo(-16,-36,-22,-50);g.fill();
  g.fillStyle='rgba(190,240,130,.7)';for(const[a,b]of[[-12,-52],[-2,-54],[8,-52],[-6,-46]]){g.beginPath();g.arc(a,b,2.2,0,7);g.fill()}
  g.restore();
  // sassolini e ciuffi alla base
  path(()=>{g.ellipse(-56,2,9,6,0,0,7)},'#a9b1ba');path(()=>{g.ellipse(54,4,7,5,0,0,7)},'#8f97a0');
  g.strokeStyle='#3f9a3c';g.lineWidth=2.6;g.lineCap='round';for(const[a,d]of[[-44,-1],[-40,0],[-36,1],[40,-1],[46,1]]){g.beginPath();g.moveTo(a,6);g.quadraticCurveTo(a+d*3,-4,a+d*6,-12);g.stroke()}
  g.restore();
}
/* ---- forziere ---- */
function chest(x,y,s,open){
  g.save();g.translate(x,y);g.scale(s,s);
  shadow(2,6,48,11,.32);
  if(open){g.save();g.globalCompositeOperation='lighter';const q=g.createRadialGradient(0,-40,4,0,-40,70);q.addColorStop(0,'rgba(255,224,120,.75)');q.addColorStop(1,'rgba(255,224,120,0)');g.fillStyle=q;g.fillRect(-80,-120,160,130);g.restore()}
  // cassa
  path(()=>{g.rect(-40,-34,80,38)},'#a8672e');
  g.fillStyle='rgba(255,210,150,.28)';g.fillRect(-40,-34,80,8);g.fillStyle='rgba(40,18,4,.35)';g.fillRect(-40,-6,80,10);
  g.strokeStyle='rgba(70,36,12,.6)';g.lineWidth=1.6;for(const xx of[-20,0,20]){g.beginPath();g.moveTo(xx,-34);g.lineTo(xx,4);g.stroke()}
  // coperchio
  if(open){
    path(()=>{g.moveTo(-40,-34);g.lineTo(-36,-78);g.quadraticCurveTo(0,-92,36,-78);g.lineTo(40,-34);g.closePath()},'#6e3f18');
    g.fillStyle='#3a1f0a';g.beginPath();g.ellipse(0,-34,38,9,0,0,7);g.fill();
    const r=rnd(4);for(let i=0;i<16;i++){const xx=-28+r()*56,yy=-36-r()*10;path(()=>{g.ellipse(xx,yy,6,3.6,0,0,7)},'#ffd23a');g.fillStyle='rgba(255,255,255,.7)';g.fillRect(xx-3,yy-2,3,1.4)}
    path(()=>{g.moveTo(8,-50);g.lineTo(14,-40);g.lineTo(8,-32);g.lineTo(2,-40);g.closePath()},'#e2445a');
  }else{
    path(()=>{g.moveTo(-42,-34);g.quadraticCurveTo(-42,-66,0,-66);g.quadraticCurveTo(42,-66,42,-34);g.closePath()},'#b9742f');
    g.save();g.beginPath();g.moveTo(-42,-34);g.quadraticCurveTo(-42,-66,0,-66);g.quadraticCurveTo(42,-66,42,-34);g.closePath();g.clip();
    const q=g.createLinearGradient(0,-66,0,-34);q.addColorStop(0,'rgba(255,220,160,.55)');q.addColorStop(.5,'rgba(0,0,0,0)');q.addColorStop(1,'rgba(40,18,4,.35)');g.fillStyle=q;g.fillRect(-44,-68,88,36);
    g.strokeStyle='rgba(70,36,12,.55)';g.lineWidth=1.6;for(const xx of[-20,0,20]){g.beginPath();g.moveTo(xx,-66);g.lineTo(xx,-34);g.stroke()}g.restore();
  }
  // ferramenta
  for(const xx of[-30,24]){path(()=>{g.rect(xx,open?-34:-66,7,open?38:70)},'#d8b04a');g.fillStyle='#7a5a14';for(const yy of(open?[-26,-10]:[-56,-40,-22,-8])){g.beginPath();g.arc(xx+3.5,yy,1.6,0,7);g.fill()}}
  path(()=>{g.rect(-44,-37,88,6)},'#d8b04a');
  if(!open){path(()=>{g.moveTo(-8,-38);g.lineTo(8,-38);g.lineTo(8,-24);g.quadraticCurveTo(0,-16,-8,-24);g.closePath()},'#f0cc5a');g.fillStyle='#3a2408';g.beginPath();g.arc(0,-30,2.4,0,7);g.fill();g.fillRect(-1,-30,2,6)}
  g.restore();
}
/* ---- barile e cassa ---- */
function barrel(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);shadow(2,6,34,9,.3);
  const sh=()=>{g.moveTo(-24,-56);g.quadraticCurveTo(-34,-28,-24,0);g.quadraticCurveTo(0,8,24,0);g.quadraticCurveTo(34,-28,24,-56);g.quadraticCurveTo(0,-64,-24,-56);g.closePath()};
  path(sh,'#a56a34');g.save();g.beginPath();sh();g.clip();
  const q=g.createLinearGradient(-30,0,30,0);q.addColorStop(0,'rgba(255,214,150,.4)');q.addColorStop(.4,'rgba(0,0,0,0)');q.addColorStop(1,'rgba(40,18,4,.5)');g.fillStyle=q;g.fillRect(-36,-66,72,76);
  g.strokeStyle='rgba(70,36,12,.55)';g.lineWidth=1.6;for(const xx of[-14,-4,6,16]){g.beginPath();g.moveTo(xx,-62);g.quadraticCurveTo(xx*1.35,-28,xx,6);g.stroke()}
  for(const yy of[-44,-12]){g.fillStyle='#6c7480';g.beginPath();g.moveTo(-34,yy-4);g.quadraticCurveTo(0,yy+5,34,yy-4);g.lineTo(34,yy+3);g.quadraticCurveTo(0,yy+12,-34,yy+3);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,.45)';g.fillRect(-22,yy,10,2)}
  g.restore();
  path(()=>{g.ellipse(0,-56,24,7,0,0,7)},'#c98a4a');g.strokeStyle='rgba(70,36,12,.5)';g.lineWidth=1.4;g.beginPath();g.moveTo(-18,-56);g.lineTo(18,-56);g.moveTo(-8,-61);g.lineTo(-8,-51);g.moveTo(8,-61);g.lineTo(8,-51);g.stroke();
  g.restore();
}
function crate(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);shadow(2,6,38,9,.3);
  path(()=>{g.rect(-30,-52,60,56)},'#b5803f');
  g.fillStyle='rgba(255,220,160,.3)';g.fillRect(-30,-52,60,7);g.fillStyle='rgba(40,18,4,.3)';g.fillRect(-30,-4,60,8);
  g.fillStyle='#8a5a26';g.fillRect(-30,-52,8,56);g.fillRect(22,-52,8,56);g.fillRect(-30,-52,60,8);g.fillRect(-30,-4,60,8);
  g.save();g.beginPath();g.rect(-22,-44,44,40);g.clip();g.strokeStyle='#8a5a26';g.lineWidth=8;g.beginPath();g.moveTo(-22,-44);g.lineTo(22,-4);g.moveTo(22,-44);g.lineTo(-22,-4);g.stroke();g.restore();
  g.fillStyle='#4a2c10';for(const[a,b]of[[-26,-48],[26,-48],[-26,0],[26,0]]){g.beginPath();g.arc(a,b,1.8,0,7);g.fill()}
  g.restore();
}

function oakA(x,y,s,fruit){
  g.save();g.translate(x,y);g.scale(s,s);
  shadow(6,6,70,17,.3);
  // tronco con radici, corteccia e ombra della chioma
  path(()=>{g.moveTo(-30,4);g.quadraticCurveTo(-16,-4,-14,-34);g.lineTo(-11,-96);g.lineTo(13,-96);g.lineTo(15,-34);g.quadraticCurveTo(18,-4,32,4);g.quadraticCurveTo(12,0,4,6);g.quadraticCurveTo(-8,0,-30,4);g.closePath()},'#8a5a34');
  g.save();g.beginPath();g.moveTo(-30,4);g.quadraticCurveTo(-16,-4,-14,-34);g.lineTo(-11,-96);g.lineTo(13,-96);g.lineTo(15,-34);g.quadraticCurveTo(18,-4,32,4);g.closePath();g.clip();
  const tg=g.createLinearGradient(-16,0,18,0);tg.addColorStop(0,'rgba(255,214,150,.35)');tg.addColorStop(.45,'rgba(0,0,0,0)');tg.addColorStop(1,'rgba(40,18,6,.5)');g.fillStyle=tg;g.fillRect(-34,-100,70,110);
  g.strokeStyle='rgba(60,32,14,.55)';g.lineWidth=2;g.lineCap='round';for(const[a,b,cc,d]of[[-6,-80,-7,-52],[3,-70,2,-40],[-3,-34,-6,-12],[8,-50,9,-26]]){g.beginPath();g.moveTo(a,b);g.quadraticCurveTo(a+3,(b+d)/2,cc,d);g.stroke()}
  g.fillStyle='rgba(30,16,6,.5)';g.fillRect(-34,-100,70,26);
  g.beginPath();g.ellipse(2,-44,4,6,0,0,7);g.fillStyle='#4a2a14';g.fill();
  g.restore();
  // chioma: tre strati di verde
  const B=[[-52,-118,36],[-22,-150,44],[26,-146,46],[58,-112,36],[4,-106,48],[-34,-92,30],[40,-88,30]];
  blobs(B,'#b8541a');
  clipBlobs(B,()=>{
    const q=g.createRadialGradient(-26,-158,10,0,-116,112);q.addColorStop(0,'#f7d658');q.addColorStop(.42,'#e0842a');q.addColorStop(1,'rgba(184,84,26,0)');g.fillStyle=q;g.fillRect(-110,-210,220,170);
    g.fillStyle='rgba(90,30,10,.42)';g.beginPath();g.ellipse(20,-70,96,30,0,0,7);g.fill();
    // lobi in ombra e in luce
    for(const[bx,by,br]of[[-52,-118,36],[26,-146,46],[58,-112,36],[4,-106,48]]){g.strokeStyle='rgba(110,40,10,.35)';g.lineWidth=5;g.beginPath();g.arc(bx,by,br-5,.5,2.4);g.stroke();g.strokeStyle='rgba(255,240,170,.5)';g.lineWidth=4;g.beginPath();g.arc(bx,by,br-6,3.5,5.2);g.stroke()}
    leafDabs(B,7,60,'rgba(255,226,120,.55)',5);leafDabs(B,19,40,'rgba(120,40,10,.4)',5);
  });
  if(fruit){const r=rnd(5);for(let i=0;i<7;i++){const b=B[(r()*B.length)|0],xx=b[0]+(r()-.5)*b[2],yy=b[1]+(r()-.3)*b[2]*.8;g.fillStyle='#d8322a';g.beginPath();g.arc(xx,yy,5,0,7);g.fill();g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.arc(xx-1.6,yy-1.8,1.6,0,7);g.fill()}}
  g.restore();
}

  function B(W,H,ax,ay,fn){return sp(W,H,gg=>{g=gg;g.lineJoin='round';fn()},ax,ay)}
  function tint(s,f,flip){return sp(s.w,s.h,gg=>{if(flip){gg.translate(s.w,0);gg.scale(-1,1)}gg.filter=f;gg.drawImage(s.c,0,0,s.w,s.h)},flip?s.w-s.ax:s.ax,s.ay)}
  function sparkle(seed,cx,cy,w,h){const r=rnd(seed);for(let k=0;k<8;k++){g.fillStyle=['#fff8c8','#ffd36b','#ffffff'][k%3];g.beginPath();g.arc(cx+(r()-.5)*w,cy+(r()-.5)*h,1.3+r()*1.4,0,7);g.fill()}}
  const R=Math.round;
  function nature(){
    const so=.6,oW=R(200*so),oH=R(212*so)+10;
    const oakS=(f,a)=>B(oW,oH,oW/2,oH-6,()=>{(a?oakA:oak)(oW/2,oH-6,so,f)});
    const o0=oakS(false),o3=oakS(true),oa=oakS(false,true);
    SP.tree=[o0,tint(o0,'hue-rotate(12deg) saturate(1.1)'),tint(o0,'hue-rotate(-8deg) saturate(1.1) brightness(.95)'),o3,tint(o3,'hue-rotate(12deg)'),oa,tint(o0,'brightness(1.1) saturate(.9)'),tint(oa,'hue-rotate(-22deg)')];
    const sp_=.7,pW=R(170*sp_)+8,pH=R(205*sp_)+10;
    const pn=B(pW,pH,pW/2,pH-6,()=>pine(pW/2,pH-6,sp_));
    SP.pine=[pn,tint(pn,'hue-rotate(18deg)'),tint(pn,'hue-rotate(-22deg) brightness(.95)'),tint(pn,'hue-rotate(40deg) saturate(.9)'),tint(pn,'hue-rotate(-45deg) saturate(1.2)')];
    const sm=.62,mW=R(260*sm)+10,mH=R(290*sm)+10,mx=R(68*sm)+5;
    const pm=(c)=>B(mW,mH,mx,mH-8,()=>palm(mx,mH-8,sm,false,c));
    const p1=pm(true),p0=pm(false);
    SP.palm=[p1,tint(p1,'hue-rotate(10deg)'),tint(p1,'hue-rotate(-10deg) brightness(1.04)')];
    SP.palm0=[p0,tint(p0,'hue-rotate(10deg)'),tint(p0,'hue-rotate(-10deg) brightness(1.04)')];
    const kr=.7,rW=R(128*kr)+8,rH=R(70*kr)+14,k2=.78,r2W=R(84*k2)+8,r2H=R(50*k2)+14;
    const rk=()=>{rock(rW*.52,rH-8,kr)},rb=()=>{rock2(r2W/2,r2H-8,k2)};
    const spk=(fn,w,h,ax,ay,seed)=>B(w,h,ax,ay,()=>{fn();sparkle(seed,ax,ay-22,34,26)});
    SP.boulder=[B(rW,rH,rW*.52,rH-8,rk),B(r2W,r2H,r2W/2,r2H-8,rb),spk(rk,rW,rH,rW*.52,rH-8,3),spk(rb,r2W,r2H,r2W/2,r2H-8,5),tint(spk(rk,rW,rH,rW*.52,rH-8,7),'hue-rotate(20deg)',true)];
    const kb=.6,bW=R(120*kb)+8,bH=R(76*kb)+12;
    const bs=(b,fl)=>B(bW,bH,bW/2,bH-8,()=>{OPT.berries=b;OPT.flowers=!b&&fl;OPT.fc=fl==2?'#ffb6cf':'#fff';bush(bW/2,bH-8,kb)});
    SP.bush=[bs(false,1),bs(false,2),tint(bs(false,1),'hue-rotate(12deg)')];
    SP.bush0=tint(bs(false,0),'saturate(.55) brightness(.92)');
    SP.berry=[bs(true),tint(bs(true),'hue-rotate(10deg)'),tint(bs(true),'hue-rotate(-10deg)')];SP.berry0=SP.bush0;
    const ks=.5,tW=R(76*ks)+8,tH=R(58*ks)+12;
    SP.stump=B(tW,tH,tW/2,tH-8,()=>stump(tW/2,tH-8,ks));
  }
  function props(){
    const kc=.66,cW=R(100*kc)+8,cH=R(106*kc)+12;
    const ch=(o)=>B(cW,cH,cW/2,cH-8,()=>chest(cW/2,cH-8,kc,o));
    const c0=[ch(false),ch(true)];
    SP.chest=[c0,[tint(c0[0],'hue-rotate(-12deg) saturate(.9)'),tint(c0[1],'hue-rotate(-12deg) saturate(.9)')],[tint(c0[0],'hue-rotate(180deg)'),tint(c0[1],'hue-rotate(180deg)')],[tint(c0[0],'hue-rotate(95deg) saturate(1.1)'),tint(c0[1],'hue-rotate(95deg) saturate(1.1)')]];
    const kk=.58,wW=R(80*kk)+8,wH=R(76*kk)+12;
    const br=B(wW,wH,wW/2,wH-8,()=>barrel(wW/2,wH-8,kk));
    SP.barrel=[br,tint(br,'hue-rotate(-14deg) brightness(.92)')];
    SP.crate=B(wW,wH,wW/2,wH-8,()=>crate(wW/2,wH-8,kk));
    SP.crateO=B(wW,wH,wW/2,wH-8,()=>{crate(wW/2,wH-8,kk);g.save();g.translate(wW/2,wH-8);g.scale(kk,kk);g.fillStyle='#2e1a0a';g.beginPath();g.moveTo(-26,-50);g.lineTo(26,-50);g.lineTo(22,-38);g.lineTo(-22,-38);g.closePath();g.fill();g.fillStyle='#d8b04a';g.beginPath();g.arc(-8,-44,3,0,7);g.arc(6,-45,3.4,0,7);g.fill();g.restore()});
  }
  return{nature,props,on:()=>GFXN};
})();
function gfxSwitch(){try{localStorage.setItem('sm_gfx',GFXN?'old':'new')}catch(e){}try{saveGame(true)}catch(e){}location.reload()}
