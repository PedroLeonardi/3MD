const DIRECTION = 16 //RX2  - DT
const CLOCK = 4 //D04 - CLK
const SWITCH = 17 //TX2 - SW

pinMode(SWITCH, "input_pullup")

let pulsos = 0

require("Encoder").connect (DIRECTION, CLOCK, function(d){
    pulsos = pulsos+d
    console.log(pulsos)
})

setInterval(function(){
    let sw = digitalRead(SWITCH);
    console.log("Valor de SW "+sw)
},500);