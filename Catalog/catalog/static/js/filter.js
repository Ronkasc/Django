document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product-card');
    const productsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(products.length / productsPerPage);
    let lastScrollTop = 0;
    const firstPageBtn = document.getElementById('first-page');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const lastPageBtn = document.getElementById('last-page');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');
    const navbar = document.getElementById('main-navbar');

    totalPagesSpan.textContent = totalPages;

    const priceRange = document.getElementById('price-range');
    const priceRangeMax = document.getElementById('price-range-max');
    const priceValue = document.getElementById('price-value');
    const priceValueMax = document.getElementById('price-value-max');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const categoryFilter = document.getElementById('category-filter');

    function updatePriceValues() {
        priceValue.textContent = minPriceInput.value + ' $';
        priceValueMax.textContent = maxPriceInput.value + ' $';
        priceRange.value = minPriceInput.value;
        priceRangeMax.value = maxPriceInput.value;
    }

    minPriceInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            applyFiltersAndShowPage();
        }
    });
    
    maxPriceInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            applyFiltersAndShowPage();
        }
    });
    
    categoryFilter.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            applyFiltersAndShowPage();
        }
    });
    
    function applyFiltersAndShowPage() {
        showPage(1);
    }
    priceRange.addEventListener('input', function() {
        minPriceInput.value = priceRange.value;
        updatePriceValues();
        showPage(1);
    });

    priceRangeMax.addEventListener('input', function() {
        maxPriceInput.value = priceRangeMax.value;
        updatePriceValues();
        showPage(1);
    });

    const categories = Array.from(document.querySelectorAll('.product-card')).map(card => card.dataset.category);
    const uniqueCategories = [...new Set(categories)];
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.textContent = category;
        option.value = category;
        categoryFilter.appendChild(option);
    });

    categoryFilter.addEventListener('change', function() {
        showPage(1);
    });

    function applyFilters() {
        const minPrice = parseInt(minPriceInput.value);
        const maxPrice = parseInt(maxPriceInput.value);
        const selectedCategory = categoryFilter.value;

        return Array.from(products).filter(card => {
            const price = parseFloat(card.querySelector('p').innerText.split(' ')[0]);
            const category = card.dataset.category;

            const priceMatch = price >= minPrice && price <= maxPrice;
            const categoryMatch = selectedCategory === 'all' || category === selectedCategory;

            return priceMatch && categoryMatch;
        });
    }

    function showPage(page) {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;

        currentPage = page;
        currentPageSpan.textContent = currentPage;

        const filteredProducts = applyFilters();
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;

        products.forEach(product => {
            product.style.display = 'none';
        });

        filteredProducts.slice(start, end).forEach(product => {
            product.style.display = 'block';
        });

        updatePaginationButtons(filteredProducts.length);
    }

    function updatePaginationButtons(filteredProductCount) {
        const totalFilteredPages = Math.ceil(filteredProductCount / productsPerPage);
        totalPagesSpan.textContent = totalFilteredPages;

        if (currentPage <= 1) {
            firstPageBtn.disabled = true;
            prevPageBtn.disabled = true;
        } else {
            firstPageBtn.disabled = false;
            prevPageBtn.disabled = false;
        }

        if (currentPage >= totalFilteredPages) {
            nextPageBtn.disabled = true;
            lastPageBtn.disabled = true;
        } else {
            nextPageBtn.disabled = false;
            lastPageBtn.disabled = false;
        }
    }

    firstPageBtn.addEventListener('click', () => showPage(1));
    prevPageBtn.addEventListener('click', () => showPage(currentPage - 1));
    nextPageBtn.addEventListener('click', () => showPage(currentPage + 1));
    lastPageBtn.addEventListener('click', () => showPage(totalPages));

    showPage(1);

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
        if (scrollTop > lastScrollTop) {
        
            navbar.style.opacity = '0';
        } else {
    
            navbar.style.opacity = '1';
        }
    
        lastScrollTop = scrollTop;
    });

});
