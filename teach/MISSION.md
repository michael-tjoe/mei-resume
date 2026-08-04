# Mission: Own the resume’s horizontal scroll

## Why
You are shipping a Next.js resume whose desktop experience depends on a fake horizontal scroll (`components/HorizontalScroll`). You need to change, debug, and reason about that effect without guessing — so layout tweaks and scroll bugs stop feeling like black magic.

## Success looks like
- Trace what happens when the user scrolls through `HorizontalScroll` (pin → scrub → `x` translation) in your own words
- Predict what breaks if `end`, `getScrollDistance`, or `ease` is wrong
- Safely adjust distance, scrub feel, or teardown without introducing ScrollTrigger leaks

## Constraints
- Learn through this concrete component first, not abstract GSAP tours
- Prefer short lessons tied to the lines in `components/HorizontalScroll/index.tsx`

## Out of scope
- ScrollSmoother / third-party smooth scroll libraries
- Nested `containerAnimation` triggers inside panels (until the base pattern is solid)
- Rewriting the component onto `@gsap/react` unless you ask
