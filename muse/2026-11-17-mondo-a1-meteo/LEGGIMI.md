# Mondo A1 — meteo e texture del mare (convoglio / Calvara / grande viaggio)

Primo sottogruppo del mondo A: ciò che mancava allo strato meteo.
Gli strati di mare aperto giorno/tramonto/tempesta sono già in
`2026-11-15-mare-v2` e non sono ridisegnati qui.

## Contenuto
- Mare notte: mare-largo-notte e mare-medio-notte sono le texture
  giorno di mare-v2 gradate a programma (R×0,45, G×0,48, B×0,55+4;
  saturazione media 0,63-0,65 contro 0,54 del giorno: notte fonda ma
  nel registro gessoso). Piastrellatura identica agli originali.
- Ghiaccio per il grande viaggio: 4 pezzi dipinti con bordo di schiuma.
- Fulmini: 3 saette + bagliore, dipinti.
- Onde e spruzzi: 6 pezzi dipinti, desaturati leggermente (×0,85)
  verso la palette del mare.
- Nebbia: 3 banchi dipinti + 1 velatura piastrellabile a programma.
- Pioggia: 1 tile alpha a programma (strisce diagonali, wrap).

Nota onesta: i pezzi morbidi (scia, spruzzi, nebbia, bagliori)
conservano ai bordi più trasparenti una velatura viola tenue
dell'acquerello originale; sul mare si legge come ombra della schiuma.
L'alone magenta dello scontorno è stato rimappato su azzurro-grigio
freddo, non resta beige né rosa carico.

## Tabella pezzi
| pezzo | misura px | ancora / nota | stato |
|---|---|---|---|
| ghiaccio-lastra-grande | 768×715 | centro del pezzo | pronto — lastrone con bordo di schiuma, per banchi e ostacoli grandi |
| ghiaccio-lastra-tonda | 475×469 | centro del pezzo | pronto — lastrone piccolo tondo |
| ghiaccio-frammenti | 374×446 | centro del pezzo | pronto — ghiaccio rotto in frammenti con schiuma (un solo sprite) |
| ghiaccio-sponda | 768×315 | centro del pezzo | pronto — sponda di ghiaccio lunga, schiuma sul lato acqua |
| fulmine-1 | 458×768 | punta inferiore, centro x | pronto — saetta principale, ancora alla punta |
| fulmine-ramificato | 604×768 | punta inferiore, centro x | pronto — saetta con rami |
| fulmine-lontano | 322×745 | punta inferiore, centro x | pronto — saetta sottile e tenue, per lampi distanti |
| fulmine-flash | 768×723 | centro | pronto — bagliore radiale del lampo |
| onda-cresta | 573×446 | centro del pezzo | pronto — cresta d'onda di profilo, per mare grosso e tempesta |
| schiuma-striscia | 768×238 | centro del pezzo | pronto — striscia di schiuma sfrangiata, si ripete/affianca |
| spruzzo-esplosione | 550×490 | centro del pezzo | pronto — spruzzo a raggiera (scafo sull'onda, colpo in acqua vicino) |
| increspatura-anello | 625×535 | centro del pezzo | pronto — anelli concentrici con schiuma (oggetto caduto, pioggia forte) |
| spruzzo-ventaglio | 588×487 | centro del pezzo | pronto — ventaglio di gocce verso l'alto |
| scia-v | 606×626 | vertice basso (poppa) | pronto — scia a V generica per le navi (quella della Sirena resta in sirena-approdi) |
| nebbia-lunga | 768×213 | centro del banco | pronto — banco lungo e sottile |
| nebbia-densa | 768×387 | centro del banco | pronto — banco spesso e tondo |
| nebbia-spezzata | 768×381 | centro del gruppo | pronto — tre chiazze alla deriva in un solo sprite |
| mare-largo-notte | 512×512 | texture piastrellabile; saturazione media 0.65 | pronto — versione notte di mare-largo di mare-v2, stessa piastrellatura |
| mare-medio-notte | 512×512 | texture piastrellabile; saturazione media 0.63 | pronto — versione notte di mare-medio di mare-v2, stessa piastrellatura |
| pioggia-tile | 256×256 | texture alpha piastrellabile, strisce diagonali | pronto — pioggia diagonale, alpha, si ripete senza giunture |
| nebbia-tile | 512×512 | texture alpha piastrellabile, densita' variabile | pronto — velatura di nebbia a densità variabile, alpha, senza giunture |

## Controlli
- controllo/anteprima-notte-ghiaccio.png — mare notte con lastre,
  sponda, nebbia e fulmine montati.
- controllo/anteprima-giorno-onde.png — mare giorno con cresta, scia,
  schiuma e spruzzo montati.

STATO: pronto
