#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b):
    global src
    if src.count(a)!=1:print('PATCH116 FAIL',src.count(a),a[:70]);sys.exit(1)
    src=src.replace(a,b)
# --- pappagallo meno chiacchierone ---
rep("PQ.helpCd=170+Math.random()*130;Story.parrotGift()","PQ.helpCd=320+Math.random()*200;Story.parrotGift()")
rep("PQ.scoutCd<=0&&!P.act&&!SC.e){PQ.scoutCd=30;if(Math.random()<.4)Story.startScout()}","PQ.scoutCd<=0&&!P.act&&!SC.e){PQ.scoutCd=45;if(Math.random()<.18)Story.startScout()}")
rep("SC.e=c.e;SC.t=0;PQ.scoutCd=170+Math.random()*90;","SC.e=c.e;SC.t=0;PQ.scoutCd=380+Math.random()*180;")
rep("  PQ.t=70+Math.random()*60;\n","  PQ.t=190+Math.random()*140;\n")
# freno generale: battute non urgenti (<=4.4 s) distanziate di almeno 50 s
rep("function say(e,txt,dur){if(e===PAR&&typeof sfx==='function'){",
"function say(e,txt,dur){if(e===PAR){const _n=performance.now();if((dur||3.2)<=4.4&&!/torcia|tempesta|fulmini|lampi/i.test(String(txt))&&_n-(PAR._lastSay||-1e9)<50000)return;PAR._lastSay=_n}if(e===PAR&&typeof sfx==='function'){")

# --- freccia verso l'isola quando si e' in mare (dopo il cambio zona) ---
rep("Story.marker=function(){\n  if(!S||!S.track)return null;\n  const q=S.q[S.track];if(!q||q.st!=='active')return null;\n  const g=curGoal(S.track);return g&&g.mark?g.mark():null;\n};",
r"""const SEAG={told:0};
function seaGoalMark(){
  if(!S||!S.live||P.mode!=='raft'||PAUSED)return null;
  let gx,gy;
  if(WORLD===1){if(!S.flags.sailed)return null;gx=C0.x;gy=C0.y}
  else if(WORLD===2){if(S.c2&&S.c2.sea){gx=19.4;gy=31.2}else{gx=C0.x;gy=C0.y}}
  else return null;
  const dx=gx*TS-P.x,dy=gy*TS-P.y;
  if(hyp(dx,dy)<26*TS)return null;
  if(!SEAG.told&&!dl.open){SEAG.told=1;try{UI.toast('Rotta: l\'isola è verso '+bearingTxt(dx,dy)+'. Segui la freccia dorata (anche sulla minimappa).',6500)}catch(e){}}
  return{x:gx*TS,y:gy*TS,r:0,up:60,sea:1,lab:WORLD===2&&S.c2&&S.c2.sea?'Baia dei Fuggiaschi':'Isola'};
}
Story.marker=function(){
  if(!S||!S.track)return seaGoalMark();
  const q=S.q[S.track];if(!q||q.st!=='active')return seaGoalMark();
  const g=curGoal(S.track);const m=g&&g.mark?g.mark():null;return m||seaGoalMark();
};""")
rep("    if(!hasCompass()&&mi.d>TS*14){g.restore();return}\n","    if(!hasCompass()&&!m.sea&&mi.d>TS*14){g.restore();return}\n")
rep("  }else if(hasCompass()){\n    const cx=VW/2,cy=VH/2,dx=sx-cx,dy=sy-cy,ang=Math.atan2(dy,dx);","  }else if(hasCompass()||m.sea){\n    const cx=VW/2,cy=VH/2,dx=sx-cx,dy=sy-cy,ang=Math.atan2(dy,dx);")
rep("g.rotate(ang);g.fillStyle='#ffd23a';g.beginPath();g.moveTo(11,0);g.lineTo(-6,-8);g.lineTo(-2,0);g.lineTo(-6,8);g.closePath();g.fill();\n  }\n  g.restore();",
"g.rotate(ang);g.fillStyle='#ffd23a';g.beginPath();g.moveTo(11,0);g.lineTo(-6,-8);g.lineTo(-2,0);g.lineTo(-6,8);g.closePath();g.fill();\n    if(m.sea&&m.lab){g.rotate(-ang);g.font='800 12px Nunito,Arial,sans-serif';g.textAlign='center';g.lineWidth=3.5;g.strokeStyle='rgba(30,16,8,.9)';const ty=ey>VH/2?-26:32;g.strokeText(m.lab,0,ty);g.fillStyle='#ffe9a0';g.fillText(m.lab,0,ty)}\n  }\n  g.restore();")
rep("  // il giocatore\n  try{X2.mini(g,mxw,myw)}catch(e){}",
r"""  {const sm=Story.marker();if(sm&&sm.sea){let x=mxw(sm.x),y=myw(sm.y);const dd=hyp(x-cxm,y-cym),lim=R-10;
    if(dd>lim){x=cxm+(x-cxm)/dd*lim;y=cym+(y-cym)/dd*lim}
    g.save();g.translate(x,y);g.fillStyle='rgba(42,26,14,.92)';g.beginPath();g.arc(0,0,9,0,7);g.fill();g.strokeStyle='#ffd23a';g.lineWidth=2;g.stroke();
    if(dd>lim){g.rotate(Math.atan2(y-cym,x-cxm));g.fillStyle='#ffd23a';g.beginPath();g.moveTo(6.5,0);g.lineTo(-4,-5.5);g.lineTo(-1.5,0);g.lineTo(-4,5.5);g.closePath();g.fill()}
    else{g.fillStyle='#ffd23a';g.beginPath();g.arc(0,2.5,4.2,Math.PI,0);g.fill();g.fillRect(-.8,-4.5,1.6,7)}
    g.restore()}}
  // il giocatore
  try{X2.mini(g,mxw,myw)}catch(e){}""")

open(P,'w',encoding='utf8').write(src)
print('PATCH116 ok')
