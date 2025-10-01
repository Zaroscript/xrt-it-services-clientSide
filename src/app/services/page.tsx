"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { 
  Code2, 
  CloudCog, 
  Smartphone, 
  HardDrive, 
  ShieldCheck, 
  Cpu,
  Globe2,
  ArrowRight,
  Check,
  Server,
  Database,
  Shield,
  CpuIcon,
  Network,
  Code
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";

import { services, howItWorks, whyChooseUs, faqs } from "@/config/constants";

// Function to scroll to a specific section with smooth behavior
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 80; 
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update URL without page reload
    window.history.pushState({}, '', `#${id}`);
  }
};

export default function ServicesPage() {
  // Handle initial scroll on page load with hash
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Small delay to ensure the page is fully loaded
        const timer = setTimeout(() => {
          scrollToSection(hash);
        }, 100);
        return () => clearTimeout(timer);
      }
    };

    // Handle initial load with hash
    handleHashScroll();

    // Handle hash changes
    window.addEventListener('hashchange', handleHashScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);
  return (
    <div className="min-h-screen">
      {/* Services Navigation */}

      {/* Services Navigation */}
      <section className="sticky top-16 z-40 bg-background/90 backdrop-blur-lg border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => scrollToSection(service.id)}
                className="px-4 py-2 text-sm font-medium rounded-full bg-card hover:bg-secondary/10 hover:text-foreground dark:hover:bg-accent dark:hover:text-accent-foreground transition-colors border border-transparent hover:border-secondary/30 dark:border-border/50"
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <div className="container mx-auto px-4 py-16">
        {services.map((service, index) => (
          <section 
            key={service.id}
            id={service.id}
            className={`py-16 ${index !== services.length - 1 ? 'border-b border-border/50' : ''}`}
          >
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-full md:w-1/3">
                    <div className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.color} text-white border-2 border-secondary/20 dark:border-transparent`}>
                      <service.icon className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                    <Button className="mt-4 bg-gradient-to-r from-secondary/90 to-secondary/70 hover:from-secondary hover:to-secondary/90 text-white border-secondary/50 hover:border-secondary/70">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                  
                  <div className="w-full md:w-2/3 bg-card p-8 rounded-2xl border border-border/50">
                    <h3 className="text-xl font-semibold mb-6">What's Included</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start p-4 bg-secondary/5 dark:bg-muted/30 rounded-lg border border-secondary/10 dark:border-border/50">
                          <Check className="w-5 h-5 text-secondary dark:text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">{feature}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Comprehensive solution for all your {feature.toLowerCase()} needs.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>
        ))}
      </div>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-background via-secondary/5 to-secondary/5 dark:via-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Our proven process ensures your project's success from concept to launch and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step) => (
              <FadeIn key={step.id} delay={step.id * 0.1}>
                <div className="bg-card p-6 rounded-2xl border border-border/50 h-full flex flex-col items-center text-center">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5 dark:to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our services and processes.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div className="bg-card p-6 rounded-2xl border border-border/50">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your business goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2">
                Contact Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}