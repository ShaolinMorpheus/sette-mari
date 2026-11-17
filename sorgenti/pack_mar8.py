# v4: i frame stanno sul canvas dei master -> warp con la M del master di ogni vista
import cv2,numpy as np,json,base64,io,glob,os
from PIL import Image
J=json.load(open('rig_muse.pre_v2.json'));R=json.load(open('reg_mar.json'));meta=json.load(open('/home/claude/work/torch3d/out/meta.json'))
S=.55;ANC=J['anc'];anc=meta['fronte-fermo']['anchor'];CROP=(int(round(anc[0]-ANC[0])),int(round(anc[1]-ANC[1])))
W,H=int(J['dim'][0]*S),int(J['dim'][1]*S)
D='/home/claude/sette-mari/muse/2026-11-17-marinaio-attrezzi-v4/'
os.makedirs('/home/claude/work/v4d',exist_ok=True);n=0
for f in sorted(glob.glob(D+'*.png.b64')):
    nm=os.path.basename(f)[:-8].split('_',1)[1];s=open(f).read().strip()
    if ',' in s[:60]:s=s.split(',',1)[1]
    ma=np.array(Image.open(io.BytesIO(base64.b64decode(s))).convert('RGBA'));assert ma.shape[:2]==(376,336),ma.shape
    Image.fromarray(ma).save('/home/claude/work/v4d/'+nm+'.png')
    v='fronte' if nm.endswith('fronte') else 'spalle' if nm.endswith('spalle') or nm.endswith('spalle') else 'profilo'
    mk={'fronte':'fronte-fermo','spalle':'spalle-fermo' if False else 'spalle-fermo','profilo':'profilo-destro-fermo'}[v]
    M=np.array(R[mk]['M'],float);A=np.array([[S,0,-CROP[0]*S],[0,S,-CROP[1]*S],[0,0,1]])@np.vstack([M,[0,0,1]])
    p=ma.astype(np.float32).copy();p[...,:3]*=p[...,3:4]/255
    w=cv2.warpAffine(p,A[:2],(W,H),flags=cv2.INTER_AREA,borderValue=(0,0,0,0))
    a=w[...,3:4];c=np.where(a>1,w[...,:3]*255/np.maximum(a,1),0);im=Image.fromarray(np.dstack([np.clip(c,0,255),a]).astype(np.uint8),'RGBA')
    b=io.BytesIO();im.save(b,'WEBP',quality=88,method=6);J['img']['mar:'+nm]=base64.b64encode(b.getvalue()).decode()
    J['hq']['mar:'+nm]=J['hq']['mar:%s'%('fronte-fermo' if v=='fronte' else 'spalle-fermo' if v=='spalle' else 'profilo-destro-fermo')];n+=1
json.dump(J,open('rig_muse.json','w'));print(n)
