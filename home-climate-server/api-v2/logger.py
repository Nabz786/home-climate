import paho.mqtt.client as mqtt
import json
import pypyodbc
from datetime import datetime
from dotenv import load_dotenv
import os

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
Creates a connection to the DB and inserts the received data
"""
def on_message(client, userdata, message):
    messagePayloadDict = json.loads(message.payload)
    
    # Fetch env variables from loaded from .env file
    db_host = os.getenv('DB_HOST')
    db_name = os.getenv('DB_NAME')
    db_user = os.getenv('DB_USER')
    db_password = os.getenv('DB_PASSWORD')
    db_driver = 'FreeTDS'

    # Build the connection string and create a connection to the DB
    connection_string = f'Driver={{{db_driver}}};Server={db_host};Port=1433;Database={db_name};Uid={db_user};Pwd={{{db_password}}};Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;TDS_Version=7.1'
    connection = pypyodbc.connect(connection_string);

    time = datetime.fromtimestamp(messagePayloadDict["timestamp"])
    temperature = messagePayloadDict["temp"]
    humidity = messagePayloadDict["humidity"]

    params = (time, temperature, humidity)
    sql_command = 'INSERT INTO [dbo].[ClimateReadings] (Time, Temperature, Humidity) VALUES (?, ?, ?)'
    
    # Execute the sql insert statement, passing in the climate metrics from the received message
    execute_sql_command(connection, sql_command, params)

def execute_sql_command(connection, sql_command, params):
    cursor = connection.cursor()

    cursor.execute(sql_command, params)

    connection.commit()

    cursor.close()
    connection.close()


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Using the instance of the mqtt client, connect to the broker
client.connect("localhost", 1883);

load_dotenv()

client.loop_forever()
