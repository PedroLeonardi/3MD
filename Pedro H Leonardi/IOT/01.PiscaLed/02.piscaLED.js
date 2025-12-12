const LED = 2
pinMode(LED, "output")

function piscaLED (){
    digitalWrite (LED, 1)

    setTimeout(()=>{
        digitalWrite(LED,0)
        setTimeout(piscaLED,300)
    }, 3000)
}
