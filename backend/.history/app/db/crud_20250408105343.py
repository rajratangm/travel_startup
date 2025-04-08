# app/db/crud.py

from app.db.db_loader import flights_db, trains_db, hotels_db

def get_flights(source: str, destination: str):
    return [f for f in flights_db if f["from"] == source and f["to"] == destination]

def get_trains(source: str, destination: str):
    return [t for t in trains_db if t["from"] == source and t["to"] == destination]

def get_hotels(location: str):
    return [h for h in hotels_db if h["location"].lower() == location.lower()]
