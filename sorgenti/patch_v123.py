import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
B=open('/home/claude/work/nave_v1.b64').read().strip()
def rep(a,b):
    global s
    if s.count(a)!=1:print('PATCH123 FAIL',s.count(a),a[:90]);sys.exit(1)
    s=s.replace(a,b)
# nave dei Fuggiaschi ricostruita (nella cala): disegno dall'alto di Muse, solo con Grafica/Mappa di prova
rep("  const s=spriteOf(e.spr);if(!s)return;\n  if(s.mzp)","  const s=(e.id==='nave'&&e.spr==='shipFix'&&SP.shipFixM)||spriteOf(e.spr);if(!s)return;\n  if(s.mzp)")
rep("GfxNew.muse22();GfxNew.rub();","GfxNew.muse22();try{if(VEGPG){const im=new Image();im.onload=()=>{const[c,x]=mk(430,330);x.drawImage(im,0,0,430,330);SP.shipFixM={c,w:430,h:330,ax:215,ay:295,_x:x}};im.src='data:image/webp;base64,'+MZ23NAVE}}catch(e){}GfxNew.rub();")
rep("GfxNew.muse22=function(){",'const MZ23NAVE="%s";\nGfxNew.muse22=function(){'%B)
OLD="  g.save();g.translate(e.x,e.y);\n  if(e.flip)g.scale(-1,1);\n  if(s.art)artGround(g,s,e.k||1,s.w*.36);\n  drawSp(g,s,0,0,e.k||1);g.restore();\n}"
NEW="""  if(s===SP.shipFixM){const kk=e.k||1;g.save();g.translate(e.x+52*kk,e.y+62*kk);   // piu' vicina all'acqua e infossata nella sabbia
    g.save();g.beginPath();g.rect(-260*kk,-340*kk,520*kk,(340+14)*kk);g.clip();drawSp(g,s,0,16*kk,kk);g.restore();
    {const q=g.createRadialGradient(0,0,4,0,0,150*kk);q.addColorStop(0,'rgba(196,166,112,1)');q.addColorStop(.5,'rgba(190,160,106,.8)');q.addColorStop(1,'rgba(190,160,106,0)');
     g.save();g.translate(0,10*kk);g.scale(1,.13);g.fillStyle=q;g.beginPath();g.arc(0,0,150*kk,0,7);g.fill();g.restore()}
    g.restore();return}
"""+OLD
rep(OLD,NEW)
open(P,'w',encoding='utf8').write(s);print('patch123 ok')
