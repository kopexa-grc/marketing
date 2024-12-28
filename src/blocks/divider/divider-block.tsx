import { Separator } from "@/components/ui/separator";
import type { DividerBlock as DividerProps } from "@/payload-types";

type Props = DividerProps;

export const DividerBlock = (_: Props) => {
  return (
    <div className="layout">
      <Separator className="col-span-full my-8 lg:my-12" />
    </div>
  );
};
