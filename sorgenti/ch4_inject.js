/* ====== LA NAVE SPAGNOLA – mappa interna (stile isola) ====== */
(function(){
if(typeof WORLD==='undefined'||WORLD!==4)return;
const T=TS,TAU=Math.PI*2;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const rr=(a,b)=>a+Math.random()*(b-a);
const pick=a=>a[(Math.random()*a.length)|0];
const toast=(h,ms)=>UI.toast(String(h).replace(/<[^>]+>/g,''),ms||3800);
const SW=56,SH=18,OX=8,OY=13;
const wx=gx=>(OX+gx)*T,wy=gy=>(OY+gy)*T;           // angolo alto-sinistro della cella
const cx=gx=>(OX+gx+.5)*T,cy=gy=>(OY+gy+.5)*T;       // centro cella
const css=document.createElement('style');
css.textContent=`
body.w4 #vit,body.w4 #clock,body.w4 #res,body.w4 #chal,body.w4 #ctr,body.w4 #mini,body.w4 #obj,body.w4 #tank,body.w4 #bJ{display:none!important}
#c4{position:absolute;inset:0;pointer-events:none;z-index:6}
#c4 *{box-sizing:border-box}
#c4 .pl{position:absolute;pointer-events:none;font:800 14px var(--f-b,Nunito,sans-serif);color:#fff6dc;background:linear-gradient(#7a4c26,#5a3418);border:2px solid #3a200c;border-radius:12px;padding:4px 10px;white-space:nowrap}
#c4top{position:absolute;left:10px;top:8px;display:flex;gap:6px;flex-wrap:wrap;max-width:62%}
#c4top .pl{position:static}
#c4obj{left:50%;transform:translateX(-50%);top:46px;max-width:34%;text-align:center;white-space:normal!important;font-size:13px!important;background:rgba(40,22,8,.82)!important}
#c4 .bt{position:absolute;pointer-events:auto;border:3px solid #3a200c;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffd98a,#e19a26);color:#3a200c;font:900 14px var(--f-b,Nunito,sans-serif);box-shadow:0 4px 0 rgba(0,0,0,.4);cursor:pointer;touch-action:none}
#c4 .bt:active{transform:translateY(2px)}
#c4 .bt[disabled]{filter:grayscale(.8) brightness(.85);opacity:.7}
#c4use{left:190px;bottom:22px;width:58px;height:58px;font-size:12px}
#c4use.lit{box-shadow:0 0 0 4px rgba(255,214,90,.9),0 0 22px 6px rgba(255,190,60,.8),0 4px 0 rgba(0,0,0,.4)}
#c4alarm{position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity .5s;animation:c4pulse 1.1s ease-in-out infinite}
#c4alarm.on{opacity:1}
@keyframes c4pulse{0%,100%{box-shadow:inset 0 0 90px 10px rgba(220,30,30,.22)}50%{box-shadow:inset 0 0 150px 44px rgba(220,30,30,.5)}}
#c4hit{left:70px;bottom:24px;width:100px;height:100px;background:radial-gradient(circle at 35% 30%,#ffb0a0,#d8412f);color:#fff;font-size:15px}
#c4par{left:182px;bottom:92px;width:74px;height:74px;background:radial-gradient(circle at 35% 30%,#bcd6f2,#3f78b8);color:#fff;font-size:13px}
#c4par.on{box-shadow:0 0 0 4px rgba(150,205,255,.95),0 0 20px 6px rgba(110,180,255,.8),0 3px 0 rgba(0,0,0,.4);transform:translateY(2px)}
#c4say{position:absolute;left:10px;top:50px;max-width:min(236px,27%);display:none;background:rgba(255,246,220,.76);color:#3a200c;border:2px solid rgba(58,32,12,.7);border-radius:12px 12px 12px 3px;padding:4px 8px;font:800 12px/1.25 var(--f-b,Nunito,sans-serif);box-shadow:0 2px 0 rgba(0,0,0,.2);pointer-events:none}
#c4say b{color:#c8402e}
body.w4 #trow{left:auto!important;right:12px;top:8px}
.c4st{font-size:44px;line-height:1.05;letter-spacing:8px;margin:2px 0 2px}
.c4st i{font-style:normal;color:#cdbf9c;display:inline-block;transform:scale(.72);opacity:.55;transition:transform .42s cubic-bezier(.3,1.9,.5,1),opacity .3s,color .3s}
.c4st i.on{color:#f2b30f;transform:scale(1);opacity:1;text-shadow:0 3px 0 #8a5a08}
.c4ls{list-style:none;margin:4px auto 8px;padding:0;text-align:left;display:block;width:fit-content;font:800 14px/1.4 var(--f-b,Nunito,sans-serif)}
.c4ls li{padding:1px 0 1px 24px;position:relative;color:#7a6a4a}
.c4ls li:before{content:'☆';position:absolute;left:0;top:1px;color:#a8987a}
.c4ls li.ok{color:#3a200c}
.c4ls li.ok:before{content:'★';color:#e6a200}
.c4md{display:block;width:fit-content;margin:2px auto 4px;padding:2px 14px;border-radius:14px;border:2px solid #3a200c;font:900 14px var(--f-b,Nunito,sans-serif);color:#3a200c}
.c4md.g{background:linear-gradient(#ffe27a,#e6a914)}.c4md.s{background:linear-gradient(#f4f6fa,#b8c0cc)}.c4md.b{background:linear-gradient(#e8b27a,#b8743a)}.c4md.n{background:#e8dcc0}
.c4nw{margin:2px 0 6px;font:800 13px var(--f-b,Nunito,sans-serif);color:#2a6a3a}
`;
document.head.appendChild(css);

/* ---------------- pianta della nave (3 ponti) ---------------- */
const G=[];
for(let y=0;y<SH;y++){G.push([]);for(let x=0;x<SW;x++)G[y].push(' ')}
const inHull=(x,y)=>{const xx=x+.5,yy=y+.5;let half=7.7;if(xx<5)half*=Math.sqrt(Math.max(0,1-Math.pow((5-xx)/5,2)));else if(xx>40)half*=Math.max(0,1-Math.pow((xx-40)/15,1.7));return Math.abs(yy-9)<=half};
const isIn=(x,y)=>x>=0&&y>=0&&x<SW&&y<SH&&G[y][x]!==' ';
let bord=[],DK=0;
const R=(x0,y0,x1,y1,f)=>{for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(G[y]&&G[y][x]==='.')G[y][x]=f};
const Wl=(x0,y0,x1,y1)=>{for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++)if(G[y]&&G[y][x]&&G[y][x]!==' ')G[y][x]='#'};
const Ds=(x,y,ch)=>{if(G[y]&&G[y][x]&&G[y][x]!==' ')G[y][x]=ch};
const DECKN=['Ponte di comando','Ponte di mezzo','La stiva'];
function layout(n){
  DK=n;
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++)G[y][x]=inHull(x,y)?'.':' ';
  bord=[];
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++)if(isIn(x,y)&&(!isIn(x-1,y)||!isIn(x+1,y)||!isIn(x,y-1)||!isIn(x,y+1)))bord.push([x,y]);
  for(const[x,y]of bord)G[y][x]='#';
  const fl=[['c','q','a','m','p'],['s','q','t','s','p'],['s','s','z','s','p']][n];
  R(1,2,10,15,fl[0]);R(12,2,30,4,fl[1]);R(12,13,21,15,fl[2]);R(23,13,30,15,fl[3]);R(41,2,46,15,fl[4]);
  Wl(11,2,11,15);Ds(11,8,'D');Ds(11,9,'D');
  Wl(11,5,31,5);Ds(15,5,'D');Ds(26,5,'D');
  Wl(11,12,31,12);Ds(15,12,'D');Ds(26,12,n===2?'H':'D');
  Wl(22,13,22,15);
  Wl(31,2,31,15);Ds(31,8,'D');Ds(31,9,'D');
  Wl(40,2,40,15);Ds(40,8,n===1?'L':'D');Ds(40,9,n===1?'L':'D');
  Wl(47,0,SW-1,SH-1);
}
layout(0);
const FLOOR='.cqkpstamz';
const roomAt=(gx,gy)=>{
  if(gx<=10)return'cabin';
  if(gx>=40&&gx<=46)return'cell';
  if(gx>=32&&gx<=39)return'mid';
  if(gx>=12&&gx<=30){if(gy<=4)return'quarters';if(gy>=13)return gx<=21?'galley':'hold';return'corr'}
  return null};
const STAIRS=[{d:[37,10.5]},{u:[37,10.5],d:[37,3.5]},{u:[37,3.5]}];
/* dove sta la chiave della cella: cambia a ogni partita (3 posti sul ponte di comando) */
const KEYSP=[
 {gx:3,gy:13,lab:'Cassapanca',goal:'La chiave della cella: cerca a poppa, nella cabina del comandante.',diary:'«La chiave della cella sta nella cassapanca, sotto il letto del comandante.»',start:'Prima la cella: la chiave sta nella cassapanca del comandante, nella cabina a poppa.',enter:'Una cassapanca in fondo, a sinistra! Quella con la serratura lucida.'},
 {gx:21,gy:2,lab:'Baule degli ufficiali',goal:'La chiave della cella: cerca negli alloggi degli ufficiali, a nord del corridoio.',diary:'«Stavolta la chiave della cella è nel baule fra le cuccette degli ufficiali. Nessuno la cercherà lì.»',start:'Prima la cella: stavolta la chiave è nel baule degli alloggi degli ufficiali, a nord del corridoio.',enter:'Il baule fra le cuccette luccica: la chiave deve essere lì dentro!'},
 {gx:14,gy:13,lab:'Baule dell\'armeria',goal:'La chiave della cella: cerca nel baule dell\'armeria, a sud del corridoio.',diary:'«La chiave della cella? In armeria, nel baule vicino alle armature.»',start:'Prima la cella: la chiave è nel baule dell\'armeria, a sud del corridoio.',enter:'Il baule vicino alle armature luccica: ecco dov\'è la chiave!'}];

/* ---------------- oggetti di scena ---------------- */
const NOBLOCK=['chair','coil','bench','rum'];       // si attraversano
const TALL=['mast','wardrobe','bookshelf','armor'];   // coprono la vista alle guardie
const PROPS_BY=[
 /* PONTE DI COMANDO */
 [['bed',2,3,2,2],['wardrobe',5,2,2,1],['bookshelf',8,2,2,1],['globe',9,4,1,1],
  ['desk',6,6,3,1,{obj:'desk'}],['chair',7,5,1,1,{d:'d'}],['chest',3,13,1,1,{obj:'k1'}],['chest',9,14,1,1,{plain:1}],
  ['table',7,11,2,1,{t:'dine'}],['chair',6,11,1,1,{d:'r'}],['chair',9,11,1,1,{d:'l'}],['chair',7,10,1,1,{d:'d'}],['chair',8,12,1,1,{d:'u'}],
  ['mast',21,8,1,1],['barrel',13,10,1,1],['barrel',29,6,1,1],['barrel',29,10,1,1],
  ['longtable',16,7,4,2,{t:'council'}],['chair',16,6,1,1,{d:'d'}],['chair',17,6,1,1,{d:'d'}],['chair',18,6,1,1,{d:'d'}],['chair',19,6,1,1,{d:'d'}],['chair',15,7,1,1,{d:'r'}],['chair',20,7,1,1,{d:'l'}],
  ['bunk',13,2,2,1,{c:'#7a8a5a'}],['chest',15,2,1,1,{plain:1}],['bunk',16,2,2,1,{c:'#a8503a'}],['bunk',19,2,2,1,{c:'#5a7a9a'}],['chest',21,2,1,1,{plain:1}],['bunk',22,2,2,1,{c:'#a8503a'}],['bunk',25,2,2,1,{c:'#7a8a5a'}],['chest',27,2,1,1,{plain:1}],['bunk',28,2,2,1,{c:'#5a7a9a'}],
  ['table',20,4,2,1,{t:'dine'}],['chair',19,4,1,1,{d:'r'}],['chair',22,4,1,1,{d:'l'}],['barrel',13,4,1,1],
  ['armor',12,13,1,1],['armor',21,13,1,1],['rack',13,15,2,1],['rack',16,15,2,1,{obj:'sword'}],['rack',19,15,2,1],['table',18,13,2,1,{t:'dine'}],['barrel',12,15,1,1],
  ['maptable',25,14,3,1,{obj:'chart'}],['chair',24,14,1,1,{d:'r'}],['chair',28,14,1,1,{d:'l'}],['bookshelf',29,15,2,1],['bookshelf',23,15,1,1],
  ['mast',35,8,1,1],['barrel',33,3,1,1],['barrel',33,14,1,1],['coil',34,6,1,1],['coil',39,13,1,1],['cannon',33,2,1,1,{d:-1}],['cannon',38,2,1,1,{d:-1}],['cannon',33,15,1,1,{d:1}],['cannon',36,15,1,1,{d:1,obj:'lure'}],['cannon',38,15,1,1,{d:1}],
  ['cannon',42,3,1,1,{d:-1}],['cannon',44,3,1,1,{d:-1}],['barrel',42,14,1,1],['barrel',44,14,1,1],['barrel',45,13,1,1],['coil',43,10,1,1],['chest',14,13,1,1,{plain:1}]],
 /* PONTE DI MEZZO */
 [['bunk',2,4,2,1,{c:'#7a8a5a'}],['bunk',2,6,2,1,{c:'#a8503a'}],['bunk',2,11,2,1,{c:'#5a7a9a'}],['bunk',2,13,2,1,{c:'#a8503a'}],['bunk',7,4,2,1,{c:'#5a7a9a'}],['bunk',7,6,2,1,{c:'#7a8a5a'}],['bunk',7,11,2,1,{c:'#a8503a'}],['bunk',7,13,2,1,{c:'#7a8a5a'}],
  ['table',4,5,2,1,{t:'dine'}],['chair',4,4,1,1,{d:'d'}],['chair',5,6,1,1,{d:'u'}],['chest',5,14,1,1,{obj:'med',med:1}],['barrel',9,2,1,1],
  ['longtable',14,2,3,1,{t:'mess'}],['longtable',20,2,3,1,{t:'mess'}],['longtable',26,2,3,1,{t:'mess'}],['bench',14,3,3,1],['bench',20,3,3,1],['bench',26,3,3,1],['barrel',13,4,1,1],['barrel',30,4,1,1],
  ['mast',21,8,1,1],['barrel',13,10,1,1],['barrel',29,6,1,1],['longtable',23,6,3,1,{t:'dice'}],['chair',23,7,1,1,{d:'u'}],['chair',24,7,1,1,{d:'u'}],['chair',25,7,1,1,{d:'u'}],['coil',15,7,1,1],
  ['stove',13,13,2,1],['table',17,13,2,1,{t:'prep',obj:'recipe'}],['barrel',16,15,1,1],['barrel',17,15,1,1],['barrel',18,15,1,1],['barrel',19,15,1,1,{obj:'k2',red:1}],['sack',21,15,1,1],['sack',21,13,1,1],
  ['barrel',23,13,1,1],['barrel',30,13,1,1],['barrel',23,15,1,1],['barrel',30,15,1,1],['barrel',25,13,1,1],['sack',28,13,1,1],['sack',28,15,1,1],['sack',29,15,1,1],
  ['mast',35,8,1,1],['barrel',33,14,1,1],['cannon',33,2,1,1,{d:-1}],['cannon',38,2,1,1,{d:-1}],['cannon',33,15,1,1,{d:1}],['cannon',36,15,1,1,{d:1,obj:'lure'}],['cannon',38,15,1,1,{d:1}],['coil',34,6,1,1],
  ['barrel',42,14,1,1],['barrel',45,13,1,1],['bucket',43,4,1,1],['bunk',45,5,2,1,{c:'#8a7a56'}],['bunk',45,10,2,1,{c:'#7a6a4e'}],['rum',15,2,1,1]],
 /* LA STIVA */
 [['barrel',2,5,1,1],['barrel',3,5,1,1],['barrel',2,6,1,1],['barrel',8,5,1,1],['barrel',9,5,1,1],['barrel',9,6,1,1],['barrel',2,12,1,1],['barrel',3,12,1,1],['barrel',8,12,1,1],['barrel',9,12,1,1],['barrel',9,11,1,1],['sack',5,3,1,1],['sack',6,3,1,1],['sack',5,14,1,1],['coil',5,9,1,1],
  ['barrel',13,2,1,1],['barrel',14,2,1,1],['barrel',13,3,1,1],['barrel',24,2,1,1],['barrel',25,2,1,1],['barrel',29,3,1,1],['barrel',29,4,1,1],['sack',18,2,1,1],['sack',19,2,1,1],
  ['mast',21,8,1,1],['barrel',13,10,1,1],['barrel',29,6,1,1],
  ['sack',12,6,1,1],['sack',13,6,1,1],['sack',12,7,1,1],['barrel',18,6,1,1],['barrel',19,6,1,1],['sack',18,7,1,1],['coil',23,7,1,1],['bucket',24,6,1,1],['sack',28,7,1,1],['sack',18,11,1,1],['sack',19,11,1,1],['barrel',22,11,1,1],['barrel',23,11,1,1],['coil',28,11,1,1],['bucket',13,11,1,1],
  ['barrel',13,14,1,1,{powder:1}],['barrel',14,14,1,1,{powder:1}],['barrel',13,15,1,1,{powder:1}],['barrel',19,14,1,1,{powder:1}],['barrel',20,14,1,1,{powder:1}],['barrel',20,15,1,1,{powder:1}],
  ['crate',24,14,1,1,{obj:'c0'}],['crate',26,14,1,1,{obj:'c1'}],['crate',28,14,1,1,{obj:'c2'}],['crate',24,15,1,1,{obj:'c3'}],['crate',26,15,1,1,{obj:'c4'}],['crate',28,15,1,1,{obj:'c5'}],['barrel',30,14,1,1],['barrel',30,15,1,1],
  ['mast',35,8,1,1],['cannon',33,15,1,1,{d:1}],['cannon',36,15,1,1,{d:1}],['cannon',38,15,1,1,{d:1}],['barrel',33,3,1,1],['coil',34,6,1,1],
  ['barrel',43,3,1,1],['barrel',44,3,1,1],['barrel',44,13,1,1],['barrel',45,13,1,1],['barrel',42,14,1,1]]
];
const LAMPS_BY=[
 [[9,3],[3,9],[8,13],[14,9],[20,9],[27,9],[14,3],[24,3],[14,14],[27,14],[44,4],[44,13],[35,5],[35,12]],
 [[3,8],[8,8],[14,9],[20,9],[27,9],[18,3],[24,3],[14,14],[27,14],[44,4],[44,13],[35,5],[35,12]],
 [[5,8],[20,9],[27,13],[16,14],[35,5],[35,12],[44,8],[20,3]]];
/* decorazioni sui muri: [tipo, gx, gy] (devono cadere su una cella di muro) */
const DECOR_BY=[
 [['paint',17,1],['flag',23,1],['paint',27,1],['paint',13,5],['map',19,5],['paint',22,5],['flag',29,5],['sconce',11,7],['sconce',11,10],['cross',20,12],['cross',29,12],['paint',17,12],['flag',24,12],['sconce',31,7],['sconce',31,10],['map',22,14],['shelf',22,15],['sconce',40,7],['sconce',40,10],['flag',7,1],['paint',20,1]],
 [['hams',22,1],['pans',17,1],['pans',28,1],['pans',18,12],['pans',20,12],['hams',24,12],['hams',28,12],['sconce',11,7],['sconce',11,10],['cross',17,5],['paint',24,5],['flag',29,5],['chains',40,5],['chains',40,13],['sconce',31,7],['sconce',31,10],['shelf',22,14],['map',13,12]],
 [['net',17,1],['chains',24,1],['chains',31,4],['chains',31,13],['sconce',11,7],['sconce',11,10],['net',17,5],['net',25,5],['sconce',31,7],['sconce',31,10],['sconce',40,7],['sconce',40,10],['cross',13,12]]];
/* dobloni nascosti: [gx, gy] per ponte */
const COINS_BY=[[[4,3],[26,15],[21,14]],[[9,13],[26,15],[46,9]],[[4,13],[30,3],[21,15]]];
/* ---- EDITOR: dati modificabili dell'interno nave (si apre da Novità → Editor interno nave) ---- */
const EXB4=/*@@EXB4@@*/null;
const EXH=q=>{let a=0;for(let i=0;i<q.length;i++)a=(a*31+q.charCodeAt(i))|0;return a};
const exCopy=a=>JSON.parse(JSON.stringify(a));
const EXORG={p:exCopy(PROPS_BY),l:exCopy(LAMPS_BY),d:exCopy(DECOR_BY),c:exCopy(COINS_BY)};
const EXTGT={p:PROPS_BY,l:LAMPS_BY,d:DECOR_BY,c:COINS_BY};
const EXOFF={p:1,l:0,d:1,c:0};
const exEmpty=()=>{const o={};for(const k of['p','l','d','c'])o[k]=[0,1,2].map(()=>({mv:{},del:[],add:[],n:0}));return o};
const EXK4='sm_edx_w4',EXBS=JSON.stringify(EXB4),EXBH=EXH(EXBS);
let EXST=EXB4?JSON.parse(EXBS):exEmpty();
try{const l=JSON.parse(localStorage.getItem(EXK4)||'null');if(l&&l.base===EXBH&&l.st)EXST=l.st}catch(e){}
function exBuild(k,d){
  const org=EXORG[k][d],op=EXST[k][d],off=EXOFF[k],out=[];
  org.forEach((e,i)=>{const id='o'+i;if(op.del.indexOf(id)>=0)return;const c=e.slice(),m=op.mv[id];if(m){c[off]=m[0];c[off+1]=m[1]}out.push({id,e:c})});
  for(const a of op.add)out.push({id:a.id,e:a.e});
  return out;
}
for(const k of['p','l','d','c'])for(let d=0;d<3;d++){const arr=EXTGT[k][d];arr.length=0;for(const o of exBuild(k,d))arr.push(o.e)}
{ // oggetti toccabili dall'editor
  const NAMES={bed:'Letto',wardrobe:'Armadio',bookshelf:'Libreria',globe:'Mappamondo',desk:'Scrivania',chair:'Sedia',chest:'Baule',table:'Tavolo',mast:'Albero',barrel:'Barile',longtable:'Tavolone',bunk:'Cuccetta',armor:'Armatura',rack:'Rastrelliera',maptable:'Tavolo delle mappe',coil:'Corda',cannon:'Cannone',bucket:'Secchio',bench:'Panca',stove:'Fornello',sack:'Sacco',crate:'Cassa',paint:'Quadro',flag:'Bandiera',sconce:'Applique',map:'Mappa',cross:'Spade incrociate',shelf:'Mensola',hams:'Prosciutti',pans:'Pentole',chains:'Catene',net:'Rete',l:'Lanterna',c:'Dobloni nascosti'};
  const ITEMS=[];let seq=0;
  const pos=it=>{const e=it.e;if(it.k==='p'){it.x=(OX+e[1]+e[3]/2)*T;it.y=(OY+e[2]+e[4]/2)*T;it.r=Math.max(e[3],e[4])*T/2+8}else{const o=EXOFF[it.k];it.x=(OX+e[o]+.5)*T;it.y=(OY+e[o+1]+.5)*T;it.r=22}};
  const nid=()=>'a'+(EXST.seq4=(EXST.seq4||0)+1);
  const COL={p:'#7fe0ff',l:'#ffd23a',d:'#ff9fe0',c:'#ffc23a'};
  const mk=(k,d,o)=>{const it={k,deck:d,id:o.id,e:o.e,col:COL[k]};it.lab=NAMES[k==='p'||k==='d'?o.e[0]:k];pos(it);return it};
  for(const k of['p','l','d','c'])for(let d=0;d<3;d++)for(const o of exBuild(k,d))ITEMS.push(mk(k,d,o));
  const cur=()=>(typeof K!=='undefined'&&K&&K.deck)|0;
  const save=()=>{try{localStorage.setItem(EXK4,JSON.stringify({base:EXBH,st:EXST}))}catch(e){}};
  const opOf=it=>EXST[it.k][it.deck];
  const X={tag:'w4',snap:T/2,
    items:()=>ITEMS.filter(i=>i.deck===cur()),
    name:it=>(it.k==='l'?'Lanterna':it.k==='c'?'Dobloni nascosti':(NAMES[it.e[0]]||it.e[0])),
    info:it=>'ponte '+(it.deck+1)+' · cella '+it.e[EXOFF[it.k]]+','+it.e[EXOFF[it.k]+1],
    move(it,nx,ny){
      const e=it.e,o=EXOFF[it.k];
      const gx=it.k==='p'?Math.round(nx/T-OX-e[3]/2):Math.round(nx/T-OX-.5),gy=it.k==='p'?Math.round(ny/T-OY-e[4]/2):Math.round(ny/T-OY-.5);
      if(gx===e[o]&&gy===e[o+1])return;
      e[o]=gx;e[o+1]=gy;pos(it);
      const op=opOf(it);if(it.id[0]==='o')op.mv[it.id]=[gx,gy];
    },
    del(it){const op=opOf(it),i=ITEMS.indexOf(it);if(i>=0)ITEMS.splice(i,1);
      let ad=null,ai=-1;if(it.id[0]==='o')op.del.push(it.id);else{ai=op.add.findIndex(a=>a.id===it.id);if(ai>=0)ad=op.add.splice(ai,1)[0]}
      return()=>{ITEMS.push(it);if(it.id[0]==='o')op.del=op.del.filter(q=>q!==it.id);else if(ad)op.add.push(ad)}},
    dup(it){const op=opOf(it),o=EXOFF[it.k],e=it.e.slice();e[o]+=1;const id=nid();op.add.push({id,e});const n=mk(it.k,it.deck,{id,e});ITEMS.push(n);return n},
    palette:[['Barile','p:barrel:1:1'],['Cassa','p:crate:1:1'],['Sacco','p:sack:1:1'],['Corda','p:coil:1:1'],['Secchio','p:bucket:1:1'],['Sedia','p:chair:1:1'],['Tavolo','p:table:2:1'],['Panca','p:bench:3:1'],['Tavolone','p:longtable:4:1'],['Cuccetta','p:bunk:2:1'],['Baule','p:chest:1:1'],['Armatura','p:armor:1:1'],['Libreria','p:bookshelf:2:1'],['Rastrelliera','p:rack:2:1'],['Fornello','p:stove:2:1'],['Lanterna','l'],['Dobloni','c'],['Quadro (muro)','d:paint'],['Bandiera (muro)','d:flag'],['Applique (muro)','d:sconce']],
    add(key,x,y){
      const d=cur(),a=key.split(':'),k=a[0];let e;
      const gx=Math.round(x/T-OX-.5),gy=Math.round(y/T-OY-.5);
      if(k==='p')e=[a[1],gx,gy,+a[2],+a[3]];else if(k==='d')e=[a[1],gx,gy];else e=[gx,gy];
      const id=nid();EXST[k][d].add.push({id,e});const it=mk(k,d,{id,e});ITEMS.push(it);return it},
    draw(g,z){for(const it of this.items()){if(it.k!=='p')continue;const e=it.e;g.strokeStyle='rgba(127,224,255,.75)';g.lineWidth=2/z;g.strokeRect((OX+e[1])*T+1,(OY+e[2])*T+1,e[3]*T-2,e[4]*T-2)}},
    save,code:()=>JSON.stringify({w:'x4',st:EXST}),reset(){try{localStorage.removeItem(EXK4)}catch(e){}},
    buttons:[{t:'Ponte −',fn(){exDeck(-1)}},{t:'Ponte +',fn(){exDeck(1)}}]
  };
  window.__EDX=X;
}
function exDeck(d){const n=Math.max(0,Math.min(2,K.deck+d));if(n===K.deck)return;try{setDeck(n,20,8,true);UI.toast(DECKN[n],1600)}catch(e){console.warn(e)}}
let PROPS=PROPS_BY[0],LAMPS=LAMPS_BY[0];
const propAt=(tx,ty)=>{const gx=tx-OX,gy=ty-OY;return PROPS.some(p=>gx>=p[1]&&gx<p[1]+p[3]&&gy>=p[2]&&gy<p[2]+p[4]&&TALL.indexOf(p[0])<0)};

