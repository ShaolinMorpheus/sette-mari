#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH63 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
css="""<style id="fix63">
/* torcia accesa: l'immagine dorata non deve perdere dimensione e posizione */
.sbtn.lit{background-size:100% 100%;background-position:50% 50%;background-repeat:no-repeat}
/* scritta del bottone azione: dentro il cerchio interno, a capo se serve */
#act #actL{display:block;max-width:60px;white-space:normal;overflow-wrap:normal;word-break:normal;hyphens:manual;text-align:center;line-height:1.02}
#act.two .ic{width:28px;height:28px}
</style>
"""
rep("</body>",css+"</body>",src.count("</body>"))
js="""/* ---- 63: scritta del bottone azione sempre dentro il cerchio ---- */
(function(){
  const s=document.getElementById('actL'),a=document.getElementById('act');if(!s||!a)return;
  let busy=0;
  function fit(){if(busy)return;busy=1;
    try{let f=13;s.style.fontSize=f+'px';a.classList.remove('two');
      const lines=()=>Math.round(s.offsetHeight/(f*1.02));
      const bad=()=>s.scrollWidth>s.clientWidth+1||lines()>2;
      while(bad()&&f>7){f-=.5;s.style.fontSize=f+'px'}
      if(lines()>1)a.classList.add('two')}
    finally{busy=0}}
  window.__fitAct=fit;
  new MutationObserver(fit).observe(s,{childList:true,characterData:true,subtree:true});
  fit();
})();
"""
rep("/* ---- 12d_kb.js ---- */",js+"/* ---- 12d_kb.js ---- */")
open(P,'w',encoding='utf8').write(src);print('patch63 ok')
