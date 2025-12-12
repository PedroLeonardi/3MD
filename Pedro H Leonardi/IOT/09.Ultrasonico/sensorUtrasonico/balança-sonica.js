
const TRIGGER = 33;
const ECHO = 32;


pinMode(33, "input");
pinMode(32, "output");

let peso = null


setInterval(() => {

    if (peso != null ) {

        

    //Configurando o ECHO
    // setWatch (function, <PINO>, edge:rissing|falling)
    setWatch (function(info){
        //duração do ECHO
        let tempo = info.time - info.lastTime;

        //CALCULANDO A DISTANCIA == (CM)
        let distancia = 17000 * tempo //velocidade som = 340m/s

        let altura = 220 - distancia.toFixed(2) 

        let IMC = ((peso)/(altura*altura/10000))
        console.log("sua altura: " + altura/100 + "m" )
        console.log ("Sei IMC é: " + IMC)
        // console.log("Seu IMC é de: "  + IMC)
        
    }, ECHO, {edge:"falling"})

    digitalPulse(TRIGGER, 1, 1)

    // hoje foi um dia bem legal, pois 

} else (
    
    console.log("Inisra seu peso: ")
)

},1000)


