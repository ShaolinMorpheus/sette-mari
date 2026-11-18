/* ====== IL GRANDE VIAGGIO (Capitolo 4 della lista): cinque mari ignoti, dentro il motore navale del Convoglio ======
   Questo blocco viene inserito dentro ch3_inject.js (marker @@VOY@@): condivide C, SPEC, mkShip, moveShip, fire, ecc.
   Attivo solo con VOY=1 (indirizzo #w5). Mappa 260x110 tile, da est (x grande) a ovest. */
const VKEY='sm_c5';
const VZ=[
 {n:'Mare di Calvara',  tod:7.8, wx:0,   fog:0, spd:1,   jit:.22,tint:[0,0,0,0],        sub:'I mari che conosci. Ancora per poco.'},
 {n:'Mare dei Sargassi',tod:12,  wx:0,   fog:0, spd:.3,  jit:.08,tint:[150,190,80,.10],  sub:'Bonaccia: il vento è sparito.'},
 {n:'Mare delle Tempeste',tod:16.4,wx:1,  fog:0, spd:1,   jit:1.15,tint:[40,52,84,.22],   sub:'Il cielo si chiude. Occhio ai gorghi e ai lampi.'},
 {n:'Mare di Nebbia',   tod:18.9,wx:.22, fog:1, spd:.8,  jit:.25,tint:[205,214,224,.10], sub:'Non si vede a un palmo. Cerca le luci di Giacomo.'},
 {n:'Mare dei Relitti', tod:23.2,wx:0,   fog:0, spd:1,   jit:.35,tint:[10,52,62,.16],    sub:'Navi spezzate. Qualcosa ci osserva.'},
 {n:'Mare della Stella',tod:25.3,wx:0,   fog:0, spd:1.12,jit:.12,tint:[24,24,96,.16],    sub:'Notte limpida. La stella bassa è davanti a te.'}
];
const BUOY_T='Segui le luci di Giacomo';
const LEGS=[
 {z:0,x:238,y:42,t:'Salpa verso ovest: esci dalle acque spagnole'},
 {z:0,x:229,y:82,t:'Salpa verso ovest: esci dalle acque spagnole'},
 {z:0,x:221,y:58,gate:1,t:'Salpa verso ovest: esci dalle acque spagnole'},
 {z:1,x:206,y:42,t:'Attraversa i Sargassi: usa «Voga!» quando il vento cala'},
 {z:1,x:192,y:72,t:'Attraversa i Sargassi: usa «Voga!» quando il vento cala'},
 {z:1,x:174,y:50,gate:1,t:'Attraversa i Sargassi: usa «Voga!» quando il vento cala'},
 {z:2,x:176,y:72,t:'Attraversa la tempesta: schiva gorghi e lampi'},
 {z:2,x:160,y:86,t:'Attraversa la tempesta: schiva gorghi e lampi'},
 {z:2,x:151,y:68,t:'Attraversa la tempesta: schiva gorghi e lampi'},
 {z:2,x:158,y:48,t:'Attraversa la tempesta: schiva gorghi e lampi'},
 {z:2,x:150,y:28,t:'Attraversa la tempesta: schiva gorghi e lampi'},
 {z:2,x:139,y:26,t:'Attraversa la tempesta: schiva gorghi e lampi'},
 {z:2,x:136,y:46,t:'Attraversa la tempesta: schiva gorghi e lampi'},
 {z:2,x:147,y:62,t:'Attraversa la tempesta: schiva gorghi e lampi'},
 {z:2,x:129,y:58,gate:1,t:'Attraversa la tempesta: schiva gorghi e lampi'},
 {z:3,k:'buoy',x:121,y:52},{z:3,k:'buoy',x:116,y:42},{z:3,k:'buoy',x:114,y:24},{z:3,k:'buoy',x:102,y:20},
 {z:3,k:'buoy',x:101,y:44},{z:3,k:'buoy',x:110,y:60},{z:3,k:'buoy',x:104,y:72},{z:3,k:'buoy',x:90,y:70},{z:3,k:'buoy',x:84,y:54,gate:1},
 {z:4,x:80,y:34,t:'Naviga tra i relitti: la nave fantasma ti segue'},
 {z:4,x:72,y:72,t:'Naviga tra i relitti: la nave fantasma ti segue'},
 {z:4,x:76,y:52,t:'Naviga tra i relitti: la nave fantasma ti segue'},
 {z:4,k:'wreck',x:60,y:56,t:'Raggiungi il relitto del Gabbiano'},
 {z:4,x:49,y:78,gate:1,t:'Esci dal mare dei relitti, sempre a ovest'},
 {z:5,x:41,y:26,t:'Segui la stella bassa'},
 {z:5,x:33,y:80,t:'Segui la stella bassa'},
 {z:5,x:27,y:40,t:'Segui la stella bassa'},
 {z:5,k:'dock',x:24,y:51,gate:1,t:'Attracca al molo del faro'}
];
const BU0=LEGS.findIndex(l=>l.k==='buoy'),NB=LEGS.filter(l=>l.k==='buoy').length;
const CPS=[[247,60],[219,58],[177,52],[126,60],[86,56],[50,76]];
if(VOY)for(const i in EXS.st.legs)if(LEGS[i]){LEGS[i].x=EXS.st.legs[i][0];LEGS[i].y=EXS.st.legs[i][1]}
if(VOY)for(const i in EXS.st.cps)if(CPS[i]){CPS[i][0]=EXS.st.cps[i][0];CPS[i][1]=EXS.st.cps[i][1]}
if(VOY){ /* editor: tappe, boe e punti di ripresa del grande viaggio */
  const ZC=['#7fd0ff','#c8e060','#9fa8ff','#e0e0f0','#7fe0c0','#ffd23a'];
  const ITEMS=LEGS.map((l,i)=>({id:'l'+i,k:'l',i,x:l.x*T,y:l.y*T,r:34,col:ZC[l.z],lab:(l.k==='buoy'?'Boa ':l.k==='wreck'?'Relitto ':l.k==='dock'?'Molo ':'Tappa ')+i+(l.gate?' (uscita)':'')}))
    .concat(CPS.map((c,i)=>({id:'c'+i,k:'c',i,x:c[0]*T,y:c[1]*T,r:30,col:'#ff7a6a',lab:'Ripresa '+i})));
  const X={tag:'w5',snap:T,items:()=>ITEMS,name:it=>it.lab,info:it=>'casella '+Math.round(it.x/T)+','+Math.round(it.y/T),
    move(it,nx,ny){const gx=Math.round(nx/T),gy=Math.round(ny/T);it.x=gx*T;it.y=gy*T;if(it.k==='l'){LEGS[it.i].x=gx;LEGS[it.i].y=gy;EXS.st.legs[it.i]=[gx,gy]}else{CPS[it.i][0]=gx;CPS[it.i][1]=gy;EXS.st.cps[it.i]=[gx,gy]}},
    draw(g,z){const L=ITEMS.filter(q=>q.k==='l');g.lineWidth=2.5/z;
      for(let i=0;i<L.length-1;i++){g.strokeStyle=ZC[LEGS[i].z]+'cc';g.beginPath();g.moveTo(L[i].x,L[i].y);g.lineTo(L[i+1].x,L[i+1].y);g.stroke()}
      for(let z0=0;z0<6;z0++){const gx=XLIM[z0]*T;g.setLineDash([12/z,10/z]);g.strokeStyle='rgba(255,255,255,.35)';g.beginPath();g.moveTo(gx,0);g.lineTo(gx,WH);g.stroke();g.setLineDash([])}},
    save(){EXS.save()},code:()=>EXS.code(),reset(){EXS.reset()}};
  window.__EDX=X;
}
const firstLeg=z=>LEGS.findIndex(l=>l.z===z);
const gateOf=z=>{for(let i=LEGS.length-1;i>=0;i--)if(LEGS[i].z===z&&LEGS[i].gate)return LEGS[i];return LEGS[0]};
const XLIM=VZ.map((_,z)=>gateOf(z).x-12);
let V=null;
const VQUIPS=[
 'Ovest, sempre ovest. Mi gira la testa, ma è una bella rotta.',
 'Cra! Cinque mari che nessuno ha disegnato. Il quinto è il mio preferito. Non l\'ho ancora visto.',
 'Se vedo un pesce volante lo saluto. Se vedo un pesce gigante, saluto da lontano.',
 'Dodo ha chiuso la zuppa nel pentolone. Il pentolone ha chiuso Dodo nella cambusa. Tutti contenti.',
 'Pip dice che la stella bassa canta. Io dico che ha fame, come me.',
 'Capitano, il timone è tuo. Le opinioni sono mie.',
 'Ho contato le onde, ma ricominciano sempre da capo. Che imbroglione, il mare.',
 'Se un giorno scrivono di noi, mettano bene che io ero a prua.',
 'Il vento a favore è come un biscotto: non se ne ha mai abbastanza.'
];
const KS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const KG=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}};
const say=(who,txt,ms)=>toast('<b>'+pn(who)+':</b> «'+pn(txt)+'»',ms||5200);

