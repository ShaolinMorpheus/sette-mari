# Scenografia — oggetti nuovi e da rifare (24 nov)

Consegne a gruppi in ordine di priorità, come da PROMPT in questa
cartella. Stile delle consegne approvate (oggetti-campo): contorno scuro
caldo, materiali riconoscibili. Fondo trasparente, misure 1:1 di gioco.
Per ogni oggetto: livelli separati sulla stessa tela, punto d'appoggio
(px dall'angolo in alto a sinistra della tela) e ingombro a terra per
la collisione (rettangolo in px rispetto al punto d'appoggio:
sinistra, destra, sopra, sotto).

STATO: in lavorazione (gruppo P1 consegnato; P2 e P3 in arrivo)

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

## Gruppo P2 — in lavorazione
## Gruppo P3 — in lavorazione
