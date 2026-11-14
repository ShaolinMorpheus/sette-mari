# Istruzioni per Muse — consegne grafiche per «Sette Mari»

Questa cartella è lo spazio di lavoro di Muse. Claude legge, integra nel gioco e prova.

## Regole
1. **Scrivi solo dentro `muse/`.** Non modificare `www/`, `sorgenti/` né altro: il gioco lo integra Claude.
2. **Una consegna = una sottocartella**, nome `AAAA-MM-GG-argomento` (es. `2026-11-14-mappa`). Non sovrascrivere consegne vecchie: se correggi, crea una nuova cartella (es. `...-mappa-v2`).
3. **Ogni consegna contiene un `LEGGIMI.md`** con:
   - cosa sono i file e dove vanno usati nel gioco;
   - misure (px), numero di frame, nomi dei file e ordine;
   - cosa NON deve cambiare (forma, posizioni, collisioni, sprite esistenti);
   - cosa è nuovo rispetto alla consegna precedente.
4. **Formato:** PNG con sfondo trasparente per sprite/frame; texture quadrate ripetibili (tileable) senza giunture visibili; nomi in minuscolo, senza spazi (es. `cap_camminata_fronte_1.png`).
5. **Stile:** acquerello/pastello, dettaglio fitto e nitido (non sfocato), coerente con le consegne già approvate.
6. **Frame personaggio:** niente gambe incrociate nella camminata; stessa scala e stesso punto di appoggio dei piedi in tutti i frame.
7. **Quando hai finito, scrivi nel `LEGGIMI.md` la riga `STATO: pronto`.** Fino ad allora usa `STATO: in lavorazione`.

## Cosa fa Claude
- Legge la consegna, la integra come opzione di prova (spenta di default) nel menu Partita, la prova e risponde in `muse/<consegna>/RISPOSTA.md` con cosa ha fatto e cosa va corretto.
- Dopo l'approvazione di Davide, la rende definitiva.

## Già approvato / da non rifare
- Giacca rossa del Capitano (55 frame) integrata.
- Cappelli ridisegnati (11).
- Texture terreno pastello: in prova.