/* ---------- personaggi della ciurma ---------- */
function voyChars(){
  if(!CH.pip)CH.pip={name:'Pip',skin:'#e7b48c',hair:'#6a3a1a',coat:'#7a8a5a',coat2:'#566040',pants:'#5a4a3a',shirt:'#e8dcc0',hat:'bandana',hatc:'#8a3a2a',freckles:1,w:.78,tall:.84};
  if(!CH.dodo)CH.dodo={name:'Dodo',skin:'#e7ad88',hair:'#5e3418',coat:'#d8d0b8',coat2:'#b0a888',apron:1,pants:'#56503f',shirt:'#ffffff',hat:'bandana',hatc:'#d8d0b8',mustache:1,ladle:1,w:1.22,tall:.95};
  CH.giacomo={name:'Giacomo',skin:'#d9a37c',hair:'#d9d9de',beard:'#ececf0',coat:'#7a2a22',coat2:'#4a1814',pants:'#33281f',shirt:'#e8e0cc',hat:'tricorn',hatc:'#5a1c18',trim:'#d8b24a',boots:1,stubble:1,w:1.02,tall:1.0};
}

/* ---------- mondo: sargassi, gorghi, boe, relitti, faro ---------- */
function voyWorld(){
  const w=[];
  [[213,56,230,0],[201,50,210,1],[199,67,260,2],[190,58,215,0],[183,67,235,1],[178,52,195,2],[206,36,175,1],[188,77,210,0],[171,57,240,2],[196,44,155,1],[216,72,170,2],[181,40,170,0]]
    .forEach((a,i)=>w.push({x:a[0]*T,y:a[1]*T,r:a[2],v:a[3],ph:i*1.7}));
  // gorghi: sparsi ai lati della rotta (mai sopra), con qualche passaggio stretto
  const pl=[CPS[2]].concat(LEGS.filter(l=>l.z===2).map(l=>[l.x,l.y])),dseg=(px,py,a,b)=>{const dx=b[0]-a[0],dy=b[1]-a[1],L2=dx*dx+dy*dy,u=Math.max(0,Math.min(1,((px-a[0])*dx+(py-a[1])*dy)/L2));return Math.hypot(px-a[0]-u*dx,py-a[1]-u*dy)};
  const dpl=(px,py)=>{let m=1e9;for(let i=0;i<pl.length-1;i++)m=Math.min(m,dseg(px,py,pl[i],pl[i+1]));return m};
  const rv=mulberry(311),vt=[];
  for(let k=0,tr=0;k<12&&tr<600;tr++){const x=130+rv()*48,y=18+rv()*76,d=dpl(x,y);if(d<6.6||d>11)continue;if(vt.some(o=>Math.hypot(o.x/T-x,o.y/T-y)<8))continue;vt.push({x:x*T,y:y*T,ph:k*2.1});k++}
  const bu=LEGS.filter(l=>l.k==='buoy').map(l=>({x:l.x*T,y:l.y*T}));
  // rottami sparsi nel mare dei relitti
  const rg=mulberry(77),deb=[];
  for(let k=0,tries=0;k<30&&tries<400;tries++){
    const x=(46+rg()*40)*T,y=(14+rg()*82)*T;
    if(!clearAt(x,y,34))continue;
    if(LEGS.some(l=>l.z===4&&Math.hypot(l.x*T-x,l.y*T-y)<150))continue;
    deb.push({x,y,k:(rg()*4)|0,a:rg()*TAU,s:.8+rg()*.6,ph:rg()*6});k++;
  }
  return{weeds:w,vort:vt,buoys:bu,deb};
}
const WEEDS={};
function weedSpr(v){
  if(WEEDS[v])return WEEDS[v];
  const R=250,Wd=R*2+40,Hd=Math.round(R*1.45)+40;
  return WEEDS[v]=sp(Wd,Hd,g=>{
    const cx=Wd/2,cy=Hd/2,r=mulberry(300+v*17);
    for(let i=0;i<46;i++){const a=r()*TAU,d=Math.sqrt(r())*R*.95,x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.66,rad=14+r()*30;
      g.fillStyle='rgba(30,54,24,'+(.2*(1-d/R*.7))+')';g.beginPath();g.ellipse(x,y,rad*1.6,rad*.9,r()*3,0,7);g.fill()}
    for(let i=0;i<150;i++){
      const a=r()*TAU,d=Math.sqrt(r())*R,x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.66,al=Math.max(.15,1-Math.pow(d/R,2.2));
      const n=3+((r()*3)|0),cols=['#4d6a22','#6b8a30','#8da83c','#5a7a28'];
      for(let k=0;k<n;k++){
        const ang=-Math.PI/2+(r()-.5)*2.2,len=16+r()*26;
        g.strokeStyle=cols[(r()*4)|0];g.globalAlpha=al*.9;g.lineWidth=2.6+r()*2.2;g.lineCap='round';
        g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(ang)*len*.5+(r()-.5)*10,y+Math.sin(ang)*len*.4,x+Math.cos(ang)*len,y+Math.sin(ang)*len*.55);g.stroke()}
      if(r()<.35){g.globalAlpha=al;g.fillStyle='#c4d65a';g.beginPath();g.arc(x+(r()-.5)*14,y+(r()-.5)*8,2.2+r()*1.6,0,7);g.fill();g.fillStyle='rgba(255,255,220,.7)';g.beginPath();g.arc(x-1,y-1,1,0,7);g.fill()}
    }
    g.globalAlpha=1;
  },Wd/2,Hd/2);
}
function inWeed(p){for(const w of V.W.weeds){const dx=(p.x-w.x)/w.r,dy=(p.y-w.y)/(w.r*.66);if(dx*dx+dy*dy<.8)return true}return false}

