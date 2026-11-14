import cv2,numpy as np,json,base64,io,glob,os
from PIL import Image
from mreg import matte,D3
R=json.load(open('reg.json'));meta=json.load(open(D3+'meta.json'))
S=.55;anc=meta['fronte-fermo']['anchor']
SETS=[('', '/home/claude/work/cap55d/','01-*_',True),('mar:','/home/claude/work/mar55/','02-*_',False)]
fr={}
for pre,d,pat,mt in SETS:
    for nm in R:
        f=glob.glob(d+pat+nm+'.png')[0]
        if mt:
            ma,bg=matte(np.array(Image.open(f).convert('RGB')))
        else:
            ma=np.array(Image.open(f).convert('RGBA'))
        fr[pre+nm]=ma
bx0=by0=10**9;bx1=by1=0
for k,ma in fr.items():
    nm=k.split(':')[-1];M=np.array(R[nm]['M'],float);ys,xs=np.where(ma[...,3]>40)
    pts=np.float32([[xs.min(),ys.min()],[xs.max(),ys.max()]]);q=pts@M[:,:2].T+M[:,2]
    bx0=min(bx0,q[0,0]);by0=min(by0,q[0,1]);bx1=max(bx1,q[1,0]);by1=max(by1,q[1,1])
pad=6;CROP=(max(0,int(bx0)-pad),max(0,int(by0)-pad),min(760,int(bx1)+pad+1),min(800,int(by1)+pad+1));print('CROP',CROP)
ANC=[anc[0]-CROP[0],anc[1]-CROP[1]]
W=int((CROP[2]-CROP[0])*S);H=int((CROP[3]-CROP[1])*S)
out={};hq={};hand={}
for k,ma in fr.items():
    nm=k.split(':')[-1];M=np.array(R[nm]['M'],float)
    A=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S],[0,0,1]])@np.vstack([M,[0,0,1]])
    pm=ma.astype(np.float32);pm[...,:3]*=pm[...,3:4]/255
    w=cv2.warpAffine(pm,A[:2],(W,H),flags=cv2.INTER_AREA if S*np.hypot(M[0,0],M[1,0])<1 else cv2.INTER_LINEAR,borderValue=(0,0,0,0))
    if k.startswith('mar:'):
        # testa dal modello 3D (sopra la linea del mento), corpo di Muse sopra
        h3=np.array(Image.open(D3+nm+'.png').convert('RGBA')).astype(np.float32)
        q=meta[nm]['hq'];TL=np.array(q[0]);TR=np.array(q[1]);BL=np.array(q[2]);BR=TR+BL-TL
        yy,xx=np.mgrid[0:h3.shape[0],0:h3.shape[1]].astype(np.float32)
        ed=BR-BL;nrm=np.array([ed[1],-ed[0]])/np.hypot(*ed)   # normale verso l'alto
        dist=((xx-BL[0])*nrm[0]+(yy-BL[1])*nrm[1])
        if nrm[1]>0:dist=-dist
        cut=np.clip(dist/4+0.5,0,1)   # >0 sopra la linea
        h3[...,3]*=cut
        p3=h3.copy();p3[...,:3]*=p3[...,3:4]/255
        A3=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S]])
        wh=cv2.warpAffine(p3,A3,(W,H),flags=cv2.INTER_AREA,borderValue=(0,0,0,0))
        aw=w[...,3:4]/255;w=w+wh*(1-aw)
    a=w[...,3:4];c=np.where(a>1,w[...,:3]*255/np.maximum(a,1),0)
    im=Image.fromarray(np.dstack([np.clip(c,0,255),a]).astype(np.uint8),'RGBA')
    b=io.BytesIO();im.save(b,'WEBP',quality=86,method=6);out[k]=base64.b64encode(b.getvalue()).decode()
    m3=meta[nm];hq[k]=[[p[0]-anc[0],p[1]-anc[1]] for p in m3['hq']]
    hand[k]={kk:[m3[kk][0]-anc[0],m3[kk][1]-anc[1]] for kk in('hm','hl','hr')}
json.dump({'img':out,'hq':hq,'hand':hand,'dim':[CROP[2]-CROP[0],CROP[3]-CROP[1]],'anc':ANC},open('rig_muse.json','w'))
print(len(out),sum(len(v) for v in out.values())//1024,'KB',W,H)
