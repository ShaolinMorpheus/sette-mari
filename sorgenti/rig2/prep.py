import json,base64,io,glob,os
from PIL import Image
out={};dims={};
def add(n,f,F,q=84):
    im=Image.open(f).convert('RGBA');w,h=im.size
    sm=im.resize((max(1,round(w*F)),max(1,round(h*F))),Image.LANCZOS)
    b=io.BytesIO();sm.save(b,'WEBP',quality=q,method=6);out[n]=base64.b64encode(b.getvalue()).decode();dims[n]=[w,h]
for f in sorted(glob.glob('pezzi/*.png')):
    add(os.path.basename(f)[:-4],f,0.25)
for i in range(1,5):
    add('fr-%d'%i,'camminata/cam-fronte-%d.png'%i,0.6);add('bk-%d'%i,'camminata/cam-retro-%d.png'%i,0.6)
add('st-f','camminata/fermo-fronte.png',0.6);add('st-b','camminata/fermo-retro.png',0.6);add('st-s','camminata/fermo-lato.png',0.6)
json.dump({'img':out,'dim':dims},open('rig_art.json','w'))
print(len(out),sum(len(v) for v in out.values())//1024,'KB')