function drawVortex(g,v,t){
  g.save();g.translate(v.x,v.y);g.scale(1,.72);
  let q=g.createRadialGradient(0,0,4,0,0,150);q.addColorStop(0,'rgba(2,12,26,.95)');q.addColorStop(.5,'rgba(6,34,60,.75)');q.addColorStop(1,'rgba(8,70,100,0)');
  g.fillStyle=q;g.beginPath();g.arc(0,0,150,0,7);g.fill();
  for(let a=0;a<4;a++){
    g.beginPath();
    for(let i=0;i<=34;i++){const u=i/34,r=12+u*210,ang=a*Math.PI/2+u*4.6-t*1.9+v.ph;const x=Math.cos(ang)*r,y=Math.sin(ang)*r;i?g.lineTo(x,y):g.moveTo(x,y)}
    g.strokeStyle='rgba(225,245,255,.5)';g.lineWidth=4;g.lineCap='round';g.stroke();
    g.strokeStyle='rgba(255,255,255,.22)';g.lineWidth=1.6;g.stroke();
  }
  g.strokeStyle='rgba(230,248,255,'+(.3+.15*Math.sin(t*3+v.ph))+')';g.lineWidth=3;g.setLineDash([16,14]);g.lineDashOffset=-t*40;
  g.beginPath();g.arc(0,0,92,0,7);g.stroke();g.setLineDash([]);
  g.restore();
}
function drawBuoy(g,x,y,t,lit,i){
  const bob=Math.sin(t*1.6+i)*2.5;
  g.save();g.translate(x,y+bob);
  {const bm=mzn(lit?'boa-gialla':'boa-rossa');if(bm){const w=78,h=w*bm.naturalHeight/bm.naturalWidth;g.rotate(Math.sin(t*1.1+i)*.05);g.drawImage(bm,-w/2,-h/2,w,h);if(lit){g.globalCompositeOperation='lighter';const gl=g.createRadialGradient(0,0,4,0,0,70);gl.addColorStop(0,'rgba(255,214,110,'+(.5+.12*Math.sin(t*4+i))+')');gl.addColorStop(1,'rgba(255,214,110,0)');g.fillStyle=gl;g.fillRect(-70,-70,140,140)}g.restore();return}}
  g.fillStyle='rgba(6,40,60,.3)';g.beginPath();g.ellipse(4,12,16,6,0,0,7);g.fill();
  g.strokeStyle='rgba(255,255,255,'+(.3+.1*Math.sin(t*2+i))+')';g.lineWidth=2;g.beginPath();g.ellipse(0,10,22+Math.sin(t*1.4+i)*2,8,0,0,7);g.stroke();
  // corpo a strisce
  g.fillStyle='#c93a2c';g.beginPath();g.moveTo(-13,10);g.lineTo(-8,-14);g.lineTo(8,-14);g.lineTo(13,10);g.closePath();g.fill();
  g.fillStyle='#f4ecd4';g.beginPath();g.moveTo(-10.5,-1);g.lineTo(-9,-8);g.lineTo(9,-8);g.lineTo(10.5,-1);g.closePath();g.fill();
  g.strokeStyle='#2a1208';g.lineWidth=1.6;g.beginPath();g.moveTo(-13,10);g.lineTo(-8,-14);g.lineTo(8,-14);g.lineTo(13,10);g.closePath();g.stroke();
  g.strokeStyle='#3a2410';g.lineWidth=3;g.beginPath();g.moveTo(0,-14);g.lineTo(0,-36);g.stroke();
  // lanterna
  g.fillStyle='#2a1a0e';g.fillRect(-5,-46,10,10);
  g.fillStyle=lit?'#ffd45a':'#5a4a30';g.fillRect(-3.5,-44.5,7,7);
  // bandierina con la J
  g.fillStyle='#f4ecd4';g.beginPath();g.moveTo(0,-34);g.lineTo(17,-30);g.lineTo(0,-24);g.closePath();g.fill();g.strokeStyle='#2a1208';g.lineWidth=1;g.stroke();
  g.fillStyle='#8a2a1c';g.font='900 9px Nunito,Arial';g.textAlign='center';g.fillText('J',7,-27);
  g.restore();
}
function drawDebris(g,d,t){
  const bob=Math.sin(t*1.1+d.ph)*2;
  g.save();g.translate(d.x,d.y+bob);g.rotate(d.a);g.scale(d.s,d.s);
  g.fillStyle='rgba(6,40,60,.25)';g.beginPath();g.ellipse(3,9,24,7,0,0,7);g.fill();
  if(d.k===0){ // tavole
    g.fillStyle='#6a4a2c';g.strokeStyle='#241408';g.lineWidth=1.6;
    g.fillRect(-26,-4,44,8);g.strokeRect(-26,-4,44,8);g.fillRect(-6,-12,34,7);g.strokeRect(-6,-12,34,7);
    g.fillStyle='#8a6a40';g.fillRect(-24,-2,36,2);
  }else if(d.k===1){ // barile
    g.fillStyle='#7a5430';g.strokeStyle='#241408';g.lineWidth=1.6;g.beginPath();g.ellipse(0,0,12,9,0,0,7);g.fill();g.stroke();
    g.strokeStyle='#bba070';g.lineWidth=2;g.beginPath();g.ellipse(0,0,8,6,0,0,7);g.stroke();
  }else if(d.k===2){ // moncone di albero con straccio
    g.strokeStyle='#4a2c18';g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(-8,6);g.lineTo(6,-24);g.stroke();
    g.fillStyle='rgba(224,214,188,.8)';g.beginPath();g.moveTo(6,-24);g.quadraticCurveTo(20,-18+Math.sin(t*2+d.ph)*3,16,-4);g.lineTo(4,-8);g.closePath();g.fill();
  }else{ // costole di scafo
    g.strokeStyle='#4a2e1a';g.lineWidth=4;g.lineCap='round';
    for(let i=-2;i<=2;i++){g.beginPath();g.moveTo(i*9,8);g.quadraticCurveTo(i*9+3,-12,i*9+8,-20);g.stroke()}
    g.beginPath();g.moveTo(-20,8);g.lineTo(22,8);g.stroke();
  }
  g.restore();
}
function drawWreck(g,x,y,t){
  g.save();g.translate(x,y);
  // scogliera
  g.fillStyle='#2c3638';g.strokeStyle='#10181a';g.lineWidth=2;
  for(const[ox,oy,rw,rh]of[[-120,16,46,20],[-40,34,60,22],[60,30,52,20],[130,12,40,18],[10,-2,36,16]]){g.beginPath();g.ellipse(ox,oy,rw,rh,0,0,7);g.fill();g.stroke()}
  // scafo inclinato
  g.save();g.rotate(-.14);g.translate(0,-6);
  drawSp(g,hs('galeone'),0,0,1.0);
  // linea d'acqua: lo scafo e' mezzo affondato
  const q=g.createLinearGradient(0,-4,0,48);q.addColorStop(0,'rgba(22,86,112,0)');q.addColorStop(.35,'rgba(22,86,112,.55)');q.addColorStop(1,'rgba(14,60,84,.82)');
  g.fillStyle=q;g.fillRect(-170,4,340,60);
  g.restore();
  // alberi spezzati e vela a brandelli
  g.strokeStyle='#3a2410';g.lineWidth=7;g.lineCap='round';
  g.beginPath();g.moveTo(-26,-6);g.lineTo(-34,-96);g.stroke();
  g.beginPath();g.moveTo(34,-4);g.lineTo(58,-70);g.stroke();
  g.fillStyle='rgba(222,212,186,.78)';
  g.beginPath();g.moveTo(-34,-92);g.quadraticCurveTo(-8,-84+Math.sin(t*1.7)*3,-12,-52);g.lineTo(-24,-44);g.lineTo(-33,-56);g.closePath();g.fill();
  g.strokeStyle='rgba(60,44,24,.6)';g.lineWidth=1.2;g.stroke();
  // nome sulla fiancata
  g.fillStyle='rgba(235,225,190,.85)';g.font='900 14px Nunito,Arial';g.textAlign='center';g.fillText('GABBIANO',6,14);
  // lanterne: verdi finche' la nave e' tormentata, calde dopo il quaderno
  const warm=V&&V.flags.book,lx=[[-70,-4],[88,-2]];
  for(const[a,b]of lx){
    const f=.8+.2*Math.sin(t*4+a);
    const rg=g.createRadialGradient(a,b-20,2,a,b-20,warm?60:46);rg.addColorStop(0,warm?'rgba(255,214,120,'+(.75*f)+')':'rgba(140,255,210,'+(.6*f)+')');rg.addColorStop(1,'rgba(0,0,0,0)');
    g.save();g.globalCompositeOperation='lighter';g.fillStyle=rg;g.fillRect(a-70,b-90,140,140);g.restore();
    g.fillStyle='#2a1a0e';g.fillRect(a-3,b-26,6,10);g.fillStyle=warm?'#ffd45a':'#9fe8d0';g.fillRect(a-2,b-25,4,7);
  }
  g.restore();
}

/* faro e molo dell'isola di Giacomo */
function lighthouse(){
  if(V.LH)return V.LH;
  // trova la costa est dell'isola, alla quota del molo
  const ty=51;let cx=20;
  for(let x=30;x>=2;x--){if(!seaT[tIdx(x,ty)]){cx=x+1;break}}
  return V.LH={coast:cx,ty};
}
function drawLighthouse(g,t){
  const L=lighthouse();
  const bx=(L.coast-3.6)*T,by=(L.ty-3.1)*T;
  // molo (parte da riva verso est)
  const x0=(L.coast-.4)*T,y0=(L.ty-.45)*T,w=4.6*T,h=.9*T;
  g.save();
  const pm=mzn('pontile');
  if(pm){const ww=w/.88,hh=ww*pm.naturalHeight/pm.naturalWidth;g.drawImage(pm,x0+w/2-ww/2,y0+h/2-hh/2,ww,hh)}else{
  g.fillStyle='rgba(6,40,60,.28)';g.fillRect(x0+8,y0+h+8,w,10);
  for(let i=0;i<Math.ceil(w/13);i++){const x=x0+i*13;g.fillStyle=i%2?'#a97c4a':'#b88a55';g.fillRect(x,y0,12.6,h);g.strokeStyle='rgba(50,26,10,.6)';g.lineWidth=1;g.strokeRect(x,y0,12.6,h)}
  g.fillStyle='#6a3e1c';g.fillRect(x0,y0-4,w,5);g.fillRect(x0,y0+h-1,w,5);
  for(let i=0;i<4;i++){const x=x0+12+i*(w-24)/3;for(const y of[y0-6,y0+h+6]){g.fillStyle='#3a200c';g.beginPath();g.arc(x,y,6,0,7);g.fill();g.fillStyle='#8a5a30';g.beginPath();g.arc(x-1,y-1,3.6,0,7);g.fill()}}
  }
  // torre a strisce
  g.translate(bx,by);
  g.fillStyle='rgba(10,24,16,.28)';g.beginPath();g.ellipse(14,6,56,16,0,0,7);g.fill();
  const tw=g.createLinearGradient(-26,0,26,0);tw.addColorStop(0,'#d9cfb4');tw.addColorStop(.5,'#f4ecd4');tw.addColorStop(1,'#bfb394');
  g.fillStyle=tw;g.strokeStyle='#3a2a18';g.lineWidth=2.4;
  g.beginPath();g.moveTo(-30,0);g.lineTo(-20,-150);g.lineTo(20,-150);g.lineTo(30,0);g.closePath();g.fill();g.stroke();
  g.save();g.beginPath();g.moveTo(-30,0);g.lineTo(-20,-150);g.lineTo(20,-150);g.lineTo(30,0);g.closePath();g.clip();
  g.fillStyle='#b4382a';for(const yy of[-30,-82,-134])g.fillRect(-34,yy-14,68,24);g.restore();
  g.fillStyle='#4a3420';g.fillRect(-9,-24,18,24);g.fillStyle='#ffd45a';g.fillRect(-5,-50,10,12);
  // lanterna
  g.fillStyle='#2a2018';g.fillRect(-24,-158,48,10);g.fillStyle='#3a2a1c';g.beginPath();g.moveTo(-22,-190);g.lineTo(0,-212);g.lineTo(22,-190);g.closePath();g.fill();
  g.fillStyle='rgba(255,236,170,.95)';g.fillRect(-18,-190,36,34);g.strokeStyle='#2a2018';g.lineWidth=2;g.strokeRect(-18,-190,36,34);
  g.restore();
  // luce e fascio rotante (al buio)
  const ly=by-172,lxp=bx;
  g.save();g.globalCompositeOperation='lighter';
  const f=.9+.1*Math.sin(t*5);
  let rg=g.createRadialGradient(lxp,ly,6,lxp,ly,260);rg.addColorStop(0,'rgba(255,230,150,'+(.8*f)+')');rg.addColorStop(1,'rgba(255,200,90,0)');
  g.fillStyle=rg;g.fillRect(lxp-260,ly-260,520,520);
  const a=t*.9;
  for(let k=0;k<2;k++){
    const an=a+k*Math.PI;g.save();g.translate(lxp,ly);g.rotate(an);
    const bm=g.createLinearGradient(0,0,1500,0);bm.addColorStop(0,'rgba(255,236,170,.5)');bm.addColorStop(1,'rgba(255,236,170,0)');
    g.fillStyle=bm;g.beginPath();g.moveTo(0,-6);g.lineTo(1500,-70);g.lineTo(1500,70);g.lineTo(0,6);g.closePath();g.fill();g.restore();
  }
  g.restore();
}
function drawGiacomo(g,t){
  const L=lighthouse(),x=(L.coast+2.7)*T,y=(L.ty+.3)*T;
  if(Math.hypot(C.p.x-x,C.p.y-y)>2200)return;
  g.save();
  drawChar(g,x,y,{k:CH.giacomo,dir:'f',flip:true,t,walk:0,moving:false,look:0});
  // lanterna in mano
  const f=.85+.15*Math.sin(t*6),rg=g.createRadialGradient(x-20,y-22,2,x-20,y-22,54);
  rg.addColorStop(0,'rgba(255,220,130,'+(.8*f)+')');rg.addColorStop(1,'rgba(255,200,90,0)');
  g.globalCompositeOperation='lighter';g.fillStyle=rg;g.fillRect(x-80,y-80,120,120);g.globalCompositeOperation='source-over';
  g.font='800 12px Nunito,Arial';g.textAlign='center';g.lineWidth=3.2;g.strokeStyle='rgba(30,16,6,.85)';g.fillStyle='#fff6dc';g.strokeText('Giacomo',x,y-88);g.fillText('Giacomo',x,y-88);
  g.restore();
}

