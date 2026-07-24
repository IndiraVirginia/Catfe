document.addEventListener('DOMContentLoaded', function () {
  var animatedElements = Array.prototype.slice.call(
    document.querySelectorAll(
      'main section, body > section, .service-work, .pricing-membership-card, .pricing-horizontal, .partner-wap, .objective-icon, #indice .card, #reglas-generales .card'
    )
  );

  if (!animatedElements.length) {
    return;
  }

  animatedElements.forEach(function (element) {
    element.classList.add('scroll-reveal');
  });

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(function (element) {
      element.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animatedElements.forEach(function (element) {
    observer.observe(element);
  });
});
