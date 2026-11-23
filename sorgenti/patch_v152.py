P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:70])
    s=s.replace(a,b)
# tavolata piu' piccola (x0.72) con collisione in proporzione
rep("table:[-76,76,-14,21]","table:[-55,55,-10,15]")
rep("g.save();g.translate(e.x,e.y);shadow(g,0,6,92,13,.25);\n    const L=['tavolata-panca-dietro'","g.save();g.translate(e.x,e.y);g.scale(.72,.72);shadow(g,0,6,92,13,.25);\n    const L=['tavolata-panca-dietro'")
# calderone: torna il disegno di prima (un solo fuoco), la collisione resta
rep("const use=k=>VEGPG&&cmpOk(CMPL[k]);","const use=k=>k!=='pot'&&VEGPG&&cmpOk(CMPL[k]);")
# palo della bandiera nel nuovo stile
rep("  lant:['asta-corta'],","  lant:['asta-corta'],\n  flag:['asta-lunga'],")
rep("  NVDX.nv_bunt=(g,e,t)=>{\n    if(!use('bunt'))","""  NVDX.nv_flagp=(g,e,t)=>{
    if(!use('flag')){const sv=e.spr;e.spr='bandiera';drawDeco(g,e,t);e.spr=sv;return}
    g.save();g.translate(e.x,e.y);shadow(g,0,3,24,7,.3);
    const st=[[-6,-8,7],[-14,-2,8],[14,-3,7],[2,2,9]];
    for(const[x,y,r]of st.slice(0,1))ball(g,x,y,r,'#e6e2da','#b3b3ae','#7a7e86','rgba(30,34,42,.6)');
    g.save();g.translate(0,3-152);g.rotate(Math.PI/2);g.drawImage(cmpImg('asta-lunga'),0,-10);g.restore();
    for(const[x,y,r]of st.slice(1))ball(g,x,y,r,'#e6e2da','#b3b3ae','#7a7e86','rgba(30,34,42,.6)');
    g.restore();
  };
  NVDX.nv_bunt=(g,e,t)=>{
    if(!use('bunt'))""")
rep("deco('c2flag','bandiera',60.2,26.6,null,{nohit:1,k:1});","deco('c2flag','nv_flagp',60.2,26.6,null,{nohit:1,k:1});")
# tavolino di J: via per ora
rep("  if(cp.j)NV2.addE('jt',60.5,28.6);\n","  // tavolino di J (disegno vecchio): tolto per ora\n")
rep('  {v:"0.11.6",d:"23 nov 2026",','  {v:"0.11.7",d:"23 nov 2026",t:"Campo: tavolata più piccola, un solo fuoco, palo nuovo",n:[\n    "La tavolata è più piccola e proporzionata (anche la collisione).",\n    "Torna il calderone di prima: nel campo c\'è un solo fuoco (la collisione resta).",\n    "Il palo della bandiera del campo è ridisegnato nel nuovo stile, con i sassi alla base.",\n    "Tolto per ora il tavolino rotondo vicino al pappagallo (aveva ancora il disegno vecchio).",\n  ]},\n  {v:"0.11.6",d:"23 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok152')
