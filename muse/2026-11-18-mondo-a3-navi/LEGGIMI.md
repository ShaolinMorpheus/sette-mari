# Mondo A3 — Navi dall'alto (8 direzioni x 3 stati) e boe dall'alto

Terzo sottogruppo del mondo A. Navi viste dall'alto per il mare del
convoglio e il Mare di Calvara, stesso stile della Sirena.

## Convenzione direzioni (uguale per tutti i file)
- `dir0` = prua a NORD (in alto). Le altre sono rotazioni ORARIE di 45
  gradi: dir1 = NE, dir2 = E, dir3 = SE, dir4 = S, dir5 = SO, dir6 = O,
  dir7 = NO.
- Le 8 direzioni di ogni nave sono rotazioni a programma dello stesso
  master dir0 (rotazione con alfa premoltiplicato, niente aloni scuri):
  la nave e' identica in tutte le rotte, cambiano solo le dimensioni
  della tela; **ancora = centro del file** in ogni direzione.
- Stati: `integra`, `danneggiata` (vele strappate, albero spezzato,
  bruciature), `affondata` (relitto a fior d'acqua con detriti e botti
  intorno; il disco chiaro intorno al relitto e' l'acqua bassa dipinta
  nel pezzo e si fonde col mare).
- Lunghezza massima dei master 288 px; il motore scala a piacere.

## Master (dir0; le altre direzioni derivano da questi)
| pezzo | misura |
|---|---|
| nave-pattuglia-integra-dir0 | 69x288 |
| nave-mercantile-integra-dir0 | 154x288 |
| nave-brigantino-integra-dir0 | 148x288 |
| nave-galeone-integra-dir0 | 141x288 |
| nave-giocatore-integra-dir0 | 126x288 |
| nave-pattuglia-danneggiata-dir0 | 231x288 |
| nave-mercantile-danneggiata-dir0 | 225x288 |
| nave-brigantino-danneggiata-dir0 | 266x288 |
| nave-galeone-danneggiata-dir0 | 273x288 |
| nave-giocatore-danneggiata-dir0 | 212x288 |
| nave-pattuglia-affondata-dir0 | 288x259 |
| nave-mercantile-affondata-dir0 | 288x268 |
| nave-brigantino-affondata-dir0 | 250x288 |
| nave-galeone-affondata-dir0 | 252x288 |
| nave-giocatore-affondata-dir0 | 283x288 |
| boa-rossa | 192x181 |
| boa-verde | 192x180 |
| boa-gialla | 192x181 |

File totali: 120 navi (5 tipi x 3 stati x 8 direzioni) + 3 boe.
Le boe dall'alto (rossa, verde, gialla; ancora centro) chiudono la
mancanza dichiarata in A2.

## Note e limiti dichiarati
- La **pattuglia integra** e' venuta molto stretta e affusolata (un
  cutter veloce, 69x288 circa): coerente come nave piccola e rapida,
  ma se Claude o l'utente la vogliono piu' "nave" e meno "lancia",
  la ridisegno in un giro dedicato.
- Il **mercantile** negli stati danneggiata/affondata ha lo scafo
  quasi tondo (il "pancione" del disegno sorgente): e' la sua sagoma,
  costante tra i tre stati.
- Le vele della nave del giocatore danneggiata hanno macchie rosse
  (gli accenti rossi della nave sulle vele strappate): si leggono come
  toppe rosse, non come sangue, alla scala di mappa.
- Controlli in `controllo/`: bussola con le 8 direzioni del giocatore
  e scena di mare con galeone, brigantino danneggiato, relitto e boa.

STATO: pronto (123 pezzi)
