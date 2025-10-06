import React, { useState } from "react";
import { Check, X, HelpCircle, CheckCircle2 } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

const features = [
  {
    category: "Learning Resources",
    items: [
      {
        name: "Standard Courses",
        description:
          "Access to all standard courses covering fundamental topics in cloud computing and DevOps.",
        standard: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "Hands-on Labs",
        description:
          "Interactive, real-world labs to practice your skills in a safe, sandboxed environment.",
        standard: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "PRO Courses",
        description:
          "Advanced courses with in-depth coverage of complex topics and emerging technologies.",
        standard: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Certification Preparation",
        description:
          "Focused training and practice exams to help you pass major cloud and DevOps certifications.",
        standard: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Industry Project Cases",
        description:
          "Real-world project scenarios that simulate actual work environments and challenges.",
        standard: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Platform Features",
    items: [
      {
        name: "Cloud Playgrounds",
        description:
          "Temporary cloud environments to practice without needing your own cloud account.",
        standard: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "DevOps Environment",
        description:
          "Pre-configured CI/CD pipelines and infrastructure as code templates.",
        standard: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "AI-Assisted Labs",
        description:
          "Get real-time hints and solutions as you work through hands-on exercises.",
        standard: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Personal AI Tutor",
        description:
          "AI-powered assistant that adapts to your learning style and answers questions.",
        standard: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Offline Access",
        description:
          "Download courses and labs to learn without an internet connection.",
        standard: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Team & Support",
    items: [
      {
        name: "Email Support",
        description:
          "Email support with 48-hour response time during business hours.",
        standard: true,
        pro: true,
        enterprise: true,
      },
      {
        name: "Priority Support",
        description:
          "24/7 priority email support with 4-hour response time and live chat.",
        standard: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Team Dashboard",
        description:
          "Centralized dashboard to manage team members, track progress, and assign training.",
        standard: false,
        pro: false,
        enterprise: true,
      },
      {
        name: "Progress Tracking",
        description:
          "Detailed analytics and reporting on team learning progress and skill development.",
        standard: false,
        pro: false,
        enterprise: true,
      },
      {
        name: "Custom Learning Paths",
        description:
          "Create tailored learning journeys based on team roles and objectives.",
        standard: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
];

// Add CSS for the tooltip animation
const tooltipStyles = `
  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .TooltipContent {
    animation-duration: 200ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  }
  .TooltipContent[data-state='delayed-open'][data-side='top'] {
    animation-name: slideUpAndFade;
  }
`;

// Tooltip component
const FeatureTooltip = ({
  children,
  content,
}: {
  children?: React.ReactNode;
  content: string;
}) => (
  <Tooltip.Provider>
    <Tooltip.Root delayDuration={200}>
      <Tooltip.Trigger asChild>
        <button
          className="inline-flex items-center ml-1 text-gray-400 hover:text-gray-200 focus:outline-none"
          aria-label="More information"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="TooltipContent bg-card text-white text-sm px-3 py-2 rounded-md shadow-lg max-w-xs border border-gray-700 z-50"
          sideOffset={5}
          side="top"
        >
          {content}
          <Tooltip.Arrow className="fill-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export function ComparisonTable() {
  return (
    <div className="mt-24">
      <style jsx global>
        {tooltipStyles}
      </style>
      <div className="page-container">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary dark:text-white">
              Compare Plan Features
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Detailed comparison of what's included in each plan
            </p>
          </div>

          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 text-left text-sm font-normal text-gray-400">
                    Features
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary dark:text-white">
                    Standard
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-secondary">
                    Pro
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary dark:text-white">
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
                        <td className="py-4 text-sm text-primary dark:text-white">
                          <div className="flex items-center">
                            <span>{item.name}</span>
                            <FeatureTooltip content={item.description} />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.standard ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.pro ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-red-500" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.enterprise ? (
                            <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                          ) : (
                            <X className="mx-auto h-5 w-5 text-red-500" />
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
