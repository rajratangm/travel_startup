
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Search } from "lucide-react";

type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
};

type Conversation = {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  lastMessage: string;
  lastMessageTime: Date;
  messages: Message[];
};

// Mock data
const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: [
      {
        id: "user2",
        name: "Alex Turner",
        avatar: "/placeholder.svg",
      }
    ],
    lastMessage: "Are we still meeting at the hotel lobby?",
    lastMessageTime: new Date(2025, 3, 5, 14, 30),
    messages: [
      {
        id: "msg1",
        senderId: "user2",
        content: "Hey! Looking forward to our trip to Barcelona next month!",
        timestamp: new Date(2025, 3, 5, 14, 20),
      },
      {
        id: "msg2",
        senderId: "currentUser",
        content: "Me too! I've already made a list of places to visit.",
        timestamp: new Date(2025, 3, 5, 14, 25),
      },
      {
        id: "msg3",
        senderId: "user2",
        content: "Are we still meeting at the hotel lobby?",
        timestamp: new Date(2025, 3, 5, 14, 30),
      }
    ]
  },
  {
    id: "conv2",
    participants: [
      {
        id: "user3",
        name: "Sophia Chen",
        avatar: "/placeholder.svg",
      }
    ],
    lastMessage: "I found a great local tour guide for our trip",
    lastMessageTime: new Date(2025, 3, 4, 9, 15),
    messages: [
      {
        id: "msg4",
        senderId: "user3",
        content: "Hi there! I saw we're both going to Tokyo in May",
        timestamp: new Date(2025, 3, 4, 9, 10),
      },
      {
        id: "msg5",
        senderId: "currentUser",
        content: "Yes! First time visiting Japan, very excited!",
        timestamp: new Date(2025, 3, 4, 9, 12),
      },
      {
        id: "msg6",
        senderId: "user3",
        content: "I found a great local tour guide for our trip",
        timestamp: new Date(2025, 3, 4, 9, 15),
      }
    ]
  }
];

const MessagingPanel = () => {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(conv => 
    conv.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: "currentUser",
      content: newMessage,
      timestamp: new Date()
    };

    const updatedConversations = conversations.map(conv => 
      conv.id === activeConversation.id 
        ? {
            ...conv,
            lastMessage: newMessage,
            lastMessageTime: new Date(),
            messages: [...conv.messages, newMsg]
          }
        : conv
    );

    setConversations(updatedConversations);
    setNewMessage("");
    setActiveConversation(updatedConversations.find(c => c.id === activeConversation.id) || null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[calc(100vh-16rem)] border rounded-lg overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search conversations" 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-69px)]">
          {filteredConversations.map((conv) => (
            <div 
              key={conv.id} 
              className={`p-4 border-b cursor-pointer hover:bg-muted transition-colors ${activeConversation?.id === conv.id ? 'bg-muted' : ''}`}
              onClick={() => setActiveConversation(conv)}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={conv.participants[0].avatar} 
                    alt={conv.participants[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h4 className="font-medium truncate">{conv.participants[0].name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(conv.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Header */}
            <div className="p-4 border-b flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img 
                  src={activeConversation.participants[0].avatar} 
                  alt={activeConversation.participants[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium">{activeConversation.participants[0].name}</h3>
            </div>

            {/* Message List */}
            <div className="flex-1 p-4 overflow-y-auto">
              {activeConversation.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`mb-4 flex ${msg.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.senderId === 'currentUser' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === 'currentUser' 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  className="flex-1"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  className="gradient-bg"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list or start a new chat with a travel buddy
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPanel;
