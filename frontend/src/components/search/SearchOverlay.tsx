
import { useState, useEffect } from "react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, MapPin, Calendar, Plane, Hotel, User } from "lucide-react";

type SearchResult = {
  id: string;
  title: string;
  type: "destination" | "flight" | "hotel" | "activity" | "user";
  description: string;
  icon: JSX.Element;
};

// Mock search results for demo purposes
const mockResults: SearchResult[] = [
  {
    id: "paris",
    title: "Paris, France",
    type: "destination",
    description: "The City of Light",
    icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
  },
  {
    id: "tokyo",
    title: "Tokyo, Japan",
    type: "destination",
    description: "The bustling metropolis",
    icon: <MapPin className="h-4 w-4 text-muted-foreground" />,
  },
  {
    id: "nyc-flight",
    title: "Flights to New York",
    type: "flight",
    description: "From $299",
    icon: <Plane className="h-4 w-4 text-muted-foreground" />,
  },
  {
    id: "hilton-bali",
    title: "Hilton Bali Resort",
    type: "hotel",
    description: "5-star hotel with ocean views",
    icon: <Hotel className="h-4 w-4 text-muted-foreground" />,
  },
  {
    id: "sarah-traveler",
    title: "Sarah Thompson",
    type: "user",
    description: "Looking for travel buddies in Barcelona",
    icon: <User className="h-4 w-4 text-muted-foreground" />,
  },
];

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    // In a real app, this would be an API call
    const filtered = mockResults.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setResults(filtered);
  }, [searchQuery]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <Command className="rounded-lg border border-none">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder="Search destinations, flights, hotels..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none"
            />
          </div>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {results.length > 0 && (
              <CommandGroup heading="Search Results">
                {results.map((result) => (
                  <CommandItem
                    key={result.id}
                    onSelect={() => {
                      console.log("Selected:", result);
                      onClose();
                    }}
                    className="flex items-center gap-2 px-4 py-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {result.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{result.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {result.description}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchOverlay;
