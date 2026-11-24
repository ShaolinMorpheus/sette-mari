P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80])
    s=s.replace(a,b)
# camminata verso sinistra: i fotogrammi "sinistro" di Gnocco (e altri) hanno la testa girata a destra in alcuni passi -> si usano sempre i fotogrammi "destro" specchiati
rep("const mr=w==='nives'&&mv&&dr==='profilo-sinistro'&&!o.pose","const mr=mv&&dr==='profilo-sinistro'&&!o.pose")
rep('  {v:"0.11.8",d:"24 nov 2026",','  {v:"0.11.9",d:"24 nov 2026",t:"Camminata corretta",n:[\n    "Gnocco, Ferro, Tito e gli altri ora guardano nella direzione in cui camminano anche quando vanno a sinistra.",\n  ]},\n  {v:"0.11.8",d:"24 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok154')
