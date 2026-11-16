#!/usr/bin/env python3
# Briciola, cuccia e cesto: disegni di Muse (passo 3) al posto del segnaposto a codice
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
D=json.load(open('/home/claude/work/mz3_briciola.json'))
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH106 FAIL',src.count(a),a[:60]);sys.exit(1)
    src=src.replace(a,b)
rep("NVDX.briciola=(g,e,t)=>{   // SEGNAPOSTO disegnato a codice","NVDX.briciola0=(g,e,t)=>{   // segnaposto (usato senza grafica nuova)")
NEW="""const MZ3=%s,MZ3O={};
function mz3(k){let i=MZ3O[k];if(!i){i=MZ3O[k]=new Image();i.src='data:image/webp;base64,'+MZ3[k]}return i.complete&&i.naturalWidth?i:null}
function mz3d(g,k,ax,ay,w,h,s){const i=mz3(k);if(!i)return false;g.drawImage(i,-ax*s,-ay*s,w*s,h*s);return true}
NVDX.briciola=(g,e,t)=>{
  if(!(GFXN&&VEGPG)||!mz3('briciola-fermo'))return NVDX.briciola0(g,e,t);
  const b=(S&&S.c2&&S.c2.br)||{};g.save();g.translate(e.x,e.y);
  // cuccia (108x84, ancora 54,74) o cesto (88x68, ancora 44,57), un po' ridotti rispetto al disegno
  if(b.home==='cuccia'){g.save();g.translate(-38,1);shadow(g,0,1,30,7,.22);mz3d(g,'cuccia',54,74,108,84,.72);g.restore()}
  else if(b.home==='cesto'){g.save();g.translate(-34,1);shadow(g,0,1,22,6,.22);mz3d(g,'cesto',44,57,88,68,.72);g.restore()}
  shadow(g,0,2,15,4,.25);
  const pose=b.home==='cesto'?'briciola-seduta':b.home==='cuccia'?'briciola-sdraiata':'briciola-fermo';
  const A={'briciola-fermo':[31,44,62,46],'briciola-seduta':[26,44,52,46],'briciola-sdraiata':[37,35,74,37]}[pose];
  const br=1+Math.sin(t*2.2)*.012;g.scale(1,br);
  mz3d(g,pose,A[0],A[1],A[2],A[3],.68);g.restore()};
"""%json.dumps(D)
rep("const NVDX={};","const NVDX={};\n"+NEW)
open(P,'w',encoding='utf8').write(src);print('patch106 ok')
