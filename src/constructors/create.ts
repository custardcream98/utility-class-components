import type { ClassValueOrUtldTemplateCallback } from "../types";
import type { HTMLElementType } from "../types/dom";
import type { PropsOf, PropsOfForwardRefExoticComponent } from "../types/helper";

import { getResolvedStyle } from "./resolve";

import React from "react";

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
      const style = getResolvedStyle(
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
      const style = getResolvedStyle(
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

export type UtldForwardedComponent<FC extends React.ForwardRefExoticComponent<any>> = <
  AdditionalProps extends Record<string, any> = {},
>(
  template: TemplateStringsArray,
  ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PropsOfForwardRefExoticComponent<FC> & AdditionalProps> &
    React.RefAttributes<FC>
>;

export type UtldHtmlForwardedComponent<Tag extends keyof JSX.IntrinsicElements> = <
  AdditionalProps extends Record<string, any> = {},
>(
  template: TemplateStringsArray,
  ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
) => React.ForwardRefExoticComponent<
  React.PropsWithoutRef<React.ComponentProps<Tag> & AdditionalProps> &
    React.RefAttributes<HTMLElementType<Tag>>
>;

export type UtldComponent<C extends React.JSXElementConstructor<any>> = <
  AdditionalProps extends Record<string, any> = {},
>(
  template: TemplateStringsArray,
  ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
) => React.ComponentType<PropsOf<C> & AdditionalProps & { className?: string }>;
