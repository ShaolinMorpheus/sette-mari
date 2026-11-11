#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH50 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# i blocchi di tile di casse/barili/forzieri sono già rappresentati dal rettangolo preciso: niente riquadro di tile in più (era il muro invisibile davanti)
rep("if(b>sm&&!plotTile(tx,ty)){","if(b>sm&&!plotTile(tx,ty)&&!(OBRT[i]>=b-sm)){")
rep("    if(!(OBRT[i]>=b-sm)&&x+rx>bx0&&x-rx<bx1&&y+ry>by0&&y-ry<by1)return false;","    if(x+rx>bx0&&x-rx<bx1&&y+ry>by0&&y-ry<by1)return false;")
# tasto «Muri» nell'editor: mostra in rosso dove il personaggio non può passare
rep('<button class="btn" id="edGr">Griglia</button>','<button class="btn" id="edGr">Griglia</button><button class="btn" id="edWl">Muri</button>')
rep("$$('edGr').onclick=()=>{ED.grid=!ED.grid};","$$('edGr').onclick=()=>{ED.grid=!ED.grid};\n  $$('edWl').onclick=()=>{ED.walls=!ED.walls;$$('edWl').classList.toggle('gold',!!ED.walls)};")
rep("function edDraw(){\n  if(!ED.on||(!ED.x&&(inCave()||inHut())))return;\n  const g=ctx,z=camZoom();\n  g.setTransform(DPR*z,0,0,DPR*z,DPR*(VW/2-cam.x*z),DPR*(VH/2-cam.y*z));\n  const vx0=cam.x-VW/2/z,vy0=cam.y-VH/2/z,vx1=cam.x+VW/2/z,vy1=cam.y+VH/2/z;\n",
"""function edWalls(g,z,vx0,vy0,vx1,vy1){
  try{
    if(window.__obrDirty){window.__obrDirty=0;obrBuild()}
    const st=Math.max(5,Math.sqrt((vx1-vx0)*(vy1-vy0)/16000));
    g.fillStyle='rgba(255,40,40,.38)';
    for(let y=Math.floor(vy0/st)*st;y<vy1;y+=st)for(let x=Math.floor(vx0/st)*st;x<vx1;x+=st){
      const tx=Math.floor(x/TS),ty=Math.floor(y/TS);if(!inMap(tx,ty)||seaT[tIdx(tx,ty)]===1)continue;
      if(!boxFree(x,y,9,5))g.fillRect(x-st/2,y-st/2,st,st);
    }
    g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=1.5/z;
    for(const o of OBR)g.strokeRect(o.x0,o.y0,o.x1-o.x0,o.y1-o.y0);
  }catch(_){}
}
function edDraw(){
  if(!ED.on||(!ED.x&&(inCave()||inHut())))return;
  const g=ctx,z=camZoom();
  g.setTransform(DPR*z,0,0,DPR*z,DPR*(VW/2-cam.x*z),DPR*(VH/2-cam.y*z));
  const vx0=cam.x-VW/2/z,vy0=cam.y-VH/2/z,vx1=cam.x+VW/2/z,vy1=cam.y+VH/2/z;
  if(ED.walls&&!ED.x)edWalls(g,z,vx0,vy0,vx1,vy1);
""")

# ---- modifica dei muri dall'editor: disegna / cancella, salvati nel codice mappa (campo wl) ----
rep("const PLB={","const WOV=new Map(),WLC=11;   // muri modificati dall'editor: cella 11 px -> 1 muro, 0 libero\nconst PLB={")
rep("function boxFree(x,y,rx,ry){\n","function boxFree(x,y,rx,ry){\n  if(WOV.size){const w=WOV.get(((y/WLC)|0)*20000+((x/WLC)|0));if(w===1)return false;if(w===0){const tx=Math.floor(x/TS),ty=Math.floor(y/TS);if(inMap(tx,ty)&&seaT[tIdx(tx,ty)]!==1&&!mesaT[tIdx(tx,ty)])return true}}\n")
rep("t:(o&&o.t)||[]});","t:(o&&o.t)||[],wl:(o&&o.wl)||[]});")
rep("  if(!o)return;o=edNorm(o);\n","  if(!o)return;o=edNorm(o);\n  for(const c of o.wl)WOV.set(c[1]*20000+c[0],c[2]);\n")
rep("edApply(ED.ed)}catch(e){console.warn('ED local',e)}","edApply(ED.ed);ED._lm=new Map(ED.ed.wl.map(c=>[c[1]*20000+c[0],c]))}catch(e){console.warn('ED local',e)}")
rep("t:ED.ed.t};const n=edNamesLocal();","t:ED.ed.t};if(ED.ed.wl&&ED.ed.wl.length)o.wl=ED.ed.wl;const n=edNamesLocal();")
rep('<button class="btn" id="edWl">Muri</button>','<button class="btn" id="edWl">Muri</button><button class="btn" id="edWa" hidden>Disegna muro</button><button class="btn" id="edWd" hidden>Cancella muro</button><button class="btn" id="edWs" hidden>Pennello M</button>')
rep("$$('edWl').onclick=()=>{ED.walls=!ED.walls;$$('edWl').classList.toggle('gold',!!ED.walls)};",
"""$$('edWl').onclick=()=>{if(ED.x){UI.toast('Qui non è disponibile.',1800);return}ED.walls=!ED.walls;if(!ED.walls)ED.wm=null;edWB()};
  $$('edWa').onclick=()=>{ED.wm=ED.wm==='add'?null:'add';ED.brush=null;edBar2();ED.sel=null;edLabel();edWB();if(ED.wm)UI.toast('Disegna: trascina il dito dove vuoi un muro.',2400)};
  $$('edWd').onclick=()=>{ED.wm=ED.wm==='del'?null:'del';ED.brush=null;edBar2();ED.sel=null;edLabel();edWB();if(ED.wm)UI.toast('Cancella: trascina il dito sul rosso per togliere il muro.',2600)};
  $$('edWs').onclick=()=>{ED.ws=((ED.ws==null?1:ED.ws)+1)%3;edWB()};""")
