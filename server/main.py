from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import datetime
import requests

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get('/')
def root_coin():
    NOW = str(datetime.datetime.now().timestamp()*1000).split('.')[0]
    WEEK_AGO = str( (datetime.datetime.now() - datetime.timedelta(days=7)).timestamp()*1000 ).split('.')[0]
    data = requests.get('https://api.binance.com/api/v3/klines?symbol=BNBBUSD&interval=1h&startTime='+WEEK_AGO+'&endTime='+NOW)
    candle = []
    for x in data.json():
        x[0] = datetime.datetime.fromtimestamp((x[0]/1000)).strftime('%Y.%m.%d %H:%M:%S')
        x[1:5] = [float(x) for x in x[1:5]]
        x[1],x[2] = x[2],x[1]
        x[3],x[4] = x[4],x[3]
        candle.append(x[:5])
    return candle

@app.get("/{coin}")
def select_coin(coin : str):
    NOW = str(datetime.datetime.now().timestamp()*1000).split('.')[0]
    WEEK_AGO = str( (datetime.datetime.now() - datetime.timedelta(days=7)).timestamp()*1000 ).split('.')[0]
    data = requests.get('https://api.binance.com/api/v3/klines?symbol='+ coin +'&interval=1h&startTime='+WEEK_AGO+'&endTime='+NOW)
    candle = []
    for x in data.json():
        x[0] = datetime.datetime.fromtimestamp((x[0]/1000)).strftime('%Y.%m.%d %H:%M:%S')
        x[1:5] = [float(x) for x in x[1:5]]
        x[1],x[2] = x[2],x[1]
        x[3],x[4] = x[4],x[3]
        candle.append(x[:5])
    return candle
