
import { useState, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Hotel, 
  Plane, 
  Train, 
  Mic, 
  MicOff,
  Star,
  Search
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Speech recognition setup
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const startListening = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  // Sample data for the booking page
  const pastLocations = [
    { id: 1, name: "Paris, France", visitDate: "March 2024", image: "/placeholder.svg" },
    { id: 2, name: "Tokyo, Japan", visitDate: "January 2024", image: "/placeholder.svg" },
    { id: 3, name: "New York, USA", visitDate: "November 2023", image: "/placeholder.svg" }
  ];
  
  const upcomingHolidays = [
    { id: 1, name: "Summer Break", dates: "June 15 - July 10, 2024" },
    { id: 2, name: "Winter Holiday", dates: "December 22 - January 3, 2025" },
    { id: 3, name: "Spring Festival", dates: "April 1 - April 7, 2024" }
  ];
  
  const popularDestinations = [
    { 
      id: 1, 
      name: "Bali, Indonesia", 
      image: "/placeholder.svg",
      cost: "$1200",
      rating: 4.7,
      buddiesThere: 3,
      buddiesPlanning: 5
    },
    { 
      id: 2, 
      name: "Santorini, Greece", 
      image: "/placeholder.svg",
      cost: "$1800",
      rating: 4.9,
      buddiesThere: 1,
      buddiesPlanning: 2
    },
    { 
      id: 3, 
      name: "Kyoto, Japan", 
      image: "/placeholder.svg",
      cost: "$1500",
      rating: 4.6,
      buddiesThere: 0,
      buddiesPlanning: 7
    }
  ];
  
  const flightFares = [
    { 
      id: 1, 
      from: "New York", 
      to: "London", 
      airline: "British Airways",
      departure: "09:00 AM",
      arrival: "10:30 PM", 
      price: "$750",
      date: "May 15, 2024"
    },
    { 
      id: 2, 
      from: "Los Angeles", 
      to: "Tokyo", 
      airline: "Japan Airlines",
      departure: "01:15 PM",
      arrival: "06:45 PM (+1)", 
      price: "$1100",
      date: "June 2, 2024"
    },
    { 
      id: 3, 
      from: "Chicago", 
      to: "Paris", 
      airline: "Air France",
      departure: "08:30 PM",
      arrival: "11:45 AM (+1)", 
      price: "$900",
      date: "April 28, 2024"
    }
  ];

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Book Your Next Adventure</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Search for Destinations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Where do you want to go?" 
                    className="pl-10" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button>Search</Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Check-in Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">Check-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <Label>Adults</Label>
                  <Input type="number" min="1" defaultValue="2" />
                </div>
                <div>
                  <Label>Children</Label>
                  <Input type="number" min="0" defaultValue="0" />
                </div>
                <div>
                  <Label>Rooms</Label>
                  <Input type="number" min="1" defaultValue="1" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full gradient-bg">Find Deals</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Holidays</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingHolidays.map(holiday => (
                  <div key={holiday.id} className="flex items-center gap-3 pb-3 border-b last:border-0">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{holiday.name}</h4>
                      <p className="text-sm text-muted-foreground">{holiday.dates}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="destinations" className="mb-10">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="destinations">Popular Destinations</TabsTrigger>
            <TabsTrigger value="flights">Flight Fares</TabsTrigger>
            <TabsTrigger value="past">Past Destinations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="destinations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularDestinations.map(destination => (
                <Card key={destination.id} className="travel-card-hover overflow-hidden">
                  <div className="h-48 w-full relative">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="object-cover w-full h-full"
                    />
                    <Badge className="absolute top-3 right-3 gradient-bg">{destination.cost}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{destination.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm">{destination.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-4 text-sm">
                      <div className="flex items-center gap-1 mr-4">
                        <Users className="h-4 w-4 text-travel-blue" />
                        <span>{destination.buddiesThere} friends there now</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-travel-purple" />
                        <span>{destination.buddiesPlanning} friends planning</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 gradient-bg">View Deals</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="flights" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {flightFares.map(flight => (
                <Card key={flight.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0 md:mr-6">
                        <div className="flex items-center gap-2">
                          <Plane className="h-5 w-5 text-travel-blue" />
                          <span className="font-semibold">{flight.airline}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{flight.date}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-1 items-center justify-between mb-4 md:mb-0">
                        <div className="text-center">
                          <p className="font-semibold">{flight.from}</p>
                          <p className="text-sm text-muted-foreground">{flight.departure}</p>
                        </div>
                        
                        <div className="flex-1 mx-4 px-4 relative">
                          <div className="border-t border-dashed border-muted-foreground absolute w-full top-1/2" />
                          <Plane className="h-4 w-4 mx-auto relative -top-0.5 transform rotate-90" />
                        </div>
                        
                        <div className="text-center">
                          <p className="font-semibold">{flight.to}</p>
                          <p className="text-sm text-muted-foreground">{flight.arrival}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold">{flight.price}</span>
                        <Button className="gradient-bg whitespace-nowrap">Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastLocations.map(location => (
                <Card key={location.id} className="travel-card-hover overflow-hidden">
                  <div className="h-40 w-full">
                    <img 
                      src={location.image} 
                      alt={location.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{location.name}</h3>
                    <p className="text-sm text-muted-foreground">{location.visitDate}</p>
                    <Button variant="outline" className="w-full mt-3">Book Again</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Travel Buddies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarImage src={`https://i.pravatar.cc/150?img=${i + 10}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <h4 className="font-medium text-sm">User {i + 1}</h4>
                  <p className="text-xs text-muted-foreground">
                    {i % 3 === 0 ? "In Tokyo" : i % 3 === 1 ? "Planning Paris" : "Available"}
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 text-xs h-8">
                    Message
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Booking;
