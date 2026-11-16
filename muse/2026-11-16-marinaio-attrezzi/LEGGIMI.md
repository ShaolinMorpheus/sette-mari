# Marinaio — fotogrammi di lavoro fronte e spalle (16 novembre 2026)

Completamento del set `muse/2026-11-14-abiti/02-marinaio-completo/`: mancavano i
fotogrammi di lavoro di fronte e di spalle (esistevano solo di profilo destro).
Qui ci sono i **30 fotogrammi mancanti**, in `frame/` come `.png.b64`, con gli
stessi nomi dei file esistenti più il suffisso di vista:

- `02-marinaio-righe_ascia-taglio1…6-fronte` e `…-spalle`
- `02-marinaio-righe_piccone-taglio1…6-fronte` e `…-spalle`
- `02-marinaio-righe_mani-nude-colpo1…3-fronte` e `…-spalle`

## Misure, scala, ancoraggio (verificati a programma)

- Canvas **384×427** per tutti, come i fotogrammi di lavoro di profilo
  (gli originali oscillano 426–427 px in altezza: qui uniformati a 427).
- Fondo pieno **(203, 227, 170)**, lo stesso dei frame del set: anche questi
  fotogrammi sono dipinti a tutto canvas come gli esistenti, non ritagli
  trasparenti.
- **Punto d'appoggio dei piedi identico al fotogramma di profilo con lo stesso
  numero** (es. taglio1 → piedi a y=399, taglio2 → y=397, taglio5 → y=409):
  fronte, profilo e spalle si possono alternare senza salti.
- Altezza figura uguale a quella del profilo corrispondente; figura centrata
  a x=192 (il profilo è spostato perché guarda a destra, fronte/spalle sono
  simmetrici).
- Testa completa in ogni fotogramma, con capelli e orecchini come nel set
  (il marinaio non porta bandana in nessun frame esistente: non è stata
  aggiunta).

## Pose e tempi (gli stessi del profilo)

Sequenza a 6 tempi per ascia e piccone: 1 pronto, 2 carica, 3 punto più alto,
4 discesa, 5 colpo, 6 ritorno/follow-through. Mani nude a 3 tempi: 1 guardia
(pugni al mento), 2 colpo a due mani, 3 follow-through piegato.
Di **fronte** l'attrezzo colpisce verso il basso, davanti ai piedi.
Di **spalle** colpisce davanti al personaggio, verso l'alto dello schermo:
nei tempi 4–6 la testa dell'attrezzo si vede oltre le spalle/la testa, e il
viso non si vede mai (solo nuca, orecchie, schiena).

## Come sono stati fatti e controlli

- Fogli dipinti generati sullo stesso personaggio (riferimenti: fronte-fermo,
  spalle-fermo e i fotogrammi di profilo del set), poi taglio delle singole
  figure, normalizzazione di scala e ancoraggio a programma (`taglia.py`).
  Sei fotogrammi usciti storti dai primi fogli (viste sbagliate, due picconi,
  un viso di spalle) sono stati rigenerati con fogli di correzione e sostituiti.
- Controlli fatti: misure e fondo di tutti i 30 file; baseline dei piedi
  contro i profili; lettura visiva delle 5 strisce in `controllo/`.
- Limiti onesti: due fotogrammi di spalle dell'ascia (tempi 4 e 5, le pose
  ritorte della discesa) risultano un poco più compatti degli altri, come
  accade anche tra i profili originali; in alcuni tempi di carica il corpo è
  ruotato di tre quarti, come nel profilo. Se un singolo fotogramma non
  convince, si rigenera solo quello.

## Controllo

`controllo/` contiene le 5 strisce (ascia fronte/spalle, piccone fronte/spalle,
mani fronte+spalle) per la lettura in sequenza.

STATO: pronto
