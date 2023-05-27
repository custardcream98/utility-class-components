import { transformGroupSelector } from "../transformers";
import type { ClassValue } from "../types";

import { cx } from "./cx";

/**
 * Resolves template to style string
 */
export const ud = (template: TemplateStringsArray, ...templateElements: ClassValue[]) => {
  return template
    .reduce((sum, templateString, index) => {
      const transformedTemplateString = transformGroupSelector(templateString);
      const templateElement = templateElements[index];

      if (!templateElement) {
        return `${sum} ${cx(transformedTemplateString)}`;
      }

      return `${sum} ${cx(transformedTemplateString)} ${cx(templateElement)}`;
    }, "")
    .replace(/\s{2,}/g, " ");
};
