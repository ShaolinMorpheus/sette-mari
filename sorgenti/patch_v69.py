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
tex=open('/home/claude/work/mappa/past_tex2.json').read()
js=r"""var PASTT=false;try{PASTT=localStorage.getItem('sm_past')==='1'}catch(e){}
var PASTX=%s;
var PAST={T:null,PER:600,PER2:340,
  async get(){
    if(this.T)return this.T;
    const T={pc:{}};
    const ld=async(k,N)=>{const img=new Image();img.src='data:image/webp;base64,'+PASTX[k];await new Promise(r=>{img.onload=r;img.onerror=r});const c=document.createElement('canvas');c.width=c.height=N;c.getContext('2d').drawImage(img,0,0,N,N);return c};
    const wc=await ld('wa',768),d=wc.getContext('2d').getImageData(0,0,768,768).data;let a=0,b=0,g=0;for(let i=0;i<d.length;i+=4){a+=d[i];b+=d[i+1];g+=d[i+2]}
    const n=d.length/4;T.wa={d:d,m:[a/n,b/n,g/n]};
    for(const k of['g2','s2','t2'])T.pc[k]=await ld(k,512);
    this.T=T;return T;
  },
  s(t,wx,wy){
    const N=768,u=((wx/this.PER)%%1+1)%%1*N,v=((wy/this.PER)%%1+1)%%1*N,x0=Math.floor(u),y0=Math.floor(v),fx=u-x0,fy=v-y0,x1=(x0+1)%%N,y1=(y0+1)%%N,d=t.d;
    const a=(y0*N+x0)*4,b=(y0*N+x1)*4,c=(y1*N+x0)*4,e=(y1*N+x1)*4,w0=(1-fx)*(1-fy),w1=fx*(1-fy),w2=(1-fx)*fy,w3=fx*fy;
    return[d[a]*w0+d[b]*w1+d[c]*w2+d[e]*w3,d[a+1]*w0+d[b+1]*w1+d[c+1]*w2+d[e+1]*w3,d[a+2]*w0+d[b+2]*w1+d[c+2]*w2+d[e+2]*w3];
  }};
/* terra a strati: pesi erba/terra + colore di tinta (ombre, bosco, riva bagnata); le texture vere si stendono poi a piena risoluzione */
function landMaskP(e,tx,ty,sh){
  const s=e-WL,n1=NZ.fbm(tx*1.9,ty*1.9,2);
  const wet=1-sstep(0,.075,s);
  const gT=sstep(.17,.27,s+(n1-.5)*.16),inl=sstep(.3,.7,s),fF=forestF(tx,ty);
  const dp=pathDist(tx,ty),dc=hyp(tx-C0.x,(ty-C0.y)*1.15)+(n1-.5)*2.2;
  const dirtF=Math.max(sstep(.9,.34,dp)*.85,sstep(5.6,3.0,dc)*.9);
  const wd=dirtF>0?dirtF*(.5+.5*gT):0;
  const dpo=hyp((tx-POND.x)/POND.rx,(ty-POND.y)/POND.ry);
  const pw=dpo<2.2?(1-sstep(1.1,2.2,dpo))*.4*gT:0;
  const m=.78+.22*clamp((sh-.72)/.54,0,1);
  const fo=clamp(inl*.25+fF*.4,0,1)*gT,wt=wet*(1-gT);
  const r=m*(1-.4*fo-.2*wt-.35*pw),g=m*(1-.18*fo-.25*wt-.1*pw),b=m*(1-.3*fo-.32*wt-.25*pw);
  return[gT,wd,r,g,b];
}
""" % tex
rep("async function bakeGround(prog){\n  const RES=.4,fw=Math.round(WW*RES),fh=Math.round(WH*RES);","var PASTON=false;\nasync function bakeGround(prog){\n  const RES=.4,fw=Math.round(WW*RES),fh=Math.round(WH*RES);\n  const PT=PASTT?await PAST.get():null;PASTON=!!PT;")
rep("  const [dW,dL,dFa,dFb,dCa,dCb]=D;\n","  const [dW,dL,dFa,dFb,dCa,dCb]=D;\n  let PC=null,dG,dD,dT,dA;if(PT){PC=[0,0,0,0].map(()=>mkc(fw,fh));const q=PC.map(c=>c.getContext('2d').createImageData(fw,fh));PC.id=q;[dG,dD,dT,dA]=q.map(i=>i.data)}\n")
rep("        let c=waterRGB(dd);\n","        let c=waterRGB(dd);\n        if(PT){const tw=PAST.s(PT.wa,tx*TS,ty*TS),mm=PT.wa.m,k1=.85;c=[c[0]*(1+(tw[0]/mm[0]-1)*k1),c[1]*(1+(tw[1]/mm[1]-1)*k1),c[2]*(1+(tw[2]/mm[2]-1)*k1)]}\n")
rep("const kk=(n-.5)*26*(1-dd*.55);","const kk=(n-.5)*(PT?8:26)*(1-dd*.55);")
rep("        const lc=e>WL?landRGB(e,tx,ty,sh):[190,168,120];\n        dL[o]=lc[0];dL[o+1]=lc[1];dL[o+2]=lc[2];dL[o+3]=255*sstep(WL-.008,WL+.012,e);",
"""        if(PT){const q=e>WL?landMaskP(e,tx,ty,sh):[0,0,.8,.75,.7];dG[o+3]=q[0]*255;dD[o+3]=q[1]*255;dT[o]=q[2]*255;dT[o+1]=q[3]*255;dT[o+2]=q[4]*255;dT[o+3]=255;dA[o+3]=255*sstep(WL-.008,WL+.012,e)}
        else{const lc=e>WL?landRGB(e,tx,ty,sh):[190,168,120];
        dL[o]=lc[0];dL[o+1]=lc[1];dL[o+2]=lc[2];dL[o+3]=255*sstep(WL-.008,WL+.012,e)}""")
