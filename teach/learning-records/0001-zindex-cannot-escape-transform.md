# Raising z-index cannot escape a transformed panels track

Raising portfolio `z-index` failed against the body-portaled fixed `DesktopNavbar` because GSAP’s `translateX` on `panelsRef` creates a stacking context: nested z-index only sorts inside that unit. The fix that shipped is color morph on perfect rail overlap (`rail.left ≈ 0`), not a stacking war.

**Evidence:** Debug session — z-index bump didn’t cover the portal; grilling chose “always fixed + invert on perfect overlap,” implemented in `DesktopNavbar` / `#portofolio-nav-rail`.

**Implications:** For HorizontalScroll chrome, prefer portal + geometry-driven state over in-panel z-index races. Next lessons can deepen `createPortal` rationale or IO+scrub sync without re-teaching stacking context basics.
