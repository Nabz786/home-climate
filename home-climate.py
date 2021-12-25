import time
import board
import adafruit_dht
import paho.mqtt.client as mqtt
import json

dhtDevice = adafruit_dht.DHT11(board.D4, use_pulseio=False)

client = mqtt.Client("test_mqtt", transport='websockets');
client.connect("localhost", 9001);

while True:
    try:
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9/5) + 32
        humidity = dhtDevice.humidity

        payload = {
            "temp": temperature_f,
            "humidity": humidity
        }
        
        print("sending...")
        client.publish("climate", payload=json.dumps(payload))
    
    #Runtime errors can occur fairly often, keep going if one occurs
    except RuntimeError as error:
        time.sleep(3.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error
    
    #We can poll the sensor once every 2 seconds, 10 should be sufficient
    time.sleep(10.0)

