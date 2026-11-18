# Mondo C — Sirena guidata

La Sirena grande dall'alto, da guidare: 4 stati x 16 direzioni = 64
frame, piu' 6 accessori.

## Convenzione direzioni
dir0 = prua a NORD (in alto); dir1..dir15 in senso orario a passi di
22,5 gradi (dir1 = NNE, dir2 = NE, dir4 = EST, dir6 = SE, dir8 = SUD,
dir10 = SO, dir12 = OVEST, dir14 = NO). Le direzioni sono rotazioni
a programma dello stesso master dir0 (alfa premoltiplicato, niente
aloni scuri); ancora = centro del file in ogni direzione; la misura
della tela varia con la rotazione (master lungo al massimo 448 px,
piu' grande delle navi di A3 che sono 288).

## Stati
- gonfie: vele spiegate, nave in assetto da navigazione;
- ammainate: vele serrate sui pennoni, alberi nudi;
- danneggiata: vele strappate e bruciate, albero di mezzo spezzato,
  assi mancanti sul ponte, un cannone rovesciato;
- riparata: vele pulite e toppe di legno chiaro su scafo e ponte.

## Accessori
scia-prua (V di schiuma da mettere a prua), scia-lunga (scia dritta),
cannone-alto (cannone visto dall'alto, per i ponti), equipaggio-
capitano, equipaggio-bandana, equipaggio-biondo (omini dall'alto:
testa, spalle e cappello, da spargere sul ponte).

## Note
- Il timone e i cannoni laterali sono gia' disegnati nei master
  (ponte dettagliato); gli accessori servono per le varianti.
- Bussola di controllo in `controllo/bussola-16.png`: le 16
  direzioni in senso orario da nord, verificate a vista.

STATO: pronto (70 pezzi)
