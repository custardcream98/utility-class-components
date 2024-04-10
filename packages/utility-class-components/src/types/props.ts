export type PropsWithRef<Props, RefTarget> = React.PropsWithoutRef<Props> &
  React.RefAttributes<RefTarget>;

export type ClassNameAttributes = {
  className?: string | undefined;
};

export type PropsOf<C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>> =
  JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>;

export type PropsOfForwardRefExoticComponent<C> = C extends React.ForwardRefExoticComponent<infer P>
  ? P
  : never;
