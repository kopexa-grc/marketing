import { forwardRef, type ComponentProps, type ElementType } from "react";

export type BoxOwnProps<E extends ElementType = ElementType> = {
  as?: E;
};

export type BoxProps<E extends ElementType> = BoxOwnProps<E> &
  Omit<ComponentProps<E>, keyof BoxOwnProps>;

const defaultElement = "div";

export const Box: <E extends React.ElementType = typeof defaultElement>(
  props: BoxProps<E>
) => React.ReactNode | null = forwardRef(function Box(
  props: BoxOwnProps,
  ref: React.Ref<Element>
) {
  const Element = props.as || defaultElement;
  return <Element ref={ref} {...props} as={undefined} />;
});
