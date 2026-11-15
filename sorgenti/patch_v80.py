#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH80 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# 1 sprite di schiuma con bordi che sfumano (niente rettangoli netti)
rep("function mareGet(){","""function mareFade(img,v){
  const w=img.width,h=img.height,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(img,0,0);
  const m=document.createElement('canvas');m.width=w;m.height=h;const y=m.getContext('2d');
  const gv=y.createLinearGradient(0,0,0,h);
  if(v===0){gv.addColorStop(0,'rgba(0,0,0,.25)');gv.addColorStop(.12,'#000');gv.addColorStop(.5,'#000');gv.addColorStop(1,'rgba(0,0,0,0)')}
  else{gv.addColorStop(0,'rgba(0,0,0,0)');gv.addColorStop(.3,'#000');gv.addColorStop(.7,'#000');gv.addColorStop(1,'rgba(0,0,0,0)')}
  y.fillStyle=gv;y.fillRect(0,0,w,h);
  y.globalCompositeOperation='destination-in';
  const gh=y.createLinearGradient(0,0,w,0);gh.addColorStop(0,'rgba(0,0,0,0)');gh.addColorStop(.12,'#000');gh.addColorStop(.88,'#000');gh.addColorStop(1,'rgba(0,0,0,0)');y.fillStyle=gh;y.fillRect(0,0,w,h);
  x.globalCompositeOperation='destination-in';x.drawImage(m,0,0);return c;
}
function mareGet(){""")
rep("catch(e){}MARE.ok=true}","catch(e){}try{MARE.ed2=mareFade(MARE.ed,0);MARE.tr2=mareFade(MARE.tr,1)}catch(e){}MARE.ok=true}")
rep("g.drawImage(M.tr,-36,-36,72,36)}","g.drawImage(M.tr2||M.tr,-48,-40,96,40)}")
rep("g.globalAlpha=.5+.4*w;g.drawImage(M.ed,-36,-24,72,36);","g.globalAlpha=.55+.4*w;g.drawImage(M.ed2||M.ed,-48,-26,96,44);")
# 2 moto coerente: tutti i tratti vicini si muovono insieme
rep("const ph=s.x*.011+s.y*.008+s.ph*.15,amp=11+7*((s.ph*7)%1);","const ph=s.x*.011+s.y*.008,amp=15;")
# 3 normali levigate lungo la costa
rep("function drawBeach(g,t,vx0,vy0,vx1,vy1){","""function shoreSmooth(){
  const C=96,H=new Map();
  for(const s of SHORE){const k=((s.x/C)|0)+','+((s.y/C)|0);let a=H.get(k);if(!a){a=[];H.set(k,a)}a.push(s)}
  const out=[];
  for(const s of SHORE){
    const cx=(s.x/C)|0,cy=(s.y/C)|0;let ax=0,ay=0;
    for(let j=-1;j<=1;j++)for(let i=-1;i<=1;i++){const a=H.get((cx+i)+','+(cy+j));if(!a)continue;for(const o of a){const d=Math.hypot(o.x-s.x,o.y-s.y);if(d>C)continue;const w=1-d/C;ax+=o.nx*w;ay+=o.ny*w}}
    const l=Math.hypot(ax,ay);out.push(l>1e-4?[ax/l,ay/l]:[s.nx,s.ny]);
  }
  SHORE.forEach((s,i)=>{s.nx=out[i][0];s.ny=out[i][1]});
}
function drawBeach(g,t,vx0,vy0,vx1,vy1){""")
rep("  if(!SHORE)shoreBuild();","  if(!SHORE){shoreBuild();try{shoreSmooth()}catch(e){}}")
open(P,'w',encoding='utf8').write(src);print('patch80 ok')
