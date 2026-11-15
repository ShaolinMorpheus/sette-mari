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
- Nei frame con la torcia la posa sopra la cintura è quella del Capitano
  (braccio in avanti, mano allo sterno): **fiamma e manico restano
  verbatim** e protetti, la manica è a righe come negli altri frame, la
  mano è quella del Capitano che stringe la torcia. **Le gambe invece
  vengono dal frame di camminata con lo stesso nome** (vedi ritocchi
  secondo giro): i frame torcia di profilo del Capitano hanno la gamba
  dietro alzata in posa di corsa in passo1/3, il ciclo di camminata è
  il riferimento giusto.

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

## Ritocchi secondo giro (gruppo C, chiesti il 15 nov)

1. **Contorno del braccio**: non più una linea grigia ondulata. Ora è
   un contorno **morbido, scuro e sottile** che segue l'arco del
   braccio dalla spalla al polsino: la maschera del braccio viene
   prima smussata (chiusura/apertura, via i dentelli dei bottoni) e
   la banda è lo straddle stretto del bordo smussato. Nei frame
   torcia la **cucitura posteriore della manica sul petto è stata
   tolta**: il contorno segue solo i bordi superiore e inferiore
   della manica, il braccio esce dalla spalla come nel Capitano.
2. **Gambe torcia dal ciclo di camminata**: in tutti i frame torcia
   di profilo le righe sotto la cintura vengono dal frame di
   camminata con lo stesso nome, allineate alla cintura (spostamento
   verticale 5–13 px e, dove serve, orizzontale sulla mediana del
   bacino; i frame torcia del Capitano non condividono sempre la
   stessa ancora). Il manico della torcia, che scende sotto la
   cintura, viene ripristinato verbatim sopra le gambe; la mano
   pendente del frame di camminata viene cancellata (quel braccio è
   su, con la torcia). In particolare **torcia-profilo-destro-passo1
   è rifatto**: gamba dietro in diagonale all'indietro con lo stivale
   a terra, come nel passo1 di camminata, non più quasi orizzontale.
3. **Uniformità**: **profilo-destro-fermo e profilo-destro-passo1
   sono rifatti con lo stesso metodo pulito** (maglia, braccio e
   fibbia identici agli altri frame). Gli originali della scheda
   restano intatti in `muse/2026-11-14-marinaio-da-zero/`.

## Gruppo C — contenuto (8 frame)

Nuovi:
- `frame/02-marinaio-righe_torcia-profilo-destro-passo2.png.b64`
- `frame/02-marinaio-righe_torcia-profilo-destro-passo3.png.b64`
- `frame/02-marinaio-righe_torcia-profilo-destro-passo4.png.b64`
- `frame/02-marinaio-righe_torcia-profilo-sinistro-fermo.png.b64`
- `frame/02-marinaio-righe_torcia-profilo-sinistro-passo1.png.b64`

Rimandati rifatti:
- `frame/02-marinaio-righe_torcia-profilo-destro-passo1.png.b64` (gambe corrette)
- `frame/02-marinaio-righe_profilo-destro-fermo.png.b64` (metodo pulito)
- `frame/02-marinaio-righe_profilo-destro-passo1.png.b64` (metodo pulito)

`foglio-gruppo-c.png.b64` è il foglio intero del gruppo prima del taglio.
Le sovrapposizioni in `controllo/` sono al 50% con il frame del Capitano
con lo stesso nome: nei frame torcia le gambe differiscono di proposito
(sono quelle della camminata, si vede nella sovrapposizione sotto la
cintura); tutto il resto coincide.

## Controlli gruppo C (su ogni frame, anche a ingrandimento)

- **Testa intatta**: 0 modifiche sopra la riga 145 in tutti gli 8 frame.
- **Sagoma**: identica alla base ridipinta in 6 frame su 8; 15 px di
  bordo in torcia-profilo-destro-passo2 (pixel di antialias sul bordo
  tra pugno e pantaloni) e 3 px in torcia-profilo-sinistro-fermo.
- **Gambe torcia**: passo1/3 vicine con stivali a terra, passo2/4 in
  falcata, come la camminata; nessuna seconda mano sotto la cintura
  (verificato a zoom su passo1, passo2 e passo4 destri e sui sinistri:
  la mano libera che si vede in torcia-profilo-sinistro-fermo e
  passo1 è quella del Capitano stesso, sotto la cintura).
- **Braccio**: contorno sottile e continuo, niente linea ondulata sul
  petto; nei torcia niente cucitura posteriore della manica.
- **Fibbia**: presente in tutti gli 8 frame, piccola (29–48 px) e
  chiara; cintura uniforme.

## Prossimi gruppi (in attesa di via libera dopo ogni gruppo)

- Gruppo D: torcia-profilo-sinistro-passo2, passo3, passo4 e
  torcia-fronte-fermo, passo1.
- Poi gli altri frame con la torcia (fronte, spalle), a gruppi da 5.
- Alla fine gli attacchi (ascia, piccone, mani nude), a gruppi.
- Restano fuori da questo rifacimento, perché approvati nel set
  precedente e non citati negli ordini: fronte e spalle passi 1–4
  senza torcia (fronte-fermo e spalle-fermo sono nella scheda tenuta).

STATO: gruppo C pronto
