
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users } from "lucide-react";

// Demo data - in a real app, this would come from an API
const matches = [
  {
    id: 1,
    name: "Alex Chen",
    location: "Barcelona, Spain",
    interests: ["Photography", "Hiking", "Food"],
    image: "/placeholder.svg",
    distance: "Currently in your area"
  },
  {
    id: 2,
    name: "Sofia Rodriguez",
    location: "Mexico City, Mexico",
    interests: ["Museums", "Festivals", "Cycling"],
    image: "/placeholder.svg",
    distance: "Also traveling to Barcelona"
  },
  {
    id: 3,
    name: "Jamal Wilson",
    location: "Toronto, Canada",
    interests: ["Street Food", "Architecture", "Live Music"],
    image: "/placeholder.svg",
    distance: "Staying at your hotel"
  }
];

const SuggestedMatches = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Suggested Travel Buddies</h2>
            <Badge variant="outline" className="ml-2">
              <Users className="h-3 w-3 mr-1" />
              New
            </Badge>
          </div>
          <a href="/social" className="text-travel-blue hover:underline text-sm">
            View more
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <Card key={match.id} className="travel-card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img 
                      src={match.image} 
                      alt={match.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{match.name}</h3>
                    <p className="text-sm text-muted-foreground">{match.location}</p>
                    <p className="text-xs text-travel-blue mt-1">{match.distance}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">Interests:</p>
                  <div className="flex flex-wrap gap-1">
                    {match.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs h-8"
                  >
                    View Profile
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 text-xs h-8"
                    variant="secondary"
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestedMatches;
