# Rocce v2 — forma originale, design nuovo (16 novembre 2026)

Correzione della consegna `2026-11-16-nuovi-disegni/` su richiesta di Davide:
le rocce del nuovo design (monolite sfaccettato per i massi, frammenti
geometrici sparsi per i detriti) erano troppo diverse dalle rocce che il
gioco aveva. Questa v2 tiene **la forma e la composizione delle rocce
originali** e ci applica sopra **la modalità di design nuova**.

## Cosa è uguale alle originali

- Sagoma, composizione e **canale alpha identici byte per byte** agli sprite
  originali dei sorgenti (`boulder-rA`, `boulder-rB`, `rub-rubble`,
  `rub-rubbleS` in `sorgenti/`): il masso grande torna il gruppo di blocchi
  accatastati con il muschio a destra, il piccolo torna il masso tondo con la
  crepa in cima, i detriti tornano i due blocchi spaccati con la corona
  d'erba/muschio e i frammenti alla base, nella stessa disposizione.
- Misure e ancore invariate: boulder-a 114×160 (disegno 57×80, ancora
  28,5,78), boulder-b 90×92 (disegno 45×46, ancora 22,5,44), rubble 259×181
  (disegno 74×51,6, ancora 37,49,6), rubbleS 175×92 (disegno 50×26,3, ancora
  25,24,6). Collisioni invariate.

## Cosa è del design nuovo

- Superficie a **faccette/strati**: ogni regione di pietra delimitata dalle
  linee scure riceve una luce leggermente diversa, come nei massi nuovi.
- Rampa pietra **grigio-beige calda** (quella del nuovo design) invece del
  grigio freddo originale; regola viva del 15 nov: colori saturi, pastello
  colorato mai sbiadito.
- **Crepe, contorni e giunture restano marrone molto scuro/quasi nero** come
  negli originali e nel nuovo design.
- **Muschio vivo** (rampa verde satura) esattamente dove l'originale lo
  aveva: fianco destro del masso grande, cima del piccolo, corone dei
  detriti.
- Lavaggi morbidi a bassa frequenza e grana di carta, seed fissi
  (`rocce_v2.py`).

## File e controlli

- 4 sprite `.png.b64`: `boulder-a`, `boulder-b`, `rubble`, `rubbleS`.
  Sostituiscono le rocce di `2026-11-16-nuovi-disegni/`; tutto il resto di
  quella consegna (pozza, grotta, berry, set riva, sassolini) resta valido,
  i sassolini da bosco erano già in questa modalità.
- `controllo/confronto-rocce.png.b64`: per ogni roccia, su erba vera del
  gioco — originale | nuovo design | questa v2.
- `controllo/rocce-v2-su-sabbia.png.b64`: le 4 v2 sulla sabbia vera.
- Verifica automatica in fase di generazione: l'alpha di ogni file v2 è
  uguale byte per byte a quella dell'originale corrispondente (lo script si
  ferma in caso contrario); dimensioni esatte come in tabella.

STATO: pronto
