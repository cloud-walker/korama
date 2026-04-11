# docs/

This folder holds design-level documentation for Korama: proposals for future changes and records of decisions already made.

## Structure

```
docs/
├── proposals/   — RFCs: proposals for significant changes
└── decisions/   — ADRs: records of architectural decisions
```

## When to write an RFC (proposal)

Write an RFC when a change is significant enough that it warrants discussion *before* implementation. Examples:

- New public API surface or changes to existing API contracts
- Breaking changes to any package
- Changes that span multiple packages
- Major tooling or infrastructure shifts
- New conventions or patterns adopted project-wide

Use `docs/proposals/_template.md` as a starting point.

## When to write an ADR (decision)

Write an ADR when a significant decision has been made (or is actively being made) and the rationale should be captured for future contributors. The ADR is the *recorded outcome*; the RFC(s) are the *design space*.

Use `docs/decisions/_template.md` as a starting point.

## File naming

Both proposals and decisions use the same convention:

```
NNNN-kebab-case-title.md
```

Where `NNNN` is a zero-padded sequential number starting at `0001`. Check the existing files in the relevant folder to find the next number.

Examples:
```
proposals/0001-new-theming-system.md
decisions/0001-use-biome-for-linting.md
decisions/0002-monorepo-with-turbo.md
```

## Frontmatter schema

Every document starts with YAML frontmatter. See the templates for the full schema.

**Proposals** use: `title`, `description`, `status`, `tags`
**Decisions** use: `title`, `description`, `status`, `tags`, `proposals` (links to related RFCs)

## RFC → ADR lifecycle

```
RFC: Draft → Proposed → Active
                              ↓
                         ADR created (references the RFC)
```

1. An RFC starts as `Draft` while being written
2. It moves to `Proposed` when ready for review
3. Once accepted, it moves to `Active` — it stays as the detailed design record
4. A corresponding ADR is created that links back to the RFC(s) via the `proposals` frontmatter field
5. The ADR is the canonical record of *what was decided and why*

RFCs are not modified once they reach `Active`. The ADR is the closure.
