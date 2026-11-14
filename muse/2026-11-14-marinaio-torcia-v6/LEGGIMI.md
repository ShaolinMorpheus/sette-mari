# Marinaio a righe — frame con torcia v6 (ricominciati da zero)

Le versioni precedenti dei frame torcia del marinaio (v3, v4, v5) sono
da SCARTARE: avevano le gambe sbagliate. Questi frame sono rifatti da
zero partendo SOLO dai frame torcia del Capitano, che hanno il ciclo di
camminata giusto. Nessun frame torcia del marinaio è stato usato come
base o come sorgente.

## File di partenza di ogni frame

Per tutti i 20 frame:
- BASE (sagoma, gambe, stivali, bacino, posizione dei piedi, braccio,
  mano e torcia, pixel per pixel):
  `01-capitano-rosso_torcia-<vista>-<passo>.png`
- TESTA (trapiantata e allineata su quella del Capitano):
  `02-marinaio-righe_<vista>-fermo.png` — il frame SENZA torcia del
  marinaio (profilo-destro-fermo e fronte-fermo quelli indicati;
  per le spalle, spalle-fermo)
- MAGLIA (texture a righe bianche/blu e cintura, dai frame SENZA
  torcia del marinaio): `02-marinaio-righe_<vista>-<passo>.png`
  (stessa vista e stesso passo; il fermo della vista come riserva)

In dettaglio:
- torcia-fronte × fermo, passo1–4: base `01-capitano-rosso_torcia-fronte-<passo>.png`, testa da `02-marinaio-righe_fronte-fermo.png`, maglia da `02-marinaio-righe_fronte-<passo>.png`
- torcia-profilo-destro × fermo, passo1–4: base `01-capitano-rosso_torcia-profilo-destro-<passo>.png`, testa da `02-marinaio-righe_profilo-destro-fermo.png`, maglia da `02-marinaio-righe_profilo-destro-<passo>.png`
- torcia-spalle × fermo, passo1–4: base `01-capitano-rosso_torcia-spalle-<passo>.png`, testa da `02-marinaio-righe_spalle-fermo.png`, maglia da `02-marinaio-righe_spalle-<passo>.png`
- torcia-profilo-sinistro × fermo, passo1–4: specchio esatto del
  corrispondente torcia-profilo-destro di questa consegna.

## Cosa è cambiato rispetto al Capitano

- Solo i colori dei vestiti: giacca rossa → maglia a righe bianche e
  blu regolari e continue; pantaloni → navy. Cintura: quella del
  marinaio dei frame senza torcia.
- Testa: quella approvata del marinaio (frame senza torcia).
- Eliminati del tutto bottoni, colletto, bordini e ogni dettaglio
  rosso o dorato della giacca (verifica: 0 pixel rossi/dorati residui
  nella zona dei vestiti).
- Nei frame base del Capitano c'è una debole impronta fantasma del
  personaggio sullo sfondo, a destra della testa: nei frame fronte è
  stata rimossa (sfondo verde pulito), perché il trapianto della testa
  la rendeva visibile a contrasto.

## Controlli fatti prima della consegna

- Ogni frame è stato affiancato al corrispondente del Capitano: le
  gambe si sovrappongono perfettamente (verifica numerica: sotto la
  cintura la sagoma coincide al 100% con quella del Capitano in tutti
  i 20 frame; passo1 e passo3 gambe vicine con stivale posteriore a
  terra, passo2 e passo4 falcata larga, come il Capitano).
- Torcia e fiamma: quelle del Capitano, mai ritoccate; niente strisce
  sulla punta.
- Barba: quella del marinaio, senza macchie verdi o beige.

## Contenuto

- `frame/` — 20 file `.png.b64` (base64 del PNG, una sola riga;
  decodificare con `base64 -d nome.png.b64 > nome.png`): torcia
  fronte, profilo destro, profilo sinistro e spalle, ciascuno con
  fermo e passo1–4. Canvas 336×376, sfondo verde uniforme.
- `elenco.txt` — i 20 frame in ordine di gioco.

## Cosa NON deve cambiare

- Gli altri frame del marinaio (camminata e colpi) e tutti i frame
  del Capitano: invariati.
- Forma della mappa, posizioni, collisioni: invariati.

STATO: pronto
