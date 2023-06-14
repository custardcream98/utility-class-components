import type { ClassValueOrUtldTemplateCallback } from "../types";

import { cx } from "./cx";
import { ud } from "./ud";

/**
 * Resolve utld template to style string
 *
 * @param utldProps additional props for utld template callback
 * @param template template strings
 * @param templateElements utld template elements (can be a ClassValue or a callback function)
 * @param className className to concat
 * @returns resolved style
 */
export const getResolvedStyle = <AdditionalProps>(
  utldProps: AdditionalProps,
  template: TemplateStringsArray,
  templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>,
  className?: string,
): string => {
  const resolvedTemplateElements = templateElements.map((templateElement) => {
    if (typeof templateElement === "function") {
      const resolvedTemplateElement = templateElement(utldProps);
      if (typeof resolvedTemplateElement === "boolean") {
        return "";
      }
      return resolvedTemplateElement;
    }

    return templateElement;
  });

  const classToConcat = ud(template, ...resolvedTemplateElements);

  const style = cx(classToConcat, className);

  return style;
};
