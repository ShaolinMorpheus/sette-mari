/* ====== CAPITOLO 3 – IL CONVOGLIO (dentro il motore dell'isola) ====== */
(function(){
if(typeof WORLD==='undefined'||WORLD!==3)return;
const T=TS,TAU=Math.PI*2;
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const angD=(a,b)=>{let d=(b-a)%TAU;if(d>Math.PI)d-=TAU;if(d<-Math.PI)d+=TAU;return d};
const rr=(a,b)=>a+Math.random()*(b-a);
const toast=(h,ms)=>{if(/^<b>Biscotto/.test(String(h))&&AU.ctx&&AU.on)sfx('cra');const bx=$('toasts');if(bx)bx.innerHTML='';return UI.toast(String(h).replace(/<[^>]+>/g,''),ms||4200)};
const css=document.createElement('style');
css.textContent=`
body.w3 #vit,body.w3 #clock,body.w3 #res,body.w3 #chal,body.w3 #ctr,body.w3 #mini,body.w3 #obj,body.w3 #tank,body.w3 #bJ{display:none!important}
#c3{position:absolute;inset:0;pointer-events:none;z-index:6}
#c3 *{box-sizing:border-box}
#c3 .pl{position:absolute;pointer-events:none;font:800 14px var(--f-b,Nunito,sans-serif);color:#fff6dc;background:linear-gradient(#7a4c26,#5a3418);border:2px solid #3a200c;border-radius:12px;padding:4px 10px;box-shadow:0 2px 0 rgba(0,0,0,.35);white-space:nowrap}
#c3top{position:absolute;left:10px;top:8px;display:flex;gap:6px;flex-wrap:wrap;max-width:60%}
#c3top .pl{position:static}
#c3gun{position:absolute;left:50%;top:92px;transform:translateX(-50%);display:none;pointer-events:none;z-index:9;min-width:300px;max-width:70%;text-align:center;background:linear-gradient(#d8302a,#8e1612);color:#fff;border:4px solid #ffd23a;border-radius:16px;padding:10px 18px;font:900 20px/1.15 var(--f-b,Nunito,sans-serif);text-shadow:0 2px 0 rgba(0,0,0,.5);box-shadow:0 0 0 3px #3a0a08,0 6px 18px rgba(0,0,0,.55);animation:c3gp .7s ease-in-out infinite alternate}
#c3gun small{display:block;font-size:15px;font-weight:800;margin-top:3px;color:#ffe9a8}
@keyframes c3gp{from{transform:translateX(-50%) scale(1);filter:brightness(1)}to{transform:translateX(-50%) scale(1.07);filter:brightness(1.25)}}
#c3obj{left:50%;transform:translateX(-50%);top:46px;max-width:34%;text-align:center;white-space:normal!important;font-size:13px!important;background:rgba(40,22,8,.8)!important}
#c3 .bt{position:absolute;pointer-events:auto;border:3px solid #3a200c;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ffd98a,#e19a26);color:#3a200c;font:900 12px var(--f-b,Nunito,sans-serif);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-shadow:0 4px 0 rgba(0,0,0,.4);cursor:pointer;line-height:1.05;touch-action:none}
#c3 .bt:active{transform:translateY(2px)}
#c3 .bt[disabled]{filter:grayscale(.8) brightness(.8);opacity:.75}
#c3 .bt small{font-size:10px;opacity:.8;font-weight:800}
#c3 .sl{left:10px;top:96px;display:flex;flex-direction:column;gap:6px;position:absolute}
#c3 .sl .bt{position:static;width:58px;height:46px;border-radius:14px;font-size:14px;font-weight:900}
#c3 .sl .sltt{font:900 10px var(--f-b,Nunito,sans-serif);color:#fff6dc;background:rgba(40,22,8,.8);border-radius:8px;padding:3px 6px;text-align:center;letter-spacing:.5px}
#c3 .sl .bt.sel{background:radial-gradient(circle at 35% 30%,#fff3c8,#ffb73a);outline:3px solid #fff;outline-offset:1px}
#c3fire{left:76px;bottom:26px;width:92px;height:92px;font-size:16px}
#c3fire.lit{box-shadow:0 0 0 4px rgba(255,214,90,.9),0 0 22px 6px rgba(255,190,60,.8),0 4px 0 rgba(0,0,0,.4)}
.c3pl .row2{display:flex;gap:6px;align-items:center;margin:4px 0;flex-wrap:wrap}
.c3pl .row2 b{min-width:62px}
.c3pl .tg{border:2px solid #7a5a30;border-radius:10px;background:#f0dfb4;color:#3a200c;font:800 12px var(--f-b,Nunito,sans-serif);padding:5px 8px;cursor:pointer}
.c3pl .tg.on{background:linear-gradient(#ffd98a,#e19a26);border-color:#3a200c}
.c3pl .tm{flex:1;min-width:120px;text-align:left;padding:8px}
.c3pl .fx{font-size:12px;margin:2px 0;opacity:.9}
.c3pl .ok{color:#2a7a2a;font-weight:800}.c3pl .ko{color:#a02818;font-weight:800}
#c3bd{left:50%;margin-left:-48px;bottom:26px;width:96px;height:96px;font-size:15px;background:radial-gradient(circle at 35% 30%,#ffb0a0,#d8412f);color:#fff;display:none;animation:c3p 1s ease-in-out infinite}
@keyframes c3p{50%{transform:scale(1.12);box-shadow:0 0 0 10px rgba(255,120,90,.28)}}
#c3wind{position:absolute;right:12px;top:178px;width:60px;height:60px;border-radius:50%;background:rgba(40,22,8,.78);border:2px solid #3a200c}
#c3mini{position:absolute;right:10px;top:56px;width:112px;height:112px;border-radius:50%;border:4px solid #b8892e;box-shadow:0 3px 6px rgba(0,0,0,.45);background:#0e3d63}
#c3ov{position:absolute;inset:0;width:100%;height:100%}
#c3par{position:absolute;left:76px;top:100px;max-width:min(236px,27%);display:none;background:rgba(255,246,220,.76);color:#3a200c;border:2px solid rgba(58,32,12,.7);border-radius:12px 12px 12px 3px;padding:4px 8px;font:800 12px/1.25 var(--f-b,Nunito,sans-serif);box-shadow:0 2px 0 rgba(0,0,0,.2);pointer-events:none}#c3par b{color:#c8402e}
#c3tut{position:absolute;left:50%;transform:translateX(-50%);bottom:10px;width:min(390px,42%);pointer-events:auto;background:rgba(40,22,8,.9);border:3px solid #b8892e;border-radius:14px;color:#fff6dc;padding:8px 12px;font:700 13px/1.35 var(--f-b,Nunito,sans-serif);display:none;z-index:7}
#c3tut .tth{display:flex;justify-content:space-between;align-items:center;gap:8px}#c3tut .tth b{font-size:15px;color:#ffd98a}#c3tut .tth span{font-size:11px;letter-spacing:1px;color:#ffd98a}
#c3tut p{margin:4px 0 6px}#c3tut .ttb{display:flex;gap:8px;justify-content:flex-end}
#c3tut button{border:2px solid #3a200c;border-radius:10px;background:#f0dfb4;color:#3a200c;font:900 12px var(--f-b,Nunito,sans-serif);padding:6px 12px;cursor:pointer}#c3tut button.go{background:linear-gradient(#ffd98a,#e19a26)}
body.w3 #trow{left:auto!important;right:12px;top:8px}
body.w3 #bcol{bottom:calc(var(--dlgh,0px) + var(--c3tuth,0px) + 12px + var(--sb))}
#c3act{left:180px;right:auto;bottom:26px;width:84px;height:84px;font-size:15px;background:radial-gradient(circle at 35% 30%,#d4f4ff,#3aa6cf)}
body[data-hand=left] #c3fire{left:auto;right:76px}
body[data-hand=left] #c3act{left:auto;right:180px}
#c3act[disabled]{filter:grayscale(.6) brightness(.85)}
#c3zn{position:absolute;left:50%;transform:translateX(-50%);top:8px;max-width:34%;text-align:center;white-space:nowrap;font-size:13px}
`;
document.head.appendChild(css);

/* ---------------- dati ---------------- */
const TP=(x,y)=>[x*1.515*T,y*1.5*T];const TPp=(x,y)=>[(x+5.15)*T,(y+15)*T];
/* ---- EDITOR dei mondi speciali: salvataggio e dati (Novità → Editor galeone / viaggio finale) ---- */
const EXH=q=>{let a=0;for(let i=0;i<q.length;i++)a=(a*31+q.charCodeAt(i))|0;return a};
function exStore(tag,baked,empty){
  const K='sm_edx_'+tag,bs=JSON.stringify(baked||null),h=EXH(bs);
  let st=baked?JSON.parse(bs):empty();
  try{const l=JSON.parse(localStorage.getItem(K)||'null');if(l&&l.base===h&&l.st)st=l.st}catch(e){}
  return{st,save(){try{localStorage.setItem(K,JSON.stringify({base:h,st}))}catch(e){}},reset(){try{localStorage.removeItem(K)}catch(e){}},code:()=>JSON.stringify({w:'x'+tag.slice(1),st})};
}
const EXS=exStore(VOY?'w5':'w3',VOY?/*@@EXB5@@*/null:/*@@EXB3@@*/null,()=>VOY?{legs:{},cps:{}}:{wps:{},spec:{}});
const WPS0=[[MW-8,Math.round(MH*.78)],[130,112],[80,95],[110,50],[Math.round(MW*.5),6]];
if(!VOY)for(const i in EXS.st.wps)if(WPS0[i])WPS0[i]=EXS.st.wps[i].slice();
const ROUTE=VOY?[[0,0],[1,1]]:(function(){
  const W=MW,H=MH,cl0=new Int16Array(W*H).fill(999),q=[];
  for(let i=0;i<W*H;i++)if(!seaT[i]||blockT[i]){cl0[i]=0;q.push(i)}
  for(let h=0;h<q.length;h++){const i=q[h],x=i%W,y=(i/W)|0;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=W||ny>=H)continue;const j=ny*W+nx;if(cl0[j]>cl0[i]+1){cl0[j]=cl0[i]+1;q.push(j)}}}
  const near=(tx,ty,R)=>{let b=-1,bd=1e9;for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(cl0[y*W+x]<R)continue;const d=(x-tx)*(x-tx)+(y-ty)*(y-ty);if(d<bd){bd=d;b=y*W+x}}return b};
  const WPS=WPS0;
  const bfs=(st,gl,R)=>{const par=new Int32Array(W*H).fill(-2);par[st]=-1;const qq=[st];let found=false;
    for(let h=0;h<qq.length&&!found;h++){const i=qq[h],x=i%W,y=(i/W)|0;for(const[dx,dy]of[[-1,0],[0,-1],[0,1],[1,0]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=W||ny>=H)continue;const j=ny*W+nx;if(par[j]!==-2||cl0[j]<R)continue;par[j]=i;if(j===gl){found=true;break}qq.push(j)}}
    if(!found)return null;const path=[];for(let i=gl;i!==-1;i=par[i])path.push(i);return path.reverse()};
  for(const R of[12,10,8,6,5,4,3,2]){
    const ws=WPS.map(([x,y])=>near(x,y,R));if(ws.some(w=>w<0))continue;
    let all=[],ok=true;
    for(let k=0;k<ws.length-1;k++){const pa=bfs(ws[k],ws[k+1],R);if(!pa){ok=false;break}all=all.concat(k?pa.slice(1):pa)}
    if(!ok)continue;
    const pts=[];for(let k=0;k<all.length;k+=9)pts.push(all[k]);if(pts[pts.length-1]!==all[all.length-1])pts.push(all[all.length-1]);
    return pts.map(i=>[((i%W)+.5)*T,(((i/W)|0)+.5)*T]);
  }
  return [[(MW-8)*T,MH*.78*T],[MW*.5*T,6*T]];
})();
function routePos(a){let i=0;while(i<ROUTE.length-1){const d=Math.hypot(ROUTE[i+1][0]-ROUTE[i][0],ROUTE[i+1][1]-ROUTE[i][1]);if(a<=d)break;a-=d;i++}
  const A=ROUTE[i],B=ROUTE[Math.min(i+1,ROUTE.length-1)],d=Math.hypot(B[0]-A[0],B[1]-A[1])||1,t=Math.min(1,a/d);return{x:A[0]+(B[0]-A[0])*t,y:A[1]+(B[1]-A[1])*t,i:i+1,hd:Math.atan2(B[1]-A[1],B[0]-A[0])}}
const SPEC={
  sirena:{L:100,W:28,hull:8,name:'Sirena',hc:'#8a2a1c',dk:'#4a140c',trim:'#f4e2b0',sail:['#fff3d2','#d8c79a'],emb:'#c8402e',masts:[.34,-.16],mh:150,cannons:5},
  mercante:{L:70,W:22,hull:3,spd:90,name:'Mercantile',hc:'#9a7a4a',dk:'#5a4020',trim:'#e2c98a',sail:['#e9dfc4','#b9a77c'],emb:'#7a5a2a',masts:[.1],mh:110,cannons:0},
  pattuglia:{L:86,W:26,hull:4,spd:150,name:'Pattuglia',hc:'#233a63',dk:'#101c36',trim:'#9fb4d4',sail:['#e8eef8','#aebbd2'],emb:'#233a63',masts:[.3,-.2],mh:130,cannons:3},
  scorta:{L:92,W:28,hull:5,spd:135,name:'Scorta',hc:'#6a1a1a',dk:'#340a0a',trim:'#d6a46a',sail:['#f6ead0','#d0bc90'],emb:'#2a0a0a',masts:[.32,-.18],mh:138,cannons:4},
  galeone:{L:122,W:37,hull:8,spd:34,name:"Galeone d'argento",hc:'#4a3320',dk:'#241508',trim:'#f2c04a',sail:['#faf1d6','#d8c698'],emb:'#e0a820',masts:[.42,.02,-.34],mh:170,cannons:6},
  prigionieri:{L:112,W:34,hull:8,spd:70,name:'Nave dei prigionieri',hc:'#3a3a44',dk:'#16161c',trim:'#cfcfd8',sail:['#ffffff','#d0d4dc'],emb:'#888',masts:[.4,0,-.36],mh:160,cannons:2},
  fantasma:{L:112,W:34,hull:6,spd:104,name:'Il Gabbiano',hc:'#52706c',dk:'#27403e',trim:'#a8e0d0',sail:['#d6efe8','#9cc4ba'],emb:'#9fe8d0',masts:[.38,-.3],mh:132,cannons:0},
  brigantino:{L:78,W:23,hull:3,spd:172,name:'Brigantino',hc:'#4e3a6c',dk:'#241a38',trim:'#e6d3a0',sail:['#e2c6ff','#8f5fd0'],emb:'#ffe08a',masts:[.3,-.22],mh:128,cannons:2}
};
const SAILSPD=[0,62,118,170];
if(!VOY)for(const k in EXS.st.spec)if(SPEC[k])Object.assign(SPEC[k],EXS.st.spec[k]);
if(!VOY){ /* editor: rotta del convoglio + caratteristiche delle navi */
  const ITEMS=WPS0.map((w,i)=>({id:'w'+i,i,x:w[0]*T,y:w[1]*T,r:30,lab:i===0?'Partenza del galeone':i===WPS0.length-1?'Arrivo del galeone':'Tappa '+i,col:'#ffd23a',big:1}));
  const X={tag:'w3',snap:T,items:()=>ITEMS,
    name:it=>it.lab,info:it=>'casella '+WPS0[it.i][0]+','+WPS0[it.i][1],
    move(it,nx,ny){const gx=Math.round(nx/T),gy=Math.round(ny/T);WPS0[it.i]=[gx,gy];EXS.st.wps[it.i]=[gx,gy];it.x=gx*T;it.y=gy*T},
    draw(g,z){g.lineWidth=3/z;g.strokeStyle='rgba(255,210,60,.85)';g.beginPath();ROUTE.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.stroke();
      g.setLineDash([10/z,8/z]);g.strokeStyle='rgba(255,255,255,.7)';g.beginPath();ITEMS.forEach((q,i)=>i?g.lineTo(q.x,q.y):g.moveTo(q.x,q.y));g.stroke();g.setLineDash([])},
    save(){EXS.save()},code:()=>EXS.code(),reset(){EXS.reset()},
    buttons:[{t:'Navi',fn(){
      const rows=Object.keys(SPEC).map(k=>{const q=SPEC[k];return'<tr><td>'+q.name+'</td><td><input class="bkta" style="min-height:0;height:32px;width:64px" data-k="'+k+'" data-f="hull" value="'+q.hull+'"></td><td>'+(q.spd!=null?'<input class="bkta" style="min-height:0;height:32px;width:64px" data-k="'+k+'" data-f="spd" value="'+q.spd+'">':'—')+'</td><td>'+(q.cannons!=null?'<input class="bkta" style="min-height:0;height:32px;width:64px" data-k="'+k+'" data-f="cannons" value="'+q.cannons+'">':'—')+'</td></tr>'}).join('');
      sheetFor('<h2>Navi</h2><p class="sm">Colpi per affondare, velocità e cannoni di ogni nave. Dopo «Applica e rivedi» valgono nello scontro.</p><table style="width:100%;font-size:13px"><tr><th>Nave</th><th>Scafo</th><th>Veloc.</th><th>Cannoni</th></tr>'+rows+'</table><div class="row"><button class="btn" id="shNo">Chiudi</button><button class="btn gold" id="spOk">Salva</button></div><p class="sm" id="spSt"></p>',c=>{
        c.querySelector('#spOk').onclick=()=>{c.querySelectorAll('[data-k]').forEach(i=>{const v=+i.value;if(!isNaN(v)&&v>=0){const k=i.dataset.k,f=i.dataset.f;if(SPEC[k][f]!==v){SPEC[k][f]=v;(EXS.st.spec[k]=EXS.st.spec[k]||{})[f]=v}}});EXS.save();c.querySelector('#spSt').textContent='Salvato. Premi «Applica e rivedi» per provarle.'}})}}]};
  window.__EDX=X;
}
let C=null,SPR={};

/* ---------------- sprite delle navi (stesso stile dell'isola) ---------------- */
function hullSprite(k,fig,crew){
  const sp0=SPEC[k],L=sp0.L,w=sp0.W,Wd=Math.ceil(L*2+60+(fig?44:0)),Hd=Math.ceil(w*2+50);
  return sp(Wd,Hd,g=>{
    const cx=Wd/2,cy=Hd/2;
    g.fillStyle='rgba(6,40,60,.30)';g.beginPath();g.ellipse(cx+5,cy+9,L*1.02,w*1.02,0,0,7);g.fill();
    const hp=(s,ox)=>{s=s||1;g.beginPath();g.moveTo(cx+L*s+(ox||0),cy);g.bezierCurveTo(cx+L*.6*s,cy+w*1.0*s,cx+L*.05*s,cy+w*1.12*s,cx-L*.72*s,cy+w*.92*s);g.lineTo(cx-L*s,cy+w*.62*s);g.lineTo(cx-L*s,cy-w*.62*s);g.lineTo(cx-L*.72*s,cy-w*.92*s);g.bezierCurveTo(cx+L*.05*s,cy-w*1.12*s,cx+L*.6*s,cy-w*1.0*s,cx+L*s+(ox||0),cy);g.closePath()};
    // fiancata
    hp(1);let q=g.createLinearGradient(0,cy-w*1.1,0,cy+w*1.1);q.addColorStop(0,sp0.dk);q.addColorStop(.5,sp0.hc);q.addColorStop(1,sp0.dk);g.fillStyle=q;g.fill();g.lineWidth=2.4;g.strokeStyle='#1c0f06';g.stroke();
    // fascia colorata lungo il bordo
    hp(.97);g.lineWidth=3;g.strokeStyle=sp0.trim;g.globalAlpha=.85;g.stroke();g.globalAlpha=1;
    // ponte
    hp(.86);q=g.createLinearGradient(cx-L,0,cx+L,0);q.addColorStop(0,'#b88a55');q.addColorStop(.5,'#cfa066');q.addColorStop(1,'#b88a55');g.fillStyle=q;g.fill();g.lineWidth=1.6;g.strokeStyle='#3a200c';g.stroke();
    g.save();hp(.86);g.clip();
    g.strokeStyle='rgba(70,40,15,.5)';g.lineWidth=1.2;for(let y=-w;y<=w;y+=7){g.beginPath();g.moveTo(cx-L,cy+y);g.lineTo(cx+L,cy+y);g.stroke()}
    g.strokeStyle='rgba(60,30,10,.35)';for(let y=-w,i=0;y<=w;y+=7,i++){for(let x=-L+(i%3)*30;x<L;x+=90){g.beginPath();g.moveTo(cx+x,cy+y);g.lineTo(cx+x,cy+y+7);g.stroke()}}
    g.restore();
    // cannoni sui fianchi
    const n=sp0.cannons;
    for(let i=0;i<n;i++){const x=cx-L*.55+(L*1.1)*(n>1?i/(n-1):.5)*.9;
      for(const sd of[-1,1]){g.fillStyle='#161616';g.fillRect(x-6,cy+sd*w*.95-(sd<0?7:0),12,7);g.fillStyle='#4a4a52';g.fillRect(x-4,cy+sd*w*.95-(sd<0?5:-1),8,3)}}
    // cabina di poppa
    g.fillStyle='#6a3e1c';g.strokeStyle='#241008';g.lineWidth=1.6;g.beginPath();g.rect(cx-L*.96,cy-w*.52,L*.46,w*1.04);g.fill();g.stroke();
    g.fillStyle='#8a5a2a';g.fillRect(cx-L*.92,cy-w*.44,L*.38,w*.88);g.strokeStyle='rgba(30,14,4,.5)';for(let i=1;i<4;i++){g.beginPath();g.moveTo(cx-L*.92+i*L*.095,cy-w*.44);g.lineTo(cx-L*.92+i*L*.095,cy+w*.44);g.stroke()}
    g.fillStyle='#ffd45a';g.fillRect(cx-L*.98,cy-5,5,10);
    // boma e base degli alberi
    for(const m of sp0.masts){const x=cx+m*L;g.fillStyle='#3a2410';g.beginPath();g.arc(x,cy,6.5,0,7);g.fill();g.strokeStyle=sp0.trim;g.lineWidth=1.4;g.beginPath();g.arc(x,cy,9,0,7);g.stroke()}
    // bompresso
    g.strokeStyle='#5a3a1c';g.lineWidth=5;g.lineCap='round';g.beginPath();g.moveTo(cx+L*.9,cy);g.lineTo(cx+L+26,cy);g.stroke();
    g.strokeStyle='rgba(255,230,160,.5)';g.lineWidth=1.4;g.beginPath();g.moveTo(cx+L*.9,cy-1.5);g.lineTo(cx+L+26,cy-1.5);g.stroke();
    if(fig)YD.figPaint(g,cx+L+22,cy,fig,1.15);
    if(crew){try{YD.crewTop(g,YD.crew(),true,cx,cy,L,w,sp0.masts,5.2)}catch(e){}}   // equipaggio e capitano sul ponte (solo la Sirena del giocatore)
  },Wd/2,Hd/2);
}
function sailSprite(k,sel){
  const sp0=SPEC[k],h=sp0.mh,wd=Math.round(h*.66),Wd=wd+40,Hd=h+30;
  return sp(Wd,Hd,g=>{
    const cx=Wd*.38,by=Hd-8;
    if(sel){YD.sailPaint(g,cx,by,h,wd,YD.look(sel),1.5);return}
    const sg=g.createLinearGradient(cx,by-h*.9,cx+wd,by-h*.2);sg.addColorStop(0,sp0.sail[0]);sg.addColorStop(1,sp0.sail[1]);g.fillStyle=sg;
    const yt=by-h*.9,yb=by-h*.18;
    g.beginPath();g.moveTo(cx+3,yt);g.quadraticCurveTo(cx+wd*1.1,yt+h*.12,cx+wd*.92,yb-h*.04);
    g.lineTo(cx+wd*.74,yb+3);g.lineTo(cx+wd*.58,yb-4);g.lineTo(cx+wd*.4,yb+4);g.lineTo(cx+wd*.22,yb-3);g.lineTo(cx+3,yb+2);g.closePath();g.fill();
    g.strokeStyle='rgba(70,54,28,.65)';g.lineWidth=1.4;g.stroke();
    g.strokeStyle='rgba(120,90,50,.28)';g.lineWidth=1;for(let i=1;i<5;i++){g.beginPath();g.moveTo(cx+3,yt+(yb-yt)*i/5);g.quadraticCurveTo(cx+wd*.55,yt+(yb-yt)*i/5+h*.06,cx+wd*.9,yt+(yb-yt)*i/5);g.stroke()}
    // verga
    g.fillStyle='#5a3a22';g.fillRect(cx-4,yt-3,wd*1.0,5);
    // emblema
    g.fillStyle=sp0.emb;g.globalAlpha=.9;
    if(k==='sirena'){g.beginPath();g.moveTo(cx+wd*.2,yt+h*.2);g.quadraticCurveTo(cx+wd*.5,yt+h*.12,cx+wd*.78,yt+h*.24);g.lineTo(cx+wd*.7,yt+h*.4);g.quadraticCurveTo(cx+wd*.45,yt+h*.46,cx+wd*.26,yt+h*.4);g.closePath();g.fill();g.fillStyle='#fff';g.beginPath();g.arc(cx+wd*.48,yt+h*.31,wd*.07,0,7);g.fill()}
    else if(k==='galeone'){g.beginPath();g.arc(cx+wd*.48,yt+h*.28,wd*.13,0,7);g.fill();g.fillStyle='rgba(255,255,255,.75)';g.beginPath();g.arc(cx+wd*.48,yt+h*.28,wd*.06,0,7);g.fill()}
    else if(k==='prigionieri'){g.fillStyle='#d8412f';g.fillRect(cx+wd*.2,yt+h*.2,wd*.55,h*.07);g.fillRect(cx+wd*.2,yt+h*.34,wd*.55,h*.07)}
    else{g.fillRect(cx+wd*.2,yt+h*.24,wd*.58,h*.06)}
    g.globalAlpha=1;
    // bandierina
    g.fillStyle=k==='sirena'?'#e0523f':k==='prigionieri'?'#fff':sp0.emb;g.beginPath();g.moveTo(cx,by-h);g.quadraticCurveTo(cx+14,by-h-6,cx+26,by-h-2);g.lineTo(cx+22,by-h+8);g.quadraticCurveTo(cx+10,by-h+4,cx,by-h+6);g.fill();
    g.strokeStyle='rgba(40,25,10,.6)';g.lineWidth=1;g.stroke();
  },cx0(Wd),Hd-8);
  function cx0(Wd){return Wd*.38}
}
const hs=(k,s)=>{let f='',cr='';if(k==='sirena'&&s&&C&&s===C.p){f=YD.sel().fig;if(f==='nessuna')f='';cr=YD.crewSig()}const key='h'+k+(f?'@'+f:'')+(cr?'#'+cr:'');return SPR[key]||(SPR[key]=hullSprite(k,f,cr))},
  ss=(k,s)=>{let sel=null,key='s'+k;if(k==='sirena'&&s&&C&&s===C.p){sel=YD.sel();key+='@'+sel.sail+'|'+sel.flag}return SPR[key]||(SPR[key]=sailSprite(k,sel))};

