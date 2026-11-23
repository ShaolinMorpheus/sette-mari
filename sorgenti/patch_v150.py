P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b,n=1):
    global s
    assert s.count(a)==n,(s.count(a),a[:70])
    s=s.replace(a,b)
# --- 1) Pappagallo: resta 20 s dove e' andato e poi torna da solo
rep("if(SC.e&&SC.t<7){tx=SC.e.x","if(SC.e&&SC.t<20){tx=SC.e.x")
rep("(SC.e&&SC.t<7?2.6:d>200?3:5)","(SC.e&&SC.t<20?2.6:d>200?3:5)")
rep("if(SC.t>11||!isInter(SC.e)){SC.e=null;SC.t=99}","if(SC.t>21||!isInter(SC.e)){SC.e=null;SC.t=99}")
rep("if(!SC.e||SC.t>10)return;\n  const e=SC.e,a=clamp(Math.min(SC.t*2,(10-SC.t)),0,1);","if(!SC.e||SC.t>20)return;\n  const e=SC.e,a=clamp(Math.min(SC.t*2,(20-SC.t)),0,1);")
# --- 2) testa del pappagallo + freccia sulla mappa
rep("function drawMini(){","""const _PBC={};
function parBadge(g,x,y,r){   // medaglione con la testa di Biscotto (col suo cappellino)
  const k=(S&&S.phat)||'',now=performance.now();let c=_PBC[k];
  if(!c){c=_PBC[k]=document.createElement('canvas');c.width=c.height=72;c.t=-1e9}
  if(now-c.t>1500){c.t=now;try{drawPortrait(c,'biscotto',{t:'x'})}catch(e){}}
  g.save();g.translate(x,y);
  g.fillStyle='#2a1a0e';g.beginPath();g.arc(0,0,r+2.6,0,7);g.fill();
  g.save();g.beginPath();g.arc(0,0,r,0,7);g.clip();g.drawImage(c,-r,-r,r*2,r*2);g.restore();
  g.strokeStyle='#ffd23a';g.lineWidth=2;g.beginPath();g.arc(0,0,r+1.3,0,7);g.stroke();
  g.restore();
}
function drawMini(){""")
rep("  // il giocatore\n  try{X2.mini(g,mxw,myw)}catch(e){}","""  if(S.flags.parrot&&PQ.mark&&isInter(PQ.mark)&&RT-PQ.markT<20){   // dove e' andato Biscotto: testa + freccia, per 20 secondi
    const tt=performance.now()/1000;let x=mxw(PQ.mark.x),y=myw(PQ.mark.y);const dd=hyp(x-cxm,y-cym),lim=R-22,out=dd>lim;
    if(out){x=cxm+(x-cxm)/dd*lim;y=cym+(y-cym)/dd*lim}
    const bob=Math.sin(tt*6)*2;
    g.save();g.globalAlpha=Math.min(1,(20-(RT-PQ.markT))/2);
    parBadge(g,x,y,9);
    g.fillStyle='#ffd23a';g.strokeStyle='#2a1a0e';g.lineWidth=1.4;
    if(out){const a=Math.atan2(y-cym,x-cxm);g.translate(x+Math.cos(a)*(14+bob),y+Math.sin(a)*(14+bob));g.rotate(a);g.beginPath();g.moveTo(7,0);g.lineTo(-4,-6);g.lineTo(-1.5,0);g.lineTo(-4,6);g.closePath();g.fill();g.stroke()}
    else{g.translate(x,y-15-bob);g.beginPath();g.moveTo(0,6);g.lineTo(-6,-3);g.lineTo(6,-3);g.closePath();g.fill();g.stroke()}
    g.restore();
  }
  // il giocatore
  try{X2.mini(g,mxw,myw)}catch(e){}""")
rep("""    g.strokeStyle='#ff5a3a';g.lineWidth=2.4;g.beginPath();g.arc(x,y,r,0,7);g.stroke();
    g.fillStyle='#e2402a';g.strokeStyle='#fff';g.lineWidth=1.6;g.beginPath();g.arc(x,y,5,0,7);g.fill();g.stroke();
    lab(pn('Biscotto')+' è stato qui',x,y-18,'#ffb89a');""","""    parBadge(g,x,y,12);
    g.fillStyle='#ffd23a';g.strokeStyle='#2a1a0e';g.lineWidth=1.6;g.save();g.translate(x,y-20-Math.sin(t*6)*2.5);g.beginPath();g.moveTo(0,8);g.lineTo(-8,-4);g.lineTo(8,-4);g.closePath();g.fill();g.stroke();g.restore();
    lab(pn('Biscotto')+' è stato qui',x,y-40,'#ffb89a');""")
rep("Il cerchio rosso indica dove è andato il pappagallo a guardare.","La testa del pappagallo con la freccia indica dove è andato a guardare.")
# --- 3) menu Guardaroba: Abito col design nuovo (Capitano giacca / maglia da marinaio)
rep("  const f=window.__hero==='f',key=it.id+(f?'f':'m');if(_wi[key])return _wi[key];","""  if(it.k==='out'&&(it.id==='o_mar'||it.id==='o_cap')){
    const pi=portImg(it.id==='o_mar'?'capitano-marinaio/neutro':'capitano-giacca/neutro'),pk='P'+it.id;
    if(_wi[pk])return _wi[pk];
    if(pi){const cv=document.createElement('canvas');cv.width=cv.height=112;const g=cv.getContext('2d'),W=112;
      const bg=g.createRadialGradient(W*.4,W*.3,4,W/2,W/2,W*.75);bg.addColorStop(0,'#fff3c8');bg.addColorStop(1,'#d9a85a');g.fillStyle=bg;g.fillRect(0,0,W,W);
      g.drawImage(pi,0,0,W,W);try{_wi[pk]=cv.toDataURL()}catch(e){_wi[pk]=''}if(_wi[pk])return _wi[pk]}
  }
  const f=window.__hero==='f',key=it.id+(f?'f':'m');if(_wi[key])return _wi[key];""")
rep("function wardSheet(kind){","setTimeout(()=>{try{portImg('capitano-giacca/neutro');portImg('capitano-marinaio/neutro')}catch(e){}},2500);\nfunction wardSheet(kind){")
rep('  {v:"0.11.4",d:"23 nov 2026",','  {v:"0.11.5",d:"23 nov 2026",t:"Il pappagallo sulla mappa e l\'abito nuovo nel menu",n:[\n    "Quando Biscotto va a guardare qualcosa, sulla minimappa compare la sua testa con una freccia (anche sul bordo, se è lontano) per 20 secondi. Lui resta lì per 20 secondi e poi torna da solo da te. Sulla mappa grande resta segnato il punto.",\n    "Menu › Guardaroba: l\'icona dell\'abito (giacca rossa e maglia da marinaio) ora usa il disegno nuovo del Capitano.",\n  ]},\n  {v:"0.11.4",d:"23 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok150')