/* ---------------- stato ---------------- */
let K=null,SHIPC=null;
const SPR4={};
const DOORS=[];const SALOON={};
/* ---------------- mondo: terreno + blocchi ---------------- */
function setupWorld(){
  // tutta la nave calpestabile, i muri e i mobili bloccano
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++){
    const i=tIdx(OX+x,OY+y),c=G[y][x];
    walkT[i]=(FLOOR.indexOf(c)>=0||c==='D'||c==='L'||c==='H')?1:0;blockT[i]=0;
  }
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++)if(G[y][x]==='#')blockT[tIdx(OX+x,OY+y)]=1;
  DOORS.length=0;
  for(const[ch,id]of[['L','cell'],['H','hold']]){const cells=[];for(let y=0;y<SH;y++)for(let x=0;x<SW;x++)if(G[y][x]===ch)cells.push([x,y]);if(cells.length){DOORS.push({id,cells,open:false});for(const[x,y]of cells)blockT[tIdx(OX+x,OY+y)]=1}}
}
function openDoor(id){const d=DOORS.find(q=>q.id===id);if(!d||d.open)return;d.open=true;for(const[x,y]of d.cells)blockT[tIdx(OX+x,OY+y)]=0}
function closeDoors(){for(const d of DOORS){d.open=false;for(const[x,y]of d.cells)blockT[tIdx(OX+x,OY+y)]=1}}

/* ---------------- grafica: la nave in un'unica immagine ---------------- */
const mkRnd=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const FC={'.':['#cda46a','#c19659'],c:['#b8883a','#a8782e'],q:['#a98258','#9a744c'],k:['#bfae8a','#a69672'],p:['#7a7468','#6b665c'],s:['#8a6a42','#7a5c38'],t:['#b9684a','#a85a40'],a:['#7c8088','#6e727a'],m:['#6a4a30','#5a3e28'],z:['#5a5650','#4e4a46']};
const FDARK={'.':0,c:.1,q:.28,k:.2,p:.42,s:.32,t:.14,a:.3,m:.12,z:.46};
function rrect(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function drawStairs(g,gx,gy,up){
  const x0=gx*T+4,y0=gy*T+6,w=3*T-8,h=2*T-12,N=7,sh=h/N,rw=11;
  // ombra e buca
  g.fillStyle='rgba(0,0,0,.35)';g.fillRect(x0-5,y0-3,w+10,h+10);
  g.fillStyle=up?'#3a2412':'#07040a';g.fillRect(x0,y0,w,h);
  // gradini: in salita chiari verso l'alto, in discesa si perdono nel buio
  for(let i=0;i<N;i++){
    const y=up?y0+h-(i+1)*sh:y0+i*sh,k=i/(N-1);
    let c1,c2;
    if(up){c1=[196-k*20,150-k*18,88-k*14];c2=[120,84,44]}
    else{const d=1-k*.82;c1=[176*d,128*d,72*d];c2=[96*d,64*d,34*d]}
    g.fillStyle='rgb('+(c1[0]|0)+','+(c1[1]|0)+','+(c1[2]|0)+')';g.fillRect(x0+rw,y,w-2*rw,sh*.68);
    g.fillStyle='rgb('+(c2[0]|0)+','+(c2[1]|0)+','+(c2[2]|0)+')';g.fillRect(x0+rw,y+sh*.68,w-2*rw,sh*.32);
    g.fillStyle='rgba(255,236,190,'+(up?.35:.18*(1-k))+')';g.fillRect(x0+rw,up?y:y,w-2*rw,1.6);
    g.strokeStyle='rgba(40,20,8,.45)';g.lineWidth=1;g.beginPath();g.moveTo(x0+w/2,y);g.lineTo(x0+w/2,y+sh*.68);g.stroke()}
  // fianchi in legno con corrimano e pali d'ottone
  for(const sx of[x0,x0+w-rw]){
    g.fillStyle='#5a3618';g.fillRect(sx,y0-2,rw,h+4);
    g.fillStyle='#7a4c22';g.fillRect(sx+(sx===x0?1:3),y0-2,4,h+4);
    g.strokeStyle='#1e0e04';g.lineWidth=2;g.strokeRect(sx,y0-2,rw,h+4);
    g.fillStyle='#e8b84c';g.strokeStyle='#5a3c0a';g.lineWidth=1;
    for(let i=0;i<=3;i++){const py=y0+i*h/3;g.beginPath();g.arc(sx+rw/2,py,3.6,0,7);g.fill();g.stroke()}
    g.strokeStyle='#f6d878';g.lineWidth=2;g.beginPath();g.moveTo(sx+rw/2,y0);g.lineTo(sx+rw/2,y0+h);g.stroke()}
  // cartello freccia sul pianerottolo
  const cx0=x0+w/2,cy0=up?y0+h+1:y0-1;
  g.fillStyle='rgba(255,246,220,.95)';g.strokeStyle='rgba(30,16,6,.85)';g.lineWidth=2;
  const ay=y0+h/2,d=up?-1:1;
  g.beginPath();g.moveTo(cx0,ay+d*11);g.lineTo(cx0-10,ay-d*6);g.lineTo(cx0+10,ay-d*6);g.closePath();g.stroke();g.fill()}
function floorTile(g,ch,x,y,rnd){
  const X=x*T,Y=y*T,col=FC[ch];
  g.fillStyle=col[(x+(ch==='.'?y:0))%2];g.fillRect(X,Y,T,T);
  if(ch==='k'){g.fillStyle=((x+y)%2)?'rgba(255,255,255,.18)':'rgba(0,0,0,.12)';g.fillRect(X,Y,T,T)}
  else if(ch==='t'){
    for(let i=0;i<2;i++)for(let j=0;j<2;j++){g.fillStyle=((i+j+x+y)&1)?'rgba(255,220,180,.10)':'rgba(60,20,10,.10)';g.fillRect(X+i*22,Y+j*22,22,22)}
    g.strokeStyle='rgba(70,32,18,.55)';g.lineWidth=1.6;g.beginPath();g.moveTo(X,Y+22);g.lineTo(X+T,Y+22);g.moveTo(X+22,Y);g.lineTo(X+22,Y+T);g.stroke();
    g.strokeStyle='rgba(255,226,190,.22)';g.lineWidth=1;g.beginPath();g.moveTo(X+1,Y+1);g.lineTo(X+T-1,Y+1);g.moveTo(X+1,Y+1);g.lineTo(X+1,Y+T-1);g.stroke()}
  else if(ch==='a'){
    g.strokeStyle='rgba(20,24,34,.55)';g.lineWidth=1.6;g.beginPath();g.moveTo(X,Y+22);g.lineTo(X+T,Y+22);g.moveTo(X+11,Y);g.lineTo(X+11,Y+22);g.moveTo(X+33,Y+22);g.lineTo(X+33,Y+T);g.stroke();
    g.fillStyle='rgba(255,255,255,.08)';g.fillRect(X+2,Y+2,8,18);
    g.fillStyle='rgba(0,0,0,.09)';for(let i=0;i<3;i++)g.fillRect(X+rnd()*38,Y+rnd()*38,3,2)}
  else if(ch==='m'){
    g.save();g.beginPath();g.rect(X,Y,T,T);g.clip();g.lineWidth=1.4;
    g.strokeStyle='rgba(20,10,2,.4)';for(let i=-4;i<6;i++){g.beginPath();g.moveTo(X+i*11,Y);g.lineTo(X+i*11+T,Y+T);g.stroke()}
    g.strokeStyle='rgba(255,220,160,.13)';for(let i=-4;i<6;i++){g.beginPath();g.moveTo(X+i*11+T,Y);g.lineTo(X+i*11,Y+T);g.stroke()}
    g.restore()}
  else if(ch==='z'){
    const o=((x*5+y*3)%3)*6;g.strokeStyle='rgba(10,10,14,.6)';g.lineWidth=1.8;g.beginPath();g.moveTo(X,Y+22);g.lineTo(X+T,Y+22);g.moveTo(X+10+o,Y);g.lineTo(X+10+o,Y+22);g.moveTo(X+28-o/2,Y+22);g.lineTo(X+28-o/2,Y+T);g.stroke();
    g.fillStyle='rgba(255,255,255,.06)';g.fillRect(X+3,Y+3,9,5)}
  else{
    g.strokeStyle='rgba(60,34,12,.35)';g.lineWidth=1.2;
    for(let i=1;i<4;i++){g.beginPath();g.moveTo(X,Y+i*11);g.lineTo(X+T,Y+i*11);g.stroke()}
    if(ch!=='p'){const o=((x*7+y*13)%3+1)*11;g.strokeStyle='rgba(60,34,12,.28)';g.beginPath();g.moveTo(X+o,Y);g.lineTo(X+o,Y+11);g.moveTo(X+(o+22)%T,Y+22);g.lineTo(X+(o+22)%T,Y+33);g.stroke()}
    if(ch==='c'){g.fillStyle='rgba(255,236,170,.08)';g.fillRect(X,Y,T,11)}}
  if(FDARK[ch]){g.fillStyle='rgba(12,8,24,'+FDARK[ch]+')';g.fillRect(X,Y,T,T)}
}
/* decorazioni appese ai muri */
function drawDecor(g,k,x,y){
  const X=x*T,Y=y*T;g.save();g.lineCap='round';
  if(k==='sconce'){
    const a=X+T/2,b=Y+T/2,gr=g.createRadialGradient(a,b,2,a,b,56);gr.addColorStop(0,'rgba(255,214,120,.5)');gr.addColorStop(1,'rgba(255,214,120,0)');g.fillStyle=gr;g.fillRect(a-56,b-56,112,112);
    g.fillStyle='#241408';g.fillRect(a-8,b+7,16,4);g.fillRect(a-3,b-13,6,6);
    g.fillStyle='#3a2410';g.fillRect(a-8,b-8,16,16);g.fillStyle='rgba(255,226,140,.95)';g.fillRect(a-6,b-6,12,12);g.fillStyle='#fff6c8';g.fillRect(a-2,b-3,4,7)}
  else if(k==='paint'){
    g.fillStyle='#7a5014';g.fillRect(X+6,Y+8,32,28);g.fillStyle='#e0b04a';g.fillRect(X+8,Y+10,28,24);
    const sk=g.createLinearGradient(0,Y+12,0,Y+32);sk.addColorStop(0,'#86c0e4');sk.addColorStop(1,'#e2eef0');g.fillStyle=sk;g.fillRect(X+11,Y+13,22,18);
    g.fillStyle='#2f78a8';g.fillRect(X+11,Y+23,22,8);g.fillStyle='#4a2c18';g.beginPath();g.moveTo(X+14,Y+23);g.lineTo(X+30,Y+23);g.lineTo(X+27,Y+27);g.lineTo(X+17,Y+27);g.closePath();g.fill();
    g.fillRect(X+21,Y+15,1.6,8);g.fillStyle='#fff';g.beginPath();g.moveTo(X+22.6,Y+15);g.lineTo(X+28,Y+22);g.lineTo(X+22.6,Y+22);g.closePath();g.fill()}
  else if(k==='map'){
    g.fillStyle='#d9c48c';g.fillRect(X+5,Y+8,34,28);g.strokeStyle='#7a5a2a';g.lineWidth=2;g.strokeRect(X+5,Y+8,34,28);
    g.strokeStyle='#5a7a4a';g.lineWidth=2;g.beginPath();g.moveTo(X+9,Y+26);g.bezierCurveTo(X+14,Y+14,X+20,Y+30,X+26,Y+18);g.bezierCurveTo(X+30,Y+12,X+34,Y+20,X+35,Y+14);g.stroke();
    g.strokeStyle='#a02a1e';g.lineWidth=1.4;g.setLineDash([3,3]);g.beginPath();g.moveTo(X+11,Y+32);g.lineTo(X+26,Y+24);g.lineTo(X+33,Y+28);g.stroke();g.setLineDash([]);
    g.strokeStyle='#a02a1e';g.lineWidth=2.4;g.beginPath();g.moveTo(X+31,Y+25);g.lineTo(X+36,Y+31);g.moveTo(X+36,Y+25);g.lineTo(X+31,Y+31);g.stroke()}
  else if(k==='flag'){
    g.strokeStyle='#3a2410';g.lineWidth=3;g.beginPath();g.moveTo(X+8,Y+6);g.lineTo(X+8,Y+40);g.stroke();
    for(let i=0;i<3;i++){g.fillStyle=i===1?'#e8b82a':'#b02a22';g.beginPath();g.moveTo(X+8,Y+10+i*8);g.quadraticCurveTo(X+22,Y+6+i*8,X+36,Y+11+i*8);g.lineTo(X+36,Y+19+i*8);g.quadraticCurveTo(X+22,Y+14+i*8,X+8,Y+18+i*8);g.closePath();g.fill()}
    g.fillStyle='#e0b04a';g.beginPath();g.arc(X+8,Y+6,3.4,0,7);g.fill()}
  else if(k==='cross'){
    g.strokeStyle='#d4dbe4';g.lineWidth=3.4;g.beginPath();g.moveTo(X+7,Y+7);g.lineTo(X+37,Y+37);g.moveTo(X+37,Y+7);g.lineTo(X+7,Y+37);g.stroke();
    g.strokeStyle='#e0b04a';g.lineWidth=4;g.beginPath();g.moveTo(X+10,Y+14);g.lineTo(X+16,Y+8);g.moveTo(X+34,Y+14);g.lineTo(X+28,Y+8);g.stroke();
    g.fillStyle='#a02a1e';g.beginPath();g.arc(X+22,Y+22,9,0,7);g.fill();g.strokeStyle='#e0b04a';g.lineWidth=2;g.stroke();g.fillStyle='#e0b04a';g.fillRect(X+21,Y+16,2,12);g.fillRect(X+16,Y+21,12,2)}
  else if(k==='pans'){
    g.fillStyle='#241408';g.fillRect(X+4,Y+7,36,3);
    for(const[px,py,r]of[[12,25,8],[26,27,7],[37,22,5]]){g.strokeStyle='#241408';g.lineWidth=1.4;g.beginPath();g.moveTo(X+px,Y+10);g.lineTo(X+px,Y+py-r);g.stroke();
      g.fillStyle='#7a7a84';g.beginPath();g.arc(X+px,Y+py,r,0,7);g.fill();g.strokeStyle='#2a2a30';g.lineWidth=1.6;g.stroke();g.fillStyle='#3a3a44';g.beginPath();g.arc(X+px,Y+py,r-3,0,7);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.fillRect(X+px-r+2,Y+py-3,3,2)}}
  else if(k==='hams'){
    g.fillStyle='#241408';g.fillRect(X+4,Y+7,36,3);
    for(const[px,py]of[[12,24],[26,26],[37,22]]){g.strokeStyle='#241408';g.lineWidth=1.4;g.beginPath();g.moveTo(X+px,Y+10);g.lineTo(X+px,Y+py-8);g.stroke();
      g.fillStyle='#a8442a';g.beginPath();g.ellipse(X+px,Y+py,7,10,0,0,7);g.fill();g.strokeStyle='#5a1e10';g.lineWidth=1.4;g.stroke();g.fillStyle='rgba(255,200,170,.35)';g.fillRect(X+px-4,Y+py-6,3,8)}
    g.strokeStyle='#8a3a22';g.lineWidth=3;g.beginPath();g.moveTo(X+8,Y+34);g.quadraticCurveTo(X+22,Y+42,X+36,Y+34);g.stroke()}
  else if(k==='chains'){
    for(const px of[14,30]){g.strokeStyle='#8a8f9a';g.lineWidth=2;for(let i=0;i<5;i++){g.beginPath();g.ellipse(X+px,Y+7+i*6,3,4,0,0,7);g.stroke()}
      g.strokeStyle='#5a5f6a';g.lineWidth=3;g.beginPath();g.arc(X+px,Y+39,5,0,7);g.stroke()}
    g.fillStyle='#241408';g.fillRect(X+8,Y+4,28,3)}
  else if(k==='shelf'){
    g.fillStyle='#5a3418';g.fillRect(X+4,Y+30,36,5);g.fillStyle='#8a5a2a';g.fillRect(X+4,Y+30,36,2);
    const cs=['#5aa0c8','#c8603a','#7aa860','#e0b04a'];
    for(let i=0;i<4;i++){g.fillStyle=cs[i];const w=6+(i%2)*2,h=12+(i*5)%7;g.fillRect(X+7+i*9,Y+30-h,w,h);g.fillStyle='rgba(255,255,255,.35)';g.fillRect(X+8+i*9,Y+32-h,2,h-4)}}
  else if(k==='net'){
    g.strokeStyle='#bba070';g.lineWidth=1.4;
    for(let i=-4;i<8;i++){g.beginPath();g.moveTo(X+i*7,Y+4);g.lineTo(X+i*7+30,Y+40);g.stroke();g.beginPath();g.moveTo(X+i*7+30,Y+4);g.lineTo(X+i*7,Y+40);g.stroke()}
    g.fillStyle='#d88a3a';for(const[px,py]of[[10,10],[30,12],[20,30]]){g.beginPath();g.arc(X+px,Y+py,4,0,7);g.fill()}}
  g.restore();
}
function bake(){
  const W=SW*T,H=SH*T,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  const rnd=mkRnd(DK*977+13);
  // ombra sull'acqua
  g.save();g.fillStyle='rgba(4,40,70,.30)';
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++)if(G[y][x]!==' ')g.fillRect(x*T+7,y*T+12,T,T);
  g.restore();
  // scafo (legno scuro) dietro a tutto
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++)if(G[y][x]!==' '){g.fillStyle=(x+y)%2?'#4c3220':'#503624';g.fillRect(x*T,y*T,T,T)}
  const near=(x,y,f)=>{for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]])if(isIn(x+dx,y+dy)&&f(G[y+dy][x+dx]))return true;return false};
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++){
    let ch=G[y][x];if(ch===' ')continue;
    if(ch==='D'||ch==='L'||ch==='H'){
      const nb=[[1,0],[-1,0],[0,1],[0,-1]].map(([dx,dy])=>G[y+dy]&&G[y+dy][x+dx]).filter(q=>q&&FLOOR.indexOf(q)>=0);ch=nb[0]||'.'}
    if(ch==='#')continue;
    floorTile(g,ch,x,y,rnd);
  }
  // soglie di ottone sotto le porte
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++){if(G[y][x]==='D'){const X=x*T,Y=y*T;const horiz=G[y][x-1]==='#'||G[y][x+1]==='#';g.fillStyle='rgba(224,176,74,.7)';if(horiz){g.fillRect(X,Y+T/2-2,T,4)}else{g.fillRect(X+T/2-2,Y,4,T)}}}
  /* ---- tappeti e dettagli del pavimento ---- */
  const runner=(x0,y0,w,h,base,trim)=>{g.fillStyle=base;g.fillRect(x0,y0,w,h);g.strokeStyle=trim;g.lineWidth=3;g.strokeRect(x0+5,y0+5,w-10,h-10);g.strokeStyle='rgba(224,176,74,.5)';g.lineWidth=1.4;g.strokeRect(x0+12,y0+12,w-24,h-24);
    g.fillStyle='rgba(224,176,74,.5)';const n=Math.max(2,Math.floor(w/(h*.9)));for(let i=0;i<n;i++){const px=x0+w*(i+.5)/n,py=y0+h/2;g.beginPath();g.moveTo(px,py-9);g.lineTo(px+9,py);g.lineTo(px,py+9);g.lineTo(px-9,py);g.closePath();g.fill()}
    g.fillStyle='rgba(12,8,24,.1)';g.fillRect(x0,y0,w,h);
    g.strokeStyle='rgba(224,176,74,.7)';g.lineWidth=1.6;for(let i=0;i<Math.floor(h/6);i++){g.beginPath();g.moveTo(x0-5,y0+3+i*6);g.lineTo(x0,y0+3+i*6);g.moveTo(x0+w,y0+3+i*6);g.lineTo(x0+w+5,y0+3+i*6);g.stroke()}};
  if(DK===0){
    runner(3*T,5*T,6*T,7*T,'#8a2a2a','#e0b04a');
    runner(12*T+6,8*T+4,19*T-12,2*T-8,'#7a2230','#e0b04a');
    // tappeto tondo nella sala delle carte
    g.fillStyle='#1f4a66';g.beginPath();g.ellipse(26.5*T,14*T,2.3*T,.85*T,0,0,7);g.fill();g.strokeStyle='#e0b04a';g.lineWidth=2.4;g.stroke();g.strokeStyle='rgba(224,176,74,.5)';g.lineWidth=1.2;g.beginPath();g.ellipse(26.5*T,14*T,2*T,.66*T,0,0,7);g.stroke();
    // tappetino nell'armeria
    runner(14*T,13.6*T,3.4*T,.8*T,'#5a2a2a','#c8a050')
  }
  if(DK===1){
    // tappeto di stracci nel dormitorio
    g.fillStyle='#6a4a3a';g.beginPath();g.ellipse(5.5*T,9*T,2.3*T,1.6*T,0,0,7);g.fill();
    for(let i=0;i<5;i++){g.strokeStyle=['#a8503a','#c8b070','#5a7a9a','#7a8a5a','#a8503a'][i];g.lineWidth=5;g.beginPath();g.ellipse(5.5*T,9*T,(2.1-i*.38)*T,(1.4-i*.26)*T,0,0,7);g.stroke()}
    // paglia, catene e macchie nella cella
    g.strokeStyle='rgba(212,180,90,.7)';g.lineWidth=2;for(let i=0;i<34;i++){const x=(42+rnd()*4)*T,y=(4+rnd()*9)*T;g.beginPath();g.moveTo(x,y);g.lineTo(x+(rnd()-.5)*18,y+(rnd()-.5)*12);g.stroke()}
    g.fillStyle='rgba(30,20,10,.25)';g.beginPath();g.ellipse(43.5*T,6.5*T,26,16,.3,0,7);g.fill();g.beginPath();g.ellipse(44*T,11.5*T,24,14,-.2,0,7);g.fill();
    // chiazze di unto vicino ai fornelli
    g.fillStyle='rgba(30,12,4,.22)';g.beginPath();g.ellipse(14*T,14.3*T,50,14,0,0,7);g.fill();
    // panni sui tavoli della mensa: strisce di tovaglia
  }
  if(DK===2){
    // pozzanghere d'acqua di sentina
    for(const[px,py,rx,ry]of[[38,5,50,22],[16,9.6,70,24],[6,6.5,40,18],[27,3,44,14],[41,11,46,22],[3.6,13.6,38,14]]){
      g.fillStyle='rgba(30,70,100,.38)';g.beginPath();g.ellipse(px*T,py*T,rx,ry,0,0,7);g.fill();g.strokeStyle='rgba(160,210,240,.35)';g.lineWidth=1.6;g.beginPath();g.ellipse(px*T-4,py*T-3,rx*.7,ry*.6,0,3.3,5.8);g.stroke()}
    // contorno dipinto della zona carico
    g.strokeStyle='rgba(240,230,200,.45)';g.lineWidth=3;g.setLineDash([14,10]);g.strokeRect(23.3*T,13.2*T,7.4*T,2.6*T);g.setLineDash([]);
    // pezzi di paglia dalle casse
    g.strokeStyle='rgba(212,180,90,.6)';g.lineWidth=2;for(let i=0;i<26;i++){const x=(23.6+rnd()*6.8)*T,y=(13.3+rnd()*2.4)*T;g.beginPath();g.moveTo(x,y);g.lineTo(x+(rnd()-.5)*14,y+(rnd()-.5)*8);g.stroke()}
    // croce rossa sulla polveriera
    g.strokeStyle='rgba(190,40,30,.55)';g.lineWidth=5;g.beginPath();g.moveTo(15.4*T,13.4*T);g.lineTo(18.6*T,15.6*T);g.moveTo(18.6*T,13.4*T);g.lineTo(15.4*T,15.6*T);g.stroke()
  }
  // scale
  {const st=STAIRS[DK];if(st.d)drawStairs(g,st.d[0]-1,st.d[1]-.5,false);if(st.u)drawStairs(g,st.u[0]-1,st.u[1]-.5,true)}
  // muri: legno più chiaro, bordi e ombra
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++){
    if(G[y][x]!=='#')continue;
    const inner=near(x,y,q=>FLOOR.indexOf(q)>=0||q==='D'||q==='L'||q==='H');
    g.fillStyle=inner?'#6e4628':'#4a2f1a';g.fillRect(x*T,y*T,T,T);
    g.strokeStyle='rgba(20,10,4,.45)';g.lineWidth=1.2;for(let i=1;i<4;i++){g.beginPath();g.moveTo(x*T,y*T+i*11);g.lineTo(x*T+T,y*T+i*11);g.stroke()}
    if(inner){g.fillStyle='rgba(255,230,170,.18)';g.fillRect(x*T,y*T,T,4);
      // pannelli in rilievo
      g.strokeStyle='rgba(255,226,170,.14)';g.lineWidth=1.4;g.strokeRect(x*T+4,y*T+8,T-8,T-14)}
  }
  // zoccolo: fascia scura al piede dei muri interni
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++){
    if(G[y][x]!=='#')continue;
    if(isIn(x,y+1)&&FLOOR.indexOf(G[y+1][x])>=0){g.fillStyle='rgba(40,20,8,.55)';g.fillRect(x*T,y*T+T-7,T,7);g.fillStyle='rgba(224,176,74,.35)';g.fillRect(x*T,y*T+T-8,T,1.6)}}
  // decorazioni
  for(const[k,x,y]of DECOR_BY[DK])if(G[y]&&G[y][x]==='#')drawDecor(g,k,x,y);
  // bordo del pavimento accanto ai muri (ombra morbida)
  for(let y=0;y<SH;y++)for(let x=0;x<SW;x++){
    const ch=G[y][x];if(ch==='#'||ch===' ')continue;
    const n=(dx,dy)=>G[y+dy]&&G[y+dy][x+dx]==='#';
    g.fillStyle='rgba(20,10,4,.28)';
    if(n(0,-1))g.fillRect(x*T,y*T,T,9);
    if(n(-1,0))g.fillRect(x*T,y*T,7,T);
    if(n(1,0))g.fillRect(x*T+T-7,y*T,7,T);
    if(n(0,1))g.fillRect(x*T,y*T+T-5,T,5);
  }
  // cornice dorata del ponte (bordo esterno dello scafo)
  g.strokeStyle='#e0b04a';g.lineWidth=2.5;g.lineCap='round';
  for(const[x,y]of bord){
    if(!isIn(x,y-1))g.beginPath(),g.moveTo(x*T,y*T+2),g.lineTo(x*T+T,y*T+2),g.stroke();
    if(!isIn(x,y+1))g.beginPath(),g.moveTo(x*T,y*T+T-2),g.lineTo(x*T+T,y*T+T-2),g.stroke();
    if(!isIn(x-1,y))g.beginPath(),g.moveTo(x*T+2,y*T),g.lineTo(x*T+2,y*T+T),g.stroke();
    if(!isIn(x+1,y))g.beginPath(),g.moveTo(x*T+T-2,y*T),g.lineTo(x*T+T-2,y*T+T),g.stroke();
  }
  // oblò del cannone lungo lo scafo
  g.fillStyle='#161616';PORTS_BY[DK]=[];for(const[x,y]of bord){if((x*3+y)%4!==0||x<12||x>38)continue;if(!isIn(x,y-1)||!isIn(x,y+1)){g.fillRect(x*T+12,y*T+14,18,12);PORTS_BY[DK].push([x*T+12,y*T+14])}}
  // luci calde delle lanterne
  for(const[lx,ly]of LAMPS){const X=(lx+.5)*T,Y=(ly+.5)*T,gr=g.createRadialGradient(X,Y,4,X,Y,150);gr.addColorStop(0,'rgba(255,214,120,.34)');gr.addColorStop(1,'rgba(255,214,120,0)');g.fillStyle=gr;g.fillRect(X-150,Y-150,300,300)}
  // luce del giorno sul ponte aperto
  if(DK===0){const gr=g.createLinearGradient(32*T,0,40*T,0);gr.addColorStop(0,'rgba(255,248,210,0)');gr.addColorStop(.5,'rgba(255,248,210,.13)');gr.addColorStop(1,'rgba(255,248,210,0)');g.fillStyle=gr;g.fillRect(32*T,2*T,8*T,14*T)}
  // atmosfera delle singole stanze
  const tint=(x0,y0,x1,y1,col)=>{g.fillStyle=col;g.fillRect(x0*T,y0*T,(x1-x0+1)*T,(y1-y0+1)*T)};
  if(DK===0){tint(41,2,46,15,'rgba(20,30,60,.12)');tint(12,13,21,15,'rgba(40,50,70,.08)')}
  if(DK===1){tint(41,2,46,15,'rgba(10,20,50,.22)');tint(12,13,21,15,'rgba(255,150,70,.07)')}
  if(DK===2){tint(12,13,21,15,'rgba(120,10,10,.10)');tint(41,2,46,15,'rgba(5,10,30,.2)')}
  {const tn=[0,.2,.38][DK];if(tn){g.fillStyle='rgba(8,12,40,'+tn+')';g.fillRect(0,0,W,H)}}
  SHIPC=c;
}

