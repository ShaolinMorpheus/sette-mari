import json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80])
    s=s.replace(a,b)
SCA=json.dumps(json.load(open('/home/claude/work/scena_assets.json')),separators=(',',':'))

# collisione: piu' rettangoli per oggetto (due pali)
rep("const c=e.cb;if(x+rx>e.x+c[0]&&x-rx<e.x+c[1]&&y+ry>e.y+c[2]&&y-ry<e.y+c[3])return true}return false}",
    "const cs=Array.isArray(e.cb[0])?e.cb:[e.cb];for(const c of cs)if(x+rx>e.x+c[0]&&x-rx<e.x+c[1]&&y+ry>e.y+c[2]&&y-ry<e.y+c[3])return true}return false}")
rep("pot:[-26,26,-13,5],","pot:[-20,20,-8,4],jt:[-9,9,-5,3],laundry:[[-54,-42,-4,2],[42,54,-4,2]],rastrelliera:[-44,44,-5,2],amaca:[[-76,-62,-4,3],[62,76,-4,3]],rete:[-56,56,-5,2],pila:[-44,44,-7,2],fusto:[-26,26,-6,3],ceppo:[-20,20,-6,3],cucina:[-48,48,-5,2],mappa:[-30,30,-4,2],barcacos:[-84,84,-10,4],trespolo:[-8,8,-4,2],cassa:[-28,28,-6,3],")

# lanterna di Muse al posto dei rettangoli
old_l="""    g.strokeStyle='#2a2a30';g.lineWidth=1.2;g.beginPath();g.moveTo(0,0);g.lineTo(0,5);g.stroke();
    const night=skyLight(S.tod).dark>.04;
    g.fillStyle='#2e2e36';g.fillRect(-6.5,5,13,3);g.fillRect(-6.5,25,13,3);
    g.fillStyle=night?'rgba(255,222,140,.95)':'rgba(255,226,160,.7)';g.fillRect(-5,8,10,17);
    g.strokeStyle='#2e2e36';g.lineWidth=1.3;g.strokeRect(-5,8,10,17);g.beginPath();g.moveTo(0,8);g.lineTo(0,25);g.stroke();
    g.fillStyle='#ffb43a';g.beginPath();g.ellipse(0,19,2.2,3.6+Math.sin(t*9+e.x)*.5,0,0,7);g.fill();
"""
new_l="""    const night=skyLight(S.tod).dark>.04;
    if(scOk(['lanterna-struttura','lanterna-vetri','lanterna-anello-catena']))scLant(g,night,t,e.x);
    else{
    g.strokeStyle='#2a2a30';g.lineWidth=1.2;g.beginPath();g.moveTo(0,0);g.lineTo(0,5);g.stroke();
    g.fillStyle='#2e2e36';g.fillRect(-6.5,5,13,3);g.fillRect(-6.5,25,13,3);
    g.fillStyle=night?'rgba(255,222,140,.95)':'rgba(255,226,160,.7)';g.fillRect(-5,8,10,17);
    g.strokeStyle='#2e2e36';g.lineWidth=1.3;g.strokeRect(-5,8,10,17);g.beginPath();g.moveTo(0,8);g.lineTo(0,25);g.stroke();
    g.fillStyle='#ffb43a';g.beginPath();g.ellipse(0,19,2.2,3.6+Math.sin(t*9+e.x)*.5,0,0,7);g.fill();
    }
"""
rep(old_l,new_l)

