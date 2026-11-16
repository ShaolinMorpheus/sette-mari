import cv2,numpy as np,json,base64,io,glob,os,sys
from PIL import Image
sys.path.insert(0,'/home/claude/work/mz')
from mreg import matte
import matplotlib.colors as mc
R=json.load(open('reg_mar.json'));meta=json.load(open('/home/claude/work/torch3d/out/meta.json'));J=json.load(open('rig_muse.json'))
S=.55;anc=meta['fronte-fermo']['anchor'];ANC=J['anc'];CROP=(int(round(anc[0]-ANC[0])),int(round(anc[1]-ANC[1])))
W,H=int(J['dim'][0]*S),int(J['dim'][1]*S);MD='/home/claude/work/marc/';ND='/home/claude/work/matt2/'
def feet(ma):
    a=ma[...,3]>40;ys,xs=np.where(a);yb=ys.max();sel=a[yb-int(.05*(yb-ys.min())):yb+1];xx=np.where(sel.any(0))[0];return (xx.min()+xx.max())/2.,yb,ys.min()
# convenzione piedi: dai profili esistenti (rig = M*img)
offx=[];offy=[];ks=[]
for nm,r in R.items():
    if not nm.startswith(('ascia','piccone','mani')):continue
    ma,_=matte(np.array(Image.open(glob.glob(MD+'02-*_'+nm+'.png')[0]).convert('RGB')));fx,fy,_t=feet(ma);M=np.array(r['M'])
    offx.append(M[0,0]*fx+M[0,1]*fy+M[0,2]-anc[0]);offy.append(M[1,0]*fx+M[1,1]*fy+M[1,2]-anc[1]);ks.append(np.hypot(M[0,0],M[1,0]))
K=float(np.mean(ks));OX=float(np.median(offx));OY=float(np.median(offy));print('K',round(K,3),'off',round(OX,1),round(OY,1))
sift=cv2.SIFT_create(4000)
def headreg(ma_new,ma_ref,top_new,top_ref):
    # registra la testa (parte alta) del frame nuovo su quella del frame fermo di riferimento
    def crop(ma,t,hh=150):
        g=cv2.cvtColor(ma[...,:3],cv2.COLOR_RGB2GRAY);m=np.zeros_like(g);m[int(t):int(t+hh)]=255;return g,m
    g1,m1=crop(ma_new,top_new);g2,m2=crop(ma_ref,top_ref)
    k1,d1=sift.detectAndCompute(g1,m1);k2,d2=sift.detectAndCompute(g2,m2)
    if d1 is None or d2 is None or len(k1)<6 or len(k2)<6:return None
    mm=cv2.BFMatcher().knnMatch(d1,d2,k=2);good=[a for a,b in mm if a.distance<.8*b.distance]
    if len(good)<6:return None
    p1=np.float32([k1[m.queryIdx].pt for m in good]);p2=np.float32([k2[m.trainIdx].pt for m in good])
    M,inl=cv2.estimateAffinePartial2D(p1,p2,method=cv2.RANSAC,ransacReprojThreshold=4)
    if M is None or inl.sum()<6:return None
    return M,int(inl.sum())
out={};hq={};rep=[];sheet={}
refs={}
for v in('fronte','spalle'):
    ma,_=matte(np.array(Image.open(glob.glob(MD+'02-*_%s-fermo.png'%v)[0]).convert('RGB')));refs[v]=ma
    M0=np.array(R[v+'-fermo']['M']);refs[v+'M']=M0;refs[v+'top']=feet(ma)[2]
