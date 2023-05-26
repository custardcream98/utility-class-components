# utility-class-components

Build React Component using utility class in `styled-components` way!

```jsx
import { utld, ud } from "utility-class-components";

const boxStyle = ud`
  w-[100px]
  h-[100px]

  bg-red
`;

const Container = utld.div`
  flex
  text-bold

  ${boxStyle}
`;

function Page() {
  return <Container>AWESOME!!</Container>;
}
```

## Utility Class

You can use any library you want: TailwindCSS, UnoCSS, WindiCSS.

However, unlike CSS-in-JS libraries, **you can't use dynamic styles**. Due to the limitations of utility class libraries, it is not possible to create dynamic style classes.

## `utld`

```ts
const Container = utld.div`
  flex
  text-bold
`;

// You can extend other React Component's style too.
const RedContainer = utld(Container)`
  bg-red-500
`;
```

## `ud`

```ts
const commonStyle = ud`
  text-red-500
  hover:text-blue-500
`;

// You can nest ud inside other ud or utld
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

You also can use nested array.

```ts
const Container = utld.div`
  ${["flex flex-col", ["text-bold", "text-red-500"]]}
`;
```

## Setup Tailwind CSS IntelliSense for `utility-class-components`

If you've installed ["Tailwind CSS IntelliSense"](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) extenstion on VSCode, you can enable autocompletion inside `utld` and `ud`.

Add the following to your `settings.json`:

```json
{
  "tailwindCSS.experimental.classRegex": [
    "utld\\.[a-z]{1,}`([^`]*)`",
    "utld\\([^)]{1,}\\)`([^`]*)`",
    "ud`([^`]*)`"
  ]
}
```

## ToDos

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
