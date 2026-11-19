#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH115 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
rep("function drawPortrait(cv,key){\n",
r"""const PORT=__PORT__,PORTI={};
function portImg(k){if(!VEGPG||!PORT[k])return null;let o=PORTI[k];if(!o){o=PORTI[k]=new Image();o.src='data:image/webp;base64,'+PORT[k]}return o.complete&&o.naturalWidth?o:null}
if(VEGPG)setTimeout(function(){for(const k in PORT)portImg(k)},0);
/* espressione dalla battuta: una riga puo' forzarla con m:'felice|preoccupato|serio|sorpreso|triste|neutro' */
function portExpr(L){
  if(!L)return 'neutro';if(L.m)return L.m;
  const t=String(L.t||'').toLowerCase();
  if(/\?!|!\?|\?\?/.test(t)||/\b(cosa\?!|non è possibile|incredibile|impossibile|non ci credo|guarda|che cos'è|chi è)\b/.test(t))return 'sorpreso';
  if(/\b(morto|morta|morti|perso|persa|purtroppo|mi dispiace|addio|perduto|solo|sola|piango|mancano|non c'è più|era mio|scusa|scusami)\b/.test(t))return 'triste';
  if(/\b(stupido|idiota|fuori|bugiardo|mentitore|basta|ladro|traditore|non toccare|ti avviso|zitto|vattene|maledetto|chi mente)\b/.test(t))return 'serio';
  if(/\b(attenzione|pericolo|aiuto|presto|paura|tempesta|nave|arriva|arrivano|scappa|sbrigati|non so|forse|temo|preoccup)\b/.test(t))return 'preoccupato';
  if(/\b(grazie|bravo|brava|evviva|ottimo|fantastico|bene|finalmente|ce l'abbiamo fatta|ahah|ah ah|ha ha|haha|splendido|bellissimo|buonissimo)\b/.test(t)||/!\s*$/.test(t)&&/\b(ecco|trovato|sì)\b/.test(t))return 'felice';
  if(/!/.test(t))return /\b(no|non|via|fermo)\b/.test(t)?'serio':'neutro';
  return 'neutro';
}
function portKey(key){
  if(typeof key==='object'&&key)return key.oid==='o_mar'?'capitano-marinaio':'capitano-giacca';
  return ({biscotto:1,ferro:1,nives:1,tito:1,gnocco:1,giacomo:1,pip:1,dodo:1})[key]?key:null;
}
function drawPortrait(cv,key,L){
""")
rep("  if(key==='giacomo'&&nomImg('giacomo/fronte-fermo')){",
"""  const __pk=portKey(key),__pi=__pk&&portImg(__pk+'/'+portExpr(L))||(__pk&&portImg(__pk+'/neutro'));
  if(__pi){
    g.drawImage(__pi,0,0,W,H);
    if(typeof key==='object'&&key&&key.hat&&key.hat!=='bald'&&typeof RIGHATMAP==='function'){
      const nm=RIGHATMAP(key),ha=nm&&RIGHAT.art[nm];
      if(ha&&RIG.hatok){const im=RIG.hat[nm+'_f'],Wc=RIGHAT.WC.f,Hc=RIGHAT.H,f=.842,qx=130-160.77*f,qy=8-19.1*f,qw=321.5*f,qh=286.7*f;
        g.save();g.scale(W/256,H/256);g.transform(qw/Wc,0,0,qh/Hc,qx,qy);g.drawImage(im,-RIGHAT.ML,-RIGHAT.MT,ha.wf,ha.h);g.restore()}
    }
    g.restore();return;
  }
  if(key==='giacomo'&&nomImg('giacomo/fronte-fermo')){""")
rep("  drawPortrait($('dlgPort'),hero?heroSpec():L.w);","  drawPortrait($('dlgPort'),hero?heroSpec():L.w,L);")
src=src.replace('__PORT__',open('/home/claude/work/mz_port.json').read(),1)
open(P,'w',encoding='utf8').write(src);print('patch115 ok')
