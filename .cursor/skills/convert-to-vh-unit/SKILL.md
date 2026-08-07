---
name: convert-to-vh-unit
description: >-
  Convert fixed px (or design-spec) spacing/sizing to viewport-height (vh)
  calc units. Use when turning px into vh, scaling layout values to viewport
  height, or when the user mentions convert-to-vh / turn unit into vh.
---

# Convert to vh unit

Turn fixed design pixels into responsive `vh` using a design-height baseline.

## Formula

Default design height is **1080px**:

```text
Npx → calc(N/1080*100vh)
```

Tailwind arbitrary value:

```text
pb-[38px] → pb-[calc(38/1080*100vh)]
mt-[64px] → mt-[calc(64/1080*100vh)]
```

Equivalent form also used in this repo:

```text
calc(100vh*N/1080)
```

Prefer `calc(N/1080*100vh)` to match portfolio / timeline patterns.

## When to use which baseline

| Design reference | Denominator | Example |
| --- | --- | --- |
| Vertical spacing on a **1080**-tall artboard | `1080` | `pb-[calc(38/1080*100vh)]` |
| Value authored against a **1920**-wide frame but applied as vh (legacy) | `1920` | `pt-[calc(92/1920*100vh)]` |

- Prefer **1080** for padding, margin, and gaps that scale with viewport **height**.
- Keep **1920** only when matching an existing nearby class that already uses `/1920`.
- Do not mix baselines for the same property across siblings unless matching established code.

## Workflow

1. Read the px value `N` from the class or design spec.
2. Choose baseline (`1080` default for height-proportional spacing).
3. Replace `Npx` / `[Npx]` with `[calc(N/{baseline}*100vh)]`.
4. Leave already-converted `calc(...*100vh)` values alone unless changing the baseline.

## Do not

- Invent a different denominator without a design or nearby-code reason.
- Convert horizontal-only layout that should stay in `px` / `%` / `vw` unless asked.
- Reduce the fraction (keep `38/1080`, not `19/540`).
