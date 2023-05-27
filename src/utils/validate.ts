import { DOM_ELEMENT_TAGS_SET } from "../constants";

export const isIntrinsicElementKey = (tag: unknown): tag is keyof JSX.IntrinsicElements => {
  if (typeof tag !== "string") {
    return false;
  }

  return (DOM_ELEMENT_TAGS_SET as Set<string>).has(tag);
};

export const isForwardedComponent = <T>(
  Component: React.ComponentType<T>,
): Component is React.ForwardRefExoticComponent<T> => {
  return "$$typeof" in Component && Component.$$typeof === Symbol.for("react.forward_ref");
};
