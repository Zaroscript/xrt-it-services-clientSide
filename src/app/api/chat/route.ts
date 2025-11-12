import { NextResponse } from "next/server";

// Configuration
const CONFIG = {
  // Simple in-memory conversation history (for demo purposes)
  conversationHistory: [] as string[],

  // System prompt to guide the AI's responses
  systemPrompt: `You are a helpful AI assistant for XRT Tech, a comprehensive technology solutions provider. 
Provide clear, concise, and accurate information about the company's services, which include:
- Web Design, Development & Maintenance
- Cloud & Backup Solutions
- Online Ordering Systems
- Digital Branding & eDesign
- IT Setup & Support
- SEO & Performance Optimization

Be friendly, professional, and focus on being helpful. If you don't know an answer, 
offer to connect the user with the support team.`,

  // Knowledge base for common questions
  knowledgeBase: {
    // Company Information
    "what is xrt tech":
      "XRT Tech is a leading technology solutions company that helps businesses establish and grow their online presence. We specialize in delivering custom web solutions, cloud services, and digital marketing strategies to help businesses succeed in the digital landscape. Our team of experts combines technical expertise with creative solutions to deliver exceptional results.",
    
    "company history":
      "Founded in 2018, XRT Tech started with a vision to provide affordable and reliable technology solutions to businesses of all sizes. Over the years, we've grown into a trusted partner for companies looking to establish or enhance their digital presence. Our commitment to quality and customer satisfaction has helped us build long-term relationships with clients across various industries.",
    
    "mission":
      "Our mission is to empower businesses with innovative technology solutions that drive growth and success. We believe in building lasting partnerships with our clients by delivering reliable, scalable, and cost-effective services that help them achieve their business objectives.",
    
    "values":
      "**Our Core Values**\n\n- **Customer Focus**: We prioritize our clients' needs and work tirelessly to exceed their expectations.\n- **Innovation**: We stay ahead of the curve with the latest technologies and industry trends.\n- **Integrity**: We conduct our business with honesty, transparency, and ethical practices.\n- **Excellence**: We are committed to delivering high-quality solutions and exceptional service.\n- **Collaboration**: We believe in working together with our clients as partners in their success.",

    // Services
    "services":
      "**Our Comprehensive Services**\n\n1. **Web Design & Development**\n   - Custom website development\n   - E-commerce solutions\n   - Responsive design\n   - Website maintenance and updates\n   - Performance optimization\n\n2. **Cloud & Backup Solutions**\n   - Cloud migration services\n   - Data backup and recovery\n   - Cloud infrastructure setup\n   - 24/7 monitoring and support\n\n3. **Online Ordering Systems**\n   - Custom ordering platforms\n   - Menu management\n   - Payment gateway integration\n   - Customer management\n\n4. **Digital Branding & eDesign**\n   - Logo and brand identity\n   - Graphic design services\n   - Social media management\n   - Content creation\n\n5. **IT Setup & Support**\n   - Business IT infrastructure\n   - Network setup and security\n   - Email and cloud services\n   - Ongoing technical support\n\n6. **SEO & Performance Optimization**\n   - Search engine optimization\n   - Website speed optimization\n   - Content strategy\n   - Analytics and reporting",

    "web development":
      "**Web Development Services**\n\nWe create stunning, high-performance websites that deliver results. Our web development services include:\n\n- **Custom Website Development**: Tailored solutions to meet your specific business needs\n- **E-commerce Solutions**: Secure online stores with seamless checkout experiences\n- **Responsive Design**: Websites that look great on all devices\n- **CMS Integration**: Easy-to-use content management systems\n- **Website Maintenance**: Regular updates and security patches\n- **Performance Optimization**: Fast-loading pages for better user experience\n\nOur development process includes thorough planning, design, development, testing, and deployment to ensure your website meets the highest standards.",

    "cloud solutions":
      "**Cloud & Backup Solutions**\n\nOur cloud services help businesses leverage the power of cloud computing:\n\n- **Cloud Migration**: Seamless transition to cloud infrastructure\n- **Data Backup & Recovery**: Secure and reliable data protection\n- **Cloud Infrastructure**: Scalable solutions for growing businesses\n- **24/7 Monitoring**: Proactive system monitoring and support\n- **Security**: Enterprise-grade security measures\n\nWe work with leading cloud providers including AWS, Google Cloud, and Microsoft Azure to deliver reliable and cost-effective solutions.",

    "seo services":
      "**SEO & Digital Marketing**\n\nImprove your online visibility with our comprehensive SEO services:\n\n- **Keyword Research**: Identify high-value keywords for your business\n- **On-Page Optimization**: Optimize website content and structure\n- **Technical SEO**: Improve website performance and indexing\n- **Content Strategy**: Create engaging, search-optimized content\n- **Local SEO**: Boost your local search presence\n- **Analytics & Reporting**: Track performance and measure ROI\n\nOur data-driven approach helps businesses rank higher in search results and attract more qualified leads.",

    // Contact Information
    "contact":
      "**Contact XRT Tech**\n\nWe'd love to hear from you! Here's how you can reach us:\n\n📧 **Email**: support@xrttech.com\n📞 **Phone**: +1 508-507-0922\n📍 **Address**: Franklin, MA 02038, USA\n\n**Business Hours**\nMonday - Friday: 10:00 AM - 10:00 PM\nSaturday: 8:00 AM - 8:00 PM\nSunday: Closed\n\nFor immediate assistance, please call our support line during business hours or fill out the contact form on our website.",

    "support":
      "**Technical Support**\n\nOur support team is here to help you with any technical issues or questions:\n\n- **Email Support**: support@xrttech.com\n- **Phone Support**: +1 508-507-0922\n- **Live Chat**: Available on our website\n\n**Support Hours**\nMonday - Friday: 10:00 AM - 10:00 PM\nSaturday: 8:00 AM - 8:00 PM\n\nFor urgent matters outside business hours, please leave a detailed message and we'll get back to you as soon as possible.",

    // Pricing & Packages
    "pricing":
      "**Our Pricing**\n\nWe offer customized pricing based on your specific needs and project requirements. Here's an overview of our service packages:\n\n1. **Starter Package**\n   - Basic website setup\n   - Standard design templates\n   - Basic SEO setup\n   - Email support\n   - Perfect for small businesses getting started\n\n2. **Professional Package**\n   - Custom website design\n   - Advanced features and functionality\n   - Comprehensive SEO strategy\n   - Priority support\n   - Ideal for growing businesses\n\n3. **Enterprise Solutions**\n   - Fully customized solutions\n   - Advanced integrations\n   - Dedicated account manager\n   - 24/7 priority support\n   - For large-scale business needs\n\nContact our sales team for a personalized quote based on your specific requirements.",

    // FAQ
    "how to get started":
      "**Getting Started with XRT Tech**\n\n1. **Initial Consultation**\n   - Schedule a free consultation call\n   - Discuss your project requirements and goals\n   - Get expert recommendations\n\n2. **Proposal & Planning**\n   - Receive a detailed project proposal\n   - Review and approve the project scope\n   - Set up project timeline and milestones\n\n3. **Design & Development**\n   - Our team creates your custom solution\n   - Regular updates and feedback sessions\n   - Thorough testing and quality assurance\n\n4. **Launch & Support**\n   - Final review and approval\n   - Website or system launch\n   - Ongoing support and maintenance\n\nReady to get started? Contact us today to schedule your free consultation!",

    "what makes you different":
      "**Why Choose XRT Tech?**\n\n- **Expert Team**: Our experienced professionals bring years of industry expertise\n- **Custom Solutions**: Tailored to your specific business needs\n- **Transparent Pricing**: No hidden fees or surprises\n- **Ongoing Support**: We're here for you even after project completion\n- **Proven Results**: Track record of successful projects and satisfied clients\n- **Latest Technologies**: We stay current with industry trends and technologies\n\nWe're committed to your success and take pride in building lasting relationships with our clients.",

    "do you offer maintenance":
      "**Website Maintenance & Support**\n\nYes, we offer comprehensive maintenance and support services to keep your website running smoothly:\n\n- **Regular Updates**: Keep your website secure and up-to-date\n- **Backup Services**: Regular data backups to prevent data loss\n- **Security Monitoring**: 24/7 security monitoring and threat detection\n- **Performance Optimization**: Regular speed and performance checks\n- **Content Updates**: Keep your content fresh and relevant\n\nOur maintenance plans are available on a monthly or annual basis, with different tiers to suit your needs. Contact us for more details.",

    // Default response
    "default":
      "I'm here to help with information about XRT Tech and our services. Here are some common topics I can assist with:\n\n- Web design and development services\n- Cloud and IT solutions\n- Digital marketing and SEO\n- Pricing and packages\n- Getting started with a new project\n- Technical support\n\nFeel free to ask me anything about our services, or if you have a specific question, I'll do my best to provide you with the information you need.\n\nYou can also visit our website at xrttech.com for more details or contact our support team directly."
  },

  // Fallback responses when the AI can't generate a response
  fallbackResponses: [
    "I'd be happy to help with that. Could you please provide more details about what you're looking for?",
    "Thanks for your question! I can help with information about our web development, cloud solutions, digital marketing, and other services. Could you tell me more about your specific needs?",
    "I'm here to assist you with information about our technology solutions. Could you clarify your question or let me know which service you're interested in?",
    "Let me find that information for you. In the meantime, you might find what you need in our services section or on our website at xrttech.com.",
    "That's a great question! Our team at XRT Tech specializes in comprehensive technology solutions. Could you tell me more about your project or what you're trying to achieve?",
    "I want to make sure I provide you with the most accurate information. Could you rephrase your question or provide more details about what you need?",
    "I'm here to help! Could you let me know if you're looking for information about a specific service, pricing, or technical support?",
  ],
};

