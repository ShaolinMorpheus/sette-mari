import sys,re
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
new=open('/home/claude/work/cap_ritr_rosa.b64').read().strip()
m=list(re.finditer(r'"capitano-giacca/neutro":\s*"([^"]+)"',s))
if len(m)!=1:print('FAIL',len(m));sys.exit(1)
s=s[:m[0].start(1)]+new+s[m[0].end(1):]
open(P,'w',encoding='utf8').write(s);print('ok143')
