import sys
from PIL import Image
import numpy as np, json, base64, io
from scipy import ndimage as ndi
from scipy.ndimage import median_filter, uniform_filter1d
DM=float(sys.argv[1]) if len(sys.argv)>1 else 62
src='/tmp/be/cala/'
names={'s1':('sirena-cala-relitto','wreck2'),'s2':('sirena-cala-riparazione','shipMid'),'s3':('sirena-cala-riparata','shipFix')}
OUT={}
for k,(n,sp) in names.items():
    im=Image.open(src+n+'.png').convert('RGBA');a=np.array(im).astype(int)
    A=a[:,:,3]>128;R,G,B=a[:,:,0],a[:,:,1],a[:,:,2]
    spread=a[:,:,:3].max(2)-a[:,:,:3].min(2)
    sand=(R>195)&(G>185)&(B>150)&(spread<70)
    H=ndi.binary_opening(A&~sand,structure=np.ones((21,21)))
    lab,nl=ndi.label(H);sizes=ndi.sum(H,lab,range(1,nl+1))
    keep=np.isin(lab,[i+1 for i,s in enumerate(sizes) if s>20000])
    cols=np.where(keep.any(0))[0];x0,x1=int(cols.min()),int(cols.max());xs=np.arange(x0,x1+1)
    bot=np.array([np.where(keep[:,x])[0].max() if keep[:,x].any() else np.nan for x in xs],float)
    top=np.array([np.where(keep[:,x])[0].min() if keep[:,x].any() else np.nan for x in xs],float)
    ok=~np.isnan(bot);bot=np.interp(xs,xs[ok],bot[ok]);top=np.interp(xs,xs[ok],top[ok])
    bot=uniform_filter1d(median_filter(bot,size=31,mode='nearest'),size=41,mode='nearest')
    top=median_filter(top,size=161,mode='nearest')
    L=x1-x0;taper=np.clip(np.minimum(xs-x0,x1-xs)/(0.16*L),0,1)
    line=bot-DM*taper**1.3
    arr=np.array(im);alpha=arr[:,:,3].astype(float)
    full=np.full(1720,-9999.0);full[x0:x1+1]=line;yy=np.arange(1320)[:,None];xx=np.arange(1720)[None,:]
    alpha*=np.clip((full[None,:]-yy)/10.0,0,1)
    alpha=np.where((xx<x0-3)|(xx>x1+3),0,alpha)
    arr[:,:,3]=alpha.astype(np.uint8)
    a2=arr.astype(int);R,G,B=a2[:,:,0],a2[:,:,1],a2[:,:,2]
    sand2=(R>185)&(G>175)&(B>140)&((a2[:,:,:3].max(2)-a2[:,:,:3].min(2))<75)
    ends=(xx<x0+.2*L)|(xx>x1-.2*L)
    m=ndi.binary_dilation(sand2&(yy>full[None,:]-120),iterations=3)&(yy>full[None,:]-130)&ends
    arr[:,:,3]=np.where(m,0,arr[:,:,3])
    img=Image.fromarray(arr).resize((860,660),Image.LANCZOS)
    b=io.BytesIO();img.save(b,'WEBP',quality=88,method=6)
    open(f'/home/claude/work/nav_{k}.b64','w').write(base64.b64encode(b.getvalue()).decode())
    bl=[[round(float(x)/4,1),round(float(line[x-x0])/4,1)] for x in range(x0,x1+1,20)]+[[round(x1/4,1),round(float(line[-1])/4,1)]]
    tl=[[round(float(x)/4,1),round(float(top[x-x0])/4,1)] for x in range(x0,x1+1,20)]+[[round(x1/4,1),round(float(top[-1])/4,1)]]
    tm=float(np.mean([p[1] for p in tl]));bm=float(np.mean([p[1] for p in bl]))
    OUT[sp]={'b':bl,'t':tl,'x0':round(x0/4,1),'x1':round(x1/4,1),'ring':[round((x0+x1)/8,1),round((tm+bm)/2,1),round(L/8*1.06,1),round((bm-tm)*.31+8,1),-0.06]}
json.dump(OUT,open('/home/claude/work/nvd.json','w'),separators=(',',':'));print('ok',DM)
