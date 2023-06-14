module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  ignorePatterns: ["node_modules/"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    createDefaultProgram: true,
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "sort-keys-fix", "simple-import-sort", "import", "prettier"],
  rules: {
    "@typescript-eslint/ban-types": [
      "error",
      {
        extendDefaults: true,
        types: {
          "{}": false,
        },
      },
    ],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "array-callback-return": [
      "error",
      {
        allowImplicit: true,
      },
    ],
    "comma-spacing": ["error"],
    eqeqeq: ["error"],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "linebreak-style": ["error", "unix"],
    "no-await-in-loop": ["error"],
    "no-constant-binary-expression": ["error"],
    "no-duplicate-imports": ["error"],
    "no-self-compare": ["error"],
    "no-unmodified-loop-condition": ["error"],
    "prettier/prettier": "error",
    quotes: ["error", "double", { avoidEscape: true }],
    radix: ["error"],
    "require-await": ["error"],
    semi: "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^\\u0000"],
          ["^src(/.*|$)"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^.+\\.?(css)$"],
        ],
      },
    ],
    "sort-keys-fix/sort-keys-fix": "warn",
    "space-before-blocks": ["error"],
  },
};
