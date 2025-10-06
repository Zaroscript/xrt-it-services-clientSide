"use client";

import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/FadeIn";
import { useRouter } from "next/navigation";

import { Code2, CloudCog, Cpu, HardDrive, ShieldCheck, Smartphone } from "lucide-react";

// Map of icon names to their corresponding components
const iconMap = {
  'web-development': Code2,
  'mobile-apps': Smartphone,
  'cloud-solutions': CloudCog,
  'database-management': HardDrive,
  'cybersecurity': ShieldCheck,
  'ai-ml-solutions': Cpu,
  'default': Cpu
} as const;

type ServiceDetailProps = {
  service: {
    id: string;
    title: string;
    description: string;
    features: string[];
    color: string;
    iconName: string;
    longDescription?: string;
    process?: Array<{ title: string; description: string }>;
    faqs?: Array<{ question: string; answer: string }>;
  };
};

export function ServiceDetail({ service }: ServiceDetailProps) {
  // Get the icon component based on the iconName
  const IconComponent = iconMap[service.iconName as keyof typeof iconMap] || iconMap.default;
  // Default FAQs that can be overridden by service-specific FAQs
  const defaultFAQs = [
    {
      question: `What is included in your ${service.title} service?`,
      answer: `Our ${service.title} service includes [specific details about what's included]. We tailor our approach to meet your specific business needs and goals.`,
    },
    {
      question: `How long does the ${service.title} process typically take?`,
      answer: `The timeline for ${service.title} services varies based on project scope and complexity. We'll provide a detailed timeline after our initial consultation.`,
    },
    {
      question: `What makes your ${service.title} service different from others?`,
      answer: `Our ${service.title} service stands out due to our [unique selling points, expertise, or approach]. We focus on delivering measurable results and exceptional value.`,
    },
    {
      question: "Do you offer ongoing support after the service is complete?",
      answer:
        "Yes, we offer various support and maintenance packages to ensure your solution continues to perform optimally after launch.",
    },
    {
      question: "How do you ensure the quality of your work?",
      answer:
        "We follow industry best practices, conduct thorough testing, and maintain strict quality assurance processes throughout the project lifecycle.",
    },
  ];

  // Use service-specific FAQs if available, otherwise use default FAQs
  const faqs = service.faqs?.length ? service.faqs : defaultFAQs;

  const router = useRouter();

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="absolute inset-0 bg-card/80 backdrop-blur-sm -z-10"></div>
        <div className="relative z-10 wide-container px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="md:w-2/3">
                  <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                    {service.title}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {service.title} Services
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8">
                    {service.longDescription || service.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="group" onClick={() => router.push(`/#quote`)}>
                      Get a Quote
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => router.push(`/#contact`)}
                    >
                      Contact Sales
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div
                    className={`p-8 rounded-2xl bg-white dark:bg-card/50 border border-border/50 shadow-lg`}
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      What's Included
                    </h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      {/* Detailed Content */}
      <section className="py-20 bg-background relative">
        <div className="wide-container relative">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="prose dark:prose-invert max-w-none">
                <h2>About Our {service.title} Services</h2>
                <p>
                  experts is dedicated to delivering high-quality solutions
                  tailored to your specific business needs.
                </p>
              </div>

              {service.process && (
                <div className="mt-16 max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      Our Process
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      We follow a streamlined, results-driven approach to deliver exceptional outcomes for every project.
                    </p>
                  </div>
                  
                  <div className="relative">
                    {/* Decorative line */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-transparent -z-10"></div>
                    
                    <div className="space-y-8">
                      {service.process?.map((step, i) => (
                        <div key={i} className="relative flex group">
                          {/* Step indicator */}
                          <div className="flex flex-col items-center mr-6">
                            <div className={`p-3 rounded-xl ${service.color.replace('from-', 'bg-').split(' ')[0]}/10 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300`}>
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.color.replace('from-', 'bg-').split(' ')[0]}/20`}>
                                <IconComponent className="h-6 w-6 text-primary" />
                              </div>
                            </div>
                            {i < (service.process?.length ?? 0) - 1 && (
                              <div className="w-0.5 h-16 bg-gradient-to-b from-primary/10 to-transparent my-2"></div>
                            )}
                          </div>
                          
                          {/* Step content */}
                          <div className="flex-1 pb-12 group-last:pb-0">
                            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-border/20 hover:border-primary/20">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                                  {i + 1}
                                </span>
                                <h4 className="text-xl font-semibold">
                                  {step.title}
                                </h4>
                              </div>
                              <p className="text-muted-foreground pl-11">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/10 relative">
        <div className="wide-container text-center relative">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to get started with {service.title}?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today to discuss how our {service.title.toLowerCase()}{" "}
              services can help your business grow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                onClick={() => router.push('/#quote')}
              >
                Get A Quote
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
