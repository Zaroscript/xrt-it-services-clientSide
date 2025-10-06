import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface Feature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  yearlyPrice: string;
  originalPrice: string;
  discount: string;
  features: Feature[];
  isPopular?: boolean;
  className?: string;
}

export function PricingCard({
  title,
  price,
  yearlyPrice,
  originalPrice,
  discount,
  features,
  isPopular,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl transition-all duration-300 group",
        isPopular
          ? "dark:bg-gradient-to-b dark:from-[#343438] dark:to-[#1a1a1a] bg-white/90 shadow-lg shadow-secondary/10 dark:shadow-secondary/20 ring-1 ring-gray-200 dark:ring-secondary/20 ring-offset-1 ring-offset-white/50 dark:ring-offset-[#1a1a1a]"
          : "bg-white/80 dark:bg-[#343438] shadow-md hover:shadow-lg transition-shadow",
        "px-6 py-8 hover:-translate-y-1",
        className
      )}
    >
      {isPopular && (
        <>
          {/* Popular Badge */}
          <div className="absolute right-[-41px] top-[35px] rotate-45 bg-gradient-to-r from-secondary to-secondary/80 px-12 py-1.5 shadow-lg">
            <span className="text-sm font-semibold text-[#1a1a1a]">
              MOST POPULAR
            </span>
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-b from-secondary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-0 dark:group-hover:opacity-100" />

          {/* Light mode gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#fff9f0] to-[#fff0d9] opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:opacity-0 dark:group-hover:opacity-0 -z-10" />

          {/* Dark mode gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#343438] to-[#1a1a1a] opacity-0 group-hover:opacity-0 dark:group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </>
      )}
      <div className={cn("space-y-6", isPopular && "relative z-10")}>
        <div>
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                "pt-3 text-lg font-semibold",
                isPopular ? "text-secondary" : "text-primary dark:text-white"
              )}
            >
              {title}
            </h3>
          </div>
          <h2
            className={cn(
              "pb-4 pt-2 text-3xl font-bold",
              isPopular
                ? "bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent"
                : "text-[#D3B073]"
            )}
          >
            {price}
          </h2>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <p>Paid Yearly at {yearlyPrice}</p>
            <p>
              <del className="text-gray-500 dark:text-gray-400">
                {originalPrice}
              </del>{" "}
              <span
                className={cn(
                  "font-medium",
                  isPopular
                    ? "text-secondary"
                    : "text-primary dark:text-[#D3B073]"
                )}
              >
                {discount} OFF
              </span>
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              No commitment. Cancel Anytime.
            </p>
          </div>
        </div>

        <div
          className={cn(
            "h-px w-full",
            isPopular
              ? "bg-gradient-to-r from-secondary via-secondary/80 to-secondary/60"
              : "bg-[#D3B073]"
          )}
        />

        <ul className="min-h-[240px] space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-3 transition-colors duration-200",
                isPopular ? "hover:text-secondary" : "hover:text-[#D3B073]"
              )}
            >
              {feature.included ? (
                <div
                  className={cn(
                    "rounded-full p-0.5",
                    isPopular ? "bg-secondary/10" : "bg-[#D3B073]/10"
                  )}
                >
                  <Check
                    className={cn(
                      "h-4 w-4",
                      isPopular ? "text-secondary" : "text-[#D3B073]"
                    )}
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "rounded-full p-0.5",
                    isPopular ? "bg-secondary/10" : "bg-[#D3B073]/10"
                  )}
                >
                  <Plus
                    className={cn(
                      "h-4 w-4",
                      isPopular ? "text-secondary" : "text-[#D3B073]"
                    )}
                  />
                </div>
              )}
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        <Button
          variant={isPopular ? "default" : "outline"}
          className={cn(
            "group relative w-full overflow-hidden rounded-lg py-6 uppercase transition-all duration-300",
            isPopular
              ? "bg-gradient-to-r from-secondary to-secondary/80 text-[#1a1a1a] hover:scale-[1.02] hover:shadow-lg hover:shadow-secondary/20"
              : "border-[#D3B073] text-[#D3B073] hover:bg-[#D3B073]/10"
          )}
        >
          {isPopular && (
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-secondary/0 via-white/20 to-secondary/0 transition-transform duration-700 group-hover:translate-x-full" />
          )}
          Choose Plan
        </Button>

        <div className="space-y-2 text-center text-sm">
          <p className="text-gray-500 dark:text-gray-400">
            Local taxes may apply
          </p>
          <div
            className={cn(
              "flex items-center justify-center gap-2 font-medium",
              isPopular ? "text-secondary" : "text-[#D3B073]"
            )}
          >
            <span
              className={cn(
                "inline-flex items-center justify-center rounded-full p-0.5",
                isPopular ? "bg-secondary/10" : "bg-[#D3B073]/10"
              )}
            >
              <Check className="h-4 w-4" />
            </span>
            30 Day Money-Back Guarantee
          </div>
        </div>
      </div>
    </div>
  );
}
