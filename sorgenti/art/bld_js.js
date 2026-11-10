/* ---- GRAFICA DI PROVA: capanna, banco da lavoro e ingresso della miniera ---- */
GfxNew.bld=function(){
  const mkB=(b64,lw,lh,ax,ay,sink,shk)=>{const img=new Image(),[c,x]=mk(lw,lh),s={c,w:lw,h:lh,ax,ay,art:1,sink:sink,shk:shk||1};
    img.onload=()=>{x.clearRect(0,0,lw,lh);x.drawImage(img,0,0,lw,lh);
      const ao=x.createLinearGradient(0,lh*.84,0,lh);ao.addColorStop(0,'rgba(30,18,6,0)');ao.addColorStop(1,'rgba(30,18,6,.4)');x.globalCompositeOperation='source-atop';x.fillStyle=ao;x.fillRect(0,0,lw,lh);x.globalCompositeOperation='source-over';
      const[c2,x2]=mk(lw,lh);x2.drawImage(c,0,0,lw,lh);x2.globalCompositeOperation='source-in';x2.fillStyle='#0e1c0a';x2.fillRect(0,0,lw,lh);s.sh=c2};
    img.src='data:image/webp;base64,'+b64;return s};
  SP.capanna=mkB("@HC@",190,@HCH@,104,@HCA@,10,.55);
  SP.banco=mkB("@HB@",150,@HBH@,75,@HBA@,3,.8);
  SP.mina=mkB("@HM@",140,@HMH@,70,@HMA@,4);
};
