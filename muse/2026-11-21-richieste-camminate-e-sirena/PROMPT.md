# Richieste del 21 novembre 2026 — camminate fatte bene e Sirena in cala

Scrivi solo dentro `muse/2026-11-21-richieste-camminate-e-sirena/` (cartella di consegna: `consegna/`),
con LEGGIMI.md e foglio di contatto in `controllo/`, come sempre. Niente ritocchi da parte di Claude:
se un pezzo non va, lo rifai tu.

## A. Camminate: il problema vero

Nelle camminate consegnate finora le gambe non si leggono come un passo: i frame sembrano la stessa
posa ripetuta, con le gambe quasi ferme. Davide vuole vedere chiaramente **una gamba avanti e l'altra
indietro**, che si scambiano, con il corpo che sale e scende un poco. Il solo Capitano si muove bene:
è il riferimento di qualità (peso, ritmo, braccia che oscillano contro le gambe).

Generare 6-8 immagini intere una per una non regge: ogni frame viene un po' diverso (proporzioni,
vestiti, testa) e le gambe restano timide. Quindi **cambiamo metodo: il pupazzo a pezzi.**

### A1. Pupazzo a pezzi (metodo consigliato)

Per ogni personaggio e per ogni vista (profilo destro, fronte, spalle) consegna i **pezzi separati**,
sempre dalla stessa pittura, sfondo trasparente, stessa scala del personaggio fermo attuale:

- testa (con capelli/cappello/barba, senza collo se si può) e, se serve, un secondo pezzo per il cappello;
- busto (maglia/giacca) senza braccia;
- braccio alto + avambraccio con mano (destro e sinistro; dietro/davanti nel profilo);
- coscia + stinco + stivale per ciascuna gamba (davanti/dietro nel profilo; destra/sinistra di fronte e
  di spalle), già **completi fino al bacino**, così che ruotando non si veda il buco;
- ogni pezzo con la sua **cerniera** (punto di rotazione) in un `pezzi.json`: spalla, gomito, anca,
  ginocchio, caviglia, collo, in pixel del pezzo;
- un frame fermo di controllo che ricomposto coincide con il disegno attuale.

Il codice li anima con un ciclo di camminata vero (contatto, abbassamento, passaggio, sollevamento): gambe
a ±25-30°, braccia contrarie, saliscendi del busto. Con lo stesso pupazzo si fanno anche accetta,
piccone, torcia e tutte le pose di lavoro: il personaggio resta **sempre lo stesso uomo**.

Ordine dei personaggi: Capitano (giacca rossa) e Marinaio (maglia a righe) dell'eroe, Tito, Nives, Gnocco,
Ferro, Giacomo, Pip, Dodo, mercante, Cormorano n.3 e n.5. Briciola (il cane) a parte, vedi A3.

### A2. Se i pezzi non sono fattibili (alternativa)

Un ciclo di **8 frame per vista** con regole fisse: 1 contatto (gamba destra avanti, sinistra indietro,
tutte e due a terra, angolo largo), 2 abbassamento, 3 passaggio (gamba sinistra sotto il corpo), 4 salita,
5-8 stessi quattro con le gambe scambiate. Stesso vestito, stessa testa, stessa scala in tutti i frame;
braccia contro le gambe. Prima mandami solo il contact sheet del primo personaggio.

### A3. Briciola

Il cane è troppo fermo. Serve un trotto vero (zampe che si alternano, 8 frame di profilo destro, più
fronte e spalle se riesci) e una camminata lenta; code e orecchie che accompagnano.

### A4. Capitano

Viso e mani di un rosa/carnagione leggermente più caldo e più rosato (oggi sono un po' spenti). Stesso
disegno, solo la pelle.

## B. Sirena sulla spiaggia (la nave in cala del Cap. 2)

Sulla spiaggia della cala il gioco disegna ancora il vecchio scafo. Serve la **nave nuova in vista
laterale**, stessa Sirena del mare nuovo (stesso scafo, ponte, colori), appoggiata sulla sabbia, in tre
stati sulla stessa tela e con la stessa ancora (centro scafo sulla sabbia):

1. **relitto** (prima del cantiere): scafo intero ma spezzato, senza alberi, fiancate sventrate, con
   segni di alghe e sabbia; sul fasciame il nome sbiadito «…ena»;
2. **in riparazione**: stesso scafo con tre punti di falla dove si applicano le tavole, più un albero
   mozzo (le tre falle già consegnate in `2026-11-16-passo3-cap2` devono combaciare);
3. **riparata**: scafo intero, albero e vele ammainate, pronta a salpare.

Misura di riferimento: scafo circa 430×330 di disegno (file a 4×), fondo trasparente, ombra morbida sulla
sabbia inclusa.

STATO: da consegnare. Quando hai finito scrivi `STATO: pronto` in fondo al LEGGIMI.md.
