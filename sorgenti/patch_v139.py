import sys,json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('FAIL',s.count(a),a[:80]);sys.exit(1)
    s=s.replace(a,b)
A=json.load(open('/home/claude/work/mer_assets.json'))
MERA=json.dumps(A)
# 1) ritratto nel dialogo
rep("let h='<h2>Il mercante di passaggio</h2>","let h=(X2.merPort?X2.merPort():'')+'<h2>Il mercante di passaggio</h2>")
# 2) disegno nuovo: mercante + barchetta di Muse (solo Grafica di prova + Mappa di prova)
i=s.index("X2.merDraw=function(g,t){")
s=s[:i]+"X2.merDrawOld=function(g,t){"+s[i+len("X2.merDraw=function(g,t){"):]
j=s.index("/* ---- le missioni di Biscotto")
NEW="""/* ---- mercante e barchetta nuovi (Muse, 23 nov). Solo con Grafica di prova + Mappa di prova ---- */
const MERA=%s;
const MERM=(()=>{const o={im:{},n:0,st:0},ks=Object.keys(MERA);
  o.ok=()=>{if(!o.st){o.st=1;if(GFXN&&VEGPG){o.on=1;for(const k of ks){const im=new Image();im.onload=()=>{o.n++};im.src='data:image/webp;base64,'+MERA[k];o.im[k]=im}}}return !!o.on&&o.n>=ks.length};
  return o})();
X2.merPort=function(){if(!MERM.ok())return '';const k=(S.res&&0)?'':'ritratto-mercante-neutro';return '<img alt="" src="data:image/webp;base64,'+MERA[k]+'" style="float:left;width:76px;height:76px;margin:0 10px 2px 0;border-radius:12px;background:rgba(0,0,0,.18)">'};
X2.merDraw=function(g,t){
  if(!X2.merHere())return;
  if(!MERM.ok())return X2.merDrawOld(g,t);
  const m=X2.st().mr,x=(m.x+.5)*TS,y=(m.y+.8)*TS,I=MERM.im;
  const dr=(k,ax,ay,sc,dx,dy)=>{const im=I[k];g.drawImage(im,x+dx-ax*sc,y+dy-ay*sc,im.width*sc,im.height*sc)};
  g.save();g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';
  dr('barchetta-ombra',180,35,.5,-6,10);
  dr('barchetta-attraccata-destra',180,246,.5,-6,6);
  dr('merce-barile',105,372,.13,-96,24);
  dr('merce-cassa',176,428,.15,-70,26);
  dr('merce-sacco',110,516,.12,-44,20);
  dr('cartello-moneta',230,476,.13,96,22);
  const near=Math.hypot(P.x-(x+62),P.y-(y+14))<TS*3.2,k=near?(((t/1.6)|0)%%2?'mercante-fronte-offre2':'mercante-fronte-offre1'):'mercante-fronte-fermo';
  g.fillStyle='rgba(20,12,4,.28)';g.beginPath();g.ellipse(x+62,y+16,19,5.5,0,0,7);g.fill();
  dr(k,168,364,.2,62,14);
  g.restore();
  twinkle(g,x+30,y-72,t,7,1.3,'#ffe27a');
};

""" % MERA
s=s[:j]+NEW+s[j:]
open(P,'w',encoding='utf8').write(s)
print('ok')
# 3) il mercante non attracca addosso alla Sirena
s=open(P,encoding='utf8').read()
rep("const rr=mulberry(S.day*977+WORLD*13),s=cs[(rr()*cs.length)|0];","const nvE=E.find(e=>e.id==='nave'),cs2=nvE?cs.filter(q=>Math.hypot((q[0]+.5)*TS-nvE.x-215*(nvE.k||1)*.5,(q[1]+.5)*TS-nvE.y)>TS*9):cs,rr=mulberry(S.day*977+WORLD*13),s=(cs2.length?cs2:cs)[(rr()*(cs2.length?cs2:cs).length)|0];")
open(P,'w',encoding='utf8').write(s);print('ok2')
