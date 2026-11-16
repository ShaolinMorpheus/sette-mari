#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
a="SP.rockpool=mkRockpool();"
if src.count(a)!=1:print('PATCH97 FAIL');sys.exit(1)
src=src.replace(a,"SP.rockpool=swapArt(mkRockpool(),'rockpool');if(VEGPG&&VEGZ['rockpool0'])SP.rockpool0=swapArt(mkRockpool(),'rockpool0');")
open(P,'w',encoding='utf8').write(src);print('patch97 ok')
