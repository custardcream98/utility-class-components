export type HTMLElementType<Tag extends keyof JSX.IntrinsicElements> =
  JSX.IntrinsicElements[Tag] extends React.DetailedHTMLProps<infer _, infer E>
    ? E
    : JSX.IntrinsicElements[Tag] extends React.SVGProps<infer SE>
    ? SE
    : never;
