P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:80])
    s=s.replace(a,b)
# precarica e decodifica tutti i fotogrammi dei personaggi: niente sfarfallio al primo uso
rep("function nomImg(k){if(!VEGPG||!NOM[k])return null;","let NOMPRE=0;function nomImg(k){if(!VEGPG||!NOM[k])return null;if(!NOMPRE){NOMPRE=1;for(const q in NOM){if(NOMI[q])continue;const im=NOMI[q]=new Image();im.src='data:image/webp;base64,'+NOM[q];if(im.decode)im.decode().catch(()=>{})}}")
rep('  {v:"0.11.9",d:"24 nov 2026",','  {v:"0.11.10",d:"24 nov 2026",t:"Niente più sfarfallii",n:[\n    "I personaggi del campo non spariscono più per un istante quando cambiano passo: i fotogrammi vengono caricati prima.",\n  ]},\n  {v:"0.11.9",d:"24 nov 2026",')
open(P,'w',encoding='utf8').write(s);print('ok155')
