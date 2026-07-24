document.addEventListener('DOMContentLoaded', function () {
  var modalElement = document.getElementById('donationDetailModal');

  if (!modalElement || typeof bootstrap === 'undefined') {
    return;
  }

  var details = {
    veterinaria: {
      title: 'Veterinaria',
      description: 'Acompaña controles, vacunas, castraciones y tratamientos para gatos rescatados.',
      goal: '$35.000',
      progress: 72,
      items: ['Vacunas y desparasitación', 'Castraciones', 'Consultas y estudios', 'Medicamentos']
    },
    comida: {
      title: 'Comida',
      description: 'Ayuda a cubrir alimento balanceado, alimento húmedo y dietas especiales.',
      goal: '$30.000',
      progress: 64,
      items: ['Alimento balanceado', 'Comida húmeda', 'Dietas especiales', 'Snacks para socialización']
    },
    transporte: {
      title: 'Transporte',
      description: 'Permite trasladar gatos entre veterinarias, hogares de tránsito, cafeterías y adoptantes.',
      goal: '$22.000',
      progress: 48,
      items: ['Traslados veterinarios', 'Viajes a hogares de tránsito', 'Entrega a adoptantes', 'Retiro de donaciones']
    },
    accesorios: {
      title: 'Accesorios',
      description: 'Cubre elementos cotidianos para higiene, descanso y enriquecimiento ambiental.',
      goal: '$18.000',
      progress: 55,
      items: ['Mantitas y camas', 'Bandejas sanitarias', 'Juguetes y rascadores', 'Comederos y bebederos']
    }
  };

  var modal = new bootstrap.Modal(modalElement);
  var title = document.getElementById('donationDetailTitle');
  var description = document.getElementById('donationDetailDescription');
  var goal = document.getElementById('donationDetailGoal');
  var progress = document.getElementById('donationDetailProgress');
  var items = document.getElementById('donationDetailItems');

  function openDetail(type) {
    var detail = details[type];

    if (!detail) {
      return;
    }

    title.textContent = detail.title;
    description.textContent = detail.description;
    goal.textContent = detail.goal;
    progress.style.width = detail.progress + '%';
    progress.setAttribute('aria-valuenow', detail.progress);
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    items.innerHTML = detail.items.map(function (item) {
      return '<li>' + item + '</li>';
    }).join('');

    modal.show();
  }

  Array.prototype.slice.call(document.querySelectorAll('[data-donation-detail]')).forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        return;
      }

      openDetail(trigger.dataset.donationDetail);
    });

    trigger.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDetail(trigger.dataset.donationDetail);
      }
    });
  });
});
