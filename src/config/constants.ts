// Images

import case_study from "../assets/images/acaf.jpg";
import company_1 from "../assets/images/chess.png";
import company_2 from "../assets/images/company2.jpg";
import company_3 from "../assets/images/company3.jpg";
import company_4 from "../assets/images/company4.jpg";
import company_5 from "../assets/images/company5.jpg";
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
import heroSection from "../../public/assets/hero-section.webp";
import webIcon from "../assets/images/icons/001-deployment.png";
import cloudIcon from "../assets/images/icons/002-upload.png";
import onlineOrderingIcon from "../assets/images/icons/004-order.png";
import digitalIcon from "../assets/images/icons/006-content-strategy.png";
import itIcon from "../assets/images/icons/008-technical-support.png";
import seoIcon from "../assets/images/icons/010-seo.png";
import missionIcon from "../assets/images/icons/012-environment.png";
import vission from "../assets/images/icons/013-company-vision.png";
import whoWeAre from "../assets/images/who-we-are.jpg";
import aboutImg from "../assets/images/about.jpg";
import webImg from "../assets/images/web-development.jpg";
import onlineImg from "../assets/images/online-ordering.jpg";
import cloud from "../assets/images/cloud.jpg";
import digital from "../assets/images/digital.jpg";
import seoImg from "../assets/images/seo.webp";
import it from "../assets/images/it.webp";
import Commissions from "../assets/images/Commissions.jpg";
import increase from "../assets/images/increase.jpg";
import screens from "../assets/images/screens.jpg";

import { Paintbrush, Rocket, Search, TestTube2 } from "lucide-react";

// src/config/constants.ts
export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  {
    name: "Services",
    path: "/services",
  },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact", path: "/contact" },
];

export const heroContent = [
  {
    title:
      "Turn Clicks into Customers with an Easy-to-Use Online Ordering System",
    description:
      "Take your business online with a simple, user-friendly ordering platform built for sales, speed, and customer satisfaction. No complexity, just seamless ordering that works",
    primBtn: {
      text: "Free Consultation",
      path: "/contact/#contactForm",
    },
    secBtn: {
      text: "How It Works",
      path: "/pricing",
    },
  },
  {
    title:
      "Tailored Websites and Apps Built to Achieve Your Business GoalsDevelopment",
    description:
      "We don’t just design, we strategize. Every website and app we create is customized to your industry, crafted to meet your goals, and optimized to turn visitors into results.",
    primBtn: {
      text: "Free Consultation",
      path: "/contact/#contactForm",
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
      path: "/contact/#contactForm",
    },
    secBtn: {
      text: "Explore Our Services",
      path: "/services",
    },
  },
];