/* ---------------- personaggi ---------------- */
function mkSpecs(){
  CH.guardia={name:'Guardia',skin:'#d9a27c',hair:'#2a1a10',coat:'#a02a1e',coat2:'#6a1810',pants:'#2e2a30',shirt:'#eee6d2',hat:'tricorn',hatc:'#1e1e26',trim:'#e0b04a',sword:20,boots:1,mustache:1,w:1.05,tall:1.03};
  CH.pip={name:'Pip',skin:'#e7b48c',hair:'#6a3a1a',coat:'#7a8a5a',coat2:'#566040',pants:'#5a4a3a',shirt:'#e8dcc0',hat:'bandana',hatc:'#8a3a2a',freckles:1,w:.78,tall:.84};
  CH.dodo={name:'Dodo',skin:'#e7ad88',hair:'#5e3418',coat:'#d8d0b8',coat2:'#b0a888',apron:1,pants:'#56503f',shirt:'#ffffff',hat:'bandana',hatc:'#d8d0b8',mustache:1,ladle:1,w:1.22,tall:.95};
  CH.moro={name:'Moro',skin:'#b98560',hair:'#1a1a1a',coat:'#3a5a8a',coat2:'#27406a',pants:'#3a3028',shirt:'#e8dcc0',hat:'bandana',hatc:'#b02a2a',sword:20,stubble:1,w:1.1,tall:1};
  CH.gigi={name:'Gina',skin:'#e0a888',hair:'#7a2a1a',coat:'#7a4a8a',coat2:'#563468',pants:'#3a2e3a',shirt:'#f0e8d0',hat:'bandana',hatc:'#d0a030',sword:18,w:.9,tall:.92};
  CH.zeno={name:'Zeno',skin:'#8a5a3a',hair:'#111111',coat:'#8a6a2a',coat2:'#5e4818',pants:'#2e2a22',shirt:'#e6dfc8',hat:'tricorn',hatc:'#3a2a1a',trim:'#e0b04a',sword:20,boots:1,mustache:1,w:1.08,tall:1.02};
  CH.barba={name:'Barba',skin:'#c8946c',hair:'#3a2a1a',coat:'#6a3a2a',coat2:'#4a2418',pants:'#2e2a30',shirt:'#e8dcc0',hat:'bandana',hatc:'#2a6a4a',sword:20,stubble:1,w:1.12,tall:1.02};
  CH.lupo={name:'Lupo',skin:'#d0a07c',hair:'#8a8a8a',coat:'#3a6a5a',coat2:'#27483e',pants:'#3a3028',shirt:'#eee6d2',hat:'tricorn',hatc:'#1a2a2a',trim:'#cfcfcf',sword:20,boots:1,w:1,tall:1};
  CH.guardiaz=Object.assign({},CH.guardia,{hat:'none',name:'Guardia'});
  CH.comandante={name:'Comandante',skin:'#d9a27c',hair:'#d4d4d8',coat:'#a8281e',coat2:'#6a1810',pants:'#201c24',shirt:'#f4efe0',hat:'comm',hatc:'#6a1418',trim:'#e8c860',sash:'#e8c860',sword:22,boots:1,mustache:1,w:1.12,tall:1.06};
}
function mkChar(who,gx,gy,o){
  const e=ent(Object.assign({id:'c4_'+who+'_'+E.length,type:'c4',k:'char',who,x:cx(gx),y:(OY+gy+.92)*T,ph:Math.random()*6,flip:false,mv:false,wk:0,dir:'f'},o||{}));
  return e;
}
const GP_BY=[
 [[[14,9],[28,9]],[[28,7],[23,7],[23,11],[28,11]],[[33,13],[38,13],[38,10],[33,10]],[[42,4],[45,4],[45,12],[42,12]],[[45,8],[42,8]],[[3,9],[9,9]],[[15,3],[29,3]]],
 [[[14,8],[29,8]],[[29,10],[14,10]],[[33,6],[38,6],[38,12],[33,12]],[[13,14],[21,14]],[[14,4],[28,4]],[[3,9],[9,9]],[[24,14],[29,14]]],
 [[[14,8],[29,8]],[[16,10],[28,10]],[[37,13],[37,7]],[[3,8],[9,8]],[[24,13],[29,13]],[[15,15],[18,15]],[[15,3],[23,3]]]];
const DUELS_BY=[
 [['guardia',16,11,'barba',18,11],['lupo',36,5,'guardia',38,5]],
 [['guardia',4,8,'barba',6,8]],
 [['lupo',33,10,'guardia',35,10]]];
const DECKS=[{},{},{}];
/* guardie fuori servizio: dormono nelle cuccette o giocano a carte; il rumore le sveglia. [tipo, gx, gy, posto dopo il risveglio / ronda] */
const OFF_BY=[
 [['sleep',13,2,[[14,3],[16,3]]],['sleep',25,2,[[26,3],[28,3]]]],
 [['sleep',2,6,[[2,7],[4,7]]],['sleep',7,13,[[8,12],[6,12]]],['cards',20,3,[[20,4],[16,4]]],['cards',22,3,[[22,4],[26,4]]]],
 []];
const CMD_POST=[29,13];     // il comandante spagnolo studia le carte nella sala delle carte (ponte di comando)
const PORTS_BY=[[],[],[]];  // gli oblò lungo lo scafo (dove ogni tanto passa un gabbiano)
function mkGuard(wp,n){return mkChar('guardia',wp[0][0],wp[0][1],{dk:n,guard:1,wp,wi:1,st:'patrol',ko:0,seen:0,hitCd:0,alert:0,wait:0,hp:3,maxhp:3,flash:0,swing:0,fight:null,fightT:0})}
function buildDeckEnts(n,D){
  D.props=[];
  for(const p of PROPS_BY[n]){const[kind,gx,gy,gw,gh,o]=p;
    const e=ent(Object.assign({id:'c4p'+E.length,type:'c4',k:'prop',dk:n,kind,gx,gy,gw,gh,x:(OX+gx+gw/2)*T,y:(OY+gy+gh)*T-3},o||{}));
    if(kind==='rum')e.y+=3;
    e.fp=[OX+gx,OY+gy,gw,gh];D.props.push(e)}
  D.gd=GP_BY[n].map(wp=>mkGuard(wp,n));
  for(const[kind,gx,gy,wp]of OFF_BY[n]){
    const okc=c=>walkT[tIdx(OX+c[0],OY+c[1])]&&!propAt(OX+c[0],OY+c[1]);
    const w=wp.filter(okc);const g=mkGuard(w.length>1?w:[wp[0],wp[0]],n);g.off=kind;g.ph=Math.random()*6;
    if(kind==='sleep'){
      const bp=PROPS_BY[n].find(q=>q[0]==='bunk'&&q[1]===gx&&q[2]===gy);
      g.who='guardiaz';g.bunk=[gx,gy];g.bcol=(bp&&bp[5]&&bp[5].c)||'#a8503a';g.front=wp[0];
      g.x=wx(gx)+T;g.y=wy(gy)+T+4;g.face=Math.PI/2;g.dir='f'}
    else{g.face=-Math.PI/2;g.dir='b'}
    if(K.alarm)wakeOff(g,null,null,true);
    D.gd.push(g)}
  if(n===0){const c=mkGuard([CMD_POST,CMD_POST],n);c.cmd=1;c.who='comandante';c.hp=c.maxhp=6;c.hx=c.x;c.hy=c.y;c.face=-Math.PI/2;c.dir='b';D.gd.push(c)}
  D.duels=DUELS_BY[n].map(([w1,x1,y1,w2,x2,y2])=>[mkChar(w1,x1,y1,{dk:n,duel:1,fixed:1,flip:false,sd:0,friend:w1!=='guardia'?1:0}),mkChar(w2,x2,y2,{dk:n,duel:1,fixed:1,flip:true,sd:1,friend:w2!=='guardia'?1:0})]);
  for(const[a,b]of D.duels){a.mate=b;b.mate=a;a.cd=rr(.3,1);b.cd=rr(.6,1.4);a.sw=b.sw=0}
  D.cap=[];
  if(n===1&&!K.cell){D.cap=[mkChar('pip',44,6,{dk:1,cap:1,flip:false}),mkChar('dodo',44,11,{dk:1,cap:1,flip:true})];for(const c of D.cap)initAlly(c)}
  D.coins=COINS_BY[n].map(([gx,gy],i)=>({id:'d'+n+'_'+i,x:cx(gx),y:cy(gy),got:false}));
  D.objs=objectsFor(n);
}
function initAllyNone(){}
function setDeck(n,gx,gy,first){
  K.deck=n;layout(n);LAMPS=LAMPS_BY[n];PROPS=PROPS_BY[n];setupWorld();
  if(K.cell)openDoor('cell');if(K.hold)openDoor('hold');
  const D=DECKS[n];if(!D.built){D.built=true;buildDeckEnts(n,D)}
  for(const e of D.props)if(NOBLOCK.indexOf(e.kind)<0)blockRect(e.fp[0],e.fp[1],e.fp[2],e.fp[3],1);
  K.gd=D.gd;K.duels=D.duels;K.cap=D.cap;K.objs=D.objs;
  if(!DECKS[n].img){bake();DECKS[n].img=SHIPC}SHIPC=DECKS[n].img;
  P.x=cx(gx);P.y=(OY+gy)*T;cam.x=P.x;cam.y=P.y;K.fx=[];K.field=null;
  const offs=[[-1.3,.9],[0,1.3],[1.3,.9],[-1.9,1.9],[1.9,1.9],[0,2.2],[-.8,2.6],[.8,2.6],[-1.4,-.8],[1.4,-.8]];
  let k=0;
  for(const f of K.fol){f.go=false;f.busy=false;f.fight=null;f.wt=rr(1,3);
    for(let t=0;t<offs.length;t++){const o=offs[(k+t)%offs.length],x=P.x+o[0]*T,y=P.y+o[1]*T;if(inFree(x,y)){f.x=x;f.y=y;break}f.x=P.x;f.y=P.y+4}k++}
  K.tr=[{x:P.x,y:P.y}];
  try{const fd=$('c4fade');if(fd&&!first){fd.style.opacity=1;setTimeout(()=>{fd.style.opacity=0},180)}}catch(e){}
  if(!first)toast(DECKN[n]);
  if(n===0&&!first&&K.t>5){
    if(K.silver>=6&&!K.notes.r3){K.notes.r3=1;say('Nives','Capitano, che bottino! Hanno le tasche piene... e la nave è più bassa sull\'acqua!',5600);say('Tito','Pronti a mollare gli ormeggi appena siete a bordo.',4600)}
    else if(K.silver>0&&!K.notes.r2&&!K.notes.r3){K.notes.r2=1;say('Nives','Argento? Ne basta anche poco, ma più ne portiamo meglio è!',5200)}
    else if(K.cell&&!K.notes.r1&&!K.silver){K.notes.r1=1;say('Tito','Pip e Dodo sono liberi, bene! Ora manca l\'argento, giù nella stiva.',5200)}
  }
}
function takeStairs(dir){
  const n=K.deck+(dir==='d'?1:-1);if(n<0||n>2)return;
  sfx('ok');const st=STAIRS[n],al=dir==='d'?st.u:st.d;
  setDeck(n,al[0],al[1]+(dir==='d'?-1.1:1.7));
}

/* ---------------- logica ---------------- */
function allies(){return K.stay?K.fol.concat(K.stay.filter(e=>e.dk===K.deck)):K.fol}
function initAlly(f){Object.assign(f,{ally:1,hp:3,maxhp:3,downT:0,hitCd:rr(0,.8),swing:0,flash:0,busy:false,tgt:null,sdir:1})}
function inFree(x,y){return boxFree(x,y,9,5)}
function leafD(x,y){ // distanza minima dalle ante saloon del ponte corrente
  let m=1e9;const pre=K.deck+':';
  for(const k in SALOON){const q=SALOON[k];if(!q||!q.seg||k.indexOf(pre)!==0)continue;const[ax,ay,bx,by]=q.seg,vx=bx-ax,vy=by-ay;
    const u=Math.max(0,Math.min(1,((x-ax)*vx+(y-ay)*vy)/(vx*vx+vy*vy||1)));m=Math.min(m,Math.hypot(x-ax-vx*u,y-ay-vy*u))}
  return m}
window.__leafHit=(x,y)=>{try{return !window.__noLeaf&&!!K&&!K.over&&leafD(x,y)<9}catch(e){return false}};
function moveEnt(e,dx,dy,r){r=r||9;
  if(inFree(e.x+dx,e.y+dy)){e.x+=dx;e.y+=dy;return true}
  if(dx&&inFree(e.x+dx,e.y)){e.x+=dx;return true}
  if(dy&&inFree(e.x,e.y+dy)){e.y+=dy;return true}
  return false}
function los(ax,ay,bx,by){
  const d=Math.hypot(bx-ax,by-ay),n=Math.ceil(d/18);
  for(let i=1;i<n;i++){const x=ax+(bx-ax)*i/n,y=ay+(by-ay)*i/n,tx=Math.floor(x/T),ty=Math.floor(y/T);if(!inMap(tx,ty)||blockT[tIdx(tx,ty)]>0&&!propAt(tx,ty)||!walkT[tIdx(tx,ty)])return false}
  return true}
function bfsField(){K.field=bfsFrom(P.x,P.y)}
function bfsFrom(px,py){
  const W=MW,H=MH,tx=Math.floor(px/T),ty=Math.floor(py/T),f=new Int16Array(W*H).fill(-1),q=[tx+ty*W];f[q[0]]=0;
  for(let h=0;h<q.length;h++){const i=q[h],x=i%W,y=(i/W)|0;
    for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){
      const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=W||ny>=H)continue;const j=ny*W+nx;if(f[j]>=0||!walkT[j]||blockT[j])continue;
      if(dx&&dy&&(blockT[y*W+nx]||blockT[ny*W+x]||!walkT[y*W+nx]||!walkT[ny*W+x]))continue;
      f[j]=f[i]+1;q.push(j)}}
  return f}
function nextStep(e){return nextStepF(e,K.field)}
function nextStepF(e,f){
  if(!f)return null;const W=MW,tx=Math.floor(e.x/T),ty=Math.floor(e.y/T);let best=null,bv=f[tx+ty*W]>=0?f[tx+ty*W]:1e9;
  for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const nx=tx+dx,ny=ty+dy,j=nx+ny*W;if(f[j]<0)continue;if(dx&&dy&&(blockT[ty*W+nx]||blockT[ny*W+tx]))continue;if(f[j]<bv){bv=f[j];best=[(nx+.5)*T,(ny+.5)*T]}}
  return best}
function say(who,txt,ms){K.say.push({who,txt,ms:ms||5200})}
function sayNow(){
  const d=$('c4say');
  if(K.sayT>0){K.sayT-=K.dt;if(K.sayT<=0)d.style.display='none';return}
  if(!K.say.length)return;const s=K.say.shift();
  d.innerHTML='';const b=document.createElement('b');b.textContent=(s.who==='Biscotto'?'🦜 '+pn('Biscotto'):s.who)+': ';d.appendChild(b);d.appendChild(document.createTextNode('«'+pn(s.txt)+'»'));d.style.display='block';K.sayT=s.ms/1000;K.lastSay=K.t;
  if(s.who==='Biscotto'&&AU.ctx&&AU.on)sfx('cra');
}
function dirName(dx,dy){const a=Math.atan2(dy,dx)*180/Math.PI,n=['a est','a sud-est','a sud','a sud-ovest','a ovest','a nord-ovest','a nord','a nord-est'];return n[((Math.round(a/45)%8)+8)%8]}
function stairsGoal(want){const d=want>K.deck?'d':'u',st=STAIRS[K.deck][d];return[cx(st[0]),(OY+st[1])*T,want>K.deck?'Scendi: la scala è nel ponte aperto, vicino al grande albero a prua.':'Sali: la scala è nel ponte aperto, vicino al grande albero a prua.']}
function goalDeck(){if(!K.key1)return 0;if(!K.cell||!K.key2)return 1;if(!K.hold||K.silver<6)return 2;return 0}
function goal(){
  const want=goalDeck();if(K.deck!==want)return stairsGoal(want);
  if(!K.key1){const ks=KEYSP[K.keyAt];return[cx(ks.gx),cy(ks.gy+1),ks.goal]}
  if(!K.cell)return[cx(39),cy(8.5),'La cella dei prigionieri è a prua, oltre il ponte aperto.'];
  if(!K.key2)return[cx(19),cy(15),'Ora serve la chiave della stiva: la cambusa è a sud del corridoio.'];
  if(!K.hold)return[cx(26),cy(12),'La porta della stiva è nel corridoio, lato sud.'];
  if(K.silver<6)return[cx(26),cy(14),'L\'argento è nella stiva: prendi quel che puoi.'];
  return[cx(35),cy(2),'Via! La passerella verso la Sirena è a nord, sul ponte aperto.']}
function objText(){
  if(!K.key1)return'Trova la chiave della cella';
  if(!K.cell)return'Libera Pip e Dodo';
  if(!K.key2)return'Trova la chiave della stiva';
  if(!K.hold)return'Apri la stiva';
  if(K.silver<6)return'Prendi l\'argento ('+K.silver+'/6)';
  return'Torna sulla Sirena'}

function progress(){K.lastProg=K.t;K.parN=Math.max(K.parN,14)}
function triggerAlarm(){
  K.alarm=true;
  [0,.4,.8,1.2].forEach(d=>{tone(1318,1280,.5,'triangle',.2,d);tone(2640,2600,.4,'sine',.07,d)});
  toast('Qualcuno ha suonato la campana d\'allarme!',4800);
  say('Nives','La campana! Ci hanno sentiti: tutti in allerta!',4800);
  say('Biscotto','Ora le guardie corrono più veloci e vedono più lontano. Scappate verso la passerella!',6200);
  for(const D of DECKS)for(const g of(D.gd||[]))if(g.off&&g.ko<=0)wakeOff(g,P.x,P.y);
  for(const g of K.gd){if(g.ko>0||g.st==='chase'||(g.cmd&&!g.duel))continue;g.st='search';g.sx=P.x;g.sy=P.y;g.sw=0;g.alert=0;g.mv=false}
}
function fireLure(gx){
  if((K.lureCd||0)>0)return toast('Il cannone è ancora caldo: aspetta un attimo.');
  K.lureCd=18;const X=cx(gx);sfx('thunder');K.fx.push({k:'boom',x:X,y:cy(15)-26,t:0,life:.9});
  noiseAt(X,cy(14),900,null);
  for(const g of K.gd)if(g.st==='suspect'&&g.sx===X)g.st='search';
  progress();
  if(!K.notes.lure){K.notes.lure=1;say('Tito','BUM! Che bella idea, Capitano: le guardie correranno a vedere!',5200);say('Biscotto','Intanto filiamo dall\'altra parte!',4200)}
}
/* bottiglia di rum: secondo diversivo, silenzioso ma le guardie ci restano a lungo */
function takeRum(){
  K.rum=1;K.rumTaken=true;progress();sfx('pick');
  toast('Hai preso la bottiglia di rum! Premi «Lancia»: le guardie correranno a vedere.',5200);
  say('Biscotto','Rum! Lanciala lontano: le guardie vanno a controllare e si fermano a bere.',5600)}
function throwRum(){
  if(!K||!K.rum||K.over||PAUSED)return;
  const fx=K.fdx||1,fy=K.fdy||0,n0=Math.hypot(fx,fy)||1,dx=fx/n0,dy=fy/n0;
  let x=P.x,y=P.y;
  for(let d=20;d<=380;d+=10){const nx=P.x+dx*d,ny=P.y+dy*d,tx=Math.floor(nx/T),ty=Math.floor(ny/T);
    if(!inMap(tx,ty)||!walkT[tIdx(tx,ty)]||blockT[tIdx(tx,ty)]>0)break;x=nx;y=ny}
  for(let k=0;k<8&&!inFree(x,y);k++){x-=dx*12;y-=dy*12}
  if(Math.hypot(x-P.x,y-P.y)<70){toast('Lì davanti c\'è un ostacolo: girati verso un po\' di spazio libero.',3200);return}
  K.rum=0;progress();
  if(AU.ctx&&AU.on)noiseBurst(.18,900,.12);
  K.fx.push({k:'bot',x0:P.x,y0:P.y-34,x1:x,y1:y-4,t:0,life:.42});
  K.fx.push({k:'glass',x,y,t:-.42,life:1.5});
  setTimeout(()=>{if(AU.ctx&&AU.on){noiseBurst(.16,3400,.22);tone(2100,1500,.09,'triangle',.07);tone(2800,2000,.06,'triangle',.05,.06)}},420);
  noiseAt(x,y,560,null);
  let n=0;for(const g of K.gd)if(g.st==='suspect'&&g.sx===x&&g.sy===y){g.dwell=7;n++}
  if(!K.notes.rum){K.notes.rum=1;say('Tito',n?'Ha funzionato! Le guardie vanno a vedere... e a bere.':'Peccato: nessuna guardia qui vicino. Tienine una per la prossima volta!',4800)}}
