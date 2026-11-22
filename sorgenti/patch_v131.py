import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
i=s.index("try{if(VEGPG){const im=new Image();im.onload=()=>{const[c,x]=mk(430,330);x.drawImage(im,0,0,430,330);SP.shipFixM")
j=s.index("GfxNew.rub();",i)
D=open('/home/claude/work/inc_v2.b64').read().strip()
NEW="try{if(VEGPG){const im=new Image();im.onload=()=>{const[c,x]=mk(430,330);x.drawImage(im,0,0,430,330);SP.shipFixM={c,w:430,h:330,ax:215,ay:295,_x:x}};im.src='data:image/webp;base64,"+D+"'}}catch(e){}"
s=s[:i]+NEW+s[j:]
a="drawSp(g,s,0,2*kk,kk);if(SP.shipSandM)drawSp(g,SP.shipSandM,0,2*kk,kk);g.restore();return}"
if s.count(a)!=1:print('FAIL draw');sys.exit(1)
s=s.replace(a,"drawSp(g,s,0,2*kk,kk);g.restore();return}")
open(P,'w',encoding='utf8').write(s);print('patch131 ok')
