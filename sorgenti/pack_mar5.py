import cv2,numpy as np,json,base64,io
from PIL import Image
import matplotlib.colors as mc
J=json.load(open('rig_muse.json'));ANC=J['anc'];S=.55
def get(k):return np.array(Image.open(io.BytesIO(base64.b64decode(J['img'][k]))).convert('RGBA'))
def put(k,A):
    b=io.BytesIO();Image.fromarray(A,'RGBA').save(b,'WEBP',quality=88,method=6);J['img'][k]=base64.b64encode(b.getvalue()).decode()
def lab(rgb):return cv2.cvtColor(rgb.astype(np.uint8)[None],cv2.COLOR_RGB2LAB)[0].astype(np.float32)
def unlab(L):return cv2.cvtColor(np.clip(L,0,255).astype(np.uint8)[None],cv2.COLOR_LAB2RGB)[0]
def feetY(A):ys=np.where((A[...,3]>40).any(1))[0];return ys.max()
def stripe_class(A):
    h=mc.rgb_to_hsv(A[...,:3]/255.);op=A[...,3]>200
    white=(h[...,1]<.28)&(h[...,2]>.62);blue=(h[...,0]>.52)&(h[...,0]<.72)&(h[...,1]>.25)&(h[...,2]<.62)
    return op&(white|blue),white,blue
BELT=92   # px sopra i piedi dove finisce la maglia
def parts(A,view_ref=None):
    fy=feetY(A);yy=np.arange(A.shape[0])[:,None]*np.ones((1,A.shape[1]))
    cls,w,b=stripe_class(A);cls=cls&(yy<fy-BELT)&(yy>fy-330)
    # solo la componente collegata al busto (non la lama dell'ascia)
    m=cv2.morphologyEx(cls.astype(np.uint8),cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
    n,lab_,st,_=cv2.connectedComponentsWithStats(m,connectivity=8)
    keep=np.zeros_like(cls)
    cx=A.shape[1]//2;band=lab_[int(fy-BELT-60):int(fy-BELT-10),int(cx-40):int(cx+40)]
    ids=set(np.unique(band))-{0}
    for i in ids:
        if st[i,4]>400:keep|=lab_==i
    shirt=keep&cls
    pants=(A[...,3]>200)&(yy>=fy-BELT)&(yy<fy-45)&(mc.rgb_to_hsv(A[...,:3]/255.)[...,0]>.5)&(mc.rgb_to_hsv(A[...,:3]/255.)[...,0]<.75)
    return shirt,pants,w,b
def clus(A,shirt,w):
    Lc=lab(A[...,:3][shirt]);Lw=Lc[Lc[:,0]>np.median(Lc[:,0])];Ld=Lc[Lc[:,0]<=np.median(Lc[:,0])];return Lw.mean(0),Ld.mean(0)
REF={}
for v in('fronte','spalle'):
    A=get('mar:%s-fermo'%v);sh,pa,w,b=parts(A);REF[v]=dict(c=clus(A,sh,w),p=(lab(A[...,:3][pa]).mean(0),lab(A[...,:3][pa]).std(0)))
    print(v,sh.sum(),pa.sum(),REF[v]['c'][0].round(),REF[v]['c'][1].round())
names=[k for k in J['img'] if k.startswith('mar:') and k.endswith(('-fronte','-spalle')) and ('taglio' in k or 'colpo' in k)]
RED=np.array([[196,64,58],[150,40,40]],np.float32);capimgs={}
for k in names:
    v='fronte' if k.endswith('fronte') else 'spalle';A=get(k);sh,pa,w,b=parts(A)
    if sh.sum()<300:print('skip',k,sh.sum());continue
    (Wn,Dn)=clus(A,sh,w);(Wr,Dr)=REF[v]['c']
    L=lab(A[...,:3][sh]);t=np.clip((L[:,0]-Dn[0])/max(Wn[0]-Dn[0],1),0,1.15)[:,None]
    newL=Dr+t*(Wr-Dr)+(L-(Dn+t*(Wn-Dn)))*.35   # tiene un po' del dettaglio originale
    A2=A.copy();A2[...,:3][sh]=unlab(newL)
    if pa.sum()>200:
        P=lab(A[...,:3][pa]);mu,sd=REF[v]['p'];P2=(P-P.mean(0))*np.clip(sd/(P.std(0)+1e-3),.7,1.3)+mu;A2[...,:3][pa]=unlab(P2)
    put(k,A2)
    # variante capitano: maglia rossa
    A3=A2.copy();Lr=lab(A2[...,:3][sh])[:,0]
    tt=np.clip((Lr-Dr[0])/max(Wr[0]-Dr[0],1),0,1)[:,None];col=RED[0]*.93+tt*(RED[0]*.07)-8*(1-tt)
    A3[...,:3][sh]=col.astype(np.uint8)
    if pa.sum()>200:A3[...,:3][pa]=(A3[...,:3][pa]*np.array([.62,.68,.8])).astype(np.uint8)
    capimgs['cap:'+k[4:]]=A3
for k,A in capimgs.items():put(k,A);J['hq'][k]=J['hq']['mar:'+k[4:]]
json.dump(J,open('rig_muse.json','w'))
for v in('fronte','spalle'):
    ks=['mar:%s-fermo'%v]+sorted(k for k in J['img'] if k.startswith('mar:') and k.endswith('-'+v) and ('taglio' in k or 'colpo' in k))[:6]+['cap:ascia-taglio4-'+v,'cap:ascia-taglio3-'+v,'cap:piccone-taglio4-'+v]
    Sh=Image.new('RGB',(len(ks)*170,230),(143,191,106))
    for i,k in enumerate(ks):
        a=Image.fromarray(get(k));a=a.resize((170,int(170*a.height/a.width)));Sh.paste(a,(i*170,0),a)
    Sh.save('/home/claude/work/m5_%s.png'%v)
print(len(capimgs))
