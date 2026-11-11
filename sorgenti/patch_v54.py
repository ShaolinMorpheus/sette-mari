#!/usr/bin/env python3
import sys,base64
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH54 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
def U(n):return 'url(data:image/webp;base64,'+base64.b64encode(open('/home/claude/work/kit/%s.webp'%n,'rb').read()).decode()+')'
V=':root{'+''.join('--k-%s:%s;'%(n,U(n)) for n in ['pan_clock','bar_empty','bar_blue','bar_orange'])+'}'
CSS=V+'''
/* ===== barre vita e pannello giorno: nuovi disegni ===== */
.bar{flex:none;width:148px;height:14px;background:var(--k-bar_empty) 0 0/100% 100% no-repeat;border:0;border-radius:0;box-shadow:none;overflow:hidden}
.bar i{left:0;top:0;bottom:0;border-radius:0;background:var(--k-bar_blue) 0 0/148px 100% no-repeat}
#vH .bar i{background:var(--k-bar_orange) 0 0/148px 100% no-repeat}
#vT.low .bar i,#vH.low .bar i{background:var(--k-bar_orange) 0 0/148px 100% no-repeat;filter:hue-rotate(-32deg) saturate(1.6)}
#clock{background:var(--k-pan_clock) 0 0/100% 100% no-repeat;border:0;border-radius:0;box-shadow:none;padding:0 14px 9px;height:40px}
#lvB{left:7.6%;right:7.6%;bottom:5.4px;height:4.6px;background:#2b1a0e;border-radius:3px;overflow:hidden}
#lvB i{background:linear-gradient(90deg,#ffd45a,#ffb02e);border-radius:3px}
'''
rep("</body>","<style id=\"kitCss3\">"+CSS+"</style></body>")
open(P,'w',encoding='utf8').write(src);print('patch54 ok')
