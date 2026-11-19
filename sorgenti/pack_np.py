# attrezzi v6: corpo fermo in presa (Muse) + attrezzo separato ruotato da codice. Marinaio e Capitano, fronte/profilo/spalle.
import cv2,numpy as np,json,base64,io,math,os
from PIL import Image
J=json.load(open('rig_muse.v4b.json'))
S=.55;ANC=J['anc']
W,H=int(J['dim'][0]*S),int(J['dim'][1]*S)
D1='/home/claude/sette-mari/muse/2026-11-19-attrezzi-presa/';D2='/home/claude/sette-mari/muse/2026-11-19-presa-spalle-capitano/'
PT={}
for d in(D1,D2):
    for k,v in json.load(open(d+'punti.json')).items():
        if k=='pose_presa_marinaio':
            for kk,vv in v.items():PT[kk]=vv
        elif k.endswith('.png'):PT[k]=v
def load(n):
    for D in(D1,D2):
        if os.path.exists(D+n+'.png.b64'):
            s=open(D+n+'.png.b64').read().strip()
            if ',' in s[:60]:s=s.split(',',1)[1]
            return Image.open(io.BytesIO(base64.b64decode(s))).convert('RGBA')
    raise FileNotFoundError(n)
VM={'fronte':'fronte-fermo','profilo-destro':'profilo-destro-fermo','spalle':'spalle-fermo'}
out={'img':{},'fd':{},'np':{},'tools':{}}
for pre,suit in(('mar:','marinaio'),('cap:','capitano')):
  for view in('fronte','profilo-destro','spalle'):
    nm='%s-presa-%s'%(suit,view)
    im=load(nm);ma=np.array(im)
    fk=pre+VM[view] if pre+VM[view] in J['img'] else VM[view]
    fe=np.array(Image.open(io.BytesIO(base64.b64decode(J['img'][fk]))).convert('RGBA'))
    def bb(A):
        m=A[...,3]>40;ys=np.where(m.any(1))[0];return ys.min(),ys.max()
    def fxc(A):
        m=A[...,3]>40;ys=np.where(m.any(1))[0];y1=ys.max();xs=np.where(m[y1-40:y1+1].any(0))[0];return (xs.min()+xs.max())/2
    ft,fb=bb(fe);pt,pb=bb(ma);fc=fxc(fe);pc=fxc(ma)
    sc=(fb-ft)/(pb-pt)
    A=np.array([[sc,0,fc-pc*sc],[0,sc,fb-pb*sc],[0,0,1]])
    print(nm,'fermo',fk,ft,fb,round(fc),'presa',pt,pb,round(pc),'sc',round(sc,3))
    ytop=(A@np.array([0,0,1.]))[1];sh=int(math.ceil(max(0,-ytop)))+2;A[1,2]+=sh
    p=ma.astype(np.float32).copy();p[...,:3]*=p[...,3:4]/255
    w=cv2.warpAffine(p,A[:2],(W,H+sh),flags=cv2.INTER_AREA,borderValue=(0,0,0,0))
    a=w[...,3:4];c=np.where(a>1,w[...,:3]*255/np.maximum(a,1),0)
    o=Image.fromarray(np.dstack([np.clip(c,0,255),a]).astype(np.uint8),'RGBA')
    b=io.BytesIO();o.save(b,'WEBP',quality=88,method=6)
    key=pre+'np-presa-'+view;out['img'][key]=base64.b64encode(b.getvalue()).decode()
    ay=ANC[1]+sh/S;out['fd'][key]={'dim':[J['dim'][0],J['dim'][1]+sh/S],'anc':[ANC[0],ay]}
    fx,fy=PT[nm+'.png']['pugno']
    q=A@np.array([fx,fy,1.]);k=float(A[0,0])/S
    out['np'][key]={'fist':[float(q[0]/S-ANC[0]),float(q[1]/S-ay)],'k':k}
    print(key,sh,out['np'][key])
def tool(f):
    im=load(f);b=io.BytesIO();im.save(b,'WEBP',quality=88,method=6);return base64.b64encode(b.getvalue()).decode(),im.size
TP=json.load(open(D1+'punti.json'))
for n,f,pr in(('ascia','ascia',TP['ascia']['presa']),('ascia-destra','ascia-destra',TP['ascia']['presa_testa_a_destra']),('piccone','piccone',TP['piccone']['presa'])):
    b,sz=tool(f);out['tools'][n]={'b':b,'w':sz[0],'h':sz[1],'grip':pr}
json.dump(out,open('/home/claude/work/mz_np.json','w'));print(len(out['img']),sum(len(v) for v in out['img'].values()))
