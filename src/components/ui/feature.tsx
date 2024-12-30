import { cn } from "@/lib/utils";
import Image from "next/image";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

type FeatureProps = ComponentPropsWithoutRef<"div">;

export const FeatureRoot = forwardRef<HTMLDivElement, FeatureProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    return (
      <div
        className={cn(
          "flex flex-col h-full rounded-lg bg-accent text-accent-foreground",
          "p-10 lg:p-12 @60:lg:flex-row @60:lg:justify-between",
          className
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

FeatureRoot.displayName = "FeatureRoot";

export const FeatureTextWrapper = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      className={cn(
        "@60:lg:flex @60:lg:w-1/3 @60:lg:flex-col @60:lg:mr-12",
        className
      )}
      {...rest}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

FeatureTextWrapper.displayName = "FeatureTextWrapper";

type FeatureImageProps = ComponentPropsWithoutRef<"div"> & {
  src: string;
  alt: string;
};

export const FeatureImage = forwardRef<HTMLDivElement, FeatureImageProps>(
  (props, ref) => {
    const { className, src, alt, ...rest } = props;

    return (
      <div
        className={cn(
          "flex h-full items-center justify-center mt-10 lg:mt-12 @60:lg:mx-auto",
          className
        )}
        {...rest}
        ref={ref}
      >
        <Image
          className="max-w-full h-auto"
          src={src}
          alt={alt}
          width={600}
          height={400}
        />
      </div>
    );
  }
);

FeatureImage.displayName = "FeatureImageWrapper";

export const FeatureMediaWrapper = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<"div">
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      className={cn(
        "flex h-full items-center justify-center mt-10 lg:mt-12 @60:lg:mx-auto",
        className
      )}
      {...rest}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

FeatureMediaWrapper.displayName = "FeatureMediaWrapper";

export const Feature = {
  Root: FeatureRoot,
  TextWrapper: FeatureTextWrapper,
  Image: FeatureImage,
  Media: FeatureMediaWrapper,
};
