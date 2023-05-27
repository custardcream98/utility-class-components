export type ClassValue = ClassArray | string | number | null | boolean | undefined;

export type ClassArray = ClassValue[];

export type UtldTemplateCallback<AdditionalProps> = (props: AdditionalProps) => string;

/**
 * utld template element can be a ClassValue or a callback function
 */
export type ClassValueOrUtldTemplateCallback<AdditionalProps> =
  | ClassValue
  | UtldTemplateCallback<AdditionalProps>;