/* ---------------- navi ---------------- */
function mkShip(type,x,y,hd,o){
  const sp0=SPEC[type];
  const s=Object.assign({type,x,y,hd,v:0,hull:sp0.hull,max:sp0.hull,cdL:0,cdR:0,cd:rr(1,3),seed:rr(0,9),flash:0,dead:false,sink:0,tgt:null,ent:{type:'c3'},alert:false},o||{});
  s.ent.s=s;return s;
}
const pierAt=(x,y)=>!VOY&&x>22.9*T&&x<27.4*T&&y>44.3*T&&y<45.4*T;
const seaOK=(x,y)=>seaFreePx(x,y)&&!pierAt(x,y);
function clearAt(x,y,r){if(!seaOK(x,y))return false;for(let k=0;k<8;k++){const a=k/8*TAU;if(!seaOK(x+Math.cos(a)*r,y+Math.sin(a)*r))return false}return true}
function shipOK(s,x,y,hd){
  const L=SPEC[s.type].L,W=SPEC[s.type].W*.7;
  for(const f of[-.7,-.2,.3,.8]){const px=x+Math.cos(hd)*L*f,py=y+Math.sin(hd)*L*f*.9;if(!seaOK(px,py)||!seaOK(px-Math.sin(hd)*W,py+Math.cos(hd)*W*.7)||!seaOK(px+Math.sin(hd)*W,py-Math.cos(hd)*W*.7))return false}
  return true
}
function windK(a){const d=angD(a,C.wind),c=(1+Math.cos(d))/2;return C.plan&&C.plan.time==='tempesta'?.5+.95*c:.62+.62*c}
function moveShip(s,dt,tv){
  s.v+=(tv-s.v)*Math.min(1,dt*(tv<s.v*.6?2.4:1.1));
  const nx=s.x+Math.cos(s.hd)*s.v*dt,ny=s.y+Math.sin(s.hd)*s.v*dt;
  if(shipOK(s,nx,ny,s.hd)){s.x=nx;s.y=ny}
  else if(shipOK(s,nx,s.y,s.hd))s.x=nx;
  else if(shipOK(s,s.x,ny,s.hd))s.y=ny;
  else if(VOY&&s===C.p&&voySlide(s,dt)){}
  else{
    if(s===C.p){if(s.v>40){s.v*=.35;if((s.bump||0)<=0){s.bump=1.2;if(!C.easy)hurt(s,.4);toast('Scogli! Gira il timone.');sfx('thud')}}else s.v*=.5}else s.v*=.5;
    // riporta in acqua libera se incastrata
    if(!shipOK(s,s.x,s.y,s.hd)){let best=null,bd=1e9;for(let j=-8;j<=8;j++)for(let i=-8;i<=8;i++){const cx=s.x+i*24,cy=s.y+j*24,d=i*i+j*j;if(d<bd&&shipOK(s,cx,cy,s.hd)){bd=d;best=[cx,cy]}}if(best){s.x=best[0];s.y=best[1]}}
  }
  s.x=cl(s.x,60,WW-60);s.y=cl(s.y,60,WH-60);
  if(s.bump>0)s.bump-=dt;
  const sp0=SPEC[s.type];
  if(s.v>12&&Math.random()<dt*16){const c=Math.cos(s.hd),sn=Math.sin(s.hd);FXL.parts.push({x:s.x-c*sp0.L*.9+rr(-8,8),y:s.y-sn*sp0.L*.9*.8+rr(-4,4)+8,vx:-c*8,vy:-sn*6,age:0,life:1.3,kind:'wake',r:rr(5,10),rot:0,g:0})}
}
function steerTo(s,tx,ty,dt,k){
  const want=Math.atan2(ty-s.y,tx-s.x),d=angD(s.hd,want);
  s.hd+=cl(d,-1,1)*Math.min(Math.abs(d)*2.6,.95)*dt*(k||1)
}
function avoid(s,hd){ // se davanti c'è terra, piega
  const L=SPEC[s.type].L,look=L*1.9;
  const free=h=>clearAt(s.x+Math.cos(h)*look,s.y+Math.sin(h)*look,SPEC[s.type].W);
  if(free(hd))return hd;
  for(const o of[.45,-.45,.9,-.9,1.4,-1.4])if(free(hd+o))return hd+o;
  return hd+1.5
}
function hurt(s,n){
  if(s.dead)return;
  if(s.type==='fantasma'){voyGhostHit(s,n);return}
  if(s===C.p&&n>0)parEv('hit');
  if(s.type==='prigionieri'&&!s.ally&&C.plan&&(C.easy||C.plan.sal>0)&&s.hull-n<(C.plan.sal>1?3:1.5)){s.hull=C.plan.sal>1?3:1.5;if(!s.disabled){s.disabled=true;s.v=0;toast('<b>Tito:</b> «La nave dei prigionieri è in avaria. Avvicinati e abborda!»')}return}
  if(s.type==='galeone'&&!s.ally&&s.hull-n<3){s.hull=3;s.flash=.2;if(!s.disabled){s.disabled=true;s.v=0;toast('<b>Tito:</b> «Il galeone è in avaria! Avvicinati e abborda: l\'argento è a bordo!»',7000)}return}
  s.hull-=n;s.flash=.2;
  if(s===C.p&&s.hull<=0){s.hull=0;return}
  if(s.hull<=0){s.dead=true;s.sinking=true;const bg=s.type==='brigantino';if(!bg)C.kills++;if(s.type!=='mercante'&&!bg)C.ekills=(C.ekills||0)+1;if(bg){try{YD.stat('brig');yAnn(2600)}catch(e){}}if(s.type==='pattuglia'||s.type==='scorta'||s.type==='galeone'){try{YD.stat('kills');yAnn(2600)}catch(e){}}sink(s);if(s.type==='prigionieri'){C.prisLost=true;toast('La nave dei prigionieri è affondata. Il piano non copriva questo rischio.',6000)}}
}
function yAnn(ms){setTimeout(()=>{try{const n=YD.announce();if(n.length)toast('Nuovo per la nave: <b>'+n.map(x=>x.it.n).join(', ')+'</b>. Lo scegli dal Menu › Guardaroba › Nave.',6500)}catch(e){}},ms||1800)}
function sink(s){
  for(let i=0;i<10;i++)puff(s.x+rr(-30,30),s.y+rr(-20,20),rr(10,22),rr(1,2));
  if(s===C.p)return;
  const bg=s.type==='brigantino',n=s.type==='galeone'?8:bg?3:s.type==='mercante'?1:s.type==='scorta'?1:0;
  for(let i=0;i<n;i++)C.crates.push({x:s.x+rr(-60,60),y:s.y+rr(-50,50),t:rr(0,9),v:(s.type==='galeone'||bg)?'silver':'food',opt:bg});
  if(s.type==='galeone')C.sunkSilver++;
  parEv('kill');
  toast(s.type==='galeone'?"Galeone affondato: casse d'argento in acqua!":bg?"Brigantino affondato: 3 casse d'argento in acqua!":'Nave affondata.');
  sfx('fall');
}
function puff(x,y,r,life){C.fx.push({k:'puff',x,y,r,t:0,life,vx:rr(-14,14),vy:rr(-24,-6)})}

/* ---------------- suoni: abbordaggio e riparazioni ---------------- */
function shout(d,f0,vol){
  if(!AU.ctx||!AU.on)return;const c=AU.ctx,t=c.currentTime+d,o=c.createOscillator(),g=c.createGain(),b1=c.createBiquadFilter(),b2=c.createBiquadFilter(),vb=c.createOscillator(),vg=c.createGain();
  o.type='sawtooth';o.frequency.setValueAtTime(f0,t);o.frequency.linearRampToValueAtTime(f0*1.25,t+.12);o.frequency.exponentialRampToValueAtTime(f0*.7,t+.6);
  vb.frequency.value=6;vg.gain.value=f0*.03;vb.connect(vg);vg.connect(o.frequency);
  b1.type='bandpass';b1.frequency.value=750;b1.Q.value=4;b2.type='bandpass';b2.frequency.value=1250;b2.Q.value=5;
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.06);g.gain.setValueAtTime(vol,t+.35);g.gain.exponentialRampToValueAtTime(.001,t+.65);
  o.connect(b1);o.connect(b2);b1.connect(g);b2.connect(g);g.connect(AU.gain);o.start(t);vb.start(t);o.stop(t+.7);vb.stop(t+.7);
}
function boardSfx(){
  if(!AU.ctx||!AU.on)return;
  for(let i=0;i<3;i++){setTimeout(()=>{noiseBurst(.22,3200,.22);tone(300,90,.12,'triangle',.22,.18)},i*160)}      // grappini: sibilo e colpo secco
  setTimeout(()=>{tone(130,95,.45,'sawtooth',.07);tone(135,90,.5,'square',.04,.04);noiseBurst(.3,500,.18)},650);      // passerella che scricchiola
  setTimeout(()=>{noiseBurst(.18,200,.5);tone(80,45,.22,'triangle',.3)},1050);                                          // tonfo sul ponte
  shout(.9,200,.07);shout(1.05,240,.06);shout(1.25,170,.06);                                                           // urla dell'equipaggio
}
function repairTap(){noiseBurst(.05,2800,.28);tone(1800,900,.05,'square',.07)}
function repairDone(){[523,659,784].forEach((f,i)=>tone(f,0,.3,'triangle',.14,i*.1))}

/* ---------------- cannoni ---------------- */
function fire(s,side,aim){
  if(s===C.p){if(!VOY&&s.hull<=1)s.gunsOut=true;else if(s.hull>=s.max*.25)s.gunsOut=false;
    if(s.gunsOut){if(!(C.gunT>0)){C.gunT=3;toast('<b>Cannoni danneggiati!</b> Torna al porto a riparare.',4500);sfx('thud')}return false}}
  const cd=side<0?'cdL':'cdR';if(s[cd]>0||s.dead||s.disabled)return false;
  s[cd]=s===C.p?(C.cdP||2.1):3.4;
  const sa=s.hd+(side>0?Math.PI/2:-Math.PI/2);let base=sa;
  const own=s===C.p;
  const list=own?C.ships.filter(e=>!e.dead&&e!==s&&!e.ally&&onScr(e)):[C.p];
  let best=null,bd=1e9;
  for(const e of list){if(e.dead)continue;const a=Math.atan2(e.y-s.y,e.x-s.x),d=Math.abs(angD(base,a)),dist=Math.hypot(e.x-s.x,e.y-s.y);if(d<.62&&dist<(own?1350:780)&&dist<bd){bd=dist;best=a}}
  if(own&&aim!=null)base+=angD(base,aim)*(C.easy?1:.8);
  else if(best!=null)base+=angD(base,best)*(own&&C.easy?1:own?.75:.55);
  if(!own&&C.plan&&C.plan.time==='tempesta')base+=rr(-.11,.11);
  const sp0=SPEC[s.type],n=own?3:(s.type==='galeone'||s.free?3:2),lifeB=own&&best!=null?Math.min(2.2,Math.max(1,bd/640*1.08+.12)):1.0;
  for(let k=0;k<n;k++){
    const a=base+(k-(n-1)/2)*.07+rr(-.025,.025),off=(k-(n-1)/2)*sp0.L*.34;
    const ox=Math.cos(s.hd)*off+Math.cos(sa)*sp0.W*1.05,oy=Math.sin(s.hd)*off+Math.sin(sa)*sp0.W*1.05;
    C.balls.push({x:s.x+ox,y:s.y+oy,vx:Math.cos(a)*640+Math.cos(s.hd)*s.v*.3,vy:Math.sin(a)*640+Math.sin(s.hd)*s.v*.3,t:0,life:lifeB,own:s});
    if(mzn('fumo-1'))C.fx.push({k:'fumoM',x:s.x+ox+Math.cos(a)*8,y:s.y+oy+Math.sin(a)*8,a,t:0,life:rr(.9,1.2)});else{
    C.fx.push({k:'flash',x:s.x+ox+Math.cos(a)*18,y:s.y+oy+Math.sin(a)*18,r:20,t:0,life:.22});
    for(let q=0;q<2;q++)puff(s.x+ox+Math.cos(a)*26,s.y+oy+Math.sin(a)*26,rr(10,16),rr(.8,1.4))}
  }
  if(own){C.shots++;if(AU.ctx&&AU.on){noiseBurst(.22,260,.5);tone(110,50,.2,'sawtooth',.2)}}else if(AU.ctx&&AU.on&&Math.hypot(s.x-P.x,s.y-P.y)<900)noiseBurst(.18,300,.25);
  return true
}
function hitTest(s,x,y){
  const sp0=SPEC[s.type],dx=x-s.x,dy=y-s.y,c=Math.cos(s.hd),sn=Math.sin(s.hd),u=dx*c+dy*sn,v=-dx*sn+dy*c;
  return Math.abs(u)<sp0.L*.92&&Math.abs(v)<sp0.W*1.05
}

/* ---------------- stato di gioco ---------------- */
function newRun(easy,plan,cp){
  plan=plan||PLAN0;
  C={plan:Object.assign({},plan),easy,t:0,p:null,ships:[],balls:[],crates:[],fx:[],silver:0,pris:0,sail:2,kills:0,sunkSilver:0,shots:0,hits:0,lost:0,ended:false,wind:rr(0,TAU),notes:{},escapes:0,pend:[],fireQ:0,over:false,ramCd:0,convoy:false};
  S.tod=TIMES[plan.time].tod;
  const sp=TPp(24.5,31);
  const yd=YD.get(),hm=8+yd.h;C.yd=yd;C.cdP=2.1*YD.gunK(yd.g);C.sailK=YD.sailK(yd.s);
  C.p=mkShip('sirena',sp[0],sp[1],0,{hull:hm,max:hm});C.p.isP=true;
  P.x=C.p.x;P.y=C.p.y;P.hd=0;P.mode='raft';cam.x=P.x;cam.y=P.y;
  const TQ=(x,y)=>[x*T,y*T];
  for(const [x,y] of[[44,58],[46,30],[80,30],[108,62],[64,80],[170,40],[160,95],[130,108],[190,85],[150,40]]){const p=TQ(x,y);const s=mkShip('mercante',p[0],p[1],rr(0,TAU));C.ships.push(s)}
  for(const [x,y] of[[75,44],[114,36],[155,20],[185,40],[170,66],[135,100],[100,100],[185,105],[100,66],[140,62],[110,16],[75,80]]){const p=TQ(x,y);const s=mkShip('pattuglia',p[0],p[1],rr(0,TAU));C.ships.push(s)}
  for(const [x,y] of[[40,40],[46,52],[52,34],[38,58],[58,46]]){const p2=TQ(x,y);C.ships.push(mkShip('mercante',p2[0],p2[1],rr(0,TAU)))}
  for(const s of C.ships)if(s.type==='pattuglia'){const dx=s.x-C.p.x,dy=s.y-C.p.y,d=Math.hypot(dx,dy)||1;if(d<3000){const k=(3000+rr(0,900))/d;s.x=C.p.x+dx*k;s.y=C.p.y+dy*k;s.x=cl(s.x,300,WW-300);s.y=cl(s.y,300,WH-300)}}
  for(const s of C.ships)if(!s.conv&&!clearAt(s.x,s.y,70)){const r2=findSea(s.x,s.y);s.x=r2[0];s.y=r2[1]}
  if(cp&&cp.pris>=2){C.pris=2;C.ekills=3;const al=mkShip('prigionieri',C.p.x-260,C.p.y+120,0,{});al.ally=true;al.conv=false;C.ships.push(al);C.notes.start=1;C.notes.found=1;toast('<b>Tito:</b> «Pip e Dodo sono con noi. Ora il galeone!»',5000)}
  if(!VOY)poiPlace();
  C.ev=VOY?null:evNew();
}
function objVis(dt){
  const o=$('c3obj'),t=o.textContent;
  if(t!==C.lastObj){C.lastObj=t;C.objT=7}
  if(C.tut)C.objT=7;else C.objT=Math.max(0,(C.objT||0)-dt);
  o.style.display=(!C.tut&&!C.over&&(C.objT>0||C.p.v<12))?'block':'none';
}
/* ---------------- Biscotto parla ---------------- */
const QUIPS=[
 'Crack! Biscotto vuole un biscotto. Anche mezzo va bene.',
 'Se affondiamo io volo via. Dettagli.',
 'Ho contato le onde: sono troppe, ho smesso.',
 'Sono un pappagallo, non un timone. Però ho opinioni.',
 'Il mare è grande e io sono piccolo. Ma ho ragione.',
 'Pezzi da otto! Pezzi da otto! ...non so cosa siano, li ripeto e basta.',
 'Capitano, il vento dice che sei bravo. Forse mentiva.',
 'Dodo cucina meglio di tutti. Se lo salviamo, mangiamo.',
 'Le vele si vedono prima dei cannoni: occhio all\'orizzonte.',
 'Pip e Dodo contano su di noi. Non dimenticarlo.',
 'Le pattuglie si mettono di fianco per sparare: tienile di prua o di poppa.',
 'Sparare da vicino fa più danni.',
 'Lo scafo regge, ma non è eterno. In porto il carpentiere ripara tutto.',
 'Le bottiglie in mare hanno sempre dentro qualcosa. Di solito una mappa. A volte un calzino.',
 'Nella nebbia nessuno ti vede. Nemmeno io, ma io vedo poco comunque.',
 'Il brigantino viola è veloce, ma anche lui si stanca. Pazienza, capitano.'
];
const PEV={
  hit:['Ahi! Ci sparano! Rispondi al fuoco!','Giù la testa! Anzi, giù la nave!','Crack! Quello mi ha scompigliato le penne.'],
  kill:['Affondata! Una in meno!','Bel colpo, capitano! Io l\'avevo detto.','Splash! Ho perso il conto, ma sono tante.'],
  ram:['Toc! Le navi non si sfiorano, si evitano.','Hai visto gli scogli? Erano lì prima di noi.','Piano! Lo scafo non è di gomma.'],
  crate:['Argento! Il mio lato preferito del mare.','Ottima pesca, capitano!','Crack! Pezzi da otto, finalmente!'],
  convoy:['Là! Il galeone spagnolo, con la scorta tutta attorno. Prudenza!','Eccoli! Dietro il galeone c\'è la bandiera bianca: sono i nostri.'],
  board:['Pip! Dodo! Crack! Che bello rivedervi!','Abbordaggio riuscito! Il cuoco ha già chiesto della cambusa.']
};
const pick=a=>a[(Math.random()*a.length)|0];
function parSay(txt,ms){
  if(!C)return;const d=$('c3par');d.innerHTML='';const b=document.createElement('b');b.textContent='🦜 '+pn('Biscotto')+': ';d.appendChild(b);d.appendChild(document.createTextNode('«'+pn(txt)+'»'));
  d.style.display='block';C.parUntil=C.t+(ms||5200);C.parCd=7;if(AU.ctx&&AU.on)sfx('cra');
}
function parEv(k,force){if(!C||C.tut||C.over)return;if(!force&&(C.parCd>0||Math.random()>.65))return;parSay(pick(PEV[k]),4600)}
function dirName(dx,dy){const a=Math.atan2(dy,dx)*180/Math.PI,n=['a est','a sud-est','a sud','a sud-ovest','a ovest','a nord-ovest','a nord','a nord-est'];return n[((Math.round(a/45)%8)+8)%8]}
function parHint(){
  if(VOY)return voyHint();
  const p=C.p;
  if(p.hull<=p.max*.4){const pt=TPp(21,30);return 'Lo scafo scricchiola! Il porto è '+dirName(pt[0]-p.x,pt[1]-p.y)+': là ti riparano.'}
  if(C.silver>=5)return 'L\'argento ci rende pesanti: più casse, meno velocità.';
  const cr=C.crates.find(c=>Math.hypot(c.x-p.x,c.y-p.y)<900);if(cr)return 'Casse in acqua '+dirName(cr.x-p.x,cr.y-p.y)+'! Prendile prima che affondino.';
  {const eh=evHint();if(eh)return eh}
  {const P0=C.poi;
   if(P0&&!C.tut){
     if(C.map)return 'La mappa segna una spiaggia '+dirName(C.map.x-p.x,C.map.y-p.y)+': segui la freccia color pergamena!';
     const bt=P0.bottles[0];if(bt&&Math.hypot(bt.x-p.x,bt.y-p.y)<1800)return 'Cra! Una bottiglia in acqua '+dirName(bt.x-p.x,bt.y-p.y)+'. Prendila!';
     const ch=P0.chests.find(c=>!c.open&&c.k==='chest'&&Math.hypot(c.x-p.x,c.y-p.y)<1800);if(ch)return 'Vedo un forziere sulla spiaggia '+dirName(ch.x-p.x,ch.y-p.y)+'. Avvicinati con la nave!';
     if(P0.cove&&p.hull<p.max*.75)return 'C\'è una cala tranquilla '+dirName(P0.cove.x-p.x,P0.cove.y-p.y)+': lì lo scafo si ripara da solo.'}}
  if(windK(p.hd)<.8)return 'Il vento è contro: gira di lato e le vele ti ringrazieranno.';
  if(C.convoy){const g=C.ships.find(s=>s.type==='galeone'&&!s.dead);if(g)return 'Il galeone spagnolo è '+dirName(g.x-p.x,g.y-p.y)+'. Attento alla scorta attorno.'}
  let b=null,bd=1e9;for(const s of C.ships){if(s.dead||s.conv||s.ally)continue;const d=Math.hypot(s.x-p.x,s.y-p.y);if(d<bd){bd=d;b=s}}
  if(b&&bd>500)return 'Vedo una vela '+dirName(b.x-p.x,b.y-p.y)+', capitano.';
  return null
}
function parTick(dt){
  if(C.parCd>0)C.parCd-=dt;
  const d=$('c3par');if(d.style.display==='block'&&(C.t>C.parUntil||C.over||C.tut))d.style.display='none';
  if(C.tut||C.over)return;
  if(C.parN==null)C.parN=12;C.parN-=dt;
  if(C.parN<=0){C.parN=rr(26,40);const h=Math.random()<.55?parHint():null;parSay(h||pick(VOY?VQUIPS:QUIPS),5600)}
}
function spawnConvoy(){
  C.convoy=true;
  const q=routePos(700),c=Math.cos(q.hd),n=Math.sin(q.hd);
  for(const[t,slot]of[['galeone',[0,0]],...(C.pris>=2?[]:[['prigionieri',[-300,0]]]),['scorta',[320,0]],['scorta',[0,-230]],['scorta',[0,230]],['scorta',[-500,620]]]){
    const o={conv:true,prog:q.i,slot,guard:Math.abs(slot[0])<=560&&Math.abs(slot[1])<=230};if(t==='galeone'){o.hull=14;o.max=14}
    const s=mkShip(t,q.x+c*slot[0]-n*slot[1],q.y+n*slot[0]+c*slot[1],q.hd,o);C.ships.push(s)}
  parEv('convoy',1);sfx('quest');toast('Tito: «Capitano! Il galeone spagnolo con la scorta: arriva da est!»',6000);
}
function spawnEscort(){      // seconda uscita: una scorta armata (più scafo e più cannoni delle pattuglie)
  const p=C.p;let q=null;
  for(let k=0;k<50&&!q;k++){const a=p.hd+rr(-1.2,1.2),d=rr(1700,2300),x=p.x+Math.cos(a)*d,y=p.y+Math.sin(a)*d;if(x>300&&y>300&&x<WW-300&&y<WH-300&&clearAt(x,y,100))q=[x,y]}
  if(!q)q=randSea();
  const s=mkShip('scorta',q[0],q[1],Math.atan2(p.y-q[1],p.x-q[0]),{free:true,nm:'Scorta armata'});
  C.ships.push(s);C.esc=s;
  toast('<b>Tito:</b> «Vela rossa '+dirName(q[0]-p.x,q[1]-p.y)+', capitano! È una scorta armata: ha più cannoni e più scafo delle pattuglie. Tienila di prua o di poppa.»',7000);
}
function findSea(x,y){for(let R=1;R<30;R++)for(let j=-R;j<=R;j++)for(let i=-R;i<=R;i++){if(Math.max(Math.abs(i),Math.abs(j))!==R)continue;const cx=x+i*40,cy=y+j*40;if(clearAt(cx,cy,80))return[cx,cy]}return[x,y]}
function randSea(){for(let k=0;k<60;k++){const x=rr(300,WW-300),y=rr(300,WH-300);if(clearAt(x,y,90))return[x,y]}return [WW/2,WH/2]}

