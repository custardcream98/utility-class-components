import { DOM_ELEMENT_TAGS_SET } from "../constants";

export const isIntrinsicElementKey = (tag: unknown): tag is keyof JSX.IntrinsicElements => {
  if (typeof tag !== "string") {
    return false;
  }

  return (DOM_ELEMENT_TAGS_SET as Set<string>).has(tag);
};
