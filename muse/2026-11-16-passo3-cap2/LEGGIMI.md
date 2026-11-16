# Passo 3 — disegni per il Capitolo 2 e la nave (16 novembre 2026)

I disegni definitivi per le missioni del Cap. 2 finora montate con
segnaposto a codice (RISPOSTA in `2026-11-16-sistemazione-capitoli`):
Briciola e i suoi oggetti, la Sirena in navigazione, le falle dello scafo,
il panorama della collina e la boa. Tutti i file sono a 4× la misura di
disegno, sfondo trasparente (tranne i panorami, che sono fondali pieni),
nessun bordo rettangolare: gli alpha sfumano ai margini.

Nota sul punto 6 della richiesta (marinaio con attrezzi fronte/spalle):
è già consegnato in `muse/2026-11-16-marinaio-attrezzi-v2/` con la regola
del pupazzo unico dei profili e la maglia ridipinta su tutti i 30
fotogrammi; questa cartella non lo duplica.

## Tabella misure e ancore (misure di disegno; file = ×4)

| File | Disegno | Ancora (disegno) | Note |
|---|---|---|---|
| `sirena-vele-gonfie.png` | 320×200 | (160, 113) centro scafo sulla linea d'acqua | prua a destra; scafo lungo ~295, circa il doppio della zattera (150×92) |
| `sirena-vele-ammainate.png` | 320×200 | (160, 113) — stesso canvas e stessa ancora | vele serrate sui pennoni; scafo allineato pixel per pixel alla versione gonfia (controllo in `controllo/controllo-allineamento-sirena.png`): lo scambio di stato non sposta la nave |
| `scia-schiuma.png` | 350×90 | (340, 45) bordo destro, da agganciare alla poppa | la schiuma si assottiglia verso sinistra e ai lati, alpha morbido |
| `panorama-collina-giorno.png` | 480×270 | — (fondale pieno 16:9) | vedetta del Pino Alto: rami di pino ai bordi, isoletta a destra, convoglio di tre navi all'orizzonte |
| `panorama-collina-tramonto.png` | 480×270 | — | stessa identica composizione ricolorata calda: navi e isola non si muovono tra le due versioni |
| `falla1-aperta.png` / `falla1-chiusa.png` | 90×70 | (45, 35) centro | sagoma orizzontale larga |
| `falla2-aperta.png` / `falla2-chiusa.png` | 90×70 | (45, 35) centro | sagoma tonda |
| `falla3-aperta.png` / `falla3-chiusa.png` | 90×70 | (45, 35) centro | sagoma lunga e bassa |
| `icona-asse-scafo.png` | 48×48 | (24, 24) centro | icona inventario: asse nuova chiara, due chiodi |
| `boa-spenta.png` / `boa-accesa.png` | 56×64 | (28, 54) sulla linea d'acqua | corpo rosso vivo con fascia bianca e segnale giallo; accesa = fanale acceso e alone morbido; i due stati condividono canvas e ancora (canvas ingrandito nella correzione, vedi sotto) |
| `briciola-fermo.png` | 62×46 | (31, 44) tra le zampe | in piedi, di lato, coda su |
| `briciola-seduta.png` | 52×46 | (26, 44) alla base | seduta, guarda in su |
| `briciola-sdraiata.png` | 74×37 | (37, 35) alla base | sdraiata, muso sulle zampe |
| `cuccia.png` | 108×84 | (54, 74) alla base | assi di legno, ingresso tondo buio, paglia; il disegno è 88×64 come prima, il canvas è ingrandito (correzione sotto) |
| `cesto.png` | 88×68 | (44, 57) alla base | cesto da viaggio in vimini, manici di corda, tela crema dentro; disegno 68×48 come prima su canvas ingrandito |

Le tre falle sono coppie rigorose: aperta e chiusa sono costruite sulla
stessa sagoma esterna, con la stessa ancora e — verificato a programma
dopo la correzione — la stessa estensione dei pixel opachi al pixel
(scarti 0 su tutti e tre i lati di tutte e tre le coppie): lo scambio di
stato non sposta niente, né la tavola chiusa è più piccola del buco
aperto. Aperta = fasciame vecchio con buco nero frastagliato, schegge e
crepe; chiusa = assi nuove più chiare (palette dello scafo della nave in
cala) con chiodi.
Vanno sopra il disegno della nave in cala (scafo 430×330): nell'anteprima
in `controllo/` sono applicate a circa 138×107 px sul file sorgente
660×526, che è la loro dimensione reale in gioco.

## Anteprime (`controllo/`, su fondi veri)

- `anteprima-mare-navigazione.png` — Sirena a vele gonfie con scia e boa
  accesa sul mare nuovo.
- `anteprima-mare-ammainata.png` — Sirena a vele ammainate e boa spenta.
- `anteprima-prato-briciola.png` — le tre pose di Briciola con cuccia e
  cesto sull'erba nuova.
- `anteprima-scafo-falle-aperta.png` / `anteprima-scafo-falle-chiusa.png` —
  le tre falle applicate allo scafo della nave in cala, con l'icona asse.
- `controllo-allineamento-sirena.png` — i due stati della Sirena
  sovrapposti al 50%: lo scafo coincide.

## Pezzi più piatti (dichiarati)

Disegnati a programma, quindi più piatti dei dipinti: **le falle, l'icona
asse, le due boe e la scia**. Le falle e l'icona usano la palette e le
venature dello scafo esistente per sparire sopra il disegno della nave in
cala; la scia è schiuma procedurale con alpha sfumato. Sirena, panorama,
Briciola, cuccia e cesto sono dipinti; il tramonto è il giorno ricolorato
a programma (stessa composizione, è una scelta: il convoglio resta
fermo). La paglia della cuccia conserva una sfumatura calda chiara
dell'originale dipinto sotto i fili: sul prato si legge come paglia in
luce.

## Correzioni e controllo finale (seconda passata, 16 novembre)

Segnalati tre disegni tagliati sul bordo alto del canvas; corretti
ingrandendo il canvas, senza rimpicciolire né ridisegnare il disegno, e
spostando l'ancora della stessa quantità, così la base resta nello
stesso punto del disegno:

- `cuccia.png`: la cima del tetto toccava il bordo (margine 0). Canvas
  88×64 → 108×84, ancora (44, 62) → (54, 74). Margini trasparenti ora:
  10–15 px di disegno su ogni lato.
- `cesto.png`: i manici di corda toccavano il bordo (margine 0). Canvas
  68×48 → 88×68, ancora (34, 46) → (44, 57). Margini: 9–13 px.
- `boa-accesa.png`: l'alone del fanale toccava il bordo (margine 0).
  Canvas 40×48 → 56×64, ancora (20, 40) → (28, 54); margine minimo
  10 px di disegno, alone compreso. Anche `boa-spenta.png` è stata
  portata sullo stesso canvas e la stessa ancora, perché i due stati si
  scambino senza spostamenti (il suo disegno non era tagliato).

Controllo bordi su tutti i file della cartella (pixel opachi sulla
cornice esterna del canvas): **nessun file tocca il bordo**. Unica
eccezione dichiarata: `scia-schiuma.png` tocca il lato destro, perché
quel lato si aggancia alla poppa della Sirena. I panorami sono fondali
pieni per natura. Sirena, Briciola e icona non toccano il bordo e non
sono stati modificati in questa passata.

STATO: pronto
