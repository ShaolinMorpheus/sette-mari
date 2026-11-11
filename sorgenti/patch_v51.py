#!/usr/bin/env python3
import sys,base64
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH51 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# nuovo sfondo del menu iniziale (dipinto dall'utente)
b=base64.b64encode(open('/home/claude/work/menu_bg.webp','rb').read()).decode()
rep("background:linear-gradient(180deg,rgba(4,26,42,.28),rgba(4,26,42,.78));overflow:auto;padding:calc(10px + var(--st))",
    "background:linear-gradient(180deg,rgba(4,26,42,.10),rgba(4,26,42,.42)),#0a2a3a url(data:image/webp;base64,"+b+") 50% 60%/cover no-repeat;overflow:auto;padding:calc(10px + var(--st))")
k='    "Conchiglie più piccole'
rep(k,'    "Nuovo sfondo del menu iniziale: la spiaggia con il relitto e la capanna, dipinta da te.",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch51 ok')
