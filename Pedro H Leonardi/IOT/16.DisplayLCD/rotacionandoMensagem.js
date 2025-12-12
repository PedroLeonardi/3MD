


I2C1.setup();
let lcd = require("HD44780").connectI2C(I2C1);


let msg = "uma mensagem bem grande       "

let msg_i = 0

setInterval(function(){
    lcd.setCursor(0, 0);
    for (i = 0; i < 16; ++i){
        let j = (msg_i +i) % msg.length;
        lcd.print(msg[j])
    }
    msg_i = msg_i+1
}, 1000)