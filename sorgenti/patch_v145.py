import sys,re,json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
d=json.load(open('/home/claude/work/cap_ritr_all.json'))
for k,v in d.items():
    m=list(re.finditer(r'"'+re.escape(k)+r'":\s*"([^"]+)"',s))
    if len(m)!=1:print('FAIL',k,len(m));sys.exit(1)
    s=s[:m[0].start(1)]+v+s[m[0].end(1):]
open(P,'w',encoding='utf8').write(s);print('ok145',len(d))
