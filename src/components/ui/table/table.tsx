import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export type TableRootProps = ComponentProps<"table">;

export const TableRoot = (props: TableRootProps) => {
  const { className, ...restProps } = props;

  return <table className={cn("w-full", className)} {...restProps} />;
};

export type TableHeaderProps = ComponentProps<"thead">;

export const TableHeader = (props: TableHeaderProps) => {
  const { className, ...restProps } = props;

  return <thead className={cn("", className)} {...restProps} />;
};

export type TableBodyProps = ComponentProps<"tbody">;

export const TableBody = (props: TableHeaderProps) => {
  const { className, ...restProps } = props;

  return <tbody className={cn("", className)} {...restProps} />;
};

export type TableRowProps = ComponentProps<"tr">;

export const TableRow = (props: TableRowProps) => {
  const { className, ...restProps } = props;

  return (
    <tr className={cn("border-b last:border-b-0", className)} {...restProps} />
  );
};

export type TableCellProps = ComponentProps<"td">;

export const TableCell = (props: TableCellProps) => {
  const { className, ...restProps } = props;

  return (
    <td
      className={cn(
        "border-r last:border-r-0 p-4 min-w-[240px] align-top",
        className
      )}
      {...restProps}
    />
  );
};
