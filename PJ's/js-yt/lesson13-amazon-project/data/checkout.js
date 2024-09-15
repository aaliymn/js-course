import { cart, deleteFromCart, calculateCartQuantity } from "../data/cart.js";
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
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
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
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-checkout-middle-section").innerHTML = `
          Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a
          >)`;
}
