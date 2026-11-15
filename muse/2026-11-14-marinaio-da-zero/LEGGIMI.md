# Marinaio a righe — DA ZERO (gruppo 1 di 3: camminata senza torcia, 20 frame)

Personaggio rifatto da zero su indicazione dell'utente (14 nov): le versioni
precedenti del marinaio (v3–v7, 02-marinaio-righe) NON sono state usate né
ritoccate. Ogni frame è disegnato nuovo sui frame del Capitano, dai quali si
prende SOLO la posa: stessa scala, stesse proporzioni, stessi punti di
appoggio dei piedi, canvas 336×376, sfondo verde uniforme (203,228,172)
(lo sfondo è appiattito: via anche la lieve grana fantasma dei frame base).

## Il personaggio
Lo stesso uomo del Capitano: stesso viso, capelli castani, barba, orecchino
(e la sua collana) — testa, mani e pelle non sono ritoccati. Cambia solo
l'abito:
- maglia a righe orizzontali bianche e blu: bande regolari da 6 px ancorate
  alla cintura (banda inferiore blu), continue, bordi netti, ombreggiate con
  la luce della giacca del Capitano (luminanza smorzata: nessun riquadro
  chiaro sul dorso);
- maniche bianche;
- cintura marrone con fibbia metallica grigia (niente oro);
- pantaloni blu medio (più chiari del navy, si vedono anche al buio);
- stivali marroni, quelli del Capitano, invariati.
Nessun residuo del Capitano: bottoni, colletto e bordini rosso/oro eliminati.

## Controllo di sovrapposizione (obbligatorio, per frame)
Sovrapposizione al 50% col frame del Capitano dello stesso nome
(cartella controllo/): la sagoma del marinaio coincide con quella del
Capitano in tutti i frame — l'unica differenza sono pochi pixel isolati di
grana dello sfondo rimossi (colonna "diff. sagoma" = quei pixel).
- fronte-fermo: SÌ (diff. 11) · fronte-passo1: SÌ (0) · fronte-passo2: SÌ (1)
  · fronte-passo3: SÌ (0) · fronte-passo4: SÌ (0)
- profilo-destro-fermo: SÌ (2) · passo1: SÌ (0) · passo2: SÌ (2)
  · passo3: SÌ (1) · passo4: SÌ (4)
- profilo-sinistro-fermo: SÌ (0) · passo1: SÌ (1) · passo2: SÌ (23)
  · passo3: SÌ (0) · passo4: SÌ (9)
  (profilo-sinistro disegnato dai frame profilo-sinistro del Capitano:
  i suoi frame sinistri NON sono lo specchio esatto dei destri, quindi
  niente specchio — sagoma coincidente col suo sinistro.)
- spalle-fermo: SÌ (1) · passo1: SÌ (2) · passo2: SÌ (0) · passo3: SÌ (4)
  · passo4: SÌ (1)
Ciclo di camminata: quello del Capitano — passo1/3 gambe vicine e dritte,
passo2/4 falcata larga alternata, testa e busto alla stessa altezza in
tutti i passi (verificato mettendo i frame in fila).

## Correzione profili (14 nov sera, su segnalazione dell'utente)
Nei profili (destro e sinistro, fermo e passo1–4):
- cintura SOTTILE: fascia marrone di 8–10 px con fibbia, alta come nel
  Capitano — il bacino NON è più marrone;
- sotto la cintura i pantaloni blu medio vanno dalla vita allo stivale,
  gamba posteriore attaccata al bacino, gambe della stessa lunghezza;
- il braccio è trattato come struttura verticale: manica bianca con pieghe
  e ombra (ombreggiatura dalla luce vera, non più piatta) che continua
  davanti a cintura e pantaloni e finisce in un polsino grigio chiaro
  e nella mano; la cintura passa dietro il braccio.
Fronte e spalle: solo allineata l'ombreggiatura di maniche e polsini,
il resto è invariato. Sagome e controlli rifatti: coincidenze come sopra.

## Pulizia dei grigi nei profili (14 nov sera, su segnalazione dell'utente)
Solo profili destro e sinistro (fermo e passo1–4):
- punta dello stivale davanti in passo2 e passo4: il rettangolo grigio
  è diventato marrone come il resto dello stivale;
- punta della barba sul mento: da grigia a marrone scuro come il resto
  della barba;
