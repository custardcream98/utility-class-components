import { DOM_ELEMENT_TAGS_SET } from "../constants";
import type { SetElements } from "../types/helper";
import { isForwardedComponent, isIntrinsicElementKey } from "../utils";

import {
  createUtldComponent,
  createUtldForwardedComponent,
  type UtldComponent,
  type UtldForwardedComponent,
  type UtldHtmlForwardedComponent,
} from "./create";

import React from "react";

type UtldForwardedReturnType<
  C extends React.ForwardRefExoticComponent<any> | keyof JSX.IntrinsicElements,
> = C extends keyof JSX.IntrinsicElements
  ? UtldHtmlForwardedComponent<C>
  : C extends React.ForwardRefExoticComponent<infer _>
  ? UtldForwardedComponent<C>
  : never;

type UtldReturnType<
  C extends
    | keyof JSX.IntrinsicElements
    | React.ForwardRefExoticComponent<any>
    | React.JSXElementConstructor<any>,
> = C extends React.JSXElementConstructor<any>
  ? UtldComponent<C>
  : C extends keyof JSX.IntrinsicElements | React.ForwardRefExoticComponent<any>
  ? UtldForwardedReturnType<C>
  : never;

/**
 * Core utld function
 *
 * @param component A React Component or HTML tag name
 * @returns utld component
 */
function _utld<C extends React.JSXElementConstructor<any>>(component: C): UtldComponent<C>;
function _utld<C extends keyof JSX.IntrinsicElements | React.ForwardRefExoticComponent<any>>(
  component: C,
): UtldForwardedReturnType<C>;
function _utld<
  C extends
    | keyof JSX.IntrinsicElements
    | React.ForwardRefExoticComponent<any>
    | React.JSXElementConstructor<any>,
>(component: C) {
  if (isIntrinsicElementKey(component) || isForwardedComponent(component)) {
    return createUtldForwardedComponent(component) as UtldForwardedReturnType<typeof component>;
  }

  return createUtldComponent(component) as UtldReturnType<C>;

  // TODO: Fix type not to assert `as UtldReturnType<C>`
}

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
