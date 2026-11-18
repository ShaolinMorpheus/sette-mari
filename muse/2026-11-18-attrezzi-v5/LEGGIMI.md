# Attrezzi rifatti — corpo e attrezzo separati (v5)

Metodo nuovo, come richiesto: il personaggio NON cambia piu' da un
frame all'altro perche' corpo e attrezzo sono livelli separati.

## Corpi (24 file `*-corpo-*`)
Marinaio e capitano rosso, viste fronte/spalle/profilo-destro,
4 pose del gesto (carica, apice, colpo, ritorno), mani VUOTE
giunte come se stringessero un manico. Tela 336x376, stessa scala
e stessa riga dei piedi del set marinaio (normalizzazione sul
master). I corpi di un abito vengono da UN solo foglio per abito.

## Livelli attrezzo (48 file + 4 master)
Per ogni abito esiste UN solo disegno master per attrezzo
(`master-marinaio-ascia`, `master-marinaio-piccone`,
`master-capitano-ascia`, `master-capitano-piccone`): ascia o
piccone con la mano chibi che lo stringe e il polsino del proprio
abito. I 48 livelli sono quel master ruotato a programma intorno
al punto di presa — l'attrezzo e' identico in ogni frame, non
ridisegnato. Livello gia' posizionato sulla tela del corpo:
si disegna sopra il corpo e la presa cade sulle mani.

## punti.json
Per ogni livello: corpo abbinato, `mano` (x,y della presa nella
tela del corpo), `angolo_gradi_orari_da_verticale` applicato
(carica -50, apice -15, colpo +55, ritorno 0), `presa_nel_master`,
`specchiato` (il profilo usa il master specchiato, lama in avanti).

## Limiti dichiarati
- I livelli `apice` stanno su tela 336x500 con 124 px di margine
  sopra (nel json: `tela`, `margine_sopra`, `mano_nella_tela`),
  perche' con le mani sopra la testa l'attrezzo intero non entra
  nella tela 336x376: nella 376 verrebbe tagliata la testa
  dell'attrezzo. Il corpo va disegnato 124 px piu' in basso.
- Le ancore delle mani sono misurate a occhio sui fogli di
  contatto (controllo/): precisione di qualche pixel, coperta
  dalla mano del livello attrezzo.
- Il corpo marinaio spalle-apice e' stato ritagliato a mano
  (nel foglio la figura si sovrapponeva a un doppione) e ha un
  alone caldo leggermente piu' marcato degli altri frame.
- Le pose sono quelle del gesto a due mani: niente versione a
  una mano.

STATO: pronto (76 pezzi + punti.json)
