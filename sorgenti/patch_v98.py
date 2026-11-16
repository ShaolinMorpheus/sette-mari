#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
a="const x=s.c.getContext('2d');x.clearRect(0,0,s.c.width,s.c.height);x.drawImage(im,0,0,s.c.width,s.c.height)}"
if src.count(a)!=1:print('PATCH98 FAIL a',src.count(a));sys.exit(1)
src=src.replace(a,"const x=s.c.getContext('2d');x.save();x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,s.c.width,s.c.height);x.drawImage(im,0,0,s.c.width,s.c.height);x.restore()}")
open(P,'w',encoding='utf8').write(src);print('patch98 ok')
# marinaio con ascia/piccone/mani di fronte o di spalle: usa i fotogrammi di profilo (niente salto alla giacca rossa)
src=open(P,encoding='utf8').read()
a="    if(v!=='profilo')return null;\n    var U=[0,.2"
b="    if(v!=='profilo')return null;\n    var E=sw<.45"
if src.count(a)!=1 or src.count(b)!=1:print('PATCH98 FAIL rig');sys.exit(1)
src=src.replace(a,"    var U=[0,.2").replace(b,"    var E=sw<.45")
# grotta a cielo aperto: stesso disegno nuovo dell'ingresso della miniera
c="  if(e.spr==='cave'){\n    g.save();g.translate(e.x,e.y);shadow(g,0,4,70,14,.3);"
if src.count(c)!=1:print('PATCH98 FAIL cave',src.count(c));sys.exit(1)
src=src.replace(c,"  if(e.spr==='cave'&&GFXN&&SP.mina&&SP.mina.art){g.save();g.translate(e.x,e.y);artGround(g,SP.mina,1,66);drawSp(g,SP.mina,0,0,1);g.restore();return}\n"+c)
open(P,'w',encoding='utf8').write(src);print('patch98 rig+cave ok')
