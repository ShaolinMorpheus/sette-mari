# Consegna: terreno pastello — texture aggiornate, versioni dettaglio, note tecniche

## Cosa sono i file e dove vanno usati

Texture di superficie per il terreno di «Sette Mari», stile acquerello/pastello,
da usare nella grafica di prova (opzione nel menu Partita, spenta di default).
Sostituiscono/completano le texture terreno già in prova.

| File | Uso | Misura |
|---|---|---|
| `terreno-erba.png.b64` | superficie prato | 1280×1280 |
| `terreno-sabbia.png.b64` | superficie spiaggia | 1600×1600 |
| `terreno-acqua.png.b64` | superficie acqua (bassa) | 1600×1600 |
| `terreno-terra.png.b64` | terra battuta (sentieri, radura campo) | 1600×1600 |
| `terreno-erba-dettaglio.png.b64` | prato ad alto dettaglio — preferire questa per l'erba | 1024×1024 |
| `terreno-terra-dettaglio.png.b64` | terra battuta ad alto dettaglio — preferire questa per i sentieri | 1024×1024 |
| `acqua-animata-nota.md` | nota tecnica: riva animata mappata sul codice attuale (`WATERC`, `FOAM_A/B`, `CAUS_A/B`, `SWELL`, segmenti di riva) | — |
| `nota-nitidezza.md` | nota tecnica: come applicare le texture senza perdere nitidezza | — |

Tutte le texture sono quadrate e rese **ripetibili (tileable)** senza giunture
visibili: si possono ripetere a griglia.

**Formato di transito:** le texture viaggiano come file di testo `.png.b64`
(base64 dei PNG esatti), perché il collegamento GitHub di Muse trasporta solo
file di testo — è la stessa convenzione già usata in `sorgenti/art/`.
Per ottenere i PNG: `base64 -d terreno-erba.png.b64 > terreno-erba.png`
(i byte decodificati sono identici agli originali).

## Cosa NON deve cambiare

- Forma della mappa, posizioni, collisioni: invariati (è solo una reskin delle
  superfici).
- Sprite esistenti (alberi, rocce, edifici, personaggi): invariati.
- La grafica classica resta quella di default; questa consegna vive nella
  grafica di prova.
- In `nota-nitidezza.md`: ripetere ogni tile su aree limitate (indicativamente
  6–8 celle di lato), cuocere il terreno a scala 1:1, niente smoothing sul
  livello terreno — altrimenti le texture risultano sfocate in gioco.

## Cosa è nuovo rispetto alla consegna precedente (zip passato a mano)

- Prima consegna via cartella `muse/` secondo `ISTRUZIONI.md` (sostituisce lo
  zip manuale).
- Texture ad alto dettaglio per erba e terra battuta (già presenti nello zip,
  qui in versione ufficiale).
- Tutte le texture rese tileabili a programma (nello zip non era garantito).
- Nota acqua animata riscritta sulle strutture reali del codice (letta da
  `www/stabile.html`, sezione `02_ground.js`): verificare che `www/index.html`
  attuale usi le stesse strutture prima di applicarla.
- Nomi file normalizzati in minuscolo senza spazi.

STATO: pronto
