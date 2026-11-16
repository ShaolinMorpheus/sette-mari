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
BELT=62   # px sopra i piedi dove finisce la maglia
def parts(A,view_ref=None):
    fy=feetY(A);yy=np.arange(A.shape[0])[:,None]*np.ones((1,A.shape[1]))
    cls,w,b=stripe_class(A);hv=mc.rgb_to_hsv(A[...,:3]/255.);dark=(hv[...,2]<.42)&(hv[...,1]<.5)
    bm=(A[...,3]>200)&dark&(yy>fy-128)&(yy<fy-58);rows=np.where(bm.sum(1)>=18)[0]
    bt,bb=(rows.min(),rows.max()) if len(rows) else (fy-105,fy-88)
    BT[0]=bt;BT[1]=bb
    cls=cls&(yy<bt+5)&(yy>fy-330)&~dark
    # solo la componente collegata al busto (non la lama dell'ascia)
    m=cv2.morphologyEx(cls.astype(np.uint8),cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
    n,lab_,st,_=cv2.connectedComponentsWithStats(m,connectivity=8)
    keep=np.zeros_like(cls)
    cx=A.shape[1]//2;band=lab_[int(bt-60):int(bt-8),int(cx-40):int(cx+40)]
    ids=set(np.unique(band))-{0}
    for i in ids:
        if st[i,4]>400:keep|=lab_==i
    shirt=keep&cls
    pants=(A[...,3]>200)&(yy>bb)&(yy<fy-45)&(mc.rgb_to_hsv(A[...,:3]/255.)[...,0]>.5)&(mc.rgb_to_hsv(A[...,:3]/255.)[...,0]<.75)
    return shirt,pants,w,b
def clus(A,shirt,w):
    Lc=lab(A[...,:3][shirt]);Lw=Lc[Lc[:,0]>np.median(Lc[:,0])];Ld=Lc[Lc[:,0]<=np.median(Lc[:,0])];return Lw.mean(0),Ld.mean(0)
REF={};BT=[0,0]
for v in('fronte','spalle'):
    A=get('mar:%s-fermo'%v);sh,pa,w,b=parts(A);REF[v]=dict(c=clus(A,sh,w),p=(lab(A[...,:3][pa]).mean(0),lab(A[...,:3][pa]).std(0)))
    print(v,sh.sum(),pa.sum(),REF[v]['c'][0].round(),REF[v]['c'][1].round())
names=[k for k in J['img'] if k.startswith('mar:') and k.endswith(('-fronte','-spalle')) and ('taglio' in k or 'colpo' in k)]
def bodycx(A,y):
    r=np.where(A[int(y)-3:int(y)+3,:,3].max(0)>200)[0];return (r.min()+r.max())/2.
_C=np.array(Image.open(io.BytesIO(base64.b64decode(J['img']['spalle-fermo']))).convert('RGBA'));_h=mc.rgb_to_hsv(_C[...,:3]/255.)
_t=((_C[...,3]>200)&(_h[...,0]>.07)&(_h[...,0]<.14)&(_h[...,1]>.15)&(_h[...,1]<.6)&(_h[...,2]>.6)).astype(np.uint8)
_n,_l,_st,_=cv2.connectedComponentsWithStats(_t);_i=max(range(1,_n),key=lambda j:_st[j,4] if _st[j,1]>150 else 0)
_x,_y,_w,_hh=_st[_i,:4];PATCH=_C[_y:_y+_hh,_x:_x+_w].copy();PATCH[...,3]=np.where(_l[_y:_y+_hh,_x:_x+_w]==_i,255,0)
_,_,_,_=parts(_C);_bt0=BT[0];PDX=(_x+_w/2.)-bodycx(_C,_bt0-25);PDY=_y-_bt0;print('toppa',PATCH.shape,PDX,PDY)
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
    yy=np.arange(A.shape[0])[:,None]*np.ones((1,A.shape[1]));fy=feetY(A);hv=mc.rgb_to_hsv(A[...,:3]/255.)
    belt=(A[...,3]>200)&(yy>fy-128)&(yy<fy-58)&(hv[...,2]<.45)&(hv[...,1]<.55)
    f=(0.75+0.5*hv[...,2][belt]/.45)[:,None];A2[...,:3][belt]=np.clip(np.array([40,31,33])*f,0,255).astype(np.uint8);sh=sh|belt
    put(k,A2)
    # variante capitano: maglia rossa
    A3=A2.copy();Lr=lab(A2[...,:3][sh])[:,0]
    tt=np.clip((Lr-Dr[0])/max(Wr[0]-Dr[0],1),0,1)[:,None];col=RED[0]*.93+tt*(RED[0]*.07)-8*(1-tt)
    hv2=mc.rgb_to_hsv(A2[...,:3]/255.);d=cv2.dilate((sh&~belt).astype(np.uint8),cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5)))>0
    c2=(A2[...,3]>30)&d&~belt&~((hv2[...,2]<.42)&(hv2[...,1]<.5))&(((hv2[...,1]<.32)&(hv2[...,2]>.45))|((hv2[...,0]>.5)&(hv2[...,0]<.74)&(hv2[...,1]>.12)))
    d2=cv2.dilate((sh&~belt).astype(np.uint8),cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(5,5)))>0
    gr=(A2[...,3]>30)&d2&~belt&(hv2[...,0]>.14)&(hv2[...,0]<.5)&(hv2[...,1]>.04)&(hv2[...,2]>.35)
    c2|=gr
    skin=(A2[...,3]>30)&(hv2[...,0]<.14)&(hv2[...,1]>.09)&(hv2[...,2]>.35)
    yb=np.arange(A2.shape[0])[:,None]*np.ones((1,A2.shape[1]));c2|=(A2[...,3]>30)&d2&~belt&(yb>BT[0]-34)&(yb<BT[0]+8)&~((hv2[...,2]<.42)&(hv2[...,1]<.5))&~skin
    c2&=~cv2.dilate(skin.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)   # non toccare pelle/legno
    c2=cv2.morphologyEx(c2.astype(np.uint8),cv2.MORPH_OPEN,np.ones((2,2),np.uint8))>0
    Lg=hv2[...,2][c2][:,None];A3[...,:3][c2]=np.clip(RED[0]*(0.86+0.2*(Lg-.5)),0,255).astype(np.uint8)
    if pa.sum()>200:A3[...,:3][pa]=(A3[...,:3][pa]*np.array([.62,.68,.8])).astype(np.uint8)
    if v=='spalle':
        parts(A);bt=BT[0];px=int(round(bodycx(A,bt-25)+PDX-PATCH.shape[1]/2.));py=int(bt+PDY)
        reg=A3[py:py+PATCH.shape[0],px:px+PATCH.shape[1]]
        if reg.shape[:2]==PATCH.shape[:2]:
            red=(reg[...,0]>140)&(reg[...,1]<120)&(reg[...,3]>200)&(PATCH[...,3]>0)
            reg[...,:3][red]=PATCH[...,:3][red]
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
