"use client";

import { Paragraph } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TableOfContents {
  id: string | null;
  text: string;
}

interface TableOfContentsProps {
  items: TableOfContents[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Changed from forEach
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break; // Exit once we found the first intersecting element
          }
        }
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 1.0,
      }
    );

    // Observe all section headings
    for (const { id } of items) {
      // Changed from forEach
      const element = document.getElementById(`${id}`);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const { id } of items) {
        // Changed from forEach
        const element = document.getElementById(`${id}`);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [items]);

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const windowHeight = scrollHeight - clientHeight;
      const percentage = (scrollTop / windowHeight) * 100;
      setProgress(Math.round(percentage));
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="space-y-4">
      <Paragraph className="font-semibold text-lg">On this page</Paragraph>
      <div className="relative">
        {/* Progress bar - Now starts at the top of the navigation */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-muted">
          <div
            className="absolute left-0 top-0 w-full bg-primary transition-all duration-200"
            style={{ height: `${progress}%` }}
          />
        </div>

        <nav className="relative" aria-label="Table of contents">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  className={cn(
                    "block pl-4 py-2 text-sm transition-colors duration-200",
                    "hover:text-primary relative",
                    activeId === item.id
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                    // Active indicator
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`${item.id}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    });
                  }}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
