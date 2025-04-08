
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// For demo purposes - in a real app, these would come from an API
const trips = [
  {
    id: 1,
    destination: "Barcelona, Spain",
    dates: "Aug 15 - Aug 22, 2025",
    image: "/placeholder.svg",
    status: "Upcoming",
    type: "Flight + Hotel"
  },
  {
    id: 2,
    destination: "Bali, Indonesia",
    dates: "Sep 3 - Sep 12, 2025",
    image: "/placeholder.svg",
    status: "Planning",
    type: "Group Trip"
  }
];

const UpcomingTrips = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Upcoming Trips</h2>
          <a href="/bookings" className="text-travel-blue hover:underline text-sm">View all</a>
        </div>
        
        {trips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Card key={trip.id} className="travel-card-hover overflow-hidden">
                <div className="relative h-48 w-full">
                  <img 
                    src={trip.image} 
                    alt={trip.destination}
                    className="object-cover w-full h-full"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3"
                  >
                    {trip.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{trip.destination}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <Calendar className="h-4 w-4" />
                        <span>{trip.dates}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{trip.type}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add Trip Card */}
            <Card className="travel-card-hover border-dashed flex items-center justify-center h-full min-h-[260px]">
              <CardContent className="flex flex-col items-center justify-center text-center p-6">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold">+</span>
                </div>
                <h3 className="font-semibold mb-1">Plan a New Trip</h3>
                <p className="text-sm text-muted-foreground">
                  Create a new adventure
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No trips planned yet</h3>
            <p className="text-muted-foreground mb-4">
              Start planning your next adventure today!
            </p>
            <div className="flex justify-center">
              <Button className="gradient-bg">Plan a Trip</Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default UpcomingTrips;
