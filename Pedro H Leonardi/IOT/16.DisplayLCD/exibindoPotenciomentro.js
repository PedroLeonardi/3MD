I2C1.setup();
const POT = 35;

let lcd = require("HD44780").connectI2C(I2C1);

setInterval(function() {
    let valorPot = analogRead(POT)*100 *1.000025; //Corige o erro de aredondamento binario
    console.log("Valor Potenciomentro: ", valorPot.toFixed(2), "\n")

    let angulo = 2.7 * valorPot

    lcd.setCursor(0 , 0);

    lcd.print("Angulo: " + angulo.toFixed(0) + "  ")

}, 500)


setInterval