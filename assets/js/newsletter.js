document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('#newsletter-form');
  var status = document.querySelector('#newsletter-status');

  if (!form || !status) {
    return;
  }

  function setStatus(message, type) {
    status.textContent = message;
    status.className = 'alert mt-3 text-center ' + (type === 'error' ? 'alert-danger' : 'alert-success');
    status.classList.remove('d-none');
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    var formData = new FormData(form);
    var email = String(formData.get('email') || '').trim();
    var button = form.querySelector('button[type="submit"]');

    if (!email) {
      setStatus('Ingresá un email para suscribirte.', 'error');
      return;
    }

    button.disabled = true;
    button.textContent = 'Enviando...';

    try {
      var response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });
      var data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo completar la suscripción.');
      }

      setStatus('Suscripción registrada. Revisá tu email para ver la confirmación.', 'success');
      form.reset();
    } catch (error) {
      setStatus(error.message, 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Suscribirte';
    }
  });
});