/* oggetti usabili */
function objectsFor(n){
  const L=[];
  const o=(id,x,y,label,use,on)=>L.push({id,x,y,label,use,on:on||(()=>true)});
  const sx=cx(37),sy=(OY+11)*T-10;
  if(n===0){
    o('desk',cx(7),cy(7),'Scrivania',()=>{
      if(!K.readDesk){K.readDesk=true;progress();say('Diario',"«La chiave della stiva la tiene il cuoco, nel barile col tappo rosso. Non la perdo mai di vista.»",7000);say('Biscotto','Barile col tappo rosso: la cambusa, sul ponte di mezzo! E la stiva è ancora più giù.',6200);if(K.keyAt!==0&&!K.key1)say('Diario',KEYSP[K.keyAt].diary,6400)}
      else say('Diario',KEYSP[K.keyAt].diary,5200)});
    KEYSP.forEach((ks,i)=>o('k1_'+i,cx(ks.gx),cy(ks.gy+1),ks.lab,()=>{
      if(K.key1)return toast('Il baule è vuoto.');
      if(K.keyAt!==i){sfx('tap');toast(pick(['Solo stracci e biscotti secchi: la chiave non c\'è.','Qui dentro: calzini e una pipa. Nessuna chiave.','Vuoto! La chiave sarà in un altro posto.']),3400);return}
      K.key1=true;progress();sfx('quest');toast('Hai la chiave della cella!');say('Tito','La cella è a prua, sul ponte di mezzo: scendiamo dalla scala nel ponte aperto.',6200)}));
    o('exit',cx(35),cy(2)-8,'Passerella',()=>leave(),()=>true);
    o('sd',sx,sy,'Scala: scendi',()=>takeStairs('d'));
    o('sword',wx(17),(OY+15)*T-6,'Rastrelliera',()=>{K.sword=true;progress();sfx('quest');toast('Sciabola spagnola! Ora ogni colpo vale doppio.');say('Tito','Quella sì che taglia! Due colpi e una guardia è a terra.',5200)},()=>!K.sword);
    o('chart',cx(26),(OY+14)*T-6,'Carta delle ronde',()=>{K.routesT=50;progress();sfx('ok');toast('Hai memorizzato le ronde: per 50 secondi vedi i percorsi e lo sguardo delle guardie.',5200);if(!K.notes.chart){K.notes.chart=1;say('Biscotto','Le linee tratteggiate sono i loro percorsi. Il ventaglio rosso è quello che vedono!',5800)}});
    o('plan',cx(18),(OY+9)*T-8,'Tavolo del consiglio',()=>{
      if(!K.readPlan){K.readPlan=true;progress();say('Rapporto','«Argento al sicuro nella stiva, sotto chiave. Se qualcuno lo tocca: suonare la campana e svegliare tutti.»',7200);say('Biscotto','Una campana! Appena prendiamo il primo argento scatta l\'allarme: scegliete bene il momento!',6400)}
      else say('Rapporto','«Turni di guardia: due uomini per ponte, più la ronda di prua.»',4800)});
    o('lure36',cx(36),(OY+15)*T-6,'Cannone',()=>fireLure(36));
    o('duel',cx(CMD_POST[0]),cy(CMD_POST[1]+1),'Sfida il comandante',()=>startDuel(),()=>{const c=K.gd.find(g=>g.cmd);return !!c&&c.ko<=0&&!c.duel});
  }
  if(n===1){
    o('rum',cx(15),cy(3),'Bottiglia di rum',()=>takeRum(),()=>!K.rum&&!K.rumTaken);
    o('su',cx(37),(OY+11)*T-10,'Scala: sali',()=>takeStairs('u'));
    o('sd',cx(37),(OY+4)*T-10,'Scala: scendi',()=>takeStairs('d'));
    o('med',cx(5),(OY+14)*T-6,'Cassetta del medico',()=>{
      if(K.medUsed)return toast('La cassetta è vuota: hai già preso tutto.');
      K.medUsed=true;K.maxhp++;K.hp=K.maxhp;for(const f of allies()){f.hp=f.maxhp;f.downT=0}progress();sfx('quest');toast('Bende e rum medicinale: un cuore in più e tutti in forma!');
      say('Nives','Benissimo, Capitano. Ora resisti a qualche sciabolata in più!',5000)},()=>!K.medUsed);
    o('recipe',wx(18),(OY+14.35)*T,'Pentola di stufato',()=>{
      if(K.stew)return toast('La pentola è vuota. Dodo sarebbe orgoglioso!');
      K.stew=true;K.hp=K.maxhp;progress();sfx('eat');toast('Stufato caldo: vita al massimo!');
      say('Biscotto','Che profumo! Mangia finché è caldo.',5200)},()=>!K.stew);
    o('dice',cx(24),(OY+8)*T-8,'Dadi',()=>{const a=1+((Math.random()*6)|0),b=1+((Math.random()*6)|0);sfx('tap');toast('Tiri i dadi: '+a+' e '+b+(a===b?' — doppio! Fortuna da pirata.':'.'),3600)});
    o('lure36',cx(36),(OY+15)*T-6,'Cannone',()=>fireLure(36));
    o('cell',cx(39.4),cy(8.5),'Cella',()=>{
      if(K.cell)return;if(!K.key1){toast('È chiusa a chiave.');say('Biscotto','La chiave! Ci serve la chiave, non il pugno.');return}
      K.cell=true;openDoor('cell');progress();sfx('quest');K.pris=2;
      const wait=[[34,12],[37,13]];K.cap.forEach((c,i)=>{c.cap=0;initAlly(c);c.dk=0;c.stay=1;c.px=null;c.x=cx(wait[i%2][0]);c.y=cy(wait[i%2][1]);K.stay.push(c)});
      toast('Pip e Dodo sono liberi: vi aspettano alla passerella!',4200);
      say('Pip','Capitano! Sapevo che saresti venuto!');say('Dodo','Ho ancora il cucchiaio! E so dov\'è la cambusa: qui sul ponte, a sud del corridoio.',6200)},()=>!K.cell);
    o('k2',cx(19),cy(16),'Barile col tappo rosso',()=>{if(K.key2)return toast('Il barile è vuoto.');K.key2=true;progress();sfx('quest');toast('Hai la chiave della stiva!');say('Nives','La stiva è sul ponte più basso. Scendiamo dalla scala, in fondo al ponte aperto!',6200)},()=>!K.key2);
  }
  if(n===2){
    o('su',cx(37),(OY+4)*T-10,'Scala: sali',()=>takeStairs('u'));
    o('hold',cx(26),cy(11.4),'Stiva',()=>{
      if(K.hold)return;if(!K.key2){toast('La stiva è chiusa a chiave.');return}
      K.hold=true;openDoor('hold');progress();sfx('quest');say('Nives','Quanto argento... Prendiamone quanto reggono le braccia!')},()=>!K.hold);
    for(let i=0;i<6;i++){const gx=[24,26,28,24,26,28][i],gy=[14,14,14,15,15,15][i];
      o('c'+i,cx(gx),cy(gy)+8,'Cassa d\'argento',()=>{if(!K.hold||K['c'+i])return;K['c'+i]=true;K.silver++;progress();sfx('coin');toast('Cassa d\'argento! ('+K.silver+'/6)');
        if(K.silver===1&&!K.alarm)triggerAlarm();
        if(K.silver===6)say('Biscotto','Basta così, la nave si abbassa! Risali fino al ponte aperto, poi via dalla passerella!',6200)},()=>K.hold&&!K['c'+i])}
  }
  return L}

function nearObj(){let b=null,bd=1e9;for(const o of K.objs){if(!o.on())continue;const d=Math.hypot(o.x-P.x,o.y-P.y);if(d<86&&d<bd){bd=d;b=o}}
  for(const f of allies()){if(f.hp>0)continue;const d=Math.hypot(f.x-P.x,f.y-P.y);if(d<82&&d<bd){bd=d;b={id:'help',x:f.x,y:f.y-6,label:'Aiuta '+CH[f.who].name,on:()=>true,use:()=>{f.hp=2;f.downT=0;f.hitCd=1;sfx('ok');K.helped=(K.helped||0)+1;K.fx.push({k:'star',x:f.x,y:f.y-50,t:0,life:.9});say(f.who==='tito'?'Tito':CH[f.who].name,pick(['Grazie, Capitano! Ho preso una bella botta.','Ci sono di nuovo! Grazie.','Un graffio... grazie della mano.']),3600)}}}}
  return b}
function useBtn(){if(!K||K.over||PAUSED)return;const o=nearObj();if(!o){if(K.rum)return throwRum();toast('Non c\'è niente da usare qui.');return}o.use()}
function attack(){
  if(!K||K.over||PAUSED||K.atk>0||K.parry)return;K.atk=.5;K.swingT=.32;K.fx.push({k:'slash',x:P.x,y:P.y,dx:K.fdx,dy:K.fdy,t:0,life:.25});
  if(AU.ctx&&AU.on){noiseBurst(.1,500,.3)}
  for(const dl2 of K.duels)for(const q of dl2){if(q.ko>0||q.friend||!q.duel)continue;const dx=q.x-P.x,dy=q.y-P.y,d=Math.hypot(dx,dy);
    if(d<96&&(dx*K.fdx+dy*K.fdy)/(d||1)>-.2)hitDuel(q,dx/(d||1),dy/(d||1))}
  for(const g of K.gd){if(g.ko>0)continue;const dx=g.x-P.x,dy=g.y-P.y,d=Math.hypot(dx,dy);
    if(d<96&&(dx*K.fdx+dy*K.fdy)/(d||1)>-.2){
      const behind=!g.cmd&&(!!g.off||g.st!=='chase'&&!(g.react>0)&&Math.abs(AD(g.face==null?0:g.face,Math.atan2(P.y-g.y,P.x-g.x)))>1.9);
      if(behind){hitGuard(g,9,dx/(d||1),dy/(d||1));K.back=(K.back||0)+1;if(!K.notes.back){K.notes.back=1;say('Biscotto','Colpo alle spalle! Se non ti vedono, basta un colpo solo.',5400)}}
      else hitGuard(g,K.sword?2:1,dx/(d||1),dy/(d||1));
      if(g.ko<=0&&g.st!=='chase'){g.st='chase';g.alert=3.5}
      if(!K.notes.ko){K.notes.ko=1;say('Biscotto','Resistono a più colpi! Colpiscili ancora, o fatti aiutare dalla ciurma.',5600)}}}
  for(const g of K.gd)if(g.off&&g.ko<=0&&Math.hypot(g.x-P.x,g.y-P.y)<130)wakeOff(g,P.x,P.y);   // la sciabola che fende l'aria sveglia chi dorme
}
function hitDuel(q,nx,ny){
  q.hp=(q.hp==null?3:q.hp)-(K.sword?2:1);q.flash=.25;sfx('thud');K.fx.push({k:'spark',x:q.x,y:q.y-34,t:0,life:.3});
  if(q.hp<=0){q.ko=1e9;q.sw=0;K.kos++;K.fx.push({k:'star',x:q.x,y:q.y-70,t:0,life:.9});
    const m=q.mate;if(m&&m.friend&&m.duel){m.duel=0;m.fixed=0;m.friend=0;initAlly(m);K.stay.push(m);sfx('ok');say(CH[m.who].name,pick(['Grazie, Capitano! Quel casacca rossa mi teneva bloccato da ore.','Libero! Resto di guardia qui, andate pure.','Uno contro uno non finiva più... grazie della mano!']),4600)}
    if(!K.notes.dd){K.notes.dd=1;say('Biscotto','Bravo! Quello con la bandana era dei nostri: ora vi dà una mano.')}}
  else{q.cd=Math.min(q.cd,.4);q.sw=.34}
}
function hitGuard(g,n,nx,ny){
  g.hp-=n;g.flash=.25;g.hitCd=Math.max(g.hitCd,.7);sfx('thud');moveEnt(g,nx*16,ny*16);if(!g.cmd)noiseAt(g.x,g.y,300,g);
  K.fx.push({k:'spark',x:g.x,y:g.y-34,t:0,life:.3});
  if(g.hp<=0){g.ko=1e9;g.st='ko';g.fight=null;K.kos++;if(g.cmd)duelWon(g);K.fx.push({k:'star',x:g.x,y:g.y-70,t:0,life:.9});if(!K.notes.down){K.notes.down=1;say('Biscotto','A terra! Non si rialza più.')}}
}
function starRes(){const a=K.pris>=2,b=K.silver>=6,c=!!K.alarm&&!K.chasedPre;return{a,b,c,n:(a?1:0)+(b?1:0)+(c?1:0)}}
function starHtml(R,first){
  const md=R.n>=3?['g','Medaglia d\'oro']:R.n===2?['s','Medaglia d\'argento']:R.n===1?['b','Medaglia di bronzo']:['n','Nessuna medaglia'];
  const rows=[[R.a,'Pip e Dodo sono salvi','Libera Pip e Dodo dalla cella'],[R.b,'Sei casse d\'argento prese','Casse d\'argento: '+K.silver+' su 6'],[R.c,'Mai inseguiti prima della campana',K.alarm?'Ti hanno inseguito prima della campana':'Prendi l\'argento senza farti inseguire']];
  return '<div class="c4st"><i id="c4s0">★</i><i id="c4s1">★</i><i id="c4s2">★</i></div><div class="c4md '+md[0]+'">'+md[1]+'</div><ul class="c4ls">'+rows.map(r=>'<li class="'+(r[0]?'ok':'')+'">'+(r[0]?r[1]:r[2])+'</li>').join('')+'</ul>'+(first?'<div class="c4nw">🎩 Nuovo nel guardaroba: Cappello da comandante</div>':'')+(K.duelWon?'<div class="c4nw">⚔ Duello vinto col comandante'+(K.duelFirst?': nuova giubba nel guardaroba':'')+'</div>':'')}
function starReveal(n){
  for(let i=0;i<n;i++)setTimeout(()=>{const e=$('c4s'+i);if(e){e.classList.add('on');if(AU.ctx&&AU.on)tone(660+i*220,880+i*220,.16,'triangle',.12)}},500+i*430);
  setTimeout(()=>sfx(n>=3?'quest':'ok'),500+n*430)}
function leave(){
  if(K.over)return;
  try{if(K.silver>0)localStorage.setItem('sm_gal','1')}catch(e){}   // il bottino sbloccherà un cappello nel guardaroba
  const R=starRes();let best=0;try{best=+(localStorage.getItem('sm_c4star')||0)||0}catch(e){}
  const first=R.n>=3&&best<3;K.stars=R.n;
  try{if(R.n>best)localStorage.setItem('sm_c4star',String(R.n))}catch(e){}   // tre stelle: cappello da comandante
  K.over=true;
  if(K.carry){
    try{const c0=K.carry;localStorage.setItem('sm_c34r',JSON.stringify({silver:(c0.silver||0)+K.silver,pris:K.pris||c0.pris||0,hull:c0.hull,max:c0.max,kills:(c0.kills||0)+K.kos,t:c0.t,stars:R.n}));localStorage.removeItem('sm_c34')}catch(e){}
    const ttl=R.n>=3?'Assalto perfetto!':R.n===2?'Bel colpo!':R.n===1?'Tutti sulla passerella!':'Via, via, via!';
    $('endCard').innerHTML='<div class="seas"><b>Nave spagnola</b><span>Assalto · risultato</span></div><h2>'+ttl+'</h2>'+starHtml(R,first)+'<div class="row"><button class="btn gold" id="eGo">Torna sulla Sirena</button></div>';
    $('eGo').onclick=()=>{$('eGo').disabled=true;setTimeout(()=>{try{__go('#w3')}catch(e){}location.reload()},120)};
    uShow('endcard',true);starReveal(R.n);return}
  const full=K.cell&&K.silver>=1;
  const bad=!K.cell?'Pip e Dodo sono ancora prigionieri.':K.silver===0?'La stiva è rimasta piena d\'argento.':'';
  const title=K.cell&&K.silver>=6?'Colpo perfetto':K.cell&&K.silver>0?'Bottino e salvataggio':K.cell?'Solo salvataggio':K.silver>0?'Solo argento':'Niente da portare a casa';
  $('endCard').innerHTML='<div class="seas"><b>Nave spagnola</b><span>Mappa interna · bozza giocabile</span></div><h2>'+title+'</h2><p>'+(bad||'Tutti sulla passerella: la Sirena può sciogliere le vele.')+'</p>'+starHtml(R,first)+'<div class="stats"><div><b>'+K.pris+'/2</b>prigionieri</div><div><b>'+K.silver+'/6</b>casse d\'argento</div><div><b>'+K.dob+'/9</b>dobloni d\'oro</div><div><b>'+K.kos+'</b>guardie a terra</div><div><b>'+(K.back||0)+'</b>colpi alle spalle</div><div><b>'+K.caught+'</b>volte catturato</div></div><div class="row"><button class="btn gold" id="eGo">Riprova</button><button class="btn" id="eBack">Torna a bordo</button></div>';
  $('eGo').onclick=()=>{location.reload()};
  $('eBack').onclick=()=>{uShow('endcard',false);K.over=false;P.y+=26};
  uShow('endcard',true);starReveal(R.n);
}
function setParry(v){
  if(!K)return;v=!!v&&!K.over&&!PAUSED;if(!!K.parry===v)return;K.parry=v;K.parT=0;
  const b=$('c4par');if(b)b.classList.toggle('on',v);
  if(v){ // si gira verso la guardia più vicina che sta attaccando
    let best=null,bd=230;for(const g of K.gd){if(g.ko>0||g.st!=='chase')continue;const d=Math.hypot(g.x-P.x,g.y-P.y);if(d<bd){bd=d;best=g}}
    if(best){const a=Math.atan2(best.y-P.y,best.x-P.x);K.fdx=Math.cos(a);K.fdy=Math.sin(a);if(Math.abs(K.fdx)>.12)P.flip=K.fdx<0}
    if(AU.ctx&&AU.on)tone(520,640,.07,'triangle',.06)}
}
function parryBlocks(g){ // la parata copre il davanti (circa 150°)
  if(!K.parry)return false;const a=Math.atan2(g.y-P.y,g.x-P.x),f=Math.atan2(K.fdy,K.fdx);return Math.abs(AD(a,f))<1.35}
function hurtP(g){
  if(K.inv>0)return;
  if(parryBlocks(g)){
    K.parN2=(K.parN2||0)+1;sfx('thud');if(AU.ctx&&AU.on){noiseBurst(.07,2600,.2);tone(1500,900,.09,'square',.07)}
    const dx=g.x-P.x,dy=g.y-P.y,d=Math.hypot(dx,dy)||1;
    K.fx.push({k:'spark',x:(P.x+g.x)/2,y:P.y-30,t:0,life:.3});K.fx.push({k:'spark',x:(P.x+g.x)/2,y:P.y-36,t:0,life:.25});
    moveEnt(g,dx/d*30,dy/d*30);g.hitCd=Math.max(g.hitCd||0,K.parT<.35?1.7:.9);
    if(K.parT<.35){g.flash=.3;K.fx.push({k:'star',x:g.x,y:g.y-60,t:0,life:.8});if(!K.notes.perf){K.notes.perf=1;say('Biscotto','Parata perfetta! Se premi appena prima del colpo, la guardia resta spiazzata.',5600)}}
    else if(!K.notes.par){K.notes.par=1;say('Biscotto','Parato! Ma solo davanti: se ti colpiscono di lato o alle spalle, fa male.',5200)}
    return}
  K.hp--;K.inv=1.8;sfx('thud');
  const dx=P.x-g.x,dy=P.y-g.y,d=Math.hypot(dx,dy)||1;moveEnt(P,dx/d*46,dy/d*46);
  K.fx.push({k:'flash',x:P.x,y:P.y-40,t:0,life:.3});
  if(!K.notes.hit){K.notes.hit=1;say('Biscotto','Ahi! Stendile col pugno (Attacca) o nasconditi dietro un angolo.')}
  if(K.hp<=0){K.caught++;K.hp=K.maxhp;K.inv=2.5;P.x=cx(35);P.y=(OY+3.95)*T;K.tr=[{x:P.x,y:P.y}];for(const g2 of K.gd){if(g2.off)continue;g2.st='patrol';g2.alert=0;if(g2.cmd){g2.duel=0;g2.hp=g2.maxhp;g2.x=g2.hx;g2.y=g2.hy;continue}g2.x=cx(g2.wp[0][0]);g2.y=(OY+g2.wp[0][1]+.92)*T}toast('Catturato! Ti liberi e riparti dalla passerella.',4500)}
}
const AD=(a,b)=>{let d=a-b;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;return d};
function faceG(g,ang){g.face=ang;const c=Math.cos(ang);if(Math.abs(c)>.12)g.flip=c<0;g.dir=Math.sin(ang)<-.72?'b':'f'}
/* cammina verso un punto (con percorso se serve); true se arrivato */
function goTo(g,tx,ty,sp,dt){
  const dx=tx-g.x,dy=ty-g.y,d=Math.hypot(dx,dy);
  if(d<14){g.mv=false;return true}
  let hx=tx,hy=ty;
  if(d>60&&!los(g.x,g.y-6,tx,ty-6)){
    const key=((tx/T)|0)+','+((ty/T)|0);
    if(g.pfKey!==key||!(g.pfT>0)){g.pf=bfsFrom(tx,ty);g.pfKey=key;g.pfT=1.2}
    const n=nextStepF(g,g.pf);if(n){hx=n[0];hy=n[1]}}
  const ex=hx-g.x,ey=hy-g.y,ed=Math.hypot(ex,ey)||1,m=Math.min(sp*dt,ed);
  g.mv=moveEnt(g,ex/ed*m,ey/ed*m);g.wk+=dt*sp*.06;faceG(g,Math.atan2(ey,ex));return false}
/* un rumore attira le guardie vicine: vanno a vedere */
function noiseAt(x,y,r,except){
  for(const g of K.gd){if(g===except||g.ko>0||g.st==='chase'||g.fight)continue;
    if(g.cmd&&!g.duel)continue;
    if(Math.hypot(g.x-x,g.y-y)<(g.off==='sleep'?r*.6:r)){
      if(g.off){wakeOff(g,x,y);continue}
      g.st='suspect';g.sx=x;g.sy=y;g.sw=0;g.alert=0;g.mv=false}}}
/* guardie fuori servizio: dormono o giocano a carte, ma un rumore forte le sveglia */
function wakeOff(g,x,y,quiet){
  if(!g.off)return;const was=g.off;g.off=0;g.look=null;g.nz=0;
  if(was==='sleep'){g.who='guardia';g.x=cx(g.front[0]);g.y=(OY+g.front[1]+.92)*T;g.flip=false;g.dir='f';g.face=Math.PI/2}
  if(quiet){g.st='patrol';g.mv=false;return}   // già in piedi: il ponte è stato costruito dopo la campana
  g.st='suspect';g.sx=x==null?g.x:x;g.sy=y==null?g.y:y;g.sw=0;g.alert=0;g.mv=false;g.react=.45;
  if(g.dk===K.deck){K.fx.push({k:'star',x:g.x,y:g.y-64,t:0,life:.8});sfx('thud')}
  if(!K.notes.wake&&g.dk===K.deck){K.notes.wake=1;say('Biscotto','Si è svegliato! Nasconditi, o colpiscilo prima che ti veda.',5400)}}
function offStep(g,dt){
  g.mv=false;
  const dP=Math.hypot(P.x-g.x,P.y-g.y);
  if(g.off==='sleep'){
    // russano: si svegliano solo se ti fermi vicinissimo, o per un rumore forte
    g.nz=Math.max(0,(g.nz||0)+(dP<76?dt:-dt*.6));
    if(g.nz>2.2)wakeOff(g,P.x,P.y)}
  else{
    // assorti nel gioco: ti sentono solo se ti fermi dietro di loro, o se li guardi in faccia da vicino
    g.nz=Math.max(0,(g.nz||0)+(dP<56?dt:-dt*.6));
    const ang=Math.atan2(P.y-g.y,P.x-g.x),seen=dP<125&&Math.abs(AD(g.face,ang))<1&&los(g.x,g.y-6,P.x,P.y-6);
    if(g.nz>1.1||seen)wakeOff(g,P.x,P.y)}}
/* il comandante spagnolo: duello facoltativo (non chiama nessuno, nessun aiuto) */
function cmdIdle(g,dt){
  if(g.duel){
    if(g.st==='patrol'){ // ha perso di vista lo sfidante: torna al suo posto
      g.rtT=(g.rtT||0)+dt;
      if(goTo(g,g.hx,g.hy,78,dt)||g.rtT>25){g.rtT=0;g.x=g.hx;g.y=g.hy;g.duel=0;g.hp=g.maxhp;g.face=-Math.PI/2;g.dir='b';g.flip=false}
      return true}
    return false}
  if(g.st==='chase'){g.duel=1;g.alert=3.2;return false}   // provocato: il duello comincia
  g.mv=false;g.hp=Math.min(g.maxhp,g.hp+dt*.4);g.face=-Math.PI/2;g.dir='b';return true}
function startDuel(){
  const c=K.gd.find(g=>g.cmd);if(!c||c.ko>0||c.duel)return;
  c.duel=1;c.st='chase';c.react=.6;c.alert=3.2;c.ls=[P.x,P.y];faceG(c,Math.atan2(P.y-c.y,P.x-c.x));progress();sfx('thud');
  say('Comandante','¡Alto! Un duello, ragazzo. Solo noi due: niente aiuti!',5200);
  if(!K.notes.duel2){K.notes.duel2=1;say('Biscotto','Ha 6 cuori e picchia forte: para al momento giusto e colpisci quando abbassa la sciabola!',6400)}}
function duelWon(c){
  if(K.duelWon)return;K.duelWon=true;
  let had=false;try{had=localStorage.getItem('sm_c4duel')==='1';localStorage.setItem('sm_c4duel','1')}catch(e){}
  K.duelFirst=!had;K.hp=K.maxhp;
  sfx('quest');K.fx.push({k:'star',x:c.x,y:c.y-84,t:0,life:1});
  toast('Duello vinto! Il comandante si arrende.',4800);
  say('Comandante','Basta, basta! Non ho mai visto una lama così svelta. La mia giubba è tua.',6200);
  if(!K.notes.duelw){K.notes.duelw=1;say('Biscotto',K.duelFirst?'Hai vinto la giubba del comandante: la trovi nel guardaroba!':'Il comandante è a terra: bel duello!',5600)}}
