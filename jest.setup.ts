import "@testing-library/jest-dom";
import React from "react";

// ─── Mock framer-motion ────────────────────────────────────────────────────
// Strips animation props so components render synchronously in tests.
jest.mock("framer-motion", () => {
  const ANIMATION_PROPS = new Set([
    "initial", "animate", "exit", "whileHover", "whileInView",
    "viewport", "transition", "variants", "custom",
  ]);

  const makeComponent = (tag: string) => {
    const Component = ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) => {
      const cleanProps = Object.fromEntries(
        Object.entries(props).filter(([k]) => !ANIMATION_PROPS.has(k))
      );
      return React.createElement(tag, cleanProps, children);
    };
    Component.displayName = `motion.${tag}`;
    return Component;
  };

  return {
    ...jest.requireActual("framer-motion"),
    motion: new Proxy({} as Record<string, ReturnType<typeof makeComponent>>, {
      get: (_target, tag: string) => makeComponent(tag),
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

// ─── Browser API mocks ────────────────────────────────────────────────────
global.scrollTo = jest.fn() as typeof global.scrollTo;

class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor(public callback: IntersectionObserverCallback) {}
}
global.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

Object.defineProperty(navigator, "clipboard", {
  value: { writeText: jest.fn().mockResolvedValue(undefined) },
  writable: true,
});
