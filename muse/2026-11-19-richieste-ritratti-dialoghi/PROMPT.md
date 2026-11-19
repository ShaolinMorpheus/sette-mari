# Richiesta per Muse — ritratti dei dialoghi (busti con espressioni)

Nei dialoghi del gioco, a sinistra del fumetto, c'e' un ritratto tondo con il viso di chi parla. Oggi i ritratti sono ancora disegnati a codice col vecchio design (e il pappagallo pure): non somigliano piu' ai personaggi che hai disegnato tu. Vanno rifatti nel tuo stile.

## Cosa serve
Un **busto-ritratto** (testa e spalle, viso in primo piano, leggermente di 3/4 verso destra, cioe' verso il fumetto) per ogni personaggio che parla, in **6 espressioni**:
1. neutro
2. felice / ride
3. preoccupato / ansioso
4. serio / arrabbiato
5. sorpreso
6. triste

Personaggi (stessi visi e stessi costumi dei set che hai gia' fatto, stessi colori):
- **Il Capitano** (il giocatore, quello che parla di piu'): marinaio con maglia a righe (viso gia' disegnato da te). **Senza cappello**: il cappello lo aggiunge il gioco (il giocatore puo' cambiarlo), quindi i capelli devono essere completi anche in alto. Fai anche la versione **con la giacca rossa del capitano** (stessa faccia, stessa espressione). Stesso viso in tutte le espressioni e in entrambi i completi.
- **Biscotto** (il pappagallo): busto con testa e un pezzo di corpo e ali, **senza cappellino**. 6 espressioni.
- **Ferro** (con il viso rifatto, barba corta grigia come da richiesta precedente), **Nives**, **Tito**, **Gnocco** (viso nuovo), **Giacomo** (bozza B), **Pip**, **Dodo**.
  - Pip: ragazzino con la bandana e le lentiggini (attuale design a codice: pelle chiara, capelli castani, giacca verde oliva, camicia crema, bandana rossa).
  - Dodo: cuoco tondo e allegro con baffi, grembiule e bandana color panna (attuale design a codice).

Totale: Capitano x2 completi + 8 personaggi = 10 busti x 6 espressioni = 60 pezzi. Ordine di priorita': Capitano (marinaio), Biscotto, Ferro, Nives, Tito, Gnocco, poi Capitano (giacca rossa), Giacomo, Pip, Dodo.

## Formato
- Tela **256x256**, sfondo trasparente con alfa pulito (niente alone), busto centrato; la testa occupa circa il 60-65% dell'altezza, il mento a circa il 72% dell'altezza, le spalle tagliate dal bordo inferiore.
- La testa deve avere **lo stesso identico disegno in tutte le espressioni** (stessa forma, stessi capelli, stesso costume): cambiano solo occhi, sopracciglia, bocca e inclinazione.
- Nomi file: `ritratto-<personaggio>-<espressione>.png.b64` (espressioni: neutro, felice, preoccupato, serio, sorpreso, triste; personaggi: capitano-marinaio, capitano-giacca, biscotto, ferro, nives, tito, gnocco, giacomo, pip, dodo).
- Il gioco mette lo sfondo (il fondo caldo dorato dentro la cornice di legno tonda), quindi **niente sfondo e niente cornice**.
- Sottocartella nuova con LEGGIMI.md e foglio di contatto in `controllo/` con tutte le espressioni affiancate per personaggio.
- Consegna a gruppi (per esempio Capitano e Biscotto per primi), cosi' li monto subito.
