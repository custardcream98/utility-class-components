import { transformGroupSelector } from "./transformGroupSelector";

describe("transformGroupSelector", () => {
  it("should transform grouped text to be ungrouped", () => {
    expect(transformGroupSelector("text-(blue-500 2) hover:(bg-red-400 p-8)")).toBe(
      "text-blue-500 text-2 hover:bg-red-400 hover:p-8",
    );
  });

  it("should handle line breaks", () => {
    expect(
      transformGroupSelector(`
        text-(
          blue-500 bold
        )
      `),
    ).toBe("text-blue-500 text-bold");
  });

  it("should handle nested groups", () => {
    expect(
      transformGroupSelector(`
        hover:(
          bg-red-400 p-8
          dark:(bg-red-500 text-white)
        )
      `),
    ).toBe("hover:bg-red-400 hover:p-8 hover:dark:bg-red-500 hover:dark:text-white");
  });

  it("should handle using parenthesis as arbitrary value", () => {
    expect(
      transformGroupSelector(`
        hover:(
          h-[calc(100vh-4rem)] p-8
        )
      `),
    ).toBe("hover:h-[calc(100vh-4rem)] hover:p-8");
  });
});
