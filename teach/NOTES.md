# Notes

- Teaching workspace root is `teach/` (not the repo root). Cursor rule: `.cursor/rules/teach-workspace.mdc`.
- User pointed at `components/HorizontalScroll/index.tsx` lines 19–72 and asked how the effect works.
- When asked why (own it / reuse / general ScrollTrigger), they replied “yes” — interpreted as go ahead with owning this resume component as the mission. Confirm if they later want a broader GSAP track.
- Prefer lessons that map directly onto their two refs: `containerRef` (pinned) and `panelsRef` (translated).
- Lesson 02 digression: user asked to learn `addEventListener` options via `hooks/useEventListener.ts` (used by horizontal scroll resize → `ScrollTrigger.refresh()`). Keep tying DOM options back to that call site; do not broaden into a full events course unless they ask.
- Hook-only vs DOM: remind that `enabled` / `target` are not `AddEventListenerOptions`.
- Lesson 03 digression: user asked how `useMorphSvgHover` works (chalk MorphSVG hover). Mission still HorizontalScroll — treat as digression unless they confirm expanding to “own resume GSAP interactions.” Core lesson scoped to stale async enter/leave race (`loadGenRef` + `hoveredRef`); full hook map in `reference/use-morph-svg-hover.html`. Next possible beats: animate-fn refs pattern, path cache, or `loadMorphGsap` lazy import — only after they clear the race.
- Lesson 04: user pointed at `loadMorphGsap.ts:13` (`??=`). Taught nullish-assign Promise cache; tie back to L03 (shared Promise ≠ no race).
- Lesson 05 digression: DesktopNavbar invert on perfect rail overlap. Core insight: GSAP `x` on `panelsRef` creates a stacking context, so in-panel z-index cannot beat a body-portaled fixed nav — morph color when `#portofolio-nav-rail` `left ≈ 0` instead. Reference: `reference/stacking-portaled-nav.html`. LR-0001 records the corrected misconception.

## Hard constraint: lessons open via `file://`

- Lessons are opened with `open path/to/lesson.html` (origin `null`).
- **Never use ES modules** (`type="module"`, `import`/`export`) in lesson or asset scripts — Chrome blocks them with CORS on `file://`.
- Use classic `<script src="../assets/….js">` plus inline non-module `<script>` that calls globals (e.g. `window.TeachQuiz`).
- Same rule for any future interactive assets (simulators, diagrams): IIFE / `window.*` API only, no bundler required for local open.
