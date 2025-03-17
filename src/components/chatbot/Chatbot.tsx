
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    content: 'Bonjour! Je suis l\'assistant virtuel de COMPUTER BUSINESS CENTER. Comment puis-je vous aider aujourd\'hui?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const generateResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate AI response with delay
    setTimeout(() => {
      let botResponse = '';
      
      // Simple response logic based on keywords
      const lowercaseMsg = userMessage.toLowerCase();
      
      if (lowercaseMsg.includes('bonjour') || lowercaseMsg.includes('salut') || lowercaseMsg.includes('hello')) {
        botResponse = 'Bonjour! Comment puis-je vous aider aujourd\'hui?';
      } else if (lowercaseMsg.includes('prix') || lowercaseMsg.includes('tarif') || lowercaseMsg.includes('coût')) {
        botResponse = 'Nos prix varient selon les produits. Vous pouvez consulter notre page Boutique pour voir tous nos produits et leurs prix.';
      } else if (lowercaseMsg.includes('contact') || lowercaseMsg.includes('joindre') || lowercaseMsg.includes('appeler')) {
        botResponse = 'Vous pouvez nous contacter par téléphone au +228 91254591 ou via notre formulaire de contact sur la page Contact.';
      } else if (lowercaseMsg.includes('adresse') || lowercaseMsg.includes('localisation') || lowercaseMsg.includes('situer')) {
        botResponse = 'Nous sommes situés à Lomé, Togo. Notre adresse exacte: 6°10\'49.4"N 1°11\'43.0"E';
      } else if (lowercaseMsg.includes('livraison') || lowercaseMsg.includes('délai')) {
        botResponse = 'Nous proposons la livraison dans tous les pays où nous opérons. Le délai de livraison varie généralement de 2 à 5 jours ouvrables selon votre localisation.';
      } else if (lowercaseMsg.includes('pays') || lowercaseMsg.includes('international')) {
        botResponse = 'Nous opérons au Togo, en Côte d\'Ivoire, au Bénin, au Burkina Faso, au Mali et au Sénégal.';
      } else if (lowercaseMsg.includes('merci')) {
        botResponse = 'Je vous en prie! N\'hésitez pas si vous avez d\'autres questions.';
      } else {
        botResponse = 'Merci pour votre message. Pour une assistance plus personnalisée, n\'hésitez pas à nous contacter directement via notre page Contact ou par téléphone au +228 91254591.';
      }

      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Generate bot response
    generateResponse(inputValue);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className="h-14 w-14 rounded-full shadow-lg"
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat d'assistance"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-border"
          >
            {/* Chat header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <h3 className="font-medium">Assistant COMPUTER BUSINESS CENTER</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat}
                className="h-8 w-8 text-primary-foreground hover:bg-primary/90"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`
                        max-w-[85%] rounded-lg p-3 
                        ${message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-muted text-foreground mr-4'}
                      `}
                    >
                      <div className="flex flex-col">
                        <p className="text-sm">{message.content}</p>
                        <span className="text-[10px] opacity-70 mt-1 text-right">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground rounded-lg p-3 mr-4 max-w-[85%]">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tapez votre message ici..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                <Send size={18} />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
