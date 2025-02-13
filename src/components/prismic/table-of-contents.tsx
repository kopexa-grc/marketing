"use client";

import { cn } from "@/lib/utils";
import { headingRecipe } from "../recipes/heading-recipe";
import { ArrowDown } from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RTNode } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import type { TextContentSlice } from "../../../prismicio-types";
import { slugifyHeading } from "./lib";
import { motion, useSpring, useTransform } from "motion/react";
import { useWindowSize } from "usehooks-ts";
import { usePathname } from "next/navigation";

export type DataSlice = TextContentSlice;

type TableOfContentsProps = {
  tocTitle?: string;
  className?: string;
  slices: DataSlice[];
};

const collapsedHeight = 120;

export const TableOfContents = (props: TableOfContentsProps) => {
  const { className, tocTitle = "Table of contents", slices = [] } = props;

  const [headings, setHeadings] = useState<{ id: string; index: number }[]>([]);
  const [activeId, setActiveId] = useState<string | null>("");
  const headingsList = useRef<HTMLUListElement>(null);
  const scrollRef = useRef<number>(0);
  const [tocCollapsed, setTocCollapsed] = useState(false);
  const innerContentContainerRef = useRef<HTMLDivElement>(null);
  const [innerContainerHeight, setInnerContainerHeight] = useState(0);
  const [bottom, setBottom] = useState(false);
  const win = useWindowSize();
  const scrollBarHeight = useSpring(0);
  const scrollCollapsedHeight = useSpring(0);
  const [postContentLoaded, setPostContentLoaded] = useState(false);
  const path = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    setTimeout(() => {
      setPostContentLoaded(true);
    }, 1500);

    return () => {
      setPostContentLoaded(false);
    };
  }, [path]);

  // Map values for collapsed scrolling of TOC
  const tocScroll = useTransform(
    scrollCollapsedHeight,
    [0, innerContainerHeight - 60],
    [0, -(innerContainerHeight - collapsedHeight)]
  );

  const collapseToc = () => {
    setTocCollapsed((prev) => !prev);
  };

  // Responsive collapsing of TOC
  useEffect(() => {
    if (win.width < 1024) {
      setTocCollapsed(true);
    } else {
      setTocCollapsed(false);
    }

    if (innerContainerHeight > win.height - 300) {
      setTocCollapsed(true);
    }
  }, [win, innerContainerHeight]);

  // Calculate inner container height
  useEffect(() => {
    const innerContainer = innerContentContainerRef?.current;

    if (!innerContainer) return;

    setInnerContainerHeight(innerContainer.clientHeight);
  }, []);

  // Calculate scroll positions
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const activeItem = document.querySelector(
      `[href='#${activeId}']`
    ) as HTMLAnchorElement;
    const lastItem = headingsList.current?.lastChild as HTMLLIElement;
    const activeParent = activeItem?.parentElement as HTMLLIElement;
    const activeParentOffset = activeParent?.offsetTop || 0;
    const activeParentHeight = activeParent?.clientHeight || 0;
    const activeParentCenter = activeParentOffset + activeParentHeight;

    if (lastItem === activeParent) {
      setTimeout(() => {
        setBottom(true);
      }, 200);
    } else if (lastItem !== activeParent && bottom) {
      setBottom(false);
    }

    scrollBarHeight.set(activeParentCenter);
    scrollCollapsedHeight.set(activeParentOffset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // create headings list
  useEffect(() => {
    headingsList.current?.childNodes.forEach((heading, index) => {
      const id = slugifyHeading({ text: heading.textContent ?? "" });

      if (id) {
        setHeadings((prevHeadings) => [...prevHeadings, { id, index }]);
      }
    });

    return () => {
      setHeadings([]);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("id");

          if (entry.isIntersecting) {
            setActiveId(id);
            scrollRef.current = window.scrollY;
          } else {
            const diff = scrollRef.current - window.scrollY;
            const isScrollingUp = diff > 0;
            const currentIndex = headings.findIndex(
              (heading) => heading.id === id
            );
            const prevEntry = headings[currentIndex - 1];
            const prevId = prevEntry?.id;

            if (isScrollingUp && prevId) {
              setActiveId(prevId);
            }
          }
        }
      },
      {
        rootMargin: "0px 0px -85% 0px",
      }
    );

    const observeHeadings = () => {
      for (const heading of headings) {
        const currentHeading = document.getElementById(heading.id);

        if (currentHeading) {
          observer.observe(currentHeading);
        }
      }
    };

    if (postContentLoaded) {
      setTimeout(observeHeadings, 0);
    }

    return () => {
      for (const heading of headings) {
        const currentHeading = document.getElementById(heading.id);

        if (currentHeading) {
          observer.unobserve(currentHeading);
        }
      }
    };
  }, [postContentLoaded, headings]);

  return (
    <div className={cn("overflow-hidden pt-6 relative", className)}>
      <header className="pb-4 px-6">
        <button
          type="button"
          className="flex justify-between items-center w-full"
          onClick={() => collapseToc()}
        >
          <h3
            className={headingRecipe({
              level: "h3",
              className: "mb-0 leading-none",
            })}
          >
            {tocTitle}
          </h3>
          <motion.div
            animate={{ rotate: !tocCollapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowDown className="size-6 -mr-2 transition-transform" />
          </motion.div>
        </button>
      </header>
      <div className="relative">
        <motion.div
          className="overflow-hidden"
          animate={{
            height: tocCollapsed ? collapsedHeight : "auto",
          }}
        >
          <motion.div
            ref={innerContentContainerRef}
            className="relative pb-2.5"
            style={{
              y: tocCollapsed ? tocScroll : 0,
            }}
          >
            <div className="w-1 bg-primary-50 absolute top-0 left-10 bottom-2.5 hidden lg:block" />
            <motion.div
              className="w-1 bg-primary-950 origin-top absolute top-0 left-10 hidden lg:block"
              style={{
                height: scrollBarHeight,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <ul className="list-none px-6" ref={headingsList}>
              {slices.map(
                (slice) =>
                  slice.slice_type === "text_content" && (
                    <PrismicRichText
                      key={slice.id}
                      field={slice.primary.content}
                      components={{
                        heading2: ({ node, key }) => (
                          <TocNavElement
                            node={node}
                            key={key}
                            level={1}
                            activeId={activeId}
                          />
                        ),
                        heading3: ({ node, key }) => (
                          <TocNavElement
                            node={node}
                            key={key}
                            level={2}
                            activeId={activeId}
                          />
                        ),
                        heading1: () => <></>,
                        paragraph: () => <></>,
                        preformatted: () => <></>,
                        strong: () => <></>,
                        em: () => <></>,
                        listItem: () => <></>,
                        oListItem: () => <></>,
                        list: () => <></>,
                        oList: () => <></>,
                        image: () => <></>,
                        embed: () => <></>,
                        hyperlink: () => <></>,
                      }}
                    />
                  )
              )}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

type TocNavElementProps = {
  node: RTNode;
  level: 1 | 2;
  activeId: null | string;
};

const TocNavElement = ({ node, level, activeId }: TocNavElementProps) => {
  if (!("text" in node) || !node.text) return null;

  const id = slugifyHeading(node);

  return (
    <li className="first:pt-0 last:pb-6 text-base py-2">
      <a
        href={`#${id}`}
        className={cn(
          "lg:ml-8 text-sm block trucnate transition-all duration-300 px-2",
          {
            "pl-2": level === 1,
            "pl-6": level === 2,
            "underline opacity-100": activeId === id,
            "opacity-50": activeId !== id,
          }
        )}
        style={{ maxWidth: "calc(100% - 1rem)" }}
      >
        {node.text}
      </a>
    </li>
  );
};