rep("  LANDC=sm(cLand,gw1,gh1);\n  bakeDecor(","""  if(PT){
    PC.forEach((c,i)=>c.getContext('2d').putImageData(PC.id[i],0,0));
    const [cG,cD,cT,cA]=PC;
    LANDC=mkc(gw1,gh1);const gF=LANDC.getContext('2d');gF.imageSmoothingEnabled=true;gF.imageSmoothingQuality='high';
    const tmp=mkc(gw1,gh1),gt=tmp.getContext('2d');gt.imageSmoothingEnabled=true;gt.imageSmoothingQuality='high';
    const pat=(g,k)=>{const p=g.createPattern(PT.pc[k],'repeat');p.setTransform(new DOMMatrix().scale(PAST.PER2*GS/512));g.fillStyle=p;g.fillRect(0,0,gw1,gh1)};
    pat(gF,'s2');
    for(const[k,m]of[['g2',cG],['t2',cD]]){gt.globalCompositeOperation='source-over';gt.clearRect(0,0,gw1,gh1);pat(gt,k);gt.globalCompositeOperation='destination-in';gt.drawImage(m,0,0,gw1,gh1);gF.drawImage(tmp,0,0)}
    gF.globalCompositeOperation='multiply';gF.drawImage(cT,0,0,gw1,gh1);
    gF.globalCompositeOperation='destination-in';gF.drawImage(cA,0,0,gw1,gh1);gF.globalCompositeOperation='source-over';
    tmp.width=tmp.height=1;
  }else LANDC=sm(cLand,gw1,gh1);
  bakeDecor(""")
rep("const nT2=dirtZ>.8?0:Math.round(nT*1.8*(1-dirtZ));","const nT2=dirtZ>.8?0:Math.round(nT*1.8*(1-dirtZ)*(PASTON?.3:1));")
rep("/* ---- 12d_kb.js ---- */",js+"/* ---- 12d_kb.js ---- */")
rep("+T('mRigT','🧍','Grafica personaggio prova',RIGT?'accesa':'spenta','tgl'+(RIGT?' on':''))","+T('mRigT','🧍','Grafica personaggio prova',RIGT?'accesa':'spenta','tgl'+(RIGT?' on':''))+T('mPastT','🎨','Mappa di prova',PASTT?'accesa':'spenta','tgl'+(PASTT?' on':''))")
rep("{const rb=c.querySelector('#mRigT');","{const pb=c.querySelector('#mPastT');if(pb)pb.onclick=()=>{try{localStorage.setItem('sm_past',PASTT?'0':'1')}catch(e){}try{saveGame(true)}catch(e){}location.reload()}}\n  {const rb=c.querySelector('#mRigT');")
rep('Giacca rossa del Capitano ridisegnata da Muse: camminata, torcia accesa, ascia e piccone.','Giacca rossa del Capitano ridisegnata da Muse: camminata, torcia accesa, ascia e piccone. Menu → Partita → «Mappa di prova» (facoltativa): terra, sabbia, erba e acqua con le texture ad acquerello di Muse, mare con riva che avanza e si ritira.')
open(P,'w',encoding='utf8').write(src);print('patch69 ok')
