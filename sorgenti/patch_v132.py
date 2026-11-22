import sys,json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
i=s.index("try{if(VEGPG){const im=new Image();im.onload=()=>{const[c,x]=mk(430,330);x.drawImage(im,0,0,430,330);SP.shipFixM")
j=s.index("GfxNew.rub();",i)
CP=open('/home/claude/work/cut_poly.json').read().strip()
NEW="""try{if(VEGPG){const CUT=%s;const im=new Image();im.onload=()=>{const W=430,H=330;const[c,x]=mk(W,H);x.drawImage(im,0,0,W,H);
  // la nave e' infossata nel terreno: il fondo dello scafo viene tagliato lungo la chiglia con bordo morbido
  const[cm,xm]=mk(W,H);xm.filter='blur(2.2px)';xm.fillStyle='#000';xm.beginPath();CUT.forEach((q,i)=>i?xm.lineTo(q[0],q[1]):xm.moveTo(q[0],q[1]));xm.closePath();xm.fill();xm.filter='none';
  x.globalCompositeOperation='destination-in';x.drawImage(cm,0,0,W,H);x.globalCompositeOperation='source-over';
  SP.shipFixM={c,w:W,h:H,ax:215,ay:295,_x:x}};
  im.src='data:image/webp;base64,'+MZ23NAVE}}catch(e){}""" % CP
s=s[:i]+NEW+s[j:]
a="drawSp(g,s,0,2*kk,kk);if(SP.shipSandM)drawSp(g,SP.shipSandM,0,2*kk,kk);g.restore();return}"
if s.count(a)!=1:print('FAIL draw');sys.exit(1)
s=s.replace(a,"drawSp(g,s,0,2*kk,kk);g.restore();return}")
open(P,'w',encoding='utf8').write(s);print('patch132 ok')
