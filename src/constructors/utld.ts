/* eslint-disable @typescript-eslint/no-explicit-any */
import { DOM_ELEMENTS, type DomElements } from "../constants";
import type { ClassValue } from "../types";

import { cx } from "./cx";
import { ud } from "./ud";

import { type ComponentPropsWithoutRef, createElement, forwardRef } from "react";

const _utld = <C extends keyof JSX.IntrinsicElements | React.ComponentType<any>>(tag: C) => {
  const windStyle = (template: TemplateStringsArray, ...templateElements: ClassValue[]) => {
    const classToConcat = ud(template, ...templateElements);

    const TailwindComponent = forwardRef<any, ComponentPropsWithoutRef<C>>(
      function TailwindComponentForwarded({ children, className, ...restProps }, ref) {
        const style = cx(classToConcat, className);

        return createElement(tag, { className: style, ref, ...restProps }, children);
      },
    );

    return TailwindComponent;
  };

  return windStyle;
};

export type UtldReturntype = ReturnType<typeof _utld>;
export type UtldPredifined = Record<DomElements, UtldReturntype>;

const _utldPredifined = DOM_ELEMENTS.reduce<UtldPredifined>((obj, tag) => {
  obj[tag] = _utld(tag);
  return obj;
}, {} as UtldPredifined);

export const utld = Object.assign(_utld, _utldPredifined);
