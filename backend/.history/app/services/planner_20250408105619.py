# app/services/planner.py

from app.db.crud import get_flights, get_trains, get_hotels

def plan_route(source: str, destination: str, budget: int = None):
    flights = get_flights(source, destination)
    trains = get_trains(source, destination)

    # Combine all transport options
    all_options = flights + trains

    # Sort by price (or duration, etc.)
    sorted_routes = sorted(all_options, key=lambda x: x["price"])

    if budget:
        sorted_routes = [r for r in sorted_routes if r["price"] <= budget]

    # Return top 1 or 2 options
    return sorted_routes[:2]


def suggest_hotels(city: str, max_price: int = None):
    hotels = get_hotels(city)

    if max_price:
        hotels = [h for h in hotels if h["price_per_night"] <= max_price]

    return sorted(hotels, key=lambda x: x["price_per_night"])
