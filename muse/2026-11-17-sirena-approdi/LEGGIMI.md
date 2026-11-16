# Sirena — approdi e stati (17 novembre 2026)

Stati nuovi della Sirena e approdi per la costa, sullo stesso mare e
nella stessa scala della Sirena di `2026-11-16-passo3-cap2` (scafo
320×200 di disegno, ancora (160, 113)). File a 4× la misura di disegno,
fondo trasparente, margini di almeno 8 px di disegno salvo dove
dichiarato; controllo bordi finale: nessun file ha pixel opachi sulla
cornice, unica eccezione il lato destro della scia lunga (aggancio alla
poppa, come la scia del passo 3).

## Tabella misure e ancore (misure di disegno; file = ×4)

| File | Disegno | Ancora (disegno) | Note |
|---|---|---|---|
| `sirena-ormeggiata.png` | 400×280 | (160, 113) centro scafo — la stessa degli altri stati | la nave è quella a vele ammainate del passo 3, nella stessa posizione e scala; il canvas è allargato in basso a destra per la passerella |
| `sirena-velocita-massima.png` | 880×200 | (690, 113) centro scafo | nave a vele gonfie invariata + scia lunga, in un unico sprite |
| `scia-schiuma-lunga.png` | 560×90 | (550, 45) bordo destro, alla poppa | versione lunga della scia del passo 3, stessa tecnica; sfuma a zero a sinistra, in alto e in basso |
| `approdo-pontile.png` | 288×168 | (32, 86) alla bitta con la cima arrotolata | punto di ormeggio all'estremità sinistra; ombra morbida inclusa sotto il tavolato |
| `approdo-scogliera.png` | 208×248 | (114, 186) alla cima arrotolata sulla cengia | vista frontale come grotta e torre del set; ombra morbida alla base inclusa |
| `approdo-spiaggia.png` | 264×224 | (120, 104) al centro dell'ancora | macchia di sabbia piatta sul terreno: nessuna ombra aggiunta |
| `bandierina-rossa.png` | 64×84 | (22, 74) alla base del paletto | bandierina rossa che sventola a destra |
| `bandierina-rossa-tramonto.png` | 64×84 | (22, 74) | stessa bandierina ricolorata calda |
| `bandierina-rossa-notte.png` | 64×84 | (22, 74) | stessa bandierina ricolorata notte |
| `boa-tramonto.png` | 56×64 | (28, 54) sulla linea d'acqua | la boa spenta del passo 3 (stesso canvas e stessa ancora) ricolorata calda |
| `boa-notte.png` | 56×64 | (28, 54) sulla linea d'acqua | la boa accesa del passo 3 ricolorata notte: il fanale resta acceso e l'alone si conserva |

## Note di lavorazione (dichiarate)

- **Passerella a programma**: due generazioni dipinte della nave
  ormeggiata inquadravano male la passerella (tagliata dal bordo o
  trasformata in un ponte di corda). La passerella consegnata è quindi
  disegnata a programma — assi, traversini, paletti e corda corrimano,
  con ombra morbida sull'acqua — sopra la nave a vele ammainate già
  consegnata, che resta identica pixel per pixel. È il pezzo più
  piatto della cartella. Parte dal fianco destro a mezza nave e scende
  verso destra, fuori dallo scafo.
- La Sirena ormeggiata eredita dalla consegna del passo 3 la punta
  dell'albero a 7 px di disegno dal bordo alto: è la nave approvata,
  non è stata toccata.
- Le ricolorazioni tramonto/notte sono a programma dallo stesso
  disegno (tramonto: grading caldo come il panorama; notte: blu scuro
  con alone del fanale conservato), così le versioni si scambiano senza
  spostamenti.
- La scogliera è in vista frontale, come la grotta e la torre già nel
  gioco: la corda pende dall'anello in cima fino alla cengia in basso.

## Anteprime (`controllo/`, su fondi veri)

- `anteprima-ormeggio.png` — Sirena ormeggiata sul mare con il pontile.
- `anteprima-velocita.png` — la Sirena a velocità massima con la scia lunga.
- `anteprima-approdi.png` — scogliera e spiaggia sulla costa.
- `anteprima-varianti-luce.png` — bandierina e boa nelle versioni
  giorno, tramonto e notte.

STATO: pronto
