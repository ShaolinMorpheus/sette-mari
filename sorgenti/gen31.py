import re
E='/home/claude/work/erba/'
nw=open(E+'new_parts.js',encoding='utf8').read().split('\n')
od=open(E+'old_parts.js',encoding='utf8').read().split('\n')
def blk(lines,a,b): return '\n'.join(lines[a-1:b])
new_txt=blk(nw,2,3)+'\n'+blk(nw,59,318)
old_txt=blk(od,1,1)+'\n'+blk(od,3,9)
new_txt=new_txt.replace("function shadow(x,y,rx,ry,a,col){","function shadow(x,y,rx,ry,a,col){if(NOSH)return;",1)
js=r'''
/* ---- 12c_gfx_prova.js: «grafica di prova» (attivabile dal menu; la grafica originale resta intatta) ---- */
var GFXN=false;try{GFXN=localStorage.getItem('sm_gfx')==='new'}catch(e){}
var NGV={t:GFXN?8:6,p:GFXN?5:4};
var GfxNew=(function(){
  let g;const OW=0,OC='#16301a';let NOSH=false;
'''+new_txt+'\n'+old_txt+r'''
  const R=Math.round;
  function B(W,H,ax,ay,fn){return sp(W,H,gg=>{g=gg;g.lineJoin='round';fn()},ax,ay)}
  function tint(s,f){return sp(s.w,s.h,gg=>{gg.filter=f;gg.drawImage(s.c,0,0,s.w,s.h)},s.ax,s.ay)}
  // piu' tipi di alberi e pini: stesse sprite originali, con tonalita' diverse
  function nature(){
    const t0=SP.tree.slice(),p0=SP.pine.slice();
    SP.tree=[...t0,tint(t0[0],'hue-rotate(14deg) saturate(1.1)'),tint(t0[3],'hue-rotate(-10deg) brightness(.96)')];
    SP.pine=[...p0,tint(p0[1],'hue-rotate(16deg)')];
  }
  function base(){
    const sm=(b,k)=>sp(R(b.w*k),R(b.h*k),gg=>{gg.drawImage(b.c,0,0,b.w*k,b.h*k)},b.ax*k,b.ay*k);
    SP.boulder[1]=sm(SP.boulder[1],.62);SP.boulder[3]=sm(SP.boulder[3],.55);
  }
  /* ---- decorazioni fisse sul terreno (cotte una volta nella mappa) ---- */
  function decor(L){
    g=L;NOSH=false;const FULL=GFXN,r=rnd(5151);let DC=0,GR=0,FO=0;
    const fern=(x,y,s)=>{g.save();g.translate(x,y);g.scale(s,s);g.lineCap='round';for(let k=-3;k<=3;k++){const a=-1.57+k*.42,len=26+(3-Math.abs(k))*3;g.strokeStyle='#2f7a34';g.lineWidth=5;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(Math.cos(a)*len*.5,Math.sin(a)*len*.6-6,Math.cos(a)*len,Math.sin(a)*len*.7+4);g.stroke();g.strokeStyle='#58b04a';g.lineWidth=2.4;g.stroke()}g.restore()};
    const clover=(x,y,s)=>{for(let k=0;k<5;k++){g.fillStyle=k%2?'rgba(150,210,100,.55)':'rgba(90,160,70,.5)';g.beginPath();g.ellipse(x+(r()-.5)*14*s,y+(r()-.5)*8*s,4*s,2.4*s,r()*3,0,7);g.fill()}};
    const longgrass=(x,y,s)=>{g.save();g.translate(x,y);g.scale(s,s);g.lineCap='round';for(let k=0;k<7;k++){const a=(k-3)*.2;g.strokeStyle=k%2?'#7cc44f':'#4f9a3c';g.lineWidth=3;g.beginPath();g.moveTo(k*2-6,0);g.quadraticCurveTo(k*3-9+a*20,-16,a*60,-30-(k%3)*4);g.stroke()}g.restore()};
    const dry=(x,y,s)=>{g.save();g.translate(x,y);g.scale(s,s);g.lineCap='round';for(let k=0;k<6;k++){g.strokeStyle=['#c8b46a','#d8c47a','#a89650'][k%3];g.lineWidth=2.4;g.beginPath();g.moveTo(k*2.4-6,0);g.quadraticCurveTo(k*3-9,-10,(k-2.5)*5,-20);g.stroke()}g.restore()};
    const gtuft=(x,y,s)=>{const G=GfxNew.gimg;
      if(G&&G.complete&&G.naturalWidth){const w=(15+r()*9)*(s>.6?1.1:.95),h=w*1.04;g.fillStyle='rgba(20,30,10,.18)';g.beginPath();g.ellipse(x+1,y+1,w*.38,w*.1,0,0,7);g.fill();
        g.save();g.translate(x,y+1);if(r()<.5)g.scale(-1,1);g.drawImage(G,-w/2,-h+2,w,h);g.restore()}
      else tuft(x,y,s)};
    const PC=['#ffd23f','#ffd23f','#ff8fa3','#c8a8ff','#ff6a5a','#7ab8ff','#ffffff','#ff9a3c'];
    const capCols=[['#e8452c','#fff'],['#d9a441','#fff4d0'],['#b25fd0','#f3e0ff'],['#e8e0cf','#cfc2a8']];
    for(let ty=0;ty<MH;ty++)for(let tx=0;tx<MW;tx++){
      const e=elevT[ty*MW+tx];if(e<WL+.02)continue;
      const s=e-WL,n1=NZ.fbm((tx+.5)*1.9,(ty+.5)*1.9,2),gT=sstep(.17,.27,s+(n1-.5)*.16);
      const dp=pathDist(tx+.5,ty+.5),fF=forestF(tx+.5,ty+.5),dcE=hyp(tx+.5-C0.x,(ty+.5-C0.y)*1.15);
      if(dp<1.3||dcE<6.2)continue;
      const X=()=>(DC++,(tx+.1+r()*.8)*TS),Y=()=>(ty+.1+r()*.8)*TS;
      const nP=hyp((tx+.5-POND.x)/(POND.rx+2.8),(ty+.5-POND.y)/(POND.ry+2.8))<1;   // il laghetto non e' mare: niente conchiglie, stelle marine, ricci o legni
      if(gT<.5){                                       // sabbia
        const q=r()/2.4;
        if(nP){}
        else if(s>.04&&s<.2&&q<.07){const k=(r()*(FULL?5:3))|0,x=X(),y=Y(),sc=.28+r()*.08;
          if(k===0)scallop(x,y,sc);else if(k===1)spiralShell(x,y,sc);else if(k===2)coneShell(x,y,sc,r()*6);else if(k===3)starfish(x,y,sc,r()*6);else urchin(x,y,sc*.9)}
        else if(s>.07&&s<.14&&q<.085){driftwood(X(),Y(),.4+r()*.15,r()*3.1-1.5)}
        else if(s>.1&&q<.1){const x=X(),y=Y();if(FULL&&r()<.5)coconut(x,y,.3,r()<.3);else rock2(x,y,.24+r()*.08)}
        else if(FULL&&s>.14&&q<.12){dry(X(),Y(),.7+r()*.4)}
      }else{                                           // erba e sottobosco
        const q=r()/3;GR++;if(fF>.3)FO++;
        if(fF>.3){
          if(q<.02)rock2(X(),Y(),.26+r()*.1);
          else if(q<.045){const cc=capCols[(r()*4)|0];mushroom(X(),Y(),.26+r()*.07,cc[0],cc[1],false)}
          else if(q<.06)blossom(X(),Y(),.38+r()*.08,PC[(r()*PC.length)|0]);
          else if(FULL&&q<.075)logp(X(),Y(),30+r()*14,5+r()*2,r()*.7-.35);
          else if(FULL&&q<.1)fern(X(),Y(),.5+r()*.25);
          else if(FULL&&q<.17)gtuft(X(),Y(),.38+r()*.12);
        }else{
          if(q<.015)rock2(X(),Y(),.24+r()*.1);
          else if(q<.045)blossom(X(),Y(),.38+r()*.08,PC[(r()*PC.length)|0]);
          else if(q<.07)daisy(X(),Y(),.38+r()*.08);
          else if(q<.083)mushroom(X(),Y(),.26,'#e8452c','#fff',false);
          else if(FULL&&q<.1)logp(X(),Y(),26+r()*10,4.5,r()*.7-.35);
          else if(FULL&&q<.17)gtuft(X(),Y(),.7+r()*.5);
          else if(FULL&&q<.19)clover(X(),Y(),1);
        }
      }
    }
    window.__DC=[DC,GR,FO];
  }
  window.__DC=null;
  /* ---- animali: gabbiani con ombra, tartarughe, pesci, gufo ---- */
  let AN=null;
  function mkAn(){
    AN={};
    AN.gull=[0,9,18].map(f=>B(48,56,24,28,()=>gull(24,28,.25,0,f)));
    AN.turtle=B(64,64,32,32,()=>turtle(32,32,.36,0));
    AN.fish=B(36,22,18,11,()=>fish(18,11,.26,'#3b5c78','#2a4560'));
    AN.owl=B(44,52,22,40,()=>owl(22,40,.3));
  }
  function under(gg,t,vx0,vy0,vx1,vy1){
    if(!AN)mkAn();
    if(!GFXN)return;const q=(typeof QL!=='undefined'&&QL>=3),FULL=GFXN;
    for(let i=0;i<GLINTS.length;i+=9){
      const gl=GLINTS[i];if(gl[0]<vx0-60||gl[0]>vx1+60||gl[1]<vy0-60||gl[1]>vy1+60)continue;if(inPondPx(gl[0],gl[1],2.2))continue;
      const k=i%3;
      if(k===0){const a=t*.12+i,x=gl[0]+Math.sin(a)*34,y=gl[1]+Math.cos(a*.8)*22,rot=Math.atan2(Math.cos(a*.8)*-22*.8,Math.cos(a)*34);
        gg.save();gg.translate(x+3,y+4);gg.rotate(rot);gg.globalAlpha=.16;gg.filter='brightness(0)';drawSp(gg,AN.turtle,0,0);gg.restore();
        gg.save();gg.translate(x,y);gg.rotate(rot);gg.globalAlpha=.9;drawSp(gg,AN.turtle,0,0);gg.restore()}
      else if(FULL&&k===1&&!q){for(let f=0;f<4;f++){const a=t*.5+i+f*.9,x=gl[0]+Math.cos(a)*26+f*7,y=gl[1]+Math.sin(a)*16+f*4;
        gg.save();gg.translate(x,y);gg.rotate(a+1.57);gg.globalAlpha=.4;drawSp(gg,AN.fish,0,0);gg.restore()}}
    }
  }
  function over(gg,t,vx0,vy0,vx1,vy1){
    if(!AN)mkAn();
    const vw=vx1-vx0,vh=vy1-vy0;
    if(!isNight()&&S.tod>=6&&S.tod<19.2){
      if(!AN.gp){const r=rnd(88),cx0=C0.x*TS,cy0=C0.y*TS;AN.gp=[];for(let i=0;i<10;i++)AN.gp.push({cx:cx0+(r()-.5)*(i<3?900:2600),cy:cy0+(r()-.5)*(i<3?600:1800),rx:380+r()*620,ry:240+r()*330,w:(.07+r()*.05)*(r()<.5?-1:1),ph:r()*6.28})}
      for(let i=0;i<AN.gp.length;i++){
        const q=AN.gp[i],a=t*q.w+q.ph,x=q.cx+Math.cos(a)*q.rx,y=q.cy+Math.sin(a)*q.ry;
        if(x<vx0-80||x>vx1+80||y<vy0-80||y>vy1+110)continue;
        const hd=Math.atan2(Math.cos(a)*q.ry*q.w,-Math.sin(a)*q.rx*q.w);
        const fr=Math.floor((t*7+i)%4),spr=AN.gull[fr===3?1:fr];
        gg.save();gg.translate(x+10,y+24);gg.rotate(hd);gg.globalAlpha=.14;gg.filter='brightness(0)';drawSp(gg,spr,0,0);gg.restore();
        gg.save();gg.translate(x,y);gg.rotate(hd);drawSp(gg,spr,0,0);gg.restore();
      }
    }
    if(isNight()){
      for(const e of E){
        if(e.type!=='tree'||!e.alive||e.x<vx0-40||e.x>vx1+40||e.y<vy0||e.y>vy1+160)continue;
        let h=0;const id=String(e.id);for(let k=0;k<id.length;k++)h=(h*31+id.charCodeAt(k))|0;
        if(Math.abs(h)%11!==0)continue;
        const bl=(Math.floor(t*.7+Math.abs(h))%9===0);
        gg.save();gg.translate(e.x+(e.flip?-14:14),e.y-70);if(e.flip)gg.scale(-1,1);drawSp(gg,AN.owl,0,0);
        if(!bl){gg.globalCompositeOperation='lighter';gg.fillStyle='rgba(255,220,90,.35)';gg.beginPath();gg.arc(-3,-14,4,0,7);gg.arc(4,-14,4,0,7);gg.fill()}
        gg.restore();
      }
    }
  }
  return{nature,base,decor,under,over,on:()=>GFXN};
})();
function waterNew(d){const a=waterRGB(.05),b=waterRGB(.27),c=waterRGB(.8);const s1=sstep(.12,.16,d),s2=sstep(.38,.42,d);let o=mixc(mixc(a,b,s1),c,s2);const e=Math.max(1-Math.abs(d-.14)/.012,1-Math.abs(d-.4)/.012,0);if(e>0)o=mixc(o,[235,255,255],.32*e);return o}
function gfxSwitch(){try{localStorage.setItem('sm_gfx',GFXN?'old':'new')}catch(e){}try{saveGame(true)}catch(e){}location.reload()}
'''
open('/home/claude/work/new31.js','w',encoding='utf8').write(js)
print(len(js))
