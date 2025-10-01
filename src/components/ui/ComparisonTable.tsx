import React from "react";
import { Check, Minus } from "lucide-react";

const features = [
  {
    category: "Learning Resources",
    items: [
      { name: "Standard Courses", standard: true, pro: true, enterprise: true },
      { name: "Hands-on Labs", standard: true, pro: true, enterprise: true },
      { name: "PRO Courses", standard: false, pro: true, enterprise: true },
      { name: "Certification Preparation", standard: false, pro: true, enterprise: true },
      { name: "Industry Project Cases", standard: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Platform Features",
    items: [
      { name: "Cloud Playgrounds", standard: false, pro: true, enterprise: true },
      { name: "DevOps Environment", standard: false, pro: true, enterprise: true },
      { name: "AI-Assisted Labs", standard: false, pro: true, enterprise: true },
      { name: "Personal AI Tutor", standard: false, pro: true, enterprise: true },
      { name: "Offline Access", standard: false, pro: true, enterprise: true },
    ],
  },
  {
    category: "Team & Support",
    items: [
      { name: "Email Support", standard: true, pro: true, enterprise: true },
      { name: "Priority Support", standard: false, pro: true, enterprise: true },
      { name: "Team Dashboard", standard: false, pro: false, enterprise: true },
      { name: "Progress Tracking", standard: false, pro: false, enterprise: true },
      { name: "Custom Learning Paths", standard: false, pro: false, enterprise: true },
    ],
  },
];

export function ComparisonTable() {
  return (
    <div className="mt-24">
      <div className="container">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Compare Plan Features
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Detailed comparison of what&apos;s included in each plan
            </p>
          </div>

          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 text-left text-sm font-normal text-gray-400">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Standard
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-secondary">
                    Pro
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((category) => (
                  <React.Fragment key={`category-${category.category}`}>
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 text-sm font-semibold text-secondary"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.items.map((item, index) => (
                      <tr
                        key={item.name}
                        className={
                          index === category.items.length - 1
                            ? "border-b border-gray-800"
                            : ""
                        }
                      >
                        <td className="py-4 text-sm text-gray-300">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.standard ? (
                            <Check className="mx-auto h-5 w-5 text-secondary" />
                          ) : (
                            <Minus className="mx-auto h-5 w-5 text-gray-600" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.pro ? (
                            <Check className="mx-auto h-5 w-5 text-secondary" />
                          ) : (
                            <Minus className="mx-auto h-5 w-5 text-gray-600" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.enterprise ? (
                            <Check className="mx-auto h-5 w-5 text-secondary" />
                          ) : (
                            <Minus className="mx-auto h-5 w-5 text-gray-600" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}