- manica: niente più chiazze grigie — bianco con ombre calde beige
  (l'ombreggiatura sfuma verso il beige, il polsino è beige chiaro).
Controllo pixel per pixel (grigio neutro = canali quasi uguali,
luminosità sotto 200, dentro la sagoma; esenti solo occhio e fibbia):
grigi residui per frame — profilo-destro: fermo 1, passo1 5, passo2 1,
passo3 5, passo4 3; profilo-sinistro: fermo 1, passo1 1, passo2 6,
passo3 1, passo4 5 (pixel isolati di bordo, non macchie).
Le sovrapposizioni in controllo/ sono state rifatte per tutti i 20 frame:
la sagoma coincide col Capitano (le differenze numeriche, 125–254 px,
sono i pixel chiari di bordo che cambiano soglia con la ricolorazione
e la grana rimossa — la forma non cambia).

## File
- frame/: 20 frame camminata (fronte, profilo-destro, profilo-sinistro,
  spalle × fermo, passo1–4), PNG in base64 (una riga).
- controllo/: 20 sovrapposizioni 50% coi frame del Capitano.
- elenco.txt: ordine dei 20 frame.

## Gruppi successivi (stessa cartella, dopo approvazione di questo gruppo)
- Gruppo 2: torcia (20 frame).
- Gruppo 3: attacchi (15 frame: ascia-taglio1–6, piccone-taglio1–6,
  mani-nude-colpo1–3, profilo-destro).

STATO: pronto

## Gruppo 2 — camminata con torcia (20 frame, 14 nov sera)
Frame `02-marinaio-righe_torcia-<vista>-<passo>.png` (fronte,
profilo-destro, profilo-sinistro, spalle; fermo e passo1–4), in frame/
con le sovrapposizioni in controllo/ (50% sul frame torcia del
Capitano: braccio, mano e torcia coincidono).
Metodo: ogni frame è il frame TORCIA del Capitano ridipinto con la
stessa ricetta del gruppo 1 (righe ancorate alla cintura, maniche
bianche con ombre calde, cintura sottile nei profili, pantaloni blu
medio, fibbia in metallo grigio, niente bottoni né residui rossi).
Fiamma e manico della torcia sono i pixel del Capitano, protetti e mai
ridipinti: la punta arancione resta sopra la mano e la torcia non
galleggia (braccio e mano attaccati al corpo come nel Capitano, dita
chiuse sul manico). Le GAMBE non sono quelle dei frame torcia del
Capitano (in passo1/3 ha la gamba dietro alzata, posa di corsa): sono
innestate dai frame del gruppo 1 della stessa vista e passo, allineate
cintura su cintura alla posizione del frame torcia (i frame torcia del
Capitano sono spostati rispetto ai suoi frame di camminata: fronte
circa +30/+43 px in x, profili con cintura 7–13 px più in basso).
Controlli: sopra la cintura la sagoma coincide col frame torcia del
Capitano (differenze 21–69 px, solo grana e bordi chiari); sotto la
cintura i pixel sono quelli del gruppo 1 (differenza 0, mani escluse:
la mano del lato torcia è quella sulla torcia); profili senza grigi
neutri (residui 0–13 pixel isolati di bordo per frame).

## Correzione gruppo 2 — bacino e gambe dal gruppo 1 (14 nov, ore 20:24)
Su richiesta: i bacini dei frame torcia oscillavano diversamente dalla
camminata. I 20 frame sono stati ricomposti così:
- BASE = il frame del gruppo 1 della stessa vista e passo, intero:
  dalla cintura in giù (cintura, pantaloni, gambe, stivali) è identico
  al gruppo 1 PIXEL PER PIXEL, e anche testa, collo e busto sono quelli
  del gruppo 1 (stessa linea di spalle, stesso collo).
- Dal gruppo 2 precedente è stato preso SOLO il braccio con la torcia
  (manica, mano, manico, fiamma), spostato in orizzontale quanto serve
  perché la spalla cada su quella del gruppo 1 (spostamenti da -44 a
  +19 px secondo vista e passo, allineamento sul centro della testa).
  La mano libera resta quella del gruppo 1; la mano del gruppo 1 sul
  lato torcia è cancellata (il braccio è alzato sulla torcia); la mano
  lontana del gruppo 2 sotto la cintura NON è riportata (appartiene
  alla sua posizione di bacino e finirebbe nel posto sbagliato).
- Sotto la cintura le uniche differenze dal gruppo 1 sono gli elementi
  della torcia stessa: il manico che scende davanti alla coscia nei
  profili e la mano con la punta del manico di fronte.
Controlli RIFATTI in controllo/: sovrapposizione al 50% del frame
torcia sul frame SENZA torcia dello stesso passo (come richiesto).
Sotto la cintura coincidono: differenze fuori dagli elementi della
torcia = 0 pixel in tutti i 20 frame; testa mai toccata (differenza 0).
Note: nel profilo-sinistro passo4 la fiamma resta vicina alla punta
del naso, come nel frame torcia del Capitano (le due teste, camminata
e torcia, sono disegnate diversamente in partenza). Nei profili in
falcata, nel punto dove la mano del gruppo 1 è stata cancellata resta
una piccola ombra raccordata alla punta della cintura.

## Seconda correzione gruppo 2 — braccio torcia DISEGNATO (15 nov)
Su richiesta: le mani trapiantate restavano tonde e rosa, e il corpo
sembrava spostato rispetto al bacino. Metodo cambiato, come indicato:
- BASE = il frame senza torcia del gruppo 1, copiato INTERO: testa,
  collo, busto, cintura, gambe, stivali e braccio libero sono identici
  al gruppo 1 pixel per pixel. Niente del corpo è spostato.
- Cambia solo il braccio della torcia, DISEGNATO da zero: la manica
  parte dalla spalla del frame originale (bianca, con ombra calda e
  polsino), la torcia è tenuta davanti al viso in posizione simile al
  Capitano (di fronte: braccio in diagonale in basso fuori dalla
  sagoma, come la posa approvata).
- MANO: è la mano dello stesso frame senza torcia (stesso stile,
  colore e grandezza), ruotata e messa sul manico con le dita chiuse
  intorno al bastone. Mai una palla rosa.
- TORCIA: manico marrone e fiamma arancione a GOCCIA in tutti i 20
  frame, anche nei passi 1, 3 e 4 del profilo destro dove mancava.
  Niente bande semitrasparenti.
- Il vecchio braccio appeso è cancellato e dietro vengono prolungate
  le righe della maglia e il denim dei pantaloni.
Controlli in controllo/: sovrapposizione al 50% sul frame senza torcia
con lo stesso nome — tutto coincide tranne il braccio con la torcia e
la zona del vecchio braccio cancellato.
Nota: nei profili in falcata (passo2 e passo4), nel punto dove il
pannello del vecchio braccio incontrava la cintura resta un piccolo
raccordo scuro di pochi pixel.

## Terza correzione gruppo 2 — solo il braccio ridisegnato (15 nov)
Su richiesta: corpo approvato e NON toccato (stessa base e stessa
pulizia della versione precedente). Cambia solo il braccio torcia:
- Manica larga come l'altro braccio del frame senza torcia (non più
  il tubo enorme), bianca con piccole pieghe, ombre calde e polsino.
