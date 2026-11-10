/* ---- 12f_x2.js ---- */
/* ====== v0.13: statistiche, «Da fare», incarico e bottiglia del giorno, mercante di passaggio,
   missioni di Biscotto, segreto dell'isola, caccia al tesoro, Nuova partita+ ====== */
const X2={_l:0,_t:0,_px:null,_mcd:0,_ht:0,_keep:null};
X2.st=function(){S.x2=S.x2||{};const x=S.x2;x.pt=x.pt||0;x.steps=x.steps||0;x.sea=x.sea||0;x.sec=x.sec||{};x.sm=x.sm||{};return x};
X2.today=()=>{const d=new Date();return Math.floor((d.getTime()-d.getTimezoneOffset()*60000)/864e5)};
X2.isl=()=>WORLD===1||WORLD===2;
X2.val=function(k){
  const x=X2.st();
  if(k==='steps')return Math.floor(x.steps);
  if(k==='col')return NV.total();
  if(k==='secret')return x.sec[WORLD]&&x.sec[WORLD].f?1:0;
  return(S.stat&&S.stat[k])||0;
};
X2.rnd=a=>a[(Math.random()*a.length)|0];
X2.piece=function(){            // un pezzo mancante del Quaderno (conchiglie, piume, sassi); null se non manca niente
  const m=[];
  for(const[g,k]of[['sh','shell'],['pi','feather'],['sa','stone']])for(const v of NV.PRIZE_VAR[k])if(!NV.has(g,v))m.push([g,v]);
  return m.length?X2.rnd(m):null;
};
X2.pieceName=p=>{const G=NV.COL.find(x=>x.k===p[0]);return G.it.find(i=>i[0]===p[1])[1]};

/* ---- incarico del giorno (giorno vero, non del gioco): uno solo, semplice ---- */
X2.DLY=[
  {k:'forage',n:5,t:'Raccogli 5 volte bacche, molluschi o fibre'},
  {k:'steps',n:600,t:'Fai 600 passi in giro per l\'isola'},
  {k:'chopped',n:3,t:'Taglia 3 alberi',need:()=>X2.val('chopped')>0},
  {k:'stone',n:2,t:'Spacca 2 rocce',need:()=>X2.val('stone')>0},
  {k:'fish',n:3,t:'Pesca 3 pesci',need:()=>X2.val('fish')>0},
  {k:'col',n:1,t:'Trova una cosa nuova per il Quaderno',need:()=>S.day>=3&&NV.total()<NV.max()-8}
];
X2.daily=function(){
  const x=X2.st(),td=X2.today();
  if(x.dl&&x.dl.d===td)return x.dl;
  const ok=X2.DLY.map((d,i)=>i).filter(i=>!X2.DLY[i].need||X2.DLY[i].need());
  const rr=mulberry(td*31+WORLD*7),i=ok[(rr()*ok.length)|0];
  x.dl={d:td,i,b:X2.val(X2.DLY[i].k),done:0,an:0};
  return x.dl;
};
X2.dlProg=function(){const dl=X2.daily(),D=X2.DLY[dl.i];return[Math.min(D.n,Math.max(0,X2.val(D.k)-dl.b)),D.n,D]};
X2.dlTick=function(){
  const x=X2.st(),dl=X2.daily(),[p,n,D]=X2.dlProg();
  if(!dl.an&&NV.canShow()){
    dl.an=1;UI.toast('Incarico del giorno: '+D.t+'.',4200);
    if(S.flags.parrot)say(PAR,'Cra! Oggi ho un incarico per te!',4);
  }
  if(!dl.done&&p>=n){
    dl.done=1;const td=X2.today();
    x.sk=(x.ld===td-1)?(x.sk||0)+1:1;x.ld=td;x.dn=(x.dn||0)+1;x.skMax=Math.max(x.skMax||0,x.sk);
    const r=X2.rnd([['corda',2],['semi',2],['rottami',1]]);
    gain(r[0],r[1],P.x,P.y-20);addXp(20);sfx('quest');
    UI.banner('Incarico del giorno fatto!',D.t+'\nPremio: '+r[1]+' '+RNAME[r[0]]+(x.sk>1?' · '+x.sk+' giorni di fila':''));
    saveGame(true);
  }
};

