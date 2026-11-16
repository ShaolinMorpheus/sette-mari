#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
a="FOAM_A=sm(cFa,fw1,fh1);FOAM_B=sm(cFb,fw1,fh1);CAUS_A=sm(cCa,fw1,fh1);CAUS_B=sm(cCb,fw1,fh1);"
b="FOAM_A=PT?mkc(1,1):sm(cFa,fw1,fh1);FOAM_B=PT?mkc(1,1):sm(cFb,fw1,fh1);CAUS_A=PT?mkc(1,1):sm(cCa,fw1,fh1);CAUS_B=PT?mkc(1,1):sm(cCb,fw1,fh1);"
if src.count(a)!=1:print('PATCH91 FAIL');sys.exit(1)
open(P,'w',encoding='utf8').write(src.replace(a,b));print('patch91 ok')
