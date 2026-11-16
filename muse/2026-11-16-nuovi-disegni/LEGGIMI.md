# Disegni 2026-11-16 (secondo giro) — pozza, grotta, berry, rocce nuove, set riva

Nuovo giro di sprite per «Sette Mari», disegnati a programma (Python/PIL,
supersampling 4× e downscale, lavaggi acquerello + grana di carta, seed fissi:
`comune.py`, `disegni.py`, `disegni2.py`; verifiche in `verifica.py`).
Regole di stile applicate: **regola viva permanente del 15 nov 2026** — colori
vivi e saturi, pastello/acquerello colorato mai sbiadito, fogliame più verde e
saturo, linee scure (crepe, contorni pietra) marrone molto scuro/quasi nero,
sfondo trasparente, **nessun bordo rettangolare né taglio netto**: sagome
organiche e ombra a terra che sfuma fino ad alpha 0 prima del bordo immagine.

## Tabella misure e ancore

| file | file (px) | ancora | note |
|---|---|---|---|
| rockpool.png.b64 | 168×96 | file (42, 38); disegno 42×24, ancora (10,5, 9,5) | pozza PIENA ridisegnata: anello irregolare di sassi tondi sfaccettati, acqua azzurra trasparente con riflessi, cozze scure a gruppi sulle pietre a filo d'acqua, piccole conchiglie in acqua, alghe verdi vive su sassi e in acqua |
| rockpool0.png.b64 | 168×96 | file (42, 38); disegno 42×24, ancora (10,5, 9,5) | pozza VUOTA: stessa passata e stessa disposizione di sassi e acqua della piena; solo acqua e sassi — niente molluschi, niente alghe |
| grotta.png.b64 | 364×335 | 70,125,7 | massa rocciosa a strati (bande con luci dall'alto e ombre, faccette), crepe scure, muschio fitto e liane pendenti ai lati dell'entrata, entrata scura profonda quasi nera con archi interni e piccolo bagliore caldo in fondo, sassi alla base. Ingombro come l'originale `bld-mina.png` |
| berry.png.b64 | 128×118 | disegno 64×59, ancora disegno (32, 57) | stessa sagoma/alpha dell'originale `art-berry.png` (alpha identica byte per byte); foglie verdi vive; **tutte le bacche rosse** accese con punto luce (18 grappoli, nelle posizioni dell'originale) |
| berry0.png.b64 | 128×118 | disegno 64×59, ancora disegno (32, 57) | stessa sagoma/alpha; **solo foglie verdi pulite**: niente bacche, niente rami, ombre e contorni solo in verdi profondi |
| boulder-a.png.b64 | 114×160 | disegno 57×80, ancora (28,5, 78) | masso grande, NUOVO design: roccia sfaccettata a strati, crepe scure, muschio in cima |
| boulder-b.png.b64 | 90×92 | disegno 45×46, ancora (22,5, 44) | masso piccolo, stesso design |
| rubble.png.b64 | 259×181 | disegno 74×51,6, ancora (37, 49,6) | detriti dopo picconata, nuovo design: 11 frammenti/schegge separati da trasparenza, niente base |
| rubbleS.png.b64 | 175×92 | disegno 50×26,3, ancora (25, 24,6) | detriti piccoli: 7 frammenti, stesso stile |
| sasso-a.png.b64 | 56×40 | centro-basso del disegno | **MISURA NUOVA** — sassolino singolo con muschio, da sparpagliare nel bosco |
| sasso-b.png.b64 | 64×44 | centro-basso del disegno | **MISURA NUOVA** — coppia di sassolini |
| sasso-c.png.b64 | 48×36 | centro-basso del disegno | **MISURA NUOVA** — sassolino singolo piccolo, senza muschio |

## Set riva (per la riva, da rimontare più avanti)

Misure file come gli shell già in `st/`; varianti a/b con tonalità e/o
orientamento diversi. Ombra di contatto sfumata sotto ogni pezzo.

