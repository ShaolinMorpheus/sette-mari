# Scenografia — oggetti nuovi e da rifare (24 nov)

Consegne a gruppi in ordine di priorità, come da PROMPT in questa
cartella. Stile delle consegne approvate (oggetti-campo): contorno scuro
caldo, materiali riconoscibili. Fondo trasparente, misure 1:1 di gioco.
Per ogni oggetto: livelli separati sulla stessa tela, punto d'appoggio
(px dall'angolo in alto a sinistra della tela) e ingombro a terra per
la collisione (rettangolo in px rispetto al punto d'appoggio:
sinistra, destra, sopra, sotto).

STATO: in lavorazione (gruppi P1 e P2 consegnati; P3 in arrivo)

---

## Gruppo P1

### A1. Calderone v2 (`calderone2`) — tela 64×68, appoggio (32, 60), collisione -20,20,-8,4
Pentola da cucina senza anello di sassi. Ordine di disegno:
1. `calderone2-cenere.png` — letto di cenere scura, tre tizzoni neri, due pietre piatte.
2. `calderone2-braci-calde.png` — solo il bagliore arancione sui tizzoni (si accende all'ora dei pasti).
3. `calderone2-tripode.png` — tripode legato in cima, calderone nero con manico e mestolo appeso.
4. `calderone2-liquido.png` — il liquido nella bocca, sopra il tripode.
Stato spento = livelli 1+3. Fiamma e vapore li anima il codice.

### A2. Falò del campo (`falo`) — tela 88×56, appoggio (44, 44), collisione -36,36,-12,6
Ordine di disegno:
1. `falo-sassi-cenere.png` — anello di sassi (parte dietro) e cenere.
2. `falo-ceppi.png` — i ceppi incrociati. Per lo stato spento:
   `falo-ceppi-spenti.png`, stesso disegno carbonizzato.
3. `falo-sassi-davanti.png` — l'arco di sassi davanti.
La fiamma e le scintille le anima il codice.
`falo-ceppo-sedile.png` — oggetto a sé: tela 52×24, appoggio (26, 20),
collisione -22,22,-6,2.

### A3. Tavolino di J (`tavolino-j`) — tela 56×48, appoggio (28, 44), collisione -9,9,-5,3
1. `tavolino-j-tavolino.png` — tavolino tondo vuoto, piede a tre zampe.
Oggetti singoli sulla stessa tela, da aggiungere col capitolo:
2. `tavolino-j-calamaio.png` (calamaio con penna d'oca),
   `tavolino-j-mappa.png` (mappa arrotolata con laccio),
   `tavolino-j-bussola.png` (bussola d'ottone aperta),
   `tavolino-j-diario.png` (diario con cinghia rossa).

### A4. Lanterna (`lanterna`) — tela 20×44, appoggio (10, 9), collisione: nessuna (oggetto appeso)
L'appoggio è l'anello in alto; il livello catena sta sopra l'appoggio
(9 px di tela sopra l'anello).
1. `lanterna-anello-catena.png` — catenella corta (disegnata a programma, dichiarato).
2. `lanterna-struttura.png` — ferro scuro, tetto a cupola, anello, base.
3. `lanterna-vetri.png` — i vetri chiari in livello a parte (tono neutro:
   il gioco li illumina di giallo la sera).

### B1. Rastrelliera (`rastrelliera`) — tela 96×84, appoggio (48, 82), collisione -44,44,-5,2
1. `rastrelliera-telaio.png` — telaio di legno graffiato con tacche e gancio.
Armi singole sulla stessa tela (il gioco ne mostra meno nelle fasi povere):
2. `rastrelliera-sciabola-1.png`, `-2`, `-3`, `rastrelliera-moschetto-1.png`,
   `-2`, `rastrelliera-ascia.png`, `rastrelliera-pistola.png` (appesa al gancio).

### B2. Amaca (`amaca`) — tela 156×84, appoggio (78, 80), collisione -74,74,-4,3
La collisione copre la base dei due pali (agli estremi della tela).
1. `amaca-palo-sinistro.png` (palo + cima), 2. `amaca-palo-destro.png`
   (palo + cima), 3. `amaca-telo.png` (telo vuoto incavato),
   4. `amaca-cuscino.png` (cuscino di sacco).
Nessuno dentro: i personaggi li mette il gioco.

### B3. Rete da pesca (`rete`) — tela 124×94, appoggio (62, 90), collisione -56,56,-5,2
1. `rete-telaio.png` — i due telai ad A.
2. `rete-rete.png` — la rete (i buchi della maglia sono trasparenti),
   con conchiglie impigliate.
Singoli sulla stessa tela: `rete-galleggiante-1.png`, `-2` (sugheri) e
`rete-peso-1.png`, `-2`, `-3` (piombi). Nota: il prompt chiedeva 6
singoli tra galleggianti e pesi; i sugheri nel disegno sono in parte
fusi tra loro, quindi i galleggianti separabili sono 2 (gli altri
restano disegnati nel livello rete): singoli consegnati 5.
3. Pesci secchi appesi: `rete-pesce-secco-1.png`, `-2`, `-3` (3 varianti).

### B4. Pila di barili (`pila-barili`) — tela 100×88, appoggio (50, 84), collisione -44,44,-7,2
1. `pila-barili-barili.png` — tre barili (due sotto, uno sdraiato sopra).
2. `pila-barili-sacchi.png` — due sacchi di juta alla base.
3. `pila-barili-telo.png` — telo cerato buttato sopra (il gioco lo mette/toglie).

### Controllo P1
`controllo/controllo-p1.png` — gli oggetti del gruppo montati sul prato
del campo accanto a tavolata e incudine della consegna approvata
(ingrandimento ×2 per la lettura). Calderone mostrato acceso e spento,
falò acceso e spento, pila con e senza telo.

---

## Gruppo P2

### A5. Stendino con vela (`stendino`) — tela 118×76, appoggio (59, 72), collisione -52,52,-4,2
La collisione copre la base dei due pali (agli estremi della tela).
1. `stendino-pali.png` — due pali ricurvi e la corda tesa.
Panni singoli sulla stessa tela, ognuno con le sue 2 mollette di legno,
così il gioco li fa ondeggiare uno a uno:
2. `stendino-panno-vela.png` (vela rattoppata), `stendino-panno-camicia.png`
   (camicia a righe), `stendino-panno-calzoni.png`,
   `stendino-panno-straccio.png` (straccio rosso).

### A7. Barca a remi (`barca-remi`) — tela 116×52, appoggio (58, 46), collisione -52,52,-8,4
Ordine di disegno:
1. `barca-remi-scafo.png` — scafo di tavole tirato in secca, panche dentro.
2. `barca-remi-remo-1.png` e `barca-remi-remo-2.png` — i due remi appoggiati dentro.
3. `barca-remi-cima.png` — cima arrotolata a prua.
4. `barca-remi-sacco-rete.png` — sacco con la rete dentro, a poppa.

### A8. Cannone del campo (`cannone`) — tela 84×52, appoggio (42, 46), collisione -30,30,-6,3
1. `cannone-affusto.png` — affusto di legno e ruote.
2. `cannone-canna.png` — la canna di ferro nero, bocca a destra
   (stesso disegno del composto: mozzi e fascette restano sull'affusto).
3. `cannone-palle.png` — pila di 4 palle, a parte sulla stessa tela.
4. `cannone-calcatoio.png` — il calcatoio con la spugna, appoggiato di lato.

### A9. Rotolo di corda (`corda-rotolo`) — tela 48×34, appoggio (24, 30), collisione -18,18,-4,2
`corda-rotolo.png` — rotolo di canapa a 4 giri con il capo libero a terra.
Stesso disegno della cima della barca a remi, più grande.

### B5. Fusto d'acqua con tettoia (`fusto-acqua`) — tela 96×104, appoggio (48, 100), collisione -26,26,-6,3
La collisione è quella del fusto; i quattro pali della tettoia stanno
più larghi (circa ±40) e non bloccano.
Ordine di disegno:
1. `fusto-acqua-fusto.png` — fusto con coperchio a rete e rubinetto di legno.
2. `fusto-acqua-acqua.png` — l'acqua visibile nella bocca, sotto il
   coperchio sollevato: da mostrare solo quando il fusto è pieno
   (disegnata a programma, dichiarato).
3. `fusto-acqua-mestolo.png` — il mestolo appeso al fianco.
4. `fusto-acqua-tettoia.png` — pali e tettoia di foglie di palma, sopra tutto.
5. `fusto-acqua-gocce.png` — 3 gocce ferme sotto il rubinetto
   (disegnate a programma, dichiarato).

### B6. Ceppo con ascia (`ceppo-ascia`) — tela 96×60, appoggio (48, 54), collisione -20,20,-6,3
La collisione è quella del ceppo; la catasta occupa circa x da -46 a -18.
1. `ceppo-ascia-catasta.png` — catasta bassa di legna spaccata.
2. `ceppo-ascia-ceppo.png` — il ceppo da taglio.
3. `ceppo-ascia-ascia.png` — l'ascia piantata (si toglie: la prende Nives).
4. `ceppo-ascia-schegge.png` — schegge e segatura a terra.

### B7. Tavolo di cucina (`tavolo-cucina`) — tela 124×74, appoggio (62, 70), collisione -48,48,-5,2
Nota: il disegno del tavolo dentro la tela è largo ~96 px (il master
reggeva meglio a questa misura); la tela resta 124×74.
Ordine di disegno:
1. `tavolo-cucina-tavolo.png` — tavolo basso con ripiano.
2. `tavolo-cucina-tagliere.png`, `tavolo-cucina-coltello.png`,
   `tavolo-cucina-mortaio.png` — sul piano.
3. `tavolo-cucina-pesce-appeso-1.png` e `-2` — i pesci appesi al bordo
   del piano (2 varianti).
4. `tavolo-cucina-cesta.png` — cesta di cipolle a terra, di fianco.

### B8. Mappa su cavalletto (`mappa-cavalletto`) — tela 100×114, appoggio (50, 110), collisione -30,30,-4,2
Ordine di disegno:
1. `mappa-cavalletto-cavalletto.png` — cavalletto di legno.
2. `mappa-cavalletto-mappa.png` — la mappa (isole a inchiostro, rotta
   tratteggiata, rosa dei venti).
3. `mappa-cavalletto-puntina-1..4.png` — le puntine rosse ai 4 angoli.
4. `mappa-cavalletto-filo.png` — il filo di lana rosso tra due punti.
5. `mappa-cavalletto-pergamena.png` — pergamena arrotolata appoggiata
   a un piede (stesso disegno del rotolo del tavolino di J).
Zona libera per la freccia di Biscotto: la metà bassa della mappa,
sotto il filo rosso, è senza segni aggiunti.

### Controllo P2 (oggetti)
`controllo/controllo-p2.png` — gli oggetti del gruppo montati sul prato
del campo accanto a tavolata e incudine (ingrandimento ×2).

---

## C) I pesci — gruppo P2

### C1. Icone del Registro (`pesce-<specie>`) — tela 200×200, appoggio al centro (100, 100)
Disegno di lato, rivolto a destra. Nove specie:
`pesce-sardina.png`, `pesce-sgombro.png` (quello già consegnato in
cap3-blocco-b, tenuto com'è), `pesce-orata.png` (è il disegno del
dentice di cap3-blocco-b, specchiato per guardarlo a destra come le
altre), `pesce-pappagallo.png`, `pesce-spigola.png`,
`pesce-lanterna.png`, `pesce-cernia.png`, `pesce-luna.png`,
`pesce-aurora.png`.
Per le tre specie che brillano, il bagliore è un livello a parte sulla
stessa tela, da pulsare: `pesce-lanterna-alone.png` (i punti luminosi
lungo la pancia e l'esca), `pesce-luna-alone.png`,
`pesce-aurora-alone.png`.

### C2. Pesci visti nell'acqua — come li ho pensati sul mare del gioco
Sono **ombre colorate sotto la superficie**, non sprite pieni: niente
contorno scuro, bordi morbidi, alfa massimo ~180 su 255 (il banco
~215, l'ombra grande ~128 perché è più profonda). I colori sono quelli
del dorso di ogni specie, spenti di un passo verso il mare: sul mare
chiaro delle spiagge si leggono come presenze che si muovono, senza
«galleggiare» sopra l'acqua. Vanno disegnati sopra il fondale e sotto
gli effetti di superficie (C3). Un disegno unico per specie (lo stesso
maestro dall'alto), con la tinta cambiata a programma per specie —
dichiarato: sardina, sgombro, orata e pappagallo si distinguono per
tinta e misura, la cernia è più grande e bruna.
- `pesce-<specie>-acqua.png` per sardina, sgombro, orata, pappagallo,
  cernia: **striscia di 6 fotogrammi** sulla stessa tela 288×28,
  ogni fotogramma 48×28, appoggio al centro del fotogramma (24, 14).
  La coda ondeggia ±16° (metodo a burattino: corpo e coda separati,
  perno alla radice della coda).
- `pesce-banco-sardine-1..3.png` — banco di 12 sardine in un'unica
  forma ovale, 96×56, appoggio al centro (48, 28): il gioco muove
  un solo disegno.
- `pesce-ombra-grande.png` — ombra lenta di cernia: striscia di
  4 fotogrammi 480×60, fotogramma 120×60, appoggio (60, 30).

### C3. In superficie — strisce di 4 fotogrammi, in ordine
- `pesce-salto.png` — 256×64, fotogramma 64×64, appoggio (32, 58) alla
  base degli spruzzi: il pesce esce, sta in alto, ricade; la corona di
  spruzzi cresce sotto di lui.
- `pesce-anelli.png` — 320×40, fotogramma 80×40, appoggio (40, 20):
  tre cerchi ellittici (prospettiva del mare del gioco) che si
  allargano e svaniscono. Disegnati a programma, dichiarato.
- `pesce-boccheggio.png` — 256×40, fotogramma 64×40, appoggio (32, 24):
  una sola piccola corona di spruzzi per l'abbocco. Disegnata a
  programma, dichiarato.

### Controllo P2 (pesci)
`controllo/controllo-p2-pesci.png` — le 9 icone (con gli aloni sotto le
tre specie luminose) e, sul mare largo di giorno del gioco, i pesci
nell'acqua (fotogrammi 1 e 4 di ogni specie), i 3 banchi, l'ombra
grande e gli effetti di superficie.

---

## Gruppo P3 — in lavorazione
