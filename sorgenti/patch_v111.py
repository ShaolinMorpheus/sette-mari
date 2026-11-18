#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH111 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
rep("function drawNpc(g,e,t){\n",
r"""const NOM=__NOM__,NOMI={},NOMF={ferro:1.06,nives:1,tito:.88,gnocco:1};
function nomImg(k){if(!VEGPG||!NOM[k])return null;let o=NOMI[k];if(!o){o=NOMI[k]=new Image();o.src='data:image/webp;base64,'+NOM[k]}return o.complete&&o.naturalWidth?o:null}
function nomDraw(g,x,y,o){
  const w=o.k&&o.k.name&&o.k.name.toLowerCase();if(!NOMF[w])return false;
  const mv=!!o.moving,fl=!!o.flip,ph=o.walk||0,i=1+Math.floor((((ph/(Math.PI*2))%1)+1)%1*4);
  const k=w+'/'+(mv?'profilo-'+(fl?'sinistro':'destro')+'-passo'+i:'fronte-fermo'),im=nomImg(k)||nomImg(w+'/fronte-fermo');if(!im)return false;
  const sc=70/376*NOMF[w]*(o.s||1),W=336*sc,H=376*sc;
  g.save();g.translate(x,y);
  if(!o.noShadow){g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,0,14*NOMF[w],5.4,0,0,7);g.fill()}
  g.drawImage(im,-W/2,-H,W,H);
  if(o.emote){g.translate(0,-H-6);const b=Math.sin((o.t||0)*6)*1.5;g.fillStyle='#fff';g.strokeStyle='#2a1a0e';g.lineWidth=1.6;g.beginPath();g.arc(0,b,9,0,7);g.fill();g.stroke();g.fillStyle=o.emote==='?'?'#2a6aa8':'#d8412f';g.font='700 14px Nunito,Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(o.emote,0,b+1)}
  g.restore();return true}
function drawNpc(g,e,t){
""")
rep("  const m=Ch2.npcMark(e);if(m)o.emote=m;\n  drawChar(g,e.x,e.y-FE.hop(e,t),o);",
    "  const m=Ch2.npcMark(e);if(m)o.emote=m;\n  if(!nomDraw(g,e.x,e.y-FE.hop(e,t),o))drawChar(g,e.x,e.y-FE.hop(e,t),o);")
src=src.replace('__NOM__',open('/home/claude/work/mz_nom.json').read(),1)
open(P,'w',encoding='utf8').write(src);print('patch111 ok')