rep("function edWalls(g,z,vx0,vy0,vx1,vy1){","""function edWB(){const b=document.getElementById('edBar');if(!b)return;const q=i=>b.querySelector('#'+i);q('edWl').classList.toggle('gold',!!ED.walls);['edWa','edWd','edWs'].forEach(i=>q(i).hidden=!ED.walls);q('edWa').classList.toggle('gold',ED.wm==='add');q('edWd').classList.toggle('gold',ED.wm==='del');q('edWs').textContent='Pennello '+['S','M','L'][ED.ws==null?1:ED.ws]}
function edWPaint(wx,wy,v,rec){
  const r=[1,2,4][ED.ws==null?1:ED.ws],cx0=Math.floor(wx/WLC),cy0=Math.floor(wy/WLC);if(!ED._lm)ED._lm=new Map();
  for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){
    if(i*i+j*j>r*r+r*.5)continue;const cx=cx0+i,cy=cy0+j;if(cx<0||cy<0)continue;const k=cy*20000+cx;
    if(rec.has(k))continue;let c=ED._lm.get(k);rec.set(k,[WOV.get(k),c?c[2]:undefined]);
    WOV.set(k,v);if(c)c[2]=v;else{c=[cx,cy,v];ED._lm.set(k,c);ED.ed.wl.push(c)}
  }
  ED.dirty=true;
}
function edWUndo(rec){
  for(const[k,pv]of rec){
    if(pv[0]===undefined)WOV.delete(k);else WOV.set(k,pv[0]);
    const c=ED._lm.get(k);if(c){if(pv[1]===undefined){ED._lm.delete(k);const i=ED.ed.wl.indexOf(c);if(i>=0)ED.ed.wl.splice(i,1)}else c[2]=pv[1]}
  }
  edStore();
}
function edWalls(g,z,vx0,vy0,vx1,vy1){""")
rep("    g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=1.5/z;\n    for(const o of OBR)","    for(const[k,v]of WOV){const cx=(k%20000)*WLC,cy=Math.floor(k/20000)*WLC;if(cx<vx0-WLC||cx>vx1||cy<vy0-WLC||cy>vy1)continue;g.fillStyle=v?'rgba(255,0,200,.5)':'rgba(60,255,120,.45)';g.fillRect(cx,cy,WLC,WLC)}\n    g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=1.5/z;\n    for(const o of OBR)")
rep("    if(ED.brush){ED.paint={lx:wx,ly:wy,n:0};edPaint(wx,wy);return}","    if(ED.walls&&ED.wm&&!ED.brush){ED.wp={lx:wx,ly:wy,rec:new Map()};edWPaint(wx,wy,ED.wm==='add'?1:0,ED.wp.rec);return}\n    if(ED.brush){ED.paint={lx:wx,ly:wy,n:0};edPaint(wx,wy);return}")
rep("    if(ED.paint){const[wx,wy]=edW(sx,sy);","    if(ED.wp){const[wx,wy]=edW(sx,sy),d=Math.hypot(wx-ED.wp.lx,wy-ED.wp.ly),n=Math.max(1,Math.ceil(d/5));for(let i=1;i<=n;i++)edWPaint(ED.wp.lx+(wx-ED.wp.lx)*i/n,ED.wp.ly+(wy-ED.wp.ly)*i/n,ED.wm==='add'?1:0,ED.wp.rec);ED.wp.lx=wx;ED.wp.ly=wy;return}\n    if(ED.paint){const[wx,wy]=edW(sx,sy);")
rep("ED.pt.delete(e.pointerId);\n    if(ED.paint){const n=ED.paint.n;","ED.pt.delete(e.pointerId);\n    if(ED.wp){const rec=ED.wp.rec;ED.wp=null;edStore();if(rec.size)ED.undo.push(()=>edWUndo(rec));return}\n    if(ED.paint){const n=ED.paint.n;")

k='    "Conchiglie più piccole'
rep(k,'    "Editor mappa: tasto «Muri»: mostra in rosso dove il personaggio non può passare e permette di disegnare o cancellare i muri a mano (finiscono nel «Codice»).",\n'+k) if src.count(k)==1 else None
open(P,'w',encoding='utf8').write(src);print('patch50 ok')