for f in sorted(glob.glob(ND+'02-marinaio-righe_*.png')):
    nm=os.path.basename(f).split('_',1)[1][:-4];v='fronte' if nm.endswith('fronte') else 'spalle'
    ma,_=matte(np.array(Image.open(f).convert('RGB')));fx,fy,top=feet(ma)
    # similitudine immagine -> spazio rig: scala K, piedi sull'ancora
    A_rig=np.array([[K,0,anc[0]+OX-K*fx],[0,K,anc[1]+OY-K*fy],[0,0,1.]])
    A=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S],[0,0,1]])@A_rig
    pm=ma.astype(np.float32);pm[...,:3]*=pm[...,3:4]/255
    w=cv2.warpAffine(pm,A[:2],(W,H),flags=cv2.INTER_AREA,borderValue=(0,0,0,0))
    a=w[...,3:4];c=np.where(a>1,w[...,:3]*255/np.maximum(a,1),0)
    hh=mc.rgb_to_hsv(np.clip(c,0,255)/255);yy=np.arange(H)[:,None]*np.ones((1,W))
    yv=np.where(a[...,0]>20)[0];t0,b0=(yv.min(),yv.max()) if len(yv) else (0,H)
    mk=(hh[...,0]>.55)&(hh[...,0]<.72)&(hh[...,1]>.2)&(hh[...,2]<.55)&(yy>t0+.62*(b0-t0))
    hh[...,2]=np.where(mk,np.minimum(hh[...,2]*1.55,.8),hh[...,2]);hh[...,1]=np.where(mk,hh[...,1]*.85,hh[...,1])
    c=mc.hsv_to_rgb(hh)*255
    im=Image.fromarray(np.dstack([np.clip(c,0,255),a]).astype(np.uint8),'RGBA');b=io.BytesIO();im.save(b,'WEBP',quality=86,method=6)
    out['mar:'+nm]=base64.b64encode(b.getvalue()).decode();sheet[nm]=im
    # quadrilatero testa (per cappelli): quello del frame fermo di riferimento, portato sulla testa di questo frame
    q0=np.array(meta[v+'-fermo']['hq'],float)               # spazio rig del frame fermo
    M0=refs[v+'M'];M0i=cv2.invertAffineTransform(M0)          # rig(ref 3D) <- img ; qui serve img fermo -> rig = M0
    hr=headreg(ma,refs[v],top,refs[v+'top'])
    if hr is not None:
        Mh,n=hr   # img nuova -> img fermo ; fermo -> rig con M0
        Mn=np.vstack([M0,[0,0,1]])@np.vstack([Mh,[0,0,1]])    # img nuova -> rig (testa)
        # la quadrupla hq del fermo e' gia' in rig: la testa di questo frame ha la stessa trasformazione del fermo in Mn; rig(testa nuova)=Mn*p_new, rig(fermo)=M0*p_ref=M0*Mh*p_new
        # quindi lo spostamento/scala rispetto al fermo e' identita': l'hq e' invariata solo se Mh=I; usiamo lo spostamento e rotazione relativi in spazio rig
        T=np.vstack([M0,[0,0,1]])@np.vstack([Mh,[0,0,1]])@np.linalg.inv(np.vstack([M0,[0,0,1]]))  # rig(ref)->rig(nuovo) ... 
        # il testa nuova sta in rig a (Mn applicato alla testa in img nuova): sposta hq del fermo con la differenza fra la posizione reale e quella di riferimento
        # posizione reale della testa in rig (frame con piedi su ancora): A_rig*p_img ; posizione di riferimento: M0*Mh*p_img
        Ah=np.vstack([A_rig]);Rf=np.vstack([M0,[0,0,1]])@np.vstack([Mh,[0,0,1]])
        D=Ah@np.linalg.inv(Rf)   # rig(ref, con quadro del fermo) -> rig(nuovo)
        P=np.hstack([q0,np.ones((3,1))])@D[:2].T
        rep.append((nm,'sift',n,round(float(np.hypot(D[0,0],D[1,0])),2)))
    else:
        # ripiego: stessa quadrupla del fermo spostata sulla cima del busto
        d=np.array([0,(A_rig[1,1]*top+A_rig[1,2])-(M0[1,0]*0+0)])
        P=q0.copy();rep.append((nm,'fallback'))
    hq['mar:'+nm]=[[float(p[0]-anc[0]),float(p[1]-anc[1])] for p in P]
J['img'].update(out);J['hq'].update(hq);json.dump(J,open('rig_muse.json','w'))
for r in rep:print(r)
Sh=Image.new('RGB',(6*160,5*165),(200,230,180))
for i,n in enumerate(sorted(sheet)):
    im=sheet[n].resize((160,165));Sh.paste(im,((i%6)*160,(i//6)*165),im)
Sh.save('/home/claude/work/marc_chop2.png');print('ok',len(out))
