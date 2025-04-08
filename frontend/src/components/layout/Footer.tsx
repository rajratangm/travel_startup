
import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted/60 border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Compass className="h-5 w-5 text-travel-blue" />
              <span className="font-bold">TravelBuddy</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI-powered travel companion for exploring the world and making connections.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/flights" className="text-muted-foreground hover:text-primary">Flights</Link></li>
              <li><Link to="/hotels" className="text-muted-foreground hover:text-primary">Hotels</Link></li>
              <li><Link to="/activities" className="text-muted-foreground hover:text-primary">Activities</Link></li>
              <li><Link to="/explore" className="text-muted-foreground hover:text-primary">Destinations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/social" className="text-muted-foreground hover:text-primary">Social Connect</Link></li>
              <li><Link to="/housing" className="text-muted-foreground hover:text-primary">Stay Exchange</Link></li>
              <li><Link to="/groups" className="text-muted-foreground hover:text-primary">Group Travel</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Community Guidelines</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TravelBuddy AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
