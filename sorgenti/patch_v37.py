#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH36 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)

rep("T('mGfxN','🧪','Grafica di prova',","T('mRot','🔄','Rotazione schermo',rotLbl(),'')+T('mGfxN','🧪','Grafica di prova',")
rep("  {const gb=c.querySelector('#mGfxN');if(gb)gb.onclick=gfxSwitch}","  {const rb=c.querySelector('#mRot');if(rb)rb.onclick=()=>{const m=smRot.mode(),nx=m==='a'?'n':m==='n'?'f':'a';smRot.set(nx);setT('mRot','🔄',rotLbl())}}\n  {const gb=c.querySelector('#mGfxN');if(gb)gb.onclick=gfxSwitch}")
rep("const verLbl=()=>","const rotLbl=()=>{const m=smRot.mode();return m==='n'?'normale':m==='f'?'capovolto':smRot.ok()?'automatica':'automatica (nessun sensore)'};\nconst verLbl=()=>")
# schermo che si gira da solo anche con la rotazione automatica spenta: legge l'accelerometro
rep("body.rot #app{position:fixed;left:0;top:0;width:var(--sh);height:var(--sw);transform-origin:0 0;transform:translateX(var(--sw)) rotate(90deg)}","body.rot #app{position:fixed;left:0;top:0;width:var(--sh);height:var(--sw);transform-origin:0 0;transform:translateX(var(--sw)) rotate(90deg)}\nbody.rot.rot2 #app{transform:translateY(var(--sh)) rotate(-90deg)}")
rep("f();addEventListener('resize',f);addEventListener('orientationchange',function(){setTimeout(f,250)});","""f();addEventListener('resize',f);addEventListener('orientationchange',function(){setTimeout(f,250)});
/* telefono in verticale con rotazione automatica spenta: se lo giri dall'altra parte, il gioco si capovolge da solo */
(function(){var ax=0,n=0,ev=0,mode='a';try{mode=localStorage.getItem('sm_rot')||'a'}catch(_){}
function set(w){if(w!==b.classList.contains('rot2')){b.classList.toggle('rot2',w);try{dispatchEvent(new Event('resize'))}catch(_){}}}
function upd(){if(mode==='n')set(false);else if(mode==='f')set(true)}
function feed(v){ax=n++?ax*.8+v*.2:v;if(mode!=='a')return;if(ax<-5)set(true);else if(ax>5)set(false)}
addEventListener('devicemotion',function(e){var a=e.accelerationIncludingGravity;if(!a||a.x==null)return;ev=1;feed(a.x)},{passive:true});
addEventListener('deviceorientation',function(e){if(ev===1||e.gamma==null)return;ev=2;feed(-e.gamma/90*9.8)},{passive:true});
window.smRot={mode:function(){return mode},set:function(m){mode=m;try{localStorage.setItem('sm_rot',m)}catch(_){}if(m==='a'){ax=0;n=0}upd()},ok:function(){return ev>0}};upd()})();""")
rep("return document.body.classList.contains('rot')?[e.clientY-r.top,r.right-e.clientX]:[e.clientX-r.left,e.clientY-r.top];","const B_=document.body.classList;return B_.contains('rot')?(B_.contains('rot2')?[r.bottom-e.clientY,e.clientX-r.left]:[e.clientY-r.top,r.right-e.clientX]):[e.clientX-r.left,e.clientY-r.top];")
rep("const u=rot?(ev.clientY-r.top)/r.height:(ev.clientX-r.left)/r.width,v=rot?(r.right-ev.clientX)/r.width:(ev.clientY-r.top)/r.height;","const r2=rot&&document.body.classList.contains('rot2'),u=rot?(r2?(r.bottom-ev.clientY):(ev.clientY-r.top))/r.height:(ev.clientX-r.left)/r.width,v=rot?(r2?(ev.clientX-r.left):(r.right-ev.clientX))/r.width:(ev.clientY-r.top)/r.height;")
rep('    "Funghi di bosco: ogni giorno','    "Telefono in verticale con la rotazione automatica spenta: se lo giri dall\'altra parte, il gioco si capovolge da solo (menu compreso).",\n    "Funghi di bosco: ogni giorno')
open(P,'w',encoding='utf8').write(src)
print('patch37 ok')
