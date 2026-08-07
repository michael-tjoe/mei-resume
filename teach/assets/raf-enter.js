/**
 * Double-rAF enter demo for file:// lessons (no ES modules).
 * Mount: TeachRafEnter.mount(rootElement)
 *
 * Modes mirror MobileNavbarMenu open timing:
 * - instant: set entered true in same turn as mount (no transition)
 * - single: one rAF then enter (often skips the "from" paint)
 * - double: nested rAF then enter (paint closed, then flip)
 */
(function (global) {
  var ANIM_MS = 400;

  function clearIds(state) {
    if (state.outerId) cancelAnimationFrame(state.outerId);
    if (state.innerId) cancelAnimationFrame(state.innerId);
    if (state.fallbackId) clearTimeout(state.fallbackId);
    state.outerId = 0;
    state.innerId = 0;
    state.fallbackId = 0;
  }

  function log(el, msg) {
    var line = document.createElement("div");
    line.textContent = msg;
    el.insertBefore(line, el.firstChild);
    while (el.children.length > 8) {
      el.removeChild(el.lastChild);
    }
  }

  function setEntered(panel, entered) {
    panel.classList.toggle("is-entered", entered);
    panel.setAttribute("data-entered", entered ? "true" : "false");
  }

  function mount(root) {
    if (!root) return;

    var stage = root.querySelector("[data-raf-stage]");
    var panel = root.querySelector("[data-raf-panel]");
    var logEl = root.querySelector("[data-raf-log]");
    var modeInputs = root.querySelectorAll('input[name="raf-mode"]');
    var openBtn = root.querySelector('[data-action="open"]');
    var closeBtn = root.querySelector('[data-action="close"]');
    var resetBtn = root.querySelector('[data-action="reset"]');

    var state = {
      shouldRender: false,
      entered: false,
      outerId: 0,
      innerId: 0,
      fallbackId: 0,
    };

    function mode() {
      var checked = root.querySelector('input[name="raf-mode"]:checked');
      return (checked && checked.value) || "double";
    }

    function syncDom() {
      if (!state.shouldRender) {
        stage.setAttribute("data-mounted", "false");
        panel.hidden = true;
        setEntered(panel, false);
        openBtn.disabled = false;
        closeBtn.disabled = true;
        return;
      }
      stage.setAttribute("data-mounted", "true");
      panel.hidden = false;
      setEntered(panel, state.entered);
      openBtn.disabled = true;
      closeBtn.disabled = false;
    }

    function openMenu() {
      if (state.shouldRender) return;
      clearIds(state);
      state.shouldRender = true;
      state.entered = false;
      syncDom();
      log(logEl, "mount · entered=false (−translate-y-full)");

      var m = mode();
      if (m === "instant") {
        state.entered = true;
        syncDom();
        log(logEl, "instant · entered=true same turn (no from→to)");
        return;
      }

      if (m === "single") {
        state.outerId = requestAnimationFrame(function () {
          state.entered = true;
          syncDom();
          log(logEl, "single rAF · entered=true (often before paint of closed)");
        });
        log(logEl, "single rAF scheduled");
        return;
      }

      state.outerId = requestAnimationFrame(function () {
        state.innerId = requestAnimationFrame(function () {
          state.entered = true;
          syncDom();
          log(logEl, "double rAF · entered=true after closed paint");
        });
        log(logEl, "outer rAF · schedule inner (after this frame’s paint)");
      });
      log(logEl, "double rAF outer scheduled");
    }

    function closeMenu() {
      if (!state.shouldRender) return;
      clearIds(state);
      state.entered = false;
      syncDom();
      log(logEl, "close · entered=false (transition starts)");
      state.fallbackId = setTimeout(function () {
        state.shouldRender = false;
        state.entered = false;
        syncDom();
        log(logEl, "unmount after " + ANIM_MS + "ms");
      }, ANIM_MS + 40);
    }

    function reset() {
      clearIds(state);
      state.shouldRender = false;
      state.entered = false;
      syncDom();
      logEl.textContent = "";
      log(logEl, "reset");
    }

    openBtn.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    resetBtn.addEventListener("click", reset);
    Array.prototype.forEach.call(modeInputs, function (input) {
      input.addEventListener("change", function () {
        log(logEl, "mode → " + mode());
      });
    });

    syncDom();
    log(logEl, "ready — try Instant, then Double");
  }

  global.TeachRafEnter = { mount: mount };
})(window);
