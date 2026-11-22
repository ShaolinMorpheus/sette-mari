import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('PATCH124 FAIL',s.count(a),a[:90]);sys.exit(1)
    s=s.replace(a,b)
# tavolo rotondo e sgabelli: ora sono solidi (righe 3-5, colonne 12-15), non ci si sale piu' sopra
rep("fl(12,4,15,4,3);","fl(12,3,15,5,3);")
rep("hf('h_table',12,4,4,1,'Tavolo')","hf('h_table',12,3,4,3,'Tavolo')")
# bauli piu' piccoli e proporzionati
rep("else if(k==='sea'){g.translate(X(1),Y(6));sh(44,42,36);g.drawImage(I.chest,10,-14,68,62)}","else if(k==='sea'){g.translate(X(1),Y(6));sh(44,40,26);g.drawImage(I.chest,19,-4,50,46)}")
rep("else if(k==='chest'){g.translate(X(25),Y(6));sh(44,42,36);g.drawImage(I.chest,10,-14,68,62)}","else if(k==='chest'){g.translate(X(25),Y(6));sh(44,40,26);g.drawImage(I.chest,19,-4,50,46)}")
open(P,'w',encoding='utf8').write(s);print('patch124 ok')
