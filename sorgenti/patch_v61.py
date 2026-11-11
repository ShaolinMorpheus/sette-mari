#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH61 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# Biscotto: segue piu' lontano e appena piu' grande
rep("let tx=P.x+(P.flip?30:-30),ty=P.y-6;","let tx=P.x+(P.flip?54:-54),ty=P.y-12;")
rep("if(e.perch)drawParrot(g,e.x,e.y-e.alt,{t,flip:e.flip,s:.82,perch:true,gy:e.alt,hat:S&&S.phat});\n  else drawParrot(g,e.x,e.y-e.alt,{t:t*(e.fl),flip:e.flip,s:.82,gy:e.alt,hat:S&&S.phat});",
    "if(e.perch)drawParrot(g,e.x,e.y-e.alt,{t,flip:e.flip,s:.88,perch:true,gy:e.alt,hat:S&&S.phat});\n  else drawParrot(g,e.x,e.y-e.alt,{t:t*(e.fl),flip:e.flip,s:.88,gy:e.alt,hat:S&&S.phat});")
# ritratto: volto (testa + becco) al centro del cerchio
rep("if(key==='biscotto'){g.translate(W*.46,H*.56);g.scale(W/32,W/32);drawParrot(g,0,0,{t:0,s:1.1,perch:1,hat:S&&S.phat})}",
    "if(key==='biscotto'){const q=W/24.5;g.translate(W*.5-8*q,H*.5+10.6*q);g.scale(q,q);drawParrot(g,0,0,{t:0,s:1,perch:1,hat:S&&S.phat})}")
k='    "Conchiglie più piccole'
rep(k,'    "Biscotto segue un po\' più lontano ed è leggermente più grande; il ritratto nei dialoghi è centrato sul volto.",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch61 ok')