/* ---- bottiglia del giorno: una al giorno (vero) sulla riva, con una sorpresa ---- */
X2.botTick=function(){
  const x=X2.st(),td=X2.today();
  if(S.day<2)return;
  if(!x.bt||x.bt.d!==td){
    let cs=NV.cands(true);if(!cs.length)return;{const fr=cs.filter(s=>!E.some(e=>(e.type==='tree'||e.type==='pine'||e.type==='palm'||e.type==='rock'||e.type==='bush'||e.type==='berry'||e.type==='plot')&&hyp(e.x/TS-(s[0]+.5),e.y/TS-(s[1]+.8))<4.5));if(fr.length)cs=fr}
    const rr=mulberry(td*53+WORLD*11),s=cs[(rr()*cs.length)|0];
    NV.rmGlints(e=>e.dly);x.bt={d:td,x:s[0],y:s[1],g:0};
  }
  if(!x.bt.g&&!EID.x2bot){const e=NV.mkGlint({id:'x2bot',gk:'bottle',gv:0,tx:x.bt.x,ty:x.bt.y});e.dly=1}
};
/* ---- funghi di bosco: ogni giorno ne spuntano alcuni nel bosco; da cotti, in ricetta ---- */
X2.muTick=function(){
  if(!X2.isl()||S.day<2)return;
  const x=X2.st(),td=X2.today();
  if(!x.mu||x.mu.d!==td||x.mu.w!==WORLD){
    let cs=NV.cands(false);if(!cs.length)return;
    const fo=cs.filter(s=>forestF(s[0]+.5,s[1]+.5)>.25);if(fo.length>=4)cs=fo;
    const rr=mulberry(td*71+WORLD*13);
    NV.rmGlints(e=>e.mu);
    x.mu={d:td,w:WORLD,l:NV.pick(cs,6,5,rr).map(q=>[q[0],q[1],0])};
  }
  x.mu.l.forEach((q,i)=>{if(!q[2]&&!EID['x2mu'+i]){const e=NV.mkGlint({id:'x2mu'+i,gk:'funghi',gv:i,tx:q[0],ty:q[1]});e.mu=1}});
};
X2.muGet=function(e){
  const x=X2.st(),i=+String(e.id).slice(4);if(x.mu&&x.mu.l[i])x.mu.l[i][2]=1;
  sparkBurst(e.x,e.y-8,6);
  gain('funghetti',1+(Math.random()<.4?1:0),e.x,e.y-14);
};
X2.mushDraw=function(g,e,t){
  if(e.got)return;
  const i=e.gv|0,P2=[['#b5532e','#f3d9b0'],['#c8a24a','#fff1cf'],['#9a4a2a','#f0d8b8'],['#d8643a','#fff']];
  const c=P2[i%4];
  g.save();g.translate(e.x,e.y);shadow(g,0,2,13,3.6,.26);
  const m=(ox,oy,sc,cc)=>{g.save();g.translate(ox,oy);g.scale(sc,sc);g.lineJoin='round';
    g.fillStyle='#efe3c4';g.strokeStyle='#4a3a22';g.lineWidth=1.3;g.beginPath();g.moveTo(-2.4,0);g.lineTo(-1.8,-8);g.lineTo(1.8,-8);g.lineTo(2.4,0);g.closePath();g.fill();g.stroke();
    g.fillStyle=cc[0];g.beginPath();g.moveTo(-8.5,-7);g.bezierCurveTo(-9,-17,9,-17,8.5,-7);g.bezierCurveTo(4,-5.4,-4,-5.4,-8.5,-7);g.fill();g.stroke();
    g.fillStyle=cc[1];for(const[dx,dy,r]of[[-3.5,-11.5,1.3],[2.2,-13,1.1],[4,-9.6,.9]]){g.beginPath();g.arc(dx,dy,r,0,7);g.fill()}
    g.restore()};
  m(-7,1,.78,c);m(6,2,1,c);m(-1,-3,.6,P2[(i+1)%4]);
  const k=.5+.5*Math.sin(t*2+i);g.globalAlpha=.5*k;g.fillStyle='#fff6c0';g.beginPath();g.arc(9,-18,1.6,0,7);g.fill();
  g.restore();
};
X2.botOpen=function(e){
  const x=X2.st();if(x.bt)x.bt.g=1;x.bn=(x.bn||0)+1;
  sparkBurst(e.x,e.y-14,14);sfx('relic');
  const r=Math.random(),pc=X2.piece();
  if(r<.4&&!x.th&&X2.huntStart()){
    UI.dlg([D('hero',"La bottiglia del giorno! Dentro c'è una mappa del tesoro, tutta sbiadita."),D('hero',"Non si legge dove… ma più mi avvicino, più sentirò caldo. Freddo, tiepido, caldo… fuoco!")]);
  }else if(r<.7&&pc){
    NV.addCol(pc[0],pc[1],true);UI.banner('Bottiglia del giorno','Dentro c\'era un pezzo per il Quaderno:\n'+X2.pieceName(pc));
  }else{
    const b=X2.rnd([[['corda',2],['semi',2]],[['rottami',2],['legna',3]],[['tela',1],['corda',1]],[['coco',2],['bacche',3]]]);
    b.forEach((q,i)=>gain(q[0],q[1],e.x,e.y-20-i*16));
    UI.toast('La bottiglia del giorno: un piccolo regalo dal mare.',3600);
  }
  saveGame(true);
};

