/**
 * Tiny quiz helper for file:// lessons (no ES modules — browsers block them on origin null).
 * Mark buttons with data-correct="true|false".
 * Feedback: [data-feedback] inside the quiz root or its parent.
 */
(function (global) {
  function wireQuiz(root) {
    const buttons = Array.prototype.slice.call(
      root.querySelectorAll("button[data-correct]"),
    );
    const feedback =
      root.querySelector("[data-feedback]") ||
      (root.parentElement && root.parentElement.querySelector("[data-feedback]"));

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const correct = btn.getAttribute("data-correct") === "true";
        buttons.forEach(function (b) {
          b.disabled = true;
          if (b.getAttribute("data-correct") === "true") {
            b.setAttribute("data-state", "correct");
          } else if (b === btn) {
            b.setAttribute("data-state", "wrong");
          } else {
            b.removeAttribute("data-state");
          }
        });
        if (feedback) {
          feedback.className = "feedback " + (correct ? "ok" : "bad");
          feedback.textContent = correct
            ? btn.getAttribute("data-ok") || "Correct."
            : btn.getAttribute("data-bad") ||
              "Not quite — try the highlighted answer.";
        }
        root.dispatchEvent(
          new CustomEvent("quiz:answered", {
            detail: { correct: correct },
            bubbles: true,
          }),
        );
      });
    });
  }

  function wireAllQuizzes(selector) {
    selector = selector || "[data-quiz]";
    Array.prototype.forEach.call(document.querySelectorAll(selector), wireQuiz);
  }

  global.TeachQuiz = { wireQuiz: wireQuiz, wireAllQuizzes: wireAllQuizzes };
})(window);
