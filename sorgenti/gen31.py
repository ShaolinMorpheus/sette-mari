import re
E='/home/claude/work/erba/'
nw=open(E+'new_parts.js',encoding='utf8').read().split('\n')
od=open(E+'old_parts.js',encoding='utf8').read().split('\n')
def blk(lines,a,b): return '\n'.join(lines[a-1:b])
# new parts: shadow(2) line(3) frond..rock2 (15..86)
new_txt=blk(nw,2,3)+'\n'+blk(nw,15,86)
# old parts: rnd(1), helpers 3..9 (no shadow), oak..end
old_txt=blk(od,1,1)+'\n'+blk(od,3,9)+'\n'+blk(od,12,len(od))
new_txt=new_txt.replace("function shadow(x,y,rx,ry,a,col){","function shadow(x,y,rx,ry,a,col){if(NOSH)return;",1)
# palma: coco opzionale, noci piu' grandi
new_txt=new_txt.replace("function palm(x,y,s,flip){","function palm(x,y,s,flip,coco){",1)
new_txt=new_txt.replace("for(const[cx,cy,r]of[[-9,10,11],[8,12,11.5],[0,22,11],[-2,2,10]]){","for(const[cx,cy,r]of(coco?[[-12,9,13.5],[9,11,14],[-1,24,13.5],[-3,-1,12.5],[17,26,11.5]]:[])){",1)
assert 'coco?' in new_txt
i=new_txt.index("  for(const[cx,cy,r]of(coco?");j=new_txt.index('\n',i)
cl=new_txt[i:j];new_txt=new_txt[:i]+new_txt[j+1:]
cl=cl.replace('[[-12,9,13.5],[9,11,14],[-1,24,13.5],[-3,-1,12.5],[17,26,11.5]]','[[-13,12,14],[9,13,14.5],[-2,26,14],[-3,2,13],[18,27,12]]')
k=new_txt.index("function stump");e=new_txt.rindex("  g.restore();",0,k)
new_txt=new_txt[:e]+cl+'\n'+new_txt[e:]
assert '[1.57,64,6,32,14],' in new_txt
new_txt=new_txt.replace('[1.57,64,6,32,14],','',1)
# cespuglio: bacche/fiori opzionali
old_txt=old_txt.replace("for(let i=0;i<11;i++){const b=B[(r()*4)|0]","for(let i=0;i<(OPT.berries?11:0);i++){const b=B[(r()*4)|0]",1)
assert 'OPT.berries' in old_txt
old_txt=old_txt.replace("\n  g.restore();\n}\n/* ---- roccia","\n  if(OPT.flowers){const r2=rnd(21);for(let i=0;i<9;i++){const b=B[(r2()*5)|0],xx=b[0]+(r2()-.5)*b[2]*1.3,yy=b[1]+(r2()-.4)*b[2]*.9;for(let k=0;k<5;k++){const a=k/5*6.283;g.fillStyle=OPT.fc||'#fff';g.beginPath();g.arc(xx+Math.cos(a)*2.6,yy+Math.sin(a)*2.6,1.9,0,7);g.fill()}g.fillStyle='#ffd23a';g.beginPath();g.arc(xx,yy,1.7,0,7);g.fill()}}\n  g.restore();\n}\n/* ---- roccia",1)
assert 'OPT.flowers' in old_txt
# quercia autunnale (copia con colori diversi)
m=re.search(r"function oak\(.*?\n}\n",old_txt,re.S); oak=m.group(0)
aut=oak.replace('function oak(','function oakA(')
for a,b in [("'#2f7d32'","'#b8541a'"),("'#8fdc5a'","'#f7d658'"),("'#4fae3e'","'#e0842a'"),("rgba(47,125,50,0)","rgba(184,84,26,0)"),("rgba(170,236,110,.55)","rgba(255,226,120,.55)"),("rgba(24,96,44,.4)","rgba(120,40,10,.4)"),("rgba(200,255,150,.5)","rgba(255,240,170,.5)"),("rgba(20,84,40,.35)","rgba(110,40,10,.35)"),("rgba(18,70,40,.42)","rgba(90,30,10,.42)")]:
    assert a in aut,a; aut=aut.replace(a,b)
