import json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:70])
    s=s.replace(a,b)
A=json.load(open('/home/claude/work/campo_assets.json'))
assets=json.dumps(A,separators=(',',':'))

# --- collisione: rettangoli a terra degli oggetti del campo (relativi al punto d'appoggio)
rep("function boxFree(x,y,rx,ry){\n","""var NVCB=[];
function nvHit(x,y,rx,ry){for(const e of NVCB){if(EID[e.id]!==e)continue;const c=e.cb;if(x+rx>e.x+c[0]&&x-rx<e.x+c[1]&&y+ry>e.y+c[2]&&y-ry<e.y+c[3])return true}return false}
function boxFree(x,y,rx,ry){
  if(NVCB.length&&nvHit(x,y,rx,ry))return false;
""")
# NPC: non entrano negli oggetti e non scelgono una meta dentro
rep("const sp=54*dt,nx=e.x+dx/dist*sp,ny=e.y+dy/dist*sp,ntx=Math.floor(nx/TS),nty=Math.floor(ny/TS);","const sp=54*dt,nx=e.x+dx/dist*sp,ny=e.y+dy/dist*sp,ntx=Math.floor(nx/TS),nty=Math.floor(ny/TS);\n      if(NVCB.length&&nvHit(nx,ny,6,3)&&!nvHit(e.x,e.y,6,3)){e.mv=0;e.wt=2;continue}")
rep("      if(!f)continue;\n      if(hyp(f[0]-Ch2.NPC[w].at[0],f[1]-Ch2.NPC[w].at[1])>9)continue;","      if(!f)continue;\n      if(NVCB.length&&nvHit((f[0]+.5)*TS,(f[1]+.92)*TS,8,3))continue;\n      if(hyp(f[0]-Ch2.NPC[w].at[0],f[1]-Ch2.NPC[w].at[1])>9)continue;")

