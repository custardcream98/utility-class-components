import type { Config } from "tailwindcss";
import { transformGroupSelector } from "utility-class-components";

const config: Config = {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    transform: {
      tsx: (code) => {
        code = transformGroupSelector(code);
        return code;
      },
    },
  },
};
export default config;
