# Test components in a real browser with Vitest browser mode

`@korama/react` tests run in a real browser through Vitest browser mode (`vitest run --browser.headless`, `@vitest/browser-playwright`, `vitest-browser-react`) instead of jsdom/happy-dom. A UI library must get layout, event dispatch, real focus and pointer behavior right, which is exactly where simulated DOMs diverge. The choice is scoped per package: pure-logic packages such as `@korama/utils` keep plain `vitest run` in Node.

## Considered options

- **jsdom / happy-dom**: fast and binary-free, but only approximates the browser.
- **Standalone Playwright e2e only**: no fast component-level feedback loop and hard to test components in isolation.

## Consequences

Browser tests are slower than jsdom and CI uses the Google Chrome preinstalled on GitHub-hosted runners (`channel: "chrome"` when `CI` is set) instead of downloading Playwright browsers; locally Playwright's Chromium is used.
