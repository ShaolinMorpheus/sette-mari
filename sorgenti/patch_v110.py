#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH110 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
# 1) helper + bake
rep("function caveBake(){\n  const G=CVX.G,W=CV_W*TS,H=CV_H*TS,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),r=mulberry(99);\n",
r"""const CVD=__CVD__,CVO={};function cvg(k){if(!CVD[k])return null;let o=CVO[k];if(!o){o=CVO[k]=new Image();o.src='data:image/webp;base64,'+CVD[k]}return o.complete&&o.naturalWidth?o:null}
const CVG_K=['fondo-a','fondo-b','fondo-c','parete','parete-bordo','pozza'];
function cvgReady(){if(!VEGPG||!GFXN)return false;let ok=true;for(const k of CVG_K)if(!cvg(k))ok=false;return ok}
function cvBakeGfx(g,G,W,H){
  const BL=6,hs=(a,b)=>{let h=(a*73856093^b*19349663)>>>0;h=(h^(h>>>13))*1274126177>>>0;return (h^(h>>>16))>>>0};
  const fl=[cvg('fondo-a'),cvg('fondo-b'),cvg('fondo-c')],pa=cvg('parete'),bo=cvg('parete-bordo'),po=cvg('pozza');
  g.fillStyle='#0b0a0c';g.fillRect(0,0,W,H);
  const S0=BL*TS,mir=(t2,im)=>{for(let by=0;by*S0<H;by++)for(let bx=0;bx*S0<W;bx++){t2.save();t2.translate(bx*S0+(bx%2?S0:0),by*S0+(by%2?S0:0));t2.scale(bx%2?-1:1,by%2?-1:1);t2.drawImage(im,0,0,S0,S0);t2.restore()}};
  const mk=()=>{const q=document.createElement('canvas');q.width=W;q.height=H;return q};
  const FL=mk(),fg=FL.getContext('2d');mir(fg,fl[0]);
  {const rp=mulberry(2024),n=Math.round(CV_W*CV_H/38),pc=document.createElement('canvas'),pS=7*TS;pc.width=pc.height=pS;const pg=pc.getContext('2d');
   for(let i=0;i<n;i++){const im=fl[1+((rp()*2)|0)],cx=rp()*W,cy=rp()*H;pg.globalCompositeOperation='source-over';pg.clearRect(0,0,pS,pS);
     pg.save();if(rp()<.5){pg.translate(pS,0);pg.scale(-1,1)}pg.drawImage(im,0,0,pS,pS);pg.restore();
     pg.globalCompositeOperation='destination-in';const m=pg.createRadialGradient(pS/2,pS/2,pS*.1,pS/2,pS/2,pS/2);m.addColorStop(0,'rgba(0,0,0,1)');m.addColorStop(.55,'rgba(0,0,0,.8)');m.addColorStop(1,'rgba(0,0,0,0)');pg.fillStyle=m;pg.fillRect(0,0,pS,pS);
     fg.drawImage(pc,cx-pS/2,cy-pS/2)}}
  const WLc=mk(),wg=WLc.getContext('2d');mir(wg,pa);
  g.drawImage(FL,0,0);
  g.save();g.beginPath();for(let y=0;y<CV_H;y++)for(let x=0;x<CV_W;x++)if(G[y][x]===0)g.rect(x*TS-.3,y*TS-.3,TS+.6,TS+.6);g.clip();g.drawImage(WLc,0,0);g.restore();
  // bordo irregolare lungo i muri (ritagliato ai soli muri)
  g.save();g.beginPath();for(let y=0;y<CV_H;y++)for(let x=0;x<CV_W;x++)if(G[y][x]===0)g.rect(x*TS,y*TS,TS,TS);g.clip();
  const bh=bo.naturalHeight/(bo.naturalWidth/BL)*TS;
  for(let y=0;y<CV_H-1;y++)for(let x=0;x<CV_W;x++){
    if(G[y][x]!==0||G[y+1][x]===0)continue;
    const sw=bo.naturalWidth/BL,sx=(x%BL)*sw;g.drawImage(bo,sx,0,sw,bo.naturalHeight,x*TS-.3,(y+1)*TS+4-bh,TS+.6,bh);
  }
  g.restore();
  // penombra a ridosso dei muri sul pavimento
  for(let y=1;y<CV_H-1;y++)for(let x=1;x<CV_W-1;x++){
    if(G[y][x]===0)continue;const px=x*TS,py=y*TS;
    if(G[y-1][x]===0){const q=g.createLinearGradient(0,py,0,py+26);q.addColorStop(0,'rgba(0,0,0,.38)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(px,py,TS,26)}
    if(G[y][x-1]===0){const q=g.createLinearGradient(px,0,px+30,0);q.addColorStop(0,'rgba(0,0,0,.5)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(px,py,30,TS)}
    if(G[y][x+1]===0){const q=g.createLinearGradient(px+TS,0,px+TS-30,0);q.addColorStop(0,'rgba(0,0,0,.5)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(px+TS-30,py,30,TS)}
    if(G[y+1]&&G[y+1][x]===0){const q=g.createLinearGradient(0,py+TS,0,py+TS-12);q.addColorStop(0,'rgba(0,0,0,.25)');q.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=q;g.fillRect(px,py+TS-12,TS,12)}
  }
  // pozze: una per gruppo di celle d'acqua
  const seen={};
  for(let y=0;y<CV_H;y++)for(let x=0;x<CV_W;x++){
    if(G[y][x]!==2||seen[x+','+y])continue;
    let x0=x,x1=x,y0=y,y1=y;const st=[[x,y]];seen[x+','+y]=1;
    while(st.length){const[a,b]=st.pop();x0=Math.min(x0,a);x1=Math.max(x1,a);y0=Math.min(y0,b);y1=Math.max(y1,b);for(const d of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=a+d[0],ny=b+d[1];if(G[ny]&&G[ny][nx]===2&&!seen[nx+','+ny]){seen[nx+','+ny]=1;st.push([nx,ny])}}}
    const w=(x1-x0+1+.9)*TS,h=Math.max((y1-y0+1+.9)*TS,w*.5),cx=(x0+x1+1)/2*TS,cy=(y0+y1+1)/2*TS;
    g.drawImage(po,cx-w/2,cy-h/2,w,h);
  }
}
function caveBake(){
  const G=CVX.G,W=CV_W*TS,H=CV_H*TS,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),r=mulberry(99);
  if(cvgReady()){
    CVX.gfxOK=true;cvBakeGfx(g,G,W,H);
    const wt=[];for(let y=0;y<CV_H;y++)for(let x=0;x<CV_W;x++)if(G[y][x]===2)wt.push([x,y]);
    CVX.wt=wt;CVX.canvas=c;return;
  }
""")
# 2) rebake when assets arrive
rep("  if(!CVX)return;if(!CVX.canvas)caveBake();\n  g.setTransform(DPR*z,0,0,DPR*z,DPR*(VW/2-cam.x*z),DPR*(VH/2-cam.y*z));",
    "  if(!CVX)return;if(CVX.canvas&&!CVX.gfxOK&&cvgReady())CVX.canvas=null;if(!CVX.canvas)caveBake();\n  g.setTransform(DPR*z,0,0,DPR*z,DPR*(VW/2-cam.x*z),DPR*(VH/2-cam.y*z));")
