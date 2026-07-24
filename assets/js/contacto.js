document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('#contacto-form');
  var status = document.querySelector('#contacto-status');

  if (!form || !status) {
    return;
  }

  function setStatus(message, type) {
    status.textContent = message;
    status.className = 'alert mt-3 ' + (type === 'error' ? 'alert-danger' : 'alert-success');
    status.classList.remove('d-none');
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    var button = form.querySelector('button[type="submit"]');
    var payload = Object.fromEntries(new FormData(form).entries());

    button.disabled = true;
    button.textContent = 'Enviando...';

    try {
      var response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      var data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo enviar el mensaje.');
      }

      setStatus('Mensaje enviado correctamente. Revisá tu email para ver la confirmación.', 'success');
      form.reset();
    } catch (error) {
      setStatus(error.message, 'error');
    } finally {
      button.disabled = false;
      button.textContent = 'Enviar Mensaje';
    }
  });
});
