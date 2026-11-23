# Richieste arretrate — 23 novembre 2026

Risposta al PROMPT in questa cartella. Stile: quello di Sirena v2 / Pino
Alto (dipinto, contorno scuro sottile, luce da alto-sinistra). Nessun pezzo
ha sabbia o ombra disegnata sotto: le ombre le mette il gioco.

## A. Tartarughe di mare — `consegna/A-tartarughe/` (16 file)

Viste dall'alto, testa a destra, tela 192×144, ancora al centro (96,72) =
centro del guscio. Ciclo di nuoto a 8 fotogrammi per pelle:

- `tartaruga-verde-1..8.png` — tartaruga verde, guscio a esagoni.
- `tartaruga-cucciola-1..8.png` — la cucciola.

Metodo: un unico master dipinto tagliato in corpo + 4 pinne con cerniera
alla radice (come i pupazzi); le anteriori remano in fase (±24°), le
posteriori timonano in controfase (±9°), il guscio sale e scende appena
(±2 px in tela) con un rollio lieve. Fotogramma 1 = posa del master.
La cucciola è lo stesso ciclo in scala 0,68 con toni un poco più chiari
(dichiarato: non è un secondo disegno). Versione specchiata non serve,
come da prompt. Pagina di controllo su mare in `controllo/`.

## B. Barchetta — `consegna/B-barchetta/` (6 file + ancore.json)

Ridisegnata nello stile di Sirena v2 (legno caldo, vele panna, contorno
scuro), stesso disegno di prima: navigazione con carico legato, vela a
toppe a mezz'asta, bandierina con la moneta, lanterna a prua; attraccata
con bancarella aperta, bancone con merce, ombrello, vela ammainata.
Tele e ancore identiche ai file del 20 novembre (ancore.json incluso:
navigazione (180,302), attraccata (180,246), fronte (130,326), spalle
(126,326)). Le versioni verso sinistra sono gli specchi di quelle verso
destra, come nella consegna vecchia (dichiarato anche allora).
**Scia e ombra non sono più consegnate**: il prompt dice che il gioco
mette le sue. Merce e cartello-moneta non sono stati ridisegnati (sono
pezzi da spiaggia separati, fuori dalla richiesta).

## B. Mercante — `consegna/B-mercante/` (9 file)

Personaggio ridisegnato con la cura nuova: stessa identità (cappello
prugna con piuma dorata, sciarpa arancione, giacca prugna piena di
tasche, borsa con bottiglie, tappeto arrotolato, cannocchiale,
campanelli/chiavi/bussola alla cintura, sorriso furbo e pizzetto),
proporzioni da adulto come le camminate di Nives/Tito.

- `mercante-fronte-fermo.png`, `mercante-fronte-offre1.png` (mano aperta
  con monete), `mercante-fronte-offre2.png` (forzere aperto con gemma):
  tela 336×376, figura a piena altezza con base a y=375, come i vecchi.
- `ritratto-mercante-{neutro,felice,serio,preoccupato,sorpreso,triste}.png`:
  tela 256×256, busto alto 250 px con cima a y=6, come i vecchi.
Le camminate del mercante non sono state rifatte: la richiesta elenca
fermo, offre 1 e 2 e i ritratti.

## C. Pupazzi — `consegna/C-pupazzi/<personaggio>/` (12 personaggi)

Rifatti TUTTI con la proporzione testa/corpo delle camminate approvate.
Il problema dei corpi del 22 novembre era la base: per Nives, Gnocco e
Tito il fermo usato era un disegno diverso dalle camminate (altra faccia,
testa più grande); per il Capitano la base era a statura ridotta.
Ora le basi SONO i frame delle camminate:

- nives, tito, gnocco, ferro, giacomo, pip, dodo: base = il passo con i
  piedi più vicini per vista (fronte/profilo/spalle), Pip e Dodo hanno il
  loro fermo fronte. I pezzi sono tagliati da quel disegno, quindi testa e
  statura coincidono con le camminate per costruzione.
- capitano: basi = i fermi del set (fronte/profilo/spalle) a statura
  piena, già con il viso roseo del punto D.
- marinaio: base invariata (veniva già dal set pulito approvato).
- mercante: base invariata (proporzione già coincidente con le sue
  camminate: testa 141 px contro 142 misurati).
- cormorano-3, cormorano-5: basi invariate (non hanno camminate).

Stessi nomi dei pezzi e stesso schema di `<personaggio>-pezzi.json` delle
consegne del 21–22 novembre (30 pezzi + 3 fermi ricomposti per
personaggio). Ricomposizione verificata: pixel non coperti 0,3–2,5%
(come le consegne approvate). Nota: dove la base è un passo, il fermo
ricomposto mostra la posa delle gambe di quel passo; i pezzi e le
cerniere sono la consegna vera. In `controllo/` una pagina con i 12
fermi ricomposti su erba e sabbia e, per personaggio, il foglio di
confronto base/ricomposto/posa di prova.

## D. Capitano viso roseo — `consegna/D-capitano-rosa/` (21 file)

Stesso disegno, solo carnagione: regola misurata sulla consegna del 21
novembre (guadagni sui soli pixel pelle ×[1,06 / 0,962 / 0,897]: più
rosso, meno giallo), maschera morbida. I file conservano il fondo dei
master come il set originale.

- fermo per le 4 direzioni + passi 1–4 per le 4 direzioni
  (`01-capitano-rosso_<vista>-<posa>.png`, stessi nomi del set).
- `ritratto-capitano-giacca-neutro.png`.

**Nota**: il ciclo del Capitano ha QUATTRO pose per direzione, non sei
(il set è fatto così): sono consegnate tutte e quattro, nessuna inventata.

## E. Strisce di controllo camminate — `controllo/striscia-<personaggio>.png`

Una striscia per personaggio con le pose per direzione affiancate
(righe: fronte, profilo destro, profilo sinistro, spalle), da controllare
prima del montaggio: capitano e marinaio hanno fermo + 4 pose (i loro
cicli sono da 4), gli altri le 6 pose. Le strisce degli altri personaggi
sono composte dai frame già consegnati (le camminate non cambiano in
questa consegna); quella del Capitano è dei frame nuovi del punto D.
I Cormorano non hanno camminate: nessuna striscia.

STATO: pronto
