import cv2,numpy as np,json,base64,io,glob,os,sys
from PIL import Image,ImageDraw
sys.path.insert(0,'/home/claude/work/mz')
from mreg import matte
import matplotlib.colors as mc
R=json.load(open('reg_mar.json'));meta=json.load(open('/home/claude/work/torch3d/out/meta.json'));J=json.load(open('rig_muse.pre_v2.json'))
S=.55;anc=meta['fronte-fermo']['anchor'];ANC=J['anc'];CROP=(int(round(anc[0]-ANC[0])),int(round(anc[1]-ANC[1])))
W,H=int(J['dim'][0]*S),int(J['dim'][1]*S);MD='/home/claude/work/marc/';ND='/home/claude/work/matt2/'
def feet(ma):
    a=ma[...,3]>40;ys,xs=np.where(a);yb=ys.max();sel=a[yb-int(.05*(yb-ys.min())):yb+1];xx=np.where(sel.any(0))[0];return (xx.min()+xx.max())/2.,yb,ys.min()
def hair(ma):
    hsv=mc.rgb_to_hsv(ma[...,:3]/255.);a=ma[...,3]>200
    m=(a&((hsv[...,0]<.085)|(hsv[...,0]>.97))&(hsv[...,1]>.45)&(hsv[...,2]>.18)&(hsv[...,2]<.72)).astype(np.uint8)
    fx,fy,top=feet(ma);m[int(fy-.42*(fy-top)):]=0
    m=cv2.morphologyEx(cv2.morphologyEx(m,cv2.MORPH_OPEN,np.ones((3,3),np.uint8)),cv2.MORPH_CLOSE,np.ones((15,15),np.uint8));kk=max(9,int(round(.05*(fy-top))))|1;m=cv2.morphologyEx(m,cv2.MORPH_OPEN,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(kk,kk)))
    n,lab,st,_=cv2.connectedComponentsWithStats(m)
    if n<2:return None
    i=1+np.argmax(st[1:,4]);x,y,w,h,ar=st[i];b=lab==i
    rows=b[y:y+max(4,int(.6*h))];xs=np.where(rows.any(0))[0]
    return dict(cx=(xs.min()+xs.max())/2.,top=float(y),w=float(xs.max()-xs.min()),ar=float(ar))
refs={}
for v in('fronte','spalle'):
    ma,_=matte(np.array(Image.open(glob.glob(MD+'02-*_%s-fermo.png'%v)[0]).convert('RGB')))
    M0=np.array(R[v+'-fermo']['M']);fx,fy,_t=feet(ma)
    refs[v]=dict(ma=ma,M=M0,k=float(np.hypot(M0[0,0],M0[1,0])),hair=hair(ma),feet=(M0[0,0]*fx+M0[0,1]*fy+M0[0,2],M0[1,0]*fx+M0[1,1]*fy+M0[1,2]))
    print(v,refs[v]['hair'],refs[v]['k'],refs[v]['feet'],anc)
fr={}
for f in sorted(glob.glob(ND+'02-marinaio-righe_*.png')):
    nm=os.path.basename(f).split('_',1)[1][:-4]
    if 'taglio1-' in nm:continue          # posa di riposo: stile diverso dalle altre, scartata
    ma,_=matte(np.array(Image.open(f).convert('RGB')));fr[nm]=dict(ma=ma,hair=hair(ma),feet=feet(ma))
