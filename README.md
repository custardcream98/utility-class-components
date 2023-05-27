# utility-class-components

Build React components using utility classes in the `styled-components` way!

```tsx
import { utld, ud } from "utility-class-components";

const boxStyle = ud`
  w-[100px]
  h-[100px]

  bg-red
`;

const Container = utld.div<{ isRed: boolean }>`
  flex
  text-bold

  ${boxStyle}

  ${({ isRed }) => isRed && "text-red-500"}
`;

function Page() {
  return <Container isRed={true}>AWESOME!!</Container>;
}
```

---

## Installation

This package is published on [npm registry](https://www.npmjs.com/package/utility-class-components).

```shell
npm i utility-class-components
# or yarn add utility-class-components
```

## Table Of Contents

- [utility-class-components](#utility-class-components)
  - [Installation](#installation)
- [Utility Class](#utility-class)
- [Usage](#usage)
  - [`utld`](#-utld-)
  - [`ud`](#-ud-)
  - [Array Styles](#array-styles)
  - [Pass Props to Component](#pass-props-to-component)
  - [Handle `ForwardRefExoticComponent`](#handle--forwardrefexoticcomponent-)
- [Setting up](#setting-up)
  - [Setting up Tailwind CSS IntelliSense for `utility-class-components`](#setting-up-tailwind-css-intellisense-for--utility-class-components-)
- [Experimental Features](#experimental-features)
  - [Experimental Feature: Grouping Variants](#experimental-feature--grouping-variants)

# Utility Class

You can use any library you want: TailwindCSS, UnoCSS, WindiCSS.

However, unlike CSS-in-JS libraries, **you can't use dynamic styles**. Due to the limitations of utility class libraries, it is not possible to create dynamic style classes.

# Usage

## `utld`

```ts
import { utld } from "utility-class-components";

const Container = utld.div`
  flex
  text-bold
`;

// You can also extend the style of other React components.
const RedContainer = utld(Container)`
  bg-red-500
`;
```

## `ud`

```ts
import { utld, ud } from "utility-class-components";

const commonStyle = ud`
  text-red-500
  hover:text-blue-500
`;

// You can nest `ud` inside other `ud` or `utld`.
const Container = utld.div`
  ${ud`
    text-red-500
    hover:text-blue-500

    ${ud`
      w-[100px]
      h-[100px]
    `}
  `}
`;
```

## Array Styles

You can use array in all template literals.

```ts
const Container = utld.div`
  ${["flex flex-col", "text-red-500"]}
`;
```

You can also use nested arrays.

```ts
const Container = utld.div`
  ${["flex flex-col", ["text-bold", "text-red-500"]]}
`;
```

## Pass Props to Component

You can pass props to the `utld` component using generics.

```tsx
const Container = utld.div<{ type: "red" | "blue" }>`
  ${({ type }) => (type === "red" ? "bg-red-500" : "bg-blue-500")}
  w-[100px]
  h-[100px]
`;

const Page = () => {
  return <Container type='red'>Hello</Container>;
};
```

This also can be done using another React component.

```tsx
const Box = ({ className }: { className?: string }) => {
  return <div>Hello</div>;
};

const Container = utld(Box)<{ type: "red" | "blue" }>`
  ${({ type }) => (type === "red" ? "bg-red-500" : "bg-blue-500")}
  w-[100px]
  h-[100px]
`;

const Page = () => {
  return <Container type='red'>Hello</Container>;
};
```

> Currently, this feature is not available in `ud`.

## Handle `ForwardRefExoticComponent`

You can also pass a `ForwardRefExoticComponent` to `utld`, which can be created using `React.forwardRef`.

```tsx
const ForwardedInput = React.forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  },
);

const Input = utld(ForwardedInput)`
  bg-red-500
`;

const Page = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return <Input ref={inputRef} />;
};
```

---

# Setting up

## Setting up Tailwind CSS IntelliSense for `utility-class-components`

If you have installed the ["Tailwind CSS IntelliSense"](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extenstion in VSCode, you can enable autocompletion inside `utld` and `ud`.

Add the following to your `settings.json`:

```json
{
  "tailwindCSS.experimental.classRegex": [
    "utld(?:\\.[a-z0-9]*|\\([^)]*\\))(?:<[^>]*>|)`([^`]*)`",
    "ud`([^`]*)`"
  ]
}
```

---

# Experimental Features

## Experimental Feature: Grouping Variants

You can group variants like this:

```ts
export const Link = utld.a`
  hover:(text-accent-light dark:text-accent-dark)
`;

// You can also break lines
export const Box = utld.div`
  hover:(
    text-accent-light
    dark:text-accent-dark
  )
`;
```

This will be transformed into `"transition-colors hover:text-accent-light hover:dark:text-accent-dark)"` **in runtime**.

To enable this feature, **you need to add a transformer** to the utility class library you are using. This transformer will allow the library to generate styles for `hover:text-accent-light hover:dark:text-accent-dark`.

For example, if you are using TailwindCSS, you can add the following code to `tailwind.config.js`.

```js
const { transformGroupSelector } = require("utility-class-components");

module.exports = {
  content: {
    files: [
      // your target files
    ],
    transform: {
      tsx: (code) => {
        code = transformGroupSelector(code);
        return code;
      },
      // add jsx if you are using it
    },
  },
  // ...
};
```

> CAUTION: This may cause some issues.

---

# ToDos

- Add conditional style feature
  ```ts
  type Props = {
    type: "primary" | "secondary";
  };
  const Container = utld.div<Props>`
    ${{
      type: {
        primary: ud`flex`,
        secondary: ud`inline-block`,
      },
    }}
  `;
  ```
