/**
 * Service-worker lifecycle simulator for file:// lessons (no ES modules).
 * Wire with TeachSwLifecycle.mount(rootEl).
 *
 * Models this repo’s choices: skipWaiting:false, clientsClaim:true,
 * user-triggered SKIP_WAITING (UpdateToast → messageSkipWaiting).
 */
(function (global) {
  var STATES = [
    "parsed",
    "installing",
    "installed",
    "activating",
    "activated",
    "redundant",
  ];

  function emptyReg() {
    return { active: null, waiting: null, installing: null, version: 0 };
  }

  function mount(root) {
    if (!root) return;

    var reg = emptyReg();
    var logEl = root.querySelector("[data-sw-log]");
    var slots = {
      installing: root.querySelector('[data-slot="installing"]'),
      waiting: root.querySelector('[data-slot="waiting"]'),
      active: root.querySelector('[data-slot="active"]'),
    };
    var clientEl = root.querySelector("[data-sw-client]");
    var toastEl = root.querySelector("[data-sw-toast]");
    var scopeNote = root.querySelector("[data-sw-scope]");

    var controlled = false;
    var btnRegister = root.querySelector('[data-action="register"]');
    var btnUpdate = root.querySelector('[data-action="update"]');
    var btnSkip = root.querySelector('[data-action="skip"]');
    var btnClose = root.querySelector('[data-action="close-tabs"]');
    var btnReset = root.querySelector('[data-action="reset"]');

    function log(msg) {
      if (!logEl) return;
      var line = document.createElement("div");
      line.textContent = msg;
      logEl.insertBefore(line, logEl.firstChild);
    }

    function paintSlot(el, worker) {
      if (!el) return;
      el.textContent = worker
        ? "v" + worker.version + " · " + worker.state
        : "—";
      el.setAttribute("data-filled", worker ? "true" : "false");
      el.setAttribute(
        "data-state",
        worker ? worker.state : "empty",
      );
    }

    function paint() {
      paintSlot(slots.installing, reg.installing);
      paintSlot(slots.waiting, reg.waiting);
      paintSlot(slots.active, reg.active);
      if (clientEl) {
        clientEl.textContent = controlled
          ? "controlled by v" + (reg.active && reg.active.version)
          : "uncontrolled (first load / no claim yet)";
        clientEl.setAttribute("data-controlled", controlled ? "true" : "false");
      }
      if (toastEl) {
        var show = !!(reg.waiting && reg.waiting.state === "installed");
        toastEl.hidden = !show;
      }
      if (btnUpdate) btnUpdate.disabled = !reg.active;
      if (btnSkip) btnSkip.disabled = !reg.waiting;
      if (btnClose) btnClose.disabled = !reg.waiting;
      if (btnRegister) btnRegister.disabled = !!reg.active || !!reg.installing;
    }

    function setState(worker, state) {
      worker.state = state;
      paint();
    }

    function promoteWaiting() {
      if (!reg.waiting) return;
      var next = reg.waiting;
      reg.waiting = null;
      if (reg.active) {
        setState(reg.active, "redundant");
        log("Old v" + reg.active.version + " → redundant");
      }
      reg.active = next;
      setState(next, "activating");
      log("v" + next.version + " activating (clientsClaim: true)");
      // activate + claim
      window.setTimeout(function () {
        if (reg.active !== next) return;
        setState(next, "activated");
        controlled = true;
        log("v" + next.version + " activated · claimed clients");
        paint();
      }, 350);
    }

    function finishInstall(worker) {
      if (reg.installing !== worker) return;
      reg.installing = null;
      setState(worker, "installed");
      if (!reg.active) {
        // First SW: no waiting needed
        reg.waiting = worker;
        log("v" + worker.version + " installed → activate (no prior SW)");
        promoteWaiting();
      } else {
        reg.waiting = worker;
        log(
          "v" +
            worker.version +
            " installed → waiting (skipWaiting: false)",
        );
        paint();
      }
    }

    function registerOrUpdate(isUpdate) {
      if (reg.installing) return;
      reg.version += 1;
      var worker = { version: reg.version, state: "installing" };
      reg.installing = worker;
      log(
        (isUpdate ? "Update found: " : "Register /serwist/sw.js: ") +
          "v" +
          worker.version +
          " installing (precache…)",
      );
      paint();
      window.setTimeout(function () {
        finishInstall(worker);
      }, 500);
    }

    if (btnRegister) {
      btnRegister.addEventListener("click", function () {
        registerOrUpdate(false);
      });
    }
    if (btnUpdate) {
      btnUpdate.addEventListener("click", function () {
        registerOrUpdate(true);
      });
    }
    if (btnSkip) {
      btnSkip.addEventListener("click", function () {
        if (!reg.waiting) return;
        log("messageSkipWaiting() → self.skipWaiting()");
        promoteWaiting();
      });
    }
    if (btnClose) {
      btnClose.addEventListener("click", function () {
        if (!reg.waiting) return;
        log("All controlled tabs closed → waiting worker activates");
        promoteWaiting();
      });
    }
    if (btnReset) {
      btnReset.addEventListener("click", function () {
        reg = emptyReg();
        controlled = false;
        if (logEl) logEl.innerHTML = "";
        log("Reset. Scope still / via Service-Worker-Allowed.");
        paint();
      });
    }

    if (scopeNote) {
      scopeNote.textContent =
        "Script: /serwist/sw.js · default dir scope /serwist/ · header Service-Worker-Allowed: / → controls whole origin";
    }

    log("Idle. Register to start (production-only in this app).");
    paint();
  }

  global.TeachSwLifecycle = { mount: mount, STATES: STATES };
})(window);
