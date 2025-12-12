// Linha = 19, 18, 5, 17
// Coluna = 16, 4, 2, 15
const KEYBOARD_R = [19, 18, 5, 17]
const KEYBOARD_C = [16, 4, 2, 15]

let keyboard = require("KeyPad").connect(KEYBOARD_C,KEYBOARD_R);

let key = -1;
let key_last = -1;

const key_values = "D#0*C987B654A321" // ele funciona como um array, e é utilizada o IDEX para saber o valor

setInterval(function(){
    key = keyboard.read();
    if (key >= 0 && key != key_last) {
        console.log(key_values[key]);
        key_last = key;
        
    }




}, 100);