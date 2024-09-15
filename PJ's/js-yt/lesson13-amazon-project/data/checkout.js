import {
  cart,
  deleteFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "./products.js";
let orderSummaryHTML = "";
updateCartQuantity();

cart.forEach((cartItem) => {
  const cartId = cartItem.productId;

  let matchingItem;

  products.forEach((productItem) => {
    if (cartId === productItem.id) {
      matchingItem = productItem;
    }
  });
  orderSummaryHTML += `
            <div class="cart-item-container js-cart-item-container-${
              matchingItem.id
            }">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingItem.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">$${(
                  matchingItem.priceCents / 100
                ).toFixed(2)}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label js-quantity-label-${
                    matchingItem.id
                  }">${cartItem.quantity}</span> </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link"data-product-id=${
                    matchingItem.id
                  }>
                    Update
                  </span>
                  <input class="quantity-input  js-quantity-input-${
                    matchingItem.id
                  }">
                  <span class="save-quantity-link link-primary"data-product-id=${
                    matchingItem.id
                  }>Save</span>
                  <span class="delete-quantity-link link-primary js-delete-button" data-product-id=${
                    matchingItem.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input "
                    name="delivery-option-${matchingItem.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
});
document.querySelector(".js-order-summary").innerHTML = orderSummaryHTML;

document.querySelectorAll(".js-delete-button").forEach((deleteButton) => {
  deleteButton.addEventListener("click", () => {
    const buttonId = deleteButton.dataset.productId;
    deleteFromCart(buttonId);
    const container = document.querySelector(
      `.js-cart-item-container-${buttonId}`
    );
    container.remove();
    updateCartQuantity();
  });
});
document.querySelectorAll(".js-update-quantity-link").forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    const updateId = updateLink.dataset.productId;
    document
      .querySelector(`.js-cart-item-container-${updateId}`)
      .classList.add("is-editing-quantity");
    console.log(updateId);
  });
});
document.querySelectorAll(".save-quantity-link").forEach((saveLink) => {
  saveLink.addEventListener("click", () => {
    const saveId = saveLink.dataset.productId;
    const newQuantity = Number(
      document.querySelector(`.js-quantity-input-${saveId}`).value
    );
    updateQuantity(saveId, newQuantity);
    document.querySelector(`.js-quantity-label-${saveId}`).innerHTML =
      newQuantity;
    updateCartQuantity();

    document
      .querySelector(`.js-cart-item-container-${saveId}`)
      .classList.remove("is-editing-quantity");
  });
});
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-checkout-middle-section").innerHTML = `
          Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a
          >)`;
}
