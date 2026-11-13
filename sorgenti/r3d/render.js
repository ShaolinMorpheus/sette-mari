const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');
const srv=http.createServer((q,r)=>{const f=path.join(__dirname,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'Content-Type':f.endsWith('.html')?'text/html':f.endsWith('.js')?'text/javascript':'application/octet-stream'});r.end(d)}})}).listen(8765);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});
const p=await b.newPage({viewport:{width:640,height:700}});p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('C',m.text())});
await p.goto('http://localhost:8765/char.html');await p.waitForFunction('window.ready',null,{timeout:20000});
const jobs=JSON.parse(process.argv[2]);fs.mkdirSync('out',{recursive:true});const meta={};
for(const j of jobs){const r=await p.evaluate(([v,P])=>window.shot(v,P),[j.view,j.pose]);
 fs.writeFileSync('out/'+j.name+'.png',Buffer.from(r.png.split(',')[1],'base64'));meta[j.name]={anchor:r.anchor,hm:r.hm,hl:r.hl,hr:r.hr}}
fs.writeFileSync('out/meta.json',JSON.stringify(meta));await b.close();srv.close()})()
