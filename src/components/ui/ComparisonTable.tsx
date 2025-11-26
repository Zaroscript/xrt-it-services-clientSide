"use client";

import React, { useState } from "react";
import { Check, X, HelpCircle, CheckCircle2 } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

import { features, tooltipStyles } from "@/config/constants";

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
