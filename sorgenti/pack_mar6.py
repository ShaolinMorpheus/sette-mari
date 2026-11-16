import cv2,numpy as np,json,base64,io
from PIL import Image
import matplotlib.colors as mc
J=json.load(open('rig_muse.json'));ANC=J['anc'];S=.55
def get(k):return np.array(Image.open(io.BytesIO(base64.b64decode(J['img'][k]))).convert('RGBA'))
def hairmask(A):
    h=mc.rgb_to_hsv(A[...,:3]/255.);op=A[...,3]>200
    m=(op&((h[...,0]<.085)|(h[...,0]>.97))&(h[...,1]>.42)&(h[...,2]>.18)&(h[...,2]<.75)).astype(np.uint8)
    ys=np.where(op.any(1))[0];fy=ys.max();m[int(fy-170):]=0   # solo la testa (cima del busto in su)
    return m
def pts(q):return np.array([[(p[0]+ANC[0])*S,(p[1]+ANC[1])*S] for p in q],np.float32)
bad=[]
for v in('fronte','spalle'):
    R=get('mar:%s-fermo'%v);Rm=hairmask(R);q0=J['hq']['mar:%s-fermo'%v];P0=pts(q0)
    rb=cv2.GaussianBlur(Rm.astype(np.float32),(0,0),3)
    for k in [k for k in J['img'] if k.startswith('mar:') and k.endswith('-'+v) and ('taglio' in k or 'colpo' in k)]:
        A=get(k);m=hairmask(A);fb=cv2.GaussianBlur(m.astype(np.float32),(0,0),3)
        if m.sum()<300:bad.append((k,'pochi capelli'));continue
        # init: traslazione fra baricentri
        ys,xs=np.where(Rm>0);ys2,xs2=np.where(m>0)
        W=np.array([[1,0,xs2.mean()-xs.mean()],[0,1,ys2.mean()-ys.mean()]],np.float32)
        try:
            cc,W=cv2.findTransformECC(rb,fb,W,cv2.MOTION_AFFINE,(cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,200,1e-6),None,5)
        except cv2.error:
            bad.append((k,'ecc'));continue
        sc=float(np.hypot(W[0,0],W[1,0]));ang=float(np.degrees(np.arctan2(W[1,0],W[0,0])))
        if not(.8<sc<1.25) or abs(ang)>40 or cc<.5:bad.append((k,round(cc,2),round(sc,2),round(ang)));continue
        P=np.hstack([P0,np.ones((3,1),np.float32)])@W.T
        J['hq'][k]=[[float(p[0]/S-ANC[0]),float(p[1]/S-ANC[1])] for p in P]
        J['hq']['cap:'+k[4:]]=J['hq'][k]
        print(k,round(cc,2),round(sc,2),round(ang))
json.dump(J,open('rig_muse.json','w'));print('scartati',bad)
