
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

// Demo data - in a real app, this would come from an API
const nearbyPlaces = [
  {
    id: 1,
    name: "Historic Walking Tour",
    category: "Activity",
    image: "/placeholder.svg",
    rating: 4.8,
    price: "$25",
    highlight: "Popular"
  },
  {
    id: 2,
    name: "Coastal Cafe",
    category: "Restaurant",
    image: "/placeholder.svg",
    rating: 4.6,
    price: "$$",
    highlight: "Local Favorite"
  },
  {
    id: 3,
    name: "Sunset Beach",
    category: "Attraction",
    image: "/placeholder.svg",
    rating: 4.9,
    price: "Free",
    highlight: "Must Visit"
  },
  {
    id: 4,
    name: "Mountain Hike",
    category: "Adventure",
    image: "/placeholder.svg",
    rating: 4.7,
    price: "$15",
    highlight: "Great Views"
  }
];

const ExploreNearby = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Explore Nearby</h2>
          <a href="/explore" className="text-travel-blue hover:underline text-sm">View all</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nearbyPlaces.map((place) => (
            <Card key={place.id} className="travel-card-hover overflow-hidden">
              <div className="relative h-36">
                <img 
                  src={place.image} 
                  alt={place.name}
                  className="object-cover w-full h-full"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 left-2"
                >
                  {place.category}
                </Badge>
                {place.highlight && (
                  <div className="absolute bottom-0 w-full py-1 px-3 text-xs font-medium text-white bg-black/50">
                    {place.highlight}
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <div>
                  <h3 className="font-medium text-base">{place.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{place.rating}</span>
                    </div>
                    <span className="text-sm font-medium">{place.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreNearby;
