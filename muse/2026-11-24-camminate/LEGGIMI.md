# Camminate rifatte — Ferro, Nives, Gnocco, Tito, Giacomo (24 novembre 2026)

**Correzione (24 nov, dopo il controllo dell'utente):** la prima versione
aveva pezzi che uscivano dalla sagoma con bordi tagliati e un difetto a
righe verticali accanto alla figura nei profili (l'allungamento delle
cosce era «spalmato» e, ruotando, si vedeva). Rifatto con allungamento a
specchio e ampiezze ridotte (coscia ±20°, stinco max +26°, braccia ±12°);
ricontrollato a piena risoluzione, fotogramma per fotogramma.

Per ogni personaggio: **6 fotogrammi × 4 direzioni** (fronte, spalle,
profilo-destro, profilo-sinistro) + `fronte-fermo`, tela 336×376 come i
frame attuali, in `consegna/<personaggio>/<direzione>-passoN.png.b64`.

## Metodo

- Le camminate sono **animate dai burattini** consegnati negli arretrati
  (`muse/2026-11-23-arretrati/`): gli stessi pezzi del personaggio,
  ricomposti con rotazioni gerarchiche sulle cerniere di `pezzi.json`.
  Stesso disegno e stessi colori per costruzione, nessun pezzo ridisegnato.
- Ciclo classico a 6: contatto → discesa → passaggio → contatto opposto →
  discesa → passaggio; il 7° fotogramma torna al 1°. Braccia in
  controfase alle gambe.
- **Profilo sinistro = specchio del destro** (come consente il prompt):
  guarda a sinistra in tutti e 6 i fotogrammi, verificato sulle strisce.
- Fronte/spalle: il passo si legge come nel ciclo approvato del Capitano —
  la gamba che avanza si solleva (fino a 18 px), quella d'appoggio resta
  a terra.
- `fronte-fermo`: il fermo ricomposto del set burattini, **invariato**.

## Ancoraggio a terra (dichiarato)

Nei disegni di partenza i due piedi non toccano terra alla stessa altezza
e la gamba «dietro» di profilo, ruotata in avanti, non arriva al suolo:
in ogni fotogramma il piede d'appoggio è stato **misurato da solo e
ancorato a y=375** con una compensazione verticale della sua coscia
(da 0 a +36 px nel passo 4 di profilo). Per non aprire fessure all'anca,
le cosce di profilo sono state allungate di 40 px verso l'alto, nella
zona coperta dal busto. Risultato misurato: **piede d'appoggio a y=375
in tutti i 120 fotogrammi** (fronte/spalle: 374–375), testa che sale e
scende solo con l'oscillazione del busto di 0–3 px, stessa scala ovunque.

## Capitano e Marinaio — NON rifatti

Il prompt li dava come facoltativi («se hai già le basi»): le basi ci
sono, ma il loro ciclo approvato è di **4 pose** per direzione. Portarlo
a 6 avrebbe richiesto di inventare 2 pose nuove, contro la regola
«stesso disegno»: non l'ho fatto. Se li vuoi a 6 con lo stesso metodo
dei burattini, dimmelo e li genero.

## Controllo

`controllo/controllo-<personaggio>.png`: le 4 direzioni × 6 fotogrammi
sull'erba del gioco, con il fermo in testa alla riga del fronte.
Direzione dei profili controllata fotogramma per fotogramma sulle
strisce: destro guarda a destra 6/6, sinistro guarda a sinistra 6/6,
per tutti e cinque.

STATO: pronto