/* ---- caccia al tesoro: freddo, tiepido, caldo, fuoco ---- */
X2.huntStart=function(){
  const x=X2.st(),cs=NV.cands(false).filter(s=>hyp(s[0]+.5-P.x/TS,s[1]+.5-P.y/TS)>=10);
  if(!cs.length)return false;
  const s=X2.rnd(cs);x.th={x:s[0],y:s[1]};X2._ht=3;
  setTimeout(()=>{try{if(S.flags.parrot)say(PAR,'Cra! Una mappa! Cammina in giro: più ti avvicini alla X, più senti caldo. Freddo… tiepido… caldo… FUOCO!',8)}catch(e){}},3500);
  return true;
};
X2.huntTick=function(dt){
  const x=X2.st(),h=x.th;if(!h||P.mode!=='walk'||inRoom())return;
  const d=hyp(h.x+.5-P.x/TS,h.y+.5-P.y/TS);
  if(d<1.15){
    x.th=null;x.thn=(x.thn||0)+1;
    sparkBurst(P.x,P.y-10,22);sfx('relic');
    const pc=X2.piece();
    UI.banner('Tesoro trovato!','Sotto la sabbia c\'era un sacchetto.'+(pc?'\nPer il Quaderno: '+X2.pieceName(pc):''));
    gain('rottami',2,P.x,P.y-20);gain('corda',2,P.x,P.y-36);
    setTimeout(()=>{try{if(pc)NV.addCol(pc[0],pc[1],true);else gain('tela',1,P.x,P.y-52);addXp(25)}catch(e){}},1200);
    saveGame(true);return;
  }
  X2._ht-=dt;if(X2._ht>0)return;X2._ht=2.4;
  const w=d>16?['Freddo…','#bfe4ff',0]:d>9?['Tiepido','#ffe9b0',0]:d>4.5?['Caldo!','#ffc46a',[14]]:['Fuoco!','#ff8a5a',[18,40,18]];
  float(P.x,P.y-84,w[0],w[1]);if(w[2]){try{buzz(w[2])}catch(e){}}
};

