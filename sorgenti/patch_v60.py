#!/usr/bin/env python3
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH60 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
art=json.load(open('/home/claude/work/parrot/par_art.json'))
js="""/* ---- pappagallo Biscotto: illustrazioni ad acquerello (una per cappellino) ---- */
var PARART={};
(function(){const D=%s;for(const k in D){const im=new Image();im.onload=()=>{PARART[k]=im;try{for(const q in _phi)delete _phi[q]}catch(e){}};im.src=D[k]}})();
function parArt(g,o,t,fl){
  const im=PARART[o.hat&&PARART[o.hat]?o.hat:'base'];if(!im)return false;
  if(!o.perch){g.translate(0,fl*.7);g.rotate(fl*.05)}
  g.drawImage(im,-19.9,-34.2,42.24,54.24);
  return true;
}
""" % json.dumps(art)
rep("function drawParrot(g,x,y,o){",js+"function drawParrot(g,x,y,o){")
rep("  if(!o.perch){g.fillStyle='rgba(20,25,10,.22)';g.beginPath();g.ellipse(0,o.gy||26,8,3,0,0,7);g.fill()}\n  // coda",
    "  if(!o.perch){g.fillStyle='rgba(20,25,10,.22)';g.beginPath();g.ellipse(0,o.gy||26,8,3,0,0,7);g.fill()}\n  if(parArt(g,o,t,fl)){g.restore();return}\n  // coda")
# nuovi cappellini
new="""
/* ---- nuovi cappellini del pappagallo (acquerello) ---- */
{const NP=[
 {id:'cocco',n:'Mezza noce di cocco',ic:'🥥',hint:'Cogli 40 volte bacche o frutti.',own:()=>(S.stat.forage||0)>=40},
 {id:'vichingo',n:'Elmo vichingo',ic:'🪖',hint:'Raggiungi il livello 8.',own:()=>NV.lvOk(8)},
 {id:'mago',n:'Cappello da mago',ic:'🧙',hint:'Trova 10 bottiglie.',own:()=>(S.stat.bottles||0)>=10},
 {id:'ghirlanda',n:'Ghirlanda di fiori',ic:'🌺',hint:"Raccogli 15 volte dall'orto.",own:()=>((S.gard&&S.gard.harv)||0)>=15},
 {id:'babbo',n:'Cappello di Natale',ic:'🎅',hint:'Solo nel periodo natalizio.',own:()=>{const d=new Date(),m=d.getMonth();return m===11||(m===0&&d.getDate()<=6)}},
 {id:'festa',n:'Cappellino da festa',ic:'🎉',hint:'Cattura 20 granchi.',own:()=>(S.stat.crabs||0)>=20},
 {id:'occhiali',n:'Occhiali da sole',ic:'😎',hint:'Raggiungi il livello 12.',own:()=>NV.lvOk(12)},
 {id:'elica',n:"Berretto con l'elica",ic:'🧢',hint:'Costruisci 10 cose al campo.',own:()=>(S.stat.built||0)>=10}
];
for(const it of NP){if(!PHATS.some(h=>h.id===it.id))PHATS.push({id:it.id,n:it.n,ic:it.ic,x:1});if(!WEAR.some(w=>w.id===it.id))WEAR.push({id:it.id,k:'par',n:it.n,hint:it.hint,own:it.own})}}
"""
rep("/* ---- 12d_kb.js ---- */",new+"/* ---- 12d_kb.js ---- */")
k='    "Conchiglie più piccole'
rep(k,'    "Pappagallo Biscotto ridisegnato ad acquerello, con tutti i cappellini; 8 cappellini nuovi da sbloccare (cocco, vichingo, mago, ghirlanda, Natale, festa, occhiali, elica).",\n'+k)
open(P,'w',encoding='utf8').write(src);print('patch60 ok')
