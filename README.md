<a name="readme-top"></a>

<div align="center">
  <h3 align="center">utility-class-components</h3>

  <p align="center">
    Build React components using utility classes in the <code>styled-components</code> way!
    <br />
    <br />
    <strong>✅ Use any library you want: TailwindCSS, UnoCSS, WindiCSS</strong>
    <br />
    <strong>✅ Server Component is fully supported</strong>
    <br />
    <br />
  </p>
</div>

```tsx
import { utld, ud } from "utility-class-components";

const boxStyle = ud`
  w-50
  h-50

  bg-red
`;

const Container = utld.div<{ $isRed: boolean }>`
  flex
  text-bold

  ${boxStyle}

  ${({ $isRed }) => $isRed && "text-red-500"}
`;

function Page() {
  return <Container $isRed={true}>AWESOME!!</Container>;
}
```

---

#### Table Of Contents

- [Installation](#installation)
- [Setting up](#setting-up)
  - [Setting up Tailwind CSS IntelliSense for `utility-class-components`](#setting-up-tailwind-css-intellisense-for-utility-class-components)
- [Usage](#usage)
  - [`utld`](#utld)
  - [`ud`](#ud)
  - [Array Styles](#array-styles)
  - [Pass Props to Component](#pass-props-to-component)
  - [Handle `ForwardRefExoticComponent`](#handle-forwardrefexoticcomponent)
  - [Make sure certain props are not passed or rendered](#make-sure-certain-props-are-not-passed-or-rendered)
- [Experimental Features](#experimental-features)
  - [Experimental Feature: Grouping Variants](#experimental-feature-grouping-variants)
    - [Disabling `cssConflict` lint warning](#disabling-cssconflict-lint-warning)
- [Acknowledgments](#acknowledgments)

---

## Installation

This package is published on [npm registry](https://www.npmjs.com/package/utility-class-components).

```shell
npm i utility-class-components
# or yarn add utility-class-components
```

## Setting up

### Setting up Tailwind CSS IntelliSense for `utility-class-components`

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

## Usage

### `utld`

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

### `ud`

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

### Array Styles

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

### Pass Props to Component

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

### Handle `ForwardRefExoticComponent`

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

### Make sure certain props are not passed or rendered

If you want to prevent certain props from being passed to an underlying React component or rendered on a DOM element, you can prefix the prop name with a `$` (dollar sign).

```tsx
const Box = utld.div<{ $isRed: boolean }>`
  ${({ $isRed }) => $isRed === "red" && "bg-red-500"}
  w-[100px]
  h-[100px]
`;
// `$isRed` prop will not be rendered in the DOM
```

> This feature is useful when you encounter the warning `React does not recognize the X prop on a DOM element.`

## Experimental Features

### Experimental Feature: Grouping Variants

You can group variants in the following way :

```ts
export const Link = utld.a`
  hover:(text-accent-light dark:text-accent-dark)
`;

// Line breaks can also be added
export const Box = utld.div`
  hover:(
    text-accent-light
    dark:text-accent-dark
  )
`;
```

**During runtime,** this will be transformed into `"transition-colors hover:text-accent-light hover:dark:text-accent-dark)"`.

To enable this feature, **you need to add a transformer** to the utility class library you are using. This transformer will allow the library to generate styles for `hover:text-accent-light hover:dark:text-accent-dark`.

For example, if you are using TailwindCSS, you can add the following code to your `tailwind.config.js` file:

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

#### Disabling `cssConflict` lint warning

Furthermore, you should add the following configuration to your VSCode `settings.json` file:

```json
{
  "tailwindCSS.lint.cssConflict": "ignore"
}
```

This is necessary because Tailwind CSS IntelliSense is not aware of how grouping variants work. Please note that by disabling this lint, you will not receive warnings if you attempt to set conflicting styles.

```jsx
const Page = () => {
  // The following className will not trigger a lint warning anymore.
  return <div className='text-red-500 text-blue-500'>No Warning</div>;
};
```

## Acknowledgments

### Avoid constructing class names dynamically

When using utility class libraries, it's important to note that **dynamic styles cannot be used** due to the limitations of such libraries.

```js
const style = `w-${width}`; // ❌

const style = "w-[100px]"; // 👌👌
```

<p align="right"><a href="#readme-top">🔼 back to top</a></p>
