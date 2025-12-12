const LED = 27;

const POT =  32

setInterval(()=>{
  let valorPot = analogRead(POT)
  analogWrite(LED, valorPot)
},50)