/* ---- il mercante di passaggio: ogni tre giorni attracca sulla spiaggia, dal mattino al tramonto ---- */
X2.MPOOL=[
  ['legna',6,'corda',2],['pietra',5,'rottami',2],['bacche',5,'semi',3],['coco',3,'corda',2],
  ['pesce',3,'tela',1],['molluschi',4,'rottami',2],['legna',8,'tela',1],['pietra',4,'semi',3]
];
X2.merDay=()=>S.day>=3&&S.day%3===0;
X2.merHere=function(){const m=X2.st().mr;return!!(m&&m.d===S.day&&S.tod>=7&&S.tod<19.5)};
X2.merNext=function(){let d=S.day+(X2.merDay()&&S.tod<19.5?0:1);while(!(d>=3&&d%3===0))d++;return d-S.day};
X2.merTick=function(){
  const x=X2.st();
  if(!X2.merDay()||S.tod<7||S.tod>=19.5)return;
  if(!x.mr||x.mr.d!==S.day){
    const cs=NV.cands(true);if(!cs.length)return;
    const rr=mulberry(S.day*977+WORLD*13),s=cs[(rr()*cs.length)|0];
    const pool=X2.MPOOL.slice(),of=[];
    while(of.length<3&&pool.length)of.push(pool.splice((rr()*pool.length)|0,1)[0]);
    x.mr={d:S.day,x:s[0],y:s[1],of,u:{},an:0};
  }
  const m=x.mr;
  if(!m.an&&NV.canShow()){
    m.an=1;sfx('quest');
    UI.banner('È arrivato il mercante!','Ha attraccato sulla spiaggia e riparte al tramonto.\nCerca il quadratino dorato sulla minimappa.');
    if(S.flags.parrot)say(PAR,'Cra! Una barca! Il mercante!',5);
  }
  const d=hyp((m.x+.5)*TS-P.x,(m.y+.5)*TS-P.y)/TS;
  if(d>3)X2._mcd=0;
  if(d<1.5&&!X2._mcd&&NV.canShow()){X2._mcd=1;X2.merOpen()}
};
X2.merOpen=function(){
  const x=X2.st(),m=x.mr;if(!m)return;
  const sp=X2.piece(),canMap=!x.th;
  const body=()=>{
    let h='<h2>Il mercante di passaggio</h2><p class="sm">«Buon vento, Capitano! Scambio volentieri: tu mi dai cose comuni, io ti do cose rare. Riparto al tramonto.»</p><div class="x2r">';
    m.of.forEach((o,i)=>{const left=2-(m.u[i]||0),ok=left>0&&(S.res[o[0]]||0)>=o[1];
      h+='<div><span>🔁</span><div style="flex:1">'+o[1]+' '+uEsc(RNAME[o[0]])+' → <b>'+o[3]+' '+uEsc(RNAME[o[2]])+'</b><br><small>Hai '+(S.res[o[0]]||0)+' · ancora '+left+(left===1?' scambio':' scambi')+'</small></div><button class="btn'+(ok?' gold':'')+'" data-mo="'+i+'"'+(ok?'':' disabled')+'>Scambia</button></div>'});
    if(sp&&!m.u.sp){const ok=(S.res.rottami||0)>=2;h+='<div><span>📖</span><div style="flex:1">2 '+RNAME.rottami+' → <b>'+uEsc(X2.pieceName(sp))+'</b><br><small>Un pezzo che manca al tuo Quaderno · hai '+(S.res.rottami||0)+'</small></div><button class="btn'+(ok?' gold':'')+'" data-mo="sp"'+(ok?'':' disabled')+'>Scambia</button></div>'}
    if(canMap&&!m.u.mp){const ok=(S.res.corda||0)>=3;h+='<div><span>🗺️</span><div style="flex:1">3 '+RNAME.corda+' → <b>Mappa del tesoro</b><br><small>Comincia una caccia al tesoro · hai '+(S.res.corda||0)+'</small></div><button class="btn'+(ok?' gold':'')+'" data-mo="mp"'+(ok?'':' disabled')+'>Scambia</button></div>'}
    return h+'</div><div class="row"><button class="btn" id="shNo">A presto!</button></div>';
  };
  const wire=c=>c.querySelectorAll('[data-mo]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.mo;
    if(k==='sp'){if((S.res.rottami||0)<2)return;S.res.rottami-=2;m.u.sp=1;NV.addCol(sp[0],sp[1],true);UI.toast('Nel Quaderno: '+X2.pieceName(sp),3200)}
    else if(k==='mp'){if((S.res.corda||0)<3)return;if(!X2.huntStart()){UI.toast('«Oggi la mappa non la trovo più. Torna la prossima volta!»');return}S.res.corda-=3;m.u.mp=1;UI.toast('Mappa del tesoro: più ti avvicini, più senti caldo!',4200)}
    else{const o=m.of[+k];if(!o||(S.res[o[0]]||0)<o[1]||(m.u[k]||0)>=2)return;S.res[o[0]]-=o[1];m.u[k]=(m.u[k]||0)+1;gain(o[2],o[3],P.x,P.y-20)}
    x.tr=(x.tr||0)+1;sfx('ok');U.sync&&U.sync();saveGame(true);
    if(k==='mp'){closeSheet();return}
    sheetFor(body(),wire);
  });
  sheetFor(body(),wire);
};
X2.merE=function(){const m=X2.st().mr;return{type:'mer',x:(m.x+.5)*TS,y:(m.y+.8)*TS}};
X2.mspec=function(){return CH.merc||(CH.merc={name:'Mercante',skin:'#e0aa82',hair:'#3a2a1a',beard:'#cfc6b2',mustache:1,coat:'#2f6b4a',coat2:'#1d4430',pants:'#5a3a2a',shirt:'#f1ede0',hat:'bucket',hatc:'#d9b86a',w:1.04,tall:1})};
X2.merDraw=function(g,t){
  const m=X2.st().mr;if(!X2.merHere())return;
  const x=(m.x+.5)*TS,y=(m.y+.8)*TS,bob=Math.sin(t*2)*1.2;
  g.save();g.translate(x,y);g.lineJoin='round';g.lineCap='round';
  // la barca a remi tirata in secco, con la merce accanto
  drawSp(g,SP.rowboat,-6,6,1.1);
  g.strokeStyle='#5a3a1a';g.lineWidth=3;g.beginPath();g.moveTo(-6,-4);g.lineTo(-6,-58);g.stroke();
  g.fillStyle='#e8b23a';g.beginPath();g.moveTo(-6,-58);g.quadraticCurveTo(12+bob,-56,20+bob*2,-48);g.quadraticCurveTo(10,-46,-6,-42);g.closePath();g.fill();g.strokeStyle='rgba(90,56,10,.7)';g.lineWidth=1.2;g.stroke();
  drawSp(g,SP.crate,-58,10,1);drawSp(g,SP.barrel[1],-72,16,1);
  drawSp(g,SP.crate,-46,-4,.9);
  g.restore();
  drawChar(g,x+52,y+10,{k:X2.mspec(),dir:'f',flip:true,t:t,walk:0,moving:false,look:0});
  twinkle(g,x+30,y-72,t,7,1.3,'#ffe27a');
};

