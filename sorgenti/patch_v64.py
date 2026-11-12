#!/usr/bin/env python3
import sys,base64
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH64 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)

import json as _j
T=[["Nuova missione: {}","New quest: {}","Neue Mission: {}","Nueva misión: {}","Nouvelle mission : {}"],
["Nuova missione secondaria: {}","New side quest: {}","Neue Nebenmission: {}","Nueva misión secundaria: {}","Nouvelle mission secondaire : {}"],
["Missione completata","Quest complete","Mission abgeschlossen","Misión completada","Mission accomplie"],
["Missione secondaria completata","Side quest complete","Nebenmission abgeschlossen","Misión secundaria completada","Mission secondaire accomplie"],
["Storia: {}","Story: {}","Geschichte: {}","Historia: {}","Histoire : {}"],
["Completate","Completed","Abgeschlossen","Completadas","Terminées"],
["completata","completed","abgeschlossen","completada","terminée"],
["nuova","new","neu","nueva","nouvelle"],
["Nuova missione","New quest","Neue Mission","Nueva misión","Nouvelle mission"],
["Da fare","To do","Zu tun","Por hacer","À faire"]]
rep("var PACK=[","var PACK="+_j.dumps(T,ensure_ascii=False)[:-1]+",")
names=['dlg_frame','dlg_oval','dlg_name','ribbon2','plate_dark','plate_parch']
vars_=''.join('--k-%s:url(data:image/webp;base64,%s);'%(n,base64.b64encode(open('/home/claude/work/kit/%s.webp'%n,'rb').read()).decode()) for n in names)
css='<style id="kitCss4">:root{'+vars_+'}'+"""
/* dialogo: cornice nuova con ovale per il ritratto e targhetta del nome */
#dlgBox{background:none;border:14px solid transparent;border-image:var(--k-dlg_frame) 62 fill/14px stretch;border-radius:0;box-shadow:none;filter:drop-shadow(0 6px 10px rgba(0,0,0,.5));padding:0 6px 2px 0;min-height:84px;gap:8px;align-items:flex-start}
#dlgPortWrap{position:relative;flex:none;width:100px;height:77px;border:0;border-radius:0;box-shadow:none;background:none;overflow:visible;margin:-2px 0 0 -4px}
#dlgPortWrap::after{content:'';position:absolute;inset:0;background:var(--k-dlg_oval) 50% 50%/100% 100% no-repeat;pointer-events:none}
#dlgPort{position:absolute;left:11.4%;top:11.6%;width:77%;height:76.5%;object-fit:contain;background:#e9c47a;clip-path:ellipse(50% 50% at 50% 50%)}
#dlgName{display:inline-block;border:7px solid transparent;border-image:var(--k-dlg_name) 24 fill/7px stretch;padding:0 8px;margin:0 0 3px;font-size:17px;line-height:1.05;color:#ffe08a;text-shadow:0 1px 2px rgba(0,0,0,.6);letter-spacing:.4px}
#dlgName:empty{display:none}
#dlgText{margin-top:0}
#dlgNext{right:14px;bottom:6px}
/* nastro rosso della missione */
#qbanner .rib{display:flex;align-items:center;justify-content:center;width:min(430px,100%);aspect-ratio:1400/400;box-sizing:border-box;background:var(--k-ribbon2) 50% 50%/100% 100% no-repeat;border:0;border-radius:0;box-shadow:none;padding:0 17% 3%;font-size:24px;line-height:1.05;letter-spacing:.3px;color:#fff6dc;text-shadow:0 2px 2px rgba(60,10,5,.85);filter:drop-shadow(0 6px 8px rgba(0,0,0,.5))}
/* obiettivo: tavola scura con i chiodi */
#obj{border:12px solid transparent;border-image:var(--k-plate_dark) 75 fill/12px stretch;padding:0 2px}
/* avvisi e suggerimenti su targhetta di pergamena scura */
.toast,#hintb,#tut{background:none;border:9px solid transparent;border-image:var(--k-plate_parch) 70 fill/9px stretch;border-radius:0;box-shadow:none;color:#fff3d2;text-shadow:0 1px 2px rgba(0,0,0,.7);filter:drop-shadow(0 3px 5px rgba(0,0,0,.45))}
.toast{padding:1px 6px}
#hintb,#tut{padding:2px 8px 3px}
#tut small{color:#ffe08a}
</style>
"""
rep("</body>",css+"</body>",src.count("</body>"))
open(P,'w',encoding='utf8').write(src);print('patch64 ok')
