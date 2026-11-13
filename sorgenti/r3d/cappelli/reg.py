import cv2,numpy as np,json,sys
from PIL import Image
SH=[('5e740e49',2),('f9254405',3),('47211dc8',4),('3a2114f7',3),('feb5e0dc',4),('57f00e9e',4),('b2a9c611',2)]
REF={k:np.array(Image.open('/home/claude/work/r3d/heads/%s0.png'%k).convert('RGBA')) for k in 'fsb'}
BG=np.array([250,243,234],float)
def refrgb(k):
    a=REF[k].astype(float);al=a[:,:,3:4]/255
    return (a[:,:,:3]*al+BG*(1-al)).astype(np.uint8)
sift=cv2.SIFT_create(4000)
def register(cell,k):
    r=refrgb(k)
    g1=cv2.cvtColor(cell,cv2.COLOR_RGB2GRAY);g2=cv2.cvtColor(r,cv2.COLOR_RGB2GRAY)
    # solo parte bassa del riferimento (volto, barba, orecchie): y > 40% 
    m2=np.zeros_like(g2);m2[int(g2.shape[0]*.38):]=255
    k1,d1=sift.detectAndCompute(g1,None);k2,d2=sift.detectAndCompute(g2,m2)
    bf=cv2.BFMatcher();mm=bf.knnMatch(d1,d2,k=2)
    good=[a for a,b in mm if a.distance<.75*b.distance]
    if len(good)<8:return None,len(good)
    p1=np.float32([k1[m.queryIdx].pt for m in good]);p2=np.float32([k2[m.trainIdx].pt for m in good])
    M,inl=cv2.estimateAffinePartial2D(p1,p2,method=cv2.RANSAC,ransacReprojThreshold=4)
    return M,int(inl.sum()) if inl is not None else 0
def cells():
    for si,(f,n) in enumerate(SH):
        im=np.array(Image.open('/mnt/user-data/uploads/%s-image.png'%f).convert('RGB'))
        H,W=im.shape[:2];ch=H/n;cw=W/3
        for r in range(n):
            for c,k in enumerate('fsb'):
                y0=int(r*ch)-14;y1=int((r+1)*ch)+40;x0=int(c*cw)-30;x1=int((c+1)*cw)+30
                pad=np.full((y1-y0,x1-x0,3),BG,np.uint8)
                sy0=max(0,y0);sy1=min(H,y1);sx0=max(0,x0);sx1=min(W,x1)
                pad[sy0-y0:sy1-y0,sx0-x0:sx1-x0]=im[sy0:sy1,sx0:sx1]
                yield si,r,k,pad
if __name__=='__main__':
    out={}
    for si,r,k,cell in cells():
        M,n=register(cell,k)
        print(si,r,k,n,None if M is None else np.round(M,3).tolist())
        if M is not None:
            w=cv2.warpAffine(cell,M,(REF[k].shape[1],REF[k].shape[0]),borderValue=tuple(BG))
            ov=(0.5*w+0.5*refrgb(k)).astype(np.uint8)
            Image.fromarray(np.hstack([w,ov])).save('reg_%d_%d_%s.png'%(si,r,k))
