const TOUCH_PIN = 13;
const LED = 2;

let touch = require("touch.js").connect(TOUCH_PIN);

let ledStatus = 0;
let BotaoSolto = 0;

function ligarDesligarLED() {
    digitalWrite(LED, ledStatus ? 1 : 0);
}

setInterval(function () {
    let lendoStatus = touch.read();
    let estadoAtual = (lendoStatus < 100) ? 1 : 0;

    // Detecta transição de "não tocado" para "tocado"
    if (estadoAtual === 1 && BotaoSolto === 0) {
        ledStatus = !ledStatus;
        ligarDesligarLED();
        console.log("LED:", ledStatus ? "Ligado" : "Desligado");
    }

    BotaoSolto = estadoAtual; // Executa o clique uma vez, e depois volta para o status solto
}, 50); // 50ms é um intervalo mais seguro para evitar múltiplos disparos
