# Sirena — i 3 stadi di riparazione (stesso disegno della nave v2)

Stesso disegno, stessa tela e stessa posizione della Sirena "profilo v2" (`2026-11-22-sirena-profilo/consegna/nave-campo-integra.png`): tela 1720×1320, trasparente, vista 3/4 alta, stesso scafo, stessa poppa con cassero, stessa chiglia, stessa luce da alto-sinistra, contorno scuro sottile. NIENTE sabbia e NIENTE ombra a terra: il gioco infossa lo scafo nel terreno (taglia la parte bassa), quindi il fondo della chiglia resta pulito.
Ancora identica: centro scafo x=860, base chiglia y=1180. La sagoma dello scafo non cambia tra i 3 stadi: cambiano solo i dettagli. Lo stadio 3 è già la nave consegnata.

Consegna 2 file nuovi:

1. `nave-stadio1-da-riparare.png` — relitto: stessa sagoma di scafo ma danneggiata. Fasciame mancante in più punti (si vedono le coste interne), cannoniere sfondate, nessun albero (solo moncone sul ponte), nessuna vela, sartie penzoloni e tagliate, bandiera strappata o assente, timone rotto, ponte con assi mancanti. Legno scurito e sbiadito dall'acqua, alghe secche.
2. `nave-stadio2-in-riparazione.png` — a metà lavori: scafo quasi ricostruito, fasciame nuovo (legno più chiaro) accanto a quello vecchio, impalcatura/travi di sostegno e puntelli, albero di trinchetto montato e albero maestro ancora mancante o a metà, vele ancora non alzate (rotolo di tela sul ponte), timone nuovo, attrezzi (martello, sega, barili) sul ponte, bandiera ancora assente.
3. Lo stadio 3 è `nave-campo-integra.png` come ora: non rifarlo.

Regole:
- Stesse proporzioni e stessi pixel di sagoma dello scafo dove non è danneggiato (il gioco ci sovrappone la collisione).
- I pezzi sopra la linea del ponte (alberi, vele, sartie) possono variare; sotto il ponte la sagoma resta.
- Bordo pulito, nessun pixel opaco entro 8 px dalla cornice. Stile dipinto e colori come la nave v2.
- Consegna PNG → .png.b64 in `muse/2026-11-23-sirena-stadi/consegna/` + anteprima dei 3 stadi affiancati in `controllo/`.
