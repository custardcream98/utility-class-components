import packageJson from "./packages/utility-class-components/package.json" assert { type: "json" };

import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import path from "path";

const UTILITY_CLASS_COMPONENTS_PATH = "./packages/utility-class-components";

export default [
  {
    external: ["react"],
    input: path.resolve(UTILITY_CLASS_COMPONENTS_PATH, "src/index.ts"),
    output: [
      {
        file: path.resolve(UTILITY_CLASS_COMPONENTS_PATH, packageJson.main),
        format: "cjs",
        sourcemap: true,
      },
      {
        file: path.resolve(UTILITY_CLASS_COMPONENTS_PATH, packageJson.module),
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      nodeResolve(),
      typescript({ tsconfig: path.resolve(UTILITY_CLASS_COMPONENTS_PATH, "./tsconfig.json") }),
      commonjs(),
      terser(),
    ],
  },
  {
    input: path.resolve(UTILITY_CLASS_COMPONENTS_PATH, "./dist/esm/types/index.d.ts"),
    output: [
      { file: path.resolve(UTILITY_CLASS_COMPONENTS_PATH, "./dist/index.d.ts"), format: "esm" },
    ],
    plugins: [dts()],
  },
];
