export type PortfolioCategory = "websites" | "designs" | "mobile-apps" | "branding";

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  imageUrl: string;
  tags: string[];
  demoUrl?: string;
  features: string[];
  clientName?: string;
  completionDate: string;
}

export interface CategoryFilter {
  id: PortfolioCategory;
  label: string;
  description: string;
}