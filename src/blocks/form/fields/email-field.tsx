import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { EmailField as IEmailField } from "@payloadcms/plugin-form-builder/types";
import { useFormContext } from "react-hook-form";

type Props = {
  //field: NonNullable<Form["fields"]>[number];
  field: IEmailField;
};

export const EmailField = ({ field }: Props) => {
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
            <Input {...field} type="email" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
