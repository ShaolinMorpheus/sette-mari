import sys,json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('FAIL',s.count(a),a[:70]);sys.exit(1)
    s=s.replace(a,b)
NVK=open('/home/claude/work/nvk.json').read().strip()
# 1) tartarughe via
rep("if(k===0){const a=t*.12+i,x=gl[0]","if(false&&k===0){const a=t*.12+i,x=gl[0]")
# 2) collisione: tolgo il blocco rettangolare, la calcolo dalla sagoma dello scafo
rep("label:'La nave dei Fuggiaschi',inter:'look',flip:true});\n  blockRect(69,45,5,1,1);\n};","label:'La nave dei Fuggiaschi',inter:'look',flip:true});\n};")
rep("deco('nave','wreck2',CV2.ship[0],CV2.ship[1],[68,45,6,2],{k:.95","deco('nave','wreck2',CV2.ship[0],CV2.ship[1],null,{k:.95")
HELP="""
/* ---- la Sirena: scafo con collisione, vele e sartie dietro cui si passa, anello attorno allo scafo ---- */
var NVPREV=0;try{NVPREV=+localStorage.getItem('sm_nvprev')||0}catch(e){}
const NVK=%s;
const NVT=[[210,800],[400,790],[600,780],[800,740],[1000,690],[1200,650],[1400,590],[1490,553]];
const NVE=[150,330,470,610,750,890,1030,1170,1310,1450,1720];
function navSpr(c){return NVPREV?['','wreck2','shipMid','shipFix'][NVPREV]:(c.parts.yard?'shipFix':'wreck2')}
function nvSP(e){return e.spr==='shipMid'?(SP.shipMidM||SP.shipFixM):(e.spr==='shipFix'?SP.shipFixM:null)}
function nvKy(px){if(px<=NVK[0][0])return NVK[0][1];for(let i=1;i<NVK.length;i++)if(px<=NVK[i][0]){const a=NVK[i-1],b=NVK[i];return a[1]+(b[1]-a[1])*(px-a[0])/(b[0]-a[0])}return NVK[NVK.length-1][1]}
function nvStrips(e,list){const k=e.k||1;for(let i=0;i<NVE.length-1;i++){const cx=Math.min(1440,(NVE[i]+NVE[i+1])/2);list.push({type:'navestrip',e,i,sy:e.y+64*k+(nvKy(cx)/4-295)*k})}}
function drawNaveStrip(g,o){const e=o.e,k=e.k||1,s=nvSP(e);if(!s)return;const n=NVE.length-1;
  g.save();g.translate(e.x+52*k,e.y+62*k);
  const l=o.i?(NVE[o.i]/4-215)*k-.5:-999,r=o.i<n-1?(NVE[o.i+1]/4-215)*k+.5:999;
  g.beginPath();g.rect(l,-700,r-l,1500);g.clip();drawSp(g,s,0,2*k,k);g.restore()}
function nvInPoly(pts,x,y){let c=false;for(let i=0,j=pts.length-1;i<pts.length;j=i++){const a=pts[i],b=pts[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
var NV_KEY='',NV_CELLS=[];
function navBlkSync(e){const key=e.x+','+e.y+','+(e.k||1);if(key===NV_KEY)return;NV_KEY=key;
  for(const c of NV_CELLS)blockRect(c[0],c[1],1,1,-1);NV_CELLS=[];
  const k=e.k||1,ox=e.x+52*k,oy=e.y+64*k,W=(px,py)=>[ox+(px/4-215)*k,oy+(py/4-295)*k];
  const pts=NVT.map(q=>W(q[0],q[1])).concat(NVK.slice().reverse().map(q=>W(q[0],q[1]))).concat([W(240,983)]);
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const p of pts){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])}
  for(let ty=Math.floor(y0/TS);ty<=Math.floor(y1/TS);ty++)for(let tx=Math.floor(x0/TS);tx<=Math.floor(x1/TS);tx++){
    if(!inMap(tx,ty))continue;const cx=(tx+.5)*TS,cy=(ty+.5)*TS,d=TS*.3;
    if(nvInPoly(pts,cx,cy)||nvInPoly(pts,cx-d,cy-d)||nvInPoly(pts,cx+d,cy-d)||nvInPoly(pts,cx-d,cy+d)||nvInPoly(pts,cx+d,cy+d)){blockRect(tx,ty,1,1,1);NV_CELLS.push([tx,ty])}}
  // se il giocatore e' finito dentro lo scafo lo sposto sul punto libero piu' vicino
  try{const px=Math.floor(P.x/TS),py=Math.floor(P.y/TS);if(blockT[py*MW+px]>0){let best=null,bd=1e9;for(let dy=-8;dy<=8;dy++)for(let dx=-8;dx<=8;dx++){const tx=px+dx,ty=py+dy;if(inMap(tx,ty)&&blockT[ty*MW+tx]<=0){const d=dx*dx+dy*dy;if(d<bd){bd=d;best=[tx,ty]}}}if(best){P.x=(best[0]+.5)*TS;P.y=(best[1]+.5)*TS}}}catch(e){}
}
""" % NVK
rep("function drawTargetRing(g,t){",HELP+"function drawTargetRing(g,t){")
rep("let x=e.x,y=e.y-4,rx=30,ry=11;","let x=e.x,y=e.y-4,rx=30,ry=11,rot=0;")
rep("  else if(e.fp){x=(e.fp[0]+e.fp[2]/2)*TS;","  else if(e.id==='nave'){const k=e.k||1;x=e.x+52*k+4*k;y=e.y+64*k-69*k;rx=168*k;ry=42*k;rot=-.33}\n  else if(e.fp){x=(e.fp[0]+e.fp[2]/2)*TS;")
rep("g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);g.stroke();g.setLineDash([]);\n  g.fillStyle='rgba(255,226,110,.1)'","g.beginPath();g.ellipse(x,y,rx,ry,rot,0,7);g.stroke();g.setLineDash([]);\n  g.fillStyle='rgba(255,226,110,.1)'")
# disegno a strisce
rep("    list.push(e);\n  }\n  list.push(P);if(S.flags.parrot)","    if(e.id==='nave'&&nvSP(e)){nvStrips(e,list);continue}\n    list.push(e);\n  }\n  list.push(P);if(S.flags.parrot)")
rep("      case'tree':case'pine':drawTree(g,e,t);break;","      case'navestrip':drawNaveStrip(g,e);break;\n      case'tree':case'pine':drawTree(g,e,t);break;")
rep("const s=(e.id==='nave'&&e.spr==='shipFix'&&SP.shipFixM)||spriteOf(e.spr);if(!s)return;","const s=(e.id==='nave'&&nvSP(e))||spriteOf(e.spr);if(!s)return;")
rep("if(s===SP.shipFixM){const kk","if(s===SP.shipFixM||s===SP.shipMidM){const kk")
# stati
rep("const nv=EID.nave;if(nv){const sp=c.parts.yard?'shipFix':'wreck2';if(nv.spr!==sp)nv.spr=sp}","const nv=EID.nave;if(nv){const sp=navSpr(c);if(nv.spr!==sp)nv.spr=sp;navBlkSync(nv)}")
rep("EID.nave.spr=c.parts.yard?'shipFix':'wreck2'","EID.nave.spr=navSpr(c)")
rep("+T('mC2','⛺','Il campo',null)","+T('mNvP','⚓','Anteprima nave',['automatica','1 · da riparare','2 · in riparazione','3 · riparata'][NVPREV],'tgl'+(NVPREV?' on':''))+T('mC2','⛺','Il campo',null)")
rep("  {const bb=c.querySelector('#mBrP');","  {const nb=c.querySelector('#mNvP');if(nb)nb.onclick=()=>{NVPREV=(NVPREV+1)%4;try{localStorage.setItem('sm_nvprev',''+NVPREV)}catch(e){}const n=EID.nave;if(n)n.spr=navSpr(C());UI.openMenu();UI.toast('Nave: '+['stadio automatico','1 · da riparare','2 · in riparazione','3 · riparata'][NVPREV]+(NVPREV&&!(GFXN&&VEGPG)?' (accendi Grafica di prova e Mappa di prova per vedere il disegno nuovo)':''))}}\n  {const bb=c.querySelector('#mBrP');")
# stadio 2 provvisorio: stessa nave senza vele
rep("SP.shipFixM={c,w:W,h:H,ax:215,ay:295,_x:x}};\n  im.src","SP.shipFixM={c,w:W,h:H,ax:215,ay:295,_x:x};\n  try{const[c2,x2]=mk(W,H);x2.drawImage(c,0,0,W,H);const d=x2.getImageData(0,0,c2.width,c2.height),q=d.data;for(let i=0;i<q.length;i+=4){const r=q[i],g2=q[i+1],b=q[i+2];if(q[i+3]&&b>r*1.2+8&&b>g2+10)q[i+3]=0}x2.putImageData(d,0,0);SP.shipMidM={c:c2,w:W,h:H,ax:215,ay:295,_x:x2}}catch(e){}};\n  im.src")
open(P,'w',encoding='utf8').write(s);print('patch134 ok')
