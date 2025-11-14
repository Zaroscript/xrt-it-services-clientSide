import React, { useState } from "react";
import { Check, X, HelpCircle, CheckCircle2 } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

const features = [
  {
    category: "Ordering Features",
    items: [
      {
        name: "Zero Commission",
        description: "No commission on orders, keep 100% of your revenue",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Online Ordering Website",
        description: "Custom branded online ordering website for your business",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Unlimited Orders",
        description: "No limit on the number of orders you can receive",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Menu Items",
        description: "Unlimited menu items with categories and descriptions",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Order Modifiers",
        description: "Customize orders with various options and add-ons",
        starter: "Limited",
        premium: "Advanced",
        pro: "Full Custom",
      },
      {
        name: "Delivery Zones and Fees",
        description: "Set up delivery areas and corresponding fees",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Secure Online Payments",
        description: "Process payments securely with multiple payment gateways",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Real-time Order Alerts",
        description: "Instant notifications for new orders",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Mobile-Friendly Design",
        description: "Fully responsive design that works on all devices",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "POS and Delivery App Integrations",
        description: "Connect with popular POS systems and delivery apps",
        starter: false,
        premium: true,
        pro: true,
      },
      {
        name: "Loyalty Rewards",
        description: "Customer loyalty program with points and rewards",
        starter: false,
        premium: false,
        pro: true,
      },
      {
        name: "Coupons and Discounts",
        description: "Create and manage discount codes and promotions",
        starter: false,
        premium: true,
        pro: true,
      },
    ],
  },
  {
    category: "Marketing Features",
    items: [
      {
        name: "Analytics",
        description: "Track and analyze your business performance",
        starter: "Basic",
        premium: "Advanced",
        pro: "Customized",
      },
      {
        name: "Email Marketing",
        description: "Send marketing emails to your customers",
        starter: "Up to 500 emails/month",
        premium: "Up to 1,500 emails/month",
        pro: "Custom email marketing",
      },
      {
        name: "SMS Marketing",
        description: "Send text message promotions to customers",
        starter: false,
        premium: "Included (limited monthly quota)",
        pro: "Custom SMS marketing",
      },
      {
        name: "Business Website Setup",
        description: "Professional website setup for your business",
        starter: false,
        premium: true,
        pro: true,
      },
      {
        name: "Digital Screens Software",
        description: "Manage digital menu boards and displays",
        starter: false,
        premium: "1 year Free (1 update/year)",
        pro: "Custom frequency",
      },
      {
        name: "Website or Menu Updates",
        description: "Regular updates to your website or menu",
        starter: false,
        premium: "1 update/year",
        pro: "Custom updates",
      },
      {
        name: "SEO Optimization",
        description: "Improve search engine visibility",
        starter: false,
        premium: false,
        pro: "Optional add-on",
      },
      {
        name: "Social Media Content",
        description: "Professional content for your social media channels",
        starter: false,
        premium: false,
        pro: "Optional add-on",
      },
      {
        name: "Social Media Ads",
        description: "Managed social media advertising campaigns",
        starter: false,
        premium: false,
        pro: "Optional add-on",
      },
    ],
  },
  {
    category: "Support and Service",
    items: [
      {
        name: "System Hosting and Maintenance",
        description: "We handle all technical aspects of running your system",
        starter: true,
        premium: true,
        pro: true,
      },
      {
        name: "Customer Support",
        description: "Get help when you need it",
        starter: "Standard",
        premium: "Priority",
        pro: "Priority (24/7)",
      },
    ],
  },
  {
    category: "System & Management Features",
    items: [
      {
        name: "Order Management Dashboard",
        description: "Manage all your orders in one place",
        starter: "Basic",
        premium: "Advanced",
        pro: "Full Access",
      },
      {
        name: "Cloud Backup and Secure Storage",
        description: "Automatic backups of your data",
        starter: false,
        premium: "Two Years",
        pro: "Two Years",
      },
      {
        name: "Multi-location Support",
        description: "Manage multiple locations from one account",
        starter: false,
        premium: false,
        pro: true,
      },
      {
        name: "Staff Permissions",
        description: "Control what your staff can access",
        starter: false,
        premium: true,
        pro: true,
      },
      {
        name: "Reporting",
        description: "Detailed reports on your business performance",
        starter: "Basic reporting",
        premium: "Advanced reporting",
        pro: "Custom reports",
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
          className="TooltipContent bg-card text-primary dark:text-white  text-sm px-3 py-2 rounded-md shadow-lg max-w-xs border border-gray-700 z-50"
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
                    Starter
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-secondary">
                    Premium
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary dark:text-white">
                    Pro
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
                        <td className="px-6 py-4 text-center text-sm">
                          {typeof item.starter === "boolean" ? (
                            item.starter ? (
                              <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-red-500" />
                            )
                          ) : (
                            <span>{item.starter}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          {typeof item.premium === "boolean" ? (
                            item.premium ? (
                              <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-red-500" />
                            )
                          ) : (
                            <span>{item.premium}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center text-sm">
                          {typeof item.pro === "boolean" ? (
                            item.pro ? (
                              <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                            ) : (
                              <X className="mx-auto h-5 w-5 text-red-500" />
                            )
                          ) : (
                            <span>{item.pro}</span>
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
