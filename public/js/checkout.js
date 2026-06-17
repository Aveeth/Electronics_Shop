document.getElementById('checkout-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop the page from refreshing

    // 1. Get user details from the form
    const customerName = document.querySelector('input[name="customerName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    // 2. Get the cart from LocalStorage
    const cartItems = JSON.parse(localStorage.getItem('electronics_cart')) || [];

    // 3. Send to the API
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, email, phone, items: cartItems })
    });

    const result = await response.json();

    if (result.success) {
        alert("Order placed successfully!");
        localStorage.removeItem('electronics_cart');
        window.location.href = '/'; 
    } else {
        alert("Error: " + result.message);
    }
});