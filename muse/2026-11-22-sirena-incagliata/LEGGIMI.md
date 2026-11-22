# Sirena incagliata — nave e sabbia in un'unica immagine

La Sirena di profilo v2 (`2026-11-22-sirena-profilo`) con la sabbia **fusa
nello stesso sprite**. Tela 1720×1320, sfondo trasparente, stessa nave,
stesse proporzioni e stessa posizione: ancora centro scafo x=860, base
chiglia y=1180. Si monta al posto dello sprite della nave, stesse
coordinate.

## Versione 2 — correzioni (CORREZIONI.md)

La versione 1 è stata provata in gioco e NON andava: la sabbia era una
lastra enorme (triangolo pieno sotto la prua, rettangolo sotto lo scafo con
bordo dritto) e il colore era più chiaro e grigio della sabbia del gioco.
Rifatta da capo secondo le correzioni:

- La sabbia è **solo una fascia stretta attorno alla chiglia**. Sopra arriva
  al bordo inferiore della cinghia scura (linea misurata sullo sprite,
  colonna per colonna); sotto sporge di ~30 px dalla linea della chiglia
  (mai oltre ~40) e **segue la diagonale della prua**. Niente area davanti
  alla prua, niente triangolo, niente rettangolo.
- La punta della prua ha il suo cumulo, ma stretto: segue la linea dello
  scafo e si chiude a punta lungo la diagonale; ne emerge solo la punta.
- Fondo della scaletta e timone stanno dentro la fascia: in quei due punti
  il bordo inferiore si gonfia in un cumulo largo e dolce (pendenza ~1–2 px
  per colonna) per coprire il piede della scala e la punta del timone.
- Bordo esterno sfumato e irregolare ovunque, a onde, mai dritto (fade di
  ~30 px con rumore sul bordo).
- Colore: **giallo-ocra caldo come la spiaggia** — la texture sabbia del
  gioco tal quale, con i suoi sassolini scuri e chiari, conchiglie e grana.
  (La desaturazione della versione 1 è stata tolta: era lei a renderla
  chiara e grigia.)
- Dettagli (sassolini extra, una conchiglia, steli secchi) solo dentro la
  fascia: fuori dalla fascia non resta nulla di sabbia, come si vede
  nell'anteprima su acqua.

## File

- `consegna/sirena-incagliata.png` — l'immagine unica: nave v2 + fascia di
  sabbia fusa.
- `controllo/anteprima-sirena-incagliata.png` — l'immagine montata in scala
  di gioco su tre fondi veri del gioco: acqua (sopra, il controllo chiesto
  dalle correzioni: fuori dalla fascia sottile non resta nulla), sabbia del
  terreno (centro: la fascia quasi sparisce, il colore è il suo), erba
  (sotto).

## Note

- Solo lo stato giorno, come da prompt (immagine unica). Lo stato notte si
  può ricavare con la stessa trasformazione della nave notte, su richiesta.
- Bordo pulito verificato: nessun pixel opaco entro 8 px dalla cornice.
- Non manca niente: consegna completa come da prompt e correzioni.

STATO: pronto
