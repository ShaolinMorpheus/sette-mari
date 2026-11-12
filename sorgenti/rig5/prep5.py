import json,base64,io
from PIL import Image
out={};dims={}
CROP=(320,170,880,1185)  # x0,y0,x1,y1 comune a tutti i fotogrammi
S=.5
for v in ['fronte','spalle','profilo']:
    for k in ['fermo','cammina-1','cammina-2','cammina-3','cammina-4','colpo-1','colpo-2','colpo-3']:
        im=Image.open('zip/%s-%s.png'%(v,k)).convert('RGBA').crop(CROP)
        sm=im.resize((int(im.width*S),int(im.height*S)),Image.LANCZOS)
        b=io.BytesIO();sm.save(b,'WEBP',quality=82,method=6)
        out['%s-%s'%(v,k)]=base64.b64encode(b.getvalue()).decode();dims['%s-%s'%(v,k)]=list(im.size)
json.dump({'img':out,'dim':dims,'anc':[600-CROP[0],1179-CROP[1]]},open('rig_art5.json','w'))
print(len(out),sum(len(x) for x in out.values())//1024,'KB')
