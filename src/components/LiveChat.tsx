import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send, Minimize2, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm an AI assistant for WON Productions. I can help you with questions about our video editing and design services. How can I assist you today?",
      sender: "agent",
      timestamp: new Date(),
      isAI: true,
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [hasProvidedInfo, setHasProvidedInfo] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user" as const,
      timestamp: new Date(),
      isAI: false,
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = newMessage;
    setNewMessage("");
    setIsAiTyping(true);

    try {
      // Call AI function
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: messageToSend,
          context: `User info: ${userInfo.name} (${userInfo.email})`
        }
      });

      if (error) throw error;

      const aiResponse = {
        id: messages.length + 2,
        text: data.response || "I'm sorry, I'm having trouble responding right now. Please try again.",
        sender: "agent" as const,
        timestamp: new Date(),
        isAI: true,
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error: any) {
      console.error('AI chat error:', error);
      
      // Fallback responses if AI fails
      const fallbackResponses = [
        "Thanks for your message! I'm experiencing some technical difficulties. For immediate assistance, please use our booking form or contact us directly.",
        "I apologize, but I'm having trouble connecting right now. Would you like to book a consultation to discuss your project?",
        "Sorry for the technical issue. You can reach us through our contact form or visit our Fiverr profile for immediate service."
      ];
      
      const fallbackResponse = {
        id: messages.length + 2,
        text: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        sender: "agent" as const,
        timestamp: new Date(),
        isAI: false,
      };

      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsAiTyping(false);
    }
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
              <span>AI Chat - WON Productions</span>
              <Bot className="h-3 w-3 text-primary-foreground/70" />
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
                        <div className="flex items-start gap-1">
                          {message.sender === 'agent' && 'isAI' in message && message.isAI && (
                            <Bot className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                          )}
                          <span>{message.text}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isAiTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted text-foreground p-2 rounded-lg text-sm flex items-center gap-2">
                        <Bot className="h-3 w-3 text-primary" />
                        <span>AI is typing...</span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
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