function stepGuard(g,dt){
  g.hitCd=Math.max(0,g.hitCd-dt);g.pfT=(g.pfT||0)-dt;
  g.flash=Math.max(0,g.flash-dt);g.swing=Math.max(0,g.swing-dt);
  if(g.face==null)g.face=g.flip?Math.PI:0;
  if(g.ko>0){g.ko-=dt;g.mv=false;return}
  if(g.off){offStep(g,dt);return}
  if(g.cmd&&cmdIdle(g,dt))return;
  const d=Math.hypot(P.x-g.x,P.y-g.y);
  /* vista: cono davanti (circa 120°) oppure molto vicino */
  const ang=Math.atan2(P.y-g.y,P.x-g.x),al=K.alarm?1:0,cone=d<(88+al*22)||Math.abs(AD(g.face,ang))<(1.05+al*.25);
  const vis=!K.over&&d<(290+al*50)&&cone&&los(g.x,g.y-6,P.x,P.y-6);
  {let f=g.fight;
   if(f&&(f.hp<=0||f.dk!==undefined))f=g.fight=null;
   if(!f&&g.st!=='chase'){for(const a of allies()){if(a.hp<=0)continue;const da=Math.hypot(a.x-g.x,a.y-g.y);if(da<200&&los(g.x,g.y-6,a.x,a.y-6)){f=g.fight=a;g.fightT=Math.max(g.fightT,.5);break}}}
   if(f&&!(g.st==='chase'&&d<110)){
     const dx=f.x-g.x,dy=f.y-g.y,dd=Math.hypot(dx,dy)||1;faceG(g,Math.atan2(dy,dx));
     if(dd>240){g.fight=null}
     else if(dd>46){g.mv=moveEnt(g,dx/dd*100*dt,dy/dd*100*dt);g.wk+=dt*6;if(!g.mv&&dd>150)g.fight=null;return}
     else{g.mv=false;g.fightT-=dt;
       if(g.fightT<=0){g.fightT=1.5;g.swing=.32;f.hp--;f.flash=.3;sfx('thud');K.fx.push({k:'spark',x:(g.x+f.x)/2,y:g.y-34,t:0,life:.3});
         if(f.hp<=0){f.downT=0;g.fight=null;toast(CH[f.who].name+' è a terra! Vai ad aiutarlo.',4200);if(!K.notes.dwn){K.notes.dwn=1;say('Biscotto','Un pirata ferito! Avvicinati e premi «Aiuta».',5200)}}}
       return}}}
  /* ti ha visto */
  if(vis){
    if(g.st!=='chase'){
      g.st='chase';g.react=.42;g.mv=false;faceG(g,ang);
      if(!K.notes.sight){K.notes.sight=1;say('Biscotto','Guardia! Ti ha visto!',3600)}
      if(!g.cmd)noiseAt(P.x,P.y,420,g);sfx('thud')}
    g.alert=3.2;g.ls=[P.x,P.y]}
  else if(g.st==='chase'){g.alert-=dt;if(g.alert<=0){g.st='search';g.sx=g.ls?g.ls[0]:g.x;g.sy=g.ls?g.ls[1]:g.y;g.sw=0}}
  if(g.react>0){g.react-=dt;g.mv=false;if(g.st==='chase')faceG(g,ang);return}
  if(g.st==='chase'){
    const sp=(g.cmd?122:112)+al*10,n=d<70&&vis?[P.x,P.y]:nextStep(g);
    if(n){const dx=n[0]-g.x,dy=n[1]-g.y,dd=Math.hypot(dx,dy)||1,m=Math.min(sp*dt,dd);g.mv=moveEnt(g,dx/dd*m,dy/dd*m);g.wk+=dt*sp*.06;faceG(g,Math.atan2(dy,dx))}else g.mv=false;
    if(d<34&&g.hitCd<=0){g.hitCd=g.cmd?.95:1.2;g.swing=.32;hurtP(g)}
    return}
  if(g.st==='search'||g.st==='suspect'){
    const arrived=goTo(g,g.sx,g.sy,(g.st==='search'?98:84)+al*20,dt);
    if(!arrived){g.stk=(g.stk||0)+dt;   // fermo contro un ostacolo per più di 1,5 s: si guarda intorno lì
      if(g.stk>1.5){g.stk=0;if(g.stp&&Math.hypot(g.x-g.stp[0],g.y-g.stp[1])<6){g.sx=g.x;g.sy=g.y}g.stp=[g.x,g.y]}}
    else{g.stk=0;g.stp=null}
    if(arrived){g.sw+=dt;g.mv=false;
      const base=g.look==null?(g.look=g.face):g.look;faceG(g,base+Math.sin(g.sw*2.2)*1.25);
      if(g.sw>(g.dwell||(g.st==='search'?3.4:2.4))){g.st='patrol';g.look=null;g.wait=.3;g.dwell=0}}
    return}
  /* ronda */
  const w=g.wp[g.wi],gx=cx(w[0]),gy=(OY+w[1]+.92)*T;
  if(g.wait>0){g.wait-=dt;g.mv=false;return}
  if(goTo(g,gx,gy,60+al*24,dt)){g.wi=(g.wi+1)%g.wp.length;g.wait=.7;const n=g.wp[g.wi];faceG(g,Math.atan2((OY+n[1]+.92)*T-g.y,cx(n[0])-g.x))}
}
/* compagni: combattono le guardie vicine, ma restano nei dintorni del capitano */
function stepAllies(dt){
  for(const g of K.gd)if(g.fldT>0)g.fldT-=dt;
  for(const f of allies()){
    f.hitCd=Math.max(0,f.hitCd-dt);f.swing=Math.max(0,f.swing-dt);f.flash=Math.max(0,f.flash-dt);f.busy=false;
    if(f.hp<=0){f.mv=false;f.busy=true;f.downT+=dt;if(f.downT>70){f.hp=1;f.downT=0}continue}
    const dPl=Math.hypot(f.x-P.x,f.y-P.y),post=f.dk!==undefined;
    let best=null,bd=1e9;
    for(const g of K.gd){if(g.ko>0||g.cmd||g.off)continue;const d=Math.hypot(g.x-f.x,g.y-f.y),dgp=Math.hypot(g.x-P.x,g.y-P.y);
      const hunting=g.st==='chase'||g.fight===f||g.react>0&&g.st!=='patrol';
      const near=post?(hunting&&d<80):(hunting&&dgp<115&&d<190);
      if(near&&d<bd){bd=d;best=g}}
    f.tgt=best;
    if(!best)continue;
    f.busy=true;const g=best,dx=g.x-f.x,dy=g.y-f.y,d=bd;faceG(f,Math.atan2(dy,dx));
    if(d>44){
      let tx=g.x,ty=g.y;
      if(!(d<220&&los(f.x,f.y-6,g.x,g.y-6))){if(!g.fld||!(g.fldT>0)){g.fld=bfsFrom(g.x,g.y);g.fldT=.5}const n=nextStepF(f,g.fld);if(n){tx=n[0];ty=n[1]}}
      const ex=tx-f.x,ey=ty-f.y,ed=Math.hypot(ex,ey)||1;
      f.mv=moveEnt(f,ex/ed*150*dt,ey/ed*150*dt);f.wk+=dt*8;if(Math.abs(ex)>3)f.flip=ex<0;
    }else f.mv=false;
    if(d<=50&&f.hitCd<=0){f.hitCd=2.8;f.swing=.32;g.fight=f;g.fightT=Math.max(g.fightT,.6);
      if(g.hp>1)hitGuard(g,1,dx/d,dy/d);else moveEnt(g,dx/d*14,dy/d*14); /* l'ultimo colpo spetta a te */if(g.ko>0)say(CH[f.who].name,pick(['Sistemato!','Uno in meno!','Dormi bene, casacca rossa.']),2600)}
  }}
function sepAll(dt){
  const A=[{e:P,p:1}];for(const f of allies())if(f.hp>0)A.push({e:f});for(const g of K.gd)if(g.ko<=0)A.push({e:g});for(const dl2 of K.duels)for(const q of dl2)if(q.ko<=0&&q.duel)A.push({e:q,fx:1});
  for(let i=0;i<A.length;i++)for(let j=i+1;j<A.length;j++){
    const a=A[i],b=A[j];if(a.fx&&b.fx)continue;
    let dx=b.e.x-a.e.x,dy=b.e.y-a.e.y,d=Math.hypot(dx,dy);const R=27;if(d>=R)continue;
    if(d<.01){dx=1;dy=0;d=1}const ov=(R-d),nx=dx/d,ny=dy/d;
    let wa=.5,wb=.5;if(a.fx){wa=0;wb=1}else if(b.fx){wa=1;wb=0}else if(a.p){wa=0;wb=1}else if(b.p){wa=1;wb=0}
    if(wa)moveEnt(a.e,-nx*ov*wa,-ny*ov*wa);if(wb)moveEnt(b.e,nx*ov*wb,ny*ov*wb)}
}
function stepDuels(dt){
  for(const[a,b]of K.duels){for(const e of[a,b]){if(!e.duel)continue;e.sw=Math.max(0,e.sw-dt);e.flash=Math.max(0,(e.flash||0)-dt);e.cd-=dt;
      if(e.ko>0||(e.mate&&e.mate.ko>0))continue;
      if(e.cd<=0){e.cd=rr(1.1,1.8);e.sw=.34;const mx=(a.x+b.x)/2,my=a.y-34;
        K.fx.push({k:'spark',x:mx,y:my,t:0,life:.3});
        if(Math.hypot(P.x-mx,P.y-a.y)<420&&AU.ctx&&AU.on)noiseBurst(.05,1400,.1)}}
    if(!K.notes.duel&&Math.hypot(P.x-a.x,P.y-a.y)<300){K.notes.duel=1;say('Biscotto','Un nostro pirata che duella con una guardia! Colpisci solo il casacca rossa: lui è dei nostri.',5600)}}
}
/* seguaci: ti stanno intorno, non scappano mai */
const SLOTS=[[-1.0,.9],[1.0,.9],[-1.9,1.7],[1.9,1.7],[0,2.5],[-1.2,-1.0],[1.2,-1.0]];
function stepFollowers(dt){
  const tr=K.tr,last=tr[tr.length-1];
  if(Math.hypot(P.x-last.x,P.y-last.y)>9){tr.push({x:P.x,y:P.y});if(tr.length>260)tr.shift()}
  K.fol.forEach((f,i)=>{
    if(f.busy||f.hp<=0)return;
    const dP=Math.hypot(P.x-f.x,P.y-f.y),stopR=92+i*22,goR=stopR+64;
    if(dP>goR)f.mvMode=true;else if(dP<=stopR)f.mvMode=false;
    if(f.mvMode){
      K.needField=true;
      const n=nextStep(f);let tx=P.x,ty=P.y;if(n&&dP>120){tx=n[0];ty=n[1]}
      const sl=SLOTS[i%SLOTS.length];if(dP<=190){tx=P.x-(K.fdx||0)*0+sl[0]*T*.9;ty=P.y+sl[1]*T*.9}
      const dx=tx-f.x,dy=ty-f.y,d=Math.hypot(dx,dy),sp=150+Math.min(110,Math.max(0,dP-goR)*.35);
      if(d>4){const m=Math.min(sp*dt,d),ok=moveEnt(f,dx/d*m,dy/d*m);f.mv=ok;f.wk+=dt*sp*.05;if(Math.abs(dx)>3)f.flip=dx<0;f.dir=dy<-Math.abs(dx)*1.2?'b':'f'}else f.mv=false;
      f.idleT=0;return}
    /* fermo vicino a te: ti guarda e ogni tanto si sistema */
    f.mv=false;const lx=P.x-f.x;if(Math.abs(lx)>6)f.flip=lx<0;f.dir=P.y<f.y-Math.abs(lx)*1.2?'b':'f';
    f.idleT=(f.idleT||0)-dt;
    if(f.idleT<=0){f.idleT=rr(3,6);f.fx=rr(-14,14);f.fy=rr(-8,8);f.fl=Math.hypot(f.fx,f.fy)/38}
    if(f.fl>0){f.fl-=dt;const wd=Math.hypot(f.fx,f.fy)||1;f.mv=moveEnt(f,f.fx/wd*38*dt,f.fy/wd*38*dt);f.wk+=dt*3;if(!f.mv)f.fl=0}
  });
  /* chi è di guardia al suo posto: non si allontana, non scappa */
  for(const f of(K.stay||[])){
    if(f.dk!==K.deck||f.busy||f.hp<=0)continue;
    if(f.px==null){f.px=f.x;f.py=f.y;f.idleT=rr(1,4)}
    const dp=Math.hypot(f.px-f.x,f.py-f.y);
    if(dp>60){const dx=f.px-f.x,dy=f.py-f.y,d=Math.hypot(dx,dy);f.mv=moveEnt(f,dx/d*100*dt,dy/d*100*dt);f.wk+=dt*5;if(Math.abs(dx)>3)f.flip=dx<0;continue}
    f.mv=false;const lx=P.x-f.x;if(Math.hypot(P.x-f.x,P.y-f.y)<240&&Math.abs(lx)>6)f.flip=lx<0;
    f.idleT-=dt;if(f.idleT<=0){f.idleT=rr(3,6);f.fx=f.px+rr(-20,20);f.fy=f.py+rr(-10,10);f.fl=1}
    if(f.fl>0){const dx=f.fx-f.x,dy=f.fy-f.y,d=Math.hypot(dx,dy);if(d<4)f.fl=0;else{f.mv=moveEnt(f,dx/d*36*dt,dy/d*36*dt);f.wk+=dt*3;if(!f.mv)f.fl=0}}
  }}
/* ingresso nelle stanze: indizi della ciurma */
const ENTER_BY=[
{cabin:()=>{say('Biscotto',K.keyAt===0?KEYSP[0].enter:'La cabina del comandante: un letto, una scrivania... ma la chiave non è qui.')},
 corr:()=>{say('Nives','Corridoio dei cannoni: cammina lungo i muri, le guardie fanno la ronda.')},
 quarters:()=>{if(K.keyAt===1&&!K.key1)say('Biscotto',KEYSP[1].enter,5200);else say('Tito','Gli alloggi degli ufficiali: russano come orsi. Piano!',4200)},
 galley:()=>{say('Tito','L\'armeria degli ufficiali! Quelle sciabole valgono più della tua: prendine una, Capitano.',5600);if(K.keyAt===2&&!K.key1)say('Biscotto',KEYSP[2].enter,5200)},
 hold:()=>{say('Biscotto','La sala delle carte: studiare la carta ti fa vedere dove fanno la ronda.',5600);say('Tito','Quello è il comandante spagnolo! Se vuoi sfidarlo a duello premi «Usa» vicino a lui: è facoltativo.',6600)},
 cell:()=>{say('Tito','La prua: guardie di vedetta! Occhi aperti.')}},
{cabin:()=>{say('Tito','Il dormitorio della ciurma: due guardie dormono. Piano, o colpiscile nel sonno!',5400)},
 corr:()=>{say('Nives','Ponte dei cannoni di mezzo. Attenti alle ronde.')},
 quarters:()=>{say('Tito',K.rumTaken?'La mensa. Briciole e coltelli.':'La mensa. Briciole, coltelli... e una bottiglia di rum sul tavolo: può servire!',5000);say('Nives','Due guardie giocano a carte: sono distratte, ma se ti fermi dietro di loro ti sentono.',5800)},
 galley:()=>{say('Biscotto','Odore di stufato... e il barile col tappo rosso dev\'essere qui! Una pentola è ancora calda.')},
 hold:()=>{say('Nives','La dispensa: sacchi e barili. Qui non c\'è argento, ma forse qualcosa di prezioso sì.')},
 cell:()=>{say('Tito','Eccoli! Dietro le sbarre!')}},
{cabin:()=>{say('Nives','La santabarbara: barili di polvere dappertutto. Niente scintille!')},
 corr:()=>{say('Biscotto','La stiva: il pavimento puzza di catrame e di pezzi da otto.')},
 quarters:()=>{say('Tito','Magazzino: corde e vele di scorta.')},
 galley:()=>{say('Nives','Solo barili vuoti.')},
 hold:()=>{say('Nives','La stiva! Più argento di quanto abbia mai visto.')},
 cell:()=>{say('Tito','Zavorra e topi. Andiamo.')}}];

function quip(){
  const q=['Se i soldati russano io non c\'entro.','Questa nave profuma di cera e di pessime decisioni.','Pezzi da otto! Pezzi da otto! ...ripeto e basta.','Ricorda: piano, in punta di zampe. Anche tu.','Le scale cigolano, i guardiani no: occhio.','Crack! Ho fame. Mezzo biscotto, grazie.'];
  say('Biscotto',pick(q))}
function step(dt){
  if(!K)return;K.dt=dt;K.t+=dt;P.t+=dt;
  const ctl=!PAUSED&&!dl.open&&!K.over;
  // movimento
  const kx=(KEYS.d||KEYS.ArrowRight?1:0)-(KEYS.a||KEYS.ArrowLeft?1:0),ky=(KEYS.s||KEYS.ArrowDown?1:0)-(KEYS.w||KEYS.ArrowUp?1:0);
  let mv=false;
  if(ctl){const jx=JOY.x+kx,jy=JOY.y+ky,l=Math.hypot(jx,jy);
    if(l>.1){const mag=Math.min(1,l),vx=jx/l,vy=jy/l;P.hd=Math.atan2(vy,vx);faceFromHd();K.fdx=vx;K.fdy=vy;const sp=150*(1-.012*K.silver)*(K.parry?.5:1);
      const ox=P.x,oy=P.y;moveCollide(vx*mag*sp*dt,vy*mag*sp*dt);mv=Math.hypot(P.x-ox,P.y-oy)>.3;P.walk+=dt*(sp/150)*9.5*mag}}
  P.moving=mv;P.tool=null;P.act=null;
  K.inv=Math.max(0,K.inv-dt);K.atk=Math.max(0,K.atk-dt);K.lureCd=Math.max(0,(K.lureCd||0)-dt);K.routesT=Math.max(0,(K.routesT||0)-dt);K.swingT=Math.max(0,(K.swingT||0)-dt);if(K.parry){K.parT+=dt;if(K.over)setParry(false)}
  if(!K.over){
    if(K.fieldT<=0&&(K.needField||K.gd.some(g=>g.st==='chase'))){bfsField();K.fieldT=.3;K.needField=false}
    K.fieldT-=dt;
    for(const g of K.gd)stepGuard(g,dt);
    if(!K.alarm&&!K.chasedPre&&K.gd.some(g=>g.ko<=0&&g.st==='chase'&&!g.cmd))K.chasedPre=true;
    stepAllies(dt);stepFollowers(dt);stepDuels(dt);sepAll(dt);stepRats(dt);
  }
  for(const q of K.fx)q.t+=dt;K.fx=K.fx.filter(q=>q.t<q.life);
  // dobloni nascosti: si raccolgono passandoci sopra
  for(const c of(DECKS[K.deck].coins||[])){if(c.got||K.over)continue;if(Math.hypot(c.x-P.x,c.y+10-P.y)<30){c.got=true;K.dob++;sfx('coin');toast('Doblone d\'oro! ('+K.dob+'/9)',2600);K.fx.push({k:'star',x:c.x,y:c.y-20,t:0,life:.8});
    if(K.dob===1)say('Biscotto','Un doblone! A bordo ne hanno nascosti parecchi: guarda dietro ai barili e negli angoli.',5600);
    if(K.dob===9)say('Biscotto','Tutti e nove! Che occhio, Capitano!',5200)}}
  // intensità della musica: calma / sospetto / inseguimento
  {let tg=0;for(const g of K.gd){if(g.ko>0)continue;if(g.st==='chase')tg=2;else if((g.st==='suspect'||g.st==='search')&&tg<1)tg=1}
   if(K.alarm&&tg<1)tg=1;
   if(tg>=K.mLv){K.mLv=tg;K.mHold=4}else{K.mHold-=dt;if(K.mHold<=0){K.mLv--;K.mHold=3}}
   window.__c4m={deck:K.deck,lvl:K.mLv,alarm:K.alarm?1:0};
   const al=$('c4alarm');if(al)al.classList.toggle('on',!!K.alarm&&!K.over)}
  // stanze e indizi
  const r=roomAt(Math.floor(P.x/T)-OX,Math.floor(P.y/T)-OY);
  const rk=K.deck+':'+r;if(r&&!K.rooms[rk]){K.rooms[rk]=1;if(K.t>2&&ENTER_BY[K.deck][r])ENTER_BY[K.deck][r]()}
  // oggetti
  const o=nearObj();K.near=o;const b=$('c4use'),lanc=!o&&!!K.rum;b.disabled=!o&&!K.rum;b.classList.toggle('lit',!!o||lanc);{const bl=lanc?'Lancia':'Usa';if(b.textContent!==bl)b.textContent=bl}
  // vita a bordo: scricchiolii del legno, gocce nella stiva
  K.creakT=(K.creakT==null?5+Math.random()*5:K.creakT)-dt;if(K.creakT<=0){K.creakT=8+Math.random()*9;creak()}
  if(K.deck===2){K.dripT=(K.dripT==null?4+Math.random()*5:K.dripT)-dt;if(K.dripT<=0){K.dripT=6+Math.random()*8;sfx('drip')}}
  // dialoghi e suggerimenti
  sayNow();
  if(K.t>1.2&&!K.notes.start){K.notes.start=1;say('Tito','Capitano, a bordo c\'è odore di candele e di guai.');say('Biscotto',K.carry&&K.cell?'Crack! L\'argento è nella stiva, giù in fondo. Il cuoco tiene la chiave in un barile col tappo rosso, sul ponte di mezzo.':'Crack! '+KEYSP[K.keyAt].start,6800)}
  if(!K.over&&K.t-K.lastProg>30&&K.t-(K.lastSay||0)>16&&K.say.length===0&&K.sayT<=0){const g=goal();say('Biscotto',g[2]+' ('+dirName(g[0]-P.x,g[1]-P.y)+')',6200);K.lastProg=K.t-12}
  else if(!K.over&&K.t>9&&!K.notes.stars&&K.say.length===0&&K.sayT<=0){K.notes.stars=1;say('Biscotto','Tre stelle in palio: salva Pip e Dodo, prendi le sei casse e non farti inseguire prima della campana!',7000)}
  else if(!K.over&&K.t>20&&(K.parN-=dt)<=0){K.parN=rr(35,55);if(K.say.length===0&&K.sayT<=0)quip()}
  // HUD
  let h='';for(let i=0;i<K.maxhp;i++)h+=i<K.hp?'<span style="color:#ff5f6f">♥</span>':'<span style="color:#7a4c4c">♡</span>';
  $('c4hh').innerHTML='Scafo '.replace('Scafo','Vita')+h;$('c4key').textContent=(K.key1?'🗝 cella ':'')+(K.key2?'🗝 stiva':'')||'🗝 –';
  if(!K.key1&&!K.key2)$('c4key').textContent='🗝 nessuna';
  $('c4sv').textContent=K.silver;$('c4db').textContent=K.dob;{const rm=$('c4rm');if(rm)rm.style.display=K.rum?'':'none'}
  const oj=$('c4obj'),tx=objText();if(tx!==K.lastObj){K.lastObj=tx;K.objT=7}K.objT=Math.max(0,(K.objT||0)-dt);oj.textContent=tx;oj.style.display=!K.over?'block':'none';
}
/* ---------------- disegno ---------------- */
function drawSilverChest(g,x,y,t,i,taken){
  const w=54,h=26,lid=taken?-4:0;
  g.save();g.translate(x,y);
  g.fillStyle='rgba(10,8,20,.32)';g.beginPath();g.ellipse(0,6,w*.62,9,0,0,7);g.fill();
  /* corpo */
  g.fillStyle='#6a3e1c';g.fillRect(-w/2,-h,w,h);
  g.fillStyle='#7e4c24';for(let k=0;k<4;k++)g.fillRect(-w/2,-h+k*(h/4)+1,w,h/4-2);
  g.fillStyle='#4a2a12';g.fillRect(-w/2,-3,w,3);
  /* bande di ferro */
  g.fillStyle='#8a8f9a';for(const bx of[-w/2,-8-1,w/2-8]){g.fillRect(bx,-h,8,h);g.fillStyle='#c8ccd6';g.fillRect(bx+1,-h,2,h);g.fillStyle='#8a8f9a'}
  g.fillStyle='#d8dce6';for(const bx of[-w/2+4,w/2-4])for(const by of[-h+5,-6]){g.beginPath();g.arc(bx,by,1.6,0,7);g.fill()}
  if(!taken){
    /* argento a vista sopra il coperchio aperto */
    g.fillStyle='#9a9fb0';g.beginPath();g.ellipse(0,-h-4,w/2-3,8,0,0,7);g.fill();
    for(let k=0;k<9;k++){const cx2=-20+k*5+(k%2)*2,cy2=-h-8-(k%3)*2;g.fillStyle=k%2?'#e8ecf4':'#c9cedb';g.beginPath();g.ellipse(cx2,cy2,6,3,0,0,7);g.fill();g.strokeStyle='#6a6f82';g.lineWidth=1;g.stroke()}
    /* coperchio ribaltato dietro */
    g.fillStyle='#7e4c24';g.fillRect(-w/2,-h-18,w,10);g.fillStyle='#8a8f9a';g.fillRect(-w/2,-h-18,8,10);g.fillRect(w/2-8,-h-18,8,10);
    /* scintille */
    const a=.5+.5*Math.sin(t*4+i*1.7);g.fillStyle='rgba(255,255,255,'+(.35+.5*a)+')';
    g.save();g.translate(-12+((i*7)%24),-h-14);g.rotate(t*.5);g.fillRect(-1,-5,2,10);g.fillRect(-5,-1,10,2);g.restore();
  }else{
    g.fillStyle='#3a2210';g.beginPath();g.ellipse(0,-h-1,w/2-3,6,0,0,7);g.fill();
    g.fillStyle='#7e4c24';g.fillRect(-w/2,-h-16,w,9)}
  /* serratura dorata */
  g.fillStyle='#f2c04a';g.fillRect(-5,-h+4,10,11);g.strokeStyle='#8a6a1a';g.lineWidth=1.4;g.strokeRect(-5,-h+4,10,11);g.fillStyle='#4a3208';g.fillRect(-1,-h+8,2,4);
  g.restore()}
/* ---------------- vita a bordo: scricchiolii, ratti nella stiva, gabbiani agli oblò ---------------- */
function creak(){
  if(!(AU.ctx&&AU.on))return;
  const f=70+Math.random()*50;
  tone(f,f*.7,.5,'sawtooth',.03);tone(f*1.52,f*1.05,.34,'triangle',.016,.06);noiseBurst(.28,240,.018,.03)}
const RATN=[0,2,5];
function ratFree(x,y){const tx=Math.floor(x/T),ty=Math.floor(y/T);return inMap(tx,ty)&&walkT[tIdx(tx,ty)]&&!blockT[tIdx(tx,ty)]}
function makeRats(n){
  const out=[];let tries=0;
  while(out.length<RATN[n]&&tries++<800){
    const gx=1+((Math.random()*(SW-2))|0),gy=1+((Math.random()*(SH-2))|0);
    if(!roomAt(gx,gy))continue;
    const x=(OX+gx+.5)*T,y=(OY+gy+.5)*T;if(!ratFree(x,y)||Math.hypot(x-P.x,y-P.y)<260)continue;
    out.push({x,y,tx:null,ty:null,wait:Math.random()*2,sp:80,fl:0,dir:Math.random()<.5?-1:1,mv:0,ph:Math.random()*6,sq:0})}
  return out}
