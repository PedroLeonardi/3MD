
I2C1.setup(); //Habilita a comunicação usando o I2C1

// Estabelecer a comunicação do dispositivo || Importa do proprio espruino ou do Drive
let mpu = require("MPU6050").connect(I2C1); 

setInterval(function() {
    let acc = mpu.getGravity();

    let rot = mpu.getDegreesPerSecond();

    let angx = Math.atan(acc[0]/acc[2]) * 180 / Math.PI
    let angy = Math.atan(acc[1]/acc[2]) * 180 / Math.PI

    console.log("Angulo X: " + angx.toFixed(2))
    console.log("Angulo Y: " + angy.toFixed(2))
    console.log();
},500)

