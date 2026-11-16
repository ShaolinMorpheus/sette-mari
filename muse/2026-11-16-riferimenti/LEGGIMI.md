# Riferimenti per oggetti disegnati nel codice (16 novembre 2026)

Immagini PNG (sfondo trasparente) degli oggetti che nel gioco sono disegnati a codice, esportate dal gioco così come appaiono ora. Servono da riferimento per rifarli in stile pastello vivo.
Scala: i pixel dei file sono 4× il disegno nel gioco. Misura nel gioco = pixel del file ÷ 4. L'ancora (punto d'appoggio) è in pixel del file.

| file | pixel | disegno nel gioco | ancora (x, y) | note |
|---|---|---|---|---|
| rockpool.png | 168×96 | 42×24 | 42, 38 | pozza di marea con rocce e cozze (stato pieno). Vuota = stessa immagine con acqua e cozze svanite (oggi il gioco la rende al 60% trasparente) |
| mesa.png | 970×730 | 242×182 | 242, 310 | roccione/altopiano con pini e cespugli sopra: la scogliera è il blocco che il giocatore non calpesta |
| torre.png | 260×524 | 65×131 | 65, 254 | torre di guardia in costruzione |
| bandiera.png | 112×352 | 28×88 | 28, 166 | pennone con pomolo e sassi alla base (il telo è un oggetto a parte) |
| oldcamp.png | 544×300 | 136×75 | 120, 134 | vecchio campo del naufrago: tenda strappata, cerchio di sassi, croce, ossa, attrezzi |
| lookout.png | 380×960 | 95×240 | 95, 472 | il Pino Alto con la piattaforma e la scala di corda |
| falo.png | 160×112 | 40×28 | 40, 46 | falò (già rifatto in 2026-11-15-stati; solo riferimento) |
| insieme.png | | | | panoramica |

Non esportati (non hanno sprite unico, sono composti dal motore): **tenda** dei Fuggiaschi (tenda di tela grande, due per campo, con barili e casse vicino) e **cartello** (palo con tavola di legno e scritta). Per questi Muse può partire dalla tenda in `oldcamp.png` e dal cartello di legno a croce che si vede lì accanto, e disegnare una versione pulita e nuova.

STATO: pronto
