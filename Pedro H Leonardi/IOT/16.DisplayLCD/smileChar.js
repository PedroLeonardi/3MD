I2C1.setup();
let lcd = require("HD44780").connectI2C(I2C1);



const coracao = [
  0B00000,
  0B01010,
  0B11111,
  0B11111,
  0B11111,
  0B01110,
  0B00100,
  0B00000
];


lcd.createChar(0, coracao)

lcd.setCursor(0, 0);
lcd.print("meu coracao: ")
lcd.write(0)

lcd.setCursor(0,1)
lcd.print("let grega: ")
lcd.write(0b1111_0111);
lcd.write(0b1111_0100);


