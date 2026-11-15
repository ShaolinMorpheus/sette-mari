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
    della giacca non vengono conservati), cintura marrone sottile con
    **fibbia grigia**; pantaloni blu medio; sfondo appiattito sul verde
    uniforme (203,228,172) come nei frame approvati.
- I profili sinistri sono disegnati sui frame sinistri del Capitano,
  **non specchiati** dai destri.
- Nei frame con la torcia la posa è quella del Capitano (braccio in avanti,
  mano allo sterno): **fiamma e manico restano verbatim** e protetti, la
  manica è a righe come negli altri frame, la mano è quella del Capitano
  che stringe la torcia.

## Ritocchi chiesti il 15 nov (gruppo B), applicati anche al gruppo A

I 5 frame del gruppo A sono stati **rigenerati con la ricetta aggiornata**
e sostituiscono quelli della prima consegna in questa cartella.

1. **Braccio più leggibile**: contorno scuro morbido lungo **tutto** il
   braccio, dalla spalla al polsino (banda a cavallo del bordo del braccio
   con bordo smussato, sfumata sul colore dipinto; niente nodi da bottoni).
2. **Fibbia**: piccola e chiara (al massimo 9×7 px, sul gruppo metallico
   frontale della cintura del Capitano), **senza riquadro grigio e senza
   linea scura a triangolo**; cintura marrone **uniforme**.
3. **Sotto la cintura**: la manica davanti ai pantaloni ha **le righe**
   come sopra la cintura; il polsino chiaro resta, ma è solo la banda
   al polso.
4. **Scollo**: tolto il filo rosso al collo — il bordo rosso vivo della
   maglia allo scollo viene ridipinto con le righe anche sotto l'alone
   della testa (viso, barba e capelli restano protetti: i loro toni
   non sono rosso vivo).

## Gruppo A — rigenerato con i ritocchi (5 frame)

- `frame/02-marinaio-righe_profilo-destro-passo2.png.b64`
- `frame/02-marinaio-righe_profilo-destro-passo3.png.b64`
- `frame/02-marinaio-righe_profilo-destro-passo4.png.b64`
- `frame/02-marinaio-righe_profilo-sinistro-fermo.png.b64`
- `frame/02-marinaio-righe_profilo-sinistro-passo1.png.b64`

## Gruppo B — nuovo (5 frame)

- `frame/02-marinaio-righe_profilo-sinistro-passo2.png.b64`
- `frame/02-marinaio-righe_profilo-sinistro-passo3.png.b64`
- `frame/02-marinaio-righe_profilo-sinistro-passo4.png.b64`
- `frame/02-marinaio-righe_torcia-profilo-destro-fermo.png.b64`
- `frame/02-marinaio-righe_torcia-profilo-destro-passo1.png.b64`

In `controllo/` la sovrapposizione al 50% di ogni frame con il frame del
Capitano con lo stesso nome; `foglio-gruppo-a.png.b64` e
`foglio-gruppo-b.png.b64` sono i fogli interi dei due gruppi prima del taglio.

## Controlli fatti prima della consegna (su ogni frame, anche a ingrandimento)

- **Sagoma = Capitano**: differenza di sagoma 0 px in 8 frame su 10;
  1 px di bordo in profilo-sinistro-passo4 e 3 px di bordo in
  torcia-profilo-destro-fermo (pixel di antialias sul contorno del
  polsino/pugno, dipinti e dentro la figura: la differenza è solo nel
  ricalcolo della maschera).
- **Testa intatta**: 0 pixel della figura modificati sopra la riga 145
  in tutti e 10 i frame.
- **Braccio**: contorno morbido continuo dalla spalla al polsino in
  tutti i frame; sotto la cintura la manica è a righe e il polsino è
  solo la banda al polso.
- **Fibbia**: presente in tutti e 10 i frame, piccola (22–48 px) e
  chiara, al fronte della cintura; cintura uniforme, niente triangolo
  scuro (verificato a zoom sui profili sinistri).
- **Scollo**: il filo rosso è sparito (in profilo-sinistro-passo1 resta
  1 solo px rosso vivo invariato su 370 nella fascia del collo; il
  resto è ridipinto con le righe).
- **Torcia**: fiamma e manico identici al Capitano; manica a righe con
  contorno; mano del Capitano che stringe la torcia.
- Nota: nei frame torcia la cucitura posteriore della manica è una
  linea diagonale morbida sul petto (segue la banda della manica del
  Capitano, che è orizzontale davanti al petto).

## Prossimi gruppi (in attesa di via libera dopo ogni gruppo)

- Gruppo C: torcia-profilo-destro-passo2, passo3, passo4 e
  torcia-profilo-sinistro-fermo, passo1.
- Poi gli altri frame con la torcia, a gruppi da 5.
- Alla fine gli attacchi (ascia, piccone, mani nude), a gruppi.

STATO: gruppo B pronto
