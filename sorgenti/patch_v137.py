import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('FAIL',s.count(a),a[:80]);sys.exit(1)
    s=s.replace(a,b)
# posizione e rotazione scelte nell'editor
rep("Object.assign(b.mv,{lt_pg3:[2928,2232]","b.mv.nave=[2991,2088];b.rt=Object.assign(b.rt||{},{nave:-9});Object.assign(b.mv,{lt_pg3:[2928,2232]")
# niente onde: la riva davanti alla nave diventa sabbia asciutta
rep('const EDT_BK=({"2": [], "1": []})[WORLD]||[];','const EDT_BK=({"2": [["d",69.4,46.9,6.6,3.0]], "1": []})[WORLD]||[];')
# nave infossata: ombra di contatto + cumulo di sabbia (colore preso dal terreno vero) + sassolini lungo la chiglia
a=s.index("function drawNaveStrip(g,o){");b=s.index("function nvInPoly")
s=s[:a]+"""var NVX_C=null,NVX_K='';
function nvxGround(e){const key=e.x+','+e.y+','+(e.rotD||0)+','+e.spr;if(NVX_K===key&&NVX_C)return NVX_C;NVX_K=key;let r=0,gg=0,bb=0,n=0;
  try{const d=NVSD[e.spr],cx=LANDC.getContext('2d');for(let i=0;i<9;i++){const x=d.x0+(d.x1-d.x0)*(.12+.76*i/8),p=nvW(e,[x,nvLn(d.b,x)+30]);const q=cx.getImageData(Math.max(0,Math.min(LANDC.width-4,Math.floor(p[0]*GS))),Math.max(0,Math.min(LANDC.height-4,Math.floor(p[1]*GS))),3,3).data;for(let j=0;j<36;j+=4)if(q[j+3]>200){r+=q[j];gg+=q[j+1];bb+=q[j+2];n++}}}catch(x){}
  NVX_C=n?[r/n|0,gg/n|0,bb/n|0]:[226,205,150];return NVX_C}
function nvxHash(i){const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)}
function drawNaveStrip(g,o){const e=o.e,k=e.k||1,s=nvSP(e),d=NVSD[e.spr];if(!s||!d)return;const w=(d.x1-d.x0)/o.N;
  g.save();g.translate(e.x+52*k,e.y+62*k);nvRotG(g,e,k);
  const l=o.i?(d.x0+w*o.i-215)*k-.5:-999,r=o.i<o.N-1?(d.x0+w*(o.i+1)-215)*k+.5:999;
  g.beginPath();g.rect(l,-700,r-l,1500);g.clip();drawSp(g,s,0,2*k,k);
  // la nave e' infossata: ombra di contatto, cumulo di sabbia e sassolini lungo la chiglia
  const c=nvxGround(e),xa=Math.max(d.x0,d.x0+w*o.i-3),xb=Math.min(d.x1,d.x0+w*(o.i+1)+3),step=3;
  const L=x=>(x-215)*k,Y=x=>(nvLn(d.b,x)-295)*k+2*k,bump=x=>(2.4*Math.sin(x*.21)+1.7*Math.sin(x*.063+1.3)+1.2*Math.sin(x*.47))*k;
  const tp=x=>Math.max(0,Math.min(1,Math.min(x-d.x0-6,d.x1-30-x)/45));const band=(up,dn,col,aTop,aMid,aBot,f)=>{g.beginPath();for(let x=xa;x<=xb;x+=step){const y=Y(x)+(up*k+(f?bump(x):0))*tp(x);x===xa?g.moveTo(L(x),y):g.lineTo(L(x),y)}for(let x=xb;x>=xa;x-=step)g.lineTo(L(x),Y(x)+(dn*k+(f?bump(x)*.4:0))*tp(x));g.closePath();
    const y0=Y((xa+xb)/2);const gr=g.createLinearGradient(0,y0+up*k-6*k,0,y0+dn*k+6*k);gr.addColorStop(0,'rgba('+col+','+aTop+')');gr.addColorStop(.35,'rgba('+col+','+aMid+')');gr.addColorStop(1,'rgba('+col+','+aBot+')');g.fillStyle=gr;g.fill()};
  band(-30,2,'46,32,18',0,.34,.0,false);
  band(-5,19,(c[0]*.93|0)+','+(c[1]*.93|0)+','+(c[2]*.93|0),.0,.97,.0,true);
  band(-1,9,(Math.min(255,c[0]*1.05)|0)+','+(Math.min(255,c[1]*1.05)|0)+','+(Math.min(255,c[2]*1.04)|0),0,.75,0,true);
  for(let i=Math.ceil(xa/9);i*9<xb;i++){const x=i*9+nvxHash(i)*5;if(tp(x)<.5)continue;const y=Y(x)+(4+nvxHash(i+50)*9)*k,rr=(1+nvxHash(i+9)*1.7)*k;
    if(nvxHash(i+3)<.62){g.fillStyle='rgba('+(c[0]*.62|0)+','+(c[1]*.58|0)+','+(c[2]*.52|0)+',.85)';g.beginPath();g.ellipse(L(x),y+.5*k,rr*1.25,rr*.8,0,0,7);g.fill();
      g.fillStyle='rgba('+(Math.min(255,c[0]*1.1)|0)+','+(Math.min(255,c[1]*1.1)|0)+','+(Math.min(255,c[2]*1.08)|0)+',.9)';g.beginPath();g.ellipse(L(x)-.3*k,y,rr,rr*.62,0,0,7);g.fill()}}
  g.restore()}
"""+s[b:]
open(P,'w',encoding='utf8').write(s);print('patch137 ok')
