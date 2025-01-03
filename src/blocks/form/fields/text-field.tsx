import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { TextField as ITextField } from "@payloadcms/plugin-form-builder/types";
import { useFormContext } from "react-hook-form";

type Props = {
  field: ITextField;
};

export const TextField = ({ field }: Props) => {
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
            <Input {...field} type="text" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
