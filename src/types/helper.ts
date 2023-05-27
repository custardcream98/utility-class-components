/* eslint-disable @typescript-eslint/no-explicit-any */

export type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  C extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[C]
    : C extends React.JSXElementConstructor<infer P>
    ? P
    : never;

export type SetElements<TargetSet> = TargetSet extends Set<infer Element> ? Element : never;

export type PropsOfForwardRefExoticComponent<T> = T extends React.ForwardRefExoticComponent<infer P>
  ? P
  : never;
