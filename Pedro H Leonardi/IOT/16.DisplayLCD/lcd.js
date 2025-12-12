I2C1.setup();
let lcd = require("HD44780").connectI2C(I2C1);

let telas = 0;

setInterval(function () {
    switch (telas) {
        case 0:
            
            lcd.print("    SENAI :D    ")
            lcd.setCursor(0, 1)
            lcd.print(" Armando Arruda ")
            telas = 1;
            break;
        case 1:
            lcd.setCursor(0, 0);
            lcd.print("A turma 3MD eh a")
            lcd.setCursor(0, 1)
            lcd.print("aaa meelhorrr!!!")
            telas = 0;
            break;
    }
}, 1000)

lcd.setCursor(0, 0);
lcd.print("    SENAI :D    ")

lcd.setCursor(0, 1)
lcd.print(" Armando Arruda ")