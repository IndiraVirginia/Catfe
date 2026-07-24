document.addEventListener('DOMContentLoaded', function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-membership-item]'));

  if (!items.length) {
    return;
  }

  function selectMembershipCard(selectedItem) {
    items.forEach(function (item) {
      var card = item.querySelector('[data-membership-card]');
      var isSelected = item === selectedItem;

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

      selectMembershipCard(item);
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectMembershipCard(item);
      }
    });
  });
});
