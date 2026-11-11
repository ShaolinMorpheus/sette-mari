#!/usr/bin/env python3
import sys,json
P='/home/claude/work/base_index.html'
src=open(P,encoding='utf8').read()
def rep(old,new,cnt=1):
    global src
    n=src.count(old)
    if n!=cnt:
        print('PATCH62 FAIL (%d, attesi %d):'%(n,cnt),old[:100]);sys.exit(1)
    src=src.replace(old,new)
T=[
["Acqua dolce","Fresh water","Süßwasser","Agua dulce","Eau douce"],
["Chi era J.?","Who was J.?","Wer war J.?","¿Quién era J.?","Qui était J. ?"],
["Chi ha bevuto l'acqua?","Who drank the water?","Wer hat das Wasser getrunken?","¿Quién se bebió el agua?","Qui a bu l'eau ?"],
["Cosa resta del Cormorano","What remains of the Cormorant","Was vom Kormoran übrig ist","Lo que queda del Cormorán","Ce qui reste du Cormoran"],
["Gente del campo","The camp folk","Die Leute vom Lager","La gente del campamento","Les gens du camp"],
["Gli attrezzi di Nives","Nives's tools","Nives' Werkzeug","Las herramientas de Nives","Les outils de Nives"],
["Granchi dell'isolotto","Crabs of the islet","Krabben vom Inselchen","Cangrejos del islote","Crabes de l'îlot"],
["I tesori dei Fuggiaschi","The Fugitives' treasures","Die Schätze der Flüchtigen","Los tesoros de los Fugitivos","Les trésors des Fugitifs"],
["Il Pino Alto","The Tall Pine","Die Hohe Kiefer","El Pino Alto","Le Grand Pin"],
["Il banchetto di Gnocco","Gnocco's feast","Gnoccos Festmahl","El banquete de Gnocco","Le festin de Gnocco"],
["Il campo abbandonato","The abandoned camp","Das verlassene Lager","El campamento abandonado","Le camp abandonné"],
["Il cantiere","The shipyard","Die Werft","El astillero","Le chantier"],
["Il coltello di Tito","Tito's knife","Titos Messer","El cuchillo de Tito","Le couteau de Tito"],
["Il diario di J.","J.'s diary","J.s Tagebuch","El diario de J.","Le journal de J."],
["Il fuoco dei naufraghi","The castaways' fire","Das Feuer der Schiffbrüchigen","El fuego de los náufragos","Le feu des naufragés"],
["Il mare aperto","The open sea","Die offene See","El mar abierto","Le large"],
["Il primo fuoco","The first fire","Das erste Feuer","El primer fuego","Le premier feu"],
["Il richiamo nel bosco","The call in the woods","Der Ruf im Wald","La llamada en el bosque","L'appel dans les bois"],
["Il timone nascosto","The hidden rudder","Das versteckte Steuer","El timón escondido","La barre cachée"],
["L'albero maestro","The mainmast","Der Hauptmast","El palo mayor","Le grand mât"],
["L'isola orientale","The eastern island","Die östliche Insel","La isla oriental","L'île de l'est"],
["La lite delle razioni","The ration quarrel","Der Streit um die Rationen","La disputa de las raciones","La querelle des rations"],
["La nave senza nome","The nameless ship","Das namenlose Schiff","El barco sin nombre","Le navire sans nom"],
["La notte prima di salpare","The night before sailing","Die Nacht vor der Abfahrt","La noche antes de zarpar","La nuit avant l'appareillage"],
["La prova di Ferro","Ferro's trial","Ferros Prüfung","La prueba de Ferro","L'épreuve de Ferro"],
["La zattera","The raft","Das Floß","La balsa","Le radeau"],
["Le vele di Nives","Nives's sails","Nives' Segel","Las velas de Nives","Les voiles de Nives"],
["Messaggi in bottiglia","Messages in bottles","Flaschenpost","Mensajes en botella","Messages en bouteille"],
["Notte di tempesta","Stormy night","Sturmnacht","Noche de tormenta","Nuit de tempête"],
["Qualcosa da mangiare","Something to eat","Etwas zu essen","Algo de comer","Quelque chose à manger"],
["Registro del pescatore","The fisherman's log","Das Logbuch des Fischers","El registro del pescador","Le registre du pêcheur"],
["Reliquie del Cormorano","Relics of the Cormorant","Relikte des Kormorans","Reliquias del Cormorán","Reliques du Cormoran"],
["Ricominciare da capo","Starting over","Ganz von vorn","Empezar de nuevo","Tout recommencer"],
["Rifornimenti","Supplies","Vorräte","Suministros","Ravitaillement"],
["Salpare","Set sail","Segel setzen","Zarpar","Appareiller"],
["Sulla sabbia","On the sand","Auf dem Sand","Sobre la arena","Sur le sable"],
["Terra!","Land!","Land in Sicht!","¡Tierra!","Terre !"],
["Turni di guardia","Watch shifts","Wachschichten","Turnos de guardia","Tours de garde"],
["Un riparo","A shelter","Ein Unterschlupf","Un refugio","Un abri"],
["Voci oltre gli alberi","Voices beyond the trees","Stimmen hinter den Bäumen","Voces tras los árboles","Voix au-delà des arbres"],
]
rep("var PACK=[","var PACK="+json.dumps(T,ensure_ascii=False)[:-1]+",")
open(P,'w',encoding='utf8').write(src);print('patch62 ok')
