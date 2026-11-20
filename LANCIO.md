# Promemoria di lancio — «Sette Mari» (Android / Google Play)

Documento per Claude, da leggere prima di preparare la versione di lancio.
Contesto: gioco Android (Capacitor, codice in `www/index.html`, repo `ShaolinMorpheus/sette-mari`), pubblicazione su Google Play, gratuito con pubblicità AdMob + acquisto in-app «rimuovi pubblicità». Muse cura la grafica in `muse/`; Claude tiene il codice. Questo promemoria elenca tutto ciò che NON va dimenticato al lancio, diviso tra cose da fare nel codice (Claude) e cose da fare in Play Console / account (utente, ma Claude deve ricordarle e verificarle).

## 1. Da integrare nel codice (Claude)

- **Firebase Analytics + Crashlytics dalla prima versione pubblica.** Eventi minimi: apertura app, inizio/fine sessione, inizio e completamento missione, visualizzazione rewarded, click su «rimuovi pubblicità». I dati di utilizzo precedenti all'integrazione non si recuperano; senza Crashlytics i crash degli utenti sono invisibili.
- **Consenso GDPR con Google UMP SDK**, mostrato al primo avvio per gli utenti europei, prima di qualsiasi richiesta pubblicitaria personalizzata. Senza consenso, AdMob in Europa è limitato e si rischiano sanzioni/sospensioni.
- **AdMob** con ID app reale (non di test) nella build di produzione; ID di test in sviluppo. Regole tassative:
  - MAI interstiziali all'avvio dell'app, alla ripresa, o sul tasto indietro (violazione delle policy = ban dell'account).
  - Interstiziali solo a fine azione completata (es. fine missione), con frequenza limitata.
  - Rewarded solo su azione volontaria dell'utente, con ricompensa dichiarata prima della visione.
- **Google Play Billing** per l'acquisto in-app «rimuovi pubblicità» (prezzo deciso: €1,99–2,99): prodotto gestito lato Play Console, acquisto da confermare (acknowledge) nel codice, stato «senza pubblicità» persistente e ripristinabile (restore) su reinstallazione/cambio telefono.
- **Prompt di valutazione** (Play In-App Review API) solo dopo un momento positivo (es. missione completata), mai all'avvio, con limite di frequenza.
- **Target API Android** aggiornato al livello richiesto da Google Play al momento dell'invio; build in formato **AAB** (Android App Bundle), non APK, per la pubblicazione.
- **Permessi minimi**: nessun permesso oltre lo stretto necessario al gioco; ogni permesso superfluo va rimosso (in Console va giustificato).
- **Prestazioni**: il calo da 60 a 30 FPS vicino al mare va risolto prima del lancio e il gioco va provato su un telefono di fascia media, non solo sul Galaxy S25 Plus dell'utente. Obiettivo: esperienza fluida sui dispositivi comuni; è la prima causa di recensioni a 1 stella.
- **Solo elementi originali**: stile ispirato ad altri giochi marinareschi va bene, ma nessun asset, nome, testo o musica copiati da giochi esistenti; verificare le licenze di suoni ed eventuali font non propri.
- Schermata/impostazione «Informativa privacy» raggiungibile dall'interno del gioco, con link alla privacy policy pubblicata.

## 2. Da fare in Play Console e account (utente, con verifica di Claude)

- Account sviluppatore Google Play verificato (identità, pagamento una tantum $25).
- **Test chiuso obbligatorio per gli account personali nuovi: almeno 12 tester per 14 giorni** prima di poter richiedere l'accesso alla produzione. Pianificarlo per tempo: è il blocco più dimenticato e costa due settimane di attesa.
- Play App Signing attivo; **backup della chiave di upload** conservato fuori dal PC (se si perde, il recupero è lungo e non garantito).
- Scheda del negozio completa: icona, immagine in evidenza, screenshot reali di gioco, descrizione breve e completa; localizzazioni già disponibili del gioco (EN/DE/ES/FR) anche sulla scheda.
- Questionario **classificazione contenuti (IARC)** compilato; dichiarazione del **pubblico di destinazione**: valutare 13+ (se si dichiara anche pubblico di bambini scattano regole molto più restrittive su annunci e dati).
- Sezione **«Sicurezza dei dati»** compilata in modo coerente con ciò che Firebase Analytics e AdMob raccolgono davvero (devono corrispondere, Google verifica).
- Dichiarazione **«Contiene annunci»** attiva sulla scheda; email di supporto pubblica impostata.
- **Privacy policy pubblicata** su pagina web stabile (GitHub Pages va bene) e URL inserito in Console e nel gioco.
- Account **AdMob verificato**, app collegata, e file **app-ads.txt** pubblicato sul dominio del sito sviluppatore.
- Prodotto in-app «rimuovi pubblicità» creato in Console con prezzo €1,99–2,99 e account di test (license tester) configurato per provarlo senza pagare.

## 3. Prima di premere «pubblica» — controllo finale

- [ ] Build AAB di produzione con ID AdMob reali e Firebase attivo
- [ ] Consenso UMP provato da rete europea
- [ ] Interstiziali mai ad avvio/indietro; rewarded volontari
- [ ] Acquisto «rimuovi pubblicità» comprato in test, ripristinato dopo reinstallazione
- [ ] Crash di prova visibile in Crashlytics; eventi visibili in Analytics
- [ ] FPS stabili su telefono di fascia media, zona mare inclusa
- [ ] Privacy policy online e linkata in Console e in app
- [ ] Sezione Sicurezza dei dati coerente con SDK presenti
- [ ] Test chiuso 12 tester × 14 giorni completato (account nuovi)
- [ ] Backup chiave di upload fatto
- [ ] Scheda negozio con screenshot reali e lingue pronte

*Nota: le regole di Google Play cambiano; verificare in Console i requisiti correnti (target API, test chiuso, moduli obbligatori) al momento dell'invio.*

---

# Aggiunte di Claude — 20 novembre 2026

## 4. Verificato online il 20 nov 2026 (ricontrollare in Console al momento dell'invio)

- **Test chiuso:** obbligatorio solo per gli account personali creati DOPO il 13 novembre 2023: servono almeno 12 tester iscritti senza interruzioni per 14 giorni prima di chiedere la produzione. Gli account creati prima e gli account organizzazione ne sono esenti. → Controllare la data di creazione dell'account Play. Fonte: https://support.google.com/googleplay/android-developer/answer/14151465
- **Target API:** dal 31 agosto 2026 nuove app e aggiornamenti devono avere target Android 16 (API 36); la proroga al 1 novembre è scaduta. Il workflow `build-play.yml` ferma già la build se `targetSdk` < 36 (compileSdk 36). Fonte: https://support.google.com/googleplay/android-developer/answer/11926878
- **Schermi grandi (tablet, pieghevoli ≥ 600 dp):** con target 36 Android ignora blocco di orientamento e ridimensionamento, TRANNE per i giochi dichiarati con `android:appCategory="game"`. Capacitor non lo mette: va aggiunto al manifest (oggi NON è nel workflow). Provare comunque su emulatore tablet. Fonte: https://developer.android.com/develop/ui/compose/layouts/adaptive/app-orientation-aspect-ratio-resizability
- **Indirizzo pubblico:** per gli account con acquisti in-app (qui «rimuovi pubblicità») Google mostra l'indirizzo completo sulla scheda del negozio (è quello del profilo pagamenti collegato). In più c'è la dichiarazione dello stato di «trader» (norma UE sui servizi digitali): chi guadagna da annunci/acquisti di norma è trader e i contatti diventano pubblici. Scadenze e dettagli da verificare in Console (le fonti secondarie parlano del 2027). Fonte: https://support.google.com/googleplay/android-developer/answer/13634081

## 5. Stato nel repo al 20 nov 2026

Già fatto: workflow AAB (`build-play.yml`, versionCode = numero di esecuzione), `capacitor.play.config.json` con il gioco DENTRO l'app (senza `server.url`; la build APK di sviluppo invece carica da GitHub Pages), plugin AdMob con ID di PROVA e video con ricompensa predisposto, icona 512, bozza scheda (`play/store-listing.md`, IT/EN/DE/ES/FR), modello di privacy policy. Non ancora fatto: Firebase Analytics/Crashlytics, consenso UMP, Play Billing, prompt di valutazione, privacy policy pubblicata, `appCategory="game"`, test chiuso.

## 6. Voci in più da non dimenticare

**Codice (Claude)**
1. `android:appCategory="game"` nel manifest (vedi sopra) e prova su emulatore tablet/pieghevole.
2. Memoria e avvio su telefono di fascia media/bassa (3–4 GB di RAM): `index.html` pesa ~23 MB con le immagini incorporate; misurare tempo di avvio e memoria, e se serve spezzare le immagini in file caricati a richiesta. Con i nuovi disegni di Muse il peso cresce.
3. Annunci mai vicino ai comandi (joystick, tasti di gioco): i clic accidentali violano le regole AdMob. Livello massimo di contenuto degli annunci coerente con la classificazione (violenza lieve da cartoon).
4. Salvataggi: test di migrazione da una versione vecchia a quella nuova; decidere cosa succede con reinstallazione/cambio telefono (backup automatico di Android oppure codice breve e copia di sicurezza già nel gioco).
5. Traduzioni complete IT/EN/DE/ES/FR prima del lancio: le righe nuove (es. Briciola) oggi sono solo in italiano. Ultimo giro CSV con Muse. La scheda Play promette cinque lingue.
6. Nella build Play, controllare che la ricarica automatica (`v.txt`) non faccia nulla di strano e che il gioco parta offline.
7. Controllare il «report pre-lancio» di Play (gira da solo su telefoni di prova a ogni build del test chiuso) e, dopo il lancio, Android vitals (crash e blocchi).
8. Prima uscita in produzione a rilascio graduale (es. 10–20%) e un piano per tornare indietro.

**Console e account (utente)**
9. L'ID app `it.settemari.game` è definitivo dopo il primo caricamento. Controllare che il nome «Sette Mari» non sia già usato su Play o come marchio.
10. Tester: servono persone con Android e account Google; gli amici con iPhone/Netlify non contano. Reclutarne 15–20 per coprire chi esce (il conteggio dei 14 giorni salta se scendono sotto 12). Gli amici che hanno oggi l'APK di prova (firmato con la chiave di debug) per passare alla versione Play dovranno disinstallare: prima salvare con codice breve/copia di sicurezza.
11. Fisco e lavoro: prima del primo incasso (annunci + acquisti) decidere con un commercialista come dichiararlo (partita IVA o altro) e controllare il contratto di lavoro su attività extra; compilare i moduli fiscali richiesti da Play e AdMob. (Claude non è un commercialista: questa è solo una voce da non dimenticare.)
12. Grafica del negozio: icona 512 (c'è), immagine in evidenza 1024×500, screenshot SOLO di ciò che è presente nella versione pubblicata (se si lancia con i Capitoli 1–2, niente scene del Capitolo 3). Da chiedere a Muse.
13. Provenienza dei materiali: tenere la cartella `muse/` (prompt e consegne in git) come registro; niente personaggi o marchi riconoscibili; musica e suoni con licenza.
14. Tempi: la revisione di Google può durare giorni e il test chiuso 14 giorni. Meglio far partire il test appena c'è una build con Firebase/UMP/AdMob (ID di prova) e continuare ad aggiungere contenuti con aggiornamenti al test mentre i giorni passano.
15. iPhone: oggi gli amici giocano dal sito Netlify. Per l'App Store servono un account Apple a pagamento e una build su Mac o cloud: decidere dopo il lancio su Android.

## 7. Decisione di Davide (20 nov 2026)

Al lancio devono essere giocabili TUTTI e quattro i capitoli (non il lancio a due tempi proposto prima). Quindi la storia (25 missioni del piano in `muse/2026-11-16-sistemazione-capitoli/`) e i disegni (`muse/2026-11-20-richieste-storia-completa/PROMPT.md`) sono sul percorso del lancio. Il test chiuso di 14 giorni resta il collo di bottiglia: far partire una build di test appena possibile e aggiornarla durante i giorni. La scheda Play va aggiornata (ora dice «due capitoli giocabili»).
