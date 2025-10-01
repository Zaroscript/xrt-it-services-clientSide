"use client";

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatFloatingButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Show button after initial load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    // Add your chat functionality here
    console.log('Open chat');
    // You can replace this with your chat implementation
    window.alert('Chat feature coming soon!');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9998] transition-all duration-300">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          'flex items-center justify-center w-14 h-14 rounded-full shadow-lg',
          'bg-gradient-to-br from-primary to-secondary text-white',
          'transform transition-all duration-300',
          isHovered ? 'scale-110 shadow-xl' : 'scale-100',
          isMobile ? 'shadow-lg' : 'shadow-xl',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50',
          'relative overflow-hidden group'
        )}
        aria-label="Chat with us"
      >
        {/* Main icon */}
        <MessageCircle className={cn(
          'w-6 h-6 transition-transform duration-300',
          isHovered ? 'scale-110' : 'scale-100'
        )} />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            'absolute w-full h-full rounded-full bg-primary/20',
            'animate-ping opacity-0 group-hover:opacity-100',
            'transition-opacity duration-300'
          )} />
        </span>
        
        {/* Tooltip */}
        {!isMobile && (
          <span className={cn(
            'absolute right-full mr-3 px-3 py-1.5 rounded-md text-sm font-medium',
            'bg-gray-800 text-white whitespace-nowrap',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-200',
            'pointer-events-none',
            'shadow-lg',
            'transform -translate-y-1/2',
            'top-1/2',
            'after:content-[""] after:absolute after:top-1/2 after:left-full',
            'after:-translate-y-1/2 after:border-8 after:border-transparent',
            'after:border-l-gray-800'
          )}>
            Need help? Chat with us
          </span>
        )}
      </button>
    </div>
  );
};

export default ChatFloatingButton;
