#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH70 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# schiuma cotta quasi spenta con la mappa di prova
rep("    g.globalAlpha=.5+.42*Math.sin(t*1.35);g.drawImage(FOAM_A,","    g.globalAlpha=PASTON?.16:.5+.42*Math.sin(t*1.35);g.drawImage(FOAM_A,")
rep("    if(QL<3){g.globalAlpha=.42+.4*Math.sin(t*1.35+2.6);g.drawImage(FOAM_B,","    if(QL<3){g.globalAlpha=PASTON?.1:.42+.4*Math.sin(t*1.35+2.6);g.drawImage(FOAM_B,")
# riva viva: tutti i segmenti, fase lungo la costa, fascia d'acqua bassa mobile
rep("  g.save();g.lineCap='round';\n  for(const s of SHORE){\n    if(!s.act||","""  if(PASTON&&QL<3){
    g.save();g.lineCap='round';g.lineJoin='round';
    const W2=6.2832/7.5,vis=[];
    for(const s of SHORE){
      if(s.x<vx0-60||s.x>vx1+60||s.y<vy0-60||s.y>vy1+60)continue;
      const ph=s.x*.011+s.y*.008+s.ph*.15,amp=11+7*((s.ph*7)%1);
      const w=(Math.sin(t*W2+ph)+1)/2,off=amp*(w*2-1)*.9+2;
      vis.push([s,w,off,amp]);
    }
    g.beginPath();
    for(const[s,w,off]of vis){const px=s.x+s.nx*off,py=s.y+s.ny*off;g.moveTo(s.x-s.nx*3,s.y-s.ny*3);g.lineTo(px,py)}
    g.strokeStyle='rgba(128,236,214,.4)';g.lineWidth=TS*1.05;g.stroke();
    g.beginPath();
    for(const[s,w,off]of vis){const px=s.x+s.nx*off,py=s.y+s.ny*off;g.moveTo(s.x+s.nx*off*.35,s.y+s.ny*off*.35);g.lineTo(px,py)}
    g.strokeStyle='rgba(190,250,236,.22)';g.lineWidth=TS*.8;g.stroke();
    for(const[s,w,off]of vis){
      const px=s.x+s.nx*(off+1),py=s.y+s.ny*(off+1),tx=-s.ny,ty=s.nx,L=24;
      g.strokeStyle='rgba(112,92,56,'+(.1*(1-w)).toFixed(3)+')';g.lineWidth=14;g.beginPath();g.moveTo(px-tx*L-s.nx*10,py-ty*L-s.ny*10);g.lineTo(px+tx*L-s.nx*10,py+ty*L-s.ny*10);g.stroke();
      g.strokeStyle='rgba(255,255,255,'+(.14+.14*w).toFixed(3)+')';g.lineWidth=7;g.beginPath();g.moveTo(px-tx*L,py-ty*L);g.quadraticCurveTo(px+s.nx*4,py+s.ny*4,px+tx*L,py+ty*L);g.stroke();
      g.strokeStyle='rgba(255,255,255,'+(.32+.3*w).toFixed(3)+')';g.lineWidth=2.2;g.setLineDash([9,5]);g.beginPath();g.moveTo(px-tx*L,py-ty*L);g.quadraticCurveTo(px+s.nx*4,py+s.ny*4,px+tx*L,py+ty*L);g.stroke();g.setLineDash([]);
    }
    g.restore();
  }
  g.save();g.lineCap='round';
  for(const s of SHORE){
    if(PASTON&&QL<3)break;
    if(!s.act||""")
open(P,'w',encoding='utf8').write(src);print('patch70 ok')
