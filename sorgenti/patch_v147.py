import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('FAIL',s.count(a),a[:90]);sys.exit(1)
    s=s.replace(a,b)
# 1) personaggi del campo piu' proporzionati al giocatore (-10%)
rep("NOMF={ferro:1.06,nives:.88,tito:.88,gnocco:1,giacomo:1}","NOMF={ferro:.95,nives:.79,tito:.79,gnocco:.9,giacomo:.9}")
# 2) Nives batte davvero sull'incudine: sta accanto e mostra le pose col martello a ogni colpo
rep("nives:{at:[62.4,32],n:'Nives'}","nives:{at:[60,31],n:'Nives'}")
rep("const mr=w==='nives'&&mv&&dr==='profilo-sinistro',k=w+'/'+(mv?","const mr=w==='nives'&&mv&&dr==='profilo-sinistro'&&!o.pose,k=o.pose?w+'/'+o.pose:w+'/'+(mv?")
rep("  const m=Ch2.npcMark(e);if(m)o.emote=m;\n  if(!nomDraw(","  if(e.who==='nives'&&!e.mv&&WORLD===2){const an=EID.nvd_anvil;if(an&&S.tod>=7&&S.tod<18.5&&!dl.open&&hyp(e.x-an.x,e.y-an.y)<TS*1.6){o.flip=false;const d=t-(an.hit||-9);if(d>=0&&d<.3)o.pose='profilo-destro-attacco2';else if(d>=0&&d<1.5)o.pose='profilo-destro-attacco1'}}\n  const m=Ch2.npcMark(e);if(m)o.emote=m;\n  if(!nomDraw(")
rep("      if(e.id&&e.id[0]==='q'&&ty==='palm')continue;","      if(e.id&&e.id[0]==='q'&&ty==='palm')continue;\n      if(e.id&&/^(pis|yis)/.test(e.id))continue;                             // isoletta a nord: si raggiunge in zattera")
# Nives di giorno resta all'incudine (a sinistra, rivolta verso di essa) e martella
rep("const s0=eve&&Math.random()<(FE.on()?1:.85)?","const s0=(w==='nives'&&!eve&&WORLD===2&&Math.random()<.75)?{k:'anvil',tx:60,ty:31}:eve&&Math.random()<(FE.on()?1:.85)?")
rep("    e.wt=2+Math.random()*3.5;\n    const sps=Ch2.spots(w);","    e.wt=2+Math.random()*3.5;\n    if(w==='nives'&&WORLD===2&&S.tod>=7&&S.tod<18.5&&e.tx===60&&e.ty===31&&Math.random()<.82)continue;\n    const sps=Ch2.spots(w);")
# 3) isoletta a nord (44-51,10-12): piu' grande, con palme e bacche
rep('"2": [["d",68.6,46.8,5.0,2.5],','"2": [["d",47.6,11,5.4,2.7],["d",68.6,46.8,5.0,2.5],')
rep("  // granchi sulle spiagge\n","""  // isoletta a nord: palme e cespugli di bacche
  {const cx=47.6,cy=11,cand=[];
   for(let ty=Math.floor(cy-3);ty<=Math.ceil(cy+3);ty++)for(let tx=Math.floor(cx-6);tx<=Math.ceil(cx+6);tx++){
     if(((tx+.5-cx)/4.6)**2+((ty+.5-cy)/2.1)**2>1)continue;
     if(!inMap(tx,ty)||!walkT[tIdx(tx,ty)]||blockT[tIdx(tx,ty)]||elevT[tIdx(tx,ty)]<WL+.08)continue;
     if(E.some(e=>e.type!=='reef'&&e.x>0&&hyp(e.x-(tx+.5)*TS,e.y-(ty+.8)*TS)<TS*1.4))continue;
     cand.push([tx,ty,hyp((tx+.5-cx)/2,(ty+.5-cy))])}
   cand.sort((a,b)=>b[2]-a[2]);
   const used=[],take=(min)=>{for(const c of cand)if(used.every(u=>hyp(u[0]-c[0],u[1]-c[1])>=min)){used.push(c);return c}return null};
   [0,1,2].forEach(i=>{const c=take(2.6);if(!c)return;const e=ent({id:'pis'+i,type:'palm',v:i%3,x:(c[0]+.5)*TS,y:(c[1]+.92)*TS,tx:c[0],ty:c[1],coco:true,cd:0,flip:i===1});addBlock(e,c[0],c[1],1,1)});
   [0,1].forEach(i=>{const c=take(2);if(!c)return;ent({id:'yis'+i,type:'berry',v:i%3,x:(c[0]+.5)*TS,y:(c[1]+.9)*TS,tx:c[0],ty:c[1],ready:true,t:0})})}
  // granchi sulle spiagge
""")
open(P,'w',encoding='utf8').write(s);print('ok147')