out={};hq={};sheet={}
def lab(x):return cv2.cvtColor(np.clip(x,0,255).astype(np.uint8)[None],cv2.COLOR_RGB2LAB)[0].astype(np.float32)
KB={}
for v in('spalle','fronte'):
    rf=refs[v];ns=[n for n in fr if n.endswith(v)]
    # scala unica per vista: larghezza capelli mediana -> stessa testa del fermo
    print([(n[:14],fr[n]['hair'] and round(fr[n]['hair']['w'])) for n in ns]);rat=np.median([rf['hair']['w']/fr[n]['hair']['w'] for n in ns if fr[n]['hair']]);Kv=rf['k']*rat
    if v=='spalle':KB['k']=Kv
    else:Kv=KB['k']
    # colore unico per vista
    rm=rf['ma'][...,3]>200;RL=lab(rf['ma'][...,:3][rm]);mu,sd=RL.mean(0),RL.std(0)
    AL=np.vstack([lab(fr[n]['ma'][...,:3][fr[n]['ma'][...,3]>200][::7]) for n in ns]);mn,sn=AL.mean(0),AL.std(0)
    g=np.clip(sd/sn,.85,1.2);print(v,'scala',round(float(rat),3),'lab',mu.round(1),mn.round(1),g.round(2))
    rh=rf['hair'];M0=rf['M'];rhx=M0[0,0]*rh['cx']+M0[0,2];rhy=M0[1,1]*rh['top']+M0[1,2]
    q0=np.array(meta[v+'-fermo']['hq'],float)
    for n in ns:
        d=fr[n];ma=d['ma'];fx,fy,top=d['feet']
        A_rig=np.array([[Kv,0,rf['feet'][0]-Kv*fx],[0,Kv,rf['feet'][1]-Kv*fy],[0,0,1.]])
        A=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S],[0,0,1]])@A_rig
        al=ma[...,3];ma=ma.copy();mx=np.maximum(ma[...,0],ma[...,2]);ma[...,1]=np.minimum(ma[...,1],mx)
        L=cv2.cvtColor(ma[...,:3],cv2.COLOR_RGB2LAB).astype(np.float32);L=(L-mn)*g+mu
        rgb=cv2.cvtColor(np.clip(L,0,255).astype(np.uint8),cv2.COLOR_LAB2RGB).astype(np.float32)
        pm=np.dstack([rgb*(al[...,None]/255.),al.astype(np.float32)])
        w=cv2.warpAffine(pm,A[:2],(W,H),flags=cv2.INTER_AREA,borderValue=(0,0,0,0))
        a=w[...,3:4];c=np.where(a>1,w[...,:3]*255/np.maximum(a,1),0)
        hh=mc.rgb_to_hsv(np.clip(c,0,255)/255);yy=np.arange(H)[:,None]*np.ones((1,W));fyo=A[1,1]*fy+A[1,2]
        mk=(hh[...,0]>.55)&(hh[...,0]<.72)&(hh[...,1]>.2)&(hh[...,2]<.55)&(yy>fyo-112)
        mk=cv2.GaussianBlur(mk.astype(np.float32),(0,0),1.2)
        v2=np.minimum(hh[...,2]*1.55,.8);hh[...,2]=hh[...,2]*(1-mk)+np.maximum(v2,hh[...,2])*mk;hh[...,1]=hh[...,1]*(1-.15*mk)
        c=mc.hsv_to_rgb(hh)*255
        im=Image.fromarray(np.dstack([np.clip(c,0,255),a]).astype(np.uint8),'RGBA');b=io.BytesIO();im.save(b,'WEBP',quality=88,method=6)
        out['mar:'+n]=base64.b64encode(b.getvalue()).decode()
        h=d['hair'] or rh
        dx=(Kv*h['cx']+A_rig[0,2])-rhx;dy=(Kv*h['top']+A_rig[1,2])-rhy
        P=q0+np.array([dx,dy]);hq['mar:'+n]=[[float(p[0]-anc[0]),float(p[1]-anc[1])] for p in P]
        dbg=im.copy();dr=ImageDraw.Draw(dbg);pp=[((p[0]-CROP[0])*S,(p[1]-CROP[1])*S) for p in P];dr.line([pp[0],pp[1]],fill=(255,0,0,255),width=2);dr.line([pp[0],pp[2]],fill=(0,0,255,255),width=2);sheet[n]=dbg
# fermo di confronto
for v in('fronte','spalle'):
    im=Image.open(io.BytesIO(base64.b64decode(J['img']['mar:%s-fermo'%v]))).convert('RGBA');dr=ImageDraw.Draw(im);q=J['hq']['mar:%s-fermo'%v]
    pp=[((p[0]+ANC[0])*S,(p[1]+ANC[1])*S) for p in q];dr.line([pp[0],pp[1]],fill=(255,0,0,255),width=2);dr.line([pp[0],pp[2]],fill=(0,0,255,255),width=2);sheet['0'+v]=im
for d_ in (out,hq,sheet):
    k_=('mar:' if d_ is not sheet else '')+'piccone-taglio%d-fronte';d_[k_%3]=d_[k_%2]
J['img'].update(out);J['hq'].update(hq);json.dump(J,open('rig_muse.json','w'))
for v in('fronte','spalle'):
    ns=['0'+v]+sorted(n for n in sheet if n.endswith(v) and n[0]!='0');Sh=Image.new('RGB',(7*200,2*206),(150,200,130))
    for i,n in enumerate(ns):
        im=sheet[n].resize((200,206));Sh.paste(im,((i%7)*200,(i//7)*206),im)
    Sh.save('/home/claude/work/m4_%s.png'%v)
print(len(out))
