#!/usr/bin/env python3
import sys,json,csv
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
i0=src.index('var PACK=')+9
arr,end=json.JSONDecoder().raw_decode(src[i0:])
have=set(r[0] for r in arr)
rows=[]
for fn in ['/home/claude/work/trad/tradotto_main.csv']:
    for r in list(csv.reader(open(fn,encoding='utf-8-sig'),delimiter=';'))[1:]:
        it,en,de,es,fr=[x.replace('\\n','\n') for x in r[2:7]]
        it=it.strip()
        if it in have or not (en and de and es and fr):continue
        have.add(it);rows.append([it,en.strip(),de.strip(),es.strip(),fr.strip()])
add=','.join(json.dumps(r,ensure_ascii=False,separators=(',',':')) for r in rows)
j=i0+end-1   # posizione della ']' finale
assert src[j]==']'
src=src[:j]+','+add+src[j:]
print('PATCH44: aggiunte',len(rows),'righe')
open(P,'w',encoding='utf8').write(src)
