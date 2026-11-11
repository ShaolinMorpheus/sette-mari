#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH56 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
# 1) cassa (baule di legno) più piccola: ~80%
rep('"cassa_c": [56.3, 47.3, 28.0, 46.7]','"cassa_c": [45.0, 37.8, 22.4, 37.4]')
rep('"cassa_a": [58.4, 63.0, 30.1, 62.2]','"cassa_a": [46.7, 50.4, 24.1, 49.8]')
# 2) muro invisibile = esatta forma disegnata (maschera dall'alpha dello sprite), anche per cassa/forziere APERTI
rep("      if(e.id==='lt_flint')return SP.barrel[1];if(e.id==='lt_line'||e.kind===8)return SP.crate;\n      return SP.chest[e.kind]&&SP.chest[e.kind][0];",
    "      if(e.id==='lt_flint')return SP.barrel[1];if(e.id==='lt_line'||e.kind===8)return e.got?SP.crateO:SP.crate;\n      return SP.chest[e.kind]&&SP.chest[e.kind][e.got?1:0];")
rep("function obrBuild(){\n  OBR.length=0;",
"""function sprMask(s){
  if(s._cm)return s._cm;
  let rs=[];
  try{
    const c=s.c;if(!c||!c.width)return null;const k=c.width/s.w,W=c.width,H=c.height,d=c.getContext('2d').getImageData(0,0,W,H).data,band=3;let prev=null;
    for(let y=0;y<s.h;y+=band){
      let mn=1e9,mx=-1,y0=Math.floor(y*k),y1=Math.min(H-1,Math.floor((y+band)*k));
      for(let yy=y0;yy<=y1;yy++)for(let xx=0;xx<W;xx++)if(d[(yy*W+xx)*4+3]>60){if(xx<mn)mn=xx;if(xx>mx)mx=xx}
      if(mx<0){prev=null;continue}
      const x0=mn/k-s.ax+.5,x1=(mx+1)/k-s.ax-.5,ya=y-s.ay,yb=y+band-s.ay;
      if(prev&&Math.abs(prev[0]-x0)<2.2&&Math.abs(prev[1]-x1)<2.2){prev[0]=Math.min(prev[0],x0);prev[1]=Math.max(prev[1],x1);prev[3]=yb}
      else{prev=[x0,x1,ya,yb];rs.push(prev)}
    }
  }catch(_){return null}
  if(!rs.length)return null;
  return s._cm=rs;
}
function obrBuild(){
  OBR.length=0;""")
rep("""    const cx=e.x-s.ax+s.w/2,hw=s.w*(s.art?.47:.4),dp=s.art?Math.min(s.ay*.92,54):Math.min(s.h*.6,36);
    const o={x0:cx-hw,x1:cx+hw,y0:e.y-dp,y1:e.y+(s.art?1:2),e};
    if(P.x>o.x0-12&&P.x<o.x1+12&&P.y>o.y0-12&&P.y<o.y1+12)continue;   // se ci sei già dentro, esci prima
""","""    const m=s.art?sprMask(s):null;let o;
    if(m){
      const rs=m.map(r=>[e.x+r[0],e.x+r[1],e.y+r[2],e.y+r[3]]);
      o={x0:Math.min(...rs.map(r=>r[0])),x1:Math.max(...rs.map(r=>r[1])),y0:rs[0][2],y1:rs[rs.length-1][3],e,rs};
      if(rs.some(r=>P.x>r[0]-12&&P.x<r[1]+12&&P.y>r[2]-12&&P.y<r[3]+12))continue;   // se ci sei già dentro, esci prima
    }else{
      const cx=e.x-s.ax+s.w/2,hw=s.w*(s.art?.47:.4),dp=s.art?Math.min(s.ay*.92,54):Math.min(s.h*.6,36);
      o={x0:cx-hw,x1:cx+hw,y0:e.y-dp,y1:e.y+(s.art?1:2),e};
      if(P.x>o.x0-12&&P.x<o.x1+12&&P.y>o.y0-12&&P.y<o.y1+12)continue;
    }
""")
rep("for(const o of OBR){if(x+rx>o.x0&&x-rx<o.x1&&y+ry>o.y0&&y-ry<o.y1)return false}",
    "for(const o of OBR){if(x+rx>o.x0&&x-rx<o.x1&&y+ry>o.y0&&y-ry<o.y1){if(!o.rs)return false;for(const r of o.rs)if(x+rx>r[0]&&x-rx<r[1]&&y+ry>r[2]&&y-ry<r[3])return false}}")
rep("for(const o of OBR)g.strokeRect(o.x0,o.y0,o.x1-o.x0,o.y1-o.y0);","for(const o of OBR){if(o.rs){for(const r of o.rs)g.strokeRect(r[0],r[2],r[1]-r[0],r[3]-r[2])}else g.strokeRect(o.x0,o.y0,o.x1-o.x0,o.y1-o.y0)}") if "for(const o of OBR)g.strokeRect(o.x0,o.y0,o.x1-o.x0,o.y1-o.y0);" in src else None
# ricostruisci i muri quando una cassa/forziere si apre o l'editor sposta/crea/toglie oggetti
rep("const cs=e.got?SP.crateO:SP.crate;","if(!!e.got!==!!e._gb){e._gb=!!e.got;window.__obrDirty=1}const cs=e.got?SP.crateO:SP.crate;")
rep("{const cs=SP.chest[e.kind][e.got?1:0];","{if(!!e.got!==!!e._gb){e._gb=!!e.got;window.__obrDirty=1}const cs=SP.chest[e.kind][e.got?1:0];")
rep("function edMove(e,x,y){","function edMove(e,x,y){window.__obrDirty=1;")
rep("function edMake(d){","function edMake(d){window.__obrDirty=1;")
rep("function edRemove(e){","function edRemove(e){window.__obrDirty=1;")
k='    "Conchiglie più piccole'
rep(k,'    "Baule di legno (cassa) più piccolo; muri invisibili di casse, forzieri e botti ora seguono esattamente la forma disegnata, anche da aperti.",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch56 ok')
