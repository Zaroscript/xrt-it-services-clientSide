'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/ui/FadeIn';
import { Rocket, Clock, Mail, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setEmail('');
    }, 1500);
  };

  const features = [
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: "Innovative Solutions",
      description: "Cutting-edge technology for your business needs"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Lightning Fast",
      description: "Optimized performance for the best experience"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "24/7 Support",
      description: "Our team is always here to help you"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Coming Soon
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-6">
              Something Amazing is on the Way
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              We're working hard to bring you an incredible experience. 
              Stay tuned for our launch and be the first to know when we go live!
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="max-w-md mx-auto mb-16">
              {isSubscribed ? (
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="flex-shrink-0">
                      <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      Thank you! We'll notify you when we launch.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 min-w-0"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={isLoading} className="shrink-0">
                    {isLoading ? 'Subscribing...' : 'Notify Me'}
                  </Button>
                </form>
              )}
              <p className="mt-3 text-sm text-muted-foreground">
                No spam, just important updates. Unsubscribe anytime.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3 }}
                  className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-16 pt-8 border-t border-border/20">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} XRT. All rights reserved.
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
