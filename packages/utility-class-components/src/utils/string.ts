export const isNotEmptyString = (value: unknown) =>
  !!value && value !== "\n" && value !== "\t" && value !== "\r";
