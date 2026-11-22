# Creature e alberi — blocchi A, B, C, D, E

Risposta a `PROMPT.md` di questa cartella. Tutti i pezzi in `consegna/`, fogli di contatto e anteprime in `controllo/`. Stile dipinto morbido e caldo come i personaggi e la Sirena in cala; verdi vivi secondo la regola di stile del 15 nov.

## A — Granchio (13 frame, 160×112, ancora (80,84))

`granchio-fermo`, `cammina-1..4` (laterale verso destra; la sinistra la specchia il codice), `spavento-1..2`, `scappa-1..3`, `scava-1..3`. Corallo con zampe più chiare, chele asimmetriche, occhi su stelo, conchigliette sul dorso; scala unica da fermo per tutti i frame; ombra morbida inclusa (a programma per gli stati che non scavano).
**Limite dichiarato**: gli spavento sono di fronte, sollevati sulle zampe con le chele alzate — si leggono come «si impenna di paura», non sono la vista laterale degli altri frame.

## B — Rana (11 frame, 96×72, ancora (48,62))

`rana-ferma`, `respira-1..2` (gola che si gonfia), `salto-1..5` verso destra (carica, stacco, volo, atterraggio, assestamento — tutti sulla stessa ancora: il corpo che sale e scende è nel disegno, gli scostamenti da terra del foglio sono conservati), `gracida-1..3` (sacco vocale gonfio). Verde-oliva, pancia chiara, occhi crema, macchioline scure; scala unica dalla ferma.

## C — Pino Alto e pino maestro

- `pino-alto.png` — 760×1920, ancora base tronco (380,1888). Piattaforma con parapetto esattamente a 744 px file dalla base. **La scala di corda è disegnata a programma**: montanti ondulati e piroli, centrata 64 px file a destra dell'asse del tronco, dalla base alla piattaforma — posizione fissa e precisa, da usare per la salita. Chioma a ciuffi dietro la piattaforma, ombra morbida a terra sulla destra.
- `pino-alto-notte.png` — stessi pixel, toni della sera applicati a programma.
- `pino-maestro.png` — 672×1204 (1,75× il pino normale), tronco dritto, pochi rami in basso; `pino-maestro-ceppo.png` 336×238.

## D — Pini e alberi del bosco

- Pini: 4 varianti, file 384×688, ancora base tronco (192,656). Alberi a foglia larga: 6 varianti, file 432×584, ancora (216,552). Per ogni variante: `intero`, `scosso-1..2`, `caduta-1..3` (cade verso destra).
- `pino-ceppo.png` e `foglia-ceppo.png` — 192×136, **uguali per tutte le varianti della stessa specie**, come chiesto.
- Gli scosso sono rotazioni di ±2,2° intorno alla base, i caduta rotazioni di 25°/55°/83°, ricavati a programma dallo stesso intero.
- **`caduta-offsets.json`** (in `consegna/`): nei frame di caduta la base del tronco **non sta all'ancora** — per tenere l'albero caduto intero dentro la tela senza rimpicciolirlo troppo, il disegno è centrato nella tela e appoggiato a terra. Per ogni frame di caduta il file dà `[dx, dy]`: posizione della base del tronco rispetto all'ancora, in pixel del file (dx negativo = a sinistra dell'ancora, dy negativo = più in alto). Intero e scosso hanno la base all'ancora.
- I ceppi sono composti a programma: corteccia con i colori campionati dal tronco della specie e faccia di taglio con anelli.
- Residuo dichiarato: vicino alla base di qualche pino può restare un alone quasi invisibile dello schizzo del foglio originale (sotto la soglia di visibilità alla misura di gioco, 96×172).

## E — Nave del campo dall'alto (1720×1320)

`nave-campo-integra.png` — stesso scafo, legni e vele raccolte blu scuro della Sirena ormeggiata del 17 nov, vista dall'alto, ormeggiata alla riva con la scala di corda sul fianco della riva già nel disegno. Ancora: centro scafo x=860, base y=1180, come la Sirena in cala.
`nave-campo-notte.png` — stessi pixel con i toni della sera applicati a programma.

## Cosa manca ancora

Niente nei blocchi A–E. Restano da montare (già consegnati in precedenza, non rifatti qui): gli interni capanne del blocco E del 20 nov e la Sirena ormeggiata del 17 nov.

STATO: pronto
