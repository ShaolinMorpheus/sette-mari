# Marinaio a righe — frame con torcia v5 (versione pulita della bozza)

Risposta a `RICHIESTA.md`: i frame torcia del marinaio rifatti puliti a
partire dai frame del Capitano (`01-capitano-rosso_torcia-*`), come nella
bozza di riferimento.

## Come sono fatti

- Pose, gambe, stivali, bacino, braccio e torcia IDENTICI al Capitano,
  pixel per pixel (verifica numerica: fuori da maglia, cintura e
  pantaloni i pixel coincidono al 100% con i frame del Capitano).
- Maglia a righe bianche/blu con la texture dipinta dei frame del
  marinaio: righe regolari e continue, senza buchi, fino alla cintura.
- Nessun bottone, colletto o dettaglio della giacca rossa: rimossi tutti
  (residuo rosso/oro ~0 pixel per frame).
- Cintura MARRONE (fibbia dorata conservata), pantaloni navy.
- Testa e barba del marinaio come nei suoi frame senza torcia (stessa
  testa approvata del personaggio).
- Torcia con la punta arancione integra, senza strisce: la fiamma è
  quella del Capitano, mai ritoccata.
- `torcia-profilo-sinistro` ricavato per specchio dal profilo destro;
  `torcia-spalle` rifatto dal Capitano con lo stesso metodo (righe
  continue sul dorso, niente toppa).

## Contenuto

- `frame/` — 20 file `.png.b64` (base64 del PNG, una sola riga;
  decodificare con `base64 -d nome.png.b64 > nome.png`): torcia fronte,
  profilo destro, profilo sinistro e spalle, ciascuno con fermo e
  passo1–4. Canvas 336×376, sfondo verde uniforme come gli altri frame.
- `elenco.txt` — i 20 frame in ordine di gioco.

## Cosa NON deve cambiare

- Gli altri frame del marinaio (camminata e colpi) e tutti i frame del
  Capitano: invariati.
- Forma della mappa, posizioni, collisioni: invariati.

STATO: pronto