old_txt+= '\n'+aut
js=r'''
/* ---- 12c_gfx_nuova.js: grafica nuova (cartoon con contorno) — attivabile dal menu ---- */
var GFXN=false;try{GFXN=localStorage.getItem('sm_gfx')==='new'}catch(e){}
var NGV={t:GFXN?8:6,p:GFXN?5:4};
var GfxNew=(function(){
  let g;const OW=3.2,OC='#16301a';let NOSH=true;const OPT={};
'''+new_txt+'\n'+old_txt+r'''
  function B(W,H,ax,ay,fn){return sp(W,H,gg=>{g=gg;g.lineJoin='round';fn()},ax,ay)}
  function tint(s,f,flip){return sp(s.w,s.h,gg=>{if(flip){gg.translate(s.w,0);gg.scale(-1,1)}gg.filter=f;gg.drawImage(s.c,0,0,s.w,s.h)},flip?s.w-s.ax:s.ax,s.ay)}
  function sparkle(seed,cx,cy,w,h){const r=rnd(seed);for(let k=0;k<8;k++){g.fillStyle=['#fff8c8','#ffd36b','#ffffff'][k%3];g.beginPath();g.arc(cx+(r()-.5)*w,cy+(r()-.5)*h,1.3+r()*1.4,0,7);g.fill()}}
  const R=Math.round;
  function nature(){
    const outl=(c,rad)=>{const pd=4,t=document.createElement('canvas');t.width=c.c.width;t.height=c.c.height;const x=t.getContext('2d');x.drawImage(c.c,0,0);x.globalCompositeOperation='source-in';x.fillStyle=OC;x.fillRect(0,0,t.width,t.height);
      return sp(c.w+2*pd,c.h+2*pd,gg=>{for(let k=0;k<16;k++){const an=k/16*6.283;gg.drawImage(t,pd+Math.cos(an)*rad,pd+Math.sin(an)*rad,c.w,c.h)}gg.drawImage(c.c,pd,pd,c.w,c.h)},c.ax+pd,c.ay+pd)};
    const ct=SP.tree.map(q=>outl(q,1.9)),cp=SP.pine.map(q=>outl(q,1.9));
    SP.tree=[...ct,tint(ct[0],'hue-rotate(10deg)'),tint(ct[3],'hue-rotate(-8deg) brightness(.95)')];
    SP.pine=[...cp,tint(cp[1],'hue-rotate(16deg)')];
    const sm=.56,mW=R(260*sm)+10,mH=R(290*sm)+10,mx=R(68*sm)+5;
    const pm=(c)=>B(mW,mH,mx,mH-8,()=>palm(mx,mH-8,sm,false,c));
    const p1=pm(true),p0=pm(false);
    SP.palm=[p1,tint(p1,'hue-rotate(10deg)'),tint(p1,'hue-rotate(-10deg) brightness(1.04)')];
    SP.palm0=[p0,tint(p0,'hue-rotate(10deg)'),tint(p0,'hue-rotate(-10deg) brightness(1.04)')];
    const kr=.63,rW=R(128*kr)+8,rH=R(70*kr)+14,k2=.7,r2W=R(84*k2)+8,r2H=R(50*k2)+14;
    const rk=()=>{rock(rW*.52,rH-8,kr)},rb=()=>{rock2(r2W/2,r2H-8,k2)};
    const spk=(fn,w,h,ax,ay,seed)=>B(w,h,ax,ay,()=>{fn();sparkle(seed,ax,ay-22,34,26)});
    SP.boulder=[B(rW,rH,rW*.52,rH-8,rk),B(r2W,r2H,r2W/2,r2H-8,rb),spk(rk,rW,rH,rW*.52,rH-8,3),spk(rb,r2W,r2H,r2W/2,r2H-8,5),tint(spk(rk,rW,rH,rW*.52,rH-8,7),'hue-rotate(20deg)',true)];
    const kb=.54,bW=R(120*kb)+8,bH=R(76*kb)+12;
    const bs=(b,fl)=>B(bW,bH,bW/2,bH-8,()=>{OPT.berries=b;OPT.flowers=!b&&fl;OPT.fc=fl==2?'#ffb6cf':'#fff';bush(bW/2,bH-8,kb)});
    SP.bush=[bs(false,1),bs(false,2),tint(bs(false,1),'hue-rotate(12deg)')];
    SP.bush0=tint(bs(false,0),'saturate(.55) brightness(.92)');
    SP.berry=[bs(true),tint(bs(true),'hue-rotate(10deg)'),tint(bs(true),'hue-rotate(-10deg)')];SP.berry0=SP.bush0;
    const ks=.45,tW=R(76*ks)+8,tH=R(58*ks)+12;
    SP.stump=B(tW,tH,tW/2,tH-8,()=>stump(tW/2,tH-8,ks));
  }
  function props(){
    const kc=.6,cW=R(100*kc)+8,cH=R(106*kc)+12;
    const ch=(o)=>B(cW,cH,cW/2,cH-8,()=>chest(cW/2,cH-8,kc,o));
    const c0=[ch(false),ch(true)];
    SP.chest=[c0,[tint(c0[0],'hue-rotate(-12deg) saturate(.9)'),tint(c0[1],'hue-rotate(-12deg) saturate(.9)')],[tint(c0[0],'hue-rotate(180deg)'),tint(c0[1],'hue-rotate(180deg)')],[tint(c0[0],'hue-rotate(95deg) saturate(1.1)'),tint(c0[1],'hue-rotate(95deg) saturate(1.1)')]];
    const kk=.52,wW=R(80*kk)+8,wH=R(76*kk)+12;
    const br=B(wW,wH,wW/2,wH-8,()=>barrel(wW/2,wH-8,kk));
    SP.barrel=[br,tint(br,'hue-rotate(-14deg) brightness(.92)')];
    SP.crate=B(wW,wH,wW/2,wH-8,()=>crate(wW/2,wH-8,kk));
    SP.crateO=B(wW,wH,wW/2,wH-8,()=>{crate(wW/2,wH-8,kk);g.save();g.translate(wW/2,wH-8);g.scale(kk,kk);g.fillStyle='#2e1a0a';g.beginPath();g.moveTo(-26,-50);g.lineTo(26,-50);g.lineTo(22,-38);g.lineTo(-22,-38);g.closePath();g.fill();g.fillStyle='#d8b04a';g.beginPath();g.arc(-8,-44,3,0,7);g.arc(6,-45,3.4,0,7);g.fill();g.restore()});
  }
  return{nature,props,on:()=>GFXN};
})();
function waterNew(d){const a=waterRGB(.05),b=waterRGB(.27),c=waterRGB(.8);const s1=sstep(.12,.16,d),s2=sstep(.38,.42,d);let o=mixc(mixc(a,b,s1),c,s2);const e=Math.max(1-Math.abs(d-.14)/.012,1-Math.abs(d-.4)/.012,0);if(e>0)o=mixc(o,[235,255,255],.32*e);return o}
function gfxSwitch(){try{localStorage.setItem('sm_gfx',GFXN?'old':'new')}catch(e){}try{saveGame(true)}catch(e){}location.reload()}
'''
open('/home/claude/work/new31.js','w',encoding='utf8').write(js)
print(len(js))
