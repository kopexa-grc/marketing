"use client";

import { useState } from "react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/prismic/rich-text";
import { Swiper, type SwiperClass, SwiperSlide } from "swiper/react";
import { Controller, Navigation, Thumbs } from "swiper/modules";
import { motion } from "motion/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { cn } from "@/lib/utils";
import { PrismicNextImage } from "@prismicio/next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tv } from "tailwind-variants";

/**
 * Props for `HowItWorks`.
 */
export type HowItWorksProps = SliceComponentProps<Content.HowItWorksSlice>;

/**
 * Component for "HowItWorks" Slices.
 */
const HowItWorks = ({ slice }: HowItWorksProps) => {
  const [controlledSwiper] = useState<SwiperClass | null>(null);

  const [thumbs, setThumbs] = useState<string | SwiperClass | null | undefined>(
    null
  );
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-12 md:py-20 2xl:py-24 overflow-hidden"
    >
      <div className="container">
        <header>
          <RichText field={slice.primary.heading} />
        </header>
        <div className="border-b relative">
          <Swiper
            aria-orientation="horizontal"
            allowTouchMove={false}
            className="mt-8 md:mt-16 w-[50px] !ms-0 !me-0"
            slideToClickedSlide
            slidesPerView="auto"
            watchSlidesProgress
            thumbs={{ swiper: thumbs }}
            modules={[Controller, Thumbs]}
            controller={{
              control: controlledSwiper,
            }}
            style={{
              overflow: "visible",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {slice.primary.solutions.map((solution, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <SwiperSlide key={`solution-${index}`} className="!w-auto">
                <button
                  className="relative mr-4 md:mr-8 pb-8 lg:pb-16 h-full flex items-center"
                  type="button"
                >
                  <RichText field={solution.heading} />
                  {index === activeIndex && (
                    <motion.div
                      className={cn(
                        "pointer-events-none rounded-full inset-x-0 absolute",
                        "-bottom-px -mb-px h-[3px] bg-primary-950"
                      )}
                      layoutId="activeIndicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Swiper
          onSwiper={setThumbs}
          modules={[Controller, Navigation, Thumbs]}
          controller={{
            control: controlledSwiper,
          }}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          slidesPerView={1}
          className="mt-8 xl:mt-14 first:mt-0"
        >
          {slice.primary.solutions.map((solution, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <SwiperSlide key={`solution-${index}`}>
              <div className="grid grid-cols-12 gap-6 w-full items-start">
                <div className="relative p-px col-span-12 md:col-span-8">
                  <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl border-2" />
                  <div className="overflow-hidden rounded-2xl">
                    <PrismicNextImage field={solution.image} />
                  </div>
                </div>
                <div className="text-base xl:text-lg font-medium print:text-xs print:text-justify col-span-12 md:col-span-4 md:pb-16">
                  <RichText field={solution.subheading} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperNavigation />
      </div>
    </section>
  );
};

export default HowItWorks;

const recipe = tv({
  slots: {
    navigationContainer: "mt-6 md:grid md:grid-cols-12 md:gap-6",
    navigationInner:
      "gap-2 flex md:col-span-4 md:col-start-9 md:-mt-16 relative z-10",
    navigationButton: [
      "rounded-full border-2 size-10 transition-all bg-primary-950 hover:bg-primary-900 text-primary-50",
      "disabled:opacity-50 disabled:bg-transparent disabled:text-primary-900",
    ],
  },
});

const SwiperNavigation = () => {
  const css = recipe();

  return (
    <div className={css.navigationContainer()}>
      <div className={css.navigationInner()}>
        <button
          type="button"
          aria-label="Previous"
          className={cn(css.navigationButton(), "prev")}
        >
          <ChevronLeft className="size-4 mx-auto" />
        </button>
        <button
          type="button"
          aria-label="Next"
          className={cn(css.navigationButton(), "next")}
        >
          <ChevronRight className="size-4 mx-auto" />
        </button>
      </div>
    </div>
  );
};
