import paho.mqtt.client as mqtt
import json

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Succesfully connected to broker")
        client.subscribe("climate")
    else:
        print(f"Non-success status received {rc}")


def on_message(client, userdata, msg):
    print(f"{msg.topic} {msg.payload}")
    l = json.loads(msg.payload)
    #print(l["temp"])
    f = open("log.txt", "a")
    logString = "{} {} {}".format(l["temp"], l["humidity"], l["timestamp"])
    f.write(logString + "\n")
    f.close()


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message


client.connect("localhost", 1883);

client.loop_forever()
