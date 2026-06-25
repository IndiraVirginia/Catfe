document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-rollover]').forEach(function (image) {
    var originalSource = image.getAttribute('src');
    var rolloverSource = image.dataset.rollover;

    image.addEventListener('mouseenter', function () {
      image.setAttribute('src', rolloverSource);
    });

    image.addEventListener('mouseleave', function () {
      image.setAttribute('src', originalSource);
    });
  });

  document.querySelectorAll('.js-popup-reserva').forEach(function (button) {
    button.addEventListener('click', function () {
      window.alert('Para reservar, revisá los horarios y luego contáctanos desde el formulario.');
    });
  });

  document.querySelectorAll('.js-popup-contacto').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      window.alert('Gracias por tu mensaje. CATfé responderá tu consulta a la brevedad.');
      form.reset();
    });
  });
});
