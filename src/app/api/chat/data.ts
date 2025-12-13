export const websiteData = {
  company: {
    name: "XRT Tech",
    mission:
      "To empower businesses with innovative technology solutions that drive growth and success.",
    description:
      "XRT Tech provides IT services, web development, online ordering systems, hosting, and digital signage solutions for small businesses and restaurants.",
    contact: {
      email: "support@xrttech.com",
      phone: "+1 508-507-0922",
      address: "Franklin, MA 02038, USA",
      hours: "Mon-Fri 10AM-10PM, Sat 8AM-8PM",
    },
    values: [
      {
        title: "Innovation",
        desc: "We embrace change and seek new ways to solve problems.",
      },
      {
        title: "Excellence",
        desc: "Committed to highest quality in code and service.",
      },
      {
        title: "Integrity",
        desc: "Transparency, honesty, and doing what's right.",
      },
      {
        title: "Collaboration",
        desc: "Working together to achieve extraordinary results.",
      },
    ],
  },
  services: [
    {
      title: "Web Design, Development & Maintenance",
      description:
        "Fast, modern sites flawless on every device. Custom design, mobile apps, e-commerce, hosting, SEO setup.",
      features: [
        "Custom design",
        "Mobile responsive",
        "App development (iOS/Android)",
        "E-commerce",
        "Hosting included",
        "Security monitoring",
        "SEO setup",
      ],
    },
    {
      title: "Online Ordering Systems",
      description:
        "Commission-free ordering system for restaurants. Keep 100% of revenue. Integrated payments (Stripe/PayPal), menu management, delivery zones.",
      features: [
        "Zero commissions",
        "Unlimited orders",
        "Real-time alerts",
        "Loyalty rewards",
        "Coupons",
        "Mobile-friendly",
      ],
    },
    {
      title: "Cloud & Backup Solutions",
      description:
        "Secure cloud storage, automated backups, disaster recovery, and Google Workspace/Microsoft 365 setup.",
      features: [
        "Cloud migration",
        "Data backup",
        "Disaster recovery",
        "Encrypted storage",
        "Email hosting",
      ],
    },
    {
      title: "Digital Marketing",
      description:
        "Branding, logos, social media ads, digital signage content, and SEO strategies.",
      features: [
        "Logo design",
        "Social media management",
        "Digital signage",
        "SEO optimization",
        "Content creation",
      ],
    },
    {
      title: "IT Setup & Support",
      description:
        "Complete office IT setup, network configuration, POS installation, and 24/7 technical support.",
      features: [
        "Network setup",
        "Hardware installation",
        "Troubleshooting",
        "Software updates",
        "POS setup",
      ],
    },
    {
      title: "Digital Signage",
      description:
        "Turn TVs into smart digital menu boards. Remote management, free screens with select plans.",
      features: [
        "Remote updates",
        "Fire Stick compatible",
        "Multi-screen support",
      ],
    },
  ],
  pricing: {
    plans: [
      {
        name: "Start Plan",
        price: "$15/mo ($180/yr)",
        features: [
          "Branded website",
          "Secure payments",
          "Unlimited items",
          "Real-time notifications",
          "Hosting included",
          "24/7 support",
        ],
      },
      {
        name: "Grow Plan",
        price: "$25/mo ($300/yr)",
        features: [
          "All Start features",
          "Multi-location (up to 3)",
          "SMS/WhatsApp alerts",
          " loyalty rewards",
          "Cloud backup",
          "Priority support",
        ],
      },
      {
        name: "Success Plan",
        price: "$35/mo ($420/yr)",
        features: [
          "All Grow features",
          "Unlimited branches",
          "Custom design",
          "API integrations",
          "Dedicated manager",
          "Advanced reporting",
        ],
      },
    ],
    details:
      "No hidden fees. 30-day money-back guarantee. Enterprise custom plans available.",
  },
  faqs: [
    {
      q: "How much does a project cost?",
      a: "Depends on scope, but we provide clear itemized proposals. No hidden fees.",
    },
    {
      q: "Do you charge commissions on orders?",
      a: "No. You keep 100% of revenue.",
    },
    {
      q: "Do you offer support after launch?",
      a: "Yes, every project includes ongoing technical support and maintenance.",
    },
    {
      q: "Can you work with my existing site?",
      a: "Yes, we can improve, redesign, or integrate with your current setup.",
    },
    {
      q: "Do you work internationally?",
      a: "Yes, we partner with clients worldwide.",
    },
  ],
};

export const SYSTEM_PROMPT = `You are a helpful and friendly AI assistant for XRT Tech. Use the following information to answer user questions accurately.

About XRT Tech:
\${JSON.stringify(websiteData.company)}

Services:
\${JSON.stringify(websiteData.services)}

Pricing:
\${JSON.stringify(websiteData.pricing)}

FAQs:
\${JSON.stringify(websiteData.faqs)}

Guidelines:
- Be professional, concise, and helpful.
- If asked about pricing, mention the specific plans (Start, Grow, Success) and their features.
- Emphasize "Zero Commissions" for online ordering.
- If you don't know the answer, ask the user to contact support at support@xrttech.com or +1 508-507-0922.
- Do not make up information not present in the data.
`;
