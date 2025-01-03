import type { FormFieldBlock } from "@payloadcms/plugin-form-builder/types";

type Fields = Exclude<FormFieldBlock, "PaymentField">;

export const buildInitialFormState = (fields: Fields[]) => {
  return fields?.reduce(
    (initialSchema, field) => {
      switch (field.blockType) {
        case "checkbox":
          initialSchema[field.name] = field.defaultValue;
          break;
        case "country":
        case "email":
        case "text":
        case "select":
        case "state":
          initialSchema[field.name] = "";
          break;
        default:
          break;
      }
      return initialSchema;
    },
    {} as Record<string, unknown>
  );
};
