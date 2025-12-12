const DIRECTION = 16 //RX2  - DT
const CLOCK = 4 //D04 - CLK
const SWITCH = 17 //TX2 - SW

pinMode(SWITCH, "input_pullup")

let pulsos = 0

let senha = [2, 4, 2, 5, 0, 3, 8, 6]

let senhaAtual = []

require("Encoder").connect (DIRECTION, CLOCK, function(d){
    pulsos = pulsos+d
    console.log(pulsos)
})


setInterval(function(){
    let sw = digitalRead(SWITCH);

    if(sw === 0) {
        // senhaAtual = [...senhaAtual, pulsos]
        senhaAtual = senhaAtual.push(pulsos)
        console.log(senhaAtual)
        pulsos = 0
    }

},500);