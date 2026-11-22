# Sabbia attorno alla Sirena — letto di sabbia da sovrapporre allo scafo

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

La sabbia sale attorno alla parte bassa dello scafo — chiglia, timone e piede
della scala — e lo copre per circa 10–14 px lungo la linea di contatto nella
zona centrale; verso prua e poppa, dove lo scafo si alza dalla spiaggia, il
letto resta a terra e gli passa sotto. Così la nave sembra infossata nella
sabbia invece che appoggiata sopra.

## File

- `consegna/sirena-sabbia.png` — il letto di sabbia: solo la fascia bassa della
  tela, il resto è trasparente. Riempimento con la texture sabbia del gioco,
  piccoli cumuli lungo il bordo superiore, sassolini e conchiglie.
  Niente bordo scuro: i margini (sotto e ai lati) sfumano a zero nel terreno.
- `consegna/sirena-sabbia-notte.png` — stessi pixel, toni della sera a programma
  (stessa trasformazione della nave, così di notte combaciano).
- `controllo/anteprima-sirena-sabbia.png` — la Sirena v2 con il letto di sabbia
  montato, in scala di gioco, su un pezzo di spiaggia vera del gioco (sopra, la
  texture `terreno-sabbia`) e sull'erba vera del gioco (sotto, `terreno-erba`).
  Sulla spiaggia il letto non si distingue dal terreno — è la stessa sabbia —
  e si legge solo il contatto attorno allo scafo; sull'erba si vede la chiazza
  di spiaggia sotto la nave.

## Note

- Bordo pulito verificato: nessun pixel opaco entro 8 px dalla cornice.
- Nessun contorno di altro colore: riempimento dalla texture del gioco e
  dettagli aggiunti solo con toni di sabbia, pietra e conchiglia.
- Non manca niente: consegna completa dei due stati richiesti (giorno e notte).

STATO: pronto