/* ---------------- B2: tratti di calma, forzieri, nebbia, bottiglie con mappa, brigantino ---------------- */
const inV=(x,y,m)=>{const z=camZoom();return Math.abs(x-cam.x)<VW/2/z+(m||0)&&Math.abs(y-cam.y)<VH/2/z+(m||0)};
function routeD(x,y){let m=1e9;for(const q of ROUTE){const d=Math.hypot(q[0]-x,q[1]-y);if(d<m)m=d}return m}
function pT(key,html,ms){if(C.notes[key]||C.t-(C.lastPT||-99)<16)return;C.notes[key]=1;C.lastPT=C.t;toast(html,ms)}   // avvisi facoltativi: mai due di seguito
function poiSpot(minD,maxD,r,gap,coast,avoidRoute){      // un punto di mare libero, lontano dal porto e dagli altri punti d'interesse
  const pt=TPp(21,30),used=C.poi.all;
  for(let k=0;k<500;k++){
    const x=rr(400,WW-400),y=rr(400,WH-400),dp=Math.hypot(x-pt[0],y-pt[1]);
    if(dp<minD||dp>maxD||!clearAt(x,y,r))continue;
    if(coast===1&&clearAt(x,y,r+300))continue;        // sulla costa: poco più in là c'è terra
    if(coast===0&&!clearAt(x,y,r+170))continue;       // in mare aperto
    if(avoidRoute&&routeD(x,y)<avoidRoute)continue;
    if(used.some(u=>Math.hypot(u[0]-x,u[1]-y)<gap))continue;
    return[x,y]
  }
  return null
}
function beachSpot(cx,cy,minD,maxD,gap){      // una casella di sabbia sulla riva con mare libero davanti: [x forziere, y forziere, x mare, y mare]
  const used=C.poi.all,pt=TPp(21,30);
  for(let k=0;k<5000;k++){
    const a=rr(0,TAU),d=rr(minD,maxD),x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d;
    if(x<300||y<300||x>WW-300||y>WH-300)continue;
    const tx=Math.floor(x/T),ty=Math.floor(y/T);if(tx<5||ty<5||tx>=MW-5||ty>=MH-5)continue;
    const i=tIdx(tx,ty);
    if(seaT[i]||blockT[i]||!walkT[i]||elevT[i]<SAND_LO||elevT[i]>SAND_HI)continue;
    const bx=(tx+.5)*T,by=(ty+.5)*T;
    if(Math.hypot(bx-pt[0],by-pt[1])<1500||used.some(u=>Math.hypot(u[0]-bx,u[1]-by)<gap))continue;
    for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){
      for(let s=1;s<=3;s++){
        const jx=tx+dx*s,jy=ty+dy*s,j=tIdx(jx,jy);
        if(walkT[j]||blockT[j])break;                  // altra terra o scoglio: non è la riva
        if(seaT[j]===1){
          const sx=(jx+dx+.5)*T,sy=(jy+dy+.5)*T;
          if(clearAt(sx,sy,40))return[bx-dx*14,by-dy*14,sx,sy];
          break
        }
      }
    }
  }
  return null
}
function poiPlace(){
  const P0=C.poi={all:[],chests:[],bottles:[],brigs:0,brigT:rr(34,58),botT:rr(55,85),nb:0,cove:null,fog:null};
  const pt=TPp(21,30);
  let q=poiSpot(1700,5600,100,1500,1,0);
  if(q){P0.cove={x:q[0],y:q[1],r:250,t:0,sT:2};P0.all.push(q)}
  for(let k=0;k<2;k++){
    const b=beachSpot(pt[0],pt[1],1900,5600,1500);
    if(b){P0.chests.push({k:'chest',x:b[0],y:b[1],sx:b[2],sy:b[3],n:2,open:0,t:rr(0,9),seed:rr(0,9)});P0.all.push([b[0],b[1]])}
  }
  q=poiSpot(2200,5600,100,1500,0,900);
  if(q){
    const f=P0.fog={x:q[0],y:q[1],r:520,blobs:[]};P0.all.push(q);
    for(let i=0;i<16;i++){const a=rr(0,TAU),d=Math.sqrt(Math.random())*f.r*.8;f.blobs.push({x:Math.cos(a)*d,y:Math.sin(a)*d,r:rr(170,250),ph:rr(0,TAU),sp:rr(.12,.28)})}
    for(let i=0,n=0;i<40&&n<2;i++){const a=rr(0,TAU),d=rr(60,240),x=f.x+Math.cos(a)*d,y=f.y+Math.sin(a)*d;if(!clearAt(x,y,40))continue;C.crates.push({x,y,t:rr(0,9),v:'silver',opt:true,fog:true});n++}
  }
}
function openChest(c){
  c.open=1;c.ot=0;
  for(let i=0;i<(c.n||2);i++)C.crates.push({x:c.sx+rr(-30,30),y:c.sy+rr(-30,30),t:rr(0,9),v:'silver',opt:true});
  for(let i=0;i<10;i++)C.fx.push({k:'flash',x:c.x+rr(-26,26),y:c.y+rr(-28,8),r:9,t:0,life:.6});
  sfx('quest');C.lastPT=C.t;
  if(c.k==='map'){
    if(C.map===c)C.map=null;
    toast('<b>Tesoro trovato!</b> Il forziere è pieno: raccogli le casse d\'argento che galleggiano in acqua.',6500);
    try{YD.stat('maps');yAnn(3200)}catch(e){}
    setTimeout(()=>{if(C&&!C.over)parEv('crate',1)},2200)
  }else toast('<b>Tito:</b> «Il forziere era pieno d\'argento! Raccogli le casse in acqua.»',6000)
}
function spawnBottle(){
  const p=C.p;
  for(let k=0;k<80;k++){
    const a=p.hd+rr(-1.3,1.3),d=rr(650,1150),x=p.x+Math.cos(a)*d,y=p.y+Math.sin(a)*d;
    if(x<300||y<300||x>WW-300||y>WH-300||!clearAt(x,y,70))continue;
    C.poi.bottles.push({x,y,t:rr(0,9),vx:rr(-6,6),vy:rr(-6,6)});C.poi.nb++;
    toast('<b>Biscotto:</b> «Cra! Una bottiglia in acqua '+dirName(x-p.x,y-p.y)+'! C\'è qualcosa dentro!»',6500);C.lastPT=C.t;
    return
  }
  C.poi.botT=10
}
function takeBottle(b){
  b.got=1;const p=C.p;
  sfx('pick');for(let i=0;i<6;i++)C.fx.push({k:'flash',x:b.x+rr(-20,20),y:b.y+rr(-16,10),r:8,t:0,life:.45});
  const m=beachSpot(p.x,p.y,1700,3600,1100);
  if(!m){C.crates.push({x:b.x+30,y:b.y,t:0,v:'silver',opt:true});toast('<b>Nella bottiglia</b> c\'è solo un biglietto: «Buon vento, capitano!» E una cassa d\'argento che galleggia lì accanto.',6000);return}
  C.map={k:'map',x:m[0],y:m[1],sx:m[2],sy:m[3],n:3,open:0,t:0,seed:rr(0,9)};C.poi.chests.push(C.map);C.poi.all.push([m[0],m[1]]);
  toast('<b>Tito:</b> «Una mappa del tesoro! La X è su una spiaggia '+dirName(m[0]-p.x,m[1]-p.y)+', a '+Math.round(Math.hypot(m[0]-p.x,m[1]-p.y)/T)+' caselle. Segui la freccia color pergamena.»',8000);C.lastPT=C.t
}
function spawnBrig(){
  const p=C.p;
  for(let k=0;k<80;k++){
    const a=rr(0,TAU),d=rr(1900,2600),x=p.x+Math.cos(a)*d,y=p.y+Math.sin(a)*d;
    if(x<300||y<300||x>WW-300||y>WH-300||!clearAt(x,y,90))continue;
    const s=mkShip('brigantino',x,y,a,{});C.ships.push(s);C.brig=s;C.poi.brigs++;
    toast('<b>Tito:</b> «Una vela viola '+dirName(x-p.x,y-p.y)+'! È un brigantino veloce: scappa appena ti vede. Se lo affondi porta casse d\'argento.»',7500);C.lastPT=C.t;
    return
  }
  C.poi.brigT=15
}
function brigAI(s,dt,dp){      // il brigantino scappa dal giocatore; dopo un po' si stanca e rallenta
  const p=C.p,sp0=SPEC.brigantino;
  if(dp>4600){s.dead=true;s.sinking=false;if(C.brig===s)C.brig=null;return}
  s.wpT=(s.wpT||0)-dt;
  if(!s.wp||s.wpT<=0||Math.hypot(s.wp[0]-s.x,s.wp[1]-s.y)<260){
    let best=null,bs=-1;
    for(let k=0;k<14;k++){const a=rr(0,TAU),d=rr(900,2000),x=s.x+Math.cos(a)*d,y=s.y+Math.sin(a)*d;if(x<300||y<300||x>WW-300||y>WH-300||!clearAt(x,y,90))continue;const sc=Math.hypot(x-p.x,y-p.y)+rr(0,500);if(sc>bs){bs=sc;best=[x,y]}}
    s.wp=best||randSea();s.wpT=rr(9,16)
  }
  const chase=dp<1500;
  if(chase&&!(s.tire>0))s.fl=(s.fl||0)+dt;else if(!chase)s.fl=Math.max(0,(s.fl||0)-dt*.5);
  if(s.tire>0)s.tire-=dt;
  else if(s.fl>12){s.tire=6.5;s.fl=0;if(dp<1400)toast('<b>Biscotto:</b> «Cra! Il brigantino rallenta, è stanco! Sotto, capitano!»',4500)}
  steerTo(s,s.wp[0],s.wp[1],dt,1.25);s.hd=avoid(s,s.hd);
  const hk=.55+.45*cl(s.hull/s.max,0,1);
  moveShip(s,dt,sp0.spd*windK(s.hd)*(chase?1:.55)*(s.tire>0?.45:1)*hk)
}
function poiStep(dt){
  const P0=C.poi;if(!P0)return;const p=C.p;
  // --- cala tranquilla ---
  const cv=P0.cove;
  if(cv){
    cv.t+=dt;const d=Math.hypot(p.x-cv.x,p.y-cv.y);
    if(d<cv.r){
      pT('cove','<b>Tito:</b> «Una cala tranquilla! Qui il mare è calmo e i pesci saltano. Fermati un po\': lo scafo si ripara da solo.»',6500);
      if(p.hull<p.max){p.hull=Math.min(p.max,p.hull+dt*.35);cv.hT=(cv.hT||0)-dt;if(cv.hT<=0){cv.hT=1.2;tone(880,0,.22,'triangle',.05);C.fx.push({k:'heal',x:p.x+rr(-70,70),y:p.y+rr(-34,20),vx:0,vy:-34,t:0,life:1.1})}}
    }else if(d<1500)pT('coveNear','<b>Tito:</b> «C\'è una cala tranquilla '+dirName(cv.x-p.x,cv.y-p.y)+'. Se lo scafo è rovinato, fermati lì.»',5500);
    cv.sT-=dt;if(cv.sT<=0){cv.sT=rr(2.4,5);if(d<1000&&AU.ctx&&AU.on){noiseBurst(.1,1500,.045);tone(520,260,.09,'sine',.03)}}
  }
  // --- forzieri sulla spiaggia e tesoro della mappa ---
  for(const c of P0.chests){
    c.t+=dt;if(c.open){c.ot=(c.ot||0)+dt;continue}
    const d=Math.hypot(p.x-c.x,p.y-c.y);
    if(d<200)openChest(c);
    else if(c.k==='chest'&&d<1500)pT('chestNear','<b>Tito:</b> «Un forziere sulla spiaggia '+dirName(c.x-p.x,c.y-p.y)+'! Avvicinati con la nave per aprirlo.»',6000)
  }
  // --- bottiglie ---
  if(!C.map&&P0.bottles.length===0&&P0.nb<3){P0.botT-=dt;if(P0.botT<=0){P0.botT=rr(75,115);spawnBottle()}}
  for(const b of P0.bottles){
    b.t+=dt;const nx=b.x+b.vx*dt,ny=b.y+b.vy*dt;if(seaOK(nx,ny)){b.x=nx;b.y=ny}else{b.vx=-b.vx;b.vy=-b.vy}
    const d=Math.hypot(p.x-b.x,p.y-b.y);
    if(d<95)takeBottle(b);else if(d>3600)b.got=2
  }
  if(P0.bottles.some(b=>b.got))P0.bottles=P0.bottles.filter(b=>!b.got);
  // --- nebbia: le pattuglie ti vedono solo da vicino ---
  const f=P0.fog;let inF=false;
  if(f){
    const d=Math.hypot(p.x-f.x,p.y-f.y);inF=d<f.r*.9;
    if(inF)pT('fog','<b>Tito:</b> «Nebbia fitta! Le pattuglie ti vedono solo da vicino. E qui in giro potrebbe esserci qualcosa…»',6500);
    else if(d<1500)pT('fogNear','<b>Biscotto:</b> «Cra! Un banco di nebbia '+dirName(f.x-p.x,f.y-p.y)+'. Nascondersi lì è facile!»',5500)
  }
  C.inFog=inF;C.fogA=(C.fogA||0)+((inF?1:0)-(C.fogA||0))*Math.min(1,dt*2);
  // --- brigantino viola (solo prima dell'arrivo del convoglio) ---
  if(C.brig&&C.brig.dead)C.brig=null;
  if(P0.brigs<2&&!C.brig&&!C.convoy){P0.brigT-=dt;if(P0.brigT<=0){P0.brigT=rr(70,110);spawnBrig()}}
}
/* ---- disegno ---- */
function glint(g,x,y,r){g.beginPath();g.moveTo(x-r,y);g.lineTo(x,y-r*.35);g.lineTo(x+r,y);g.lineTo(x,y+r*.35);g.closePath();g.moveTo(x,y-r);g.lineTo(x+r*.35,y);g.lineTo(x,y+r);g.lineTo(x-r*.35,y);g.closePath();g.fill()}
function coveDraw(g,cv,t){
  g.save();g.translate(cv.x,cv.y);g.lineCap='round';
  for(let i=0;i<24;i++){      // luccichio calmo
    const a=i*2.399+.7,d=Math.sqrt((i+.5)/24)*cv.r*.94,x=Math.cos(a)*d,y=Math.sin(a)*d,ph=Math.sin(t*1.1+i*1.7),al=.2+.34*Math.max(0,ph),l=14+((i*7)%3)*6;
    g.strokeStyle='rgba(236,255,250,'+al+')';g.lineWidth=3;g.beginPath();g.moveTo(x-l,y);g.quadraticCurveTo(x,y-3-ph*2.4,x+l,y);g.stroke()}
  for(let k=0;k<3;k++){const u=(t*.2+k/3)%1;g.strokeStyle='rgba(190,255,245,'+(.26*(1-u))+')';g.lineWidth=3;g.beginPath();g.arc(0,0,cv.r*(.25+.75*u),0,7);g.stroke()}
  g.setLineDash([12,14]);g.lineDashOffset=-t*8;g.strokeStyle='rgba(205,255,248,.45)';g.lineWidth=3;g.beginPath();g.arc(0,0,cv.r,0,7);g.stroke();g.setLineDash([]);
  const ring=(x,y,k)=>{g.strokeStyle='rgba(255,255,255,'+(.7*(1-k))+')';g.lineWidth=2.2;g.beginPath();g.ellipse(x,y+6,6+k*22,2.4+k*8,0,0,7);g.stroke()};
  for(let i=0;i<5;i++){      // pesci che saltano
    const per=3.2+i*.55,tt=t+i*1.9,ph=tt%per,dur=1;if(ph>dur+.7)continue;
    const sd=Math.floor(tt/per)*7.31+i*3.7,f1=Math.abs(Math.sin(sd*12.9898)*43758.5453)%1,f2=Math.abs(Math.sin(sd*78.233)*12345.678)%1;
    const a0=f1*TAU,d0=Math.sqrt(f2)*cv.r*.72,dir=f1>.5?1:-1,cx0=Math.cos(a0)*d0,cy0=Math.sin(a0)*d0;
    if(ph<.5)ring(cx0-dir*42,cy0,ph/.5);
    if(ph>=dur){ring(cx0+dir*42,cy0,(ph-dur)/.7);continue}
    const u=ph/dur,hh=Math.sin(u*Math.PI)*40,x=cx0+dir*(u-.5)*84,y=cy0-hh,ang=Math.atan2(-Math.cos(u*Math.PI)*Math.PI*40,dir*84);
    g.fillStyle='rgba(0,40,70,.16)';g.beginPath();g.ellipse(x,cy0+8,10*(1-hh/70),3,0,0,7);g.fill();
    g.save();g.translate(x,y);g.rotate(ang);if(dir<0)g.scale(1,-1);
    g.fillStyle='#86b9e6';g.beginPath();g.ellipse(0,0,12,4.8,0,0,7);g.fill();
    g.fillStyle='#e8f4ff';g.beginPath();g.ellipse(1,1.5,9,2.5,0,0,Math.PI);g.fill();
    g.fillStyle='#4f8fd0';g.beginPath();g.moveTo(-10,0);g.lineTo(-18,-6);g.lineTo(-18,6);g.closePath();g.fill();
    g.fillStyle='#1a2a3a';g.beginPath();g.arc(7,-1,1.2,0,7);g.fill();
    g.restore()
  }
  if(Math.hypot(C.p.x-cv.x,C.p.y-cv.y)<1300){g.textAlign='center';g.font='800 15px Nunito,Arial';g.lineWidth=4;g.strokeStyle='rgba(10,22,34,.85)';g.fillStyle='#c8fff2';g.strokeText('Cala tranquilla',0,-cv.r*.6);g.fillText('Cala tranquilla',0,-cv.r*.6)}
  g.restore()
}
function chestDraw(g,c,t){
  const op=c.open?Math.min(1,(c.ot||0)*3):0;
  g.save();g.translate(c.x,c.y);
  g.fillStyle='rgba(50,34,10,.3)';g.beginPath();g.ellipse(2,13,24,8,0,0,7);g.fill();
  if(c.k==='map'&&!c.open){      // la X rossa sulla sabbia
    const pl=.5+.5*Math.sin(t*3);
    g.strokeStyle='#b8321f';g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(-17,-17);g.lineTo(17,17);g.moveTo(17,-17);g.lineTo(-17,17);g.stroke();
    g.strokeStyle='rgba(255,236,170,'+(.3+.45*pl)+')';g.lineWidth=3;g.beginPath();g.arc(0,0,32+pl*7,0,7);g.stroke();
    g.fillStyle='rgba(255,246,190,'+(.4+.5*pl)+')';glint(g,-26,-22,8);glint(g,24,-12,6)
  }else{
    for(const[rx,ry,a,b2]of[[-29,5,15,10],[28,7,12,8],[-8,19,10,6]]){      // i sassi attorno al forziere
      g.fillStyle='#7d7a78';g.beginPath();g.ellipse(rx,ry,a,b2,0,0,7);g.fill();g.fillStyle='#a8a5a2';g.beginPath();g.ellipse(rx-2,ry-2,a*.7,b2*.6,0,0,7);g.fill();
      g.strokeStyle='#4a4846';g.lineWidth=1.6;g.beginPath();g.ellipse(rx,ry,a,b2,0,0,7);g.stroke()}
    g.fillStyle='#8a5a2a';g.strokeStyle='#2a1a0e';g.lineWidth=2.4;g.fillRect(-17,-8,34,22);g.strokeRect(-17,-8,34,22);
    g.fillStyle='#e8b730';g.fillRect(-17,-1,34,4);g.fillRect(-12,-8,4,22);g.fillRect(8,-8,4,22);
    if(!op){
      g.fillStyle='#9a6a34';g.beginPath();g.moveTo(-17,-8);g.quadraticCurveTo(0,-30,17,-8);g.closePath();g.fill();g.stroke();
      g.fillStyle='#e8b730';g.fillRect(-12,-17,4,9);g.fillRect(8,-17,4,9);g.fillRect(-3,-11,6,7);
      const s=.5+.5*Math.sin(t*4+c.seed);g.fillStyle='rgba(255,246,190,'+(.35+.55*s)+')';glint(g,13,-19,5+s*3)
    }else{
      g.fillStyle='#2a1608';g.fillRect(-15,-8,30,5);
      if((c.ot||0)<5){g.fillStyle='#e6ebf5';for(let i=0;i<5;i++){g.beginPath();g.arc(-11+i*5.5,-8,2.6,0,7);g.fill()}}
      g.fillStyle='#7a4c22';g.beginPath();g.moveTo(-17,-8);g.lineTo(-14,-30);g.quadraticCurveTo(0,-38,14,-30);g.lineTo(17,-8);g.closePath();g.fill();g.stroke();
      g.fillStyle='#e8b730';g.fillRect(-11,-26,4,14);g.fillRect(7,-26,4,14)
    }
  }
  g.restore();
  if(!c.open&&c.k==='chest'&&Math.hypot(C.p.x-c.x,C.p.y-c.y)<800){g.save();g.textAlign='center';g.font='800 14px Nunito,Arial';g.lineWidth=4;g.strokeStyle='rgba(10,22,34,.85)';g.fillStyle='#ffe9a0';g.strokeText('Forziere',c.x,c.y-48);g.fillText('Forziere',c.x,c.y-48);g.restore()}
}
function bottleDraw(g,b,t){
  const bob=Math.sin(b.t*2)*3;
  g.save();g.translate(b.x,b.y+bob);g.scale(1.3,1.3);
  const gl=g.createRadialGradient(0,0,4,0,0,60);gl.addColorStop(0,'rgba(190,255,230,.34)');gl.addColorStop(1,'rgba(190,255,230,0)');g.fillStyle=gl;g.fillRect(-60,-60,120,120);
  const u=(b.t*.5)%1;g.strokeStyle='rgba(255,255,255,'+(.5*(1-u))+')';g.lineWidth=2;g.beginPath();g.ellipse(0,12,16+u*24,6+u*8,0,0,7);g.stroke();
  g.rotate(-.5+Math.sin(b.t*1.3)*.12);
  g.fillStyle='rgba(150,225,200,.88)';g.strokeStyle='#2a5a50';g.lineWidth=2;
  g.beginPath();g.moveTo(-18,-7);g.lineTo(8,-7);g.quadraticCurveTo(14,-7,17,-3);g.lineTo(26,-3);g.lineTo(26,3);g.lineTo(17,3);g.quadraticCurveTo(14,7,8,7);g.lineTo(-18,7);g.quadraticCurveTo(-23,7,-23,0);g.quadraticCurveTo(-23,-7,-18,-7);g.closePath();g.fill();g.stroke();
  g.fillStyle='#f0e0b0';g.fillRect(-14,-3.5,20,7);g.strokeStyle='#a87a3a';g.lineWidth=1;g.strokeRect(-14,-3.5,20,7);
  g.fillStyle='#b98a55';g.fillRect(26,-3.4,6,6.8);
  g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=2;g.beginPath();g.moveTo(-16,-4.6);g.lineTo(6,-4.6);g.stroke();
  g.restore();
  const s=.5+.5*Math.sin(t*5+b.t);g.fillStyle='rgba(255,255,255,'+(.4+.5*s)+')';glint(g,b.x+16,b.y-18+bob,6+s*3)
}
function poiDraw(g,t){
  const P0=C.poi;if(!P0)return;
  const cv=P0.cove;if(cv&&inV(cv.x,cv.y,cv.r+150))coveDraw(g,cv,t);
  for(const c of P0.chests)if(inV(c.x,c.y,200))chestDraw(g,c,t);
  for(const b of P0.bottles)if(inV(b.x,b.y,150))bottleDraw(g,b,t)
}
let fogSpr=null;
/* mare nuovo (Muse, mondo A1): scia a V, spruzzi, nebbia — solo con «Grafica di prova» */
const MZS=/*@@MZS@@*/null,MZSO={};
function mzs(k){if(!VEGPG||!MZS||!MZS[k])return null;let o=MZSO[k];if(!o){o=MZSO[k]=new Image();o.src='data:image/webp;base64,'+MZS[k].b}return o.complete&&o.naturalWidth?o:null}

