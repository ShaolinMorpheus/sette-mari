import sys,json,re
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('FAIL',s.count(a),a[:90]);sys.exit(1)
    s=s.replace(a,b)
# 1) viso piu' roseo sui fotogrammi del Capitano/marinaio (RIGMART, RIGNP)
R=json.load(open('/home/claude/work/rig_roseo.json'))
for name in ('RIGMART','RIGNP'):
    tag='var '+name+'='
    i=s.index(tag)+len(tag);o,e=json.JSONDecoder().raw_decode(s[i:])
    for part,d in R[name].items():
        for k,v in d.items():o[part][k]=v
    s=s[:i]+json.dumps(o,separators=(',',':'))+s[i+e:]
# 2) Gnocco: tolta la fetta del fotogramma vicino che finiva davanti alla faccia
g=open('/home/claude/work/gnocco_d2.b64').read().strip()
m=list(re.finditer(r'"gnocco/profilo-destro-passo2":\s*"([^"]+)"',s))
if len(m)!=1:print('FAIL gnocco');sys.exit(1)
s=s[:m[0].start(1)]+g+s[m[0].end(1):]
# 3) Nives: a sinistra usa i fotogrammi di destra specchiati (quelli a sinistra guardavano a destra)
rep("const k=w+'/'+(mv?dr+'-passo'+i:'fronte-fermo'),im=nomImg(k)","const mr=w==='nives'&&mv&&dr==='profilo-sinistro',k=w+'/'+(mv?(mr?'profilo-destro':dr)+'-passo'+i:'fronte-fermo'),im=nomImg(k)")
rep("  g.drawImage(im,-W/2,-H,W,H);\n  if(o.emote)","  if(mr){g.save();g.scale(-1,1);g.drawImage(im,-W/2,-H,W,H);g.restore()}else g.drawImage(im,-W/2,-H,W,H);\n  if(o.emote)")
# 4) Nives un po' piu' piccola
rep("NOMF={ferro:1.06,nives:1,","NOMF={ferro:1.06,nives:.88,")
open(P,'w',encoding='utf8').write(s);print('ok146')
