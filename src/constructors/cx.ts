import type { ClassValue } from "../types";
import { isNotEmptyString } from "../utils";

const _cxArrayToString = (target: ClassValue[]): string =>
  target.map((value) => cx(value)).join(" ");

export const cx = (...values: ClassValue[]): string => {
  return values
    .reduce<string>((sum, value) => {
      if (!value || !isNotEmptyString(value)) {
        return sum;
      }

      if (typeof value === "string" || typeof value === "number") {
        return `${sum} ${value}`;
      }
      if (Array.isArray(value)) {
        return `${sum} ${_cxArrayToString(value)}`;
      }

      throw new Error(`cx error - Unhandled value type: ${value}`);
    }, "")
    .trim()
    .split(" ")
    .filter((token) => isNotEmptyString(token))
    .join(" ");
};
