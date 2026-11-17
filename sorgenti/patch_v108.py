#!/usr/bin/env python3
# Briciola: va in giro da sola vicino al campo, annusa, e torna alla cuccia/cesto; di notte dorme; animata mentre cammina
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH108 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
# disegno
a=src.index("NVDX.briciola=(g,e,t)=>{");b=src.index("NVDX.briciola0=")
new=r"""NVDX.briciola=(g,e,t)=>{
  if(!(GFXN&&VEGPG)||!mz3('briciola-fermo'))return NVDX.briciola0(g,e,t);
  const b=BRPREV?{home:[0,0,'cuccia','cesto'][BRPREV]}:((S&&S.c2&&S.c2.br)||{});
  const d=(!BRPREV&&e._d)||{st:'rest'},hx=(BRPREV||e.hx==null)?e.x:e.hx,hy=(BRPREV||e.hy==null)?e.y:e.hy;
  // cuccia (108x84, ancora 54,74) o cesto (88x68, ancora 44,57), fissi al campo
  g.save();g.translate(hx,hy);
  if(b.home==='cuccia'){g.save();g.translate(-38,1);shadow(g,0,1,30,7,.22);mz3d(g,'cuccia',54,74,108,84,.72);g.restore()}
  else if(b.home==='cesto'){g.save();g.translate(-34,1);shadow(g,0,1,22,6,.22);mz3d(g,'cesto',44,57,88,68,.72);g.restore()}
  g.restore();
  g.save();g.translate(e.x,e.y);
  const mv=d.st==='go'||d.st==='back',rest=d.st==='rest',sn=d.st==='sniff';
  const hop=mv?Math.abs(Math.sin(t*11))*2.4:0;
  shadow(g,0,2,15-hop*.4,4,.25-hop*.02);
  const pose=rest?(b.home==='cesto'?'briciola-seduta':b.home==='cuccia'?'briciola-sdraiata':'briciola-fermo'):'briciola-fermo';
  const A={'briciola-fermo':[31,44,62,46],'briciola-seduta':[26,44,52,46],'briciola-sdraiata':[37,35,74,37]}[pose];
  if(d.fl&&!rest)g.scale(-1,1);
  g.translate(0,-hop);
  if(mv){g.rotate(Math.sin(t*11)*.055);g.scale(1+Math.sin(t*22)*.025,1-Math.sin(t*22)*.025)}
  else if(sn){g.rotate(.09+Math.sin(t*5)*.03);g.translate(1,0)}
  else if(pose==='briciola-fermo'){g.rotate(Math.sin(t*1.7)*.02)}
  const br=1+Math.sin(t*2.2)*.012;g.scale(1,br);
  mz3d(g,pose,A[0],A[1],A[2],A[3],.68);g.restore()};

"""
src=src[:a]+new+src[b:]
# logica
rep("Ch2.tick=function(dt){","""Ch2.dogTick=function(b,dt){
  const c=C();if(!c.br||!c.br.met||BRPREV)return;
  if(b.hx==null){b.hx=b.x;b.hy=b.y}
  const d=b._d||(b._d={st:'rest',t:3+Math.random()*5,fl:false,k:0});
  const night=S.tod>=21.5||S.tod<6.5;
  if(!c.br.home){d.st='rest';b.x=b.hx;b.y=b.hy;return}   // senza casa resta ferma al campo
  const hx=b.hx,hy=b.hy;
  const step=(tx,ty,sp)=>{
    const dx=tx-b.x,dy=ty-b.y,dist=hyp(dx,dy);if(dist<4)return 1;
    const a=Math.atan2(dy,dx),len=Math.min(dist,sp*dt);
    for(const o of[0,.6,-.6,1.2,-1.2]){
      const nx=b.x+Math.cos(a+o)*len,ny=b.y+Math.sin(a+o)*len;
      if(freeT(Math.floor(nx/TS),Math.floor(ny/TS))){b.x=nx;b.y=ny;d.fl=Math.cos(a+o)<0;return 0}}
    d.stuck=(d.stuck||0)+dt;return 0};
  d.t-=dt;
  if(d.st==='rest'){
    if(d.t<=0&&!night){
      for(let tr=0;tr<8;tr++){
        const ang=Math.random()*6.283,r=(1.6+Math.random()*3.4)*TS,tx=hx+Math.cos(ang)*r,ty=hy+Math.sin(ang)*r*.7;
        if(!freeT(Math.floor(tx/TS),Math.floor(ty/TS)))continue;
        let ok=true;for(let i=1;i<=10;i++){if(!freeT(Math.floor((hx+(tx-hx)*i/10)/TS),Math.floor((hy+(ty-hy)*i/10)/TS))){ok=false;break}}
        if(!ok)continue;
        d.tx=tx;d.ty=ty;d.st='go';d.stuck=0;d.k=(d.k||0)+1;break}
      if(d.st==='rest')d.t=5}
  }else if(d.st==='go'){
    if(step(d.tx,d.ty,46)||d.stuck>1.5){d.st='sniff';d.t=2+Math.random()*3;d.stuck=0}
  }else if(d.st==='sniff'){
    if(d.t<=0){
      if(Math.random()<.35&&d.k<3&&!night){   // un altro giro prima di tornare
        const ang=Math.random()*6.283,r=(1+Math.random()*2.5)*TS,tx=d.tx+Math.cos(ang)*r,ty=d.ty+Math.sin(ang)*r*.7;
        if(freeT(Math.floor(tx/TS),Math.floor(ty/TS))&&hyp(tx-hx,ty-hy)<6*TS){d.tx=tx;d.ty=ty;d.st='go';d.k++;return}}
      d.st='back';d.stuck=0}
  }else if(d.st==='back'){
    const pd=hyp(P.x-b.x,P.y-b.y);
    if(step(hx,hy,(night?40:pd<4*TS?62:52))||d.stuck>2.5){b.x=hx;b.y=hy;d.st='rest';d.k=0;d.t=night?25:10+Math.random()*16;d.stuck=0}
  }
};
Ch2.tick=function(dt){""")
rep("b.hidden=!(v||BRPREV);b.inter=v?'look':null}}","b.hidden=!(v||BRPREV);b.inter=v?'look':null;Ch2.dogTick(b,dt)}}")
open(P,'w',encoding='utf8').write(src);print('patch108 ok')
