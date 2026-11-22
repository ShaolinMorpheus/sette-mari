import sys,re
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
A=open('/home/claude/work/sab_v2.b64').read().strip();B=open('/home/claude/work/sab_v3.b64').read().strip()
if s.count(A)!=1:print('PATCH128 FAIL',s.count(A));sys.exit(1)
s=s.replace(A,B)
# la v3 di Muse ha gia' colore e sagoma giusti: via il filtro di colore e la dissolvenza laterale
i=s.index("x.filter='saturate(.62) brightness(.84)';x.drawImage(im2,0,0,430,330);x.filter='none';")
j=s.index("SP.shipSandM={",i)
s=s[:i]+"x.filter='saturate(1.9) brightness(.9)';x.drawImage(im2,0,0,430,330);x.filter='none';"+s[j:]
open(P,'w',encoding='utf8').write(s);print('patch128 ok')
