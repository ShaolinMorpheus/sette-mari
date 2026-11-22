import sys,re
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
i=s.index("try{if(VEGPG){const im=new Image();im.onload=()=>{const[c,x]=mk(430,330);x.drawImage(im,0,0,430,330);SP.shipFixM")
j=s.index("GfxNew.rub();",i)
seg=s[i:j]
nave=re.search(r"'\+MZ23NAVE",seg) and True
NEW="""try{if(VEGPG){const DUNA=[[80.0,275.2],[85.0,294.4],[90.0,278.6],[95.0,275.0],[100.0,276.8],[105.0,277.1],[110.0,273.1],[115.0,271.9],[120.0,277.5],[125.0,283.2],[130.0,279.9],[135.0,275.3],[140.0,277.3],[145.0,270.4],[150.0,262.7],[155.0,256.9],[160.0,259.1],[165.0,263.0],[170.0,261.1],[175.0,259.1],[180.0,263.8],[185.0,268.7],[190.0,265.3],[195.0,259.1],[200.0,258.0],[205.0,259.0],[210.0,253.0],[215.0,245.3],[220.0,245.9],[225.0,249.8],[230.0,248.8],[235.0,244.8],[240.0,246.8],[245.0,251.1],[250.0,248.0],[255.0,240.0],[260.0,236.1],[265.0,236.3],[270.0,231.7],[275.0,223.8],[280.0,221.4],[285.0,227.5],[290.0,228.9],[295.0,233.1],[300.0,218.4],[305.0,220.2],[310.0,216.8],[315.0,205.9],[320.0,197.0],[325.0,193.6],[330.0,187.2],[335.0,174.4],[340.0,163.2],[345.0,158.7],[350.0,145.8],[355.0,150.1],[360.0,158.0],[360.0,158.0],[355.0,172.8],[350.0,189.8],[345.0,208.5],[340.0,221.4],[335.0,234.7],[330.0,246.5],[325.0,256.8],[320.0,264.9],[315.0,269.9],[310.0,271.6],[305.0,271.3],[300.0,270.9],[295.0,283.9],[290.0,275.5],[285.0,276.1],[280.0,276.2],[275.0,278.8],[270.0,280.8],[265.0,283.0],[260.0,285.0],[255.0,287.0],[250.0,288.8],[245.0,290.8],[240.0,292.5],[235.0,294.0],[230.0,296.0],[225.0,297.8],[220.0,299.8],[215.0,300.8],[210.0,302.5],[205.0,304.0],[200.0,304.8],[195.0,306.0],[190.0,307.0],[185.0,308.2],[180.0,309.0],[175.0,309.8],[170.0,310.5],[165.0,311.2],[160.0,311.8],[155.0,312.2],[150.0,312.8],[145.0,314.2],[140.0,321.8],[135.0,321.8],[130.0,323.0],[125.0,323.2],[120.0,322.2],[115.0,323.5],[110.0,324.8],[105.0,326.0],[100.0,328.0],[95.0,329.5],[90.0,329.0],[85.0,316.0],[80.0,275.2]];const imS=new Image(),imD=new Image();let nL=0;
  // Sirena nella sabbia: la sabbia di Muse diventa una duna ovale a bordi morbidi e nasconde la carena nera
  const go=()=>{if(++nL<2)return;const W=430,H=330;
    const[cs,xs]=mk(W,H);xs.filter='saturate(1.9) brightness(.9)';xs.drawImage(imD,0,0,W,H);xs.filter='none';
    const[cb,xb]=mk(W,H);xb.filter='blur(3px)';xb.drawImage(cs,0,0,W,H);xb.filter='none';
    xb.globalCompositeOperation='destination-in';
    {const[cm,xm]=mk(W,H);xm.filter='blur(3px)';xm.fillStyle='#000';xm.beginPath();DUNA.forEach((q,i)=>i?xm.lineTo(q[0],q[1]):xm.moveTo(q[0],q[1]));xm.closePath();xm.fill();xm.filter='none';xb.drawImage(cm,0,0,W,H)}
    xb.globalCompositeOperation='source-over';
    const[c,x]=mk(W,H);x.drawImage(imS,0,0,W,H);x.globalCompositeOperation='destination-out';x.drawImage(cb,0,0,W,H);
    x.globalCompositeOperation='source-over';x.drawImage(cb,0,0,W,H);
    SP.shipFixM={c,w:W,h:H,ax:215,ay:295,_x:x}};
  imS.onload=go;imD.onload=go;imS.src='data:image/webp;base64,'+MZ23NAVE;imD.src='data:image/webp;base64,'+MZ23SAB}}catch(e){}"""
s=s[:i]+NEW+s[j:]
a="drawSp(g,s,0,2*kk,kk);if(SP.shipSandM)drawSp(g,SP.shipSandM,0,2*kk,kk);g.restore();return}"
if s.count(a)!=1:print('FAIL draw');sys.exit(1)
s=s.replace(a,"drawSp(g,s,0,2*kk,kk);g.restore();return}")
open(P,'w',encoding='utf8').write(s);print('patch130 ok')
