import numpy as np, glob, os
from PIL import Image
from scipy import ndimage as ndi
import matplotlib.colors as mc
BG=np.array([203,228,172])
BLUE=np.array([34,62,128]);WHITE=np.array([238,240,244])
def recol(src):
    im=np.array(Image.open(src).convert('RGB')).astype(float)
    h=mc.rgb_to_hsv(im/255)
    bg=(np.abs(im-BG).sum(2)<40)
    hue=h[...,0]*360;s=h[...,1];v=h[...,2]
    red=(~bg)&((hue<10)|(hue>340))&(s>.38)&(v>.28)
    red=ndi.binary_opening(red,iterations=1)
    red=ndi.binary_closing(red,iterations=2)
    # drop small components (lips, flame bits): keep comps with area>400
    lab,n=ndi.label(red);sz=ndi.sum(red,lab,range(1,n+1))
    keep=np.isin(lab,[i+1 for i,z in enumerate(sz) if z>400])
    keep=ndi.binary_dilation(keep,iterations=1)&(~bg)&(s>.15)
    belt=(~bg)&(v<.26)
    belt=ndi.binary_opening(belt,iterations=1)
    nearbelt=ndi.binary_dilation(belt,iterations=7)
    gold=(~bg)&(hue>35)&(hue<60)&(s>.45)&(v>.55)&(~nearbelt)
    keep=keep|(gold&ndi.binary_dilation(keep,iterations=4))
    filled=ndi.binary_fill_holes(keep)
    holes=filled&~keep
    lab,n=ndi.label(holes)
    if n:
        sz=ndi.sum(holes,lab,range(1,n+1))
        small=np.isin(lab,[i+1 for i,z in enumerate(sz) if z<2500])&(~nearbelt)
        keep=keep|small
    keep&=~belt
    return im,keep
def stripes(im,keep,y0):
    H,W=keep.shape;yy=np.arange(H)[:,None]*np.ones((1,W))
    band=(((yy-y0)//7)%2==0)
    lum=(im.max(2)/255)
    shade=np.clip(0.55+0.75*(lum/ max(lum[keep].mean(),1e-3)) *0.6,0.55,1.15)[...,None]
    col=np.where(band[...,None],BLUE,WHITE)*shade
    out=im.copy();out[keep]=np.clip(col[keep],0,255);return out
def run(src,dst):
    im,keep=recol(src)
    if 'torcia-fronte-passo4' in src: keep[:178]=0
    ys=np.where(keep.any(1))[0];y0=ys.min() if len(ys) else 0
    out=stripes(im,keep,y0)
    Image.fromarray(out.astype('uint8')).save(dst);return keep.sum()
if __name__=='__main__':
    os.makedirs('rec',exist_ok=True)
    ks=['profilo-destro-passo2','profilo-sinistro-passo2','fronte-passo2','spalle-passo1','torcia-fronte-passo2','torcia-profilo-destro-passo2']
    s=Image.new('RGB',(336*6,376*2))
    for i,k in enumerate(ks):
        p='cap55d/01-capitano-rosso_%s.png'%k;print(k,run(p,'rec/%s.png'%k))
        s.paste(Image.open(p).convert('RGB'),(i*336,0));s.paste(Image.open('rec/%s.png'%k),(i*336,376))
    s.save('rec/test.png')
