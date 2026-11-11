#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH46 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
js=open('/home/claude/work/chest/props_mod.js',encoding='utf8').read()
rep("/* ---- 12d_kb.js ---- */",js+"\n/* ---- 12d_kb.js ---- */")
rep("GfxNew.bld();GfxNew.chest()}","GfxNew.bld();GfxNew.chest();GfxNew.props()}")
# casse del bottino
rep("g.save();g.translate(e.x,e.y);shadow(g,2,3,24,7,.26);drawSp(g,e.got?SP.crateO:SP.crate,0,0,1);g.restore();if(!e.got)twinkle(g,e.x+14,e.y-40-Math.sin(t*2)*2,t,9,e.x,'#ffe27a');return}",
    "{const cs=e.got?SP.crateO:SP.crate;g.save();g.translate(e.x,e.y);if(cs.art)artGround(g,cs,1,cs.w*.36);else shadow(g,2,3,24,7,.26);drawSp(g,cs,0,0,1);g.restore();if(!e.got)twinkle(g,e.x+14,e.y-(cs.art?cs.ay+2:40)-Math.sin(t*2)*2,t,9,e.x,'#ffe27a');return}}")
rep("g.save();g.translate(e.x,e.y);drawSp(g,e.id==='lt_flint'?SP.barrel[1]:SP.crate,0,0,1);g.restore();if(!e.got)twinkle(g,e.x+14,e.y-40-Math.sin(t*2)*2,t,9,e.x,'#ffe27a');return}",
    "{const cs=e.id==='lt_flint'?SP.barrel[1]:SP.crate;g.save();g.translate(e.x,e.y);if(cs.art)artGround(g,cs,1,cs.w*.36);drawSp(g,cs,0,0,1);g.restore();if(!e.got)twinkle(g,e.x+14,e.y-(cs.art?cs.ay+2:40)-Math.sin(t*2)*2,t,9,e.x,'#ffe27a');return}}")
# deco (barili, cassa, corda)
rep("  g.save();g.translate(e.x,e.y);\n  if(e.flip)g.scale(-1,1);\n  drawSp(g,s,0,0,e.k||1);g.restore();\n}",
    "  g.save();g.translate(e.x,e.y);\n  if(e.flip)g.scale(-1,1);\n  if(s.art)artGround(g,s,e.k||1,s.w*.36);\n  drawSp(g,s,0,0,e.k||1);g.restore();\n}")
NEW="    \"Grafica di prova: casse (chiuse e aperte), barili e matassa di corda sono ora disegni d'arte.\",\n    "
rep('    "Grafica di prova: forzieri e bauli',NEW+'"Grafica di prova: forzieri e bauli')
open(P,'w',encoding='utf8').write(src)
print('patch46 ok')