/* ---- le missioni di Biscotto: brevi, una alla volta, per ogni isola ---- */
X2.SM={
  1:[
    {t:'Legna per il falò',d:'«Cra! Il fuoco ha fame.» Taglia 4 alberi.',k:'chopped',n:4,r:['corda',2]},
    {t:'Il giro dell\'isola',d:'«Chi cammina, scopre.» Fai 1500 passi.',k:'steps',n:1500,r:['semi',3]},
    {t:'Occhi aperti',d:'«Luccica! Luccica!» Trova 3 cose nuove per il Quaderno.',k:'col',n:3,r:['rottami',2]},
    {t:'La scorta del pappagallo',d:'«Bacche! Molluschi! Tutto!» Raccogli 8 volte.',k:'forage',n:8,r:['tela',1]},
    {t:'Il segreto dell\'isola',d:'«Un vecchio pirata ha graffiato una X per terra, lontano dal campo. Dove? Non lo dico. Cra!»',k:'secret',n:1,r:['tela',2],big:1}
  ],
  2:[
    {t:'Sassi per la baia',d:'«Tac, tac, tac!» Spacca 4 rocce.',k:'stone',n:4,r:['corda',2]},
    {t:'I sentieri della baia',d:'«Zampe in spalla!» Fai 1500 passi.',k:'steps',n:1500,r:['semi',3]},
    {t:'Pesce per tutti',d:'«Ho contato le bocche: sono tante.» Pesca 6 pesci.',k:'fish',n:6,r:['rottami',2]},
    {t:'Il Quaderno si riempie',d:'«Luccica anche qui!» Trova 3 cose nuove per il Quaderno.',k:'col',n:3,r:['tela',1]},
    {t:'Il segreto della baia',d:'«Anche qui c\'è una X graffiata per terra. Io l\'ho vista dall\'alto. Tu cerca. Cra!»',k:'secret',n:1,r:['tela',2],big:1}
  ]
};
X2.smCur=function(){
  const x=X2.st(),L=X2.SM[WORLD];if(!L)return null;
  let s=x.sm[WORLD];
  if(!s){if(S.day<2||!S.flags.parrot&&WORLD===1)return null;s=x.sm[WORLD]={i:0,b:null,an:0}}
  if(s.i>=L.length)return{done:true,n:L.length};
  const M=L[s.i];if(s.b==null)s.b=M.k==='secret'?0:X2.val(M.k);
  return{M,s,p:Math.min(M.n,Math.max(0,X2.val(M.k)-s.b)),i:s.i,n:L.length};
};
X2.smTick=function(){
  const c=X2.smCur();if(!c||c.done)return;
  const{M,s}=c;
  if(!s.an&&NV.canShow()){s.an=1;UI.toast('Missione di Biscotto: '+M.t+'. La trovi nel Diario, in «Da fare».',4600)}
  if(c.p>=M.n&&NV.canShow()){
    gain(M.r[0],M.r[1],P.x,P.y-20);addXp(M.big?60:25);sfx('quest');
    let extra='';
    if(M.big){const pc=!NV.has('pi','dorata')?['pi','dorata']:X2.piece();if(pc){NV.addCol(pc[0],pc[1],true);extra='\nPer il Quaderno: '+X2.pieceName(pc)}}
    UI.banner('Missione di Biscotto completata',M.t+'\nPremio: '+M.r[1]+' '+RNAME[M.r[0]]+extra);
    s.i++;s.b=null;s.an=0;X2.st().smn=(X2.st().smn||0)+1;saveGame(true);
  }
};

