# Mare in movimento — texture per la riva viva (15 novembre 2026)

Texture richieste per la logica della riva viva (acqua bassa mobile e onde che viaggiano dal largo verso la spiaggia, implementazione di Claude nel motore). Stesso stile pastello/acquerello del terreno già consegnato, colori campionati dalle texture in `2026-11-14-mappa-v2/` (sabbia asciutta mediana 234,187,79; acqua 91,194,196). Disegnate a programma con rumore morbido periodico: niente grana digitale, niente bordi netti, niente bianco bruciato (schiuma al massimo 243,248,246 con alpha <= 234).

## Le 4 texture (RGBA, fondo trasparente)

- `sabbia-bagnata.png` (256×256): sabbia scura e satura come appena coperta dall'acqua (mediana ~152,113,45, cioè la sabbia asciutta scurita), con ondulazioni morbide (7 periodi per lato) e qualche riflesso chiaro. Alpha piena al centro e sfuma a trasparente ai bordi (finestra morbida sul 16% esterno): è fatta per stare SOPRA la sabbia asciutta lungo la fascia di riva, senza cuciture tra segmenti vicini. Il disegno è tileabile; è l'alpha che sfuma ai bordi.
- `schiuma-bordo.png` (256×128): striscia di schiuma bianca irregolare con bolle, anelli e merletto; si ripete in ORIZZONTALE senza giunture (disegnata con riporto sui lati). Più densa e compatta sul lato superiore (bordo ondulato con fase propria), si dissolve verso il basso in bolle e filamenti.
- `schiuma-scia.png` (256×128): la scia che resta quando l'acqua si ritira: bollicine sparse e filamenti, molto più rada e trasparente della striscia di bordo (alpha mediana ~0, massimi locali ~200 solo dove le bolle si sovrappongono). Ripetizione orizzontale senza giunture.
- `acqua-bassa.png` (256×256): velo d'acqua bassa da ripetere senza giunture in entrambe le direzioni. Rifatta più pulita e più satura di quella in mappa-v2: colore 64,190,205 con alpha ~150 e luci morbide chiare, perché alla trasparenza prevista sopra la sabbia dorata la versione precedente virava al giallo-verde; così resta turchese e lascia vedere il fondo.

## Controlli

In `controllo/`: anteprime 3×3 di ogni texture, composte su fondi di prova — sabbia-bagnata e acqua-bassa sopra la sabbia asciutta consegnata, schiuma-bordo sopra l'acqua, schiuma-scia sopra la sabbia bagnata. Nessuna giuntura visibile nelle direzioni di ripetizione previste. Nota tecnica: l'RGB sotto i pixel (quasi) trasparenti è valorizzato col colore proprio della texture, così il filtraggio del motore non sbava colori estranei ai bordi.

STATO: pronto
