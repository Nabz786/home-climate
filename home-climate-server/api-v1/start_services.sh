#!/bin/sh
#!/usr/bin/python3

docker start mosquitto
python3 ../home-climate.py &
python3 ./logger.py &
python3 ./server.py &
