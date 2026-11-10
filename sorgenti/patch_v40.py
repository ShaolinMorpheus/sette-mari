#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH40 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
helper='''/* sprite d'arte appoggiati al terreno: ombra proiettata morbida + ombra di contatto alla base */
function artGround(g,s,k,cw){k=k||1;const sk=(s.sink||3)*k;
  if(s.sh){g.save();g.translate(0,sk-1);g.globalAlpha=.27;g.transform(k,0,-.45*k,-.27*k,0,0);g.drawImage(s.sh,-s.ax,-s.ay,s.w,s.h);g.restore()}
  const CT=artGround.CT||(artGround.CT=(()=>{const c=document.createElement('canvas');c.width=128;c.height=40;const x=c.getContext('2d');x.translate(64,20);x.scale(1,.31);const q=x.createRadialGradient(0,0,0,0,0,64);q.addColorStop(0,'rgba(12,9,4,.66)');q.addColorStop(.5,'rgba(12,9,4,.44)');q.addColorStop(1,'rgba(12,9,4,0)');x.fillStyle=q;x.beginPath();x.arc(0,0,64,0,7);x.fill();return c})());
  const w=cw*2.5*k;g.drawImage(CT,-w/2,sk*.5-w*.156-1,w,w*.3125)}
'''
rep("function drawSp(g,s,x,y,k,al){",helper+"function drawSp(g,s,x,y,k,al){")
# palma
rep("    if(s.sh){g.save();g.globalAlpha=.30;g.transform(1,0,-.55,-.30,0,0);g.drawImage(s.sh,-s.ax,-s.ay,s.w,s.h);g.restore()}\n    g.fillStyle='rgba(20,14,6,.30)';g.beginPath();g.ellipse(1,2,13,4,0,0,7);g.fill();\n","    artGround(g,s,1,20);g.translate(0,3);\n")
# alberi / pini
rep("if(s.sh){g.save();g.globalAlpha=.30;g.transform(k,0,-.55*k,-.30*k,0,0);g.drawImage(s.sh,-s.ax,-s.ay,s.w,s.h);g.restore()}g.fillStyle='rgba(20,14,6,.30)';g.beginPath();g.ellipse(1,2,12*k,4*k,0,0,7);g.fill()","artGround(g,s,k,isPine?19:18)")
rep("drawSp(g,s,0,0,k,al<1?al:null);","drawSp(g,s,0,s.art?3*k:0,k,al<1?al:null);")
# ceppo
rep("g.translate(e.x,e.y+2);g.fillStyle='rgba(20,14,6,.28)';g.beginPath();g.ellipse(2,1,17*k,5*k,0,0,7);g.fill();drawSp(g,s,0,0,k);g.restore()}","g.translate(e.x,e.y+2);artGround(g,s,k,13);drawSp(g,s,0,2*k,k);g.restore()}")
# rocce intere
rep("if(bs.art){if(bs.sh){g.save();g.globalAlpha=.30;g.transform(1,0,-.55,-.30,0,0);g.drawImage(bs.sh,-bs.ax,-bs.ay,bs.w,bs.h);g.restore()}g.fillStyle='rgba(20,14,6,.28)';g.beginPath();g.ellipse(0,2,bs.w*.34,bs.w*.1,0,0,7);g.fill()}","if(bs.art)artGround(g,bs,1,bs.w*.4);")
rep("drawSp(g,bs,0,0,1);g.restore();","drawSp(g,bs,0,bs.art?3:0,1);g.restore();")
# rocce spaccate
rep("if(rs.art){g.save();g.translate(e.x,e.y);if(rs.sh){g.save();g.globalAlpha=.28;g.transform(1,0,-.55,-.30,0,0);g.drawImage(rs.sh,-rs.ax,-rs.ay,rs.w,rs.h);g.restore()}g.restore()}\n    drawSp(g,rs,e.x,e.y);return}","if(rs.art){g.save();g.translate(e.x,e.y);if(rs.sh){g.globalAlpha=.20;g.drawImage(rs.sh,-rs.ax+4,-rs.ay+7,rs.w,rs.h);g.globalAlpha=.36;g.drawImage(rs.sh,-rs.ax+1.5,-rs.ay+3.5,rs.w,rs.h);g.globalAlpha=1}drawSp(g,rs,0,1,1);g.restore();return}\n    drawSp(g,rs,e.x,e.y);return}")
# cespugli
rep("if(bsp.art){if(bsp.sh){g.save();g.globalAlpha=.26;g.transform(1,0,-.55,-.30,0,0);g.drawImage(bsp.sh,-bsp.ax,-bsp.ay,bsp.w,bsp.h);g.restore()}g.fillStyle='rgba(20,14,6,.26)';g.beginPath();g.ellipse(0,2,bsp.w*.38,bsp.w*.1,0,0,7);g.fill()}","if(bsp.art)artGround(g,bsp,1,bsp.w*.38);")
rep("drawSp(g,bsp,0,0,1);g.restore();","drawSp(g,bsp,0,bsp.art?3:0,1);g.restore();")
rep('    "Funghi di bosco: ogni giorno','    "Grafica di prova: alberi, palme, rocce, cespugli e ceppi ora poggiano bene sul terreno, con ombra di contatto alla base e ombra proiettata più morbida.",\n    "Funghi di bosco: ogni giorno')
open(P,'w',encoding='utf8').write(src)
print('patch40 ok')
