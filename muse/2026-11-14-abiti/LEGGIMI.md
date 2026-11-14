# Consegna: abiti del personaggio

## CAMBIO DI METODO — personaggi COMPLETI (da ora in poi)

Da questa consegna ogni abito è un **personaggio completo**: testa e corpo
disegnati insieme, come la Giacca rossa del Capitano — stessi frame con
viso, capelli, barba e orecchino. Niente più corpi senza testa.
Riferimento fisso per viso e capelli: i 55 frame del Capitano. Stesso
volto, stessa scala (canvas 336×376), stesso punto di appoggio dei piedi,
stessi nomi dei frame. Continuità curata tra i passi: testa e busto alla
stessa altezza in tutti i frame, gambe mai incrociate, nessun salto tra
una posa e l'altra.

### marinaio completo v3

`02-marinaio-completo/` — 55 frame completi in `frame/` (`.png.b64`) +
`elenco.txt`, con le correzioni alle gambe già fatte per la versione
senza testa: passi 1 e 3 dei profili e passi 2 e 4 di fronte con una
gamba avanti e una dietro, ben separate; colpi con gambe piantate e
separate.
**v2**: nei 10 frame di spalle (camminata e torcia) tolto il riquadro
chiaro/tabacco sul dorso: le righe bianche e blu della maglia ora sono
continue fino al collo.
**v3**: gambe rifatte seguendo ESATTAMENTE il ciclo del Capitano
(01-capitano-rosso) in tutti i 40 frame di camminata e torcia
(fermo + passo1–4, 4 viste): passo1 e passo3 con gambe vicine in
passaggio centrale, passo2 e passo4 in passo ampio con gambe alternate;
stessa apertura e stessa altezza del bacino del Capitano, gambe mai
incrociate né sovrapposte. Testa e corpo invariati.

STATO: pronto

---

## Consegna precedente — corpi senza testa (metodo sostituito)

I 6 abiti del set approvato ridisegnati come **corpi senza testa**: il gioco
aggiunge testa e cappello. Non sono disegnati viso, capelli, orecchino né
cappello; il collo finisce pulito alla base della testa, nella stessa
posizione dei frame del Capitano (giacca rossa). Stessa scala (canvas
336×376), stesso punto di appoggio dei piedi, sfondo trasparente.

| Abito | Cartella | Stato |
|---|---|---|
| 02 marinaio a righe | `02-marinaio-righe/` | COMPLETO (55 frame) — **marinaio v4** |
| 03 esploratore | — | sostituito dal metodo completo |
| 04 marsina di velluto | — | sostituito dal metodo completo |
| 05 corsaro nero | — | sostituito dal metodo completo |
| 06 navigatore | — | sostituito dal metodo completo |
| 07 giubba corsaro | — | sostituito dal metodo completo |

**marinaio v4** (ultime correzioni alla versione senza testa):
- torcia-fronte-passo3: busto intero e simmetrico, spalle alla stessa
  altezza, niente taglio a metà.
- fronte-passo2 e fronte-passo4: busto nitido come gli altri frame,
  gambe ben separate.
- In tutti i frame di spalle (camminata e torcia) il colletto della
  maglia è disegnato completo — bianco con striscia blu — senza vuoto
  tra le spalle.
- Dalla v3 restano: gambe mai incrociate né sovrapposte (passi rifatti
  nei profili e di fronte, colpi controllati), collo pulito con i colori
  della maglia fino al colletto in tutti i 55 frame.
- Stessi nomi file, stessa scala, stessi piedi; file aggiornati sul posto.

## Contenuto di ogni cartella abito

- `frame/` — 55 file `.png.b64` (base64 del PNG, una sola riga;
  decodificare con `base64 -d nome.png.b64 > nome.png`). Nomi uguali ai
  frame corrispondenti del Capitano.
- `elenco.txt` — i 55 frame in ordine di gioco: camminata (fronte,
  profilo destro, profilo sinistro, spalle; fermo + passo1–4), torcia
  (stesse 4 viste), colpi in profilo destro (mani nude 1–3, ascia 1–6,
  piccone 1–6).

## Cosa NON deve cambiare

- Forma della mappa, posizioni, collisioni: invariati.
- Testa, cappelli e giacca rossa del Capitano già integrati: invariati.

STATO: pronto
