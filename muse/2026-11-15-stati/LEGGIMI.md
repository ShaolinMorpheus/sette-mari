# Oggetti con stati e luoghi — ridipintura pastello viva (15 novembre 2026)

Regola di stile applicata (permanente, dall'utente): colori PIÙ VIVI di quanto sembrino su fondo neutro (schermo luminoso + luce/ombre/nebbia del motore). Fogliame corretto rispetto alla consegna vegetazione: saturazione +30% e tonalità ~10° verso il verde — rampa usata: (56,98,41) → (85,136,50) → (122,170,69) → (177,202,103) → (215,228,147). Legno e pietra invariati. LINEE SCURE PRESERVATE: rami, liane, crepe, contorni di pietra e giunture sono rimappati su una rampa marrone quasi nera (26,18,12) → (94,70,46), mai convertiti nel colore di fogliame o pietra. Stile pastello/acquerello (lavaggi, bordo di pigmento, grana di carta) ma colorato, mai sbiadito. Verifiche fatte sui fondi veri del gioco (erba e sabbia nuovi): vedi le anteprime in `controllo/`.

Metodo: come per la vegetazione, ogni sprite è ridipinto DENTRO la sagoma dello sprite attuale preso dai sorgenti del repo (moduli `sorgenti/art/art_js.js`, `rub_js_full.js`, `bld_js_full.js`, `sorgenti/chest/`, `sorgenti/dec/`): alpha identico byte per byte (verificato per ogni file), stessa misura in pixel, stessa ancora. Gli stati di uno stesso oggetto sono lavorati in un'unica passata: stessa tavolozza, stessi lavaggi (stesso seme) e, per le coppie con file separati, stesse statistiche di luminanza calcolate sullo stato pieno.

## Stati — cosa è stato fatto, oggetto per oggetto

- **bush → bush0**: bush0 è DERIVATO dal bush ridipinto: stessa sagoma, stesse liane scure, stessi lavaggi; cambia solo il fogliame, dove le foglie nuove (le zone chiare e giallo-verdi) sono portate al tono maturo. NOTA: nel gioco oggi esistono DUE definizioni di bush0 — in art_js è lo stesso cespuglio con le liane sbiadite; nel modulo rub («cespuglio senza liane») è un cespuglio diverso e più grande (disegno 62×57,4). La bush0 consegnata segue la specifica dell'utente (stesse liane, niente foglie nuove): se il motore carica la bush0 del modulo rub, va riallineata a questa.
- **berry → berry0**: berry0 è DERIVATO dal berry ridipinto togliendo solo le bacche (472 pixel sostituiti col fogliame circostante; alpha e resto identici al pixel). Motivo: la berry0 attuale del gioco ha la stessa sagoma ma un disegno di foglie diverso (foglie più grandi e lisce) — ridipingerla a parte avrebbe conservato l'incoerenza segnalata dall'utente.
- **boulder**: le 5 forme in gioco sono DUE arti (rA e rB) combinate con specchiature e filtri del motore: consegnate le due arti ridipinte (`boulder-a` = rA, `boulder-b` = rB); le 5 forme si ricavano come oggi. Muschio vivo, crepe scure preservate. Lo stato picconato per singola forma NON ESISTE nel gioco: non è stato inventato (vedi sotto).
- **rubble / rubbleS**: sono già lo stato picconato (il modulo si chiama «rocce spaccate»): ridipinti tali e quali (pietra, muschio, crepe scure). Uno stato «intero» separato per loro non esiste: l'intero è il boulder.
- **stump**: stato unico, ridipinto (anelli del taglio e venature scure preservati).
- **shell** (nomi di gioco: scallop, spiral, cone): stato unico; ridipintura a tonalità conservata (famiglie di colore originali, saturazione +12%, solchi scuri preservati).
- **palm → palm0**: verificato nei sorgenti — nel motore palm0 e palm derivano dalla STESSA arte di base (`SP.palm0 = pal`; `SP.palm = palC`, cioè la stessa base con le noci disegnate dal motore sul canvas): il tronco è identico per costruzione e le noci non fanno parte dello sprite. La palma ridipinta è già stata consegnata in `2026-11-15-vegetazione/` con la tavolozza precedente (più spenta): su richiesta la riemetto con la regola viva applicata qui.
- **falò**: nel gioco è a due strati — `falo_b` (ceppi e cerchio di pietre = spento) e `falo_f` (sola fiamma, ancorata quasi allo stesso punto = acceso quando il motore la sovrappone). Ridipinti entrambi; la fiamma resta arancio vivo (mediana originale 229,137,44 → ridipinta 238,126,12). Anteprima con i due stati affiancati.
- **chest**: quattro sprite di gioco — ferro_c/ferro_a e oro_c/oro_a (chiuso/aperto): ridipinti a coppie con statistiche condivise; bande di ferro su rampa metallica, parti dorate su rampa oro, legno invariato, giunture scure.
- **crate / crateO** (nomi di gioco cassa_c / cassa_a): coppia chiuso/aperto ridipinta con statistiche condivise. **barrel**: le due varianti di gioco (barile_a, barile_b, stessa misura) consegnate come barrel-a / barrel-b.

## Luoghi (sprite unici, misure attuali)

- **grotta** = l'ingresso della miniera (`SP.mina`, patch v42: «ingresso della miniera (la grotta buia)»): ridipinto — pietre chiare, muschio vivo, travi di legno, apertura che resta buia, lanterna. Stati con/senza torcia accesa NON ESISTONO: l'arte è unica (la lanterna fa parte del disegno).
- **capanna** (`SP.capanna`) e **banco** (`SP.banco`): ridipinti, stato unico.

## Dichiarato, non inventato (stati/oggetti che nel gioco non esistono come sprite)

- **boulder picconato per forma**: nessuno sprite nei sorgenti; lo «spaccato» esistente è rubble/rubbleS.
- **rockpool** (pozza piena/vuota): nessuno sprite in nessun modulo dei sorgenti (art, dec, chest, props, bld, patch v34–v84). Se nel gioco è disegnata a codice in index.html, servono file o misure per rifarla.
- **mesa** (intero/picconato): nessuno sprite trovato nei sorgenti, come sopra.
- **Pino Alto**: esiste come luogo (citato in patch v62) ma non ha uno sprite dedicato: il pino è `SP.pine`, già ridipinto in `2026-11-15-vegetazione/`. Nessuno stato «con/senza giocatore sopra» esiste come sprite.
- **tent, torre, oldcamp, sign, bandiera**: nessuno sprite in nessun modulo dei sorgenti. Probabilmente disegnati a codice o composti nel file del gioco: senza file/misure non li ho inventati.
- **corda** (matassa, props: disegno 36×31,5): esiste ma non era nell'elenco; non inclusa.

## Tabella misure (pixel del file = sprite attuale; disegno e ancora sono quelli del motore)

| file | pixel | disegno | ancora | sorgente |
|---|---|---|---|---|
| bush.png / bush0.png | 128×120 | 64×60 | 32, 58 | art_js SP.bush |
| berry.png / berry0.png | 128×118 | 64×59 | 32, 57 | art_js SP.berry |
| boulder-a.png (rA) | 114×160 | 57×80 | 28,5, 78 | art_js rA |
| boulder-b.png (rB) | 90×92 | 45×46 | 22,5, 44 | art_js rB |
| rubble.png | 259×181 | 74×51,6 | 37, 49,6 | rub_js SP.rubble |
| rubbleS.png | 175×92 | 50×26,3 | 25, 24,6 | rub_js SP.rubbleS |
| stump.png | 120×84 | 30×21 | 15, 18 | art_js SP.stump |
| scallop.png | 128×122 | = pixel | — | dec_assets |
| spiral.png | 140×116 | = pixel | — | dec_assets |
| cone.png | 120×71 | = pixel | — | dec_assets |
| grotta.png (mina) | 364×335 | 140×128,7 | 70, 125,7 | bld_js SP.mina |
| capanna.png | 494×527 | 190×202,8 | 104, 193,8 | bld_js SP.capanna |
| banco.png | 390×283 | 150×108,7 | 75, 106,7 | bld_js SP.banco |
| ferro_c.png | 180×132 | 60×44,1 | 30, 43,2 | chest_mod |
| ferro_a.png | 196×205 | 65,3×68,4 | 30,8, 66,8 | chest_mod |
| oro_c.png | 180×143 | 60×47,8 | 30, 46,9 | chest_mod |
| oro_a.png | 196×189 | 65,5×63,1 | 35,3, 60,3 | chest_mod |
| falo_b.png | 252×222 | 84×73,9 | 42, 62,8 | chest_mod |
| falo_f.png | 145×159 | 48,4×53,1 | 22,5, 62,9 | chest_mod |
| crate.png (cassa_c) | 169×142 | 56,3×47,3 | 28, 46,7 | props_mod |
| crateO.png (cassa_a) | 175×189 | 58,4×63 | 30,1, 62,2 | props_mod |
| barrel-a.png (barile_a) | 102×122 | 34,1×40,8 | 17,1, 40,1 | props_mod |
| barrel-b.png (barile_b) | 102×122 | 34×40,8 | 17, 40,1 | props_mod |

## Anteprime (in `controllo/`)

Una per oggetto, stati affiancati sul fondo vero del gioco: bush, berry, boulder (interi + rubble/rubbleS), stump, shell, grotta, capanna-banco, chest, falo (spento/acceso), crate-barrel.

STATO: consegna pronta — stati/oggetti senza sprite nel gioco dichiarati sopra, non inventati
