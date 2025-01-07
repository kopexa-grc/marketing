/* eslint-disable @typescript-eslint/no-explicit-any */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function extractChildren(node: any): string {
  if (node.props?.children) {
    if (typeof node.props.children === "string") {
      return node.props.children;
    }

    if (typeof node.props.children === "object") {
      return extractChildren(node.props.children);
    }
  }
  return "";
}

const flattenChildren: (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  value: { props: { children: any } } | string
) => string = (value) => {
  if (typeof value === "string") {
    return value;
  }

  // Extract a deeply nested string from a Lexical node
  const stringValue = extractChildren(value);

  if (typeof stringValue === "string") {
    return stringValue;
  }

  return value.props.children;
};

export const formatAnchor: (children: string | string[]) => string = (
  children
) => {
  if (Array.isArray(children)) {
    return children.map(flattenChildren).join("");
  }

  if (typeof children === "string" && children.includes("#")) {
    return children.split("#")[1];
  }
  return flattenChildren(children);
};
