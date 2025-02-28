// Function to add product to cart
function checkLogin(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    let existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        // If the product is already in the cart, increase quantity
        existingProduct.quantity += 1;
    } else {
        // Add new product with quantity 1
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count in header
    updateCartCount();

    let toast = Object.assign(document.body.appendChild(document.createElement("div")), { className: "toast", innerText: productName + " added to cart!" });
    setTimeout(() => toast.remove(), 3000);
    }

// Function to update cart count in header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Get total item count
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById("cart-count").textContent = totalItems;
}

// Function to display cart items in cart.html
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalAmount = 0;

    cartContainer.innerHTML = ""; // Clear previous items

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        totalAmount += item.price * item.quantity;

        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <p><strong>${item.name}</strong> - $${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Display total price
    document.getElementById("total-price").textContent = `Total: $${totalAmount}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity > 1) {
        // Decrease quantity instead of removing
        cart[index].quantity -= 1;
    } else {
        // Remove the item completely if quantity is 1
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage

    displayCart(); // Refresh cart display
    updateCartCount(); // Update cart count in header
}

// Call updateCartCount on page load to keep count updated
document.addEventListener("DOMContentLoaded", updateCartCount);

// clear button
function clearCart() {
    localStorage.removeItem("cart"); // Local Storage se cart data hatayein
    displayCart(); // Cart ko update karein
}

// Initialize WOW.js
new WOW().init();