/* ---------- disegno ---------- */
function voyFloor(g,t){
  if(!V||!C)return;
  const z=camZoom(),hw=VW/2/z+320,hh=VH/2/z+320,cx=cam.x,cy=cam.y;
  const vis=(x,y,r)=>Math.abs(x-cx)<hw+(r||0)&&Math.abs(y-cy)<hh+(r||0);
  for(const w of V.W.weeds){if(!vis(w.x,w.y,w.r))continue;drawSp(g,weedSpr(w.v),w.x+Math.sin(t*.5+w.ph)*5,w.y+Math.cos(t*.4+w.ph)*3,w.r/250,.92)}
  for(const v of V.W.vort){if(vis(v.x,v.y,260))drawVortex(g,v,t)}
  for(const d of V.W.deb){if(vis(d.x,d.y,60))drawDebris(g,d,t)}
  const wx=LEGS.find(l=>l.k==='wreck');if(wx&&vis(wx.x*T,wx.y*T,320))drawWreck(g,wx.x*T,wx.y*T,t);
  V.W.buoys.forEach((b,i)=>{if(vis(b.x,b.y,80))drawBuoy(g,b.x,b.y,t,V.lit(i),i)});
  // boe e faro di Giacomo si vedono solo vicino
  if(vis((lighthouse().coast)*T,lighthouse().ty*T,1800)){drawLighthouse(g,t);drawGiacomo(g,t)}
}
function voyFx(g,t){
  if(!V||!C)return;
  // avvisi dei fulmini
  for(const q of V.warn){
    const k=q.t/q.dur,r=110;
    g.save();g.translate(q.x,q.y);g.scale(1,.78);
    g.fillStyle='rgba(255,70,50,'+(.08+.18*Math.abs(Math.sin(q.t*9))).toFixed(2)+')';g.beginPath();g.arc(0,0,r,0,7);g.fill();
    g.strokeStyle='rgba(255,236,220,.85)';g.lineWidth=2.4;g.beginPath();g.arc(0,0,r,0,7);g.stroke();
    g.strokeStyle='rgba(255,90,60,.95)';g.lineWidth=3;g.beginPath();g.arc(0,0,r*(1-k),0,7);g.stroke();g.restore();
  }
  // luminescenza nella scia (mare della Stella)
  if(V.glow.length){g.save();g.globalCompositeOperation='lighter';
    for(const q of V.glow){const a=Math.max(0,1-q.t/q.life);const rg=g.createRadialGradient(q.x,q.y,0,q.x,q.y,q.r);rg.addColorStop(0,'rgba(120,230,255,'+(.55*a)+')');rg.addColorStop(1,'rgba(60,160,255,0)');g.fillStyle=rg;g.fillRect(q.x-q.r,q.y-q.r,q.r*2,q.r*2)}
    g.restore()}
  // anello sulla meta (solo dove non e' nebbia)
  const L=LEGS[V.leg];
  if(L&&V.zi!==3){const x=L.x*T,y=L.y*T,pul=.5+.5*Math.sin(t*3);g.save();g.translate(x,y);g.scale(1,.7);
    g.strokeStyle='rgba(255,226,120,'+(.45+.3*pul)+')';g.lineWidth=4;g.setLineDash([16,12]);g.lineDashOffset=-t*26;g.beginPath();g.arc(0,0,190,0,7);g.stroke();g.restore()}
}
function toS(x,y){return toScreen(x,y)}
function voyOverlay(g,w,h){
  if(!V||!C)return;
  const tn=V.tint;
  if(tn[3]>.005){g.fillStyle='rgba('+(tn[0]|0)+','+(tn[1]|0)+','+(tn[2]|0)+','+tn[3].toFixed(3)+')';g.fillRect(0,0,w,h)}
  const p=C.p,[px,py]=toS(p.x,p.y),z=camZoom();
  // nebbia: densa tutt'intorno, tranne un cerchio attorno alla nave
  if(V.fog>.02){
    const vis=(V.scout>0?980:480)*z,f=V.fog;
    const rg=g.createRadialGradient(px,py,vis*.32,px,py,vis*1.15);
    rg.addColorStop(0,'rgba(220,229,236,0)');rg.addColorStop(.45,'rgba(220,229,236,'+(.72*f)+')');rg.addColorStop(1,'rgba(214,224,233,'+(.97*f)+')');
    g.fillStyle=rg;g.fillRect(0,0,w,h);
    // banchi di nebbia che scorrono
    g.save();g.globalAlpha=.16*f;g.fillStyle='#eaf1f6';
    for(let i=0;i<6;i++){const x=((i*337+V.t*(14+i*3))%(w+500))-250,y=(i*173)%h;g.beginPath();g.ellipse(x,y,260,46,0,0,7);g.fill()}
    g.restore();
  }
  // bordi del mare: una foschia che si infittisce, cosi' il confine si vede
  {
    const night=(S.tod<5.5||S.tod>20.5),col=night?'18,30,52':'205,219,231',B=15*T,sides=[];
    const sx0=toS(0,p.y)[0],sx1=toS(WW,p.y)[0],sy0=toS(p.x,0)[1],sy1=toS(p.x,WH)[1],bw=B*z;
    if(sx0>-bw)sides.push([0,0,Math.min(w,sx0+bw*.35),h,sx0,sx0+bw,0]);
    if(sx1<w+bw)sides.push([Math.max(0,sx1-bw*.35),0,w,h,sx1,sx1-bw,0]);
    if(sy0>-bw)sides.push([0,0,w,Math.min(h,sy0+bw*.35),sy0,sy0+bw,1]);
    if(sy1<h+bw)sides.push([0,Math.max(0,sy1-bw*.35),w,h,sy1,sy1-bw,1]);
    for(const s of sides){
      const gr=s[6]?g.createLinearGradient(0,s[4],0,s[5]):g.createLinearGradient(s[4],0,s[5],0);
      gr.addColorStop(0,'rgba('+col+',.94)');gr.addColorStop(.35,'rgba('+col+',.78)');gr.addColorStop(1,'rgba('+col+',0)');
      g.save();g.beginPath();g.rect(0,0,w,h);g.clip();g.fillStyle=gr;
      if(s[6]){g.fillRect(0,Math.min(s[4],s[5])-4,w,Math.abs(s[5]-s[4])+8)}else{g.fillRect(Math.min(s[4],s[5])-4,0,Math.abs(s[5]-s[4])+8,h)}
      g.restore();
    }
  }
  // luci delle boe accese e della prossima
  if(V.zi===3||V.zi===4){
    g.save();g.globalCompositeOperation='lighter';
    V.W.buoys.forEach((b,i)=>{
      const lit=V.lit(i),nx=(BU0+i)===V.leg,[sx,sy]=toS(b.x,b.y-40);
      const d=Math.hypot(b.x-p.x,b.y-p.y);
      let a=0;
      if(lit)a=d<2400?.85:0;else if(nx)a=V.scout>0?1:d<1000?Math.min(.9,(1000-d)/500):0;
      if(a<=.02)return;
      const f=.8+.2*Math.sin(V.t*5+i),r=(lit?58:70)*z*(nx?1.2:1);
      const rg=g.createRadialGradient(sx,sy,2,sx,sy,r);rg.addColorStop(0,'rgba(255,224,130,'+(a*f)+')');rg.addColorStop(1,'rgba(255,190,70,0)');
      g.fillStyle=rg;g.fillRect(sx-r,sy-r,r*2,r*2);
    });
    g.restore();
  }
  // freccia verso la meta se e' fuori schermo (non nella nebbia, salvo perlustrazione)
  const L=LEGS[V.leg];
  if(L&&(V.zi!==3||V.scout>0)){
    const [sx,sy]=toS(L.x*T,L.y*T);
    if(!(sx>40&&sx<w-40&&sy>60&&sy<h-40)){
      const a=Math.atan2(sy-h/2,sx-w/2),ex=cl(w/2+Math.cos(a)*(w/2-34),34,w-34),ey=cl(h/2+Math.sin(a)*(h/2-34),66,h-34);
      g.save();g.translate(ex,ey);g.rotate(a);g.fillStyle='#ffd23a';g.strokeStyle='#2a1a0e';g.lineWidth=2.5;g.beginPath();g.moveTo(16,0);g.lineTo(-9,-10);g.lineTo(-9,10);g.closePath();g.fill();g.stroke();g.restore();
    }
  }
  // la stella bassa, sull'orizzonte a ovest
  if(V.star>.02){
    const sx=w*.065,sy=h*.30+Math.sin(V.t*.3)*4,f=.8+.2*Math.sin(V.t*2.3),a=V.star;
    g.save();g.globalCompositeOperation='lighter';
    let rg=g.createRadialGradient(sx,sy,2,sx,sy,90);rg.addColorStop(0,'rgba(190,230,255,'+(.6*a*f)+')');rg.addColorStop(1,'rgba(120,180,255,0)');g.fillStyle=rg;g.fillRect(sx-90,sy-90,180,180);
    g.strokeStyle='rgba(235,248,255,'+(.95*a)+')';g.lineWidth=2.4;g.lineCap='round';
    g.beginPath();g.moveTo(sx-26*f,sy);g.lineTo(sx+26*f,sy);g.moveTo(sx,sy-34*f);g.lineTo(sx,sy+34*f);g.stroke();
    g.lineWidth=1.4;g.beginPath();g.moveTo(sx-13,sy-13);g.lineTo(sx+13,sy+13);g.moveTo(sx+13,sy-13);g.lineTo(sx-13,sy+13);g.stroke();
    g.fillStyle='rgba(255,255,255,'+a+')';g.beginPath();g.arc(sx,sy,4,0,7);g.fill();
    g.restore();
  }
}
function voyMini(c,p,sc){
  if(V.fog>.05){const rg=c.createRadialGradient(0,0,24,0,0,104);rg.addColorStop(0,'rgba(190,206,220,0)');rg.addColorStop(.6,'rgba(190,206,220,'+(.82*V.fog)+')');rg.addColorStop(1,'rgba(186,202,218,'+(.97*V.fog)+')');c.fillStyle=rg;c.fillRect(-112,-112,224,224)}
  const L=LEGS[V.leg];if(!L)return;
  const tx=L.x*T,ty=L.y*T,dist=Math.hypot(tx-p.x,ty-p.y);
  if(V.zi===3&&!(V.scout>0)&&dist>1500)return;
  // boe accese
  V.W.buoys.forEach((b,i)=>{if(!V.lit(i))return;c.fillStyle='#ffd45a';c.beginPath();c.arc((b.x-p.x)*sc,(b.y-p.y)*sc,3.2,0,7);c.fill()});
  let dx=(tx-p.x)*sc,dy=(ty-p.y)*sc;const d=Math.hypot(dx,dy),far=d>98;
  if(far){dx=dx/d*98;dy=dy/d*98}
  c.save();c.translate(dx,dy);
  if(far){const an=Math.atan2(dy,dx);c.rotate(an);c.fillStyle='#ffd23a';c.beginPath();c.moveTo(13,0);c.lineTo(3,-7);c.lineTo(3,7);c.closePath();c.fill();c.rotate(-an)}
  c.fillStyle='#3a2410';c.strokeStyle='#ffd23a';c.lineWidth=2.5;c.beginPath();c.arc(0,0,8,0,7);c.fill();c.stroke();
  c.fillStyle='#ffd23a';c.font='900 11px Nunito,Arial';c.textAlign='center';c.fillText(L.k==='dock'?'⚓':'✕',0,4);c.restore();
}

