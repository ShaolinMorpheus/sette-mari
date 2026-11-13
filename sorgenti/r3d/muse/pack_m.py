import cv2,numpy as np,json,base64,io,glob,os,math
from PIL import Image
from mreg import matte,DM,D3
R=json.load(open('reg.json'));meta=json.load(open(D3+'meta.json'))
S=.55;anc=meta['fronte-fermo']['anchor']
fr={}
for nm,r in R.items():
    f=glob.glob(DM+'01-*_'+nm+'.png')[0];m=np.array(Image.open(f).convert('RGB'));ma,bg=matte(m);fr[nm]=ma
bx0=by0=10**9;bx1=by1=0
for nm,r in R.items():
    M=np.array(r['M'],float);ys,xs=np.where(fr[nm][...,3]>40)
    pts=np.float32([[xs.min(),ys.min()],[xs.max(),ys.max()]]);q=pts@M[:,:2].T+M[:,2]
    bx0=min(bx0,q[0,0]);by0=min(by0,q[0,1]);bx1=max(bx1,q[1,0]);by1=max(by1,q[1,1])
pad=6;CROP=(max(0,int(bx0)-pad),max(0,int(by0)-pad),min(760,int(bx1)+pad+1),min(800,int(by1)+pad+1));print('CROP',CROP)
ANC=[anc[0]-CROP[0],anc[1]-CROP[1]]
W=int((CROP[2]-CROP[0])*S);H=int((CROP[3]-CROP[1])*S)
out={};hq={};hand={}
for nm,r in R.items():
    f=glob.glob(DM+'01-*_'+nm+'.png')[0]
    ma=fr[nm]
    M=np.array(r['M'],float)  # muse->3D canvas(760x800)
    # 3D canvas -> crop -> S
    A=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S],[0,0,1]])@np.vstack([M,[0,0,1]])
    pm=ma.astype(np.float32);pm[...,:3]*=pm[...,3:4]/255   # premoltiplicato
    w=cv2.warpAffine(pm,A[:2],(W,H),flags=cv2.INTER_AREA if S*np.hypot(M[0,0],M[1,0])<1 else cv2.INTER_LINEAR,borderValue=(0,0,0,0))
    a=w[...,3:4];c=np.where(a>1,w[...,:3]*255/np.maximum(a,1),0)
    im=Image.fromarray(np.dstack([np.clip(c,0,255),a]).astype(np.uint8),'RGBA')
    b=io.BytesIO();im.save(b,'WEBP',quality=86,method=6);out[nm]=base64.b64encode(b.getvalue()).decode()
    m3=meta[nm];hq[nm]=[[p[0]-anc[0],p[1]-anc[1]] for p in m3['hq']]
    hand[nm]={k:[m3[k][0]-anc[0],m3[k][1]-anc[1]] for k in('hm','hl','hr')}
json.dump({'img':out,'hq':hq,'hand':hand,'dim':[CROP[2]-CROP[0],CROP[3]-CROP[1]],'anc':ANC},open('rig_muse.json','w'))
print(len(out),sum(len(v) for v in out.values())//1024,'KB',W,H)
