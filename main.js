document.addEventListener("DOMContentLoaded", function () {
    const categoryFilter = document.getElementById("categoryFilter");
    const searchInput = document.getElementById("searchInput");
    const sortBy = document.getElementById("sortBy");
    const applyFiltersButton = document.getElementById("applyFilters");
    const productList = document.getElementById("product-list");

    if (!categoryFilter || !productList || !applyFiltersButton || !sortBy) {
        console.error("One or more DOM elements are missing!");
        return;
    }

    populateCategoryFilter(products);
    displayProducts(products);

    // Event Listeners
    applyFiltersButton.addEventListener("click", filterProducts);
    categoryFilter.addEventListener("change", handleCategoryChange);
    sortBy.addEventListener("change", applySorting); // Sorting should happen instantly when selected

    function populateCategoryFilter(products) {
        const categories = [...new Set(products.map(p => p.category))];
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    function displayProducts(filteredProducts) {
        productList.innerHTML = ""; // Clear previous content

        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("col");

            productCard.innerHTML = `
                <div class="card h-100">
                    <a href="product-detail.html?id=${product.id}">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text"><strong>$${product.price}</strong></p>
                    </div>
                </div>
            `;
            productList.appendChild(productCard);
        });
    }

    function handleCategoryChange() {
        // Reset search input
        searchInput.value = "";
        sortBy.value = "default";

        // Display products in the selected category
        const selectedCategory = categoryFilter.value;
        let filteredProducts = products;

        if (selectedCategory !== "all") {
            filteredProducts = products.filter(product => product.category === selectedCategory);
        }

        displayProducts(filteredProducts);
    }

    function filterProducts() {
        let filteredProducts = [...products];

        // Category Filter
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== "all") {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        // Search Filter (Exact Word Match)
        const searchText = searchInput.value.trim().toLowerCase();
        if (searchText) {
            const regex = new RegExp(`\\b${searchText}\\b`, "i"); // Matches only the full word
            filteredProducts = filteredProducts.filter(product =>
                regex.test(product.title.toLowerCase()) || regex.test(product.description.toLowerCase())
            );
        }

        displayProducts(filteredProducts); // Display only filtered products before sorting
    }

    function applySorting() {
        let sortedProducts = [...document.querySelectorAll("#product-list .col")];

        const sortByValue = sortBy.value;
        sortedProducts = sortedProducts.map(productCard => {
            const priceText = productCard.querySelector(".card-text strong").textContent.replace("$", "");
            return {
                element: productCard,
                price: parseFloat(priceText)
            };
        });

        if (sortByValue === "lowToHigh") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortByValue === "highToLow") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        productList.innerHTML = ""; // Clear current products
        sortedProducts.forEach(product => productList.appendChild(product.element)); // Append sorted elements
    }
});
