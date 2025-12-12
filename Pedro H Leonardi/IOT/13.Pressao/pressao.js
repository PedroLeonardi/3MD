I2C1.setup();

let bmp = require("BMP085").connect(I2C1)

setInterval(function(){
    bmp.getPressure(function(i){
        let pressao = i.pressure
        let temperatura = i.temperature

        let altitude = bmp.getAltitude(pressao, 101325)
        let altitudeCalc = -(temperatura+273)/0.0342*Math.log(pressao/101325)

        // console.log("Alt.Sensor: " + altitude.toFixed(2) + "m")
        // console.log("Alt.Calculo: " + altitudeCalc.toFixed(2) + "m")
        // console.log();

        Serial1.print(">")
        Serial1.print("AlturaSensor:"+altitude + ",")
        Serial1.print("AlturaCalculada:"+altitudeCalc+"\r\n")
    })
},200)