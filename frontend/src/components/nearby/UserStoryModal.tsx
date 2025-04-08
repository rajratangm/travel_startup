
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface User {
  id: number;
  name: string;
  image: string;
  hasStory: boolean;
  viewed: boolean;
}

interface UserStoryModalProps {
  user: User;
  onClose: () => void;
}

const UserStoryModal = ({ user, onClose }: UserStoryModalProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onClose(), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(timer);
  }, [onClose]);
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black"
      onClick={onClose}
    >
      <div className="relative h-full w-full">
        {/* Story content */}
        <div className="h-full w-full flex items-center justify-center">
          <img 
            src="/placeholder.svg" 
            alt="Story" 
            className="max-h-full max-w-full object-contain"
          />
        </div>
        
        {/* Progress bar */}
        <div className="absolute top-2 left-2 right-2">
          <Progress value={progress} className="h-1 bg-white/20" />
        </div>
        
        {/* User info */}
        <div className="absolute top-6 left-4 right-4 flex items-center">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={user.image} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-white/70 text-xs">Just now</p>
            </div>
          </div>
          
          <button 
            className="ml-auto text-white"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserStoryModal;
