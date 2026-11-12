import json,base64,io
from PIL import Image
out={};dims={}
def add(n,f,q=86):
    im=Image.open(f).convert('RGBA');w,h=im.size
    b=io.BytesIO();im.save(b,'WEBP',quality=q,method=6);out[n]=base64.b64encode(b.getvalue()).decode();dims[n]=[w,h]
for n in ['testa','busto','bacino','braccio-sup','braccio-sup-lontano','avambraccio','avambraccio-lontano','coscia','coscia-lontano','stinco','stinco-lontano']:
    add('s-'+n,'p_%s.png'%n)
for i in range(1,5):
    add('fr-%d'%i,'p_fr-%d.png'%i);add('bk-%d'%i,'p_bk-%d.png'%i)
add('st-f','p_st-f.png');add('st-b','p_st-b.png');add('st-s','p_st-s.png')
json.dump({'img':out,'dim':dims},open('rig_art3.json','w'))
print(len(out),sum(len(v) for v in out.values())//1024,'KB')
