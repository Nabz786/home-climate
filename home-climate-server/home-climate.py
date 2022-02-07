import time
import board
import adafruit_dht
import paho.mqtt.client as mqtt
import json

dhtDevice = adafruit_dht.DHT11(board.D4, use_pulseio=False)

client = mqtt.Client("pi_mqtt");
client.connect("localhost", 1883);

while True:
    try:
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9/5) + 32
        humidity = dhtDevice.humidity

        #Get the current time
        unformatted_localtime = time.localtime()
        current_time = time.strftime("%H:%M", unformatted_localtime)
        print(current_time)

        payload = {
            "temp": temperature_f,
            "humidity": humidity,
            "timestamp": current_time
        }
        
        print("sending...")
        client.publish("climate", payload=json.dumps(payload))
    
    #Runtime errors can occur fairly often, keep going if one occurs
    except RuntimeError as error:
        print(error)
        time.sleep(3.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error
    
    #We can poll the sensor once every 2 seconds, 10 should be sufficient
    time.sleep(5.0)



#Common Runtime Errors
#Checksum did not validate - the temp and humidty are represented as 16 bit numbers
#When added they should equal the checksum, if they don't, it could indicate data corruption
