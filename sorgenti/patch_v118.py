#!/usr/bin/env python3
# Muse 22 nov: granchio e rana animati, Pino Alto (scala spostata accanto al tronco). Alberi/pini/ceppi di Muse non montati.
# Visibili solo con «Grafica di prova» + «Mappa di prova» come tutti i disegni di Muse.
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
D=json.load(open('/home/claude/work/mz22.json'))
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH118 FAIL',src.count(a),a[:80]);sys.exit(1)
    src=src.replace(a,b)

# 1) pacchetto immagini + caricatore
NEW="""const MZ22=%s,MZ22O={};
function mzi(k){let i=MZ22O[k];if(!i){i=MZ22O[k]=new Image();i.src='data:image/webp;base64,'+MZ22[k]}return i.complete&&i.naturalWidth?i:null}
"""%json.dumps(D)
rep("const NVDX={};","const NVDX={};\n"+NEW)

# 2) sprite d'arte (alberi, ceppi, Pino Alto)
GFX="""
/* ---- GRAFICA DI PROVA: alberi, ceppi e Pino Alto di Muse (22 nov) ---- */
GfxNew.muse22=function(){
  if(!VEGPG)return;
  const mzArt=(k,lw,lh,ax,ay,o)=>{o=o||{};const[c,x]=mk(lw,lh);const s={c,w:lw,h:lh,ax,ay,_x:x,art:o.noart?0:1};const im=new Image();
    im.onload=()=>{x.clearRect(0,0,lw,lh);x.save();if(o.flip){x.translate(lw,0);x.scale(-1,1)}if(o.fl)x.filter=o.fl;
      x.drawImage(im,o.dx||0,o.dy||0,o.dw||lw,o.dh||lh);x.restore();
      if(!o.noart){const[c2,x2]=mk(lw,lh);x2.drawImage(c,0,0,lw,lh);x2.globalCompositeOperation='source-in';x2.fillStyle='#0e1c0a';x2.fillRect(0,0,lw,lh);s.sh=c2}};
    im.src='data:image/webp;base64,'+MZ22[k];return s};
  // (alberi, pini, ceppi e Pino Maestro di Muse: NON montati, Davide vuole i precedenti)
  // Pino Alto: 760x1920 -> 190x480; l'asse del tronco (x=298 nel file) va portato a 95; la scala sta a +16 dall'asse
  SP.lookout=mzArt('pino-alto',190,480,95,476,{dx:20.5,dy:0,dw:190,dh:480,noart:1});
};
"""
rep("/* ---- GRAFICA DI PROVA: sprite d'arte (WebP incorporati) al posto di quelli disegnati a codice ---- */\nGfxNew.art=function(){",
    GFX+"/* ---- GRAFICA DI PROVA: sprite d'arte (WebP incorporati) al posto di quelli disegnati a codice ---- */\nGfxNew.art=function(){")
rep("GfxNew.nature();GfxNew.art();","GfxNew.nature();GfxNew.art();GfxNew.muse22();")

# 3) ceppo: usa quelli di Muse (specie giusta, nessuna riduzione)
rep("""function drawStump(g,e,isPine){const s=SP.stump;if(!s.art){drawSp(g,s,e.x,e.y+2);return}
  const k=isPine?.72:(e.type==='tree'&&e.v%2?.8:1);""",
"""function drawStump(g,e,isPine){let s=SP.stump;
  if(s.mz){s=e.id==='mast'&&SP.stumpM?SP.stumpM:(isPine&&SP.stumpP?SP.stumpP:SP.stump);
    g.save();g.translate(e.x,e.y+2);artGround(g,s,1,s===SP.stumpM?26:13);drawSp(g,s,0,2,1);g.restore();return}
  if(!s.art){drawSp(g,s,e.x,e.y+2);return}
  const k=isPine?.72:(e.type==='tree'&&e.v%2?.8:1);""")

# 4) Pino Maestro: sprite dedicato, senza l'ingrandimento 1,75 (e' gia' grande)
rep("const isPine=e.type==='pine',s=isPine?SP.pine[e.v]:SP.tree[e.v];\n  if(!e.alive&&(!e.fall||e.fall>=1)){drawStump(g,e,isPine);return}",
    "const isPine=e.type==='pine',mzM=e.id==='mast'&&SP.pineM&&SP.pineM.sh,s=mzM?SP.pineM:(isPine?SP.pine[e.v]:SP.tree[e.v]);\n  if(!e.alive&&(!e.fall||e.fall>=1)){drawStump(g,e,isPine);return}")
rep("const k=(e.alive?(.35+.65*e.grow):1)*(e.id==='mast'?1.75:1);","const k=(e.alive?(.35+.65*e.grow):1)*(e.id==='mast'&&!mzM?1.75:1);")

# 5) granchio animato
rep("""function drawCrab(g,e,t){
  if(e.alive===false)return;""","""function drawCrab(g,e,t){
  if(e.alive===false)return;
  if(GFXN&&VEGPG&&mzi('gr-fermo')){
    let k='fermo';const ph=e.ph||0;
    if(e.stun)k='spavento-1';
    else if(e.flee){const ft=e.fleeT||0;k=ft<.4?'spavento-'+(1+((t*10)|0)%2):'scappa-'+(1+((t*12)|0)%3)}
    else if(Math.abs(e.vx)>1)k='cammina-'+(1+((t*9+ph)|0)%4);
    else{const c=(t+ph*5)%13;if(c<2.4)k='scava-'+(c<.8?1:c<1.6?2:3)}
    const im=mzi('gr-'+k)||mzi('gr-fermo');
    g.save();g.translate(e.x,e.y);if(e.vx<0)g.scale(-1,1);const s=.2125;g.drawImage(im,-80*s,-84*s,160*s,112*s);g.restore();return;
  }""")

# 6) rana: salta davvero, respira, gracida
rep("""  if(AMB.frog&&ambNight()){
    for(const f of AMB.frog){
""","""  if(AMB.frog&&ambNight()){
    for(const f of AMB.frog){
      if(GFXN&&VEGPG&&mzi('ra-ferma')){
        const dr=f.dir||1;let k='ferma';
        if(f.hop>0&&f.tx!=null){k='salto-'+(1+Math.min(4,((1-f.hop)*5)|0))}
        else if(AMB.frog[0]===f&&AMB.croak<.5&&AMB.croak>0)k='gracida-'+(1+((t*7)|0)%3);
        else{const q=Math.sin(t*2.1+f.ph);k=q>.8?'respira-2':q>.5?'respira-1':'ferma'}
        const im=mzi('ra-'+k)||mzi('ra-ferma'),s=.34;
        g.save();g.translate(f.x,f.y);if(dr<0)g.scale(-1,1);g.drawImage(im,-48*s,-62*s,96*s,72*s);g.restore();continue}
""")
open(P,'w',encoding='utf8').write(src);print('patch118 ok')
