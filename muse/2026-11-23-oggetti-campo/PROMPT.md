# Per Muse — Oggetti del campo da ridisegnare (23 nov)

Ciao Muse. Nel campo dei Fuggiaschi ci sono quattro oggetti ancora disegnati
"a mano" dal codice (forme semplici, colori piatti): accanto ai personaggi e
alla Sirena nuova si vedono brutti. Ridisegnali nello stile della Sirena v2
(contorno scuro caldo, luci e ombre morbide, materiali riconoscibili: legno
con venature, ferro opaco, tessuto con pieghe).

In `riferimenti/` trovi le foto di Davide dal telefono (sono ruotate di 90°,
girale): `incudine.jpg`, `calderone.jpg`, `asta-bandierine.jpg`, `tavolata.jpg`.

## 1. Incudine su ceppo (`incudine`)
Dove Nives batte il martello. Ceppo di legno tondo con segni di accetta e
incudine di ferro scuro sopra (corno a destra, piano di battuta consumato,
un riflesso).
- ingombro: circa 1 tile (44 px), alto ~40 px; il punto d'appoggio è il fondo del ceppo
- il piano dell'incudine deve avere la faccia superiore ben visibile: è il punto
  dove nel gioco arrivano le scintille
- **serve anche il martello** di Nives (`martello`, 1 sola posa, manico di legno,
  testa di ferro), che il gioco può mostrare appoggiato sull'incudine quando lei
  non batte

## 2. Calderone sul tripode con fuoco (`calderone`)
Tripode di tre pali di legno legati in cima, calderone di ferro nero con il
bordo e un manico, sotto un cerchio di sassi con braci.
- ingombro ~64 × 62 px; punto d'appoggio al centro dei sassi
- consegna **separati** i livelli: (a) sassi + braci, (b) tripode + calderone,
  (c) liquido dentro (una sola posa, tono caldo): la fiamma e il vapore li
  anima il gioco, non disegnarli nel calderone
- **stesso disegno nei due stati** (acceso/spento): lo spento è la stessa
  immagine con le braci ridotte a cenere (`braci-spente`)

## 3. Asta con bandierine (`asta-bandierine`)
Asta orizzontale di legno con pomolo tondo a un'estremità, da cui pende il
festone con le bandierine triangolari (rosso, giallo, azzurro, crema, verde).
- consegna: (a) asta + pomolo in 2 versioni di lunghezza (lunga ~150 px, corta ~80 px),
  (b) **4 bandierine singole** (triangolo con cucitura e piega, ~14 × 22 px), una
  per colore, che il codice appende e fa ondeggiare, (c) la corda del festone come
  tratto ripetibile
- le bandierine hanno tutte la stessa forma, cambiano solo colore

## 4. Tavolata con panca (`tavolata`)
Tavola lunga di assi con piatti, tazze, pane, una ciotola di bacche e una
candela; panche davanti e dietro.
- ingombro ~160 × 50 px (tavola) + due panche da ~148 px; punto d'appoggio al
  centro della tavola, alla base
- consegna a livelli: (a) panca dietro, (b) tavola vuota con zampe, (c) gli oggetti
  sopra (5 piatti, 4 tazze, pane, ciotola) **singoli**, così il gioco può
  mostrarli o toglierli, (d) candela spenta (la fiamma la anima il codice),
  (e) panca davanti
- `tavolata-vista-dall-alto` non serve: il gioco la vede come nella foto, di fronte

## Regole comuni
- fondo trasparente, nessun alone chiaro, nomi di file in minuscolo con trattini
- stessi ingombri e punti d'appoggio indicati sopra, niente ridimensionamenti
  nel gioco: se un oggetto ti viene meglio più grande, dillo nel `LEGGIMI.md`
- tutti i livelli di un oggetto sullo stesso canvas, per sovrapporsi senza spostamenti
- una **tavola di controllo** (contact sheet) con i quattro oggetti montati sul
  prato del campo, per l'approvazione di Davide prima del montaggio

Scrivi solo in `muse/2026-11-23-oggetti-campo/` (`consegna/`, `controllo/`,
`LEGGIMI.md` con `STATO: pronto` quando hai verificato i file sul remoto).