export const plans = [
  {
    title: "Start Plan — Get Online Fast",
    monthlyPrice: "USD 15/m",
    yearlyPrice: "USD 180/y",
    monthlyTotal: "$180",
    yearlyTotal: "$180",
    monthlyOriginal: "$228",
    yearlyOriginal: "$228",
    discount: "21%",
    features: [
      { text: "Branded online ordering website (your domain)", included: true },
      {
        text: "Secure payment integration (Stripe, PayPal, etc.)",
        included: true,
      },
      { text: "Menu management with unlimited items", included: true },
      { text: "Real-time order notifications", included: true },
      { text: "Mobile-friendly design", included: true },
      { text: "Hosting & maintenance included", included: true },
      { text: "Unlimited orders — no commissions", included: true },
      { text: "Basic analytics dashboard", included: true },
      { text: "24/7 technical support", included: true },
    ],
    isPopular: false,
  },
  {
    title: "Grow Plan",
    monthlyPrice: "USD 25/m",
    yearlyPrice: "USD 300/y",
    monthlyTotal: "$300",
    yearlyTotal: "$300",
    monthlyOriginal: "$380",
    yearlyOriginal: "$380",
    discount: "21%",
    features: [
      { text: "All in Start Plan", included: true },
      { text: "Multi-location support (up to 3)", included: true },
      { text: "WhatsApp / SMS order alerts", included: true },
      {
        text: "Discount codes, loyalty rewards & scheduled promotions",
        included: true,
      },
      { text: "Cloud backup & secure data storage", included: true },
      { text: "POS & delivery app integrations", included: true },
      { text: "Automated customer receipts & follow-ups", included: true },
      { text: "Priority support", included: true },
    ],
    isPopular: true,
  },
  {
    title: " Success Plan",
    monthlyPrice: "USD 35/m",
    yearlyPrice: "USD 420/y",
    monthlyTotal: "$420",
    yearlyTotal: "$420",
    monthlyOriginal: "$530",
    yearlyOriginal: "$530",
    discount: "21%",
    features: [
      { text: "All in Grow Plan", included: true },
      { text: "Unlimited branches & users", included: true },
      { text: "Custom design & white-label branding", included: true },
      { text: "API integrations (POS, ERP, delivery)", included: true },
      { text: "Custom feature development", included: true },
      { text: "Centralized admin dashboard", included: true },
      { text: "Data insights & reporting portal", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Advanced automation tools", included: true },
      { text: "24/7 premium support", included: true },
    ],
    isPopular: false,
  },
];

export const features = [
  {
    category: "Ordering Features",
    items: [
      {
        name: "Zero Commission",
        description: "No commission on orders, keep 100% of your revenue",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Online Ordering Website",
        description: "Custom branded online ordering website for your business",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Unlimited Orders",
        description: "No limit on the number of orders you can receive",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Menu Items",
        description: "Unlimited menu items with categories and descriptions",
        starter: "Unlimited",
        premium: "Unlimited",
        pro: "Unlimited",
      },
      {
        name: "Order Modifiers",
        description: "Customize orders with various options and add-ons",
        starter: "Limited",
        premium: "Advanced",
        pro: "Full Custom",
      },
      {
        name: "Delivery Zones and Fees",
        description: "Set up delivery areas and corresponding fees",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Secure Online Payments",
        description: "Process payments securely with multiple payment gateways",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Real-time Order Alerts",
        description: "Instant notifications for new orders",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Mobile-Friendly Design",
        description: "Fully responsive design that works on all devices",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "POS and Delivery App Integrations",
        description: "Connect with popular POS systems and delivery apps",
        starter: false,
        premium: true,
        pro: true,
      },
      {
        name: "Loyalty Rewards",
        description: "Customer loyalty program with points and rewards",
        starter: false,
        premium: false,
        pro: true,
      },
      {
        name: "Coupons and Discounts",
        description: "Create and manage discount codes and promotions",
        starter: false,
        premium: true,
        pro: true,
      },
    ],
  },
  {
    category: "Marketing Features",
    items: [
      {
        name: "Analytics",
        description: "Track and analyze your business performance",
        starter: "Basic",
        premium: "Advanced",
        pro: "Customized",
      },
      {
        name: "Email Marketing",
        description: "Send marketing emails to your customers",
        starter: "Up to 500 emails/month",
        premium: "Up to 1,500 emails/month",
        pro: "Custom email marketing",
      },
      {
        name: "SMS Marketing",
        description: "Send text message promotions to customers",
        starter: false,
        premium: "Included (limited monthly quota)",
        pro: "Custom SMS marketing",
      },
      {
        name: "Business Website Setup",
        description: "Professional website setup for your business",
        starter: false,
        premium: true,
        pro: true,
      },
      {
        name: "Digital Screens Software",
        description: "Manage digital menu boards and displays",
        starter: false,
        premium: "1 year Free (1 update/year)",
        pro: "Custom frequency",
      },
      {
        name: "Website or Menu Updates",
        description: "Regular updates to your website or menu",
        starter: false,
        premium: "1 update/year",
        pro: "Custom updates",
      },
      {
        name: "SEO Optimization",
        description: "Improve search engine visibility",
        starter: false,
        premium: false,
        pro: "Optional add-on",
      },
      {
        name: "Social Media Content",
        description: "Professional content for your social media channels",
        starter: false,
        premium: false,
        pro: "Optional add-on",
      },
      {
        name: "Social Media Ads",
        description: "Managed social media advertising campaigns",
        starter: false,
        premium: false,
        pro: "Optional add-on",
      },
    ],
  },
  {
    category: "Support and Service",
    items: [
      {
        name: "System Hosting and Maintenance",
        description: "We handle all technical aspects of running your system",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Customer Support",
        description: "Get help when you need it",
        starter: "Standard",
        premium: "Priority",
        pro: "Priority (24/7)",
      },
    ],
  },
  {
    category: "System & Management Features",
    items: [
      {
        name: "Order Management Dashboard",
        description: "Manage all your orders in one place",
        starter: "Basic",
        premium: "Advanced",
        pro: "Full Access",
      },
      {
        name: "Cloud Backup and Secure Storage",
        description: "Automatic backups of your data",
        starter: false,
        premium: "Two Years",
        pro: "Two Years",
      },
      {
        name: "Multi-location Support",
        description: "Manage multiple locations from one account",
        starter: false,
        premium: false,
        pro: true,
      },
      {
        name: "Staff Permissions",
        description: "Control what your staff can access",
        starter: false,
        premium: true,
        pro: true,
      },
      {
        name: "Reporting",
        description: "Detailed reports on your business performance",
        starter: "Basic reporting",
        premium: "Advanced reporting",
        pro: "Custom reports",
      },
    ],
  },
];

// Add CSS for the tooltip animation
export const tooltipStyles = `
  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .TooltipContent {
    animation-duration: 200ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }
  .TooltipContent[data-state='delayed-open'][data-side='top'] {
    animation-name: slideUpAndFade;
  }
`;


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
    text: "We bring your project to life building, testing, and refining every detail to ensure it performs flawlessly across all devices and platforms.",
  },
  {
    id: 4,
    title: "04. Launch & Ongoing Support",
    text: "After final approval, we launch your project with confidence. But our job doesn’t end there we stay by your side with maintenance, updates, and continuous support.",
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
    icon: webIcon,
    img: webImg,
    title: "Web Design, Development & Maintenance",
    description:
      "Your website is the heart of your online presence. We design, build, host, and maintain fast, modern sites that work flawlessly on every device so your business looks professional and runs smoothly 24/7.",
    color: "from-blue-500 to-cyan-400",
    features: [
      "Custom website design tailored to your brand",
      "Full website development using modern frameworks",
      "Mobile responsive layouts optimized for all devices",
      "Mobile app development for Android and iOS",
      "E commerce and online ordering system setup",
      "Complete hosting and domain management",
      "Website speed optimization and performance tuning",
      "Security hardening and continuous monitoring",
      "Regular updates and maintenance",
      "Bug fixes and technical support",
      "Custom dashboards and admin panels",
      "Integration with payment gateways and third party tools",
      "SEO setup and basic on page optimization",
      "Conversion focused design for better customer engagement",
    ],
  },
  {
    id: "cloud-solutions",
    icon: cloudIcon,
    img: cloud,
    title: "Cloud & Backup Solutions",
    description:
      "Protect your data and access it anywhere. We provide secure cloud storage and automated backups to ensure your files and systems are always safe, synced, and accessible.",
    color: "from-purple-500 to-pink-500",
    features: [
      "Cloud storage setup and migration",
      "Secure file sharing and team access",
      "Automated backup systems",
      "Disaster recovery planning",
      "Real time data sync across devices",
      "Encrypted storage and security monitoring",
      "Email hosting and workspace setup",
      "Support for Google Workspace and Microsoft 365",
    ],
  },
  {
    id: "online-ordering-systems",
    icon: onlineOrderingIcon,
    img: onlineImg,
    title: "Online Ordering Systems",
    description:
      "Bring your store or restaurant online with a custom ordering system that’s easy to use and built for results. Accept orders, manage menus, and track performance all from one simple dashboard.",
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
    id: "digital-marketing",
    icon: digitalIcon,
    img: digital,
    title: "Digital Marketing",
    description:
      "Make your first impression count. We craft logos, visuals, social media ads, and digital designs that reflect your brand’s personality and help you stand out in a crowded market.",
    color: "from-amber-500 to-yellow-400",
    features: [
      "Logo design and full brand identity",
      "Menu design for restaurants and cafes",
      "Brochures catalogs and company profiles",
      "Flyers posters and print ready materials",
      "Business cards letterheads and stationery",
      "Digital signage content for TV screens",
      "Social media graphics and ad creatives",
      "Packaging design and product labels",
      "Social media content creation",
      "Social media management and scheduling",
      "Paid advertising creatives",
      "Marketing strategy and campaign planning",
      "SEO basics for better visibility",
      "Website content writing and optimization",
      "High quality print ready files",
      "Custom animations and short promo videos",
      "Consistent branding across all platforms",
      "Fast revisions and ongoing support",
    ],
  },
  {
    id: "it-setup-support",
    icon: itIcon,
    img: it,
    title: "IT Setup & Support",
    description:
      "We handle the technical side so you don’t have to. From email systems and cloud setup to troubleshooting and maintenance, we keep your business connected and running without downtime.",
    color: "from-red-500 to-orange-400",
    features: [
      "Complete office IT setup",
      "Network installation and configuration",
      "Router WiFi and firewall setup",
      "POS and device installation",
      "Troubleshooting and technical support",
      "Software installation and updates",
      "Printer and device configuration",
      "Ongoing maintenance and monitoring"
    ],
  },
  {
    id: "seo-performance-optimization",
    icon: seoIcon,
    img: seoImg,
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
    icon: Search,
  },
  {
    id: 2,
    title: "Design & Development",
    description:
      "Our team creates custom solutions tailored to your specific requirements.",
    icon: Paintbrush,
  },
  {
    id: 3,
    title: "Testing & Quality Assurance",
    description:
      "Rigorous testing ensures your solution is reliable and performs as expected.",
    icon: TestTube2,
  },
  {
    id: 4,
    title: "Deployment & Support",
    description:
      "We handle the deployment and provide ongoing support and maintenance.",
    icon: Rocket,
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
      "Yes. We partner with clients around the world through virtual meetings, secure collaboration tools, and clear communication across time zones. No matter where you’re located, you’ll receive the same level of attention, reliability, and support as our local clients.",
  },
];

