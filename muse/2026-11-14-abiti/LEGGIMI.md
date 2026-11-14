# Consegna: abiti del personaggio — corpi senza testa

I 6 abiti del set approvato ridisegnati come **corpi senza testa**: il gioco
aggiunge testa e cappello. Non sono disegnati viso, capelli, orecchino né
cappello; il collo finisce pulito alla base della testa, nella stessa
posizione dei frame del Capitano (giacca rossa). Stessa scala (canvas
336×376), stesso punto di appoggio dei piedi, sfondo trasparente.

Consegna **uno abito alla volta** come richiesto: il marinaio è completo e
pronto per il controllo; gli altri seguono dopo l'ok.

| Abito | Cartella | Stato |
|---|---|---|
| 02 marinaio a righe | `02-marinaio-righe/` | COMPLETO (55 frame) |
| 03 esploratore | — | in attesa di ok sul marinaio |
| 04 marsina di velluto | — | in attesa |
| 05 corsaro nero | — | in attesa |
| 06 navigatore | — | in attesa |
| 07 giubba corsaro | — | in attesa |

## Contenuto di ogni cartella abito

- `frame/` — 55 file `.png.b64` (base64 del PNG, una sola riga;
  decodificare con `base64 -d nome.png.b64 > nome.png`). Nomi uguali ai
  frame corrispondenti del Capitano.
- `elenco.txt` — i 55 frame in ordine di gioco: camminata (fronte,
  profilo destro, profilo sinistro, spalle; fermo + passo1–4), torcia
  (stesse 4 viste), colpi in profilo destro (mani nude 1–3, ascia 1–6,
  piccone 1–6).

## Note tecniche

- I corpi derivano dai frame approvati dello stesso abito (stesso disegno,
  stessa scala): testa rimossa alla base del collo, sfondo reso trasparente.
- Fiamma della torcia sempre presente e stessa dimensione; attrezzi e mani
  integri anche nelle pose con braccia alzate.

## Cosa NON deve cambiare

- Forma della mappa, posizioni, collisioni: invariati.
- Testa, cappelli e giacca rossa del Capitano già integrati: invariati.

STATO: in lavorazione
