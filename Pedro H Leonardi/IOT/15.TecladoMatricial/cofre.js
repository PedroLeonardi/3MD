// Linha = 19, 18, 5, 17
// Coluna = 16, 4, 2, 15
const KEYBOARD_R = [19, 18, 5, 17]
const KEYBOARD_C = [16, 4, 2, 15]

let keyboard = require("KeyPad").connect(KEYBOARD_C, KEYBOARD_R);

let senha = "123";

let senhaAtual = "";

let i = 0

let key = -1;
let key_last = -1;

const key_values = "D#0*C987B654A321" // ele funciona como um array, e é utilizada o IDEX para saber o valor

setInterval(function () {
    key = keyboard.read();
    if (key >= 0 && key != key_last) {
        key_last = key;
        senhaAtual = senhaAtual+key_values[key]
        console.log(key_values[key]);
    i = i+1
    }

    if ( senha.length == i) {
        if (senha == senhaAtual) {
            console.log("Acessado")
            senhaAtual = ""
            i = 0
        } else {
            console.log("negado")
            senhaAtual = ""
            i = 0
        }
    }


    }, 100);