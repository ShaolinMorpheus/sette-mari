#!/usr/bin/env python3
# Menu: anteprima di Briciola / cuccia / cesto (interruttore per controllare i disegni)
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH107 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
rep("var RIGT=false;","var BRPREV=0;try{BRPREV=+localStorage.getItem('sm_brprev')||0}catch(e){}\nvar RIGT=false;")
# voce di menu (solo nell'isola del Capitolo 2)
rep("(WORLD===2?T('mC2','⛺','Il campo',null)+","(WORLD===2?T('mBrP','🐕','Anteprima Briciola',['spenta','solo cagnetta','con cuccia','con cesto'][BRPREV],'tgl'+(BRPREV?' on':''))+T('mC2','⛺','Il campo',null)+")
rep("  {const rb=c.querySelector('#mRigT');","""  {const bb=c.querySelector('#mBrP');if(bb)bb.onclick=()=>{BRPREV=(BRPREV+1)%4;try{localStorage.setItem('sm_brprev',''+BRPREV)}catch(e){}
    const b=EID.briciola;if(b){if(BRPREV){if(b.ox==null){b.ox=b.x;b.oy=b.y}b.x=P.x+80;b.y=P.y+6}else if(b.ox!=null){b.x=b.ox;b.y=b.oy;b.ox=null}}
    UI.openMenu();UI.toast(['Anteprima spenta','Anteprima: solo Briciola','Anteprima: Briciola con cuccia','Anteprima: Briciola con cesto'][BRPREV]+(BRPREV&&!(GFXN&&VEGPG)?' (accendi Grafica di prova e Mappa di prova per vedere i disegni)':''))}}
  {const rb=c.querySelector('#mRigT');""")
rep("b.hidden=!v;b.inter=v?'look':null","b.hidden=!(v||BRPREV);b.inter=v?'look':null")
rep("const b=(S&&S.c2&&S.c2.br)||{};g.save();g.translate(e.x,e.y);\n  // cuccia","const b=BRPREV?{home:[0,0,'cuccia','cesto'][BRPREV]}:((S&&S.c2&&S.c2.br)||{});g.save();g.translate(e.x,e.y);\n  // cuccia")
open(P,'w',encoding='utf8').write(src);print('patch107 ok')
