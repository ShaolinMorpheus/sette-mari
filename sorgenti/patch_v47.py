#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
a=src.index('function artGround(');b=src.index('\nfunction drawSp(',a)
NEW=r'''/* sprite d'arte appoggiati al terreno: ombra di contatto sotto l'intera base (tutti i lati), ombra proiettata morbida e alone */
function artBlur(src,r,rad,al){const c=document.createElement('canvas');c.width=src.width;c.height=src.height;const x=c.getContext('2d');
  x.globalAlpha=al*.5;x.drawImage(src,0,0);x.globalAlpha=al;const n=10;
  for(let i=0;i<n;i++){const t=i/n*6.283;x.drawImage(src,Math.cos(t)*rad*r,Math.sin(t)*rad*r)}
  return c}
function artPrep(s){
  const r=s.c.width/s.w,band=Math.min(Math.max(s.h*.2,6),18),P=4,fh=band*.8+P*2;
  const f=document.createElement('canvas');f.width=Math.ceil((s.w+P*2)*r);f.height=Math.ceil(fh*r);const x=f.getContext('2d');
  x.drawImage(s.c,0,Math.max(0,(s.ay-band)*r),s.c.width,band*r,P*r,P*r,s.w*r,band*.8*r);
  x.globalCompositeOperation='source-in';x.fillStyle='#08120a';x.fillRect(0,0,f.width,f.height);
  s.fp=artBlur(f,r,3,.17);s.fpB=band*.8;s.fpP=P;
  if(s.sh)s.shb=artBlur(s.sh,r,1.3,.2);
}
function artGround(g,s,k,cw){k=k||1;const sk=(s.sink||3)*k;
  if(s.sh&&!s.fp&&s.c&&s.c.width)artPrep(s);
  const CT=artGround.CT||(artGround.CT=(()=>{const c=document.createElement('canvas');c.width=128;c.height=40;const x=c.getContext('2d');x.translate(64,20);x.scale(1,.31);const q=x.createRadialGradient(0,0,0,0,0,64);q.addColorStop(0,'rgba(12,9,4,.62)');q.addColorStop(.55,'rgba(12,9,4,.36)');q.addColorStop(1,'rgba(12,9,4,0)');x.fillStyle=q;x.beginPath();x.arc(0,0,64,0,7);x.fill();return c})());
  const w=cw*2.7*k;g.drawImage(CT,-w/2,sk*.5-w*.156-1,w,w*.3125);
  if(s.sh){const q=s.shb||s.sh;g.save();g.translate(0,sk-1);g.globalAlpha=s.shb?.34:.27;g.transform(k,0,-.45*k*(s.shk||1),-.27*k*(s.shk||1),0,0);g.drawImage(q,-s.ax,-s.ay,s.w,s.h);g.restore()}
  if(s.fp){const P=s.fpP;g.save();g.globalAlpha=.92;g.drawImage(s.fp,(-s.ax-P)*k,(-(P+s.fpB)+1)*k+sk*.35,(s.w+P*2)*k,(s.fpB+P*2)*k);g.restore()}
}'''
src=src[:a]+NEW+src[b:]
NT="    \"Ombre più realistiche: ogni oggetto d'arte ha ora un'ombra scura sotto tutta la base (su ogni lato) e un'ombra proiettata più morbida, così appoggia bene a terra e non sembra volare.\",\n    "
k='    "Grafica di prova: casse (chiuse e aperte)'
assert src.count(k)==1
src=src.replace(k,NT+k)
open(P,'w',encoding='utf8').write(src);print('patch47 ok')
