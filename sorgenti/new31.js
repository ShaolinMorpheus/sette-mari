
/* ---- 12c_gfx_prova.js: «grafica di prova» (attivabile dal menu; la grafica originale resta intatta) ---- */
var GFXN=false;try{GFXN=localStorage.getItem('sm_gfx')==='new'}catch(e){}
var NGV={t:GFXN?8:6,p:GFXN?5:4};
var GfxNew=(function(){
  let g;const OW=0,OC='#16301a';let NOSH=false;
function shadow(x,y,rx,ry,a,col){if(NOSH)return;g.save();g.fillStyle=col||('rgba(20,40,20,'+a+')');if(col)g.globalAlpha=a;g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.fill();g.restore()}
function line(pts,w,col){g.lineCap='round';g.lineJoin='round';g.strokeStyle=OC;g.lineWidth=w+OW*2;g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();g.strokeStyle=col;g.lineWidth=w;g.stroke()}
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
function gull(x,y,s,rot,fl){
  fl=fl||0;g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
  for(const sg of[-1,1]){g.save();g.scale(1,sg);
    path(()=>{g.moveTo(10,-3);g.quadraticCurveTo(-2,-32-fl,-32,-66-fl);g.lineTo(-46,-46-fl*.6);g.quadraticCurveTo(-36,-26,-28,-4);g.closePath()},'#f4f7fa');
    g.fillStyle='rgba(120,150,184,.5)';g.beginPath();g.moveTo(-2,-8);g.quadraticCurveTo(-14,-32,-30,-52-fl);g.lineTo(-24,-18);g.closePath();g.fill();
    g.fillStyle='#2c3a48';g.beginPath();g.moveTo(-24,-52-fl);g.lineTo(-32,-66-fl);g.lineTo(-46,-46-fl*.6);g.lineTo(-38,-44-fl*.6);g.closePath();g.fill();
    g.restore()}
  path(()=>{g.moveTo(-22,-7);g.lineTo(-48,-10);g.lineTo(-50,0);g.lineTo(-48,10);g.lineTo(-22,7);g.closePath()},'#e6edf2');
  path(()=>{g.ellipse(0,0,29,11.5,0,0,7)},'#fff');
  path(()=>{g.arc(27,0,9.5,0,7)},'#fff');
  path(()=>{g.moveTo(34,-3.4);g.lineTo(48,1);g.lineTo(34,4.4);g.closePath()},'#f5a623');
  g.fillStyle='#1b1b1b';g.beginPath();g.arc(29,-4.6,1.9,0,7);g.arc(29,4.6,1.9,0,7);g.fill();
  g.restore();
}
function crab(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);shadow(0,10,52,13,.25);
  for(const sg of[-1,1])for(let i=0;i<3;i++){const a=-6+i*13;line([[sg*20,a],[sg*40,a-9],[sg*54,a+8+i*3]],6,'#e24a32')}
  for(const sg of[-1,1]){line([[sg*18,-14],[sg*34,-30]],8,'#e24a32');
    path(()=>{g.ellipse(sg*40,-42,16,14,0,0,7)},'#ee5a3c');
    g.fillStyle=OC;g.beginPath();g.moveTo(sg*40,-58);g.lineTo(sg*34,-46);g.lineTo(sg*47,-46);g.closePath();g.fill();
    g.fillStyle='rgba(255,190,150,.6)';g.beginPath();g.ellipse(sg*36,-47,5,3,0,0,7);g.fill()}
  path(()=>{g.ellipse(0,0,33,23,0,0,7)},'#e8452c');
  g.fillStyle='rgba(255,170,130,.55)';g.beginPath();g.ellipse(-7,-9,17,7,-.3,0,7);g.fill();
  g.fillStyle='rgba(120,20,10,.3)';g.beginPath();g.ellipse(4,11,25,8,0,0,7);g.fill();
  for(const sg of[-1,1]){line([[sg*8,-18],[sg*10,-28]],4,'#e8452c');path(()=>{g.arc(sg*10,-32,6.4,0,7)},'#fff');g.fillStyle=OC;g.beginPath();g.arc(sg*10,-33,2.8,0,7);g.fill()}
  g.restore();
}
function parrot(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  line([[-76,54],[76,46]],13,'#8a5a34');
  path(()=>{g.moveTo(-14,10);g.quadraticCurveTo(-44,40,-60,76);g.lineTo(-40,72);g.lineTo(-30,62);g.lineTo(-6,26);g.closePath()},'#2f6fd0');
  path(()=>{g.moveTo(-8,14);g.quadraticCurveTo(-30,44,-40,68);g.lineTo(-22,66);g.lineTo(2,26);g.closePath()},'#d8322a');
  path(()=>{g.ellipse(0,-6,27,39,.2,0,7)},'#e5352b');
  g.fillStyle='rgba(255,170,140,.5)';g.beginPath();g.ellipse(8,-4,10,22,.2,0,7);g.fill();
  path(()=>{g.moveTo(-6,-30);g.quadraticCurveTo(-30,-8,-20,32);g.quadraticCurveTo(2,22,8,-12);g.closePath()},'#f2c230');
  g.fillStyle='#2f9a4a';g.beginPath();g.moveTo(-16,2);g.quadraticCurveTo(-20,20,-15,30);g.lineTo(-6,24);g.quadraticCurveTo(-8,10,-8,0);g.fill();
  g.fillStyle='#2f6fd0';g.beginPath();g.moveTo(-20,14);g.quadraticCurveTo(-22,28,-17,34);g.lineTo(-10,28);g.fill();
  path(()=>{g.arc(10,-50,21,0,7)},'#e5352b');
  g.fillStyle='#fff';g.beginPath();g.ellipse(19,-52,11,10,0,0,7);g.fill();
  g.fillStyle=OC;g.beginPath();g.arc(21,-54,4,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(22.2,-55.4,1.4,0,7);g.fill();
  path(()=>{g.moveTo(24,-62);g.quadraticCurveTo(50,-64,46,-38);g.quadraticCurveTo(40,-48,30,-46);g.closePath()},'#f1e3c4');
  g.strokeStyle=OC;g.lineWidth=2;g.beginPath();g.moveTo(31,-46);g.lineTo(44,-44);g.stroke();
  line([[-2,34],[-2,48]],6,'#8a6a40');line([[12,34],[12,46]],6,'#8a6a40');
  g.restore();
}
function butterfly(x,y,s,rot){
  g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);shadow(8,60,26,6,.18);
  for(const sg of[-1,1]){
    path(()=>{g.moveTo(0,-4);g.quadraticCurveTo(sg*46,-82,sg*66,-30);g.quadraticCurveTo(sg*54,-4,0,0);g.closePath()},'#ff9a2a');
    path(()=>{g.moveTo(0,0);g.quadraticCurveTo(sg*56,2,sg*46,38);g.quadraticCurveTo(sg*18,44,0,6);g.closePath()},'#ffc247');
    g.fillStyle='rgba(255,255,255,.85)';for(const[a,b,r]of[[44,-34,5],[34,-50,4],[34,22,4.4]]){g.beginPath();g.arc(sg*a,b,r,0,7);g.fill()}
    g.fillStyle='rgba(120,50,10,.5)';g.beginPath();g.ellipse(sg*18,-14,12,6,sg*.6,0,7);g.fill()}
  line([[0,-26],[-12,-44]],2.4,'#3a2418');line([[0,-26],[12,-44]],2.4,'#3a2418');
  path(()=>{g.ellipse(0,-2,5,24,0,0,7)},'#4a2e1e');
  g.restore();
}
function frog(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);shadow(4,30,56,11,.25);
  path(()=>{g.ellipse(-26,10,24,17,-.5,0,7)},'#4fae3a');path(()=>{g.ellipse(-44,28,22,8,0,0,7)},'#5fbf45');
  path(()=>{g.ellipse(0,6,40,28,0,0,7)},'#5fbf45');
  g.fillStyle='#c5ec8a';g.beginPath();g.ellipse(8,16,26,14,0,0,7);g.fill();
  g.fillStyle='rgba(30,100,40,.5)';for(const[a,b,r]of[[-18,-8,5],[-4,-14,4],[-26,6,3.6]]){g.beginPath();g.arc(a,b,r,0,7);g.fill()}
  path(()=>{g.ellipse(30,-4,26,20,.1,0,7)},'#68c84c');
  path(()=>{g.ellipse(40,24,13,7,0,0,7)},'#5fbf45');
  for(const[ex,ey]of[[22,-24],[40,-22]]){path(()=>{g.arc(ex,ey,10,0,7)},'#68c84c');g.fillStyle='#fff';g.beginPath();g.arc(ex+1,ey,6.4,0,7);g.fill();g.fillStyle=OC;g.beginPath();g.arc(ex+2.4,ey,3.4,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(ex+3.4,ey-1.4,1.2,0,7);g.fill()}
  g.strokeStyle=OC;g.lineWidth=2.4;g.lineCap='round';g.beginPath();g.moveTo(16,-2);g.quadraticCurveTo(36,6,52,-4);g.stroke();
  g.fillStyle='rgba(240,120,120,.6)';g.beginPath();g.arc(30,4,4,0,7);g.fill();
  g.restore();
}
function fish(x,y,s,c1,c2){
  g.save();g.translate(x,y);g.scale(s,s);
  path(()=>{g.moveTo(-30,0);g.lineTo(-62,-24);g.quadraticCurveTo(-52,0,-62,24);g.closePath()},c2);
  path(()=>{g.moveTo(-14,-18);g.quadraticCurveTo(0,-44,24,-18);g.closePath()},c2);
  path(()=>{g.ellipse(0,0,40,24,0,0,7)},c1);
  g.save();g.beginPath();g.ellipse(0,0,40,24,0,0,7);g.clip();
  g.fillStyle='#fff';g.fillRect(-18,-30,8,60);g.fillRect(2,-30,8,60);
  const q=g.createLinearGradient(0,-24,0,24);q.addColorStop(0,'rgba(255,255,255,.4)');q.addColorStop(.5,'rgba(0,0,0,0)');q.addColorStop(1,'rgba(60,20,0,.3)');g.fillStyle=q;g.fillRect(-42,-26,84,52);
  g.restore();g.strokeStyle=OC;g.lineWidth=3;g.beginPath();g.ellipse(0,0,40,24,0,0,7);g.stroke();
  g.strokeStyle=OC;g.lineWidth=2;for(const xx of[-18,2]){g.beginPath();g.moveTo(xx,-23);g.lineTo(xx,23);g.moveTo(xx+8,-23);g.lineTo(xx+8,23);g.stroke()}
  path(()=>{g.arc(24,-5,7.4,0,7)},'#fff');g.fillStyle=OC;g.beginPath();g.arc(26,-5,3.8,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(27,-6.4,1.3,0,7);g.fill();
  g.strokeStyle=OC;g.lineWidth=2.2;g.beginPath();g.moveTo(40,4);g.quadraticCurveTo(34,9,30,6);g.stroke();
  path(()=>{g.moveTo(6,8);g.quadraticCurveTo(-8,22,-16,16);g.quadraticCurveTo(-6,10,2,4);g.closePath()},c2);
  g.restore();
}
function turtle(x,y,s,rot){
  g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
  for(const[a,b,r,w]of[[22,-34,-.7,1],[22,34,.7,1],[-24,-32,-2.4,.8],[-24,32,2.4,.8]]){g.save();g.translate(a,b);g.rotate(r);path(()=>{g.ellipse(14*w,0,26*w,9,0,0,7)},'#74c45a');g.restore()}
  path(()=>{g.moveTo(-40,0);g.lineTo(-54,-5);g.lineTo(-54,5);g.closePath()},'#74c45a');
  path(()=>{g.ellipse(48,0,17,14,0,0,7)},'#74c45a');g.fillStyle=OC;g.beginPath();g.arc(54,-6,2.6,0,7);g.arc(54,6,2.6,0,7);g.fill();
  path(()=>{g.ellipse(0,0,42,36,0,0,7)},'#5a8f3e');
  g.save();g.beginPath();g.ellipse(0,0,42,36,0,0,7);g.clip();
  const q=g.createRadialGradient(-14,-14,4,0,0,50);q.addColorStop(0,'#a4d46a');q.addColorStop(.6,'#5a8f3e');q.addColorStop(1,'#35602a');g.fillStyle=q;g.fillRect(-46,-40,92,80);
  g.strokeStyle='#2a4a22';g.lineWidth=3;g.lineJoin='round';g.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3+.52;g.lineTo(Math.cos(a)*16,Math.sin(a)*14)}g.closePath();g.stroke();
  for(let i=0;i<6;i++){const a=i*Math.PI/3+.52;g.beginPath();g.moveTo(Math.cos(a)*16,Math.sin(a)*14);g.lineTo(Math.cos(a)*48,Math.sin(a)*44);g.stroke()}
  g.restore();
  g.restore();
}
function bat(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  for(const sg of[-1,1]){path(()=>{g.moveTo(sg*6,-6);g.quadraticCurveTo(sg*34,-52,sg*86,-30);g.quadraticCurveTo(sg*76,-14,sg*70,-10);g.quadraticCurveTo(sg*60,6,sg*54,0);g.quadraticCurveTo(sg*42,12,sg*34,4);g.quadraticCurveTo(sg*22,16,sg*8,10);g.closePath()},'#6a4f96');
    g.strokeStyle='rgba(30,16,56,.6)';g.lineWidth=2.4;g.beginPath();g.moveTo(sg*8,-4);g.lineTo(sg*82,-28);g.moveTo(sg*8,-2);g.lineTo(sg*68,-8);g.moveTo(sg*8,0);g.lineTo(sg*52,2);g.stroke()}
  path(()=>{g.ellipse(0,2,11,19,0,0,7)},'#3b2a58');
  path(()=>{g.moveTo(-9,-14);g.lineTo(-13,-32);g.lineTo(-2,-20);g.closePath()},'#3b2a58');path(()=>{g.moveTo(9,-14);g.lineTo(13,-32);g.lineTo(2,-20);g.closePath()},'#3b2a58');
  path(()=>{g.arc(0,-14,10,0,7)},'#4a3670');
  g.fillStyle='#ff5a5a';g.beginPath();g.arc(-4,-15,2.2,0,7);g.arc(4,-15,2.2,0,7);g.fill();
  g.fillStyle='#fff';g.fillRect(-3,-9,1.6,3);g.fillRect(1.4,-9,1.6,3);
  g.restore();
}
function owl(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  line([[-70,56],[70,56]],13,'#6a4426');
  path(()=>{g.ellipse(0,6,36,46,0,0,7)},'#a8743c');
  path(()=>{g.ellipse(0,14,23,32,0,0,7)},'#f0d9a8');
  g.strokeStyle='rgba(150,100,50,.7)';g.lineWidth=2.4;g.lineCap='round';for(const[a,b]of[[-8,6],[6,4],[-2,18],[12,16],[-12,22],[2,30]]){g.beginPath();g.moveTo(a-5,b);g.lineTo(a,b+5);g.lineTo(a+5,b);g.stroke()}
  for(const sg of[-1,1])path(()=>{g.moveTo(sg*30,-24);g.quadraticCurveTo(sg*52,0,sg*40,44);g.quadraticCurveTo(sg*26,28,sg*28,-8);g.closePath()},'#8a5a2c');
  path(()=>{g.moveTo(-30,-44);g.lineTo(-34,-70);g.lineTo(-14,-54);g.closePath()},'#8a5a2c');path(()=>{g.moveTo(30,-44);g.lineTo(34,-70);g.lineTo(14,-54);g.closePath()},'#8a5a2c');
  path(()=>{g.ellipse(0,-34,34,28,0,0,7)},'#a8743c');
  for(const sg of[-1,1]){path(()=>{g.arc(sg*15,-34,17,0,7)},'#f6e7c2');path(()=>{g.arc(sg*15,-34,10.5,0,7)},'#ffcc3a');g.fillStyle=OC;g.beginPath();g.arc(sg*15,-34,5.6,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(sg*15+2,-36,1.9,0,7);g.fill()}
  path(()=>{g.moveTo(-6,-26);g.lineTo(6,-26);g.lineTo(0,-14);g.closePath()},'#f08a2a');
  line([[-12,48],[-12,58]],6,'#f08a2a');line([[12,48],[12,58]],6,'#f08a2a');
  g.restore();
}
function glow(x,y,r,col){g.save();g.globalCompositeOperation='lighter';const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,col[0]);q.addColorStop(1,col[1]);g.fillStyle=q;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.restore()}
function fireflies(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);const r=rnd(8);
  for(let i=0;i<9;i++){const a=(r()-.5)*220,b=(r()-.5)*190,k=.7+r()*.6;glow(a,b,30*k,['rgba(230,255,120,.95)','rgba(230,255,120,0)']);g.fillStyle='#fffbd0';g.beginPath();g.arc(a,b,3.6*k,0,7);g.fill();
    g.fillStyle='rgba(30,30,30,.9)';g.beginPath();g.ellipse(a+6,b+9,5,3,.5,0,7);g.fill()}
  g.restore();
}

