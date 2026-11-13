const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');
const srv=http.createServer((q,r)=>{const f=path.join(__dirname,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'Content-Type':f.endsWith('.html')?'text/html':f.endsWith('.js')?'text/javascript':'application/octet-stream'});r.end(d)}})}).listen(8765);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist','--use-angle=swiftshader']});
const p=await b.newPage({viewport:{width:760,height:800}});p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('C',m.text())});
await p.goto('http://localhost:8765/char.html');await p.waitForFunction('window.ready',null,{timeout:20000});
const jobs=JSON.parse(process.argv[2]);if(process.argv[3]==='face'){fs.mkdirSync('out2',{recursive:true});for(const j of jobs){const d=await p.evaluate(([v,a])=>window.faceShot(v,a),[j.v,j.az]);fs.writeFileSync('out2/'+j.name+'.png',Buffer.from(d.split(',')[1],'base64'))}await b.close();srv.close();return}fs.mkdirSync('out',{recursive:true});const meta={};
for(const j of jobs){const r=await p.evaluate(([v,P])=>window.shot(v,P),[j.view,j.pose]);
 fs.writeFileSync('out/'+j.name+'.png',Buffer.from(r.png.split(',')[1],'base64'));meta[j.name]={anchor:r.anchor,hm:r.hm,hl:r.hl,hr:r.hr,hh:r.hh,hu:r.hu,hq:r.hq}}
fs.writeFileSync('out/meta.json',JSON.stringify(meta));await b.close();srv.close()})()
