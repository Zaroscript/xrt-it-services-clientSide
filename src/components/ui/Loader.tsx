"use client";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loader({ size = "md", className = "" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative ${sizeClasses[size]} loader-container`}>
        {/* Rotating outer hexagon - using CSS animation for better performance */}
        <div className="absolute inset-0 loader-rotate-slow">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
              className="text-foreground/60"
            />
          </svg>
        </div>

        {/* Pulsing inner circle with tech pattern - using CSS animation */}
        <div className="absolute inset-4 loader-rotate-reverse">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circuit pattern */}
            <path
              d="M50 20L80 50L50 80L20 50L50 20Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="rgba(0, 0, 0, 0.05)"
              className="text-foreground/40"
            />
            <circle
              cx="50"
              cy="50"
              r="15"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className="text-foreground/40"
            />
          </svg>
        </div>

        {/* Center dot - using CSS animation */}
        <div className="absolute inset-0 flex items-center justify-center loader-pulse-center">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground shadow-[0_0_8px_currentColor]" />
        </div>
      </div>
    </div>
  );
}