# Muse — orto e piccoli pezzi: consegna in alta risoluzione (25 nov 2026)

Sul telefono l'orto (e in generale i pezzi piccoli) risulta sgranato: i file sono consegnati alla misura esatta del codice (es. orto 184×116, colture 28×26), ma sul telefono ogni pixel del gioco viene ingrandito 2-3 volte.

## Cosa fare
Rifai la stessa identica consegna a **risoluzione 3×** (stessa composizione, stessi livelli, stesso nome file + suffisso `@3x`), disegnando a quella grandezza (non ingrandire i file esistenti: i dettagli vanno ridisegnati nitidi):
- orto: `orto-base@3x`, `orto-recinto-davanti@3x`, `orto-spaventapasseri@3x` → 552×348, àncora (312,276)
- colture: 12 file `coltura-<tipo>-<stadio>@3x` → 84×78
- essiccatore: telaio 360×336 + 6 appesi 72×156
- conchiglie 90×78, teschio 90×72, rottami 168×114

Se riesci, fai lo stesso per cespugli, palma e rovine (3×). Mantieni margini ≥ 8 px (scalati), sfondo trasparente, un solo disegno per frame.
Nel LEGGIMI scrivi le nuove misure e conferma che le àncore sono esattamente 3× quelle precedenti. Il gioco le disegnerà a 1/3 della grandezza, quindi l'aspetto in scena resta uguale ma nitido.
