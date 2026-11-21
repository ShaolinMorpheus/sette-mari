# Richieste del 21 novembre — correzioni, pupazzo, Briciola, Capitano rosa, Sirena in cala

## Correzioni (in `consegna/correzioni/`, 8 file)

- **Nives profilo sinistro**: avevate ragione, e
  l'errore e' mio — i frame consegnati il 20 novembre
  guardavano a destra, identici al profilo destro: il
  foglio rigenerato li aveva disegnati cosi' e il mio
  controllo aveva misurato i margini ma non la
  direzione dello sguardo. I 6 frame ora sono
  specchiati: guardano a sinistra, col ciclo
  specchiato (e' lo stesso risultato che darebbe la
  specchiatura da codice; nodo della bandana e tasca
  con la chiave cambiano lato, come deve essere nel
  profilo opposto). Confronto in `controllo/`.
- **Tito passo 6 fronte e spalle**: ritagliati di
  nuovo dal foglio v2, teste intere (berretto completo
  con gambo e orecchie con orecchini, nessun taglio).
  Sostituiscono quelli del 19 novembre.

## A. Pupazzo a pezzi — personaggio di prova: Capitano giacca rossa

In `consegna/pupazzo-capitano/`: 30 pezzi + `pezzi.json`
+ i 3 fermi ricomposti di controllo
(`fermo-ricomposto-<vista>.png`, che coincidono coi
fermi attuali: pixel di figura non coperti ~1%, solo
bordi).

Pezzi per vista (tela 336x376, stessa scala dei fermi):
- fronte e spalle (10 pezzi a vista): testa, busto,
  braccio alto e avambraccio+mano per lato, coscia e
  stinco+stivale per lato.
- profilo destro (10 pezzi): testa, busto, braccio
  alto e avambraccio davanti e dietro, coscia e
  stinco+stivale davanti e dietro.

`pezzi.json` da': per ogni pezzo file, offset sulla
tela a riposo, dimensione, **cerniera** (punto di
rotazione, in pixel del pezzo e della tela), ordine
di disegno e **genitore** (gerarchia: stinco segue la
coscia, avambraccio segue il braccio, tutto il resto
segue il busto per il saliscendi). Piu' la tabella dei
giunti per vista: collo, spalle, gomiti, anche,
ginocchia, caviglie.

Nei `controllo/` ci sono le pose di prova ricomposte
dai pezzi (falcata di profilo +-26 gradi, ginocchio
dietro piegato, braccia contrarie, busto giu' di 4):
il metodo regge, le giunture restano coperte dalle
sovrapposizioni.

### Limiti dichiarati del pupazzo
- I pezzi sono tagliati dalla pittura piatta dei
  fermi: dove il braccio di profilo copriva la
  giacca, il busto ha un riempimento liscio del colore
  della giacca (a programma); dove la mano copriva i
  pantaloni, le cosce hanno lo stesso riempimento blu.
  A riposo non si vede nulla (il pezzo vero sta sopra);
  si nota solo a braccio molto ruotato.
- Braccio dietro del profilo: nel fermo e' nascosto
  dal busto, quindi e' una **copia scurita** del
  braccio davanti, spostata indietro (segnato
  "derivato" nel json).
- Stinco e stivale sono un pezzo unico: la caviglia
  nel json e' un riferimento, non un pezzo separato.
- Di fronte e di spalle le rotazioni delle gambe
  vanno tenute piccole (il passo si legge dal
  ginocchio che si piega e dal saliscendi): la posa
  di prova usa +-8 gradi.
- Le tre viste partono dai tre fermi attuali, che
  tra loro hanno piccole differenze di scala (gia'
  nei disegni originali).

Se il metodo va bene, gli altri personaggi (Marinaio
per secondo, poi Tito, Nives, Gnocco, Ferro, Giacomo,
Pip, Dodo, mercante, Cormorano 3 e 5) si fanno con lo
stesso procedimento. La camminata a 8 frame (punto
A2) non e' stata fatta: resta l'alternativa se i
pezzi non convincono.

## A3. Briciola (in `consegna/briciola-trotto/`, 16 file)

- `briciola-trotto1..8.png`: trotto di profilo
  destro, 8 frame, zampe che si alternano in
  diagonale, un frame in volo, orecchie e coda che
  accompagnano. Tela 320x200, ancora (160,190),
  stessa scala della camminata v2.
- `briciola-trotto-fronte1..4.png` e
  `briciola-trotto-spalle1..4.png`: trotto di fronte
  e di spalle, 4 frame (di fronte l'alternanza e'
  piu' sobria).
- La camminata lenta e' la camminata a 4 frame gia'
  consegnata in `muse/2026-11-17-briciola-v2/`.

## A4. Capitano piu' rosa (in `consegna/capitano-rosa/`, 55 file)

Tutti i 55 frame del set Capitano giacca rossa
(fermi, passi, torcia, ascia, piccone, mani nude) con
la stessa regola di colore a programma: solo i pixel
di pelle (viso e mani, riconosciuti per colore) sono
spostati verso un rosa piu' caldo (+rosso, -verde e
-blu in proporzione). Disegno, capelli, barba,
giacca e sfondo invariati; i nomi dei file sono gli
stessi degli originali. Confronto prima/dopo in
`controllo/`.

## B. Sirena in cala (in `consegna/sirena-cala/`, 3 file)

Stessa tela 1720x1320 per i tre stati, stessa ancora:
centro scafo a x=860, linea della sabbia (base dello
scafo) a y=1180. Scafo largo 1560 px nel file (circa
430 px in gioco, file a ~3,6x).

- `sirena-cala-relitto.png`: scafo spezzato e
  sventrato, senza alberi, alghe e sabbia sul
  fasciame; a poppa il nome sbiadito «ena» (la
  bandierina rossa a poppa e' nel disegno).
- `sirena-cala-riparazione.png`: stesso scafo con
  **tre punti di riparazione** gia' segnati dalle
  tavole nuove sulla fiancata, e un albero mozzo.
  Centri dei tre punti sulla tela (pixel, +-40):
  (410, 830), (700, 850), (1070, 830) — sono i punti
  dove centrare le falle di
  `muse/2026-11-16-passo3-cap2/`.
- `sirena-cala-riparata.png`: scafo intero, albero
  con vele ammainate, pronta a salpare.

Ombra morbida sulla sabbia inclusa in tutti e tre.

## Cosa manca
- Pupazzi degli altri personaggi: fatto solo il
  Capitano di prova, come chiesto. Se il metodo e'
  approvato, procedo col Marinaio e gli altri.
- Nient'altro: correzioni, Briciola, Capitano rosa e
  Sirena sono completi.

STATO: pronto
