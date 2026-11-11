#!/usr/bin/env python3
import sys,base64
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH51 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# sfondo animato del menu iniziale (dipinto dall'utente): deriva lenta + luccichii sul mare + fumo e bagliore del falò
b=base64.b64encode(open('/home/claude/work/menu_bg.webp','rb').read()).decode()
CSS=("#startBg{position:absolute;inset:0;overflow:hidden;z-index:0;background:#0a2a3a;pointer-events:none}"
"#startBg:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,26,42,.08),rgba(4,26,42,.38))}"
".sbgW{position:absolute}"
".sbgK{position:absolute;inset:0;background:url(data:image/webp;base64,"+b+") 0 0/100% 100% no-repeat;animation:sbgk 46s ease-in-out infinite alternate;transform-origin:64% 58%;will-change:transform}"
".sbgK canvas{position:absolute;inset:0;width:100%;height:100%}"
"@keyframes sbgk{from{transform:scale(1) translate(0,0)}to{transform:scale(1.09) translate(-1.6%,1.2%)}}"
"#startCard{position:relative;z-index:1}"
"@media (prefers-reduced-motion:reduce){.sbgK{animation:none}}")
rep("</head>","<style id=\"menuBgCss\">"+CSS+"</style></head>")
rep('<div id="start">\n  <div id="startCard">','<div id="start"><div id="startBg"><div class="sbgW"><div class="sbgK"><canvas id="startFx"></canvas></div></div></div>\n  <div id="startCard">')
JS=r'''
/* ---- sfondo animato del menu iniziale ---- */
(function(){
  const s=document.getElementById('start'),W=document.querySelector('.sbgW'),cv=document.getElementById('startFx');
  if(!s||!W||!cv)return;
  const g=cv.getContext('2d');
  function fit(){
    const sw=s.clientWidth,sh=s.clientHeight;if(!sw||!sh)return;
    const k=Math.max(sw/1920,sh/1080),w=Math.ceil(1920*k),h=Math.ceil(1080*k);
    W.style.width=w+'px';W.style.height=h+'px';W.style.left=Math.round((sw-w)*.5)+'px';W.style.top=Math.round((sh-h)*.62)+'px';
    const r=Math.min(1,960/w);cv.width=Math.max(2,Math.round(w*r));cv.height=Math.max(2,Math.round(h*r));
  }
  const SEA=[[130,300],[200,540],[400,600],[600,480],[800,290],[900,170]];
  const shore=y=>{for(let i=1;i<SEA.length;i++){if(y<=SEA[i][0]){const a=SEA[i-1],b=SEA[i],u=(y-a[0])/(b[0]-a[0]);return a[1]+(b[1]-a[1])*u}}return 160};
  const rnd=(()=>{let x=12345;return()=>{x=(x*1103515245+12345)&0x7fffffff;return x/0x7fffffff}})();
  const SP=[];for(let i=0;i<46;i++){const y=150+rnd()*740,xm=shore(y)-50;SP.push({x:25+rnd()*Math.max(40,xm-25),y,p:rnd()*6.28,v:.6+rnd()*1.1,r:3+rnd()*5})}
  const FX=1385,FY=492;
  function frame(ms){
    if(s.hidden||document.hidden){requestAnimationFrame(frame);return}
    if(!W.style.width)fit();
    const t=ms/1000,k=cv.width/1920;g.setTransform(k,0,0,k,0,0);g.clearRect(0,0,1920,1080);g.globalCompositeOperation='lighter';
    for(const p of SP){const a=Math.pow(Math.max(0,Math.sin(t*p.v+p.p)),7);if(a<.03)continue;
      g.globalAlpha=a*.9;g.fillStyle='#fff6d8';g.beginPath();g.ellipse(p.x,p.y,p.r*2.2,p.r*.55,0,0,6.283);g.fill();
      g.beginPath();g.ellipse(p.x,p.y,p.r*.5,p.r*1.3,0,0,6.283);g.fill()}
    const fl=.78+.22*Math.sin(t*9.1)*Math.sin(t*5.3+1)+.08*Math.sin(t*23);
    const gr=g.createRadialGradient(FX,FY,2,FX,FY,70+14*fl);gr.addColorStop(0,'rgba(255,190,80,'+(.55*fl)+')');gr.addColorStop(1,'rgba(255,120,30,0)');
    g.globalAlpha=1;g.fillStyle=gr;g.fillRect(FX-100,FY-100,200,200);
    g.globalCompositeOperation='source-over';
    for(let i=0;i<9;i++){const u=((t*.07+i/9)%1),x=FX-4+Math.sin(u*5+i)*14+u*95,y=FY-18-u*210,r=6+u*34;
      g.globalAlpha=Math.sin(u*3.14159)*.2;g.fillStyle='#d9d4cc';g.beginPath();g.arc(x,y,r,0,6.283);g.fill()}
    g.globalAlpha=1;requestAnimationFrame(frame)}
  window.addEventListener('resize',()=>{W.style.width='';});
  requestAnimationFrame(frame);
})();
'''
rep("/* ---- 12d_kb.js ---- */",JS+"/* ---- 12d_kb.js ---- */")
k='    "Conchiglie più piccole'
rep(k,'    "Nuovo sfondo del menu iniziale in movimento: la spiaggia con il relitto e la capanna, dipinta da te.",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch51 ok')
