import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
A=open('/home/claude/work/pa_v2.b64').read().strip();B=open('/home/claude/work/pa_v3.b64').read().strip()
if src.count(A)!=1:print('PATCH121 FAIL',src.count(A));sys.exit(1)
src=src.replace(A,B)   # Pino Alto: bordo salmone sostituito con il verde scuro del contorno interno
open(P,'w',encoding='utf8').write(src);print('patch121 ok')
