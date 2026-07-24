document.addEventListener('DOMContentLoaded', function () {
  var mapFrame = document.getElementById('sucursales-map');
  var listContainer = document.getElementById('sucursal-map-items');

  if (!mapFrame || !listContainer) {
    return;
  }

  var branches = [
    {
      city: 'Buenos Aires',
      name: 'CATfé Buenos Aires',
      address: 'Gorriti 4850, Palermo, Argentina',
      schedule: 'Lun a sáb, 9:00 a 20:00',
      coords: [-34.5886, -58.4296]
    },
    {
      city: 'Guadalajara',
      name: 'CATfé Guadalajara',
      address: 'Av. Chapultepec Sur 230, Guadalajara, México',
      schedule: 'Mar a dom, 10:00 a 19:00',
      coords: [20.6736, -103.3705]
    },
    {
      city: 'Barcelona',
      name: 'CATfé Barcelona',
      address: 'Carrer de Mallorca 401, Barcelona, España',
      schedule: 'Lun a vie, 8:30 a 19:30',
      coords: [41.4036, 2.1744]
    },
    {
      city: 'Valencia',
      name: 'CATfé Valencia',
      address: 'Carrer de Colón 35, Valencia, España',
      schedule: 'Lun a sáb, 9:30 a 20:00',
      coords: [39.4699, -0.3763]
    },
    {
      city: 'Córdoba',
      name: 'CATfé Córdoba',
      address: 'Av. Hipólito Yrigoyen 320, Córdoba, Argentina',
      schedule: 'Mar a dom, 9:00 a 19:00',
      coords: [-31.4201, -64.1888]
    },
    {
      city: 'Michoacán',
      name: 'CATfé Michoacán',
      address: 'Av. Madero Poniente 1700, Morelia, México',
      schedule: 'Lun a vie, 10:00 a 18:30',
      coords: [19.7008, -101.1844]
    },
    {
      city: 'Santa Fe',
      name: 'CATfé Santa Fe',
      address: 'Bv. Gálvez 1450, Santa Fe, Argentina',
      schedule: 'Lun a sáb, 8:30 a 19:30',
      coords: [-31.6333, -60.7000]
    },
    {
      city: 'Murcia',
      name: 'CATfé Murcia',
      address: 'Gran Vía Alfonso X 12, Murcia, España',
      schedule: 'Mar a dom, 10:00 a 20:00',
      coords: [37.9922, -1.1307]
    }
  ];

  function getDirectionsUrl(branch) {
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(branch.coords.join(','));
  }

  function getMapUrl(branch) {
    var latitude = branch.coords[0];
    var longitude = branch.coords[1];
    var offset = 0.01;

    return 'https://www.openstreetmap.org/export/embed.html?bbox=' +
      encodeURIComponent(longitude - offset) + '%2C' +
      encodeURIComponent(latitude - offset) + '%2C' +
      encodeURIComponent(longitude + offset) + '%2C' +
      encodeURIComponent(latitude + offset) +
      '&layer=mapnik&marker=' +
      encodeURIComponent(latitude) + '%2C' +
      encodeURIComponent(longitude);
  }

  function selectBranch(index) {
    var branch = branches[index];

    mapFrame.src = getMapUrl(branch);

    Array.prototype.slice.call(listContainer.querySelectorAll('.sucursal-map-item')).forEach(function (item, itemIndex) {
      item.classList.toggle('is-active', itemIndex === index);
    });

    Array.prototype.slice.call(document.querySelectorAll('[data-sucursal-card]')).forEach(function (card) {
      card.classList.toggle('is-active', Number(card.dataset.sucursalCard) === index);
    });
  }

  branches.forEach(function (branch, index) {
    var item = document.createElement('article');
    item.className = 'sucursal-map-item';
    item.innerHTML =
      '<button type="button" class="sucursal-map-button">' +
      '<span class="sucursal-map-title">' + branch.name + '</span>' +
      '<span class="sucursal-map-country">' + branch.city + '</span>' +
      '<span class="sucursal-map-address">' + branch.address + '</span>' +
      '<span class="sucursal-map-schedule">' + branch.schedule + '</span>' +
      '</button>' +
      '<a class="sucursal-directions-link" href="' + getDirectionsUrl(branch) + '" target="_blank" rel="noopener">Cómo llegar</a>';

    item.querySelector('button').addEventListener('click', function () {
      selectBranch(index);
    });

    listContainer.appendChild(item);
  });

  Array.prototype.slice.call(document.querySelectorAll('.project .service-work')).forEach(function (card) {
    var city = card.textContent.trim();
    var index = branches.findIndex(function (branch) {
      return branch.city === city;
    });

    if (index === -1) {
      return;
    }

    card.dataset.sucursalCard = index;
    card.addEventListener('click', function (event) {
      event.preventDefault();
      selectBranch(index);
      mapFrame.closest('.sucursales-map-panel').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });
  });

  selectBranch(0);
});
