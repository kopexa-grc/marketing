"use client";

import { cn } from "@/lib/utils";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import {
  type ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { buttonVariants } from "../button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

export interface CarouselRootProps
  extends CarouselProps,
    ComponentProps<"div"> {}

export const CarouselRoot = ({
  orientation = "horizontal",
  opts,
  setApi,
  plugins = [],
  className,
  children,
  ...props
}: CarouselRootProps) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    [WheelGesturesPlugin(), ...plugins]
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <section
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
};

export type CarouselContentProps = ComponentProps<"div">;

export const CarouselContent = ({
  className,
  ...props
}: CarouselContentProps) => {
  const { carouselRef } = useCarousel();

  return (
    <div ref={carouselRef}>
      <div
        className={cn("flex h-full w-full relative box-content", className)}
        {...props}
      />
    </div>
  );
};

export type CarouselItemProps = ComponentProps<"div">;

export const CarouselItem = ({ className, ...props }: CarouselItemProps) => {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("shrink-0 relative w-full h-full", className)}
      {...props}
    />
  );
};

export const CarouselPrevious = () => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          variant: "default",
          size: "icon",
        }),
        "rounded-full"
      )}
      aria-label="Previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
    >
      <ArrowLeftIcon />
      <span className="sr-only">Previous slide</span>
    </button>
  );
};

export const CarouselNext = () => {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      type="button"
      className={cn(
        buttonVariants({
          variant: "default",
          size: "icon",
        }),
        "rounded-full"
      )}
      aria-label="Next"
      disabled={!canScrollNext}
      onClick={scrollNext}
    >
      <ArrowRightIcon />
      <span className="sr-only">Next slide</span>
    </button>
  );
};
