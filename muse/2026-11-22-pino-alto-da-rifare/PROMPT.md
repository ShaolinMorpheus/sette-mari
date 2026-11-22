# Il Pino Alto va rifatto: tronco largo e chioma piena

Davide ha visto il Pino Alto della consegna `2026-11-22-richieste-creature-e-alberi` in gioco e non va bene:
è **tutto fino**. Il tronco è sottile (circa 40 px su 760), la chioma è fatta di pochi ciuffi staccati in cima
e non somiglia agli altri pini. Il Pino Alto è l'albero più importante dell'isola 1: è alto, solido, si vede
da lontano e ci si sale. Va rifatto, con lo stesso stile dipinto morbido dei pini nuovi, ma più robusto.

## Cosa deve avere

- **Tronco robusto**: largo circa **90–110 px (file) a metà altezza** e più largo alla base, con radici
  che si aprono sul terreno (base circa 200–240 px); si restringe piano verso la piattaforma. Corteccia
  con venature, luce da sinistra. Per capirci: il vecchio tronco era circa il doppio di quello consegnato.
- **Chioma piena**: foglie/aghi fitti **sopra e attorno alla piattaforma**, a strati come i pini «abete»
  (`pino-2`, `pino-3`), con rami grossi visibili che escono dal tronco; larghezza della chioma almeno
  **320–380 px (file)** nella parte più larga. Non pochi ciuffi isolati: deve sembrare un albero vero,
  alto e pieno. Qualche ramo anche sotto la piattaforma.
- **Piattaforma di vedetta** con parapetto di legno, come nella consegna: base della piattaforma
  a **744 px (file) sopra la base del tronco**, ben visibile in mezzo alla chioma.
- **Scala di corda**: vera scala di corda con pioli, che **pende dal bordo della piattaforma** (attaccata
  alla piattaforma, non staccata) fino a terra, dritta e verticale. Il suo asse sta a **64 px (file) a destra
  dell'asse del tronco**. Il personaggio sale lungo quella linea, quindi la posizione è fissa.

## Misure e ancora (importante)

- Tela **760×1920**, come prima (in gioco è 190×480).
- **L'asse del tronco deve stare esattamente a x=380** (centro del file) e la base del tronco a **y=1888**:
  nella consegna scorsa il tronco stava a x≈298 e non a 380, quindi la scala (a x≈445) risultava a circa
  146 px dal tronco invece di 64 e restava staccata dalla piattaforma. **Misura la x del tronco a due altezze (metà e base) e scrivila nel LEGGIMI.**
- Ombra morbida a terra inclusa, come prima.
- Due file: `pino-alto.png` e `pino-alto-notte.png` (stessi pixel, toni della sera).

## Controlli prima di dire «pronto»

1. Foglio di controllo con il Pino Alto accanto a `pino-2-intero` e a `foglia-1-intero` in scala di gioco
   (190×480 contro 96×172): deve **dominare** gli altri alberi e avere la stessa mano.
2. Verifica che il tronco non sia più stretto del 10% della larghezza del file (76 px) a metà altezza.
3. LEGGIMI con le misure (asse tronco a metà e alla base, larghezza tronco, larghezza chioma, quota piattaforma,
   asse scala) e `STATO: pronto`.
