# Attrezzi a parte e pose di presa — parte C

## Attrezzi da soli (manico dritto verticale, trasparenti)
- `ascia.png` — lama verso sinistra; `ascia-destra.png` e'
  la versione specchiata con la lama verso destra.
- `piccone.png`, `martello.png` (di Nives), `mestolo.png`
  (di Gnocco): teste simmetriche, una sola versione.
- Tutti alti 240 px, alfa pulito, nessun alone.
- `punti.json`: per ogni attrezzo la tela, il punto di
  presa (x,y dove la mano afferra il manico, appena sotto
  la testa), la lunghezza del manico in px e, per l'ascia,
  presa e file della versione con la testa a destra.
  L'attrezzo si posiziona e si ruota da codice intorno
  alla presa: il corpo NON cambia piu' da un frame
  all'altro.

## Pose del marinaio senza attrezzo (tela 336x376)
- `marinaio-presa-fronte.png`, `marinaio-presa-profilo-
  destro.png`, `marinaio-presa-profilo-sinistro.png`:
  fermo con il braccio destro piegato in avanti e il pugno
  chiuso, come se reggesse un manico. In `punti.json`
  (chiave `pose_presa_marinaio`) le coordinate del pugno
  in ogni tela, cosi' la presa dell'attrezzo si allinea
  al pugno. Il resto del corpo e' il fermo del marinaio,
  stessa scala e stessa riga dei piedi della camminata.
- `marinaio-carica-fronte.png` e `marinaio-carica-
  profilo-destro.png`: braccia alzate sopra la testa.
- `marinaio-colpo-fronte.png` e `marinaio-colpo-profilo-
  destro.png`: braccia basse in avanti, colpo dato.
  Le pose di carica sono scalate sulla distanza
  piedi-testa del fermo, non sull'altezza totale: le
  braccia alzate escono sopra la testa restando nella
  tela, e il corpo non si rimpicciolisce.

## Limiti dichiarati
- La posa di presa DI SPALLE manca: il generatore ha
  disegnato un fermo di spalle con le braccia lungo i
  fianchi, senza il braccio piegato. Da codice il fermo
  di spalle normale copre il caso (di spalle il pugno in
  avanti si vedrebbe appena di lato); se serve disegnata,
  la faccio su richiesta.
- `marinaio-presa-profilo-sinistro.png` e' la destra
  specchiata a programma (il marinaio di profilo e'
  simmetrico negli elementi che contano: orecchino e
  righe della camicia).
- Carica e colpo solo di fronte e di profilo destro,
  come da specifica ("solo per il marinaio"); spalle e
  profilo sinistro si ricavano (sinistro per specchio).
- Le pose di presa di Ferro e Nives per i lavori al
  campo non sono incluse: la specifica le chiedeva solo
  "se serve". Stesso metodo, su richiesta.
- Il pugno nella posa di profilo e' piccolo e chiaro:
  si legge come mano chiusa in fondo alla manica.

STATO: pronto (parte C; manca solo la presa di spalle,
vedi limiti)