/* ---- il segreto dell'isola: una X graffiata per terra, lontano dal campo; nessuna indicazione ---- */
X2.secTick=function(){
  const x=X2.st();let s=x.sec[WORLD];
  if(!s){
    if(S.day<2)return;
    const cs=NV.cands(false);if(cs.length<8)return;
    const[ax,ay]=NV.anchor();cs.sort((a,b)=>hyp(b[0]-ax,b[1]-ay)-hyp(a[0]-ax,a[1]-ay));
    const rr=mulberry(WORLD*4441+7),p=cs[(rr()*Math.min(10,cs.length))|0];
    s=x.sec[WORLD]={x:p[0],y:p[1],f:0};
  }
  if(s.f||P.mode!=='walk'||inRoom())return;
  if(hyp(s.x+.5-P.x/TS,s.y+.5-P.y/TS)<.85&&NV.canShow()){
    s.f=1;sparkBurst(P.x,P.y-10,26);sfx('relic');try{buzz([30,50,30,50,70])}catch(e){}
    gain('rottami',3,P.x,P.y-20);gain('corda',3,P.x,P.y-36);addXp(40);
    UI.banner(WORLD===2?'Il segreto della baia!':'Il segreto dell\'isola!','Sotto la X c\'era il bottino di un vecchio pirata.');
    saveGame(true);
  }
};
X2.secDraw=function(g){
  const s=S.x2&&S.x2.sec&&S.x2.sec[WORLD];if(!s||inRoom())return;
  const x=(s.x+.5)*TS,y=(s.y+.6)*TS;
  g.save();g.translate(x,y);g.scale(1,.6);g.lineCap='round';
  g.strokeStyle=s.f?'rgba(60,36,14,.28)':'rgba(60,36,14,.5)';g.lineWidth=3.2;
  g.beginPath();g.moveTo(-9,-9);g.lineTo(9,9);g.moveTo(9,-9);g.lineTo(-9,9);g.stroke();
  g.restore();
};

/* ---- passo: tempo di gioco (vero), passi, miglia; il resto ogni mezzo secondo ---- */
X2.tick=function(dt){
  if(!S||!S.live)return;
  const now=performance.now(),x=X2.st();
  if(X2._l){const d=(now-X2._l)/1000;if(d>0&&d<2&&!(typeof PAUSED!=='undefined'&&PAUSED))x.pt+=d}
  X2._l=now;
  if(X2._px){const d=hyp(P.x-X2._px[0],P.y-X2._px[1]);if(d>0&&d<70){if(P.mode==='walk')x.steps+=d/26;else x.sea+=d/(TS*24)}}
  X2._px=[P.x,P.y];
  if(!X2.isl())return;
  try{X2.huntTick(dt||.016)}catch(e){frameErr(e)}
  X2._t-=(dt||.016);if(X2._t>0)return;X2._t=.5;
  if(S.tut!=null&&S.tutDone===0)return;
  if(P.mode!=='walk'||inRoom()||P.cl)return;
  X2.step();
};
X2.step=function(){
  if(S.day>=2){X2.dlTick();X2.botTick();X2.muTick();X2.smTick();X2.secTick()}
  X2.merTick();
};
X2.draw=function(g,t){
  if(!S||!S.live||!X2.isl()||inRoom())return;
  X2.secDraw(g);
};
X2.mini=function(g,mxw,myw){
  if(!S||!S.live||!X2.isl()||!X2.merHere())return;
  const m=S.x2.mr,x=mxw((m.x+.5)*TS),y=myw((m.y+.5)*TS);
  g.fillStyle='#ffd23a';g.strokeStyle='#2a1a0e';g.lineWidth=1.4;g.fillRect(x-3.5,y-3.5,7,7);g.strokeRect(x-3.5,y-3.5,7,7);
};
X2.onBegin=function(){X2._l=0;X2._px=null;X2._t=0;X2._mcd=0;try{X2.st()}catch(e){}};

