---
name: authoring-adr
description: Author or maintain an ADR (architectural decision record) under docs/decisions/. Use proactively when a significant decision has just been made in the conversation (the user chose between options or said let's go with X), when a major external dependency was added or swapped, or when a constraint was established that future contributors should know about. Capture the decision and its rationale while the context is fresh.
---

# Authoring an ADR

ADRs live in `docs/decisions/` and are the canonical record of *what was decided and why*.

## When to proactively suggest an ADR

Suggest writing an ADR when:

- A significant decision has just been made in the conversation (the user chose between options, or said "let's go with X")
- A major external dependency was added or swapped
- A constraint was established that future contributors should know about (e.g., "we can't use X because of Y")

When suggesting: draft the ADR with the decision captured while the context is fresh.

Do **not** open an ADR for bug fixes (unless the fix reveals a systemic problem worth recording), routine dependency bumps, style/formatting changes, or internal refactors with no API or behavioral impact.

## How to create a new ADR

1. Check `docs/decisions/` for the highest existing number.
2. Increment by 1, zero-pad to 4 digits: `NNNN-kebab-slug.md`.
3. Copy the template from `docs/decisions/README.md` as the starting point — don't duplicate it here, use the file.
4. Fill in frontmatter: `title`, `description`, `status: Proposed`, `tags`.
5. Fill in the body, capturing the decision and its rationale accurately.
6. Add a row for the new ADR to the status table in `docs/decisions/README.md`.

## ADR status transitions

| From | To | When |
|------|----|------|
| `Proposed` | `Accepted` | Decision is confirmed |
| `Proposed` | `Rejected` | Decision was not taken |
| `Accepted` | `Retired` | The decision is no longer relevant (e.g., the feature was removed) |
| `Accepted` | `Superseded` | A new ADR replaces this one |

When a status changes, update the corresponding row in the status table in `docs/decisions/README.md`.
