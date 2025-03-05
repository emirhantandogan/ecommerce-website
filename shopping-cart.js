document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    displayCart();

    // Display Cart Items
    function displayCart() {
        const cartTable = document.getElementById("cart-items");
        const totalAmountDisplay = document.getElementById("total-amount");

        cartTable.innerHTML = ""; // Clear the table
        let totalAmount = 0;

        cart.forEach((cartItem, index) => {
            const product = products.find(p => p.id === cartItem.productId);
            if (!product) return;

            const itemTotal = product.price * cartItem.quantity;
            totalAmount += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${product.thumbnail}" alt="${product.title}" width="50"></td>
                <td>${product.title}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${cartItem.quantity}" class="form-control quantity-input" data-id="${product.id}">
                </td>
                <td class="item-total">$${itemTotal.toFixed(2)}</td>
                <td><button class="custom-btn custom-btn-reject remove-btn" data-id="${product.id}">Remove</button></td>
            `;
            cartTable.appendChild(row);
        });

        totalAmountDisplay.textContent = totalAmount.toFixed(2);
        attachEventListeners();
    }

    // Attach Event Listeners to Update Quantity and Remove Item
    function attachEventListeners() {
        document.querySelectorAll(".quantity-input").forEach(input => {
            input.addEventListener("input", updateQuantity);
        });

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", removeItem);
        });
    }

    // Update Quantity
    function updateQuantity(event) {
        const productId = parseInt(event.target.dataset.id);
        const newQuantity = parseInt(event.target.value);

        if (newQuantity < 1) return;

        const cartItem = cart.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity = newQuantity;
        }

        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        displayCart(); // Refresh display
        updateCartCount();
    }

    // Remove Item from Cart
    function removeItem(event) {
        const productId = parseInt(event.target.dataset.id);
        cart = cart.filter(item => item.productId !== productId);

        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        displayCart(); // Refresh display
        updateCartCount();
    }

    // Proceed to Checkout
    document.getElementById("checkout").addEventListener("click", function () {
        localStorage.removeItem("shoppingCart"); // Clear cart
        alert("Checkout Successful! Your cart is now empty.");
        window.location.reload(); // Refresh page
    });

    // Continue Shopping
    document.getElementById("continue-shopping").addEventListener("click", function () {
        window.location.href = "products.html"; // Redirect to products page
    });
});