/* ---- Diario: «Da fare» e «Statistiche» ---- */
X2.time=function(s){s=Math.floor(s||0);const h=Math.floor(s/3600),m=Math.floor(s%3600/60);return h?h+' h '+m+' min':m+' min'};
X2.bar=(p,n)=>'<div style="height:8px;border-radius:6px;background:rgba(0,0,0,.18);overflow:hidden;margin-top:4px"><i style="display:block;height:100%;width:'+Math.round(100*p/Math.max(1,n))+'%;background:#d9912a"></i></div>';
X2.todoHtml=function(){
  const x=X2.st();let h='<h3>Cosa posso fare adesso?</h3><div class="x2r">';
  const row=(ic,html)=>{h+='<div><span>'+ic+'</span><div style="flex:1">'+html+'</div></div>'};
  const main=activeIds().filter(id=>QDEF[id]&&QDEF[id].kind==='main')[0];
  if(main){const g=curGoal(main);let gt='';try{gt=g?(typeof g.txt==='function'?g.txt(S.q[main].p):g.txt):''}catch(e){}
    row('🧭','<b>Storia: '+uEsc(QDEF[main].title)+'</b>'+(gt?'<br><small>'+uEsc(gt)+'</small>':''))}
  if(X2.isl()&&S.day>=2){
    const[p,n,D]=X2.dlProg(),dl=X2.daily();
    row(dl.done?'✅':'📅','<b>Incarico del giorno</b><br><small>'+uEsc(D.t)+' · '+p+'/'+n+(x.sk>1&&x.ld>=X2.today()-1?' · '+x.sk+' giorni di fila':'')+'</small>'+X2.bar(p,n));
    const c=X2.smCur();
    if(c&&c.done)row('🦜','<b>Missioni di Biscotto</b><br><small>Le hai fatte tutte e '+c.n+' su quest\'isola. Cra!</small>');
    else if(c)row('🦜','<b>Biscotto chiede: '+uEsc(c.M.t)+'</b> <small>('+(c.i+1)+'/'+c.n+')</small><br><small>'+uEsc(c.M.d)+(c.M.k==='secret'?'':' · '+c.p+'/'+c.M.n)+'</small>'+(c.M.k==='secret'?'':X2.bar(c.p,c.M.n)));
    if(X2.merHere())row('⛵','<b>Il mercante è sulla spiaggia</b><br><small>Riparte al tramonto. È il quadratino dorato sulla minimappa.</small>');
    else{const k=X2.merNext();row('⛵','<b>Mercante di passaggio</b><br><small>'+(k<=0?'Arriva oggi, in mattinata.':k===1?'Arriva domani mattina.':'Arriva tra '+k+' giorni.')+'</small>')}
    if(x.th)row('🗺️','<b>Caccia al tesoro in corso</b><br><small>Cammina e leggi sopra la testa: freddo, tiepido, caldo… fuoco!</small>');
    if(x.bt&&x.bt.d===X2.today())row(x.bt.g?'✅':'🍾','<b>Bottiglia del giorno</b><br><small>'+(x.bt.g?'L\'hai già presa. Domani ne arriva un\'altra.':'Luccica da qualche parte sulla riva.')+'</small>');
    try{const left=NV.tideLeft();if(left)row('🌊','<b>La marea</b><br><small>Sulla riva '+(left>1?'ci sono ancora '+left+' cose':'c\'è ancora una cosa')+' che luccica.</small>');
      const[fa,fb]=NV.farmReady();if(fa)row('🌱','<b>Orto</b><br><small>'+fa+(fa>1?' piante pronte':' pianta pronta')+' da raccogliere.</small>');if(fb)row('🐠','<b>Essiccatore</b><br><small>'+(fb>1?fb+' cose pronte':'Una cosa pronta')+' da ritirare.</small>')}catch(e){}
    row('📖','<b>Quaderno delle collezioni</b><br><small>'+NV.total()+' su '+NV.max()+' · le trovi nella scheda «Raccolta».</small>'+X2.bar(NV.total(),NV.max()));
  }else if(X2.isl())row('🌅','<b>Domani</b><br><small>Dal secondo giorno arrivano l\'incarico del giorno, la bottiglia e le missioni di Biscotto.</small>');
  return h+'</div>';
};
X2.statsHtml=function(){
  const x=X2.st(),st=k=>(S.stat&&S.stat[k])||0;
  const cell=(v,l)=>'<div><b>'+v+'</b>'+uEsc(l)+'</div>';
  let rel=0,sp=0,rec=0,lv=1;
  try{rel=relicCount()}catch(e){}try{sp=fishCount()}catch(e){}try{rec=Object.keys(S.rec||{}).length}catch(e){}try{lv=lvOf(S.xpt||0)}catch(e){}
  const grid=a=>'<div class="stats x2s" style="grid-template-columns:repeat(auto-fill,minmax(128px,1fr))">'+a.join('')+'</div>';
  let h='<h3>Il tuo viaggio</h3>'+grid([
    cell(X2.time(x.pt),'Tempo di gioco'),cell(S.day||1,'Giorni sull\'isola'),cell(lv,'Livello'),
    cell(Math.floor(x.steps).toLocaleString('it-IT'),'Passi'),cell((Math.round(x.sea*10)/10).toLocaleString('it-IT'),'Miglia in mare')]);
  h+='<h3>Lavoro e raccolta</h3>'+grid([
    cell(st('chopped'),'Alberi tagliati'),cell(st('stone'),'Rocce spaccate'),cell(st('forage'),'Raccolte'),cell(st('built'),'Costruzioni'),
    cell((S.gard&&S.gard.harv)||0,'Raccolti dell\'orto'),cell(rec,'Ricette cucinate')]);
  h+='<h3>Mare e tesori</h3>'+grid([
    cell(st('fish'),'Pesci presi'),cell(st('perf'),'Colpi perfetti'),cell(sp,'Specie di pesci'),cell(st('crabs'),'Granchi'),
    cell(st('bottles'),'Bottiglie'),cell(S.cOpen||0,'Casse aperte'),cell(rel,'Reliquie'),cell(x.thn||0,'Tesori trovati')]);
  h+='<h3>Ogni giorno</h3>'+grid([
    cell(x.dn||0,'Incarichi del giorno'),cell(x.skMax||0,'Record giorni di fila'),cell(x.bn||0,'Bottiglie del giorno'),
    cell(x.tr||0,'Scambi col mercante'),cell(x.smn||0,'Missioni di Biscotto'),cell(Object.keys(x.sec).filter(k=>x.sec[k].f).length+'/2','Segreti scoperti'),
    cell(NV.total()+'/'+NV.max(),'Quaderno')]);
  if(x.ng)h+='<p class="sm">Nuova partita+ numero '+x.ng+': cappelli, Quaderno e traguardi vengono dalle avventure di prima.</p>';
  return h;
};

