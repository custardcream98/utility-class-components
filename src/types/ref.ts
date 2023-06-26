export type ForwardRefExoticComponentTarget<ToC> = ToC extends React.ForwardRefExoticComponent<
  infer F
>
  ? F extends React.RefAttributes<infer R>
    ? R
    : never
  : never;
