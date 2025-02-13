import { RichText } from "@/components/prismic/rich-text";
import { Table } from "@/components/ui/table";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { match } from "ts-pattern";

/**
 * Props for `LegalTable`.
 */
export type LegalTableProps = SliceComponentProps<Content.LegalTableSlice>;

/**
 * Component for "LegalTable" Slices.
 */
const LegalTable = ({ slice }: LegalTableProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-12"
    >
      <div className="container">
        {slice.primary.table_title && (
          <div className="max-w-4xl mx-auto text-foreground pb-12">
            <div className="text-base xl:text-lg font-medium print:text-xs print:text-justify">
              <RichText field={slice.primary.table_title} />
            </div>
          </div>
        )}
        <div className="max-w-4xl mx-auto border rounded-xl overflow-auto">
          {match(slice)
            .with({ variation: "default" }, (slice) => (
              <Table.Root>
                <Table.Body>
                  {slice.items?.map((item, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <Table.Row key={`cell-${index}`}>
                      <Table.Cell>
                        <RichText field={item.cell} />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            ))
            .with({ variation: "twoColumn" }, (slice) => (
              <Table.Root>
                <Table.Body>
                  {slice.items?.map((item, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <Table.Row key={`cell-${index}`}>
                      <Table.Cell>
                        <RichText field={item.cell} />
                      </Table.Cell>
                      <Table.Cell>
                        <RichText field={item.cellTwo} />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            ))
            .exhaustive()}
        </div>
      </div>
    </section>
  );
};

export default LegalTable;
