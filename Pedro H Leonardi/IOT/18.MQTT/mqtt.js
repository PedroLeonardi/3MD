const POT = 36;

const LED = 27;

const WIFI_SSID = "WIFI_IOT";
const WIFI_PASS = "WIFI_IOT";

const MQTT_BROKER = "10.84.6.135";

const TOPIC_POT = "pedro/pot";
const TOPIC_LED = "pedro/led";

let wifi = require("Wifi");
let mqtt = require("MQTT").create(MQTT_BROKER, {client_id: "MQTT_do_Pedro1"});

pinMode(LED, "output");

wifi.connect(WIFI_SSID, {password: WIFI_PASS})
wifi.setHostname("ESP32_do_Pedro1")//OBRIGATORIO ESTAR NESSA POSIÇÃO

wifi.on("connected", function(){
    console.log("Wifi conectado");
    console.log(wifi.getStatus())

    mqtt.connect();
});

wifi.on("disconnected", function (){
    console.log("Wifi desconectado")
    console.log("Wifi conectado novamente")
wifi.connect(WIFI_SSID, {password: WIFI_PASS})
});

mqtt.on("connected", function(){
    console.log("MQTT Conectado");
    mqtt.subscribe(TOPIC_LED)
});

mqtt.on("disconneted", function() {
    console.log("MQTT Desconectado");
    console.log("Conectando novamente");
    mqtt.connect();

        
})

mqtt.on("message", function(topic, message) {

    console.log(topic + ":" + message)

    if (topic == TOPIC_LED) {
        if (message == "on");
        digitalWrite(LED, 1);
    }

    if(message == "off")
        digitalWrite(LED,0)
    
})

setInterval(function() {
    let valorPot = analogRead(POT);
    let angulo = 270 * valorPot;
    console.log("angulo: " + angulo.toFixed(0));
    mqtt.publish(TOPIC_POT, angulo.toFixed(0))
}, 1000)

