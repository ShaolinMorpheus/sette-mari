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