/* ---------- stato, salvataggio, avvio ---------- */
function saveV(done){
  if(!V)return;
  KS(VKEY,{cpz:V.cpz,leg:V.leg,silver:C?C.silver:0,flags:V.flags,done:!!(done||V.doneBefore),t:Math.round(V.tAll||0)});
}
function newVoy(sv){
  const fresh=!sv||sv.fresh||sv.done;
  V={t:0,tAll:fresh?0:(sv.t||0),leg:0,cpz:0,zi:0,tod:VZ[0].tod,fog:0,tint:VZ[0].tint.slice(),star:0,row:0,rowCd:0,scout:0,scoutCd:0,
     flags:{},warn:[],glow:[],boltT:3,patrolT:-1,crateT:20,xmsg:0,busy:false,over:false,ghost:null,notes:{},doneBefore:!!(sv&&sv.done),
     lit:i=>(BU0+i)<V.leg};
  V.W=voyWorld();
  let cz=0,leg=0;
  if(!fresh){cz=cl(sv.cpz|0,0,5);leg=Math.max(firstLeg(cz),sv.leg|0);V.flags=sv.flags||{}}
  V.cpz=cz;V.zi=cz;V.leg=leg;V.tod=VZ[cz].tod;V.tint=VZ[cz].tint.slice();V.fog=VZ[cz].fog;
  S.tod=VZ[cz].tod%24;
  C={plan:Object.assign({},PLAN0),easy:true,t:0,p:null,ships:[],balls:[],crates:[],fx:[],silver:(sv&&sv.silver)||0,pris:2,sail:2,kills:0,sunkSilver:0,shots:0,hits:0,lost:0,ended:false,wind:Math.PI,notes:{},escapes:0,pend:[],fireQ:0,over:false,ramCd:0,convoy:false,tut:null};
  const c=CPS[cz];
  const yd5=YD.get();C.sailK=YD.sailK(yd5.s);C.p=mkShip('sirena',c[0]*T,c[1]*T,Math.PI,{hull:8+yd5.h,max:8+yd5.h});C.p.isP=true;
  if(!clearAt(C.p.x,C.p.y,60)){const r=findSea(C.p.x,C.p.y);C.p.x=r[0];C.p.y=r[1]}
  P.x=C.p.x;P.y=C.p.y;P.hd=C.p.hd;P.mode='raft';cam.x=P.x;cam.y=P.y;
  WX.i=VZ[cz].wx;S.wx.k=WX.i>.8?'storm':WX.i>.05?'rain':'clear';S.wx.t=1e9;
  if(cz===5)V.star=1;
  return fresh;
}
const INTRO=()=>[
 D('hero',"L'argento è nella stiva, Pip e Dodo sono a bordo. Il convoglio spagnolo ci darà la caccia per tutto il mare che conosciamo."),
 D('tito',"Allora andiamo dove non ci cerca nessuno. Capitano, che rotta?"),
 D('hero',"Ovest. Il biglietto di Giacomo diceva: «Cerca la stella bassa a ovest». Le carte del galeone finiscono dove finisce l'inchiostro."),
 D('nives',"E dopo l'inchiostro?"),
 D('biscotto',"Cra! Acqua! Tanta! Quasi tutta!"),
 D('dodo',"Cinque mari che nessuno ha disegnato. Io preparo la zuppa: in viaggio serve."),
 D('pip',"Io faccio la vedetta! Dico io quando vedo la stella!"),
 D('hero',"Due mari li conosciamo già. Con questi cinque, fanno sette. Si salpa.")
];
function voyBoot(){
  voyChars();
  const sv=KG(VKEY);
  const fresh=newVoy(sv);
  sailUI();
  // controlli aggiuntivi
  {const top=$('c3top');if(top&&top.children[2])top.children[2].style.display='none';
   if(!$('c3zn')){const z=document.createElement('div');z.className='pl';z.id='c3zn';$('c3').appendChild(z)}
   const o=$('c3obj');if(o)o.style.top='46px'}
  document.body.classList.add('vy');
  setTimeout(()=>{
    if(fresh){UI.dlg(INTRO(),()=>{UI.banner('Il grande viaggio','Capitolo 4');V.patrolT=7;C.notes.start=1})}
    else{UI.banner(VZ[V.zi].n,VZ[V.zi].sub);if(V.zi===0)V.patrolT=7;if(V.zi===4&&!V.flags.book)spawnGhost()}
  },700);
}
function voyAPI(){return{get V(){return V},get C(){return C},LEGS,VZ,CPS,XLIM,enterZone,reachLeg,lighthouse,voyStep,saveV,inWeed,newVoy,voyAct,shipOK,seaOK,clearAt,toScreen,elev,seaFreePx,blockT,seaT,elevT,WL,MW,MH,TS}}

