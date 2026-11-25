# Correzioni alla scenografia del campo — 25 nov 2026

Correzione dei disegni tagliati sul bordo superiore (e ai lati) della tela: ogni oggetto ora ha almeno 12 px di margine trasparente su tutti i lati, verificato numericamente (alpha del bordo = 0) e a occhio ingrandito. Il disegno originale non è stato ridimensionato né ritoccato: solo tela più grande attorno, con l'ancora aggiornata di conseguenza. Dove la cima era davvero tagliata nel disegno, è stata completata (vedi note per oggetto). Tutti i livelli di uno stesso oggetto condividono la stessa tela, stessa dimensione, stessi offset. Le collisioni sono espresse rispetto all'ancora e restano numericamente invariate.

File: stessi nomi della consegna del 24 nov 2026, in `consegna/`. Sostituiscono i file consegnati. Il falò e il ceppo-sedile NON sono inclusi in questa consegna (corretti ma tenuti in locale, su decisione dell'utente — vedi in fondo).

## calderone2
- Tela: 64×68 → **88×92**
- Punto d'appoggio: (32,60) → **(44,72)**
- Collisione (rispetto all'appoggio, invariata): -20,20,-8,4
- Livelli (4): calderone2-cenere.png, calderone2-braci-calde.png, calderone2-tripode.png, calderone2-liquido.png
- ALLARGATA + COMPLETATA: tripode — cime dei due pali allungate di ~12 px lungo le loro pendenze (erano tagliate, con nodo a y≈5–9); braci/cenere/liquido solo allargati.

## tavolino-j
- Tela: 56×48 → **75×77**
- Punto d'appoggio: (28,44) → **(35,61)**
- Collisione (rispetto all'appoggio, invariata): -9,9,-5,3
- Livelli (5): tavolino-j-tavolino.png, tavolino-j-calamaio.png, tavolino-j-mappa.png, tavolino-j-bussola.png, tavolino-j-diario.png
- ALLARGATA + COMPLETATA: tavolino — piano completato (ellisse piatta, era tagliato in alto); calamaio — bordo superiore +5 px; mappa, bussola, diario solo allargati.

## lanterna
- Tela: 20×44 → **44×82**
- Punto d'appoggio: (10,9) → **(22,35)**
- Collisione (rispetto all'appoggio, invariata): nessuna (oggetto appeso)
- Livelli (3): lanterna-anello-catena.png, lanterna-struttura.png, lanterna-vetri.png
- ALLARGATA + COMPLETATA: anello-catena — catena allungata di ~14 px ripetendo il motivo degli anelli (era tagliata in alto); struttura e vetri solo allargati.

## rastrelliera
- Tela: 96×84 → **120×120**
- Punto d'appoggio: (48,82) → **(60,106)**
- Collisione (rispetto all'appoggio, invariata): -44,44,-5,2
- Livelli (8): rastrelliera-telaio.png, rastrelliera-sciabola-1.png, rastrelliera-sciabola-2.png, rastrelliera-sciabola-3.png, rastrelliera-moschetto-1.png, rastrelliera-moschetto-2.png, rastrelliera-ascia.png, rastrelliera-pistola.png
- ALLARGATA + COMPLETATA: telaio — pali allungati di ~12 px (erano tagliati in cima); armi solo allargate (pistola era a 0 px a destra, ora con margine).

## amaca
- Tela: 156×84 → **174×122**
- Punto d'appoggio: (78,80) → **(86,106)**
- Collisione (rispetto all'appoggio, invariata): -74,74,-4,3
- Livelli (4): amaca-palo-sinistro.png, amaca-palo-destro.png, amaca-telo.png, amaca-cuscino.png
- ALLARGATA + COMPLETATA: pali — cime allungate di ~14 px con testa arrotondata e corde curve fino alle nuove cime; telo e cuscino solo allargati.

## rete
- Tela: 124×94 → **148×107**
- Punto d'appoggio: (62,90) → **(74,91)**
- Collisione (rispetto all'appoggio, invariata): -56,56,-5,2
- Livelli (10): rete-telaio.png, rete-rete.png, rete-galleggiante-1.png, rete-galleggiante-2.png, rete-peso-1.png, rete-peso-2.png, rete-peso-3.png, rete-pesce-secco-1.png, rete-pesce-secco-2.png, rete-pesce-secco-3.png
- SOLO ALLARGATA: nessun completamento (i bordi della rete e i piedi del telaio sono disegnati, non tagliati).

## pila-barili
- Tela: 100×88 → **122×124**
- Punto d'appoggio: (50,84) → **(61,108)**
- Collisione (rispetto all'appoggio, invariata): -44,44,-7,2
- Livelli (3): pila-barili-barili.png, pila-barili-sacchi.png, pila-barili-telo.png
- ALLARGATA + COMPLETATA: telo — cima rifatta a picco di tenda (triangolare, 12 px al centro); barili — arco superiore del barile in alto completato di ~5 px; sacchi solo allargati.

## stendino
- Tela: 118×76 → **137×116**
- Punto d'appoggio: (59,72) → **(67,100)**
- Collisione (rispetto all'appoggio, invariata): -52,52,-4,2
- Livelli (5): stendino-pali.png, stendino-panno-vela.png, stendino-panno-camicia.png, stendino-panno-calzoni.png, stendino-panno-straccio.png
- RIDISegnata: pali nuovi alti quanto i panni (erano monconi di ~30 px contro panni di ~55–65 px), disegnati a programma con la stessa corteccia dei pali originali, cima arrotondata; corda tesa tra i pali con leggera pendenza; mollette di legno disegnate su ogni panno (2 per panno) che agganciano la corda; panni invariati e in scala. (Tentativo di generazione scartato: i pali generati erano troppo esili — 24:1 contro 8,4:1 — e la corda pendeva troppo; la versione a programma usa la corteccia originale esatta.)

## barca-remi
- Tela: 116×52 → **139×88**
- Punto d'appoggio: (58,46) → **(70,70)**
- Collisione (rispetto all'appoggio, invariata): -52,52,-8,4
- Livelli (5): barca-remi-scafo.png, barca-remi-remo-1.png, barca-remi-remo-2.png, barca-remi-cima.png, barca-remi-sacco-rete.png
- ALLARGATA + COMPLETATA: remo-1 — impugnatura allungata di ~12 px (era tagliata); scafo — punta di prua completata di ~7 px; remo-2, cima, sacco-rete solo allargati.

## cannone
- Tela: 84×52 → **113×84**
- Punto d'appoggio: (42,46) → **(54,67)**
- Collisione (rispetto all'appoggio, invariata): -30,30,-6,3
- Livelli (4): cannone-affusto.png, cannone-canna.png, cannone-palle.png, cannone-calcatoio.png
- ALLARGATA + COMPLETATA: canna — bordo superiore completato lungo tutta la lunghezza (cuneo 9→3 px) e volata allungata di 7 px con anello; affusto — arco superiore della ruota anteriore completato (calotta ~5 px) e raggio superiore allungato; palle solo allargate; calcatoio — rimosso un granello scuro staccato (5 px) presente nel file consegnato.

## corda-rotolo
- Tela: 48×34 → **69×61**
- Punto d'appoggio: (24,30) → **(35,46)**
- Collisione (rispetto all'appoggio, invariata): -18,18,-4,2
- Livelli (1): corda-rotolo.png
- ALLARGATA + COMPLETATA: arco superiore della matassa completato di ~4 px (era tagliato piatto).

## fusto-acqua
- Tela: 96×104 → **119×120**
- Punto d'appoggio: (48,100) → **(60,104)**
- Collisione (rispetto all'appoggio, invariata): -26,26,-6,3
- Livelli (5): fusto-acqua-fusto.png, fusto-acqua-acqua.png, fusto-acqua-mestolo.png, fusto-acqua-tettoia.png, fusto-acqua-gocce.png
- ALLARGATA + COMPLETATA: tettoia — punte delle foglie completate (≤6 px); fusto — bordo sinistro completato di ~3 px; acqua e gocce solo allargate; mestolo — resta completamente trasparente (segnaposto disegnato dal codice, come nel consegnato), ricodificato sulla tela nuova.

## ceppo-ascia
- Tela: 96×60 → **120×92**
- Punto d'appoggio: (48,54) → **(60,74)**
- Collisione (rispetto all'appoggio, invariata): -20,20,-6,3
- Livelli (4): ceppo-ascia-catasta.png, ceppo-ascia-ceppo.png, ceppo-ascia-ascia.png, ceppo-ascia-schegge.png
- ALLARGATA + COMPLETATA: ceppo — bordo destro del moncone completato di ~4 px; ascia — lama allungata di ~8 px in alto; catasta e schegge solo allargate (il bordo piatto in alto della catasta È la sua sommità, cilindro orizzontale, non un taglio).

## tavolo-cucina
- Tela: 124×74 → **137×117**
- Punto d'appoggio: (62,70) → **(63,101)**
- Collisione (rispetto all'appoggio, invariata): -48,48,-5,2
- Livelli (7): tavolo-cucina-tavolo.png, tavolo-cucina-tagliere.png, tavolo-cucina-coltello.png, tavolo-cucina-mortaio.png, tavolo-cucina-pesce-appeso-1.png, tavolo-cucina-pesce-appeso-2.png, tavolo-cucina-cesta.png
- ALLARGATA + COMPLETATA: tagliere — disco completato (era visibile solo il fondo ~11 px; cerchio ricavato dalla larghezza, raggio 12,5 px, mancavano 14 px in alto); coltello — lama e manico disegnati a programma lungo l'asse misurato (era visibile solo la punta); mortaio — bordo superiore ~1 px; tavolo, pesci appesi, cesta solo allargati.

## mappa-cavalletto
- Tela: 100×114 → **124×130**
- Punto d'appoggio: (50,110) → **(62,114)**
- Collisione (rispetto all'appoggio, invariata): -30,30,-4,2
- Livelli (8): mappa-cavalletto-cavalletto.png, mappa-cavalletto-mappa.png, mappa-cavalletto-filo.png, mappa-cavalletto-pergamena.png, mappa-cavalletto-puntina-1.png, mappa-cavalletto-puntina-2.png, mappa-cavalletto-puntina-3.png, mappa-cavalletto-puntina-4.png
- SOLO ALLARGATA: nessun completamento (la barra era intera, verificato; i margini erano solo stretti).

## barca-costruzione
- Tela: 184×100 → **207×134**
- Punto d'appoggio: (92,92) → **(103,116)**
- Collisione (rispetto all'appoggio, invariata): -84,84,-10,4
- Livelli (5): barca-costruzione-base.png, barca-costruzione-stato-0.png, barca-costruzione-stato-1.png, barca-costruzione-stato-2.png, barca-costruzione-stato-3.png
- ALLARGATA + COMPLETATA: stati 1–3 — punte delle costole allungate di ~12 px (erano tagliate); base e stato-0 solo allargati.

## trespolo
- Tela: 76×90 → **100×92**
- Punto d'appoggio: (38,86) → **(50,76)**
- Collisione (rispetto all'appoggio, invariata): -8,8,-4,2
- Livelli (5): trespolo-palo.png, trespolo-ciotole.png, trespolo-gabbia.png, trespolo-porticina-aperta.png, trespolo-porticina-chiusa.png
- SOLO ALLARGATA: nessun completamento (la cima del palo era intera, verificato; i margini erano solo stretti).

## cassa
- Tela: 68×54 → **90×98**
- Punto d'appoggio: (34,50) → **(46,82)**
- Collisione (rispetto all'appoggio, invariata): -28,28,-6,3
- Livelli (6): cassa-corpo.png, cassa-monete.png, cassa-collana.png, cassa-chiave.png, cassa-coperchio-aperto.png, cassa-coperchio-chiuso.png
- ALLARGATA + COMPLETATA: coperchio-aperto — RIGENERATO intero (generazione nello stile del corpo: coperchio sollevato completo, lato interno visibile, fascioni di ferro, due cerniere sul bordo inferiore allineate al bordo posteriore del corpo); coperchio-chiuso — cupola completata (modello mezzo-cilindro, calotta ~2 px); corpo, monete, collana, chiave solo allargati.

## Falò — non incluso
Il falò (`falo-*`) e il ceppo-sedile (`falo-ceppo-sedile`), consegnati il 24 nov 2026 ma NON montati in gioco, non fanno parte di questa consegna: le loro correzioni sono pronte ma restano in locale, su decisione dell'utente.

## Verifica finale
- Margine minimo ≥ 12 px su tutti i lati di ogni file (numerico, su alpha > 0).
- Alpha del bordo = 0 su ogni file.
- Stessa tela per tutti i livelli di ogni oggetto.
- Stendino e coperchio aperto della cassa verificati ingranditi su fondo chiaro e scuro.

STATO: pronto