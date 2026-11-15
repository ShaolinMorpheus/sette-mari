# Marinaio a righe — rifacimento con metodo pulito (15 novembre 2026)

Rifacimento del marinaio tenendo solo i 4 frame approvati della scheda (`fronte-fermo`, `spalle-fermo`, `profilo-destro-fermo`, `profilo-destro-passo1`, che restano intatti nella cartella `2026-11-14-marinaio-da-zero/`). Tutti gli altri frame sono ridisegnati completi, mai ritoccati, a gruppi di 5 con via libera dell'utente dopo ogni gruppo.

## Come sono stati fatti i frame del Capitano (metodo)

I set del Capitano sono nati come **fogli pose interi generati** con il personaggio completo in ogni posa (a ogni chiamata: foglio pose + abito fronte + abito retro come riferimenti), poi tagliati nei frame 336×376 normalizzando dimensione e posizione cella per cella. Gli abiti sono stati ridipinti foglio per foglio in un solo passaggio — mai ritocchi sui singoli frame.

Applicazione del metodo qui, in forma deterministica: per ogni gruppo si compone un foglio con i frame del Capitano del gruppo e lo si ridipinge in UN passaggio a programma (testa, pelle, capelli e stivali copiati dai frame del Capitano e protetti; sagoma identica alla maschera della figura del Capitano; maglia a righe pulita senza bottoni né placket; sfondo verde piatto 203,228,172), poi si taglia nei frame 336×376. Nessun ritocco successivo sui singoli frame.

## Ritocchi permanenti (dall'approvazione del gruppo A e del gruppo B)

1. Contorno del braccio morbido, scuro e sottile, che segue l'arco del braccio dalla spalla al polsino (dalla consegna del gruppo C: niente più linea grigia ondulata attraverso il petto).
2. Fibbia grigia piccola e chiara, senza riquadro grigio né linea scura a triangolo; cintura marrone uniforme.
3. Manica a righe anche sotto la cintura, come sopra; polsino chiaro solo al polso.
4. Niente filo rosso allo scollo.
5. Nei frame con la torcia di profilo: gambe dalla camminata del Capitano con lo stesso nome (passo1/3 vicine, stivali a terra), mai dalla base torcia che le aveva sollevate.

## Gruppo A — consegnato

`profilo-destro-passo2`, `profilo-destro-passo3`, `profilo-destro-passo4`, `profilo-sinistro-fermo`, `profilo-sinistro-passo1` (rigenerati con i ritocchi 1–4 nella consegna del gruppo B).

## Gruppo B — consegnato

`profilo-sinistro-passo2`, `profilo-sinistro-passo3`, `profilo-sinistro-passo4`, `torcia-profilo-destro-fermo`, `torcia-profilo-destro-passo1` (quest'ultimo rifatto nel gruppo C, vedi sotto), più i 5 frame del gruppo A rigenerati con i ritocchi 1–4.

Frame con la torcia: posa del Capitano (braccio piegato, avambraccio davanti al petto, mano allo sterno), fiamma e manico copiati dai frame del Capitano, manica a righe, mano color pelle con le dita chiuse sul manico (la mano è quella del frame senza torcia con lo stesso nome).

## Gruppo C — consegnato

Nuovi: `torcia-profilo-destro-passo2`, `torcia-profilo-destro-passo3`, `torcia-profilo-destro-passo4`, `torcia-profilo-sinistro-fermo`, `torcia-profilo-sinistro-passo1`.
Rifatti e rimandati: `torcia-profilo-destro-passo1` (gambe dalla camminata, stivale dietro a terra), `profilo-destro-fermo` e `profilo-destro-passo1` rifatti con lo stesso metodo per uniformità di stile (gli originali della scheda restano intatti in `2026-11-14-marinaio-da-zero/`).

Controlli gruppo C: testa senza modifiche sopra riga 145 in tutti gli 8 frame; fibbia presente in tutti (29–48 px); nei frame torcia di profilo le gambe coincidono con la camminata del Capitano (sovrapposizioni in `controllo/`); contorno del braccio rifatto morbido e sottile lungo l'arco del braccio.

STATO: gruppo C pronto

## Frame camminata dal foglio disegnato (v3) — 15 nov 2026 (sera)

Su decisione dell'utente, i frame di camminata senza torcia vengono dal foglio intero disegnato v3 (`foglio-A.png.b64`), tagliato in frame 336×376 e normalizzato su scala e linea dei piedi dei frame del Capitano (altezza della figura e base dei piedi coincidenti entro 1–2 px in tutti i frame).

- 17 celle dal foglio: fronte (fermo, passo1, passo4), profilo destro (fermo, passo2, passo3, passo4), profilo sinistro (fermo, passo1, passo2, passo3, passo4), spalle (fermo, passo1, passo2, passo3, passo4).
- `profilo-destro-passo1`: sostituito con la cella del metodo pulito a programma (gamba dietro vicina, stivale a terra), come richiesto dall'utente.
- `fronte-passo2` e `fronte-passo3`: NON inclusi — restano i frame frontali già approvati del set `2026-11-14-marinaio-da-zero`.
- Controllo anti-copia: scansione del rosso della giacca del Capitano nella banda del busto su tutte le celle del foglio v3: 0–19 px per cella (rumore di antialias). Nessun frame del Capitano copiato.
- Questi frame sostituiscono le versioni di camminata del metodo pulito consegnate con i gruppi A–C (stessi nomi in `frame/` e `controllo/`). I frame con la torcia restano quelli del metodo pulito.

STATO: frame camminata (foglio v3) pronti

## Gruppo D — consegnato

`torcia-profilo-sinistro-passo2`, `torcia-profilo-sinistro-passo3`, `torcia-profilo-sinistro-passo4`, `torcia-fronte-fermo`, `torcia-fronte-passo1`, con lo stesso metodo pulito a programma (gambe dei profili dalla camminata del Capitano; nei fronte la posa è quella della base torcia del Capitano: braccio teso in basso di lato, torcia in mano).

Correzione applicata in questo gruppo: la passata di chiusura della ridipintura tingeva di blu denim alcune parti in legno e cuoio (punta del manico sotto la mano e macchie sugli stivali, 300–600 px per frame). Ora i pixel in legno/cuoio della base che la passata aveva tinto di blu vengono ripristinati dalla base stessa, in tutti i frame del gruppo.

Controlli gruppo D: testa senza modifiche sopra riga 145 in tutti i 5 frame; sagoma coincidente con la base (diff 0, 3 px in torcia-profilo-sinistro-passo3); manico e stivali senza più macchie blu (verifica a ingrandimento).

STATO: gruppo D pronto
