#!/usr/bin/env python3
import sys,json,re
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
i=src.index('const ED_BAKED=');j=src.index('\n',i);line=src[i:j]
# estrae il vecchio blocco "1" e lo unisce con le modifiche nuove dell'utente (codice mappa m1)
k=line.index(',"1":{') if ',"1":{' in line else -1
if k<0:
    print('PATCH55 FAIL: blocco "1" non trovato');sys.exit(1)
a=k+1;depth=0;e=None
for n in range(a+4,len(line)):
    c=line[n]
    if c=='{':depth+=1
    elif c=='}':
        depth-=1
        if depth==0:e=n+1;break
old=json.loads(line[a+4:e]);new=json.load(open('/home/claude/work/map_m1.json'));new.pop('w',None)
m={'mv':dict(old.get('mv',{})),'del':list(old.get('del',[])),'add':list(old.get('add',[])),'vv':dict(old.get('vv',{})),'t':list(old.get('t',[]))}
m['mv'].update(new['mv'])
for d in new['del']:
    if d not in m['del']:m['del'].append(d)
ids={x['id']:i for i,x in enumerate(m['add'])}
for x in new['add']:
    if x['id'] in ids:m['add'][ids[x['id']]]=x
    else:m['add'].append(x)
m['vv'].update(new['vv']);m['t']=m['t']+[x for x in new['t'] if x not in m['t']]
m['wl']=new['wl']
newline=line[:a]+'"1":'+json.dumps(m,separators=(',',':'))+line[e:]
src=src[:i]+newline+src[j:]
kk='    "Conchiglie più piccole'
if src.count(kk)!=1:print('FAIL changelog');sys.exit(1)
src=src.replace(kk,'    "Muri invisibili sistemati a mano sull\'isola principale (con l\'editor).",\n'+kk)
open(P,'w',encoding='utf8').write(src);print('patch55 ok')
