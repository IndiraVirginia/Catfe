document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('#reserva-form');
  var status = document.querySelector('#reserva-status');
  var tableBody = document.querySelector('#reservas-table-body');
  var gatoSelect = document.querySelector('#gato');

  function setStatus(message, type) {
    status.textContent = message;
    status.className = 'alert mt-3 ' + (type === 'error' ? 'alert-danger' : 'alert-success');
    status.classList.remove('d-none');
  }

  function formatDate(value) {
    if (!value) {
      return '-';
    }

    return new Date(value).toLocaleString('es-AR');
  }

  function renderReservations(reservas) {
    if (!reservas.length) {
      tableBody.innerHTML = '<tr><td colspan="7" class="text-muted">Todavia no hay reservas registradas.</td></tr>';
      return;
    }

    tableBody.innerHTML = reservas
      .map(function (reserva) {
        return [
          '<tr>',
          '<td>' + reserva.nombre + '</td>',
          '<td>' + reserva.fecha + '</td>',
          '<td>' + reserva.horario + '</td>',
          '<td>' + reserva.sucursal + '</td>',
          '<td>' + (reserva.gato || '-') + '</td>',
          '<td><span class="badge bg-warning text-dark">' + reserva.estado + '</span></td>',
          '<td>' + formatDate(reserva.creadaEn) + '</td>',
          '</tr>',
        ].join('');
      })
      .join('');
  }

  async function loadCats() {
    var response = await fetch('assets/data/gatos.json');
    var gatos = await response.json();

    gatoSelect.innerHTML =
      '<option value="">Sin preferencia</option>' +
      gatos
        .map(function (gato) {
          return '<option value="' + gato.nombre + '">' + gato.nombre + ' - ' + gato.sucursal + '</option>';
        })
        .join('');
  }

  async function loadReservations() {
    tableBody.innerHTML = '<tr><td colspan="7" class="text-muted">Cargando reservas...</td></tr>';

    try {
      var response = await fetch('/api/reservas');
      var data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudieron cargar las reservas.');
      }

      renderReservations(data.reservas || []);
    } catch (error) {
      tableBody.innerHTML =
        '<tr><td colspan="7" class="text-danger">No se pudieron cargar las reservas del backend.</td></tr>';
    }
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    var formData = new FormData(form);
    var reserva = Object.fromEntries(formData.entries());

    try {
      var response = await fetch('/api/reservas', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(reserva),
      });
      var data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo guardar la reserva.');
      }

      setStatus('Reserva registrada correctamente en el backend.', 'success');
      form.reset();
      await loadReservations();
    } catch (error) {
      setStatus(error.message, 'error');
    }
  });

  loadCats();
  loadReservations();
});
