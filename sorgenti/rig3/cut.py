from PIL import Image;import numpy as np, json
from scipy import ndimage as ndi
im=Image.open('/mnt/user-data/uploads/91fc0cbe-image.png').convert('RGB')
a=np.asarray(im).astype(int)
bg=(a.min(2)>238)
fg=~bg
fg=ndi.binary_opening(fg,iterations=1)
lab,n=ndi.label(ndi.binary_dilation(fg,iterations=3))
objs=ndi.find_objects(lab)
names={1:'testa',8:'busto',7:'braccio-sup',6:'braccio-sup-lontano',15:'bacino',14:'avambraccio',13:'avambraccio-lontano',21:'gamba-s',19:'coscia',20:'coscia-lontano',24:'piede',23:'stinco',22:'stinco-lontano'}
fr={9:'fr-1',10:'fr-2',11:'fr-3',12:'fr-4'}
# righe: fronte (2,3,4,5), retro (9..12), fermo (16,17,18)
names.update({2:'fr-1',3:'fr-2',4:'fr-3',5:'fr-4',9:'bk-1',10:'bk-2',11:'bk-3',12:'bk-4',16:'st-f',17:'st-b',18:'st-s'})
out={}
for i,s in enumerate(objs):
    k=i+1
    if k not in names: continue
    y0,y1,x0,x1=s[0].start,s[0].stop,s[1].start,s[1].stop
    # maschera: sfondo bianco connesso ai bordi del ritaglio -> trasparente
    c=a[y0-3:y1+3,x0-3:x1+3]
    white=(c.min(2)>232)
    L,m=ndi.label(white)
    edge=set(np.unique(np.concatenate([L[0],L[-1],L[:,0],L[:,-1]])))-{0}
    outside=np.isin(L,list(edge))
    al=(~outside).astype(float);al=ndi.gaussian_filter(al,.6);al=np.clip((al-.35)/.4,0,1)
    rgba=np.dstack([c,(al*255).astype(int)]).astype('uint8')
    p=Image.fromarray(rgba,'RGBA');p=p.crop(p.getbbox());p.save('p_%s.png'%names[k]);out[names[k]]=p.size
print(out)
