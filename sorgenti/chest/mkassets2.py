from PIL import Image
import base64, io, json
U='/mnt/user-data/uploads/'
SC=3
def webp(im,q=84):
    b=io.BytesIO();im.save(b,'WEBP',quality=q,method=6);return base64.b64encode(b.getvalue()).decode()
# nome, file, larghezza logica di riferimento sul px sorgente, scala relativa, anchor x, anchor y (sorgente)
L=[('cassa_c','aa77275a',56,1.0,510,1014),
   ('cassa_a','4a531d3d',56,895/800,525,1012),
   ('barile_a','4c157c4e',34,1.0,512,1008),
   ('barile_b','651d4567',34,1.0,512,1008),
   ('corda','01ccb45f',36,1.0,470,780)]
REF={'cassa_c':895,'cassa_a':895,'barile_a':750,'barile_b':750,'corda':900}
out={};meta={}
for n,f,w,rel,ax,ay in L:
    im=Image.open(U+f+'-image.png').convert('RGBA')
    x0,y0,x1,y1=im.split()[-1].getbbox();c=im.crop((x0,y0,x1,y1))
    ls=w/REF[n]*rel
    lw,lh=round(c.width*ls,1),round(c.height*ls,1)
    out[n]=webp(c.resize((round(lw*SC),round(lh*SC)),Image.LANCZOS))
    meta[n]=[lw,lh,round((ax-x0)*ls,1),round((ay-y0)*ls,1)];print(n,meta[n],len(out[n]))
json.dump(out,open('props_b64.json','w'));json.dump(meta,open('props_meta.json','w'))
