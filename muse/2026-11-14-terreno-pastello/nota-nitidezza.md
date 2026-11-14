# Nitidezza del terreno — nota per Claude

Problema visto in gioco: il terreno pastello risulta morbido/sfocato rispetto
agli sprite (alberi, personaggio) che sono netti.

## Cause

1. Le prime texture (erba/terra) erano lavaggi a macchie grandi: poca densita
   di dettaglio, quindi a schermo sembrano sfocate.
2. Nella pipeline attuale il terreno viene cotto su canvas ridimensionate e
   ridisegnato con smoothing attivo: ulteriore perdita di nitidezza.

## Nuove texture (in questo kit)

- `terreno-erba-dettaglio.png` e `terreno-terra-dettaglio.png` (1600x1600):
  micro-dettaglio fitto (fili d'erba, trifogli, fiorellini / sassolini,
  crepe). Sostituiscono le versioni a macchie grandi per erba e terra battuta.

## Come usarle (importante quanto le texture)

1. **Ripetere la texture su aree piu piccole**: una tile da 1600 deve coprire
   un tratto limitato di mappa (indicativamente 6-8 celle di lato), non
   un'intera isola. Se la si stira, anche la texture dettagliata torna morbida.
2. **Cuocere il terreno a scala 1:1** rispetto ai pixel di disegno finali:
   niente downscale intermedio del canvas del terreno.
3. **Smoothing disattivato** nel drawImage del canvas terreno (o qualita
   coerente col resto): lo smoothing ammorbidisce le texture dipinte.
4. Transizioni tra superfici sempre con maschere morbide come ora.

Nota: un terreno dipinto restera sempre un filo piu morbido degli sprite
piatti e netti; con densita di dettaglio + cottura 1:1 la differenza si
riduce a una questione di stile, non di sfocatura.
