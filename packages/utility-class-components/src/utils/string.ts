export const isNotEmptyString = (value: unknown) =>
  !!value && value !== "\n" && value !== "\t" && value !== "\r";

export const matchAll = (regex: RegExp, str: string) => {
  const matches: RegExpExecArray[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
    matches.push(match);
  }

  return matches;
};
