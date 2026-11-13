import cv2,numpy as np,os,sys
from PIL import Image
from reg import *
from scipy import ndimage as ndi
os.makedirs('layers',exist_ok=True);os.makedirs('prev',exist_ok=True)
NAMES={(0,0):'logoro',(0,1):'piumabianca',(1,0):'h_corona',(1,2):'h_lupo',(2,0):'h_tri',(2,1):'cuoio',(2,2):'blumerletto',(2,3):'bandanarighe',
 (3,0):'bandananera',(3,1):'cappellopiuma',(3,2):'morionescuro',(4,0):'h_cuoco',(4,1):'h_cremisi',(4,3):'h_elmo',(5,0):'h_conch',(5,1):'h_piume',(5,3):'h_occh',(6,0):'h_comm',(6,1):'h_minat'}
YL={'f':235,'s':225,'b':330}
def ylim(k,shape):
    H,W=shape;yy,xx=np.mgrid[0:H,0:W]
    if k=='f': return np.where(np.abs(xx-260)<115,YL['f'],370)
    if k=='s': return np.where(xx<300,370,YL['s'])  # lato sinistro = nuca: scende di piu
    return np.full((H,W),YL['b'])
def dist(a,b):return np.sqrt(((a.astype(float)-b.astype(float))**2).sum(2))
def hatmask(w,k):
    r=refrgb(k);A=REF[k][:,:,3]/255.
    fg=dist(w,BG)>26
    df=dist(w,r)
    m=fg&((A<.5)|(df>62))
    yy=ylim(k,m.shape);Y=np.mgrid[0:m.shape[0],0:m.shape[1]][0]
    m&=(Y<yy)
    m=ndi.binary_opening(m,iterations=1)
    m=ndi.binary_closing(m,iterations=4)
    m=ndi.binary_fill_holes(m)
    lab,n=ndi.label(m)
    if n:
        sz=ndi.sum(m,lab,range(1,n+1));keep=np.zeros(n+1,bool);keep[1:]=sz>=max(400,sz.max()*.04);m=keep[lab]
    return m
if __name__=='__main__':
    for si,r,k,cell in cells():
        nm=NAMES.get((si,r))
        if not nm:continue
        M,n=register(cell,k)
        w=cv2.warpAffine(cell,M,(REF[k].shape[1],REF[k].shape[0]),flags=cv2.INTER_CUBIC,borderValue=tuple(BG))
        m=hatmask(w,k)
        al=ndi.gaussian_filter(m.astype(float),1.0);al=np.clip((al-.3)/.5,0,1)
        rgba=np.dstack([w,(al*255).astype(np.uint8)]);Image.fromarray(rgba).save('layers/%s_%s.png'%(nm,k))
        # preview: testa + cappello
        base=Image.fromarray(refrgb(k)).convert('RGBA');base.alpha_composite(Image.fromarray(rgba));base.convert('RGB').save('prev/%s_%s.png'%(nm,k))
    # contact sheets
    names=sorted(set(NAMES.values()))
    for i in range(0,len(names),5):
        chunk=names[i:i+5];sh=Image.new('RGB',(3*400,len(chunk)*390),(250,243,234))
        for r,nm in enumerate(chunk):
            for c,k in enumerate('fsb'):
                im=Image.open('prev/%s_%s.png'%(nm,k)).resize((400,385));sh.paste(im,(c*400,r*390))
        sh.save('sheet_%d.png'%(i//5))
    print(names)
