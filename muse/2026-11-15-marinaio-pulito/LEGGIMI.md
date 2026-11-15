# Marinaio a righe — rifacimento con metodo pulito (foglio intero, un solo passaggio)

## Come sono stati fatti i frame del Capitano (risposta alla domanda del 15 nov)

I set del Capitano (consegne del 13 novembre) sono stati prodotti **per fogli interi,
mai frame per frame**:

1. Per ogni set (camminata, torcia, colpi) è stato generato **un unico foglio pose**
   con il personaggio **completo in tutte le pose**, usando come riferimenti il foglio
   pose del motore e le tavole fronte/retro dell'abito.
2. Il foglio è stato poi **tagliato nei singoli frame** 336×376, normalizzando
   dimensione e posizione cella per cella.
3. Gli abiti sono stati ridipinti **foglio per foglio in un solo passaggio**,
   non ritoccando i singoli frame uno a uno.

È per questo che i frame del Capitano sono puliti: testa, contorni e proporzioni
nascono già nel disegno intero e nessun ritocco successivo li sporca. Gli errori
delle versioni precedenti del marinaio (righe sul viso, bordi grigi sui capelli,
buchi nelle gambe) venivano proprio dai ritocchi sui singoli frame già tagliati.

## Metodo usato per questo rifacimento (stesso principio)

- Si tiene solo la scheda approvata: **fronte-fermo, spalle-fermo,
  profilo-destro-fermo e profilo-destro-passo1 restano quelli già consegnati**
  in `muse/2026-11-14-marinaio-da-zero/` e **non sono stati modificati**.
- Per ogni gruppo: i frame del Capitano con lo stesso nome vengono composti in
  **un foglio unico**; il foglio viene ridipinto **in un unico passaggio** e solo
  alla fine tagliato nei frame. Nessun ritocco sui singoli frame.
- La ridipintura è a programma, in un solo passaggio sul foglio:
  - **posa dal Capitano**: sagoma, inquadratura, scala e punto dei piedi sono
    quelli del frame del Capitano con lo stesso nome, pixel per pixel;
  - **personaggio dalla scheda approvata**: testa, viso, capelli, barba,
    orecchino, pelle, mani e stivali sono copiati **verbatim** dal Capitano
    (la testa è protetta per costruzione e non viene mai dipinta: niente righe
    sul viso, niente bordi grigi sui capelli);
  - **abito ridisegnato nell'unico passaggio**: maglia a righe orizzontali
    bianche/blu regolari (bande da 6px ancorate alla cintura, ombreggiatura
    dalla luminanza sfumata del Capitano; bottoni, placket e dettagli rossi
    della giacca non vengono conservati), braccio separato dal busto dalla
    sua stessa linea d'ombra con manica a righe, polsino chiaro e mano color
    pelle; cintura marrone sottile con **fibbia grigia**; pantaloni blu medio;
    sfondo appiattito sul verde uniforme (203,228,172) come nei frame approvati.
- I profili sinistri sono disegnati sui frame sinistri del Capitano,
  **non specchiati** dai destri.

## Gruppo A — contenuto (5 frame)

- `frame/02-marinaio-righe_profilo-destro-passo2.png.b64`
- `frame/02-marinaio-righe_profilo-destro-passo3.png.b64`
- `frame/02-marinaio-righe_profilo-destro-passo4.png.b64`
- `frame/02-marinaio-righe_profilo-sinistro-fermo.png.b64`
- `frame/02-marinaio-righe_profilo-sinistro-passo1.png.b64`
- `controllo/` — sovrapposizione al 50% di ogni frame con il frame del
  Capitano con lo stesso nome.
- `foglio-gruppo-a.png.b64` — il foglio intero del gruppo, prima del taglio.

## Controlli fatti prima della consegna (su ogni frame, anche a ingrandimento)

- **Sagoma = Capitano**: differenza di sagoma 0 px in passo2, passo3, passo4 e
  profilo-sinistro-passo1; in profilo-sinistro-fermo 1 px di bordo, che è un
  pixel di antialias identico al Capitano (la differenza è solo nel ricalcolo
  della maschera, non nel disegno).
- **Testa intatta**: 0 pixel della figura modificati sopra la riga 145 in tutti
  e 5 i frame; viso, capelli e barba sono quelli del Capitano.
- **Niente righe su viso, capelli o stivali**; niente buchi nelle gambe;
  niente bordi grigi sui capelli.
- **Rosso della giacca sul busto**: residuo 0 px in passo3, passo4 e
  profilo-sinistro-fermo; 3 px in passo2 e 4 px in profilo-sinistro-passo1,
  tutti alla base dei capelli sullo scollo (un filettino di 3–4 px, dello
  stesso tipo presente nei frame approvati).
- **Braccio**: staccato dal busto, manica a righe, polsino e mano color pelle
  in tutti e 5 i frame; passo1/3 con gambe vicine e stivali a terra,
  passo2/4 in falcata, come nel Capitano.
- Nota: nei profili sinistri la fibbia grigia ha una forma triangolare perché
  è la forma del gruppo fibbia del Capitano in quella vista; è dentro la
  cintura e in metallo grigio come da scheda.

## Prossimi gruppi (in attesa di via libera dopo ogni gruppo)

- Gruppo B: profilo-sinistro-passo2, passo3, passo4 e
  torcia-profilo-destro-fermo, passo1.
- Poi gli altri frame con la torcia, a gruppi da 5.
- Alla fine gli attacchi (ascia, piccone, mani nude), a gruppi.

STATO: gruppo A pronto
