# Sirena con scafo in vista — versione di profilo 3/4 della nave del campo

**Versione 2** (correzioni sulla versione 1, stesso disegno e stesse ancore):
- **Scafo appoggiato a terra**: l'ombra ora è un'ombra di contatto ricavata dalla sagoma
  della nave — parte dalla linea di contatto e corre sotto tutta la nave — e il fondo
  dello scafo ha una fascia di affondamento: chiglia e timone affondano un po' nella sabbia,
  niente più effetto «sospeso».
- **Scala fino a terra**: prolungata di due pioli in continuazione con la stessa corda
  e gli stessi montanti, fino a toccare il suolo.
- **Via il contorno rosato**: il bordo esterno è scuro come le linee interne (marrone
  molto scuro sul legno, blu scuro sulle vele); tolte anche le pennellate magenta rimaste
  dentro il disegno (sottoprua e sartiame). Controllati bandiera, sartiame e punta della prua.

La `nave-campo-integra` della consegna creature/alberi era quasi tutta dall'alto: si vedeva
solo il ponte e i fianchi non si leggevano. Questa è la stessa nave ridisegnata con
**vista 3/4 e camera alta inclinata di circa 35–40°**: il ponte resta visibile, ma il fianco
dello scafo dal lato della riva si vede bene — fasciame orizzontale, due cinghie scure,
fila di cannoniere quadrate, linea di galleggiamento scura verso il fondo, poppa arrotondata
con cassero e timone. Stessa nave: stessi legni caldi, stesse vele blu raccolte ai pennoni,
stessa bandiera rossa a poppa, stessa scala di corda, che qui scende lungo il fianco visibile
fino a terra. Stile dipinto, contorno scuro sottile, luce da in alto a sinistra.

## File

- `consegna/nave-campo-integra.png` — tela 1720×1320, nave appoggiata a terra con ombra
  morbida sotto lo scafo inclusa.
- `consegna/nave-campo-notte.png` — stessi pixel, toni della sera a programma.
- `controllo/anteprima-nave-profilo.png` — la nave in scala di gioco su sabbia (sopra)
  e su erba (sotto).

## Misure e ancora (misurate sul file consegnato)

- **Centro scafo x=860**: punto medio dell'estensione dello scafo da poppa a prua
  (bandiera esclusa), come da ancora richiesta.
- **Base y=1180**: fondo della chiglia. Il timone a poppa scende circa 60 px sotto la
  linea della chiglia, dentro l'ombra: in spiaggia si pianta nella sabbia.
- Bordo pulito: nessun pixel opaco entro 8 px dalla cornice della tela (verificato,
  alfa massima sulla cornice = 0), nessun contorno di altro colore.

## Note

- I nomi dei file sono gli stessi della versione dall'alto (`nave-campo-integra`,
  `nave-campo-notte`), così questa versione può prendere lo stesso posto nel gioco.
  La versione dall'alto nella consegna `2026-11-22-richieste-creature-e-alberi` non è
  stata toccata.
- Non manca niente: consegna completa dei due stati richiesti (giorno e notte).

STATO: pronto
