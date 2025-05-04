
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  sender: string;
  senderInitials: string;
  content: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface ChatBoxProps {
  title?: string;
  recipientId?: string;
  isGroupChat?: boolean;
}

const ChatBox = ({ title = "Chat", recipientId, isGroupChat = false }: ChatBoxProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock data for demonstration
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        sender: "System",
        senderInitials: "SYS",
        content: "Welcome to the chat! You can ask questions or discuss topics here.",
        timestamp: new Date(Date.now() - 3600000),
        isCurrentUser: false
      }
    ];
    
    setMessages(mockMessages);
  }, []);
  
  useEffect(() => {
    // Scroll to bottom on new messages
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (!message.trim() || !user) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: user.email || "Me",
      senderInitials: (user.email?.substring(0, 2) || "ME").toUpperCase(),
      content: message.trim(),
      timestamp: new Date(),
      isCurrentUser: true
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // In a real app, send to API or WebSockets here
    simulateResponse();
  };
  
  const simulateResponse = () => {
    // For demo purposes, simulate a response
    setTimeout(() => {
      const responseMessage: Message = {
        id: Date.now().toString(),
        sender: "Support",
        senderInitials: "SP",
        content: "Thanks for reaching out! Someone will respond to your question soon.",
        timestamp: new Date(),
        isCurrentUser: false
      };
      
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, 2000);
  };

  return (
    <Card className="flex flex-col h-[500px] w-full max-w-md">
      <CardHeader className="bg-edu-primary text-white px-4 py-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex gap-2 max-w-[80%] ${msg.isCurrentUser ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${msg.senderInitials}`} />
                <AvatarFallback>{msg.senderInitials}</AvatarFallback>
              </Avatar>
              
              <div>
                <div 
                  className={`rounded-lg px-3 py-2 text-sm ${
                    msg.isCurrentUser 
                      ? "bg-edu-secondary text-white" 
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <span>{msg.sender}</span>
                  <span>•</span>
                  <span>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </CardContent>
      
      <CardFooter className="p-2 border-t">
        <div className="flex w-full items-end gap-2">
          <Textarea 
            placeholder="Type a message..." 
            className="flex-1 min-h-[60px] max-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            className="h-10 w-10 rounded-full p-0 flex items-center justify-center bg-edu-primary"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <Send size={18} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatBox;
