# Consegna: mappa v2 — texture terreno rifinite

Seguito della consegna `2026-11-14-terreno-pastello`. Tutte le immagini sono
file di testo `.png.b64` (base64 del PNG, una sola riga): decodificare con
`base64 -d nome.png.b64 > nome.png`. Tutte le texture sono 1600×1600,
acquerello/pastello con dettaglio fitto, rese ripetibili (tileable) senza
giunture visibili. Per contenere il peso di transito i PNG sono salvati con
palette a 256 colori con dithering: i bordi restano nitidi, i colori sono
quelli approvati.

| File | Cosa è | Cambiamenti rispetto alla versione precedente |
|---|---|---|
| `terreno-sabbia.png.b64` | Spiaggia: sabbia più calda e dorata, grani visibili, sassolini, conchiglie rade | Nuova: prima era chiara e a macchie grandi, senza grani/conchiglie |
| `terreno-erba.png.b64` | Prato: stessa base fitta dell'erba-dettaglio approvata, ma più chiara e viva (luminosità e saturazione alzate) | L'erba precedente era troppo scura |
| `terreno-sottobosco.png.b64` | Interno bosco: verde scuro, foglie cadute, felci, muschio, macchie d'ombra da chioma | Nuova, non esisteva |
| `terreno-roccia.png.b64` | Suolo roccioso grigio-bruno: lastre, crepe, sassi e graniglia | Nuova, non esisteva |
| `terreno-acqua-bassa.png.b64` | Acqua bassa di riva: turchese chiaro e luminoso, fondo sabbioso in trasparenza, caustiche e scintille | Nuova: sostituisce l'uso dell'acqua generica vicino alla riva |
| `schiuma-riva.png.b64` | Striscia di schiuma bianca semitrasparente (PNG con alfa) per il bordo acqua: banda di bolle/merletto al centro del canvas, trasparente sopra e sotto; ripetibile in orizzontale | Nuova, non esisteva |

## Uso previsto

- Le 5 texture di superficie sostituiscono/completano quelle della consegna
  precedente nelle stesse zone (prato, spiaggia, acqua di riva) e aggiungono
  bosco interno e suolo roccioso.
- `schiuma-riva` va appoggiata lungo il confine acqua/terra, allineando la
  banda centrale al bordo; si ripete in orizzontale.
- Valgono le stesse regole della nota nitidezza della consegna precedente:
  tile ripetuta su aree limitate (6–8 celle), terreno cotto a scala 1:1,
  niente smoothing sul livello terreno.

## Cosa NON deve cambiare

- Forma della mappa, posizioni, collisioni: invariati.
- Sprite esistenti: invariati. Grafica classica di default; consegna attiva
  solo nella grafica di prova.

STATO: pronto
