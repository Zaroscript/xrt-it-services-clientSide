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
import lightLogo from "../assets/images/logo-light.png";
import darkLogo from "../assets/images/logo-dark.png";
import techX from "../assets/images/techx.png";
import partner1 from "../assets/images/partner1.webp";
import partner2 from "../assets/images/partner2.webp";
import partner3 from "../assets/images/partner3.webp";
import partner4 from "../assets/images/partner4.webp";
import partner5 from "../assets/images/partner5.webp";
import partner6 from "../assets/images/partner6.webp";

import {
  CloudCog,
  Code2,
  Palette,
  Rocket,
  Settings,
  ShoppingCart,
} from "lucide-react";

// src/config/constants.ts
export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  {
    name: "Services",
    path: "/services",
  },
  { name: "Plans", path: "/plans" },
  // { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

export const heroContent = [
  {
    title:
      "Turn Clicks into Customers with an Easy-to-Use Online Ordering System",
    description:
      " Take your business online with a simple, user-friendly ordering platform built for sales, speed, and customer satisfaction. No complexity — just seamless ordering that works.",
    primBtn: {
      text: "Free Consultation",
      path: "/contact",
    },
    secBtn: {
      text: "How It Works",
      path: "/about",
    },
  },
  {
    title:
      "Tailored Websites and Apps Built to Achieve Your Business GoalsDevelopment",
    description:
      "We don’t just design — we strategize. Every website and app we create is customized to your industry, crafted to meet your goals, and optimized to turn visitors into results.",
    primBtn: {
      text: "Free Consultation",
      path: "/contact",
    },
    secBtn: {
      text: "Recent Projects",
      path: "/services",
    },
  },
  {
    title: "Simplify Technology with Reliable IT Solutions That Work for You",
    description:
      "We handle the tech so you can focus on your business. From setup to support, XRT Tech delivers smart, dependable IT services built around your goals.",
    primBtn: {
      text: "Talk to an IT Expert",
      path: "/contact",
    },
    secBtn: {
      text: "Explore Our Services",
      path: "/services",
    },
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
    id: 1,
    title: "01. Discovery & Discussion",
    text: "We start with a conversation to understand your goals, challenges, and vision. This helps us identify what your business truly needs before we begin designing the right solution.",
  },
  {
    id: 2,
    title: "02. Strategy & Concept Design",
    text: "Once we know your goals, our team creates a tailored plan and visual concept. Every idea is designed to match your brand and deliver measurable results",
  },
  {
    id: 3,
    title: "03. Development & Testing",
    text: "We bring your project to life — building, testing, and refining every detail to ensure it performs flawlessly across all devices and platforms.",
  },
  {
    id: 4,
    title: "04. Launch & Ongoing Support",
    text: "After final approval, we launch your project with confidence. But our job doesn’t end there — we stay by your side with maintenance, updates, and continuous support.",
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
    title: "Web Design, Development & Maintenance",
    description:
      "Your website is the heart of your online presence. We design, build, host, and maintain fast, modern sites that work flawlessly on every device — so your business looks professional and runs smoothly, 24/7",
    color: "from-blue-500 to-cyan-400",
    features: [
      "Responsive Design",
      "E-commerce Integration",
      "Content Management",
      "Performance Optimization",
      "SEO Optimization",
    ],
  },
  {
    id: "cloud-solutions",
    icon: CloudCog,
    title: "Cloud & Backup Solutions",
    description:
      "Protect your data and access it anywhere. We provide secure cloud storage and automated backups to ensure your files and systems are always safe, synced, and accessible.",
    color: "from-purple-500 to-pink-500",
    features: [
      "Cloud Migration",
      "Serverless Architecture",
      "Cloud Security",
      "Cost Optimization",
      "24/7 Monitoring",
    ],
  },
  {
    id: "online-ordering-systems",
    icon: ShoppingCart,
    title: "Online Ordering Systems",
    description:
      "Bring your store or restaurant online with a custom ordering system that’s easy to use and built for results. Accept orders, manage menus, and track performance — all from one simple dashboard.",
    color: "from-green-500 to-emerald-400",
    features: [
      "Custom Ordering System",
      "Order Management",
      "Menu Management",
      "Performance Tracking",
      "Dashboard",
    ],
  },
  {
    id: "digital-branding-e-design",
    icon: Palette,
    title: "Digital Branding & eDesign",
    description:
      "Make your first impression count. We craft logos, digital materials, and visuals that reflect your brand’s personality and help you stand out in a crowded market.",
    color: "from-amber-500 to-yellow-400",
    features: [
      "Logo Design",
      "Digital Materials",
      "Visual Identity",
      "Brand Identity",
      "Social Media Management",
      "Content Creation",
    ],
  },
  {
    id: "it-setup-support",
    icon: Settings,
    title: "IT Setup & Support",
    description:
      "We handle the technical side so you don’t have to. From email systems and cloud setup to troubleshooting and maintenance — we keep your business connected and running without downtime.",
    color: "from-red-500 to-orange-400",
    features: ["Email Setup", "Cloud Setup", "Troubleshooting", "Maintenance"],
  },
  {
    id: "seo-performance-optimization",
    icon: Rocket,
    title: "SEO & Performance Optimization",
    description:
      "Boost your visibility and website performance. Our optimization strategies help your site load faster, rank higher, and deliver a seamless experience that turns visitors into customers.",
    color: "from-indigo-500 to-purple-400",
    features: [
      "Predictive Analytics",
      "Computer Vision",
      "Natural Language Processing",
      "Chatbot Development",
      "AI Integration",
    ],
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
    question: "How much does a website or system project usually cost?",
    answer:
      "Every project is unique — pricing depends on your goals, features, and overall complexity. After a quick consultation, we’ll provide a clear, itemized proposal so you know exactly what you’re paying for — no hidden fees, no surprises.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on scope, complexity, and the client’s specific needs. After our initial consultation, we’ll create a clear project plan with defined milestones and launch goals. Our priority is to deliver every project efficiently — without ever compromising on quality or attention to detail.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes. Every project includes access to our dedicated technical team for continuous support and maintenance. We offer tailored plans designed to keep your website, systems, and IT infrastructure secure, optimized, and up to date. From regular performance checks to rapid issue resolution, our priority is to ensure your technology runs flawlessly — long after launch.",
  },
  {
    question: "Can you work with my existing website or system?",
    answer:
      "Absolutely. We can improve, redesign, or integrate with your current setup — whether it’s hosted elsewhere or built on another platform.",
  },
  {
    question:
      "Can you build custom features like booking, payment, or delivery tracking?",
    answer:
      "Yes. Our team develops and integrates custom features such as online booking, secure payments, CRM systems, and real-time order tracking. Whether you need a tailored solution or a connection to an existing platform, we ensure every integration is seamless, secure, and built to scale with your business.",
  },
  {
    question: "Do you work with clients outside the U.S.?",
    answer:
      "Yes. We partner with clients around the world through virtual meetings, secure collaboration tools, and clear communication across time zones.",
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

export const partners = [
  { name: "partner1", logo: partner1 },
  { name: "partner2", logo: partner2 },
  { name: "partner3", logo: partner3 },
  { name: "partner4", logo: partner4 },
  { name: "partner5", logo: partner5 },
  { name: "partner6", logo: partner6 },
  { name: "TechX", logo: techX },
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
  darkLogo,
  lightLogo,
};
