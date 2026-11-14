# Marinaio torcia — v7 AGGIORNATA (busto dai frame senza torcia)

Aggiornamento della cartella v7 su indicazione dell'utente del 14 nov pomeriggio:
il busto della prima v7 era ridisegnato e non andava bene. Qui ogni frame PARTE
dal frame senza torcia del marinaio, intero: testa, busto, braccio libero,
gambe e stivali sono i suoi, pixel per pixel.

## Metodo (come richiesto)
Per ogni frame torcia (stessa vista e stesso passo):
- base = `02-marinaio-righe_<vista>-<passo>` senza torcia, intero;
- aggiunto SOLO il braccio che regge la torcia: mano e torcia prese dai frame
  torcia del Capitano (stessa vista e stesso passo);
- la manica è bianca come la sua: in fronte e profilo la fascia del braccio
  usa la texture della SUA manica bianca (campionata dal suo stesso frame)
  sulla posa del Capitano; nelle spalle il braccio è quello della v7
  precedente (manica già bianca), ricollocato sul suo frame;
- l'altro braccio resta quello del frame senza torcia;
- la sua mano che penzolava dal lato della torcia è stata rimossa
  (è la stessa mano, ora sulla torcia); in fronte l'anca sotto la mano
  è ricostruita col bordo dei suoi pantaloni.

## Gambe
Sono le SUE in tutte le viste (frame senza torcia):
- profilo e spalle: stessi disegni delle gambe approvate nella v7
  (coincidono: erano già le gambe di camminata del Capitano);
- fronte: il suo ciclo di camminata — passo1/3 gambe vicine, passo2/4 ampio —
  NON le gambe fronte della prima v7: venivano dai frame torcia del Capitano
  (ciclo diverso, figura ~7 px più lunga) e innestarle avrebbe tagliato
  la cintura a metà. Se le vuoi comunque, le metto.

## Controlli (cartella controllo/)
Per ogni frame: sovrapposizione al 50% col corrispondente frame senza torcia.
Il busto deve coincidere — esito per TUTTI i 20 frame: SÌ.
Misure: differenze solo nella zona del braccio sostituito.
- fronte: 0 pixel diversi fuori dalla zona del braccio (tutti i frame);
- profilo-destro/sinistro: al massimo 54 pixel di bordo fuori zona;
- spalle: differenze solo nella zona braccio/fiamma.
Niente rettangoli o chiazze bianche; righe continue come nei frame senza
torcia (il busto È il suo frame); nessuna macchia vicino a bocca e torcia.

## Cosa NON deve cambiare
Testa, viso, busto, braccio libero, cintura, gambe e stivali = i frame
senza torcia del marinaio. Da cambiare solo il braccio con la torcia.

## File
- frame/: 20 frame torcia (fronte, profilo-destro, profilo-sinistro,
  spalle × fermo, passo1–4), PNG in base64 (una riga), canvas 336×376,
  sfondo verde uniforme (203,228,172).
- controllo/: 20 sovrapposizioni 50% coi frame senza torcia.
- elenco.txt: elenco dei 20 frame.

STATO: pronto
