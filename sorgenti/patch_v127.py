import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
A=open('/home/claude/work/sab_v1.b64').read().strip();B=open('/home/claude/work/sab_v2.b64').read().strip()
if s.count(A)!=1:print('PATCH127 FAIL',s.count(A));sys.exit(1)
s=s.replace(A,B)   # sabbia della Sirena v2 di Muse: texture vera del terreno
A2="x.drawImage(im2,0,0,430,330);{const gm"
if s.count(A2)!=1:print('FAIL2');sys.exit(1)
s=s.replace(A2,"x.filter='saturate(.62) brightness(.84)';x.drawImage(im2,0,0,430,330);x.filter='none';{const gm")   # accordata ai toni del terreno in gioco
open(P,'w',encoding='utf8').write(s);print('patch127 ok')
