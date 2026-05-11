import { cn, techCategoryColorMap, skillColorMap } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("resolves Tailwind conflicts — last one wins", () => {
    const result = cn("bg-red-500", "bg-blue-500");
    expect(result).toBe("bg-blue-500");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "not-included", "included")).toBe("base included");
  });
});

describe("skillColorMap", () => {
  it("has entries for all expected colors", () => {
    const expectedColors = ["blue", "violet", "teal", "orange", "green", "rose", "amber", "cyan"];
    expectedColors.forEach((color) => {
      expect(skillColorMap[color]).toBeDefined();
      expect(typeof skillColorMap[color]).toBe("string");
    });
  });
});

describe("techCategoryColorMap", () => {
  it("covers all tech categories", () => {
    const categories = ["frontend", "backend", "ai", "infra", "tooling"];
    categories.forEach((cat) => {
      expect(techCategoryColorMap[cat]).toBeDefined();
    });
  });
});
