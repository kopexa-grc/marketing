import { cn } from "@/lib/utils";
import { RichText as SerializedRichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";

type Props = {
  content: SerializedEditorState;
  className?: string;
};

export const RichText = ({ content, className }: Props) => {
  return (
    <SerializedRichText
      className={cn(
        "max-w-none prose md:prose-md lg:prose-xl dark:prose-invert",
        className
      )}
      data={content}
    />
  );
};
