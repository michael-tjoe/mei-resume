# Mission + DOM events Resources

## Knowledge

### Horizontal scroll / GSAP
- [Docs: ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
  Canonical API for `pin`, `scrub`, `end`, `invalidateOnRefresh`, refresh, and kill. Use for: any property in `HorizontalScroll`.
- [Official skill: GSAP ScrollTrigger (GreenSock)](https://github.com/greensock/gsap-skills/blob/main/skills/gsap-scrolltrigger/SKILL.md)
  Condensed best practices, including fake horizontal scroll and why `ease: "none"` is required. Use for: pattern checklist before changing the tween.
- [GSAP Scroll overview](https://gsap.com/scroll/)
  High-level pin + scrub demos. Use for: visual intuition before reading API details.

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
  Official, high-signal help from GreenSock staff and experienced users. Use for: sticky pin bugs, wrong scroll distance, React cleanup edge cases.
- [Stack Overflow — javascript / events](https://stackoverflow.com/questions/tagged/javascript+events)
  Practical Q&A on capture/bubble and passive scroll jank. Use for: “why doesn’t preventDefault work?” debugging after reading MDN.
