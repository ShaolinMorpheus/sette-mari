import cv2,numpy as np,os,sys,json
from PIL import Image
from scipy import ndimage as ndi
import reg
from reg import REF,refrgb,register,SH
from ext import NAMES,ylim,dist
ML,MT,MR,MB=120,200,120,40
os.makedirs('layers2',exist_ok=True);os.makedirs('prev2',exist_ok=True)
FGT={'h_cuoco':7}
def estbg(cell):
    h,w=cell.shape[:2];p=[cell[:25,:25],cell[:25,-25:],cell[-25:,:25],cell[-25:,-25:]]
    return np.median(np.concatenate([x.reshape(-1,3) for x in p]),axis=0)
def pad_ref(k,bg):
    r=refrgb(k);h,w=r.shape[:2];A=REF[k][:,:,3]/255.
    H=h+MT+MB;W=w+ML+MR
    R=np.empty((H,W,3),np.uint8);R[:]=np.array(bg,np.uint8);Af=np.zeros((H,W))
    R[MT:MT+h,ML:ML+w]=r;Af[MT:MT+h,ML:ML+w]=A
    return R,Af
def hatmask(w,k,nm,bg):
    R,A=pad_ref(k,bg)
    fg=dist(w,bg)>FGT.get(nm,26)
    df=dist(w,R)
    m=fg&((A<.5)|(df>42))
    H,W=m.shape;Y=np.mgrid[0:H,0:W][0];X=np.mgrid[0:H,0:W][1]
    yl=ylim(k,(H-MT-MB,W-ML-MR));yp=np.full((H,W),0);yp[MT:MT+yl.shape[0],ML:ML+yl.shape[1]]=yl
    yp[:MT]=10**4
    # nel margine laterale usa il limite del bordo
    yp[MT:H-MB,:ML]=yp[MT:H-MB,ML:ML+1];yp[MT:H-MB,W-MR:]=yp[MT:H-MB,W-MR-1:W-MR]
    yp[H-MB:]=0
    m&=(Y-MT<yp)
    m=ndi.binary_opening(m,iterations=1)
    m=ndi.binary_closing(m,iterations=6)
    m=ndi.binary_fill_holes(m)
    refm=np.zeros_like(m);refm[MT:MT+500,ML:ML+520]=True
    d=ndi.binary_dilation(m,iterations=8)
    lab,n=ndi.label(d)
    if n:
        ov=np.unique(lab[(A>.5)&m]);ov=ov[ov>0]
        keep=np.isin(lab,ov)&m
        # piume staccate: componenti vicine alla principale
        m=keep
    return m
if __name__=='__main__':
    for si,r,k,cell in reg.cells():
        nm=NAMES.get((si,r))
        if not nm:continue
        bg=estbg(cell)
        M,n=register(cell,k)
        M2=M.copy();M2[0,2]+=ML;M2[1,2]+=MT
        h,w=REF[k].shape[:2]
        wc=cv2.warpAffine(cell,M2,(w+ML+MR,h+MT+MB),flags=cv2.INTER_CUBIC,borderValue=tuple(float(x) for x in bg))
        m=hatmask(wc,k,nm,bg)
        al=ndi.gaussian_filter(m.astype(float),1.0);al=np.clip((al-.3)/.5,0,1)
        rgba=np.dstack([wc,(al*255).astype(np.uint8)]);Image.fromarray(rgba).save('layers2/%s_%s.png'%(nm,k))
        R,A=pad_ref(k,bg);base=Image.fromarray(R).convert('RGBA');ra=np.dstack([R,(A*255).astype(np.uint8)])
        base=Image.new('RGBA',base.size,(250,243,234,255));base.alpha_composite(Image.fromarray(ra));base.alpha_composite(Image.fromarray(rgba))
        base.convert('RGB').save('prev2/%s_%s.png'%(nm,k))
    names=sorted(set(NAMES.values()))
    for i in range(0,len(names),5):
        chunk=names[i:i+5];sh=Image.new('RGB',(3*400,len(chunk)*400),(250,243,234))
        for r,nm in enumerate(chunk):
            for c,k in enumerate('fsb'):
                im=Image.open('prev2/%s_%s.png'%(nm,k));im.thumbnail((400,400));sh.paste(im,(c*400,r*400))
        sh.save('sheet2_%d.png'%(i//5))
