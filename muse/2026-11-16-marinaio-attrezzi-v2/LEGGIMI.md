# Marinaio — fotogrammi di lavoro fronte e spalle, v2 (16 novembre 2026)

Seconda consegna dei 30 fotogrammi di lavoro fronte/spalle del marinaio,
rifatta dopo la RISPOSTA nella cartella `2026-11-16-marinaio-attrezzi`
(non montati: «non sono lo stesso personaggio da uno all'altro»).
Stessi nomi e stesse misure della prima consegna: `frame/` con `.png.b64`,
canvas 384×427, fondo pieno (203, 227, 170), piedi alla stessa baseline del
fotogramma di profilo con lo stesso numero (verificato a programma:
ascia/piccone 399-397-396-407-409-407, mani 394-405-409).

## La regola seguita

Un solo pupazzo, quello dei profili esistenti: testa grande (~un terzo
dell'altezza), corpo tozzo, maglia a righe blu scuro fitte su busto E
maniche lunghe, cintura scura con fibbia, pantaloni blu, stivali marroni.
Tra un fotogramma e l'altro cambiano solo braccia, busto e attrezzo.
Pose meno estreme: busto diritto o appena inclinato, niente pieghe a 90°,
niente tre quarti; di fronte il viso si vede sempre, di spalle mai.

## Come è stata ottenuta l'uniformità

- **Tenuti dalla prima consegna (11)**: quelli che la RISPOSTA approvava o
  bocciava solo per la maglia — ascia-fronte 1, ascia-spalle 1,
  piccone-fronte 1, 2, 3, 5, piccone-spalle 1, mani-fronte 1, 2, 3,
  mani-spalle 1. I modelli indicati nella RISPOSTA (piccone-spalle 1–3,
  mani-spalle 1, piccone-fronte 1, mani-fronte 1) sono stati usati come
  riferimento del personaggio per i fogli nuovi.
- **Rigenerati (19)**: tutti gli altri, con fogli ancorati ai fotogrammi
  approvati come riferimento del personaggio e pose meno estreme.
  Il generatore ha scambiato ascia e piccone in due fogli: i fotogrammi
  sono stati assegnati per contenuto (attrezzo e posa), non per foglio.
  ascia-spalle 5 è specchiato a programma perché il colpo cadesse dallo
  stesso lato della serie (il personaggio di spalle è simmetrico).
- **Maglia ridipinta a programma su tutti i 30**: la maglia è l'elemento
  che variava di più tra un disegno e l'altro, quindi busto e maniche di
  ogni fotogramma sono stati ridipinti con le righe dei profili — periodo
  25 px, banda 11, navy (47,62,99) su bianco (228,223,213), fase allineata
  alle righe già presenti sul busto e ombreggiatura originale conservata.
  La regione è fatta crescere dal busto lungo la stoffa, così segue le
  maniche in qualsiasi posa e si ferma alla cintura (pantaloni intatti).

## Controlli allegati

`controllo/` contiene le tre strisce di confronto richieste: per ascia,
piccone e mani nude, la serie di fronte sopra, la serie di profilo
esistente in mezzo, la serie di spalle sotto. Testa, larghezza del busto
e maglia coincidono tra le tre righe; i piedi stanno sulla stessa linea
dentro ogni serie.

## Limiti onesti

- piccone-fronte 2 (tenuto dalla prima consegna) ha la testa girata di un
  pelo verso la carica: non era tra i fotogrammi bocciati per vista, ma è
  il meno frontale dei trenta.
- ascia-fronte 5 è la posa più raccolta della serie (il colpo a terra):
  busto diritto, ma le gambe sono più aperte degli altri tempi.
- La ridipintura della maglia è piatta rispetto al disegno originale:
  le righe sono regolari e identiche ovunque — è il prezzo dell'uniformità,
  ed è quello che la RISPOSTA chiedeva.

STATO: pronto
