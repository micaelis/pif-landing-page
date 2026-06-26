/* =============================================================
   Page It Forward — landing page
   Progressive enhancement only. The page is fully functional
   and readable with JavaScript disabled; this script just adds
   a gentle scroll-reveal to elements marked with [data-reveal].
   ============================================================= */
(function () {
  "use strict";

  // Signal to CSS that JS is active, so reveal targets can start hidden.
  document.documentElement.classList.add("js");

  var targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  // Respect users who prefer reduced motion — reveal everything at once.
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
