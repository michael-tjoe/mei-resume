# Mission + DOM events + MorphSVG hover + Serwist + rAF menu Resources

## Knowledge

### requestAnimationFrame / enter transitions
- [MDN: Window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
  Callback before next repaint; one-shot; refresh-rate synced; pauses in background tabs. Use for: any question about when `MobileNavbarMenu`’s rAF runs relative to paint.
- [Jake Archibald: In The Loop (JSConf.Asia 2018)](https://www.youtube.com/watch?v=cCOL7MC8GrI)
  Canonical walkthrough of tasks, microtasks, rAF, and rendering. Use for: why nesting two rAFs waits for a paint between mount and `setEntered(true)`.
- [Alex MacArthur: Using Forced Reflows and the Event Loop to Slide Open a Box](https://macarthur.me/posts/box)
  Forced reflow vs nested rAF for CSS enter transitions. Use for: comparing alternatives to the double-rAF pattern in this menu.
- [Video.js PR #755 — double-RAF for entry animations](https://github.com/videojs/v10/pull/755)
  Same failure mode in production: single rAF clears starting styles in the same paint. Use for: external confirmation of the pattern.

### Service workers / Serwist
- [web.dev: The service worker lifecycle (Jake Archibald)](https://web.dev/articles/service-worker-lifecycle)
  Canonical explanation of install → waiting → activate, `skipWaiting`, `clients.claim`, and update intent. Use for: any lifecycle question about this app’s SW.
- [MDN: Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
  Registration, install/activate events, `waitUntil`. Use for: API-level details after web.dev’s narrative.
- [MDN: Service-Worker-Allowed](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Service-Worker-Allowed)
  How a SW script under a subpath can legally register with a broader `scope`. Use for: why `/serwist/sw.js` can control `/`.
- [Serwist: The Serwist class](https://serwist.pages.dev/docs/serwist/core/serwist)
  Maps `skipWaiting` / `clientsClaim` / `SKIP_WAITING` message to native APIs. Use for: reading `app/sw.ts` options.
- [Serwist: Turbopack (Next.js)](https://serwist.pages.dev/docs/next/turbo)
  `createSerwistRoute`, `SerwistProvider` `swUrl`, precache glob patterns. Use for: wiring in this repo (`app/serwist/[path]/route.ts`).
- [Serwist: Precaching assets](https://serwist.pages.dev/docs/serwist/guide/precaching)
  Precache on install, cleanup on activate. Use for: what `__SW_MANIFEST` does during lifecycle.

### Horizontal scroll / GSAP
- [Docs: ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
  Canonical API for `pin`, `scrub`, `end`, `invalidateOnRefresh`, refresh, and kill. Use for: any property in `HorizontalScroll`.
- [Official skill: GSAP ScrollTrigger (GreenSock)](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-scrolltrigger/SKILL.md)
  Condensed best practices, including fake horizontal scroll and why `ease: "none"` is required. Use for: pattern checklist before changing the tween.
- [GSAP Scroll overview](https://gsap.com/scroll/)
  High-level pin + scrub demos. Use for: visual intuition before reading API details.

### Stacking / portaled chrome (DesktopNavbar)
- [MDN: Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)
  Nested contexts are atomic; child `z-index` only sorts inside the parent context. Use for: why in-panel z cannot beat a body portal after panel `transform`.
- [MDN: transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
  Non-`none` transform creates a stacking context and a containing block for descendants. Use for: linking GSAP `x` on `panelsRef` to paint order bugs.
- [CSS Transforms Module — transform rendering](https://www.w3.org/TR/css-transforms/#transform-rendering)
  Spec text for stacking context + containing block from transforms. Use for: settling debates when MDN summaries feel thin.
- [MDN: Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
  Viewport-relative box after transforms. Use for: `isRailPerfectlyOverlapped` (`rail.left <= 1`).
- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
  Async observation of visibility/intersection changes. Use for: syncing nav invert while GSAP scrub moves the rail.

### MorphSVG / chalk hover hook
- [Docs: MorphSVGPlugin](https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/)
  Path morph API (`morphSVG` shape, viewBox companions). Use for: what `animateFinal` / `animateOriginal` tween in Game/Mic/Paint.
- [GSAP: Installing / registering plugins](https://gsap.com/resources/Plugins/)
  Why plugins are separate and must be `registerPlugin`’d. Use for: understanding `loadMorphGsap`’s dynamic import + register.
- [React: Separating Events from Effects](https://react.dev/learn/separating-events-from-effects)
  Handlers vs reactive Effects; reading latest values when async work finishes. Use for: why `morph` lives on enter/leave and why `hoveredRef` / gen checks exist.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
  OS preference for minimizing non-essential motion. Use for: the cheap sync guard before `loadMorphGsap`.
- [WAI SCR40: prefers-reduced-motion in JavaScript](https://www.w3.org/WAI/WCAG22/Techniques/client-side-script/SCR40)
  Technique for gating JS animations with `matchMedia`. Use for: justifying `prefersReducedMotion()` in `morph`.
- [MDN: Nullish coalescing assignment (`??=`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment)
  Assigns only when left is `null`/`undefined`; right side short-circuits otherwise. Use for: `morphGsapPromise ??= …` in `loadMorphGsap.ts`.

### Event listeners (DOM)
- [MDN: EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  Spec-backed definitions of `capture`, `once`, `passive`, `signal`, and the older `useCapture` boolean. Use for: any question about the options object passed in `hooks/useEventListener.ts`.
- [MDN: Using passive listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#using_passive_listeners)
  Why `passive: true` lets the browser scroll/paint without waiting on your handler; default quirks for wheel/touch. Use for: deciding when `{ passive: true }` is safe.
- [MDN: AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
  How `signal` removes a listener when an `AbortController` aborts. Use for: comparing React effect cleanup vs AbortController teardown.
- [DOM Living Standard — AddEventListenerOptions](https://dom.spec.whatwg.org/#dictdef-addeventlisteneroptions)
  Authoritative dictionary defaults (`capture`/`once` false; `passive` false in the spec). Use for: settling disagreements about defaults.

## Wisdom (Communities)

- [GSAP Community forums](https://gsap.com/community/)
  Official, high-signal help from GreenSock staff and experienced users. Use for: sticky pin bugs, MorphSVG shapeIndex weirdness, React cleanup edge cases.
- [Stack Overflow — javascript / events](https://stackoverflow.com/questions/tagged/javascript+events)
  Practical Q&A on capture/bubble and passive scroll jank. Use for: “why doesn’t preventDefault work?” debugging after reading MDN.
- [Stack Overflow — requestanimationframe](https://stackoverflow.com/questions/tagged/requestanimationframe)
  Timing / double-rAF / transition enter bugs. Use for: comparing forced reflow vs nested rAF after reading MDN + In The Loop.
- [Stack Overflow — service-worker](https://stackoverflow.com/questions/tagged/service-worker)
  Practical Q&A on scope failures, stuck waiting workers, and update races. Use for: debugging after reading web.dev lifecycle.
- [Serwist GitHub discussions](https://github.com/serwist/serwist/discussions)
  Library-specific help for Next/Turbopack integration. Use for: `@serwist/turbopack` quirks not covered in MDN.
