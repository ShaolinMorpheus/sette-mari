# Muse — rifare le camminate dei personaggi (24 nov 2026)

Le camminate attuali non convincono: nei fotogrammi di profilo alcuni passi guardano dalla parte sbagliata (es. Gnocco «sinistro» passi 3-6 con la testa a destra), il ciclo non è fluido e i passi cambiano di altezza/posizione tra un frame e l'altro.

## Personaggi
Ferro, Nives, Gnocco, Tito, Giacomo (+ poi Capitano e marinaio, se hai già le basi).

## Cosa consegnare, per ogni personaggio
Quattro direzioni, **6 fotogrammi di camminata ciascuna** (ciclo chiuso: il 7° tornerebbe al 1°):
- `fronte-passo1..6`
- `spalle-passo1..6`
- `profilo-destro-passo1..6` (guarda e cammina verso DESTRA)
- `profilo-sinistro-passo1..6` (guarda e cammina verso SINISTRA, **deve guardare a sinistra in tutti e 6**; se è lo specchio del destro va bene, basta che coerente)
Più `fronte-fermo` invariato.

## Regole
- Stesso disegno, stessi colori, stessa dimensione e stessa ancora (piedi) in tutti i frame: la testa sale/scende solo di 2-3 px nel passo, il corpo non salta.
- Ciclo classico a 6: contatto → discesa → passaggio → contatto opposto → discesa → passaggio; braccia opposte alle gambe.
- Sfondo trasparente, stessa tela dei frame attuali (336×376), `.png.b64` in `muse/2026-11-24-camminate/consegna/` con nomi `<personaggio>/<direzione>-passoN`.
- Non ritoccare i frame già buoni degli altri oggetti; solo queste camminate.
- Alla fine scrivi in `LEGGIMI.md` STATO: pronto e un foglio di controllo con le 4 direzioni × 6 frame per personaggio.

## CONTROLLI OBBLIGATORI (da rifare per OGNI frame prima di consegnare)
Le consegne precedenti avevano difetti gravi. Ogni frame va guardato da solo, ingrandito, su sfondo scuro E chiaro:
1. **Figura intera**: testa, tronco, **entrambe le braccia, entrambe le gambe e entrambi gli stivali** presenti e completi. Nessuna gamba o piede tagliato dal bordo o mancante.
2. **Niente sovrapposizioni**: un solo personaggio per frame. Niente copie fantasma, immagini sotto traslate, bordi di altri frame, residui del frame precedente.
3. **Niente gambe/arti spezzati o staccati**: ogni arto attaccato al corpo, con articolazioni plausibili; niente gambe che si fondono con lo sfondo.
4. **Dentro la tela**: tutto il personaggio entra nella tela con margine di almeno 8 px; stessa tela e stessa ancora (piedi) per tutti i frame.
5. **Sfondo davvero trasparente** (nessun erba/colore residuo attorno o dentro).
6. **Direzione**: il profilo guarda sempre da una sola parte (destro → destra, sinistro → sinistra) in tutti e 6 i frame.
Se un frame non passa uno solo di questi controlli, rifallo: meglio meno frame giusti che 24 sbagliati. Nel foglio di controllo scrivi frame per frame «ok» solo dopo averli guardati uno a uno.
