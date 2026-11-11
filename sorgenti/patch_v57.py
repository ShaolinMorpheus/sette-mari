#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH57 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# 1) il muro dell'oggetto vale PRIMA delle celle "libere" dell'editor e non sparisce piu' quando ci sei vicino
OLD_WOV="  if(WOV.size){const w=WOV.get(((y/WLC)|0)*20000+((x/WLC)|0));if(w===1)return false;"
rep(OLD_WOV,"""  if(window.__obrDirty){window.__obrDirty=0;try{obrBuild()}catch(_){}}
  if(typeof OBR!=='undefined'&&OBR.length)for(const o of OBR){
    if(o.ig){if(!(P.x>o.x0-14&&P.x<o.x1+14&&P.y>o.y0-14&&P.y<o.y1+14))window.__obrDirty=1;continue}   // ci sei dentro: puoi uscire; poi il muro torna
    if(x+rx>o.x0&&x-rx<o.x1&&y+ry>o.y0&&y-ry<o.y1){if(!o.rs)return false;for(const r of o.rs)if(x+rx>r[0]&&x-rx<r[1]&&y+ry>r[2]&&y-ry<r[3])return false}}
"""+OLD_WOV)
rep("  if(window.__obrDirty){window.__obrDirty=0;try{obrBuild()}catch(_){}}\n  if(window.__leafHit","  if(window.__leafHit")
rep("  if(typeof OBR!=='undefined'&&OBR.length)for(const o of OBR){if(x+rx>o.x0&&x-rx<o.x1&&y+ry>o.y0&&y-ry<o.y1){if(!o.rs)return false;for(const r of o.rs)if(x+rx>r[0]&&x-rx<r[1]&&y+ry>r[2]&&y-ry<r[3])return false}}\n  const x0=","  const x0=")
# 2) obrBuild: niente continue (il blocco a tile viene comunque neutralizzato); ig = giocatore dentro
rep("      if(rs.some(r=>P.x>r[0]-12&&P.x<r[1]+12&&P.y>r[2]-12&&P.y<r[3]+12))continue;   // se ci sei già dentro, esci prima",
    "      if(rs.some(r=>P.x>r[0]-12&&P.x<r[1]+12&&P.y>r[2]-12&&P.y<r[3]+12))o.ig=1;")
rep("      if(P.x>o.x0-12&&P.x<o.x1+12&&P.y>o.y0-12&&P.y<o.y1+12)continue;\n","      if(P.x>o.x0-12&&P.x<o.x1+12&&P.y>o.y0-12&&P.y<o.y1+12)o.ig=1;\n")
rep("OBR.push(o);if(e.fp){const ti=tIdx(e.fp[0],e.fp[1]);OBRT[ti]=(OBRT[ti]||0)+1}",
    "OBR.push(o);if(e.fp){const ti=tIdx(e.fp[0],e.fp[1]);OBRT[ti]=(OBRT[ti]||0)+1}")
# 3) niente teletrasporto se a bloccarti e' solo un oggetto: esci a piedi (ig) invece di saltare
k='    "Conchiglie più piccole'
rep(k,'    "Muri di casse e botti: restano sulla forma anche vicino all\'oggetto e non si può più passare dai buchi cancellati; niente più salti strani.",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch57 ok')
