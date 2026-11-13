import json,base64,io,glob
from PIL import Image
import numpy as np
meta=json.load(open('out/meta.json'))
names=sorted(meta)
x0=y0=10**9;x1=y1=0
for n in names:
    a=np.asarray(Image.open('out/%s.png'%n).convert('RGBA'))[:,:,3]>10
    ys,xs=np.where(a);x0=min(x0,xs.min());x1=max(x1,xs.max());y0=min(y0,ys.min());y1=max(y1,ys.max())
pad=6;CROP=tuple(int(v) for v in (max(0,x0-pad),max(0,y0-pad),min(640,x1+pad+1),min(700,y1+pad+1)))
print('crop',CROP)
anc=meta['fronte-fermo']['anchor'];ANC=[anc[0]-CROP[0],anc[1]-CROP[1]]
S=.5;out={};dims={};hand={}
for n in names:
    im=Image.open('out/%s.png'%n).convert('RGBA').crop(CROP)
    sm=im.resize((int(im.width*S),int(im.height*S)),Image.LANCZOS)
    b=io.BytesIO();sm.save(b,'WEBP',quality=86,method=6);out[n]=base64.b64encode(b.getvalue()).decode();dims[n]=list(im.size)
    m=meta[n];hand[n]={'hm':[m['hm'][0]-anc[0],m['hm'][1]-anc[1]],'hl':[m['hl'][0]-anc[0],m['hl'][1]-anc[1]],'hr':[m['hr'][0]-anc[0],m['hr'][1]-anc[1]]}
fh=Image.open('out/fronte-fermo.png').getbbox();print('altezza figura px',fh[3]-fh[1])
json.dump({'img':out,'dim':dims,'anc':ANC,'hand':hand},open('rig_art6.json','w'))
print(len(out),sum(len(v) for v in out.values())//1024,'KB')
