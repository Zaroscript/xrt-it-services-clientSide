import { Metadata } from "next";
import { generatePageMetadata } from "@/config/seo.config";

export const metadata: Metadata = generatePageMetadata("about");

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
