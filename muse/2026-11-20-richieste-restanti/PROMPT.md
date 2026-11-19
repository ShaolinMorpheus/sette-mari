# Richiesta per Muse — correzioni, Briciola extra, barchetta e personaggio del mercante, resto da sostituire

Stesse regole di sempre: tela 336x376 per i personaggi (piedi sulla stessa riga del marinaio v4, fattori di scala per personaggio invariati), alfa pulito senza alone, `.png.b64`, una sottocartella nuova per consegna con LEGGIMI.md e foglio di contatto in `controllo/`. Scrivi solo dentro `muse/`.

## A. Correzioni alle camminate gia' consegnate (priorita' 1)
Controllando i frame in gioco ho trovato questi difetti. Rifai SOLO i frame elencati (stessa tela, stesso personaggio, stesso ciclo):
1. **Tito, fronte e spalle (tutti e 6 i passi di entrambe le direzioni)**: i frame sono tagliati in verticale (meta' testa mancante) e con pezzi del frame vicino sul bordo destro (un orecchio/testa di un'altra figura). Servono 6 frame puliti, figura intera e centrata, per `fronte-passo1..6` e `spalle-passo1..6`. Solo i passo6 sono integri: usali come riferimento di faccia e vestiti.
2. **Gnocco, profilo-destro-passo2**: ha pezzi del frame vicino sul lato destro (lembi di fazzoletto e una mano). Rifai pulito. Controlla anche il nodo del fazzoletto nel **profilo-sinistro-passo2**: e' tagliato netto sul bordo destro.
3. **Nives, profilo-sinistro (passo1-6)**: i frame sono disegnati **rivolti a destra** (come il profilo-destro). Il profilo-sinistro deve guardare e camminare **verso sinistra**. Per ora li specchio io, ma se rifai una versione con la stessa qualita' e il lato corretto (borsa/attrezzi dal lato giusto) la preferisco.
Prima di consegnare, controlla tu stesso ogni frame sul bordo della tela: nessun pezzo di altre figure, nessun taglio.

## B. Briciola (il cane): frame extra per renderlo piu' vivo
Ho montato i 27 frame del set v2 (camminata, trotto, annusa, mangia, contenta, salto, dorme, seduta, transizioni). Servono pose in piu', stesso cagnolino, stesso master, stessa scala, canvas 320x200, ancora (160,190), tutte rivolte a destra:
- **scodinza** (in piedi, coda che si muove): 3 frame
- **seduta-scodinza**: 3 frame
- **abbaia** (bocca aperta, testa che si alza e torna giu'): 3 frame
- **si-gratta** (zampa posteriore dietro l'orecchio, da seduto): 4 frame
- **si-scuote** (scrollata del pelo, corpo e orecchie che oscillano): 3 frame
- **si-stiracchia** (inchino con il sedere in alto, poi si rialza): 3 frame
- **si-gira** (si volta di 180 gradi da destra a sinistra: passaggio di 3/4): 2 frame
- **orecchie-dritte** (attento, guarda verso destra e verso l'alto): 2 frame
- **fronte-cammina** e **spalle-cammina**: 4 frame ciascuno (quando va verso di me o si allontana)
- **dorme3-4** con respiro e coda che si muove piano: 2 frame
Nomi: `briciola-<posa><n>.png.b64`.

## C. Il mercante di passaggio: personaggio nuovo (priorita' 1)
Oggi il mercante e' un pirata generico con lo stile del giocatore. Va **ridisegnato da zero** come personaggio a se': un mercante ambulante di mare, tondo e furbo, sui 50 anni, cappello a larghe tese con piuma o foulard, giacca lunga ricca di tasche e borsellini, sciarpa colorata, anelli, grande borsa a tracolla piena di merci, un paio di piccole chincaglierie che penzolano dalla cintura (campanelli, chiavi, una bussola). Colori caldi e diversi da tutti gli altri (viola/prugna e oro, non marrone ne' verde). Viso unico, riconoscibile, non simile a marinaio, Gnocco, Ferro, Nives, Tito, Giacomo.
Consegna come per gli altri personaggi del campo:
- `mercante/fronte-fermo` e il fermo con piccolo respiro o gesto (mano che pesa una moneta, 2 frame in piu': `fronte-offre1`, `fronte-offre2` mentre mostra la merce)
- camminata **6 frame** per ciascuna direzione: fronte, spalle, profilo-destro, profilo-sinistro (falcata leggibile, gambe che si muovono bene, borsa che dondola)
- **6 ritratti** per i dialoghi (busto, 3/4 verso destra): neutro, felice, preoccupato, serio, sorpreso, triste. Nome `ritratto-mercante-<espressione>.png.b64`.
Stessa testa in tutte le viste e pose.

## D. La barchetta del mercante (priorita' 1)
Oggi e' la solita barca a remi del gioco con le casse accanto. Va **ridisegnata** come una vera barchetta da commercio che attracca in spiaggia, vista **dall'alto-di lato come le altre navi** del gioco (stessa prospettiva e stessa pennellata di 2026-11-18-mondo-a3-navi) e di dimensioni piccole (circa 1/3 del galeone): un battello panciuto, legno chiaro e pitturato (strisce viola/oro come il mercante), con:
- **bauli, casse e barilotti ammucchiati sopra**, legati con corde; sacchi, un rotolo di stoffa, un ombrello, gabbietta con un uccello, lanterna
- un piccolo albero con una **vela a toppe** ammainata o a mezz'asta e una **bandierina** con un simbolo di moneta
- un **banco/tavolino aperto** con la merce esposta (versione **attraccata**, per quando e' in spiaggia)
- un paio di remi
Consegna 4 versioni: **in navigazione verso destra**, **in navigazione verso sinistra**, **di fronte** e **di spalle** (arrivo/partenza), piu' la versione **attraccata a riva con la merce esposta** (destra e sinistra). Aggiungi anche: scia/spuma dell'onda a prua (strato a parte), ombra sull'acqua (strato a parte), **casse e sacchi sulla sabbia** accanto (set di 4-5 pezzi separati), un **cartello di legno** con una moneta che la barca pianta in spiaggia.

## E. Il resto ancora da sostituire con la grafica nuova
Se non l'hai gia' consegnato, nello stesso stile della mappa nuova (pastello, contorno morbido):
- **Interni delle capanne** (pavimento, pareti, letto, tavolo, scaffali) e il **fuoco del campo** con 4-6 frame di fiamma, brace e scintille
- **Isole nuove** (mondo A2): i pezzi mancanti di sponde, scogli, palme e spiagge, con le versioni di angolo
- **Relitti visti di lato** (tre scafi diversi, uno mezzo affondato, uno incagliato)
- **Passi nel terreno** (impronte sabbia/erba), **frana** (massi che cadono, polvere), **fuoco della baia** (falo' sulla spiaggia, 4-6 frame)
- (Il galeone dall'alto lo monto io: nessuna richiesta nuova.)

Priorita': A, C, D, B, poi E. Se un punto ti sembra gia' fatto in una consegna precedente, dimmi quale cartella.
