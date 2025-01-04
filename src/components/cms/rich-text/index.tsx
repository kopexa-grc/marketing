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

type Props = {
  content: SerializedEditorState;
  className?: string;
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
  });
  return jsxConverters;
};

export const RichText = ({ content, className }: Props) => {
  const locale = useLocale();

  return (
    <SerializedRichText
      converters={converters(locale)}
      className={cn(
        "max-w-none prose md:prose-md lg:prose-xl dark:prose-invert",
        className
      )}
      data={content}
    />
  );
};
