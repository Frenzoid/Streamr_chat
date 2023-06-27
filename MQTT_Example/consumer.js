const APIKEY = "";
const TOPIC = "0x7030f4D0dC092449E4868c8DDc9bc00a14C9f561/streamr_chat";

// Carga la libreria.
const mqtt = require('mqtt');

// Crea un cliente MQTT.
const client = mqtt.connect(`mqtt://frenzoid:${APIKEY}@storage.frenzoid.dev:1883`);


// Al conectar al broker, se suscribe a la topic 'SE/practicaUA2022/murcia'.
client.on('connect', () => {
  console.log("Conectado al broker MQTT")
  client.subscribe(TOPIC);
});

client.on('message', (topic, message) => {
  console.log(message.toString());
});
