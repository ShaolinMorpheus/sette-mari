import sys,re
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('PATCH125 FAIL',s.count(a),a[:90]);sys.exit(1)
    s=s.replace(a,b)
# 1) la nave nella posizione scelta da Davide (offset di disegno incorporato), niente cumulo di sabbia per ora
i=s.index("  if(s===SP.shipFixM){const kk=e.k||1;")
j=s.index("    g.restore();return}\n",i)+len("    g.restore();return}\n")
s=s[:i]+"""  if(s===SP.shipFixM){const kk=e.k||1;g.save();g.translate(e.x+52*kk,e.y+62*kk);
    g.fillStyle='rgba(60,40,20,.22)';g.beginPath();g.ellipse(10*kk,6*kk,150*kk,12*kk,0,0,7);g.fill();
    drawSp(g,s,0,2*kk,kk);g.restore();return}
"""+s[j:]
rep("deco('nave','wreck2',CV2.ship[0],CV2.ship[1],[Math.floor(CV2.ship[0])-3,Math.floor(CV2.ship[1])-1,7,2],{k:.95",
    "deco('nave','wreck2',CV2.ship[0],CV2.ship[1],[68,45,6,2],{k:.95")
rep('"nave":[3062,1998]','"nave":[3018,2042]')
# 2) collisione solo sullo scafo: file 46-47 (6 colonne) piu' la tolda a prua (fila 45)
rep("label:'La nave dei Fuggiaschi',inter:'look',flip:true});\n};","label:'La nave dei Fuggiaschi',inter:'look',flip:true});\n  blockRect(69,45,5,1,1);\n};")
# 3) modifiche di Davide all'editor mappa (capitolo 2) incorporate nella mappa definitiva
rep("const EDKEY='sm_edits_w'+WORLD;","""try{const b=ED_BAKED['2'];b.mv=b.mv||{};b.mv.p22=[2079,762];b.wl=(b.wl||[]).concat([[154,116,0],[143,119,0],[144,119,0],[145,119,0],[146,119,0],[147,119,0],[148,119,0],[149,119,0],[150,119,0],[151,119,0],[152,119,0],[153,119,0],[154,119,0],[155,119,0],[156,119,0],[156,120,0],[155,120,0],[153,120,0],[152,120,0],[151,120,0],[150,120,0],[149,120,0],[148,120,0],[147,120,0],[146,120,0],[145,120,0],[144,120,0],[143,120,0],[154,120,0],[154,117,0],[154,118,0],[155,118,0],[155,117,0],[153,117,0],[152,117,0],[152,118,0],[153,118,0]])}catch(e){}
const EDKEY='sm_edits_w'+WORLD;""")
open(P,'w',encoding='utf8').write(s);print('patch125 ok')
