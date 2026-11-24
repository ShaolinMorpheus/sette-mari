P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80])
    s=s.replace(a,b)
# tolta la grande ombra di pesce nel mare
rep("if(!NVF.gs&&QL<2){const p=NVF.pick(true)","if(false&&!NVF.gs&&QL<2){const p=NVF.pick(true)")
rep('  {v:"0.11.12",d:"24 nov 2026",','  {v:"0.11.13",d:"25 nov 2026",t:"Meno pesci grandi",n:[\n    "Tolta la grande ombra di pesce che passava nel mare.",\n  ]},\n  {v:"0.11.12",d:"24 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok158')
