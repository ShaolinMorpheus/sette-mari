import sys,json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
A=json.dumps(json.load(open('/home/claude/work/tur_assets.json')))
def rep(a,b):
    global s
    if s.count(a)!=1:print('FAIL',s.count(a),a[:80]);sys.exit(1)
    s=s.replace(a,b)
i=s.index("      if(false&&k===0){const a=t*.12+i")
j=s.index("      else if(FULL&&k===1&&!q)",i)
NEW="""      if(k===0&&((i/9)%6===0)&&TURM.ok()){const a=t*.12+i,x=gl[0]+Math.sin(a)*34,y=gl[1]+Math.cos(a*.8)*22,rot=Math.atan2(Math.cos(a*.8)*-22*.8,Math.cos(a)*34),nm=(i%2?'cucciola':'verde')+(1+(((t*8+i)|0)%8)),im=TURM.im[nm];
        gg.save();gg.imageSmoothingQuality='high';gg.translate(x+3,y+4);gg.rotate(rot);gg.globalAlpha=.16;gg.filter='brightness(0)';gg.drawImage(im,-58,-43,115,86);gg.restore();
        gg.save();gg.imageSmoothingQuality='high';gg.translate(x,y);gg.rotate(rot);gg.globalAlpha=.95;gg.drawImage(im,-58,-43,115,86);gg.restore()}
"""
s=s[:i]+NEW+s[j:]
rep("  let AN=null;\n  function mkAn(){","""  const TURA=%s;
  const TURM=(()=>{const o={im:{},n:0,st:0},ks=Object.keys(TURA);
    o.ok=()=>{if(!o.st){o.st=1;if(GFXN&&VEGPG){o.on=1;for(const k of ks){const im=new Image();im.onload=()=>{o.n++};im.src='data:image/webp;base64,'+TURA[k];o.im[k]=im}}}return !!o.on&&o.n>=ks.length};
    return o})();
  let AN=null;
  function mkAn(){""" % A)
open(P,'w',encoding='utf8').write(s);print('ok142')
