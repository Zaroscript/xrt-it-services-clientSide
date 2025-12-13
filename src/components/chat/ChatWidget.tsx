"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { websiteData } from "@/app/api/chat/data";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot" | "system";
  timestamp: Date;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    text: `👋 Hi there! Welcome to **${websiteData.company.name}**. \n\nI'm here to help you explore our services, check out pricing, or get in touch with our team. What's on your mind today?`,
    sender: "bot",
    timestamp: new Date(),
  },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Local Response Logic
  const getLocalResponse = async (message: string): Promise<string> => {
    const lowerMsg = message.toLowerCase();

    // Simulate network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 600));

    // 1. Check for Greetings
    if (lowerMsg.match(/(hi|hello|hey|greetings)/)) {
      return `👋 Hi there! I'm here to help you with services, pricing, or contact info. How can I assist you?`;
    }

    // 2. Check for Specific Service Inquiries
    for (const service of websiteData.services) {
      const keywords = service.title.toLowerCase().split(/[ &]+/);
      const matchCount = keywords.filter(
        (k) => lowerMsg.includes(k) && k.length > 3
      ).length;

      if (
        matchCount >= 2 ||
        (keywords.some((k) => lowerMsg.includes(k)) &&
          lowerMsg.includes("service"))
      ) {
        return `🚀 **${service.title}**\n\n${
          service.description
        }\n\n✨ **What you get:**\n${service.features
          .map((f) => `• ${f}`)
          .join("\n")}\n\nWould you like to get a quote for this service?`;
      }
    }

    // 3. Check for Pricing/Cost (Dynamic Fetch from API if possible, else static)
    if (lowerMsg.match(/(price|cost|plan|subscription|how much)/)) {
      try {
        // Try fetching dynamic plans
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";
        const res = await fetch(`${apiUrl}/plans?active=true`);
        if (res.ok) {
          const data = await res.json();
          const plans = data.data?.plans;

          if (plans && plans.length > 0) {
            const plansInfo = plans
              .map((p: any) => {
                const priceDisplay = p.isCustom
                  ? "Contact for Quote"
                  : `$${p.monthlyPrice || p.price || 0}/mo`;
                const features = p.features
                  ? p.features
                      .slice(0, 3)
                      .map((f: string) => `• ${f}`)
                      .join("\n")
                  : "";
                return `💎 **${p.name}** - ${priceDisplay}\n${features}`;
              })
              .join("\n\n");
            return `💰 **Flexible Pricing for Your Business**\n\nWe have plans designed to help you grow:\n\n${plansInfo}\n\n**Note:** ${websiteData.pricing.details}\n\nWhich plan sounds like a good fit?`;
          }
        }
      } catch (e) {
        console.warn("Failed to fetch dynamic pricing, using static data");
      }

      // Fallback to static data
      const plansInfo = websiteData.pricing.plans
        .map(
          (p) =>
            `💎 **${p.name}** - ${p.price}\n${p.features
              .slice(0, 3)
              .map((f) => `• ${f}`)
              .join("\n")}`
        )
        .join("\n\n");
      return `💰 **Flexible Pricing for Your Business**\n\nWe have plans designed to help you grow:\n\n${plansInfo}\n\n**Note:** ${websiteData.pricing.details}\n\nWhich plan sounds like a good fit?`;
    }

    // 4. Check for Contact/Location/Hours
    if (
      lowerMsg.match(
        /(contact|email|phone|address|located|location|hours|support)/
      )
    ) {
      const c = websiteData.company.contact;
      return `📞 **Let's Connect!**\n\nWe'd love to hear from you. Here is how you can reach us:\n\n📧 **Email:** [${c.email}](mailto:${c.email})\n📱 **Phone:** [${c.phone}](tel:${c.phone})\n📍 **Visit:** ${c.address}\n\n⏰ **Hours:** ${c.hours}`;
    }

    // 5. Check for "About" or Company Info
    if (lowerMsg.match(/(about|who are you|company|mission|vision)/)) {
      return `🌟 **About ${websiteData.company.name}**\n\n${websiteData.company.description}\n\n🎯 **Our Mission:** ${websiteData.company.mission}`;
    }

    // 6. Check FAQs
    for (const faq of websiteData.faqs) {
      const qWords = faq.q.toLowerCase().split(" ");
      const matchCount = qWords.filter(
        (w) => lowerMsg.includes(w) && w.length > 3
      ).length;
      if (matchCount >= 3) {
        return `💡 **Did you know?**\n\n${faq.a}`;
      }
    }

    // 7. Broad Match for "Services" generic query
    if (
      lowerMsg.includes("service") ||
      lowerMsg.includes("offer") ||
      lowerMsg.includes("do for me")
    ) {
      const serviceTitles = websiteData.services
        .map((s) => `• ${s.title}`)
        .join("\n");
      return `🛠️ **Our Expertise**\n\nWe offer a wide range of technology solutions to help your business thrive:\n\n${serviceTitles}\n\nIs there a specific service you'd like to explore?`;
    }

    // 8. Fallback
    return (
      "🤔 I'm not quite sure I caught that. \n\nI can tell you all about our **Services**, **Pricing Plans**, or share our **Contact Info**. \n\nYou can also reach our human support team directly at " +
      websiteData.company.contact.email
    );
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      // Add a loading message
      const loadingId = `loading-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: loadingId,
          text: "Thinking...",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);

      // Process locally
      const responseText = await getLocalResponse(userMessage.text);

      // Remove loading message and add AI response
      setMessages((prev) => [
        ...prev.filter((msg) => msg.id !== loadingId),
        {
          id: Date.now().toString(),
          text: responseText,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } catch (error: any) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev.filter(
          (msg) => msg.sender !== "bot" || !msg.text.includes("Thinking")
        ),
        {
          id: `error-${Date.now()}`,
          text: "Sorry, I encountered an error. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Helper to render message text with bold markdown-like syntax
  const renderMessageText = (text: string) => {
    // Very basic formatting for bold text (**text**)
    // Split by newlines first to preserve paragraphs
    return text.split("\n").map((paragraph, i) => (
      <p key={i} className={cn("mb-1", paragraph === "" && "h-2")}>
        {paragraph.split(/(\*\*.*?\*\*)/).map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    ));
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
              "flex",
              message.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] p-3 rounded-2xl flex items-start space-x-2",
                message.sender === "user"
                  ? "bg-primary/10 dark:bg-primary/20 rounded-tr-none"
                  : "bg-gray-100 dark:bg-gray-700 rounded-tl-none",
                "relative group"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                  message.sender === "user"
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary/10 text-secondary"
                )}
              >
                {message.sender === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium mb-1">
                  {message.sender === "user" ? "You" : "Support"}
                </div>
                <div className="text-sm prose dark:prose-invert max-w-none">
                  {renderMessageText(message.text)}
                </div>
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
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about pricing, services..."
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-sm disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="p-2 rounded-full bg-primary text-white disabled:opacity-50 hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:cursor-not-allowed"
            aria-label="Send message"
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
