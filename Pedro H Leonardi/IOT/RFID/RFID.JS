SPI2.setup();

let nfc = require("MFRC522.js").connect(SPI2);

setInterval(function(){
    let nuid = nfc.readCard()
    console.log(nuid)
},500)