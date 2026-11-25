P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80])
    s=s.replace(a,b)
rep('  {v:"0.11.13",d:"25 nov 2026",','  {v:"0.11.14",d:"25 nov 2026",t:"Oggetti del campo completi",n:[\n    "Stendino con pali alti e corda, amaca, baule, rastrelliera, lanterne e altri oggetti ridisegnati da Muse senza più parti tagliate.",\n  ]},\n  {v:"0.11.13",d:"25 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok159')
