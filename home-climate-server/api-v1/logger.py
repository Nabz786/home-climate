import paho.mqtt.client as mqtt
import json

"""
Executed after the client attempts to connect to the broker 
Will subscribe to the climate topic, if the connection to the broker was Successful
"""
def on_connect(client, userdata, flags, statusCode):
    if statusCode == 0:
        print("Succesfully connected to broker")
        client.subscribe("climate")
    else:
        print(f"Non-success status received {statusCode}")

"""
Executed when the client receives a message from the broker, 
Writes the message payload to a file called log.txt
"""
def on_message(client, userdata, message):
    # print(f"{message.topic} {message.payload}")
    messagePayloadDict = json.loads(message.payload)
    
    writeFile = open("log.txt", "a")
    logString = "{} {} {}".format(messagePayloadDict["temp"], messagePayloadDict["humidity"], messagePayloadDict["timestamp"])

    writeFile.write(logString + "\n")
    writeFile.close()


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883);

client.loop_forever()
