# Richiesta del 22 novembre 2026 — sabbia attorno alla Sirena (nave infossata)

Solo dentro `muse/2026-11-22-sirena-sabbia/`, consegna in `consegna/` come `.png.b64`.

La Sirena (`2026-11-22-sirena-profilo`, v2) è ormeggiata nella cala, sulla spiaggia vicino all'acqua. Per non sembrare sospesa
vogliamo che lo scafo sia un po' infossato nella sabbia. Serve un **letto di sabbia da mettere sopra la parte bassa dello scafo**.

## Cosa fare
- Un pezzo trasparente che si sovrappone alla Sirena: sabbia che risale attorno alla chiglia, al timone e al piede della scala,
  con piccoli cumuli e ondine di sabbia smossa, qualche sassolino e una conchiglia. Deve **coprire il fondo dello scafo** per circa
  10–14 px di disegno, in modo che la nave sembri affondata nella sabbia.
- **Stesso colore e stessa grana della sabbia del terreno del gioco** (sabbia calda dorata, come la spiaggia della cala e del campo):
  non più chiara né più rosata. Niente bordo scuro attorno al cumulo: i margini sfumano nella sabbia del terreno.
- Stessa tela e stessa ancora della Sirena: **1720×1320, centro scafo x=860, base y=1180**, così si sovrappone senza spostamenti.
  Il pezzo copre solo la fascia bassa (dal timone alla scala), il resto è trasparente.
- Due stati: `sirena-sabbia` e `sirena-sabbia-notte` (stessi pixel con i toni della sera).
- Niente contorni di altro colore, nessun pixel opaco sulla cornice.

## Controllo
`controllo/anteprima-sirena-sabbia.png`: la Sirena v2 con il pezzo sopra, su un fondo di sabbia del gioco e su erba, a scala di gioco.
Alla fine `LEGGIMI.md` con `STATO: pronto`.
