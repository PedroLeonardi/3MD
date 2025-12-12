const LEDverde = 25
const LEDamarelo = 26
const LEDvermelho = 27


pinMode(LEDverde, 'output')
pinMode(LEDamarelo, 'output')
pinMode(LEDvermelho, 'output')


function piscaLED(){
    digitalWrite(LEDvermelho, 0)
    digitalWrite(LEDverde, 1)
    setTimeout(()=>{
        digitalWrite(LEDverde , 0)
        digitalWrite(LEDamarelo, 1)
        
        setTimeout(()=>{
            digitalWrite(LEDamarelo, 0 )
            digitalWrite(LEDvermelho, 1)
        setTimeout(()=>{
            piscaLED()
        },1000)
        }, 1000)
    }, 1000)
}

piscaLED()