from typing import Optional
from fastapi import FastAPI
from climate_utils import *
import json

app = FastAPI()

'''
Returns the average temp & humidity across the following ranges
3hrs, 6hrs, 12hrs, 24hrs
'''
@app.get("/historical/")
def full_range():
    climate_averages = get_averages()

    return json.dumps(climate_averages)

