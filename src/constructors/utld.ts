import { DOM_ELEMENT_TAGS_SET } from "../constants";
import type { SetElements } from "../types/set";
import { isForwardedComponent, isIntrinsicElementKey } from "../utils";

import { createUtldComponent, createUtldForwardedComponent } from "./create";

import React from "react";

/**
 * Core utld function
 *
 * @param component A React Component or HTML tag name
 * @returns utld component
 */
function _utld<FwC extends React.ForwardRefExoticComponent<any>>(
  forwardedComponent: FwC,
): ReturnType<typeof createUtldForwardedComponent<FwC>>;
function _utld<C extends React.JSXElementConstructor<any>>(
  component: C,
): ReturnType<typeof createUtldComponent<C>>;
function _utld<Tag extends keyof JSX.IntrinsicElements>(
  tag: Tag,
): ReturnType<typeof createUtldForwardedComponent<Tag>>;
function _utld<
  C extends
    | keyof JSX.IntrinsicElements
    | React.ForwardRefExoticComponent<any>
    | React.JSXElementConstructor<any>,
>(component: C) {
  if (isIntrinsicElementKey(component) || isForwardedComponent(component)) {
    return createUtldForwardedComponent(component);
  }

  return createUtldComponent(component);
}

/**
 * Predefined Utld HTML Components
 */
export type PredefinedUtldHTMLComponents = {
  [Tag in SetElements<typeof DOM_ELEMENT_TAGS_SET>]: ReturnType<
    typeof createUtldForwardedComponent<Tag>
  >;
};

export const utld = Object.assign(
  _utld,
  [...DOM_ELEMENT_TAGS_SET].reduce(
    (obj, tag) => ({
      ...obj,
      [tag]: createUtldForwardedComponent<typeof tag>(tag),
    }),
    {} as PredefinedUtldHTMLComponents,
  ),
);

const _predefinedUtldHTMLComponents = generatePredefinedUtldHTMLComponent();

export const utld = Object.assign(_utld, _predefinedUtldHTMLComponents);