/* ---------- zone ---------- */
function enterZone(z,silent){
  V.zi=z;V.cpz=Math.max(V.cpz,z);
  if(!silent){UI.banner(VZ[z].n,VZ[z].sub);sfx('quest')}
  saveV();
  if(z>=1){for(const s of C.ships)if(s.type==='pattuglia')s.dead=true}
  // casse di legno lungo la tratta
  for(let i=0;i<3;i++){
    const L=LEGS[(V.leg+i)];if(!L)break;
    let x=L.x*T+rr(-220,220),y=L.y*T+rr(-200,200);
    if(!clearAt(x,y,50)){const r=findSea(x,y);x=r[0];y=r[1]}
    C.crates.push({x,y,t:rr(0,9),v:'food'});
  }
  if(silent)return;
  if(z===1){
    setTimeout(()=>{say('Biscotto','Il vento è morto, capitano! Niente di niente. Si vola solo con le ali, e io ho le mie.',6200);
      setTimeout(()=>say('Nives','Remi in acqua! Tocca «Voga!» quando serve: la nave scatta, poi riprende fiato.',6200),6600)},1500);
  }else if(z===2){
    setTimeout(()=>{say('Tito','Capitano! I cerchi rossi sono lampi che stanno per cadere. Le spirali sono gorghi: girali alla larga!',7000)},1800);
  }else if(z===3){
    UI.dlg([D('pip',"Capitano, una luce dorata nella nebbia... una boa! Con una J dipinta."),D('hero',"Giacomo è passato di qui. Ha lasciato una strada di luci."),D('biscotto',"Se non vedi la prossima, tocca «Perlustra»: io volo avanti a cercarla.")]);
  }else if(z===4){
    spawnGhost();
    UI.dlg([D('tito',"Capitano... quella nave. Non ha nessuno al timone. Eppure ci sta seguendo."),D('biscotto',"Cra... non mi piace. Non mi piace per niente."),D('hero',"Sul fianco c'è scritto qualcosa. Cerchiamo il relitto più grande: qui c'è una storia.")]);
  }else if(z===5){
    V.star=.01;
    UI.dlg([D('pip',"LA VEDO! Là, bassissima, sul bordo del mare!"),D('hero',"È la stella di Giacomo. Seguiamola.")]);
  }
}
function reachLeg(){
  const L=LEGS[V.leg];if(!L)return;
  if(L.k==='wreck'){return wreckScene()}
  if(L.k==='dock'){return finale()}
  if(L.k==='buoy'){sfx('coin');toast('Boa '+(V.leg-BU0+1)+'/'+NB+': la luce di Giacomo è accesa',2400)}
  else sfx('ok');
  V.leg++;
  const n=LEGS[V.leg];
  if(L.gate&&n&&n.z!==V.zi){
    if(L.z===3){UI.dlg([D('hero',"La nebbia si apre di colpo. Sopra di noi, la notte. E sul mare, pezzi di navi."),D('tito',"Capitano, io i relitti li conto. Ne ho già contati troppi.")])}
    enterZone(n.z);
  }else if(L.z===0&&!L.gate&&!V.notes.l0){V.notes.l0=1}
  saveV();
}
function wreckScene(){
  if(V.busy)return;V.busy=true;
  const L=[
   D('hero',"Sul fianco di una nave spezzata, una scritta consumata dal sale: «GABBIANO»."),
   D('tito',"Il Gabbiano... la nave di cui parlava Ferro? Quella con trenta uomini?"),
   D('hero',"In cabina c'è il giornale di bordo. L'ultima pagina è una lista: trenta nomi."),
   D('hero',"Otto hanno un segno accanto. Gli altri ventidue, una riga nera."),
   D('nives',"Otto posti sulla scialuppa. Otto nomi salvati. Gli altri...?"),
   D('hero',"Ferro non ha perso il suo equipaggio. Lo ha scelto. E questi ventidue sono rimasti qui, a cercare il proprio nome."),
   D('hero',"Li leggo ad alta voce. Uno per uno. Qualcuno doveva farlo."),
   D('biscotto',"Cra... (sottovoce) ...grazie. Da parte loro."),
   D('hero',"Le lanterne del Gabbiano si accendono, calde. La nave fantasma si ferma. Poi, piano, si scioglie nella luce.")
  ];
  UI.dlg(L,()=>{
    V.flags.book=1;V.busy=false;
    if(V.ghost&&!V.ghost.dead)V.ghost.fade=0;
    sfx('quest');
    V.leg++;saveV();
    setTimeout(()=>say('Pip','Capitano, le lanterne indicano ovest! Guardale, tutte dalla stessa parte!',6000),1400);
  });
}
function finale(){
  if(V.busy||V.over)return;V.busy=true;
  const L=[
   D('hero',"Un faro. E in fondo al molo, una lanterna che oscilla. Qualcuno ci aspetta."),
   D('giacomo',"Hai portato la Sirena fin qui. Allora il biglietto è finito in mani giuste."),
   D('hero',"Giacomo Marrone...?"),
   D('giacomo',"Solo Giacomo. Il «capitano» l'ho lasciato sul tuo ponte, e sembra stargli bene."),
   D('tito',"Ma lei... Ferro diceva che..."),
   D('giacomo',"Che ero finito in fondo al mare? Era la storia più comoda. Ferro conta i posti, non le persone: lo sa bene chi ha letto il quaderno."),
   D('hero',"L'abbiamo letto. Nel Mare dei Relitti. Ventidue nomi."),
   D('giacomo',"Allora hai fatto ciò che io non ho avuto il coraggio di fare. Hanno finalmente riposo."),
   D('giacomo',"Le boe nella nebbia le ho posate io, una per una, sperando che qualcuno prima o poi le seguisse. Sette mari, ragazzi: avete attraversato anche quelli che non c'erano."),
   D('dodo',"Io ho una pentola di zuppa e una nave piena. Si mangia?"),
   D('giacomo',"Si mangia. Poi ti mostro una carta, capitano: il mare non finisce qui.")
  ];
  UI.dlg(L,()=>voyEnd());
}
function voyEnd(){
  V.over=true;V.busy=false;C.over=true;
  saveV(true);
  try{localStorage.setItem('sm_c5done','1')}catch(e){}
  const m=Math.floor((V.tAll+V.t)/60),s=Math.floor((V.tAll+V.t)%60);
  $('endCard').innerHTML='<div class="seas"><b>Capitolo 4</b><span>Il grande viaggio</span></div><h2>La stella bassa</h2><p>Cinque mari ignoti, ventidue nomi letti ad alta voce e un faro acceso. Giacomo ti aspettava davvero.</p><div class="stats"><div><b>5/5</b>mari attraversati</div><div><b>'+Math.max(0,Math.round(C.p.hull/C.p.max*100))+'%</b>scafo rimasto</div><div><b>'+C.silver+'</b>casse d\'argento</div><div><b>'+m+':'+(s<10?'0':'')+s+'</b>tempo</div></div><p class="sm">Sulla linea dell\'orizzonte, a est, c\'è una vela. Una sola. Troppo lontana per riconoscerla.</p><div class="row"><button class="btn gold" id="eGo">Rifai il viaggio</button></div>';
  {const h=document.createElement('button');h.className='lnk';h.textContent='Torna al gioco';h.style.cssText='display:block;margin:10px auto 0';h.onclick=()=>{try{history.replaceState(null,'',location.pathname)}catch(e){}location.reload()};$('endCard').appendChild(h)}
  $('endCard').querySelector('#eGo').onclick=()=>{KS(VKEY,{fresh:1,done:true,silver:0});location.reload()};
  uShow('endcard',true);sfx('quest');
}
function spawnGhost(){
  if(V.ghost&&!V.ghost.dead)return;
  const p=C.p;let x=p.x+1500,y=p.y-500;
  if(!clearAt(x,y,100)){const r=findSea(x,y);x=r[0];y=r[1]}
  const g=mkShip('fantasma',x,y,Math.PI,{hostile:true});C.ships.push(g);V.ghost=g;
  if(!V.notes.ghostJ0){V.notes.ghostJ0=1;setTimeout(()=>{if(V&&!V.over&&!V.busy)say('Biscotto',"Cra! Capitano, dietro di noi c'è una barca con le alghe in testa. Forse è solo in ritardo col bucato.",6200)},9000)}
}
const GHOST_JOKES=['Cra! Una nave con le alghe addosso. Neanche io mi conciavo così dopo il bagno.','Cra! Se ci insegue per l\'argento, è arrivata tardi: anche i fantasmi pagano il pedaggio.','Cra! Capitano, non guardarla negli occhi. Ah no, non ne ha. Meglio.','Cra! Scommetto che è una ex nave da crociera. Ha ancora il buffet.','Cra! Io non ho paura. Sono solo molto, molto concentrato sulle mie piume.','Cra! Dì la verità: è la tua ex nave. Ritorna sempre quando meno te lo aspetti.','Cra! Un fantasma! Finalmente qualcuno con meno scafo di me.'];
function voyGhostAI(s,dt,dp){
  const p=C.p;
  if(s.fade!=null){s.fade+=dt*.3;s.v*=.96;if(s.fade>=1){s.dead=true;s.sinking=false}return}
  if(V.busy)return;
  if(s.gh==null)s.gh=1;
  // sparita: dopo qualche secondo ricompare lontano, dietro la scia
  if(s.gone>0){s.gone-=dt;s.gh=0;if(s.gone<=0){const Lg=LEGS[V.leg],ag=Lg?Math.atan2(Lg.y*T-p.y,Lg.x*T-p.x):Math.PI;let x=p.x-Math.cos(ag)*rr(850,1100)+rr(-200,200),y=p.y-Math.sin(ag)*rr(850,1100)+rr(-200,200);if(!clearAt(x,y,100)){const r=findSea(x,y);x=r[0];y=r[1]}s.x=x;s.y=y;s.hd=Math.atan2(p.y-y,p.x-x);s.v=0;const n=V.notes.gj=(V.notes.gj||0)+1;if(n%2===1)setTimeout(()=>{if(V&&!V.over&&!V.busy)say('Biscotto',GHOST_JOKES[((n-1)/2)%GHOST_JOKES.length|0],5400)},2500)}return}
  // se la prua del giocatore punta verso di lei, la nave si dissolve: poi la si attraversa e sparisce
  const look=Math.abs(angD(p.hd,Math.atan2(s.y-p.y,s.x-p.x))),seen=look<.9&&dp<1150;
  if(seen){
    s.gh-=dt*(dp<260?.9:.4);
    if(!V.notes.ghostSee){V.notes.ghostSee=1;say('Pip','Capitano, guarda! Una nave... sta sparendo! Si vede attraverso!',5200);setTimeout(()=>say('Biscotto','Cra! Trasparente! Il sogno di ogni pappagallo a dieta.',4800),5600)}
    if(s.gh<=.05){s.gone=rr(6,9);s.gh=0;for(let i=0;i<8;i++)C.fx.push({k:'puff',x:s.x+rr(-50,50),y:s.y+rr(-30,30),r:rr(10,18),t:0,life:1.6,vx:rr(-14,14),vy:rr(-24,-6)});if(!V.notes.ghostGone){V.notes.ghostGone=1;say('Tito','Svanita nel nulla. Ma tornerà: ci segue da quando siamo entrati.',5600);setTimeout(()=>say('Biscotto','Cra! Sparita! Maleducata: non ha nemmeno salutato.',4800),6200)}return}
  }else s.gh=Math.min(1,s.gh+dt*.22);
  // ci insegue: resta dietro, mai troppo vicina, mai troppo lontana
  const sp0=SPEC.fantasma,want=Math.atan2(p.y-s.y,p.x-s.x),D0=560;
  s.hd+=cl(angD(s.hd,want),-1,1)*1.05*dt;s.hd=avoid(s,s.hd);
  moveShip(s,dt,sp0.spd*(dp>D0+250?1.35:dp>D0?1:dp<D0-160?.25:.6));
}
function voyGhostHit(s,n){
  s.flash=.2;
  if(!V.notes.ghostHit){V.notes.ghostHit=1;say('Tito','Le palle ci passano attraverso! Non si affonda un fantasma, capitano. Bisogna capire cosa vuole.',6500)}
  for(let i=0;i<4;i++)C.fx.push({k:'puff',x:s.x+rr(-30,30),y:s.y+rr(-20,20),r:rr(8,14),t:0,life:1.2,vx:rr(-14,14),vy:rr(-24,-6)});
}
function voyRespawn(){
  const p=C.p,c=CPS[V.zi];
  p.hull=p.max;p.x=c[0]*T;p.y=c[1]*T;p.v=0;p.hd=Math.PI;p.dead=false;p.sinking=false;p.sink=0;
  if(!clearAt(p.x,p.y,60)){const r=findSea(p.x,p.y);p.x=r[0];p.y=r[1]}
  C.balls.length=0;V.warn.length=0;
  if(V.ghost&&!V.ghost.dead&&V.ghost.fade==null){V.ghost.x=p.x+1600;V.ghost.y=p.y-500;if(!clearAt(V.ghost.x,V.ghost.y,100)){const r=findSea(V.ghost.x,V.ghost.y);V.ghost.x=r[0];V.ghost.y=r[1]}}
  cam.x=p.x;cam.y=p.y;
  toast('Affondata! Dodo ti ripesca e ti riporta all\'inizio del mare: lo scafo è come nuovo.',5500);
}

