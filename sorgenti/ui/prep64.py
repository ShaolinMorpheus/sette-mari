import numpy as np
from PIL import Image
from scipy import ndimage as ndi
U='/mnt/user-data/uploads/'
def save(im,n):
    im.save('kit3/%s.png'%n);im.save('kit/%s.webp'%n,'WEBP',quality=90,method=6,exact=True);print(n,im.size)
# ---- dialogo ----
im=Image.open(U+'065cd950-image.png').convert('RGBA');a=np.asarray(im).copy();H,W=a.shape[:2]
rgb=a[:,:,:3].astype(float)
# ovale
ox0,oy0,ox1,oy1=70,45,525,405
crop=a[oy0:oy1,ox0:ox1].copy();c=crop[:,:,:3].astype(float)
cream=np.array([247,232,180.]);d=np.sqrt(((c-np.median(a[100:300,900:1500,:3].reshape(-1,3),axis=0))**2).sum(2))
light=d<28
lab,n=ndi.label(light)
h,w=light.shape
outside=np.isin(lab,list(set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}))
hole=lab==lab[h//2,w//2]
alpha=np.where(outside|hole,0,255).astype(np.uint8)
alpha=ndi.binary_opening(alpha>0,iterations=1);L2,n2=ndi.label(alpha);sz=ndi.sum(alpha,L2,range(1,n2+1));alpha=L2==(1+int(np.argmax(sz)))
al=ndi.gaussian_filter(alpha.astype(float),.7)
crop[:,:,3]=(np.clip((al-.4)/.4,0,1)*255).astype(np.uint8)
oval=Image.fromarray(crop,'RGBA');bb=oval.getbbox();oval=oval.crop(bb);print('oval bbox',bb)
save(oval,'dlg_oval')
# targhetta nome
nx0,ny0,nx1,ny1=528,58,856,128
nm=Image.fromarray(a[ny0:ny1,nx0:nx1].copy(),'RGBA')
# trasparente fuori dal rettangolo arrotondato: tutto cio' che e' crema-chiaro collegato ai bordi
c=np.asarray(nm).astype(float)[:,:,:3];d=np.sqrt(((c-np.median(a[100:300,900:1500,:3].reshape(-1,3),axis=0))**2).sum(2));lt=d<28
lab,n=ndi.label(lt);hh,ww=lt.shape
out=np.isin(lab,list(set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}))
al=ndi.gaussian_filter((~out).astype(float),.7);arr=np.asarray(nm).copy();arr[:,:,3]=(np.clip((al-.4)/.4,0,1)*255).astype(np.uint8)
nm=Image.fromarray(arr,'RGBA');nm=nm.crop(nm.getbbox());save(nm,'dlg_name')
# cornice senza ovale, targhetta e freccia: riempie con la riga mediana della zona libera
fr=a.copy()
ref=a[:,1000:1500,:]
for y in range(H):
    row=np.median(ref[y,:,:3].astype(float),axis=0)
    for (x0,x1,y0,y1) in [(72,528,50,404),(526,860,54,132),(1620,1700,350,400)]:
        if y0<=y<y1: fr[y,x0:x1,:3]=row.astype(np.uint8)
frame=Image.fromarray(fr,'RGBA');frame=frame.crop(frame.getbbox());save(frame,'dlg_frame')
# ---- altri pezzi: ritaglio con bordo trasparente ----
for src,n in [('8fcba144','ribbon2'),('16238b58','plate_dark'),('5172ef8a','plate_parch')]:
    i=Image.open(U+src+'-image.png').convert('RGBA');i=i.crop(i.getbbox());save(i,n)
i=Image.open(U+'a6b6ad10-image.png').convert('RGBA');a2=np.asarray(i)
al=a2[:,:,3]>40;lab,n=ndi.label(ndi.binary_dilation(al,iterations=4));ob=ndi.find_objects(lab)
ob=sorted(ob,key=lambda s:-(s[0].stop-s[0].start)*(s[1].stop-s[1].start))
for s,nm_ in zip(ob[:2],['plate_big','plate_small']):
    c=i.crop((s[1].start,s[0].start,s[1].stop,s[0].stop));c=c.crop(c.getbbox());save(c,nm_)
