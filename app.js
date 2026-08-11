/* =========================================
   LOVETOUCH - MAIN APP.JS
   Cart System
========================================= */

function getCart() {

  try {

    const saved =
      localStorage.getItem("lovetouchCart");

    if (!saved) {
      return {};
    }

    const cart = JSON.parse(saved);

    if (
      cart &&
      typeof cart === "object" &&
      !Array.isArray(cart)
    ) {
      return cart;
    }

  } catch (error) {

    console.error("Cart loading error:", error);

  }

  return {};

}


/* =========================================
   SAVE CART
========================================= */

function saveCart(cart) {

  localStorage.setItem(
    "lovetouchCart",
    JSON.stringify(cart)
  );

}


/* =========================================
   FIND PRODUCT
========================================= */

function findProductById(productId) {

  if (
    typeof products === "undefined" ||
    !Array.isArray(products)
  ) {
    return null;
  }

  return products.find(function(product) {

    return String(product.id) === String(productId);

  }) || null;

}


/* =========================================
   ADD PRODUCT TO CART
========================================= */

function addProductToCart(productId, quantity = 1) {

  const product =
    findProductById(productId);

  if (!product) {

    alert("Product not found!");

    return;

  }

  const cart = getCart();

  const currentQuantity =
    Number(cart[productId]) || 0;

  cart[productId] =
    currentQuantity + Number(quantity);

  saveCart(cart);

  updateCartCount();

  alert(
    product.name +
    " added to cart!"
  );

}


/* =========================================
   REMOVE PRODUCT
========================================= */

function removeProductFromCart(productId) {

  const cart = getCart();

  delete cart[productId];

  saveCart(cart);

  updateCartCount();

}


/* =========================================
   UPDATE QUANTITY
========================================= */

function updateCartQuantity(
  productId,
  quantity
) {

  const cart = getCart();

  quantity = Number(quantity);

  if (quantity <= 0) {

    delete cart[productId];

  } else {

    cart[productId] = quantity;

  }

  saveCart(cart);

  updateCartCount();

}


/* =========================================
   CART ITEM COUNT
========================================= */

function getCartItemCount() {

  const cart = getCart();

  let count = 0;

  Object.keys(cart).forEach(function(productId) {

    const quantity =
      Number(cart[productId]) || 0;

    if (quantity > 0) {

      count += quantity;

    }

  });

  return count;

}


/* =========================================
   CART SUBTOTAL
========================================= */

function getCartSubtotal() {

  const cart = getCart();

  let subtotal = 0;

  Object.keys(cart).forEach(function(productId) {

    const product =
      findProductById(productId);

    const quantity =
      Number(cart[productId]) || 0;

    if (product && quantity > 0) {

      subtotal +=
        Number(product.price) * quantity;

    }

  });

  return subtotal;

}


/* =========================================
   UPDATE CART COUNT
========================================= */

function updateCartCount() {

  const count =
    getCartItemCount();

  const elements =
    document.querySelectorAll(
      "#cartCount"
    );

  elements.forEach(function(element) {

    element.textContent = count;

  });

}


/* =========================================
   PAGE LOAD
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    updateCartCount();

  }
);