const MZN=/*@@MZN@@*/null,MZNO={},NAVM={sirena:'giocatore',mercante:'mercantile',pattuglia:'pattuglia',scorta:'brigantino',galeone:'galeone',prigionieri:'galeone',fantasma:'galeone',brigantino:'brigantino'};
function mzn(k){if(!VEGPG||!MZN||!MZN[k])return null;let o=MZNO[k];if(!o){o=MZNO[k]=new Image();o.src='data:image/webp;base64,'+MZN[k].b}return o.complete&&o.naturalWidth?o:null}
/* nave di Muse (dall'alto, prua a nord): integra / danneggiata / affondata; sceglie lo stato dai colpi presi */
function navDraw(g,s,sp0,sk){
  const m=NAVM[s.type];if(!m)return false;
  if(s.type==='sirena'&&!s.ally){
    const r0=s.max?s.hull/s.max:1;if(r0<=.5)s.wD=1;if(Math.abs(s.v||0)>18)s._mvU=C.t;
    const ck=r0<=.5?'d':s.wD?'r':(C.t-(s._mvU||0)<.9?'g':'a'),ic=mzn('sirenaC-'+ck);
    if(ic){
      const len=2*sp0.L*1.15,kc=len/ic.naturalHeight,wc=ic.naturalWidth*kc;
      const putc=(im,al,kk)=>{if(al<=.01)return;const w=im.naturalWidth*kk,h=im.naturalHeight*kk;g.save();g.globalAlpha*=al;g.rotate(Math.PI/2);g.drawImage(im,-w/2,-h/2,w,h);g.restore()};
      if(sk>0){const im2=mzn('giocatore-a'),f=Math.min(1,sk*2.2);if(im2){putc(ic,1-f,kc);putc(im2,f,2*sp0.L/288);return true}}
      putc(ic,1,kc);return true}
  }
  const r=s.max?s.hull/s.max:1,st0=(r<=.5||s.disabled&&r<.8)?'d':'i',ia=mzn(m+'-'+st0);if(!ia)return false;
  const K=2*sp0.L/288;
  const put=(im,al)=>{if(al<=.01)return;const w=im.naturalWidth*K,h=im.naturalHeight*K;g.save();g.globalAlpha*=al;g.rotate(Math.PI/2);g.drawImage(im,-w/2,-h/2,w,h);g.restore()};
  if(sk>0){const im2=mzn(m+'-a'),f=Math.min(1,sk*2.2);if(im2){put(ia,1-f);put(im2,f);return true}}
  put(ia,1);return true
}function wakeSp(g,s){
  const sp1=SPEC[s.type],im=mzs('scia-v');if(!sp1||!im)return;
  const v=Math.abs(s.v||0);if(v<22||s.sinking||s.dead)return;
  const a=Math.min(.95,.45+v/160),sc=(sp1.L*2.1)/218*(.95+.05*Math.sin(C.t*7+s.x)),cc=Math.cos(s.hd),ss=Math.sin(s.hd);
  g.save();g.translate(s.x-cc*sp1.L*.36,s.y+10-ss*sp1.L*.36);g.rotate(s.hd+Math.PI*1.5);g.globalAlpha=a;g.drawImage(im,-109*sc,-221*sc,218*sc,225*sc);g.restore()}
function fogSprite(){return fogSpr||(fogSpr=sp(420,420,g=>{const q=g.createRadialGradient(210,210,10,210,210,205);q.addColorStop(0,'rgba(238,244,250,.86)');q.addColorStop(.55,'rgba(232,240,248,.5)');q.addColorStop(1,'rgba(230,238,248,0)');g.fillStyle=q;g.fillRect(0,0,420,420)},210,210))}
function poiFog(g,t){      // il banco di nebbia copre le navi, ma si dirada attorno al giocatore
  const f=C.poi&&C.poi.fog;if(!f||!inV(f.x,f.y,f.r+320))return;
  const spr=fogSprite(),p=C.p,ks=['nebbia-densa','nebbia-spezzata','nebbia-lunga'];
  for(let bi=0;bi<f.blobs.length;bi++){const b=f.blobs[bi];
    const im=mzs(ks[bi%3]);
    if(im){const x=f.x+b.x+Math.cos(t*b.sp+b.ph)*34,y=f.y+b.y+Math.sin(t*b.sp*.8+b.ph*1.3)*22,dpx=Math.hypot(x-p.x,y-p.y),thin=cl((dpx-90)/(b.r+130),.18,1),w=b.r*2.6,h=w*im.naturalHeight/im.naturalWidth;
      g.save();g.globalAlpha=.9*thin;g.drawImage(im,x-w/2,y-h/2,w,h);g.restore();continue}
    const x=f.x+b.x+Math.cos(t*b.sp+b.ph)*34,y=f.y+b.y+Math.sin(t*b.sp*.8+b.ph*1.3)*22,dpx=Math.hypot(x-p.x,y-p.y),thin=cl((dpx-90)/(b.r+130),.18,1);
    drawSp(g,spr,x,y,b.r*2/420,.94*thin)
  }
}
function poiMini(c,p,sc){
  const P0=C.poi;if(!P0)return;
  const put=(x,y,fn)=>{const dx=(x-p.x)*sc,dy=(y-p.y)*sc;if(dx*dx+dy*dy>106*106)return;c.save();c.translate(dx,dy);fn();c.restore()};
  if(P0.fog)put(P0.fog.x,P0.fog.y,()=>{c.fillStyle='rgba(235,242,250,.42)';c.beginPath();c.arc(0,0,Math.max(6,P0.fog.r*sc),0,7);c.fill()});
  if(P0.cove)put(P0.cove.x,P0.cove.y,()=>{c.strokeStyle='rgba(130,240,228,.95)';c.lineWidth=2.4;c.beginPath();c.arc(0,0,Math.max(5,P0.cove.r*sc),0,7);c.stroke()});
  for(const h of P0.chests){
    if(h.open)continue;
    if(h.k==='map'){let dx=(h.x-p.x)*sc,dy=(h.y-p.y)*sc;const d=Math.hypot(dx,dy),far=d>98,pl=.5+.5*Math.sin(C.t*6);if(far){dx=dx/d*98;dy=dy/d*98}
      c.save();c.translate(dx,dy);c.fillStyle='#ead7a4';c.strokeStyle='#2a1a0e';c.lineWidth=2;c.beginPath();c.arc(0,0,7.5+pl,0,7);c.fill();c.stroke();c.strokeStyle='#b8321f';c.lineWidth=2.6;c.beginPath();c.moveTo(-3.6,-3.6);c.lineTo(3.6,3.6);c.moveTo(3.6,-3.6);c.lineTo(-3.6,3.6);c.stroke();c.restore()}
    else put(h.x,h.y,()=>{c.fillStyle='#ffd23a';c.strokeStyle='#3a2410';c.lineWidth=1.6;c.fillRect(-4,-3,8,6);c.strokeRect(-4,-3,8,6)})
  }
  for(const b of P0.bottles)put(b.x,b.y,()=>{c.fillStyle='#9fe8d0';c.strokeStyle='#1a4a40';c.lineWidth=1.6;c.beginPath();c.arc(0,0,3.6,0,7);c.fill();c.stroke()})
}
function poiOverlay(g,w,h){
  const P0=C.poi;if(!P0||C.over||C.tut||C.go5)return;
  const out=(x,y)=>!(x>26&&x<w-26&&y>40&&y<h-26),m=C.map;
  if(m&&!m.open){
    const[x,y]=toScreen(m.x,m.y);
    if(out(x,y))edgeArrow(g,w,h,x,y,'#ead7a4',Math.hypot(m.x-C.p.x,m.y-C.p.y));
    else{g.save();g.translate(x,y-56-Math.abs(Math.sin(C.t*4))*9);g.fillStyle='#ead7a4';g.strokeStyle='#2a1a0e';g.lineWidth=2.5;g.beginPath();g.moveTo(0,16);g.lineTo(-12,-7);g.lineTo(12,-7);g.closePath();g.fill();g.stroke();g.restore()}
  }
  for(const b of P0.bottles){const[x,y]=toScreen(b.x,b.y);if(out(x,y))edgeArrow(g,w,h,x,y,'#9fe8d0',Math.hypot(b.x-C.p.x,b.y-C.p.y))}
  if((C.fogA||0)>.02){g.fillStyle='rgba(226,236,244,'+(C.fogA*.2)+')';g.fillRect(0,0,w,h)}
}

