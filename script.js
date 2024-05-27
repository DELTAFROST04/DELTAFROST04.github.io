document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    const cartIconButton = document.querySelector('.cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartCountElement = document.querySelector('.cart-count');

    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.product');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));

            const productIndex = cart.findIndex(item => item.name === productName);

            if (productIndex > -1) {
                cart[productIndex].quantity += 1;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            updateCartUI();
        });
    });

    cartIconButton.addEventListener('click', () => {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;

        cart.forEach((item) => {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
            itemCount += item.quantity;
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        cartCountElement.textContent = itemCount;
    }
});
