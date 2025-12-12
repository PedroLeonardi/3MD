pinMode(2, "output");

let ledStatus; 

setInterval(()=>{
    ledStatus = !ledStatus
    digitalWrite(2, ledStatus)
})