import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    if s.count(a)!=1:print('FAIL',s.count(a),a[:80]);sys.exit(1)
    s=s.replace(a,b)
# editor: rotazione della nave
rep("vv:(o&&o.vv)||{},t:(o&&o.t)||[],wl:(o&&o.wl)||[]});","vv:(o&&o.vv)||{},t:(o&&o.t)||[],wl:(o&&o.wl)||[],rt:(o&&o.rt)||{}});")
rep("  for(const id in o.vv){const e=EID[id];if(e&&'v' in e)e.v=o.vv[id]}\n}","  for(const id in o.vv){const e=EID[id];if(e&&'v' in e)e.v=o.vv[id]}\n  for(const id in o.rt){const e=EID[id];if(e)e.rotD=o.rt[id]}\n}")
rep("if(ED.ed.wl&&ED.ed.wl.length)o.wl=ED.ed.wl;","if(ED.ed.wl&&ED.ed.wl.length)o.wl=ED.ed.wl;if(ED.ed.rt&&Object.keys(ED.ed.rt).length)o.rt=ED.ed.rt;")
rep("+(edMaxV(e)>1?'<button class=\"btn\" id=\"edVar\">Aspetto</button>':'')","+(edMaxV(e)>1?'<button class=\"btn\" id=\"edVar\">Aspetto</button>':'')+(e.id==='nave'?'<button class=\"btn\" id=\"edRl\">⟲ Ruota</button><button class=\"btn\" id=\"edRr\">Ruota ⟳</button><small>'+Math.round(e.rotD||0)+'°</small>':'')")
rep("  if(q('edAdd'))q('edAdd').onclick=edPalette;\n}","  if(q('edRl')&&q('edRr')){const rot=d=>{const e=ED.sel;if(!e)return;const o=e.rotD||0,n=Math.round(o+d);e.rotD=n;ED.ed.rt=ED.ed.rt||{};ED.ed.rt[e.id]=n;edStore();try{navBlkSync(e)}catch(x){}ED.undo.push(()=>{e.rotD=o;ED.ed.rt[e.id]=o;edStore();try{navBlkSync(e)}catch(x){}});edLabel()};q('edRl').onclick=()=>rot(-3);q('edRr').onclick=()=>rot(3)}\n  if(q('edAdd'))q('edAdd').onclick=edPalette;\n}")
# geometria ruotata
a=s.index("function nvStrips(e,list)");b=s.index("function drawNaveStrip")
s=s[:a]+"""function nvW(e,q){const k=e.k||1,d=NVSD[e.spr],a=(e.rotD||0)*Math.PI/180;let x=(q[0]-215)*k,y=(q[1]-295)*k+2*k;if(a&&d){const px=(d.ring[0]-215)*k,py=(d.ring[1]-295)*k+2*k,c=Math.cos(a),sn=Math.sin(a),dx=x-px,dy=y-py;x=px+dx*c-dy*sn;y=py+dx*sn+dy*c}return[e.x+52*k+x,e.y+62*k+y]}
function nvRotG(g,e,k){const a=(e.rotD||0)*Math.PI/180,d=NVSD[e.spr];if(!a||!d)return;const px=(d.ring[0]-215)*k,py=(d.ring[1]-295)*k+2*k;g.translate(px,py);g.rotate(a);g.translate(-px,-py)}
function nvStrips(e,list){const d=NVSD[e.spr];if(!d)return;const N=10,w=(d.x1-d.x0)/N;for(let i=0;i<N;i++){const cx=d.x0+w*(i+.5);list.push({type:'navestrip',e,i,N,sy:nvW(e,[cx,nvLn(d.b,cx)])[1]})}}
"""+s[b:]
rep("  g.save();g.translate(e.x+52*k,e.y+62*k);\n  const l=o.i?","  g.save();g.translate(e.x+52*k,e.y+62*k);nvRotG(g,e,k);\n  const l=o.i?")
rep("const key=e.x+','+e.y+','+(e.k||1)+','+e.spr;","const key=e.x+','+e.y+','+(e.k||1)+','+e.spr+','+(e.rotD||0);")
rep("W=q=>[ox+(q[0]-215)*k,oy+(q[1]-295)*k];","W=q=>nvW(e,q);")
rep("x=e.x+52*k+(r[0]-215)*k;y=e.y+64*k+(r[1]-295)*k;rx=r[2]*k;ry=r[3]*k;rot=r[4]}","{const c=nvW(e,[r[0],r[1]]);x=c[0];y=c[1]}rx=r[2]*k;ry=r[3]*k;rot=r[4]+(e.rotD||0)*Math.PI/180}")
rep("if(s.nav){const kk=e.k||1;g.save();g.translate(e.x+52*kk,e.y+62*kk);","if(s.nav){const kk=e.k||1;g.save();g.translate(e.x+52*kk,e.y+62*kk);nvRotG(g,e,kk);")
open(P,'w',encoding='utf8').write(s);print('patch136 ok')
