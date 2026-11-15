# Vegetazione pastello — prima consegna: palma, albero, pino, cespuglio (15 novembre 2026)

Rifacimento degli sprite naturali nel registro del terreno e del mare nuovi: acquerello/pastello, desaturato e gessoso, lavaggi morbidi con bordo di pigmento, grana di carta, niente colori digitali saturi e niente contorni neri duri.

## Metodo (vincolo forma/collisioni)

Gli sprite sono stati RIDIPINTI DENTRO le sagome degli sprite attuali, presi dal repository (`sorgenti/art/art_js.js`, gli `mkArt` del motore): canale alpha identico byte per byte (verificato per ogni file), stessa misura in pixel, stesso punto d'appoggio. Cambia solo il colore interno: rimappatura per classi (fogliame giallo-verde, fogliame blu-verde per il pino, legno in terra bruciata calda) su rampe gessose ancorate alla luminanza originale, più lavaggi morbidi, bordo di pigmento vicino al contorno e grana di carta. Le ombre a terra non sono disegnate (le fa il motore). L'RGB sotto i pixel trasparenti è valorizzato per estensione dai bordi: niente aloni quando il motore scala gli sprite (prova in `controllo/prova-sfondi.png.b64`: palma e albero su sabbia, erba e mare).

## Misure (pixel del file = sprite attuale; tra parentesi disegno e ancora nel motore)

- `palm-a.png`, `palm-b.png` — 302×330 (disegno 151×165, ancora 69,164). Base unica del motore: è la stessa arte di `SP.palm0` e di `SP.palm` (le noci le aggiunge il motore sul canvas), quindi questa ridipintura copre entrambe.
- `tree-a.png` — 230×280 (disegno 115×140, ancora 58,139), dall'arte tA attuale. `tree-b.png` — 244×300 (disegno 122×150, ancora 58,149), dall'arte tB attuale: le due varianti dell'albero sono le due forme che il gioco ha già.
- `pine-a.png`, `pine-b.png` — 226×320 (disegno 113×160, ancora 56,5,159).
- `bush-a.png`, `bush-b.png` — 128×120 (disegno 64×60, ancora 32,58).

## Varianti

Per palma, pino e cespuglio le varianti -a/-b hanno la stessa sagoma dell'originale (vincolo collisioni) e differiscono per lavaggi, distribuzione della luce e una punta di tonalità (la -b è leggermente più calda/giallo-verde). Se per il bosco servono anche sagome diverse, vanno disegnate a parte: richiedono una decisione sulle collisioni, perché forma e ingombro cambierebbero.

## Anteprima

`anteprima-vegetazione.png`: i quattro oggetti (entrambe le varianti) in piedi su una striscia sabbia | erba | mare, alle misure di disegno del motore e ancorati alla base.

## Non in questa consegna (prossimo giro, dopo via libera)

palm0 come file separato non serve (stessa base della palma, vedi sopra). Restano: bush0 (cespuglio spoglio, arte separata `bush_empty`), berry e berry0, stump, boulder, rubble/rubbleS, shell, rockpool — stesse regole: sagome e misure dagli sprite attuali in `sorgenti/art/`.

STATO: prima consegna (palma, albero, pino, cespuglio) pronta — resto in attesa di via libera
