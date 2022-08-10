#!/bin/sh
#!/usr/bin/python3

docker start mosquitto
python3 ../home-climate.py &
python3 ./logger.py &
python3 -m uvicorn server:app --host 192.168.1.80
