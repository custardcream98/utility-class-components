import { isNotEmptyString, matchAll } from "../utils";

const GROUP_SELECTOR_REGEX = /([^\s]*[:-])\(((?![^)]*:\(|[^)]*-\()[^)]*)\)/g;

/**
 * Transforms a variant group enclosed in parentheses to utility classes.
 *
 * @example
 *  transformGroupSelector("text-(blue-500 2) hover:(bg-red-400 p-8)");
 *  // "text-blue-500 text-2 hover:bg-red-400 hover:p-8"
 *
 * @example
 *  transformGroupSelector(`
 *    text-(
 *      blue-500 2
 *    )
 *  `) // "text-blue-500 text-2"
 *
 * @example
 *  // You can also nest variant groups:
 *  transformGroupSelector(`
 *    hover:(
 *      bg-red-400 p-8
 *      dark:(bg-red-500 text-white)
 *    )
 *  `) // "hover:bg-red-400 hover:p-8 hover:dark:bg-red-500 hover:dark:text-white"
 */
export const transformGroupSelector = (styles: string) => {
  let variantGroupMatches: RegExpMatchArray[];
  while ((variantGroupMatches = matchAll(GROUP_SELECTOR_REGEX, styles)).length) {
    variantGroupMatches.forEach(([matchStr, selector, classes]) => {
      const parsedClasses = classes
        .split(/[\s\n]/)
        .filter(isNotEmptyString)
        .map((cls) => `${selector}${cls}`)
        .join(" ");

      styles = styles.replace(matchStr, parsedClasses);
    });
  }

  return styles;
};
