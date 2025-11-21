import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import { testimonials } from "../config/constants";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  return (
    <section className=" relative bg-card text-foreground py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute  inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(var(--gold)/20%_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative page-container mx-auto text-center mb-16">
        <div
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-medium mb-4"
        >
          <Star className="w-4 h-4 mr-2" />
          Trusted by businesses worldwide
        </div>

        <h2
          className="text-4xl md:text-5xl font-bold text-foreground mb-6"
        >
          What Our Clients Say
        </h2>

        <p
          className="text-lg text-muted-foreground max-w-3xl mx-auto"
        >
          Join thousands of satisfied clients who trust our solutions to grow
          their business
        </p>
      </div>

      <div className="relative page-container mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={32}
          slidesPerView={1}
          observer
          loop
          observeParents
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            // Only add event listeners if autoplay is available
            if (swiper.autoplay) {
              swiper.el.addEventListener('mouseenter', () => {
                swiper.autoplay?.stop();
              });
              swiper.el.addEventListener('mouseleave', () => {
                swiper.autoplay?.start();
              });
            }
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          className="pb-16"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="group relative h-full flex flex-col bg-background/50 backdrop-blur-sm rounded-2xl rounded-b-none p-8 transition-all duration-300 shadow-lg hover:shadow-gold/5 min-h-[400px]"
              >
                {/* Decorative quote icon */}
                <Quote className="absolute top-6 right-6 w-12 h-12 text-gold/10 group-hover:text-gold/20 transition-colors" />

                {/* Rating */}
                <div className="flex mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={cn(
                        i < t.rating ? "text-gold" : "text-muted",
                        "w-5 h-5 fill-current transition-colors"
                      )}
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <div className="flex-1 flex flex-col">
                  <p className="text-foreground/90 text-lg leading-relaxed mb-8 relative z-10 flex-1">
                    {t.text}
                  </p>

                </div>

                {/* Author info */}
                <div className="flex items-center pt-4 border-t border-border/50 mt-auto">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/30 group-hover:border-gold/50 transition-colors">
                    <Image
                      src={t.avatar.src}
                      fill
                      sizes="(max-width: 768px) 56px, 56px"
                      alt={t.name}
                      className="object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h5 className="text-lg font-semibold text-foreground">
                      {t.name}
                    </h5>
                    <p className="text-gold text-sm">{t.role}</p>
                  </div>
                </div>

                {/* Decorative accent */}
                <div className="absolute rounded-b-2xl bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </SwiperSlide>
          ))}

          
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
