#!/usr/bin/env python3
# Sistemazione capitoli — C2-5 «Briciola al campo» (secondaria n10). Disegni: SEGNAPOSTO dichiarati (Briciola, cuccia, cesto) in attesa di Muse.
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b,n=1):
    global src
    if src.count(a)!=n:print('PATCH101 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
# entita' nel mondo 2 (nascosta finche' Tito non ti ci porta)
rep("""deco('clue'+i,'clue',f[0]+.5,f[1]+.8,null,{inter:'look',k:i,hitw:60,hith:44,label:'Tracce'})});""","""deco('clue'+i,'clue',f[0]+.5,f[1]+.8,null,{inter:'look',k:i,hitw:60,hith:44,label:'Tracce'})});
   {const f=fr(57.8,34.8,2);deco('briciola','briciola',f[0]+.5,f[1]+.8,null,{hidden:1,hitw:70,hith:50,label:'Briciola'})}""")
rep("const SIDE=WORLD===2?['n1','n2','n3','n4','n5','n6','n7','n8','n9']","const SIDE=WORLD===2?['n1','n2','n3','n4','n5','n6','n7','n8','n9','n10']")
rep("""j1:{kind:'main',title:"Chi era J.?",""","""n10:{kind:'side',title:"Briciola al campo",blurb:"La cagnetta di Tito non può restare un segreto per sempre. Non se la nave parte.",avail:()=>qDone('n5')&&!!C().ch.puppy&&C().ch.puppy!=='told',
  goals:[{k:'flag',done:()=>!!Ch2.br().met,txt:"Chiedi a Tito di portarti da Briciola",hint:"Parla con Tito: «Portami da Briciola».",mark:()=>pt(EID.npc_tito,110)},
         {k:'flag',done:()=>!!Ch2.br().home,txt:"Prepara per Briciola una cuccia (4 legna, 1 corda) oppure un cesto da viaggio (2 corda, 1 tela)",hint:"Briciola è nascosta vicino alle barche, a est del campo. Se ne costruisce una sola: la cuccia la fa restare al campo, il cesto la porta sulla nave.",mark:()=>pt(EID.briciola,40)},
         {k:'flag',done:()=>(Ch2.br().fed||0)>=2,txt:()=>"Dai da mangiare a Briciola per 2 giorni ("+Math.min(2,Ch2.br().fed||0)+"/2)",hint:"Un pesce o dei molluschi, una volta al giorno.",mark:()=>pt(EID.briciola,40)},
         {k:'flag',done:()=>!!Ch2.br().fire,txt:"Parla con Gnocco di Briciola",hint:"Parla con Gnocco: «Parla di Briciola».",mark:()=>pt(EID.npc_gnocco,110)}],
  onDone(){Ch2.br().day=S.day;addXp(30);float(P.x,P.y-80,'+30 XP','#ffe27a')}},
j1:{kind:'main',title:"Chi era J.?",""")
rep("""Ch2.QH.push({w:'tito',active:()=>qAct('n5',1),""","""Ch2.br=function(){const c=C();return c.br||(c.br={})};
Ch2.QH.push({w:'tito',active:()=>qAct('n10',0),ready:()=>true,label:()=>"Portami da Briciola",run(){
  UI.dlg([D('hero',"Portami da lei."),D('tito',"Adesso? Va bene. Ma piano: se abbaia, io non c'ero."),D('hero',"Dietro le barche, tra due casse, due occhi neri e una coda che batte sulla sabbia."),D('tito',"Briciola, questo è {cap}. È dei nostri. Credo."),D('hero',"Quando la nave partirà, qui non resterà nessuno a portarle l'acqua. Bisogna decidere prima.")],()=>{Ch2.br().met=1;checkAll()})}});
Ch2.QH.push({w:'gnocco',active:()=>qAct('n10',3),ready:()=>true,label:()=>"Parla di Briciola",run(){
  const b=Ch2.br(),kn=C().ch.puppy==='gnocco';
  const L=b.home==='cuccia'?[D('hero',"Gnocco, vicino alle barche c'è una cosa che devi sapere."),D('gnocco',"La cagnetta? Lo so dal primo giorno. Chi credi che lasci gli avanzi dietro le casse?"),D('gnocco',kn?"È assunta da un pezzo. Adesso ha anche una casa.":"Un assaggiatore? Con la coda? È già assunto."),D('tito',"Io non c'ero. Ma grazie.")]
    :[D('hero',"Gnocco, mi serve un po' di pesce secco. Per un viaggio."),D('gnocco',"Un cesto da viaggio, con una coperta dentro. Non dirmi per chi è: lo so dal primo giorno."),D('gnocco',"Io non ho visto niente. Ma gli avanzi li metto da parte."),D('tito',"Io non c'ero. Ma grazie.")];
  UI.dlg(L,()=>{b.fire=1;Ch2.addTrust('gnocco',1);Ch2.addTrust('tito',1);checkAll()})}});
Ch2.brLook=function(){
  const b=Ch2.br();
  if(qAct('n10',1)){
    let k=null;const A={legna:4,corda:1},B={corda:2,tela:1};
    UI.dlg([D('hero',"Briciola mi annusa le mani. Una cuccia qui, o un cesto per portarla a bordo: una cosa sola.",{choices:[
      {t:"Una cuccia vicino alle barche ("+costTxt(A)+").",fn:()=>{k='cuccia'}},
      {t:"Un cesto da viaggio per la nave ("+costTxt(B)+").",fn:()=>{k='cesto'}},
      {t:"Non ancora.",fn:()=>{k=null}}]})],()=>{
      if(!k)return;const cst=k==='cuccia'?A:B;
      if(!hasRes(cst)){UI.toast("Non basta il materiale: "+costTxt(cst)+".");return}
      payRes(cst);UI.sync();b.home=k;sfx('hammer');
      UI.dlg([D('hero',k==='cuccia'?"Quattro assi, una corda, un tetto storto. Briciola ci entra subito, come se l'avesse sempre avuta.":"Un cesto intrecciato, con un pezzo di tela per coperta. Briciola ci gira dentro tre volte e si accuccia."),D('tito',k==='cuccia'?"Allora resta. Qui, con tutti.":"Allora viene con me. Di nascosto.")],()=>checkAll())});
    return true}
  if(qAct('n10',2)){
    if(b.fedDay===S.day){UI.dlg([D('hero',"Ha già mangiato, oggi. Torno domani.")]);return true}
    let f=null;const ch=[];
    if((S.res.pesce||0)>=1)ch.push({t:"Un pesce.",fn:()=>{f='pesce'}});
    if((S.res.molluschi||0)>=1)ch.push({t:"Dei molluschi.",fn:()=>{f='molluschi'}});
    if(!ch.length){UI.dlg([D('hero',"Non ho niente per lei. Le serve un pesce, o dei molluschi.")]);return true}
    ch.push({t:"Non adesso.",fn:()=>{f=null}});
    UI.dlg([D('hero',"Briciola guarda la mia bisaccia. Cosa le do?",{choices:ch})],()=>{
      if(!f)return;S.res[f]-=1;UI.sync();b.fed=(b.fed||0)+1;b.fedDay=S.day;sfx('ok');
      UI.dlg([D('hero',b.fed>=2?"Mangia piano, stavolta. Si fida. Al campo nessuno si è accorto di niente. O così sembra.":"Finisce tutto in tre morsi e mi lecca le dita. Domani torno.")],()=>checkAll())});
    return true}
  UI.dlg([D('hero',b.home?"Briciola scodinzola. Non abbaia: ha imparato a stare zitta.":"Due occhi neri tra le casse. Mi tiene d'occhio.")]);return true};
Ch2.brAsm=function(){const b=Ch2.br(),c=C();if(!b.home)return[];
  return[D('hero',b.home==='cuccia'?"Briciola è accucciata ai piedi di Tito. Ferro la guarda"+(c.ch.note?", poi guarda me. Penso al suo biglietto: otto posti, tre nomi.":".")+" Non dice niente. Per ora.":"Tito tiene un cesto dietro le gambe. Il cesto respira. Ferro guarda altrove.")]};
Ch2.brEnd=function(k){const b=Ch2.br();if(!b.home)return[];
  const cu=b.home==='cuccia';
  const T={ferro:"Sulla riva, accanto a Tito, una cosa piccola e chiara scodinzola. Almeno lui non resta solo.",
    ferro2:cu?"Dietro Tito, dal barile, salta fuori anche Briciola. Ferro conta di nuovo. Non dice niente.":"Dopo Tito, dal barile esce anche un cesto. Il cesto abbaia una volta. Ferro finge di non sentire.",
    all:cu?"Briciola è a prua, col muso nel vento. Gnocco le ha già messo da parte un osso.":"Tito sale per ultimo, con un cesto stretto al petto. Nessuno gli chiede cosa c'è dentro. Lo sanno tutti.",
    solo:"A riva restano tutti. Anche Tito, anche Briciola. Lui, almeno, le porterà l'acqua."};
  T.fire=T.all;return T[k]?[D('hero',T[k])]:[]};
Ch2.QH.push({w:'tito',active:()=>qAct('n5',1),""")
rep("""  if(e.id==='c2fire'){
    c.fireDay=""","""  if(e.id==='briciola')return Ch2.brLook();
  if(e.id==='c2fire'){
    c.fireDay=""")
rep("""Ch2.tick=function(dt){
  const c=C();""","""Ch2.tick=function(dt){
  const c=C();
  {const b=EID.briciola;if(b){const v=!!(c.br&&c.br.met);b.hidden=!v;b.inter=v?'look':null}}""")
rep("""if(e.id==='c2fire')return{l:'Scaldati',i:'fire'};""","""if(e.id==='c2fire')return{l:'Scaldati',i:'fire'};if(e.id==='briciola')return{l:'Briciola',i:'hand'};""")
rep("""D('hero',Ch2.closes()),D('hero',"Cosa dico?",""","""...Ch2.brAsm(),D('hero',Ch2.closes()),D('hero',"Cosa dico?",""")
rep("""  {const pg=c.pages||0;
   L.push(pg>=4?""","""  L.push(...Ch2.brEnd(k));
  {const pg=c.pages||0;
   L.push(pg>=4?""")
rep("""Briciola ("+(c.ch&&c.ch.puppy?"scoperta":"non scoperta")+")""","""Briciola ("+(c.br&&c.br.fire?"sistemata":c.ch&&c.ch.puppy?"scoperta":"non scoperta")+")""")
# SEGNAPOSTO (da sostituire con i disegni di Muse: Briciola, cuccia, cesto)
rep("const NVDX={};","""const NVDX={};
NVDX.briciola=(g,e,t)=>{   // SEGNAPOSTO disegnato a codice
  const b=(S&&S.c2&&S.c2.br)||{};g.save();g.translate(e.x,e.y);
  if(b.home==='cuccia'){g.save();g.translate(-34,0);shadow(g,0,2,24,6,.22);g.fillStyle='#a9784a';g.strokeStyle='#3a2010';g.lineWidth=1.6;g.beginPath();g.rect(-17,-20,34,20);g.fill();g.stroke();g.fillStyle='#8a5a34';g.beginPath();g.moveTo(-21,-20);g.lineTo(0,-36);g.lineTo(21,-20);g.closePath();g.fill();g.stroke();g.fillStyle='#2a1a10';g.beginPath();g.moveTo(-8,0);g.lineTo(-8,-9);g.arc(0,-9,8,Math.PI,0);g.lineTo(8,0);g.closePath();g.fill();g.restore()}
  else if(b.home==='cesto'){g.save();g.translate(-30,0);shadow(g,0,2,18,5,.22);g.fillStyle='#c9a160';g.strokeStyle='#3a2010';g.lineWidth=1.6;g.beginPath();g.ellipse(0,-7,15,8,0,0,7);g.fill();g.stroke();g.fillStyle='#d8d0b8';g.beginPath();g.ellipse(0,-10,11,4.5,0,0,7);g.fill();g.stroke();g.restore()}
  shadow(g,0,2,13,4,.25);const w=Math.sin(t*9)*.5;
  g.strokeStyle='#3a2a1a';g.lineWidth=1.5;g.fillStyle='#e8d6b0';
  g.save();g.translate(-10,-11);g.rotate(-.9+w);g.beginPath();g.ellipse(0,-5,2.2,6,0,0,7);g.fill();g.stroke();g.restore();
  g.beginPath();g.ellipse(0,-8,11,6.5,0,0,7);g.fill();g.stroke();
  for(const x of[-6,6]){g.beginPath();g.rect(x-2,-4,4,5);g.fill();g.stroke()}
  g.beginPath();g.arc(11,-15,6.5,0,7);g.fill();g.stroke();
  g.fillStyle='#b8894f';g.beginPath();g.ellipse(7,-19,3,4.5,-.5,0,7);g.fill();g.stroke();
  g.fillStyle='#1c1410';g.beginPath();g.arc(13,-16,1.2,0,7);g.fill();g.beginPath();g.arc(17,-13.5,1.5,0,7);g.fill();
  g.restore()};""")
open(P,'w',encoding='utf8').write(src);print('patch101 ok')
# A8: la scena di amicizia di Ferro a 4 cuori parte solo con almeno 1 pagina del diario di J.
src=open(P,encoding='utf8').read()
rep("active:()=>!!C().met[w]&&Ch2.tr(w)>=h*2&&!NV2.fr(w,h)&&(h===2||NV2.fr(w,2)),","active:()=>!!C().met[w]&&Ch2.tr(w)>=h*2&&!NV2.fr(w,h)&&(h===2||NV2.fr(w,2))&&!(w==='ferro'&&h===4&&(C().pages||0)<1),")
rep("""+'</div>';
  h+='<p class="sm">Festa al campo:""","""+'</div>';
  try{if(Ch2.tr('ferro')>=8&&NV2.fr('ferro',2)&&!NV2.fr('ferro',4)&&(c.pages||0)<1)h+='<p class="sm">Ferro: c\\'è qualcosa che non hai ancora trovato.</p>'}catch(_){}
  h+='<p class="sm">Festa al campo:""")
open(P,'w',encoding='utf8').write(src);print('patch101 A8 ok')
