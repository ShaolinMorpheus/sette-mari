import sys
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
a="b.mv.p22=[2079,762];"
if s.count(a)!=1:print('FAIL');sys.exit(1)
s=s.replace(a,a+"Object.assign(b.mv,{lt_pg3:[2928,2232],p41:[3309,1941],p39:[2961,2262],p8:[2763,2217],m10:[2892,2271],lt_cr7:[2805,2232],d1:[2886,2196]});")
open(P,'w',encoding='utf8').write(s);print('patch133 ok')