/* ---------------- D4: eventi casuali in mare (balena, naufrago, nave fantasma di notte) ---------------- */
// Un solo evento alla volta, mai pericoloso e sempre facoltativo: il premio sono casse d'argento in acqua.
// Compaiono solo nella navigazione libera (dopo il tutorial, prima del convoglio) e al massimo tre per partita.
const EV_COL={whale:'#8fd0ff',ghost:'#9fe8d0',cast:'#ffb347'};
function evNew(){return{cd:rr(44,68),n:0,cur:null,last:'',done:[]}}
function evMk(k,x,y,hd,o){const E=Object.assign({ev:1,k,x,y,hd,t:0,seed:rr(0,9),ent:{type:'c3'},st:'idle',gt:0},o||{});E.ent.s=E;return E}
function evVis(){const E=C&&C.ev&&C.ev.cur;return E&&!E.gone?[E]:[]}
function evEnd(){const E0=C.ev;if(!E0)return;if(E0.cur)E0.done.push(E0.cur.k);E0.cur=null;E0.cd=rr(70,110)}
function evCrate(x,y){
  let cx=x,cy=y;
  if(!clearAt(cx,cy,40)){const r=findSea(cx,cy);cx=r[0];cy=r[1]}
  C.crates.push({x:cx,y:cy,t:rr(0,9),v:'silver',opt:true});
  for(let i=0;i<4;i++)C.fx.push({k:'flash',x:cx+rr(-18,18),y:cy+rr(-18,8),r:8,t:0,life:.5})
}
function evSpawn(k){
  const E0=C&&C.ev;if(!E0||!C.p)return false;
  const p=C.p,tx=Math.cos(p.hd),ty=Math.sin(p.hd);
  for(let i=0;i<140;i++){
    const a=p.hd+rr(-1.2,1.2),d=rr(1050,1550),x=p.x+Math.cos(a)*d,y=p.y+Math.sin(a)*d;
    if(x<450||y<450||x>WW-450||y>WH-450)continue;
    let E=null;
    if(k==='whale'){
      if(!clearAt(x,y,260))continue;
      E=evMk('whale',x,y,rr(0,TAU),{vis:0,cyc:rr(0,2),life:95,jp:0})
    }else if(k==='cast'){
      if(!clearAt(x,y,130))continue;
      E=evMk('cast',x,y,0,{vx:rr(-5,5),vy:rr(-5,5),life:120,rot:rr(-.2,.2)})
    }else{      // nave fantasma: attraversa il mare davanti a te lungo una rotta tutta libera
      if(!clearAt(x,y,100))continue;
      const hd=Math.atan2(p.y+ty*600-y,p.x+tx*600-x);let len=0;
      for(let s=0;s<=3200;s+=120){if(!clearAt(x+Math.cos(hd)*s,y+Math.sin(hd)*s,70))break;len=s}
      if(len<1700)continue;
      E=mkShip('fantasma',x,y,hd,{ev:1,k:'ghost',t:0,st:'idle',gt:0,gh:0,nm:'Nave fantasma',len,x0:x,y0:y,drop:rr(2,3.5),dropped:0,life:140})
    }
    E0.cur=E;
    const dir=dirName(E.x-p.x,E.y-p.y);
    if(k==='whale')toast('<b>Biscotto:</b> «Cra! Uno spruzzo '+dir+'! È una balena! Avvicinati piano: è amica.»',6500);
    else if(k==='cast')toast('<b>Biscotto:</b> «Cra! Qualcuno agita le braccia '+dir+'! Un naufrago! Corriamo a prenderlo!»',6500);
    else toast('<b>Tito:</b> «Brrr… una nave fantasma '+dir+'. Non spara, capitano: sembra che perda qualcosa.»',7000);
    C.lastPT=C.t;
    return true
  }
  return false
}
function evWhale(E,dt,d){
  const p=C.p;E.life-=dt;E.cyc=(E.cyc||0)+dt;
  const T0=14;let u=E.cyc%T0;
  if(E.st==='idle'&&d<900&&u>11.2){E.cyc=Math.floor(E.cyc/T0)*T0+1.5;u=1.5}      // se ti avvicini, resta a galla
  let v=u<1.5?u/1.5:u<11.5?1:u<13?1-(u-11.5)/1.5:0;
  if(E.st==='gift')v=1;
  else if(E.st==='leave')v=Math.max(0,(E.vis||0)-dt/1.7);
  E.vis=v;
  // nuota piano, restando in mare aperto
  if(E.st!=='gift'){
    E.hd+=Math.sin(E.t*.31+E.seed)*.1*dt;
    const sp=E.st==='leave'?70:42,nx=E.x+Math.cos(E.hd)*sp*dt,ny=E.y+Math.sin(E.hd)*sp*dt;
    if(clearAt(nx,ny,150)){E.x=nx;E.y=ny}else E.hd+=1.7*dt
  }
  // il respiro: spruzzo e verso
  const sc=Math.floor((E.t-.7)/4.4);
  if(sc!==E.sc){E.sc=sc;if(v>.85&&d<1100&&AU.ctx&&AU.on){noiseBurst(.55,1700,.06);tone(180,118,.8,'sine',.05)}}
  if(!E.called&&v>.9&&d<1300){E.called=1;if(AU.ctx&&AU.on){tone(150,92,1.2,'sine',.08);tone(228,138,1,'sine',.04,.25)}}
  // un colpo di cannone vicino la spaventa: se ne va senza regalo
  if(E.st==='idle'&&C.balls.some(b=>Math.hypot(b.x-E.x,b.y-E.y)<170)){E.st='leave';toast('<b>Tito:</b> «Ehi! Le balene non si colpiscono! Se n\'è andata offesa.»',5200)}
  // saluto e regalo
  if(E.st==='idle'&&d<330&&v>.55){
    E.st='gift';E.gt=0;E.jp=.01;E.hd=Math.atan2(E.y-p.y,E.x-p.x)+rr(-.5,.5);
    toast('<b>Biscotto:</b> «Cra! La balena salta! Aveva ingoiato un baule d\'argento e adesso lo risputa. Raccogli le casse!»',7000);C.lastPT=C.t;
    if(AU.ctx&&AU.on){tone(120,260,.9,'sine',.09);noiseBurst(.7,900,.1,.5)}
  }else if(E.st==='gift'){
    E.gt+=dt;E.jp=Math.min(2.2,E.gt);
    if(!E.gave&&E.gt>=1){
      E.gave=1;const bx=E.x+Math.cos(E.hd)*50,by=E.y+Math.sin(E.hd)*50;
      for(let i=0;i<2;i++){const a=rr(0,TAU);evCrate(bx+Math.cos(a)*rr(70,120),by+Math.sin(a)*rr(70,120))}
      for(let i=0;i<10;i++)C.fx.push({k:'splash',x:E.x+rr(-90,90),y:E.y+rr(-40,40),r:rr(8,16),t:0,life:.9});
      if(p.hull<p.max){p.hull=Math.min(p.max,p.hull+1);for(let i=0;i<3;i++)C.fx.push({k:'heal',x:p.x+rr(-60,60),y:p.y+rr(-30,20),vx:0,vy:-34,t:0,life:1.2})}
      sfx('quest');try{YD.stat('events')}catch(e){}
    }
    if(E.gt>=2.6)E.st='leave'
  }
  if(E.st==='leave'&&E.vis<=.02)E.gone=true;
  if(E.life<=0&&E.st==='idle')E.st='leave'
}
function evCast(E,dt,d){
  const p=C.p;E.life-=dt;
  if(E.st==='idle'){
    const nx=E.x+E.vx*dt,ny=E.y+E.vy*dt;if(clearAt(nx,ny,80)){E.x=nx;E.y=ny}else{E.vx=-E.vx;E.vy=-E.vy}
    if(d<125){
      E.st='saved';E.gt=0;sfx('pick');
      for(let i=0;i<2;i++){const a=rr(0,TAU);evCrate(E.x+Math.cos(a)*rr(60,110),E.y+Math.sin(a)*rr(40,80))}
      toast('<b>Naufrago:</b> «Grazie, capitano! Questo è tutto ciò che ho salvato: prendilo!»',6500);C.lastPT=C.t;
      try{YD.stat('events')}catch(e){}
      setTimeout(()=>{if(C&&!C.over&&C.ev)parEv('crate',1)},2800)
    }else if(E.life<=0)E.st='saved',E.gt=2.6
  }else{E.gt+=dt;if(E.gt>3.2)E.gone=true}
}
function evGhost(E,dt,d){
  const sp=84;E.life-=dt;
  E.x+=Math.cos(E.hd)*sp*dt;E.y+=Math.sin(E.hd)*sp*dt;E.v=sp;
  const trav=Math.hypot(E.x-E.x0,E.y-E.y0),fin=Math.min(1,E.t/3),fout=cl((E.len-trav)/320,0,1);
  E.gh=Math.min(fin,fout);
  if(!E.seen&&d<1250&&E.gh>.4){E.seen=1;toast('<b>Biscotto:</b> «Cra! Lascia cadere casse d\'argento! I fantasmi non sanno che farsene.»',6500);C.lastPT=C.t;if(AU.ctx&&AU.on){tone(330,240,1.1,'sine',.04);tone(332,246,1.1,'sine',.03,.04)}}
  if(d<1000&&E.dropped<3&&E.gh>.5){
    E.drop-=dt;
    if(E.drop<=0){
      E.drop=rr(4,6);E.dropped++;
      evCrate(E.x-Math.cos(E.hd)*80+rr(-30,30),E.y-Math.sin(E.hd)*80+rr(-30,30));
      if(AU.ctx&&AU.on)tone(660,880,.35,'sine',.05);
      if(E.dropped===1)try{YD.stat('events')}catch(e){}
    }
  }
  if(trav>=E.len-5||(E.gh<=.01&&E.t>8)||E.life<=0){
    if(!E.gone&&d<1700&&E.dropped>0)toast('<b>Tito:</b> «Sparita. Come se non fosse mai esistita…»',4500);
    E.gone=true
  }
}
function evStep(dt){
  const E0=C.ev;if(!E0||C.over||C.go5||C.convoy||!C.p)return;
  const p=C.p;let E=E0.cur;
  if(!E){
    if(E0.n>=3)return;
    E0.cd-=dt;if(E0.cd>0||C.t<40||dl.open||PAUSED)return;
    if(C.t-(C.lastPT||-99)<9)return;      // mai sopra un altro avviso
    if(C.ships.some(s=>!s.dead&&!s.ally&&(s.type==='pattuglia'||s.type==='scorta'||s.type==='galeone')&&Math.hypot(s.x-p.x,s.y-p.y)<1700)){E0.cd=6;return}
    const pt=TPp(21,30);if(Math.hypot(p.x-pt[0],p.y-pt[1])<1300)return;
    const ks=['whale','cast'];if(C.plan&&C.plan.time==='notte')ks.push('ghost','ghost');
    const pool=ks.filter(k=>k!==E0.last),k=pool[(Math.random()*pool.length)|0];
    if(evSpawn(k)){E0.last=k;E0.n++}else E0.cd=8;
    return
  }
  E.t+=dt;const d=Math.hypot(E.x-p.x,E.y-p.y);
  if(E.k==='whale')evWhale(E,dt,d);else if(E.k==='cast')evCast(E,dt,d);else evGhost(E,dt,d);
  if(E.gone||(d>4300&&E.t>25))evEnd()
}
/* ---- disegno ---- */
function whaleDraw(g,s,t){
  const v=s.vis||0;if(v<=.02)return;
  const L=250,W=76,sw=Math.sin(t*1.7+s.seed)*.22,jp=s.jp>0?Math.sin(Math.min(1,s.jp/2.2)*Math.PI):0;
  const c=Math.cos(s.hd),sn=Math.sin(s.hd);
  g.save();g.translate(s.x,s.y+10);
  g.save();g.rotate(s.hd);g.globalAlpha=.22*v;g.fillStyle='#03223d';g.beginPath();g.ellipse(-L*.02,6,L*.5,W*.62,0,0,7);g.fill();g.restore();
  for(let k=0;k<2;k++){const u=(t*.35+k*.5+s.seed)%1;g.strokeStyle='rgba(235,248,255,'+(.4*(1-u)*v*(1+jp))+')';g.lineWidth=3;g.beginPath();g.ellipse(0,2,L*(.34+.3*u),W*(.5+.4*u),s.hd,0,7);g.stroke()}
  g.translate(0,-jp*70);g.rotate(s.hd);g.scale(1+jp*.16,1+jp*.16);g.globalAlpha=v;
  // coda con le pinne
  g.save();g.translate(-L*.4,0);g.rotate(sw);g.fillStyle='#27456e';g.strokeStyle='#10243f';g.lineWidth=2.4;
  g.beginPath();g.moveTo(10,0);g.quadraticCurveTo(-8,-8,-26,-40);g.quadraticCurveTo(-30,-18,-22,-4);g.quadraticCurveTo(-24,0,-22,4);g.quadraticCurveTo(-30,18,-26,40);g.quadraticCurveTo(-8,8,10,0);g.closePath();g.fill();g.stroke();g.restore();
  // corpo
  const bg=g.createLinearGradient(0,-W*.6,0,W*.6);bg.addColorStop(0,'#4d7fb2');bg.addColorStop(.5,'#34608f');bg.addColorStop(1,'#223f68');
  g.fillStyle=bg;g.strokeStyle='#10243f';g.lineWidth=3;
  g.beginPath();g.moveTo(L*.5,0);
  g.bezierCurveTo(L*.46,-W*.5,L*.16,-W*.6,-L*.1,-W*.36);
  g.bezierCurveTo(-L*.24,-W*.22,-L*.34,-W*.09,-L*.42,0);
  g.bezierCurveTo(-L*.34,W*.09,-L*.24,W*.22,-L*.1,W*.36);
  g.bezierCurveTo(L*.16,W*.6,L*.46,W*.5,L*.5,0);
  g.closePath();g.fill();g.stroke();
  // riflesso sul dorso e macchie chiare
  g.fillStyle='rgba(190,225,250,.34)';g.beginPath();g.ellipse(L*.08,-W*.2,L*.3,W*.12,-.04,0,7);g.fill();
  g.fillStyle='rgba(225,240,252,.55)';for(const[px,py,r]of[[L*.3,W*.3,5],[L*.2,W*.36,4],[-L*.02,W*.33,5],[L*.36,-W*.32,3.5]]){g.beginPath();g.arc(px,py,r,0,7);g.fill()}
  // pinne pettorali
  g.fillStyle='#27456e';g.strokeStyle='#10243f';g.lineWidth=2.4;
  for(const sd of[-1,1]){g.save();g.translate(L*.2,sd*W*.5);g.rotate(sd*(.9+Math.sin(t*1.7+s.seed+sd)*.12));g.beginPath();g.ellipse(0,0,34,10,0,0,7);g.fill();g.stroke();g.restore()}
  // occhi e sfiatatoio
  g.fillStyle='#0c1a2c';g.beginPath();g.arc(L*.34,-W*.3,4.2,0,7);g.fill();g.beginPath();g.arc(L*.34,W*.3,4.2,0,7);g.fill();
  g.fillStyle='#fff';g.beginPath();g.arc(L*.345,-W*.31,1.5,0,7);g.fill();g.beginPath();g.arc(L*.345,W*.29,1.5,0,7);g.fill();
  g.fillStyle='#10243f';g.beginPath();g.ellipse(L*.2,0,7,3,0,0,7);g.fill();
  g.restore();
  // spruzzo: un ventaglio d'acqua che sale in verticale
  const sp=(s.t-.7)%4.4;
  if(v>.85&&sp>=0&&sp<1.5&&s.st!=='leave'){
    const u=sp/1.5,bx=s.x+c*L*.2,by=s.y+10+sn*L*.2*.9-jp*70,al=1-Math.max(0,u-.45)/.55,rise=Math.min(1,u*2.2);
    g.save();g.lineCap='round';
    for(let i=-3;i<=3;i++){
      const hmax=(52+22*(3-Math.abs(i)))*(.4+.6*rise);
      g.strokeStyle='rgba(240,250,255,'+(.82*al)+')';g.lineWidth=4.6-Math.abs(i)*.4;
      g.beginPath();
      for(let k=0;k<=10;k++){const q=k/10*Math.min(1,.25+rise),xx=bx+i*20*q*(.5+u),yy=by-hmax*(1-Math.pow(2*q-1,2));if(k)g.lineTo(xx,yy);else g.moveTo(xx,yy)}
      g.stroke()
    }
    g.fillStyle='rgba(245,252,255,'+(.4*al)+')';
    for(let j=0;j<5;j++){g.beginPath();g.arc(bx+(j-2)*15,by-96*rise+Math.sin(j*2+s.t)*5,11+(j%2)*5,0,7);g.fill()}
    g.restore()
  }
  g.restore()
}
function castDraw(g,s,t){
  const sv=s.st==='saved',a=sv?cl(1-(s.gt||0)/3,0,1):1;if(a<=.02)return;
  const bob=Math.sin(t*1.9+s.seed)*2.2,wv=Math.sin(t*7+s.seed);
  g.save();g.globalAlpha=a;g.translate(s.x,s.y+6+bob);
  g.fillStyle='rgba(4,24,44,.25)';g.beginPath();g.ellipse(4,16,46,16,0,0,7);g.fill();
  const u=(t*.5+s.seed)%1;g.strokeStyle='rgba(255,255,255,'+(.5*(1-u))+')';g.lineWidth=2;g.beginPath();g.ellipse(0,14,40+u*26,13+u*8,0,0,7);g.stroke();
  g.save();g.rotate(s.rot||0);
  for(let i=0;i<5;i++){g.fillStyle=i%2?'#a9763e':'#b98a55';g.strokeStyle='#3a200c';g.lineWidth=2;g.fillRect(-32+i*13,-17,12,36);g.strokeRect(-32+i*13,-17,12,36)}
  g.strokeStyle='#e8d9a8';g.lineWidth=3;g.beginPath();g.moveTo(-34,-8);g.lineTo(34,-8);g.moveTo(-34,10);g.lineTo(34,10);g.stroke();
  g.restore();
  // albero con lo straccio bianco
  g.fillStyle='#5a3a1c';g.fillRect(18,-66,4,54);
  const fw=Math.sin(t*5+s.seed)*5;g.fillStyle='#ece4d0';g.strokeStyle='#8a7a5a';g.lineWidth=1.4;
  g.beginPath();g.moveTo(22,-64);g.quadraticCurveTo(36,-64+fw,46,-58+fw*.6);g.lineTo(40,-52);g.quadraticCurveTo(32,-54-fw*.4,22,-48);g.closePath();g.fill();g.stroke();
  // il naufrago: seduto, agita le braccia
  g.lineCap='round';g.strokeStyle='#e8b88a';g.lineWidth=5;
  g.beginPath();g.moveTo(-15,-24);g.lineTo(-25,-44+wv*7);g.moveTo(3,-24);g.lineTo(13,-46-wv*7);g.stroke();
  g.fillStyle='#c4553a';g.strokeStyle='#3a1a10';g.lineWidth=2;g.beginPath();g.ellipse(-6,-14,11,15,0,0,7);g.fill();g.stroke();
  g.strokeStyle='rgba(255,246,226,.85)';g.lineWidth=2.4;for(const yy of[-20,-13,-6]){g.beginPath();g.moveTo(-14,yy);g.lineTo(2,yy);g.stroke()}
  g.fillStyle='#e8b88a';g.strokeStyle='#3a1a10';g.lineWidth=2;g.beginPath();g.arc(-6,-36,9,0,7);g.fill();g.stroke();
  g.fillStyle='#d8b050';g.beginPath();g.ellipse(-6,-42,16,4.6,0,0,7);g.fill();g.stroke();g.beginPath();g.arc(-6,-43,8,Math.PI,0);g.fill();g.stroke();
  g.fillStyle='#2a1a10';g.beginPath();g.arc(-9.5,-36,1.4,0,7);g.fill();g.beginPath();g.arc(-2.5,-36,1.4,0,7);g.fill();
  g.beginPath();g.ellipse(-6,-31,2.6,2.2+Math.abs(wv)*1.4,0,0,7);g.fill();
  if(!sv){
    const by=-86-Math.abs(Math.sin(t*4))*6;g.fillStyle='#ffd23a';g.strokeStyle='#3a2410';g.lineWidth=3;g.beginPath();g.arc(-6,by,12,0,7);g.fill();g.stroke();
    g.fillStyle='#3a2410';g.font='900 18px Nunito,Arial';g.textAlign='center';g.fillText('!',-6,by+6.5);
    if(Math.hypot(C.p.x-s.x,C.p.y-s.y)<900){g.font='800 14px Nunito,Arial';g.lineWidth=4;g.strokeStyle='rgba(10,22,34,.85)';g.fillStyle='#ffd9a0';g.strokeText('Naufrago',0,46);g.fillText('Naufrago',0,46)}
  }
  g.restore()
}
function evDrawShip(g,s,t){
  if(!inV(s.x,s.y,460))return;
  if(s.k==='whale')whaleDraw(g,s,t);else if(s.k==='cast')castDraw(g,s,t)
}
function evMini(c,p,sc){
  const E=C.ev&&C.ev.cur;if(!E||E.gone||E.st!=='idle'||(E.k==='ghost'&&(E.gh||0)<.2))return;
  let dx=(E.x-p.x)*sc,dy=(E.y-p.y)*sc;const dd=Math.hypot(dx,dy),far=dd>98,pl=.5+.5*Math.sin(C.t*5);if(far){dx=dx/dd*98;dy=dy/dd*98}
  c.save();c.translate(dx,dy);c.fillStyle=EV_COL[E.k];c.strokeStyle='#0a1622';c.lineWidth=2;c.beginPath();c.arc(0,0,(far?5:6.5)+pl*1.5,0,7);c.fill();c.stroke();c.restore()
}
function evOverlay(g,w,h){
  const E=C.ev&&C.ev.cur;if(!E||E.gone||E.st!=='idle'||C.over||C.tut||C.go5)return;
  if(E.k==='ghost'&&(E.gh||0)<.15)return;
  const[x,y]=toScreen(E.x,E.y);
  if(x>26&&x<w-26&&y>40&&y<h-26)return;
  edgeArrow(g,w,h,x,y,EV_COL[E.k],Math.hypot(E.x-C.p.x,E.y-C.p.y))
}
function evHint(){
  const E=C.ev&&C.ev.cur,p=C.p;if(!E||E.gone||E.st!=='idle'||Math.hypot(E.x-p.x,E.y-p.y)>2600)return null;
  const dr=dirName(E.x-p.x,E.y-p.y);
  return E.k==='whale'?'Una balena '+dr+'! Avvicinati piano: è amica e porta fortuna.':E.k==='cast'?'Un naufrago '+dr+'! Raggiungilo con la nave.':'La nave fantasma passa '+dr+'. Non spara: guarda se lascia cadere qualcosa.'
}

