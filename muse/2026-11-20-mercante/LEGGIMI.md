# Il mercante di passaggio — personaggio nuovo (punto C)

33 pezzi, personaggio disegnato da zero: mercante
ambulante di mare, tondo e furbo, sui 50 anni. Cappello
a larghe tese viola prugna con piuma dorata, giacca
lunga prugna piena di tasche e borsellini, sciarpa
arancione, anelli alle dita, grande borsa a tracolla
con bottiglie, tappeto arrotolato e cannocchiale;
dalla cintura penzolano campanelli, chiavi e una
bussola d'ottone. Viso unico (sorriso furbo, pizzetto
a punta), diverso da tutti gli altri personaggi.
Colori: prugna e oro, caldi.

- `mercante-fronte-fermo.png`: il fermo.
- `mercante-fronte-offre1.png`: pesa/valuta una moneta
  con la mano aperta e un sopracciglio alzato.
- `mercante-fronte-offre2.png`: mostra la merce, un
  cofanetto aperto con un gioiello.
- Camminata 6 pose per direzione (24 frame): fronte,
  spalle, profilo-destro, profilo-sinistro, tela
  336x376, fattore 1,0, piedi sulla riga del marinaio,
  borsa che dondola al fianco. Falcata marcata nei
  profili; di fronte il passo si legge dai piedi sotto
  la giacca lunga.
- `ritratto-mercante-<espressione>.png` (6): busto
  256x256 per i dialoghi, 3/4 verso destra, stessa
  testa e stesso cappello in tutte: neutro (sorriso
  furbo), felice, preoccupato, serio, sorpreso, triste.

Fogli di contatto in `controllo/`.

## Limiti dichiarati
- Nell'offre1 la moneta sul palmo si legge poco a
  dimensione di gioco: la posa e' di valutazione a
  mano aperta; se serve la moneta piu' grande e
  visibile, rigenero la singola posa.
- Il mercante non ha pose di combattimento (non e'
  un combattente) e non ha il fermo di spalle/profilo:
  come per gli altri, il fermo base e' quello di fronte.

STATO: pronto (completi fermo, offre1-2, camminata
24 frame e 6 ritratti)
