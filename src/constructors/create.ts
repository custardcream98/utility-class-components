import type { ClassValueOrUtldTemplateCallback } from "../types";
import type { ClassNameAttributes, PropsOf } from "../types/props";

import type { InferedUtldForwardedComponentProps, UtldForwardedComponentRef } from "./_types";
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
    }: React.PropsWithChildren<PropsOf<C> & AdditionalProps & ClassNameAttributes>) => {
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
>(
  tagOrComponent: ToC,
) => {
  return <AdditionalProps extends Record<string, any> = {}>(
    template: TemplateStringsArray,
    ...templateElements: Array<ClassValueOrUtldTemplateCallback<AdditionalProps>>
  ) => {
    return React.forwardRef<
      UtldForwardedComponentRef<ToC>,
      InferedUtldForwardedComponentProps<ToC> & AdditionalProps
    >(function UtldComponentForwarded({ children, className, ...restProps }, ref) {
      const style = getResolvedStyle(
        restProps as unknown as AdditionalProps,
        template,
        templateElements,
        className,
      );

      const resolvedProps = getResolvedProps<InferedUtldForwardedComponentProps<ToC>>(restProps);

      return React.createElement<InferedUtldForwardedComponentProps<ToC>>(
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
