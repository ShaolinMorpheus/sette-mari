# v5: corpo + livello attrezzo (gia' posizionato) -> composito su tela 336x500 -> warp con M del master -> frame con dim/anc propri (fd) + hq via ECC
import cv2,numpy as np,json,base64,io,glob,os,math
from PIL import Image
import matplotlib.colors as mc
J=json.load(open('rig_muse.v4b.json'));R=json.load(open('reg_mar.json'));meta=json.load(open('/home/claude/work/torch3d/out/meta.json'))
S=.55;ANC=J['anc'];anc=meta['fronte-fermo']['anchor'];CROP=(int(round(anc[0]-ANC[0])),int(round(anc[1]-ANC[1])))
W,H=int(J['dim'][0]*S),int(J['dim'][1]*S)
D='/home/claude/sette-mari/muse/2026-11-18-attrezzi-v5/'
def load(n):
    s=open(D+n+'.png.b64').read().strip()
    if ',' in s[:60]:s=s.split(',',1)[1]
    return Image.open(io.BytesIO(base64.b64decode(s))).convert('RGBA')
def get(k):return np.array(Image.open(io.BytesIO(base64.b64decode(J['img'][k]))).convert('RGBA'))
def hairmask(A):
    h=mc.rgb_to_hsv(A[...,:3]/255.);op=A[...,3]>200
    m=(op&((h[...,0]<.085)|(h[...,0]>.97))&(h[...,1]>.42)&(h[...,2]>.18)&(h[...,2]<.75)).astype(np.uint8)
    ys=np.where(op.any(1))[0];fy=ys.max();m[int(fy-170):]=0;return m
def pts(q,sh):return np.array([[(p[0]+ANC[0])*S,(p[1]+ANC[1])*S+sh] for p in q],np.float32)
VM={'fronte':'fronte-fermo','spalle':'spalle-fermo','profilo-destro':'profilo-destro-fermo'}
MG=124
SC={('mar','fronte'):1.62,('mar','spalle'):1.58,('mar','profilo-destro'):1.5,('cap','fronte'):1.5,('cap','spalle'):1.5,('cap','profilo-destro'):1.45}
out={'img':{},'hq':{},'fd':{}};bad=[]
for suit,pre,sn in(('marinaio','mar:','mar'),('capitano','cap:','cap')):
  for tool in('ascia','piccone'):
    for view in('fronte','spalle','profilo-destro'):
      for pose in('carica','apice','colpo','ritorno'):
        body=load(f'{suit}-corpo-{view}-{pose}');tl=load(f'{suit}-{tool}-{view}-{pose}')
        cv=Image.new('RGBA',(336,500),(0,0,0,0));cv.alpha_composite(body,(0,MG))
        cv.alpha_composite(tl,(0,0 if pose=='apice' else MG))
        ma=np.array(cv)
        M=np.array(R[VM[view]]['M'],float);A=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S],[0,0,1]])@np.vstack([M,[0,0,1]])
        T=np.array([[1,0,0],[0,1,-MG],[0,0,1]],float);A=A@T
        ytop=(A@np.array([0,0,1.]))[1];sh=int(math.ceil(max(0,-ytop)))+2
        A[1,2]+=sh
        sc0=SC[(sn,view)];pa=np.array([ANC[0]*S,ANC[1]*S+sh]);A=np.array([[1/sc0,0,pa[0]*(1-1/sc0)],[0,1/sc0,pa[1]*(1-1/sc0)],[0,0,1]])@A
        p=ma.astype(np.float32).copy();p[...,:3]*=p[...,3:4]/255
        w=cv2.warpAffine(p,A[:2],(W,H+sh),flags=cv2.INTER_AREA,borderValue=(0,0,0,0))
        a=w[...,3:4];c=np.where(a>1,w[...,:3]*255/np.maximum(a,1),0);im=Image.fromarray(np.dstack([np.clip(c,0,255),a]).astype(np.uint8),'RGBA')
        b=io.BytesIO();im.save(b,'WEBP',quality=88,method=6)
        key=f'{pre}v5-{tool}-{pose}-{view}'
        out['img'][key]=base64.b64encode(b.getvalue()).decode()
        out['fd'][key]={'dim':[J['dim'][0],J['dim'][1]+sh/S],'anc':[ANC[0],ANC[1]+sh/S]}
        # hq: ECC della maschera capelli vs fermo dello stesso abito
        rk=(pre+VM[view]) if (pre+VM[view]) in J['img'] else VM[view]
        Rr=get(rk);Rm=np.zeros((H+sh,W),np.uint8);Rm[sh:sh+H]=hairmask(Rr)[:H,:W]
        m=hairmask(np.array(im));q0=J['hq'][rk];P0=pts(q0,sh)
        key_ok=False
        if m.sum()>=300 and Rm.sum()>=300:
            rb=cv2.GaussianBlur(Rm.astype(np.float32),(0,0),3);fb=cv2.GaussianBlur(m.astype(np.float32),(0,0),3)
            ys,xs=np.where(Rm>0);ys2,xs2=np.where(m>0)
            Wm=np.array([[1,0,xs2.mean()-xs.mean()],[0,1,ys2.mean()-ys.mean()]],np.float32)
            try:
                cc,Wm=cv2.findTransformECC(rb,fb,Wm,cv2.MOTION_AFFINE,(cv2.TERM_CRITERIA_EPS|cv2.TERM_CRITERIA_COUNT,300,1e-6),None,5)
                sc=float(np.hypot(Wm[0,0],Wm[1,0]));ang=float(np.degrees(np.arctan2(Wm[1,0],Wm[0,0])))
                if .8<sc<1.7 and abs(ang)<45 and cc>.45:
                    P=np.hstack([P0,np.ones((3,1),np.float32)])@Wm.T
                    out['hq'][key]=[[float(pp[0]/S-ANC[0]),float((pp[1]-sh)/S-ANC[1])] for pp in P]+[];
                    # hq e' relativo all'ancora: ancora spostata di sh/S -> coordinate rispetto all'ancora nuova
                    out['hq'][key]=[[float(pp[0]/S-ANC[0]),float((pp[1]-sh)/S-ANC[1])] for pp in P];key_ok=True
                else:bad.append((key,round(cc,2),round(sc,2),round(ang)))
            except cv2.error:bad.append((key,'ecc'))
        else:bad.append((key,'pochi capelli',int(m.sum()),int(Rm.sum())))
        if not key_ok:out['hq'][key]=J['hq'][rk]
        print(key,sh,key_ok)
J['img'].update(out['img']);J['hq'].update(out['hq']);J['fd']=out['fd']
json.dump(J,open('rig_muse.json','w'));print('scartati',bad,len(out['img']))
