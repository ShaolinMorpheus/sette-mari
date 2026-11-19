# attrezzi v6: corpo fermo in presa (Muse) + attrezzo separato ruotato da codice. Nessun cambio di taglia/colore del corpo.
import cv2,numpy as np,json,base64,io,math
from PIL import Image
J=json.load(open('rig_muse.v4b.json'));R=json.load(open('reg_mar.json'));meta=json.load(open('/home/claude/work/torch3d/out/meta.json'))
S=.55;ANC=J['anc'];anc=meta['fronte-fermo']['anchor'];CROP=(int(round(anc[0]-ANC[0])),int(round(anc[1]-ANC[1])))
W,H=int(J['dim'][0]*S),int(J['dim'][1]*S)
D='/home/claude/sette-mari/muse/2026-11-19-attrezzi-presa/'
PT=json.load(open(D+'punti.json'))
def load(n):
    s=open(D+n+'.png.b64').read().strip()
    if ',' in s[:60]:s=s.split(',',1)[1]
    return Image.open(io.BytesIO(base64.b64decode(s))).convert('RGBA')
VM={'fronte':'fronte-fermo','profilo-destro':'profilo-destro-fermo'}
out={'img':{},'fd':{},'np':{},'tools':{}}
for view in('fronte','profilo-destro'):
    im=load('marinaio-presa-'+view);ma=np.array(im)
    fk='mar:'+VM[view] if 'mar:'+VM[view] in J['img'] else VM[view]
    fe=np.array(Image.open(io.BytesIO(base64.b64decode(J['img'][fk]))).convert('RGBA'))
    def bb(A):
        m=A[...,3]>40;ys=np.where(m.any(1))[0];return ys.min(),ys.max()
    def fx(A):
        m=A[...,3]>40;ys=np.where(m.any(1))[0];y1=ys.max();xs=np.where(m[y1-40:y1+1].any(0))[0];return (xs.min()+xs.max())/2
    ft,fb=bb(fe);pt,pb=bb(ma);fc=fx(fe);pc=fx(ma)
    sc=(fb-ft)/(pb-pt)
    A=np.array([[sc,0,fc-pc*sc],[0,sc,fb-pb*sc],[0,0,1]])
    print(view,'fermo',ft,fb,fc,'presa',pt,pb,pc,'sc',sc,fe.shape)
    ytop=(A@np.array([0,0,1.]))[1];sh=int(math.ceil(max(0,-ytop)))+2;A[1,2]+=sh
    p=ma.astype(np.float32).copy();p[...,:3]*=p[...,3:4]/255
    w=cv2.warpAffine(p,A[:2],(W,H+sh),flags=cv2.INTER_AREA,borderValue=(0,0,0,0))
    a=w[...,3:4];c=np.where(a>1,w[...,:3]*255/np.maximum(a,1),0)
    o=Image.fromarray(np.dstack([np.clip(c,0,255),a]).astype(np.uint8),'RGBA')
    b=io.BytesIO();o.save(b,'WEBP',quality=88,method=6)
    key='mar:np-presa-'+view;out['img'][key]=base64.b64encode(b.getvalue()).decode()
    ay=ANC[1]+sh/S;out['fd'][key]={'dim':[J['dim'][0],J['dim'][1]+sh/S],'anc':[ANC[0],ay]}
    fx,fy=PT['pose_presa_marinaio']['marinaio-presa-%s.png'%view]['pugno']
    q=A@np.array([fx,fy,1.]);sc=float(A[0,0])/S
    out['np'][key]={'fist':[float(q[0]/S-ANC[0]),float(q[1]/S-ay)],'k':sc}
    print(key,sh,out['np'][key],o.size)
def tool(n,f):
    im=load(f[:-4]);im=im.resize((im.width*3//4,im.height*3//4),Image.LANCZOS) if False else im
    b=io.BytesIO();im.save(b,'WEBP',quality=88,method=6);return base64.b64encode(b.getvalue()).decode(),im.size
for n,f in(('ascia','ascia'),('ascia-destra','ascia-destra'),('piccone','piccone')):
    b,sz=tool(n,f+'.png');pr=PT['ascia' if n=='ascia' else 'piccone' if n=='piccone' else 'ascia']['presa' if n!='ascia-destra' else 'presa_testa_a_destra']
    out['tools'][n]={'b':b,'w':sz[0],'h':sz[1],'grip':pr}
json.dump(out,open('/home/claude/work/mz_np.json','w'));print({k:(v['w'],v['h'],v['grip']) for k,v in out['tools'].items()},sum(len(v) for v in out['img'].values()))
