document.addEventListener('DOMContentLoaded', function () {
  var mapFrame = document.getElementById('sucursales-map');
  var listContainer = document.getElementById('sucursal-map-items');

  if (!mapFrame || !listContainer) {
    return;
  }

  var branches = [
    {
      name: 'CATfé Palermo',
      address: 'Gorriti 4850, Palermo, CABA',
      schedule: 'Lun a sáb, 9:00 a 20:00',
      coords: [-34.5886, -58.4296]
    },
    {
      name: 'CATfé San Telmo',
      address: 'Defensa 900, San Telmo, CABA',
      schedule: 'Mar a dom, 10:00 a 19:00',
      coords: [-34.6205, -58.3736]
    },
    {
      name: 'CATfé Belgrano',
      address: 'Juramento 2100, Belgrano, CABA',
      schedule: 'Lun a vie, 8:30 a 19:30',
      coords: [-34.5622, -58.4566]
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
  }

  branches.forEach(function (branch, index) {
    var item = document.createElement('article');
    item.className = 'sucursal-map-item';
    item.innerHTML =
      '<button type="button" class="sucursal-map-button">' +
      '<span class="sucursal-map-title">' + branch.name + '</span>' +
      '<span class="sucursal-map-address">' + branch.address + '</span>' +
      '<span class="sucursal-map-schedule">' + branch.schedule + '</span>' +
      '</button>' +
      '<a class="sucursal-directions-link" href="' + getDirectionsUrl(branch) + '" target="_blank" rel="noopener">Cómo llegar</a>';

    item.querySelector('button').addEventListener('click', function () {
      selectBranch(index);
    });

    listContainer.appendChild(item);
  });

  selectBranch(0);
});
