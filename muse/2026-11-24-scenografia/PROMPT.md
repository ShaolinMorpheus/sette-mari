# Per Muse — Scenografia: oggetti nuovi e da rifare (24 nov)

Ciao Muse. Grazie per incudine, calderone, tavolata, asta e festone: nel gioco
stanno benissimo. Ora il campo dei Fuggiaschi (e il resto delle isole) ha
bisogno di altri oggetti, perché accanto ai tuoi disegni quelli fatti dal codice
(forme piatte, colori uniti) si vedono. Ti chiedo due gruppi: **A) ridisegni**
di cose che ci sono già ma sono "a mano", **B) oggetti nuovi** per rendere il
campo abitato.

**Stile**: lo stesso delle tue consegne approvate in
`muse/2026-11-23-oggetti-campo/consegna/` (guardale come riferimento: contorno
scuro caldo, luci e ombre morbide, materiali riconoscibili: legno con venature,
ferro opaco, tessuto con pieghe, corda intrecciata). Stessa scala: 1 tile = 44 px;
l'incudine è alta ~44 px, la tavolata 176×92 px.

## Come lavorare
- **Fai a gruppi, in quest'ordine di priorità** (consegna ogni gruppo appena è
  pronto, non aspettare la fine): **P1** = A1–A4 e B1–B4; **P2** = A5–A10 e B5–B8;
  **P3** = B9–B12.
- Per ogni oggetto consegna **livelli separati** sullo stesso canvas (si
  sovrappongono senza spostamenti), e le **parti animabili singole** (tessuti,
  bandierine, fiamme, vapore, fumo: il gioco le muove, tu disegnale ferme).
- **Stessi disegni per gli stati**: se un oggetto ha più stati (pieno/vuoto,
  acceso/spento, nuovo/consumato) l'oggetto è sempre lo stesso disegno; cambiano
  solo i pezzi indicati.
