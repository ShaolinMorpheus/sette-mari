#!/usr/bin/env python3
import sys,json,re
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
Z=json.load(open('/home/claude/work/veg/z.json'))
def rep(a,b,n=1):
    global src
    if src.count(a)!=n:print('PATCH89 FAIL',a[:80],src.count(a));sys.exit(1)
    src=src.replace(a,b)
def pre(prefix,key):   # prefix + "  ->  prefix + VEGPG&&VEGZ[key]||"
    rep(prefix+'"',prefix+'VEGPG&&VEGZ["%s"]||"'%key)
for p,k in [('const rA=mkArt(','boulder-a'),('const rB=mkArt(','boulder-b'),('SP.stump=mkArt(','stump'),('SP.rubble=mkR(','rubble'),('SP.rubbleS=mkR(','rubbleS'),
            ('SP.capanna=mkB(','capanna'),('SP.banco=mkB(','banco'),('SP.mina=mkB(','grotta')]:pre(p,k)
for k in ['ferro_c','ferro_a','oro_c','oro_a','falo_b','falo_f']:rep('"%s": "'%k,'"%s": VEGPG&&VEGZ["%s"]||"'%(k,k))
for k,n in [('cassa_c','crate'),('cassa_a','crateO'),('barile_a','barrel-a'),('barile_b','barrel-b')]:rep('"%s": "'%k,'"%s": VEGPG&&VEGZ["%s"]||"'%(k,n))
for k in ['scallop','spiral','cone']:rep('"%s":["'%k,'"%s":[VEGPG&&VEGZ["%s"]||"'%(k,k))
# pino: due varianti
m=re.search(r'SP\.pine=mkArt\(VEGP&&VEGX\["pine"\]\|\|"[A-Za-z0-9+/=]+",113,160,56\.5,159,\[[^\]]*\]\);',src)
if not m:print('PATCH89 FAIL pine');sys.exit(1)
add="\n  if(VEGP&&VEGZ[\"pine-a\"]){const pa=mkArt(VEGZ[\"pine-a\"],113,160,56.5,159,[{},{f:1,fl:'brightness(.96) saturate(1.04)'},{fl:'brightness(1.05) saturate(.95)'}]),pb=mkArt(VEGZ[\"pine-b\"],113,160,56.5,159,[{f:1,fl:'brightness(.93) saturate(1.06)'},{fl:'brightness(.98) saturate(1.02)'}]);SP.pine=pa.concat(pb)}"
src=src[:m.end()]+add+src[m.end():]
# oggetti disegnati a codice -> arte di Muse (stesso canvas, stessa misura)
rep("SP.rockpool=mkRockpool();","SP.rockpool=swapArt(mkRockpool(),'rockpool');if(VEGPG&&VEGZ['rockpool0'])SP.rockpool0=swapArt(mkRockpool(),'rockpool0');")
rep("SP.mesa=MESA_PTS.length?mkMesa():null;","SP.mesa=MESA_PTS.length?swapArt(mkMesa(),'mesa'):null;")
rep("SP.torre=mkTorre();","SP.torre=swapArt(mkTorre(),'torre');")
rep("SP.bandiera=mkBandiera();","SP.bandiera=swapArt(mkBandiera(),'bandiera');")
rep("SP.oldcamp=mkOldCamp();SP.lookout=mkLookoutPine();","SP.oldcamp=swapArt(mkOldCamp(),'oldcamp');SP.lookout=swapArt(mkLookoutPine(),'lookout');")
# pozza vuota
rep("g.save();g.translate(e.x,e.y);if(!e.ready)g.globalAlpha=.6;drawSp(g,SP.rockpool,0,0,1);g.restore();","g.save();g.translate(e.x,e.y);if(!e.ready&&!SP.rockpool0)g.globalAlpha=.6;drawSp(g,(!e.ready&&SP.rockpool0)?SP.rockpool0:SP.rockpool,0,0,1);g.restore();")
# dati e funzione, globali
glue="var VEGPG=false;try{VEGPG=localStorage.getItem('sm_past')==='1'}catch(e){}\nvar VEGZ=%s;\nfunction swapArt(s,k){if(!(VEGPG&&VEGZ[k])||!s||!s.c)return s;const im=new Image();im.onload=()=>{const x=s.c.getContext('2d');x.clearRect(0,0,s.c.width,s.c.height);x.drawImage(im,0,0,s.c.width,s.c.height)};im.src='data:image/webp;base64,'+VEGZ[k];return s}\n"%json.dumps(Z)
rep("function drawSp(g,s,x,y,k,al){","%sfunction drawSp(g,s,x,y,k,al){"%glue)
open(P,'w',encoding='utf8').write(src);print('patch89 ok')