/* ---- Nuova partita+: chi ha finito il Capitolo 1 può ricominciare tenendo cappelli, Quaderno e traguardi ---- */
X2.ngAsk=function(go){
  let old=null;try{old=loadSave()}catch(e){}
  if(!old||!old.flags||!old.flags.ch1){X2._keep=null;go();return}
  const d=document.createElement('div');
  d.style.cssText='position:absolute;inset:0;z-index:90;background:rgba(4,20,32,.86);display:flex;align-items:center;justify-content:center;padding:14px';
  d.innerHTML='<div class="card" style="max-width:440px;text-align:center"><h2>Nuova partita+</h2><p class="sm">Hai già finito il Capitolo 1. Vuoi ricominciare l\'avventura tenendo cappelli, abiti, Quaderno delle collezioni e traguardi?</p><div class="row" style="flex-wrap:wrap;justify-content:center"><button class="btn gold big" id="ngY">Sì, tienili</button><button class="btn big" id="ngN">Da zero</button><button class="btn" id="ngX">Annulla</button></div></div>';
  ($('app')||document.body).appendChild(d);
  const end=k=>{d.remove();if(k===0)return;
    X2._keep=k===1?{col:old.nv&&old.nv.col,ach:old.nv&&old.nv.ach,wown:old.wown,phats:old.phats,wear:old.wear,pt:old.x2&&old.x2.pt,ng:((old.x2&&old.x2.ng)||0)+1}:null;
    go();X2.ngApply()};
  d.querySelector('#ngY').onclick=()=>end(1);d.querySelector('#ngN').onclick=()=>end(2);d.querySelector('#ngX').onclick=()=>end(0);
};
X2.ngApply=function(){
  const k=X2._keep;X2._keep=null;if(!k||!S)return;
  S.nv=S.nv||{};if(k.col)S.nv.col=k.col;if(k.ach)S.nv.ach=k.ach;
  if(k.wown)S.wown=k.wown;if(k.phats)S.phats=k.phats;if(k.wear)S.wear=k.wear;
  S.x2=S.x2||{};S.x2.pt=k.pt||0;S.x2.ng=k.ng;
};

/* ---- schermata iniziale: sta sempre tutta in una schermata, senza scorrere ---- */
X2.fitStart=function(){
  const s=$('start'),c=$('startCard');if(!s||!c||s.hidden)return;
  s.style.overflow='hidden';c.style.transform='';c.style.margin='auto';
  const cs=getComputedStyle(s),ah=s.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom),aw=s.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
  const k=Math.min(1,ah/c.offsetHeight,aw/c.offsetWidth);
  if(k<.999){c.style.margin='0';c.style.flex='none';c.style.transformOrigin='center center';c.style.transform='scale('+Math.max(.5,k).toFixed(3)+')'}
};
(function(){
  try{
    window.addEventListener('resize',()=>setTimeout(X2.fitStart,60));
    let n=0;const iv=setInterval(()=>{try{X2.fitStart()}catch(e){}if(++n>40)clearInterval(iv)},250);
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>X2.fitStart());
  }catch(e){}
})();

/* ---- agganci ---- */
{
  try{const st=document.createElement('style');st.textContent='.x2r{margin:8px 0}.x2r>div{display:flex;gap:10px;align-items:center;font:700 13.5px var(--f-b);padding:7px 10px;border-radius:12px;background:rgba(0,0,0,.09);margin-bottom:6px}.x2r>div>span{font-size:20px;width:26px;text-align:center;flex:none}.x2r small{opacity:.82;font-weight:700}.x2s b{font-size:22px}.x2s div{font-size:12px;padding:6px}';document.head.appendChild(st)}catch(e){}
  const c0=NV.collect;NV.collect=function(e){if(e&&e.dly){X2.botOpen(e);return}if(e&&e.mu){X2.muGet(e);return}return c0(e)};
  const b0=NV.onBegin;NV.onBegin=function(){b0();try{X2.onBegin()}catch(e){}};
}
