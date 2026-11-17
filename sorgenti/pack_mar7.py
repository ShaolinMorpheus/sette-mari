# profili v3: warp con reg_mar.json (stesso canvas degli originali) + variante rossa per il capitano
import cv2,numpy as np,json,base64,io,glob,os,sys
from PIL import Image
import matplotlib.colors as mc
sys.path.insert(0,'/home/claude/work/mz')
J=json.load(open('rig_muse.json'));R=json.load(open('reg_mar.json'));meta=json.load(open('/home/claude/work/torch3d/out/meta.json'))
S=.55;ANC=J['anc'];anc=meta['fronte-fermo']['anchor'];CROP=(int(round(anc[0]-ANC[0])),int(round(anc[1]-ANC[1])))
W,H=int(J['dim'][0]*S),int(J['dim'][1]*S)
def lab(x):return cv2.cvtColor(np.clip(x,0,255).astype(np.uint8)[None],cv2.COLOR_RGB2LAB)[0].astype(np.float32)
def put(k,A):
    b=io.BytesIO();Image.fromarray(A,'RGBA').save(b,'WEBP',quality=88,method=6);J['img'][k]=base64.b64encode(b.getvalue()).decode()
RED=np.array([196,64,58],np.float32)
for nm in [n for n in R if n.endswith('profilo-destro') and any(n.startswith(p) for p in('ascia','piccone','mani'))]:
    A2=np.array(Image.open(io.BytesIO(base64.b64decode(J['img']['mar:'+nm]))).convert('RGBA'))
    # capitano: righe -> rosso sopra la cintura
    hv=mc.rgb_to_hsv(A2[...,:3]/255.);op=A2[...,3]>30;yy=np.arange(H)[:,None]*np.ones((1,W))
    ys=np.where((A2[...,3]>40).any(1))[0];fy=ys.max()
    dark=(hv[...,2]<.42)&(hv[...,1]<.5)
    bm=(A2[...,3]>200)&dark&(yy>fy-128)&(yy<fy-58);rows=np.where(bm.sum(1)>=14)[0]
    bt=rows.min() if len(rows) else fy-100
    white=(hv[...,1]<.3)&(hv[...,2]>.6);blue=(hv[...,0]>.52)&(hv[...,0]<.72)&(hv[...,1]>.25)&(hv[...,2]<.62)
    skin=op&(hv[...,0]<.14)&(hv[...,1]>.2)&(hv[...,2]>.35)
    cls=op&(white|blue)&(yy<bt+4)&(yy>fy-330)&~dark
    m=cv2.morphologyEx(cls.astype(np.uint8),cv2.MORPH_CLOSE,np.ones((5,5),np.uint8));n,l,st,_=cv2.connectedComponentsWithStats(m,connectivity=8)
    cx=W//2;band=l[int(bt-60):int(bt-8),int(cx-70):int(cx+70)];keep=np.zeros_like(cls)
    for i in set(np.unique(band))-{0}:
        if st[i,4]>400:keep|=l==i
    sh=keep&cls;d=cv2.dilate(sh.astype(np.uint8),np.ones((5,5),np.uint8))>0
    c2=op&d&(yy<bt+4)&~dark&~cv2.dilate(skin.astype(np.uint8),np.ones((5,5),np.uint8)).astype(bool)&(white|blue|((hv[...,1]<.32)&(hv[...,2]>.45)))&(yy>fy-330)
    # solo componente del busto (no lama / testa): limito a sotto la linea del collo
    A3=A2.copy();Lg=hv[...,2][c2][:,None];A3[...,:3][c2]=np.clip(RED*(0.86+0.2*(Lg-.5)),0,255).astype(np.uint8)
    pa=(A2[...,3]>200)&(yy>bt+12)&(yy<fy-45)&(hv[...,0]>.5)&(hv[...,0]<.75)
    A3[...,:3][pa]=(A3[...,:3][pa]*np.array([.62,.68,.8])).astype(np.uint8)
    put(nm,A3)
json.dump(J,open('rig_muse.json','w'))
ks=[n for n in R if n.endswith('profilo-destro') and any(n.startswith(p) for p in('ascia','piccone','mani'))]
def get(k):return np.array(Image.open(io.BytesIO(base64.b64decode(J['img'][k]))).convert('RGBA'))
Sh=Image.new('RGB',(5*200,6*200),(143,191,106))
for i,n in enumerate(ks):
    for j,pre in enumerate(('mar:','')):
        a=Image.fromarray(get(pre+n));a=a.resize((200,int(200*a.height/a.width)));Sh.paste(a,(i%5*200,((i//5)*2+j)*200),a)
Sh.save('/home/claude/work/m7.png');print(len(ks))