- Per ogni oggetto scrivi nel `LEGGIMI.md`: dimensioni del canvas, **punto
  d'appoggio** (px dall'angolo in alto a sinistra) e **ingombro a terra** per la
  collisione (rettangolo in px rispetto al punto d'appoggio, es. `-30,30,-8,6`).
- Fondo trasparente, niente alone chiaro, nomi in minuscolo con trattini
  (`prefisso-parte.png.b64`), nessun ridimensionamento nel gioco: se un oggetto ti
  viene meglio più grande o più piccolo dillo nel `LEGGIMI.md`.
- Una **tavola di controllo** (contact sheet) per gruppo, con gli oggetti montati
  sul prato del campo accanto all'incudine e alla tavolata, per l'approvazione di
  Davide.
- Scrivi solo in `muse/2026-11-24-scenografia/` (`consegna/`, `controllo/`,
  `LEGGIMI.md` con `STATO: in lavorazione` e poi `STATO: pronto` a consegna
  verificata sul remoto).

---

## A) Ridisegni (oggetti già presenti, disegnati dal codice)

### A1. Calderone, versione 2 (`calderone2`)  — P1
Il tuo calderone è bello, ma il cerchio di sassi con le braci lo fa sembrare un
**secondo falò** accanto a quello vero del campo (che ha già la sua fiamma e il
suo cerchio di sassi). Riprogettalo come **pentola di cucina**: tripode di legno
legato in cima, calderone di ferro nero con manico e mestolo appeso, e sotto
**solo un letto di cenere scura con tre tizzoni neri e due pietre piatte** (niente
anello di sassi, niente braci accese nel disegno).
- ingombro ~56 × 62 px; punto d'appoggio al centro della cenere
- livelli: (a) cenere + tizzoni, (b) tripode + calderone, (c) liquido dentro,
  (d) `braci-calde` = solo il bagliore arancione sui tizzoni, che il gioco accende
  soltanto all'ora dei pasti (fiamma e vapore li anima il codice)
- stesso disegno nei due stati (spento = senza il livello d)

### A2. Falò del campo (`falo`) — P1
Il falò principale del campo, con anello di sassi, ceppi incrociati e cenere. Ora
ha un vecchio disegno. Cerchio di sassi ben leggibile, 3–4 ceppi, un ceppo-sedile
accanto.
- ingombro ~80 × 52 px; punto d'appoggio al centro della cenere
- livelli: (a) sassi + cenere (dietro), (b) ceppi, (c) sassi davanti, (d) `ceppo-sedile` separato.
  La fiamma e le scintille le anima il codice.
- ceppi anche in versione **spenta** (carbonizzati), stesso disegno

### A3. Tavolino di J (`tavolino-j`) — P1
Il tavolino da lavoro di J, il naufrago che ha lasciato bottiglie e pagine:
piccolo tavolo tondo su un solo piede a tre zampe, piano di legno consumato.
- ingombro ~56 × 44 px (piano) con punto d'appoggio al centro del piede
- livelli: (a) tavolino vuoto, poi **4 oggetti singoli** che il gioco aggiunge
  man mano che il capitolo avanza: (1) calamaio con penna d'oca, (2) mappa
  arrotolata con laccio, (3) bussola d'ottone aperta, (4) diario con cinghia rossa

### A4. Lanterna (`lanterna`) — P1
La lanterna appesa al tuo palo è ancora fatta dal codice. Disegna **solo la
lanterna**: struttura di ferro scuro con tetto a cupola, anello, quattro vetri
chiari, base.
- ~16 × 34 px; punto d'appoggio = anello in alto (è lì che si appende)
- livelli: (a) struttura, (b) `vetri` in un livello a parte (tono neutro, il gioco
  li illumina di giallo la sera), (c) `anello-catena` (corta catenella)

### A5. Stendino con vela (`stendino`) — P2
Due pali ricurvi con una corda tesa e panni stesi ad asciugare.
- ingombro ~118 × 76 px; punto d'appoggio al centro della base
- livelli: (a) pali + corda, (b) **panni singoli** (vela rattoppata, camicia a
  righe, un paio di calzoni, uno straccio rosso) appesi ognuno con 2 mollette di
  legno, così il gioco li fa ondeggiare uno a uno

### A6. Cartello di Nives (`cartello-nives`) — P2
Insegna del fabbro, appesa a due pali bassi con catenelle.
- ~84 × 40 px; la tavola resta **vuota** (la scritta «NIVES · FABBRO» la scrive il
  gioco con il font), con due chiodi di ferro agli angoli
- livelli: (a) pali + catenelle, (b) tavola (legno con venature e bordo scuro)

### A7. Barca a remi (`barca-remi`) — P2
Piccola barca di tavole tirata in secca, con i remi appoggiati dentro.
- ~110 × 46 px, vista di lato leggermente dall'alto; punto d'appoggio sotto la chiglia
- livelli: (a) scafo, (b) 2 remi separati, (c) una cima arrotolata a prua, (d)
  `sacco-rete` (un sacco con una rete dentro)

### A8. Cannone del campo (`cannone`) — P2
Cannone di ferro nero su affusto di legno a due ruote, bocca a destra.
- ~80 × 48 px; punto d'appoggio al centro tra le ruote
- livelli: (a) affusto + ruote, (b) canna, (c) **pila di 4 palle di cannone** a
  parte, (d) `calcatoio` (bastone con spugna) appoggiato di lato

### A9. Rotolo di corda (`corda-rotolo`) — P2
Grosso rotolo di cordone di canapa (4 giri), con un capo libero che scende a terra.
- ~44 × 30 px; punto d'appoggio al centro della base

### A10. Palo con frecce / cartello indicatore (`palo-frecce`) — P2
Palo di legno con 2 assi-freccia inchiodate (una verso destra, una verso
sinistra, inclinate), per i sentieri dell'isola. Le assi **vuote** (la scritta la
mette il gioco).
- ~64 × 92 px; punto d'appoggio alla base del palo

---

## B) Oggetti nuovi per il campo

### B1. Rastrelliera delle armi (`rastrelliera`) — P1
Telaio di legno con **tre sciabole, due moschetti e un'ascia** appoggiati,
una pistola a pietra focaia appesa a un gancio. Roba usata: legno graffiato,
ferro con qualche macchia.
- ~96 × 80 px; ingombro a terra stretto (la base)
- livelli: (a) telaio, (b) armi **singole** (6), così il gioco può mostrarne meno
  nelle fasi in cui il campo è povero

### B2. Amaca (`amaca`) — P1
Amaca di tela e corda tra due pali piantati (diventa anche l'amaca che il
giocatore costruisce: oggi è disegnata dal codice). Un cuscino di sacco.
- ~150 × 80 px; punto d'appoggio al centro tra i pali
- livelli: (a) palo sinistro + cima, (b) palo destro + cima, (c) telo (vuoto,
  leggermente incavato), (d) cuscino. Non disegnare nessuno dentro: i personaggi li
  mette il gioco.

### B3. Rete da pesca ad asciugare (`rete`) — P1
Telaio ad A con una grande rete stesa, galleggianti di sughero, un paio di pesi
di piombo, qualche conchiglia impigliata.
- ~120 × 90 px; punto d'appoggio al centro della base
- livelli: (a) telaio, (b) rete (trasparente nei buchi), (c) galleggianti e pesi
  singoli (6), (d) un `pesce-secco` appeso (3 varianti)

### B4. Pila di barili e sacchi (`pila-barili`) — P1
Tre barili (uno sdraiato sopra, due sotto) con cerchi di ferro e un paio di sacchi
di juta legati col filo, un telo cerato buttato sopra. Diversi dai due barili che
già ci sono.
- ~96 × 84 px; punto d'appoggio al centro della base
- livelli: (a) barili, (b) sacchi, (c) telo cerato (tolto/messo dal gioco)

