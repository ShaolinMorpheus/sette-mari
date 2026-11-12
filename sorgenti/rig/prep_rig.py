import json,base64,io,glob,os
from PIL import Image
F=0.25;out={};dims={}
for f in sorted(glob.glob('pezzi/*.png')):
    n=os.path.basename(f)[:-4];im=Image.open(f).convert('RGBA');w,h=im.size
    sm=im.resize((max(1,round(w*F)),max(1,round(h*F))),Image.LANCZOS)
    b=io.BytesIO();sm.save(b,'WEBP',quality=82,method=6);out[n]=base64.b64encode(b.getvalue()).decode();dims[n]=[w,h]
json.dump({'img':out,'dim':dims},open('rig_art.json','w'))
print(len(out),sum(len(v) for v in out.values())//1024,'KB')
