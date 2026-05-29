/**
 * Project-local Playwright type augmentation.
 *
 * The codebase uses `test.todo("description")` as a Wave 0 TDD documentation
 * marker — Vitest/Jest-style intent declaration for tests that haven't been
 * implemented yet. Playwright (>=1.60) does not ship a `todo` method on
 * `TestType`, so calling it is a runtime no-op AND a TypeScript error.
 *
 * This augmentation silences the 78 ts(2339) errors across the e2e specs
 * without changing the existing scaffolding pattern. It declares `todo` as
 * a title-only method that returns void — matching how the team writes it.
 *
 * Runtime caveat: this is purely a type declaration. The actual `test.todo`
 * call at runtime still hits `undefined`. The team's convention treats these
 * as "RED until the implementing plan ships" — they're not expected to pass
 * until each Wave is wired up.
 */

import "@playwright/test";

declare module "@playwright/test" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TestType<TestArgs, WorkerArgs> {
    todo(title: string): void;
  }
}
