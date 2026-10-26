# Use Zod Mini as the validation library across Korama

Korama packages need runtime validation (narrowing `unknown`, guarding package boundaries), and without a shared choice each package would invent its own. We adopt Zod Mini (`zod/mini`): its footprint (~10–12 KB min+gzip) is comparable to Valibot, it tree-shakes natively, and it keeps the dominant Zod ecosystem, so consumers already using Zod (tRPC, TanStack Form, react-hook-form) pay no extra bundle cost. Upgrading to full Zod is a one-line import change.

## Considered options

- **Valibot**: ~10 KB, tree-shakes, but a smaller ecosystem and less familiar API.
- **Zod (full)**: ~50 KB and fluent/OOP, which limits tree-shaking. Disproportionate for a library whose consumers cannot opt out.
- **Hand-written type guards** or **no runtime validation**: no composability, unsafe for dynamic data.

## Usage guidelines

- Import from `"zod/mini"`, never from `"zod"`.
- Narrow in hot paths with a local `is(schema)(value)` helper; use `Schema.parse` at package boundaries where invalid input is a hard error. Never parse inside React render functions.
- Derive types from schemas: `type Foo = z.output<typeof FooSchema>`.
- Don't expose Zod schemas in a package's public API, and don't validate public React props at runtime; rely on TypeScript.
