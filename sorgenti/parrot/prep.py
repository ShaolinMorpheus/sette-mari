import numpy as np, glob, sys
from PIL import Image
from scipy import ndimage as ndi
U='/mnt/user-data/uploads/'
def L(p): return Image.open(glob.glob(U+p+'*')[0]).convert('RGBA')
base=L('61f9a97c'); sh1=L('6d63c74e'); crown=L('a0c7e57f'); sh2=L('15d39f26'); mono=L('55eb12e6')
BG=np.array([245,238,216],float)
def key(im):
    a=np.array(im).astype(float);rgb=a[...,:3];d=np.sqrt(((rgb-BG)**2).sum(-1))
    bgl=d<22
    lab,n=ndi.label(bgl);edge=set(np.unique(np.concatenate([lab[0],lab[-1],lab[:,0],lab[:,-1]])))-{0}
    bg=np.isin(lab,list(edge))
    fg=~bg
    fg=ndi.binary_opening(fg,iterations=1)
    lab2,n2=ndi.label(fg);sz=ndi.sum(fg,lab2,range(1,n2+1));keep=np.zeros(n2+1,bool);keep[1:]=sz>400;fg=keep[lab2]
    fg=ndi.binary_fill_holes(fg)
    al=ndi.gaussian_filter(ndi.binary_erosion(fg,iterations=1).astype(float),.8)
    out=a.copy();out[...,3]=al*255
    return Image.fromarray(out.astype(np.uint8))
def cells(sheet,cols,rows,inset=8):
    W,H=sheet.size;cw,ch=W//cols,H//rows;r=[]
    for j in range(rows):
        for i in range(cols):
            c=sheet.crop((i*cw+inset,j*ch+inset,(i+1)*cw-inset,(j+1)*ch-inset));r.append(key(c))
    return r
def bbox(im,thr=40):
    a=np.array(im)[...,3];ys,xs=np.where(a>thr);return xs.min(),ys.min(),xs.max(),ys.max()
def lowerbox(im,H0,thr=40):
    a=np.array(im)[...,3];ys,xs=np.where(a>thr);ymax=ys.max();m=ys>=ymax-H0
    return xs[m].min(),ymax
c1=cells(sh1,4,3);c2=cells(sh2,4,2)
bb=bbox(base);bc=bbox(c1[0]);s=(bc[2]-bc[0])/(bb[2]-bb[0]);print('scale',s,bb,bc)
H0=0.4*(bb[3]-bb[1])
def place(im,scale):
    # porta l'immagine nel riferimento della base singola (1024)
    if scale!=1:im=im.resize((int(im.width/scale),int(im.height/scale)),Image.LANCZOS)
    lx,ly=lowerbox(im,H0);rx,ry=lowerbox(base,H0)
    dx,dy=rx-lx,ry-ly
    FX0,FY0,FW,FH=60,-120,880,1130
    can=Image.new('RGBA',(FW,FH),(0,0,0,0));can.alpha_composite(im,(0,0)) if False else None
    can.paste(im,(dx-FX0,dy-FY0),im)
    return can
names={}
names['base']=place(base,1);names['monocolo']=place(mono,1);names['corona']=place(crown,1)
for k,i in [('bandana',1),('cuoco',2),('tricorno',4),('paglia',5),('fiore',6),('benda',8),('cilindro',9),('cuffia',10)]:names[k]=place(c1[i],s)
for k,i in [('cocco',0),('vichingo',1),('mago',2),('ghirlanda',3),('babbo',4),('festa',5),('occhiali',6),('elica',7)]:names[k]=place(c2[i],s)
import pickle
for k,v in names.items():v.save(k+'.png')
# montaggio di controllo
ks=list(names);cols=6;rows=(len(ks)+cols-1)//cols;m=Image.new('RGBA',(cols*300,rows*370),(200,230,200,255))
for n,k in enumerate(ks):
    t=names[k].resize((264,339));m.paste(t,((n%cols)*300+18,(n//cols)*370+10),t)
m.convert('RGB').save('check.jpg',quality=85);print(ks)
