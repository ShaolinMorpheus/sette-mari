# Capitolo 4 — pezzi nuovi (Blocco C)

31 pezzi.

## Isola bassa del primo mare (3)
- `isola-bassa.png`: l'isola dell'approdo finale vista
  dall'alto, anello di spiaggia chiara, una palma,
  alone di acqua bassa come le isole del mondo A2.
- `scogliera-bottiglia.png`: la scogliera di lato da
  cui si lancia la bottiglia, pianoro piatto sul mare.
- `punto-alto-bandiera.png`: il punto alto con il palo
  nudo dove piantare la bandiera.

## Stella bassa a ovest (3)
`stella-bassa-1/2/3.png`: sprite 256x256, alone morbido
e scintillio a 4 punte (a programma); il frame 2 e' il
picco di luce, 1 e 3 sono uguali e piu' tenui: ciclo
1-2-3-2.

## I sei mari (8)
Texture d'acqua 512x512 ripetibili (a programma, nel
registro gessoso del mare approvato, marezzatura solo
da rumore, niente ovali; ripetibilita' verificata sui
bordi): `mare-correnti.png` (con strie di corrente),
`mare-nebbia.png` (pallido), `mare-relitti.png`
(scuro), `mare-bonaccia.png` (chiaro e piatto),
`mare-stella.png` (blu notte), `mare-ultimo.png`
(verde petrolio scuro). Piu' la nebbia a strati:
`nebbia-strato-1.png` e `nebbia-strato-2.png`
(trasparenti, ripetibili, da sovrapporre a velocita'
diverse).

## Cassa del Cormorano e bottiglia (3)
- `cassa-cormorano-chiusa.png`: forziere col cormorano
  dipinto sul coperchio. `cassa-cormorano-aperta.png`:
  lo stesso, aperto, con la bandiera scura del
  Cormorano piegata dentro.
- `icona-bottiglia-vuota.png`: bottiglia vuota con una
  sola riga sull'etichetta.

## Collezione e cappellino (9)
- Sei icone 160x160, una per mare: `icona-mare-correnti`
  (vortice), `icona-mare-nebbia` (banco di nebbia con
  vela), `icona-mare-relitti` (albero spezzato),
  `icona-mare-bonaccia` (sole piatto), `icona-mare-stella`
  (stella), `icona-mare-ultimo` (onda-porta).
- `ritratto-biscotto-stella.png`: busto per i dialoghi
  col cappellino a stella (cappuccio blu notte con la
  stella dorata). `biscotto-stella-gioco.png`: lo
  stesso cappellino sul pappagallo intero per il gioco.

## Pagine per il Diario (5)
- `diario-officina-nives.png`: schizzo dell'officina
  (forgia e incudine). `diario-lista-gnocco.png`: la
  lista del mercato con disegnini e righe.
  `diario-mappa-tito.png`: la mappa dove il mare
  finisce, rotta tratteggiata fino al bordo stellato.
  Le scritte sono righe finte, nessun testo leggibile.
- `icona-diario-giacomo.png`: il diario di bordo aperto
  con scrittura a mano (righe finte) e una nave
  disegnata in angolo.
- `icona-campanella.png` e `campanella-albero.png`: la
  campanella di bordo d'ottone, icona e versione appesa
  alla trave dell'albero con la scaletta di corda.

Foglio di contatto in `controllo/`.

## Limiti dichiarati
- Mari e nebbia sono a programma: danno il colore e
  l'atmosfera di ogni mare; la marezzatura dipinta
  resta quella dei set mare gia' consegnati.
- Il busto di Biscotto col cappellino e' centrato
  sulla testa (il cappuccio e' alto): nella cornice
  tonda si vede bene.

STATO: pronto (Blocco C completo: 31 pezzi)