# 3) stalagmiti e cristalli con sprite
rep("function drawCaveStalag(g,s,t){\n",
"""function drawCaveStalag(g,s,t){
  {const k=s.s>1.15?'stalagmite-2':(s.k?'stalagmite-3':'stalagmite-2'),im=VEGPG&&GFXN?cvg(k):null;
   if(im){const w=(k==='stalagmite-2'?58:48)*Math.max(.8,s.s*.85),h=w*im.naturalHeight/im.naturalWidth;shadow(g,s.x,s.y+1,w*.3,5,.3);g.drawImage(im,s.x-w/2,s.y-h+h*.1,w,h);return}}
""")
rep("function drawCrystal(g,c,t){\n",
"""function drawCrystal(g,c,t){
  {const im=VEGPG&&GFXN?cvg(c.h<.5?'cristalli-teal':'cristalli-viola'):null;
   if(im){const w=64,h=w*im.naturalHeight/im.naturalWidth;g.drawImage(im,c.x-w/2,c.y-h*.88,w,h);return}}
""")
# 4) torce a parete (solo grotta grande) con alone
rep("  ent({id:'cavex',type:'deco',spr:'cavex',x:(CV_X0+16)*TS,y:(CV_Y0+11.3)*TS,inter:'look',hitw:170,hith:80,label:'Uscita'});",
"""  CVX.tz=[];{const rt=mulberry(31337),cand=roost.slice();for(let i=cand.length-1;i>0;i--){const j=(rt()*(i+1))|0;[cand[i],cand[j]]=[cand[j],cand[i]]}
    for(const q of cand){if(CVX.tz.length>=7)break;if(CVX.tz.some(u=>Math.hypot(u[0]-q[0],u[1]-q[1])<6.5)||Math.hypot(q[0]-16,q[1]-11)<3.5)continue;CVX.tz.push([q[0],q[1],rt()*6])}}
  ent({id:'cavex',type:'deco',spr:'cavex',x:(CV_X0+16)*TS,y:(CV_Y0+11.3)*TS,inter:'look',hitw:170,hith:80,label:'Uscita'});""")
rep("  for(const s of CVX.st)list.push({y:s.y,d:()=>drawCaveStalag(g,s,t)});\n",
"""  for(const s of CVX.st)list.push({y:s.y,d:()=>drawCaveStalag(g,s,t)});
  if(CVX.tz&&VEGPG&&GFXN){const tim=cvg('torcia-parete'),aim=cvg('alone-torcia');if(tim)for(const q of CVX.tz){const x=(CV_X0+q[0]+.5)*TS,y=(CV_Y0+q[1]+.78)*TS;if(x<vx0-80||x>vx1+80||y<vy0-120||y>vy1+80)continue;
    list.push({y:y,d:()=>{const w=58,h=w*tim.naturalHeight/tim.naturalWidth;g.drawImage(tim,x-w/2,y-h+6,w,h);if(aim){const f=.8+.2*Math.sin(t*11+q[2])+.05*Math.sin(t*5.3+q[2]);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.55*f;const aw=150;g.drawImage(aim,x-aw/2,y-h*.7-aw/2+6,aw,aw);g.restore()}}})}}
""")
rep("  const ex=EID.cavex;if(ex)lights.push([ex.x,ex.y-20,150,.6,false,[255,236,180]]);\n  if(!LCV)",
"""  const ex=EID.cavex;if(ex)lights.push([ex.x,ex.y-20,150,.6,false,[255,236,180]]);
  if(CVX.tz&&VEGPG&&GFXN)for(const q of CVX.tz){const x=(CV_X0+q[0]+.5)*TS,y=(CV_Y0+q[1]+.78)*TS;if(x>vx0-260&&x<vx1+260&&y>vy0-260&&y<vy1+260)lights.push([x,y-34,190,.82,true,[255,190,110]])}
  if(!LCV)""")
src=src.replace('__CVD__',open('/home/claude/work/mz_cave.json').read(),1)
open(P,'w',encoding='utf8').write(src);print('patch110 ok')
