#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH79 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
rep("""    {const M=mareGet();g.save();
    for(const[s,w,off]of vis){
      const px=s.x+s.nx*off,py=s.y+s.ny*off;
      if(M.aq){g.globalAlpha=.32;g.drawImage(M.aq,px-64,py-64,128,128)}
    }
    g.restore()}""","""    {const M=mareGet(),B=msbGet();
      const lw=Math.ceil(vx1-vx0),lh=Math.ceil(vy1-vy0);
      if(lw>0&&lh>0&&lw<3000&&lh<3000){
        if(!drawBeach.L){drawBeach.L=document.createElement('canvas')}
        const L=drawBeach.L;if(L.width<lw)L.width=lw;if(L.height<lh)L.height=lh;
        const q=L.getContext('2d');
        const layer=(img,mask,sz,sc,al,pos)=>{
          if(!img)return;
          q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';q.globalAlpha=1;q.clearRect(0,0,L.width,L.height);
          q.setTransform(1,0,0,1,-vx0,-vy0);
          for(const[s,w,off]of vis){const p=pos(s,w,off);q.globalAlpha=mask;q.drawImage(M.sw,p[0]-sz/2,p[1]-sz/2,sz,sz)}
          q.globalAlpha=1;q.globalCompositeOperation='source-in';
          const pt=q.createPattern(img,'repeat');if(pt&&pt.setTransform)pt.setTransform(new DOMMatrix().scale(sc));
          q.fillStyle=pt;q.fillRect(vx0,vy0,lw,lh);
          q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';
          g.save();g.globalAlpha=al;g.drawImage(L,0,0,lw,lh,vx0,vy0,lw,lh);g.restore();
        };
        layer(MARE.aq,.55,150,.6,.8,(s,w,off)=>[s.x+s.nx*off,s.y+s.ny*off]);
        layer(B.im,.6,120,.45,.85,(s,w,off)=>[s.x+s.nx*(off*.5+12),s.y+s.ny*(off*.5+12)]);
      }}""")
rep("    {const B=msbGet();if(B.im){g.save();for(const[s,w,off,amp,dw]of vis){g.globalAlpha=.42-.12*w;g.drawImage(B.im,s.x+s.nx*(off*.5+12)-52,s.y+s.ny*(off*.5+12)-52,104,104)}g.restore()}}\n","")
rep("g.globalAlpha=.26+.3*w;g.drawImage(M.ed","g.globalAlpha=.5+.4*w;g.drawImage(M.ed")
open(P,'w',encoding='utf8').write(src);print('patch79 ok')
