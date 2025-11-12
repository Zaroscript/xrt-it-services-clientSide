"use client";

import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Code2, CloudCog, Cpu, HardDrive, ShieldCheck, Smartphone } from "lucide-react";

// Map of icon names to their corresponding components
const iconMap = {
  'web-development': Code2,
  'mobile-apps': Smartphone,
  'cloud-solutions': CloudCog,
  'database-management': HardDrive,
  'cybersecurity': ShieldCheck,
  'ai-ml-solutions': Cpu,
  'default': Cpu,
  'online-ordering-systems': Smartphone,
  'digital-marketing': Code2,
  'it-setup-support': Cpu,
  'seo-performance-optimization': ShieldCheck
} as const;

type ServiceDetailProps = {
  service: {
    id: string;
    title: string;
    description: string;
    features: string[];
    color: string;
    iconName: string;
    img?: string;
    longDescription?: string;
  };
};

export function ServiceDetail({ service }: ServiceDetailProps) {
  const router = useRouter();
  const IconComponent = iconMap[service.iconName as keyof typeof iconMap] || iconMap.default;
  
  // Generate gradient class based on service color
  const gradientClass = service.color || 'from-primary to-secondary';

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-background">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl -z-10" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl -z-10" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFucm9ybT0icm90YXRlKDMwKSI+PGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjQwIiBzdHJva2U9InJnYmEoMCwwLDAsMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-5 dark:opacity-[0.02] -z-10" />
        </div>
        
        <div className="relative z-10 wide-container px-4">
          {/* Back Button - Positioned absolutely on the left */}
          <div className="absolute -left-2 top-8 md:left-4 md:top-10 z-20">
            <Button 
              variant="ghost" 
              size="sm" 
              className="group inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 border border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur-sm rounded-full transition-all duration-300 hover:shadow-sm"
              onClick={() => router.back()}
            >
              <ArrowRight className="w-4 h-4 mr-1 md:mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium hidden sm:inline">Back to Services</span>
              <span className="text-sm font-medium sm:hidden">Back</span>
            </Button>
          </div>
          
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center pt-8">
              
              {/* Service Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/5 text-primary border border-primary/10 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                {service.title} Services
              </div>
              
              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                {service.title.split(' ').map((word, i) => (
                  <span key={i} className="inline-block transition-transform hover:scale-105 hover:translate-x-1">
                    {word}{' '}
                  </span>
                ))}
              </h1>
              
              {/* Description */}
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                {service.longDescription || service.description}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  className="group px-8 h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  onClick={() => router.push('/#quote')}
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 h-12 text-base font-medium border-2 border-border/50 hover:border-primary/50 hover:bg-background/50 transition-all duration-300"
                  onClick={() => router.push('/#contact')}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                </Button>
              </div>
              
              {/* Scroll Indicator */}
              <div className="mt-16 flex flex-col items-center">
                <div className="w-8 h-12 border-2 border-foreground/20 rounded-full flex justify-center p-1">
                  <div className="w-1 h-2 bg-foreground/50 rounded-full animate-bounce" />
                </div>
                <span className="mt-2 text-xs text-muted-foreground font-medium">Scroll to explore</span>
              </div>
            </div>
          </FadeIn>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent -z-0" />
      </section>

      {/* Description & Image Section */}
      <section className="py-20 relative">
        <div className="wide-container px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="lg:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    About Our {service.title} Services
                  </h2>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground mb-6">
                      At XRT, we specialize in delivering cutting-edge {service.title.toLowerCase()} solutions 
                      tailored to your business needs. Our team of experts combines technical 
                      expertise with industry knowledge to provide exceptional results.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      {service.longDescription || service.description}
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  {service.img ? (
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                      <Image 
                        src={service.img} 
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className={`aspect-video rounded-2xl flex items-center justify-center ${gradientClass} bg-opacity-10`}>
                      <IconComponent className="w-32 h-32 text-primary opacity-20" />
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="wide-container px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What's Included
              </h2>
              <p className="text-xl text-muted-foreground">
                Our comprehensive {service.title.toLowerCase()} services include everything you need to succeed
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {service.features.map((feature, i) => (
                <div 
                  key={i}
                  className="group bg-card p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`w-12 h-12 rounded-lg ${gradientClass} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature}</h3>
                  <p className="text-muted-foreground text-sm">
                    Expertly implemented {feature.toLowerCase()} as part of our comprehensive service package.
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 -z-10">
          <div className={`absolute inset-0 ${gradientClass} opacity-5`} />
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
        </div>
        <div className="wide-container px-4 text-center">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to transform your business with our {service.title} services?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Get in touch with our team today to discuss how we can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 group"
                  onClick={() => router.push('/#quote')}
                >
                  Get A Free Quote
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => router.push('/contact')}
                >
                  Contact Our Team
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
