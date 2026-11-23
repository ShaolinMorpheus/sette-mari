import sys,json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('FAIL',s.count(a),a[:80]);sys.exit(1)
    s=s.replace(a,b)
NVSD=open('/home/claude/work/nvd.json').read().strip()
IM=[open('/home/claude/work/nav_s%d.b64'%i).read().strip() for i in (1,2,3)]
# 1) caricamento dei 3 stadi (relitto / riparazione / riparata) al posto della nave a due alberi
i=s.index("try{if(VEGPG){const CUT=");j=s.index("GfxNew.rub();",i)
NEW="""try{if(VEGPG){const mkS=(b64,nm)=>{const im=new Image();im.onload=()=>{const W=430,H=330;const[c,x]=mk(W,H);x.drawImage(im,0,0,W,H);SP[nm]={c,w:W,h:H,ax:215,ay:295,nav:1,_x:x}};im.src='data:image/webp;base64,'+b64};
  mkS('%s','navS1');mkS('%s','navS2');mkS('%s','navS3')}}catch(e){}""" % tuple(IM)
s=s[:i]+NEW+s[j:]
# 2) funzioni: dati per stadio
a=s.index("const NVK=");b=s.index("function navSpr(c)")
s=s[:a]+"const NVSD=%s;\n" % NVSD + s[b:]
a=s.index("function nvSP(e)");b=s.index("function nvInPoly")
s=s[:a]+"""function nvSP(e){const m={wreck2:'navS1',shipMid:'navS2',shipFix:'navS3'}[e.spr];return m&&SP[m]||null}
function nvLn(a,px){if(px<=a[0][0])return a[0][1];for(let i=1;i<a.length;i++)if(px<=a[i][0]){const p=a[i-1],q=a[i];return p[1]+(q[1]-p[1])*(px-p[0])/(q[0]-p[0])}return a[a.length-1][1]}
function nvStrips(e,list){const k=e.k||1,d=NVSD[e.spr];if(!d)return;const N=10,w=(d.x1-d.x0)/N;for(let i=0;i<N;i++){const cx=d.x0+w*(i+.5);list.push({type:'navestrip',e,i,N,sy:e.y+64*k+(nvLn(d.b,cx)-295)*k})}}
function drawNaveStrip(g,o){const e=o.e,k=e.k||1,s=nvSP(e),d=NVSD[e.spr];if(!s||!d)return;const w=(d.x1-d.x0)/o.N;
  g.save();g.translate(e.x+52*k,e.y+62*k);
  const l=o.i?(d.x0+w*o.i-215)*k-.5:-999,r=o.i<o.N-1?(d.x0+w*(o.i+1)-215)*k+.5:999;
  g.beginPath();g.rect(l,-700,r-l,1500);g.clip();drawSp(g,s,0,2*k,k);g.restore()}
"""+s[b:]
a=s.index("var NV_KEY=''");b=s.index("function drawTargetRing(g,t){")
s=s[:a]+"""var NV_KEY='',NV_CELLS=[];
function navBlkSync(e){const d=NVSD[e.spr];const key=e.x+','+e.y+','+(e.k||1)+','+e.spr;if(key===NV_KEY)return;NV_KEY=key;
  for(const c of NV_CELLS)blockRect(c[0],c[1],1,1,-1);NV_CELLS=[];if(!d)return;
  const k=e.k||1,ox=e.x+52*k,oy=e.y+64*k,W=q=>[ox+(q[0]-215)*k,oy+(q[1]-295)*k];
  const pts=d.t.map(W).concat(d.b.slice().reverse().map(W));
  let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const p of pts){x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])}
  for(let ty=Math.floor(y0/TS);ty<=Math.floor(y1/TS);ty++)for(let tx=Math.floor(x0/TS);tx<=Math.floor(x1/TS);tx++){
    if(!inMap(tx,ty))continue;const cx=(tx+.5)*TS,cy=(ty+.5)*TS,dd=TS*.3;
    if(nvInPoly(pts,cx,cy)||nvInPoly(pts,cx-dd,cy-dd)||nvInPoly(pts,cx+dd,cy-dd)||nvInPoly(pts,cx-dd,cy+dd)||nvInPoly(pts,cx+dd,cy+dd)){blockRect(tx,ty,1,1,1);NV_CELLS.push([tx,ty])}}
  try{const px=Math.floor(P.x/TS),py=Math.floor(P.y/TS);if(blockT[py*MW+px]>0){let best=null,bd=1e9;for(let dy=-8;dy<=8;dy++)for(let dx=-8;dx<=8;dx++){const tx=px+dx,ty=py+dy;if(inMap(tx,ty)&&blockT[ty*MW+tx]<=0){const q=dx*dx+dy*dy;if(q<bd){bd=q;best=[tx,ty]}}}if(best){P.x=(best[0]+.5)*TS;P.y=(best[1]+.5)*TS}}}catch(e){}
}
"""+s[b:]
# 3) anello
a=s.index("  else if(e.id==='nave'){const k=e.k||1;x=e.x+52*k+4*k");b=s.index("  else if(e.fp){x=(e.fp[0]+e.fp[2]/2)*TS;")
s=s[:a]+"  else if(e.id==='nave'&&NVSD[e.spr]){const k=e.k||1,r=NVSD[e.spr].ring;x=e.x+52*k+(r[0]-215)*k;y=e.y+64*k+(r[1]-295)*k;rx=r[2]*k;ry=r[3]*k;rot=r[4]}\n"+s[b:]
# 4) disegno
rep("if(s===SP.shipFixM||s===SP.shipMidM){const kk","if(s.nav){const kk")
open(P,'w',encoding='utf8').write(s);print('patch135 ok')
