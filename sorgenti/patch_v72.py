#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
old=".mpn{overflow:hidden}.mp:not([hidden])"
if src.count(old)!=1:print('PATCH72 FAIL',src.count(old));sys.exit(1)
src=src.replace(old,".mpn{overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y}.mp:not([hidden])")
open(P,'w',encoding='utf8').write(src);print('patch72 ok')
