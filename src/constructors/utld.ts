/* eslint-disable @typescript-eslint/no-explicit-any */

import { DOM_ELEMENT_TAGS_SET } from "../constants";
import type { PropsOf, SetElements } from "../types/helper";
import { isIntrinsicElementKey } from "../utils";

import {
  createUtldComponent,
  createUtldHTMLComponent,
  type UtldTaggedHtmlComponent,
} from "./create";

import React from "react";

/**
 * Core utld function
 *
 * @param component A React Component or HTML tag name
 * @returns utld component
 */
const _utld = <C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>>(
  component: C,
) => {
  if (isIntrinsicElementKey(component)) {
    return createUtldHTMLComponent<typeof component>(component);
  }

  return createUtldComponent<React.ComponentType<PropsOf<C>>>(component);
};

/**
 * Predefined Utld HTML Components
 */
export type PredefinedUtldHTMLComponents = {
  [tag in SetElements<typeof DOM_ELEMENT_TAGS_SET>]: UtldTaggedHtmlComponent<tag>;
};

const generatePredefinedUtldHTMLComponent = () => {
  return [...DOM_ELEMENT_TAGS_SET].reduce(
    (obj, tag) => ({
      ...obj,
      [tag]: createUtldHTMLComponent(tag),
    }),
    {} as PredefinedUtldHTMLComponents,
  );
};

const _predefinedUtldHTMLComponents = generatePredefinedUtldHTMLComponent();

export const utld = Object.assign(_utld, _predefinedUtldHTMLComponents);
