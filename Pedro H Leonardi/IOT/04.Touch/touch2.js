const TOUCH_PIN_ON = 13
const TOUCH_PIN_OFF = 14
const LED = 2 

pinMode(LED, "output")
let touch_on = require("touch.js").connect(TOUCH_PIN_ON)
let touch_off = require("touch.js").connect(TOUCH_PIN_OFF)



setInterval(() => {
    let status_on = touch_on.read()
    let status_off = touch_off.read()
    if (status_on < 100) {
        console.log("on")
        digitalWrite(LED, 1)
    } else if ( status_off < 100) {
        console.log("off")
        digitalWrite(LED, 0)
    } else if ( status_off < 100 && status_on < 100 ) {
        setInterval(()=> {

        },100)
    }

}, 100);


// const resultado = (x === y) ? a : b;