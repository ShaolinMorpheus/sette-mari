# Per Muse — Scenografia: oggetti nuovi e da rifare (24 nov)

Ciao Muse. Grazie per incudine, calderone, tavolata, asta e festone: nel gioco
stanno benissimo. Ora il campo dei Fuggiaschi (e il resto delle isole) ha
bisogno di altri oggetti, perché accanto ai tuoi disegni quelli fatti dal codice
(forme piatte, colori uniti) si vedono. Ti chiedo due gruppi: **A) ridisegni**
di cose che ci sono già ma sono "a mano", **B) oggetti nuovi** per rendere il
campo abitato, **C) i pesci**, che non abbiamo ancora e che vorremmo far vedere
anche nell'acqua.

Non rifare: palme, alberi, pini, cespugli, bacche, granchi, tartarughe, gabbiani,
zattera, falò, interni delle capanne, tenda, insegna di Nives, banco di Nives
(sono già tuoi o approvati così).

**Stile**: lo stesso delle tue consegne approvate in
`muse/2026-11-23-oggetti-campo/consegna/` (guardale come riferimento: contorno
scuro caldo, luci e ombre morbide, materiali riconoscibili: legno con venature,
ferro opaco, tessuto con pieghe, corda intrecciata). Stessa scala: 1 tile = 44 px;
l'incudine è alta ~44 px, la tavolata 176×92 px.

## Come lavorare
- **Fai a gruppi, in quest'ordine di priorità** (consegna ogni gruppo appena è
  pronto, non aspettare la fine): **P1** = A1, A3, A4 e B1–B4 (già consegnati,
  grazie); **P2** = A5, A7–A9, B5–B8 e C (pesci); **P3** = B9–B11.
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

*La numerazione resta quella della prima stesura. Tolti: A2 falò (consegnato, ma
non lo montiamo: quello del campo resta com'è), A6 cartello di Nives (c'è già
`insegna-nives-appesa`), A10 palo con frecce e B12 altare (non servono).*

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

---

## C) I pesci (`pesce-…`) — P2

Nel gioco si pesca (canna, rete, 9 specie nel «Registro del pescatore»), ma i
pesci oggi sono disegni fatti dal codice e **in mare non si vede mai un pesce**.
Vorremmo entrambe le cose. Specie, nell'ordine del Registro: sardina, sgombro,
orata, pesce pappagallo, spigola, pesce lanterna, cernia, pesce luna, pesce aurora
(gli ultimi tre brillano: il bagliore è un livello a parte).

**C1. Icone del Registro e della cattura** (9 specie): disegno di lato, rivolto a
destra, 200 × 200 px, punto d'appoggio al centro. Dove ci sono già i tuoi
`pesce-sgombro` e `pesce-dentice` (cap3-blocco-b) tienili come riferimento di
stile e rifai solo quelli mancanti; per l'orata usa il dentice. Per lanterna, luna
e aurora: livello `-alone` separato con il solo bagliore (il gioco lo pulsa).

**C2. Pesci visti nell'acqua** (da sopra, in controluce come ombre colorate sotto
la superficie, semitrasparenti, senza contorno scuro netto): per le specie
comuni (sardina, sgombro, orata, pappagallo, cernia) **una figura da sopra, 6
fotogrammi di nuoto** (coda che ondeggia) sulla stessa tela, 48 × 28 px; il
gioco le muove in banchi nelle acque basse vicino alle spiagge e le fa scappare
quando ti avvicini o tiri la lenza. In più: (a) **banco di sardine** (12 pesciolini
raccolti in un'unica forma ovale, 3 varianti, 96 × 56 px), (b) **ombra grande**
di un pesce lento (cernia o pesce luna), 120 × 60 px, 4 fotogrammi.

**C3. In superficie** (4 fotogrammi ciascuno, in ordine): (a) **salto** di un
pesce che esce dall'acqua con spruzzi (da sopra e di lato leggeri, 64 × 64 px),
(b) **anelli sull'acqua** di un pesce che affiora o di un abbocco, tre cerchi che si
allargano e svaniscono (80 × 40 px, prospettiva ellittica come il mare del gioco),
(c) **boccheggio sul galleggiante**: uno strappo con una sola piccola corona di
spruzzi per il momento dell'abbocco.

Per C2 e C3 consegna nel `LEGGIMI.md` anche come li hai pensati sul mare del
gioco (profondità, trasparenza, colori); se non ti convincono come ombre dall'alto
dimmi un'alternativa. Nell'anteprima di controllo mostrali sull'acqua delle
spiagge dell'isola 1 e della Baia.

---

## Se sei bloccata
Scrivi la domanda in `LEGGIMI.md` e consegna il resto: meglio una consegna
parziale ma sicura che aspettare tutto. Altri gruppi (galeone, mari del Capitolo
4, la Baia) li aggiungeremo in una consegna successiva solo se serve: molto di
quello che avevamo pensato lo hai già consegnato.
