#!/usr/bin/env python3
import sys,base64
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH52 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
def U(n):return 'url(data:image/webp;base64,'+base64.b64encode(open('/home/claude/work/kit/%s.webp'%n,'rb').read()).decode()+')'
V=':root{'+''.join('--k-%s:%s;'%(n,U(n)) for n in ['pan_parch','pan_dark','btn_cream','btn_gold','btn_dis','btn_press','tab_off','tab_on','ribbon'])+'}'
CSS=V+'''
/* ===== interfaccia nuova: pezzi disegnati dall'utente (v0.14) ===== */
.card,.card.big{background:none;border:18px solid transparent;border-image:var(--k-pan_parch) 30 fill/18px/0 stretch;border-radius:0;box-shadow:none;padding:2px 6px 0;max-width:500px}
.card.big{max-width:640px;padding:0 4px}
#startCard{background:none;border:18px solid transparent;border-image:var(--k-pan_dark) 30 fill/18px/0 stretch;border-radius:0;box-shadow:none;backdrop-filter:none;padding:6px 10px 2px}
.btn{border:7px solid transparent;border-image:var(--k-btn_cream) 22 fill/7px/0 stretch;border-radius:0;background:none;box-shadow:none;color:#3a2308;text-shadow:none;padding:3px 12px}
.btn:active{border-image-source:var(--k-btn_press);transform:none}
.btn.gold{border-image-source:var(--k-btn_gold);color:#3a2308;background:none}
.btn.ghost{border:2px solid transparent;border-image:none;background:transparent;padding:10px 16px}
.btn.big{padding:5px 20px}
.tabs{gap:3px}
.tab{border:6px solid transparent;border-image:var(--k-tab_off) 22 fill/6px/0 stretch;border-radius:0;background:none;color:#3a2308;padding:2px 0;font-size:12.5px;min-width:0}
.tab.on{border-image-source:var(--k-tab_on);background:none;color:#3a2308}
.seg button{border:7px solid transparent;border-image:var(--k-btn_dis) 22 fill/7px/0 stretch;border-radius:0;background:none;color:#2b1a0d;padding:0 6px}
.seg button.on{border-image-source:var(--k-btn_gold);background:none;color:#3a2308}
.ribbon{background:var(--k-ribbon) 0 0/100% 100% no-repeat;border:0;border-radius:0;box-shadow:none;padding:11px 54px 17px;color:#fff6dc;text-shadow:0 1px 2px rgba(60,10,5,.8)}
'''
rep("</body>","<style id=\"kitCss\">"+CSS+"</style></body>")
k='    "Conchiglie più piccole'
rep(k,'    "Interfaccia nuova (prima prova): pannelli, bottoni, linguette e nastro con i pezzi disegnati da te.",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch52 ok')
