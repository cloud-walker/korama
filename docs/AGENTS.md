# AI Instructions: docs/

This folder holds Korama's **decision records (ADRs)** under `docs/decisions/` — the recorded outcome of significant decisions, with their rationale. See `docs/decisions/README.md` for the index, current statuses, and the template.

## What NOT to create an ADR for

Don't open an ADR for:

- Bug fixes (unless the fix reveals a systemic problem worth recording)
- Routine dependency bumps
- Style or formatting changes
- Internal refactors with no API or behavioral impact
- Changes already fully captured in a PR description or changeset

## Skimming existing docs efficiently

Each ADR's frontmatter contains `title` and `description` fields. Read only frontmatter first when you need to find a relevant decision — avoid reading the full body unless the frontmatter confirms it's relevant.
