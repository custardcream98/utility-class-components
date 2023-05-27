/* eslint-disable @typescript-eslint/no-explicit-any */

import { DOM_ELEMENT_TAGS_SET } from "../constants";
import type { PropsOf, SetElements } from "../types/helper";
import { isForwardedComponent, isIntrinsicElementKey } from "../utils";

import {
  createUtldComponent,
  createUtldForwardedComponent,
  type UtldHtmlForwardedComponent,
} from "./create";

import React from "react";

/**
 * Core utld function
 *
 * @param component A React Component or HTML tag name
 * @returns utld component
 */
const _utld = <
  C extends
    | keyof JSX.IntrinsicElements
    | React.ForwardRefExoticComponent<any>
    | React.JSXElementConstructor<any>,
>(
  component: C,
) => {
  if (isIntrinsicElementKey(component) || isForwardedComponent(component)) {
    return createUtldForwardedComponent<typeof component>(component);
  }

  return createUtldComponent<React.ComponentType<PropsOf<C>>>(component);
};

/**
 * Predefined Utld HTML Components
 */
export type PredefinedUtldHTMLComponents = {
  [Tag in SetElements<typeof DOM_ELEMENT_TAGS_SET>]: UtldHtmlForwardedComponent<Tag>;
};

const generatePredefinedUtldHTMLComponent = () => {
  return [...DOM_ELEMENT_TAGS_SET].reduce(
    (obj, tag) => ({
      ...obj,
      [tag]: createUtldForwardedComponent(tag),
    }),
    {} as PredefinedUtldHTMLComponents,
  );
};

const _predefinedUtldHTMLComponents = generatePredefinedUtldHTMLComponent();

export const utld = Object.assign(_utld, _predefinedUtldHTMLComponents);
