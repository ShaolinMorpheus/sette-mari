import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
B=open('/home/claude/work/sab_v1.b64').read().strip()
def rep(a,b):
    global s
    if s.count(a)!=1:print('PATCH126 FAIL',s.count(a),a[:90]);sys.exit(1)
    s=s.replace(a,b)
# letto di sabbia di Muse sopra lo scafo (la nave resta infossata); via l'ombra provvisoria
rep("    g.fillStyle='rgba(60,40,20,.22)';g.beginPath();g.ellipse(10*kk,6*kk,150*kk,12*kk,0,0,7);g.fill();\n    drawSp(g,s,0,2*kk,kk);g.restore();return}",
    "    drawSp(g,s,0,2*kk,kk);if(SP.shipSandM)drawSp(g,SP.shipSandM,0,2*kk,kk);g.restore();return}")
rep("im.src='data:image/webp;base64,'+MZ23NAVE}",
    "im.src='data:image/webp;base64,'+MZ23NAVE;const im2=new Image();im2.onload=()=>{const[c,x]=mk(430,330);x.drawImage(im2,0,0,430,330);{const gm=x.createLinearGradient(70,0,350,0);gm.addColorStop(0,'rgba(0,0,0,0)');gm.addColorStop(.07,'rgba(0,0,0,1)');gm.addColorStop(.88,'rgba(0,0,0,1)');gm.addColorStop(1,'rgba(0,0,0,0)');x.globalCompositeOperation='destination-in';x.fillStyle=gm;x.fillRect(0,0,430,330);x.globalCompositeOperation='source-over'}SP.shipSandM={c,w:430,h:330,ax:215,ay:295,_x:x}};im2.src='data:image/webp;base64,'+MZ23SAB}")
rep('const MZ23NAVE="','const MZ23SAB="%s";\nconst MZ23NAVE="'%B)
open(P,'w',encoding='utf8').write(s);print('patch126 ok')
