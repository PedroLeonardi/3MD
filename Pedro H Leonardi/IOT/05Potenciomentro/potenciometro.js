const POT = 32;

const LEDverde = 33
const LEDamarelo = 26
const LEDvermelho = 27

pinMode(LEDverde, 'output')
pinMode(LEDamarelo, 'output')
pinMode(LEDvermelho, 'output')

setInterval(function () {
    let valorPot = analogRead(POT) * 100 *1.00025;
    console.log("Nivel do Tank: ", valorPot.toFixed(2), "\n")

    if (valorPot >= 75) {
        console.log("verde")
        digitalWrite(LEDamarelo, 0)
        digitalWrite(LEDvermelho, 0)
        digitalWrite(LEDverde, 1)

    } else if (valorPot >= 15) {
        console.log("amarelo")
        digitalWrite(LEDamarelo, 1)
        digitalWrite(LEDverde, 0)
        digitalWrite(LEDvermelho, 0)

    } else if (valorPot >= 0) {
        console.log("vermelho")
        digitalWrite(LEDvermelho, 1)
        digitalWrite(LEDamarelo, 0)
        digitalWrite(LEDverde, 0)


    } else {
        console.log("voce errou")
    }



    let angulo = 2.7 * valorPot

    console.log("Angulo do Potenciometro", angulo.toFixed(2), "\n")

}, 100)





