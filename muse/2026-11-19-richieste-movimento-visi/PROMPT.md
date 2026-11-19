# Richiesta per Muse — visi distinti, camminata vera, attrezzi a parte

Contesto: Davide ha visto Ferro, Nives, Tito, Gnocco e Giacomo in gioco (telefono, schermo orizzontale). Tre problemi:
1. **Gnocco ha lo stesso viso del marinaio** (il personaggio del giocatore). Anche gli altri vanno controllati.
2. **Le gambe non si muovono in modo leggibile**: nei frame di camminata le gambe sembrano quasi ferme, a gioco in movimento non si capisce che il personaggio cammina.
3. **Piccone e accetta**: con la sostituzione del corpo intero cambiano testa, statura e colori. Cambiamo metodo (vedi punto C).

Stesse regole di sempre: tela 336x376, piedi sulla stessa riga del marinaio v4, fattore di scala per personaggio invariato (Ferro 1,06, Nives 1,0, Tito 0,88, Gnocco 1,0, Giacomo 1,0), alfa pulito senza alone, `.png.b64`, una sottocartella per consegna con LEGGIMI.md e foglio di contatto in `controllo/`.

## A. Visi e teste distinti (priorita' 1)
Il marinaio del giocatore ha un viso tondo, naso piccolo, occhi grandi ravvicinati. Nessun altro personaggio deve ricordarlo.
- **Gnocco**: faccia larga e piena, doppio mento, guance rosse, baffi grossi e arricciati, sopracciglia folte, naso grosso e rotondo, occhi piccoli e allegri. Niente di simile al marinaio.
- **Ferro**: viso lungo e squadrato, mascella forte, barba corta grigia, cicatrice, sopracciglia dure.
- **Nives**: viso ovale e fine, sopracciglia sottili, naso piccolo, capelli lunghi castani, qualche macchia di fuliggine.
- **Tito**: viso piccolo e magro, lentiggini, occhi grandi e ansiosi, orecchie leggermente in fuori.
- **Giacomo (bozza B)**: resta com'e'.
La stessa testa, con stessa forma e stessi tratti, deve restare identica in TUTTE le viste e le pose del personaggio (fronte, spalle, profilo destro e sinistro, camminata, combattimento).

## B. Camminata vera in tutte le direzioni (priorita' 1)
Per ognuno dei cinque personaggi rifai il ciclo di camminata: **6 frame** (passo1-6) per ciascuna direzione: fronte, spalle, profilo-destro, profilo-sinistro. Piu' il fermo come ora.
- Il ciclo deve essere continuo e a ripetizione (passo6 torna dolcemente su passo1).
- **Le gambe devono vedersi muovere bene**: nei due frame di massima apertura una gamba e' chiaramente avanti e l'altra indietro (falcata marcata, circa 35-45 gradi tra le due), nei frame di passaggio le gambe si incrociano sotto il corpo con il ginocchio della gamba che avanza piegato e il piede posteriore che si stacca da terra. Il frame di massima apertura e quello di passaggio non devono essere simili tra loro.
- **Di profilo**: gamba avanti con tallone a terra, gamba dietro con punta a terra e tallone alzato; le braccia oscillano al contrario delle gambe; il corpo si abbassa leggermente nel passaggio e sale nell'apertura (circa 6-8 px su 376).
- **Di fronte e di spalle**: le gambe NON si allargano come di profilo. Si vedono invece: un piede piu' avanti dell'altro (prospettiva: piede avanti piu' grande e piu' basso, piede dietro piu' piccolo e piu' alto), il corpo che si sposta un poco da un lato all'altro, le spalle che ruotano di poco, le braccia che oscillano in avanti e indietro (si vedono accorciate).
- **Proporzioni coerenti tra le viste**: stessa altezza totale, stessa lunghezza di gambe, stessa larghezza di spalle del frame fermo di quella vista; la testa non cambia grandezza da un frame all'altro; i piedi non scivolano di riga (stessa riga di terra per i piedi appoggiati). Nessuna vista deve far sembrare il personaggio piu' alto, piu' basso o piu' largo di un'altra.
- Stessi vestiti, stessi colori e stessi accessori in tutti i frame (sciabola di Ferro, martello di Nives, mestolo di Gnocco, ecc.): se un accessorio e' in mano, oscilla con il braccio ma non cambia forma.
- Fai prima un **foglio di contatto** con i 24 frame di camminata affiancati (4 direzioni x 6) con la riga di terra tracciata, e controlla da solo che i piedi stiano sulla riga e che l'altezza non cambi.

## C. Attrezzi a parte, senza cambiare il corpo (priorita' 2)
Per piccone e accetta del marinaio (e, se serve, di Ferro e Nives per lavori al campo) non voglio piu' corpi interi con l'attrezzo. Il corpo resta quello della camminata.
- **Attrezzo da solo**: PNG separato, solo l'attrezzo con manico dritto verticale, trasparente, con alfa pulito (ascia, piccone; anche martello di Nives e mestolo di Gnocco se riesci). Punto di presa segnato in `punti.json` (x,y del punto dove la mano afferra il manico, lunghezza del manico, versione con la testa verso destra).
- **Mano che stringe**: una posa del corpo di fermo con il braccio piegato in avanti e il pugno chiuso (come se reggesse un manico), per ogni direzione (fronte, spalle, profilo destro, profilo sinistro). Il resto del corpo identico al frame fermo di quella vista. L'attrezzo lo posiziono e lo faccio roteare io da codice.
- **Posa di carica**: il corpo di fermo con le braccia alzate sopra la testa (per l'accetta) e una con le braccia basse in avanti (colpo dato), solo per il marinaio, sempre senza attrezzo.

## Priorita' e consegna
Prima A (solo le teste confrontate in un foglio con tutti e cinque, cosi' Davide vede la differenza), poi B personaggio per personaggio (Gnocco, Ferro, Nives, Tito, Giacomo), poi C.
Dichiara nel LEGGIMI.md i limiti (frame non perfetti, pose mancanti) come sempre.
