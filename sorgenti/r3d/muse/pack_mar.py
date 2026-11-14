import cv2,numpy as np,json,base64,io,glob,sys
from PIL import Image
from mreg import D3
R=json.load(open('reg.json'));meta=json.load(open(D3+'meta.json'));J=json.load(open('rig_muse.json'))
S=.55;anc=meta['fronte-fermo']['anchor'];ANC=J['anc'];CROP=(int(round(anc[0]-ANC[0])),int(round(anc[1]-ANC[1])))
W,H=int((J['dim'][0])*S),int(J['dim'][1]*S)
MD='/home/claude/work/mar55/'
DY=float(sys.argv[1]) if len(sys.argv)>1 else 34;NW=float(sys.argv[2]) if len(sys.argv)>2 else 50
def src(nm):
    b=nm.replace('torcia-','')
    for pre in('ascia','piccone','mani-nude'):
        if b.startswith(pre):return 'profilo-destro-fermo'
    return b
def aff(q):return np.float32([q[0],q[1],q[2]])
def premult(a):
    p=a.astype(np.float32).copy();p[...,:3]*=p[...,3:4]/255;return p
A3=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S]],np.float32)
out={};sheet=[]
for nm in R:
    f=glob.glob(MD+'02-*_'+nm+'.png')[0];ma=np.array(Image.open(f).convert('RGBA'))
    M=np.array(R[nm]['M'],float);A=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S],[0,0,1]])@np.vstack([M,[0,0,1]])
    w=cv2.warpAffine(premult(ma),A[:2],(W,H),flags=cv2.INTER_AREA if S*np.hypot(M[0,0],M[1,0])<1 else cv2.INTER_LINEAR,borderValue=(0,0,0,0))
    sn=src(nm);h3=np.array(Image.open(D3+sn+'.png').convert('RGBA')).astype(np.float32)
    qs=aff(meta[sn]['hq']);qt=aff(meta[nm]['hq'])
    T=cv2.getAffineTransform(qs,qt)
    h3=cv2.warpAffine(h3,T,(760,800),flags=cv2.INTER_LINEAR,borderValue=(0,0,0,0))
    TL,TR,BL=[np.array(p) for p in meta[nm]['hq']];BR=TR+BL-TL
    yy,xx=np.mgrid[0:800,0:760].astype(np.float32)
    ed=BR-BL;nrm=np.array([ed[1],-ed[0]])/np.hypot(*ed)
    if nrm[1]>0:nrm=-nrm
    dist=(xx-BL[0])*nrm[0]+(yy-BL[1])*nrm[1]      # >0 sopra la linea del mento
    hx=meta[nm]['hh'][0]
    head=np.clip(dist/4+.5,0,1)
    neck=np.clip((dist+DY)/4+.5,0,1)*(np.abs(xx-hx)<0)      # collo: sotto il mento, solo al centro
    h3[...,3]*=np.maximum(head,neck)
    wh=cv2.warpAffine(premult(h3),A3,(W,H),flags=cv2.INTER_AREA,borderValue=(0,0,0,0))
    aw=w[...,3:4]/255;comp=w+wh*(1-aw)
    a=comp[...,3:4];c=np.where(a>1,comp[...,:3]*255/np.maximum(a,1),0)
    rgba=np.dstack([np.clip(c,0,255),a]).astype(np.uint8)
    # tra mento e corpo: colma il vuoto del collo colonna per colonna, con colori dai bordi
    hx3=meta[nm]['hh'][0];cx=int((hx3-CROP[0])*S);nc=int(NW*S)
    ha=wh[...,3]>128;ba=w[...,3]>128;mask=np.zeros((H,W),np.uint8)
    for x in range(max(0,cx-nc),min(W,cx+nc)):
        yh=np.where(ha[:,x])[0]
        if not len(yh):continue
        yh=yh.max();yb=np.where(ba[yh:,x])[0]
        if not len(yb):continue
        yb=yh+yb.min()
        if ba[yh,x]:continue
        if 0<yb-yh<45:mask[yh:yb,x]=255
    if mask.any():
        m=cv2.dilate(mask,np.ones((3,3),np.uint8));rgb=cv2.inpaint(rgba[...,:3].copy(),m,5,cv2.INPAINT_TELEA)
        rgba[...,:3]=np.where(mask[...,None]>0,rgb,rgba[...,:3]);rgba[...,3]=np.where(mask>0,255,rgba[...,3])
    im=Image.fromarray(rgba,'RGBA')
    b=io.BytesIO();im.save(b,'WEBP',quality=86,method=6);out['mar:'+nm]=base64.b64encode(b.getvalue()).decode();sheet.append((nm,im))
J['img'].update(out);json.dump(J,open('rig_muse.json','w'))
names=[]
for pre in ('torcia-',''):
    for d in ('profilo-destro','profilo-sinistro','fronte','spalle'):
        for s in ('fermo','passo1','passo2','passo3','passo4'): names.append(pre+d+'-'+s)
D=dict(sheet);Sh=Image.new('RGB',(5*181,8*187),(200,230,180))
for i,n in enumerate(names):
    im=D[n].resize((181,187));Sh.paste(im,((i%5)*181,(i//5)*187),im)
Sh.save('/home/claude/work/mar_walk.png');print('ok',len(out))
