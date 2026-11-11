#!/usr/bin/env python3
import sys,base64
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH53 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
def U(n):return 'url(data:image/webp;base64,'+base64.b64encode(open('/home/claude/work/kit/%s.webp'%n,'rb').read()).decode()+')'
N=['pan_wood2','pan_trim','round_gold','round_cream','bar_cont','fill_blue','fill_orange','fill_yellow','card_cream2','card_gold2','pill_bf','pill_rf','pill_d','pill_r']
V=':root{'+''.join('--k-%s:%s;'%(n,U(n)) for n in N)+'}'
CSS=V+'''
/* ===== HUD e schede con i pezzi disegnati dall'utente ===== */
#vit,#res,#obj{background:none;border:9px solid transparent;border-image:var(--k-pan_wood2) 26 fill/9px/0 stretch;border-radius:0;box-shadow:none;filter:drop-shadow(0 3px 5px rgba(0,0,0,.4))}
#vit{padding:0 2px;gap:5px}
#res{padding:0 2px;max-width:176px}
#obj{padding:0 4px}
#clock{background:none;border:8px solid transparent;border-image:var(--k-pan_trim) 28 fill/8px/0 stretch;border-radius:0;box-shadow:none;padding:0 2px;height:34px;filter:drop-shadow(0 3px 5px rgba(0,0,0,.4))}
.bar{background:var(--k-bar_cont) 0 0/100% 100% no-repeat;border:0;border-radius:0;box-shadow:none;height:17px}
.bar i{background:var(--k-fill_blue) 0 0/auto 100% no-repeat;top:4px;bottom:4px;left:5px;border-radius:5px}
#vH .bar i{background:var(--k-fill_orange) 0 0/auto 100% no-repeat}
#vT.low .bar i,#vH.low .bar i{background:linear-gradient(#ff9a7a,#d8382e)}
#lvB{height:6px;bottom:3px;left:12px;right:12px;background:rgba(0,0,0,.45);border-radius:3px}
#lvB i{background:var(--k-fill_yellow) 0 0/auto 100% no-repeat;border-radius:3px}
.rbtn,.sbtn{background:var(--k-round_cream) 50% 50%/100% 100% no-repeat;border:0;box-shadow:none;filter:drop-shadow(0 3px 4px rgba(0,0,0,.45))}
.sbtn.lit{background-image:var(--k-round_gold);box-shadow:0 0 14px 3px rgba(255,170,60,.7)}
#act{background:var(--k-round_gold) 50% 50%/100% 100% no-repeat;border:0;box-shadow:none;filter:drop-shadow(0 4px 6px rgba(0,0,0,.5))}
#act.off{filter:grayscale(.85) brightness(.85) drop-shadow(0 4px 6px rgba(0,0,0,.5))}
.sbtn b{background:var(--k-pill_d) 0 0/100% 100% no-repeat;border-radius:0;color:var(--cream)}
.sbtn b.full{background:var(--k-pill_r) 0 0/100% 100% no-repeat;color:#fff}
.qc{background:none;border:10px solid transparent;border-image:var(--k-card_cream2) 28 fill/10px/0 stretch;border-radius:0;padding:2px 4px 3px;box-shadow:none}
.qc.tr{border-image-source:var(--k-card_gold2);box-shadow:none}
.qc h4 em{background:var(--k-pill_rf) 0 0/100% 100% no-repeat;border-radius:0;padding:3px 12px}
.qc h4 em.side{background:var(--k-pill_bf) 0 0/100% 100% no-repeat}
'''
rep("</body>","<style id=\"kitCss2\">"+CSS+"</style></body>")
k='    "Conchiglie più piccole'
rep(k,'    "Interfaccia nuova (seconda prova): barre in alto, risorse, bottoni tondi, barre fame/sete, schede ed etichette delle missioni.",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch53 ok')
