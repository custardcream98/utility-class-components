import type { HTMLElementType } from "../types/dom";
import type { PropsOfForwardRefExoticComponent } from "../types/props";
import type { ForwardRefExoticComponentTarget } from "../types/ref";

export type InferedUtldForwardedComponentProps<C> = C extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[C]
  : PropsOfForwardRefExoticComponent<C>;

export type UtldForwardedComponentRef<ToC> = ToC extends keyof JSX.IntrinsicElements
  ? HTMLElementType<ToC>
  : ForwardRefExoticComponentTarget<ToC>;