| file | file (px) | note |
|---|---|---|
| conchiglia-cono-a.png.b64 / -b.png.b64 | 120×71 | cono a bande: a arancio-crema punta a sinistra; b rosa-marrone punta a destra |
| conchiglia-ventaglio-a.png.b64 / -b.png.b64 | 128×122 | ventaglio con coste radiali: a corallo; b viola-rosa |
| conchiglia-spirale-a.png.b64 / -b.png.b64 | 140×116 | spirale centrale con bande: a rosa-crema; b dorata |
| stella-marina-a.png.b64 / -b.png.b64 | 120×110 | a arancio vivo; b rosa-rosso; braccia arrotondate, puntini in rilievo |
| rametto-a.png.b64 / -b.png.b64 | 150×60 | legno spiaggiato sbiancato, curvo (curvature opposte), rametto laterale, crepe e nodo scuri |
| sassolini-riva-a.png.b64 / -b.png.b64 | 110×64 | gruppetti di 5 sassolini lisci colorati (terracotta, azzurro-grigio, crema, verdino / rosa, azzurro, ocra) |

## Verifiche eseguite (script `verifica.py`, output in `verifica-output.txt`)

- **Dimensioni**: tutti i 24 file alla misura esatta dichiarata in tabella.
- **Pozze e grotta — niente rettangoli**: alpha massimo sul bordo del canvas
  = 1/255 (ringing del downscale, di fatto trasparente) per rockpool,
  rockpool0 e grotta; margine trasparente su tutti i lati (pozze: 19/15/17/4
  px sx/alto/dx/basso; grotta: 31/19/26/4); frazione opaca massima per
  riga/colonna ≤ 0,85 (nessuna riga o colonna piena).
- **berry**: pixel bacca (rosso-dominanti, R−G ≥ 60, alpha > 200) = 428;
  **pixel bacca non-rossi = 0**; anche nella banda debole (25 ≤ R−G < 60)
  = 0 — nessuna bacca scura o marrone.
- **berry0**: su 10.412 pixel opachi — pixel con luminanza < 70 = **0**
  (luminanza minima 73,3); pixel con R ≥ G (marroni/rossi/grigi caldi) =
  **0**; pixel rosso-dominanti = **0**. Soglie usate: luminanza
  0,299R+0,587G+0,114B < 70 e R ≥ G, su pixel con alpha > 200.
- **Alpha berry/berry0 identica byte per byte** a quella di
  `art-berry.png` originale: vero per entrambe.
- **Aloni bianchi = 0** su tutti i file (pixel semitrasparenti alpha
  25–199 con RGB tutti > 235). Restano 161 pixel totali di ringing
  Lanczos con alpha 1–24 e RGB > 235: contributo < 10%, invisibile.

## Metodo e limiti dichiarati

- Disegno interamente a programma: forme organiche da poligoni/ellissi con
  jitter a seed fisso, faccette e strati per la pietra, lavaggio a bassa
  frequenza e grana finale. Le forme disegnate a programma restano un po'
  più piatte e regolari di un dipinto a mano, soprattutto nelle conchiglie
  del set riva (bande e coste geometriche) e nel fogliame di berry/berry0
  (foglie a rombo ripetute, senza rami visibili — in berry0 è voluto:
  l'utente ha vietato punti scuri/marroni, quindi niente rami).
- Bug trovato e corretto nel metodo: in Pillow 10 `ImageDraw.Draw(img,
  "RGBA")` sostituisce i pixel invece di fonderli — le forme
  semitrasparenti sopra parti opache bucano l'alpha creando aloni. Tutte
  le primitive ora passano da un layer temporaneo composto con
  `alpha_composite` (classe `Disegno` in `comune.py`).
- Le pozze piena e vuota condividono la stessa funzione di layout
  (`layout_pozza()`, stesso seed): disposizione dei sassi identica per
  costruzione, la vuota salta solo cozze, alghe e conchiglie interne.
- Anteprime sui fondi veri in `controllo/`: `anteprima-erba.png` (grotta,
  berry, berry0, massi, detriti, sassi bosco su texture erba) e
  `anteprima-sabbia-mare.png` (pozze e set riva su sabbia + mare giorno).
  Nessun alone bianco visibile.

STATO: pronto
