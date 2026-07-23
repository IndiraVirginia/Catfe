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

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderReservations(reservas) {
    if (!reservas.length) {
      tableBody.innerHTML = '<tr><td colspan="8" class="text-muted">Todavía no hay reservas registradas.</td></tr>';
      return;
    }

    tableBody.innerHTML = reservas
      .map(function (reserva) {
        return [
          '<tr>',
          '<td>' + escapeHtml(reserva.nombre) + '</td>',
          '<td>' + escapeHtml(reserva.fecha) + '</td>',
          '<td>' + escapeHtml(reserva.horario) + '</td>',
          '<td>' + escapeHtml(reserva.sucursal) + '</td>',
          '<td>' + escapeHtml(reserva.gato || '-') + '</td>',
          '<td><span class="badge bg-warning text-dark">' + escapeHtml(reserva.estado) + '</span></td>',
          '<td>' + formatDate(reserva.creadaEn) + '</td>',
          '<td>',
          '<button class="btn-reserva-delete" type="button" data-id="' + escapeHtml(reserva.id) + '" aria-label="Eliminar reserva de ' + escapeHtml(reserva.nombre) + '">',
          '<i class="bx bx-trash"></i>',
          '</button>',
          '</td>',
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
          return '<option value="' + escapeHtml(gato.nombre) + '">' + escapeHtml(gato.nombre) + ' - ' + escapeHtml(gato.sucursal) + '</option>';
        })
        .join('');
  }

  async function loadReservations() {
    tableBody.innerHTML = '<tr><td colspan="8" class="text-muted">Cargando reservas...</td></tr>';

    try {
      var response = await fetch('/api/reservas');
      var data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudieron cargar las reservas.');
      }

      renderReservations(data.reservas || []);
    } catch (error) {
      tableBody.innerHTML =
        '<tr><td colspan="8" class="text-danger">No se pudieron cargar las reservas del backend.</td></tr>';
    }
  }

  async function deleteReservation(id) {
    if (!id) {
      return;
    }

    var confirmed = window.confirm('¿Eliminar esta reserva?');

    if (!confirmed) {
      return;
    }

    try {
      var response = await fetch('/api/reservas?id=' + encodeURIComponent(id), {
        method: 'DELETE',
      });
      var data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo eliminar la reserva.');
      }

      setStatus('Reserva eliminada correctamente.', 'success');
      await loadReservations();
    } catch (error) {
      setStatus(error.message, 'error');
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

  tableBody.addEventListener('click', function (event) {
    var deleteButton = event.target.closest('.btn-reserva-delete');

    if (deleteButton) {
      deleteReservation(deleteButton.dataset.id);
    }
  });

  loadCats();
  loadReservations();
});
