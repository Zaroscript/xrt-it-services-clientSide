'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'system';
  timestamp: Date;
}

const defaultMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I\'m your XRT-Tech assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    // Add user message and clear input
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Add a loading message
      const loadingMessage: Message = {
        id: `loading-${Date.now()}`,
        text: 'Thinking...',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, loadingMessage]);

      // Prepare messages for the API
      const apiMessages = updatedMessages
        .filter(msg => msg.sender !== 'system')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.text
        }));

      // Call our API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get response from AI');
      }

      const data = await response.json();
      
      // Remove loading message and add AI response
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== loadingMessage.id),
        {
          id: Date.now().toString(),
          text: data.response?.content || 'I apologize, but I encountered an issue processing your request.',
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Add error message with more details in development
      const errorMessage = process.env.NODE_ENV === 'development' && error.message 
        ? `Error: ${error.message}`
        : 'Sorry, I encountered an error. Please try again later or contact support.';
      
      setMessages(prev => [
        ...prev.filter(msg => msg.sender !== 'bot' || !msg.text.includes('Thinking')),
        {
          id: `error-${Date.now()}`,
          text: errorMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9998] w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[80vh] bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="font-semibold">Chat Support</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] p-3 rounded-2xl flex items-start space-x-2',
                message.sender === 'user'
                  ? 'bg-primary/10 dark:bg-primary/20 rounded-tr-none'
                  : 'bg-gray-100 dark:bg-gray-700 rounded-tl-none',
                'relative group'
              )}
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                message.sender === 'user' 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-secondary/10 text-secondary'
              )}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium mb-1">
                  {message.sender === 'user' ? 'You' : 'Support'}
                </div>
                <p className="text-sm">{message.text}</p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about our services..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-sm disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 rounded-full bg-primary text-white disabled:opacity-50 hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:cursor-not-allowed"
            aria-label={isLoading ? 'Sending...' : 'Send message'}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
