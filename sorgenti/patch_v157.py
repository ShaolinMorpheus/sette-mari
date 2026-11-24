P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80])
    s=s.replace(a,b)
# se un oggetto/pesce va in errore il disegno non deve rompere tutta la scena: si ripristina lo stato del canvas
rep("if(typeof NVDX!=='undefined'&&NVDX[e.spr]){NVDX[e.spr](g,e,t);return}",
    "if(typeof NVDX!=='undefined'&&NVDX[e.spr]){const _tf=g.getTransform(),_ga=g.globalAlpha,_gc=g.globalCompositeOperation;try{NVDX[e.spr](g,e,t)}catch(er){g.setTransform(_tf);g.globalAlpha=_ga;g.globalCompositeOperation=_gc;if(!window.__nvE){window.__nvE=1;try{console.warn('nvd',e.spr,er)}catch(_){}}}return}")
rep("try{NVF.draw(g,t,vx0,vy0,vx1,vy1)}catch(e){}",
    "{const _tf=g.getTransform(),_ga=g.globalAlpha,_gc=g.globalCompositeOperation;try{NVF.draw(g,t,vx0,vy0,vx1,vy1)}catch(e){g.setTransform(_tf);g.globalAlpha=_ga;g.globalCompositeOperation=_gc}}")
# baule: resta chiuso (il coperchio aperto era tagliato e si apriva da solo)
rep("const open=hyp(P.x-e.x,P.y-e.y)<TS*2.4;","const open=false;")
rep('  {v:"0.11.11",d:"24 nov 2026",','  {v:"0.11.12",d:"24 nov 2026",t:"Correzioni al campo",n:[\n    "Se un oggetto o un pesce ha un problema di disegno, non fa più sparire tutta la scena e il personaggio.",\n    "Il baule resta chiuso e non si apre più quando ti avvicini.",\n  ]},\n  {v:"0.11.11",d:"24 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok157')
