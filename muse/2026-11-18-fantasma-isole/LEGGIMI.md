# Pezzi del mare — nave fantasma, isole solo-terra, boe

Da `muse/2026-11-18-richieste-fantasma-isole/PROMPT.md` e dal punto 3
del prompt grotta-personaggi.

## Nave fantasma «Il Gabbiano» (dall'alto, prua a NORD, ancora centro)
- nave-fantasma-dir0 (229x288): master con vele strappate, ragnatele,
  lanterne verdi e nebbia spettrale dipinta. Le altre 7 direzioni le
  ricava Claude per rotazione, come per le navi A3.
- nave-fantasma-alone-dir0 (321x380): lo stesso master con alone
  luminoso verde-mente aggiunto a programma, per la notte.
- nave-fantasma-scafo-dir0 (101x288): solo scafo senza alberi ne'
  vele, da sfumare in trasparenza.
NOTA: sul bordo dell'alone resta una velatura lavanda tenue
(contaminazione della nebbia nel foglio sorgente).

## Isole solo-terra (stessa tela dei pezzi A2, coordinate allineate)
Per ognuna delle 6 isole A2: `<nome>-terra` (solo terra, senza alone
di acqua bassa ne' schiuma: tolti a programma per colore dal pezzo
A2) e `<nome>-maschera` (bianco = calpestabile, nero = no, punto
ROSSO = approdo). Approdi (x, y nella tela del pezzo):
- isola-palme: (379, 566)
- isola-roccia: (394, 388)
- isola-spiaggia: (398, 541)
- isola-laguna: (428, 700)
- isola-gemella: (571, 485)
- isola-albero: (382, 636)
Limiti dichiarati: le maschere sono una prima approssimazione a
programma (sabbia + prato = calpestabile; roccia e acqua = no). La
chioma delle palme puo' risultare calpestabile nella maschera e il
bordo sabbia e' quello della linea d'acqua del disegno: Claude le
rifinisce sul codice. L'approdo e' il punto calpestabile piu' a sud
verso il centro: se un'isola attracca da un altro lato, si sposta
il punto nella maschera.

## Senza alone d'acqua (varianti `-secco`, ritagliate sul pezzo)
faro, 8 scogli, bandierina-rossa, bandierina-oro, banco-sabbia,
secca, pontile: alone e schiuma tolti a programma (regola su
luminosita'/saturazione, calibrata sulle rocce). Limiti: nel faro
resta parte della schiuma dipinta dentro le rocce della base;
scoglio-muschio, secca e pontile sono cambiati poco (il loro alone
era gia' minimo o fa parte del pezzo).

## Boe
- boa-j (192x181): boa rossa A3 con la J bianca dipinta sul fianco
  sud, a programma (carattere tipografico, non dipinto a mano).
- boa-accesa (340x340): boa gialla A3 con alone dorato a programma
  intorno alla lanterna.

Controlli: `controllo/scena-mare.png`, `controllo/secco.png`,
`controllo/maschera-palme.png`, `controllo/terra-check.png`.

STATO: pronto (31 pezzi)
