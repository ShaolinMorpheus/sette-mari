import json
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
i=s.index('const NOM=')+10
d,e=json.JSONDecoder().raw_decode(s[i:])
new=json.load(open('/home/claude/work/mz_nom_v3.json'))
d.update(new)
s=s[:i]+json.dumps(d)+s[i+e:]
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80])
    s=s.replace(a,b)
rep('  {v:"0.11.10",d:"24 nov 2026",','  {v:"0.11.11",d:"24 nov 2026",t:"Camminate nuove",n:[\n    "Ferro, Gnocco, Nives e Giacomo hanno le camminate ridisegnate da Muse: figure intere, passo più fluido, in tutte e quattro le direzioni.",\n  ]},\n  {v:"0.11.10",d:"24 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok156')
