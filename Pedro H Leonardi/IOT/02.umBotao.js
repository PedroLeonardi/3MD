const LED = 27
const Button = 26;


pinMode(LED, "output");
pinMode(Button, "input_pullup");




// setInterval(function () {
//     let statusButton = digitalRead(Button);
//     let statusButton2 = digitalRead(Button2);
//     console.log("Button Status: " + statusButton);
//     if (statusButton == statusButton2 && statusButton == 0) {
//         analogWrite(RGBVermelho, 0.5);
//         analogWrite(RGBVerde, 0);
//         analogWrite(RGBAzul, 1);
//     } else {
//         analogWrite(RGBVermelho, 0);
//         analogWrite(RGBVerde, 0);
//         analogWrite(RGBAzul, 0);
//     };
// }, 10);


let ledLigado = 0;

let estadoBotao1 = 1;


function ligarDesligarLED() {
    if (ledLigado) {
        digitalWrite(LED, 1)
    } else {
        digitalWrite(LED, 0)
    }
}

setInterval(function (){
    let estado1 = digitalRead(Button)

    if (estado1 == 0 && estadoBotao1 == 1) {
        ledLigado = !ledLigado;
        ligarDesligarLED();
    }


    estadoBotao1 = estado1;

}, 10);




