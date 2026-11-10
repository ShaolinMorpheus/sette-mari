#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH39 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
js=open('/home/claude/work/art/rub_js_full.js',encoding='utf8').read()
rep("/* ---- 12d_kb.js ---- */",js+"\n/* ---- 12d_kb.js ---- */")
rep("GfxNew.nature();GfxNew.art()}GfxNew.raft()}","GfxNew.nature();GfxNew.art();GfxNew.rub()}GfxNew.raft()}")
# roccia spaccata: sprite d'arte con ombra (grande o piccola)
rep("  if(!e.alive){drawSp(g,SP.rubble,e.x,e.y);return}\n","  if(!e.alive){const rs=(GFXN&&SP.rubbleS&&(e.v===1||e.v===3))?SP.rubbleS:SP.rubble;\n    if(rs.art){g.save();g.translate(e.x,e.y);if(rs.sh){g.save();g.globalAlpha=.28;g.transform(1,0,-.55,-.30,0,0);g.drawImage(rs.sh,-rs.ax,-rs.ay,rs.w,rs.h);g.restore()}g.restore()}\n    drawSp(g,rs,e.x,e.y);return}\n")
# mappa: via i quadratini delle casse
rep("    else if(e.type==='loot'&&e.kind!==9&&e.kind!==10&&e.kind!==11&&!(e.id&&e.id.indexOf('lt_rare')===0)&&seen(e.x/TS,e.y/TS)){","    else if(false&&e.type==='loot'&&e.kind!==9&&e.kind!==10&&e.kind!==11&&!(e.id&&e.id.indexOf('lt_rare')===0)&&seen(e.x/TS,e.y/TS)){")
rep(" Quadrati dorati: casse e forzieri da aprire; grigi: già aperti."," ")
# tende del campo: posizione sbagliata (in mare)
for a,b in [('"fg3":[3576,1176]','"fg3":[6656,1176]'),('"fg0":[3558,1122]','"fg0":[6638,1122]'),('"fg2":[3684,1164]','"fg2":[6764,1164]'),('"fg1":[3708,1116]','"fg1":[6788,1116]')]:
    rep(a,b)
rep('    "Funghi di bosco: ogni giorno','    "Grafica di prova: rocce spaccate dal piccone (grande e piccola) e cespuglio senza liane ora sono disegni d\'arte. Le tende del campo dei Fuggiaschi non compaiono più in mare. Sulla mappa non si vedono più i quadratini delle casse.",\n    "Funghi di bosco: ogni giorno')
open(P,'w',encoding='utf8').write(src)
print('patch39 ok')
