#!/usr/bin/env python3
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
X=json.load(open('/home/claude/work/mv2/x.json'))
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH75 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
LOAD="""var MV2X=%s;
var MV2={ok:false,pal:null,m:null,l:null,mm:[1,1,1],ml:[1,1,1],on:null,rf:null};
async function mv2Load(){
  if(MV2.ok)return;
  const li=k=>new Promise(r=>{const im=new Image();im.onload=()=>r(im);im.onerror=()=>r(null);im.src='data:image/'+(k==='pal'?'png':'webp')+';base64,'+MV2X[k]});
  const [pal,m,l,on,rf]=await Promise.all(['pal','m','l','on','rf'].map(li));
  if(!(pal&&m&&l&&on&&rf))return;
  const cv=(im,w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,0,0);return c};
  MV2.pal=cv(pal,256,1).getContext('2d').getImageData(0,0,256,1).data;
  const dat=im=>{const d=cv(im,512,512).getContext('2d').getImageData(0,0,512,512).data;let a=0,b=0,c=0;const n=d.length/4;for(let i=0;i<d.length;i+=4){a+=d[i];b+=d[i+1];c+=d[i+2]}return{d:d,m:[a/n,b/n,c/n]}};
  MV2.m=dat(m);MV2.l=dat(l);MV2.on=cv(on,256,256);MV2.rf=cv(rf,256,256);MV2.ok=true;
}
function mv2S(t,wx,wy,per){
  const N=512,u=((wx/per)%%1+1)%%1*N,v=((wy/per)%%1+1)%%1*N,x0=Math.floor(u),y0=Math.floor(v),fx=u-x0,fy=v-y0,x1=(x0+1)%%N,y1=(y0+1)%%N,d=t.d;
  const a=(y0*N+x0)*4,b=(y0*N+x1)*4,c=(y1*N+x0)*4,e=(y1*N+x1)*4,w0=(1-fx)*(1-fy),w1=fx*(1-fy),w2=(1-fx)*fy,w3=fx*fy;
  return[d[a]*w0+d[b]*w1+d[c]*w2+d[e]*w3,d[a+1]*w0+d[b+1]*w1+d[c+1]*w2+d[e+1]*w3,d[a+2]*w0+d[b+2]*w1+d[c+2]*w2+d[e+2]*w3];
}
function mv2Water(dd,tx,ty){
  /* profondita dd (0 riva, 1 abisso) -> posizione sulla tavolozza (riva, bassa, media, largo, abisso) */
  const u=dd<.12?dd/.12*.25:dd<.34?.25+(dd-.12)/.22*.25:dd<.62?.5+(dd-.34)/.28*.25:.75+(dd-.62)/.38*.25;
  const i=clamp(Math.round(u*255),0,255)*4,p=MV2.pal;
  const wm=sstep(.3,.66,dd),a=mv2S(MV2.m,tx*TS,ty*TS,700),b=mv2S(MV2.l,tx*TS+137,ty*TS+61,820),mm=MV2.m.m,ml=MV2.l.m;
  const k=1.15,f=[(a[0]/mm[0])*(1-wm)+(b[0]/ml[0])*wm,(a[1]/mm[1])*(1-wm)+(b[1]/ml[1])*wm,(a[2]/mm[2])*(1-wm)+(b[2]/ml[2])*wm];
  return[p[i]*(1+(f[0]-1)*k),p[i+1]*(1+(f[1]-1)*k),p[i+2]*(1+(f[2]-1)*k)];
}
async function bakeGround(prog){""" % json.dumps(X)
rep("async function bakeGround(prog){",LOAD)
rep("const PT=PASTT?await PAST.get():null;PASTON=!!PT;","const PT=PASTT?await PAST.get():null;PASTON=!!PT;if(PT)await mv2Load();")
rep("if(PT){const tw=PAST.s(PT.wa,tx*TS,ty*TS),mm=PT.wa.m,k1=.85;c=[c[0]*(1+(tw[0]/mm[0]-1)*k1),c[1]*(1+(tw[1]/mm[1]-1)*k1),c[2]*(1+(tw[2]/mm[2]-1)*k1)]}",
 "if(PT){if(MV2.ok)c=mv2Water(dd,tx,ty);else{const tw=PAST.s(PT.wa,tx*TS,ty*TS),mm=PT.wa.m,k1=.85;c=[c[0]*(1+(tw[0]/mm[0]-1)*k1),c[1]*(1+(tw[1]/mm[1]-1)*k1),c[2]*(1+(tw[2]/mm[2]-1)*k1)]}}")
rep("    if(QL<3&&SWELL.length){","    if(QL<3&&SWELL.length&&!(PASTON&&MV2.ok)){")
rep("    if(QL<3){\n      g.globalAlpha=.5+.5*Math.sin(t*.9);g.drawImage(CAUS_A",
"""    if(QL<3&&PASTON&&MV2.ok){
      g.save();g.beginPath();g.rect(cx0,cy0,sw,sh);g.clip();
      const q0=g.createPattern(MV2.on,'repeat');
      if(q0&&q0.setTransform){q0.setTransform(new DOMMatrix().translate(t*7,t*3).scale(2.4));g.globalAlpha=.95;g.fillStyle=q0;g.fillRect(cx0,cy0,sw,sh)}
      if(QL<2){const q1=g.createPattern(MV2.rf,'repeat');if(q1&&q1.setTransform){q1.setTransform(new DOMMatrix().translate(-t*5,t*6).scale(2.2));g.globalAlpha=.85;g.fillStyle=q1;g.fillRect(cx0,cy0,sw,sh)}}
      g.restore();
    }
    if(QL<3){
      g.globalAlpha=.5+.5*Math.sin(t*.9);g.drawImage(CAUS_A""")
open(P,'w',encoding='utf8').write(src);print('patch75 ok')
