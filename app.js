function getCart() {
  return JSON.parse(
    localStorage.getItem("lovetouchCart")
  ) || {};
}

function saveCart(cart) {
  localStorage.setItem(
    "lovetouchCart",
    JSON.stringify(cart)
  );
}

function addProductToCart(productId, quantity = 1) {

  const cart = getCart();

  cart[productId] =
    (cart[productId] || 0) + quantity;

  saveCart(cart);

  alert("Product added to cart!");

}

function removeProductFromCart(productId) {

  const cart = getCart();

  delete cart[productId];

  saveCart(cart);

}

function updateCartQuantity(productId, quantity) {

  const cart = getCart();

  if (quantity <= 0) {

    delete cart[productId];

  } else {

    cart[productId] = quantity;

  }

  saveCart(cart);

}

function getCartItemCount() {

  const cart = getCart();

  return Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

}

function getCartSubtotal() {

  const cart = getCart();

  let subtotal = 0;

  Object.keys(cart).forEach(function(productId) {

    const product = products.find(
      p => p.id === productId
    );

    if (product) {

      subtotal +=
        product.price * cart[productId];

    }

  });

  return subtotal;

        }