### B5. Fusto d'acqua con tettoia (`fusto-acqua`) — P2
Grosso fusto con coperchio a rete, rubinetto di legno e un mestolo appeso, sotto
una tettoia bassa di foglie di palma su quattro pali.
- ~92 × 100 px; punto d'appoggio al centro della base
- livelli: (a) pali + tettoia, (b) fusto, (c) mestolo, (d) **livello dell'acqua**:
  una sola immagine di acqua visibile sotto il coperchio sollevato (lo mostra il
  gioco quando il fusto è pieno), (e) `gocce` (3 piccole gocce ferme per il rubinetto)

### B6. Ceppo con ascia (`ceppo-ascia`) — P2
Grosso ceppo di tagliaculo con un'ascia piantata, accanto una catasta bassa di
legna spaccata e un po' di scheggie e segatura a terra.
- ~90 × 56 px; punto d'appoggio al centro del ceppo
- livelli: (a) catasta, (b) ceppo, (c) ascia (si può togliere: Nives la prende),
  (d) `schegge` a terra

### B7. Tavolo di cucina (`tavolo-cucina`) — P2
Tavolo basso con tagliere, un grosso coltello, pesce che pende da un gancio, un
mortaio, qualche cipolla in una cesta. Un angolo di cucina da naufraghi.
- ~120 × 70 px; punto d'appoggio al centro della base
- livelli: (a) tavolo, (b) tagliere, (c) coltello, (d) **pesci appesi** (2
  varianti), (e) mortaio, (f) cesta con cipolle

### B8. Mappa su cavalletto (`mappa-cavalletto`) — P2
Cavalletto di legno con una grande mappa dell'arcipelago (isole disegnate a
inchiostro, rotta tratteggiata, rosa dei venti) tenuta da quattro puntine, un filo
di lana rosso che unisce due punti.
- ~96 × 110 px; punto d'appoggio alla base del cavalletto
- livelli: (a) cavalletto, (b) mappa, (c) puntine singole (4), (d) filo rosso,
  (e) **pergamena arrotolata** appoggiata a un piede. Biscotto, il pappagallo,
  mostra lì i posti da esplorare: lascia una zona libera dove il gioco può
  disegnare una freccia.

### B9. Scheletro di barca in costruzione (`barca-costruzione`) — P3
Ossatura (le coste) di una barca di 5 m su due cavalletti, con alcune tavole già
inchiodate, un martello e un cesto di chiodi.
- ~180 × 96 px; punto d'appoggio al centro
- **stessi pezzi in 4 stati di avanzamento** (come livelli aggiuntivi): 0) solo
  chiglia e prime coste, 1) coste complete, 2) metà fiancata a tavole, 3) scafo
  quasi finito. Ogni stato = livello in più sullo stesso canvas.

### B10. Trespolo e gabbia di Biscotto (`trespolo`) — P3
Palo con anello di legno per il pappagallo, una ciotola di semi, una ciotola
d'acqua, una piuma, e accanto una **gabbia vuota** aperta con la porticina
(volutamente aperta: Biscotto è libero).
- ~70 × 86 px; punto d'appoggio alla base del palo
- livelli: (a) palo + anello, (b) ciotole, (c) gabbia, (d) porticina (aperta e
  chiusa, due immagini)

### B11. Cassa del tesoro (`cassa`) — P3
Cassa di legno con fasce di ferro, serratura a ghiera, aperta con dentro poco
(qualche moneta, una collana) — è il campo di naufraghi, non quello di un
re. Stato chiuso e stato aperto con **lo stesso disegno**.
- ~64 × 50 px; punto d'appoggio al centro della base
- livelli: (a) corpo, (b) coperchio chiuso, (c) coperchio aperto, (d) contenuto
  (singoli: monete, collana, una chiave)

### B12. Altare dei caduti (`altare`) — P3
Un pietra alta e piatta con intorno conchiglie, nastri colorati legati a un
palo, piccole lanterne di vetro (spente) e un'ancora arrugginita. Un posto
dove ricordare chi non ce l'ha fatta, sobrio.
- ~96 × 88 px; punto d'appoggio al centro della pietra
- livelli: (a) pietra + ancora, (b) palo con nastri (3 nastri singoli), (c)
  conchiglie, (d) 3 piccole lanterne spente (il gioco le accende di sera)

---

## Se sei bloccata
Scrivi la domanda in `LEGGIMI.md` e consegna il resto: meglio una consegna
parziale ma sicura che aspettare tutto. Aggiornamenti futuri: Davide aggiungerà
altri gruppi (isola 1, capanna, galeone, mari del Capitolo 4) in una consegna
successiva, non in questa.
