import numpy as np
from PIL import Image
from scipy import ndimage as ndi
def wc(im,seed=7,strength=1.0):
    """effetto acquerello/pastello: macchie di pigmento, grana, bordi che si addensano, leggero bleeding"""
    im=im.convert('RGBA');a=np.asarray(im).astype(np.float32)/255.;rgb=a[:,:,:3];al=a[:,:,3]
    h,w=al.shape;rng=np.random.RandomState(seed)
    m=al>.5
    # sfumatura leggera dei colori (bleed) senza toccare i bordi
    sm=np.stack([ndi.gaussian_filter(rgb[:,:,i],1.1) for i in range(3)],-1)
    rgb=rgb*.45+sm*.55
    # macchie di pigmento a bassa frequenza
    n1=ndi.gaussian_filter(rng.randn(h,w),14);n1/=n1.std()+1e-6
    n2=ndi.gaussian_filter(rng.randn(h,w),4);n2/=n2.std()+1e-6
    gr=ndi.gaussian_filter(rng.randn(h,w),.8);gr/=gr.std()+1e-6
    k=(n1*.022+n2*.014+gr*.012)*strength
    rgb=rgb*(1+k[:,:,None])
    # leggero cambio di tonalita' nelle macchie (caldo/freddo)
    rgb[:,:,0]*=1+n1*.012*strength;rgb[:,:,2]*=1-n1*.012*strength
    # addensamento di pigmento ai bordi
    d=ndi.distance_transform_edt(m)
    rim=np.clip(1-d/5.,0,1)*m
    rgb=rgb*(1-rim[:,:,None]*.10*strength)
    # pastello: alza un po' le luci, riduce la saturazione
    rgb=rgb*.98+.015
    # carta: alza minimamente il valore minimo
    rgb=np.clip(rgb,0,1)
    # bordo sfumato: alpha ammorbidita di poco
    al2=np.clip(ndi.gaussian_filter(al,.7)*1.1,0,1)*(al>0.02)
    out=np.dstack([rgb,al2]);return Image.fromarray((out*255).astype(np.uint8),'RGBA')
if __name__=='__main__':
    import sys;glob=__import__('glob')
    for f in sys.argv[1:]:
        wc(Image.open(f)).save(f)
