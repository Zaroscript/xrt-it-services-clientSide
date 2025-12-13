import { NextResponse } from "next/server";
import { websiteData } from "./data";

// Type definitions
type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

// Helper: Fetch plans dynamically
async function fetchDynamicPlans() {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"; // Fallback URL
    const res = await fetch(`${apiUrl}/plans?active=true`, {
      next: { revalidate: 60 }, // Cache for 60s
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.data?.plans || null;
  } catch (error) {
    console.error("Failed to fetch plans:", error);
    return null;
  }
}

// Helper: Generate Response (Async now)
async function getLocalResponse(message: string): Promise<string> {
  const lowerMsg = message.toLowerCase();

  // 1. Check for Greetings
  if (lowerMsg.match(/\b(hi|hello|hey|greetings)\b/)) {
    return `👋 Hi there! Welcome to **${websiteData.company.name}**. \n\nI'm here to help you explore our services, check out pricing, or get in touch with our team. What's on your mind today?`;
  }

  // 2. Check for Specific Service Inquiries
  for (const service of websiteData.services) {
    const keywords = service.title.toLowerCase().split(/[ &]+/);
    const matchCount = keywords.filter(
      (k) => lowerMsg.includes(k) && k.length > 3
    ).length;

    if (
      matchCount >= 2 ||
      (keywords.some((k) => lowerMsg.includes(k)) &&
        lowerMsg.includes("service"))
    ) {
      return `🚀 **${service.title}**\n\n${
        service.description
      }\n\n✨ **What you get:**\n${service.features
        .map((f) => `• ${f}`)
        .join("\n")}\n\nWould you like to get a quote for this service?`;
    }
  }

  // 3. Check for Pricing/Cost (DYNAMIC FETCH)
  if (lowerMsg.match(/(price|cost|plan|subscription|how much)/)) {
    const dynamicPlans = await fetchDynamicPlans();

    if (dynamicPlans && dynamicPlans.length > 0) {
      const plansInfo = dynamicPlans
        .map((p: any) => {
          const priceDisplay = p.isCustom
            ? "Contact for Quote"
            : `$${p.monthlyPrice || p.price || 0}/mo`;

          const features = p.features
            ? p.features
                .slice(0, 3)
                .map((f: string) => `• ${f}`)
                .join("\n")
            : "";

          return `💎 **${p.name}** - ${priceDisplay}\n${features}`;
        })
        .join("\n\n");

      return `💰 **Flexible Pricing for Your Business**\n\nWe have plans designed to help you grow:\n\n${plansInfo}\n\n**Note:** ${websiteData.pricing.details}\n\nWhich plan sounds like a good fit?`;
    }

    // Fallback to static if dynamic fails
    const plansInfo = websiteData.pricing.plans
      .map(
        (p) =>
          `💎 **${p.name}** - ${p.price}\n${p.features
            .slice(0, 3)
            .map((f) => `• ${f}`)
            .join("\n")}`
      )
      .join("\n\n");
    return `💰 **Flexible Pricing for Your Business**\n\nWe have plans designed to help you grow:\n\n${plansInfo}\n\n**Note:** ${websiteData.pricing.details}\n\nWhich plan sounds like a good fit?`;
  }

  // 4. Check for Contact/Location/Hours
  if (
    lowerMsg.match(
      /(contact|email|phone|address|located|location|hours|support)/
    )
  ) {
    const c = websiteData.company.contact;
    return `📞 **Let's Connect!**\n\nWe'd love to hear from you. Here is how you can reach us:\n\n📧 **Email:** [${c.email}](mailto:${c.email})\n📱 **Phone:** [${c.phone}](tel:${c.phone})\n📍 **Visit:** ${c.address}\n\n⏰ **Hours:** ${c.hours}`;
  }

  // 5. Check for "About" or Company Info
  if (lowerMsg.match(/(about|who are you|company|mission|vision)/)) {
    return `🌟 **About ${websiteData.company.name}**\n\n${websiteData.company.description}\n\n🎯 **Our Mission:** ${websiteData.company.mission}`;
  }

  // 6. Check FAQs
  for (const faq of websiteData.faqs) {
    const qWords = faq.q.toLowerCase().split(" ");
    const matchCount = qWords.filter(
      (w) => lowerMsg.includes(w) && w.length > 3
    ).length;
    if (matchCount >= 3) {
      return `💡 **Did you know?**\n\n${faq.a}`;
    }
  }

  // 7. Broad Match for "Services" generic query
  if (
    lowerMsg.includes("service") ||
    lowerMsg.includes("offer") ||
    lowerMsg.includes("do for me")
  ) {
    const serviceTitles = websiteData.services
      .map((s) => `• ${s.title}`)
      .join("\n");
    return `🛠️ **Our Expertise**\n\nWe offer a wide range of technology solutions to help your business thrive:\n\n${serviceTitles}\n\nIs there a specific service you'd like to explore?`;
  }

  // 8. Fallback
  return (
    "🤔 I'm not quite sure I caught that. \n\nI can tell you all about our **Services**, **Pricing Plans**, or share our **Contact Info**. \n\nYou can also reach our human support team directly at " +
    websiteData.company.contact.email
  );
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages must be an array" },
        { status: 400 }
      );
    }

    const lastUserMsg = messages
      .slice()
      .reverse()
      .find((m: Message) => m.role === "user");

    if (!lastUserMsg) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    // Now await the response since getLocalResponse is async
    const responseContent = await getLocalResponse(lastUserMsg.content);

    return NextResponse.json({
      response: {
        role: "assistant",
        content: responseContent,
      },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