/* ---------------- passo ---------------- */
function step(dt){
  if(!C||C.over)return;
  C.t+=dt;C.wind+=dt*.03;
  const p=C.p;
  // sterzo con joystick (direzione desiderata) o tastiera
  let jx=JOY.x,jy=JOY.y,jm=Math.hypot(jx,jy);
  const kx=(KEYS.d||KEYS.ArrowRight?1:0)-(KEYS.a||KEYS.ArrowLeft?1:0),ky=(KEYS.s||KEYS.ArrowDown?1:0)-(KEYS.w||KEYS.ArrowUp?1:0);
  const ctl=!PAUSED&&!dl.open;
  if(ctl){
    if(kx)p.hd+=kx*1.0*dt;
    else if(jm>.12){const a=Math.atan2(jy,jx),d=angD(p.hd,a);p.hd+=cl(d*2.4,-1.05,1.05)*dt}
  }
  const go=ctl&&(jm>.12||kx!==0||ky<0);
  let tv=(go?SAILSPD[C.sail]:0)*windK(p.hd)*(p.disabled?0:1)*(1-.03*Math.min(C.silver,10))*(C.sailK||1);
  if(VOY)tv=voyTv(tv,go,dt);
  moveShip(p,dt,tv);
  if(C.go5&&!C.over&&Math.hypot(p.x-C.go5.x,p.y-C.go5.y)<3.4*T)go5Arrive();
  p.cdL=Math.max(0,p.cdL-dt);p.cdR=Math.max(0,p.cdR-dt);p.flash=Math.max(0,p.flash-dt);
  P.x=p.x;P.y=p.y;P.hd=p.hd;P.rv=p.v;P.moving=false;
  if(!VOY&&p.hull<=1&&!p.gunsOut){p.gunsOut=true;toast('<b>Cannoni danneggiati!</b> Torna al porto a riparare.',5000)}
  if(p.gunsOut&&p.hull>=p.max*.25){p.gunsOut=false;toast('<b>Cannoni riparati!</b> Puoi sparare di nuovo.');repairDone();for(let i=0;i<8;i++)C.fx.push({k:'flash',x:p.x+rr(-70,70),y:p.y+rr(-40,40),r:14,t:0,life:.5})}
  C.gunT=Math.max(0,(C.gunT||0)-dt);
  // porto: ripara
  const pt=TPp(21,30);
  if(!VOY&&Math.hypot(p.x-pt[0],p.y-pt[1])<320&&p.hull<p.max){p.hull=Math.min(p.max,p.hull+dt*.8);C.repT=(C.repT||0)-dt;if(C.repT<=0){C.repT=.7;repairTap();C.fx.push({k:'flash',x:p.x+rr(-60,60),y:p.y+rr(-30,30),r:10,t:0,life:.35})};if(!C.notes.port){C.notes.port=1;toast('Il carpentiere del porto ripara lo scafo.')}}
  if(!C.tut&&!VOY){convoy(dt);poiStep(dt);evStep(dt)}
  // IA: al massimo 3 pattuglie attaccano insieme, le altre aspettano
  C.eng=new Set(C.ships.filter(q=>!q.dead&&q.type==='pattuglia'&&q.hostile).sort((a,b)=>Math.hypot(a.x-p.x,a.y-p.y)-Math.hypot(b.x-p.x,b.y-p.y)).slice(0,3));
  for(const s of C.ships){
    if(s.dead||s.conv&&!s.alert&&s.type!=='scorta'&&0)continue;
    s.cdL=Math.max(0,s.cdL-dt);s.cdR=Math.max(0,s.cdR-dt);s.flash=Math.max(0,s.flash-dt);s.cd-=dt;
    if(C.tut||s.still){s.v*=.9;continue}
    const dp=Math.hypot(p.x-s.x,p.y-s.y);
    if(s.type==='fantasma'){voyGhostAI(s,dt,dp);continue}
    if(s.type==='brigantino'){brigAI(s,dt,dp);continue}
    if((s.type==='scorta'||s.type==='galeone')&&s.conv&&!s.alert&&dp<850)alertConvoy();
    if(s.ally){ // la nave liberata ti segue
      const bx=p.x-Math.cos(p.hd)*260+Math.sin(p.hd)*120,by=p.y-Math.sin(p.hd)*260-Math.cos(p.hd)*120,d=Math.hypot(bx-s.x,by-s.y);
      steerTo(s,bx,by,dt,1);s.hd=avoid(s,s.hd);moveShip(s,dt,cl(d*.7,0,200));continue}
    if(s.type==='mercante'){
      if(!s.wp||Math.hypot(s.wp[0]-s.x,s.wp[1]-s.y)<150)s.wp=randSea();
      const flee=s.hit&&dp<900;
      if(flee||dp<400)steerTo(s,s.x+(s.x-p.x),s.y+(s.y-p.y),dt,1);else steerTo(s,s.wp[0],s.wp[1],dt,1);
      s.hd=avoid(s,s.hd);moveShip(s,dt,SPEC.mercante.spd*(flee?1.15:.65)*windK(s.hd));
    }else if(s.type==='pattuglia'||s.free||(s.type==='scorta'&&s.alert&&!s.guard)){
      const sp0=SPEC[s.type];
      if((s.type==='pattuglia'||s.free)&&!s.hostile&&dp<(s.free?560:330)*(C.plan?C.plan.detect:1)*(C.inFog?.35:1)){s.hostile=true;if(!C.notes.patr&&!s.free){C.notes.patr=1;toast('<b>Tito:</b> «Una pattuglia! Ci ha visti!»')}}
      if((s.type==='pattuglia'||s.free)&&s.hostile&&dp>(s.hit?1600:(s.free?900:620)))s.hostile=false;
      if(C.inFog&&(s.type==='pattuglia'||s.free)&&s.hostile&&dp>(s.hit?560:320))s.hostile=false;
      if(s.type==='scorta'&&s.alert&&dp>1500)s.alert=false;
      if((s.hostile&&(s.type!=='pattuglia'||C.eng.has(s)))||s.alert){
        const want=Math.atan2(p.y-s.y,p.x-s.x);
        if(!s.orb||(s.orbT-=dt)<=0){s.orb=Math.sign(angD(s.hd,want))||1;s.orbT=9}
        if(!s.Dv)s.Dv=380+Math.floor(Math.random()*4)*80;const D=s.Dv,k=dp>D+120?.55:dp<D-90?1.55:1,des=want+s.orb*(Math.PI/2)*k;
        const d=angD(s.hd,des);s.hd+=cl(d,-1,1)*1.3*dt;s.hd=avoid(s,s.hd);
        moveShip(s,dt,sp0.spd*(dp>D+120?1:.8)*windK(s.hd));
        for(const sd of[-1,1]){
          const sa=s.hd+(sd>0?Math.PI/2:-Math.PI/2),toP=Math.atan2(p.y-s.y,p.x-s.x);
          if(dp<640&&Math.abs(angD(sa,toP))<.75&&s.cd<=0&&(sd<0?s.cdL:s.cdR)<=0){fire(s,sd);s.cd=s.free?rr(1.8,3):rr(2.2,3.8)}
        }
      }else{
        if(!s.wp||Math.hypot(s.wp[0]-s.x,s.wp[1]-s.y)<150)s.wp=randSea();
        steerTo(s,s.wp[0],s.wp[1],dt,1);s.hd=avoid(s,s.hd);moveShip(s,dt,sp0.spd*.7*windK(s.hd));
      }
    }else if((s.type==='galeone'||(s.type==='scorta'&&s.guard))&&s.alert&&!s.disabled){
      for(const sd of[-1,1]){
        const sa=s.hd+(sd>0?Math.PI/2:-Math.PI/2),toP=Math.atan2(p.y-s.y,p.x-s.x);
        if(dp<700&&Math.abs(angD(sa,toP))<.8&&s.cd<=0&&(sd<0?s.cdL:s.cdR)<=0){fire(s,sd);s.cd=s.type==='galeone'?rr(1.8,3):rr(2.4,3.6)}
      }
    }
  }
  sepAll(dt);collide(dt);
  // palle di cannone
  for(const b of C.balls){
    b.t+=dt;b.x+=b.vx*dt;b.y+=b.vy*dt;
    if(b.t>=b.life){if(mzn('colpo-acqua-1'))C.fx.push({k:'geyser',x:b.x,y:b.y,t:0,life:.75});else C.fx.push({k:'splash',x:b.x,y:b.y,r:14,t:0,life:.55});b.dead=true;continue}
    const targets=b.own===p?C.ships:[p];
    for(const s of targets){
      if(s.dead||s===b.own||(b.own===p&&s.ally))continue;
      if(hitTest(s,b.x,b.y)){
        b.dead=true;
        const trav=b.t*640,dmg=s===p?((C.easy?.35:.7)*(b.own&&b.own.type==='galeone'?1.5:.8)):(b.own===p?(trav<450?1.15:trav<800?1:Math.max(.35,1-(trav-800)/900)):1);
        if(b.own===p){C.hits++;s.hit=true;if(s.type==='pattuglia'||s.free)s.hostile=true;if(s.conv)alertConvoy()}
        hurt(s,dmg);
        for(let i=0;i<7;i++)C.fx.push({k:'chip',x:b.x,y:b.y,vx:rr(-120,120),vy:rr(-160,-30),t:0,life:.7});
        if(mzn('esplosione-1'))C.fx.push({k:'boom',x:b.x,y:b.y,t:0,life:.55});else{C.fx.push({k:'flash',x:b.x,y:b.y,r:22,t:0,life:.25});puff(b.x,b.y,16,1)}
        if(s===p&&AU.ctx&&AU.on){noiseBurst(.25,200,.5);tone(90,40,.25,'square',.2)}else if(AU.ctx&&AU.on)tone(220,110,.1,'square',.1);
        break
      }
    }
  }
  C.balls=C.balls.filter(b=>!b.dead);
  // casse
  for(const c of C.crates){c.t+=dt;if(!c.got&&Math.hypot(c.x-p.x,c.y-p.y)<80){c.got=true;if(c.v==='silver'){C.silver++;toast("Cassa d'argento! ("+C.silver+")");sfx('coin');parEv('crate')}else{toast('Provviste recuperate: scafo riparato un po\'.');p.hull=Math.min(p.max,p.hull+(VOY?1:.5));sfx('pick')}}}
  C.crates=C.crates.filter(c=>!c.got);
  for(const q of C.fx){q.t+=dt;if(q.vx!=null){q.x+=q.vx*dt;q.y+=q.vy*dt;if(q.k==='chip')q.vy+=300*dt}}
  C.fx=C.fx.filter(q=>q.t<q.life);
  if(C.fx.length<420)for(const s of C.ships.concat([C.p])){
    if(s.dead||s.sinking)continue;const sp1=SPEC[s.type];if(!sp1)continue;
    if(Math.abs(s.v||0)>30&&Math.hypot(s.x-C.p.x,s.y-C.p.y)<1500){s.wkT=(s.wkT||0)-dt;if(s.wkT<=0){s.wkT=.1;const cc=Math.cos(s.hd),ss2=Math.sin(s.hd);C.fx.push({k:'foam',x:s.x-cc*sp1.L*.5+rr(-5,5),y:s.y+8-ss2*sp1.L*.5+rr(-5,5),r:rr(8,13)*(sp1.W/40+.6),t:0,life:1.5,vx:rr(-5,5),vy:rr(-5,5)})}}
    if(s.disabled&&s!==C.p){s.smT=(s.smT||0)-dt;if(s.smT<=0){s.smT=.22;C.fx.push({k:'smoke',x:s.x+rr(-20,20),y:s.y-24,r:rr(12,20),t:0,life:2.2,vx:rr(-8,8),vy:rr(-34,-18)});if(Math.random()<.5)C.fx.push({k:'flash',x:s.x+rr(-26,26),y:s.y-10+rr(-8,8),r:7,t:0,life:.25})}}
  }
  for(const s of C.ships)if(s.sinking){s.sink=Math.min(1,s.sink+dt/2.2);if(s.sink>=1)s.sinking=false}
  // fumo dallo scafo danneggiato
  for(const s of[p,...C.ships]){if(s.dead||s.hull>s.max*.4||s.disabled&&0)continue;if(Math.random()<dt*5)puff(s.x+rr(-30,30),s.y+rr(-10,10)-20,rr(8,14),rr(1,1.8))}
  // abbordaggio
  const bd=nearBoard();$('c3bd').style.display=bd?'flex':'none';if(bd&&!C.notes.bdh){C.notes.bdh=1;toast('<b>Avvicinati e premi «Abborda!»</b> (il pulsante rosso): salti sulla nave.',6500)}
  // scafo a zero
  if(p.hull<=0&&!p.dead){
    if(VOY){voyRespawn()}else if(C.easy){p.hull=p.max;const q=TPp(24.5,31);p.x=q[0];p.y=q[1];p.v=0;p.hd=0;const l=Math.min(C.silver,3);C.silver-=l;C.lost+=l;toast('Affondata! Dodo ti ripesca e ti riporta al porto'+(l?' (-'+l+' casse)':'')+'.')}
    else{p.dead=true;endRun('affondata')}
  }
  if(VOY){voyStep(dt)}else{
  // storia
  if(!C.tut&&!C.notes.start&&C.t>1.5){C.notes.start=1;toast('<b>Tito:</b> «Capitano, ci sono navi nemiche in zona. Affondane qualcuna.»')}
  if(!C.tut&&!C.convoy&&!C.notes.esc0&&(C.ekills||0)>=1){C.esW=(C.esW||0)+dt;if(C.esW>5){C.notes.esc0=1;spawnEscort()}}
  if(!C.tut&&C.convoy&&!C.notes.found&&C.ships.some(s=>s.conv&&!s.dead&&Math.hypot(s.x-p.x,s.y-p.y)<1400)){C.notes.found=1;toast('<b>Tito:</b> «Pip e Dodo sono sulla nave con la bandiera bianca. <b>Non affondarla.</b>»')}
  if(!C.convoy&&!C.tut&&((C.ekills||0)>=3||C.t>300)){const q0=routePos(700);C.cvW=(C.cvW||0)+dt;if(C.cvW<1.5&&!C.cvT){C.cvT=1;toast('Tito: «Capitano! Il galeone spagnolo sta per salpare, tieniti pronto!»',5000)}if(Math.hypot(q0.x-p.x,q0.y-p.y)>2600||C.cvW>25)spawnConvoy()}
  {const ldg=C.ships.find(s=>s.conv&&s.type==='galeone'&&!s.dead&&!s.ally);
   if(ldg&&ROUTE.length>1){const f=(ldg.prog||0)/(ROUTE.length-1);
     if(f>.55&&!C.notes.esc1){C.notes.esc1=1;toast('<b>Tito:</b> «Il galeone è a metà strada verso l\'uscita! Seguilo, la linea dorata mostra dove va.»',6000)}
     if(f>.85&&!C.notes.esc2){C.notes.esc2=1;toast('<b>Biscotto:</b> «Sta per scappare! Colpiscilo e abbordalo, presto!»',6000)}}}
  const alive=C.ships.filter(s=>s.conv&&!s.dead);
  const gal=alive.filter(s=>s.type==='galeone');
  if(!C.over&&!C.go5&&C.convoy&&(C.pris===2||C.prisLost)&&gal.length===0&&!C.crates.some(c=>!c.opt))endRun('completo');
  if(!C.over&&!C.go5&&C.escapes>0&&!C.ships.some(x=>x.conv&&!x.dead&&!x.ally&&x.type!=='scorta'))endRun('fuga');
  }
  tutStep();
  hud();
  objVis(dt);parTick(dt);
}
function alertConvoy(){for(const s of C.ships)if(s.conv&&(s.type==='scorta'||s.type==='galeone')&&!s.dead)s.alert=true;if(!C.notes.alert){C.notes.alert=1;toast('<b>Tito:</b> «Ci hanno visti! Le scorte e il galeone aprono il fuoco!»')}}
function convoy(dt){
  const conv=C.ships.filter(s=>s.conv&&!s.dead&&!s.ally);
  const ld=conv.find(s=>s.type==='galeone');
  for(const s of conv){
    if(s.type==='scorta'&&s.alert&&!s.guard)continue;
    if(s.disabled){s.v*=.97;continue}
    if(ld&&s!==ld&&s.slot){
      const c=Math.cos(ld.hd),n=Math.sin(ld.hd),tx=ld.x+c*s.slot[0]-n*s.slot[1],ty=ld.y+n*s.slot[0]+c*s.slot[1],d=Math.hypot(tx-s.x,ty-s.y);
      const want=d>140?Math.atan2(ty-s.y,tx-s.x):ld.hd,dd=angD(s.hd,want);
      s.hd+=cl(dd,-1,1)*Math.min(Math.abs(dd)*2.4,.9)*dt;s.hd=avoid(s,s.hd);
      moveShip(s,dt,cl(Math.max(40,ld.v)+d*.6,0,130));continue}
    const sp0=SPEC[s.type],tg=ROUTE[Math.min(s.prog,ROUTE.length-1)];
    if(Math.hypot(tg[0]-s.x,tg[1]-s.y)<160){s.prog++;if(s.prog>=ROUTE.length){s.dead=true;s.escaped=true;C.escapes++;continue}}
    const t2=ROUTE[Math.min(s.prog,ROUTE.length-1)];
    steerTo(s,t2[0],t2[1],dt,1);
    s.hd=avoid(s,s.hd);
    moveShip(s,dt,(s.hit?72:52));
  }
}
function nearBoard(){
  const p=C.p;
  for(const s of C.ships)if((s.type==='prigionieri'||s.type==='galeone')&&!s.dead&&!s.ally&&s.disabled&&Math.hypot(s.x-p.x,s.y-p.y)<(s.type==='galeone'?520:400)+(C.plan?C.plan.abb*60:0))return s;
  return null
}
function saveCP(){try{localStorage.setItem('sm_c3cp',JSON.stringify({easy:C.easy,plan:C.plan,pris:C.pris,silver:C.silver}))}catch(e){}}
function loadCP(){try{const q=localStorage.getItem('sm_c3cp');return q?JSON.parse(q):null}catch(e){return null}}
function clearCP(){try{localStorage.removeItem('sm_c3cp')}catch(e){}}
function board(){
  if(!C||C.over)return;const s=nearBoard();if(!s)return;
  if(s.type==='galeone'){
    C.over=true;boardSfx();toast('<b>Abbordaggio!</b> Tutti sul galeone spagnolo!',2500);try{YD.stat('gal')}catch(e){}
    try{localStorage.setItem('sm_c34',JSON.stringify({pris:C.pris,silver:C.silver,hull:C.p.hull,max:C.p.max,kills:C.kills,t:C.t,shots:C.shots,hits:C.hits}))}catch(e){}
    setTimeout(()=>{try{__go('#w4')}catch(e){}location.reload()},1100);return}
  s.ally=true;s.conv=false;s.disabled=false;s.hull=s.max;C.pris=2;boardSfx();parEv('board',1);saveCP();try{YD.stat('pris');yAnn(5200)}catch(e){}
  toast('<b>Pip:</b> «Capitano! Sapevo che saresti venuto!» · <b>Dodo:</b> «Ho ancora il cucchiaio!»');
  for(let i=0;i<8;i++)C.fx.push({k:'flash',x:s.x+rr(-60,60),y:s.y+rr(-30,30),r:18,t:0,life:.6});
  setTimeout(()=>{if(!C||C.over)return;const g=C.ships.find(q=>q.type==='galeone'&&!q.dead&&!q.ally);if(g)toast('<b>Biscotto:</b> «Ora il galeone! Colpiscilo fino all\'avaria, poi premi Abborda: l\'argento è a bordo. È '+dirName(g.x-C.p.x,g.y-C.p.y)+': guarda il segnalino rosso sulla minimappa.»',7000)},3500);
}

/* ---------------- disegno nel mondo ---------------- */
function ghostDeco(g,s,t,al){
  const bob=Math.sin(t*1.5+s.seed)*1.6,W=SPEC.fantasma.W;
  g.save();g.globalAlpha=Math.min(1,al*1.25);g.translate(s.x,s.y+8+bob);g.rotate(s.hd);
  // squarcio nello scafo: tavole spezzate
  g.fillStyle='rgba(6,20,24,.88)';g.beginPath();g.moveTo(-8,-W*.42);g.lineTo(2,-W*.1);g.lineTo(-4,W*.05);g.lineTo(10,W*.3);g.lineTo(26,W*.38);g.lineTo(22,W*.12);g.lineTo(30,-W*.12);g.lineTo(14,-W*.2);g.lineTo(18,-W*.44);g.closePath();g.fill();
  g.strokeStyle='#8fa8a0';g.lineWidth=2.2;for(const[x1,y1,x2,y2]of[[-6,-W*.4,-14,-W*.55],[16,-W*.42,24,-W*.58],[24,W*.38,30,W*.56],[-2,W*.04,-12,W*.2]]){g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()}
  // moncone dell'albero maestro
  g.fillStyle='#3a4a44';g.beginPath();g.moveTo(-5,-5);g.lineTo(-3,-24);g.lineTo(-1,-15);g.lineTo(2,-27);g.lineTo(5,-12);g.lineTo(6,-5);g.closePath();g.fill();
  // alghe attaccate: lunghi fili che ondeggiano
  g.lineCap='round';
  for(let i=0;i<14;i++){const side=i%2?1:-1,x=-50+i*7.2,y0=side*W*(.46+.04*Math.sin(i*2.3)),L=10+7*((i*37)%5),sw=Math.sin(t*1.7+i*1.3)*4;
    g.strokeStyle=i%3?'rgba(78,170,100,.95)':'rgba(46,130,84,.95)';g.lineWidth=2.6+((i*13)%3)*.7;
    g.beginPath();g.moveTo(x,y0);g.quadraticCurveTo(x+sw,y0+side*L*.6,x+sw*1.6-3,y0+side*L);g.stroke();
    g.fillStyle='rgba(140,214,120,.95)';g.beginPath();g.ellipse(x+sw*1.6-3,y0+side*L,3.2,2,0,0,7);g.fill()}
  // alga sul ponte e conchiglie
  g.fillStyle='rgba(70,150,88,.92)';for(const[x,y]of[[-22,2],[30,-4],[-40,-6],[44,6]]){g.beginPath();g.ellipse(x,y,7,4,.5,0,7);g.fill()}
  g.restore();
}
function drawShip(g,e,t){
  const s=e.s;
  if(s.ev&&s.k!=='ghost'){evDrawShip(g,s,t);return}
  if(s.type==='fantasma'){const ga=s.gh==null?1:s.gh;if(ga<=.01)return;g.save();g.globalCompositeOperation='lighter';const gl=g.createRadialGradient(s.x,s.y,10,s.x,s.y,190);gl.addColorStop(0,'rgba(120,255,220,'+(.20*ga)+')');gl.addColorStop(1,'rgba(120,255,220,0)');g.fillStyle=gl;g.fillRect(s.x-190,s.y-190,380,380);g.restore();const al=Math.max(0,(.74+.12*Math.sin(t*2+s.seed))*(1-(s.fade||0))*ga);g.save();g.globalAlpha=al;drawShip0(g,e,t);g.restore();ghostDeco(g,s,t,al);return}
  wakeSp(g,s);
  drawShip0(g,e,t)
}
function drawShip0(g,e,t){
  const s=e.s,sp0=SPEC[s.type];
  if(s.dead&&!s.sinking)return;
  const c=Math.cos(s.hd),sn=Math.sin(s.hd),bob=Math.sin(t*1.5+s.seed)*1.6,sk=s.sink||0;
  g.save();
  if(sk>0)g.globalAlpha=1-sk*.9;
  if(sk<.3){g.save();g.translate(s.x+12,s.y+26);g.rotate(s.hd);g.fillStyle='rgba(4,24,44,.26)';g.beginPath();g.ellipse(0,0,sp0.L*.82,sp0.W*.7,0,0,7);g.fill();g.restore()}
  g.translate(s.x,s.y+8+bob+sk*26);g.rotate(s.hd+sk*.15+Math.sin(t*1.1+s.seed)*.012);
  const NV=navDraw(g,s,sp0,sk);if(!NV)drawSp(g,hs(s.type,s),0,0,1);
  if(s.flash>0){g.globalAlpha=Math.min(1,s.flash*3.5);g.fillStyle='rgba(255,255,255,.7)';g.beginPath();g.ellipse(0,0,sp0.L*.85,sp0.W*.85,0,0,7);g.fill();g.globalAlpha=1}
  g.restore();
  if(sk>.5)return;
  // vele (cartelloni che guardano il vento)
  const lvl=s===C.p?C.sail:(s.disabled?0:2),k=lvl===0?.38:.5+.17*lvl;
  const sw=Math.sin(t*1.8+s.seed)*.03+(s.v?.05*(s.v/120):0)*(c>0?-1:1);
  if(s.sg==null)s.sg=c<0?-1:1;if(c>.25)s.sg=1;else if(c<-.25)s.sg=-1;
  s.sf=s.sf==null?s.sg:s.sf+(s.sg-s.sf)*Math.min(1,Math.max(0,t-(s.sfT||t))*4);s.sfT=t;   // la vela gira piano da un lato all'altro, senza scatto
  const ms=sp0.masts.slice().sort((a,b)=>s.sg>0?(b-a)*c:(a-b)*c);   // ordine stabile: dipende dal lato della vela, non da un segno che scatta
  for(const m of (NV?[]:ms)){
    g.save();g.translate(s.x+c*m*sp0.L,s.y+sn*m*sp0.L+8+bob);
    g.transform(1,0,sw,1,0,0);g.scale(1,k);{const mg=g.createLinearGradient(-3,0,3,0);mg.addColorStop(0,'#9a7048');mg.addColorStop(1,'#4a2c18');g.fillStyle=mg;g.fillRect(-3,-sp0.mh,6,sp0.mh);g.strokeStyle='rgba(20,10,4,.6)';g.lineWidth=1;g.strokeRect(-3,-sp0.mh,6,sp0.mh)}g.scale(s.sf,1);
    if(sk>0)g.globalAlpha=1-sk*1.4;
    const spr=ss(s.type,s);drawSp(g,spr,0,0,1);g.restore()
  }
  if(s===C.p&&sk<.3){const m0=sp0.masts[0],px=NV?s.x+c*sp0.L*.18:s.x+c*m0*sp0.L,py=NV?s.y+sn*sp0.L*.18+8+bob-26:s.y+sn*m0*sp0.L+8+bob-sp0.mh*k+8;drawParrot(g,px,py,{t,s:.78,perch:true,flip:c<0,hat:S&&S.phat})}
  // etichetta e barra
  const hy=s.y-sp0.mh*k-14;
  if(!s.isP){
    g.save();g.textAlign='center';g.font='800 14px Nunito,Arial';
    const near=Math.hypot(P.x-s.x,P.y-s.y)<1100||s.type==='prigionieri'&&!s.ally;
    if(near){const lab=s.ally?'Nave di Pip e Dodo':(s.nm||sp0.name)+(s.disabled?' · in avaria':'');g.lineWidth=4;g.strokeStyle='rgba(10,22,34,.85)';g.fillStyle=s.type==='prigionieri'?'#fff':s.type==='galeone'?'#ffe08a':s.type==='mercante'?'#e8e0c8':s.type==='brigantino'?'#e2c4ff':s.ally?'#b9f0b0':'#ffb0a0';g.strokeText(lab,s.x,hy-10);g.fillText(lab,s.x,hy-10)}
    if(s.hull<s.max||s.type==='galeone'||s.type==='prigionieri'){const bw=70;g.fillStyle='rgba(10,22,34,.75)';g.fillRect(s.x-bw/2,hy,bw,7);g.fillStyle=s.type==='prigionieri'?'#b9d4ff':s.ally?'#8fe08a':'#ff6a5a';g.fillRect(s.x-bw/2+1,hy+1,(bw-2)*cl(s.hull/s.max,0,1),5)}
    g.restore();
  }
}
function drawPier(g,t){
  const x0=(17.8+5.15)*T,y0=(29.45+15)*T,w=4.4*T,h=.8*T;
  g.save();
  {const pm=mzn('pontile');if(pm){const ww=w/.88,hh=ww*pm.naturalHeight/pm.naturalWidth;g.drawImage(pm,x0+w/2-ww/2,y0+h/2-hh/2,ww,hh);const lx=x0+w-4,ly=y0-18;g.fillStyle='#3a200c';g.fillRect(lx-2,ly,4,16);const gl=g.createRadialGradient(lx,ly-4,2,lx,ly-4,34);gl.addColorStop(0,'rgba(255,214,120,'+(.55+.1*Math.sin(t*5))+')');gl.addColorStop(1,'rgba(255,214,120,0)');g.fillStyle=gl;g.fillRect(lx-34,ly-38,68,68);g.restore();return}}
  g.fillStyle='rgba(6,40,60,.28)';g.fillRect(x0+8,y0+h+8,w,10);
  for(let i=0;i<Math.ceil(w/13);i++){const x=x0+i*13;g.fillStyle=i%2?'#a97c4a':'#b88a55';g.fillRect(x,y0,12.6,h);g.strokeStyle='rgba(50,26,10,.6)';g.lineWidth=1;g.strokeRect(x,y0,12.6,h)}
  g.fillStyle='#6a3e1c';g.fillRect(x0,y0-4,w,5);g.fillRect(x0,y0+h-1,w,5);
  g.fillStyle='rgba(0,0,0,.18)';g.fillRect(x0,y0+h+4,w,4);
  for(let i=0;i<5;i++){const x=x0+10+i*(w-20)/4;for(const y of[y0-6,y0+h+6]){g.fillStyle='#3a200c';g.beginPath();g.arc(x,y,6,0,7);g.fill();g.fillStyle='#8a5a30';g.beginPath();g.arc(x-1,y-1,3.6,0,7);g.fill();g.strokeStyle='#d8bd78';g.lineWidth=1.5;g.beginPath();g.arc(x,y,5,0,7);g.stroke()}}
  // lanterna in punta
  const lx=x0+w-4,ly=y0-18;g.fillStyle='#3a200c';g.fillRect(lx-2,ly,4,16);const gl=g.createRadialGradient(lx,ly-4,2,lx,ly-4,34);gl.addColorStop(0,'rgba(255,214,120,'+(.55+.1*Math.sin(t*5))+')');gl.addColorStop(1,'rgba(255,214,120,0)');g.fillStyle=gl;g.fillRect(lx-36,ly-40,72,72);g.fillStyle='#ffd45a';g.beginPath();g.arc(lx,ly-4,5,0,7);g.fill();g.strokeStyle='#5a3418';g.lineWidth=1.5;g.stroke();
  // barilli e corda sul molo
  for(const [bx,by] of[[x0+40,y0+h*.5],[x0+62,y0+h*.3]]){g.fillStyle='#8a5a2a';g.beginPath();g.ellipse(bx,by,9,7,0,0,7);g.fill();g.strokeStyle='#3a200c';g.lineWidth=1.5;g.stroke();g.strokeStyle='#d8b24a';g.beginPath();g.ellipse(bx,by,6,4.4,0,0,7);g.stroke()}
  g.restore();
}
function galPath(){return C&&!VOY&&!C.go5?ROUTE.slice():null}
function drawFx(g,t){
  if(!C)return;
  {const CS=230,x0=Math.floor((cam.x-1300)/CS),x1=Math.floor((cam.x+1300)/CS),y0=Math.floor((cam.y-850)/CS),y1=Math.floor((cam.y+850)/CS);
   g.save();g.lineCap='round';
   for(let gx=x0;gx<=x1;gx++)for(let gy=y0;gy<=y1;gy++){const h=Math.sin(gx*127.1+gy*311.7)*43758.5453,f=h-Math.floor(h);if(f<.45)continue;
     const tw=Math.sin(t*1.7+f*40);if(tw<.35)continue;const x=gx*CS+f*CS,y=gy*CS+((f*7)%1)*CS,a=(tw-.35)*.9,l=5+f*6;
     g.strokeStyle='rgba(255,255,255,'+a*.55+')';g.lineWidth=2;g.beginPath();g.moveTo(x-l,y);g.lineTo(x+l,y);g.moveTo(x,y-l*.6);g.lineTo(x,y+l*.6);g.stroke()}
   g.restore()}
  if(!VOY)drawPier(g,t);
  {const pts=galPath();if(pts&&pts.length>1){
    g.save();g.strokeStyle='rgba(255,214,90,.75)';g.lineWidth=5;g.setLineDash([22,16]);g.lineDashOffset=-t*30;g.lineCap='round';g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.stroke();g.setLineDash([]);
    const e=pts[pts.length-1],sg=mzn('segno');if(sg){const w=150,h=w*sg.naturalHeight/sg.naturalWidth;g.drawImage(sg,e[0]-w/2,e[1]-h/2,w,h);g.font='900 18px Nunito,Arial';g.textAlign='center';g.lineWidth=5;g.strokeStyle='rgba(30,16,4,.9)';g.strokeText('USCITA',e[0],e[1]+h/2+8);g.fillStyle='#ffd23a';g.fillText('USCITA',e[0],e[1]+h/2+8)}else{g.fillStyle='#3a2410';g.strokeStyle='#ffd23a';g.lineWidth=4;g.beginPath();g.arc(e[0],e[1],34,0,7);g.fill();g.stroke();g.fillStyle='#ffd23a';g.font='900 18px Nunito,Arial';g.textAlign='center';g.fillText('USCITA',e[0],e[1]+6)}g.restore()}}
  poiDraw(g,t);
  // casse
  for(const c of C.crates){const x=c.x,y=c.y+Math.sin(c.t*2)*3;g.save();g.translate(x,y);
    g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=2;g.beginPath();g.ellipse(0,6,22+Math.sin(c.t*2)*3,9,0,0,7);g.stroke();
    g.rotate(Math.sin(c.t)*.18);g.fillStyle=c.v==='silver'?'#d8dde8':'#b98a55';g.strokeStyle='#2a1a0e';g.lineWidth=2.2;g.fillRect(-14,-14,28,28);g.strokeRect(-14,-14,28,28);g.fillStyle=c.v==='silver'?'#fff':'#7a4c26';g.fillRect(-14,-3,28,6);
    g.restore();g.fillStyle='rgba(255,255,255,'+(.5+.45*Math.sin(t*5+c.t))+')';g.beginPath();g.arc(x+9,y-12,3,0,7);g.fill()}
  // palle
  {const bs=mzn('palla-scia');for(const b of C.balls){if(bs){const kk=17/(bs.naturalWidth*355/638);g.save();g.translate(b.x,b.y-8);g.rotate(Math.atan2(b.vy,b.vx));g.drawImage(bs,-bs.naturalWidth*(460/638)*kk,-bs.naturalHeight*kk/2,bs.naturalWidth*kk,bs.naturalHeight*kk);g.restore();g.fillStyle='rgba(0,0,0,.22)';g.beginPath();g.ellipse(b.x,b.y+14,6,3,0,0,7);g.fill()}else{g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(b.x,b.y+14,6,3,0,0,7);g.fill();g.fillStyle='#1a1a1e';g.beginPath();g.arc(b.x,b.y-8,6,0,7);g.fill();g.fillStyle='rgba(255,255,255,.5)';g.beginPath();g.arc(b.x-2,b.y-10,2,0,7);g.fill()}}}
  for(const q of C.fx){const a=1-q.t/q.life;
    if(q.k==='foam'&&VEGPG&&mzs('scia-v')){}
    else if(q.k==='fumoM'){const f=Math.min(3,Math.floor(q.t/q.life*4)),im=mzn('fumo-'+(f+1));if(im){const w=96,h=w*im.naturalHeight/im.naturalWidth;g.save();g.globalAlpha=Math.min(1,a*1.6);g.translate(q.x,q.y);g.rotate(q.a);g.drawImage(im,0,-h/2,w,h);g.restore()}}
    else if(q.k==='boom'){const f=Math.min(3,Math.floor(q.t/q.life*4)),im=mzn('esplosione-'+(f+1));if(im){const w=92,h=w*im.naturalHeight/im.naturalWidth;g.save();g.globalAlpha=Math.min(1,a*2);g.drawImage(im,q.x-w/2,q.y-h/2,w,h);g.restore()}}
    else if(q.k==='geyser'){const f=Math.min(3,Math.floor(q.t/q.life*4)),im=mzn('colpo-acqua-'+(f+1));if(im){const w=70,h=w*im.naturalHeight/im.naturalWidth;g.save();g.globalAlpha=Math.min(1,a*2);g.drawImage(im,q.x-w/2,q.y-h+10,w,h);g.restore()}}
    else if(q.k==='foam'){g.fillStyle='rgba(235,248,255,'+(.32*a)+')';g.beginPath();g.ellipse(q.x,q.y,q.r*(1+q.t*.8),q.r*.55*(1+q.t*.8),0,0,7);g.fill()}
    else if(q.k==='smoke'){g.fillStyle='rgba(50,50,56,'+(.5*a)+')';g.beginPath();g.arc(q.x,q.y,q.r*(1+q.t*.7),0,7);g.fill()}
    else if(q.k==='puff'){g.fillStyle='rgba(215,215,220,'+(.55*a)+')';g.beginPath();g.arc(q.x,q.y,q.r*(1+q.t*.9),0,7);g.fill()}
    else if(q.k==='flash'){g.fillStyle='rgba(255,215,110,'+a+')';g.beginPath();g.arc(q.x,q.y,q.r*(1+q.t*3),0,7);g.fill();g.fillStyle='rgba(255,255,230,'+a+')';g.beginPath();g.arc(q.x,q.y,q.r*.5,0,7);g.fill()}
    else if(q.k==='splash'&&mzs('spruzzo-esplosione')){const im=mzs('spruzzo-esplosione'),k=q.t/q.life,w=(34+q.r*3.4)*(.5+k*.9),h=w*167/187;g.save();g.globalAlpha=Math.min(1,a*1.4);g.drawImage(im,q.x-w/2,q.y-h*.7,w,h);g.restore()}
    else if(q.k==='splash'){g.strokeStyle='rgba(255,255,255,'+a+')';g.lineWidth=3;g.beginPath();g.ellipse(q.x,q.y,q.r*(1+q.t*4),q.r*.5*(1+q.t*4),0,0,7);g.stroke();g.fillStyle='rgba(255,255,255,'+(a*.7)+')';for(let i=0;i<4;i++)g.fillRect(q.x+Math.cos(i*1.6)*q.t*40,q.y-q.t*50+Math.sin(i)*6,3,3)}
    else if(q.k==='chip'){g.fillStyle='rgba(120,80,40,'+a+')';g.fillRect(q.x,q.y,4,4)}
    else if(q.k==='heal'){g.fillStyle='rgba(160,255,196,'+a+')';g.strokeStyle='rgba(20,90,50,'+a*.8+')';g.lineWidth=2;g.beginPath();g.moveTo(q.x-3,q.y-9);g.lineTo(q.x+3,q.y-9);g.lineTo(q.x+3,q.y-3);g.lineTo(q.x+9,q.y-3);g.lineTo(q.x+9,q.y+3);g.lineTo(q.x+3,q.y+3);g.lineTo(q.x+3,q.y+9);g.lineTo(q.x-3,q.y+9);g.lineTo(q.x-3,q.y+3);g.lineTo(q.x-9,q.y+3);g.lineTo(q.x-9,q.y-3);g.lineTo(q.x-3,q.y-3);g.closePath();g.fill();g.stroke()}}
  if(VOY)voyFx(g,t);
  // zona del porto
  const pt=TPp(21,30);if(!VOY){g.save();g.strokeStyle='rgba(255,230,150,'+(.35+.15*Math.sin(t*2))+')';g.lineWidth=3;g.setLineDash([14,12]);g.beginPath();g.ellipse(pt[0],pt[1]+10,320,150,0,0,7);g.stroke();g.restore();}
  poiFog(g,t);
}

