import type { ClassValueOrUtldTemplateCallback } from "../types";
import type { HTMLElementType } from "../types/dom";
import type { PropsOf } from "../types/helper";

import { getResolvedProps, getResolvedStyle } from "./resolve";

import React from "react";

export const createUtldComponent = <C extends React.JSXElementConstructor<any>>(component: C) => {
  return <AdditionalProps extends Record<string, any> = {}>(
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

      const resolvedProps = getResolvedProps<PropsOf<C>>(restProps);

      return React.createElement<PropsOf<C>>(
        component,
        { className: style, ...resolvedProps },
        children,
      );
    };

    return UtldComponent;
  };
};

export const createUtldForwardedComponent = <
  ToC extends React.ForwardRefExoticComponent<any> | keyof JSX.IntrinsicElements,
  DefaultProps = ToC extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[ToC]
    : ToC extends React.ForwardRefExoticComponent<infer P>
    ? P
    : never,
>(
  tagOrComponent: ToC,
) => {
  return <AdditionalProps extends Record<string, any> = {}>(
    template: TemplateStringsArray,
    ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
  ) => {
    return React.forwardRef<
      ToC extends keyof JSX.IntrinsicElements ? HTMLElementType<ToC> : ToC,
      DefaultProps & AdditionalProps
    >(function UtldComponentForwarded({ children, className, ...restProps }, ref) {
      const style = getResolvedStyle(
        restProps as unknown as AdditionalProps,
        template,
        templateElements,
        className,
      );

      const resolvedProps = getResolvedProps<React.ComponentProps<ToC>>(restProps);

      return React.createElement(
        tagOrComponent,
        {
          className: style,
          ref,
          ...resolvedProps,
        },
        children,
      );
    });
  };
};
