const POT = 32;

setInterval(function() {
    let valorPot = analogRead(POT)*100 *1.000025; //Corige o erro de aredondamento binario
    console.log("Valor Potenciomentro: ", valorPot.toFixed(2), "\n")

    let angulo = 2.7 * valorPot

    console.log("Angulo do Potenciometro", angulo.toFixed(2), "\n")

}, 100)


