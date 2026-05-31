# docs/

This folder holds design-level documentation for Korama: records of architectural decisions that have been made.

## Structure

```
docs/
└── decisions/   — ADRs: records of architectural decisions
```

## When to write an ADR (decision)

Write an ADR when a significant decision has been made (or is actively being made) and the rationale should be captured for future contributors.

See [`decisions/README.md`](decisions/README.md) for the template, the index of existing decisions, and their current status.

## File naming

```
NNNN-kebab-case-title.md
```

Where `NNNN` is a zero-padded sequential number starting at `0001`. Check the existing files in `decisions/` to find the next number.

Example:
```
decisions/0001-zod-mini-as-validation-library.md
```
