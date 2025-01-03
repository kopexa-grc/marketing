import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { TextAreaField as ITextAreaField } from "@payloadcms/plugin-form-builder/types";
import { useFormContext } from "react-hook-form";

type Props = {
  field: ITextAreaField;
};

export const TextareaField = ({ field }: Props) => {
  const { name, label, width } = field;

  const methods = useFormContext();

  return (
    <FormField
      control={methods.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className="w-full px-4"
          style={{
            maxWidth: width ? `${width}%` : "100%",
          }}
        >
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
