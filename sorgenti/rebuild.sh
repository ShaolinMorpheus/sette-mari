cd /home/claude/work && cp /tmp/base_post128.html base_index.html && for v in 132 133 134 135 136 137 139 141 142 143 145 146 147 148 149 150 151 152 153 154 155; do python3 patch_v$v.py 2>&1 | tail -1 | grep -v "^ok\|^patch" ; done; python3 mk_final.py | tail -1
python3 - <<'PY'
t=open('/tmp/t5.html',encoding='utf8').read()
i=t.find('window.__T={'); j=t.find('})();',i); inj=t[i:j]
f=open('/home/claude/out/index_final.html',encoding='utf8').read()
k=f.find('<style id="kitCss">'); m=f.rfind('})();',0,k)
open('/tmp/t5.html','w',encoding='utf8').write(f[:m]+inj+f[m:])
PY
