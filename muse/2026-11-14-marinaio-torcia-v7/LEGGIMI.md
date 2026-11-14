# Marinaio a righe — frame con torcia v7 (solo fronte e profilo-destro, passo1–4)

Correzione mirata delle gambe nei frame di profilo, chiesta il 14 nov:
nei frame torcia-profilo passo1 e passo3 del marinaio la gamba dietro
era alzata (posa di corsa). Qui il problema è risolto e dimostrato con
le immagini di controllo allegate.

## Il problema era nella base, e va detto

Confrontando i frame del Capitano del set di lavoro:
- i suoi frame di CAMMINATA (01-capitano-rosso_profilo-destro-*) hanno
  il ciclo giusto: passo1 e passo3 gambe vicine, quasi dritte, due
  stivali a terra; passo2 e passo4 falcata larga.
- i suoi frame TORCIA di profilo (01-capitano-rosso_torcia-profilo-
  destro-passo1 e passo3) hanno invece la gamba dietro ALZATA, posa di
  corsa: sono incoerenti con la sua camminata. Le versioni precedenti
  del marinaio, copiando quei frame, hanno ereditato la posa di corsa.

Perciò in questa v7, nei frame di profilo, la parte dalla cintura in
giù è presa dai frame di CAMMINATA del Capitano (stessa vista, stesso
passo), allineata alla sua cintura nel frame torcia (la figura torcia
sta ~8–12 px più in basso di quella di camminata: l'allineamento è
fatto sulla linea della cintura, e la base dei piedi resta quella del
frame torcia). Nei frame di fronte la parte sotto la cintura è quella
del frame torcia stesso, intatta. In entrambi i casi, sotto la cintura
l'unico cambiamento di colore è pantaloni jeans → navy (e l'orlo della
giacca → navy).

## File di partenza di ogni frame

Per tutti gli 8 frame:
- SOPRA LA CINTURA (busto, braccio, mano, torcia): base
  `01-capitano-rosso_torcia-<vista>-<passo>.png`
- TESTA: `02-marinaio-righe_<vista>-fermo.png` (frame senza torcia)
- MAGLIA: texture da `02-marinaio-righe_<vista>-<passo>.png`
- SOTTO LA CINTURA, fronte: `01-capitano-rosso_torcia-fronte-<passo>.png`
  (intatto, solo pantaloni navy)
- SOTTO LA CINTURA, profilo-destro:
  `01-capitano-rosso_profilo-destro-<passo>.png` (camminata del
  Capitano, allineata alla cintura; solo pantaloni navy)

## Controllo di sovrapposizione (cartella controllo/)

Ogni `controllo/<nome>.png` è il frame del marinaio al 50% di
trasparenza sopra il frame del Capitano di riferimento (fronte: il
frame torcia; profilo: la camminata allineata alla cintura). Sopra la
cintura il doppio contorno è atteso (pose diverse: torcia contro
camminata, testa e vestiti diversi); il controllo riguarda gambe e
stivali. Esito per frame, verificato anche numericamente (differenza
di sagoma sotto la cintura = 0 in tutti i frame):

- torcia-fronte-passo1: sovrapposizione gambe coincide — SÌ
- torcia-fronte-passo2: sovrapposizione gambe coincide — SÌ
- torcia-fronte-passo3: sovrapposizione gambe coincide — SÌ
- torcia-fronte-passo4: sovrapposizione gambe coincide — SÌ
- torcia-profilo-destro-passo1: sovrapposizione gambe coincide — SÌ
  (gambe vicine, due stivali a terra; niente più gamba alzata)
- torcia-profilo-destro-passo2: sovrapposizione gambe coincide — SÌ
- torcia-profilo-destro-passo3: sovrapposizione gambe coincide — SÌ
  (gambe vicine, due stivali a terra; niente più gamba alzata)
- torcia-profilo-destro-passo4: sovrapposizione gambe coincide — SÌ

Altri controlli: nessuna macchia vicino alla bocca (rimossi i resti
del volto del Capitano rimasti vicino alla fiamma), nessun pezzo di
tessuto che sborda in vita (orlo ridipinto navy), righe della maglia
continue, nessun dettaglio rosso/dorato residuo della giacca.

## Contenuto

- `frame/` — 8 file `.png.b64`: torcia-fronte passo1–4 e
  torcia-profilo-destro passo1–4. Canvas 336×376, sfondo verde.
- `controllo/` — gli 8 controlli di sovrapposizione `.png.b64`
  (decodificare con `base64 -d nome.png.b64 > nome.png`).
- `elenco.txt` — gli 8 frame in ordine.

## Cosa NON cambia

- Gli altri frame del marinaio e del Capitano: invariati. Se i frame
  torcia di profilo del Capitano vanno corretti alla radice (gambe
  della camminata anche lì), è un lavoro a parte da chiedere a parte.

STATO: pronto
