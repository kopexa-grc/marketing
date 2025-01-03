import type { Form } from "@/payload-types";
import { memo } from "react";
import { EmailField } from "./email-field";
import type {
  EmailField as IEmailField,
  TextField as ITextField,
  TextAreaField as ITextAreaField,
} from "@payloadcms/plugin-form-builder/types";
import { TextField } from "./text-field";
import { TextareaField } from "./textarea-field";

type Fields = Form["fields"];

export const RenderFields = memo(({ fields }: { fields: Fields }) => {
  const renderField = (field: NonNullable<Fields>[number]) => {
    switch (field.blockType) {
      case "email": {
        return <EmailField key={field.id} field={field as IEmailField} />;
      }
      case "text": {
        return <TextField key={field.id} field={field as ITextField} />;
      }
      case "textarea": {
        return <TextareaField key={field.id} field={field as ITextAreaField} />;
      }
      default: {
        return null;
      }
    }
  };

  return fields?.map((field) => renderField(field)) ?? null;
});

RenderFields.displayName = "RenderFields";
