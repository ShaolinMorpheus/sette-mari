P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80])
    s=s.replace(a,b)
# muri invisibili in capanna: lo scavo dell'editor (EDT) ricalcolava la griglia anche sulla capanna -> pavimento non calpestabile
rep("for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++){const i=ty*MW+tx;if(mesaT[i])continue;const e=elev(tx+.5,ty+.5);elevT[i]=e;walkT[i]=e>WL+.075?1:0;",
    "for(let ty=y0;ty<=y1;ty++)for(let tx=x0;tx<=x1;tx++){const i=ty*MW+tx;if(mesaT[i]||huReg(tx,ty))continue;const e=elev(tx+.5,ty+.5);elevT[i]=e;walkT[i]=e>WL+.075?1:0;")
rep("function hutEnter(){\n  if(!HUT||P.mode==='raft')return;",
    "function hutWalk(){if(!HUT)return;for(let y=0;y<HU_H;y++)for(let x=0;x<HU_W;x++)walkT[tIdx(HUT.x0+x,HU_Y0+y)]=HUT.G[y][x]===1?1:0}\nfunction hutEnter(){\n  if(!HUT||P.mode==='raft')return;hutWalk();")
rep("function hutExit(){\n  if(!HUT)return;","function hutExit(){\n  if(!HUT)return;hutWalk();")
rep('  {v:"0.11.14",d:"25 nov 2026",','  {v:"0.11.15",d:"26 nov 2026",t:"Capanna sbloccata",n:[\n    "Dentro la capanna non ci sono più muri invisibili: si può camminare in tutte le stanze e uscire dalla porta.",\n  ]},\n  {v:"0.11.14",d:"25 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok160')
