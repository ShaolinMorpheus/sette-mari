# Prima isola — consegna grafica del 25 nov 2026

Disegni nuovi per gli oggetti della prima isola finora disegnati dal codice,
alle misure misurate da `www/index.html` (SPEC del 25 nov 2026). Stile
acquerello/pastello con colori vivi (fogliame spinto in saturazione e verso il
verde, come da regola permanente), contorno sottile marrone scuro caldo, luce
dall'alto-sinistra. Ogni pezzo è verificato sui fondi veri del gioco (erba e
sabbia) nei fogli in `controllo/`.

Nota generale sui margini: sulle tele piccole (conchiglie, teschio, colture,
appesi, cespugli) il contenuto sta a meno di 8 px dal bordo perché sono le
misure stesse del codice (tela e àncora) a imporlo; sulle tele grandi il
margine di 8 px è rispettato ovunque. Dettagli per oggetto sotto.

## Gruppo 1 — vegetazione e spiaggia (`consegna/`)

- **palma** — tela 151×165, àncora (69,164). Hitbox codice: [x−24, y−150,
  x+78, y+4]. UN disegno, niente cocchi (li aggiunge il codice) e niente
  radici/ciuffi a terra. Tronco curvo verso destra, 9 fronde. Scostamento
  dichiarato: il disegno generato era stretto e alto, è stato allargato in
  orizzontale (×1,45) per riempire lo slot arte, che da SPEC è più basso e
  largo della palma procedurale.
- **cespuglio** — tela 64×60, àncora (32,58). Hitbox: [x−30, y−44, x+30, y+6].
  Liane pendenti e fiorellini bianchi/rosa. UN disegno, varianti da codice.
- **cespuglio-bacche** — tela 64×59, àncora (32,57). Stessa hitbox. ~13 bacche
  rosa-rosse mature, niente fiori.
- **cespuglio-spoglio** — tela 64×60, àncora (32,58). Scostamento dichiarato
  (da SPEC): consegnato alla misura del cespuglio invece che ai 72×62 /
  àncora (36,54) del procedurale. Verde, senza bacche né fiori: è lo stato
  «non pronto» di entrambi i cespugli.
- **conchiglia-1/2/3** — tela 30×26, àncora (15,22). Forma a ventaglio con
  coste radiali, base in basso. Palette dal codice: 1 rosa, 2 gialla, 3
  azzurra.
- **teschio** — tela 30×24, àncora (15,18). Cranio color osso appoggiato a
  terra, orbite scure, mandibola piccola.
- **rottami** — tela 56×38, àncora (28,30). Hitbox: [x−26, y−30, x+26, y+8].
  Tre assi spiaggiate sovrapposte e inclinate + pezzo di metallo e chiodi.

Cosa manca (gruppo 1): niente. Le varianti specchiate/le ricava il codice,
i cocchi li disegna il codice sopra la palma.

## Gruppo 2 — rovine

Àncora (W/2, 78) per tutti i muri; blocchi di pietra con muschio sulle
sommità, altezze irregolari (centro più alto).

- **rovina-muro-1** — tela 54×86, àncora (27,78). Una colonna di blocchi.
  Scostamento dichiarato: allargato in orizzontale (×1,3) per coprire la
  larghezza del segmento.
- **rovina-muro-2** — tela 98×86, àncora (49,78).
- **rovina-muro-3** — tela 142×86, àncora (71,78). Scostamento dichiarato:
  allargato in orizzontale (×1,3) per coprire i 3 segmenti.
- **rovina-arco** — tela 240×206, àncora (120,196). Il disegno occupa circa
  x 13..227, y 26..200 (SPEC: y ≈28..202); luce centrale bassa libera, sotto
  l'arco si passa. Chiave di volta con piccolo teschio inciso, muschio su
  pilastri e chiave. Scostamento dichiarato: allargato in orizzontale (×1,3)
  per avvicinare i pilastri alle x del codice.

Cosa manca (gruppo 2): niente.

## Gruppo 3 — zattera a terra

