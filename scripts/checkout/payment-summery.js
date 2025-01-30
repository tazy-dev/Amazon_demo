import { cart } from "../../data/cart-class.js";
import { addOrder } from "../../data/orders.js";
import { deliveryOptions } from "../../data/delivery-options.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";


export function renderPaymentSummary() {
    let producstCost = 0;
    let shippingCost = 0;

    cart.cartItems.forEach(cartItem => {
         producstCost +=products.filter(item => item.id === cartItem.productId)[0].priceCents * cartItem.quantity;  
         shippingCost  += deliveryOptions[cartItem.deliveryOptionId - 1].priceCents;
    });
    const total = producstCost + shippingCost;
    const tax = total / 10;
    
    let paymentSectionHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-items">Items (${cart.cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(producstCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(total + tax)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
          `;
    document.querySelector(".js-payment-summary").innerHTML = paymentSectionHTML;
    document.querySelector(".js-place-order").addEventListener('click',async ()=>{
      // Using Backend 
      try {
        var response = await fetch("https://supersimplebackend.dev/orders",{
          method : "POST",
          headers : {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            cart : cart
          })
        })
        const order = await response.json();
        console.log(order);
        addOrder(order);
      } catch (error) {
        console.log(error);
      }
      localStorage.removeItem("cart")
      window.location.href ="orders.html";
      
    });


}