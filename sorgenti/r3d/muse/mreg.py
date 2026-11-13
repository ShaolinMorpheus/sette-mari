import cv2,numpy as np,glob,os,json
from PIL import Image
D3='/home/claude/work/torch3d/out/';DM='/home/claude/work/cap55/'
sift=cv2.SIFT_create(6000)
def matte(rgb):
    h,w=rgb.shape[:2];f=rgb.astype(np.float32)
    edge=np.concatenate([f[0],f[-1],f[:,0],f[:,-1]]);bg=np.median(edge,axis=0)
    d=np.abs(f-bg).max(axis=2)
    a=np.clip((d-10)/26,0,1)
    # tieni solo componenti connesse al personaggio (rimuove macchie di fondo)
    m=(a>.5).astype(np.uint8);n,lab,st,_=cv2.connectedComponentsWithStats(m,connectivity=8)
    if n>1:
        keep=np.zeros(n,bool);big=st[1:,4].max()
        for i in range(1,n):keep[i]=st[i,4]>=big*.02
        a=a*keep[lab]
    a=cv2.GaussianBlur(a,(0,0),.6)
    af=np.clip(a,0,1)[...,None]
    c=np.where(af>.02,(f-(1-af)*bg)/np.maximum(af,.02),f);c=np.clip(c,0,255)
    return np.dstack([c,af[...,0]*255]).astype(np.uint8),bg
def reg(mrgba,ref):
    g1=cv2.cvtColor(mrgba[:,:,:3],cv2.COLOR_RGB2GRAY);bgc=np.array([205,228,170],np.float32)
    r=np.array(ref).astype(np.float32);al=r[:,:,3:4]/255;rr=(r[:,:,:3]*al+bgc*(1-al)).astype(np.uint8)
    g2=cv2.cvtColor(rr,cv2.COLOR_RGB2GRAY)
    k1,d1=sift.detectAndCompute(g1,None);k2,d2=sift.detectAndCompute(g2,None)
    mm=cv2.BFMatcher().knnMatch(d1,d2,k=2);good=[a for a,b in mm if a.distance<.78*b.distance]
    if len(good)<6:return None,len(good)
    p1=np.float32([k1[m.queryIdx].pt for m in good]);p2=np.float32([k2[m.trainIdx].pt for m in good])
    M,inl=cv2.estimateAffinePartial2D(p1,p2,method=cv2.RANSAC,ransacReprojThreshold=5)
    return M,(int(inl.sum()) if inl is not None else 0)
if __name__=='__main__':
    res={}
    for f in sorted(glob.glob(DM+'01-*.png')):
        nm=os.path.basename(f).split('_',1)[1][:-4]
        m=np.array(Image.open(f).convert('RGB'));ma,bg=matte(m)
        ref=Image.open(D3+nm+'.png').convert('RGBA')
        M,n=reg(ma,ref)
        if M is None:print(nm,'FAIL',n);continue
        s=float(np.hypot(M[0,0],M[1,0]));rot=float(np.degrees(np.arctan2(M[1,0],M[0,0])))
        res[nm]={'M':M.tolist(),'n':n}
        print(f'{nm:42s} n={n:3d} s={s:.3f} rot={rot:5.1f} t=({M[0,2]:.0f},{M[1,2]:.0f})')
    json.dump(res,open('reg.json','w'))
