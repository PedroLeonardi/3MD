const TRIGGER = 32;
const ECHO = 33;

pinMode(33, "input");
pinMode(32, "output");

setInterval(() => {

    //Configurando o ECHO
    // setWatch (function, <PINO>, edge:rissing|falling)
    setWatch (function(info){
        //duração do ECHO
        let tempo = info.time - info.lastTime;

        //CALCULANDO A DISTANCIA == (CM)
        let distancia = 17000 * tempo //velocidade som = 340m/s

        distancia = distancia.toFixed(2)

        console.log("Distancia: " + distancia + "cm")
    }, ECHO, {edge:"falling"})

    digitalPulse(TRIGGER, 1, 1)

    // hoje foi um dia bem legal, pois 

},1000)