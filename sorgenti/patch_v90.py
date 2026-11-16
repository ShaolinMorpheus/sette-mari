#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH90 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
rep("function frame(ts){\n  requestAnimationFrame(frame);\n  const t=ts/1000","function frame(ts){\n  requestAnimationFrame(frame);const _f0=FPSC.on?performance.now():0;\n  const t=ts/1000")
rep("  render(t);if(ED.on)edDraw();\n  frameN++;\n}","  {const _r0=_f0?performance.now():0;render(t);if(_r0){FPSC.rs+=performance.now()-_r0}}if(ED.on)edDraw();\n  frameN++;if(_f0){FPSC.js+=performance.now()-_f0;FPSC.jn++}\n}")
rep("var FPSC={on:false,","var FPSC={js:0,rs:0,jn:0,on:false,")
rep("this.n=0;this.mx=0;this.fr=[];this.t0=t}","const jn=Math.max(1,this.jn);this.el.textContent+='\\nJS '+(this.js/jn).toFixed(1)+' ms (disegno '+(this.rs/jn).toFixed(1)+')\\nDPR '+DPR.toFixed(2)+'  QL '+QL;this.js=0;this.rs=0;this.jn=0;\n      this.n=0;this.mx=0;this.fr=[];this.t0=t}")
open(P,'w',encoding='utf8').write(src);print('patch90 ok')
