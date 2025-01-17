import { cart ,removeFromCart,cartQuantity,updateCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const today = dayjs()
const deliveryDate = today.add(7,'days');
console.log(today,deliveryDate );
console.log(today.format('dddd, MMMM D') );
console.log(deliveryDate.format('dddd, MMMM D') );

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
                        Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
                      </span>
                     
                      <span class="update-quantity-link js-update-quantity link-primary" data-product-id="${cartItem.productId}">
                        Update
                      </span>
                       <input type="number" class="input-quantity js-input-quantity-${cartItem.productId}">
                      <span class="save-quantity-link js-save-quantity link-primary" data-product-id="${cartItem.productId}">
                        Save
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
                <span class="update-error js-update-error-${cartItem.productId}" >
                        Invalid Quantity : Must be between 1 and 1000
                      </span>
              </div>`
      
    });
    
    
    document.querySelector(".js-order-summary").innerHTML = cartItemsSectionHTML;
}
function validateUpdate(productId,newQuantity) {
  if (newQuantity > 0 && newQuantity <= 1000) {
    updateCart(productId,newQuantity)
    document.querySelector(`.js-cart-item-${productId}`).classList.remove("is-editing-quantity")
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    document.querySelector(`.js-update-error-${productId}`).classList.remove('show-error');
    renderCartQuantity(cartQuantity);
  } else {
    document.querySelector(`.js-update-error-${productId}`).classList.add('show-error');
  }
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
document.querySelectorAll(".js-update-quantity").forEach(
  (updateBtn) => {
    updateBtn.addEventListener('click', ()=>{
          const {productId} = updateBtn.dataset;
          document.querySelector(`.js-cart-item-${productId}`).classList.add("is-editing-quantity")
                })
  }
);
document.querySelectorAll(".js-save-quantity").forEach(
  (saveBtn) => {
    saveBtn.addEventListener('click', ()=>{
          const {productId} = saveBtn.dataset;
          const newQuantity =  Number(document.querySelector(`.js-input-quantity-${productId}`).value);
          validateUpdate(productId,newQuantity);
      });

  }
);


