document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const productCards = document.querySelectorAll('.product-card');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        performSearch(); 
    });

    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch(); 
        }
    });

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        productCards.forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            const brand = card.getAttribute('data-brand').toLowerCase();
            if (name.includes(query) || category.includes(query) || brand.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});