function stepRats(dt){
  if(!RATN[K.deck])return;
  const D=DECKS[K.deck];if(!D.rats)D.rats=makeRats(K.deck);
  for(const r of D.rats){
    r.sq=Math.max(0,r.sq-dt);
    const dP=Math.hypot(P.x-r.x,P.y-r.y);
    if(dP<140&&r.fl<=0){r.fl=1.2;const a=Math.atan2(r.y-P.y,r.x-P.x)+(Math.random()-.5)*1.2;r.tx=r.x+Math.cos(a)*200;r.ty=r.y+Math.sin(a)*160;r.sp=230;r.wait=0;
      if(r.sq<=0&&dP<120&&AU.ctx&&AU.on){r.sq=3;tone(2400,3200,.05,'square',.02);tone(3000,2200,.05,'square',.015,.06)}}
    if(r.fl>0)r.fl-=dt;
    if(r.wait>0){r.wait-=dt;r.mv=0;continue}
    if(r.tx==null){const a=Math.random()*6.283,d=60+Math.random()*130;r.tx=r.x+Math.cos(a)*d;r.ty=r.y+Math.sin(a)*d*.7;r.sp=85+Math.random()*30}
    const dx=r.tx-r.x,dy=r.ty-r.y,d=Math.hypot(dx,dy);
    if(d<6){r.tx=null;r.wait=.5+Math.random()*3.5;r.mv=0;continue}
    const m=Math.min(r.sp*dt,d),nx=r.x+dx/d*m,ny=r.y+dy/d*m;
    if(ratFree(nx,ny)&&ratFree(nx+dx/d*8,ny+dy/d*8)){r.x=nx;r.y=ny;r.mv=1;if(Math.abs(dx)>2)r.dir=dx<0?-1:1}
    else if(r.fl>0){   // in fuga ma contro un muro: prova un'altra direzione, non restare fermo davanti al giocatore
      const a0=Math.atan2(r.y-P.y,r.x-P.x);r.mv=0;
      for(let k=0;k<6;k++){const a=a0+(Math.random()-.5)*3.2;if(ratFree(r.x+Math.cos(a)*40,r.y+Math.sin(a)*40)&&ratFree(r.x+Math.cos(a)*14,r.y+Math.sin(a)*14)){r.tx=r.x+Math.cos(a)*200;r.ty=r.y+Math.sin(a)*160;break}}}
    else{r.tx=null;r.wait=.15;r.mv=0}}}
function drawRat(g,r,t){
  g.save();g.translate(r.x,r.y);g.scale(r.dir,1);
  g.fillStyle='rgba(10,8,20,.25)';g.beginPath();g.ellipse(0,1,8,2.6,0,0,7);g.fill();
  const bob=r.mv?Math.sin(t*26+r.ph)*.7:0;
  g.strokeStyle='#c9a0a0';g.lineWidth=1.3;g.lineCap='round';g.beginPath();g.moveTo(-6.5,-4+bob);g.quadraticCurveTo(-12,-1+Math.sin(t*9+r.ph)*2,-15,-3);g.stroke();
  g.fillStyle='#7d6c5c';g.beginPath();g.ellipse(0,-4+bob,7,3.5,0,0,7);g.fill();
  g.fillStyle='#8e7c6a';g.beginPath();g.ellipse(6.6,-4.4+bob,3.6,2.6,0,0,7);g.fill();
  g.fillStyle='#d8a0a8';g.beginPath();g.arc(9.9,-4.2+bob,1,0,7);g.fill();
  g.fillStyle='#c8aaa0';g.beginPath();g.arc(4.9,-6.9+bob,1.7,0,7);g.fill();
  g.fillStyle='#14100c';g.beginPath();g.arc(7.4,-5+bob,.7,0,7);g.fill();
  if(r.mv){g.strokeStyle='#5e4e40';g.lineWidth=1;const s=Math.sin(t*26+r.ph)*2;g.beginPath();g.moveTo(-3,-1.4);g.lineTo(-3+s,.6);g.moveTo(3,-1.4);g.lineTo(3-s,.6);g.stroke()}
  g.restore()}
function drawGulls(g,t){
  if(K.deck>1)return;
  const ps=PORTS_BY[K.deck]||[];
  for(let i=0;i<ps.length;i++){const X=wx(0)+ps[i][0],Y=wy(0)+ps[i][1];
    if(Math.abs(X-P.x)>720||Math.abs(Y-P.y)>420)continue;
    const per=34+(i%5)*6,off=(i*9.7)%per,u=(t+off)%per,ev=Math.floor((t+off)/per);
    if(u>2.4)continue;
    const p=u/2.4;
    g.save();g.beginPath();g.rect(X,Y,18,12);g.clip();
    g.fillStyle='rgba(150,205,240,'+(.9*Math.sin(p*Math.PI))+')';g.fillRect(X,Y,18,12);
    const gx=X-4+p*26,gy=Y+6+Math.sin(p*6)*1.5,fl=Math.sin(t*16);
    g.strokeStyle='#fff';g.lineWidth=1.6;g.lineCap='round';g.beginPath();g.moveTo(gx-5,gy-2.5*fl-1);g.quadraticCurveTo(gx-2.5,gy-4*fl-2.5,gx,gy);g.quadraticCurveTo(gx+2.5,gy-4*fl-2.5,gx+5,gy-2.5*fl-1);g.stroke();
    g.fillStyle='#fff';g.beginPath();g.ellipse(gx,gy+.5,1.6,1.1,0,0,7);g.fill();
    g.restore();
    if(ps[i].ev!==ev){ps[i].ev=ev;if(Math.hypot(X-P.x,Y-P.y)<360&&AU.ctx&&AU.on)sfx('gull')}}}
function drawFloor(g,t){
  if(!SHIPC)bake();
  g.drawImage(SHIPC,wx(0),wy(0));
  // dobloni d'oro sul pavimento
  for(const c of(DECKS[K.deck].coins||[])){if(c.got)continue;
    const b=Math.sin(t*3+c.x)*2,sp=Math.abs(Math.cos(t*2+c.x*.1)),X=c.x,Y=c.y-4+b;
    g.fillStyle='rgba(10,8,20,.28)';g.beginPath();g.ellipse(X,c.y+10,9,3.4,0,0,7);g.fill();
    const gr=g.createRadialGradient(X,Y,2,X,Y,34);gr.addColorStop(0,'rgba(255,214,90,.5)');gr.addColorStop(1,'rgba(255,214,90,0)');g.fillStyle=gr;g.fillRect(X-34,Y-34,68,68);
    g.fillStyle='#f2c04a';g.strokeStyle='#8a6a1a';g.lineWidth=2;g.beginPath();g.ellipse(X,Y,3+8*sp,9,0,0,7);g.fill();g.stroke();
    g.strokeStyle='#c8921a';g.lineWidth=1.4;g.beginPath();g.ellipse(X,Y,1.5+5*sp,5.6,0,0,7);g.stroke();
    const a=.5+.5*Math.sin(t*5+c.y);if(a>.75){g.fillStyle='rgba(255,255,255,'+(a-.5)+')';g.fillRect(X+6,Y-14,2,8);g.fillRect(X+3,Y-11,8,2)}}
  if(K.deck>0){const D=DECKS[K.deck];if(D.rats)for(const r of D.rats)drawRat(g,r,t)}
  drawGulls(g,t);
  // porte chiuse
  for(const d of DOORS){if(d.open)continue;
    for(const[x,y]of d.cells){const X=wx(x),Y=wy(y);
      if(d.id==='cell'){g.fillStyle='rgba(20,14,8,.55)';g.fillRect(X+12,Y,20,T);g.strokeStyle='#8a8a92';g.lineWidth=3;for(let i=0;i<3;i++){g.beginPath();g.moveTo(X+14+i*8,Y);g.lineTo(X+14+i*8,Y+T);g.stroke()}g.strokeStyle='#5a5a62';g.beginPath();g.moveTo(X+10,Y+8);g.lineTo(X+34,Y+8);g.moveTo(X+10,Y+T-8);g.lineTo(X+34,Y+T-8);g.stroke()}
      else{g.fillStyle='#4a2c14';g.fillRect(X,Y+10,T,T-20);g.strokeStyle='#241208';g.lineWidth=2;g.strokeRect(X+1,Y+11,T-2,T-22);g.fillStyle='#8a8a92';g.fillRect(X+T/2-4,Y+T/2-5,8,10);g.fillStyle='#f2c04a';g.beginPath();g.arc(X+T/2,Y+T/2+9,5,0,7);g.fill()}}}
  // porte a battente stile saloon: un'anta sola, si apre lontano da chi arriva e poi oscilla fino a chiudersi
  {
    const act=[P].concat(K.gd||[],K.fol||[]).filter(a=>a&&isFinite(a.x)&&isFinite(a.y));
    const dtS=Math.min(.05,Math.max(0,t-(SALOON.t||t)));SALOON.t=t;
    for(let y=0;y<SH;y++)for(let x=0;x<SW;x++){
      if(G[y][x]!=='D')continue;
      const horiz=G[y][x-1]==='#'&&G[y][x+1]==='#'; // muro orizzontale: si passa da nord a sud
      if(!horiz&&y>0&&G[y-1][x]==='D')continue;     // varco alto piu' celle: un'anta unica
      let n=1;if(!horiz)while(y+n<SH&&G[y+n][x]==='D')n++;
      const X=wx(x),Y=wy(y),mx=X+T/2,my=horiz?Y+T/2:Y+n*T/2;
      const key=K.deck+':'+x+','+y,st=SALOON[key]||(SALOON[key]={a:0,v:0,dir:1});
      let near=1e9,dir=st.dir;
      for(const a of act){const d=Math.hypot(a.x-mx,a.y-my);if(d<near){near=d;dir=horiz?(a.y<my?1:-1):(a.x<mx?1:-1)}}
      const R=T*(.5+.45*n);
      if(st.a<.08&&near<R)st.dir=dir; // il verso si decide solo a porta chiusa: poi non si inverte piu'
      // l'anta si apre solo se qualcuno la tocca (anta attuale o linea della porta chiusa): la si spinge
      const Lc=(horiz?T:n*T)-2,cs=horiz?[X+1,my,X+1+Lc,my]:[mx,Y+1,mx,Y+1+Lc],sgm=(px,py,q)=>{const vx=q[2]-q[0],vy=q[3]-q[1],u=Math.max(0,Math.min(1,((px-q[0])*vx+(py-q[1])*vy)/(vx*vx+vy*vy||1)));return Math.hypot(px-q[0]-vx*u,py-q[1]-vy*u)};
      let touch=false;for(const a of act){{const rr=st.a>.2?34:16;if(sgm(a.x,a.y,cs)<rr||(st.seg&&sgm(a.x,a.y,st.seg)<rr)){touch=true;break}}}
      const tgt=touch?1.72:0;
      const w0=tgt>st.a?9:8; // apre svelta, richiude piu' dolce
      st.v+=((tgt-st.a)*w0*w0-2*w0*st.v)*dtS;st.a=Math.max(0,st.a+st.v*dtS);
      const rest=horiz?0:Math.PI/2,sg=horiz?1:-1;
      let ang=Math.min(1.8,st.a)*st.dir;
      if(st.a>(st.pa||0)+1e-4){ // aprendosi, l'anta spinge via gli npc che ha davanti; solo il giocatore la ferma
        const A=rest+ang*sg,sx=(horiz?X+1:mx),sy=(horiz?my:Y+1),Lq=(horiz?T:n*T)-2,q=[sx,sy,sx+Math.cos(A)*Lq,sy+Math.sin(A)*Lq];
        const vx=q[2]-q[0],vy=q[3]-q[1],ll=vx*vx+vy*vy||1;let hit=false;
        for(const a of act){if(((horiz?a.y-my:a.x-mx)*st.dir)<=4)continue;
          const u=Math.max(0,Math.min(1,((a.x-q[0])*vx+(a.y-q[1])*vy)/ll)),qx=q[0]+vx*u,qy=q[1]+vy*u,dd=Math.hypot(a.x-qx,a.y-qy);
          if(dd>=11)continue;
          if(a===P){hit=true;break}
          const nx=dd>.5?(a.x-qx)/dd:(horiz?0:st.dir),ny=dd>.5?(a.y-qy)/dd:(horiz?st.dir:0),k=12-dd;
          window.__noLeaf=1;const ox=a.x,oy=a.y;moveEnt(a,nx*k,ny*k);window.__noLeaf=0;
          if(Math.hypot(a.x-ox,a.y-oy)<.5)moveEnt(a,horiz?0:st.dir*k,horiz?st.dir*k:0)}
        if(hit){st.a=st.pa||0;st.v=0;ang=Math.min(1.8,st.a)*st.dir}}
      st.pa=st.a;
      g.save();
      let hx,hy;
      if(horiz){hx=X+1;hy=my}else{hx=mx;hy=Y+1}
      g.translate(hx,hy);g.rotate(rest+ang*sg);
      const L=(horiz?T:n*T)-2,w=9;
      {const A=rest+ang*sg;st.seg=[hx,hy,hx+Math.cos(A)*L,hy+Math.sin(A)*L]}
      g.fillStyle='rgba(10,6,4,.3)';g.fillRect(2,w/2-1,L,w);
      g.fillStyle='#8a5a2c';g.fillRect(0,-w/2,L,w);g.strokeStyle='#2a1508';g.lineWidth=1.6;g.strokeRect(0,-w/2,L,w);
      g.strokeStyle='#b88650';g.lineWidth=1;for(let i=1;i<5;i++){g.beginPath();g.moveTo(L*i/5,-w/2+1);g.lineTo(L*i/5,w/2-1);g.stroke()}
      g.fillStyle='#3a3a42';g.beginPath();g.arc(0,0,2.8,0,7);g.fill();
      g.restore();
    }
  }
  // la Sirena attraccata sul lato nord e la passerella
  if(K.deck===0){
  const bob=Math.sin(t*1.3)*2,sx=cx(35);
  g.save();g.translate(0,bob);
  const hx0=wx(26),hx1=wx(46),hy1=wy(0)-6,hy0=hy1-186;
  g.fillStyle='rgba(4,40,70,.3)';g.beginPath();g.ellipse((hx0+hx1)/2+6,hy1-76,(hx1-hx0)/2+10,86,0,0,7);g.fill();
  const hp=()=>{g.beginPath();g.moveTo(hx0+30,hy0+8);g.bezierCurveTo((hx0+hx1)/2,hy0-10,hx1-80,hy0+4,hx1+10,hy0+60);g.bezierCurveTo(hx1-6,hy0+150,hx1-80,hy1,(hx0+hx1)/2,hy1+4);g.lineTo(hx0+30,hy1);g.quadraticCurveTo(hx0-6,hy0+90,hx0+30,hy0+8);g.closePath()};
  hp();g.fillStyle='#8a2a1c';g.fill();g.strokeStyle='#1c0f06';g.lineWidth=3;g.stroke();
  g.save();g.translate(0,0);hp();g.clip();
  g.fillStyle='#c8975a';g.fillRect(hx0+20,hy0+22,hx1-hx0-40,hy1-hy0-40);
  g.strokeStyle='rgba(70,40,15,.5)';g.lineWidth=1.2;for(let y=hy0+22;y<hy1-20;y+=9){g.beginPath();g.moveTo(hx0+20,y);g.lineTo(hx1-20,y);g.stroke()}
  g.restore();
  hp();g.strokeStyle='#f4e2b0';g.lineWidth=3;g.stroke();
  for(const mx of[hx0+110,hx0+190]){g.fillStyle='#3a2410';g.beginPath();g.arc(mx,hy0+93,8,0,7);g.fill();g.strokeStyle='#f4e2b0';g.lineWidth=1.4;g.beginPath();g.arc(mx,hy0+93,11,0,7);g.stroke()}
  g.fillStyle='#fff6dc';g.strokeStyle='rgba(30,16,6,.9)';g.lineWidth=4;g.font='800 15px Nunito,Arial';g.textAlign='center';g.strokeText('La Sirena',(hx0+hx1)/2,hy0+98);g.fillText('La Sirena',(hx0+hx1)/2,hy0+98);
  g.restore();
  // passerella
  g.fillStyle='#b88a55';g.strokeStyle='#3a200c';g.lineWidth=2;g.fillRect(sx-17,wy(0)-14+bob,34,T+16-bob*0);g.strokeRect(sx-17,wy(0)-14+bob,34,T+16);
  g.strokeStyle='rgba(60,30,10,.5)';for(let i=1;i<6;i++){g.beginPath();g.moveTo(sx-17,wy(0)-14+i*10+bob);g.lineTo(sx+17,wy(0)-14+i*10+bob);g.stroke()}
  g.fillStyle='#6a3e1c';g.fillRect(sx-19,wy(0)-14+bob,3,T+16);g.fillRect(sx+16,wy(0)-14+bob,3,T+16);
  }
}
/* ---------------- arredi: sprite statici in cache + effetti dinamici ---------------- */
const PAD=100,PC={};
const WD={edge:'#2a160a'};
/* scatola in prospettiva: B = linea di terra davanti, fd = profondità del piano, h = altezza */
function bx(g,x,B,w,fd,h,top,front,o){
  o=o||{};
  g.fillStyle=front;g.fillRect(x,B-h,w,h);
  if(!o.noPlank){g.fillStyle='rgba(0,0,0,.15)';for(let yy=B-h+9;yy<B-3;yy+=9)g.fillRect(x,yy,w,1.4)}
  g.fillStyle='rgba(0,0,0,.28)';g.fillRect(x,B-h,w,3);
  g.fillStyle=top;g.fillRect(x,B-h-fd,w,fd);
  g.fillStyle='rgba(255,240,200,.26)';g.fillRect(x,B-h-fd,w,3);g.fillRect(x,B-h-fd,2.5,fd);
  g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x+w-3,B-h-fd,3,fd+h);
  g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x,B-4,w,4);
  g.strokeStyle=WD.edge;g.lineWidth=2;g.strokeRect(x+1,B-h-fd+1,w-2,h+fd-2);
  g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1.4;g.beginPath();g.moveTo(x+1,B-h);g.lineTo(x+w-1,B-h);g.stroke();
}
const PK={};
const ell=(g,x,y,rx,ry,f,s,lw)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);if(f){g.fillStyle=f;g.fill()}if(s){g.strokeStyle=s;g.lineWidth=lw||1.4;g.stroke()}};
const candle=(g,x,y)=>{g.fillStyle='#f4efe0';g.fillRect(x-2,y-8,4,8);g.fillStyle='#ffd23a';g.beginPath();g.ellipse(x,y-11,2.2,3.4,0,0,7);g.fill();const gr=g.createRadialGradient(x,y-10,1,x,y-10,16);gr.addColorStop(0,'rgba(255,220,120,.55)');gr.addColorStop(1,'rgba(255,220,120,0)');g.fillStyle=gr;g.fillRect(x-16,y-26,32,32)};
const plate=(g,x,y)=>{ell(g,x,y,8,4,'#f4efe0','#6a5a3a',1);ell(g,x,y,4.5,2.2,'rgba(0,0,0,.12)')};
const mug=(g,x,y)=>{g.fillStyle='#c8a050';g.fillRect(x-3,y-8,7,8);g.strokeStyle='#3a2410';g.lineWidth=1.2;g.strokeRect(x-3,y-8,7,8);g.beginPath();g.arc(x+5,y-4,2.6,-1.4,1.4);g.stroke();ell(g,x+.5,y-8,3.5,1.6,'#5a2a14')};
PK.rum=(g,gw,gd)=>{
  const x=gw/2,y=16;
  ell(g,x,y+1,7,3,'rgba(0,0,0,.28)');
  const q=g.createLinearGradient(x-6,0,x+6,0);q.addColorStop(0,'#1f5a38');q.addColorStop(.45,'#3f9a62');q.addColorStop(1,'#16402a');
  g.fillStyle=q;rrect(g,x-6,y-15,12,16,4);g.fill();g.strokeStyle='#0c2a1a';g.lineWidth=1.2;g.stroke();
  g.fillStyle=q;g.fillRect(x-2.4,y-26,4.8,12);g.strokeRect(x-2.4,y-26,4.8,12);
  g.fillStyle='#c8a060';g.fillRect(x-2.8,y-29,5.6,4);g.strokeStyle='#5a3a14';g.lineWidth=1;g.strokeRect(x-2.8,y-29,5.6,4);
  g.fillStyle='#f4e6c0';g.fillRect(x-5,y-11,10,7);g.strokeStyle='#7a5a2a';g.lineWidth=.8;g.strokeRect(x-5,y-11,10,7);
  g.fillStyle='#b8402e';g.fillRect(x-3,y-9,6,1.6);g.fillRect(x-3,y-6.6,4,1.2);
  g.fillStyle='rgba(255,255,255,.55)';g.fillRect(x-4,y-13,1.6,9)};
PK.bed=(g,gw,gd)=>{
  g.fillStyle='#3a200c';g.fillRect(4,0,gw-8,gd-4);
  g.fillStyle='#5a3418';g.fillRect(4,0,gw-8,18);g.fillStyle='#8a5a2a';g.fillRect(4,0,gw-8,5);
  g.fillStyle='#e0b04a';for(const px of[7,gw-15]){g.fillRect(px,-20,8,26);ell(g,px+4,-22,6,5,'#f2c04a','#8a6a1a',1.2)}
  g.fillStyle='#f1e7cf';g.fillRect(9,20,gw-18,gd-36);
  for(const px of[13,gw/2+3]){rrect(g,px,22,gw/2-18,18,6);g.fillStyle='#fffdf4';g.fill();g.strokeStyle='rgba(120,100,70,.55)';g.lineWidth=1;g.stroke()}
  g.fillStyle='#b8402e';g.fillRect(9,46,gw-18,gd-62);g.fillStyle='#e0b04a';g.fillRect(9,46,gw-18,3);
  g.fillStyle='rgba(255,255,255,.12)';g.fillRect(9,49,gw-18,5);
  g.fillStyle='#e0b04a';for(let i=0;i<5;i++)g.fillRect(16+i*((gw-40)/4),58,6,6);
  g.fillStyle='rgba(0,0,0,.18)';g.fillRect(9,gd-20,gw-18,5);
  g.fillStyle='#5a3418';g.fillRect(4,gd-17,gw-8,13);g.fillStyle='#8a5a2a';g.fillRect(4,gd-17,gw-8,3);
  g.strokeStyle=WD.edge;g.lineWidth=2;g.strokeRect(4,0,gw-8,gd-4)};
PK.bunk=(g,gw,gd,e)=>{
  const B=gd-4,col=e.c||'#a8503a';
  g.fillStyle='#4a2c14';g.fillRect(3,B-34,7,34);g.fillStyle='#8a5a2a';g.fillRect(3,B-34,7,3);g.strokeStyle=WD.edge;g.lineWidth=1.6;g.strokeRect(3,B-34,7,34);
  bx(g,8,B,gw-12,16,12,'#8a6030','#5a3418');
  g.fillStyle='#efe3c4';g.fillRect(11,B-12-16+2,gw-18,12);
  g.fillStyle=col;g.fillRect(34,B-12-16+2,gw-40,12);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(34,B-12-16+2+8,gw-40,4);g.fillStyle='rgba(255,255,255,.2)';g.fillRect(34,B-12-16+2,gw-40,2);
  rrect(g,13,B-12-16+3,18,10,4);g.fillStyle='#fffdf4';g.fill();g.strokeStyle='rgba(120,100,70,.6)';g.lineWidth=1;g.stroke();
  g.fillStyle='#e0b04a';ell(g,6.5,B-37,3,2.4,'#e0b04a')};
function tbl(g,gw,gd,e,topC,frontC,h){
  const B=gd-4,fd=gd-18;
  g.fillStyle='#2e1a0a';g.fillRect(5,B-h,6,h);g.fillRect(gw-11,B-h,6,h);
  bx(g,2,B-3,gw-4,fd,h-3,topC,frontC);
  const ty=B-3-(h-3)-fd;return{ty,fd}}
PK.table=(g,gw,gd,e)=>{
  const{ty,fd}=tbl(g,gw,gd,e,'#b8864c','#6a4220',16),cy0=ty+fd/2+3;
  if(e.t==='prep'){
    g.fillStyle='#e6d6a8';g.fillRect(gw*.12,ty+4,gw*.3,fd-8);g.strokeStyle='#8a6a3a';g.lineWidth=1.2;g.strokeRect(gw*.12,ty+4,gw*.3,fd-8);
    g.fillStyle='#7aa860';ell(g,gw*.2,cy0,5,3,'#7aa860');ell(g,gw*.28,cy0+1,4,3,'#d8603a');ell(g,gw*.34,cy0-1,4,2.6,'#e0b04a');
    g.strokeStyle='#cfd6de';g.lineWidth=2;g.beginPath();g.moveTo(gw*.14,cy0+7);g.lineTo(gw*.26,cy0+5);g.stroke();
    g.fillStyle='#34343c';g.fillRect(gw*.62,cy0-6,gw*.24,14);ell(g,gw*.74,cy0-6,gw*.12,5,'#4a4a54','#1a1a20',1.6);ell(g,gw*.74,cy0-6,gw*.09,3.4,'#7a3a1a');
    g.fillStyle='#34343c';g.fillRect(gw*.86,cy0-4,8,3)}
  else{plate(g,gw*.28,cy0);plate(g,gw*.72,cy0);mug(g,gw*.46,cy0+1);candle(g,gw*.54,cy0+2)}};
