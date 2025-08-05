import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help with any questions about our video editing and design services. How can I assist you today?",
      sender: "agent",
      timestamp: new Date(),
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [hasProvidedInfo, setHasProvidedInfo] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Auto-reply (in a real app, this would connect to your chat service)
    setTimeout(() => {
      const responses = [
        "Thanks for your message! I'll get back to you shortly.",
        "That's a great question! Let me help you with that.",
        "I'd be happy to discuss your project needs. Would you like to schedule a consultation?",
        "For urgent matters, feel free to call us directly or book a project consultation."
      ];
      
      const autoReply = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "agent" as const,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, autoReply]);
    }, 1000);
  };

  const handleStartChat = () => {
    if (!userInfo.name || !userInfo.email) {
      toast({
        title: "Information Required",
        description: "Please provide your name and email to start the chat.",
        variant: "destructive",
      });
      return;
    }
    setHasProvidedInfo(true);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-80 transition-all duration-300 ${isMinimized ? 'h-14' : 'h-96'} shadow-xl`}>
        <CardHeader className="p-4 bg-primary text-primary-foreground rounded-t-lg">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Live Chat - WON Productions</span>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-primary-foreground hover:bg-white/20"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-primary-foreground hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        {!isMinimized && (
          <CardContent className="p-0 h-80 flex flex-col">
            {!hasProvidedInfo ? (
              <div className="p-4 space-y-4">
                <div className="text-sm text-muted-foreground">
                  Please provide your details to start chatting:
                </div>
                <Input
                  placeholder="Your name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                />
                <Button onClick={handleStartChat} className="w-full">
                  Start Chat
                </Button>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default LiveChat;