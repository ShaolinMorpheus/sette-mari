#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
a0=src.index("    {const M=mareGet(),B=msbGet();\n      const lw=Math.ceil(vx1-vx0)")
a1=src.index("    for(const[s,w,off,amp,dw]of vis){\n      const px=s.x+s.nx*(off+1),py=s.y+s.ny*(off+1),tx=-s.ny,ty=s.nx,L=24;",a0)
new="""    if(FPSC.test!==5&&vis.length){const M=mareGet(),B=msbGet();
      // strati di acqua bassa e sabbia bagnata: ognuno ha una propria immagine in cache (mezza risoluzione, con margine),
      // rifatta solo ogni 3 fotogrammi (uno sfasato dall'altro) o quando la camera esce dalla zona preparata.
      const HS=.5,MG=64,fc=drawBeach.fc=(drawBeach.fc||0)+1;
      const DEF=[[MARE.aq,.55,150,.6,.8,(s,w,off)=>[s.x+s.nx*off,s.y+s.ny*off]],[B.im,.6,120,.45,.85,(s,w,off)=>[s.x+s.nx*(off*.5+12),s.y+s.ny*(off*.5+12)]]];
      for(let i=0;i<2;i++){
        const[img,mask,sz,sc,al,pos]=DEF[i];if(!img)continue;
        const C=drawBeach['C'+i]||(drawBeach['C'+i]={cv:document.createElement('canvas'),ok:0,x:0,y:0,w:0,h:0,wd:-1,pt:null,pi:null});
        const need=!C.ok||C.wd!==WORLD||vx0<C.x+6||vy0<C.y+6||vx1>C.x+C.w-6||vy1>C.y+C.h-6||fc%3===i;
        if(need){
          const bx0=Math.floor(vx0-MG),by0=Math.floor(vy0-MG),bw=Math.ceil(vx1-vx0+2*MG),bh=Math.ceil(vy1-vy0+2*MG);
          if(bw>0&&bh>0&&bw<3400&&bh<3400){
            const cw=Math.ceil(bw*HS),ch=Math.ceil(bh*HS);if(C.cv.width!==cw||C.cv.height!==ch){C.cv.width=cw;C.cv.height=ch}
            const q=C.cv.getContext('2d');q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';q.globalAlpha=1;q.clearRect(0,0,cw,ch);
            q.setTransform(HS,0,0,HS,-bx0*HS,-by0*HS);
            for(const[s,w,off]of vis){const p=pos(s,w,off);q.globalAlpha=mask;q.drawImage(M.sw,p[0]-sz/2,p[1]-sz/2,sz,sz)}
            q.globalAlpha=1;q.globalCompositeOperation='source-in';
            if(C.pi!==img||!C.pt){C.pt=q.createPattern(img,'repeat');if(C.pt&&C.pt.setTransform)C.pt.setTransform(new DOMMatrix().scale(sc));C.pi=img}
            q.fillStyle=C.pt;q.fillRect(bx0,by0,bw,bh);q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';
            C.x=bx0;C.y=by0;C.w=bw;C.h=bh;C.wd=WORLD;C.ok=1;
          }
        }
        if(C.ok){g.save();g.globalAlpha=al;g.imageSmoothingEnabled=true;g.drawImage(C.cv,0,0,C.cv.width,C.cv.height,C.x,C.y,C.w,C.h);g.restore()}
      }
    }
"""
src=src[:a0]+new+src[a1:]
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH95 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
rep("    {const M=mareGet();if(M.ok){let k=0;for(const[s,w,off,amp,dw]of vis){","    {const M=mareGet();if(M.ok&&FPSC.test!==6){let k=0;for(const[s,w,off,amp,dw]of vis){")
rep("names:['normale','senza riva','senza onde/riflessi','senza riva+onde','risoluzione 1.5']","names:['normale','senza riva','senza onde/riflessi','senza riva+onde','risoluzione 1.5','senza strati riva','senza schiuma riva']")
open(P,'w',encoding='utf8').write(src);print('patch95 ok')
