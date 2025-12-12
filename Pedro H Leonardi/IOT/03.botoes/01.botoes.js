const BUTTONon = 26; 
const BUTTONoff = 25;
const LED = 27;

pinMode(BUTTONon, "input_pullup");
pinMode(BUTTONoff, "input_pullup");
pinMode(LED, "output");

setInterval(()=>{
    let statusButton = digitalRead(BUTTONon)
    // console.log(statusButton)
    if(statusButton === 0){
        digitalWrite(LED, 1)
    }

    let statusButtonoff = digitalRead(BUTTONoff)
    // console.log("-------", statusButtonoff)
    if (statusButtonoff === 0) {
        digitalWrite(LED, 0)
    }

},100)
