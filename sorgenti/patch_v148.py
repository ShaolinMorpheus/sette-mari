import re
P='/home/claude/work/base_index.html'
s=open(P,encoding='utf8').read()
def rep(a,b):
    global s
    assert s.count(a)==1,(s.count(a),a[:60])
    s=s.replace(a,b)
new='''  {v:"0.11.3",d:"23 nov 2026",t:"La Sirena nuova, volti rosei e il campo che si anima",n:[
    "Grafica di prova: la Sirena è un disegno nuovo, infossata nella sabbia della cala, con i tre stadi (relitto, riparazione, riparata), collisione solo sullo scafo e onde lontane dallo scafo.",
    "Grafica di prova: Ferro, Nives, Tito e Gnocco hanno disegni nuovi, camminano nella direzione giusta e sono più proporzionati al Capitano. Anche Giacomo, i ritratti nei dialoghi e il Capitano con il viso più roseo.",
    "Nives di giorno batte il martello sull'incudine, a sinistra del ceppo, con colpo, scintille e suono a tempo.",
    "Nuovi anche il mercante con la sua barchetta attraccata, le tartarughe (meno numerose), il granchio e la rana, il Pino Alto, gli interni delle capanne e la grotta.",
    "Mare più vivo: nave fantasma e boa con la J, navi nel mare dei convogli con scia e spruzzi, cannonate e minimappa.",
    "Interno del galeone e Sirena guidata in un nuovo disegno; Briciola vive nel campo con i suoi disegni.",
    "Attrezzi (piccone, accetta) con animazioni uniformate, per Capitano e marinaio.",
    "L'isoletta a nord del campo è più grande, con palme e un cespuglio di bacche.",
    "Il testo di benvenuto compare più tardi e il Pappagallo parla meno.",
  ]},
'''
rep('  {v:"0.11.2",d:"8 nov 2026",','%s  {v:"0.11.2",d:"8 nov 2026",'%new)
open(P,'w',encoding='utf8').write(s);print('ok148')
