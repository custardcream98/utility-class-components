import { matchAll } from "../utils";

const GROUP_SELECTOR_REGEX = /([^\s]*[:-])\(([^)]{1,})\)/g;

/**
 * Transforms a variant group enclosed in parentheses to utility classes.
 *
 * @example
 *  transformGroupSelector("text-(blue-500 2) hover:(bg-red-400 p-8)");
 *  // "text-blue-500 text-2 hover:bg-red-400 hover:p-8"
 *
 * @example
 *  transformGropSelector(`
 *    text-(
 *      blue-500 2
 *    )
 *  `) // "text-blue-500 text-2"
 */
export const transformGroupSelector = (styles: string) => {
  const variantGroupMatches = matchAll(GROUP_SELECTOR_REGEX, styles);

  variantGroupMatches.forEach(([matchStr, selector, classes]) => {
    const parsedClasses = classes
      .split(/[\s\n]/)
      .filter((token) => !!token && token !== "\r")
      .map((cls) => `${selector}${cls}`)
      .join(" ");

    styles = styles.replace(matchStr, parsedClasses);
  });

  return styles;
};
