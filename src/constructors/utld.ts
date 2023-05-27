/* eslint-disable @typescript-eslint/no-explicit-any */

import { DOM_ELEMENT_TAGS_SET } from "../constants";
import type { PropsOf, SetElements } from "../types/helper";
import { isIntrinsicElementKey } from "../utils";

import { createUtldComponent, createUtldHTMLComponent, UtldHtmlComponent } from "./create";

import React from "react";

const _utld = <C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>>(
  component: C,
) => {
  if (isIntrinsicElementKey(component)) {
    return createUtldHTMLComponent<typeof component>(component);
  }

  return createUtldComponent<React.ComponentType<PropsOf<C>>>(component);
};

type PredefinedUtldHTMLComponents = {
  [tag in SetElements<typeof DOM_ELEMENT_TAGS_SET>]: UtldHtmlComponent<tag>;
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
