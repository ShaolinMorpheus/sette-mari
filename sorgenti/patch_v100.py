#!/usr/bin/env python3
# Sistemazione capitoli (Muse, 16 nov) — passo 1: A4b, A5, A6, A7
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(a,b,n=1):
    global src
    if src.count(a)!=n:print('PATCH100 FAIL',a[:70],src.count(a));sys.exit(1)
    src=src.replace(a,b)
# A6: Biscotto sottovoce alla rivelazione della Sirena
rep("""D('biscotto',"Cra! Rubata! Sirena! Rubata!")""","""D('biscotto',"Cra... rubata.")""")
# A7: il Capitano si accorge di aver riso
rep("""D('hero',"Sono una squadra strana. Ma una squadra."),""","""D('hero',"Sono una squadra strana. Ma una squadra."),D('hero',"Mi accorgo che sto ridendo. Non mi succedeva dal naufragio."),""")
# A5: cosa chiude la partenza (contatori veri)
rep("Ch2.assembly=function(){","""Ch2.closes=function(){const c=C();return "Dal Diario. Partire chiude: pagine di J. ("+(c.pages||0)+"/4) · Briciola ("+(c.ch&&c.ch.puppy?"scoperta":"non scoperta")+") · Tesori dei Fuggiaschi ("+(c.tre||0)+"/5)."};
Ch2.NEXT=k=>k==='solo'?"Prossimo scopo: seguire la stella bassa a ovest, la rotta di J. Seconda cosa nota: al largo passa un convoglio carico d'argento.":"Prossimo scopo: raggiungere la vela vista all'orizzonte. È un convoglio carico d'argento.";
Ch2.assembly=function(){""")
rep("""D('ferro',"Silenzio. {cap}, tu hai portato più di tutti. Parla."),D('hero',"Cosa dico?",""","""D('ferro',"Silenzio. {cap}, tu hai portato più di tutti. Parla."),D('hero',Ch2.closes()),D('hero',"Cosa dico?",""")
rep("""D('hero',"La nave è pronta, con provviste e vele. Una decisione, e non si torna indietro."),D('hero',"Come salpo?",""","""D('hero',"La nave è pronta, con provviste e vele. Una decisione, e non si torna indietro."),D('hero',Ch2.closes()),D('hero',"Come salpo?",""")
# A4b: «Prossimo scopo» scritto a fine capitolo (scheda finale + Diario)
rep("""<p class="sm">Il Capitolo 3 è in arrivo. Intanto puoi tornare indietro""","""<p><b>'+Ch2.NEXT(k)+'</b></p><p class="sm">Il Capitolo 3 è in arrivo. Intanto puoi tornare indietro""")
rep("""g=S.flags.ch2end?'Il Capitolo 2 è concluso. Il Capitolo 3 è in arrivo: intanto puoi esplorare, pescare e completare le missioni secondarie.':""","""g=S.flags.ch2end?Ch2.NEXT(S.flags.ch2end)+' Intanto puoi esplorare, pescare e completare le missioni secondarie.':""")
T=[
["Cra... rubata.","Squawk... stolen.","Kra... gestohlen.","Cra... robada.","Cra... volée."],
["Mi accorgo che sto ridendo. Non mi succedeva dal naufragio.","I notice I'm laughing. That hasn't happened since the wreck.","Ich merke, dass ich lache. Das ist mir seit dem Schiffbruch nicht passiert.","Me doy cuenta de que me estoy riendo. No me pasaba desde el naufragio.","Je m'aperçois que je ris. Ça ne m'était pas arrivé depuis le naufrage."],
["Dal Diario. Partire chiude: pagine di J. ({}/4) · Briciola (scoperta) · Tesori dei Fuggiaschi ({}/5).","From the Journal. Leaving closes: J.'s pages ({}/4) · Briciola (found) · Treasures of the Runaways ({}/5).","Aus dem Tagebuch. Die Abfahrt beendet: J.s Seiten ({}/4) · Briciola (entdeckt) · Schätze der Flüchtlinge ({}/5).","Del Diario. Zarpar cierra: páginas de J. ({}/4) · Briciola (descubierta) · Tesoros de los Fugitivos ({}/5).","Du Journal. Partir clôt : pages de J. ({}/4) · Briciola (découverte) · Trésors des Fugitifs ({}/5)."],
["Dal Diario. Partire chiude: pagine di J. ({}/4) · Briciola (non scoperta) · Tesori dei Fuggiaschi ({}/5).","From the Journal. Leaving closes: J.'s pages ({}/4) · Briciola (not found) · Treasures of the Runaways ({}/5).","Aus dem Tagebuch. Die Abfahrt beendet: J.s Seiten ({}/4) · Briciola (nicht entdeckt) · Schätze der Flüchtlinge ({}/5).","Del Diario. Zarpar cierra: páginas de J. ({}/4) · Briciola (sin descubrir) · Tesoros de los Fugitivos ({}/5).","Du Journal. Partir clôt : pages de J. ({}/4) · Briciola (non découverte) · Trésors des Fugitifs ({}/5)."],
]
N1=["Prossimo scopo: raggiungere la vela vista all'orizzonte. È un convoglio carico d'argento.","Next goal: reach the sail seen on the horizon. It's a convoy loaded with silver.","Nächstes Ziel: das Segel am Horizont erreichen. Es ist ein Konvoi voller Silber.","Próximo objetivo: alcanzar la vela vista en el horizonte. Es un convoy cargado de plata.","Prochain but : rejoindre la voile aperçue à l'horizon. C'est un convoi chargé d'argent."]
N2=["Prossimo scopo: seguire la stella bassa a ovest, la rotta di J. Seconda cosa nota: al largo passa un convoglio carico d'argento.","Next goal: follow the low star in the west, J.'s course. Also known: a convoy loaded with silver sails offshore.","Nächstes Ziel: dem tiefen Stern im Westen folgen, J.s Kurs. Außerdem bekannt: Vor der Küste fährt ein Konvoi voller Silber.","Próximo objetivo: seguir la estrella baja al oeste, la ruta de J. También se sabe: mar adentro pasa un convoy cargado de plata.","Prochain but : suivre l'étoile basse à l'ouest, la route de J. Autre chose connue : au large passe un convoi chargé d'argent."]
S=[" Intanto puoi esplorare, pescare e completare le missioni secondarie."," Meanwhile you can explore, fish and complete side quests."," Inzwischen kannst du erkunden, angeln und Nebenmissionen abschließen."," Mientras tanto puedes explorar, pescar y completar misiones secundarias."," En attendant, tu peux explorer, pêcher et terminer les missions secondaires."]
T+=[N1,N2,[N1[i]+S[i] for i in range(5)],[N2[i]+S[i] for i in range(5)]]
rep("var PACK=[","var PACK="+json.dumps(T,ensure_ascii=False)[:-1]+",")
open(P,'w',encoding='utf8').write(src);print('patch100 ok')
