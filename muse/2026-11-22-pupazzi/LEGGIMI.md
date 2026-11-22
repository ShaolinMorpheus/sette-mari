# Pupazzi a pezzi — gli altri 10 personaggi + trotto di Briciola rifatto

Stesso metodo, stessi nomi dei pezzi e stessa struttura di `pezzi.json` del pupazzo del Capitano (approvato): 30 pezzi per personaggio (testa, busto, braccio alto e avambraccio ×2, coscia e stinco ×2, per fronte, profilo destro e spalle), tela 336×376, gerarchia con cerniere e giunti nel JSON (stinco segue coscia, avambraccio segue braccio, tutto segue il busto). Stinco+stivale sono un pezzo unico, come nel Capitano.

## Contenuto

- `consegna/<personaggio>/` — Marinaio, Tito, Nives, Gnocco, Ferro, Giacomo, Pip, Dodo, mercante, Cormorano 3, Cormorano 5: 30 pezzi PNG + `pezzi.json` ciascuno.
- `consegna/briciola-trotto/` — trotto di Briciola rifatto: 8 frame di profilo ritagliati con **scala unica 0,376** per tutti (prima ogni frame aveva la sua), tela 320×200, ancora (160,190); il frame in volo resta sollevato da terra come nel foglio.
- `controllo/` — per ogni personaggio il foglio di confronto (originale | fermo ricomposto | posa di prova), i 3 fermi ricomposti dai pezzi e il foglio di contatto del trotto.

Verifica ricomposizione: su tutte le viste i pezzi ricoprono il fermo originale con scarto 0,5–1,7% di pixel (come il Capitano).

## Basi usate e limiti dichiarati

- Marinaio, Tito, Nives, Gnocco, Ferro, Giacomo: pezzi tagliati dai fermi esistenti (fronte, profilo, spalle).
- **Pip**: il fermo di profilo è il passo 5 e quello di spalle il passo 2 della sua camminata (non esistono suoi fermi di profilo/spalle). Basi in falcata: per la camminata del pupazzo consiglio oscillazioni delle gambe contenute (±10°).
- **Dodo**: il fermo di profilo è il passo 3 e quello di spalle il passo 1, stessa avvertenza di Pip.
- **Mercante, Cormorano 3, Cormorano 5**: fronte dai fermi esistenti; profilo e spalle sono fermi generati nuovi nello stesso stile (hanno un'ombra morbida a terra disegnata dentro, come i disegni originali del foglio).
- Come nel Capitano: il braccio «dietro» del profilo è la copia scurita di quello davanti (nel fermo è nascosto), ed è segnato come derivato nel `pezzi.json`; dove braccio e mano coprivano giacca e pantaloni, il riempimento è liscio, fatto a programma.
- Le correzioni di camminata di Nives (profilo sinistro specchiato) e Tito (passo 6 intero) sono quelle già consegnate il 21 nov e accettate: qui non cambia nulla.

## Cosa manca ancora

Niente in questa consegna: con i pupazzi dei 10 personaggi e il trotto di Briciola a scala unica, le richieste del 22 nov sul pupazzo sono complete. Restano da montare in gioco i pupazzi (Capitano compreso) e i blocchi creature/alberi della consegna gemella `2026-11-22-richieste-creature-e-alberi`.

STATO: pronto
