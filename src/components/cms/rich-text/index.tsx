import { cn } from "@/lib/utils";
import type {
  DefaultNodeTypes,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical";
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as SerializedRichText,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";
import { generateHref, type Reference } from "../cms-link";
import { useLocale } from "next-intl";
import type { JSX } from "react";
import { slugify } from "@/lib/slugify";
import { formatAnchor } from "./format-anchor";

type Props = {
  content: SerializedEditorState;
  className?: string;
  size?: "default" | "sm" | "md" | "lg" | "xl";
};

type NodeTypes = DefaultNodeTypes;

const internalDocToHref = (locale: string) => {
  return ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    if (!linkNode.fields.doc) return "";
    const { value, relationTo } = linkNode.fields.doc;
    if (typeof value !== "object") {
      throw new Error("Expected value to be an object");
    }

    const href = generateHref({
      type: linkNode.fields.linkType === "internal" ? "reference" : "custom",
      reference: {
        relationTo: relationTo,
        value: {
          breadcrumbs: value.breadcrumbs,
        },
      } as Reference,
    });

    return href ? `/${locale}${href}` : "";
  };
};

const converters = (locale: string) => {
  const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
    defaultConverters,
  }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref: internalDocToHref(locale) }),
    heading: ({ node, nodesToJSX }) => {
      const children = nodesToJSX({
        nodes: node.children,
      });

      // @ts-expect-error its available.
      const childrenText = node.children?.[0]?.text as string;
      const anchor = slugify(formatAnchor(childrenText));

      const Tag = node.tag as keyof JSX.IntrinsicElements;

      return <Tag id={anchor}>{children}</Tag>;
    },
  });
  return jsxConverters;
};

export const RichText = ({ content, className, size = "xl" }: Props) => {
  const locale = useLocale();

  const proseSize = {
    default: "prose",
    sm: "prose-sm",
    md: "prose md:prose-md",
    lg: "prose md:prose-md lg:prose-lg",
    xl: "prose md:prose-md lg:prose-xl",
  }[size];

  return (
    <SerializedRichText
      converters={converters(locale)}
      className={cn("max-w-none", proseSize, " dark:prose-invert", className)}
      data={content}
    />
  );
};
