import re,sys
src=open('base_index.html',encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt: print('PATCH FAIL',n,old[:70]); sys.exit(1)
    src=src.replace(old,new)
rep("function auMusicTick(){\n  if(!AU.ctx||!AU.mbus||!AU.mus||AU.ctx.state!=='running')return;","function auMusicTick(){\n  if(WORLD===3){Ch3.music();return}\n  if(!AU.ctx||!AU.mbus||!AU.mus||AU.ctx.state!=='running')return;")
rep("if(window.__W2)return 2;","if(window.__W3)return 3;if(window.__W2)return 2;")
rep("const BLOBS=WORLD===2?BLOBS_2:BLOBS_1;","""const SC3=a=>[a[0]*1.515,a[1]*1.5].concat(a.slice(2));const BLOBS_3=[[10,30,8,7],[26,12,6,4.5],[24,47,7,5],[46,40,7,5],[63,30,6,5],[60,50,6,4],[78,16,6,4.5],[80,42,8,5],].map(SC3).concat([[165,25,8,6],[188,52,10,7],[170,78,7,5],[196,104,8,6],[150,108,9,6],[118,112,8,5],[84,110,10,6],[46,106,8,5],[20,102,7,5]]);
const BLOBS=WORLD===3?BLOBS_3:WORLD===2?BLOBS_2:BLOBS_1;""")
rep("const BEACH=WORLD===2?","const BEACH_3=[[22.45,45,2.6,5],[40.4,21,2,2.4],[62.1,36,2,1.8],[96.4,49,2.5,1.6]];const BEACH=WORLD===3?BEACH_3:WORLD===2?")
rep("const POND=WORLD===2?","const POND=WORLD===3?{x:1.5,y:1.5,rx:.2,ry:.2}:WORLD===2?")
rep("const C0=WORLD===2?","const C0=WORLD===3?{x:17.15,y:45}:WORLD===2?")
rep("const PATHS=WORLD===2?","const PATHS=WORLD===3?[]:WORLD===2?")
rep("const MESA=WORLD===2?","const MESA=WORLD===3?{x:-40,y:-40,rx:1,ry:1,h:1}:WORLD===2?")
rep("const MESA_PTS=WORLD===2?[]:","const MESA_PTS=WORLD!==1?[]:")
rep("const FORESTS=WORLD===2?FORESTS_2:FORESTS_1;","const FORESTS_3=[[10,30,6,5,.9],[26,12,4.5,3,.8],[24,47,5,3.5,.9],[46,40,5,3.5,.9],[63,30,4.5,3.5,.9],[60,50,4.5,2.8,.9],[78,16,4.5,3,.8],[80,42,6,3.5,.9],[90,28,2.8,2.8,.8],[34,31,2.5,2,.7],[72,32,2.2,1.7,.7]].map(SC3).concat([[165,25,5.5,4,.8],[188,52,7,5,.9],[170,78,5,3.5,.8],[196,104,5.5,4,.8],[150,108,6,4,.9],[118,112,5.5,3.5,.8],[84,110,7,4,.9],[46,106,5.5,3.5,.8],[20,102,5,3.5,.8]]);\nconst FORESTS=WORLD===3?FORESTS_3:WORLD===2?FORESTS_2:FORESTS_1;")
rep("const FIX=WORLD===2?FIX_2:FIX_1;","""const FIX_3=Object.assign({},FIX_2,{spawn:[17.15,45],sign:[21.55,43.6],wreck:[-60,-60],plots:{falo:{tx:1,ty:1,w:1,h:1},capanna:{tx:1,ty:1,w:1,h:1},banco:{tx:1,ty:1,w:1,h:1},zattera:{tx:1,ty:1,w:1,h:1}},lookout:[-50,-50],quarry:[-60,-60],boulders:[],raftLaunch:[22,30],smoke:[-60,-60],isl1:[-60,-60],isl2:[-60,-60],bottles:[]});
const FIX=WORLD===3?FIX_3:WORLD===2?FIX_2:FIX_1;""")
rep("  if(WORLD===2)return exclTile2(tx,ty);","  if(WORLD===3)return hyp(tx+.5-21.55,ty+.5-43.6)<2.2;\n  if(WORLD===2)return exclTile2(tx,ty);")
rep("  if(WORLD===2)return genWorld2();","  if(WORLD===3)return genWorld3();\n  if(WORLD===2)return genWorld2();")
gw3=r"""function genWorld3(){
  const r=mulberry(31);
  const taken=new Set(),key=(a,b)=>a+','+b;
  let n=0;
  const order=[];for(let ty=0;ty<MH;ty++)for(let tx=0;tx<MW;tx++)order.push([tx,ty]);
  for(let i=order.length-1;i>0;i--){const j=(r()*(i+1))|0;[order[i],order[j]]=[order[j],order[i]]}
  const okT=(tx,ty)=>walkT[tIdx(tx,ty)]&&!blockT[tIdx(tx,ty)]&&!exclTile(tx,ty);
  for(const[tx,ty]of order){
    if(!okT(tx,ty))continue;
    const e0=elevT[tIdx(tx,ty)];if(e0<WL+.27)continue;
    const fF=forestF(tx+.5,ty+.5),dens=1.4*fF+.06;
    if(r()>dens)continue;
    if(taken.has(key(tx-1,ty))||taken.has(key(tx+1,ty))||taken.has(key(tx,ty-1))||taken.has(key(tx,ty+1)))continue;
    if(taken.has(key(tx-1,ty-1))&&taken.has(key(tx+1,ty+1)))continue;
    taken.add(key(tx,ty));
    const pine=tx>52?r()<.7:r()<.2;
    const e=ent({id:'t'+(n++),type:pine?'pine':'tree',v:(r()*(pine?NGV.p:NGV.t))|0,x:(tx+.5+(r()-.5)*.3)*TS,y:(ty+.92)*TS,tx,ty,alive:true,grow:1,t:0,wood:pine?2:3,flip:r()<.5});
    addBlock(e,tx,ty,1,1);
  }
  const pal=[];
  for(const[tx,ty]of order){
    const e0=elevT[tIdx(tx,ty)];
    if(!okT(tx,ty)||e0<SAND_LO||e0>SAND_HI)continue;
    if(pal.some(p=>hyp(p[0]-tx,p[1]-ty)<2.6))continue;
    if(r()>.5)continue;
    pal.push([tx,ty]);if(pal.length>=120)break;
  }
  pal.forEach((p,i)=>{const e=ent({id:'p'+i,type:'palm',v:i%3,x:(p[0]+.5)*TS,y:(p[1]+.92)*TS,tx:p[0],ty:p[1],coco:true,cd:0,flip:r()<.5});addBlock(e,p[0],p[1],1,1)});
  {const rk=[];
   for(const[tx,ty]of order){
     if(rk.length>=30)break;
     if(!okT(tx,ty))continue;
     const e0=elevT[tIdx(tx,ty)];if(e0<WL+.3)continue;
     if(rk.some(p=>hyp(p[0]-tx,p[1]-ty)<4))continue;
     rk.push([tx,ty]);
   }
   rk.forEach((p,i)=>{const e=ent({id:'rx'+i,type:'rock',v:(i*3)%5,x:(p[0]+.5)*TS,y:(p[1]+.92)*TS,tx:p[0],ty:p[1],alive:true,hp:0,t:0});addBlock(e,p[0],p[1],1,1)});}
  const deco=(id,spr,x,y,fp,o)=>{const e=ent(Object.assign({id,type:'deco',spr,x:x*TS,y:y*TS},o||{}));if(fp)addBlock(e,fp[0],fp[1],fp[2],fp[3]);return e};
  deco('feedback','sign',FIX.sign[0],FIX.sign[1],[Math.floor(FIX.sign[0]),Math.floor(FIX.sign[1]),1,1],{k:.9,hitw:64,hith:84,label:'Porto di Calvara',inter:'none'});
  for(const id in FIX.plots){const f=FIX.plots[id];
    const e=ent({id:'plot_'+id,type:'plot',pid:id,x:(f.tx+f.w/2)*TS,y:(f.ty+f.h)*TS-2,tx:f.tx,ty:f.ty,tw:f.w,th:f.h,st:0,prog:0});
    addBlock(e,f.tx,f.ty,f.w,f.h);delBlock(e);
  }
  ent({id:'wparrot',type:'wparrot',x:-999,y:-999,alt:90,got:false});
  ent({id:'mraft',type:'mraft',x:-999,y:-999,hd:0});
  FIX.crabN=0;
  fixOccluded((tx,ty)=>{for(let j=-2;j<=2;j++)for(let i=-2;i<=2;i++){const a=tx+i,b=ty+j;if(inMap(a,b)&&elevT[tIdx(a,b)]<WL)return true}return false});
}
"""
rep("const TS=44, MW=99, MH=60,","const TS=44, MW=WORLD===3?210:99, MH=WORLD===3?126:60,")
rep("seaT[ty*MW+tx]=(e<WL-.035&&","seaT[ty*MW+tx]=(e<(WORLD===3?WL+.03:WL-.035)&&")
rep("function genWorld2(){",gw3+"function genWorld2(){")
old="if(!dl.open){if(!P.cl)updatePlayer(dt);updateTime(dt);updateVitals(dt);updateWeather(dt);updateChallenge(dt);Story.tick(dt)}"
rep(old,"if(!dl.open){if(WORLD===3){Ch3.step(dt)}else{if(!P.cl)updatePlayer(dt);updateTime(dt);updateVitals(dt);updateWeather(dt);updateChallenge(dt);Story.tick(dt)}}")
rep("  if(P.mode==='raft')drawRaftHull(g,t);","  if(P.mode==='raft'&&WORLD!==3)drawRaftHull(g,t);")
rep("  list.push(P);if(S.flags.parrot)list.push(PAR);if(P.mode==='raft')list.push(RAFTSAIL);","  if(WORLD===3){for(const q of Ch3.vis())list.push(q)}else{list.push(P);if(S.flags.parrot)list.push(PAR);if(P.mode==='raft')list.push(RAFTSAIL)}")
rep("const key=o=>o===P?P.y:","const key=o=>o.type==='c3'?o.s.y:o===P?P.y:")
rep("    if(e===P){drawPlayer(g,t);continue}","    if(e.type==='c3'){Ch3.drawShip(g,e,t);continue}\n    if(e===P){drawPlayer(g,t);continue}")
rep("  drawWParrot(g,EID.wparrot,t);\n","  drawWParrot(g,EID.wparrot,t);\n  if(WORLD===3)Ch3.drawFx(g,t);\n")
rep("  initInput();initStart();syncPause();\n","  initInput();initStart();syncPause();\n  if(WORLD===3)Ch3.boot();\n")
rep("function saveGame(quiet){\n  if(!S||!S.live)return;","function saveGame(quiet){\n  if(WORLD>=3||!S||!S.live)return;")

rep("if(window.__W2)return 2;","if(window.__W4)return 4;if(window.__W2)return 2;")
rep("MW=WORLD===3?210:99, MH=WORLD===3?126:60,","MW=WORLD===4?72:WORLD===3?210:99, MH=WORLD===4?46:WORLD===3?126:60,")
rep("GS=1, SS=2, FS=.5,","GS=WORLD===3?(GFX==='alta'?.8:GFX==='bassa'?.4:.6):1, SS=2, FS=WORLD===3?(GFX==='alta'?.4:GFX==='bassa'?.2:.3):.5,")
rep("DPRMAX=1.6,QL=0;if(GFX","DPRMAX=WORLD===3?1.25:1.6,QL=0;if(GFX")
rep("const BLOBS=WORLD===3?","const BLOBS=WORLD===4?[]:WORLD===3?")
rep("const BEACH=WORLD===3?","const BEACH=WORLD===4?[]:WORLD===3?")
rep("const POND=WORLD===3?","const POND=WORLD===4?{x:1.5,y:1.5,rx:.2,ry:.2}:WORLD===3?")
rep("const C0=WORLD===3?","const C0=WORLD===4?{x:30,y:23}:WORLD===3?")
rep("const PATHS=WORLD===3?","const PATHS=WORLD===4?[]:WORLD===3?")
rep("const MESA=WORLD===3?","const MESA=WORLD===4?{x:-40,y:-40,rx:1,ry:1,h:1}:WORLD===3?")
rep("const FIX=WORLD===3?FIX_3:WORLD===2?FIX_2:FIX_1;","""const FIX_4=Object.assign({},FIX_2,{spawn:[30,23],sign:[-60,-60],wreck:[-60,-60],plots:{falo:{tx:1,ty:1,w:1,h:1},capanna:{tx:1,ty:1,w:1,h:1},banco:{tx:1,ty:1,w:1,h:1},zattera:{tx:1,ty:1,w:1,h:1}},lookout:[-50,-50],quarry:[-60,-60],boulders:[],raftLaunch:[22,30],smoke:[-60,-60],isl1:[-60,-60],isl2:[-60,-60],bottles:[]});
const FIX=WORLD===4?FIX_4:WORLD===3?FIX_3:WORLD===2?FIX_2:FIX_1;""")
rep("  if(WORLD===2)return exclTile2(tx,ty);","  if(WORLD===4)return false;\n  if(WORLD===2)return exclTile2(tx,ty);")
rep("  if(WORLD===2)return genWorld2();","  if(WORLD===4)return genWorld4();\n  if(WORLD===2)return genWorld2();")
gw4=r"""function genWorld4(){
  for(const id in FIX.plots){const f=FIX.plots[id];
    const e=ent({id:'plot_'+id,type:'plot',pid:id,x:(f.tx+f.w/2)*TS,y:(f.ty+f.h)*TS-2,tx:f.tx,ty:f.ty,tw:f.w,th:f.h,st:0,prog:0});
    addBlock(e,f.tx,f.ty,f.w,f.h);delBlock(e);
  }
  ent({id:'wparrot',type:'wparrot',x:-999,y:-999,alt:90,got:false});
  ent({id:'mraft',type:'mraft',x:-999,y:-999,hd:0});
  FIX.crabN=0;
}
"""
rep("function genWorld2(){",gw4+"function genWorld2(){")
rep("if(WORLD===3){Ch3.step(dt)}else{","if(WORLD===4){Ch4.step(dt)}else if(WORLD===3){Ch3.step(dt)}else{")
rep("  computeTarget();\n  drawTargetRing(g,t);\n","  computeTarget();\n  drawTargetRing(g,t);\n  if(WORLD===4)Ch4.drawFloor(g,t);\n")
rep("      case'npc':drawNpc(g,e,t);break;","      case'npc':drawNpc(g,e,t);break;\n      case'c4':Ch4.drawEnt(g,e,t);break;")
rep("  drawWParrot(g,EID.wparrot,t);\n","  drawWParrot(g,EID.wparrot,t);\n  if(WORLD===4)Ch4.drawTop(g,t);\n")
rep("  initInput();initStart();syncPause();\n","  initInput();initStart();syncPause();\n  for(let i=0;i<600&&((WORLD===4&&!window.Ch4)||(WORLD===3&&!window.Ch3));i++)await new Promise(r=>setTimeout(r,25));   // gli script di Ch3/Ch4 arrivano dopo: senza attesa il caricamento resta fermo\n  if(WORLD===4)Ch4.boot();\n")
rep("flip:P.flip,walk:P.walk,moving:P.mode==='raft'?false:P.moving,tool:P.tool,","flip:P.flip,walk:P.walk,sab:(WORLD===4&&window.Ch4)?Ch4.sab():null,moving:P.mode==='raft'?false:P.moving,tool:P.tool,")
rep("if(WORLD>=3||!S||!S.live)return;","if(WORLD===4||WORLD===3||!S||!S.live)return;")
rep("  if(!S||!S.live)return'day';\n","  if(!S||!S.live)return'day';\n  if(WORLD===4)return'night';\n")

rep("  sea:{beat:.6,den:.7,","  assault:{assault:1,beat:.27,den:0,vol:.07,prog:[[57,60,64]],ext:[69],low:0},\n  sea:{beat:.6,den:.7,")
rep("  if(WORLD===4)return'night';\n","  if(WORLD===4)return'assault';\n")
rep("    const m=MUS[musicMood()],t=AU.nextT,b=AU.beat,ch=m.prog[((b/4)|0)%m.prog.length];","    const m=MUS[musicMood()],t=AU.nextT,b=AU.beat,ch=m.prog[((b/4)|0)%m.prog.length];\n    if(m.assault){assaultTick(t,b);AU.nextT+=m.beat;AU.beat++;continue}")
rep("function auMusicTick(){","""function mDrum(t,kind){
  const c=AU.ctx;
  if(kind==='k'){const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(42,t+.16);g.gain.setValueAtTime(.34,t);g.gain.exponentialRampToValueAtTime(.001,t+.22);o.connect(g);g.connect(AU.mbus);o.start(t);o.stop(t+.25);return}
  if(!AU._nb){const n=c.sampleRate*.3,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;AU._nb=b}
  const s=c.createBufferSource();s.buffer=AU._nb;const f=c.createBiquadFilter(),g=c.createGain();
  if(kind==='s'){f.type='bandpass';f.frequency.value=1800;f.Q.value=.7;g.gain.setValueAtTime(.30,t);g.gain.exponentialRampToValueAtTime(.001,t+.16)}
  else{f.type='highpass';f.frequency.value=6500;g.gain.setValueAtTime(.07,t);g.gain.exponentialRampToValueAtTime(.001,t+.05)}
  s.connect(f);f.connect(g);g.connect(AU.mbus);s.start(t);s.stop(t+.2)}
function mClick(t,vol,f){const c=AU.ctx;
  if(!AU._nb){const n=c.sampleRate*.3,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;AU._nb=b}
  const s=c.createBufferSource();s.buffer=AU._nb;const fl=c.createBiquadFilter(),g=c.createGain();fl.type='bandpass';fl.frequency.value=f||2600;fl.Q.value=4;
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+.05);s.connect(fl);fl.connect(g);g.connect(AU.mbus);s.start(t);s.stop(t+.08)}
function mThump(t,vol,f0){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(f0||90,t);o.frequency.exponentialRampToValueAtTime(40,t+.14);
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g);g.connect(AU.mbus);o.start(t);o.stop(t+.24)}
/* Il galeone: habanera in La minore, furtiva. Calma / sospetto / inseguimento + variante per ponte */
const GS_CH={Am:[57,60,64],Bb:[58,62,65],Dm:[62,65,69],E:[56,59,64]};
const GS_ROOT={Am:45,Bb:46,Dm:50,E:40};
const GS_SEQ=['Am','Am','Bb','Am','Dm','Am','E','E'];
const GS_MEL=[[76,0,0,74,72,0,71,0],[69,0,0,0,0,0,0,0],[74,0,0,72,70,0,69,0],[68,0,69,0,71,0,69,0],[77,0,0,76,74,0,72,0],[71,0,72,0,76,0,0,0],[80,0,76,0,71,0,68,0],[69,0,0,0,0,0,0,0]];
const GS_HAB=[1,0,0,1,1,0,1,0];
function assaultTick(t,b){
  const c=window.__c4m||{deck:0,lvl:0},lv=c.lvl|0,dk=c.deck|0,st=b%8,bar=((b/8)|0)%8,nm=GS_SEQ[bar],ch=GS_CH[nm],root=GS_ROOT[nm],v=.075,bt=.27;
  if(st===0){mPad(t,[root+12,root+19],8*bt*1.05,v*(dk===2?.7:.45));if(dk===2)mNote(t,root-12,2.2,v*1.1,'sine')}
  if(GS_HAB[st]){const m=(st===3||st===6)?root+7:root;mNote(t,m,.3,v*(lv>0?1.5:1.15),'triangle')}
  if(lv===0){
    if(st===2||st===6)mClick(t,.05,2400);
    if(dk===0){const m=GS_MEL[bar][st];if(m){let len=1;while(st+len<8&&!GS_MEL[bar][st+len])len++;const d=Math.min(len*bt*.95,.8);mNote(t,m,d,v*1.2,'triangle');mNote(t,m+12,d*.6,v*.28,'sine')}
      if(st===5&&bar%2===1)for(let i=0;i<3;i++)mNote(t+i*.05,ch[i]+12,.5,v*.4,'triangle')}
    else if(dk===1){if(st%2===1&&Math.random()<.4)mNote(t,ch[(Math.random()*3)|0]+24,.7,v*.55,'sine');if(st===0&&bar%4===0)mNote(t,GS_MEL[bar][0]+12,1.2,v*.5,'sine')}
    else{if(st===0){mThump(t,.16,70);mThump(t+.22,.1,64)}if(st===5&&Math.random()<.35){const dn=ch[2]+24+((Math.random()*3)|0)*2;mNote(t,dn,.5,v*.4,'sine');mNote(t+.2,dn-3,.5,v*.18,'sine')}}
  }else if(lv===1){
    if(st%2===0)mClick(t,.07,3000);
    if(st===0||st===4){mThump(t,.2,80);mThump(t+.2,.13,70)}
    mNote(t,ch[(st>>1)%3]+12,.18,v*.5,'triangle');
    if(st%2===0){mNote(t,ch[2]+12,.09,v*.22,'sawtooth');mNote(t+bt/2,ch[2]+12,.09,v*.22,'sawtooth')}
    if(dk===0){const m=GS_MEL[bar][st];if(m)mNote(t,m,.35,v*.8,'triangle')}
  }else{
    if(st===0||st===3||st===4)mDrum(t,'k');
    if(st===2||st===6)mDrum(t,'s');
    mDrum(t,'h');if(st%2)mDrum(t+bt/2,'h');
    mNote(t,root+(st%4===3?7:0),.16,v*1.5,'triangle');
    if(st===0||st===3){for(const x of ch)mNote(t,x,.24,v*.55,'sawtooth')}
    mNote(t,ch[2]+12,.1,v*.3,'sawtooth');mNote(t+bt/2,ch[1]+12,.1,v*.3,'sawtooth');
    const m=GS_MEL[bar][st];if(m){mNote(t,m+12,.3,v*.9,'triangle')}
  }
}
function auMusicTick(){""")
rep("cv.addEventListener('wheel',e=>{e.preventDefault();cam.uz=","cv.addEventListener('wheel',e=>{e.preventDefault();if(WORLD===4)return;cam.uz=")
rep("  if(k==='+'||k==='='){cam.uz=","  if(WORLD!==4&&(k==='+'||k==='=')){cam.uz=")
rep("  if(k==='-'||k==='_'){cam.uz=","  if(WORLD!==4&&(k==='-'||k==='_')){cam.uz=")

exec(open('voy_patch.py',encoding='utf8').read())
inj3=open('ch3_inject.js').read().replace('// @@VOY@@',open('ch5_inject.js',encoding='utf8').read());inj4=open('ch4_inject.js').read()
inj3=inj3.replace('/*@@MZS@@*/null',open('mz_sea.json',encoding='utf8').read())
inj3=inj3.replace('/*@@MZN@@*/null',open('mz_ships.json',encoding='utf8').read())
import json as _j
_B=_j.load(open('ed_baked.json',encoding='utf8'))
for _k,_t in(('x3','/*@@EXB3@@*/null'),('x4','/*@@EXB4@@*/null'),('x5','/*@@EXB5@@*/null')):
    _v=_j.dumps(_B.get(_k),ensure_ascii=False) if _B.get(_k) else 'null'
    inj3=inj3.replace(_t,_v);inj4=inj4.replace(_t,_v)
src=src.replace("<head>","<head><script>(function(){try{var g=localStorage.getItem('sm_goto');if(g){localStorage.removeItem('sm_goto');history.replaceState(null,'',g)}}catch(e){}window.__go=function(h){try{localStorage.setItem('sm_goto',h)}catch(e){}try{location.hash=h}catch(e){}};window.VOY=0;if(location.hash==='#w5'){window.__W3=1;window.VOY=1}else if(location.hash==='#w4')window.__W4=1;else if(location.hash==='#w3')window.__W3=1})();</script>",1)
tail="\n})();\n</script>"
_kc=src.find('<style id="kitCss">')
k=src.rindex(tail,0,_kc) if _kc>0 else src.rindex(tail)   # fine dello script principale (non quello dell'interfaccia aggiunto dopo)
inj4=inj4.replace('/*@@BCH@@*/null',open('mz_bch.json',encoding='utf8').read())
src=src[:k]+"\n"+inj3+"\n"+inj4+tail+src[k+len(tail):]
open('/home/claude/out/index_final.html','w',encoding='utf8').write(src)
print('ok',len(src))
