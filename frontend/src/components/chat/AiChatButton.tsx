
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, Mic, MicOff } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

// Define chat message type for better type safety
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = "travel-chat-history";

const AiChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isMobile = useIsMobile();

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedChat = localStorage.getItem(STORAGE_KEY);
    if (savedChat) {
      try {
        const parsedChat = JSON.parse(savedChat);
        // Ensure timestamps are Date objects
        const formattedChat = parsedChat.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setConversation(formattedChat);
      } catch (error) {
        console.error("Error parsing chat history:", error);
        setConversation([{
          role: "assistant",
          content: "Hi there! I'm your AI travel companion. How can I help you plan your next adventure?",
          timestamp: new Date()
        }]);
      }
    } else {
      // Set default welcome message if no history
      setConversation([{
        role: "assistant",
        content: "Hi there! I'm your AI travel companion. How can I help you plan your next adventure?",
        timestamp: new Date()
      }]);
    }
  }, []);

  // Save chat to localStorage whenever it updates
  useEffect(() => {
    if (conversation.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversation));
    }
  }, [conversation]);

  // Scroll to bottom whenever conversation updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  // Focus input when dialog is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const startVoiceInput = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
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
  
  const stopVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = { 
      role: "user", 
      content: message,
      timestamp: new Date()
    };
    
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setMessage("");
    setIsLoading(true);
    
    // In a real implementation, you would send the message to your API here
    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, I couldn't process your request.",
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong. Please try again later.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }  
    setTimeout(async() => {
      // Simulate AI response
      // let response;
      // const lowerMessage = message.toLowerCase();
      
      // if (lowerMessage.includes("flight")) {
      //   response = "I can help you find flights! Where are you looking to go and when? I can search for the best fares for you.";
      // } else if (lowerMessage.includes("hotel")) {
      //   response = "I'd be happy to recommend some hotels! What's your destination and dates? I'll find accommodations that match your preferences.";
      // } else if (lowerMessage.includes("book")) {
      //   response = "I can assist with booking! Would you like to book a flight, hotel, or something else? Please provide details about your travel plans.";
      // } else if (lowerMessage.includes("train") || lowerMessage.includes("rail")) {
      //   response = "Looking for train options? Let me know your departure and arrival stations, and I'll check the schedules and fares for you.";
      // } else if (lowerMessage.includes("status")) {
      //   response = "I can check the status of your booking or travel arrangements. Can you provide the booking reference or flight/train number?";
      // } else if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest")) {
      //   response = "Based on your interests, I think you might enjoy exploring Barcelona in the spring or Tokyo in the fall. Would you like more specific recommendations?";
      // } else if (lowerMessage.includes("weather")) {
      //   response = "Let me check the weather forecast for your destination. Where are you traveling to and when? This will help you pack appropriately.";
      // } else if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("budget")) {
      //   response = "I can help you find options within your budget. What's your approximate budget and travel destination? I'll search for suitable accommodations and transportation.";
      // } else if (lowerMessage.includes("thank")) {
      //   response = "You're welcome! I'm here to help make your travel planning easier. Feel free to ask if you need anything else!";
      // } else {
      //   response = "I'm here to help with all your travel needs! I can search for flights, hotels, train tickets, or provide recommendations for your next trip. What would you like assistance with?";
      // }
      try {
        const response = await fetch('http://localhost:8000/chat/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: message }), // ✅ match backend schema
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch AI response');
        }
  
        const data = await response.json();
        console.log(data)
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content:  data.response,
            
            timestamp: new Date(),
          },
        ]);
        // console.log(data)
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "...",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }  
      
      // Remove unused code referencing 'response'

      // Refocus the input after sending
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 1000);
  };

  // Update message without losing focus
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const suggestedPrompts = [
    "Find weekend flights to Paris",
    "Hotels in Tokyo for next month",
    "Activities for families in Rome",
    "Recommend a beach destination"
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Chat content that's shared between mobile and desktop
  const ChatContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <Avatar className="h-8 w-8 mr-2 mt-1">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-none"
                  : "bg-muted rounded-tl-none"
              } relative group`}
            >
              <div>{msg.content}</div>
              <div className="text-[10px] mt-1 opacity-70 text-right">
                {formatTime(new Date(msg.timestamp))}
              </div>
            </div>
            
            {msg.role === "user" && (
              <Avatar className="h-8 w-8 ml-2 mt-1">
                <AvatarImage src="https://i.pravatar.cc/150?img=36" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center justify-start">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg rounded-tl-none px-4 py-2">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>
      
      {conversation.length === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 mb-4">
          {suggestedPrompts.map((prompt, i) => (
            <Button
              key={i}
              variant="outline"
              className="h-auto py-2 text-left justify-start"
              onClick={() => {
                setMessage(prompt);
                setTimeout(() => handleSendMessage(), 100);
              }}
            >
              {prompt}
            </Button>
          ))}
        </div>
      )}
      
      <div className="flex gap-2 p-4 border-t">
        <Input
          ref={inputRef}
          value={message}
          onChange={handleMessageChange}
          placeholder="Ask me anything about travel..."
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <Button 
          variant="outline" 
          size="icon"
          onClick={isListening ? stopVoiceInput : startVoiceInput}
          className={isListening ? "bg-red-100 text-red-500 hover:bg-red-200 hover:text-red-600" : ""}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        <Button 
          onClick={handleSendMessage}
          disabled={!message.trim() || isLoading}
          className="gradient-bg"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile version - bottom button + drawer */}
      {isMobile ? (
        <>
          <Button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-30 h-14 w-14 rounded-full gradient-bg shadow-lg"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>

          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger className="hidden">Open</DrawerTrigger>
            <DrawerContent className="h-[85vh] max-h-[85vh]">
              <DrawerHeader className="border-b px-4">
                <div className="flex items-center justify-between">
                  <DrawerTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-travel-blue" />
                    <span>AI Travel Assistant</span>
                  </DrawerTitle>
                  <DrawerClose asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <X className="h-4 w-4" />
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerHeader>
              
              <ChatContent />
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        /* Desktop version - right corner button + dialog */
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="fixed bottom-6 right-6 z-30 gap-2 px-4 rounded-full border border-primary/20 bg-background/95 shadow-lg backdrop-blur hover:bg-background/80 transition-all"
            >
              <MessageCircle className="h-5 w-5 text-travel-blue" />
              <span className="font-medium">Travel Assistant</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] h-[600px] max-h-[80vh] flex flex-col p-0">
            <DialogHeader className="px-4 py-3 border-b">
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-travel-blue" />
                <span>AI Travel Assistant</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="flex-1 overflow-hidden">
              <ChatContent />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AiChatButton;

