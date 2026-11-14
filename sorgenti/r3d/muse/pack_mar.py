import cv2,numpy as np,json,base64,io,glob,sys
from PIL import Image
from mreg import D3
R=json.load(open('reg.json'));meta=json.load(open(D3+'meta.json'));J=json.load(open('rig_muse.json'))
S=.55;anc=meta['fronte-fermo']['anchor'];ANC=J['anc'];CROP=(int(round(anc[0]-ANC[0])),int(round(anc[1]-ANC[1])))
W,H=int((J['dim'][0])*S),int(J['dim'][1]*S)
MD='/home/claude/work/mar55/'
DY=float(sys.argv[1]) if len(sys.argv)>1 else 4;NW=float(sys.argv[2]) if len(sys.argv)>2 else 50
def src(nm):
    b=nm.replace('torcia-','')
    for pre in('ascia','piccone','mani-nude'):
        if b.startswith(pre):return 'profilo-destro-fermo'
    return b
def aff(q):return np.float32([q[0],q[1],q[2]])
def premult(a):
    p=a.astype(np.float32).copy();p[...,:3]*=p[...,3:4]/255;return p
A3=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S]],np.float32)
out={};sheet=[];SH={};HQ0={k:v for k,v in J['hq'].items()}
for nm in R:
    f=glob.glob(MD+'02-*_'+nm+'.png')[0];ma=np.array(Image.open(f).convert('RGBA'))
    M=np.array(R[nm]['M'],float);A=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S],[0,0,1]])@np.vstack([M,[0,0,1]])
    w=cv2.warpAffine(premult(ma),A[:2],(W,H),flags=cv2.INTER_AREA if S*np.hypot(M[0,0],M[1,0])<1 else cv2.INTER_LINEAR,borderValue=(0,0,0,0))
    v='spalle' if 'spalle' in nm else 'fronte' if 'fronte' in nm else 'profilo'
    sp=Image.open('/home/claude/work/r3d/heads/'+{'fronte':'f0','spalle':'b0','profilo':'s0'}[v]+'.png').convert('RGBA');sw,sh_=sp.size
    h3=np.array(sp).astype(np.float32)
    T=cv2.getAffineTransform(np.float32([[0,0],[sw,0],[0,sh_]]),np.float32(meta[nm]['hq']))
    h3=cv2.warpAffine(h3,T,(760,800),flags=cv2.INTER_LINEAR,borderValue=(0,0,0,0))
    wh=cv2.warpAffine(premult(h3),A3,(W,H),flags=cv2.INTER_AREA,borderValue=(0,0,0,0))
    # abbassa la testa fino al corpo (collo corto): l'hq si sposta con lei
    cxx=int((meta[nm]['hh'][0]-CROP[0])*S);xs=slice(max(0,cxx-int(30*S)),min(W,cxx+int(30*S)))
    hb=np.where((wh[...,3][:,xs]>128).any(1))[0];bb=np.where((w[...,3][:,xs]>128).any(1))[0]
    dy=0
    if len(hb) and len(bb):
        yh=hb.max();yb=bb[bb>hb.min()+20].min() if (bb>hb.min()+20).any() else yh
        dy=int(np.clip(yb-yh+DY,0,70))
    if dy:
        wh=cv2.warpAffine(wh,np.float32([[1,0,0],[0,1,dy]]),(W,H),flags=cv2.INTER_LINEAR,borderValue=(0,0,0,0))
    J['hq']['mar:'+nm]=[[p[0],p[1]+dy/S] for p in J['hq'].get('mar:'+nm0,J['hq']['mar:'+nm])] if False else J['hq']['mar:'+nm]
    SH[nm]=dy/S
    aw=w[...,3:4]/255;comp=w+wh*(1-aw)
    a=comp[...,3:4];c=np.where(a>1,comp[...,:3]*255/np.maximum(a,1),0)
    rgba=np.dstack([np.clip(c,0,255),a]).astype(np.uint8)
    # tra mento e corpo: colma il vuoto del collo colonna per colonna, con colori dai bordi
    hx3=meta[nm]['hh'][0];cx=int((hx3-CROP[0])*S);nc=0 if 'spalle' in nm else int(NW*S)
    ha=wh[...,3]>128;ba=w[...,3]>128;mask=np.zeros((H,W),np.uint8)
    for x in range(max(0,cx-nc),min(W,cx+nc)):
        yh=np.where(ha[:,x])[0]
        if not len(yh):continue
        yh=yh.max();yb=np.where(ba[yh:,x])[0]
        if not len(yb):continue
        yb=yh+yb.min()
        if ba[yh,x]:continue
        if 0<yb-yh<60:mask[yh:yb,x]=255
    if mask.any():
        cream=np.array([206,150,112],np.uint8);mk=cv2.GaussianBlur(mask,(0,0),1.0)
        al=(mk.astype(np.float32)/255)[...,None]
        rgba[...,:3]=np.clip(rgba[...,:3]*(1-al)+cream*al,0,255).astype(np.uint8);rgba[...,3]=np.maximum(rgba[...,3],mk)
    if 'spalle' in nm:
        mk=(rgba[...,:3].min(2)>236)&(rgba[...,3]>200);rgba[...,:3][mk]=[226,222,206]
    im=Image.fromarray(rgba,'RGBA')
    b=io.BytesIO();im.save(b,'WEBP',quality=86,method=6);out['mar:'+nm]=base64.b64encode(b.getvalue()).decode();sheet.append((nm,im))
for nm in R:
    q=meta[nm]['hq'];J['hq']['mar:'+nm]=[[p[0]-anc[0],p[1]-anc[1]+SH.get(nm,0)] for p in q]
    J['hand']['mar:'+nm]=J['hand']['mar:'+nm]
J['img'].update(out);json.dump(J,open('rig_muse.json','w'))
names=[]
for pre in ('torcia-',''):
    for d in ('profilo-destro','profilo-sinistro','fronte','spalle'):
        for s in ('fermo','passo1','passo2','passo3','passo4'): names.append(pre+d+'-'+s)
D=dict(sheet);Sh=Image.new('RGB',(5*181,8*187),(200,230,180))
for i,n in enumerate(names):
    im=D[n].resize((181,187));Sh.paste(im,((i%5)*181,(i//5)*187),im)
Sh.save('/home/claude/work/mar_walk.png');print('ok',len(out))
