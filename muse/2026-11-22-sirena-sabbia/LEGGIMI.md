# Sabbia attorno alla Sirena — letto di sabbia da sovrapporre allo scafo

**Versione 4** (correzione dell'utente, 22 nov 2026): il letto ora copre per
intero la fascia nera della carena. Il bordo superiore della sabbia segue,
colonna per colonna, il fondo dell'ultima cinghia scura (misurato sullo
sprite: scan dal basso, carena nera → fascia calda → cinghia), con cumuli di
sabbia smossa lungo il bordo: resta visibile solo il fasciame chiaro con le
cannoniere e la cinghia scura, nessun pezzo di carena nera, dalla poppa con
il timone (la linea segue quella della poppa) fino alla scala, il cui piede
resta dentro la sabbia. Dove la prua si solleva da terra, l'ammasso segue la
curva finché lo scafo è basso, poi lascia lo scafo e scende come una rampa
fino alla lingua sotto la punta: l'ultimo tratto di scafo che si alza resta
scoperto, come la prua di una nave arenata — un ammasso non può salire
verticale lungo la prua. Se serve coperta anche quella, dirlo e la alzo.

**Versione 3** (correzioni dallo screenshot di gioco dell'utente, 22 nov 2026):
1) la sabbia arriva fino alla punta — una lingua di sabbia corre sotto la prua
sollevata e oltre la punta (fino a x≈1660, assottigliandosi), così tutto lo
scafo sta sulla sabbia; 2) il colore è quello della spiaggia vera attorno alla
cala (il cerchio a sinistra nello screenshot dell'utente): beige pallido e poco
saturo. La spiaggia della riva NON è il giallo dorato della texture interna
`terreno-sabbia`: misurata sullo screenshot (notte, stessa luce per entrambe),
la spiaggia rende mediana ~(93, 85, 69) contro il (220, 176, 77) della texture
dorata. Il riempimento resta la texture del gioco — stessa grana, sassolini,
conchiglie e macchie umide — ma desaturata (saturazione ×0,42) fino alla
tavolozza della riva: mediana del pezzo (228, 212, 164), stessa famiglia di
toni della spiaggia misurata.

**Versione 2** (stesso design del terreno del gioco): la versione 1 era liscia e di un
beige più chiaro e opaco della spiaggia, e si vedeva come una chiazza a parte. Ora il
riempimento è la **texture sabbia vera del gioco** (`2026-11-14-mappa-v2/terreno-sabbia`,
ripetuta a specchio dentro la sagoma): stesso colore giallo dorato e caldo, stesse
variazioni ocra e marroncine, stessa grana con granelli e puntini scuri, macchie umide,
tanti sassolini piccoli di grigio, beige e marrone, conchiglie e qualche stelo d'erba
secca — gli stessi dettagli della spiaggia attorno. Ingombro ridotto: solo sotto e
attorno alla nave, dentro l'ingombro dello scafo con una piccola frangia; i bordi
sfumano nel terreno e i sassolini continuano oltre il bordo.

Pezzo trasparente da disegnare **sopra** la Sirena di profilo
(`2026-11-22-sirena-profilo`, versione 2), con la stessa tela e la stessa ancora:
1720×1320, centro scafo x=860, base chiglia y=1180. Va montato nelle stesse
coordinate dello sprite della nave, sopra di esso.

La sabbia sale lungo i fianchi fino al bordo del fasciame chiaro, sotto
l'ultima cinghia scura, e copre per intero la parte nera e scura della
carena: chiglia, timone e piede della scala spariscono nell'ammasso, con
cumuli di sabbia smossa lungo il bordo superiore. Così la nave sembra
infossata nella sabbia invece che appoggiata sopra.

## File

- `consegna/sirena-sabbia.png` — il letto di sabbia: fascia bassa della tela e
  ammasso lungo i fianchi fino alla cinghia, il resto è trasparente.
  Riempimento con la texture sabbia del gioco desaturata alla tavolozza della
  riva, cumuli lungo il bordo superiore, sassolini e conchiglie.
  Niente bordo scuro: i margini (sotto e ai lati) sfumano a zero nel terreno.
- `consegna/sirena-sabbia-notte.png` — stessi pixel, toni della sera a programma
  (stessa trasformazione della nave, così di notte combaciano).
- `controllo/anteprima-sirena-sabbia.png` — la Sirena v2 con il letto di sabbia
  montato, in scala di gioco, sulla sabbia della riva (sopra, la texture del
  gioco desaturata alla tavolozza della spiaggia della cala) e sull'erba vera
  del gioco (sotto, `terreno-erba`). Sulla riva il letto non si distingue dal
  terreno — è la stessa sabbia — e si legge l'ammasso che sale lungo i fianchi
  fino alla cinghia, con la carena nera tutta coperta; sull'erba si vede la
  chiazza di spiaggia sotto tutta la nave, punta compresa.

## Note

- Bordo pulito verificato: nessun pixel opaco entro 8 px dalla cornice.
- Nessun contorno di altro colore: riempimento dalla texture del gioco e
  dettagli aggiunti solo con toni di sabbia, pietra e conchiglia.
- Non manca niente: consegna completa dei due stati richiesti (giorno e notte).

STATO: pronto
