# Sirena incagliata — nave e sabbia in un'unica immagine

Come da `PROMPT.md`: la Sirena di profilo v2 (`2026-11-22-sirena-profilo`)
con la sabbia **fusa nello stesso sprite** — niente strato separato da
sovrapporre (lo strato separato resta in `2026-11-22-sirena-sabbia`, arrivato
alla versione 4; questa immagine lo sostituisce dove serve la nave già
incagliata). Tela 1720×1320, sfondo trasparente, stessa nave, stesse
proporzioni e stessa posizione: ancora centro scafo x=860, base chiglia
y=1180.

## La sabbia

- Stesso disegno delle consegne sabbia v3/v4: riempimento con la texture
  sabbia del gioco desaturata alla tavolozza della spiaggia della cala
  (beige pallido, misurato sullo screenshot di gioco), con sassolini scuri e
  bianchi, conchiglie, granelli, macchie umide e qualche stelo d'erba secca.
- Copre **per intero** la parte nera e scura sotto lo scafo: il bordo
  superiore segue, colonna per colonna, il fondo dell'ultima cinghia scura
  (misurato sullo sprite), dalla poppa con il timone fino alla **punta della
  prua rialzata**: il cumulo sale lungo la diagonale della chiglia e la prua
  è interrata anche lì — ne emerge solo la punta sopra la cinghia. Resta
  visibile solo il fasciame chiaro con le cannoniere e la cinghia scura.
- Coperti anche il timone e il fondo della scaletta di corda (il piede della
  scala è dentro la sabbia): niente pezzi appesi nel vuoto.
- Davanti alla prua il cumulo scende con un profilo da duna: ripido sotto la
  punta, poi si appiattisce in un grembiule basso. Nessuna lastra
  rettangolare, nessun taglio dritto, nessuna scia verso l'acqua.
- Bordi esterni irregolari e sfumati verso la trasparenza (alpha graduale
  su 30–60 px, con rumore sul bordo). La sabbia sporge al massimo ~78 px
  sotto la chiglia (base y=1180, zero a y≈1258).

## File

- `consegna/sirena-incagliata.png` — l'immagine unica: nave v2 + sabbia
  fusa. Si monta al posto dello sprite della nave, stesse coordinate.
- `controllo/anteprima-sirena-incagliata.png` — l'immagine montata in scala
  di gioco su tre fondi veri del gioco: sabbia della riva (sopra), erba
  (centro) e acqua (sotto). Sulla sabbia il cumulo si confonde col terreno;
  su erba e acqua si vede la chiazza con la prua interrata.

## Note

- Solo lo stato giorno, come da prompt (immagine unica). Lo stato notte si
  può ricavare con la stessa trasformazione della nave notte, su richiesta.
- Bordo pulito verificato: nessun pixel opaco entro 8 px dalla cornice.
- Non manca niente: consegna completa come da prompt.

STATO: pronto
