import { NextResponse } from "next/server";

// Configuration
const CONFIG = {
  // Simple in-memory conversation history (for demo purposes)
  conversationHistory: [] as string[],

  // System prompt to guide the AI's responses
  systemPrompt: `You are a helpful AI assistant for XRT Tech, a technology solutions company. 
Provide clear, concise, and accurate information about the company's services, which include:
- Web and mobile app development
- AI and machine learning solutions
- Cloud computing services
- IT consulting

Be friendly, professional, and focus on being helpful. If you don't know an answer, 
offer to connect the user with the support team.`,

  // Knowledge base for common questions
  knowledgeBase: {
    "what is xrt tech":
      "XRT Tech is a specialized IT services company focused on building and supporting technology solutions for recipe sharing businesses. Since our founding in 2018, we've been dedicated to helping food bloggers, culinary platforms, and recipe-based businesses succeed through innovative technology. We understand the unique challenges of the food tech industry and provide tailored solutions that help our clients share, manage, and monetize their culinary content effectively.",

    services:
      "XRT Tech offers specialized IT services for recipe sharing platforms, including:\n\n1. **Recipe Platform Development**\n   - Custom recipe websites and apps\n   - User-friendly recipe submission systems\n   - Advanced search and filtering by ingredients, diets, and cuisines\n   - Interactive cooking timers and measurement converters\n\n2. **Content Management**\n   - Recipe database architecture\n   - Media management for food photography\n   - SEO optimization for food content\n   - Multi-language support\n\n3. **Community Features**\n   - User profiles and recipe collections\n   - Rating and review systems\n   - Social sharing integrations\n   - Meal planning tools\n\n4. **E-commerce Integration**\n   - Ingredient shopping lists\n   - Grocery delivery API connections\n   - Digital cookbook sales\n   - Subscription models for premium content",

    technologies:
      "Our technology stack is optimized for recipe platforms:\n\n- **Frontend**: React, Next.js, Vue.js for responsive interfaces\n- **Backend**: Node.js, Python (Django/Flask) for scalable APIs\n- **Mobile**: React Native for cross-platform recipe apps\n- **Search**: Elasticsearch for fast recipe discovery\n- **Media**: Cloudinary for image optimization\n- **AI/ML**: For ingredient recognition and recipe recommendations\n- **Databases**: PostgreSQL for structured recipe data, MongoDB for flexible content",

    "case studies":
      "**Recipe Platform Success Stories**\n\n1. **Culinary Community Platform**\n   - Built a social recipe sharing platform with 50,000+ monthly users\n   - Implemented AI-powered recipe recommendations\n   - Increased user engagement by 65%\n\n2. **Food Blog Network**\n   - Migrated 100+ food blogs to a unified recipe platform\n   - Improved page load speed by 70%\n   - Increased ad revenue by 40%\n\n3. **Meal Planning App**\n   - Developed AI-driven meal planning features\n   - Integrated with grocery delivery services\n   - Grew to 10,000+ active subscribers in 6 months",

    team: "Our team specializes in food technology solutions:\n- Full-stack developers with recipe platform expertise\n- UX designers who understand food content\n- SEO specialists for food content optimization\n- Project managers with culinary industry experience\n\nWe're passionate about creating technology that makes recipe sharing easier and more engaging.",

    clients:
      "We work with a variety of food-focused businesses:\n- Food bloggers and influencers\n- Recipe app startups\n- Food media companies\n- Culinary schools\n- Meal kit delivery services\n\nOur deep understanding of the recipe sharing ecosystem helps us deliver exceptional value to our clients.",

    contact:
      "**Get in Touch**\n\n📧 Email: info@xrt-tech.com\n📞 Phone: +1 (555) 123-4567\n📍 Location: 123 Tech Park, San Francisco, CA 94107\n🌐 Website: www.xrt-tech.com\n\n**Business Hours**\nMonday - Friday: 9:00 AM - 6:00 PM (PST)\nWeekends: Closed\n\nFor support inquiries, please contact: support@xrt-tech.com",

    about:
      "**Our Story**\nFounded in 2018, XRT Tech was created by food enthusiasts who saw the need for better technology in the recipe sharing space. We understand that behind every recipe is a story, and we build platforms that help share those stories with the world.\n\n**Our Mission**\nTo empower food creators with technology that makes recipe sharing seamless, beautiful, and rewarding. We help turn culinary passion into thriving digital businesses.\n\n**Our Values**\n- **Culinary Focus**: We speak the language of food\n- **Technical Excellence**: Robust, scalable solutions\n- **User-Centric Design**: Intuitive experiences for cooks of all levels\n- **Community Building**: Tools that connect food lovers\n- **Sustainable Growth**: Solutions that scale with your audience",

    pricing:
      "**Recipe Platform Solutions**\n\nWe offer tailored solutions for food creators at every stage:\n\n1. **Starter Package**\n   - Basic recipe website\n   - Up to 100 recipes\n   - Mobile-responsive design\n   - Perfect for new food bloggers\n\n2. **Professional Plan**\n   - Custom recipe platform\n   - Advanced search and filtering\n   - SEO optimization\n   - Ideal for growing food businesses\n\n3. **Enterprise Solution**\n   - Fully customized platform\n   - Multi-user collaboration\n   - E-commerce integration\n   - For established food media companies\n\n**Contact us at hello@xrt-tech.com to discuss which solution is right for your recipe sharing needs.**",

    careers:
      "**Join Our Culinary Tech Team**\n\nWe're looking for people who love both technology and food!\n\n**Current Openings**\n- Frontend Developer (Recipe UI/UX focus)\n- Backend Developer (Food data specialist)\n- Mobile App Developer (Recipe apps)\n- Food Content Strategist\n\n**Perks**\n- Work on projects you're passionate about\n- Flexible, food-friendly schedule\n- Team cooking sessions (virtual and in-person)\n- Continuous learning in food tech\n- Competitive benefits\n\nSend your resume to joinus@xrt-tech.com and tell us about your favorite recipe!",

    default:
      "I'm here to help with information about XRT Tech and our recipe platform services. Here are some things you can ask about:\n\n- Building a recipe website or app\n- Features for food bloggers\n- Monetizing recipe content\n- Technical requirements for recipe platforms\n- Success stories\n- Getting started with us\n\nFor specific inquiries about your recipe sharing needs, feel free to ask or visit our website at www.xrt-tech.com/recipes",
  },

  // Fallback responses when the AI can't generate a response
  fallbackResponses: [
    "I'd be happy to help with that. Could you please provide more details?",
    "Thanks for your question! For the most accurate information, I recommend checking our website or contacting our support team.",
    "I'm here to assist you with information about our services. Could you clarify your question?",
    "Let me find that information for you. In the meantime, you might find what you need in our services section.",
    "That's a great question! Our team at XRT Tech specializes in technology solutions. Could you tell me more about what you're looking for?",
  ],
};

