#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH69 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
tex=open('/home/claude/work/mappa/past_tex.json').read()
js=r"""var PASTT=false;try{PASTT=localStorage.getItem('sm_past')==='1'}catch(e){}
var PASTX=%s;
var PAST={T:null,PER:600,
  async get(){
    if(this.T)return this.T;
    const T={};
    for(const k of ['gr','sa','te','wa']){
      const img=new Image();img.src='data:image/webp;base64,'+PASTX[k];
      await new Promise(r=>{img.onload=r;img.onerror=r});
      const c=document.createElement('canvas');c.width=c.height=768;const q=c.getContext('2d');q.drawImage(img,0,0,768,768);
      const d=q.getImageData(0,0,768,768).data;let a=0,b=0,g=0;for(let i=0;i<d.length;i+=4){a+=d[i];b+=d[i+1];g+=d[i+2]}
      const n=d.length/4;T[k]={d:d,m:[a/n,b/n,g/n]};
    }
    this.T=T;return T;
  },
  s(t,wx,wy){
    const N=768,u=((wx/this.PER)%%1+1)%%1*N,v=((wy/this.PER)%%1+1)%%1*N,x0=Math.floor(u),y0=Math.floor(v),fx=u-x0,fy=v-y0,x1=(x0+1)%%N,y1=(y0+1)%%N,d=t.d;
    const a=(y0*N+x0)*4,b=(y0*N+x1)*4,c=(y1*N+x0)*4,e=(y1*N+x1)*4,w0=(1-fx)*(1-fy),w1=fx*(1-fy),w2=(1-fx)*fy,w3=fx*fy;
    return[d[a]*w0+d[b]*w1+d[c]*w2+d[e]*w3,d[a+1]*w0+d[b+1]*w1+d[c+1]*w2+d[e+1]*w3,d[a+2]*w0+d[b+2]*w1+d[c+2]*w2+d[e+2]*w3];
  }};
function landRGBP(T,e,tx,ty,sh){
  const s=e-WL,n1=NZ.fbm(tx*1.9,ty*1.9,2),wx=tx*TS,wy=ty*TS;
  const wet=1-sstep(0,.075,s);
  const sand=mixc(PAST.s(T.sa,wx,wy),[150,118,72],wet*.5);
  const gT=sstep(.17,.27,s+(n1-.5)*.16),inl=sstep(.3,.7,s),fF=forestF(tx,ty);
  const gr=mixc(PAST.s(T.gr,wx,wy),[26,78,40],inl*.25+fF*.4);
  let c=mixc(sand,gr,gT);
  const dp=pathDist(tx,ty),dc=hyp(tx-C0.x,(ty-C0.y)*1.15)+(n1-.5)*2.2;
  const dirtF=Math.max(sstep(.9,.34,dp)*.85,sstep(5.6,3.0,dc)*.9);
  if(dirtF>0)c=mixc(c,PAST.s(T.te,wx,wy),dirtF*(.5+.5*gT));
  const dpo=hyp((tx-POND.x)/POND.rx,(ty-POND.y)/POND.ry);
  if(dpo<2.2)c=mixc(c,[44,110,70],(1-sstep(1.1,2.2,dpo))*.4*gT);
  const m=1+(sh-1)*.55;
  return[c[0]*m,c[1]*m,c[2]*m];
}
""" % tex
rep("function bakeGround(prog){","function bakeGround(prog){") if False else None
rep("async function bakeGround(prog){\n  const RES=.4,fw=Math.round(WW*RES),fh=Math.round(WH*RES);","var PASTON=false;\nasync function bakeGround(prog){\n  const RES=.4,fw=Math.round(WW*RES),fh=Math.round(WH*RES);\n  const PT=PASTT?await PAST.get():null;PASTON=!!PT;")
rep("        let c=waterRGB(dd);\n","        let c=waterRGB(dd);\n        if(PT){const tw=PAST.s(PT.wa,tx*TS,ty*TS),mm=PT.wa.m,k1=.85;c=[c[0]*(1+(tw[0]/mm[0]-1)*k1),c[1]*(1+(tw[1]/mm[1]-1)*k1),c[2]*(1+(tw[2]/mm[2]-1)*k1)]}\n")
rep("const kk=(n-.5)*26*(1-dd*.55);","const kk=(n-.5)*(PT?8:26)*(1-dd*.55);")
rep("const lc=e>WL?landRGB(e,tx,ty,sh):[190,168,120];","const lc=e>WL?(PT?landRGBP(PT,e,tx,ty,sh):landRGB(e,tx,ty,sh)):[190,168,120];")
rep("const nT2=dirtZ>.8?0:Math.round(nT*1.8*(1-dirtZ));","const nT2=dirtZ>.8?0:Math.round(nT*1.8*(1-dirtZ)*(PASTON?.3:1));")
rep("/* ---- 12d_kb.js ---- */",js+"/* ---- 12d_kb.js ---- */")
rep("+T('mRigT','🧍','Grafica personaggio prova',RIGT?'accesa':'spenta','tgl'+(RIGT?' on':''))","+T('mRigT','🧍','Grafica personaggio prova',RIGT?'accesa':'spenta','tgl'+(RIGT?' on':''))+T('mPastT','🎨','Mappa di prova',PASTT?'accesa':'spenta','tgl'+(PASTT?' on':''))")
rep("{const rb=c.querySelector('#mRigT');","{const pb=c.querySelector('#mPastT');if(pb)pb.onclick=()=>{try{localStorage.setItem('sm_past',PASTT?'0':'1')}catch(e){}try{saveGame(true)}catch(e){}location.reload()}}\n  {const rb=c.querySelector('#mRigT');")
rep('Giacca rossa del Capitano ridisegnata da Muse: camminata, torcia accesa, ascia e piccone.','Giacca rossa del Capitano ridisegnata da Muse: camminata, torcia accesa, ascia e piccone. Menu → Partita → «Mappa di prova» (facoltativa): terra, sabbia, erba e acqua con le nuove texture ad acquerello di Muse.')
open(P,'w',encoding='utf8').write(src);print('patch69 ok')
