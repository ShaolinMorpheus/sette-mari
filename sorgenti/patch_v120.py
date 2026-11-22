import re
p='/home/claude/work/base_index.html'
s=open(p,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:60])
    s=s.replace(a,b)
# il messaggio "Il Cormorano è là..." (fine della missione m1) esce dopo un po' di gioco, non dopo 3 passi
rep("if(!S.flags.moved&&hyp(P.x-FIX.spawn[0]*TS,P.y-FIX.spawn[1]*TS)>3.2*TS)S.flags.moved=1;",
    "if(!S.flags.moved&&hyp(P.x-FIX.spawn[0]*TS,P.y-FIX.spawn[1]*TS)>3.2*TS){S.flags.moved=1;S.flags.mvT=0}\n"
    "  if(S.flags.moved&&!S.flags.far){if(S.flags.mvT==null)S.flags.far=1;else{S.flags.mvT+=dt;if(S.flags.mvT>75||hyp(P.x-FIX.spawn[0]*TS,P.y-FIX.spawn[1]*TS)>13*TS)S.flags.far=1}}")
rep("goals:[{k:'flag',done:()=>!!S.flags.moved,txt:()=>\"Alzati e cammina",
    "goals:[{k:'flag',done:()=>!!S.flags.far,txt:()=>\"Alzati e cammina")
open(p,'w',encoding='utf8').write(s)
print('patch120 ok')
