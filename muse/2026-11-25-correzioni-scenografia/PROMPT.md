# Muse — correzioni alla scenografia del campo (24 nov 2026, sera)

Montando la scenografia nel gioco, molti disegni risultano **tagliati sul bordo superiore della tela**: il contenuto tocca la riga y=0 (e in alcuni casi i lati), quindi nel gioco si vedono pali con la cima piatta, coperchi senza la parte alta, ecc.

## Cosa rifare (tela più alta/larga, con almeno 12 px di margine trasparente su TUTTI i lati)
Il disegno non va ridimensionato né ritoccato: serve solo una tela più grande attorno, con l'ancora (punto d'appoggio) aggiornata di conseguenza. Se la cima era davvero tagliata nel disegno, va completata.

Elementi che toccano il bordo (verificato sui file consegnati):
- **stendino**: `stendino-pali` (pali tagliati in cima, e mancano la traversa/corda tra i due pali), `stendino-panno-calzoni` (tocca il fondo). Inoltre i panni sono molto più grandi dei pali: ridisegna i pali alti almeno quanto i panni, con la corda tesa tra i due pali, e panni in scala.
- **cassa** (baule): `cassa-coperchio-aperto` e `cassa-coperchio-chiuso` tagliati in alto.
- **amaca**: `amaca-palo-destro`, `amaca-palo-sinistro`, `amaca-telo` (pali tagliati in cima).
- **rastrelliera**: `rastrelliera-telaio`; **ceppo-ascia** (ceppo, catasta, ascia); **pila-barili** (barili, telo); **tavolo-cucina** (tagliere, coltello, mortaio e il resto dei livelli); **tavolino-j** (calamaio, diario…); **barca-costruzione** stati 1-3; **barca-remi** (scafo, remi); **cannone** (affusto, canna, calcatoio, palle); **corda-rotolo**; **lanterna** (struttura e vetri toccano sia il lato sinistro sia il destro); **trespolo** (gabbia, palo).
- Controlla comunque TUTTI gli altri elementi consegnati: qualunque livello il cui contenuto tocchi la riga 0 o l'ultima riga/colonna va esteso.

## Regole
- Tutti i livelli di uno stesso oggetto condividono la **stessa tela**, stessa dimensione, stessi offset: se allarghi uno, allarga tutti allo stesso modo. Aggiorna l'ancora e la collisione nel LEGGIMI.
- Nessun contenuto sul bordo: margine ≥ 12 px trasparente su ogni lato, verificato numericamente (alpha del bordo = 0) e a occhio ingrandito.
- Consegna nella stessa cartella con gli stessi nomi (`consegna/…`), così sostituisco i file. Scrivi in `LEGGIMI.md` le nuove misure/ancore.
- Per la cassa: il coperchio aperto deve essere completo (si vede tutto il coperchio sollevato, con le cerniere).
