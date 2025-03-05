document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    const product = products.find(p => p.id == productId);
    if (product) {
        displayProductDetails(product);
    } else {
        console.error("Product not found!");
    }

    function displayProductDetails(product) {
        const carouselImages = document.getElementById("carousel-images");
        carouselImages.innerHTML = ""; // Clear previous images
    
        // Loop through all images and create carousel items
        product.images.forEach((image, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
    
            // Make the first image active
            if (index === 0) {
                carouselItem.classList.add("active");
            }
    
            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = `Product Image ${index + 1}`;
            imgElement.classList.add("d-block", "w-100", "product-carousel-image"); // Add the class here
    
            carouselItem.appendChild(imgElement);
            carouselImages.appendChild(carouselItem);
        });
    
        //hiding the arrows of carousel if there is only on item in images
        const prevButton = document.querySelector(".carousel-control-prev");
        const nextButton = document.querySelector(".carousel-control-next");

        if (product.images.length <= 1) {
            prevButton.style.display = "none";
            nextButton.style.display = "none";
        } else {
            prevButton.style.display = "block";
            nextButton.style.display = "block";
        }

        // Populate other product details
        document.getElementById("product-title").textContent = product.title;
        document.getElementById("product-description").textContent = product.description;
        document.getElementById("product-price").textContent = product.price;
        document.getElementById("total-price").textContent = product.price;
    
        // Update total price on quantity change
        document.getElementById("quantity").addEventListener("input", function () {
            const quantity = parseInt(this.value);
            if (quantity > 0) {
                document.getElementById("total-price").textContent = (product.price * quantity).toFixed(2);
            }
        });
    
        // Add to Cart Button
        document.getElementById("add-to-cart").addEventListener("click", function () {
            addToCart(product.id, parseInt(document.getElementById("quantity").value));
        });
    
        // Go to Cart Button
        document.getElementById("go-to-cart").addEventListener("click", function () {
            window.location.href = "shopping-cart.html";
        });
    }
    

    function addToCart(productId, quantity) {
        if (quantity < 1) {
            alert("Please select a valid quantity.");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
        const existingProductIndex = cart.findIndex(item => item.productId === productId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({ productId, quantity });
        }

        localStorage.setItem("shoppingCart", JSON.stringify(cart));

        updateCartCount();

        alert("Product added to cart!");
    }

    document.getElementById("continue-shopping").addEventListener("click", function () {
        window.location.href = "products.html"; // Redirect to products page
    })
});


