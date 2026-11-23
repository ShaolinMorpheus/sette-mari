import json,base64,io,sys,numpy as np
from PIL import Image
import pickle,matplotlib.colors as mc
m=pickle.load(open('/tmp/skin/skin.pkl','rb'))
G=np.array([1.096,.939,.835])
def recolor(b64):
    im=Image.open(io.BytesIO(base64.b64decode(b64))).convert('RGBA')
    a=np.array(im).astype(float);op=a[...,3]>20
    rgb=a[...,:3]/255;h=mc.rgb_to_hsv(rgb)
    F=np.concatenate([rgb.reshape(-1,3),h.reshape(-1,3)],1)
    al=np.zeros(a.shape[:2]);idx=np.nonzero(op.reshape(-1))[0]
    al.reshape(-1)[idx]=np.clip(m.predict(F[idx]),0,1)
    out=a.copy();out[...,:3]=np.clip(a[...,:3]*(1+al[...,None]*(G-1)),0,255)
    r=Image.fromarray(out.astype('uint8'),'RGBA');b=io.BytesIO();r.save(b,'WEBP',quality=92,method=4,exact=True)
    return base64.b64encode(b.getvalue()).decode()
s=open('/home/claude/work/base_index.html',encoding='utf8').read()
res={'RIGMART':{'img':{}},'RIGNP':{'img':{}}}
for name in ('RIGMART','RIGNP'):
    i=s.index('var '+name+'=')+len('var '+name+'=');o,e=json.JSONDecoder().raw_decode(s[i:])
    for part in res[name]:
        for k,v in o[part].items():
            res[name][part][k]=recolor(v)
        print(name,part,len(o[part]),flush=True)
json.dump(res,open('/home/claude/work/rig_roseo.json','w'))
print(sum(len(v) for n in res.values() for p in n.values() for v in p.values())//1024,'KB')
