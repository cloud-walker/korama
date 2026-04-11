# AI Instructions: docs/

This file tells Claude how to maintain the `docs/` folder as the codebase evolves. Read it before creating or modifying anything in `docs/proposals/` or `docs/decisions/`.

---

## When to proactively suggest an RFC

Suggest writing an RFC (without being asked) when you are about to implement — or the user is discussing — any of the following:

- A new public API or changes to existing API contracts in any package
- Breaking changes (renamed exports, changed function signatures, removed features)
- A change that touches more than one package
- A new convention, pattern, or tooling choice that will affect how contributors write code going forward
- A significant architectural shift (state management, build pipeline, rendering strategy, etc.)

When suggesting: draft a minimal RFC stub in `docs/proposals/` and ask the user to review it before proceeding with implementation.

## When to proactively suggest an ADR

Suggest writing an ADR when:

- A significant decision has just been made in the conversation (the user accepted a proposal, chose between options, or said "let's go with X")
- An RFC has just moved to `Active` status
- A major external dependency was added or swapped
- A constraint was established that future contributors should know about (e.g., "we can't use X because of Y")

When suggesting: draft the ADR with the decision captured while the context is fresh, link any related RFC(s) in the `proposals` frontmatter field.

---

## How to create a new RFC

1. Check `docs/proposals/` for the highest existing number
2. Increment by 1, zero-pad to 4 digits: `NNNN-kebab-slug.md`
3. Copy `docs/proposals/_template.md` as the starting point
4. Fill in frontmatter: `title`, `description`, `status: Draft`, `tags`
5. Fill in body sections; leave `## Unresolved Questions` honest — don't paper over uncertainty

## How to create a new ADR

1. Check `docs/decisions/` for the highest existing number
2. Increment by 1, zero-pad to 4 digits: `NNNN-kebab-slug.md`
3. Copy `docs/decisions/_template.md` as the starting point
4. Fill in frontmatter: `title`, `description`, `status: Proposed`, `tags`
5. If this ADR is the outcome of one or more RFCs, populate the `proposals` field with relative paths:
   ```yaml
   proposals:
     - ../proposals/0001-new-theming-system.md
   ```
6. Fill in the body, capturing the decision and its rationale accurately

## RFC status transitions

| From | To | When |
|------|----|------|
| `Draft` | `Proposed` | RFC is complete and ready for review |
| `Proposed` | `Active` | RFC has been accepted; a corresponding ADR is (or will be) created |
| `Proposed` | `Rejected` | RFC was discussed and not accepted |
| `Active` | `Superseded` | A new RFC/ADR replaces this one |
| Any | `Withdrawn` | Author pulls the proposal before a decision |

When moving an RFC to `Active`, check whether a corresponding ADR already exists. If not, suggest creating one.

## ADR status transitions

| From | To | When |
|------|----|------|
| `Proposed` | `Accepted` | Decision is confirmed |
| `Proposed` | `Rejected` | Decision was not taken |
| `Accepted` | `Deprecated` | The decision is no longer relevant (e.g., the feature was removed) |
| `Accepted` | `Superseded` | A new ADR replaces this one |

## Linking rules

- ADRs link to RFCs via `proposals` frontmatter — always use relative paths from the ADR file's location
- RFCs are **not modified** when an ADR is created — the ADR is the closure, the RFC is the design record
- If multiple RFCs contributed to a single decision, list all of them in `proposals`

## What NOT to create docs for

Don't create RFCs or ADRs for:

- Bug fixes (unless the fix reveals a systemic problem worth an ADR)
- Routine dependency bumps
- Style or formatting changes
- Internal refactors with no API or behavioral impact
- Changes already fully captured in a PR description or changeset

---

## Skimming existing docs efficiently

Each document's frontmatter contains `title` and `description` fields. Read only frontmatter first when you need to find a relevant RFC or ADR — avoid reading the full body unless the frontmatter confirms it's relevant.
