document.addEventListener('DOMContentLoaded', function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-membership-item]'));

  if (!items.length) {
    return;
  }

  function moveSelectedToCenter(selectedItem) {
    var selectedIndex = items.indexOf(selectedItem);
    var order;

    if (selectedIndex === 0) {
      order = [items[1], items[0], items[2]];
    } else if (selectedIndex === 2) {
      order = [items[0], items[2], items[1]];
    } else {
      order = [items[0], items[1], items[2]];
    }

    order.forEach(function (item, index) {
      item.style.order = index + 1;
    });

    items.forEach(function (item) {
      var card = item.querySelector('[data-membership-card]');
      var isSelected = item === selectedItem;

      item.classList.toggle('membership-card-center', isSelected);
      item.classList.toggle('membership-card-side', !isSelected);
      card.classList.toggle('is-selected', isSelected);
      card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
  }

  items.forEach(function (item) {
    var card = item.querySelector('[data-membership-card]');

    card.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        return;
      }

      moveSelectedToCenter(item);
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        moveSelectedToCenter(item);
      }
    });
  });
});
