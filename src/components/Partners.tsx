"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback, memo } from "react";
import Image, { StaticImageData } from "next/image";

// Custom debounce utility to replace lodash/debounce
const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Import partners
import { partners } from "@/config/constants";

interface PartnerLogoProps {
  logo: string | StaticImageData;
  name: string;
}

const PartnerLogo = memo(({ logo, name }: PartnerLogoProps) => (
  <div className="w-40 h-24 relative opacity-50 hover:opacity-100 transition-opacity duration-300 mx-8">
    <Image
      src={logo}
      alt={name}
      fill
      className="object-contain p-2"
      sizes="200px"
      loading="lazy"
    />
  </div>
));

PartnerLogo.displayName = "PartnerLogo";

const Partners = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [totalWidth, setTotalWidth] = useState(0);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const progressRef = useRef<number>(0);
  const duration = 20; // seconds for one complete loop

  // Create looped partners with useMemo to prevent unnecessary recalculations
  const loopedPartners = useMemo(() => [...partners, ...partners], []);

  // Calculate total width of one set using actual measurement
  const calculateWidth = useCallback(() => {
    if (sliderRef.current) {
      const fullWidth = sliderRef.current.offsetWidth;
      setTotalWidth(fullWidth / 2); // Since looped is 2x, totalWidth is the width of one cycle
    }
  }, []);

  // Animation function using requestAnimationFrame
  const animateSlider = useCallback(() => {
    if (!isInView || isHovered) return;

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;

      const elapsed = (time - startTimeRef.current) / 1000; // in seconds
      progressRef.current = (elapsed % duration) / duration;

      if (sliderRef.current) {
        const x = -progressRef.current * totalWidth;
        sliderRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
      }

      if (!isHovered) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, isHovered, totalWidth]);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    startTimeRef.current = performance.now() - (progressRef.current * duration * 1000);
    animateSlider();
  }, [animateSlider]);

  // Calculate width on mount and resize
  useEffect(() => {
    calculateWidth();
    const handleResize = debounce(calculateWidth, 200);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [calculateWidth]);

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsInView(isVisible);
        if (isVisible && !isHovered) {
          startTimeRef.current = performance.now() - (progressRef.current * duration * 1000);
          animateSlider();
        } else if (!isVisible && animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered, animateSlider]);

  return (
    <section
      className="py-16 bg-card overflow-hidden"
      aria-label="Our Trusted Partners"
    >
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
            Our <span className="text-secondary">Trusted</span> Partners
          </h2>
          <div className="w-28 h-1 bg-[#d3b073] mx-auto -translate-x-9"></div>
        </div>

        <div
          ref={containerRef}
          className="relative py-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Gradient overlays */}
          <div
            className="absolute -left-4 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-card to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -right-4 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-card to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div
            ref={sliderRef}
            className="flex w-max gap-16 will-change-transform"
            style={{
              backfaceVisibility: "hidden",
              transform: "translate3d(0,0,0)",
              willChange: "transform",
              display: "flex",
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {loopedPartners.map((partner, index) => (
              <PartnerLogo
                key={`${partner.name}-${index}`}
                logo={partner.logo}
                name={partner.name}
              />
            ))}
          </div>

          {/* Screen reader only content for accessibility */}
          <div className="sr-only">
            Our trusted partners include: {partners.map((p) => p.name).join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;