from PIL import Image
import numpy as np
from scipy import ndimage as ndi
im=Image.open('/mnt/user-data/uploads/53e645b7-image.png').convert('RGBA')
a=np.array(im).astype(int)
R,G,B,A=[a[...,i] for i in range(4)]
mx=np.maximum(np.maximum(R,G),B);mn=np.minimum(np.minimum(R,G),B)
core=(A>40)&(R>215)&((mx-mn)>140)
cream=(A>40)&(R>225)&(G>170)&(B>90)&(B<220)
Y=np.arange(1024)[:,None]*np.ones((1,1024))
X=np.arange(1024)[None,:]*np.ones((1024,1))
reg=ndi.binary_fill_holes(ndi.binary_closing(ndi.binary_dilation(core,iterations=3),iterations=6))
seed=core|(cream&reg)
bark=(R<=215)&(G>=60)&(R>=90)
dark=(R<75)&(G<75)&(B<75)
prot=(bark|dark)&~core&(A>40)
lab,n=ndi.label(prot,structure=np.ones((3,3)))
sz=ndi.sum(prot,lab,range(1,n+1))
big=np.isin(lab,[i+1 for i,s in enumerate(sz) if s>700])
big=ndi.binary_dilation(big,iterations=1)
flame=ndi.binary_dilation(seed,iterations=6)&~big&(A>40)&(Y<780)
flame=ndi.binary_closing(flame,iterations=2)&(A>40)&~big
al=(A>40)&~flame
lab2,n2=ndi.label(al,structure=np.ones((3,3)))
sz2=ndi.sum(al,lab2,range(1,n2+1));cy=ndi.center_of_mass(al,lab2,range(1,n2+1))
sm=[i+1 for i,(z,c) in enumerate(zip(sz2,cy)) if z<2500 and c[0]<640]
flame=flame|np.isin(lab2,sm)
# pezzi minuscoli staccati: tienili come parte della fiamma (scintille) -> già inclusi
base=a.copy().astype('uint8');base[flame]=[0,0,0,0]
fl=a.copy().astype('uint8');fl[~flame]=[0,0,0,0]
dist,(iy,ix)=ndi.distance_transform_edt(~flame,return_indices=True)
ext=(~flame)&(A>40)&(dist<90)&(Y>470)&(Y<800)&(X>270)&(X<790)
fl2=fl.copy()
fl2[ext]=np.concatenate([a[iy[ext],ix[ext]][:,:3],np.full((ext.sum(),1),255)],axis=1).astype('uint8')
Image.fromarray(base,'RGBA').save('base_nofire.png')
Image.fromarray(fl2,'RGBA').save('flame_only.png')
def comp(n):
    c=Image.new('RGBA',(1024,1024),(40,60,40,255));c.alpha_composite(Image.fromarray(fl2,'RGBA'));c.alpha_composite(Image.fromarray(base,'RGBA'));c.crop((40,200,990,1030)).resize((712,622)).save(n)
comp('pv_comp.png')
b=Image.new('RGBA',(1024,1024),(40,60,40,255));b.alpha_composite(Image.fromarray(base,'RGBA'));b.crop((200,200,850,800)).save('pv_base.png')
