# Marinaio a righe — frame con torcia rifatti (v4)

I 20 frame con torcia del marinaio (02-marinaio-righe) rifatti usando come
modello i frame torcia del Capitano (`01-capitano-rosso_torcia-*`): pose
delle gambe, bacino e altezza del busto identici a quelli del Capitano;
cambiano solo i vestiti (maglia a righe bianche e blu, pantaloni blu navy)
e la testa del marinaio.

**Aggiornamento (rifacimento pixel per pixel)**: i frame sono ora copie
esatte dei frame del Capitano — sagoma, gambe, stivali, bacino, braccio e
torcia identici pixel per pixel (verifica numerica: fuori da giacca e
pantaloni i pixel sono uguali al 100%) — con la sola texture dei vestiti
sostituita: maglia a righe bianche/blu dipinta e pantaloni navy presi dai
frame del marinaio. Nessun bottone, colletto o dettaglio della giacca
rossa resta. In profilo il braccio con la torcia è piegato davanti al
petto come nel Capitano, e in passo1/passo3 le gambe sono vicine con lo
stivale posteriore a terra. Le righe sono regolari e continue, senza
buchi, e la maglia scende fino alla cintura.

## Regole applicate

- passo1 e passo3: gambe vicine, passaggio centrale; passo2 e passo4:
  falcata larga, una gamba davanti e una dietro, alternate. Niente posa
  da corsa, niente busto inclinato.
- Gambe sempre della stessa lunghezza, stessi stivali, stessa altezza di
  testa e spalle in tutti i frame.
- Busto e fianchi collegati: di fronte la maglia scende fino alla cintura
  senza buchi; braccio con la torcia nella stessa posizione del Capitano.
- Stessa scala (canvas 336×376), stessa posizione dei piedi a terra,
  sfondo verde uniforme come gli altri frame.

## Contenuto

- `frame/` — 20 file `.png.b64` (base64 del PNG, una sola riga;
  decodificare con `base64 -d nome.png.b64 > nome.png`): torcia fronte,
  profilo destro, profilo sinistro e spalle, ciascuno con fermo e
  passo1–4. Nomi uguali ai frame del Capitano e alla consegna del
  marinaio completo.
- `elenco.txt` — i 20 frame in ordine di gioco.

## Cosa NON deve cambiare

- Gli altri 35 frame del marinaio e tutti i frame del Capitano: invariati.
- Forma della mappa, posizioni, collisioni: invariati.

STATO: pronto
