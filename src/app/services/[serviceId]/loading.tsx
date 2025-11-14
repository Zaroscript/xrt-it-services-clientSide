"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-background">
        <div className="wide-container px-4">
          {/* Back Button Skeleton */}
          <Skeleton className="absolute left-4 top-10 w-32 h-10 rounded-full" />
          
          <div className="max-w-4xl mx-auto text-center pt-8">
            {/* Service Badge Skeleton */}
            <Skeleton className="h-8 w-48 mx-auto rounded-full mb-8" />
            
            {/* Main Heading Skeleton */}
            <div className="space-y-4 mb-6">
              <Skeleton className="h-12 w-3/4 mx-auto" />
              <Skeleton className="h-12 w-1/2 mx-auto" />
            </div>
            
            {/* Description Skeleton */}
            <div className="space-y-2 max-w-2xl mx-auto mb-10">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
              <Skeleton className="h-4 w-4/6 mx-auto" />
            </div>
            
            {/* CTA Buttons Skeleton */}
            <div className="flex flex-wrap justify-center gap-4">
              <Skeleton className="h-12 w-36 rounded-lg" />
              <Skeleton className="h-12 w-36 rounded-lg" />
            </div>
            
            {/* Scroll Indicator Skeleton */}
            <div className="mt-16 flex flex-col items-center">
              <Skeleton className="w-8 h-12 rounded-full" />
              <Skeleton className="mt-2 h-4 w-24" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-20">
        <div className="wide-container px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 space-y-6">
                <Skeleton className="h-10 w-3/4 mb-6" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                  <Skeleton className="h-4 w-5/6 mt-6" />
                  <Skeleton className="h-4 w-4/6" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
              <div className="lg:w-1/2">
                <Skeleton className="aspect-video rounded-2xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Skeleton */}
      <section className="py-20 bg-muted/30">
        <div className="wide-container px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card p-6 rounded-xl border border-border/50">
                <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
