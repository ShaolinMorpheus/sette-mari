# Due richieste per Muse (17 nov)

## Richiesta 1 — Briciola: pose e camminata fatte bene

Briciola ora gira da sola nel campo (esce dalla cuccia/cesto, cammina, annusa, torna a dormire) ma ho solo 3 pose (in piedi, seduta, sdraiata): quando cammina è la stessa immagine con dei saltelli. Servono pose vere, **stesso cagnolino e stessa tecnica** della consegna passo3-cap2 (stessi colori del pelo, macchie marroni, stessa grandezza: usa in piedi come master, scala identica in tutti i frame, stessa linea dei piedi).

Consegna in una cartella nuova `muse/<data>-briciola-v2/`, frame trasparenti, tutti rivolti a **destra** (il gioco li specchia per andare a sinistra), tutti sullo stesso canvas con i piedi sulla stessa riga:
1. **Camminata**: 4 frame di ciclo (zampe alternate, coda che ondeggia, testa leggermente dondolante), ripetibile senza scatti.
2. **Trotto**: 4 frame (più allungato, orecchie e coda che volano) per quando torna di corsa.
3. **Annusa**: 3 frame (testa bassa verso terra, naso che si muove, coda ferma o piccolo scodinzolio).
4. **Seduta**: 2 frame (coda che batte, lingua fuori), più i 3 già consegnati rifatti se non uguali al master.
5. **Si alza / si sdraia**: 3 frame di transizione (sdraiata → seduta → in piedi).
6. **Dorme**: 2 frame (sdraiata, respiro: pancia su/giù, orecchio).
7. **Mangia**: 3 frame (testa nella ciotola/sul cibo).
8. **Contenta**: 3 frame (salta o scodinzola forte) per quando le dai da mangiare o le parli.
9. **Vista di spalle e di fronte** in piedi (1 frame ciascuno) per quando corre verso il giocatore o si allontana.
Nel LEGGIMI: tabella dei frame con larghezza del corpo e riga dei piedi misurate (devono coincidere), e una riga per frame con lo stato.

## Richiesta 2 — Tutte le mappe nel nuovo disegno

L'isola principale e la seconda isola hanno già il disegno nuovo. Mancano o sono ancora vecchi (grafica procedurale) i mondi dove si naviga e si combatte. Il disegno nuovo deve essere **lo stesso stile** dell'isola: pittura a mano, bordi morbidi, stessa palette e luce, stessa qualità (riferimento: set riva, vegetazione, Sirena approdi).

Per ognuno di questi mondi consegna i pezzi elencati, in cartelle separate `muse/<data>-mondo-<nome>/`, con LEGGIMI (misure, ancore, tabella, stato per pezzo):

**A. Il mare del convoglio / Mare di Calvara (capitoli 3 e 5, e il grande viaggio)**
- Texture del mare in 3 versioni piastrellabili senza giunture: calmo giorno, tempesta (onde scure, schiuma), notte; più nebbia e ghiaccio per il grande viaggio.
- Onde e schiuma: cresta d'onda, striscia di schiuma, scia della nave (già fatta per la Sirena: estendila alle altre navi), spruzzi.
- Pioggia e fulmine (strisce di pioggia, lampo, flash), nebbia in strati sovrapponibili.
- Isole e scogli del mare: 6 isolette diverse con riva sabbiosa, 8 scogli, banchi di sabbia, secche, tutte coi bordi di schiuma.
- Pontile e approdi (come Sirena approdi, versione per le isolette), boe, fari, bandierine di rotta, croce/segno di destinazione.
- Navi: pattuglia nemica, mercantile, brigantino, galeone spagnolo, la nave del giocatore e quella ricostruita, in vista dall'alto, con vele gonfie/ammainate, stesso stile della Sirena, 8 direzioni (o 16) ciascuna, più stato danneggiato e affondata.
- Cannonate: palla, fumo, esplosione, colpo in acqua, scheggia di legno.
- Minimappa: stile pergamena/mare, segnalini nuovi (nave, nemico, isola, meta).

**B. L'interno del galeone (3 ponti) e l'assalto**
- Pavimento ad assi (3 varianti), pareti di legno con boccaporti, soffitto/travi, scale (su/giù), botole, porte e cancelli, cella, lanterne accese/spente, tappeto, tavolo e carte, botti, casse, sacchi, funi, cannoni e carrelli, timone, argano, bandiera spagnola.
- Tutto in vista dall'alto come il resto, stessa luce calda e ombre morbide dell'isola.
- Personaggi dell'interno: guardie, pirata spagnolo, comandante, alleati, in **stile del marinaio v4** (stessa grandezza, stessi piedi, 4 direzioni, camminata 4 frame, attacco 3 frame, para 2, colpito 2, a terra 1).
- Ponti con stato giorno e allarme (luce rossa).

**C. La Sirena guidata (la nave che pilota il giocatore)**
- Nave grande dall'alto, 16 direzioni: scafo, ponte con timone/argano/albero, vele gonfie e ammainate, bandiera, sartiame; stato integro, danneggiato (fasciame mancante), riparato.
- Equipaggio piccolo sul ponte (3-4 posizioni), cannoni a bordo.
- Scia e schiuma di prua, ancora, passerella, scialuppa.

**D. Tutte le altre mappe** (isola dei Relitti, grotta, baia dei Fuggiaschi, collina, passi del Capitolo 2): per ogni mappa elenca nel LEGGIMI cosa ritieni ancora "non nello stile nuovo" (terreno, rive, edifici, oggetti) e consegna i pezzi mancanti, in ordine di priorità.

Regole comuni: PNG con alpha pulito, nessuna scritta nei disegni, scala e ancora dichiarate in `elenco.txt`, nome file chiaro, una riga di stato per pezzo, e consegna a gruppi (un gruppo per mondo) così posso montarli man mano.
