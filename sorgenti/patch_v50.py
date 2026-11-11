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
k='    "Conchiglie più piccole'
rep(k,'    "Editor mappa: nuovo tasto «Muri» che mostra in rosso dove il personaggio non può passare (muri invisibili compresi).",\n'+k) if src.count(k)==1 else None
open(P,'w',encoding='utf8').write(src);print('patch50 ok')