PK.longtable=(g,gw,gd,e)=>{
  const t=e.t||'mess';
  const top=t==='council'?'#8a5a30':t==='dice'?'#a87a46':'#b8864c',front=t==='council'?'#4a2c14':'#6a4220';
  const h=t==='council'?20:16,{ty,fd}=tbl(g,gw,gd,e,top,front,h);
  if(t==='mess'){const n=Math.floor(gw/44);for(let i=0;i<n;i++){const x=gw*(i+.5)/n;plate(g,x-8,ty+fd*.42);mug(g,x+10,ty+fd*.5);if(i%2)ell(g,x+2,ty+fd*.72,6,3,'#d8b070','#8a6030',1)}}
  else if(t==='dice'){g.fillStyle='#2e6a46';rrect(g,gw*.14,ty+3,gw*.72,fd-6,5);g.fill();g.strokeStyle='#e0b04a';g.lineWidth=1.6;g.stroke();
    for(const[dx,dy]of[[.4,.45],[.55,.58]]){g.fillStyle='#fffdf4';g.fillRect(gw*dx,ty+fd*dy-4,9,9);g.strokeStyle='#3a2410';g.lineWidth=1;g.strokeRect(gw*dx,ty+fd*dy-4,9,9);g.fillStyle='#222';g.fillRect(gw*dx+2,ty+fd*dy-2,2,2);g.fillRect(gw*dx+5,ty+fd*dy+1,2,2)}
    for(const[dx,dy]of[[.25,.5],[.7,.4],[.72,.65]])ell(g,gw*dx,ty+fd*dy,4,2.4,'#f2c04a','#8a6a1a',1);
    mug(g,gw*.2,ty+fd*.75)}
  else{g.fillStyle='#e6d6a8';g.save();g.translate(gw*.2,ty+5);g.fillRect(0,0,gw*.5,fd-10);g.strokeStyle='#7a5a2a';g.lineWidth=1.2;g.strokeRect(0,0,gw*.5,fd-10);g.strokeStyle='#5a7a4a';g.lineWidth=1.6;g.beginPath();g.moveTo(8,fd-18);g.bezierCurveTo(30,4,60,fd-14,gw*.5-10,8);g.stroke();g.strokeStyle='#a02a1e';g.lineWidth=2;g.beginPath();g.moveTo(gw*.35,6);g.lineTo(gw*.35+8,14);g.moveTo(gw*.35+8,6);g.lineTo(gw*.35,14);g.stroke();g.restore();
    candle(g,gw*.1,ty+fd*.7);candle(g,gw*.9,ty+fd*.7);g.strokeStyle='#e8e0c8';g.lineWidth=2;g.beginPath();g.moveTo(gw*.78,ty+fd*.7);g.lineTo(gw*.84,ty+fd*.35);g.stroke()}};
PK.maptable=(g,gw,gd,e)=>{
  const{ty,fd}=tbl(g,gw,gd,e,'#6a4a2a','#3a2410',20);
  g.fillStyle='#2f78a8';rrect(g,gw*.08,ty+3,gw*.84,fd-6,3);g.fill();g.strokeStyle='#e0b04a';g.lineWidth=1.6;g.stroke();
  g.fillStyle='#d8c58a';for(const[a,b,r]of[[.25,.45,9],[.5,.55,12],[.72,.4,8]])ell(g,gw*a,ty+fd*b,r,r*.55,'#d8c58a','#7a5a2a',1);
  g.strokeStyle='#a02a1e';g.lineWidth=1.4;g.setLineDash([3,3]);g.beginPath();g.moveTo(gw*.18,ty+fd*.7);g.lineTo(gw*.5,ty+fd*.45);g.lineTo(gw*.8,ty+fd*.65);g.stroke();g.setLineDash([]);
  ell(g,gw*.86,ty+fd*.3,7,7,'#f4efe0','#3a2410',1.2);g.fillStyle='#a02a1e';g.beginPath();g.moveTo(gw*.86,ty+fd*.3-6);g.lineTo(gw*.86+2.5,ty+fd*.3);g.lineTo(gw*.86-2.5,ty+fd*.3);g.fill();
  g.fillStyle='#d83a2a';for(const[a,b]of[[.3,.4],[.62,.5]]){g.beginPath();g.arc(gw*a,ty+fd*b,2.4,0,7);g.fill()}
  candle(g,gw*.04,ty+fd*.5)};
PK.chair=(g,gw,gd,e)=>{
  const d=e.d||'d',wood='#7a4c22',cush='#a02a1e';
  const seat=(x,y,w,h)=>{g.fillStyle='#4a2a12';g.fillRect(x+1,y+h-1,4,8);g.fillRect(x+w-5,y+h-1,4,8);g.fillStyle=wood;g.fillRect(x,y,w,h);g.fillStyle=cush;g.fillRect(x+2,y+2,w-4,h-4);g.fillStyle='rgba(255,255,255,.2)';g.fillRect(x+2,y+2,w-4,3);g.strokeStyle=WD.edge;g.lineWidth=1.6;g.strokeRect(x+.8,y+.8,w-1.6,h-1.6)};
  const back=(x,y,w,h)=>{g.fillStyle=wood;g.fillRect(x,y,w,h);g.fillStyle='rgba(255,236,190,.25)';g.fillRect(x,y,w,2);g.strokeStyle=WD.edge;g.lineWidth=1.6;g.strokeRect(x+.8,y+.8,w-1.6,h-1.6);g.fillStyle='rgba(0,0,0,.28)';for(let i=1;i<3;i++){if(w>h)g.fillRect(x+i*w/3,y+2,1.5,h-4);else g.fillRect(x+2,y+i*h/3,w-4,1.5)}};
  if(d==='d'){back(11,6,22,12);seat(11,18,22,18)}
  else if(d==='u'){seat(11,10,22,18);back(10,28,24,11)}
  else if(d==='l'){seat(9,14,22,20);back(31,6,8,30)}
  else{seat(13,14,22,20);back(5,6,8,30)}};
PK.bench=(g,gw,gd)=>{const B=gd-8;g.fillStyle='#2e1a0a';g.fillRect(8,B-8,5,8);g.fillRect(gw-13,B-8,5,8);bx(g,3,B-7,gw-6,14,3,'#a87a46','#6a4220')};
PK.wardrobe=(g,gw,gd)=>{
  const B=gd-4;bx(g,2,B,gw-4,gd-16,66,'#c89a5a','#7a4c22',{noPlank:1});
  const x=2,w=gw-4,y=B-66;
  g.fillStyle='#5a3418';g.fillRect(x,y,w,7);g.fillStyle='#e0b04a';g.fillRect(x,y+7,w,2);
  for(let i=0;i<2;i++){const px=x+5+i*(w/2-1);g.strokeStyle='#3a200c';g.lineWidth=1.8;g.strokeRect(px,y+14,w/2-9,42);g.fillStyle='rgba(255,236,190,.1)';g.fillRect(px+3,y+17,w/2-15,15);g.strokeStyle='rgba(0,0,0,.3)';g.strokeRect(px+3,y+17,w/2-15,15);g.strokeRect(px+3,y+35,w/2-15,15)}
  g.fillStyle='#3a200c';g.fillRect(gw/2-1.5,y+9,3,47);
  g.fillStyle='#f2c04a';for(const px of[gw/2-9,gw/2+6])ell(g,px,y+36,2.6,2.6,'#f2c04a','#8a6a1a',1);
  g.fillStyle='#4a2a12';g.fillRect(x+4,B-5,8,5);g.fillRect(x+w-12,B-5,8,5)};
PK.bookshelf=(g,gw,gd)=>{
  const B=gd-4,w=gw-4,h=62;bx(g,2,B,w,gd-18,h,'#c89a5a','#4a2a12',{noPlank:1});
  const y=B-h;g.fillStyle='#241408';g.fillRect(6,y+6,w-8,h-12);
  const cs=['#b02a22','#2f78a8','#5a8a46','#e0b04a','#7a4a8a','#c8603a','#3a5a6a','#d8d0b8'],rnd=mkRnd(gw*7+gd);
  for(let r=0;r<3;r++){const ry=y+6+r*18;let x=8;while(x<w-8){const bw=3+((rnd()*5)|0),bh=11+((rnd()*5)|0);g.fillStyle=cs[(rnd()*cs.length)|0];g.fillRect(x,ry+16-bh,bw,bh);g.fillStyle='rgba(255,255,255,.22)';g.fillRect(x,ry+16-bh,1.2,bh);x+=bw+1}
    g.fillStyle='#8a5a2a';g.fillRect(6,ry+16,w-8,3)}
  g.fillStyle='#e0b04a';g.fillRect(2,y,w,3)};
PK.globe=(g,gw,gd)=>{
  const cx0=gw/2;ell(g,cx0,gd-7,13,4.5,'#3a200c','#1a0c04',1.2);g.fillStyle='#6a4220';g.fillRect(cx0-2,gd-24,4,17);
  g.strokeStyle='#e0b04a';g.lineWidth=2.6;g.beginPath();g.arc(cx0,gd-30,15,Math.PI*.75,Math.PI*2.25);g.stroke();
  const gr=g.createRadialGradient(cx0-5,gd-36,2,cx0,gd-30,14);gr.addColorStop(0,'#6fb4e0');gr.addColorStop(1,'#1f5a8a');g.fillStyle=gr;g.beginPath();g.arc(cx0,gd-30,12.5,0,7);g.fill();
  g.fillStyle='#7aa860';g.beginPath();g.ellipse(cx0-3,gd-33,5,3.4,.4,0,7);g.ellipse(cx0+4,gd-27,3.6,2.6,-.3,0,7);g.fill();
  g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=.8;g.beginPath();g.ellipse(cx0,gd-30,12.5,5,0,0,7);g.stroke();g.strokeStyle=WD.edge;g.lineWidth=1.2;g.beginPath();g.arc(cx0,gd-30,12.5,0,7);g.stroke()};
PK.chest=(g,gw,gd,e)=>{
  const B=gd-6,med=e.med;
  bx(g,6,B,gw-12,14,13,med?'#e8e0cc':'#9a6632',med?'#d8d0b8':'#6a3e1c');
  const x=6,w=gw-12,ty=B-13-14;
  g.fillStyle=med?'#c8c0a8':'#8a8f9a';g.fillRect(x+4,ty,5,27);g.fillRect(x+w-9,ty,5,27);
  if(med){g.fillStyle='#d83a2a';g.fillRect(gw/2-2.5,ty+3,5,13);g.fillRect(gw/2-6.5,ty+7,13,5)}
  else{g.fillStyle='#f2c04a';g.fillRect(gw/2-4,B-13-3,8,9);g.strokeStyle='#8a6a1a';g.lineWidth=1;g.strokeRect(gw/2-4,B-13-3,8,9);g.fillStyle='#3a2410';g.fillRect(gw/2-1,B-13+1,2,3)}};
PK.desk=(g,gw,gd)=>{
  const{ty,fd}=tbl(g,gw,gd,{},'#b07a3e','#7a4c22',24);
  g.fillStyle='rgba(0,0,0,.28)';for(let i=0;i<3;i++){g.fillRect(14+i*(gw-28)/3,gd-4-3-18,(gw-28)/3-8,13);}
  g.fillStyle='#f2c04a';for(let i=0;i<3;i++)ell(g,14+i*(gw-28)/3+((gw-28)/3-8)/2,gd-4-3-12,2.4,2.4,'#f2c04a');
  g.fillStyle='#f4efe0';g.fillRect(gw*.12,ty+6,28,fd-12);g.strokeStyle='#8a7a5a';g.lineWidth=1;g.strokeRect(gw*.12,ty+6,28,fd-12);g.fillStyle='rgba(60,40,20,.5)';for(let i=0;i<4;i++)g.fillRect(gw*.12+4,ty+10+i*5,20,1.4);
  g.fillStyle='#e6d6a8';g.fillRect(gw*.34,ty+9,22,12);g.strokeStyle='#8a7a5a';g.strokeRect(gw*.34,ty+9,22,12);
  ell(g,gw*.62,ty+fd*.5,5,3.4,'#1a1a20','#5a5a64',1);g.strokeStyle='#f4efe0';g.lineWidth=2;g.beginPath();g.moveTo(gw*.64,ty+fd*.5);g.lineTo(gw*.7,ty+fd*.22);g.stroke();
  g.fillStyle='#d8412f';g.beginPath();g.arc(gw*.78,ty+fd*.55,3.4,0,7);g.fill();candle(g,gw*.9,ty+fd*.7)};
PK.barrel=(g,gw,gd,e)=>{
  const bx0=gw/2,by=gd-8,pw=!!e.powder;
  g.fillStyle=pw?'#3e3830':'#7a4c22';g.fillRect(bx0-14,by-30,28,30);
  g.fillStyle=pw?'#2a2620':'#5a3418';g.fillRect(bx0+6,by-30,8,30);g.fillStyle='rgba(255,236,190,.18)';g.fillRect(bx0-14,by-30,5,30);
  g.fillStyle=pw?'#b82a22':'#4a2a12';for(const yy of[-24,-8])g.fillRect(bx0-14,by+yy,28,3.4);
  g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=1;for(const xx of[-7,0,7]){g.beginPath();g.moveTo(bx0+xx,by-30);g.lineTo(bx0+xx,by);g.stroke()}
  ell(g,bx0,by-30,14,7,pw?'#4e463c':'#9a6632','#2a160a',2);ell(g,bx0,by-30,10,4.6,'rgba(0,0,0,.18)');
  g.strokeStyle='#2a160a';g.lineWidth=2;g.strokeRect(bx0-14,by-30,28,30);
  if(pw){g.fillStyle='#e8e0cc';g.beginPath();g.arc(bx0,by-16,4.4,0,7);g.fill();g.fillRect(bx0-2.6,by-13,5.2,3.4);g.fillStyle='#241408';g.fillRect(bx0-2.4,by-17.6,1.8,2);g.fillRect(bx0+.6,by-17.6,1.8,2)}};
PK.sack=(g,gw,gd)=>{
  const x=gw/2,y=gd-6;g.fillStyle='#b8a070';g.beginPath();g.moveTo(x-14,y);g.bezierCurveTo(x-20,y-14,x-12,y-26,x-5,y-31);g.lineTo(x+5,y-31);g.bezierCurveTo(x+12,y-26,x+20,y-14,x+14,y);g.closePath();g.fill();g.strokeStyle='#3a2a14';g.lineWidth=2;g.stroke();
  g.fillStyle='rgba(255,240,200,.28)';g.beginPath();g.ellipse(x-6,y-14,4,9,.2,0,7);g.fill();
  g.strokeStyle='#6a4a1a';g.lineWidth=3;g.beginPath();g.moveTo(x-6,y-28);g.lineTo(x+6,y-28);g.stroke();g.fillStyle='#8a6a2a';g.beginPath();g.moveTo(x-7,y-31);g.lineTo(x-11,y-37);g.lineTo(x-3,y-33);g.moveTo(x+7,y-31);g.lineTo(x+11,y-37);g.lineTo(x+3,y-33);g.fill()};
PK.coil=(g,gw,gd)=>{const x=gw/2,y=gd/2+3;ell(g,x,y+3,19,10,'rgba(0,0,0,.25)');for(let i=0;i<4;i++)ell(g,x,y-i*1.2,17-i*3.4,9-i*1.8,i%2?'#b89a5a':'#a08444','#4a3414',1.4);ell(g,x,y-4,4,2,'#2a1c08')};
PK.bucket=(g,gw,gd)=>{const x=gw/2,y=gd-8;g.fillStyle='#7a4c22';g.beginPath();g.moveTo(x-11,y-22);g.lineTo(x+11,y-22);g.lineTo(x+8,y);g.lineTo(x-8,y);g.closePath();g.fill();g.strokeStyle='#2a160a';g.lineWidth=2;g.stroke();
  g.fillStyle='#8a8f9a';g.fillRect(x-10,y-16,20,2.6);g.fillRect(x-8.6,y-6,17,2.6);ell(g,x,y-22,11,4.4,'#2f5a7a','#2a160a',1.6);g.strokeStyle='#8a8f9a';g.lineWidth=1.6;g.beginPath();g.arc(x,y-22,11,Math.PI,0);g.stroke()};
PK.stove=(g,gw,gd)=>{
  const B=gd-4;g.fillStyle='#2a2a30';g.fillRect(gw-30,B-110,14,84);g.fillStyle='#4a4a54';g.fillRect(gw-33,B-114,20,8);g.strokeStyle='#14141a';g.lineWidth=1.6;g.strokeRect(gw-30,B-110,14,84);
  bx(g,3,B,gw-6,gd-18,32,'#5a5a64','#34343c',{noPlank:1});
  g.fillStyle='#1a1a20';g.beginPath();g.moveTo(14,B-4);g.lineTo(14,B-16);g.arc(26,B-16,12,Math.PI,0);g.lineTo(38,B-4);g.closePath();g.fill();g.strokeStyle='#6a6a74';g.lineWidth=1.6;g.stroke();
  g.fillStyle='#8a8f9a';ell(g,gw-52,B-32-14,10,4,'#2a2a30','#6a6a74',1.4);for(const px of[gw-70,gw-52])ell(g,px,B-32-12,9,3.6,'#14141a','#6a6a74',1.2);
  g.fillStyle='#8a5a2a';g.fillRect(gw-12,B-32-26,3,18)};
PK.rack=(g,gw,gd,e)=>{
  const B=gd-6;g.fillStyle='#5a3418';g.fillRect(4,B-46,gw-8,46);g.strokeStyle=WD.edge;g.lineWidth=2;g.strokeRect(4,B-46,gw-8,46);g.fillStyle='rgba(255,236,190,.18)';g.fillRect(4,B-46,gw-8,3);
  g.fillStyle='#3a200c';g.fillRect(4,B-40,gw-8,5);g.fillRect(4,B-14,gw-8,5);
  const n=Math.floor((gw-16)/14);
  for(let i=0;i<n;i++){const x=12+i*((gw-24)/(n-1)),k=i%3;
    if(k===1){g.fillStyle='#6a4220';g.fillRect(x-2,B-44,4,42);g.fillStyle='#2e2e36';g.fillRect(x-1.4,B-62,2.8,20);g.fillStyle='#8a5a2a';g.fillRect(x-3,B-30,6,10)}
    else{g.fillStyle='#d4dbe4';g.fillRect(x-2,B-62,4,38);g.fillStyle='#ffffff';g.fillRect(x-2,B-62,1.4,38);g.fillStyle='#e0b04a';g.fillRect(x-7,B-25,14,4);g.fillStyle='#4a2c18';g.fillRect(x-2.4,B-21,5,14);ell(g,x,B-6,3.4,3.4,'#e0b04a','#8a6a1a',1)}}};
PK.armor=(g,gw,gd)=>{
  const x=gw/2,B=gd-5;g.fillStyle='#3a200c';g.fillRect(x-14,B-5,28,5);g.fillRect(x-2.5,B-52,5,48);
  g.fillStyle='#9aa2b0';g.beginPath();g.moveTo(x-13,B-48);g.lineTo(x+13,B-48);g.lineTo(x+10,B-22);g.lineTo(x-10,B-22);g.closePath();g.fill();g.strokeStyle='#2a2e38';g.lineWidth=1.8;g.stroke();
  g.fillStyle='rgba(255,255,255,.4)';g.fillRect(x-9,B-46,5,22);g.fillStyle='#5a6070';g.fillRect(x-10,B-34,20,2.4);
  ell(g,x-16,B-46,6,5,'#b4bcc8','#2a2e38',1.4);ell(g,x+16,B-46,6,5,'#b4bcc8','#2a2e38',1.4);
  g.fillStyle='#8a929e';g.beginPath();g.arc(x,B-58,10,Math.PI,0);g.lineTo(x+10,B-52);g.lineTo(x-10,B-52);g.closePath();g.fill();g.stroke();g.fillStyle='#14141a';g.fillRect(x-7,B-57,14,3.4);
  g.fillStyle='#b02a22';g.beginPath();g.moveTo(x-1,B-68);g.quadraticCurveTo(x+14,B-76,x+10,B-60);g.lineTo(x+2,B-62);g.closePath();g.fill();
  g.fillStyle='#a02a1e';g.fillRect(x-9,B-22,18,12);g.fillStyle='#e0b04a';g.fillRect(x-9,B-22,18,2)};
PK.cannon=(g,gw,gd,e)=>{
  const dd=e.d>0?1:-1,cx0=gw/2,cy0=gd/2;
  // affusto di legno + ruote
  g.fillStyle='#5a3418';g.fillRect(cx0-12,cy0-10,24,26);g.strokeStyle=WD.edge;g.lineWidth=1.8;g.strokeRect(cx0-12,cy0-10,24,26);
  g.fillStyle='#2a1a0a';for(const px of[cx0-16,cx0+10])g.fillRect(px,cy0+2,6,16);
  // canna
  const y0=dd>0?cy0-14:cy0-8,y1=dd>0?cy0+20:cy0+14;
  const gr=g.createLinearGradient(cx0-8,0,cx0+8,0);gr.addColorStop(0,'#3a3a42');gr.addColorStop(.35,'#6a6a74');gr.addColorStop(1,'#14141a');
  g.fillStyle=gr;g.fillRect(cx0-8,Math.min(y0,y1),16,Math.abs(y1-y0));g.strokeStyle='#0a0a0e';g.lineWidth=1.6;g.strokeRect(cx0-8,Math.min(y0,y1),16,Math.abs(y1-y0));
  g.fillStyle='#8a8f9a';g.fillRect(cx0-10,dd>0?y1-5:y1-1+(dd<0?-0:0),20,6);
  const my=dd>0?y1+1:y0-1;g.fillStyle='#0a0a0e';ell(g,cx0,my,6,3,'#0a0a0e');
  ell(g,cx0,dd>0?y0-2:y1+2,6,6,'#2a2a32','#0a0a0e',1.4);
  g.fillStyle='rgba(255,255,255,.25)';g.fillRect(cx0-5,Math.min(y0,y1)+3,2.4,Math.abs(y1-y0)-8);
  g.strokeStyle='#8a6a3a';g.lineWidth=2;g.beginPath();g.moveTo(cx0-12,cy0+14);g.quadraticCurveTo(cx0,cy0+22,cx0+12,cy0+14);g.stroke()};
const __pkw={};function pkWrap(){if(__pkw.d)return;__pkw.d=1;for(const[kd,im,wr]of[['barrel','P/barile',.9],['coil','P/corda',1]]){const old=PK[kd];if(!old)continue;PK[kd]=function(g,gw,gd,e){const i=bImg(im);if(!i)return old(g,gw,gd,e);const w=gw*wr,h=w*i.naturalHeight/i.naturalWidth;g.drawImage(i,(gw-w)/2,gd-h-2,w,h)}}}
function bPropsOk(){return !!(bImg('P/barile')&&bImg('P/corda'))}
function spr(e){
  const key=(bPropsOk()?'M':'')+e.kind+'|'+e.gw+'x'+e.gh+'|'+(e.c||'')+(e.t||'')+(e.d||'')+(e.plain?'p':'')+(e.powder?'w':'')+(e.med?'m':'');
  pkWrap();let c=PC[key];
  if(!c){const gw=e.gw*T,gd=e.gh*T;c=document.createElement('canvas');c.width=gw+16;c.height=gd+PAD+10;const g=c.getContext('2d');g.translate(8,PAD);g.lineCap='round';PK[e.kind](g,gw,gd,e);PC[key]=c}
  return c}
function drawMast(g,e,t,x0,y0,gw,gd){
  const bx0=x0+T/2,by=y0+T-6;
  g.save();if(P.y<by&&P.y>by-200&&Math.abs(P.x-bx0)<60)g.globalAlpha=.4;
  g.fillStyle='rgba(10,8,20,.28)';g.beginPath();g.ellipse(bx0,by,20,9,0,0,7);g.fill();
  g.fillStyle='#3a2410';g.beginPath();g.ellipse(bx0,by,16,8,0,0,7);g.fill();g.strokeStyle='#e0b04a';g.lineWidth=2;g.beginPath();g.ellipse(bx0,by,16,8,0,0,7);g.stroke();
  g.fillStyle='#6a4426';g.fillRect(bx0-8,by-190,16,190);g.fillStyle='rgba(255,230,170,.25)';g.fillRect(bx0-8,by-190,4,190);g.fillStyle='rgba(0,0,0,.2)';g.fillRect(bx0+4,by-190,4,190);
  g.strokeStyle='#2a160a';g.lineWidth=2;g.strokeRect(bx0-8,by-190,16,190);
  g.fillStyle='#4a2a12';for(const yy of[-30,-70,-110,-150])g.fillRect(bx0-8,by+yy,16,5);
  g.fillStyle='#e8dcc0';g.fillRect(bx0-46,by-176,92,22);g.strokeRect(bx0-46,by-176,92,22);g.fillStyle='#d8c79a';g.fillRect(bx0-46,by-154,92,6);
  g.fillStyle='#b02a22';g.fillRect(bx0-12,by-175,24,20);g.fillStyle='#e8b82a';g.fillRect(bx0-12,by-169,24,8);
  g.strokeStyle='rgba(40,26,12,.8)';g.lineWidth=1.6;g.beginPath();g.moveTo(bx0,by-170);g.lineTo(bx0-50,by-8);g.moveTo(bx0,by-170);g.lineTo(bx0+50,by-8);g.stroke();
  g.lineWidth=1;for(let i=1;i<6;i++){const yy=by-170+i*27,xo=50*i/6.3;g.beginPath();g.moveTo(bx0-xo,yy);g.lineTo(bx0+xo,yy);g.stroke()}
  g.restore()}