# --- disegni di Muse (grafica di prova) con ripiego sui vecchi
new=r'''/* ====== Oggetti del campo ridisegnati da Muse (23 nov): incudine, calderone, tavolata, asta/lanterna, festone ====== */
const CMPA=__ASSETS__;
const CMPI={};
function cmpImg(n){let o=CMPI[n];if(!o){o=CMPI[n]=new Image();o.src='data:image/png;base64,'+CMPA[n]}return o.complete&&o.naturalWidth?o:null}
function cmpOk(l){let ok=true;for(const n of l)if(!cmpImg(n))ok=false;return ok}
const CMPL={
  anvil:['incudine','martello'],
  pot:['calderone-sassi-braci','calderone-braci-spente','calderone-tripode','calderone-liquido'],
  table:['tavolata-panca-dietro','tavolata-tavola','tavolata-piatto-1','tavolata-piatto-2','tavolata-piatto-3','tavolata-piatto-4','tavolata-piatto-5','tavolata-tazza-1','tavolata-tazza-2','tavolata-tazza-3','tavolata-tazza-4','tavolata-pane','tavolata-ciotola-bacche','tavolata-candela','tavolata-panca-davanti'],
  lant:['asta-corta'],
  bunt:['corda','bandierina-rossa','bandierina-gialla','bandierina-azzurra','bandierina-crema','bandierina-verde']
};
const NVCBD={anvil:[-13,13,-10,3],pot:[-26,26,-13,5],table:[-76,76,-14,21],lant:[-6,6,-4,3]};
{
  const oA=NVDX.nv_anvil,oP=NVDX.nv_pot,oT=NVDX.nv_table,oL=NVDX.nv_lant,oB=NVDX.nv_bunt;
  const use=k=>VEGPG&&cmpOk(CMPL[k]);
  NVDX.nv_anvil=(g,e,t)=>{
    if(!use('anvil'))return oA(g,e,t);
    g.save();g.translate(e.x,e.y);shadow(g,0,2,26,6,.26);
    g.drawImage(cmpImg('incudine'),-24,-43);
    const d=t-(e.hit||-9);
    if(d>1.6)g.drawImage(cmpImg('martello'),-24,-43);       // il martello resta sull'incudine quando Nives non batte
    if(d>=0&&d<.45){
      const k=d/.45;
      g.save();g.globalCompositeOperation='lighter';
      for(let i=0;i<7;i++){
        const an=-Math.PI*(.12+.76*i/6),r=6+k*(18+(i%3)*5),x=-2+Math.cos(an)*r,y=-31+Math.sin(an)*r+k*k*14;
        g.strokeStyle='rgba(255,'+(190-i*8)+',90,'+(1-k).toFixed(2)+')';g.lineWidth=1.8;
        g.beginPath();g.moveTo(x,y);g.lineTo(x-Math.cos(an)*3,y-Math.sin(an)*3);g.stroke();
      }
      g.fillStyle='rgba(255,230,150,'+(.7*(1-k)).toFixed(2)+')';g.beginPath();g.arc(-2,-32,5*(1-k)+1,0,7);g.fill();
      g.restore();
    }
    g.restore();
  };
  NVDX.nv_pot=(g,e,t)=>{
    if(!use('pot'))return oP(g,e,t);
    g.save();g.translate(e.x,e.y);shadow(g,0,4,32,8,.26);
    g.drawImage(cmpImg('calderone-sassi-braci'),-32,-56);
    drawFlame(g,0,-8,t,.58);
    g.drawImage(cmpImg('calderone-tripode'),-32,-56);
    g.drawImage(cmpImg('calderone-liquido'),-32,-56);
    const meal=(S.tod>=11.5&&S.tod<14.2)||(S.tod>=18&&S.tod<21);
    for(let i=0;i<5;i++){
      const ph=(t*(meal?.5:.34)+i*.2)%1,a=(meal?.42:.26)*(1-ph);
      g.fillStyle='rgba(255,255,255,'+a.toFixed(3)+')';
      g.beginPath();g.arc(Math.sin(t*1.2+i*2.1)*5+ph*7,-30-ph*(meal?64:48),5+ph*(meal?13:9),0,7);g.fill();
    }
    g.restore();
  };
  NVDX.nv_table=(g,e,t)=>{
    if(!use('table'))return oT(g,e,t);
    g.save();g.translate(e.x,e.y);shadow(g,0,6,92,13,.25);
    const L=['tavolata-panca-dietro','tavolata-tavola','tavolata-piatto-1','tavolata-piatto-2','tavolata-piatto-3','tavolata-piatto-4','tavolata-piatto-5','tavolata-tazza-1','tavolata-tazza-2','tavolata-tazza-3','tavolata-tazza-4','tavolata-pane','tavolata-ciotola-bacche','tavolata-candela'];
    for(const n of L)g.drawImage(cmpImg(n),-88,-54);
    g.fillStyle='#ffb43a';g.beginPath();g.ellipse(146-88,-1-54+1.5,1.9,3.2+Math.sin(t*9)*.4,0,0,7);g.fill();   // fiamma della candela (animata dal codice)
    g.fillStyle='rgba(255,236,170,.55)';g.beginPath();g.ellipse(146-88,-1-54+2.5,1,1.8,0,0,7);g.fill();
    g.drawImage(cmpImg('tavolata-panca-davanti'),-88,-54);
    g.restore();
  };
  NVDX.nv_lant=(g,e,t)=>{
    if(!use('lant'))return oL(g,e,t);
    g.save();g.translate(e.x,e.y);shadow(g,0,3,14,5,.26);
    g.save();g.translate(0,3-84);g.rotate(Math.PI/2);g.drawImage(cmpImg('asta-corta'),0,-10);g.restore();   // asta di Muse, in piedi: il pomolo e' in cima
    const ay=-74;
    g.strokeStyle='#5a3d22';g.lineWidth=3.4;g.lineCap='round';g.beginPath();g.moveTo(0,ay);g.lineTo(15,ay);g.stroke();
    g.save();g.translate(15,ay);g.rotate(Math.sin(t*1.4+e.x*.02)*.05);
    g.strokeStyle='#2a2a30';g.lineWidth=1.2;g.beginPath();g.moveTo(0,0);g.lineTo(0,5);g.stroke();
    const night=skyLight(S.tod).dark>.04;
    g.fillStyle='#2e2e36';g.fillRect(-6.5,5,13,3);g.fillRect(-6.5,25,13,3);
    g.fillStyle=night?'rgba(255,222,140,.95)':'rgba(255,226,160,.7)';g.fillRect(-5,8,10,17);
    g.strokeStyle='#2e2e36';g.lineWidth=1.3;g.strokeRect(-5,8,10,17);g.beginPath();g.moveTo(0,8);g.lineTo(0,25);g.stroke();
    g.fillStyle='#ffb43a';g.beginPath();g.ellipse(0,19,2.2,3.6+Math.sin(t*9+e.x)*.5,0,0,7);g.fill();
    if(night){g.globalCompositeOperation='lighter';const q=g.createRadialGradient(0,17,2,0,17,40);q.addColorStop(0,'rgba(255,190,90,.45)');q.addColorStop(1,'rgba(255,150,50,0)');g.fillStyle=q;g.fillRect(-42,-24,84,84)}
    g.restore();g.restore();
  };
  NVDX.nv_bunt=(g,e,t)=>{
    if(!use('bunt'))return oB(g,e,t);
    const FL=['bandierina-rossa','bandierina-gialla','bandierina-azzurra','bandierina-crema','bandierina-verde'],co=cmpImg('corda');
    g.save();
    (e.seg||[]).forEach((s,si)=>{
      const x1=s[0],y1=s[1],x2=s[2],y2=s[3],sag=s[4];
      const cv=u=>[x1+(x2-x1)*u,y1+(y2-y1)*u+sag*4*u*(1-u)];
      const N=Math.max(2,Math.round(hyp(x2-x1,y2-y1)/40));
      for(let i=0;i<N;i++){const a=cv(i/N),b=cv((i+1)/N),dx=b[0]-a[0],dy=b[1]-a[1];
        g.save();g.translate(a[0],a[1]);g.rotate(Math.atan2(dy,dx));g.scale(hyp(dx,dy)/40,1);g.drawImage(co,0,-6);g.restore()}
      const n=Math.max(5,Math.round(hyp(x2-x1,y2-y1)/24));
      for(let i=1;i<n;i++){
        const p=cv(i/n);
        g.save();g.translate(p[0],p[1]);g.rotate(Math.sin(t*2.1+i*1.7+si)*.13);g.scale(.8,.8);
        g.drawImage(cmpImg(FL[(i+si)%5]),-8,-1);g.restore();
      }
    });
    g.restore();
  };
  NV2.addE=(k,x,y,o)=>{if(EID['nvd_'+k])return EID['nvd_'+k];const e=ent(Object.assign({id:'nvd_'+k,type:'deco',spr:'nv_'+k,x:x*TS,y:y*TS,nohit:1},o||{}));
    const cb=NVCBD[k]||(k==='lant1'||k==='lant2'?NVCBD.lant:null);if(cb){e.cb=cb;NVCB.push(e)}return e};
}
'''.replace('__ASSETS__',assets)
rep("NV2.addE=(k,x,y,o)=>{if(EID['nvd_'+k])return EID['nvd_'+k];return ent(Object.assign({id:'nvd_'+k,type:'deco',spr:'nv_'+k,x:x*TS,y:y*TS,nohit:1},o||{}))};",new.split("{\n  const oA=")[0]+"{\n  const oA="+new.split("{\n  const oA=")[1]+"NV2.addBunt_placeholder")
s=s.replace("NV2.addBunt_placeholder","")
rep('  {v:"0.11.5",d:"23 nov 2026",','  {v:"0.11.6",d:"23 nov 2026",t:"Il campo ridisegnato: incudine, calderone, tavolata e festone",n:[\n    "Grafica di prova: incudine con ceppo (il martello resta sopra quando Nives non batte), calderone sul tripode, tavolata con panche, piatti, pane e candela, festone con bandierine di tela e il palo della lanterna sono disegni nuovi di Muse.",\n    "Incudine, calderone, tavolata e pali delle lanterne ora hanno la collisione: non si attraversano più, né tu né i personaggi del campo.",\n  ]},\n  {v:"0.11.5",d:"23 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok151')
