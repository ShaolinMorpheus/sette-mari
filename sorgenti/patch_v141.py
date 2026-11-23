import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
a='"2": [["d",68.6,46.8,5.0,2.5]]'
if s.count(a)!=1:print('FAIL');sys.exit(1)
s=s.replace(a,'"2": [["d",68.6,46.8,5.0,2.5],["d",75.7,46.6,2.2,1.9],["d",76.6,44.4,1.9,2.6],["d",77.2,42.4,1.4,1.8]]')
open(P,'w',encoding='utf8').write(s);print('ok141')
