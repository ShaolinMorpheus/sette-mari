# Oggetti dai riferimenti + pino vivo — consegna del 16 novembre 2026

Ridipintura degli oggetti che nel gioco erano disegnati a codice, partendo dai
riferimenti esportati in `muse/2026-11-16-riferimenti/` (LEGGIMI di Claude:
misure e ancore). Regola colore applicata: **regola viva permanente del
15 nov 2026, ore 22:57** — saturazione alta, fogliame più verde e saturo
(+~30%, ~10° verso il verde), legno e pietra invariati come tinta, pastello
colorato mai sbiadito, linee scure (rami, crepe, giunture, contorni) marrone
molto scuro/quasi nero come negli originali, mai convertite nel colore della
classe. Stesso metodo della consegna `2026-11-15-stati`: ridipintura per
classi di colore dentro la sagoma originale, lavaggi morbidi a bassa
frequenza + grana di carta, seed fisso per oggetto.

## Garanzia di forma

Per tutti gli oggetti dai riferimenti (rockpool, rockpool0, mesa, torre,
bandiera, oldcamp, lookout) e per il pino: **sagoma, misura in pixel e canale
alpha identici byte per byte all'originale** (verifica automatica nello
script: il push sarebbe fallito in caso contrario). Cambia solo il colore
interno. Collisioni e punti d'appoggio invariati. Le ombre a terra già cotte
negli sprite di riferimento (mesa, oldcamp, torre, lookout) sono state
lasciate intatte.

## Tabella misure

I file dai riferimenti sono a 4× il disegno nel gioco (come da LEGGIMI dei
riferimenti). Ancora: prima coppia = pixel del file, seconda = pixel del
disegno in gioco.

| file | file (px) | disegno in gioco | ancora file | ancora disegno | note |
|---|---|---|---|---|---|
| pine-a.png.b64 | 226×320 | 113×160 | (113, 318) | (56,5, 159) | riemissione viva del pino di `2026-11-15-vegetazione/` (variante a); stessa misura e ancora di quella consegna (file a 2×) |
| pine-b.png.b64 | 226×320 | 113×160 | (113, 318) | (56,5, 159) | variante b, come sopra |
| rockpool.png.b64 | 168×96 | 42×24 | (42, 38) | (10,5, 9,5) | pozza PIENA: acqua e cozze |
| rockpool0.png.b64 | 168×96 | 42×24 | (42, 38) | (10,5, 9,5) | pozza VUOTA: stesso disegno in un'unica passata dalla piena — cozze tolte (pietra al loro posto), acqua bassa: resta una pozza piccola al centro, intorno pietra umida scura. Sagoma/alpha identici alla piena |
| mesa.png.b64 | 970×730 | 242×182 | (242, 310) | (60,5, 77,5) | roccione/altopiano: solo aspetto rifatto (piano erboso vivo, pini e cespugli sopra più verdi, scogliera in pietra calda con strati e giunture scure); la forma a terra non cambia |
| torre.png.b64 | 260×524 | 65×131 | (65, 254) | (16,25, 63,5) | torre di guardia: legno caldo, tetto di paglia, bagliore della lanterna |
| bandiera.png.b64 | 112×352 | 28×88 | (28, 166) | (7, 41,5) | solo pennone con pomolo dorato e sassi alla base; il telo resta gestito dal motore, come oggi |
| oldcamp.png.b64 | 544×300 | 136×75 | (120, 134) | (30, 33,5) | vecchio campo del naufrago, stessa composizione: tenda strappata con toppe e buco, cerchio di sassi, croce, ossa, attrezzi |
| lookout.png.b64 | 380×960 | 95×240 | (95, 472) | (23,75, 118) | il Pino Alto con piattaforma e scala di corda: chioma nel fogliame vivo, tronco/piattaforma/scala in legno invariato |
| tenda.png.b64 | 480×288 | 120×72 | (240, 268) | (60, 67) | **NUOVA, vedi nota sotto** — tenda dei Fuggiaschi intera, senza strappi |
| cartello.png.b64 | 160×224 | 40×56 | (80, 208) | (20, 52) | **NUOVO, vedi nota sotto** — palo con tavola grande e tavoletta sotto, entrambe vuote |

## Nota su tenda e cartello (misure nuove, da confermare)

Nei riferimenti NON esiste uno sprite unico né una misura per questi due
oggetti: il LEGGIMI dei riferimenti dice che sono composti dal motore, e che
Muse poteva partire dalla tenda e dal cartello a croce visibili in
`oldcamp.png`. Quindi per questi due **non esisteva una misura di oggi da
mantenere**: le misure in tabella sono proposte nuove (scala coerente con gli
altri oggetti: file a 4× il disegno), dichiarate qui invece di essere
spacciate per misure esistenti. Claude le adotti pure cambiandole: forma e
ancora sono quelle in tabella. La tenda è disegnata pulita e intera (lembo
frontale chiuso, corde e picchetti, palo di colmo), nella stessa tela calda
del campo vecchio ma senza toppe né buco. Il cartello ha la tavola vuota: la
scritta la mette il motore, come oggi.

## Metodo e limiti dichiarati

- Ridipintura a programma (non generazione a mano libera): è il metodo che
  garantisce sagoma/alpha identici e stati coerenti in un'unica passata.
  Tenda e cartello sono disegnati a programma da zero (forme pulite, lavaggi
  morbidi, grana): sono i due pezzi più «piatti» della consegna — se Davide
  li vuole più dipinti, vanno rifatti come disegno a mano libera, ma
  perderemmo la misura dichiarata esatta.
- La vuota della pozza NON è la piena resa trasparente al 60% (come fa oggi
  il gioco): è un disegno vero, derivato dalla piena nella stessa passata.
- Il pino è la riemissione degli sprite di `2026-11-15-vegetazione/` con la
  sola correzione colore sul fogliame (saturazione ×1,30, tinta spostata di
  10° verso il verde puro); tronco byte-identico come tinta di classe (ramo
  legno invariato), sagoma e alpha identici.

## Controlli fatti (in `controllo/`)

- `anteprima-su-erba.png`: mesa, lookout, torre, pini a/b, oldcamp, tenda,
  bandiera e cartello sulla texture erba vera del gioco (terreno erba
  dettaglio). Colori leggibili, nessun alone.
- `anteprima-su-sabbia-e-mare.png`: rockpool piena e vuota, tenda, bandiera,
  cartello e pino su sabbia vera + fascia di mare (mare-medio giorno di
  mare-v2). Le due pozze si distinguono a colpo d'occhio.
- Verifica aloni automatica su tutti gli sprite: pixel di bordo
  semi-trasparenti quasi bianchi = 0 per ogni file.
- Verifica alpha: per ogni sprite dai riferimenti e per i pini, il canale
  alpha del file consegnato è identico byte per byte all'originale.

## File

Tutti gli sprite sono `.png.b64` (base64 su una riga), elenco in
`elenco.txt`. Anteprime in `controllo/` (PNG normali, non servono al gioco).

STATO: pronto
