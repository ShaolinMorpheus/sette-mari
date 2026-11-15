# Mare v2 — profondità e mare aperto (15 novembre 2026)

Rifacimento dell'acqua di tutto il gioco: profondità vera dalla riva all'abisso e mare aperto con carattere, nello stesso stile pastello/acquerello del terreno e coerente con le texture della riva in `2026-11-15-mare/` (schiuma 243,248,246; acqua bassa 64,190,205; sabbia asciutta 234,187,79; acqua base del terreno 91,194,196).

**Questa consegna contiene solo la variante GIORNO e l'anteprima di scena. Tramonto e notte arrivano dopo il via libera dell'utente, con la stessa struttura e gli stessi nomi col suffisso -tramonto / -notte.**

## Tavolozza di profondità

`profondita-giorno.png` — striscia 256×1 RGBA, sinistra = riva, destra = abisso. Il motore campiona il colore (e l'alpha) in base alla profondità. Tappe: spiaggia turchese chiarissimo (197,241,232, alpha ~100: quasi trasparente alla riva esatta) → acqua bassa turchese (96,208,200) → acqua media azzurro (45,148,203) → largo blu profondo (25,96,160) → abisso blu notte quasi inchiostro (14,33,53) con una punta di verde-viola nelle zone più scure. Passaggi morbidi (interpolazione smussata), nessuna fascia netta; alpha piena da circa il 10% in poi. In `controllo/tavolozza-giorno-ingrandita.png.b64` la striscia ingrandita a 256×48 per leggerla.

## Mare aperto (opache, tileabili in entrambe le direzioni)

- `mare-largo-giorno.png` (512×512): blu scuro (base ~24,90,152) con macchie chiare e scure da acquerello bagnato.
- `mare-medio-giorno.png` (512×512): azzurro intenso (base ~46,146,203) con luci morbide, stesso stile.

Come sono fatte (importante, dopo il problema delle "bolle"): NESSUNA macchia ovale o cerchio disegnato. La marezzatura nasce da campi di rumore morbido periodico combinati in prodotto: le forme sono irregolari e spezzate come l'acquerello, più uno strato fine ad alta frequenza e bassa ampiezza che rompe le forme grandi. Niente grana digitale, niente bordi netti.

## Strati da animare sopra (RGBA)

- `onde-increspature-giorno.png` (256×256): solo alpha bianca (RGB bianco, alpha nelle linee): linee ondulate sottili, spezzate e rade (copertura ~3%, alpha massima ~70), pensate per scorrere sopra l'acqua. Le linee sono funzioni periodiche con segmenti e dissolvenze: niente effetto griglia.
- `riflessi-giorno.png` (256×256): piccole luci bianche sparse — trattini corti leggermente inclinati, come il sole sull'acqua (copertura ~2,4%). Niente macchie rotonde.

## Anteprima

`anteprima-mare.png`: scena di prova 1024×512 composta con QUESTE texture e quelle della riva: sabbia asciutta, schiuma-bordo sulla linea di riva, colore dalla tavolozza in base alla distanza dalla riva, marezzatura di mare-medio che sfuma in mare-largo, increspature e riflessi sopra. Serve a giudicare l'effetto d'insieme; nel motore la riva è quella vera e animata.

## Controlli di tiling

In `controllo/`: ogni tile accostata 3×3 (le due strati alpha composte sul loro fondo: increspature su mare-medio, riflessi su mare-largo). Nessuna giuntura visibile. Nota onesta: nelle due texture di mare aperto, a 3×3 e guardando con attenzione, la marezzatura grande si percepisce come ripetizione morbida — è la natura di una tile da 512; in gioco la tinta della tavolozza e gli strati animati sopra la coprono. Se in gioco si notasse troppo, la cura è una seconda tile da alternare o la stessa tile ruotata/specchiata a zone.

## Varianti in arrivo e proposta extra

- `-tramonto`: stessi blu più scuri, riflessi caldi arancio-rosa (strato riflessi dedicato), increspature invariate di forma.
- `-notte`: blu notte e viola, luci fredde e poche.
- Proposta a parte — variante `-tempesta`: stessa struttura, tavolozza desaturata verso grigio-verde ardesia, mare più scuro e increspature più fitte e marcate, per i mondi/missioni con maltempo.

STATO: variante giorno pronta — tramonto e notte in attesa di via libera
