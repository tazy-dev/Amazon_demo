import { cart ,removeFromCart,cartQuantity,updateCartQunatity,updateCartDeliveryOption } from "../../data/cart.js";
import deliveryOptions from "../../data/delivery-options.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { renderPaymentSummary } from "./payment-summery.js"


const today = dayjs()

function renderCartQuantity(cartQuantity) {
    document.querySelector('.js-check-quantity').innerHTML = `${cartQuantity} items`;
}
export function renderOrderSummary() {
  renderCartQuantity(cartQuantity);
    let cartItemsSectionHTML = '';
    cart.forEach(cartItem => {
        const product = products.filter(item => item.id === cartItem.productId)[0];  
        const deliveryDay = calculateDeliverydate(cartItem.deliveryOptionId);

        cartItemsSectionHTML += `<div class="cart-item-container js-cart-item-${cartItem.productId}">
                <div class="delivery-date">
                  Delivery date: ${ deliveryDay}
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
                    ${renderDeliverySection(cartItem)}
                  </div>
                </div>
                <span class="update-error js-update-error-${cartItem.productId}" >
                        Invalid Quantity : Must be between 1 and 1000
                      </span>
              </div>`
      
    });
    
    
    document.querySelector(".js-order-summary").innerHTML = cartItemsSectionHTML;

function renderDeliverySection(cartItem) {
  let deliverySectionHtml = '';
  deliveryOptions.forEach(option => {
    const deliveryDay = today.add(option.deliveryDays,'days');
    const price = option.priceCents === 0 ?
    'Free Shipping':`$${formatCurrency(option.priceCents)} Shipping`
    ;
    const checked  = option.id === cartItem.deliveryOptionId ? "checked":'';
    deliverySectionHtml += `
    <div class="delivery-option js-delivery-option" data-product-id="${cartItem.productId}" data-option-id="${option.id}">
                      <input   type="radio" ${checked} class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                        ${deliveryDay.format('dddd, MMMM D')}
                        </div>
                        <div class="delivery-option-price">
                          ${price}
                        </div>
                      </div>
                    </div>
                    
    `
    
  });
  return deliverySectionHtml;
  
}
function validateUpdate(productId,newQuantity) {
  if (newQuantity > 0 && newQuantity <= 1000) {
    updateCartQunatity(productId,newQuantity)
    document.querySelector(`.js-cart-item-${productId}`).classList.remove("is-editing-quantity")
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    document.querySelector(`.js-update-error-${productId}`).classList.remove('show-error');
    renderPaymentSummary();
    renderOrderSummary();
  } else {
    document.querySelector(`.js-update-error-${productId}`).classList.add('show-error');
  }
}
document.querySelectorAll(".js-delete-quantity").forEach(
    (delBtn) => {
        delBtn.addEventListener('click', ()=>{
            const {productId} = delBtn.dataset;
            removeFromCart(productId);
            renderPaymentSummary();
            renderOrderSummary();
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
function calculateDeliverydate(deliveryOptionid) {  
  var daysCount  =deliveryOptions[deliveryOptionid - 1].deliveryDays;
  var deliverDay = today.add(daysCount, 'days')
  return  deliverDay.format('dddd, MMMM D');
}
document.querySelectorAll(".js-delivery-option").forEach(
  (deliveryOpt) => {
    deliveryOpt.addEventListener('click', ()=>{
          const {productId,optionId} = deliveryOpt.dataset;
          updateCartDeliveryOption(productId,optionId);
          renderPaymentSummary();
          renderOrderSummary();

      });
      
  }
);
}

