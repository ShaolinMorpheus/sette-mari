#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b,n=1):
    global src
    if src.count(a)!=n:print('PATCH102 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
# scelte di dialogo: con piu' di 3 voci vanno su due colonne; in ogni caso l'elenco scorre e non esce dallo schermo
rep("#dlgChoices .btn{text-align:left;padding:9px 13px;font-size:15px}","#dlgChoices .btn{text-align:left;padding:9px 13px;font-size:15px}\n#dlgChoices{max-height:calc(100vh / var(--tz,1) - 118px);overflow-y:auto;-webkit-overflow-scrolling:touch;touch-action:pan-y;overscroll-behavior:contain}\n#dlgChoices.many{display:grid;grid-template-columns:1fr 1fr;gap:6px}")
rep("  if(L&&L.choices){\n","  if(L&&L.choices){box.classList.toggle('many',L.choices.length>3);box.scrollTop=0;\n")
open(P,'w',encoding='utf8').write(src);print('patch102 ok')
