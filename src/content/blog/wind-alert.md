---
title: "Wind Alert"
date: 2026-05-22
description: "Nightly wind direction alert"
tags: ["Daily notifications", "Wind", "ntfy"]
---

# wind-alert

Large language models allow individuals to discover IT solutions to their daily lives.  At my residence, wind from a specific direction has been known to wake me from a deep sleep.  This automates a custom notification before bed, providing wind direction for the night, informing whether the windows can be cracked :) or shut :( for the night.  

The project folders were created using the following hierachy:  

## Directory Structure
```
wind-notifier/
├── docker-compose.yml
├── app/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── main.py
└── ntfy/
    └── cache/
```

## app/requirements.txt
```
requests==2.32.3
schedule==1.2.2
```

## app/main.py
```
import os
import sys
import time
import logging
from datetime import datetime, timedelta
import requests
import schedule

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Hardcoded for Superior, WI
LAT = "46.7206"
LON = "-92.0979"
NTFY_URL = os.getenv("NTFY_URL", "http://ntfy:80/wind-alerts")
EXEC_TIME = os.getenv("NOTIFICATION_TIME", "21:00") # 9 PM CST

def get_wind_arrow(degrees):
    """
    Maps meteorological wind direction (direction FROM) to an arrow 
    pointing in the direction the wind is physically traveling.
    """
    # Index 0 is North (blowing from North to South = Down Arrow)
    arrows = ["↓", "↙", "←", "↖", "↑", "↗", "→", "↘"]
    return arrows[int((degrees + 22.5) % 360 / 45)]

def fetch_hourly_forecast():
    logging.info("Fetching hourly wind profile for Superior, WI...")
    try:
        # Request hourly variables for wind speed and direction
        api_url = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&hourly=windspeed_10m,winddirection_10m&windspeed_unit=mph&timezone=America%2FChicago"
        response = requests.get(api_url, timeout=10)
        response.raise_for_status()
        data = response.json()
        
        hourly = data.get("hourly", {})
        times = hourly.get("time", [])
        speeds = hourly.get("windspeed_10m", [])
        directions = hourly.get("winddirection_10m", [])
        
        # Calculate target timestamps for tomorrow morning (6 AM to 11 AM)
        tomorrow = datetime.now() + timedelta(days=1)
        target_date_str = tomorrow.strftime("%Y-%m-%dT")
        
        morning_slots = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"]
        target_timestamps = [f"{target_date_str}{slot}" for slot in morning_slots]
        
        # Build the payload string
        payload_lines = ["Tomorrow's Morning Wind Profile:\n"]
        
        for t_idx, timestamp in enumerate(times):
            if timestamp in target_timestamps:
                # Format time string for readability (e.g., "06:00 AM")
                dt_obj = datetime.strptime(timestamp, "%Y-%m-%dT%H:%M")
                time_label = dt_obj.strftime("%I:%M %p")
                
                speed = speeds[t_idx]
                deg = directions[t_idx]
                arrow = get_wind_arrow(deg)
                
                payload_lines.append(f"{time_label}:  {arrow}  ({deg}°) @ {speed} mph")
                
        payload = "\n".join(payload_lines)
        
        # Dispatch notification
        headers = {
            "Title": "Superior Wind Forecast",
            "Priority": "default",
            "Tags": "wind,navigation"
        }
        
        push_res = requests.post(NTFY_URL, data=payload.encode('utf-8'), headers=headers, timeout=5)
        push_res.raise_for_status()
        logging.info("Hourly forecast notification dispatched.")
        
    except requests.exceptions.RequestException as e:
        logging.error(f"Network error or API dropped connection: {e}")
    except Exception as e:
        logging.error(f"Data mapping error: {e}")

def main():
    logging.info(f"Wind application targeted to Superior, WI ({LAT}, {LON}).")
    logging.info(f"Notification loop armed for {EXEC_TIME} Central Time.")
    
    # Run once immediately on launch to ensure data parser is tight
    fetch_hourly_forecast()
    
    schedule.every().day.at(EXEC_TIME).do(fetch_hourly_forecast)
    
    while True:
        schedule.run_pending()
        time.sleep(60)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(0)
```

## app/Dockerfile
```
FROM python:3.11-slim AS builder
WORKDIR /app
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.11-slim AS runner
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY main.py .

ENV PATH=/root/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1

CMD ["python", "main.py"]
```

## docker-compose.yml
```
version: '3.8'

services:
  wind-notifier:
    build:
      context: ./app
      dockerfile: Dockerfile
    container_name: weather_wind_script
    environment:
      - NOTIFICATION_TIME=21:00
      - NTFY_URL=http://ntfy:80/wind-alerts
    restart: unless-stopped
    # ... remaining ntfy block and network topology stay identicals
```
## Preview
Here is a sample of the desired output:  
```
🌐 WEATHER_NTFY_HUB • Just now ───────────────────────────────
 💨 Superior Wind Forecast
 Tomorrow's Morning Wind Profile:
 
 06:00 AM:  ↙  (45°) @ 12.4 mph
 07:00 AM:  ↙  (52°) @ 14.1 mph
 08:00 AM:  ←  (88°) @ 15.6 mph
 09:00 AM:  ←  (93°) @ 16.2 mph
 10:00 AM:  ↖  (120°) @ 13.8 mph
 11:00 AM:  ↖  (135°) @ 11.5 mph
                       [ Copy ]  [ Share ]  [ Mute Topic ]
```

# Run and Test

```
docker compose up -d --build
```

Navigate to test your server:  
```
http://<YOUR_LOCAL_HOST_IP>:8080/wind-alerts
```

## Leveraging ntfy
Install ntfy app from Play Store and subscribe to your server.  To bridge environemnt IP's, Tailscale was leveraged to pair the Android with the WSL Docker host.  
```