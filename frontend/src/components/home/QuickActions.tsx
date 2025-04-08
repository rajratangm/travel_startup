
import { Button } from "@/components/ui/button";
import { Plane, Hotel, Calendar, Users, Briefcase } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { 
      icon: <Plane className="h-6 w-6 text-travel-blue" />, 
      label: "Flights", 
      description: "Find the best deals", 
      path: "/flights" 
    },
    { 
      icon: <Hotel className="h-6 w-6 text-travel-teal" />, 
      label: "Hotels", 
      description: "Perfect stays anywhere", 
      path: "/hotels" 
    },
    { 
      icon: <Calendar className="h-6 w-6 text-travel-purple" />, 
      label: "Activities", 
      description: "Discover experiences", 
      path: "/activities" 
    },
    { 
      icon: <Users className="h-6 w-6 text-travel-orange" />, 
      label: "Social", 
      description: "Connect with travelers", 
      path: "/social" 
    },
    { 
      icon: <Briefcase className="h-6 w-6 text-travel-green" />, 
      label: "Bookings", 
      description: "Manage your trips", 
      path: "/bookings" 
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-auto flex-col items-center justify-center py-6 travel-card-hover"
              asChild
            >
              <a href={action.path}>
                <div className="p-3 rounded-full bg-muted mb-3">
                  {action.icon}
                </div>
                <span className="text-base font-medium">{action.label}</span>
                <span className="text-xs text-muted-foreground mt-1">{action.description}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
