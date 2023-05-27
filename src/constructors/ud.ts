import type { ClassValue } from "../types";

import { cx } from "./cx";

/**
 * Resolves template to style string
 */
export const ud = (template: TemplateStringsArray, ...templateElements: ClassValue[]) => {
  return template
    .reduce((sum, n, index) => {
      const templateElement = templateElements[index];

      if (!templateElement) {
        return `${sum} ${cx(n)}`;
      }

      return `${sum} ${cx(n)} ${cx(templateElement)}`;
    }, "")
    .replace(/\s{2,}/g, " ");
};
