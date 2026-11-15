#!/usr/bin/env python3
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
X=json.load(open('/home/claude/work/mare/sb.json'))
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH78 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# solo texture di Muse: acqua-bassa e sabbia-bagnata al posto dei miei sprite sfumati
rep("function mareGet(){","var MSBX=\"%s\";var MSB=null;function msbGet(){if(MSB)return MSB;MSB={im:null};const im=new Image();im.onload=()=>{MSB.im=im};im.src='data:image/webp;base64,'+MSBX;return MSB}\nfunction mareGet(){"%X['sbm'])
rep("      g.globalAlpha=.34;g.drawImage(M.sw,px-62,py-62,124,124);\n      g.globalAlpha=.22;g.drawImage(M.sw,s.x+s.nx*off*.4-54,s.y+s.ny*off*.4-54,108,108);",
    "      if(M.aq){g.globalAlpha=.32;g.drawImage(M.aq,px-64,py-64,128,128)}")
rep("    {const M=mareGet();if(M.ok){let k=0;for(const[s,w,off,amp,dw]of vis){",
    "    {const B=msbGet();if(B.im){g.save();for(const[s,w,off,amp,dw]of vis){g.globalAlpha=.42-.12*w;g.drawImage(B.im,s.x+s.nx*(off*.5+12)-52,s.y+s.ny*(off*.5+12)-52,104,104)}g.restore()}}\n    {const M=mareGet();if(M.ok){let k=0;for(const[s,w,off,amp,dw]of vis){")
open(P,'w',encoding='utf8').write(src);print('patch78 ok')