block=r'''/* ====== Scenografia di Muse (24 nov): oggetti del campo e pesci ====== */
const SCA=__SCA__;
const SCI={};
function scImg(n){let o=SCI[n];if(!o){if(!SCA[n])return null;o=SCI[n]=new Image();o.src='data:image/png;base64,'+SCA[n]}return o.complete&&o.naturalWidth?o:null}
function scOk(l){let ok=true;for(const n of l)if(!scImg(n))ok=false;return ok}
const SCAN={cal2:[44,72],tj:[35,61],lan:[22,35],ras:[60,106],ama:[86,106],ret:[74,91],pil:[61,108],std:[67,100],fus:[60,104],cep:[60,74],cuc:[63,101],map:[62,114],bco:[103,116],tre:[50,76],cas:[46,82]};
const SCNM={
  cal2:['calderone2-cenere','calderone2-braci-calde','calderone2-tripode','calderone2-liquido'],
  tj:['tavolino-j-tavolino','tavolino-j-calamaio','tavolino-j-mappa','tavolino-j-bussola','tavolino-j-diario'],
  ras:['rastrelliera-telaio','rastrelliera-sciabola-1','rastrelliera-sciabola-2','rastrelliera-sciabola-3','rastrelliera-moschetto-1','rastrelliera-moschetto-2','rastrelliera-ascia','rastrelliera-pistola'],
  ama:['amaca-palo-sinistro','amaca-palo-destro','amaca-telo','amaca-cuscino'],
  ret:['rete-telaio','rete-rete','rete-galleggiante-1','rete-galleggiante-2','rete-peso-1','rete-peso-2','rete-peso-3','rete-pesce-secco-1','rete-pesce-secco-2','rete-pesce-secco-3'],
  pil:['pila-barili-barili','pila-barili-sacchi','pila-barili-telo'],
  std:['stendino-pali','stendino-panno-vela','stendino-panno-camicia','stendino-panno-calzoni','stendino-panno-straccio'],
  fus:['fusto-acqua-fusto','fusto-acqua-acqua','fusto-acqua-mestolo','fusto-acqua-tettoia','fusto-acqua-gocce'],
  cep:['ceppo-ascia-catasta','ceppo-ascia-ceppo','ceppo-ascia-ascia','ceppo-ascia-schegge'],
  cuc:['tavolo-cucina-tavolo','tavolo-cucina-tagliere','tavolo-cucina-coltello','tavolo-cucina-mortaio','tavolo-cucina-pesce-appeso-1','tavolo-cucina-pesce-appeso-2','tavolo-cucina-cesta'],
  map:['mappa-cavalletto-cavalletto','mappa-cavalletto-mappa','mappa-cavalletto-puntina-1','mappa-cavalletto-puntina-2','mappa-cavalletto-puntina-3','mappa-cavalletto-puntina-4','mappa-cavalletto-filo','mappa-cavalletto-pergamena'],
  bco:['barca-costruzione-base','barca-costruzione-stato-0','barca-costruzione-stato-1','barca-costruzione-stato-2','barca-costruzione-stato-3'],
  tre:['trespolo-palo','trespolo-ciotole','trespolo-gabbia','trespolo-porticina-aperta'],
  cas:['cassa-corpo','cassa-monete','cassa-collana','cassa-chiave','cassa-coperchio-aperto','cassa-coperchio-chiuso']
};
function scDraw(g,k,names){const a=SCAN[k];for(const n of names){const i=scImg(n);if(i)g.drawImage(i,-a[0],-a[1])}}
function scNew(k){const l=SCNM[k];return VEGPG&&scOk(l)}
function scBake(w,h,ax,ay,names){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');for(const n of names){const i=scImg(n);if(i)x.drawImage(i,0,0)}return{c,w,h,ax,ay}}
var SCD=0;
function scApplySP(){
  if(SCD||!VEGPG)return;
  const L1=['cannone-affusto','cannone-canna','cannone-palle','cannone-calcatoio'],L2=['corda-rotolo'],L3=['barca-remi-scafo','barca-remi-remo-1','barca-remi-remo-2','barca-remi-cima','barca-remi-sacco-rete'];
  if(!(scOk(L1)&&scOk(L2)&&scOk(L3)))return;
  SCD=1;SP.cannon=scBake(113,84,54,67,L1);SP.coil=scBake(69,61,35,46,L2);SP.rowboat=scBake(139,88,70,70,L3);
}
let SCLT=null;
function scLant(g,night,t,ex){
  g.drawImage(scImg('lanterna-anello-catena'),-22,-35);
  g.drawImage(scImg('lanterna-struttura'),-22,-35);
  if(night){
    if(!SCLT){const c=document.createElement('canvas');c.width=44;c.height=82;const x=c.getContext('2d');x.drawImage(scImg('lanterna-vetri'),0,0);x.globalCompositeOperation='source-atop';x.fillStyle='rgba(255,206,110,.92)';x.fillRect(0,0,20,44);SCLT=c}
    g.drawImage(SCLT,-22,-35);
    g.fillStyle='#ffd27a';g.beginPath();g.ellipse(0,19,2,3.4+Math.sin(t*9+ex)*.5,0,0,7);g.fill();
  }else g.drawImage(scImg('lanterna-vetri'),-22,-35);
}
{
  const oP2=NVDX.nv_pot,oJ=NVDX.nv_jt,oLa=NVDX.nv_laundry;
  NVDX.nv_pot=(g,e,t)=>{
    if(!scNew('cal2'))return oP2(g,e,t);
    const meal=(S.tod>=11.5&&S.tod<14.2)||(S.tod>=18&&S.tod<21);
    g.save();g.translate(e.x,e.y);shadow(g,0,3,30,7,.26);
    const A=SCAN.cal2,cI=scImg('calderone2-cenere'),bI=scImg('calderone2-braci-calde'),tI=scImg('calderone2-tripode'),lI=scImg('calderone2-liquido');
    g.drawImage(cI,-A[0],-A[1]);
    g.globalAlpha=meal?.95:.32+.1*Math.sin(t*2.3);g.drawImage(bI,-A[0],-A[1]);g.globalAlpha=1;
    if(meal)drawFlame(g,0,-5,t,.42);
    g.drawImage(tI,-A[0],-A[1]);g.drawImage(lI,-A[0],-A[1]);
    for(let i=0;i<5;i++){
      const ph=(t*(meal?.5:.34)+i*.2)%1,a=(meal?.42:.22)*(1-ph);
      g.fillStyle='rgba(255,255,255,'+a.toFixed(3)+')';
      g.beginPath();g.arc(Math.sin(t*1.2+i*2.1)*5+ph*7,-34-ph*(meal?64:48),5+ph*(meal?13:9),0,7);g.fill();
    }
    g.restore();
  };
  NVDX.nv_jt=(g,e,t)=>{
    if(!scNew('tj'))return oJ(g,e,t);
    const n=NV2.cp().j|0;
    g.save();g.translate(e.x,e.y);shadow(g,0,3,22,6,.26);
    const L=['tavolino-j-tavolino','tavolino-j-calamaio','tavolino-j-mappa','tavolino-j-bussola','tavolino-j-diario'];
    scDraw(g,'tj',L.filter((x,i)=>i===0||i<=n));
    if(n)twinkle(g,6,-40,t,7,e.x,'#ffe27a');
    g.restore();
  };
  NVDX.nv_laundry=(g,e,t)=>{
    if(!scNew('std'))return oLa(g,e,t);
    g.save();g.translate(e.x,e.y);shadow(g,0,2,56,7,.24);
    const A=SCAN.std;g.drawImage(scImg('stendino-pali'),-A[0],-A[1]);
    ['vela','camicia','calzoni','straccio'].forEach((n,i)=>{
      const px=[20,45,72,96][i]-A[0],py=8-A[1];
      g.save();g.translate(px,py);g.rotate(Math.sin(t*1.5+i*1.9+e.x*.01)*.022);g.translate(-px,-py);
      g.drawImage(scImg('stendino-panno-'+n),-A[0],-A[1]);g.restore();
    });
    g.restore();
  };
  NVDX.nv_rastrelliera=(g,e,t)=>{if(!scNew('ras'))return;g.save();g.translate(e.x,e.y);shadow(g,0,3,46,7,.26);scDraw(g,'ras',SCNM.ras);g.restore()};
  NVDX.nv_amaca=(g,e,t)=>{if(!scNew('ama'))return;g.save();g.translate(e.x,e.y);shadow(g,0,2,74,7,.22);
    const A=SCAN.ama;g.drawImage(scImg('amaca-palo-sinistro'),-A[0],-A[1]);g.drawImage(scImg('amaca-palo-destro'),-A[0],-A[1]);
    g.save();g.translate(0,-30);g.rotate(Math.sin(t*.9+e.x)*.008);g.translate(0,30);g.drawImage(scImg('amaca-telo'),-A[0],-A[1]);g.drawImage(scImg('amaca-cuscino'),-A[0],-A[1]);g.restore();g.restore()};
  NVDX.nv_rete=(g,e,t)=>{if(!scNew('ret'))return;g.save();g.translate(e.x,e.y);shadow(g,0,3,58,7,.24);scDraw(g,'ret',SCNM.ret);g.restore()};
  NVDX.nv_pila=(g,e,t)=>{if(!scNew('pil'))return;g.save();g.translate(e.x,e.y);shadow(g,0,3,48,8,.28);scDraw(g,'pil',SCNM.pil.slice(0,2));g.restore()};
  NVDX.nv_fusto=(g,e,t)=>{if(!scNew('fus'))return;g.save();g.translate(e.x,e.y);shadow(g,0,3,40,8,.26);
    const A=SCAN.fus,L=SCNM.fus;for(let i=0;i<3;i++)g.drawImage(scImg(L[i]),-A[0],-A[1]);g.drawImage(scImg(L[3]),-A[0],-A[1]);
    g.globalAlpha=.55+.45*Math.max(0,Math.sin(t*2.6));g.drawImage(scImg(L[4]),-A[0],-A[1]);g.globalAlpha=1;g.restore()};
  NVDX.nv_ceppo=(g,e,t)=>{if(!scNew('cep'))return;g.save();g.translate(e.x,e.y);shadow(g,0,3,44,7,.26);scDraw(g,'cep',SCNM.cep);g.restore()};
  NVDX.nv_cucina=(g,e,t)=>{if(!scNew('cuc'))return;g.save();g.translate(e.x,e.y);shadow(g,0,3,50,7,.26);
    const A=SCAN.cuc,L=SCNM.cuc;for(const n of L){const sw=(n.indexOf('pesce')>=0);if(sw){g.save();g.translate(0,-50);g.rotate(Math.sin(t*1.2+n.length)*.012);g.translate(0,50)}g.drawImage(scImg(n),-A[0],-A[1]);if(sw)g.restore()}g.restore()};
  NVDX.nv_mappa=(g,e,t)=>{if(!scNew('map'))return;g.save();g.translate(e.x,e.y);shadow(g,0,3,34,6,.26);scDraw(g,'map',SCNM.map);g.restore()};
  NVDX.nv_barcacos=(g,e,t)=>{if(!scNew('bco'))return;g.save();g.translate(e.x,e.y);shadow(g,0,4,88,9,.26);
    const tr=Ch2.tr('tito'),st=tr<1.5?0:tr<3?1:tr<4.5?2:3;
    scDraw(g,'bco',['barca-costruzione-base','barca-costruzione-stato-'+st]);g.restore()};
  NVDX.nv_trespolo=(g,e,t)=>{if(!scNew('tre'))return;g.save();g.translate(e.x,e.y);shadow(g,0,3,22,5,.24);scDraw(g,'tre',SCNM.tre);g.restore()};
  NVDX.nv_cassa=(g,e,t)=>{if(!scNew('cas'))return;g.save();g.translate(e.x,e.y);shadow(g,0,3,32,6,.26);
    const open=hyp(P.x-e.x,P.y-e.y)<TS*2.4;
    scDraw(g,'cas',open?['cassa-corpo','cassa-monete','cassa-collana','cassa-chiave','cassa-coperchio-aperto']:['cassa-corpo','cassa-coperchio-chiuso']);g.restore()};
}
/* ---- pesci: icone del Registro e pesci che nuotano nell'acqua ---- */
var NVF={F:[],fx:[],t0:0,nx:0,pc:{}};
{
  const oFI=fishImg;
  fishImg=function(id){
    if(!VEGPG)return oFI(id);
    if(NVF.pc[id])return NVF.pc[id];
    const im=scImg('pesce-'+id);if(!im)return oFI(id);
    const c=document.createElement('canvas');c.width=128;c.height=80;const x=c.getContext('2d');
    const t=document.createElement('canvas');t.width=im.naturalWidth;t.height=im.naturalHeight;const tx=t.getContext('2d');tx.drawImage(im,0,0);
    const al=scImg('pesce-'+id+'-alone');if(al){tx.globalCompositeOperation='lighter';tx.globalAlpha=.7;tx.drawImage(al,0,0);tx.globalAlpha=1;tx.globalCompositeOperation='source-over'}
    const d=tx.getImageData(0,0,t.width,t.height).data;let x0=t.width,y0=t.height,x1=0,y1=0;
    for(let j=0;j<t.height;j++)for(let i=0;i<t.width;i++)if(d[(j*t.width+i)*4+3]>24){if(i<x0)x0=i;if(i>x1)x1=i;if(j<y0)y0=j;if(j>y1)y1=j}
    if(x1<=x0||y1<=y0)return oFI(id);
    const w=x1-x0+1,h=y1-y0+1,k=Math.min(124/w,76/h);
    x.drawImage(t,x0,y0,w,h,(128-w*k)/2,(80-h*k)/2,w*k,h*k);
    return NVF.pc[id]=c;
  };
  const oDF=drawFishing;
  drawFishing=function(g,t){
    oDF(g,t);
    try{const a=P.act;if(a&&a.kind==='reel'&&P.fishT&&scImg('pesce-boccheggio')){const f=Math.floor(t*9)%4,bx=P.fishT[0],by=P.fishT[1];g.drawImage(scImg('pesce-boccheggio'),f*64,0,64,40,bx-32,by-24,64,40)}}catch(e){}
  };
}
NVF.okW=(tx,ty)=>{
  if(!inMap(tx,ty)||elevT[tIdx(tx,ty)]>=WL-.02)return false;
  return hyp((tx+.5-POND.x)/(POND.rx+.8),(ty+.5-POND.y)/(POND.ry+.8))>=1;
};
NVF.nearLand=(tx,ty)=>{for(let j=-3;j<=3;j++)for(let i=-3;i<=3;i++){if(inMap(tx+i,ty+j)&&elevT[tIdx(tx+i,ty+j)]>=WL)return true}return false};
NVF.pick=(deep)=>{
  for(let k=0;k<40;k++){
    const an=Math.random()*6.283,r=(3+Math.random()*8)*TS,x=P.x+Math.cos(an)*r,y=P.y+Math.sin(an)*r,tx=Math.floor(x/TS),ty=Math.floor(y/TS);
    if(!NVF.okW(tx,ty))continue;
    if(deep){if(!seaT[tIdx(tx,ty)])continue}else if(!NVF.nearLand(tx,ty))continue;
    return [x,y];
  }
  return null;
};
NVF.KINDS=[['sardina',.34,26,.7,0],['sgombro',.26,36,.85,0],['orata',.18,18,.95,1],['pappagallo',.14,16,.9,1],['cernia',.08,12,1.15,0]];
NVF.draw=function(g,t,vx0,vy0,vx1,vy1){
  scApplySP();
  if(!VEGPG||QL>=3||WORLD>2||!S||!S.live||PAUSED)return;
  const dt=Math.min(.1,Math.max(0,t-NVF.t0));NVF.t0=t;if(!dt)return;
  const dark=(()=>{try{return skyLight(S.tod).dark||0}catch(e){return 0}})(),day=S.tod>=7&&S.tod<18.5;
  const want=QL<2?7:4;
  NVF.nx-=dt;
  if(NVF.nx<=0){
    NVF.nx=.7;
    if(NVF.F.length<want){
      const p=NVF.pick(false);
      if(p){let r=Math.random(),kd=NVF.KINDS[0];for(const k of NVF.KINDS){if(r<k[1]){kd=k;break}r-=k[1]}
        if(kd[4]&&!day)kd=NVF.KINDS[1];
        if(kd[0]==='cernia'){const q=NVF.pick(true);if(!q)kd=NVF.KINDS[1];else{p[0]=q[0];p[1]=q[1]}}
        if(scImg('pesce-'+kd[0]+'-acqua'))NVF.F.push({x:p[0],y:p[1],hd:Math.random()*6.283,k:kd,tt:1+Math.random()*2,a:0,ph:Math.random()*5});
      }
    }
    if(!NVF.sh&&QL<2){const p=NVF.pick(false);if(p&&scImg('pesce-banco-sardine-1'))NVF.sh={x:p[0],y:p[1],hd:Math.random()*6.283,tt:2,a:0,v:1+Math.floor(Math.random()*3)}}
    if(!NVF.gs&&QL<2){const p=NVF.pick(true);if(p&&scImg('pesce-ombra-grande'))NVF.gs={x:p[0],y:p[1],hd:Math.random()*6.283,tt:4,a:0}}
    NVF.jt=(NVF.jt||4+Math.random()*5)-.7;
    if(NVF.jt<=0&&NVF.F.length&&scImg('pesce-salto')){
      const f=NVF.F[Math.floor(Math.random()*NVF.F.length)];if(f.x>vx0&&f.x<vx1&&f.y>vy0&&f.y<vy1){NVF.fx.push({x:f.x,y:f.y,t:t});}
      NVF.jt=7+Math.random()*9;
    }
  }
  const fishing=P.act&&(P.act.kind==='fish'||P.act.kind==='reel');
  const step=(f,sp,sc)=>{
    f.tt-=dt;if(f.tt<=0){f.hd+=(Math.random()-.5)*1.7;f.tt=1.6+Math.random()*3.2}
    const d=hyp(P.x-f.x,P.y-f.y);let v=sp;
    if(d<TS*2.7||(fishing&&P.fishT&&hyp(P.fishT[0]-f.x,P.fishT[1]-f.y)<TS*2.2)){const aw=Math.atan2(f.y-P.y,f.x-P.x);f.hd+=Math.sin(aw-f.hd)*.18;v=sp*2.6}
    const nx=f.x+Math.cos(f.hd)*v*dt,ny=f.y+Math.sin(f.hd)*v*dt;
    if(NVF.okW(Math.floor(nx/TS),Math.floor(ny/TS))){f.x=nx;f.y=ny}else{f.hd+=2.2;f.tt=.4}
    f.a=Math.min(1,f.a+dt*.7);f.v=v;
    return d>TS*15;
  };
  g.save();
  const al0=(1-dark*.65);
  if(NVF.gs){const f=NVF.gs;if(step(f,7,1)||!NVF.okW(Math.floor(f.x/TS),Math.floor(f.y/TS)))NVF.gs=null;else if(f.x>vx0-80&&f.x<vx1+80&&f.y>vy0-80&&f.y<vy1+80){
    const im=scImg('pesce-ombra-grande');g.save();g.translate(f.x,f.y);g.rotate(f.hd);g.globalAlpha=f.a*al0;g.drawImage(im,(Math.floor(t*3)%4)*120,0,120,60,-60,-30,120,60);g.restore()}}
  if(NVF.sh){const f=NVF.sh;if(step(f,22,1))NVF.sh=null;else if(f.x>vx0-80&&f.x<vx1+80&&f.y>vy0-80&&f.y<vy1+80){
    const im=scImg('pesce-banco-sardine-'+f.v);g.save();g.translate(f.x,f.y);g.rotate(f.hd);g.scale(1+Math.sin(t*3+f.x)*.03,1);g.globalAlpha=f.a*al0;g.drawImage(im,-48,-28);g.restore()}}
  for(let i=NVF.F.length-1;i>=0;i--){
    const f=NVF.F[i];if(step(f,f.k[2],f.k[3])){NVF.F.splice(i,1);continue}
    if(f.x<vx0-60||f.x>vx1+60||f.y<vy0-60||f.y>vy1+60)continue;
    const im=scImg('pesce-'+f.k[0]+'-acqua');if(!im)continue;
    const fr=Math.floor(t*(6+f.v/8)+f.ph)%6;
    g.save();g.translate(f.x,f.y);g.rotate(f.hd);g.scale(f.k[3],f.k[3]);g.globalAlpha=f.a*al0;g.drawImage(im,fr*48,0,48,28,-24,-14,48,28);g.restore();
  }
  for(let i=NVF.fx.length-1;i>=0;i--){
    const q=NVF.fx[i],a=t-q.t;if(a>1.9){NVF.fx.splice(i,1);continue}
    const an=scImg('pesce-anelli'),sa=scImg('pesce-salto');
    if(a>.25&&an){const f=Math.min(3,Math.floor((a-.25)/.4));g.globalAlpha=.9*al0;g.drawImage(an,f*80,0,80,40,q.x-40,q.y-20,80,40)}
    if(a<.9&&sa){const f=Math.min(3,Math.floor(a/.225));g.globalAlpha=al0;g.drawImage(sa,f*64,0,64,64,q.x-32,q.y-58,64,64)}
  }
  g.restore();
};
'''.replace('__SCA__',SCA)
rep("NV2.spawn=function(){\n",block+"NV2.spawn=function(){\n")
rep("drawBeach(g,t,vx0,vy0,vx1,vy1);\n  if(WORLD<3){try{GfxNew.under","drawBeach(g,t,vx0,vy0,vx1,vy1);\n  try{NVF.draw(g,t,vx0,vy0,vx1,vy1)}catch(e){}\n  if(WORLD<3){try{GfxNew.under")
# nuovi oggetti del campo + tavolino di J
rep("  // tavolino di J (disegno vecchio): tolto per ora\n","""  if(cp.j)NV2.addE('jt',60.5,28.6);
  if(VEGPG){for(const q of [['rastrelliera',67,33.2],['amaca',53,37.4],['rete',58.5,38.2],['pila',49.8,29.4],['fusto',63,37.8],['ceppo',65.5,29],['cucina',54.2,31.8],['mappa',66,26.6],['barcacos',73.5,32],['trespolo',58.6,25.4],['cassa',50,33]])NV2.addE(q[0],q[1],q[2])}
""")
rep("['','Una pipa consumata','Un cannocchiale d\\'ottone','Una bussola','Il diario, rilegato'][pg]","['','Un calamaio con la penna d\\'oca','Una mappa arrotolata','Una bussola d\\'ottone','Il diario, rilegato'][pg]")
rep('  {v:"0.11.7",d:"23 nov 2026",','  {v:"0.11.8",d:"24 nov 2026",t:"Campo più vivo e pesci nel mare",n:[\n    "Nuovi oggetti nel campo, disegnati da Muse: rastrelliera con le armi, amaca, rete da pesca, pila di barili, fusto d\'acqua, ceppo con ascia, tavolo di cucina, mappa su cavalletto, trespolo con la gabbia aperta, cassa del tesoro (si apre quando ti avvicini) e uno scheletro di barca che cresce con la fiducia di Tito.",\n    "Rifatti con il nuovo stile: calderone (acceso solo all\'ora dei pasti), lanterne, stendino con i panni che ondeggiano, cannone, corda e barca a remi. Tornano il tavolino di J, con gli oggetti nuovi: calamaio, mappa, bussola e diario.",\n    "Pesci che nuotano nell\'acqua bassa vicino alle spiagge, banchi di sardine, ombre grandi in acque profonde, salti e anelli sull\'acqua. Scappano se ti avvicini.",\n    "Registro del pescatore: le 9 icone dei pesci sono disegni nuovi di Muse.",\n  ]},\n  {v:"0.11.7",d:"23 nov 2026",')
rep("NV2.addE('pot',56.9,30.7);","NV2.addE('pot',54.7,29.9);")
open(P,'w',encoding='utf8').write(s);print('ok153')

