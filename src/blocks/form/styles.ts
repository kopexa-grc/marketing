import { tv } from "tailwind-variants";

export const formBlock = tv({
  slots: {
    section: "pt-xhuge",
    container: "layout",
    contentWrapper: "col-span-full lg:col-span-6",
    formWrapper:
      "col-span-full lg:col-span-6 p-4 md:p-6 lg:p-8 bg-accent rounded-2xl",
    content: "col-span-full lg:col-span-6 space-y-6",
    header: "space-y-4",
  },
  variants: {
    contentLayout: {
      none: {},
      left: {
        contentWrapper: "lg:order-1",
        formWrapper: "lg:order-2",
      },
      right: {
        contentWrapper: "lg:order-2",
        formWrapper: "lg:order-1",
      },
    },
  },
});