/* ---- sabbia, conchiglie, fiori, funghi, canne, relitti ---- */
function starfish(x,y,s,rot){
  g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);shadow(2,6,30,8,.22);
  path(()=>{for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?15:42;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath()},'#f08a4a');
  g.fillStyle='rgba(255,220,170,.55)';g.beginPath();g.moveTo(0,-34);g.lineTo(8,-12);g.lineTo(-8,-12);g.closePath();g.fill();
  g.fillStyle='#ffe2a0';for(let i=0;i<5;i++){const a=-Math.PI/2+i*Math.PI*2/5;for(const d of[16,26,34]){g.beginPath();g.arc(Math.cos(a)*d,Math.sin(a)*d,2.2,0,7);g.fill()}}
  g.restore();
}
function urchin(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);shadow(2,6,30,8,.22);
  for(let i=0;i<16;i++){const a=i*Math.PI/8;line([[Math.cos(a)*14,Math.sin(a)*14],[Math.cos(a)*34,Math.sin(a)*34]],4.4,'#6a3f9a')}
  path(()=>{g.arc(0,0,19,0,7)},'#7e4fb4');g.fillStyle='rgba(220,190,255,.5)';g.beginPath();g.arc(-6,-6,6,0,7);g.fill();
  g.restore();
}
function spiralShell(x,y,s){
  g.save();g.translate(x,y);g.rotate(-.5);g.scale(s,s);shadow(2,22,40,8,.22);
  const W=[[34,0,24],[8,0,20],[-12,0,15],[-28,0,10],[-38,0,6]];
  for(const[a,b,r]of W)path(()=>{g.ellipse(a,b,r*1.15,r,0,0,7)},'#f6c9b0');
  g.strokeStyle='rgba(176,104,84,.7)';g.lineWidth=2.4;for(const[a,b,r]of W){g.beginPath();g.arc(a,b,r*.84,-1.9,1.9);g.stroke()}
  g.fillStyle='rgba(255,255,255,.55)';g.beginPath();g.ellipse(28,-12,8,4,-.4,0,7);g.fill();
  path(()=>{g.ellipse(46,6,9,13,.4,0,7)},'#e88a8a');
  g.restore();
}
function scallop(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);shadow(2,10,44,9,.22);
  path(()=>{g.moveTo(0,18);for(let i=0;i<=7;i++){const a=-2.55+i*(1.97/7),a2=-2.55+(i+.5)*(1.97/7);g.quadraticCurveTo(Math.cos(a2)*58,Math.sin(a2)*58+18,Math.cos(a+1.97/7)*46,Math.sin(a+1.97/7)*46+18)}g.closePath()},'#f2a68a');
  g.strokeStyle='rgba(150,70,50,.55)';g.lineWidth=2.4;for(let i=0;i<=7;i++){const a=-2.55+i*(1.97/7);g.beginPath();g.moveTo(0,18);g.lineTo(Math.cos(a)*44,Math.sin(a)*44+18);g.stroke()}
  path(()=>{g.rect(-10,14,20,10)},'#e08a6a');
  g.restore();
}
function coneShell(x,y,s,rot){
  g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);shadow(2,18,36,7,.22);
  path(()=>{g.moveTo(-40,0);g.lineTo(18,-20);g.quadraticCurveTo(38,0,18,20);g.closePath()},'#ecc890');
  g.save();g.beginPath();g.moveTo(-40,0);g.lineTo(18,-20);g.quadraticCurveTo(38,0,18,20);g.closePath();g.clip();
  g.fillStyle='#9a6a3a';for(const[a,b]of[[-24,-2],[-12,-8],[-8,6],[4,-12],[6,2],[14,12],[18,-6],[26,4]]){g.beginPath();g.ellipse(a,b,3.6,2.4,0,0,7);g.fill()}
  g.strokeStyle='rgba(120,70,30,.4)';g.lineWidth=2;for(const xx of[-26,-8,10]){g.beginPath();g.moveTo(xx,-14);g.quadraticCurveTo(xx+6,0,xx,14);g.stroke()}g.restore();
  g.restore();
}
function coconut(x,y,s,half){
  g.save();g.translate(x,y);g.scale(s,s);shadow(2,18,26,6,.22);
  path(()=>{g.arc(0,0,22,0,7)},'#8a5226');
  if(half){g.fillStyle='#fff6e0';g.beginPath();g.arc(0,0,15,0,7);g.fill();g.fillStyle='#e8d6b4';g.beginPath();g.arc(0,2,8,0,7);g.fill();g.strokeStyle=OC;g.lineWidth=2.4;g.beginPath();g.arc(0,0,15,0,7);g.stroke()}
  else{g.fillStyle='rgba(255,214,160,.5)';g.beginPath();g.arc(-7,-7,6,0,7);g.fill();g.fillStyle='rgba(40,18,6,.6)';for(const[a,b]of[[3,3],[-5,6],[8,10]]){g.beginPath();g.arc(a,b,2.6,0,7);g.fill()}
    g.strokeStyle='rgba(60,30,10,.4)';g.lineWidth=1.6;for(let i=0;i<5;i++){g.beginPath();g.arc(0,0,8+i*3,.4+i*.3,1.5+i*.3);g.stroke()}}
  g.restore();
}
function driftwood(x,y,s,rot){
  g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);shadow(2,14,70,7,.2);
  path(()=>{g.moveTo(-76,-6);g.quadraticCurveTo(-30,-16,40,-10);g.quadraticCurveTo(80,-8,84,0);g.quadraticCurveTo(70,12,30,12);g.quadraticCurveTo(-30,16,-80,6);g.closePath()},'#c9a272');
  g.strokeStyle='rgba(110,76,40,.6)';g.lineWidth=2;g.lineCap='round';g.beginPath();g.moveTo(-60,-2);g.quadraticCurveTo(-10,-6,50,0);g.moveTo(-50,5);g.quadraticCurveTo(0,4,60,6);g.stroke();
  g.fillStyle='rgba(110,76,40,.7)';g.beginPath();g.ellipse(-20,2,5,3,0,0,7);g.fill();
  line([[40,-8],[56,-26],[70,-30]],7,'#c9a272');
  g.restore();
}
function bottle(x,y,s,rot){
  g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);shadow(2,22,40,7,.22);
  path(()=>{g.moveTo(-46,-12);g.lineTo(-10,-14);g.quadraticCurveTo(0,-14,6,-8);g.lineTo(18,-6);g.lineTo(18,6);g.lineTo(6,8);g.quadraticCurveTo(0,14,-10,14);g.lineTo(-46,12);g.quadraticCurveTo(-52,0,-46,-12);g.closePath()},'#8fe0d0');
  g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.ellipse(-22,-8,16,3,0,0,7);g.fill();
  path(()=>{g.rect(-34,-5,26,10)},'#f6e7c2');g.strokeStyle='rgba(120,80,30,.6)';g.lineWidth=1.6;g.beginPath();g.moveTo(-31,-1);g.lineTo(-12,-1);g.moveTo(-31,2);g.lineTo(-16,2);g.stroke();
  path(()=>{g.rect(18,-5,12,10)},'#a8743c');
  g.restore();
}
function daisy(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  line([[0,0],[2,-26],[0,-48]],5,'#3f9a3c');
  path(()=>{g.moveTo(2,-20);g.quadraticCurveTo(22,-34,28,-22);g.quadraticCurveTo(14,-14,2,-20);g.closePath()},'#4fb048');
  for(let i=0;i<8;i++){g.save();g.translate(0,-56);g.rotate(i*Math.PI/4);path(()=>{g.ellipse(0,-13,6,11,0,0,7)},'#fff');g.restore()}
  path(()=>{g.arc(0,-56,8,0,7)},'#ffcf2a');
  g.restore();
}
function blossom(x,y,s,pc){
  g.save();g.translate(x,y);g.scale(s,s);
  line([[0,0],[-3,-22],[0,-42]],5,'#3f9a3c');
  path(()=>{g.moveTo(-2,-14);g.quadraticCurveTo(-24,-28,-30,-16);g.quadraticCurveTo(-14,-8,-2,-14);g.closePath()},'#4fb048');
  for(let i=0;i<5;i++){g.save();g.translate(0,-50);g.rotate(i*Math.PI*2/5);path(()=>{g.arc(0,-11,9.5,0,7)},pc);g.restore()}
  path(()=>{g.arc(0,-50,6,0,7)},'#ffe27a');
  g.restore();
}
function mushroom(x,y,s,cap,dots,glowy){
  g.save();g.translate(x,y);g.scale(s,s);shadow(2,6,30,7,.22);
  if(glowy)glow(0,-24,70,['rgba(120,220,255,.55)','rgba(120,220,255,0)']);
  path(()=>{g.moveTo(-9,0);g.quadraticCurveTo(-7,-20,-6,-26);g.lineTo(6,-26);g.quadraticCurveTo(7,-20,9,0);g.quadraticCurveTo(0,5,-9,0)},'#f6e7c2');
  path(()=>{g.moveTo(-34,-24);g.quadraticCurveTo(-34,-62,0,-62);g.quadraticCurveTo(34,-62,34,-24);g.quadraticCurveTo(0,-16,-34,-24)},cap);
  g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(-12,-50,10,5,-.5,0,7);g.fill();
  g.fillStyle=dots;for(const[a,b,r]of[[-16,-36,5],[6,-48,6],[18,-34,4.6],[-2,-30,3.6]]){g.beginPath();g.arc(a,b,r,0,7);g.fill()}
  g.restore();
}
function reeds(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);shadow(2,6,34,7,.2);
  for(const[a,h,cv]of[[-14,80,-6],[0,104,3],[14,88,8]]){
    line([[a,0],[a+cv*.5,-h*.5],[a+cv,-h]],5,'#6aa84a');
    path(()=>{g.ellipse(a+cv,-h-10,6,15,0,0,7)},'#8a5a2c');g.strokeStyle='#d8b270';g.lineWidth=2;g.beginPath();g.moveTo(a+cv,-h+4);g.lineTo(a+cv,-h-30);g.stroke()}
  for(const sg of[-1,1])path(()=>{g.moveTo(sg*2,0);g.quadraticCurveTo(sg*30,-30,sg*38,-62);g.quadraticCurveTo(sg*22,-26,sg*8,0);g.closePath()},'#58a845');
  g.restore();
}
function tuft(x,y,s){
  g.save();g.translate(x,y);g.scale(s,s);
  for(const[a,h,cv]of[[-14,36,-10],[-6,52,-4],[2,62,4],[10,48,12],[18,34,16]])path(()=>{g.moveTo(a-5,0);g.quadraticCurveTo(a+cv*.4,-h*.5,a+cv,-h);g.quadraticCurveTo(a+cv*.2,-h*.45,a+5,0);g.closePath()},'#4fb048');
  g.restore();
}

