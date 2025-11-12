import { notFound } from "next/navigation";
import { services } from "@/config/constants";
import { ServiceDetail } from "@/components/services/ServiceDetail";

type ServicePageProps = {
  params: {
    serviceId: string;
  };
};

export default function ServicePage({ params }: ServicePageProps) {
  // Convert URL parameter to match service ID format
  const serviceId = params.serviceId;

  // Find the service by ID
  const service = services.find(
    (s) => s.id.toLowerCase() === serviceId.toLowerCase()
  );

  // If service not found, return 404
  if (!service) {
    notFound();
  }

  // Create a new object with only the properties we want to pass to the client component
  const enhancedService = {
    ...service,
    id: service.id,
    longDescription: getServiceDescription(service.title),
    process: getServiceProcess(service.title),
    // Use the service ID as the icon name
    iconName: service.id
  };
  
  // Remove the icon property to avoid serialization issues
  const { icon, ...serviceWithoutIcon } = enhancedService;

  return <ServiceDetail service={serviceWithoutIcon} />;
}

// Helper function to get detailed descriptions for each service
function getServiceDescription(serviceTitle: string): string {
  const descriptions: Record<string, string> = {
    "Web Development":
      "Our web development services create fast, responsive, and user-friendly websites and web applications. We use modern frameworks and technologies to build scalable solutions that drive business growth and enhance user engagement.",
    "Mobile Apps":
      "We develop high-performance mobile applications for both iOS and Android platforms. Our mobile solutions are designed to provide seamless user experiences and leverage the latest mobile technologies.",
    "Cloud Solutions":
      "Transform your business with our comprehensive cloud solutions. We help you migrate, manage, and optimize your cloud infrastructure for maximum efficiency and scalability.",
    "Database Management":
      "Our database management services ensure your data is secure, accessible, and performing at its best. We provide solutions for database design, optimization, and maintenance.",
    Cybersecurity:
      "Protect your digital assets with our robust cybersecurity solutions. We offer comprehensive security assessments, threat detection, and protection services to keep your business safe.",
    "AI & ML Solutions":
      "Leverage the power of artificial intelligence and machine learning to gain valuable insights and automate processes. Our AI/ML solutions are tailored to your specific business needs.",
  };

  return descriptions[serviceTitle] || "";
}

// Helper function to get process steps for each service
function getServiceProcess(
  serviceTitle: string
): Array<{ title: string; description: string }> {
  const processes: Record<
    string,
    Array<{ title: string; description: string }>
  > = {
    "Web Development": [
      {
        title: "Discovery & Planning",
        description:
          "We analyze your requirements and create a detailed project plan.",
      },
      {
        title: "UI/UX Design",
        description:
          "Our designers create intuitive and engaging user interfaces.",
      },
      {
        title: "Development",
        description:
          "We build your website using the latest technologies and best practices.",
      },
      {
        title: "Testing & Launch",
        description:
          "Thorough testing ensures everything works perfectly before launch.",
      },
    ],
    "Mobile Apps": [
      {
        title: "Strategy & Planning",
        description:
          "We define the app concept, target audience, and key features.",
      },
      {
        title: "Design & Prototyping",
        description:
          "Create wireframes and interactive prototypes for your app.",
      },
      {
        title: "Development",
        description:
          "Native or cross-platform development based on your requirements.",
      },
      {
        title: "Testing & Deployment",
        description: "Rigorous testing and smooth deployment to app stores.",
      },
    ],
    "Cloud Solutions": [
      {
        title: "Assessment",
        description:
          "Evaluate your current infrastructure and cloud readiness.",
      },
      {
        title: "Migration Planning",
        description: "Create a detailed migration strategy and timeline.",
      },
      {
        title: "Implementation",
        description:
          "Execute the migration with minimal disruption to your business.",
      },
      {
        title: "Optimization",
        description:
          "Continuously monitor and optimize your cloud environment.",
      },
    ],
  };

  return (
    processes[serviceTitle] || [
      {
        title: "Consultation",
        description: "We discuss your requirements and business goals.",
      },
      {
        title: "Solution Design",
        description: "Our experts design a customized solution for your needs.",
      },
      {
        title: "Implementation",
        description: "We implement the solution with attention to detail.",
      },
      {
        title: "Support",
        description: "Ongoing support and maintenance to ensure success.",
      },
    ]
  );
}
