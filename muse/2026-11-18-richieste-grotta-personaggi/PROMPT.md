# Richieste per Muse — grotta, personaggi nominati, pezzi del mare, galeone dall'alto

Stesso stile e stesse regole delle consegne precedenti (colori vivi, niente ritocchi di Claude, PNG con alfa pulito, `.png.b64`, una sottocartella per consegna con LEGGIMI.md). Ordine di priorità: 1, 2, 3, 4.

## 1. Grotta (vista dall'alto, come la mappa-v2)
- Pareti e fondo di grotta: texture roccia scura a pannelli 512, 3 varianti di fondo, pareti con bordo irregolare, ambiente BUIO (la luce la dà la torcia).
- Stalattiti e stalagmiti (3 misure ciascuna), pozza d'acqua interna (con riflesso), cristalli (2 colori deboli), massi caduti.
- Parete con torcia accesa e alone caldo (alone separato, in trasparenza, che posso sovrapporre).

## 2. Personaggi nominati (stesso metodo del marinaio v4: fronte/spalle/profilo destro e sinistro, fermo + camminata 4 passi + attacco dove serve)
I quattro Fuggiaschi esistono già nel gioco come personaggi disegnati a codice: tengo i loro colori.
- **Ferro** (capo della baia, serio, ex ufficiale): carnagione olivastra, capelli neri-grigi, barba corta, cicatrice, tricorno blu notte, giacca blu notte con bordi grigio-argento, camicia chiara, stivali, sciabola al fianco. Più alto e largo di tutti. Braccia spesso incrociate da fermo.
- **Nives** (fabbra/meccanica): capelli lunghi castano scuro, bandana turchese, grembiule su camicia crema, giacca marrone, pantaloni scuri, martello in mano.
- **Tito** (ragazzo, ansioso): piccolo e magro, capelli rossi, lentiggini, berretto marrone, giacca verde, camicia chiara.
- **Gnocco** (cuoco, tondo): larghissimo, baffi, bandana bianca, grembiule e giacca bianco panna, mestolo in mano.
- **Giacomo «J.» Marrone** (capitano della Sirena, figura della storia che non si incontra mai da vivo, si vede solo in ricordi e sagoma): non ho una descrizione. Proponi 2 bozze di capitano elegante e stanco, cappotto rosso-marrone, con un segno riconoscibile (la J sul fazzoletto o sul cappello). Sceglie Davide.
- **Equipaggio del Cormorano** (5 persone, due vivi, un morto sepolto, due dispersi): proponi 5 figure diverse tra loro (altezza, cappello, colore giacca) in versione «sagoma + frame fermo fronte», ne bastano pochi frame. Sceglie Davide.
Tutti in scala col marinaio v4 e con la stessa tela del mondo B (336x376, piedi sulla stessa riga).

## 3. Pezzi del mare per rifare la mappa
Già nel prompt `muse/2026-11-18-richieste-fantasma-isole/PROMPT.md`: nave fantasma «Il Gabbiano» (master dir0 288 px con alone e solo scafo), isole A2 in versione solo-terra con maschera calpestabile e pixel rosso di approdo, boa con la J e boa accesa. In più, se servono varianti: faro, scogli e bandierine in versione senza alone d'acqua.

## 4. Galeone visto dall'alto (per la mappa a caselle)
I pezzi del mondo B sono disegnati di lato/3-4; la mappa del gioco è dall'alto. Servono, in versione dall'alto e con la tela di una casella (44 px, esporta a 256): cannone (prua verso l'alto, 4 direzioni), scala, botola chiusa e aperta, porta, cella con sbarre, lanterna a muro, tavolo con mappa, timone, forziere, baule e letto. Più pavimento in tavole a micro-piastrelle ripetibili (non pannelli da stanza) e pareti con bordo.

## 5. Attrezzi del marinaio (ascia e piccone) — da rifare con metodo diverso, in coda dopo 1-4
Le v3 e v4 non vanno: nel gioco il personaggio **cambia colore** durante l'animazione di taglio e **cambia dimensione/si sovrappone** all'attrezzo (ascia e piccone), soprattutto con il marinaio e con l'abito rosso. Vincoli per la nuova consegna:
- Il personaggio resta IDENTICO frame dopo frame: stessi colori (pelle, camicia, pantaloni, abito), stessa altezza e stessa larghezza, piedi sulla stessa riga della camminata del marinaio v4 e stessa tela 336x376.
- L'attrezzo è un livello **separato** (PNG a parte, solo ascia/piccone con la mano che lo regge) così non si sovrappone né ricolora il corpo; il corpo è la posa «braccio alzato/abbassato» senza attrezzo in mano.
- Per ogni attrezzo: 4 pose (carica, apice, colpo, ritorno) x fronte/spalle/profilo destro, con l'attrezzo con rotazione e punto di presa dichiarati in un file `punti.json` (x,y della mano e angolo del manico per frame).
- Fornire anche la versione con abito rosso (capitano) e con maglia da marinaio, stessa posa, stessi colori dei fermi/camminata.
