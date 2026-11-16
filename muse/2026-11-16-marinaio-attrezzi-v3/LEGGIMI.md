# Marinaio attrezzi v3 — completamento (16 novembre 2026)

Completamento del set attrezzi del marinaio a righe (il capitano usa
ancora i vecchi frame di profilo grigi): i profili nello stesso stile
dei fronte/spalle v2, le pose di riposo e il piccone 3 col viso.

Regola del pupazzo unico, come la v2: stesso personaggio dei profili
approvati (testa grande ~1/3 dell'altezza, corpo tozzo), stessa maglia a
righe blu scuro fitte ridipinta a programma su busto e maniche (periodo
25, banda 11, navy 47,62,99 / bianco 228,223,213 — lo stesso metodo
della v2), stessa cintura sempre visibile, stessa scala e stessi piedi
dei frame v2 con lo stesso numero. La maglia è quella a righe del
marinaio: la versione rossa del capitano la ricava l'utente.

Differenza dichiarata rispetto alla v2: questi file sono a **fondo
trasparente** (la v2 era su fondo pieno del set), con margini
trasparenti di almeno 8 px su ogni lato — verificato a programma: il
margine minimo dei 20 file è 15 px e nessun file ha pixel opachi sul
bordo del canvas. Canvas invariato 384×427.

## Contenuto (20 file in `frame/`)

- **Profili destri** (derivati dai profili approvati del set completo,
  maglia ridipinta col metodo v2 e fondo scontornato):
  `ascia-taglio1…6-profilo-destro`, `piccone-taglio1…6-profilo-destro`,
  `mani-nude-colpo1…3-profilo-destro`. Altezza e baseline dei piedi sono
  quelle dei profili originali, le stesse su cui la v2 aveva normalizzato
  fronte e spalle: le tre viste di ogni numero stanno in piedi uguali.
- **Pose di riposo taglio1** (nuove, gambe come da fermo, stivali bassi,
  attrezzo tenuto basso davanti alle gambe):
  `ascia-taglio1-riposo-fronte`, `ascia-taglio1-riposo-spalle`,
  `piccone-taglio1-riposo-fronte`, `piccone-taglio1-riposo-spalle`.
  Di spalle il piccone si tiene dietro la schiena, punte ai lati verso
  il basso.
- **`piccone-taglio3-fronte` rifatto**: nella v2 le braccia alzate e il
  manico coprivano il viso; qui il piccone all'apice è spostato di lato
  e il viso è completamente visibile. Altezza e piedi sono quelli del
  vecchio taglio3 v2, così si inserisce nella sequenza senza salti.
  (Sostituisce il `piccone-taglio3-fronte` della v2; gli altri frame v2
  restano validi.)

## Controlli (`controllo/`)

- `confronto-profili.png` — le tre serie di profilo v3 in striscia.
- `confronto-riposo-e-piccone3.png` — sopra: riposo fronte/spalle e il
  nuovo piccone 3; sotto: i taglio1 v2 e il vecchio piccone 3, per il
  confronto di scala e di viso.

## Limiti dichiarati

- La lama dell'ascia nella posa di riposo fronte nasceva a righe nel
  foglio generato: è stata riportata ad acciaio a programma conservando
  la luminanza (si legge come metallo spazzolato, resta una lieve
  bandeggiatura).
- Le pose di riposo sono generate e poi normalizzate/ridipinte come la
  v2: la maglia ridipinta è regolare e un poco più piatta del dipinto,
  è il prezzo dell'uniformità del set.

STATO: pronto
