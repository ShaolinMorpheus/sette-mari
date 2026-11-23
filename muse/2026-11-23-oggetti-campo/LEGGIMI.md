# Oggetti del campo ridisegnati — 23 novembre 2026

Risposta al PROMPT in questa cartella. Stile Sirena v2: contorno scuro
caldo, luci e ombre morbide, legno con venature, ferro opaco, tessuto
con pieghe. Fondo trasparente, niente aloni. Tutti i file sono alla
misura di gioco (1:1, niente ridimensionamenti). I livelli di un oggetto
stanno sulla stessa tela e si sovrappongono senza spostamenti.
Fiamma, vapore e fiamma della candela NON sono disegnati: li anima il
codice, come da prompt.

## 1. Incudine — tela 48×44, appoggio (24, 43) = fondo del ceppo

- `incudine.png` — ceppo tondo con segni di accetta e incudine di ferro
  scuro sopra: corno a destra, piano di battuta consumato con la faccia
  superiore ben visibile (è dove arrivano le scintille).
- `martello.png` — stessa tela: il martello di Nives (manico di legno,
  testa di ferro) appoggiato sul piano dell'incudine; il gioco lo mostra
  quando lei non batte.

## 2. Calderone — tela 64×62, appoggio (32, 56) = centro dei sassi

Ordine di disegno: prima i sassi, poi il tripode, poi il liquido.

- `calderone-sassi-braci.png` — cerchio di sassi con braci accese.
- `calderone-braci-spente.png` — stesso disegno con le braci ridotte a
  cenere (stato spento).
- `calderone-tripode.png` — tre pali legati in cima e calderone di ferro
  nero con bordo e manico.
- `calderone-liquido.png` — il liquido dentro, una sola posa, tono
  caldo; va disegnato SOPRA il tripode (riempie la bocca del calderone).
  Dichiarato: è disegnato a programma dentro la bocca misurata sul
  disegno del calderone, non è un ritaglio.

## 3. Asta con bandierine

- `asta-lunga.png` — tela 156×20, asta da x=3 a x=153, pomolo tondo a
  sinistra.
- `asta-corta.png` — tela 88×20, asta da x=4 a x=84, pomolo a sinistra.
- `corda.png` — tela 40×10: tratto di corda ripetibile, gli estremi
  combaciano (stessa altezza e pendenza) per stenderla a piacere.
- `bandierina-rossa.png`, `-gialla`, `-azzurra`, `-crema`, `-verde` —
  tela 16×24, triangolo con cucitura e piega, bordo superiore a y=1:
  si appendono per il bordo superiore (ancora (8, 1)). Stessa forma per
  tutte, cambia solo il colore. Nota: il prompt chiedeva «4 bandierine»
  ma elencava 5 colori (rosso, giallo, azzurro, crema, verde): sono
  consegnate tutte e 5, una per colore.

## 4. Tavolata — tela 176×92, appoggio (88, 54) = base della tavola

Ordine di disegno: panca dietro, tavola, oggetti, candela, panca davanti.

- `tavolata-panca-dietro.png` e `tavolata-panca-davanti.png` — le due
  panche da ~148 px (stesso disegno: sono due panche uguali). La panca
  davanti scende fino a y=72 nella tela.
- `tavolata-tavola.png` — tavola vuota di assi con le zampe (~160 px).
- Oggetti singoli, ognuno sulla stessa tela alla sua posizione, da
  mostrare o togliere uno a uno: `tavolata-piatto-1..5.png`,
  `tavolata-tazza-1..4.png`, `tavolata-pane.png`,
  `tavolata-ciotola-bacche.png`.
- `tavolata-candela.png` — candela spenta con portacandela; la fiamma
  la anima il codice.

## Controllo

`controllo/controllo-oggetti-campo.png` — i quattro oggetti montati sul
prato del campo (texture del terreno di gioco), ingranditi per la
lettura: tavolata completa, incudine sola e con il martello, calderone
acceso (col liquido) e spento, festone con asta lunga, corda e le 5
bandierine. È la tavola per l'approvazione di Davide prima del montaggio.

STATO: pronto
