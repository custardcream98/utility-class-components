/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ClassValue } from "../types";
import type { PropsOf } from "../types/helper";

import { cx } from "./cx";
import { ud } from "./ud";

import React from "react";

export type UtldTemplateCallback<AdditionalProps> = (props: AdditionalProps) => string;
/**
 * utld template element can be a ClassValue or a callback function
 */
export type ClassValueOrUtldTemplateCallback<AdditionalProps> =
  | ClassValue
  | UtldTemplateCallback<AdditionalProps>;

/**
 * Resolve utld template to style string
 *
 * @param utldProps additional props for utld template callback
 * @param template template strings
 * @param templateElements utld template elements (can be a ClassValue or a callback function)
 * @param className className to concat
 * @returns resolved style
 */
const _getResolvedStyle = <AdditionalProps>(
  utldProps: AdditionalProps,
  template: TemplateStringsArray,
  templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>,
  className?: string,
): string => {
  const resolvedTemplateElements = templateElements.map((templateElement) => {
    if (typeof templateElement === "function") {
      return templateElement(utldProps as unknown as AdditionalProps);
    }

    return templateElement;
  });

  const classToConcat = ud(template, ...resolvedTemplateElements);

  const style = cx(classToConcat, className);

  return style;
};

export const createUtldComponent =
  <C extends React.JSXElementConstructor<any>>(component: C) =>
  <AdditionalProps extends Record<string, any> = {}>(
    template: TemplateStringsArray,
    ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
  ) => {
    const UtldComponent = ({
      children,
      className,
      ...restProps
    }: React.PropsWithChildren<PropsOf<C> & AdditionalProps & { className?: string }>) => {
      const style = _getResolvedStyle(
        restProps as unknown as AdditionalProps,
        template,
        templateElements,
        className,
      );

      return React.createElement<PropsOf<C>>(
        component,
        { className: style, ...(restProps as unknown as PropsOf<C>) },
        children,
      );
    };

    return UtldComponent;
  };

export type UtldTaggedHtmlComponent<Tag extends keyof JSX.IntrinsicElements> = <
  AdditionalProps extends Record<string, any> = {},
>(
  template: TemplateStringsArray,
  ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.PropsWithoutRef<React.ComponentProps<Tag>> & AdditionalProps> &
    React.RefAttributes<JSX.IntrinsicElements[Tag]>
>;

export const createUtldHTMLComponent =
  <Tag extends keyof JSX.IntrinsicElements>(tag: Tag) =>
  <AdditionalProps extends Record<string, any> = {}>(
    template: TemplateStringsArray,
    ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.PropsWithoutRef<React.ComponentProps<Tag>> & AdditionalProps> &
      React.RefAttributes<JSX.IntrinsicElements[Tag]>
  > =>
    React.forwardRef<
      JSX.IntrinsicElements[Tag],
      React.ComponentPropsWithoutRef<Tag> & AdditionalProps
    >(function UtldComponentForwarded({ children, className, ...restProps }, ref) {
      const style = _getResolvedStyle(
        restProps as unknown as AdditionalProps,
        template,
        templateElements,
        className,
      );

      return React.createElement<React.ComponentProps<Tag>>(
        tag,
        { className: style, ref, ...(restProps as unknown as React.ComponentProps<Tag>) },
        children,
      );
    });