// Helper function to get an appropriate response
function getResponse(message: string) {
  const lowerMessage = message.toLowerCase();

  // Check for specific questions in the knowledge base
  if (lowerMessage.includes("what is") && lowerMessage.includes("xrt")) {
    return CONFIG.knowledgeBase["what is xrt tech"];
  } else if (lowerMessage.includes("company") && lowerMessage.includes("history")) {
    return CONFIG.knowledgeBase["company history"];
  } else if (lowerMessage.includes("mission") || lowerMessage.includes("what do you believe")) {
    return CONFIG.knowledgeBase["mission"];
  } else if (lowerMessage.includes("values") || lowerMessage.includes("principles")) {
    return CONFIG.knowledgeBase["values"];
  } else if (
    lowerMessage.includes("service") ||
    lowerMessage.includes("offer") ||
    lowerMessage.includes("provide") ||
    lowerMessage.includes("what can you do")
  ) {
    return CONFIG.knowledgeBase["services"];
  } else if (
    lowerMessage.includes("web") && 
    (lowerMessage.includes("develop") || lowerMessage.includes("design") || lowerMessage.includes("site"))
  ) {
    return CONFIG.knowledgeBase["web development"];
  } else if (
    lowerMessage.includes("cloud") || 
    lowerMessage.includes("hosting") ||
    lowerMessage.includes("server")
  ) {
    return CONFIG.knowledgeBase["cloud solutions"];
  } else if (
    lowerMessage.includes("seo") || 
    lowerMessage.includes("search engine") ||
    (lowerMessage.includes("marketing") && lowerMessage.includes("digital"))
  ) {
    return CONFIG.knowledgeBase["seo services"];
  } else if (
    lowerMessage.includes("contact") ||
    lowerMessage.includes("reach") ||
    lowerMessage.includes("email") ||
    lowerMessage.includes("phone") ||
    lowerMessage.includes("address")
  ) {
    return CONFIG.knowledgeBase["contact"];
  } else if (
    lowerMessage.includes("support") ||
    lowerMessage.includes("help") ||
    lowerMessage.includes("issue")
  ) {
    return CONFIG.knowledgeBase["support"];
  } else if (
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("how much") ||
    lowerMessage.includes("package")
  ) {
    return CONFIG.knowledgeBase["pricing"];
  } else if (
    lowerMessage.includes("start") && 
    (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("begin"))
  ) {
    return CONFIG.knowledgeBase["how to get started"];
  } else if (
    lowerMessage.includes("different") || 
    lowerMessage.includes("unique") ||
    lowerMessage.includes("why choose")
  ) {
    return CONFIG.knowledgeBase["what makes you different"];
  } else if (
    lowerMessage.includes("maintenance") || 
    lowerMessage.includes("update") ||
    (lowerMessage.includes("support") && lowerMessage.includes("ongoing"))
  ) {
    return CONFIG.knowledgeBase["do you offer maintenance"];
  } else if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("hey") ||
    lowerMessage.includes("greet")
  ) {
    return "Hello! Welcome to XRT Tech. I'm here to help you with information about our technology solutions. How can I assist you today?";
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
