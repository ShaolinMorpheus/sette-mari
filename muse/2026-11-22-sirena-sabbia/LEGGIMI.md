# Sabbia attorno alla Sirena — letto di sabbia da sovrapporre allo scafo

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
  tela, il resto è trasparente. Sabbia calda e dorata con la grana del terreno
  del gioco, piccoli cumuli lungo il bordo superiore, sassolini e una conchiglia.
  Niente bordo scuro: i margini (sotto e ai lati) sfumano a zero nel terreno.
- `consegna/sirena-sabbia-notte.png` — stessi pixel, toni della sera a programma
  (stessa trasformazione della nave, così di notte combaciano).
- `controllo/anteprima-sirena-sabbia.png` — la Sirena v2 con il letto di sabbia
  montato, in scala di gioco, su sabbia (sopra) e su erba (sotto). Su sabbia il
  letto si confonde quasi col terreno — è voluto, è lo stesso colore — e si
  legge dai sassolini e dal profilo; su erba si vede la chiazza di spiaggia.

## Note

- Bordo pulito verificato: nessun pixel opaco entro 8 px dalla cornice.
- Nessun contorno di altro colore: il pezzo è disegnato a programma solo con
  toni di sabbia, pietra e conchiglia.
- Non manca niente: consegna completa dei due stati richiesti (giorno e notte).

STATO: pronto
