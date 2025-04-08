
import { useState, useEffect } from "react";
import { MapPin, User } from "lucide-react";
import StoryCircles from "./StoryCircles";
import UserStoryModal from "./UserStoryModal";

// Demo data - in a real app, this would come from an API
const nearbyUsers = [
  {
    id: 1,
    name: "Alex Chen",
    location: { lat: 40.712, lng: -74.006 },
    image: "/placeholder.svg",
    hasStory: true,
    viewed: false,
  },
  {
    id: 2,
    name: "Sofia Rodriguez",
    location: { lat: 40.715, lng: -74.002 },
    image: "/placeholder.svg",
    hasStory: true,
    viewed: true,
  },
  {
    id: 3,
    name: "Jamal Wilson",
    location: { lat: 40.718, lng: -74.008 },
    image: "/placeholder.svg",
    hasStory: true,
    viewed: false,
  },
  {
    id: 4,
    name: "Emma Thompson",
    location: { lat: 40.710, lng: -74.010 },
    image: "/placeholder.svg",
    hasStory: false,
    viewed: false,
  },
];

const NearbyMap = () => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // In a real app, we would get the user's location through the browser's geolocation API
    // For this demo, we'll set a default location (NYC)
    setUserLocation({ lat: 40.7128, lng: -74.006 });
  }, []);

  return (
    <div className="h-full w-full bg-gray-100 relative">
      {/* Placeholder for map */}
      <div className="absolute inset-0 bg-travel-light/30 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>Map View</p>
          <p className="text-xs">(In a real app, this would be an actual map)</p>
        </div>
      </div>

      {/* User location marker */}
      {userLocation && (
        <div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative">
            <div className="h-6 w-6 rounded-full bg-travel-blue flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
        </div>
      )}

      {/* User markers on the map */}
      {nearbyUsers.map((user) => (
        <div
          key={user.id}
          className="absolute z-10 cursor-pointer"
          style={{
            left: `calc(${((user.location.lng + 74.01) / 0.02) * 10}% - 10px)`, 
            top: `calc(${((40.72 - user.location.lat) / 0.02) * 10}% - 10px)`
          }}
          onClick={() => setSelectedUser(user.id)}
        >
          <div className={`h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center border-2 ${
            user.hasStory && !user.viewed ? 'border-travel-blue' : 'border-gray-200'
          }`}>
            <img 
              src={user.image} 
              alt={user.name}
              className="h-7 w-7 rounded-full object-cover"
            />
          </div>
        </div>
      ))}

      {/* Story circles at bottom */}
      <StoryCircles 
        users={nearbyUsers} 
        onSelectUser={setSelectedUser} 
      />

      {/* Story modal */}
      {selectedUser && (
        <UserStoryModal 
          user={nearbyUsers.find(u => u.id === selectedUser)!}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* Action buttons */}
      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <button className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center">
          <MapPin className="h-6 w-6 text-travel-blue" />
        </button>
      </div>
    </div>
  );
};

export default NearbyMap;
