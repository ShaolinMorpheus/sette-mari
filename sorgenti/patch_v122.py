import sys,json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('PATCH122 FAIL',s.count(a),a[:90]);sys.exit(1)
    s=s.replace(a,b)
A=json.load(open('/home/claude/work/hut_assets.json'));A.pop('_ratio',None)
assert 'var GFXN' in s or 'const GFXN' in s or 'let GFXN' in s
rep("function huRR(g,x,y,w,h,r,f,s){",
"""/* ---- interni delle capanne: pezzi di Muse (blocco E, 20 nov). Solo con Grafica di prova + Mappa di prova ---- */
const HUA=%s;
const HUM=(()=>{
  const o={im:{},st:0,n:0},ks=Object.keys(HUA);
  o.ok=()=>{                       // GFXN e VEGPG sono definiti piu' avanti: si controlla alla prima richiesta
    if(!o.st){o.st=1;if(GFXN&&VEGPG){o.on=1;for(const k of ks){const im=new Image();im.onload=()=>{if(++o.n===ks.length&&typeof HUT!=='undefined'&&HUT)HUT.canvas=null};im.src='data:image/webp;base64,'+HUA[k];o.im[k]=im}}}
    return !!o.on&&o.n>=ks.length;
  };
  return o;
})();
function huRR(g,x,y,w,h,r,f,s){""" % json.dumps(A))
# pavimento
rep("  for(let py=0;py<H;py+=22){\n","  if(HUM.ok()){g.save();g.scale(.6875,.6875);g.fillStyle=g.createPattern(HUM.im.floor,'repeat');g.fillRect(0,0,W/.6875,H/.6875);g.restore()}else for(let py=0;py<H;py+=22){\n")
# pareti
rep("  // ombra delle pareti sul pavimento\n","""  if(HUM.ok()){for(let y=0;y<HU_H;y++)for(let x=0;x<HU_W;x++){if(G[y][x]!==0)continue;const px=x*TS,py=y*TS,face=y===0||y===HU_H-1;
    g.drawImage(HUM.im.wall,(x%2)*128,(y%2)*128,128,128,px,py,TS,TS);
    if(face){const q=g.createLinearGradient(0,py,0,py+TS);q.addColorStop(0,'rgba(30,16,6,.12)');q.addColorStop(1,'rgba(30,16,6,.55)');g.fillStyle=q;g.fillRect(px,py,TS,TS);g.fillStyle='#3a2312';g.fillRect(px,py+TS-8,TS,8);g.fillStyle='rgba(255,220,160,.18)';g.fillRect(px,py+TS-8,TS,2)}
    else{g.fillStyle='rgba(30,16,6,.38)';g.fillRect(px,py,TS,TS);g.fillStyle='#7a5430';g.fillRect(px,py,3,TS);g.fillRect(px+TS-3,py,3,TS)}}}
  // ombra delle pareti sul pavimento
""")
# finestre
rep("  for(const gx of[4.5,22]){const px=gx*TS-26,py=3;","  if(HUM.ok()){for(const gx of[4.5,22])g.drawImage(HUM.im.win,gx*TS-23,-2,46,48)}else for(const gx of[4.5,22]){const px=gx*TS-26,py=3;")
# tappeto
rep("  huRR(g,19.9*TS,4.4*TS,5.4*TS,2.2*TS,10,'#2f5576','#e0cf9a');huRR(g,20.3*TS,4.7*TS,4.6*TS,1.6*TS,6,null,'#e0cf9a');\n",
    "  if(HUM.ok())g.drawImage(HUM.im.rug,22.6*TS-75,5.5*TS-48,150,96);else{huRR(g,19.9*TS,4.4*TS,5.4*TS,2.2*TS,10,'#2f5576','#e0cf9a');huRR(g,20.3*TS,4.7*TS,4.6*TS,1.6*TS,6,null,'#e0cf9a')}\n")
# arredi
rep("  g.save();\n  if(k==='bed'){\n","""  g.save();
  if(HUM.ok()){const I=HUM.im;let done=true;
    if(k==='bed'){g.translate(X(1),Y(1));sh(68,86,70);g.drawImage(I.bed,-2,0,136,90)}
    else if(k==='shelf'){g.translate(X(10),Y(1));sh(44,50,36);g.drawImage(I.shelf,10,-44,68,97)}
    else if(k==='table'){g.translate(X(12),Y(4));g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(88,50,58,16,0,0,7);g.fill();g.drawImage(I.table,28,-34,120,118)}
    else if(k==='stool1'||k==='stool2'){const sx=k==='stool1'?X(12)+8:X(15)-6;g.translate(sx,Y(5)+8);sh(18,26,16);g.drawImage(I.stool,0,-12,34,37)}
    else if(k==='sea'){g.translate(X(1),Y(6));sh(44,42,36);g.drawImage(I.chest,10,-14,68,62)}
    else if(k==='chest'){g.translate(X(25),Y(6));sh(44,42,36);g.drawImage(I.chest,10,-14,68,62)}
    else done=false;
    if(done){g.restore();return}
  }
  if(k==='bed'){
""")
rep("list.push({y:Y(5.0),d:()=>hutProp(g,'table',t)})","list.push({y:HUM.ok()?Y(.5):Y(5.0),d:()=>hutProp(g,'table',t)})")
# tappeti delle stanze 1 e 2
rep("  // tappeti\n","  // tappeti\n  if(HUM.ok()){g.drawImage(HUM.im.rug,5*TS-75,5.2*TS-48,150,96);g.drawImage(HUM.im.rug,13.9*TS-95,5.9*TS-61,190,122)}else{\n")
rep("g.arc(0,0,120-i*16,0,7);g.fill()}g.restore();\n","g.arc(0,0,120-i*16,0,7);g.fill()}g.restore()}\n")
open(P,'w',encoding='utf8').write(s);print('patch122 ok')
