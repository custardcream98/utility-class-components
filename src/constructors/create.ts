/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ClassValueOrUtldTemplateCallback } from "../types";
import type { HTMLElementType } from "../types/dom";
import type { PropsOf, PropsOfForwardRefExoticComponent } from "../types/helper";

import { cx } from "./cx";
import { ud } from "./ud";

import React from "react";

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
      return templateElement(utldProps);
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

export type UtldHtmlForwardedComponent<Tag extends keyof JSX.IntrinsicElements> = <
  AdditionalProps extends Record<string, any> = {},
>(
  template: TemplateStringsArray,
  ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.ComponentProps<Tag> & AdditionalProps> &
    React.RefAttributes<HTMLElementType<Tag>>
>;

export type UtldForwardedComponent<FC extends React.ForwardRefExoticComponent<any>> = <
  AdditionalProps extends Record<string, any> = {},
>(
  template: TemplateStringsArray,
  ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PropsOfForwardRefExoticComponent<FC> & AdditionalProps> &
    React.RefAttributes<FC>
>;

export type UtldComponent<C extends React.JSXElementConstructor<any>> = <
  AdditionalProps extends Record<string, any> = {},
>(
  template: TemplateStringsArray,
  ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
) => React.ComponentType<PropsOf<C> & AdditionalProps & { className?: string }>;

export const createUtldForwardedComponent =
  <
    ToC extends React.ForwardRefExoticComponent<any> | keyof JSX.IntrinsicElements,
    DefaultProps = ToC extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[ToC]
      : ToC extends React.ForwardRefExoticComponent<infer P>
      ? P
      : never,
  >(
    tagOrComponent: ToC,
  ) =>
  <AdditionalProps extends Record<string, any> = {}>(
    template: TemplateStringsArray,
    ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<DefaultProps & AdditionalProps> &
      React.RefAttributes<ToC extends keyof JSX.IntrinsicElements ? HTMLElementType<ToC> : ToC>
  > =>
    React.forwardRef<
      ToC extends keyof JSX.IntrinsicElements ? HTMLElementType<ToC> : ToC,
      DefaultProps & AdditionalProps
    >(function UtldComponentForwarded({ children, className, ...restProps }, ref) {
      const style = _getResolvedStyle(
        restProps as unknown as AdditionalProps,
        template,
        templateElements,
        className,
      );

      return React.createElement<
        ToC extends keyof JSX.IntrinsicElements
          ? JSX.IntrinsicElements[ToC]
          : PropsOfForwardRefExoticComponent<ToC>
      >(
        tagOrComponent,
        {
          className: style,
          ref,
          ...restProps,
        } as React.ComponentProps<ToC>,
        children,
      );
    });
