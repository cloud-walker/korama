---
title: Test components in a real browser with Vitest browser mode
description: UI components are tested in a real browser via Vitest browser mode (Playwright provider) rather than jsdom.
status: Accepted
tags: [testing, react, tooling]
---

# Test components in a real browser with Vitest browser mode

## Context and Problem Statement

Korama's React package renders DOM and relies on real browser behavior: layout, event dispatch and bubbling, focus management, and accessibility semantics. Component tests need an environment that reflects this behavior accurately. The conventional default is a simulated DOM (jsdom/happy-dom) running in Node, which is fast but approximates the browser — and the gaps (layout, real focus, pointer events) are precisely the areas a UI library must get right.

## Decision Drivers

- **Fidelity:** a UI library must be tested against real browser layout, events, focus, and a11y behavior — jsdom only approximates these.
- **Confidence over speed:** catching browser-real bugs in unit tests is worth more than the raw speed of a simulated DOM.
- **Scope:** the fidelity argument applies to DOM-rendering code, not to pure logic, so the environment should be chosen per package.

## Considered Options

- **Vitest browser mode (Playwright provider)** — tests run in a real browser driven by Playwright.
- **jsdom / happy-dom** — simulated DOM in Node.
- **Standalone Playwright end-to-end tests only** — no component-level unit tests.

## Decision Outcome

Chosen: **Vitest browser mode with the Playwright provider** for the DOM-rendering package. `@korama/react` tests run via `vitest run --browser.headless` using `@vitest/browser-playwright` and `vitest-browser-react`. The choice is scoped: pure-logic packages such as `@korama/utils` keep the default Node environment (plain `vitest run`), since they have no DOM to exercise.

### Consequences

- **Good:** Tests exercise real layout, events, focus, and a11y — high confidence for a UI library.
- **Good:** Same browser engine as Playwright, consistent with real browser execution.
- **Good:** Per-package scoping keeps fast Node tests for pure logic.
- **Bad:** Browser tests are slower than jsdom and require browser binaries.
- **Bad:** CI must provision Playwright browsers, adding setup and runtime cost.

## Pros and Cons of the Options

### Vitest browser mode (Playwright)

- Good: Real-browser fidelity; integrates with the Vitest unit-test workflow.
- Bad: Slower; requires browser binaries in CI.

### jsdom / happy-dom

- Good: Fast, zero browser binaries.
- Bad: Approximates the DOM; weak on layout, focus, and pointer events — the exact areas a UI library must verify.

### Standalone Playwright e2e only

- Good: Full real-browser coverage at the app level.
- Bad: No fast component-level feedback loop; harder to test components in isolation.
