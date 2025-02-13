import {
  PrismicRichText,
  type PrismicRichTextProps,
  type JSXMapSerializer,
} from "@prismicio/react";
import { headingRecipe } from "../recipes/heading-recipe";
import { PrismicNextLink } from "@prismicio/next";
import { slugifyHeading } from "./lib";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

export type RichTextProps = PrismicRichTextProps;

const baseComponents: JSXMapSerializer = {
  heading1: ({ children, node }) => (
    <h1
      className={headingRecipe({
        level: "h1",
      })}
      id={slugifyHeading(node)}
    >
      {children}
    </h1>
  ),
  heading2: ({ children, node }) => {
    return (
      <h2
        className={headingRecipe({
          level: "h2",
        })}
        id={slugifyHeading(node)}
      >
        {children}
      </h2>
    );
  },
  heading3: ({ children, node }) => {
    return (
      <h3
        className={headingRecipe({
          level: "h3",
        })}
        id={slugifyHeading(node)}
      >
        {children}
      </h3>
    );
  },
  heading5: ({ children, node }) => {
    return (
      <h5
        className={headingRecipe({
          level: "h5",
        })}
        id={slugifyHeading(node)}
      >
        {children}
      </h5>
    );
  },
  paragraph: ({ children }) => (
    <p className="my-6 first:mt-0 last:mb-0 print:my-2">{children}</p>
  ),
  oList: ({ children }) => (
    <ol className="mb-7 pl-4 last:mb-0 md:pl-6">{children}</ol>
  ),
  oListItem: ({ children }) => (
    <li className="mb-1 list-decimal pl-1 last:mb-0 md:pl-2">{children}</li>
  ),
  list: ({ children }) => <ul>{children}</ul>,
  listItem: ({ children }) => (
    <li
      className={cn(
        "relative",
        "my-6 first:mt-0 last:mb-0 print:my-2",
        "print:pl-6 pl-9"
      )}
    >
      <CheckCircle className="size-6 absolute left-0 top-0.5 text-primary" />
      {children}
    </li>
  ),
  preformatted: ({ children }) => (
    <pre className="mb-7 rounded bg-slate-100 p-4 text-sm last:mb-0 md:p-8 md:text-lg">
      <code>{children}</code>
    </pre>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  hyperlink: ({ children, node }) => (
    <PrismicNextLink
      field={node.data}
      className="underline decoration-1 underline-offset-2"
    >
      {children}
    </PrismicNextLink>
  ),
};

export const RichText = (props: RichTextProps) => {
  const { components, ...restProps } = props;

  return (
    <PrismicRichText
      {...restProps}
      components={{
        ...components,
        ...baseComponents,
      }}
    />
  );
};
