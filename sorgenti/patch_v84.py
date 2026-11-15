#!/usr/bin/env python3
import sys,json,re
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
X=json.load(open('/home/claude/work/veg/x.json'))
def sub1(pat,key):
    global src
    r=re.compile(pat)
    m=list(r.finditer(src))
    if len(m)!=1:print('PATCH84 FAIL',pat,len(m));sys.exit(1)
    src=r.sub(lambda mm:mm.group(1)+'VEGP&&VEGX["%s"]||"'%key,src,count=1)
sub1(r'(const pal=mkArt\()"','pal')
sub1(r'(const tA=mkArt\()"','tA')
sub1(r'(const tB=mkArt\()"','tB')
sub1(r'(SP\.pine=mkArt\()"','pine')
sub1(r'(SP\.bush=mkArt\()"','bush')
anchor="  const mkArt=(b64,lw,lh,ax,ay,vars)=>{"
if src.count(anchor)!=1:print('PATCH84 FAIL anchor');sys.exit(1)
src=src.replace(anchor,"  var VEGP=false;try{VEGP=localStorage.getItem('sm_past')==='1'}catch(e){}\n  var VEGX=%s;\n"%json.dumps(X)+anchor)
open(P,'w',encoding='utf8').write(src);print('patch84 ok')
