console.log("🚀 External Cart Script successfully loaded and executing!");

// 🔄 Sync the navbar badge count when the page loads
function syncCartBadge() {
    try {
        const currentCart = JSON.parse(localStorage.getItem('electronics_cart')) || [];
        const badge = document.getElementById('cart-badge');
        if (badge) {
            badge.innerText = currentCart.reduce((sum, item) => sum + item.quantity, 0);
        }
    } catch (err) {
        console.error("Failed to sync initial badge count:", err);
    }
}

// Run badge update immediately
document.addEventListener('DOMContentLoaded', syncCartBadge);
syncCartBadge();

// 🎯 Catch click events globally on the document
document.addEventListener('click', function (event) {
    // Looks for the button even if you click directly on the inner "Add +" text
    const btn = event.target.closest('.add-to-cart-btn');
    
    if (btn) {
        event.preventDefault();
        try {
            const id = btn.getAttribute('data-id');
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));
            const imageUrl = btn.getAttribute('data-image');
            
            let currentCart = JSON.parse(localStorage.getItem('electronics_cart')) || [];
            
            // Check if product already exists in cart tracking array
            const existingItem = currentCart.find(item => item.productId === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                currentCart.push({ productId: id, name, price, imageUrl, quantity: 1 });
            }
            
            localStorage.setItem('electronics_cart', JSON.stringify(currentCart));
            console.log("Cart saved successfully. Current state:", currentCart);
            
            // Instantly update badge UI
            const badge = document.getElementById('cart-badge');
            if (badge) {
                badge.innerText = currentCart.reduce((sum, item) => sum + item.quantity, 0);
            }
            
            // Fire success feedback notification banner
            alert(`🎉 Added to Cart:\n${name}`);
            
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    }
});