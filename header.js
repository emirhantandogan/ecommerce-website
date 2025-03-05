document.addEventListener("DOMContentLoaded", function () {
    window.updateCartCount = function () { 
        let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById("cart-count").textContent = totalItems;
    };

    updateCartCount(); 
});
