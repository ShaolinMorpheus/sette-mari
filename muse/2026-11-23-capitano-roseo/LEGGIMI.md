# Capitano viso roseo — completamento, 23 novembre 2026

Risposta al PROMPT in questa cartella. Regola unica, la stessa del 21 e
del 23 novembre: cambia solo la pelle (guadagni misurati ×[1,06 / 0,962 /
0,897] sui pixel pelle, maschera morbida) — più rosso, meno giallo.
Disegno, posa, capelli, barba, vestiti e sfondo sono gli stessi pixel di
prima: fuori dalla maschera pelle i file sono identici agli originali.
Nomi e dimensioni invariati ovunque.

## A. Ritratti — `consegna/ritratti/` (11 file)

Ritoccati (pixel pelle per file: 12.499–14.316):

- `ritratto-capitano-giacca-felice.png`, `-preoccupato`, `-serio`,
  `-sorpreso`, `-triste` (5).
- `ritratto-capitano-marinaio-neutro.png`, `-felice`, `-preoccupato`,
  `-serio`, `-sorpreso`, `-triste` (6).

NON rifatto: `ritratto-capitano-giacca-neutro.png` — già roseo nella
consegna arretrati del 23 nov (punto D) e già montato nel gioco. Nella
striscia di controllo dei ritratti è comunque presente come coppia
originale/roseo, così la famiglia si confronta tutta insieme.

## B. Capitano con gli attrezzi (87 file in tutto con i ritratti)

### `consegna/set-capitano-rosso/` (35 file, set del Capitano)

Tutti ritoccati (pelle rilevata in ogni file, 3.362–7.012 px):

- ascia: `01-capitano-rosso_ascia-taglio1..6-profilo-destro.png` (6).
- piccone: `01-capitano-rosso_piccone-taglio1..6-profilo-destro.png` (6).
- mani nude: `01-capitano-rosso_mani-nude-colpo1..3-profilo-destro.png` (3).
- torcia: fermo + passi 1–4 per fronte, profilo destro, profilo
  sinistro e spalle (20).

Lasciati com'erano, perché già rosei: i fermi e i passi 1–4 delle 4
viste dello stesso set, consegnati rosei negli arretrati del 23 nov
(punto D) — qui non sono duplicati; in `controllo/` c'è la loro striscia
prima/dopo (`striscia-passi.png`).

### `consegna/attrezzi-v5/` (38 file)

Tutti ritoccati (4.069–20.584 px pelle):

- `capitano-corpo-{fronte,profilo-destro,spalle}-{carica,apice,colpo,ritorno}.png` (12).
- `capitano-ascia-…` e `capitano-piccone-…`, stesse viste e fasi (24).
- `master-capitano-ascia.png`, `master-capitano-piccone.png` (2).

Lasciati com'erano: i livelli dei soli attrezzi e le pose del Marinaio
che stanno nella stessa cartella d'origine — non sono il Capitano e i
livelli puri non contengono pelle, la regola non li cambierebbe.

### `consegna/presa-capitano/` (3 file)

Ritoccati: `capitano-presa-fronte.png`, `capitano-presa-profilo-destro.png`,
`capitano-presa-spalle.png` (2.946–12.673 px pelle: di spalle si vedono
collo e braccia). Lasciato com'era `marinaio-presa-spalle.png`, che sta
nella stessa cartella d'origine ma non è il Capitano.

## C. Controllo — `controllo/`

Coppie prima|dopo affiancate, una striscia per gruppo:

- `striscia-ritratti.png` — righe: le 6 espressioni; colonne: giacca
  prima/dopo, marinaio prima/dopo.
- `striscia-passi.png` — le 4 viste, fermo e passi 1 e 3 prima/dopo
  (file degli arretrati del 23 nov, non rifatti qui).
- `striscia-attrezzi-set-rosso.png` — le 35 coppie del set.
- `striscia-attrezzi-v5.png` — le 38 coppie di attrezzi-v5.
- `striscia-presa.png` — le 3 coppie della presa.

Verifica file: i `.b64` sul remoto sono stati confrontati byte a byte
con i locali dopo l'invio (è la verifica d'invio; quella visiva è nelle
strisce qui sopra).

STATO: pronto
