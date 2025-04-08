
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface User {
  id: number;
  name: string;
  image: string;
  hasStory: boolean;
  viewed: boolean;
}

interface StoryCirclesProps {
  users: User[];
  onSelectUser: (id: number) => void;
}

const StoryCircles = ({ users, onSelectUser }: StoryCirclesProps) => {
  return (
    <div className="absolute bottom-6 left-0 right-0 z-30 overflow-x-auto py-2">
      <div className="flex gap-3 px-4 min-w-max mx-auto max-w-full justify-center">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="flex flex-col items-center cursor-pointer"
            onClick={() => onSelectUser(user.id)}
          >
            <div 
              className={`p-0.5 rounded-full ${
                user.hasStory
                  ? user.viewed
                    ? 'bg-gray-300'
                    : 'bg-gradient-to-tr from-travel-blue to-travel-teal'
                  : 'bg-transparent'
              }`}
            >
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-xs mt-1 font-medium text-center max-w-16 truncate">
              {user.name.split(' ')[0]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryCircles;
