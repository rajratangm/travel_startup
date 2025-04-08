
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Compass, Menu, MessageCircle, Plane, User, Home, Hotel, Search, MapPin } from "lucide-react";
import SearchOverlay from "@/components/search/SearchOverlay";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const menuItems = [
    { name: "Home", icon: <Home className="h-5 w-5" />, path: "/" },
    { name: "Flights", icon: <Plane className="h-5 w-5" />, path: "/flights" },
    { name: "Hotels", icon: <Hotel className="h-5 w-5" />, path: "/hotels" },
    { name: "Explore", icon: <Compass className="h-5 w-5" />, path: "/explore" },
    { name: "Nearby", icon: <MapPin className="h-5 w-5" />, path: "/nearby" },
    { name: "Social", icon: <User className="h-5 w-5" />, path: "/social" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="flex items-center gap-2 font-semibold text-xl"
          >
            <Compass className="h-6 w-6 text-travel-blue" />
            <span className="gradient-text font-bold">TravelBuddy</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hidden md:flex"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Link to="/messages">
            <Button
              variant="ghost" 
              size="icon" 
              className="rounded-full hidden md:flex"
              aria-label="Messages"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/profile">
            <Button
              variant="ghost" 
              size="icon" 
              className="rounded-full hidden md:flex"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </Link>
          
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center gap-3 text-base font-medium p-2 rounded-md hover:bg-muted"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                <Link to="/messages">
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="justify-start px-2 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5 mr-3" />
                    Messages
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="justify-start px-2 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start px-2 w-full"
                  onClick={() => {
                    setIsOpen(false);
                    setIsSearchOpen(true);
                  }}
                >
                  <Search className="h-5 w-5 mr-3" />
                  Search
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};

export default Navbar;