// Helper function to get an appropriate response
function getResponse(message: string) {
  const lowerMessage = message.toLowerCase();

  // Check for specific questions in the knowledge base
  if (
    lowerMessage.includes("what is") &&
    (lowerMessage.includes("xrt") || lowerMessage.includes("this website"))
  ) {
    return CONFIG.knowledgeBase["what is xrt tech"];
  } else if (
    lowerMessage.includes("service") ||
    lowerMessage.includes("offer") ||
    lowerMessage.includes("provide")
  ) {
    return CONFIG.knowledgeBase["services"];
  } else if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("reach") ||
    lowerMessage.includes("email")
  ) {
    return CONFIG.knowledgeBase["contact"];
  } else if (
    lowerMessage.includes("about") ||
    lowerMessage.includes("company")
  ) {
    return CONFIG.knowledgeBase["about"];
  } else if (
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("how much")
  ) {
    return CONFIG.knowledgeBase["pricing"];
  } else if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey")
  ) {
    return "Hello! Welcome to XRT Tech. How can I assist you today?";
  }

  // If no specific match, use a fallback
  const randomIndex = Math.floor(
    Math.random() * CONFIG.fallbackResponses.length
  );
  return CONFIG.fallbackResponses[randomIndex];
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Basic validation
    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages must be an array" },
        { status: 400 }
      );
    }

    // Get the last user message
    const lastMessage = messages
      .slice()
      .reverse()
      .find((msg: any) => msg.role === "user");

    if (!lastMessage) {
      return NextResponse.json(
        { error: "No user message found" },
        { status: 400 }
      );
    }

    const userMessage = `User: ${lastMessage.content}`;

    // Add to conversation history
    CONFIG.conversationHistory.push(userMessage);

    // Keep only the last 5 messages to avoid hitting token limits
    while (CONFIG.conversationHistory.length > 5) {
      CONFIG.conversationHistory.shift();
    }

    // Prepare the conversation context
    const conversationContext = CONFIG.conversationHistory.join("\n");
    const prompt = `${CONFIG.systemPrompt}\n\n${conversationContext}\nAssistant:`;

    // Generate an appropriate response
    const aiResponse = getResponse(lastMessage.content);

    // Add AI response to conversation history
    CONFIG.conversationHistory.push(`Assistant: ${aiResponse}`);

    return NextResponse.json({
      response: {
        role: "assistant",
        content: aiResponse,
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
      code: error.code,
      status: error.status,
      response: error.response?.status,
      data: error.response?.data,
    });

    // More specific error messages
    let errorMessage = "Error processing your request";
    if (error.code === "invalid_api_key") {
      errorMessage = "Invalid API key. Please check your configuration.";
    } else if (error.code === "rate_limit_exceeded") {
      errorMessage = "Rate limit exceeded. Please try again later.";
    } else if (error.message?.includes("API key")) {
      errorMessage =
        "API key is missing or invalid. Please check your configuration.";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: error.status || 500 }
    );
  }
}
