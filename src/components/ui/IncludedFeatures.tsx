import { Check } from "lucide-react";

const includedFeatures = [
  {
    title: "Technical Support",
    features: [
      "24/7 Live Chat Support",
      "Priority Email Support",
      "Remote Technical Assistance",
      "Community Forum Access"
    ]
  },
  {
    title: "Learning Resources",
    features: [
      "Comprehensive Documentation",
      "Video Tutorials Library",
      "Regular Webinars",
      "Knowledge Base Access"
    ]
  },
  {
    title: "Additional Benefits",
    features: [
      "Certificate of Completion",
      "Course Updates",
      "Mobile Learning Access",
      "Learning Path Guidance"
    ]
  }
];

export function IncludedFeatures() {
  return (
    <div className="mt-24  bg-[#343438] py-16">
      <div className="container">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              All Plans Include
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Every subscription comes with these powerful features to boost your learning experience
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {includedFeatures.map((section, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-800 bg-[#232325] p-8"
              >
                <h3 className="mb-6 text-xl font-semibold text-secondary">
                  {section.title}
                </h3>
                <ul className="space-y-4">
                  {section.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 flex-shrink-0 text-secondary" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}