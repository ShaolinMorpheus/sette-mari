#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
a="""          if(!img)return;
          q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';q.globalAlpha=1;q.clearRect(0,0,L.width,L.height);
          q.setTransform(1,0,0,1,-vx0,-vy0);
          for(const[s,w,off]of vis){const p=pos(s,w,off);q.globalAlpha=mask;q.drawImage(M.sw,p[0]-sz/2,p[1]-sz/2,sz,sz)}
          q.globalAlpha=1;q.globalCompositeOperation='source-in';
          const pt=q.createPattern(img,'repeat');if(pt&&pt.setTransform)pt.setTransform(new DOMMatrix().scale(sc));
          q.fillStyle=pt;q.fillRect(vx0,vy0,lw,lh);
          q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';
          g.save();g.globalAlpha=al;g.drawImage(L,0,0,lw,lh,vx0,vy0,lw,lh);g.restore();"""
b="""          if(!img||!vis.length)return;
          const ps=[];let nx0=1e9,ny0=1e9,nx1=-1e9,ny1=-1e9;
          for(const[s,w,off]of vis){const p=pos(s,w,off);ps.push(p);if(p[0]<nx0)nx0=p[0];if(p[0]>nx1)nx1=p[0];if(p[1]<ny0)ny0=p[1];if(p[1]>ny1)ny1=p[1]}
          const bx0=Math.max(vx0,Math.floor(nx0-sz/2)),by0=Math.max(vy0,Math.floor(ny0-sz/2)),bx1=Math.min(vx1,Math.ceil(nx1+sz/2)),by1=Math.min(vy1,Math.ceil(ny1+sz/2));
          const bw=Math.ceil(bx1-bx0),bh=Math.ceil(by1-by0);if(bw<=0||bh<=0)return;
          q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';q.globalAlpha=1;q.clearRect(0,0,bw+1,bh+1);
          q.setTransform(1,0,0,1,-bx0,-by0);
          for(let i=0;i<ps.length;i++){const p=ps[i];q.globalAlpha=mask;q.drawImage(M.sw,p[0]-sz/2,p[1]-sz/2,sz,sz)}
          q.globalAlpha=1;q.globalCompositeOperation='source-in';
          let pt=layer.pc&&layer.pc.get(img);if(!pt){pt=q.createPattern(img,'repeat');if(pt&&pt.setTransform)pt.setTransform(new DOMMatrix().scale(sc));(layer.pc||(layer.pc=new Map())).set(img,pt)}
          q.fillStyle=pt;q.fillRect(bx0,by0,bw,bh);
          q.setTransform(1,0,0,1,0,0);q.globalCompositeOperation='source-over';
          g.save();g.globalAlpha=al;g.drawImage(L,0,0,bw,bh,bx0,by0,bw,bh);g.restore();"""
if src.count(a)!=1:print('PATCH86 FAIL');sys.exit(1)
open(P,'w',encoding='utf8').write(src.replace(a,b));print('patch86 ok')
