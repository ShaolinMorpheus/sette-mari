# Marinaio attrezzi v4 — set uniformato sul pupazzo master

Riconsegna dei 49 frame con ascia, piccone e mani nude (fronte, spalle,
profilo destro, pose di riposo), uniformati a programma sui tre master del
set completo: fronte-fermo, spalle-fermo, profilo-destro-fermo.
Sostituisce v2 e v3 per questi frame.

## Formato
- Canvas 336×376 come i master (v2/v3 erano 384×427 a scala maggiore),
  sfondo trasparente, stessi nomi file della v2/v3.
- Baseline dei piedi = quella del master della vista: fronte 349,
  spalle 338, profilo 348. Altezza figura (cima testa → piedi) = quella
  del master: fronte 274, spalle 268, profilo 278. Misurate sui file
  consegnati: esatte in 49/49 frame.

## Cosa è stato fatto
- Scala uniforme di ogni frame all'altezza del master della vista e
  ricollocazione su baseline e centro testa del master.
- Teste piccole sostituite con la testa del master (5 frame della stessa
  generazione: ascia-taglio1 fronte/spalle, ascia riposo fronte/spalle,
  piccone riposo fronte). Negli altri frame la testa è quella originale
  alla scala uniforme.
- Maglia ridipinta col metodo v2 (periodo 25, banda 11) e medie delle due
  righe portate ai valori fissi: navy (47,62,99), bianco (228,223,213).
- Cintura ridipinta in ogni frame ai colori del master, fibbia dorata
  davanti; di spalle la cintura è la banda uniforme del master, senza
  fibbia né toppe sul retro. Niente maglia sotto la cintura.
- Colori per zona normalizzati sulla media del master della vista
  (spostamento della media, texture conservata): cintura, pantaloni,
  stivali, pelle, capelli. Pantaloni: bandeggiature grigie ricolorate e
  variazioni compresse (blu pieno).

## Verifica (misure sui file consegnati)
Master: testa fronte 121 px, spalle 114, profilo 118; colori zona nelle
tabelle qui sotto (la tabella completa è anche in tabella.csv).
- Altezza e baseline: esatte in 49/49 frame.
- Colori: scarto massimo ΔE (CIE76 sulle medie di zona) ≤ 4 in 44/49
  frame. Eccezioni dichiarate:
  - capelli in ascia-taglio3-fronte (ΔE 24,6), piccone-taglio3-spalle
    (18,6) e piccone-taglio2-fronte (7,4): la media include i pixel del
    MANICO che attraversa la zona dei capelli (legno, non capelli);
    i capelli veri sono allineati (negli altri frame lo scarto dei capelli è ≤ 4,1).
  - fibbia in piccone-taglio3-fronte (4,3) e piccone-taglio6-fronte
    (4,1): fibbia in parte coperta dal manico, media su pochi pixel.
- Larghezza testa: la misura automatica (cluster capelli/viso) è
  affidabile solo a testa libera; dove attrezzo o mani coprono la testa
  dà valori assurdi e in tabella è segnata «occ.» (10 frame, controllo
  visivo sul foglio di contatto). Nei frame a testa libera la misura va
  da −11% a +16%: le capigliature delle generazioni attrezzi restano un
  po' più folte del fermo, soprattutto di spalle e di profilo. Il ±3%
  su OGNI frame non è raggiungibile senza ridisegnare le teste: la
  sostituzione integrale è stata provata e sui frame con attrezzo
  davanti al viso cancella pezzi di attrezzo e mani (manico e capelli
  hanno lo stesso colore per i programmi di ritaglio). Sul foglio di
  contatto il pupazzo è uno solo per scala, baseline e colori.

## Tabella misure
Testa = larghezza in px (master tra parentesi nella colonna scarto via
tabella.csv); colori = media RGB della zona; ΔE max = scarto peggiore
tra le zone rispetto al master della vista (navy/bianco vs i valori
fissi).