/* ---------- ciclo di gioco ---------- */
function voyTv(tv,go,dt){
  const E=VZ[V.zi];
  let k=E.spd;
  const wd=inWeed(C.p);
  if(wd){k*=.72;if(!V.notes.weed){V.notes.weed=1;say('Pip','I sargassi si attaccano allo scafo! Giriamo al largo, capitano.',5200)}}
  tv*=k*.9;
  if(V.row>0)tv=Math.max(tv,wd?138:168);
  return tv;
}
function voyAct(){
  if(!V||V.over||V.busy||PAUSED||dl.open)return;
  if(V.zi===1&&V.rowCd<=0){V.row=4.2;V.rowCd=5.5;sfx('tap');if(AU.ctx&&AU.on)noiseBurst(.12,900,.2)}
  else if(V.zi===3&&V.scoutCd<=0){
    V.scout=6;V.scoutCd=15;sfx('cra');
    const L=LEGS[V.leg],p=C.p;
    if(L)parSay('Cra! Là: una luce dorata, '+dirName(L.x*T-p.x,L.y*T-p.y)+'! Circa '+Math.round(Math.hypot(L.x*T-p.x,L.y*T-p.y)/44)+' caselle.',5600);
  }
}
function objText(){
  const L=LEGS[V.leg];if(!L)return '';
  if(L.k==='buoy')return BUOY_T+' ('+(V.leg-BU0+1)+'/'+NB+')';
  if(L.k==='wreck'&&V.flags.book)return 'Prosegui verso ovest';
  return L.t;
}
function voySlide(s,dt){
  const d=Math.max(s.v,50)*dt*.85;
  for(const a of[.4,-.4,.8,-.8,1.25,-1.25]){
    const h=s.hd+a,nx=s.x+Math.cos(h)*d,ny=s.y+Math.sin(h)*d;
    if(shipOK(s,nx,ny,s.hd)){s.x=nx;s.y=ny;s.v*=Math.max(.9,1-dt*1.5);return true}
  }
  return false;
}
function voyHud(){
  if(!V)return;
  $('c3obj').textContent=V.over?'':objText();
  const zn=$('c3zn');if(zn){const t=VZ[V.zi].n+(V.zi>0?' · '+V.zi+'/5':'');if(zn.textContent!==t)zn.textContent=t}
  const b=$('c3act');if(!b)return;
  const show=(V.zi===1||V.zi===3)&&!V.over;
  b.style.display=show?'flex':'none';
  if(show){
    const cd=V.zi===1?V.rowCd:V.scoutCd,lab=V.zi===1?'Voga!':'🦜 Perlustra';
    const t=lab+(cd>0?'<small>'+Math.ceil(cd)+' s</small>':'<small>'+(V.zi===1?'remi':'cerca la boa')+'</small>');
    if(b.dataset.h!==t){b.dataset.h=t;b.innerHTML=t}
    b.disabled=cd>0;
  }
}
function voyHint(){
  const p=C.p,L=LEGS[V.leg];
  if(p.hull<=p.max*.4)return 'Lo scafo scricchiola! Raccogli le casse di legno che galleggiano: riparano.';
  const cr=C.crates.find(c=>Math.hypot(c.x-p.x,c.y-p.y)<900);if(cr)return 'Una cassa di legno '+dirName(cr.x-p.x,cr.y-p.y)+': ripara lo scafo.';
  if(V.zi===1)return 'Nei sargassi la nave si ferma. «Voga!» e giralo al largo dalle chiazze verdi.';
  if(V.zi===2)return 'Cerchio rosso = lampo in arrivo. Spirale = gorgo. Entrambi si schivano.';
  if(V.zi===3)return 'Se non vedi la prossima luce, tocca «Perlustra»: io volo avanti.';
  if(V.zi===4&&!V.flags.book)return 'Quel fantasma non si affonda. Cerchiamo il relitto più grande.';
  if(L)return 'La meta è '+dirName(L.x*T-p.x,L.y*T-p.y)+'. Si va a ovest, capitano!';
  return null;
}
function voyStep(dt){
  if(!V||V.over)return;
  const p=C.p,E=VZ[V.zi];
  if(p.hull<=0||p.dead){voyRespawn();return}
  V.t+=dt;
  // ambiente: ora del giorno, meteo, nebbia, tinta
  V.tod+=(E.tod-V.tod)*Math.min(1,dt*.2);S.tod=((V.tod%24)+24)%24;
  WX.i+=(E.wx-WX.i)*Math.min(1,dt*.5);if(Math.abs(E.wx-WX.i)<.004)WX.i=E.wx;
  S.wx.k=WX.i>.8?'storm':WX.i>.05?'rain':'clear';
  V.fog+=(E.fog-V.fog)*Math.min(1,dt*.6);
  for(let i=0;i<4;i++)V.tint[i]+=(E.tint[i]-V.tint[i])*Math.min(1,dt*.6);
  C.wind=Math.PI+Math.sin(V.t*.37)*E.jit+Math.sin(V.t*.91+1)*E.jit*.5;
  if(V.zi===5)V.star=Math.min(1,V.star+dt*.25);
  if(V.star>0&&V.zi===5){const L=lighthouse(),d=Math.hypot(p.x-L.coast*T,p.y-L.ty*T);if(d<1800)V.star=Math.max(0,1-(1800-d)/900)}
  // meteo: lampi, tuoni
  if(WX.flash>0)WX.flash=Math.max(0,WX.flash-dt*3.4);
  if(WX.flash2>0){WX.flash2-=dt;if(WX.flash2<=0)WX.flash=Math.max(WX.flash,.8)}
  for(const b of WX.bolts)b.t+=dt;WX.bolts=WX.bolts.filter(b=>b.t<.4);
  for(const q of WX.thunder)q.d-=dt;
  for(const q of WX.thunder)if(q.d<=0)sfx(q.big?'thunder':'thunder2');
  WX.thunder=WX.thunder.filter(q=>q.d>0);
  if(window.auWeather)auWeather(WX.i,V.zi===2?1:0);
  // recuperi
  V.rowCd=Math.max(0,V.rowCd-dt);V.scoutCd=Math.max(0,V.scoutCd-dt);V.scout=Math.max(0,V.scout-dt);
  if(V.row>0){V.row-=dt;V.rowFx=(V.rowFx||0)-dt;if(V.rowFx<=0){V.rowFx=.42;for(const sd of[-1,1]){const a=p.hd+sd*Math.PI/2;C.fx.push({k:'splash',x:p.x+Math.cos(a)*40-Math.cos(p.hd)*10,y:p.y+Math.sin(a)*34+8,r:9,t:0,life:.5})}if(AU.ctx&&AU.on)noiseBurst(.07,1200,.12)}}
  // confine di zona: non si aggira la rotta
  // tappa
  if(!V.busy){const L=LEGS[V.leg];if(L){const R=L.k==='wreck'?240:L.k==='buoy'?170:L.k==='dock'?135:190;if(Math.hypot(L.x*T-p.x,L.y*T-p.y)<R)reachLeg()}}
  // pattuglie spagnole all'inizio
  if(V.zi===0&&V.patrolT>0){V.patrolT-=dt;if(V.patrolT<=0){
    for(const sd of[-1,1]){let x=p.x+300,y=p.y+sd*1250;if(!clearAt(x,y,100)){const r=findSea(x,y);x=r[0];y=r[1]}const s=mkShip('pattuglia',x,y,Math.PI,{hostile:true,hit:true});C.ships.push(s)}
    say('Biscotto','Vele spagnole! Due pattuglie, una a nord e una a sud! Cra!',5600)}}
  // gorghi
  if(V.zi===2){
    for(const v of V.W.vort){
      const dx=v.x-p.x,dy=v.y-p.y,d=Math.hypot(dx,dy);
      if(d<250&&d>1){const f=Math.pow(1-d/250,1.4),ux=dx/d,uy=dy/d;
        const nx=p.x+(ux*16-uy*30)*f*dt,ny=p.y+(uy*16+ux*30)*f*dt;
        if(shipOK(p,nx,ny,p.hd)){p.x=nx;p.y=ny}
        if(!V.notes.vort){V.notes.vort=1;say('Tito','Un gorgo! Ti tira dentro: gira verso l\'esterno e dai tutta la vela!',5200)}}
      if(d<90&&(V.vCd||0)<=0){V.vCd=1.4;hurt(p,.5);p.v*=.5;toast('Il gorgo ti scuote! Scafo danneggiato.',2600);sfx('thud');for(let i=0;i<6;i++)C.fx.push({k:'splash',x:p.x+rr(-50,50),y:p.y+rr(-30,30),r:rr(10,18),t:0,life:.6})}
    }
    V.vCd=Math.max(0,(V.vCd||0)-dt);
    // fulmini
    V.boltT-=dt;
    if(V.boltT<=0){V.boltT=rr(3.4,5.8);
      const a=p.hd+rr(-.9,.9),d=rr(280,640);let x=p.x+Math.cos(a)*d,y=p.y+Math.sin(a)*d*.9;
      if(seaOK(x,y))V.warn.push({x,y,t:0,dur:1.5})}
  }else V.boltT=3;
  for(const q of V.warn){q.t+=dt;if(q.t>=q.dur&&!q.done){q.done=true;strikeBolt(q.x,q.y);
    if(Math.hypot(q.x-p.x,q.y-p.y)<125){hurt(p,1);toast('Un fulmine! Sei stato colpito da vicino.',2800);sfx('thud')}
    for(let i=0;i<8;i++)C.fx.push({k:'splash',x:q.x+rr(-60,60),y:q.y+rr(-40,40),r:rr(10,20),t:0,life:.6})}}
  V.warn=V.warn.filter(q=>!q.done);
  // scia luminosa
  if(V.zi>=4&&Math.abs(p.v)>25&&Math.random()<dt*14&&V.glow.length<60){V.glow.push({x:p.x-Math.cos(p.hd)*70+rr(-20,20),y:p.y+10-Math.sin(p.hd)*60+rr(-10,10),r:rr(26,46),t:0,life:rr(1.8,3)})}
  for(const q of V.glow)q.t+=dt;V.glow=V.glow.filter(q=>q.t<q.life);
  // casse di legno nel tempo
  V.crateT-=dt;
  if(V.crateT<=0){V.crateT=rr(26,40);
    if(C.crates.length<3){const L=LEGS[V.leg];if(L){const a=Math.atan2(L.y*T-p.y,L.x*T-p.x);let x=p.x+Math.cos(a)*rr(500,900),y=p.y+Math.sin(a)*rr(500,900)+rr(-200,200);
      if(!clearAt(x,y,50)){const r=findSea(x,y);x=r[0];y=r[1]}C.crates.push({x,y,t:rr(0,9),v:'food'})}}}
  // un attimo di tregua con il fantasma finche' c'e' un dialogo: ignoto
  V.tAll+=dt;
  if(Math.floor(V.t)%15===0&&!V.sv){V.sv=1;saveV()}else if(Math.floor(V.t)%15!==0)V.sv=0;
}

