"use client";

import { Loader } from "@/components/ui/Loader";

export default function Loading() {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
      style={{
        willChange: 'opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <div className="animate-fade-in">
        <Loader size="lg" />
      </div>
    </div>
  );
}