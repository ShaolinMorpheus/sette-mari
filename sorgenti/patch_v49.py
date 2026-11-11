#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH49 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# 1) la collisione di casse, barili e corda segue tutto il corpo disegnato: niente riquadro di tile spostato (muro invisibile davanti, vuoto sopra)
rep("function boxFree(x,y,rx,ry){\n","function boxFree(x,y,rx,ry){\n  if(window.__obrDirty){window.__obrDirty=0;try{obrBuild()}catch(_){}}\n")
rep("      if(x+rx>bx0&&x-rx<bx1&&y+ry>by0&&y-ry<by1)return false;\n    }\n    if(sm>0){",
    "      if(!(OBRT[i]>=b-sm)&&x+rx>bx0&&x-rx<bx1&&y+ry>by0&&y-ry<by1)return false;\n    }\n    if(sm>0){")
rep("const OBR=[];\n","const OBR=[],OBRT={};\n")
rep("  OBR.length=0;\n  for(const e of E){\n    if(!e.bk||e.hid)continue;\n    const s=sprOf(e);if(!s)continue;\n    const cx=e.x-s.ax+s.w/2,hw=s.w*.4,dp=Math.min(s.h*.6,36);\n    const o={x0:cx-hw,x1:cx+hw,y0:e.y-dp,y1:e.y+2,e};\n    if(P.x>o.x0-12&&P.x<o.x1+12&&P.y>o.y0-12&&P.y<o.y1+12)continue;   // se ci sei già dentro, esci prima\n    OBR.push(o);\n  }",
    "  OBR.length=0;for(const k in OBRT)delete OBRT[k];\n  for(const e of E){\n    if(!e.bk||e.hid)continue;\n    const s=sprOf(e);if(!s)continue;\n    const cx=e.x-s.ax+s.w/2,hw=s.w*(s.art?.47:.4),dp=s.art?Math.min(s.ay*.92,54):Math.min(s.h*.6,36);\n    const o={x0:cx-hw,x1:cx+hw,y0:e.y-dp,y1:e.y+(s.art?1:2),e};\n    if(P.x>o.x0-12&&P.x<o.x1+12&&P.y>o.y0-12&&P.y<o.y1+12)continue;   // se ci sei già dentro, esci prima\n    OBR.push(o);if(e.fp){const ti=tIdx(e.fp[0],e.fp[1]);OBRT[ti]=(OBRT[ti]||0)+1}\n  }")
# 2) dopo aver messo gli sprite d'arte, ricalcola le sagome
rep("GfxNew.chest();GfxNew.props()}","GfxNew.chest();GfxNew.props();window.__obrDirty=1}")

# 3) capanna, banco e falò d'arte: la collisione segue la sagoma disegnata (non il riquadro di tile)
rep("function boxFree(x,y,rx,ry){\n","""const PLB={capanna:[-84,70,88,2],banco:[-75,70,52,2],falo:[-36,36,30,6]};let PLL=null;
function plotArtOn(e){return GFXN&&e.st===2&&PLB[e.pid]&&SP[e.pid]&&SP[e.pid].art&&!(e.pid==='falo'&&!SP.falo.fl)}
function plotList(){return PLL||(PLL=E.filter(e=>e.type==='plot'))}
function plotTile(tx,ty){if(!GFXN)return false;for(const e of plotList()){if(!plotArtOn(e))continue;const f=e.fp;if(tx>=f[0]&&tx<f[0]+f[2]&&ty>=f[1]&&ty<f[1]+f[3])return true}return false}
function plotHit(x,y,rx,ry){if(!GFXN)return false;for(const e of plotList()){if(!plotArtOn(e))continue;const f=e.fp,cx=(f[0]+f[2]/2)*TS,y1=(f[1]+f[3])*TS,b=PLB[e.pid];if(x+rx>cx+b[0]&&x-rx<cx+b[1]&&y+ry>y1-b[2]&&y-ry<y1+b[3])return true}return false}
function boxFree(x,y,rx,ry){\n  if(plotHit(x,y,rx,ry))return false;\n""")
rep("    if(b>sm){\n      if(b-sm>insetT[i])return false;","    if(b>sm&&!plotTile(tx,ty)){\n      if(b-sm>insetT[i])return false;")

NT="    \"Collisioni: casse, forzieri, barili e corda bloccano tutto il corpo disegnato (non si attraversano più) e non c'è più il muro invisibile davanti.\",\n    "
k='    "Conchiglie più piccole'
rep(k,NT+k)
open(P,'w',encoding='utf8').write(src);print('patch49 ok')