Tutti e tre gli stadi sulla stessa tela 176×132, àncora (88,120)
(centro-basso dell'impronta 3×2 tessere), base allineata alla stessa y.

- **zattera-stadio-1** — cantiere: tronchi accatastati alla rinfusa, rotolo
  di corda, tela della vela ripiegata, un barilotto.
- **zattera-stadio-2** — scafo legato completo (tronchi + traverse legate),
  base dell'albero vuota al centro, senza albero né vela.
- **zattera-stadio-3** — completa: albero e vela issata ma floscia (senza
  vento), bandierina nera in cima. Derivato dallo stadio 2 con una modifica
  del disegno, stessa sagoma e stessa scala dello scafo.

Cosa manca (gruppo 3): niente. (La zattera in acqua è un altro slot, non
richiesto qui.)

## Gruppo 4 — orto

Tela unica per i 3 livelli: **184×116**, àncora **(104,92)** (quella proposta
in SPEC, verificata sui contenuti: x −95..+68, y −66..+14 rispetto
all'origine). Collisione: tutto il recinto è solido.

- **orto-base** — suolo con solchi, recinto dietro (2 traverse + pali),
  4 aiuole sopraelevate vuote con terra scura.
- **orto-spaventapasseri** — solo lo spaventapasseri (palo, traversa,
  camicia ruggine, testa di paglia, cappello scuro, paglia ai polsi); sta a
  sinistra e le braccia sporgono sul bordo dell'orto come nella geometria
  del codice.
- **orto-recinto-davanti** — solo traversa e 4 pali davanti. Scostamento
  dichiarato: il disegno è stato schiacciato in verticale (~19 px) per stare
  all'altezza del codice (traversa a y −3, pali alti 12).
- **coltura-patata-0..3 / coltura-zucca-0..3 / coltura-ananas-0..3** — tela
  28×26, àncora (14,24) per tutte. Scala comune per specie (la crescita si
  legge: lo stadio 0 è volutamente piccolo), base alla y dell'àncora.
  Patata stadio 3: due patate rosa semi-interrate ai lati. Zucca: stadio 2
  zucca verde piccola, stadio 3 arancione. Ananas: stadio 2 frutto verde,
  stadio 3 giallo con ciuffo.

Cosa manca (gruppo 4): il **fungo**, escluso di proposito — lo disegna già il
pacchetto NV3 (fungoDraw), come da SPEC. Per il resto niente.

## Gruppo 5 — essiccatore

- **essiccatore-telaio** — tela 120×112, àncora (60,100). Montanti inclinati,
  traversa in cima, diagonali di rinforzo, 3 fili con anellino in fondo per
  le postazioni vuote (x −28, 0, +28). Collisione: solo i due montanti, in
  mezzo si passa sotto.
- **essiccatore-pesce-fresco / -pesce-secco** — tela 24×52, àncora (12,0):
  filo breve in cima + 2 pesci uno sotto l'altro (il secco è marrone e più
  piccolo, ~−18% come nel codice).
- **essiccatore-bacche-fresche / -bacche-secche** — tela 24×52, àncora (12,0):
  2 grappoli (fresche rosse, secche bordeaux raggrinzite). Nota: nelle
  secche il filo tra i due grappoli è sottilissimo e alla scala di gioco i
  due grappoli possono sembrare appena staccati.
- **essiccatore-fette-fresche / -fette-secche** — tela 24×52, àncora (12,0):
  3 fette in colonna (fresche gialle, secche arancio-brune).

Scostamento dichiarato (tutti gli appesi): il filo tocca il bordo superiore
della tela (y=0) perché l'àncora è (12,0) — il contenuto pende da lì; è il
caso «la misura del codice lo impone» della regola dei margini.

Cosa manca (gruppo 5): niente.

## Controlli

`controllo/`: un foglio per gruppo con i pezzi su erba/sabbia veri alla
scala di gioco 1:1 (gruppo1, gruppo2, gruppo3, gruppo4-colture), più
`controllo-gruppo4-colture-zoom` (colture ingrandite 3×, perché a 28×26 px
sull'erba fiorita del gioco si giudicano male), `controllo-orto`
(ricomposizione dei 3 livelli con 4 colture sulle aiuole, 2×) e
`controllo-essiccatore` (ricomposizione telaio + 3 appesi alle postazioni,
2×). Audit numerico su ogni file: dimensioni esatte da SPEC, una componente
principale, zero pixel magenta residui.

## Alta risoluzione @3x (25 nov 2026, su richiesta RIFAI-ALTA-RISOLUZIONE)

Gli stessi disegni della consegna qui sopra, **ridisegnati a risoluzione 3×**:
stessa composizione, stessi livelli, stesse trasformazioni relative (recinto
davanti schiacciato in verticale, scala comune per specie delle colture). Il
gioco li disegnerà a 1/3 della grandezza: in scena le dimensioni restano
identiche, ma i disegni sono nitidi invece che sgranati. Questo è il PRIMO
giro chiesto dal prompt aggiornato: orto, colture, essiccatore, conchiglie,
teschio e rottami.

**Metodo (per ogni pezzo): fonte `gen`** — nessun file è un ingrandimento del
file 1× consegnato e nessuna rigenerazione è stata necessaria: ogni pezzo è
stato ricavato dalla generazione originale (le stesse usate per l'1×, da
1120×2240 a 2736×912) con la stessa chiave magenta e gli stessi tagli, ma
ridimensionato alla misura 3× invece che a quella 1×. Le generazioni sono da
~2,2× a ~12× più grandi del file 3× finale (fattori di riduzione tra 0,46 e
0,08), quindi il dettaglio alla nuova misura è dettaglio disegnato, non
interpolato. Dettaglio per gruppo:

- orto (3 livelli): dalla generazione orto 1920×1280 e orto-extra 2736×912;
  base ridotta a 408×210 (sorgente ritagliata 1594×964), spaventapasseri
  fattore 0,126, recinto davanti schiacciato a 432×57 come a 1×.
- colture (12): dai fogli 2736×912 delle tre specie, scala comune per specie
  (patata 0,085, zucca 0,089, ananas 0,083 — le stesse proporzioni dell'1×).
- essiccatore: telaio dal foglio 1600×1600 (fattore 0,176); appesi dal foglio
  2736×912 (fattori 0,17–0,20).
- conchiglie, teschio, rottami: dal foglio spiaggia 2480×992 (fattori
  0,14–0,22).

**Nuove misure e àncore — tutte esattamente 3× quelle dell'1×:**

- `orto-base@3x`, `orto-spaventapasseri@3x`, `orto-recinto-davanti@3x` —
  tela **552×348**, àncora **(312,276)**; i 3 livelli allineati sulla stessa
  tela come a 1×.
- `coltura-patata-0..3@3x`, `coltura-zucca-0..3@3x`,
  `coltura-ananas-0..3@3x` — tela **84×78**, àncora **(42,72)**.
- `essiccatore-telaio@3x` — tela **360×336**, àncora **(180,300)**.
- `essiccatore-pesce-fresco@3x`, `-pesce-secco@3x`, `-bacche-fresche@3x`,
  `-bacche-secche@3x`, `-fette-fresche@3x`, `-fette-secche@3x` — tela
  **72×156**, àncora **(36,0)**.
- `conchiglia-1/2/3@3x` — tela **90×78**, àncora **(45,66)**.
- `teschio@3x` — tela **90×72**, àncora **(45,54)**.
- `rottami@3x` — tela **168×114**, àncora **(84,90)**.

**Margini:** ovunque il triplo dei margini dell'1×. Dove l'1× rispettava gli
8 px, qui il margine è ≥24 px. Restano i casi imposti dalle misure già
dichiarati a 1×, scalati ×3: filo degli appesi che parte da y=0 (àncora
(36,0)) e contenuto che riempie l'altezza; margine basso 6 px sulle colture
(era 2); margine alto 3 px del teschio (era 1); margine alto 6 px delle
conchiglie (era 2).

**Verifiche fatte:**

- Dimensioni e àncore esatte su tutti i 27 file; una componente principale
  per file (le colture ananas hanno 2–4 componenti con la principale ≥99,7%:
  punte di foglia staccate, come a 1×); zero pixel magenta residui.
- Test di composizione: ogni @3x ridotto alla misura 1× e confrontato col
  file 1× consegnato — differenza media (RGB premoltiplicato) tra 0,08 e
  14,8 su 255. I valori più alti sono solo su tele piccolissime
  (conchiglia-1 14,8, pesce-fresco 14,6, teschio 10,0), dove il profilo
  antialias dei bordi pesa di più: a vista è lo stesso disegno, con bordi
  più puliti.
- Test di nitidezza: per orto ricomposto e coltura-zucca-3, il file 1×
  ingrandito ×3 col bicubico contro il @3x, sia a grandezza 3× sia ridotti
  a grandezza telefono: il @3x è visibilmente più nitido (venature del
  legno, spaventapasseri, foglie).
- Fogli su fondi veri con i pezzi alla grandezza di gioco (il @3x ridotto a
  1/3): `controllo-3x-orto` e `controllo-3x-essiccatore` (ricomposizioni),
  `controllo-3x-gruppo4-colture`, `controllo-3x-spiaggia` (conchiglie,
  teschio e rottami sulla sabbia vera, con la riga a grandezza piena 3×).

**Palma, cespugli e rovine @3x: NON inclusi.** Il prompt aggiornato esclude
palma e cespugli (nel gioco ci sono già palme e cespugli dipinti, 3 varianti
di palma con cocchi: la palma nuova non li sostituisce e viene scartata) e
non chiede le rovine. I file @3x di questi pezzi erano stati preparati e
restano in locale, non in questa consegna.

**Zattera:** gli stadi 1–3 restano solo a 1× — il prompt di rifacimento non
li chiedeva.

Cosa manca (sezione @3x): il SECONDO giro chiesto dal prompt aggiornato —
gli oggetti piccoli del campo a 3× (cassa, lanterna, tavolino-j,
corda-rotolo e calderone2 per primi; poi stendino, tavolo-cucina, rete,
rastrelliera, amaca, fusto-acqua, pila-barili, ceppo-ascia, trespolo,
mappa-cavalletto, cannone, barca-remi, barca-costruzione), partendo dalle
composizioni corrette del 25 nov (cartella correzioni-scenografia).

STATO: pronto
