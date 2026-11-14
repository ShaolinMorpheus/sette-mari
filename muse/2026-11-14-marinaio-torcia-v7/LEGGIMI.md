# Marinaio a righe — frame con torcia v7 (set completo, 20 frame)

Aggiornamento della v7 nella stessa cartella, come richiesto il 14 nov:
le gambe di profilo approvate NON sono state toccate (verifica: sotto
la cintura i frame di profilo-destro passo1–4 sono pixel per pixel
quelli già consegnati). Il resto è stato ripulito e il set completato.

## Pulizie fatte

- BUSTO: la maglia ora è un riempimento a righe campionate riga per
  riga dal fermo del marinaio della stessa vista: righe bianche/blu
  regolari, continue e orizzontali, con i bordi della sagoma del
  Capitano (niente tessuto che sborda dietro la schiena o dalle
  maniche, niente pannelli estranei). Maniche bianche con ombreggiatura
  leggera e contorno pulito, come nei frame senza torcia. Sul dorso
  (spalle) la toppa beige del Capitano è coperta dalle righe.
- VISO IN PROFILO: trapianto pulito della testa del fermo del
  marinaio (profilo-destro-fermo), allineata sugli occhi: la macchia
  marrone vicino alla bocca — resti del volto del Capitano rimasti
  accanto alla fiamma — è eliminata. Verifica numerica: i pixel del
  viso disegnato coincidono con quelli del fermo; le sole differenze
  (circa 500 pixel su ~11.800) sono il bordo inferiore del collo sotto
  il colletto e i pixel coperti da torcia e mano, che restano del
  Capitano.
- FRONTE PASSO2 (e gli altri fronte): la macchia sulla cintura è
  tolta — la cintura è ricopiata dai frame del marinaio e ripulita
  (fibbia dorata conservata); anche il triangolo chiaro sotto la
  cintura è ora navy come i pantaloni.

## Frame aggiunti in questo aggiornamento

- torcia-fronte-fermo e torcia-profilo-destro-fermo (stesso metodo
  degli altri frame della vista).
- torcia-profilo-sinistro, fermo e passo1–4: specchio esatto del
  profilo destro.
- torcia-spalle, fermo e passo1–4: sopra la cintura dai frame torcia
  del Capitano; sotto la cintura le gambe sono quelle dei frame di
  CAMMINATA del Capitano (01-capitano-rosso_spalle-*), allineate alla
  cintura, come per il profilo; la toppa beige sul dorso è coperta
  dalle righe della maglia.

## Base e gambe (riepilogo, come nella prima v7)

- Fronte: sotto la cintura = frame torcia del Capitano, intatto,
  solo pantaloni jeans → navy.
- Profilo destro/sinistro e spalle: sotto la cintura = frame di
  camminata del Capitano della stessa vista e passo, allineati alla
  linea della cintura del frame torcia (la figura torcia sta qualche
  pixel più in basso; la base dei piedi resta quella del frame
  torcia); solo pantaloni → navy. Motivo: i frame torcia di profilo
  del Capitano (passo1 e passo3) hanno la gamba dietro alzata, posa
  di corsa, incoerente con la sua camminata.

## Controllo di sovrapposizione (cartella controllo/)

Ogni `controllo/<nome>.png` è il frame del marinaio al 50% sopra il
frame del Capitano di riferimento (fronte: frame torcia; profilo e
spalle: camminata allineata alla cintura; profilo sinistro: specchio
del controllo destro). Sopra la cintura il doppio contorno è atteso
(pose e vestiti diversi); il controllo riguarda gambe e stivali.
Esito, verificato anche numericamente (differenza di sagoma sotto la
cintura = 0 in tutti i frame):

- torcia-fronte × fermo, passo1–4: sovrapposizione gambe — SÌ (×5)
- torcia-profilo-destro × fermo, passo1–4: sovrapposizione gambe — SÌ (×5)
- torcia-profilo-sinistro × fermo, passo1–4: sovrapposizione gambe — SÌ (×5, specchio)
- torcia-spalle × fermo, passo1–4: sovrapposizione gambe — SÌ (×5)

## Contenuto

- `frame/` — 20 file `.png.b64`: le 4 viste × fermo e passo1–4.
  Canvas 336×376, sfondo verde uniforme.
- `controllo/` — 20 controlli di sovrapposizione `.png.b64`
  (decodificare con `base64 -d nome.png.b64 > nome.png`).
- `elenco.txt` — i 20 frame in ordine di gioco.

## Cosa NON cambia

- Gli altri frame del marinaio (camminata e colpi) e tutti i frame
  del Capitano: invariati.

STATO: pronto
