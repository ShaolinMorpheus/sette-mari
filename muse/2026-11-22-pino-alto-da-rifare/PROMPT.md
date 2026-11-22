# Il Pino Alto va rifatto — SOLO il Pino Alto, nello stile dei pini già in gioco

**Cambia solo il Pino Alto** (l'albero su cui sale il personaggio). Tutti gli altri alberi restano com'erano:
gli alberi e i pini della consegna del 22 nov (`2026-11-22-richieste-creature-e-alberi`) **non vanno montati**
e non vanno rifatti. Se vuoi usarli come materiale va bene, ma il Pino Alto deve somigliare ai pini **già in gioco**.

Guarda `riferimento-pino-alto-attuale.png.b64` (stessa cartella): a sinistra il Pino Alto attuale, a destra i pini
e un albero come sono oggi nel gioco. Il Pino Alto attuale è disegnato a codice, piatto e geometrico: non somiglia
agli altri pini. Quello consegnato da te il 22 nov invece era **tutto fino** (tronco di circa 40 px, pochi
ciuffi staccati in cima) e Davide l'ha scartato.

## Cosa serve

Un Pino Alto **dello stesso stile dei pini in gioco**: abete dipinto morbido, aghi a ciuffi sovrapposti verde-blu
(da verde acqua a verde scuro con qualche tocco giallo-verde), come i due pini al centro del riferimento — ma
**molto più grande**, alto e pieno.

- **Tronco robusto**, ben visibile sotto la chioma: circa **90–110 px (file) a metà altezza**, più largo alla base
  (circa 200–240 px con le radici che si aprono sul terreno), si restringe piano verso la piattaforma. Corteccia
  con venature, luce da sinistra.
- **Chioma piena**, a strati sovrapposti di ciuffi (come i pini in gioco), larga almeno **320–380 px (file)** nel
  punto più largo e che si restringe verso la punta. **Sopra e attorno alla piattaforma**, senza buchi: deve
  sembrare un pino vero, alto e fitto. Qualche ramo anche sotto la piattaforma, ma il tronco sotto resta ben leggibile.
- **Piattaforma di vedetta** con parapetto di legno, come nella consegna del 22 nov: base della piattaforma a
  **744 px (file) sopra la base del tronco**, ben visibile in mezzo alla chioma.
- **Scala di corda** con pioli, **attaccata al bordo della piattaforma** (non staccata) e che arriva a terra,
  dritta e verticale. Il suo asse sta a **64 px (file) a destra dell'asse del tronco**: il personaggio sale lungo
  quella linea, quindi la posizione è fissa.

## Misure e ancora (importante)

- Tela **760×1920** (in gioco 190×480), base del tronco a **y=1888**.
- **L'asse del tronco deve stare esattamente a x=380** (centro del file). Nella consegna scorsa il tronco stava
  a x≈298, quindi la scala risultava a circa 146 px dal tronco invece di 64 e restava staccata dalla piattaforma.
  **Misura la x del tronco a metà altezza e alla base e scrivila nel LEGGIMI.**
- Ombra morbida a terra inclusa.
- Due file: `pino-alto.png` e `pino-alto-notte.png` (stessi pixel, toni della sera).

## Controlli prima di dire «pronto»

1. Foglio di controllo con il Pino Alto accanto a un pino di gioco del riferimento, in scala di gioco
   (190×480 contro 113×160): stessa mano, deve **dominare** gli altri alberi.
2. Il tronco non deve essere più stretto del 12% della larghezza del file (circa 90 px) a metà altezza.
3. LEGGIMI con le misure (asse tronco a metà e alla base, larghezza tronco, larghezza chioma, quota piattaforma,
   asse scala) e `STATO: pronto`.
