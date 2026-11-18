# Galeone visto dall'alto — pezzi per la mappa a caselle

Versione dall'alto dei pezzi del mondo B, per la mappa a caselle:
ogni pezzo sta su una tela 256x256 (la casella da 44 px esportata
a 256), ancora al centro, trasparente.

## Pezzi
cannone-dir0 (bocca in alto) e dir1/dir2/dir3 ricavati per
rotazione; scala; botola-chiusa; botola-aperta; porta; cella
(grata di sbarre, i vuoti sono trasparenti); lanterna (da sopra,
alone caldo nel disegno); tavolo-mappa (carta astratta, nessuna
scritta); timone; forziere; baule; letto (cuccetta con cuscino
in alto e coperta).

## Superfici ripetibili (opache, 256x256)
pavimento-micro: tavole verticali, bordi saldati a programma
(metodo offset) per ripetersi senza giunta netta — NON e' il
pannello da stanza del mondo B. parete-micro: travi scure con
bulloni, stesso trattamento; e' la sommita' della parete vista
dall'alto. Prova di piastrellatura 3x3 con pezzi in
`controllo/scena.png`: le giunte si confondono con le venature,
ma a guardar bene la ripetizione si intuisce ogni 256 px.

## Limiti dichiarati
- Il cannone visto dall'alto si legge con una punta di 3/4 per via
  delle ruote dell'affusto: resta leggibile e orientato.
- Il forziere ha il coperchio bombato e si legge un po' di fronte:
  come icona di casella funziona, dichiarato.
- La saldatura delle piastrelle sfuma i bordi: al centro di ogni
  piastrella la trama e' quella dipinta, ai bordi e' mediata con
  la meta' opposta.

STATO: pronto (17 pezzi)
