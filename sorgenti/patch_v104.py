#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b,n=1):
    global src
    if src.count(a)!=n:print('PATCH104 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
# il banco di Nives al campo dei Fuggiaschi diventa usabile: apre i miglioramenti degli attrezzi
rep("deco('c2stall','banco',62,30.6,[61,30,2,1],{nohit:1,k:.95,label:'Bancarella di Nives'});","deco('c2stall','banco',62,30.6,[61,30,2,1],{inter:'look',hitw:150,hith:70,k:.95,label:'Banco di Nives'});")
rep("  if(e.id==='briciola')return Ch2.brLook();","  if(e.id==='briciola')return Ch2.brLook();\n  if(e.id==='c2stall'){UI.openUpgrades();return true}")
rep("if(e.id==='briciola')return{l:'Briciola',i:'hand'};","if(e.id==='briciola')return{l:'Briciola',i:'hand'};if(e.id==='c2stall')return{l:'Banco',i:'hammer'};")
rep("UI.openUpgrades=function(){\n  if(!S.built.banco){UI.toast('Serve prima il Banco da lavoro.');return}","UI.openUpgrades=function(fromCamp){\n  if(!S.built.banco&&!fromCamp){UI.toast('Serve prima il Banco da lavoro.');return}")
rep("if(e.id==='c2stall'){UI.openUpgrades();return true}","if(e.id==='c2stall'){UI.openUpgrades(true);return true}")
open(P,'w',encoding='utf8').write(src);print('patch104 ok')
