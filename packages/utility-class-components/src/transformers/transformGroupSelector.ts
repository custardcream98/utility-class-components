import { isNotEmptyString } from "../utils";

const GROUP_SELECTOR_REGEX =
  /([^\s]*[:-])(?!\[)\(((?![^()]*:\(|[^()]*-\()[^()]*(?:(?:\w\(.*?\))[^()]*)*)\)/g;

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
 *
 * @example
 * // You can use CSS parenthesis as arbitrary value
 * transformGroupSelector(`
 *   hover:(
 *     h-[calc(100vh-4rem)] p-8
 *   )
 * `) // "hover:h-[calc(100vh-4rem)] hover:p-8"
 */
export const transformGroupSelector = (styles: string): string => {
  const newStyle = styles.replace(GROUP_SELECTOR_REGEX, (_, prefix: string, group: string) => {
    const variants = group.split(/\s/).filter(isNotEmptyString);
    return variants.map((variant) => `${prefix}${variant}`).join(" ");
  });

  if (GROUP_SELECTOR_REGEX.test(newStyle)) {
    return transformGroupSelector(newStyle);
  }

  return newStyle.trim();
};
