#!/usr/bin/env python3
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
X=json.load(open('/home/claude/work/mare/x.json'))
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH74 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
LOAD="""var MAREX=%s;var MARE=null;
function mareGet(){
  if(MARE)return MARE;
  MARE={ok:false,n:0,ed:null,tr:null,aq:null};
  const soft=(r,g2,b)=>{const c=document.createElement('canvas');c.width=c.height=96;const x=c.getContext('2d'),gr=x.createRadialGradient(48,48,0,48,48,48);gr.addColorStop(0,'rgba('+r+','+g2+','+b+',1)');gr.addColorStop(.55,'rgba('+r+','+g2+','+b+',.55)');gr.addColorStop(1,'rgba('+r+','+g2+','+b+',0)');x.fillStyle=gr;x.fillRect(0,0,96,96);return c};
  MARE.sw=soft(150,238,224);MARE.sb=soft(96,64,28);
  for(const k of['ed','tr','aq']){const im=new Image();im.onload=()=>{MARE[k]=im;if(++MARE.n===3){try{const c=document.createElement('canvas').getContext('2d'),p=c.createPattern(MARE.aq,'repeat');if(p&&p.setTransform)p.setTransform(new DOMMatrix().scale(.6));MARE.aqp=p}catch(e){}MARE.ok=true}};im.src='data:image/webp;base64,'+MAREX[k]}
  return MARE;
}
let SHORE=null;""" % json.dumps(X)
rep("let SHORE=null;",LOAD)
rep("vis.push([s,w,off,amp]);","vis.push([s,w,off,amp,Math.cos(t*W2+ph)]);")
rep("for(const[s,w,off]of vis){\n      const px=s.x+s.nx*(off+1)","for(const[s,w,off,amp,dw]of vis){\n      const px=s.x+s.nx*(off+1)")
# acqua bassa e sabbia bagnata con sprite morbidi (niente tratti rotondi/rettangolari)
rep("""    g.beginPath();
    for(const[s,w,off]of vis){const px=s.x+s.nx*off,py=s.y+s.ny*off;g.moveTo(s.x-s.nx*3,s.y-s.ny*3);g.lineTo(px,py)}
    g.strokeStyle='rgba(128,236,214,.4)';g.lineWidth=TS*1.05;g.stroke();
    g.beginPath();
    for(const[s,w,off]of vis){const px=s.x+s.nx*off,py=s.y+s.ny*off;g.moveTo(s.x+s.nx*off*.35,s.y+s.ny*off*.35);g.lineTo(px,py)}
    g.strokeStyle='rgba(190,250,236,.22)';g.lineWidth=TS*.8;g.stroke();""","""    {const M=mareGet();g.save();
    for(const[s,w,off]of vis){
      const px=s.x+s.nx*off,py=s.y+s.ny*off;
      g.globalAlpha=.34;g.drawImage(M.sw,px-62,py-62,124,124);
      g.globalAlpha=.22;g.drawImage(M.sw,s.x+s.nx*off*.4-54,s.y+s.ny*off*.4-54,108,108);
    }
    g.restore()}""")
rep("g.strokeStyle='rgba(112,92,56,'+(.1*(1-w)).toFixed(3)+')';g.lineWidth=14;g.beginPath();g.moveTo(px-tx*L-s.nx*10,py-ty*L-s.ny*10);g.lineTo(px+tx*L-s.nx*10,py+ty*L-s.ny*10);g.stroke();",
"{const M=mareGet();g.save();g.globalAlpha=(dw<0?.34:.14)*(1-w);g.drawImage(M.sb,px+s.nx*16-52,py+s.ny*16-52,104,104);g.restore()}")
rep("g.strokeStyle='rgba(255,255,255,'+(.14+.14*w).toFixed(3)+')';g.lineWidth=7;g.beginPath();g.moveTo(px-tx*L,py-ty*L);g.quadraticCurveTo(px+s.nx*4,py+s.ny*4,px+tx*L,py+ty*L);g.stroke();","")
rep("g.strokeStyle='rgba(255,255,255,'+(.32+.3*w).toFixed(3)+')';g.lineWidth=2.2;g.setLineDash([9,5]);g.beginPath();g.moveTo(px-tx*L,py-ty*L);g.quadraticCurveTo(px+s.nx*4,py+s.ny*4,px+tx*L,py+ty*L);g.stroke();g.setLineDash([]);","")
# schiuma a texture sul bordo mobile + scia sulla sabbia quando si ritira
rep("    }\n    g.restore();\n  }\n  g.save();g.lineCap='round';\n  for(const s of SHORE){\n    if(PASTON&&QL<3)break;",
"""    }
    {const M=mareGet();if(M.ok){let k=0;for(const[s,w,off,amp,dw]of vis){
      const px=s.x+s.nx*(off+1),py=s.y+s.ny*(off+1),ang=Math.atan2(s.nx,-s.ny);
      g.save();g.translate(px,py);g.rotate(ang);
      if(dw<0){g.globalAlpha=Math.min(.45,(1-w)*-dw*.7);g.drawImage(M.tr,-36,-36,72,36)}
      g.globalAlpha=.26+.3*w;g.drawImage(M.ed,-36,-24,72,36);
      g.restore()}}}
    g.restore();
  }
  g.save();g.lineCap='round';
  for(const s of SHORE){
    if(PASTON&&QL<3)break;""")
open(P,'w',encoding='utf8').write(src);print('patch74 ok')