/* ---- pannello 1: piante e oggetti ---- */
function rnd(seed){let a=seed;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function blobs(L,fill){                      // unione di cerchi con un solo contorno esterno
  if(OW){g.strokeStyle=OC;g.lineWidth=OW*2;g.lineJoin='round';for(const b of L){g.beginPath();g.arc(b[0],b[1],b[2],0,7);g.stroke()}}
  g.fillStyle=fill;for(const b of L){g.beginPath();g.arc(b[0],b[1],b[2],0,7);g.fill()}
}
function clipBlobs(L,fn){g.save();g.beginPath();for(const b of L){g.moveTo(b[0]+b[2],b[1]);g.arc(b[0],b[1],b[2],0,7)}g.clip();fn();g.restore()}
function path(fn,fill){g.beginPath();fn();if(OW){g.strokeStyle=OC;g.lineWidth=OW*2;g.lineJoin='round';g.stroke()}g.fillStyle=fill;g.fill()}
function leafDabs(L,seed,n,col,sz){const r=rnd(seed);g.fillStyle=col;for(let i=0;i<n;i++){const b=L[(r()*L.length)|0],a=r()*6.28,d=Math.sqrt(r())*b[2]*.8,x=b[0]+Math.cos(a)*d,y=b[1]+Math.sin(a)*d;g.save();g.translate(x,y);g.rotate(-.6+r()*.5);g.beginPath();g.ellipse(0,0,sz*(.8+r()*.6),sz*.45,0,0,7);g.fill();g.restore()}}
  const R=Math.round;
  function B(W,H,ax,ay,fn){return sp(W,H,gg=>{g=gg;g.lineJoin='round';fn()},ax,ay)}
  function tint(s,f){return sp(s.w,s.h,gg=>{gg.filter=f;gg.drawImage(s.c,0,0,s.w,s.h)},s.ax,s.ay)}
  // piu' tipi di alberi e pini: stesse sprite originali, con tonalita' diverse
  function nature(){
    const t0=SP.tree.slice(),p0=SP.pine.slice();
    SP.tree=[...t0,tint(t0[0],'hue-rotate(14deg) saturate(1.1)'),tint(t0[3],'hue-rotate(-10deg) brightness(.96)')];
    SP.pine=[...p0,tint(p0[1],'hue-rotate(16deg)')];
  }
  function base(){
    const sm=(b,k)=>sp(R(b.w*k),R(b.h*k),gg=>{gg.drawImage(b.c,0,0,b.w*k,b.h*k)},b.ax*k,b.ay*k);
    SP.boulder[1]=sm(SP.boulder[1],.62);SP.boulder[3]=sm(SP.boulder[3],.55);
  }
  /* ---- decorazioni fisse sul terreno (cotte una volta nella mappa) ---- */
  function decor(L){
    g=L;NOSH=false;const FULL=GFXN,r=rnd(5151);let DC=0,GR=0,FO=0;
    const fern=(x,y,s)=>{g.save();g.translate(x,y);g.scale(s,s);g.lineCap='round';for(let k=-3;k<=3;k++){const a=-1.57+k*.42,len=26+(3-Math.abs(k))*3;g.strokeStyle='#2f7a34';g.lineWidth=5;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(Math.cos(a)*len*.5,Math.sin(a)*len*.6-6,Math.cos(a)*len,Math.sin(a)*len*.7+4);g.stroke();g.strokeStyle='#58b04a';g.lineWidth=2.4;g.stroke()}g.restore()};
    const clover=(x,y,s)=>{for(let k=0;k<5;k++){g.fillStyle=k%2?'rgba(150,210,100,.55)':'rgba(90,160,70,.5)';g.beginPath();g.ellipse(x+(r()-.5)*14*s,y+(r()-.5)*8*s,4*s,2.4*s,r()*3,0,7);g.fill()}};
    const longgrass=(x,y,s)=>{g.save();g.translate(x,y);g.scale(s,s);g.lineCap='round';for(let k=0;k<7;k++){const a=(k-3)*.2;g.strokeStyle=k%2?'#7cc44f':'#4f9a3c';g.lineWidth=3;g.beginPath();g.moveTo(k*2-6,0);g.quadraticCurveTo(k*3-9+a*20,-16,a*60,-30-(k%3)*4);g.stroke()}g.restore()};
    const dry=(x,y,s)=>{g.save();g.translate(x,y);g.scale(s,s);g.lineCap='round';for(let k=0;k<6;k++){g.strokeStyle=['#c8b46a','#d8c47a','#a89650'][k%3];g.lineWidth=2.4;g.beginPath();g.moveTo(k*2.4-6,0);g.quadraticCurveTo(k*3-9,-10,(k-2.5)*5,-20);g.stroke()}g.restore()};
    const PC=['#ffd23f','#ffd23f','#ff8fa3','#c8a8ff','#ff6a5a','#7ab8ff','#ffffff','#ff9a3c'];
    const capCols=[['#e8452c','#fff'],['#d9a441','#fff4d0'],['#b25fd0','#f3e0ff'],['#e8e0cf','#cfc2a8']];
    for(let ty=0;ty<MH;ty++)for(let tx=0;tx<MW;tx++){
      const e=elevT[ty*MW+tx];if(e<WL+.02)continue;
      const s=e-WL,n1=NZ.fbm((tx+.5)*1.9,(ty+.5)*1.9,2),gT=sstep(.17,.27,s+(n1-.5)*.16);
      const dp=pathDist(tx+.5,ty+.5),fF=forestF(tx+.5,ty+.5),dcE=hyp(tx+.5-C0.x,(ty+.5-C0.y)*1.15);
      if(dp<1.3||dcE<6.2)continue;
      const X=()=>(DC++,(tx+.1+r()*.8)*TS),Y=()=>(ty+.1+r()*.8)*TS;
      if(gT<.5){                                       // sabbia
        const q=r()/2.4;
        if(s>.04&&s<.2&&q<.07){const k=(r()*(FULL?5:3))|0,x=X(),y=Y(),sc=.28+r()*.08;
          if(k===0)scallop(x,y,sc);else if(k===1)spiralShell(x,y,sc);else if(k===2)coneShell(x,y,sc,r()*6);else if(k===3)starfish(x,y,sc,r()*6);else urchin(x,y,sc*.9)}
        else if(s>.07&&s<.14&&q<.085){driftwood(X(),Y(),.4+r()*.15,r()*3.1-1.5)}
        else if(s>.1&&q<.1){const x=X(),y=Y();if(FULL&&r()<.5)coconut(x,y,.3,r()<.3);else rock2(x,y,.24+r()*.08)}
        else if(FULL&&s>.14&&q<.12){dry(X(),Y(),.7+r()*.4)}
      }else{                                           // erba e sottobosco
        const q=r()/3;GR++;if(fF>.3)FO++;
        if(fF>.3){
          if(q<.02)rock2(X(),Y(),.26+r()*.1);
          else if(q<.045){const cc=capCols[(r()*4)|0];mushroom(X(),Y(),.26+r()*.07,cc[0],cc[1],false)}
          else if(q<.06)blossom(X(),Y(),.38+r()*.08,PC[(r()*PC.length)|0]);
          else if(FULL&&q<.075)logp(X(),Y(),30+r()*14,5+r()*2,r()*.7-.35);
          else if(FULL&&q<.11)fern(X(),Y(),.5+r()*.25);
          else if(FULL&&q<.14)tuft(X(),Y(),.38+r()*.12);
        }else{
          if(q<.015)rock2(X(),Y(),.24+r()*.1);
          else if(q<.045)blossom(X(),Y(),.38+r()*.08,PC[(r()*PC.length)|0]);
          else if(q<.07)daisy(X(),Y(),.38+r()*.08);
          else if(q<.083)mushroom(X(),Y(),.26,'#e8452c','#fff',false);
          else if(FULL&&q<.1)logp(X(),Y(),26+r()*10,4.5,r()*.7-.35);
          else if(FULL&&q<.13)longgrass(X(),Y(),.7+r()*.5);
          else if(FULL&&q<.15)clover(X(),Y(),1);
        }
      }
    }
    window.__DC=[DC,GR,FO];
  }
  window.__DC=null;
  /* ---- animali: gabbiani con ombra, tartarughe, pesci, gufo ---- */
  let AN=null;
  function mkAn(){
    AN={};
    AN.gull=[0,9,18].map(f=>B(48,56,24,28,()=>gull(24,28,.25,0,f)));
    AN.turtle=B(64,64,32,32,()=>turtle(32,32,.36,0));
    AN.fish=B(36,22,18,11,()=>fish(18,11,.26,'#3b5c78','#2a4560'));
    AN.owl=B(44,52,22,40,()=>owl(22,40,.3));
  }
  function under(gg,t,vx0,vy0,vx1,vy1){
    if(!AN)mkAn();
    if(!GFXN)return;const q=(typeof QL!=='undefined'&&QL>=3),FULL=GFXN;
    for(let i=0;i<GLINTS.length;i+=9){
      const gl=GLINTS[i];if(gl[0]<vx0-60||gl[0]>vx1+60||gl[1]<vy0-60||gl[1]>vy1+60)continue;
      const k=i%3;
      if(k===0){const a=t*.12+i,x=gl[0]+Math.sin(a)*34,y=gl[1]+Math.cos(a*.8)*22,rot=Math.atan2(Math.cos(a*.8)*-22*.8,Math.cos(a)*34);
        gg.save();gg.translate(x+3,y+4);gg.rotate(rot);gg.globalAlpha=.16;gg.filter='brightness(0)';drawSp(gg,AN.turtle,0,0);gg.restore();
        gg.save();gg.translate(x,y);gg.rotate(rot);gg.globalAlpha=.9;drawSp(gg,AN.turtle,0,0);gg.restore()}
      else if(FULL&&k===1&&!q){for(let f=0;f<4;f++){const a=t*.5+i+f*.9,x=gl[0]+Math.cos(a)*26+f*7,y=gl[1]+Math.sin(a)*16+f*4;
        gg.save();gg.translate(x,y);gg.rotate(a+1.57);gg.globalAlpha=.4;drawSp(gg,AN.fish,0,0);gg.restore()}}
    }
  }
  function over(gg,t,vx0,vy0,vx1,vy1){
    if(!AN)mkAn();
    const vw=vx1-vx0,vh=vy1-vy0;
    if(!isNight()&&S.tod>=6&&S.tod<19.2){
      if(!AN.gp){const r=rnd(88),cx0=C0.x*TS,cy0=C0.y*TS;AN.gp=[];for(let i=0;i<10;i++)AN.gp.push({cx:cx0+(r()-.5)*(i<3?900:2600),cy:cy0+(r()-.5)*(i<3?600:1800),rx:380+r()*620,ry:240+r()*330,w:(.07+r()*.05)*(r()<.5?-1:1),ph:r()*6.28})}
      for(let i=0;i<AN.gp.length;i++){
        const q=AN.gp[i],a=t*q.w+q.ph,x=q.cx+Math.cos(a)*q.rx,y=q.cy+Math.sin(a)*q.ry;
        if(x<vx0-80||x>vx1+80||y<vy0-80||y>vy1+110)continue;
        const hd=Math.atan2(Math.cos(a)*q.ry*q.w,-Math.sin(a)*q.rx*q.w);
        const fr=Math.floor((t*7+i)%4),spr=AN.gull[fr===3?1:fr];
        gg.save();gg.translate(x+10,y+24);gg.rotate(hd);gg.globalAlpha=.14;gg.filter='brightness(0)';drawSp(gg,spr,0,0);gg.restore();
        gg.save();gg.translate(x,y);gg.rotate(hd);drawSp(gg,spr,0,0);gg.restore();
      }
    }
    if(isNight()){
      for(const e of E){
        if(e.type!=='tree'||!e.alive||e.x<vx0-40||e.x>vx1+40||e.y<vy0||e.y>vy1+160)continue;
        let h=0;const id=String(e.id);for(let k=0;k<id.length;k++)h=(h*31+id.charCodeAt(k))|0;
        if(Math.abs(h)%11!==0)continue;
        const bl=(Math.floor(t*.7+Math.abs(h))%9===0);
        gg.save();gg.translate(e.x+(e.flip?-14:14),e.y-70);if(e.flip)gg.scale(-1,1);drawSp(gg,AN.owl,0,0);
        if(!bl){gg.globalCompositeOperation='lighter';gg.fillStyle='rgba(255,220,90,.35)';gg.beginPath();gg.arc(-3,-14,4,0,7);gg.arc(4,-14,4,0,7);gg.fill()}
        gg.restore();
      }
    }
  }
  return{nature,base,decor,under,over,on:()=>GFXN};
})();
function waterNew(d){const a=waterRGB(.05),b=waterRGB(.27),c=waterRGB(.8);const s1=sstep(.12,.16,d),s2=sstep(.38,.42,d);let o=mixc(mixc(a,b,s1),c,s2);const e=Math.max(1-Math.abs(d-.14)/.012,1-Math.abs(d-.4)/.012,0);if(e>0)o=mixc(o,[235,255,255],.32*e);return o}
function gfxSwitch(){try{localStorage.setItem('sm_gfx',GFXN?'old':'new')}catch(e){}try{saveGame(true)}catch(e){}location.reload()}
