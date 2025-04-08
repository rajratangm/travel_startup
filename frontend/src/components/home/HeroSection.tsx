
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-travel-light to-white py-16 md:py-24">
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="block text-travel-dark">Discover, Connect and</span>
            <span className="block gradient-text mt-1">Travel Together</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Your AI-powered companion for finding flights, hotels, local activities, and like-minded travelers on your next adventure.
          </p>
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="relative w-full max-w-md">
              <Input 
                type="text"
                placeholder="Where to? Try 'Weekend in Paris'"
                className="pl-10 h-12 w-full"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            </div>
            <Button size="lg" className="gradient-bg w-full md:w-auto">
              Find Adventures
            </Button>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" className="rounded-full flex gap-1">
              <MapPin className="h-4 w-4" />
              Nearby
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">Weekend Getaways</Button>
            <Button variant="outline" size="sm" className="rounded-full">Group Activities</Button>
            <Button variant="outline" size="sm" className="rounded-full">Solo Travel</Button>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-travel-teal/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-travel-blue/10 blur-3xl"></div>
    </div>
  );
};

export default HeroSection;
