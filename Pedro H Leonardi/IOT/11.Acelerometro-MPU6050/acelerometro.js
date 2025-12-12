
I2C1.setup(); //Habilita a comunicação usando o I2C1

// Estabelecer a comunicação do dispositivo || Importa do proprio espruino ou do Drive
let mpu = require("MPU6050").connect(I2C1); 

setInterval(function() {
    let acc = mpu.getGravity();

    let rot = mpu.getDegreesPerSecond();

    /*
    console.log("X: " + acc[0].toFixed(2))
    console.log("Y: " + acc[1].toFixed(2))
    console.log("Z: " + acc[2].toFixed(2))
console.log("\n")// A toração está atrelada a velocidade e a força da rotação que voce esta fazendo
    console.log("Rotacao no eixo X (ROLL): " + rot[0].toFixed(2))
    console.log("Rotacao no eixo Y (Pitch)" + rot[1].toFixed(2))
    console.log("Rotacao no eixo Z (Yaw)" + rot[2].toFixed(2))
    console.log("")
*/

//  NECARIO PARA PLOTAR NO GRAFICO
    Serial1.print(">")
    Serial1.print("MAX:" + 2 + ",")    
    Serial1.print("MIN:" + -2 + ",")
    Serial1.print("X:" +acc[0] +",")
    Serial1.print("Y:" +acc[1] +",")
    Serial1.print("Z:" +acc[2] +"\r\n")


},10)

//REPRESENTAÇÃO GRAFICA PELA EXTENSAÕ SERIAL PLOTTER