function drawProp(g,e,t){
  const gw=e.gw*T,gd=e.gh*T,x0=wx(e.gx),y0=wy(e.gy),k=e.kind;
  if(k==='mast')return drawMast(g,e,t,x0,y0,gw,gd);
  if(k==='rum'&&(K.rum||K.rumTaken))return;
  g.save();
  if(k==='crate'){g.fillStyle='rgba(10,8,20,.0)';drawSilverChest(g,x0+T/2,y0+T-4,t,e.gx+e.gy,!!K[e.obj]);g.restore();return}
  if(k!=='coil'&&k!=='bench'&&k!=='chair'){g.fillStyle='rgba(10,8,20,.26)';g.beginPath();g.ellipse(x0+gw/2,y0+gd-3,gw*.48,Math.max(5,gd*.15),0,0,7);g.fill()}
  {const fade=TALL.indexOf(k)>=0&&P.y<e.y&&e.y-P.y<200&&Math.abs(P.x-(x0+gw/2))<gw/2+38;
   if(fade){e.fa=Math.max(.38,(e.fa==null?1:e.fa)-.12)}else if(e.fa!=null&&e.fa<1)e.fa=Math.min(1,e.fa+.1);
   if(e.fa!=null&&e.fa<1)g.globalAlpha=e.fa}
  g.drawImage(spr(e),x0-8,y0-PAD);g.globalAlpha=1;
  /* effetti dinamici */
  const o=e.obj;
  if(k==='chest'&&K.deck===0&&!K.key1&&K.keyAt!=null&&e.gx===KEYSP[K.keyAt].gx&&e.gy===KEYSP[K.keyAt].gy){const a=.5+.5*Math.sin(t*5);g.fillStyle='rgba(255,246,200,'+a+')';g.beginPath();g.arc(x0+gw-10,y0+gd-34,3+a*2,0,7);g.fill()}
  if(k==='rum'){const a=.5+.5*Math.sin(t*5);g.fillStyle='rgba(255,246,200,'+a+')';g.beginPath();g.arc(x0+gw/2+10,y0-9,3+a*2,0,7);g.fill()}
  if(k==='chest'&&o==='med'&&!K.medUsed){const a=.5+.5*Math.sin(t*4);g.fillStyle='rgba(255,255,255,'+(.4+.5*a)+')';g.beginPath();g.arc(x0+gw-9,y0+gd-36,2.6+a*2,0,7);g.fill()}
  if(k==='barrel'&&e.red){if(!K.key2){g.fillStyle='#d8412f';g.beginPath();g.arc(x0+T/2+4,y0+T-8-31,3.5,0,7);g.fill();const a=.5+.5*Math.sin(t*5);g.fillStyle='rgba(255,246,200,'+a+')';g.beginPath();g.arc(x0+T/2+10,y0+T-8-38,3+a*2,0,7);g.fill()}else{g.fillStyle='#d8412f';g.beginPath();g.arc(x0+T/2+4,y0+T-8-31,3.5,0,7);g.fill()}}
  if(k==='stove'){const f=.5+.3*Math.sin(t*9);g.fillStyle='rgba(255,150,60,'+f+')';g.beginPath();g.moveTo(x0+18,y0+gd-8);g.quadraticCurveTo(x0+26,y0+gd-24-f*4,x0+34,y0+gd-8);g.fill();g.fillStyle='rgba(255,230,120,'+(f+.2)+')';g.beginPath();g.moveTo(x0+23,y0+gd-8);g.quadraticCurveTo(x0+26,y0+gd-18,x0+29,y0+gd-8);g.fill()}
  if(k==='table'&&e.t==='prep'){for(let i=0;i<3;i++){const ph=(t*.9+i*.33)%1;g.fillStyle='rgba(240,240,240,'+(.45*(1-ph))+')';g.beginPath();g.arc(x0+gw*.74+Math.sin(t*2+i)*4,y0+gd-4-19-14-ph*30,4+ph*5,0,7);g.fill()}}
  if(k==='rack'&&o==='sword'&&!K.sword){const a=.5+.5*Math.sin(t*4);g.fillStyle='rgba(255,236,150,'+(.3+.5*a)+')';g.save();g.translate(x0+gw/2,y0+gd-52);g.rotate(t*.6);g.fillRect(-1.4,-8,2.8,16);g.fillRect(-8,-1.4,16,2.8);g.restore()}
  if(k==='cannon'&&o==='lure'){const a=.5+.5*Math.sin(t*4);const rdy=(K.lureCd||0)<=0;g.fillStyle=rdy?'rgba(255,170,60,'+(.4+.5*a)+')':'rgba(180,180,190,.35)';g.beginPath();g.arc(x0+T/2,y0+T/2+(e.d>0?24:-20),3.4+a*(rdy?2:0),0,7);g.fill()}
  if(k==='maptable'&&K.routesT>0){g.fillStyle='rgba(255,240,170,'+(.2+.2*Math.sin(t*6))+')';g.fillRect(x0+4,y0+gd-60,gw-8,36)}
  g.restore();
}


/* ---- personaggi dell'interno: disegni di Muse (mondo B), solo con la Mappa di prova ---- */
const BCH=/*@@BCH@@*/null,BCHI={},BWHO={Guardia:'guardia',Comandante:'comandante',Lupo:'alleato',Barba:'alleato',Moro:'alleato',Gina:'alleato',Zeno:'alleato'};
function bImg(k){if(typeof VEGPG==='undefined'||!VEGPG||!BCH||!BCH[k])return null;let o=BCHI[k];if(!o){o=BCHI[k]=new Image();o.src='data:image/webp;base64,'+BCH[k]}return o.complete&&o.naturalWidth?o:null}
function bPose(ch,o){
  const back=o.dir==='b',mv=!!o.moving,fl=!!o.flip,ph=o.walk||0,i=1+Math.floor((((ph/(Math.PI*2))%1)+1)%1*4);
  const atk=o.sab&&o.sab.r>.5;
  if(atk){if(back||(o.dir==='f'&&!fl))return {k:ch+'/fronte-attacco'};return {k:ch+'/profilo-destro-attacco'+((Math.floor((o.t||0)*9)%2)+1),mir:fl}}
  if(back)return {k:ch+'/spalle-'+(mv?'passo'+i:'fermo')};
  if(mv)return {k:ch+'/profilo-'+(fl?'sinistro':'destro')+'-passo'+i};
  return {k:ch+'/fronte-fermo'}}
function drawChar2(g,x,y,o){
  const ch=o.k&&BWHO[o.k.name];
  if(ch){
    const P=bPose(ch,o);let im=bImg(P.k);if(!im&&P.k.indexOf('attacco2')>0)im=bImg(P.k.replace('attacco2','attacco1'));
    if(im){
      const sc=(o.s||1)*(ch==='comandante'?1.06:1)*70/376,W=336*sc,H=376*sc;
      g.save();g.translate(x,y);
      if(o.alpha!=null)g.globalAlpha=o.alpha;
      if(!o.noShadow){g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,0,14,5.4,0,0,7);g.fill()}
      if(P.mir)g.scale(-1,1);
      g.drawImage(im,-W/2,-H,W,H);
      if(P.mir)g.scale(-1,1);
      if(o.emote){g.translate(0,-H-6);const b=Math.sin((o.t||0)*6)*1.5;g.fillStyle='#fff';g.strokeStyle='#2a1a0e';g.lineWidth=1.6;g.beginPath();g.arc(0,b,9,0,7);g.fill();g.stroke();g.fillStyle=o.emote==='?'?'#2a6aa8':'#d8412f';g.font='700 14px Nunito,Arial,sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText(o.emote,0,b+1)}
      g.restore();return}
  }
  return drawChar(g,x,y,o)}
function charO(e,t,extra){return Object.assign({k:CH[e.who],dir:e.dir||'f',flip:e.flip,t:t+e.ph,walk:e.wk||0,moving:!!e.mv,side:!!e.mv&&(e.dir!=='b')},extra||{})}
function swordFx(g,x,y,a,len,col,skin){
  g.save();g.translate(x,y);g.rotate(a);
  g.fillStyle=col||'#dfe6ee';g.strokeStyle='#4a5560';g.lineWidth=1.2;g.beginPath();g.moveTo(5,-2);g.lineTo(5+len,-1);g.lineTo(5+len+5,0);g.lineTo(5+len,1);g.lineTo(5,2);g.closePath();g.fill();g.stroke();
  g.fillStyle='#fff';g.globalAlpha=.55;g.fillRect(7,-1.4,len-4,.9);g.globalAlpha=1;
  g.fillStyle='#d9b04a';g.fillRect(3,-6,3,12);g.fillStyle='#4a2c18';g.fillRect(-5,-1.7,8,3.4);
  if(skin){g.fillStyle=skin;g.beginPath();g.arc(-.5,0,3.5,0,7);g.fill();g.strokeStyle='rgba(60,30,10,.55)';g.lineWidth=1;g.stroke()}
  g.restore()}
/* sciabola in mano: la mano è quella disegnata da drawChar (braccio articolato fino all'elsa) */
function bladeAt(g,sb,len,col,e){const h=sb&&sb.out;if(!h)return;swordFx(g,h.x,h.y,sb.a,len,col,e.skin||(CH[e.who]&&CH[e.who].skin))}
function sabIdle(flip){return -Math.PI/2+(flip?-.28:.28)}
function sabSwing(face,p){const sd=Math.cos(face)<0?-1:1;return face+sd*(-1.2+2.4*p)}
function sabParry(face){const sd=Math.cos(face)<0?-1:1;return face-sd*1.3}
function swingA(base,dir,p){return base+dir*(-1.15+2.3*p)}
function allyHpPips(g,e){
  if(e.hp>=e.maxhp&&!e.flash)return;g.save();g.textAlign='center';g.font='800 12px Nunito,Arial';g.lineWidth=3;g.strokeStyle='rgba(30,10,10,.8)';
  let h='';for(let i=0;i<e.maxhp;i++)h+=i<e.hp?'♥':'♡';g.strokeText(h,e.x,e.y-82);g.fillStyle=e.ally?'#8fe08f':'#ff6f7f';g.fillText(h,e.x,e.y-82);g.restore()}
function drawLying(g,e,t,label){
  {const ch=CH[e.who]&&BWHO[CH[e.who].name],im=ch&&bImg(ch+'/fronte-terra');if(im){const sc=70/376*(ch==='comandante'?1.06:1);g.save();g.translate(e.x,e.y);g.fillStyle='rgba(20,25,10,.3)';g.beginPath();g.ellipse(0,-4,26,8,0,0,7);g.fill();g.drawImage(im,-336*sc/2,-376*sc,336*sc,376*sc);g.restore()}else{
  g.save();g.translate(e.x,e.y);g.rotate(1.35);drawChar2(g,0,0,charO(e,t,{moving:false,noShadow:1}));g.restore();}}
  g.fillStyle='#fff6dc';g.font='800 14px Nunito,Arial';g.textAlign='center';g.fillText(label,e.x+6,e.y-40+Math.sin(t*3)*3)}
function drawSleeper(g,e,t){
  const x0=wx(e.bunk[0]),y0=wy(e.bunk[1]);
  g.save();g.translate(x0+2*T-18,y0+24);g.rotate(-1.38);
  drawChar2(g,0,0,charO(e,t,{moving:false,noShadow:1,dir:'f'}));
  g.restore();
  // coperta sulle gambe, la testa resta sul cuscino
  g.fillStyle=e.bcol;g.fillRect(x0+38,y0+14,46,13);g.fillStyle='rgba(0,0,0,.2)';g.fillRect(x0+38,y0+22,46,5);g.fillStyle='rgba(255,255,255,.2)';g.fillRect(x0+38,y0+14,46,2);
  g.fillStyle='#e0b04a';g.fillRect(x0+38,y0+14,3,13);
  if(!(e.ko>0)){g.save();g.textAlign='center';g.lineWidth=3;g.strokeStyle='rgba(30,20,10,.75)';
    for(let i=0;i<3;i++){const p=(t*.55+i*.33)%1;g.globalAlpha=Math.sin(p*Math.PI);g.font='800 '+(10+i*3)+'px Nunito,Arial';g.fillStyle='#fff6dc';g.strokeText('z',x0+20+i*8+p*6,y0-2-p*22-i*4);g.fillText('z',x0+20+i*8+p*6,y0-2-p*22-i*4)}g.restore()}
}
function drawCards(g,x,y,t,seed){
  g.save();g.translate(x,y);
  for(let i=0;i<3;i++){g.save();g.rotate((i-1)*.34+Math.sin(t*1.3+seed)*.05);g.fillStyle='#fffdf4';g.strokeStyle='#4a3a28';g.lineWidth=1;rrect(g,-4,-11,8,12,1.6);g.fill();g.stroke();g.fillStyle=i===1?'#c8302a':'#222';g.font='800 6px Arial';g.textAlign='center';g.fillText(i===1?'♥':'♠',0,-3);g.restore()}
  g.restore()}
function drawEnt(g,e,t){
  if(e.dk!==undefined&&e.dk!==K.deck)return;
  if(e.k==='prop')return drawProp(g,e,t);
  if(e.guard){
    if(e.who==='guardiaz'){drawSleeper(g,e,t);return}
    const ko=e.ko>0;
    if(ko){drawLying(g,e,t,e.cmd?'✦ ✦ ✦':'z z z');return}
    if(e.flash>0){g.save();g.globalAlpha=.55+.45*Math.sin(t*60)}
    const fa=e.face!=null?e.face:(e.flip?Math.PI:0),sb=e.swing>0?{a:sabSwing(fa,1-e.swing/.32),r:.95}:{a:sabIdle(e.flip),r:.3};
    drawChar2(g,e.x,e.y,charO(e,t,e.st==='chase'?{emote:'!',sab:sb}:(e.st==='suspect'||e.st==='search')?{emote:(e.dwell>0&&e.st==='suspect'?'🍺':'?'),sab:sb}:{sab:sb}));
    bladeAt(g,sb,24,null,e);
    if(e.flash>0)g.restore();
    if(e.off==='cards')drawCards(g,e.x,e.y-70,t,e.ph);
    allyHpPips(g,e);return}
  if(e.duel){
    if(e.ko>0){drawLying(g,e,t,'z z z');return}
    if(e.flash>0){g.save();g.globalAlpha=.55+.45*Math.sin(t*60)}
    try{
    const jit=Math.sin(t*9+e.ph)*(e.sw>0?2.2:.8);
    const a0=e.flip?Math.PI:0,p=e.sw>0?1-e.sw/.34:0,sb=e.sw>0?{a:sabSwing(a0,p),r:.95}:{a:sabIdle(e.flip),r:.3};
    drawChar2(g,e.x+jit*(e.flip?-1:1),e.y,charO(e,t,{moving:false,sab:sb}));
    bladeAt(g,sb,22,null,e);if(e.hp!=null&&e.hp<3)allyHpPips(g,{x:e.x,y:e.y,hp:e.hp,maxhp:3,flash:0,ally:0});
    }finally{if(e.flash>0)g.restore()}
    return}
  if(e.cap){drawChar2(g,e.x,e.y,charO(e,t,{moving:false,emote:'?'}));return}
  if(e.ally&&e.hp<=0){drawLying(g,e,t,'✚');return}
  if(e.ally){
    if(e.flash>0){g.save();g.globalAlpha=.55+.45*Math.sin(t*60)}
    const fa=e.face!=null?e.face:(e.flip?Math.PI:0),sb=e.swing>0?{a:sabSwing(fa,1-e.swing/.32),r:.95}:{a:sabIdle(e.flip),r:.3};
    drawChar2(g,e.x,e.y,charO(e,t,{sab:sb}));
    bladeAt(g,sb,22,null,e);
    if(e.flash>0)g.restore();
    allyHpPips(g,e);return}
  drawChar2(g,e.x,e.y,charO(e,t));
}
function drawTop(g,t){
  if(!K)return;
  // anello d'ombra sfocato: lontano dal personaggio la nave e' un po' piu' scura
  {const R=820,q=g.createRadialGradient(P.x,P.y,110,P.x,P.y,R);
   q.addColorStop(0,'rgba(8,5,16,0)');q.addColorStop(.25,'rgba(8,5,16,.14)');q.addColorStop(.5,'rgba(8,5,16,.36)');q.addColorStop(.78,'rgba(8,5,16,.58)');q.addColorStop(1,'rgba(8,5,16,.66)');
   g.fillStyle=q;g.fillRect(P.x-R-40,P.y-R-40,R*2+80,R*2+80)}
  // riflesso caldo delle lanterne (sopra al pavimento e ai personaggi, leggero)
  for(const[lx,ly]of LAMPS){const X0=cx(lx),Y=cy(ly),fl=1+.05*Math.sin(t*7+lx),sw=Math.sin(t*1.25+lx*.9+ly*.5)*2.8,X=X0+sw;   // la nave dondola: le lanterne oscillano appena
    g.fillStyle='#2a1a0a';g.fillRect(X0-2,Y-46,4,6);g.strokeStyle='#2a1a0a';g.lineWidth=1.6;g.beginPath();g.moveTo(X0,Y-41);g.lineTo(X,Y-35);g.stroke();
    g.fillStyle='rgba(255,210,110,.95)';g.beginPath();g.ellipse(X,Y-30,6,8*fl,sw*.03,0,7);g.fill();g.fillStyle='rgba(255,255,230,.9)';g.beginPath();g.arc(X,Y-30,2.5,0,7);g.fill()}
  if(K.routesT>0){
    g.save();g.setLineDash([10,8]);g.lineWidth=3;g.lineCap='round';
    for(const gd of K.gd){if(gd.ko>0||gd.off||(gd.cmd&&!gd.duel))continue;
      g.strokeStyle='rgba(255,120,90,'+(.5+.25*Math.sin(t*5))+')';
      const pts=gd.wp.map(w=>[cx(w[0]),(OY+w[1]+.92)*T-22]);g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));if(pts.length>2)g.closePath();g.stroke();
      g.setLineDash([]);const f=gd.face==null?0:gd.face;g.fillStyle='rgba(255,70,50,.13)';g.beginPath();g.moveTo(gd.x,gd.y-22);g.arc(gd.x,gd.y-22,(K.alarm?340:290)*.8,f-(K.alarm?1.3:1.05),f+(K.alarm?1.3:1.05));g.closePath();g.fill();g.setLineDash([10,8])}
    g.restore()}
  for(const q of K.fx){const a=1-q.t/q.life;
    if(q.k==='boom'){const p=q.t/q.life;g.fillStyle='rgba(255,200,90,'+(a*.85)+')';g.beginPath();g.arc(q.x,q.y,20+p*54,0,7);g.fill();for(let i=0;i<6;i++){g.fillStyle='rgba(205,205,212,'+(a*.65)+')';g.beginPath();g.arc(q.x+Math.cos(i*1.3)*p*64,q.y-p*52+Math.sin(i*2.1)*14,14+p*28,0,7);g.fill()}}
    if(q.k==='slash'){g.save();g.translate(q.x,q.y-26);g.rotate(Math.atan2(q.dy,q.dx));g.strokeStyle='rgba(255,255,255,'+a+')';g.lineWidth=7*a+2;g.lineCap='round';g.beginPath();g.arc(0,0,48,-.9+q.t*3,.9+q.t*3);g.stroke();g.restore()}
    else if(q.k==='star'){g.fillStyle='rgba(255,230,120,'+a+')';g.font='800 20px Nunito,Arial';g.textAlign='center';g.fillText('✦',q.x+Math.sin(q.t*9)*8,q.y-q.t*14)}
    else if(q.k==='spark'){g.strokeStyle='rgba(255,240,170,'+a+')';g.lineWidth=2.4;g.lineCap='round';for(let i=0;i<6;i++){const an=i*1.05+q.t*3,r1=4+q.t*30,r2=r1+8;g.beginPath();g.moveTo(q.x+Math.cos(an)*r1,q.y+Math.sin(an)*r1);g.lineTo(q.x+Math.cos(an)*r2,q.y+Math.sin(an)*r2);g.stroke()}}
    else if(q.k==='flash'){g.fillStyle='rgba(255,90,90,'+a*.7+')';g.beginPath();g.arc(q.x,q.y,26*(1+q.t*2),0,7);g.fill()}
    else if(q.k==='bot'){const p=q.t/q.life,x=q.x0+(q.x1-q.x0)*p,y=q.y0+(q.y1-q.y0)*p-Math.sin(p*Math.PI)*54;g.save();g.translate(x,y);g.rotate(p*14);g.fillStyle='#2f8a52';g.strokeStyle='#0c2a1a';g.lineWidth=1.2;rrect(g,-4,-8,8,12,3);g.fill();g.stroke();g.fillRect(-1.6,-14,3.2,7);g.strokeRect(-1.6,-14,3.2,7);g.restore()}
    else if(q.k==='glass'&&q.t>=0){const p=q.t/q.life;g.fillStyle='rgba(214,150,40,'+(.5*(1-p*.6))+')';g.beginPath();g.ellipse(q.x,q.y+6,16+p*12,6+p*4,0,0,7);g.fill();
      for(let i=0;i<7;i++){const an=i*.9+.3,r=8+p*34*(.6+.1*(i%3));g.fillStyle='rgba(190,240,220,'+Math.max(0,1-p*1.2)+')';g.save();g.translate(q.x+Math.cos(an)*r,q.y-4+Math.sin(an)*r*.6-Math.sin(Math.min(1,p*2.4)*3.1)*14);g.rotate(an+p*6);g.fillRect(-2.5,-1,5,2);g.restore()}}}
  {const sb=K.sb;if(sb&&sb.out){bladeAt(g,sb,K.parry?(K.sword?34:28):(K.swingT>0?(K.sword?38:30):(K.sword?32:26)),K.sword?'#fff2c4':null,heroSpec());
   if(K.parry){ // arco di luce davanti al giocatore
     const f=Math.atan2(K.fdy,K.fdx),pu=.5+.5*Math.sin(t*14);g.save();g.lineCap='round';g.strokeStyle='rgba(170,215,255,'+(.35+.25*pu)+')';g.lineWidth=5;g.beginPath();g.arc(P.x,P.y-24,44,f-1.2,f+1.2);g.stroke();
     g.strokeStyle='rgba(255,255,255,'+(.55+.3*pu)+')';g.lineWidth=1.8;g.beginPath();g.arc(P.x,P.y-24,44,f-1.2,f+1.2);g.stroke();g.restore()}}}
  // indicatore sull'oggetto da usare
  const o=K.near;if(o){const y=o.y-62+Math.sin(t*5)*3;g.fillStyle='#fff6dc';g.strokeStyle='#3a200c';g.lineWidth=3;g.font='800 13px Nunito,Arial';g.textAlign='center';g.strokeText(o.label,o.x,y);g.fillText(o.label,o.x,y);g.fillStyle='#ffd23a';g.beginPath();g.moveTo(o.x-7,y+8);g.lineTo(o.x+7,y+8);g.lineTo(o.x,y+16);g.closePath();g.fill();g.stroke()}
  // lampeggio del giocatore quando colpito
}
/* ---------------- avvio ---------------- */
function buildHud(){
  document.body.classList.add('w4');
  const d=document.createElement('div');d.id='c4';
  d.innerHTML='<div id="c4top"><div class="pl" id="c4hh"></div><div class="pl" id="c4key"></div><div class="pl">🪙 <span id="c4sv">0</span></div><div class="pl">💰 <span id="c4db">0</span>/9</div><div class="pl" id="c4rm" style="display:none">🍾 Rum</div></div><div id="c4alarm"></div><div class="pl" id="c4obj"></div><div id="c4say"></div><div id="c4fade" style="position:absolute;inset:0;background:#000;opacity:0;transition:opacity .22s;pointer-events:none"></div><button class="bt" id="c4use">Usa</button><button class="bt" id="c4par">Para</button><button class="bt" id="c4hit">Attacca</button>';
  $('hud').appendChild(d);
  const press=(el,fn)=>el.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();auInit();fn()});
  press($('c4use'),useBtn);press($('c4hit'),attack);
  {const pb=$('c4par'),on=e=>{e.preventDefault();e.stopPropagation();auInit();setParry(true)},off=e=>{e.preventDefault();e.stopPropagation();setParry(false)};
   pb.addEventListener('pointerdown',on);for(const ev of['pointerup','pointercancel','pointerleave','lostpointercapture'])pb.addEventListener(ev,off);pb.addEventListener('contextmenu',e=>e.preventDefault())}
  addEventListener('keydown',e=>{if(e.code==='KeyG'&&!e.repeat)setParry(true)});addEventListener('keyup',e=>{if(e.code==='KeyG')setParry(false)});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)setParry(false)});
  addEventListener('keydown',e=>{if(e.code==='Space'||e.code==='KeyE'){e.preventDefault();useBtn()}if(e.code==='KeyF'){e.preventDefault();attack()}});
}
function boot(){
  buildHud();mkSpecs();
  S=newState('Capitano',window.__hero||'m');
  S.live=true;S.tod=12;S.wx={k:'clear',t:1e9};S.flags={moved:1,parrot:1};S.tutDone=1;S.tut=null;S.q={};
  const sp=[cx(35),(OY+3.95)*T];S.px=sp[0];S.py=sp[1];
  $('start').hidden=true;
  try{beginGame()}catch(e){console.error('beginGame',e)}
  S.flags.parrot=1;P.mode='walk';S.mode='walk';
  FOG.fill(1);FOGDIRTY=true;cam.uz=1;
  K={hp:6,maxhp:6,key1:false,key2:false,cell:false,hold:false,silver:0,pris:0,kos:0,caught:0,t:0,inv:0,atk:0,over:false,notes:{},tr:[],fol:[],gd:[],objs:[],say:[],sayT:0,parN:20,lastProg:0,fx:[],fdx:1,fdy:0,field:null,fieldT:0,rooms:{},readDesk:false,dt:.016,lastSay:0,dob:0,sword:false,medUsed:false,stew:false,alarm:false,lureCd:0,routesT:0,mLv:0,mHold:0,back:0,readPlan:false,chasedPre:false,keyAt:(Math.random()*3)|0,rum:0,rumTaken:false};
  P.x=sp[0];P.y=sp[1];P.dir='f';cam.x=P.x;cam.y=P.y;K.tr=[{x:P.x,y:P.y}];
  let car=null;try{const q=localStorage.getItem('sm_c34');if(q)car=JSON.parse(q)}catch(e){}
  K.carry=car;
  K.deck=0;K.fol=[mkChar('tito',34,3),mkChar('nives',36,3)];
  K.stay=[];
  if(car&&car.pris===2){K.key1=true;K.cell=true;K.pris=2;K.stay.push(mkChar('pip',34,12,{dk:0,stay:1}),mkChar('dodo',37,13,{dk:0,stay:1}))}
  for(const f of K.fol.concat(K.stay))initAlly(f);
  setDeck(0,35,3.95,true);
  PAR.x=P.x-30;PAR.y=P.y;
}
function playerSab(){
  if(!K)return null;const f=Math.atan2(K.fdy,K.fdx);let sb;
  if(K.parry)sb={a:sabParry(f),r:.5};
  else if(K.swingT>0)sb={a:sabSwing(f,1-K.swingT/.32),r:.95};
  else sb={a:sabIdle(P.flip),r:.3};
  K.sb=sb;return sb}
window.Ch4={OFF_BY,PORTS_BY,drawGulls,creak,triggerAlarm,wakeOff,startDuel,stepRats,noiseAt,KEYSP,throwRum,starRes,goal,objText,sab:playerSab,mtick:(t,b)=>assaultTick(t,b),auInit:()=>auInit(),setDeck,bfsFrom,GP_BY,cx,cy,OX,OY,T,DECKS,get MW(){return MW},get MH(){return MH},get P(){return P},get cam(){return cam},get AU(){return AU},mood:()=>musicMood(),tp(gx,gy){P.x=cx(gx);P.y=cy(gy);cam.x=P.x;cam.y=P.y;K.tr=[{x:P.x,y:P.y}]},use:useBtn,atk:attack,boot,step,drawFloor,drawTop,drawEnt,get K(){return K},dump(){return G.map(r=>r.join('')).join('\n')}};
})();
