import cv2,numpy as np,json,base64,io
from PIL import Image,ImageDraw
import matplotlib.colors as mc
J=json.load(open('rig_muse.json'));ANC=J['anc'];S=.55
def get(k):return np.array(Image.open(io.BytesIO(base64.b64decode(J['img'][k]))).convert('RGBA'))
def hm(A,loose=False):
    h=mc.rgb_to_hsv(A[...,:3]/255.);op=A[...,3]>200
    m=(op&((h[...,0]<.085)|(h[...,0]>.97))&(h[...,1]>.42)&(h[...,2]>.18)&(h[...,2]<.75)).astype(np.uint8)
    ys=np.where(op.any(1))[0];fy=ys.max();m[int(fy-170):]=0;return m
def pts(q):return np.array([[(p[0]+ANC[0])*S,(p[1]+ANC[1])*S] for p in q],np.float32)
PAIRS={'mar:ascia-taglio1-riposo-fronte':'mar:ascia-taglio2-fronte','mar:piccone-taglio1-riposo-fronte':'mar:piccone-taglio2-fronte','mar:ascia-taglio1-riposo-spalle':'mar:ascia-taglio2-spalle','mar:piccone-taglio1-riposo-spalle':'mar:piccone-taglio2-spalle'}
for k,r in PAIRS.items():
    R=get(r);Rm=hm(R);P0=pts(J['hq'][r]);A=get(k);m=hm(A)
    rb=cv2.GaussianBlur(Rm.astype(np.float32),(0,0),3);fb=cv2.GaussianBlur(m.astype(np.float32),(0,0),3)
    ys,xs=np.where(Rm>0);ys2,xs2=np.where(m>0)
    W=np.array([[1,0,xs2.mean()-xs.mean()],[0,1,ys2.mean()-ys.mean()]],np.float32)
    cc,W=cv2.findTransformECC(rb,fb,W,cv2.MOTION_AFFINE,(cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,300,1e-6),None,5)
    print(k,round(cc,2),np.hypot(W[0,0],W[1,0]).round(2));P=np.hstack([P0,np.ones((3,1),np.float32)])@W.T
    J['hq'][k]=[[float(p[0]/S-ANC[0]),float(p[1]/S-ANC[1])] for p in P];J['hq']['cap:'+k[4:]]=J['hq'][k]
# piccone-taglio3-fronte: testa da bbox visibile (pelle+capelli sopra le spalle) vs taglio2-fronte? uso taglio4-fronte non coperto: ECC con maschera larga
json.dump(J,open('rig_muse.json','w'))
ks=list(PAIRS)+['mar:piccone-taglio3-fronte','mar:ascia-taglio2-fronte']
Sh=Image.new('RGB',(6*220,260),(143,191,106))
for i,k in enumerate(ks):
    a=Image.fromarray(get(k));d=ImageDraw.Draw(a);p=pts(J['hq'][k]);p3=p[1]+p[2]-p[0];d.polygon([tuple(p[0]),tuple(p[1]),tuple(p3),tuple(p[2])],outline=(255,0,0,255))
    a=a.resize((220,int(220*a.height/a.width)));Sh.paste(a,(i*220,0),a)
Sh.save('/home/claude/work/v3_hq.png')
