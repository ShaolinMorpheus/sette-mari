import json,base64,io,os
from PIL import Image
import numpy as np
names=sorted(set(n[:-6] for n in os.listdir('layers3') if n.endswith('_f.png')))
SC=.45;art={};E={};icons={}
for nm in names:
    art[nm]={};E[nm]={}
    for k in 'fsb':
        im=Image.open('layers3/%s_%s.png'%(nm,k)).convert('RGBA')
        sm=im.resize((int(im.width*SC),int(im.height*SC)),Image.LANCZOS)
        b=io.BytesIO();sm.save(b,'WEBP',quality=84,method=6);art[nm][k]=base64.b64encode(b.getvalue()).decode()
        art[nm]['w'+k]=im.width;art[nm]['h']=im.height
        e=Image.open('layers3/%s_%s_E.png'%(nm,k)).convert('L').point(lambda v:min(255,int(v*2.2)));a=e.resize((int(e.width*SC),int(e.height*SC)),Image.LANCZOS)
        rgba=Image.merge('RGBA',[Image.new('L',a.size,255)]*3+[a])
        b=io.BytesIO();rgba.save(b,'WEBP',quality=92,method=6);E[nm][k]=base64.b64encode(b.getvalue()).decode()
    im=Image.open('layers3/%s_f.png'%nm).convert('RGBA');bb=im.getchannel('A').point(lambda v:255 if v>40 else 0).getbbox()
    c=im.crop(bb);W=112;s=min(92/c.width,92/c.height);c=c.resize((max(1,int(c.width*s)),max(1,int(c.height*s))),Image.LANCZOS)
    bg=Image.new('RGBA',(W,W));px=bg.load()
    for y in range(W):
        for x in range(W):
            d=min(1,((x-W*.4)**2+(y-W*.3)**2)**.5/(W*.75))
            px[x,y]=(int(255+(217-255)*d),int(243+(168-243)*d),int(200+(90-200)*d),255)
    bg.alpha_composite(c,((W-c.width)//2,(W-c.height)//2+2))
    b=io.BytesIO();bg.convert('RGB').save(b,'WEBP',quality=85);icons[nm]='data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()
MAP={'h_tri':'h_tri','h_corona':'h_corona','h_lupo':'h_lupo','h_cuoco':'h_cuoco','h_cremisi':'h_cremisi','h_elmo':'h_elmo','h_conch':'h_conch','h_piume':'h_piume','h_occh':'h_occh','h_comm':'h_comm','h_minat':'h_minat',
 'h_band':'bandanarighe','h_logoro':'logoro','h_piumabianca':'piumabianca','h_cuoio':'cuoio','h_blumerletto':'blumerletto','h_bandanera':'bandananera','h_cappiuma':'cappellopiuma','h_morionescuro':'morionescuro'}
json.dump({'art':art,'E':E,'icons':icons,'ML':120,'MT':200,'WC':{'f':520,'s':510,'b':520},'H':500,'map':MAP},open('/home/claude/work/r3d/hat_art.json','w'))
print(len(names),sum(len(v) for a in list(art.values())+list(E.values()) for v in a.values() if isinstance(v,str))//1024,'KB')
