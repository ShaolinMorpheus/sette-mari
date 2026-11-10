#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH35 FAIL (%d trovati, attesi %d):'%(n,cnt),old[:110].replace('\n','\\n')); sys.exit(1)
    src=src.replace(old,new)
# 1) coda dei banner: uno alla volta, piu' lenti, senza accavallarsi
OLD="""UI.banner=function(t,sub,img){
  t=pn(t);sub=pn(sub||'');
  const b=$('qbanner');b.innerHTML=(img?'<img alt="" src="'+img+'" style="display:block;margin:0 auto 4px;width:92px;height:58px">':'')+'<div class="rib">'+uEsc(t)+'</div><small>'+uEsc(sub||'').replace(/\\n/g,'<br>')+'</small>';
  b.hidden=false;b.style.animation='none';void b.offsetWidth;b.style.animation='';
  clearTimeout(bannerT);bannerT=setTimeout(()=>{b.hidden=true},4300);
};"""
NEW="""let bannerQ=[],bannerBusy=false;
function bannerNext(){
  const q=bannerQ.shift();if(!q){bannerBusy=false;return}
  bannerBusy=true;const t=q[0],sub=q[1],img=q[2];
  const b=$('qbanner');b.innerHTML=(img?'<img alt="" src="'+img+'" style="display:block;margin:0 auto 4px;width:92px;height:58px">':'')+'<div class="rib">'+uEsc(t)+'</div><small>'+uEsc(sub||'').replace(/\\n/g,'<br>')+'</small>';
  b.hidden=false;b.style.animation='none';void b.offsetWidth;b.style.animation='';
  clearTimeout(bannerT);bannerT=setTimeout(()=>{b.hidden=true;setTimeout(bannerNext,500)},bannerQ.length?3000:4300);
}
UI.banner=function(t,sub,img){
  t=pn(t);sub=pn(sub||'');
  if(bannerQ.some(q=>q[0]===t&&q[1]===sub))return;
  if(bannerQ.length>=6)bannerQ.shift();
  bannerQ.push([t,sub,img]);if(!bannerBusy)bannerNext();
};"""
rep(OLD,NEW)
# 2) il pappagallo si posa in cima al palo della zattera
rep("  let tx=P.x+(P.flip?30:-30),ty=P.y-6;\n","  if(P.mode==='raft'&&WORLD!==3){const c_=Math.cos(P.hd),s_=Math.sin(P.hd),mx_=P.x+c_*13.3,my_=P.y+8+s_*13.3,k_=1-Math.exp(-dt*6);e.x+=(mx_-e.x)*k_;e.y+=(my_+6-e.y)*k_;e.alt+=(150-e.alt)*k_;e.perch=true;e.fl=0;e.flip=c_<0;return}\n  e.perch=false;\n  let tx=P.x+(P.flip?30:-30),ty=P.y-6;\n")

# 3) funghi di bosco + ricette
rep("fruttasec','fungo'];","fruttasec','fungo','funghetti'];")
rep("fruttasec:'Frutta secca',fungo:'Fungo lunare'};","fruttasec:'Frutta secca',fungo:'Fungo lunare',funghetti:'Funghi di bosco'};")
rep("fruttasec:12,fungo:6};","fruttasec:12,fungo:6,funghetti:10};")
rep("const RWHERE={legna:","const RWHERE={funghetti:\"Ogni giorno ne spuntano alcuni nel bosco: cercali tra gli alberi e raccoglili. Crudi non si mangiano: servono per le ricette.\",legna:")
rep('<symbol id="i-fungo"','<symbol id="i-funghetti" viewBox="0 0 24 24"><path d="M12 5C6.6 5 3.6 8.8 3.8 12.2c0 .9.8 1.5 1.7 1.5h13c.9 0 1.7-.6 1.7-1.5C20.4 8.8 17.4 5 12 5z" fill="#b5532e" stroke="#3a2412" stroke-width="1.3"/><circle cx="8.6" cy="9.4" r="1.4" fill="#f3d9b0"/><circle cx="14.4" cy="8.2" r="1.1" fill="#f3d9b0"/><circle cx="16.2" cy="11" r=".9" fill="#f3d9b0"/><path d="M9.4 13.7h5.2l-.7 6.2c-.1.8-.7 1.3-1.5 1.3h-.8c-.8 0-1.4-.5-1.5-1.3z" fill="#efe3c4" stroke="#3a2412" stroke-width="1.3"/></symbol><symbol id="i-fungo"')
rep("h:96,t:20,buff:480,bres:480}\n];","h:96,t:20,buff:480,bres:480},\n  {id:'funghibr',n:\"Funghi alla brace\",d:\"Funghi di bosco arrostiti con un po' di legna: profumati e sazianti.\",cost:{funghetti:3,legna:1},h:42,t:0},\n  {id:'zuppafunghi',n:\"Zuppa di funghi\",d:\"Funghi e latte di cocco in pentola. Ti dà energia per cinque minuti.\",cost:{funghetti:3,coco:1},h:46,t:22,buff:300},\n  {id:'spiedinobosco',n:\"Spiedino del bosco\",d:\"Pesce e funghi sullo stesso spiedo, sulla brace.\",cost:{pesce:1,funghetti:2,legna:1},h:62,t:0}\n];")
rep("function drawGlint(g,e,t){\n  if(e.got)return;","function drawGlint(g,e,t){\n  if(e.got)return;\n  if(e.gk==='funghi'){X2.mushDraw(g,e,t);return}")

rep('    "Il mercante di passaggio ora ha lo stesso stile','    "Funghi di bosco: ogni giorno ne spuntano alcuni nel bosco. Crudi non si mangiano, ma con la legna, il cocco o il pesce diventano tre nuove ricette.",\n    "Le scritte di missione completata ora arrivano una alla volta, più lente. Il pappagallo spiega come usare la mappa del tesoro e, in zattera, si posa in cima al palo. I gabbiani ora volano sull\'isola e non seguono più lo schermo.",\n    "Il mercante di passaggio ora ha lo stesso stile')
open(P,'w',encoding='utf8').write(src)
print('patch35 ok')
