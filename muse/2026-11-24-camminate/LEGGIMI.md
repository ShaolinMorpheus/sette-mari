# Camminate rifatte — Ferro, Nives, Gnocco, Tito, Giacomo (24 novembre 2026)

**Correzione serale (24 nov):** la prima versione di questa consegna
era costruita sulle copie in `movimento-visi/camminata/`, che però NON
contenevano tre correzioni già consegnate il 20/21 novembre. Ora le
sorgenti sono quelle corrette:

- **Nives, profilo-sinistro 1–6**: le copie in movimento-visi
  guardavano a DESTRA (erano i frame pre-correzione); sostituite con
  le correzioni del 21 novembre, che guardano a sinistra. La direzione
  di TUTTI i profili sinistri è stata verificata anche numericamente
  (confronto con lo specchio del profilo destro): 5 personaggi × 6
  frame, tutti rivolti a sinistra.
- **Tito, fronte-passo6 e spalle-passo6**: le copie in movimento-visi
  avevano la testa tagliata sul lato sinistro (berretto e orecchio
  troncati); sostituite con le correzioni del 21 novembre, teste
  intere, verificate ingrandite.
- **Gnocco, profilo-destro-passo2 e profilo-sinistro-passo2**:
  sostituite con le correzioni del 20 novembre (destro senza lembi
  del frame vicino sul bordo; sinistro col nodo del fazzoletto
  completo dentro la tela).

Nota su Tito: nei profili, il braccio visibile (quello davanti) è
disegnato in avanti in 4 frame su 6 e in basso negli altri 2 — così è
nei disegni originali, non è un effetto del montaggio; un'alternanza
delle braccia più marcata richiederebbe di ridisegnare le pose del
braccio nei profili.

Per ogni personaggio: **6 fotogrammi × 4 direzioni** (fronte, spalle,
profilo-destro, profilo-sinistro) + `fronte-fermo`, tela 336×376, in
`consegna/<personaggio>/<direzione>-passoN.png.b64`.

## Metodo (cambiato dopo i CONTROLLI OBBLIGATORI)

Le versioni precedenti erano animate ricomponendo i burattini: i pezzi,
ruotando, uscivano dalla sagoma e mostravano bordi tagliati. Questa
versione parte invece dai **frame disegnati originali delle camminate**
(un solo disegno intero per fotogramma, nessuna ricomposizione):

- **Direzioni corrette**: negli originali, Gnocco `profilo-sinistro`
  passi 3–6 guardavano a destra; quei 4 frame sono stati **specchiati**
  (il disegno resta lo stesso). Tutti gli altri profili guardavano già
  dalla parte giusta e non sono stati toccati.
- **Scala e ancora uniformi**: i disegni originali riempivano la tela
  (testa a y=0, piedi a y=375, margine zero). Ogni personaggio è stato
  scalato con **un unico fattore per tutti i suoi 25 frame** (0,9574;
  Tito 1,0 perché è più basso) in modo che la figura più grande entri
  con **almeno 8 px di margine** da ogni bordo; piedi ancorati alla
  stessa riga in tutti i frame (fondo figura a y 366–367), figura
  centrata in orizzontale. Pose, ordine dei passi e disegno invariati.
- **Pulizia**: rimossi solo eventuali granelli isolati da 1–3 px
  (4 frame in tutto); sfondo trasparente, nessun residuo.
- **Fermo**: stesso disegno originale, portato alla stessa scala e
  ancora dei passi (altrimenti fermo e passo 1 avrebbero dimensioni
  diverse). Per Giacomo il fermo coerente con queste camminate è quello
  del set B (`giacomo-b-frame`: capelli lunghi e giacca rossa); quello
  del set A (cappello rosso con «J» e maglia a righe) è un altro
  disegno e NON è stato usato.

## Controlli obbligatori — esito frame per frame

Ogni frame è stato guardato ingrandito su fondo chiaro E scuro e
misurato: figura intera (testa, tronco, entrambe le braccia, entrambe
le gambe, entrambi gli stivali), una sola componente connessa (niente
fantasmi o sovrapposizioni), margine ≥ 8 px su tutti i lati, piedi
alla stessa ancora, direzione del profilo corretta in tutti e 6.

- **Ferro** — fronte 1–6: ok · spalle 1–6: ok · profilo-destro 1–6: ok · profilo-sinistro 1–6: ok · fronte-fermo: ok
- **Nives** — fronte 1–6: ok · spalle 1–6: ok · profilo-destro 1–6: ok · profilo-sinistro 1–6: ok · fronte-fermo: ok
- **Gnocco** — fronte 1–6: ok · spalle 1–6: ok · profilo-destro 1–6: ok · profilo-sinistro 1–2: ok · profilo-sinistro 3–6: ok (specchiati, ora guardano a sinistra) · fronte-fermo: ok
- **Tito** — fronte 1–6: ok · spalle 1–6: ok · profilo-destro 1–6: ok · profilo-sinistro 1–6: ok · fronte-fermo: ok
- **Giacomo** — fronte 1–6: ok · spalle 1–6: ok · profilo-destro 1–6: ok · profilo-sinistro 1–6: ok · fronte-fermo: ok

Audit numerico su tutti i 125 frame: 1 componente connessa per frame,
margine minimo ≥ 8 px, fondo della figura a y 366–367 in tutti.

## Capitano e Marinaio — NON rifatti

Il loro ciclo approvato è di **4 pose** per direzione: portarlo a 6
avrebbe richiesto pose inventate. Se servono a 6, vanno disegnati due
passi nuovi per direzione.

## Controllo

`controllo/controllo-<personaggio>.png`: le 4 direzioni × 6 fotogrammi
sull'erba del gioco, con il fermo in testa alla riga del fronte.

STATO: pronto
