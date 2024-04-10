import type { ClassValueOrUtldTemplateCallback } from "../types";

import { ud } from "./ud";

/**
 * Resolve utld template elements
 *
 * @param utldProps additional props for utld template callback
 * @param templateElements utld template elements (can be a ClassValue or a callback function)
 * @returns resolved utld template elements
 */
const getResolvedTemplateElements = <AdditionalProps extends Record<string, any>>(
  utldProps: AdditionalProps,
  templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>,
) => {
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

  return resolvedTemplateElements;
};

/**
 * Resolve utld template to style string
 *
 * @param utldProps additional props for utld template callback
 * @param template template strings
 * @param templateElements utld template elements (can be a ClassValue or a callback function)
 * @returns resolved style
 */
export const getResolvedStyle = <AdditionalProps extends Record<string, any>>(
  utldProps: AdditionalProps,
  template: TemplateStringsArray,
  templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>,
): string => {
  const resolvedTemplateElements = getResolvedTemplateElements(utldProps, templateElements);

  const resolvedStyle = ud(template, ...resolvedTemplateElements);

  return resolvedStyle;
};

/**
 * Resolve props that are not utld props.
 *
 * Utld props are props that starts with "$".
 *
 * This feature is useful when you do not want props to be rendered to the DOM element or to be passed to the underlying React component.
 *
 * @example
 * ```tsx
 * const props = {
 *   $className: "text-red-500",
 *   className: "text-blue-500",
 * };
 *
 * const resolvedProps = getResolvedProps(props);
 * // resolvedProps = { className: "text-blue-500" }
 * ```
 *
 * @param props given props
 * @returns resolved props (without utld props)
 */
export const getResolvedProps = <ResolvedProps extends Record<string, any>>(
  props: Record<string, any>,
) => {
  const keys = Object.keys(props);

  const resolvedProps = keys.reduce((acc, key) => {
    const isUtldProp = key.startsWith("$");
    if (isUtldProp) {
      return acc;
    }

    return {
      ...acc,
      [key]: props[key],
    };
  }, {} as ResolvedProps);

  return resolvedProps;
};
