from PIL import Image
import numpy as np, base64, io, json
U='/mnt/user-data/uploads/'
SC=3  # px sorgente per px logico
def webp(im,q=84):
    b=io.BytesIO();im.save(b,'WEBP',quality=q,method=6);return base64.b64encode(b.getvalue()).decode()
meta={};out={}
# (nome, file, larghezza-corpo logica di riferimento, anchor x, anchor y in px sorgente, scala relativa)
CH=[('ferro_c','dee2b18c',60,512,1010,1.0),
    ('ferro_a','8d2bded5',60,487,1004,900/790),
    ('oro_c','28ca741c',60,512,1010,1.0),
    ('oro_a','db48749a',60,548,985,900/825)]
for n,f,w,ax,ay,rel in CH:
    im=Image.open(U+f+'-image.png').convert('RGBA')
    x0,y0,x1,y1=im.split()[-1].getbbox()
    c=im.crop((x0,y0,x1,y1))
    ls=w/900*rel            # px logici per px sorgente
    lw,lh=round(c.width*ls,1),round(c.height*ls,1)
    c2=c.resize((round(lw*SC),round(lh*SC)),Image.LANCZOS)
    out[n]=webp(c2)
    meta[n]=[lw,lh,round((ax-x0)*ls,1),round((ay-y0)*ls,1)]
    print(n,meta[n],len(out[n]))
# falò
bs=Image.open('/home/claude/work/fire/base_nofire.png').convert('RGBA')
fl=Image.open('/home/claude/work/fire/flame_only.png').convert('RGBA')
ls=84/900
bx0,by0,bx1,by1=bs.split()[-1].getbbox()
fx0,fy0,fx1,fy1=fl.split()[-1].getbbox()
AX,AY=512,905
def put(im,box,key):
    x0,y0,x1,y1=box;c=im.crop(box);lw,lh=round((x1-x0)*ls,1),round((y1-y0)*ls,1)
    out[key]=webp(c.resize((round(lw*SC),round(lh*SC)),Image.LANCZOS),82)
    meta[key]=[lw,lh,round((AX-x0)*ls,1),round((AY-y0)*ls,1)]
    print(key,meta[key],len(out[key]))
put(bs,(bx0,by0,bx1,by1),'falo_b');put(fl,(fx0,fy0,fx1,fy1),'falo_f')
json.dump(out,open('chest_b64.json','w'));json.dump(meta,open('chest_meta.json','w'))
