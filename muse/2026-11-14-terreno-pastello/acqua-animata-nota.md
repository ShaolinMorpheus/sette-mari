# Acqua animata — nota tecnica per l'implementazione nel motore

Obiettivo: riva che avanza e si ritira in modo credibile, NON un effetto di colori
sovrapposti. La differenza sta in come viene disegnata, punto per punto.

## Come è fatto il mare OGGI (letto in `www/stabile.html`, sezione `02_ground.js`)

- Terreno tutto precalcolato: `WATERC` (acqua, colori per profondità via
  `waterRGB(d)` sulla palette `WC`), `LANDC` (terra), più livelli separati
  `FOAM_A`/`FOAM_B` (schiuma) e `CAUS_A`/`CAUS_B` (caustiche).
- Animazione attuale, nel ciclo di disegno:
  - `SWELL`: due trame 256×256 ripetibili che **scorrono sopra** l'acqua
    (pattern con translate nel tempo, alpha .2/.15);
  - `CAUS_A`/`CAUS_B`: dissolvenza incrociata con alpha sinusoidale
    (`.5±.5*sin(t*.9)`);
  - `FOAM_A`/`FOAM_B`: stessa dissolvenza (`.5+.42*sin(t*1.35)`, seconda
    sfasata) — la schiuma è **cotta in posizione fissa** e pulsa solo
    apparendo/scomparendo;
  - lungo i segmenti di riva vengono già disegnati a ogni fotogramma la striscia
    di sabbia bagnata e la schiuma morbida (tratteggio), con un fattore `w`
    oscillante: è il punto di aggancio giusto per il miglioramento.
- Limite strutturale: la linea di riva vera è dentro `WATERC`, **cotta e ferma**.
  Il mare "si muove" solo per strati che scorrono/sbiadiscono sopra: è l'effetto
  "colori sotto statici e sopra" che non vogliamo.

## Miglioramento proposto, mappato su questo codice

1. **Riva geometrica per-fotogramma**: i segmenti di riva esistono già (posizione,
   normale `nx,ny`, fattore `w`). Aggiungere a ogni segmento una **fase propria**
   (dalla posizione lungo la costa) e uno **spostamento lento lungo la normale**:
   `off = amp * sin(t/periodo + fase)`. Il bordo bagnato e la schiuma morbida,
   già disegnati per-fotogramma, seguono `off`: la riva avanza e si ritira
   davvero, con le onde che arrivano in momenti diversi lungo la spiaggia.
2. **Fascia d'acqua bassa mobile**: tra il bordo cotto di `WATERC` e il bordo
   spostato, disegnare una fascia semitrasparente col colore basso `WC[0]`
   (alpha ~.45, più chiaro verso il bordo): quando avanza è acqua vera e
   sottile che copre la sabbia; quando si ritira lascia la striscia di sabbia
   bagnata (già esistente) che sfuma in qualche secondo.
3. **Schiuma**: tenere le linee per-fotogramma sui segmenti (irregolari, sul
   bordo mobile) e **spegnere o ridurre molto la dissolvenza `FOAM_A`/`FOAM_B`**:
   è lei a dare l'idea del velo fisso che appare e scompare.
4. **Interno dell'acqua**: `SWELL` che scorre e `CAUS_A`/`CAUS_B` possono
   restare (sono vita di superficie, a bassa alpha non si leggono come trucco).
   I `GLINTS` già presenti vanno bene.
5. **Parametri**: laghetto amp 4–8 px, periodo 9–12 s; spiaggia amp 10–18 px,
   periodo 6–9 s. Costo: si ridisegna solo la fascia costiera, il resto resta
   cotto (`WATERC`/`LANDC` invariati). Rispettare i livelli qualità `QL`
   esistenti: a `QL` alto si può disattivare lo spostamento e tenere l'attuale.

## Nota sulle versioni

Questa mappatura è letta da `www/stabile.html` (versione stabile, ~1 MB).
Verificare che `www/index.html` attuale usi le stesse strutture
(`WATERC`, `FOAM_A/B`, `CAUS_A/B`, `SWELL`, segmenti di riva con normali)
prima di applicarla.
