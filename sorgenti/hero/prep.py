import numpy as np,cv2,json,base64,io
from PIL import Image,ImageDraw
U={'front':'0eb2fdd6','back':'a049f0d2','stand':'44de03e1','wA':'c89e3c30','wB':'bf368b02'}
IM={k:Image.open('/mnt/user-data/uploads/%s-image.png'%v).convert('RGBA') for k,v in U.items()}
S=.3
parts={}
def poly_mask(pts):
    m=Image.new('L',(1024,1024),0);ImageDraw.Draw(m).polygon(pts,fill=255);return np.array(m)>0
def region(f):
    yy,xx=np.mgrid[0:1024,0:1024];return f(xx,yy)
def cut(im,mask):
    a=np.array(im).copy();a[~mask]=0;return Image.fromarray(a)
def store(name,im):
    a=np.array(im);al=a[:,:,3]>8
    if not al.any():return
    ys,xs=np.where(al);x0,x1,y0,y1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
    c=im.crop((x0,y0,x1,y1));w=max(1,round((x1-x0)*S));h=max(1,round((y1-y0)*S))
    c=c.resize((w,h),Image.LANCZOS)
    b=io.BytesIO();c.save(b,'WEBP',quality=86,method=6)
    parts[name]={'b':base64.b64encode(b.getvalue()).decode(),'ox':int(x0),'oy':int(y0),'sw':int(x1-x0),'sh':int(y1-y0)}
    c.save('/tmp/part_%s.png'%name)
# FRONT
f=IM['front']
for nm,im,cl,cr,cx in [('f',IM['front'],(lambda y:np.where(y<560,402,372),lambda y:np.where(y<560,622,640)),None,512),('b',IM['back'],(lambda y:np.where(y<560,406,392),lambda y:np.where(y<560,618,645)),None,508)]:
    cL,cR=cl
    L=region(lambda x,y:(y>=250)&(y<650)&(x<cL(y)));R=region(lambda x,y:(y>=250)&(y<650)&(x>cR(y)))
    alpha=np.array(im)[:,:,3]>8
    arm_ok=lambda m: m&alpha
    body=~(L|R)
    up=body&(region(lambda x,y:y<662))
    legs=body&region(lambda x,y:y>=655)
    legL=legs&region(lambda x,y:x<cx);legR=legs&region(lambda x,y:x>=cx)
    store(nm+'_up',cut(im,up));store(nm+'_legL',cut(im,legL));store(nm+'_legR',cut(im,legR))
    store(nm+'_armL',cut(im,L));store(nm+'_armR',cut(im,R))
# SIDE
st=IM['stand']
NA=[(445,262),(480,262),(498,300),(502,400),(506,490),(528,520),(530,585),(548,600),(548,640),(520,655),(485,650),(478,610),(470,595),(432,590),(420,545),(412,480),(412,320)]
pm=poly_mask(NA)
xb=region(lambda x,y:x>np.where(y<500,436,np.where(y<570,430,0)))
fill=pm&xb
alpha=np.array(st)[:,:,3]>8
a=np.array(st)[:,:,:3].copy()
msk=(fill&alpha).astype(np.uint8)*255
inp=cv2.inpaint(cv2.cvtColor(a,cv2.COLOR_RGB2BGR),msk,6,cv2.INPAINT_TELEA);inp=cv2.cvtColor(inp,cv2.COLOR_BGR2RGB)
base=np.array(st).copy();base[:,:,:3]=np.where(msk[...,None]>0,inp,base[:,:,:3])
base[pm&~xb]=0   # fuori dal torso: trasparente
base_im=Image.fromarray(base)
up=region(lambda x,y:y<672)
store('s_up',cut(base_im,up))
store('s_arm',cut(st,pm&alpha))
for nm,im,hc in [('s_legs',IM['stand'],510),('s_legsA',IM['wA'],425),('s_legsB',IM['wB'],465)]:
    store(nm,cut(im,region(lambda x,y:y>=668)))
json.dump(parts,open('parts.json','w'))
print({k:(v['ox'],v['oy'],v['sw'],v['sh'],len(v['b'])) for k,v in parts.items()})
