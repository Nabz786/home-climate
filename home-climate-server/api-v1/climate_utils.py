from datetime import datetime, timedelta

'''
Returns a list of dictionaries, where each dictionary contains the average
climate data for a given interval ie. last 3 hours, last 6 hours, etc
'''
def get_averages():
    climate_metrics = fetch_climate_metrics_for_last_n_hours(24)
    hour_intervals = [3, 6, 12, 24]

    hourly_averages = []
    for interval in hour_intervals:
        hourly_averages.append(get_average_climate_reading(climate_metrics, interval))

    return hourly_averages

'''
Returns a dictionary containing the average of each climate parameter
for the passed in interval
'''
def get_average_climate_reading(climate_metrics, interval):
    time_threshold = (datetime.today() - timedelta(hours=interval, minutes=0)).timestamp()
    metric_count = 0
    temperature_sum = 0.0
    humidity_sum = 0
    
    for metric in climate_metrics:
        timestamp = metric['timestamp']
        if timestamp is not None and timestamp >= time_threshold:
            temperature_sum += metric['temperature']
            humidity_sum += metric['humidity']
            metric_count += 1
            
    if metric_count > 0:
        temperature_avg = temperature_sum / metric_count
        humidity_avg = humidity_sum / metric_count

        return {'temperature_avg': temperature_avg, 'humidity_avg': humidity_avg, 'interval': interval}

    return {'temperature_avg': 0.0, 'humidity_avg': 0, 'interval': interval}

'''
Reads the log file, returns climate data for the last n hours
Where n is the number of hours
'''
def fetch_climate_metrics_for_last_n_hours(n): 
    min_time = (datetime.today() - timedelta(hours=24, minutes=0)).timestamp()
    climate_metrics_last_n_hours = []

    with open('log.txt') as file:
        for line in file:
            climate_metric_line = line.rstrip().split()
            
            if line is None:
                continue
            
            timestamp = float(climate_metric_line[2])
            if timestamp is not None and timestamp >= min_time:
                temperature = round(float(climate_metric_line[0]), 2)
                humidity = int(climate_metric_line[1])

                climate_metrics_last_n_hours.append({'temperature': temperature, 'humidity': humidity, 'timestamp': timestamp})

    return climate_metrics_last_n_hours
