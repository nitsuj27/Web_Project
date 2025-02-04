// Add to Cart functionality with quantity check
function addToCart(productId, productName, productPrice, productImage) {
    // Get the quantity from the input
    let quantity = parseInt(document.getElementById('productQuantity').value, 10);

    // Retrieve existing cart or create a new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    let existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
        // If the product is already in the cart, update its quantity
        cart[existingProductIndex].quantity += quantity;
    } else {
        // Create a new product object if it doesn't exist in the cart
        let product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity,
            image: productImage // ✅ Store image URL
        };
        cart.push(product);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Item added to cart with quantity: " + quantity);
}

// Display cart items on cart.html
window.onload = function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.getElementById('cart-table');
    let subtotalElement = document.getElementById('subtotal');
    let taxElement = document.getElementById('tax');
    let totalElement = document.getElementById('total');
    let subtotal = 0;

    // Populate the table with cart items
    cart.forEach(item => {
        let row = cartTable.insertRow();
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-img">
                    <div>
                        <p>${item.name}</p>
                        <small>Price: $${item.price.toFixed(2)}</small>
                        <br>
                        <a href="#" onclick="removeFromCart('${item.id}')">Remove</a>
                    </div>
                </div>
            </td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        subtotal += item.price * item.quantity;
    });

    let tax = subtotal * 0.175;  // Assuming a 17.5% tax rate
    let total = subtotal + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
};

// Remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload(); // Reload the page to update the cart
}
