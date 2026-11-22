import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
A=open('/home/claude/work/sab_v3.b64').read().strip();B=open('/home/claude/work/sab_v4.b64').read().strip()
if s.count(A)!=1:print('PATCH129 FAIL',s.count(A));sys.exit(1)
s=s.replace(A,B)
a="x.filter='saturate(1.9) brightness(.9)';x.drawImage(im2,0,0,430,330);x.filter='none';"
if s.count(a)!=1:print('FAIL2');sys.exit(1)
s=s.replace(a,"x.filter='saturate(1.9) brightness(.9)';x.drawImage(im2,0,0,430,330);x.filter='none';")
open(P,'w',encoding='utf8').write(s);print('patch129 ok')
