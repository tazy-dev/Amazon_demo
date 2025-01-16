import { cart ,removeFromCart,cartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


renderCartQuantity(cartQuantity);
renderView(cart);
function renderCartQuantity(cartQuantity) {
    document.querySelector('.js-check-quantity').innerHTML = `${cartQuantity} items`;
    document.querySelector('.js-payment-items').innerHTML = ` Items (${cartQuantity})`;

}
function renderView(cart) {
    let cartItemsSectionHTML = '';

    cart.forEach(cartItem => {
        const product = products.filter(item => item.id === cartItem.productId)[0];
        
        cartItemsSectionHTML += `<div class="cart-item-container js-cart-item-${cartItem.productId}">
                <div class="delivery-date">
                  Delivery date: Tuesday, June 21
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${product.image}">
    
                  <div class="cart-item-details">
                    <div class="product-name">
                    ${product.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(product.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link js-delete-quantity link-primary" data-product-id="${cartItem.productId}">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                      <input   type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                          Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                          Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`
      
    });
    
    
    document.querySelector(".js-order-summary").innerHTML = cartItemsSectionHTML;
}
document.querySelectorAll(".js-delete-quantity").forEach(
    (delBtn) => {
        delBtn.addEventListener('click', ()=>{
            const {productId} = delBtn.dataset;
            removeFromCart(productId);
            document.querySelector(`.js-cart-item-${productId}`).remove();
            renderCartQuantity(cartQuantity);
        })
    }
);