/* ---------------- HUD ---------------- */
let hudBuilt=false;
function buildHud(){
  if(hudBuilt)return;hudBuilt=true;
  document.body.classList.add('w3');
  const d=document.createElement('div');d.id='c3';
  d.innerHTML=`<canvas id="c3ov"></canvas><div id="c3top"><div class="pl" id="c3hh"></div><div class="pl">🪙 <span id="c3sv">0</span> casse</div><div class="pl">⛓ <span id="c3pr">0</span>/2</div></div>
<div id="c3gun"></div><div class="pl" id="c3obj"></div><div id="c3par"></div>
<div class="sl"><div class="sltt">VELOCITÀ</div><button class="bt" data-s="3">Alta</button><button class="bt" data-s="2">Media</button><button class="bt" data-s="1">Bassa</button></div>
<button class="bt" id="c3fire">Fuoco!<small>cannoni</small></button>
<button class="bt" id="c3bd">Abborda!</button>
<button class="bt" id="c3act" style="display:none"></button>
<canvas id="c3wind" width="120" height="120"></canvas><canvas id="c3mini" width="224" height="224"></canvas>`;
  $('hud').appendChild(d);
  const press=(el,fn)=>el.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();auInit();fn()});
  press($('c3fire'),pf);press($('c3bd'),board);press($('c3act'),()=>{if(VOY)voyAct()});addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();pf()}});
  d.querySelectorAll('.sl .bt').forEach(b=>press(b,()=>{C.sail=+b.dataset.s;sailUI()}));
}
function onScrFar(e){const o=$('c3ov'),w=o.clientWidth,h=o.clientHeight;if(!w)return true;const[x,y]=toScreen(e.x,e.y);return x>-620&&x<w+620&&y>-420&&y<h+420}
function onScr(e){const o=$('c3ov'),w=o.clientWidth,h=o.clientHeight;if(!w)return true;const[x,y]=toScreen(e.x,e.y);return x>-60&&x<w+60&&y>-40&&y<h+60}
function aimArc(){return (C.easy?.95:.75)-(C.plan&&C.plan.time==='notte'?.2:0)}
function litSide(){
  if(!C||C.over)return null;const p=C.p,arc=aimArc();let best=null;
  for(const e of C.ships){if(e.dead||e.ally||e===p||e.sinking||!onScr(e))continue;
    const dist=Math.hypot(e.x-p.x,e.y-p.y);if(dist>1350)continue;
    const a=Math.atan2(e.y-p.y,e.x-p.x);
    for(const sd of[-1,1]){const sa=p.hd+(sd>0?Math.PI/2:-Math.PI/2),d=Math.abs(angD(sa,a));
      if(d>=arc)continue;const ready=(sd<0?p.cdL:p.cdR)<=0,sc=dist+(ready?0:2000);
      if(!best||sc<best.sc)best={side:sd,aim:a,dist,sc,ready,e}}}
  return best}
function pf(){if(!C||C.over||PAUSED||dl.open)return;const l=litSide();
  if(!l){if(!C.notes.nolit){C.notes.nolit=1;toast('Metti un nemico di fianco alla nave: il lato si illumina.')}return}
  if(!fire(C.p,l.side,l.aim)&&AU.ctx&&AU.on)tone(90,70,.06,'square',.06)}
function sailUI(){document.querySelectorAll('#c3 .sl .bt').forEach(b=>b.classList.toggle('sel',+b.dataset.s===C.sail))}
function hud(){
  const p=C.p;let h='';
  for(let i=0;i<Math.ceil(p.max);i++){const v=p.hull-i;h+=v>=1?'<span style="color:#ff5f6f">♥</span>':v>0?'<span style="color:#ff9aa5">♥</span>':'<span style="color:#7a4c4c">♡</span>'}
  {const gg=$('c3gun');if(gg){if(p.gunsOut&&!C.over){const pt=TPp(21,30);const near=Math.hypot(pt[0]-p.x,pt[1]-p.y)<320;gg.innerHTML='⚠ CANNONI DANNEGGIATI<small>'+(near?'Il carpentiere sta riparando: resta ancora qualche secondo ('+Math.min(99,Math.round(p.hull/(p.max*.25)*100))+'%)':'Torna al porto a riparare ('+dirName(pt[0]-p.x,pt[1]-p.y)+')')+'</small>';gg.style.display='block'}else gg.style.display='none'}}
  $('c3hh').innerHTML='Scafo '+h;$('c3sv').textContent=C.silver;$('c3pr').textContent=C.pris;
  const gal=C.ships.filter(s=>s.type==='galeone'&&s.conv&&!s.dead).length,dis=C.ships.find(s=>s.type==='prigionieri'&&s.disabled&&!s.ally);
  $('c3obj').textContent=C.go5?('Raggiungi il varco del grande viaggio ('+Math.round(Math.hypot(C.go5.x-p.x,C.go5.y-p.y)/44)+' caselle)'):!C.convoy?('Affonda le pattuglie nemiche ('+Math.min(C.ekills||0,3)+'/3)'):C.prisLost?(gal?'Affonda i galeoni e raccogli l\'argento':'Raccogli le casse rimaste'):C.pris<2?(dis?'Abborda la nave dei prigionieri':'Danneggia la nave dei prigionieri (senza affondarla) e abbordala'):gal?"Abborda il galeone"+(()=>{const g=C.ships.find(q=>q.type==='galeone'&&!q.dead&&!q.ally);return g?" ("+dirName(g.x-p.x,g.y-p.y)+", "+Math.round(Math.hypot(g.x-p.x,g.y-p.y)/44)+" caselle)":""})()+" · argento: "+C.silver+" casse":"Raccogli le casse rimaste";
  if(VOY)voyHud();
  {const l=litSide();C.lit=l;const b=$('c3fire');b.disabled=!l||!l.ready||!!C.p.gunsOut;b.classList.toggle('lit',!!(l&&l.ready&&!C.p.gunsOut))}
  sailUI();overlay();windDial();miniMap();
}
function edgeArrow(g,w,h,x,y,col,dist){      // freccia sul bordo (dentro un rettangolo che evita i pulsanti) + distanza in caselle
  const x0=88,x1=w-142,y0=58,y1=h-80,mx=(x0+x1)/2,my=(y0+y1)/2,hx=(x1-x0)/2,hy=(y1-y0)/2;
  const dx=x-w/2,dy=y-h/2,a=Math.atan2(dy,dx),k=Math.min(dx?hx/Math.abs(dx):1e9,dy?hy/Math.abs(dy):1e9),ex=mx+dx*k,ey=my+dy*k;
  g.save();g.translate(ex,ey);g.rotate(a);g.fillStyle=col;g.strokeStyle='#2a1a0e';g.lineWidth=2.5;g.beginPath();g.moveTo(16,0);g.lineTo(-9,-10);g.lineTo(-9,10);g.closePath();g.fill();g.stroke();g.restore();
  distPill(g,ex,ey,a,Math.round(dist/T)+' caselle',col)
}
function distPill(g,ex,ey,a,txt,col){
  const lx=ex-Math.cos(a)*34,ly=ey-Math.sin(a)*34;
  g.save();g.font='800 12px Nunito,Arial';g.textAlign='center';g.textBaseline='middle';
  const tw=g.measureText(txt).width+14,x=lx-tw/2,y=ly-10,r=10;
  g.fillStyle='rgba(24,14,6,.8)';g.beginPath();g.moveTo(x+r,y);g.arcTo(x+tw,y,x+tw,y+20,r);g.arcTo(x+tw,y+20,x,y+20,r);g.arcTo(x,y+20,x,y,r);g.arcTo(x,y,x+tw,y,r);g.closePath();g.fill();
  g.lineWidth=2;g.strokeStyle=col;g.stroke();g.fillStyle='#fff6dc';g.fillText(txt,lx,ly+1);g.restore()
}
function overlay(){
  const o=$('c3ov'),w=o.clientWidth,h=o.clientHeight;if(!w)return;
  if(o.width!==w||o.height!==h){o.width=w;o.height=h}
  const g=o.getContext('2d');g.clearRect(0,0,w,h);
  if(VOY)voyOverlay(g,w,h);
  if(C.go5&&!C.over){const[x,y]=toScreen(C.go5.x,C.go5.y);
    if(!(x>26&&x<w-26&&y>40&&y<h-26)){const[qx,qy]=toScreen(C.p.x,C.p.y),a=Math.atan2(y-qy,x-qx),ex=qx+Math.cos(a)*150,ey=qy+Math.sin(a)*130,pl=.5+.5*Math.sin(C.t*6);
      g.save();g.translate(ex,ey);g.rotate(a);g.shadowColor='rgba(255,214,90,.9)';g.shadowBlur=14+pl*10;g.fillStyle='#ffd23a';g.strokeStyle='#2a1a0e';g.lineWidth=3;g.beginPath();g.moveTo(24,0);g.lineTo(-12,-15);g.lineTo(-6,0);g.lineTo(-12,15);g.closePath();g.fill();g.stroke();g.restore();distPill(g,ex,ey,a,Math.round(Math.hypot(C.go5.x-C.p.x,C.go5.y-C.p.y)/T)+' caselle','#ffd23a')}
    else{g.save();g.translate(x,y);const pl=.5+.5*Math.sin(C.t*5);g.strokeStyle='rgba(255,214,90,'+(.5+.4*pl)+')';g.lineWidth=5;g.beginPath();g.arc(0,0,3.4*44*camZoom(),0,7);g.stroke();g.fillStyle='#ffd23a';g.font='900 26px Nunito,Arial';g.textAlign='center';g.fillText('⚓',0,9);g.restore()}}
  {let near=null,nd=1e9;      // nel primo tratto: freccia verso la pattuglia più vicina, se è fuori schermo
   if(!VOY&&!C.convoy&&!C.tut&&!C.go5&&!C.over)for(const s of C.ships){if(s.dead||s.sinking||s.ally||s.conv||!(s.type==='pattuglia'||s.free))continue;const d=Math.hypot(s.x-C.p.x,s.y-C.p.y);if(d<nd){nd=d;near=s}}
   for(const s of C.ships){
    const kd=s.dead?0:s.tutT?'t':(s.type==='galeone'&&s.conv&&!C.tut)?'g':(s.type==='prigionieri'&&!s.ally&&!C.tut)?'p':(s.type==='brigantino'&&!C.tut&&Math.hypot(s.x-C.p.x,s.y-C.p.y)<2800)?'b':s===near?'e':0;
    if(!kd)continue;
    const[x,y]=toScreen(s.x,s.y);
    if(x>26&&x<w-26&&y>40&&y<h-26)continue;
    edgeArrow(g,w,h,x,y,kd==='t'?'#7be3ff':kd==='p'?'#ffffff':kd==='e'?'#ff8a7a':kd==='b'?'#c79cff':'#ffd23a',Math.hypot(s.x-C.p.x,s.y-C.p.y))
   }}
  if(!VOY)poiOverlay(g,w,h);
  if(!VOY)evOverlay(g,w,h);
  // lato illuminato verso i nemici + ricarica
  const p=C.p,[px,py]=toScreen(p.x,p.y),z=camZoom(),l=C.lit;
  for(const sd of[-1,1]){const cd=sd<0?p.cdL:p.cdR,an=p.hd+(sd>0?Math.PI/2:-Math.PI/2),isLit=l&&l.side===sd;
    if(isLit){g.save();g.shadowColor='rgba(255,190,60,.95)';g.shadowBlur=18;g.strokeStyle=l.ready?'rgba(255,214,90,'+(.7+.3*Math.sin(C.t*8))+')':'rgba(255,255,255,.6)';g.lineWidth=l.ready?9:6;g.lineCap='round';g.beginPath();g.arc(px,py+6*z,(SPEC.sirena.W+26)*z,an-.62,an+.62);g.stroke();g.restore();
      if(l.ready){const[tx,ty]=toScreen(l.e.x,l.e.y);g.save();g.setLineDash([8,8]);g.strokeStyle='rgba(255,214,90,.55)';g.lineWidth=2.5;g.beginPath();g.moveTo(px,py);g.lineTo(tx,ty);g.stroke();g.restore()}}
    if(cd>0){g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=5;g.lineCap='round';g.beginPath();g.arc(px,py+6*z,(SPEC.sirena.W+14)*z,an-.5,an-.5+(1-cd/(C.cdP||2.1)));g.stroke()}}
}
function windDial(){
  const c=$('c3wind').getContext('2d'),p=C.p;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,120,120);c.translate(60,60);
  c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=2;c.beginPath();c.arc(0,0,42,0,7);c.stroke();
  c.save();c.rotate(C.wind);c.fillStyle='#bfe8ff';c.strokeStyle='#fff';c.beginPath();c.moveTo(38,0);c.lineTo(10,-13);c.lineTo(14,0);c.lineTo(10,13);c.closePath();c.fill();c.restore();
  c.save();c.rotate(p.hd);c.fillStyle='#ffd23a';c.beginPath();c.arc(0,0,5,0,7);c.fill();c.fillRect(0,-2,18,4);c.restore();
  const k=windK(p.hd);c.fillStyle='#fff';c.font='800 13px Nunito,Arial';c.textAlign='center';c.fillText(k>1.08?'in poppa':k<.82?'controvento':'al traverso',0,56);
}
function miniMap(){
  const c=$('c3mini').getContext('2d'),w=224,sc=w/(150*T*.55);c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,w,w);
  const MMc=mzn('mm-cornice');if(MMc)c.drawImage(MMc,0,0,w,w);
  c.save();c.beginPath();c.arc(112,112,MMc?100:110,0,7);c.clip();if(MMc){c.fillStyle='rgba(28,104,152,.7)';c.fillRect(0,0,w,w);const MR=mzn('mm-rosa');if(MR){c.globalAlpha=.55;c.drawImage(MR,150,150,56,56);c.globalAlpha=1}}else{c.fillStyle='#0e4a78';c.fillRect(0,0,w,w)}
  const p=C.p;c.translate(112,112);
  // isole dalla griglia del terreno (campionata)
  c.fillStyle='#6fbf5a';
  const step=3,ptx=p.x/T,pty=p.y/T,R=Math.ceil(112/(sc*T))+2;
  for(let ty=Math.max(0,Math.floor(pty)-R);ty<Math.min(MH,Math.floor(pty)+R);ty+=1)for(let tx=Math.max(0,Math.floor(ptx)-R);tx<Math.min(MW,Math.floor(ptx)+R);tx+=1){if(!seaT[tIdx(tx,ty)]){c.fillRect((tx*T-p.x)*sc,(ty*T-p.y)*sc,T*sc+1,T*sc+1)}}
  if(!VOY)poiMini(c,p,sc);
  if(!VOY)evMini(c,p,sc);
  for(const s of C.ships){if(s.dead)continue;const x=(s.x-p.x)*sc,y=(s.y-p.y)*sc;c.fillStyle=s.ally?'#8fe08a':s.type==='prigionieri'?'#fff':s.type==='galeone'?'#ffd23a':s.type==='mercante'?'#d8c8a0':s.type==='brigantino'?'#c79cff':'#ff6a5a';c.beginPath();c.arc(x,y,s.type==='galeone'||s.type==='prigionieri'?6:4,0,7);c.fill()}
  {const pts=galPath();if(pts&&pts.length>1){
    c.save();c.strokeStyle='rgba(255,214,90,.85)';c.lineWidth=2;c.setLineDash([5,4]);c.beginPath();c.moveTo((pts[0][0]-p.x)*sc,(pts[0][1]-p.y)*sc);for(let i=1;i<pts.length;i++)c.lineTo((pts[i][0]-p.x)*sc,(pts[i][1]-p.y)*sc);c.stroke();c.setLineDash([]);
    const e=pts[pts.length-1];let ex=(e[0]-p.x)*sc,ey=(e[1]-p.y)*sc;const ed=Math.hypot(ex,ey),fr=ed>98;if(fr){ex=ex/ed*98;ey=ey/ed*98}
    c.fillStyle='#3a2410';c.strokeStyle='#ffd23a';c.lineWidth=2.5;c.beginPath();c.arc(ex,ey,7,0,7);c.fill();c.stroke();c.fillStyle='#ffd23a';c.font='900 10px Nunito,Arial';c.textAlign='center';c.fillText('✕',ex,ey+3.5);c.restore()}}
  {const gl=C.ships.find(s=>s.type==='galeone'&&!s.dead&&!s.ally);
   if(gl){let gx=(gl.x-p.x)*sc,gy=(gl.y-p.y)*sc;const gd=Math.hypot(gx,gy),fr=gd>96;if(fr){gx=gx/gd*96;gy=gy/gd*96}
     const on=Math.sin(C.t*7)>-.2,pl=.5+.5*Math.sin(C.t*7);
     c.save();c.translate(gx,gy);
     c.strokeStyle='rgba(255,60,60,'+(.25+.5*pl)+')';c.lineWidth=2.5;c.beginPath();c.arc(0,0,9+pl*6,0,7);c.stroke();
     if(fr){const an=Math.atan2(gy,gx);c.save();c.rotate(an);c.fillStyle=on?'#ff2e2e':'#ffb0a0';c.beginPath();c.moveTo(20,0);c.lineTo(9,-8);c.lineTo(9,8);c.closePath();c.fill();c.restore()}
     c.fillStyle=on?'#ff2e2e':'#ffd0c0';c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(0,0,7,0,7);c.fill();c.stroke();
     c.restore()}}
  if(C.go5){let dx=(C.go5.x-p.x)*sc,dy=(C.go5.y-p.y)*sc;const d=Math.hypot(dx,dy),far=d>96,pl=.5+.5*Math.sin(C.t*6);if(far){dx=dx/d*96;dy=dy/d*96}
    c.save();c.translate(dx,dy);if(far){const an=Math.atan2(dy,dx);c.save();c.rotate(an);c.fillStyle='#ffd23a';c.beginPath();c.moveTo(22,0);c.lineTo(10,-8);c.lineTo(10,8);c.closePath();c.fill();c.restore()}
    c.strokeStyle='rgba(255,214,90,'+(.3+.5*pl)+')';c.lineWidth=2.5;c.beginPath();c.arc(0,0,9+pl*6,0,7);c.stroke();
    c.fillStyle='#3a2410';c.strokeStyle='#ffd23a';c.lineWidth=2.5;c.beginPath();c.arc(0,0,8,0,7);c.fill();c.stroke();c.fillStyle='#ffd23a';c.font='900 11px Nunito,Arial';c.textAlign='center';c.fillText('★',0,4);c.restore()}
  if(!VOY&&!C.go5){const pt0=TPp(21,30),px=pt0[0],py=pt0[1];let dx=(px-p.x)*sc,dy=(py-p.y)*sc;const d=Math.hypot(dx,dy),far=d>98;
   if(far){dx=dx/d*98;dy=dy/d*98}
   c.save();c.translate(dx,dy);
   if(far){c.rotate(Math.atan2(dy,dx));c.fillStyle='#ffd23a';c.beginPath();c.moveTo(13,0);c.lineTo(3,-7);c.lineTo(3,7);c.closePath();c.fill();c.rotate(-Math.atan2(dy,dx))}
   c.fillStyle='#3a2410';c.strokeStyle='#ffd23a';c.lineWidth=2.5;c.beginPath();c.arc(0,0,8,0,7);c.fill();c.stroke();
   c.fillStyle='#ffd23a';c.font='900 11px Nunito,Arial';c.textAlign='center';c.fillText('⚓',0,4);c.restore()}
  if(VOY)voyMini(c,p,sc);
  {const mn=mzn('mm-nave');c.rotate(p.hd);if(mn){c.rotate(Math.PI/2);c.drawImage(mn,-12,-12,24,24)}else{c.fillStyle='#fff';c.beginPath();c.moveTo(10,0);c.lineTo(-6,-6);c.lineTo(-6,6);c.closePath();c.fill()}}
  c.restore();
}

