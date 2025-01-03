import type { Form } from "@/payload-types";
import { z, type ZodType, type ZodTypeDef } from "zod";

export const buildFieldValidation = (
  field: NonNullable<Form["fields"]>[number]
) => {
  let schema: ZodType<unknown, ZodTypeDef, unknown>;

  switch (field.blockType) {
    case "text":
      schema = field.required
        ? z
            .string({ required_error: "This field is required" })
            .min(1, "This field is required")
        : z.string().optional();
      break;

    case "email":
      schema = field.required
        ? z
            .string({ required_error: "This field is required" })
            .min(1, "This field is required")
            .email("Invalid email address")
        : z.string().email("Invalid email address").optional();
      break;

    case "number":
      schema = field.required
        ? z.number({ required_error: "This field is required" })
        : z.number().optional();
      if (field.defaultValue) {
        schema = schema.default(field.defaultValue);
      }
      break;

    case "checkbox":
      schema = field.required
        ? z.boolean({ required_error: "This field is required" })
        : z.boolean().optional();
      if (field.defaultValue !== undefined) {
        schema = schema.default(field.defaultValue);
      }
      break;

    case "select":
      if (field.options && field.options.length > 0) {
        const enumSchema = z.enum(
          field.options.map((opt) => opt.value) as [string, ...string[]],
          { required_error: "This field is required" }
        );
        schema = field.required ? enumSchema : enumSchema.optional();
        if (field.defaultValue) {
          schema = schema.default(field.defaultValue);
        }
      } else {
        schema = field.required
          ? z
              .string({ required_error: "This field is required" })
              .min(1, "This field is required")
          : z.string().optional();
      }
      break;

    case "textarea": {
      // For textarea, we need to explicitly handle empty strings
      const baseSchema = z.string().trim();

      if (field.required) {
        schema = baseSchema.min(1, "This field is required");
      } else {
        // For optional textarea, empty string should be converted to undefined
        schema = baseSchema
          .transform((val) => (val === "" ? undefined : val))
          .optional();
      }

      if (field.defaultValue) {
        schema = schema.default(field.defaultValue);
      }
      break;
    }

    case "country":
      schema = field.required
        ? z
            .string({ required_error: "This field is required" })
            .min(1, "This field is required")
        : z.string().optional();
      break;

    case "state":
      schema = field.required
        ? z
            .string({ required_error: "This field is required" })
            .min(1, "This field is required")
        : z.string().optional();
      break;

    case "message":
      return null;
  }

  return schema;
};

export const buildFormValidation = (form: NonNullable<Form> | number) => {
  if (typeof form === "number") return z.object({});
  if (!form.fields) return z.object({});

  const shape = form.fields.reduce(
    (acc, field) => {
      // Skip message blocks and fields without names
      if (field.blockType === "message" || !field.name) return acc;

      const fieldSchema = buildFieldValidation(field);
      if (fieldSchema) {
        acc[field.name] = fieldSchema;
      }

      return acc;
    },
    {} as Record<string, z.ZodType>
  );

  return z.object(shape);
};

export const createFormValidation = (form: Form | number) => {
  const schema = buildFormValidation(form);

  return {
    schema,
    validate: (data: unknown) => schema.safeParse(data),
    validateAsync: (data: unknown) => schema.safeParseAsync(data),
  };
};
