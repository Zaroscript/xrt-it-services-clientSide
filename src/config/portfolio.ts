import { CategoryFilter, PortfolioItem } from "@/types/portfolio";

export const portfolioFilters: CategoryFilter[] = [
  {
    id: "websites",
    label: "Recipe Websites",
    description: "Custom recipe sharing and management platforms",
  },
  {
    id: "designs",
    label: "UI/UX Designs",
    description: "User interface and experience designs for food platforms",
  },
  {
    id: "mobile-apps",
    label: "Mobile Apps",
    description: "Recipe and cooking companion mobile applications",
  },
  {
    id: "branding",
    label: "Branding",
    description: "Brand identity design for culinary businesses",
  },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: "recipe-vault",
    title: "Recipe Vault",
    description: "A premium recipe sharing platform with AI-powered ingredient substitution",
    category: "websites",
    imageUrl: "https://placehold.co/600x338/1a1a1a/cccccc?text=Recipe+Vault",
    tags: ["Next.js", "React", "TailwindCSS", "AI Integration"],
    demoUrl: "https://recipe-vault.demo",
    features: [
      "AI-powered ingredient substitution",
      "Recipe version control",
      "Interactive cooking mode",
      "Nutrition analysis",
    ],
    clientName: "Culinary Tech Inc",
    completionDate: "2025-08",
  },
  {
    id: "foodie-circle",
    title: "Foodie Circle",
    description: "Social recipe sharing platform with chef collaboration features",
    category: "websites",
    imageUrl: "https://placehold.co/600x338/1a1a1a/cccccc?text=Foodie+Circle",
    tags: ["Vue.js", "Node.js", "MongoDB"],
    features: [
      "Chef profiles and verification",
      "Live cooking sessions",
      "Recipe marketplace",
      "Community challenges",
    ],
    clientName: "FoodTech Solutions",
    completionDate: "2025-06",
  },
  {
    id: "recipe-companion",
    title: "Recipe Companion",
    description: "Mobile app for managing recipes and grocery shopping",
    category: "mobile-apps",
    imageUrl: "https://placehold.co/600x338/1a1a1a/cccccc?text=Recipe+Companion",
    tags: ["React Native", "Firebase", "Redux"],
    features: [
      "Offline recipe access",
      "Smart shopping lists",
      "Meal planning",
      "Voice commands",
    ],
    completionDate: "2025-07",
  },
  {
    id: "taste-timeline",
    title: "Taste Timeline",
    description: "Modern UI design for a recipe history tracking application",
    category: "designs",
    imageUrl: "https://placehold.co/600x338/1a1a1a/cccccc?text=Taste+Timeline",
    tags: ["Figma", "UI Design", "UX Research"],
    features: [
      "Timeline-based recipe evolution",
      "Family recipe vault",
      "Recipe story feature",
      "Heritage preservation",
    ],
    completionDate: "2025-05",
  },
  {
    id: "chef-studio",
    title: "Chef Studio",
    description: "Brand identity for a professional recipe creation platform",
    category: "branding",
    imageUrl: "https://placehold.co/600x338/1a1a1a/cccccc?text=Chef+Studio",
    tags: ["Brand Identity", "Logo Design", "Style Guide"],
    features: [
      "Logo system",
      "Color palette",
      "Typography",
      "Brand guidelines",
    ],
    completionDate: "2025-04",
  },
];