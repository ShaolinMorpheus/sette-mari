#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH88 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
rep("+T('mHand','🕹','Joystick',S.hand==='left'?'a sinistra':'a destra'))","+T('mHand','🕹','Joystick',S.hand==='left'?'a sinistra':'a destra')+T('mFps','📈','Contatore FPS',FPSC.on?'acceso':'spento','tgl'+(FPSC.on?' on':'')))")
rep("  {const pb=c.querySelector('#mPastT');","  {const fb=c.querySelector('#mFps');if(fb)fb.onclick=()=>{FPSC.set(!FPSC.on);const sb=fb.querySelector('.sub,small,span:last-child');try{fb.classList.toggle('on',FPSC.on)}catch(e){}if(sb&&sb.textContent!=null)sb.textContent=FPSC.on?'acceso':'spento'}}\n  {const pb=c.querySelector('#mPastT');")
rep("var PASTT=false;","""var FPSC={on:false,el:null,n:0,t0:0,mx:0,last:0,fr:[],
  set(v){this.on=!!v;try{localStorage.setItem('sm_fps',v?'1':'0')}catch(e){}
    if(!this.el){const d=document.createElement('div');d.style.cssText='position:fixed;left:6px;top:96px;z-index:99999;background:rgba(0,0,0,.65);color:#9f9;font:12px/1.25 monospace;padding:3px 6px;border-radius:5px;pointer-events:none;white-space:pre';document.body.appendChild(d);this.el=d}
    this.el.style.display=v?'block':'none';
    if(v&&!this.run){this.run=1;this.n=0;this.mx=0;this.fr=[];this.t0=this.last=performance.now();requestAnimationFrame(f=>FPSC.tick(f))}},
  tick(){if(!this.on){this.run=0;return}
    const t=performance.now(),d=t-this.last;this.last=t;this.n++;this.fr.push(d);if(d>this.mx)this.mx=d;
    if(t-this.t0>=500){const fps=this.n*1000/(t-this.t0);const s=this.fr.slice().sort((a,b)=>b-a);const low=s[Math.max(0,Math.floor(s.length*.05))]||0;
      const col=fps>=55?'#9f9':fps>=40?'#fd6':'#f88';this.el.style.color=col;
      this.el.textContent=fps.toFixed(0)+' fps\\nmedia '+(1000/Math.max(fps,1)).toFixed(1)+' ms\\npeggiore '+this.mx.toFixed(0)+' ms\\n5% lenti '+low.toFixed(0)+' ms';
      this.n=0;this.mx=0;this.fr=[];this.t0=t}
    requestAnimationFrame(()=>FPSC.tick())}};
try{if(localStorage.getItem('sm_fps')==='1')setTimeout(()=>FPSC.set(true),1500)}catch(e){}
var PASTT=false;""")
open(P,'w',encoding='utf8').write(src);print('patch88 ok')
