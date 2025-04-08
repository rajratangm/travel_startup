from sqlalchemy.orm import Session
from app.db.models import Flight, Train, Hotel  # you'll need to define these ORM models

def get_flights(session: Session, from_city: str = None, to_city: str = None):
    query = session.query(Flight)
    if from_city: query = query.filter(Flight.origin == from_city)
    if to_city: query = query.filter(Flight.destination == to_city)
    return query.all()

def get_trains(session: Session, from_city: str = None, to_city: str = None):
    query = session.query(Train)
    if from_city: query = query.filter(Train.origin == from_city)
    if to_city: query = query.filter(Train.destination == to_city)
    return query.all()

def get_hotels(session: Session, location: str = None):
    query = session.query(Hotel)
    if location: query = query.filter(Hotel.location == location)
    return query.all()
