# Mondo A4 — Cannonate e minimappa

Quarto e ultimo sottogruppo del mondo A: il mondo A e' completo
(A1 meteo, A2 isole e scogli, A3 navi, A4 effetti e minimappa).

## Sequenze (tela condivisa dentro ogni sequenza: l'animazione non salta)
| pezzo | misura | ancora | stato |
|---|---|---|---|
| palla | 355x358 | centro | pronto |
| palla-scia | 638x357 | centro (scia verso sinistra: la palla viaggia verso destra) | pronto |
| fumo-1 | 780x678 | bordo sinistro, centro verticale (bocca del cannone) | pronto |
| fumo-2 | 780x678 | bordo sinistro, centro verticale (bocca del cannone) | pronto |
| fumo-3 | 780x678 | bordo sinistro, centro verticale (bocca del cannone) | pronto |
| fumo-4 | 780x678 | bordo sinistro, centro verticale (bocca del cannone) | pronto |
| esplosione-1 | 611x668 | centro | pronto |
| esplosione-2 | 611x668 | centro | pronto |
| esplosione-3 | 611x668 | centro | pronto |
| esplosione-4 | 611x668 | centro | pronto |
| colpo-acqua-1 | 780x857 | base centro (anello di schiuma) | pronto |
| colpo-acqua-2 | 780x857 | base centro (anello di schiuma) | pronto |
| colpo-acqua-3 | 780x857 | base centro (anello di schiuma) | pronto |
| colpo-acqua-4 | 780x857 | base centro (anello di schiuma) | pronto |
| minimappa-cornice | 512x512 | centro; la pergamena interna e' vuota, il motore ci disegna la mappa | pronto |
| minimappa-rosa | 256x256 | centro | pronto |
| minimappa-nave | 128x128 | centro (prua in alto) | pronto |
| minimappa-x | 128x128 | centro | pronto |

- **palla / palla-scia**: la palla di cannone, ferma e in volo (scia
  verso sinistra, viaggia verso destra; il motore la ruota sulla rotta).
- **fumo-1..4**: lo sbuffo alla bocca del cannone che cresce e si
  disperde; ancora sul bordo sinistro = punto della bocca.
- **esplosione-1..4**: lampo, palla di fuoco, fiamme con schegge di
  legno, nube di fumo con braci. Ancora al centro.
- **colpo-acqua-1..4**: corona, colonna alta, corona che ricade, anelli
  di schiuma. Ancora alla base: i quattro frame poggiano sulla stessa
  riga di fondo tela.
- **minimappa**: cornice tonda in legno e oro con pergamena vuota e
  rosa dei venti in filigrana (il motore disegna dentro coste e navi);
  rosa piena come decorazione; marcatore nave rosso (prua in alto) e
  marcatore X oro. Disegnati a programma, bordi netti da interfaccia.

## Limiti dichiarati
- **fumo-3** ha il bordo sinistro leggermente dritto: nel foglio
  sorgente la nube toccava quella vicina e il taglio passa di li'.
  Alla scala di gioco (sbuffo breve) si nota poco; se da' fastidio
  lo ridisegno in un giro di correzioni.
- I due fogli scartati (esplosione su cartoncini bianchi, colpo in
  acqua come scena intera) sono stati rifatti: questa consegna usa
  solo sprite isolati su trasparenza.
- Anteprima sul mare in `controllo/anteprima-mare.png`.

STATO: pronto (18 pezzi) — mondo A completo
