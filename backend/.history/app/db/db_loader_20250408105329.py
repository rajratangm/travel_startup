# app/db/db_loader.py

# Simulated "databases" using lists or dicts

flights_db = [
    {"flight_no": "AI101", "from": "Mumbai", "to": "Pune", "price": 2000, "duration": "1h"},
    {"flight_no": "6E202", "from": "Mumbai", "to": "Delhi", "price": 4500, "duration": "2h 15m"},
]

trains_db = [
    {"train_no": "12125", "from": "Mumbai", "to": "Pune", "price": 500, "duration": "3h"},
    {"train_no": "12951", "from": "Mumbai", "to": "Delhi", "price": 900, "duration": "16h"},
]

hotels_db = [
    {"name": "Hotel Grand Pune", "location": "Pune", "price_per_night": 1500},
    {"name": "Taj Mumbai", "location": "Mumbai", "price_per_night": 9000},
]