export const pricingFaq = [
  {
    question: " Do you charge any commission fees per order?",
    answer:
      "No. All XRT Tech plans include unlimited orders with zero commissions. You keep 100% of your revenue.",
  },

  {
    question: "Can I manage my menu and prices myself?",
    answer:
      "Yes. You can update items, categories, prices, and modifiers anytime through your dashboard with Premium Plan.",
  },
  {
    question: "Do you support delivery zones and fees?",
    answer:
      "Yes. You can set delivery zones, distances, and custom fees based on your business needs.",
  },
  {
    question: "How do digital screen updates work?",
    answer:
      "Premium Plan includes up to 3 screen content update per year.\n Pro includes unlimited remote screen updates",
  },

  {
    question: "If I choose the Pro plan, can I customize what features I want?",
    answer:
      "Yes. Pro is a build-your-own bundle where you choose the features you need and only pay for what you use.",
  },
  {
    question:
      "Do you offer marketing services like email, SMS, or social media?",
    answer:
      "Yes. \nStarter includes 500 email sends per month. \nGrowth includes 1,500 email sends and SMS. \nPro includes custom email and SMS campaigns, with optional social media and ads add ons",
  },
  {
    question: "Can you update my menu or website for me?",
    answer:
      "Yes. \nPremium  includes one website/menu update per year. \nPro offers unlimited updates based on your needs.",
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

export const marketing = [
  {
    id: 1,
    title: "Free TV Screen for 1 Year (Signage)",
    description:
      "Get 1 year of digital menu screen hosting included with your plan. Turn any TV into a smart digital menu instantly.",
    highlight: "Free Screens",
    image: screens,
  },
  {
    id: 2,
    title: "No Commissions — Save $6,000 to $30,000 a Year",
    description:
      "Keep 100% of every order. Most restaurants switching from delivery apps save between $500–$2,500 per month in commission fees.",
    highlight: "No Commissions",
    image: Commissions,
  },
  {
    id: 3,
    title: "Increase Sales with Targeted Marketing",
    description:
      "Boost your revenue through smart, data-driven marketing integrated directly into your online ordering system. Reach the right customers with personalized promotions, push notifications, and audience targeting that increases repeat orders and drives consistent growth.",
    highlight: "Increase Sales",
    image: increase,
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
  darkLogo,
  lightLogo,
  heroSection,
  webIcon,
  digitalIcon,
  cloudIcon,
  onlineOrderingIcon,
  itIcon,
  seoIcon,
  missionIcon,
  vission,
  whoWeAre,
  aboutImg,
  webImg,
  cloud,
  onlineImg,
  digital,
  seoImg,
  it,
  Commissions,
  increase,
  screens,
};
