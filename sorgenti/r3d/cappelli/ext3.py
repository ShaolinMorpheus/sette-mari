import cv2,numpy as np,os,sys,json
from PIL import Image
from scipy import ndimage as ndi
import reg
from reg import REF,refrgb,register
from ext import NAMES,dist
from ext2 import ML,MT,MR,MB,FGT,estbg,pad_ref,hatmask
os.makedirs('layers3',exist_ok=True);os.makedirs('prev3',exist_ok=True)
def Rmask(k,H,W):
    yy,xx=np.mgrid[0:H,0:W];y=yy-MT;x=xx-ML
    if k=='f': r=(y<190)|((y<330)&((x<118)|(x>402)))
    elif k=='s': r=((x<272)&(y<430))|(y<195)
    else: r=(y<405)
    r|=(y<0)|(x<0)|(x>=520)
    return r&(y<440)
def disk(r):
    y,x=np.ogrid[-r:r+1,-r:r+1];return x*x+y*y<=r*r
def hairlike(w):
    R,G,B=[w[...,i].astype(float) for i in range(3)]
    return (R>85)&(R<200)&(G>40)&(G<125)&(B>15)&(B<95)&(R-G>32)&(G-B>8)
for si,r,k,cell in reg.cells():
    nm=NAMES.get((si,r))
    if not nm:continue
    bg=estbg(cell);M0,n=register(cell,k);M2=M0.copy();M2[0,2]+=ML;M2[1,2]+=MT
    h,w=REF[k].shape[:2];H,W=h+MT+MB,w+ML+MR
    wc=cv2.warpAffine(cell,M2,(W,H),flags=cv2.INTER_CUBIC,borderValue=tuple(float(x) for x in bg))
    M=hatmask(wc,k,nm,bg)
    Rm=Rmask(k,H,W)
    fg=dist(wc,bg)>FGT.get(nm,26)
    fg=ndi.binary_opening(fg,iterations=1);fg=ndi.binary_fill_holes(ndi.binary_closing(fg,iterations=3))
    lab,nn=ndi.label(fg)
    if nn:
        sz=ndi.sum(fg,lab,range(1,nn+1));keepl=np.zeros(nn+1,bool);keepl[1:]=sz>=sz.max()*.2;fg=keepl[lab]   # solo la testa (non i vicini)
    Rdil=ndi.binary_dilation(Rm,iterations=12)
    U=M|(fg&Rdil)
    # via i ciuffi sottili di capelli
    Hh=hairlike(wc)&U&~M
    Hh=ndi.binary_closing(Hh,structure=disk(3))&U&~M
    op=ndi.binary_opening(Hh,structure=disk(3))
    strands=Hh&~ndi.binary_dilation(op,iterations=1)&~ndi.binary_erosion(U,iterations=7)
    U&=~strands
    U=ndi.binary_opening(U,iterations=1)
    Rs=np.clip(ndi.gaussian_filter(Rm.astype(float),5)*1.0,0,1)
    Ms=np.clip((ndi.gaussian_filter(M.astype(float),1.0)-.3)/.5,0,1)
    Us=np.clip((ndi.gaussian_filter(U.astype(float),1.0)-.3)/.5,0,1)
    al=np.maximum(Ms,Us*np.clip(Rs*3,0,1))
    # dove U (soft) e' zero, niente
    al=np.minimum(al,Us)
    rgba=np.dstack([wc,(al*255).astype(np.uint8)]);Image.fromarray(rgba).save('layers3/%s_%s.png'%(nm,k))
    R_,A=pad_ref(k,bg);E=np.clip(A*Rs,0,1)
    Image.fromarray((E*255).astype(np.uint8)).save('layers3/%s_%s_E.png'%(nm,k))
    # anteprima: la testa senza la parte cancellata + il cappello
    base=Image.new('RGBA',(W,H),(250,243,234,255));head=np.dstack([R_,(A*(1-E)*255).astype(np.uint8)]);base.alpha_composite(Image.fromarray(head));base.alpha_composite(Image.fromarray(rgba));base.convert('RGB').save('prev3/%s_%s.png'%(nm,k))
names=sorted(set(NAMES.values()))
for i in range(0,len(names),5):
    chunk=names[i:i+5];sh=Image.new('RGB',(3*400,len(chunk)*400),(250,243,234))
    for r,nm in enumerate(chunk):
        for c,k in enumerate('fsb'):
            im=Image.open('prev3/%s_%s.png'%(nm,k));im.thumbnail((400,400));sh.paste(im,(c*400,r*400))
    sh.save('sheet3_%d.png'%(i//5))
