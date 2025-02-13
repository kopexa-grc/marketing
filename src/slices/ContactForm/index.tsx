import { useId } from "react";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { RichText } from "@/components/prismic/rich-text";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = ({ slice }: ContactFormProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-12 md:py-12 xl:py-24"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <RichText field={slice.primary.title} />
          <div className="text-base xl:text-lg font-medium print:text-sm print:text-justify mt-8 col-span-12 md:col-span-6 xl:col-span-4 xl:col-start-8">
            <RichText field={slice.primary.description} />
          </div>
        </div>
        <div>
          <form action="" className="space-y-6">
            {slice.primary.fields.map((item) => (
              <Field key={item.label} field={item} />
            ))}
            <Button type="submit">{slice.primary.submitButtonLabel}</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

type FieldProps = {
  field: Content.ContactFormSliceDefaultPrimaryFieldsItem;
};

function Field({ field }: FieldProps) {
  const id = useId();
  const name = camelCase(field.label ?? "");
  const placeholder = field.placeholder ?? undefined;

  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="font-semibold">
        {field.label}
      </Label>
      {field.type === "Textarea" ? (
        <Textarea name={name} id={id} placeholder={placeholder} />
      ) : (
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          type={field.type === "Email" ? "email" : "text"}
        />
      )}
    </div>
  );
}

function camelCase(input: string) {
  return input
    .toLowerCase()
    .replace(/(?:(^.)|(\s+.))/g, (match) =>
      match.charAt(match.length - 1).toUpperCase()
    );
}