/* ---------- musica del viaggio ---------- */
const VMUS=[
 {r:50,st:.40,ch:[0,7,12,16],sc:[0,2,4,7,9,12,14],mel:[0,2,4,2,0,-3,0,2],pad:.020,bass:.075,mv:.040,drum:0,bell:0},
 {r:45,st:.55,ch:[0,7,12,14],sc:[0,2,4,7,9,12],mel:[0,2,4,2,0,0,-3,0],pad:.018,bass:.05,mv:.026,drum:0,bell:.5},
 {r:38,st:.28,ch:[0,7,12,15],sc:[0,2,3,7,8,12],mel:[0,3,0,7,5,3,2,0],pad:.026,bass:.10,mv:.045,drum:1,bell:0},
 {r:43,st:.62,ch:[0,7,12,16],sc:[0,4,7,11,14],mel:[0,0,4,0,7,0,4,0],pad:.016,bass:.045,mv:.020,drum:0,bell:.55},
 {r:41,st:.58,ch:[0,6,12,15],sc:[0,1,5,7,10],mel:[0,1,0,6,5,0,1,0],pad:.020,bass:.06,mv:.024,drum:0,bell:.45},
 {r:50,st:.44,ch:[0,7,12,16,19],sc:[0,2,4,7,9,12,14,16],mel:[0,4,7,9,7,4,2,4],pad:.026,bass:.06,mv:.044,drum:0,bell:.3}
];
function voyMusic(){
  if(!AU.ctx||!AU.mbus||!AU.mus||AU.ctx.state!=='running'||!V)return;
  const c=AU.ctx,now=c.currentTime;if(AU.nextT<now-.5)AU.nextT=now+.1;
  const M=VMUS[V.zi];let guard=0;
  while(AU.nextT<now+.7&&guard++<8){
    const t=AU.nextT,b=(AU.beat|0),sb=b%8,bar=((b/8)|0)%4,root=M.r+(bar===2?-2:bar===3?-5:0);
    if(sb===0){mPad(t,M.ch.map(i=>root+12+i),M.st*8.4,M.pad);mNote(t,root-12,M.st*6,M.bass,'sine')}
    if(sb===4)mNote(t,root,M.st*3,M.bass*.7,'triangle');
    if(M.drum){if(sb%4===0)drum(t,'k',.16);if(sb===2||sb===6)drum(t,'t',.07)}
    const mi=M.mel[sb];
    if(sb%2===0||M.bell>.4){if(Math.random()<(M.bell?M.bell:.8)){const note=root+12+mi+(M.bell?12:0);mNote(t,note,M.st*(M.bell?2.2:1.6),M.mv*(M.bell?1.05:1),M.bell?'sine':'triangle')}}
    AU.nextT+=M.st;AU.beat=b+1;
  }
}
