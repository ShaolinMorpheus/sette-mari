# Richieste del 22 novembre 2026 — granchio, rana, Pino Alto, pini e alberi, nave del campo

Scrivi solo dentro `muse/2026-11-22-richieste-creature-e-alberi/` (cartella `consegna/`), con LEGGIMI.md,
foglio di contatto in `controllo/` e «STATO: pronto» in fondo al LEGGIMI quando hai finito, come sempre.
Niente ritocchi da parte di Claude: se un pezzo non va, lo rifai tu. Stile: lo stesso dipinto morbido e
caldo dei personaggi e della Sirena in cala (contorno scuro sottile, ombre acquerellate). Misure «gioco»
= pixel nel gioco; consegna i file a 4× e con la stessa ancora indicata. Oggetti con stati: stesso disegno
in tutti gli stati.

Priorità: A, B, C, D, E. Consegnabili a blocchi (appena finito un blocco, scrivilo nel LEGGIMI).

## A. Granchio (nuova pelle)

Oggi è un disco rosso fatto a programma, 34×24 gioco, che non somiglia al resto. Va rifatto dipinto, visto
dall'alto/tre quarti come gli altri animali, color corallo con zampe più chiare, chele asimmetriche, occhi
su stelo, qualche conchiglietta sul dorso (lo riconosciamo come il granchio dell'isola, non un cartone).
Misura gioco circa 40×28 (file 160×112), ancora = centro del corpo a terra (80, 84), ombra morbida inclusa.
- `granchio-fermo` (1)
- `granchio-cammina-1..4` (camminata laterale verso destra; verso sinistra lo specchia il codice)
- `granchio-spavento-1..2` (chele alzate, si ritrae)
- `granchio-scappa-1..3` (scatto laterale veloce)
- `granchio-scava-1..3` (si infila nella sabbia)

## B. Rana (nuova pelle + salti)

La rana notturna vicino alla pozza oggi è un ovale verde 12 px. Serve una rana vera, 24×18 gioco
(file 96×72), ancora = a terra sotto il corpo (48, 62), vista tre quarti, verde-oliva con pancia chiara,
occhi grandi color crema con pupilla, macchioline scure sul dorso.
- `rana-ferma` (1) e `rana-respira-1..2` (gola che si gonfia piano)
- `rana-salto-1..5` verso destra: 1 carica (accovacciata), 2 stacco (zampe dietro che spingono), 3 volo
  (corpo disteso, zampe dietro allungate), 4 atterraggio, 5 assestamento. Il codice la sposta da un punto
  all'altro: i frame devono restare tutti sulla stessa ancora, il corpo che sale e scende lo fa il disegno.
- `rana-gracida-1..3` (sacco vocale gonfio)
Verso sinistra specchia il codice.

## C. Pino Alto (la vedetta) e albero maestro

Il Pino Alto è l'albero della vedetta: oggi il disegno è fatto a programma, 190×480 gioco (file 760×1920),
ancora = base del tronco (380, 1888). Rifallo dipinto, pino enorme e robusto, con:
- **scala di corda a destra del tronco**, i due montanti verticali con piroli, centrata 16 px gioco (64 px
  file) a destra dell'asse del tronco, dalla base fino alla piattaforma: il personaggio ci sale sopra;
- piattaforma di vedetta con parapetto in cima, a 186 px gioco dalla base (744 px file);
- chioma a ciuffi in alto dietro la piattaforma, ombra morbida a terra sulla destra.
Stati: `pino-alto` (di giorno), `pino-alto-notte` (stessa immagine con luci/tinte da sera, opzionale).

L'«albero maestro» (il pino che si taglia per fare l'albero della Sirena) è un pino da 1,75× la misura
normale: consegna `pino-maestro` intero (più alto e più grosso dei pini normali, tronco dritto, pochi rami
in basso) e `pino-maestro-ceppo`.

## D. Pini e alberi del bosco (set nuovo, coerente con la Sirena e il Pino Alto)

Rifai le specie del bosco, che hanno ancora il vecchio aspetto:
- **pino**, 4 varianti, 96×172 gioco (file 384×688), ancora base tronco;
- **albero a foglia larga**, 6 varianti, 108×146 gioco (file 432×584), ancora base tronco.
Per ogni variante: `intero`, `scosso-1..2` (oscilla di lato quando lo scuoti), `caduta-1..3` (si abbatte
con l'accetta, verso destra), `ceppo` (48×34 gioco, uguale per tutte le varianti della stessa specie).
Chioma e tronco in un solo pezzo, ma il tronco deve potersi vedere sotto la chioma (il personaggio passa
davanti al tronco e dietro la chioma). Contorno scuro sottile, luce da in alto a sinistra.

## E. Nave del campo (Cap. 1) vista dall'alto

Sulla spiaggia del campo c'è la nave dei Fuggiaschi vista dall'alto: scafo scuro, scala di corda sul fianco,
vele blu. Il disegno è vecchio e non somiglia alla Sirena nuova. Rifalla dall'alto con lo **stesso scafo, gli
stessi legni e le stesse vele della Sirena** (`2026-11-17-sirena-approdi/sirena-ormeggiata`): ormeggiata
alla riva, con scala di corda sul fianco della riva e le vele raccolte (blu scuro del vecchio stato, ora
con i toni della Sirena). Tela 1720×1320 come la nave in cala, stessa ancora (centro scafo a x=860, base a
y=1180), in due stati: `nave-campo-integra` e `nave-campo-notte` (stessa immagine con i toni della sera).

## Già consegnato, da montare (non rifare)

Gli interni delle capanne (`2026-11-20-blocco-e`: capanna-pavimento, capanna-parete, letto, tavolo,
scaffale, tappeto, ecc.) e la Sirena ormeggiata in mare sono già nel repo: li monta Claude.

STATO: da consegnare.
