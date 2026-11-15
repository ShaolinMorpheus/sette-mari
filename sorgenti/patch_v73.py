#!/usr/bin/env python3
import sys
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
JS=r"""<script>
/* Menu a scorrimento con lo schermo ruotato (body.rot): il browser non scorre le liste ruotate col dito, quindi lo facciamo noi */
(function(){
  var cur=null;
  function gmap(dx,dy){var b=document.body.classList;if(b.contains('rot2'))return[-dy,dx];if(b.contains('rot'))return[dy,-dx];return[dx,dy]}
  document.addEventListener('touchstart',function(e){
    if(!document.body.classList.contains('rot')||e.touches.length!==1){cur=null;return}
    var el=e.target.closest&&e.target.closest('.mpn,.mnav');if(!el){cur=null;return}
    var t=e.touches[0];cur={el:el,x:t.clientX,y:t.clientY,top:el.scrollTop,left:el.scrollLeft,drag:false}
  },{passive:true,capture:true});
  document.addEventListener('touchmove',function(e){
    if(!cur)return;var t=e.touches[0],d=gmap(t.clientX-cur.x,t.clientY-cur.y);
    if(!cur.drag&&Math.abs(d[0])+Math.abs(d[1])>8)cur.drag=true;
    if(cur.drag){cur.el.scrollTop=cur.top-d[1];cur.el.scrollLeft=cur.left-d[0];if(e.cancelable)e.preventDefault()}
  },{passive:false,capture:true});
  function end(){if(cur&&cur.drag){window.__noClickUntil=Date.now()+350}cur=null}
  document.addEventListener('touchend',end,{capture:true,passive:true});
  document.addEventListener('touchcancel',end,{capture:true,passive:true});
  document.addEventListener('click',function(e){if(window.__noClickUntil&&Date.now()<window.__noClickUntil){e.stopPropagation();e.preventDefault()}},true);
})();
</script>
"""
i=src.rfind('</body>')
if i<0:print('PATCH73 FAIL');sys.exit(1)
src=src[:i]+JS+src[i:]
open(P,'w',encoding='utf8').write(src);print('patch73 ok')
