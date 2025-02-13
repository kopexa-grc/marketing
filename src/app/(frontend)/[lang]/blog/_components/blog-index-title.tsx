"use client";

import type { GroupField } from "@prismicio/client";
import type {
  BlogHomeDocumentDataRollingTitleItem,
  Simplify,
} from "../../../../../../prismicio-types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export type BlogIndexTitleProps = {
  title: string;
  rollingTitles: GroupField<Simplify<BlogHomeDocumentDataRollingTitleItem>>;
};

const interval = 6000;

export const BlogIndexTitle = ({
  title,
  rollingTitles = [],
}: BlogIndexTitleProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (rollingTitles.length > 1) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % rollingTitles.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [rollingTitles]);

  return (
    <div className="container my-12">
      <h1 className="font-bold text-base md:text-lg mb-4 block text-primary-950">
        {title}
      </h1>
      <span className="relative font-heading font-bold text-5xl xl:text-6xl">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {rollingTitles[index]?.title_part}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
};
