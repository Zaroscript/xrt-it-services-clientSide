// Images

import case_study from "../assets/images/case-study.png";
import company_1 from "../assets/images/home-processing-video-intro-slider-slide-01-image-01.webp";
import company_2 from "../assets/images/home-processing-video-intro-slider-slide-01-image-02.webp";
import company_3 from "../assets/images/home-processing-video-intro-slider-slide-01-image-03.webp";
import company_4 from "../assets/images/home-processing-video-intro-slider-slide-01-image-04.webp";
import company_5 from "../assets/images/home-processing-video-intro-slider-slide-01-image-05.webp";
import global from "../assets/images/global.webp";
import testimonial_1 from "../assets/images/mitech-testimonial-avata-02-90x90.webp";
import testimonial_2 from "../assets/images/mitech-testimonial-avata-03-90x90.webp";
import { Code2, Cpu, Smartphone } from "lucide-react";

// src/config/constants.ts
export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Services",
    path: "/services",
    submenu: [
      { name: "Web Development", path: "/services/#web-development" },
      { name: "Cloud Solutions", path: "/services/#cloud-solutions" },
      { name: "Mobile Apps", path: "/services/#mobile-apps" },
    ],
  },
  { name: "Plans", path: "/plans" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

export const heroSlides = [
  {
    id: 1,
    title: "AI-Powered Solutions",
    text: "Unlock the future with advanced AI services tailored to your business needs.",
    image: "/images/home-services-hero-bg.webp",
  },
  {
    id: 2,
    title: "Cloud Security",
    text: "Protect your digital infrastructure with next-gen cloud security solutions.",
    image: "/images/slider-cloud.webp",
  },
  {
    id: 3,
    title: "Smart Analytics",
    text: "Transform your data into actionable insights with machine learning.",
    image: "/images/slider-analytics.webp",
  },
];

export const plans = [
  {
    title: "XRT-Tech STANDARD",
    monthlyPrice: "USD 15/m",
    yearlyPrice: "USD 180/y",
    monthlyTotal: "$180",
    yearlyTotal: "$180",
    monthlyOriginal: "$228",
    yearlyOriginal: "$228",
    discount: "21%",
    features: [
      { text: "All Standard Courses", included: true },
      { text: "All Hands-on Labs", included: true },
    ],
    isPopular: false,
  },
  {
    title: "XRT-Tech PRO",
    monthlyPrice: "USD 25/m",
    yearlyPrice: "USD 300/y",
    monthlyTotal: "$300",
    yearlyTotal: "$300",
    monthlyOriginal: "$380",
    yearlyOriginal: "$380",
    discount: "21%",
    features: [
      { text: "All Standard Courses", included: true },
      { text: "All Hands-on Labs", included: true },
      { text: "All PRO courses", included: false },
      { text: "60+ DevOps Playgrounds", included: false },
      { text: "3 Cloud Playgrounds", included: false },
      { text: "AI Assisted Labs", included: false },
      { text: "Personalized AI Tutor", included: false },
    ],
    isPopular: true,
  },
  {
    title: "XRT-Tech ENTERPRISE",
    monthlyPrice: "USD 35/m",
    yearlyPrice: "USD 420/y",
    monthlyTotal: "$420",
    yearlyTotal: "$420",
    monthlyOriginal: "$530",
    yearlyOriginal: "$530",
    discount: "21%",
    features: [
      { text: "All Standard Courses", included: true },
      { text: "All Hands-on Labs", included: true },
      { text: "Team management dashboard", included: false },
      { text: "Learning Tracker & Report", included: false },
      { text: "1x user license transfer", included: false },
    ],
    isPopular: false,
  },
];

export const steps = [
  {
    title: "Personal Information",
    description: "Start with your basic information",
  },
  {
    title: "Business Details",
    description: "Tell us about your business",
  },
  {
    title: "Website Information",
    description: "Share your existing website details",
  },
  {
    title: "Create Password",
    description: "Secure your account",
  },
];

// Testimonials
export const testimonials = [
  {
    name: "Abbie Ferguson",
    role: "CEO, StartupX",
    avatar: testimonial_1,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos sequi, facere, alias excepturi accusamus harum quaerat ipsa repellat ullam dolores dolorum libero. Maxime.",
    rating: 5,
  },
  {
    name: "John Carter",
    role: "Restaurant Owner",
    avatar: testimonial_2,
    text: "They transformed our online presence completely! Sales have doubled since launching our new website and ordering system.",
    rating: 5,
  },
  {
    name: "Sophie Turner",
    role: "CEO, StartupX",
    avatar: testimonial_2,
    text: "Amazing support and top-notch solutions. The loyalty program really helped us retain customers and grow recurring revenue.",
    rating: 4,
  },
];

export const services = [
  {
    id: "web-development",
    icon: Code2,
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
    features: [
      "Responsive Design",
      "E-commerce Solutions",
      "CMS Integration",
      "API Development",
      "Progressive Web Apps",
    ],
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "mobile-apps",
    icon: Smartphone,
    title: "Mobile Apps",
    description:
      "Beautiful and functional mobile applications for iOS and Android platforms.",
    features: [
      "Cross-Platform Development",
      "Native iOS & Android",
      "UI/UX Design",
      "App Store Optimization",
      "Maintenance & Support",
    ],
    color: "from-green-500 to-emerald-400",
  },
  {
    id: "ai-ml",
    icon: Cpu,
    title: "AI & ML Solutions",
    description:
      "Leverage artificial intelligence and machine learning to transform your business operations.",
    features: [
      "Predictive Analytics",
      "Computer Vision",
      "Natural Language Processing",
      "Chatbot Development",
      "AI Integration",
    ],
    color: "from-purple-500 to-pink-500",
  },
];

export const howItWorks = [
  {
    id: 1,
    title: "Discovery & Planning",
    description:
      "We start by understanding your business needs and defining project requirements.",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Design & Development",
    description:
      "Our team creates custom solutions tailored to your specific requirements.",
    icon: "🎨",
  },
  {
    id: 3,
    title: "Testing & Quality Assurance",
    description:
      "Rigorous testing ensures your solution is reliable and performs as expected.",
    icon: "🧪",
  },
  {
    id: 4,
    title: "Deployment & Support",
    description:
      "We handle the deployment and provide ongoing support and maintenance.",
    icon: "🚀",
  },
];

export const whyChooseUs = [
  {
    title: "Expert Team",
    description:
      "Our team consists of certified professionals with years of industry experience.",
    icon: "👨‍💻",
  },
  {
    title: "Customer-Centric Approach",
    description:
      "We prioritize your needs and work closely with you throughout the project.",
    icon: "🤝",
  },
  {
    title: "Cutting-Edge Technology",
    description:
      "We use the latest technologies and best practices to deliver top-notch solutions.",
    icon: "⚡",
  },
  {
    title: "Proven Track Record",
    description:
      "We've successfully delivered numerous projects for clients across various industries.",
    icon: "🏆",
  },
];

export const faqs = [
  {
    question: "What is your development process?",
    answer:
      "Our development process follows industry best practices including requirements gathering, design, development, testing, and deployment. We maintain transparent communication throughout the project lifecycle.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity. A simple website might take 4-6 weeks, while more complex applications can take several months. We'll provide a detailed timeline after our initial consultation.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer various support and maintenance packages to ensure your solution continues to perform optimally after launch.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "We work with a wide range of technologies including React, Next.js, Node.js, Python, AWS, Google Cloud, and many others. We choose the best stack for your specific needs.",
  },
];

export const values = [
  {
    title: "Innovation",
    description:
      "We embrace change and constantly seek new ways to solve problems and improve our solutions.",
  },
  {
    title: "Excellence",
    description:
      "We're committed to delivering the highest quality in everything we do, from code to customer service.",
  },
  {
    title: "Integrity",
    description:
      "We believe in transparency, honesty, and doing what's right, even when no one is watching.",
  },
  {
    title: "Collaboration",
    description:
      "We work together across teams to combine diverse perspectives and achieve extraordinary results.",
  },
];

// Export images
export {
  case_study,
  company_1,
  company_2,
  company_3,
  company_4,
  company_5,
  global,
  testimonial_1,
  testimonial_2,
};