- Braccio PIEGATO al gomito: l'avambraccio sale davanti al petto e la
  mano è all'altezza dello sterno. Di profilo la torcia sta davanti
  al petto, con la fiamma appena davanti alla linea del naso: viso,
  barba e bocca restano sempre tutti visibili (controllato frame per
  frame: sopra il collo le uniche differenze dal gruppo 1 sono fiamma
  e manica sullo sfondo). Di fronte e di spalle la torcia sta a lato
  del corpo.
- Mano: quella del frame senza torcia (stessa pelle, stile e
  grandezza), dita chiuse intorno al manico, mai nascosta.
- Torcia invariata: manico marrone, fiamma arancione a goccia in
  tutti i 20 frame. Niente bande semitrasparenti né macchie vicino
  al braccio e alla spalla.
Controlli in controllo/: sovrapposizione al 50% sul frame senza
torcia con lo stesso nome — fuori dal braccio tutto coincide.

## Correzione profili — ANTEPRIMA profilo destro (15 nov)
Su richiesta (immagine «correzione-profili»): nei profili il petto
davanti e il braccio erano beige «come una pelliccia». Ora:
- Il petto davanti è A RIGHE blu e bianche, come il resto del busto
  e come nei frame di fronte e di spalle.
- La manica lunga è A RIGHE, con polsino chiaro e la mano disegnata
  come prima. Niente più parti beige su petto e braccio.
- Tutto il resto è identico: testa, capelli, barba, cintura,
  pantaloni, stivali, bacino, gambe e piedi non sono toccati.
In questa consegna SOLO profilo-destro-fermo e profilo-destro-passo1,
per approvazione. Controlli in controllo/: sovrapposizione al 50%
vecchio/nuovo — coincidono ovunque tranne petto e braccio.
Gli altri profili (destro passo2–4, sinistro, e i torcia) seguono
dopo il via libera.
STATO: gruppo 2 pronto