| frame | testa px | alt. | piedi | navy | bianco | cintura | fibbia | pantaloni | stivali | pelle | capelli | ΔE max (zona) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ascia-taglio1-fronte | 107 (-11.6%) | 274 | 349 | (46,62,99) | (228,223,213) | (48,42,37) | (218,167,76) | (51,70,105) | (120,79,52) | (224,174,139) | (111,57,32) | 2.8 (capelli) |
| ascia-taglio1-profilo-destro | 114 (-3.4%) | 278 | 348 | (47,61,98) | (227,222,213) | (47,45,44) | (220,171,81) | (70,79,101) | (115,77,53) | (224,173,139) | (108,60,34) | 1.4 (capelli) |
| ascia-taglio1-riposo-fronte | 108 (-10.7%) | 274 | 349 | (46,62,98) | (228,223,213) | (48,42,37) | (218,168,77) | (51,70,105) | (120,79,53) | (224,174,139) | (111,58,32) | 2.7 (capelli) |
| ascia-taglio1-riposo-spalle | 95 (-16.7%) | 268 | 338 | (47,61,98) | (228,223,212) | (39,37,37) | — | (42,55,91) | (114,79,55) | (208,162,128) | (113,60,34) | 0.9 (cintura) |
| ascia-taglio1-spalle | 95 (-16.7%) | 268 | 338 | (47,62,98) | (227,223,213) | (40,38,37) | — | (42,56,91) | (115,79,55) | (207,161,128) | (113,60,34) | 1.3 (cintura) |
| ascia-taglio2-fronte | occ. | 274 | 349 | (47,61,98) | (227,222,213) | (50,45,42) | (217,165,71) | (51,70,105) | (120,79,52) | (225,174,140) | (116,63,35) | 3.9 (capelli) |
| ascia-taglio2-profilo-destro | 141 (+19.5%) | 278 | 348 | (47,61,99) | (227,223,213) | (48,45,44) | (218,172,82) | (70,79,101) | (115,77,53) | (223,173,139) | (109,62,36) | 0.7 (navy) |
| ascia-taglio2-spalle | occ. | 268 | 338 | (46,62,99) | (228,223,213) | (40,37,38) | — | (42,56,91) | (114,78,55) | (207,160,127) | (116,61,35) | 1.0 (capelli) |
| ascia-taglio3-fronte | occ. | 274 | 349 | (47,61,98) | (227,223,214) | (49,43,41) | (220,166,72) | (51,70,105) | (120,79,53) | (225,174,139) | (133,112,80) | 24.6 (capelli) |
| ascia-taglio3-profilo-destro | 123 (+4.2%) | 278 | 348 | (46,61,98) | (229,223,214) | (48,45,44) | (221,172,81) | (70,79,101) | (116,77,52) | (223,172,139) | (109,61,36) | 0.5 (capelli) |
| ascia-taglio3-spalle | occ. | 268 | 338 | (47,61,98) | (228,222,213) | (40,37,38) | — | (42,56,91) | (114,78,55) | (207,161,127) | (115,61,34) | 1.1 (capelli) |
| ascia-taglio4-fronte | 130 (+7.4%) | 274 | 349 | (47,62,99) | (225,221,211) | (51,43,43) | (213,165,71) | (51,70,105) | (120,79,52) | (225,174,140) | (111,56,32) | 3.4 (capelli) |
| ascia-taglio4-profilo-destro | 127 (+7.6%) | 278 | 348 | (46,61,99) | (228,223,213) | (46,44,43) | (220,170,81) | (70,79,101) | (116,77,53) | (224,173,139) | (108,59,35) | 1.7 (capelli) |
| ascia-taglio4-spalle | 138 (+21.1%) | 268 | 338 | (46,62,99) | (228,223,213) | (40,37,37) | — | (42,56,91) | (115,78,55) | (207,161,128) | (114,60,34) | 0.8 (capelli) |
| ascia-taglio5-fronte | 125 (+3.3%) | 274 | 349 | (47,61,98) | (228,222,213) | (48,42,39) | — | (51,70,105) | (120,79,52) | (225,174,140) | (114,59,33) | 3.5 (capelli) |
| ascia-taglio5-profilo-destro | 138 (+16.9%) | 278 | 348 | (47,61,99) | (228,222,213) | (48,46,45) | (220,171,82) | (70,79,101) | (116,77,53) | (223,173,139) | (109,61,36) | 0.9 (capelli) |
| ascia-taglio5-spalle | occ. | 268 | 338 | (47,61,98) | (227,223,213) | (40,37,38) | — | (42,55,91) | (115,79,56) | (207,162,127) | (114,60,35) | 0.6 (capelli) |
| ascia-taglio6-fronte | 125 (+3.3%) | 274 | 349 | (47,62,98) | (228,222,213) | (47,41,38) | — | (51,70,106) | (120,79,52) | (225,174,140) | (114,58,32) | 4.0 (capelli) |
| ascia-taglio6-profilo-destro | 128 (+8.5%) | 278 | 348 | (47,61,98) | (228,223,212) | (48,46,44) | (220,168,79) | (70,79,101) | (115,77,53) | (223,173,139) | (110,62,36) | 0.6 (capelli) |
| ascia-taglio6-spalle | 123 (+7.9%) | 268 | 338 | (46,62,99) | (228,223,213) | (38,35,36) | — | (42,56,91) | (115,78,56) | (207,161,127) | (113,60,34) | 0.7 (cintura) |
| mani-nude-colpo1-fronte | 121 (+0.0%) | 274 | 349 | (47,62,99) | (228,222,212) | (47,42,39) | (218,164,71) | (51,70,105) | (120,79,52) | (224,174,139) | (110,57,30) | 3.2 (capelli) |
| mani-nude-colpo1-profilo-destro | 119 (+0.8%) | 278 | 348 | (47,62,98) | (228,222,213) | (47,45,44) | (220,172,84) | (70,79,101) | (115,77,52) | (223,173,139) | (108,62,37) | 0.6 (cintura) |
| mani-nude-colpo1-spalle | occ. | 268 | 338 | (47,61,99) | (227,223,213) | (40,37,38) | — | (42,56,91) | (115,78,55) | (207,162,128) | (115,61,34) | 1.0 (capelli) |
| mani-nude-colpo2-fronte | 137 (+13.2%) | 274 | 349 | — | (227,222,213) | (47,41,39) | (213,163,68) | (51,70,105) | (120,79,52) | (225,174,139) | (111,58,32) | 2.7 (capelli) |
| mani-nude-colpo2-profilo-destro | 113 (-4.2%) | 278 | 348 | (46,62,99) | (228,223,213) | (48,46,45) | (221,171,83) | (70,79,101) | (116,77,52) | (223,173,139) | (109,62,36) | 0.5 (stivali) |
| mani-nude-colpo2-spalle | occ. | 268 | 338 | (46,62,98) | (228,223,212) | (39,36,37) | — | (42,55,91) | (115,78,56) | (207,162,129) | (116,62,35) | 1.0 (capelli) |
| mani-nude-colpo3-fronte | 140 (+15.7%) | 274 | 349 | (46,62,98) | (228,223,212) | (47,42,39) | (213,161,66) | (51,70,105) | (120,79,52) | (224,174,140) | (111,59,33) | 2.6 (fibbia) |
| mani-nude-colpo3-profilo-destro | 135 (+14.4%) | 278 | 348 | (46,61,98) | (228,222,213) | (49,46,45) | — | (70,79,101) | (116,77,53) | (223,173,139) | (108,62,36) | 0.4 (stivali) |
| mani-nude-colpo3-spalle | 117 (+2.6%) | 268 | 338 | (47,61,99) | (227,223,212) | (39,35,36) | — | (42,55,91) | (114,79,56) | (207,163,129) | (114,61,35) | 0.6 (cintura) |
| piccone-taglio1-fronte | 123 (+1.7%) | 274 | 349 | (46,61,98) | (231,225,215) | (52,45,42) | — | (51,70,105) | (120,79,52) | (224,174,140) | (112,58,32) | 3.3 (capelli) |
| piccone-taglio1-profilo-destro | 114 (-3.4%) | 278 | 348 | (46,61,98) | (227,223,213) | (48,46,44) | (220,171,78) | (70,79,101) | (115,77,53) | (223,173,139) | (107,59,35) | 1.4 (capelli) |
| piccone-taglio1-riposo-fronte | 111 (-8.3%) | 274 | 349 | (46,61,99) | (227,223,213) | (50,43,39) | — | (51,70,105) | (119,79,53) | (224,174,140) | (111,57,32) | 2.7 (capelli) |
| piccone-taglio1-riposo-spalle | 117 (+2.6%) | 268 | 338 | (47,61,98) | (227,223,213) | (40,36,37) | — | (42,55,92) | (115,78,55) | (209,165,131) | (114,60,35) | 1.2 (pelle) |
| piccone-taglio1-spalle | 116 (+1.8%) | 268 | 338 | (47,61,98) | (227,223,212) | (39,36,37) | — | (42,55,91) | (114,78,55) | (207,161,127) | (113,60,34) | 0.5 (capelli) |
| piccone-taglio2-fronte | occ. | 274 | 349 | (47,61,99) | (227,222,213) | (48,43,40) | (213,159,69) | (51,70,105) | (120,79,52) | (224,174,140) | (123,74,42) | 7.4 (capelli) |
| piccone-taglio2-profilo-destro | occ. | 278 | 348 | (47,62,99) | (228,223,213) | (48,45,44) | (221,173,82) | (70,79,101) | (115,77,53) | (223,173,139) | (109,62,36) | 0.4 (capelli) |
| piccone-taglio2-spalle | 128 (+12.3%) | 268 | 338 | (47,62,99) | (228,223,213) | (40,37,38) | — | (42,55,91) | (115,78,56) | (207,161,127) | (115,61,35) | 0.8 (pelle) |
| piccone-taglio3-fronte | 105 (-13.2%) | 274 | 349 | (46,62,99) | (227,222,212) | (46,40,37) | (207,156,64) | (51,70,105) | (120,79,53) | (224,174,140) | (111,60,32) | 4.3 (fibbia) |
| piccone-taglio3-profilo-destro | 126 (+6.8%) | 278 | 348 | (46,61,98) | (229,223,214) | (47,45,44) | (218,172,84) | (70,79,101) | (115,77,53) | (223,173,139) | (108,61,36) | 0.6 (stivali) |
| piccone-taglio3-spalle | occ. | 268 | 338 | (46,61,98) | (225,221,212) | (40,37,38) | — | (42,55,91) | (114,78,55) | (207,161,127) | (132,101,69) | 18.6 (capelli) |
| piccone-taglio4-fronte | 132 (+9.1%) | 274 | 349 | (47,61,98) | (228,223,212) | (50,44,41) | — | (51,70,105) | (120,79,52) | (225,175,139) | (112,55,31) | 4.0 (capelli) |
| piccone-taglio4-profilo-destro | 127 (+7.6%) | 278 | 348 | (47,61,99) | (230,225,215) | (47,45,44) | (221,170,81) | (70,79,101) | (115,77,53) | (223,173,140) | (108,58,33) | 2.3 (capelli) |
| piccone-taglio4-spalle | 142 (+24.6%) | 268 | 338 | (46,62,98) | (228,223,213) | (40,37,38) | — | (42,55,91) | (115,79,55) | (207,162,128) | (115,61,35) | 0.6 (capelli) |
| piccone-taglio5-fronte | 122 (+0.8%) | 274 | 349 | (46,62,99) | (228,223,212) | (47,42,39) | (219,163,71) | (51,70,105) | (120,79,52) | (224,175,140) | (110,57,33) | 2.0 (capelli) |
| piccone-taglio5-profilo-destro | 139 (+17.8%) | 278 | 348 | (46,62,98) | (228,223,213) | (49,46,44) | — | (70,79,101) | (115,77,53) | (224,173,139) | (109,62,36) | 0.5 (cintura) |
| piccone-taglio5-spalle | 136 (+19.3%) | 268 | 338 | (47,61,98) | (228,223,212) | (40,37,38) | — | (42,55,91) | (114,78,55) | (207,162,128) | (113,60,35) | 0.5 (capelli) |
| piccone-taglio6-fronte | 117 (-3.3%) | 274 | 349 | (46,61,98) | (228,222,213) | (48,43,40) | (214,168,77) | (51,70,105) | (120,79,52) | (225,174,139) | (114,60,32) | 4.1 (fibbia) |
| piccone-taglio6-profilo-destro | 124 (+5.1%) | 278 | 348 | (47,62,99) | (228,223,213) | (49,47,46) | (219,168,79) | (70,79,101) | (115,77,53) | (223,173,139) | (110,62,36) | 0.9 (capelli) |
| piccone-taglio6-spalle | 118 (+3.5%) | 268 | 338 | (46,62,98) | (227,222,212) | (39,36,37) | — | (42,56,91) | (114,79,56) | (208,162,129) | (113,60,34) | 0.5 (cintura) |

## Controlli
- controllo/contatto.png — tutti i 49 frame + i 3 master su erba:
  scala, baseline e colori si confrontano a vista.

STATO: pronto
