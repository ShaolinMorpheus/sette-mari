# Mare v2 — varianti tramonto, notte, tempesta (15 novembre 2026)

Stessa struttura, stessi nomi e stesse misure della variante giorno (vedi `LEGGIMI.md`): per ogni variante `profondita-<v>.png` (256×1 RGBA), `mare-medio-<v>.png` e `mare-largo-<v>.png` (512×512 opache), `onde-increspature-<v>.png` e `riflessi-<v>.png` (256×256). I file del giorno non sono stati toccati.

Scelte di coerenza:
- Le marezzature di medio/largo usano GLI STESSI semi della variante giorno: il disegno dei lavaggi è identico in tutte le varianti, cambiano solo i colori — così la miscelazione con l'ora del gioco non fa "nuotare" le macchie.
- Le increspature hanno le stesse linee del giorno: al tramonto invariate, in notte attenuate (alpha ×0,7), in tempesta rinforzate e raddoppiate (alpha ×1,6 e un secondo gruppo di linee).
- Registro pastello mantenuto (desaturazione gessosa misurata: largo tramonto 0,59, notte 0,67 per la natura dei blu profondi, tempesta 0,53; riferimento acqua del terreno 0,57).

## Tramonto
Tavolozza: spiaggia (188,227,209, alpha ~100) → bassa (94,186,186) → media (62,134,172) → largo (42,88,130) → abisso (24,42,72). Stessi blu del giorno ma più scuri; la parte calda sta nei riflessi: `riflessi-tramonto` sono trattini arancio-rosa (252,188,142), più numerosi e più lunghi (la scia del sole basso). Per la riva si riusano schiuma e sabbia bagnata del giorno: con la luce calda la schiuma bianca resta giusta.

## Notte
Tavolozza: spiaggia (148,191,201, alpha ~90) → bassa (66,138,160) → media (40,94,140) → largo (27,62,106) → abisso (23,30,65) con deriva viola nelle zone più scure. Riflessi freddi (206,224,250), pochi e corti (luce di luna). Per la riva esiste il set notte dedicato in `2026-11-15-mare/` (schiuma-bordo-notte, schiuma-scia-notte, sabbia-bagnata-notte): schiuma fredda (198,216,228) e attenuata, sabbia bagnata più scura e fredda (112,94,54) — stesso disegno del giorno, stessi semi.

## Tempesta
Tavolozza desaturata verso il grigio-verde ardesia: spiaggia (168,201,193, alpha ~120) → bassa (90,156,150) → media (58,118,128) → largo (40,86,104) → abisso (22,46,64). Riflessi quasi assenti e grigi (198,212,214): sotto la tempesta il sole non scintilla. Per la riva riusare il set notte (schiuma più grigia e fredda); se serve una schiuma tempesta dedicata, più abbondante, si può generare con gli stessi semi e densità maggiore.

## Anteprime e controlli
Alla radice: `anteprima-mare-tramonto.png`, `anteprima-mare-notte.png`, `anteprima-mare-tempesta.png` — stessa scena di prova del giorno (nelle scene la sabbia non è tinta: servono a giudicare l'acqua; in gioco la tinta oraria del motore si applica a tutto). In `controllo/`: per ogni variante le prove 3×3 di largo, medio, increspature e riflessi e la tavolozza ingrandita. Nessuna giuntura visibile; vale la stessa nota del giorno sulla ripetizione morbida delle marezzature grandi a 3×3.

STATO: varianti tramonto, notte e tempesta pronte