/* ---------------- dopo il galeone: verso il grande viaggio ---------------- */
function go5Init(){
  C.ships=C.ships.filter(s=>s.ally);C.crates=[];C.balls=[];C.pend=[];C.poi=null;C.ev=null;C.brig=null;C.map=null;C.convoy=true;C.notes.start=1;C.notes.found=1;C.notes.gal=1;
  const e=ROUTE[ROUTE.length-1],t=findSea(e[0],e[1]);C.go5={x:t[0],y:t[1]};
}
function go5Start(){
  UI.dlg([D('tito',"Capitano, la stiva è piena d'argento. Il convoglio spagnolo non ce la perdonerà."),D('hero',"Allora non aspettiamo. Le carte del galeone segnano un varco: lì finisce il mare che conosciamo."),D('biscotto',"Cra! Segui la freccia! Io faccio la vedetta!")],()=>{UI.banner('Nuovo obiettivo','Raggiungi il varco del grande viaggio')});
}
function go5Arrive(){
  C.over=true;const sv=C.silver;
  try{YD.bank(sv);YD.stat('runs')}catch(e){}
  UI.dlg([D('hero',"Eccolo: il varco. Di là le carte non dicono più niente."),D('tito',"Argento a bordo ("+sv+" casse), Pip e Dodo al sicuro. Siamo pronti."),D('biscotto',"Cra! Pronti! Più o meno!")],()=>{
    const o=document.createElement('div');o.style.cssText='position:fixed;inset:0;z-index:99999;background:#06182a;color:#ffd23a;display:flex;flex-direction:column;align-items:center;justify-content:center;font:800 22px Nunito,Arial;text-align:center';
    o.innerHTML='<div style="font-size:15px;opacity:.8">Capitolo 4</div><div style="font-size:30px;margin:6px 0 14px">Il grande viaggio</div>'+(sv>0?'<div style="font-size:15px;opacity:.85;margin-bottom:12px">🪙 +'+sv+' casse d\'argento al cantiere del campo</div>':'')+'<div>Caricamento…</div>';document.body.appendChild(o);
    try{localStorage.setItem('sm_c5',JSON.stringify({fresh:1,silver:sv,hull:8}))}catch(e){}
    setTimeout(()=>{try{__go('#w5')}catch(e){}location.reload()},1600)});
}
/* ---------------- fine ---------------- */
function endRun(why){
  if(C.over)return;C.over=true;$('c3bd').style.display='none';
  const sil=C.silver>=6,pr=C.pris===2,okhp=C.p.hull>=C.p.max*.5;let key,title,txt;
  if(pr&&sil&&okhp){key=0;title='Colpo perfetto';txt="Tutto l'argento e Pip e Dodo salvi, con la Sirena quasi intatta. J. alza il cappello; Ferro non dice niente, ma non toglie lo sguardo dalla stiva."}
  else if(pr&&C.silver>=4){key=1;title='Argento e salvataggio, con perdite';txt='Hai preso parte del bottino e liberato i prigionieri, ma lo scafo ha pagato caro.'}
  else if(pr){key=2;title='Solo salvataggio';txt="Pip e Dodo sono a bordo, l'argento è rimasto a fondo o in mano al convoglio. Per questa volta, va bene così."}
  else if(C.silver>=4){key=3;title='Solo argento';txt='La stiva è piena. Ma sul convoglio sono rimasti i tuoi, e questo pesa.'}
  else{key=4;title=why==='affondata'?'Affondata':why==='fuga'?'Il galeone è scappato':'Colpo mancato';txt=why==='fuga'?"Il galeone spagnolo è uscito dal mare con il suo argento: missione fallita. Riprova!":"Il convoglio è passato. Un'altra volta."}
  const rows=['Pieno: argento e tutti salvati','Argento e salvataggio, con perdite','Solo salvataggio','Solo argento','Colpo mancato'];
  let bk=0,ann=[],ybk=0;try{bk=C.silver;YD.bank(bk);ybk=YD.get().b;YD.stat('runs');if(key===0)YD.stat('perfect');ann=YD.announce()}catch(e){}
  const ybHtml=(bk>0?'<p class="sm">🪙 <b>+'+bk+'</b> casse d\'argento al cantiere del campo (in cassa: '+ybk+').</p>':'<p class="sm">🪙 Senza argento il cantiere resta fermo: porta le casse al campo per migliorare la nave.</p>')+(ann.length?'<p class="sm">⛵ Nuovo per la nave: <b>'+ann.map(x=>x.it.n).join(', ')+'</b>. Lo trovi nel Menu › Guardaroba › Nave.</p>':'');
  $('endCard').innerHTML='<div class="seas"><b>Capitolo 3</b><span>Il Convoglio</span></div><h2>'+title+'</h2><p>'+txt+'</p><div class="stats"><div><b>'+C.silver+'</b>casse d\'argento</div><div><b>'+C.pris+'/2</b>prigionieri salvati</div><div><b>'+C.kills+'</b>navi affondate</div><div><b>'+Math.max(0,Math.round(C.p.hull/C.p.max*100))+'%</b>scafo rimasto</div></div><p class="sm">Esito: <b>'+rows[key]+'</b></p>'+ybHtml+'<div class="row"><button class="btn gold" id="eGo">Riprova</button>'+(key>=2&&loadCP()?'<button class="btn" id="eCp">Riprendi con Pip e Dodo</button>':'')+'</div>';
  if(key<=2){const nb=document.createElement('button');nb.className='btn gold';nb.textContent='Continua: Il grande viaggio';nb.style.cssText='display:block;margin:10px auto 0';nb.onclick=()=>{try{localStorage.setItem('sm_c5',JSON.stringify({fresh:1,silver:C.silver,hull:8}))}catch(e){}try{__go('#w5')}catch(e){}location.reload()};$('endCard').appendChild(nb)}
  {const h=document.createElement('button');h.className='lnk';h.textContent='Torna al gioco';h.style.cssText='display:block;margin:10px auto 0';h.onclick=()=>{try{history.replaceState(null,'',location.pathname)}catch(e){}location.reload()};$('endCard').appendChild(h)}
  {const cpb=$('endCard').querySelector('#eCp');if(cpb)cpb.onclick=()=>{uShow('endcard',false);newRun(C.easy,C.plan,loadCP());sailUI()}}
  if(key<=1)clearCP();
  $('endCard').querySelector('#eGo').onclick=()=>{uShow('endcard',false);newRun(C.easy,C.plan);sailUI()};
  uShow('endcard',true);sfx('quest');
}
const TIMES={alba:{n:'Alba',tod:6.9,d:'Luce piena: tutti ti vedono da lontano, ma la mira è facile.'},notte:{n:'Notte',tod:23,d:'Buio: pattuglie e scorte ti vedono da metà distanza, ma la mira è più stretta.'},tempesta:{n:'Tempesta',tod:17.7,d:'Vento forte: più veloce in poppa, più lenta controvento. I nemici sparano peggio.'}};
const PLAN0={time:'alba',abb:2,div:1,sal:1,detect:1};

/* ---------------- collisioni ---------------- */
function circ(s){const sp0=SPEC[s.type],c=Math.cos(s.hd),n=Math.sin(s.hd),r=sp0.W*1.05;return[-.6,0,.6].map(f=>[s.x+c*sp0.L*f,s.y+n*sp0.L*f*.9,r])}
function sepAll(dt){
  const L=C.ships.filter(s=>!s.dead&&!s.sinking);
  for(let i=0;i<L.length;i++){const a=L[i];let ca=null;
    for(let j=i+1;j<L.length;j++){const b=L[j];
      if(Math.abs(a.x-b.x)>560||Math.abs(a.y-b.y)>560)continue;
      ca=ca||circ(a);const cb=circ(b);let pen=0;
      for(const u of ca)for(const v of cb){const ov=u[2]+v[2]+70-Math.hypot(u[0]-v[0],u[1]-v[1]);if(ov>pen)pen=ov}
      if(pen<=0)continue;
      let dx=b.x-a.x,dy=b.y-a.y;const d=Math.hypot(dx,dy)||1;dx/=d;dy/=d;
      const wa=a.still?0:1,wb=b.still?0:1,ws=wa+wb;if(!ws)continue;
      const k=Math.min(1,dt*5)*pen;
      const ax=a.x-dx*k*wa/ws,ay=a.y-dy*k*wa/ws,bx=b.x+dx*k*wb/ws,by=b.y+dy*k*wb/ws;
      if(wa&&shipOK(a,ax,ay,a.hd)){a.x=ax;a.y=ay}
      if(wb&&shipOK(b,bx,by,b.hd)){b.x=bx;b.y=by}
    }}
}
function collide(dt){
  const p=C.p;if(p.dead||C.over)return;
  if(C.ramCd>0)C.ramCd-=dt;
  const cp=circ(p),M=85;
  for(const s of C.ships){
    if(s.dead||s.sinking||s.ally)continue;
    const cs=circ(s);let pen=0,hard=false;
    for(const a of cp)for(const b of cs){const d=Math.hypot(a[0]-b[0],a[1]-b[1]),ov=a[2]+b[2]+M-d;if(ov>pen)pen=ov;if(d<a[2]+b[2]-4)hard=true}
    if(pen<=0)continue;
    let dx=s.x-p.x,dy=s.y-p.y;const d=Math.hypot(dx,dy)||1;dx/=d;dy/=d;
    const k=Math.min(1,dt*(hard?9:3))*pen;
    // l'altra nave si scosta di più; se non può, ti spinge indietro
    const px=p.x-dx*k*1.1,py=p.y-dy*k*1.1;
    if(shipOK(p,px,py,p.hd)){p.x=px;p.y=py}
    if(hard&&C.ramCd<=0){
      C.ramCd=1.4;p.v*=.3;
      if(!C.tut||C.tut.i>=2)hurt(p,C.easy?.25:.5);
      p.flash=.25;sfx('thud');
      for(let i=0;i<5;i++)C.fx.push({k:'chip',x:(p.x+s.x)/2+rr(-20,20),y:(p.y+s.y)/2+rr(-10,10),vx:rr(-120,120),vy:rr(-150,-30),t:0,life:.7});
      parEv('ram');toast(C.notes.ram?'Speronamento! Lo scafo si danneggia.':'Speronamento! Scontrarti con una nave danneggia il tuo scafo: tieni le distanze.');C.notes.ram=1;
    }
  }
}

/* ---------------- tutorial ---------------- */
const TUTK='sette-mari-c3tut';
function tutSeen(){try{return localStorage.getItem(TUTK)==='1'}catch(e){return false}}
const TUT=[
  {t:'Al timone',x:'Spingi il joypad: la nave va verso dove punti. Se lo molli, si ferma. Prova a muoverti e a girare.',ok:()=>Math.hypot(C.p.x-C.tut.x0,C.p.y-C.tut.y0)>350},
  {t:'Le vele e il vento',x:'I tasti a sinistra regolano la velocità massima. Il quadrante a destra mostra il vento: con il vento alle spalle vai più veloce, controvento rallenti. Tocca «Alta».',ok:()=>C.sail===3},
  {t:'Attenzione agli scontri',x:'Scogli, coste e navi sono duri. Se ci vai addosso lo scafo si danneggia (i cuori in alto). Le navi nemiche tengono le distanze: tu falle lo stesso. Vicino al porto il carpentiere ripara lo scafo.',btn:'Ho capito'},
  {t:'Fuoco!',x:'Raggiungi la nave col cerchio azzurro e mettila di fianco: il lato che si illumina è quello che spara. Poi premi «Fuoco!».',ok:()=>C.hits>=1,target:true},
  {t:'La missione',x:'Affonda le navi nemiche sparse per il mare: sparano poco e si scansano. Più avanti incontrerai un galeone spagnolo con la scorta: colpiscilo fino all\'avaria, poi premi «Abborda!» per assaltarlo e prendere l\'argento. La nave con la bandiera bianca porta Pip e Dodo: non affondarla! Colpiscila fino all\'avaria, poi premi «Abborda!».',btn:'Salpa!'}
];
function tutPanel(){
  let d=$('c3tut');if(!d){d=document.createElement('div');d.id='c3tut';$('c3').appendChild(d)}return d}
function tutShow(){
  const tt=C.tut;if(!tt)return;const st=TUT[tt.i],d=tutPanel();
  d.style.display='block';
  d.innerHTML='<div class="tth"><b>'+st.t+'</b><span>'+TUT.map((_,k)=>k<tt.i?'●':k===tt.i?'◉':'○').join(' ')+'</span></div><p>'+st.x+'</p><div class="ttb"><button id="ttSkip">Salta</button>'+(st.btn?'<button class="go" id="ttNext">'+st.btn+'</button>':'')+'</div>';
  const pr=(el,fn)=>{if(el)el.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();fn()})};
  pr($('ttSkip'),tutEnd);pr($('ttNext'),tutNext);
  try{document.body.style.setProperty('--c3tuth',(d.offsetHeight+14)+'px')}catch(e){}
  if(st.target&&!tt.tg){
    const p=C.p;let x=p.x+Math.cos(p.hd+.5)*620,y=p.y+Math.sin(p.hd+.5)*620;
    if(!clearAt(x,y,90)){const r2=findSea(x,y);x=r2[0];y=r2[1]}
    const s=mkShip('mercante',x,y,p.hd+1.2,{still:true,tutT:true});C.ships.push(s);tt.tg=s;
  }
}
function tutNext(){if(!C.tut)return;sfx('coin');C.tut.i++;if(C.tut.i>=TUT.length){tutEnd();return}C.tut.hd0=C.p.hd;tutShow()}
function tutEnd(){
  if(!C.tut)return;
  try{localStorage.setItem(TUTK,'1')}catch(e){}
  if(C.tut.tg){C.tut.tg.still=false;C.tut.tg.tutT=false}
  C.tut=null;const d=$('c3tut');if(d)d.style.display='none';
  try{document.body.style.removeProperty('--c3tuth')}catch(e){}
  toast('Buon vento, capitano!');
}
function tutStart(){C.tut={i:0,hd0:C.p.hd,x0:C.p.x,y0:C.p.y,tg:null};tutShow()}
function tutStep(){
  const tt=C.tut;if(!tt)return;const st=TUT[tt.i];
  if(st.ok&&st.ok())tutNext();
}

/* ---------------- musica da battaglia ---------------- */
const BROOT=[50,50,46,45,50,43,45,50];
const BCH=[[62,65,69],[62,65,69],[58,62,65],[57,61,64],[62,65,69],[55,58,62],[57,61,64],[62,65,69]];
const BMEL=[
  [[0,74,2],[2,77,1],[3,76,1],[4,74,2]],
  [[0,69,2],[2,72,1],[3,74,1],[4,76,2]],
  [[0,77,2],[2,76,1],[3,74,1],[4,70,2]],
  [[0,69,1],[1,73,1],[2,76,2],[4,73,2]],
  [[0,74,2],[2,77,1],[3,81,1],[4,77,2]],
  [[0,79,2],[2,77,1],[3,74,1],[4,70,2]],
  [[0,73,1],[1,76,1],[2,77,1],[3,76,1],[4,73,2]],
  [[0,74,3],[3,69,1],[4,74,2]]
];
function drum(t,kind,vol){
  const c=AU.ctx;
  if(kind==='k'||kind==='t'){const o=c.createOscillator(),g=c.createGain();o.type='sine';const f0=kind==='k'?135:200,f1=kind==='k'?42:80;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+.17);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+.26);o.connect(g);g.connect(AU.mbus);o.start(t);o.stop(t+.28)}
  else{
    if(!AU._nb||AU._nbc!==c){const n=(c.sampleRate*.4)|0,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;AU._nb=b;AU._nbc=c}
    const s=c.createBufferSource();s.buffer=AU._nb;const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=1700;f.Q.value=.8;const g=c.createGain();g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+.16);s.connect(f);f.connect(g);g.connect(AU.mbus);s.start(t);s.stop(t+.2);
  }
}
function battleTick(){
  if(!AU.ctx||!AU.mbus||!AU.mus||AU.ctx.state!=='running'||!C)return;
  if(VOY){voyMusic();return}
  const c=AU.ctx,now=c.currentTime;if(AU.nextT<now-.5)AU.nextT=now+.1;
  let hot=false;
  if(!C.over&&!C.tut){hot=C.balls.length>0||C.ships.some(s=>!s.dead&&(s.hostile||s.alert)&&Math.hypot(s.x-C.p.x,s.y-C.p.y)<1100)}
  const ST=.27;let guard=0;
  while(AU.nextT<now+.7&&guard++<8){
    const t=AU.nextT,st=(AU.beat|0)%48,bar=(st/6)|0,sb=st%6,root=BROOT[bar];
    if(sb===0)drum(t,'k',hot?.3:.2);
    if(sb===3)drum(t,hot?'s':'t',hot?.17:.12);
    if(hot&&sb===4)drum(t,'t',.1);
    if(hot&&sb===5)drum(t,'k',.13);
    if(sb===0||sb===3)mNote(t,root,ST*2.6,.1,'triangle');
    if(sb===3)mNote(t,root+7,ST*1.6,.05,'sine');
    if(sb===0)mPad(t,BCH[bar],ST*6.2,hot?.028:.02);
    if(hot||bar<4)for(const[s0,m,len]of BMEL[bar])if(s0===sb){mNote(t,m,len*ST*1.15,hot?.05:.03,'sawtooth');if(hot)mNote(t,m-12,len*ST*1.1,.03,'square')}
    AU.nextT+=ST;AU.beat=(AU.beat|0)+1;
  }
}
function boot(){
  buildHud();
  {const ov=$('c3ov');if(ov&&!$('c3vig')){const v=document.createElement('div');v.id='c3vig';v.style.cssText='position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 58%,rgba(4,14,30,.38) 100%)';ov.insertBefore(v,ov.firstChild)}}
  try{auInit()}catch(e){}
  if(!window.__c3au){window.__c3au=1;for(const ev of['pointerdown','touchstart','keydown'])document.addEventListener(ev,()=>{try{auInit()}catch(e){}},{capture:true,passive:true})}
  S=newState('Capitano',window.__hero||'m');
  S.live=true;S.tod=10.5;S.wx={k:'clear',t:1e9};S.flags={moved:1,parrot:0};S.tutDone=1;S.tut=null;S.q={};
  S.mode='raft';const sp=TPp(24.5,31);S.px=sp[0];S.py=sp[1];
  $('start').hidden=true;
  try{beginGame()}catch(e){console.error('beginGame',e)}
  S.mode='raft';P.mode='raft';
  FOG.fill(1);FOGDIRTY=true;
  cam.uz=.7;
  if(VOY){voyBoot();return}
  newRun(true,PLAN0);sailUI();
  let res=null;try{const q=localStorage.getItem('sm_c34r');if(q){res=JSON.parse(q);localStorage.removeItem('sm_c34r')}}catch(e){}
  if(res){C.tut=null;C.silver=res.silver||0;C.pris=res.pris||0;C.kills=res.kills||0;C.t=res.t||400;C.convoy=true;C.p.hull=Math.max(1,res.hull||C.p.max);C.p.max=res.max||C.p.max;go5Init();setTimeout(()=>go5Start(),500)}
  else if(!tutSeen())tutStart();
}
// «Salpa» riavvia
const _newRun=newRun;
// @@VOY@@
window.Ch3={ev:{spawn:evSpawn,step:evStep,hint:evHint},b2:{poiPlace,spawnBrig,spawnBottle,takeBottle,openChest,beachSpot,poiSpot,brigAI,poiStep},voy:voyAPI,drawFloor:voyFloor,mkShip,onScr,dump(){let o='';for(let ty=0;ty<MH;ty+=2){for(let tx=0;tx<MW;tx++){o+=seaT[tIdx(tx,ty)]?(blockT[tIdx(tx,ty)]?'B':'.'):'#'}o+='\n'}return MW+' '+MH+'\n'+o},music:battleTick,boot,step,drawShip,drawFx,vis:()=>C?C.ships.concat(evVis(),[C.p]).filter(s=>!s.dead||s.sinking).map(s=>s.ent):[],get C(){return C},fire,board,endRun,newRun:(e,pl,cp)=>{newRun(e,pl,cp);sailUI()},route:ROUTE,seaOK,clearAt,ROUTE};
})();
