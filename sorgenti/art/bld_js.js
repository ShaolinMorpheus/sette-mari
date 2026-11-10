/* ---- GRAFICA DI PROVA: capanna, banco da lavoro e ingresso della miniera ---- */
GfxNew.bld=function(){
  const mkB=(b64,lw,lh,ax,ay,sink)=>{const img=new Image(),[c,x]=mk(lw,lh),s={c,w:lw,h:lh,ax,ay,art:1,sink:sink};
    img.onload=()=>{x.clearRect(0,0,lw,lh);x.drawImage(img,0,0,lw,lh);
      const[c2,x2]=mk(lw,lh);x2.drawImage(c,0,0,lw,lh);x2.globalCompositeOperation='source-in';x2.fillStyle='#0e1c0a';x2.fillRect(0,0,lw,lh);s.sh=c2};
    img.src='data:image/webp;base64,'+b64;return s};
  SP.capanna=mkB("@HC@",140,@HCH@,76,@HCA@,3);
  SP.banco=mkB("@HB@",150,@HBH@,75,@HBA@,3);
  SP.mina=mkB("@HM@",140,@HMH@,70,@HMA@,4);
};
