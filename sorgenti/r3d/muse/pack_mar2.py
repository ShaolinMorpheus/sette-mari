import cv2,numpy as np,json,base64,io,glob
from PIL import Image
from mreg import matte,D3
R=json.load(open('reg_mar.json'));RC=json.load(open('reg.json'));meta=json.load(open(D3+'meta.json'));J=json.load(open('rig_muse.json'))
S=.55;anc=meta['fronte-fermo']['anchor'];ANC=J['anc'];CROP=(int(round(anc[0]-ANC[0])),int(round(anc[1]-ANC[1])))
W,H=int(J['dim'][0]*S),int(J['dim'][1]*S);MD='/home/claude/work/marc/'
out={};over=0;sheet={}
for nm,r in R.items():
    ma,bg=matte(np.array(Image.open(glob.glob(MD+'02-*_'+nm+'.png')[0]).convert('RGB')))
    bn=nm.replace('torcia-','') if 'profilo' in nm and 'ascia' not in nm and 'piccone' not in nm and 'mani' not in nm else nm
    if bn!=nm or ('profilo' in nm and bn in RC and not nm.startswith(('ascia','piccone','mani'))):
        if bn in RC: r=RC[bn]
    M=np.array(r['M'],float);A=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S],[0,0,1]])@np.vstack([M,[0,0,1]])
    ys,xs=np.where(ma[...,3]>40);pts=np.float32([[xs.min(),ys.min(),1],[xs.max(),ys.max(),1]])@A[:2].T
    if pts[0,0]<0 or pts[0,1]<0 or pts[1,0]>W or pts[1,1]>H:over+=1;print('fuori',nm,pts.round())
    pm=ma.astype(np.float32);pm[...,:3]*=pm[...,3:4]/255
    w=cv2.warpAffine(pm,A[:2],(W,H),flags=cv2.INTER_AREA if S*np.hypot(M[0,0],M[1,0])<1 else cv2.INTER_LINEAR,borderValue=(0,0,0,0))
    a=w[...,3:4];c=np.where(a>1,w[...,:3]*255/np.maximum(a,1),0)
    import matplotlib.colors as mc
    hh=mc.rgb_to_hsv(np.clip(c,0,255)/255);yy=np.arange(H)[:,None]*np.ones((1,W))
    yv=np.where(a[...,0]>20)[0];top,bot=(yv.min(),yv.max()) if len(yv) else (0,H)
    mk=(hh[...,0]>.55)&(hh[...,0]<.72)&(hh[...,1]>.2)&(hh[...,2]<.55)&(yy>top+.62*(bot-top))
    hh[...,2]=np.where(mk,np.minimum(hh[...,2]*1.55,.8),hh[...,2]);hh[...,1]=np.where(mk,hh[...,1]*.85,hh[...,1])
    c=mc.hsv_to_rgb(hh)*255
    rgba=np.dstack([np.clip(c,0,255),a]).astype(np.uint8)
    im=Image.fromarray(rgba,'RGBA');b=io.BytesIO();im.save(b,'WEBP',quality=86,method=6);out['mar:'+nm]=base64.b64encode(b.getvalue()).decode();sheet[nm]=im
    q=meta[bn]['hq'] if bn in meta else meta[nm]['hq'];J['hq']['mar:'+nm]=[[p[0]-anc[0],p[1]-anc[1]] for p in q]
J['img'].update(out);json.dump(J,open('rig_muse.json','w'))
names=[pre+d+'-'+s for pre in('torcia-','') for d in('profilo-destro','profilo-sinistro','fronte','spalle') for s in('fermo','passo1','passo2','passo3','passo4')]
Sh=Image.new('RGB',(5*181,8*187),(200,230,180))
for i,n in enumerate(names):
    im=sheet[n].resize((181,187));Sh.paste(im,((i%5)*181,(i//5)*187),im)
Sh.save('/home/claude/work/marc_walk.png');print('ok',len(out),'fuori',over)
