export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
    {
      productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 5,
    },
  ];
}
function saveCartLocal() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
let timeoutId;

export function deleteFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (productId !== cartItem.productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveCartLocal();
}

export function addToCart(productId) {
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  document
    .querySelector(`.js-added-to-cart-${productId}`)
    .classList.add("not-hidden");
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    document
      .querySelector(`.js-added-to-cart-${productId}`)
      .classList.remove("not-hidden");
  }, 2000);

  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += parseInt(quantitySelector.value);
  } else {
    cart.push({
      productId: productId,
      quantity: parseInt(quantitySelector.value),
    });
  }
  saveCartLocal();
}
