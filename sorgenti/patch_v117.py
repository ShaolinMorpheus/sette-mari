#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH117 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
# 1) livello fuori dal riquadro dell'orologio
rep("#clkT,#lvN{white-space:nowrap}",
"#clkT,#lvN{white-space:nowrap}\n#clock{width:auto!important;min-width:max-content;box-sizing:border-box;padding-right:18px!important;gap:3px!important}#clkT{width:auto!important;min-width:0!important}#lvN{flex:none}")
# 2) scala del Pino Alto: il personaggio sale sulla scala di corda (16 px a destra del centro)
rep("const bx=e.x+(e.cx||0),by=e.y+10;","const bx=e.x+(e.cx||(e.id==='lookout'?15:0)),by=e.y+10;")
# 3) le rane saltano davvero da un punto all'altro
rep("  for(const f of AMB.frog){f.hop=Math.max(0,f.hop-dt*2.2);if(night&&Math.random()<dt*.15)f.hop=1}",
"""  for(const f of AMB.frog){
    if(f.hx==null){f.hx=f.x;f.hy=f.y;f.dir=1;f.tx=null}
    const was=f.hop;f.hop=Math.max(0,f.hop-dt*2.2);
    if(f.tx!=null){const k=1-f.hop;f.x=f.sx+(f.tx-f.sx)*k;f.y=f.sy+(f.ty-f.sy)*k;if(f.hop===0){f.x=f.tx;f.y=f.ty;f.tx=null}}
    if(f.hop===0&&f.tx==null&&Math.random()<dt*(night?.32:.05)){
      const a=Math.random()*6.283,d=12+Math.random()*18;let nx=f.x+Math.cos(a)*d,ny=f.y+Math.sin(a)*d;
      if(hyp(nx-f.hx,ny-f.hy)>3.2*TS){nx=f.x+(f.hx-f.x)*.5;ny=f.y+(f.hy-f.y)*.5}
      if(ambLand(nx,ny)&&freeT(Math.floor(nx/TS),Math.floor(ny/TS))){f.sx=f.x;f.sy=f.y;f.tx=nx;f.ty=ny;f.hop=1;f.dir=nx>=f.x?1:-1}
    }
  }""")
rep("""      const h=Math.sin(f.hop*3.14)*9,x=f.x,y=f.y-h;
      g.save();g.fillStyle='rgba(10,20,10,.3)';g.beginPath();g.ellipse(f.x,f.y+1,6,2,0,0,7);g.fill();""",
"""      const h=Math.sin(f.hop*3.14)*9,x=f.x,y=f.y-h,dr=f.dir||1;
      g.save();g.fillStyle='rgba(10,20,10,.3)';g.beginPath();g.ellipse(f.x,f.y+1,6-h*.3,2,0,0,7);g.fill();
      g.strokeStyle='#3d7a26';g.lineWidth=1.8;g.lineCap='round';g.beginPath();
      if(h>1){g.moveTo(x-3*dr,y-2);g.lineTo(x-(8+h*.4)*dr,y+1.5);g.moveTo(x+3*dr,y-1);g.lineTo(x+(6+h*.3)*dr,y+2)}
      else{g.moveTo(x-3*dr,y-1);g.lineTo(x-6.5*dr,y+.8);g.lineTo(x-3.6*dr,y+1.2)}
      g.stroke();""")
open(P,'w',encoding='utf8').write(src)
print('PATCH117 ok')
