import { cart } from "../data/cart-class.js";
import { products , loadProdects} from "../data/products.js";
import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";


await loadProdects();
renderCartQuantity();
function renderCartQuantity(cartQuantity) {
  document.querySelector('.js-cart-q').innerHTML = `${cart.cartQuantity}`;
}
renderOrdersList();
function renderOrdersList() {
  let ordersHTML = '';


orders.forEach(order => {
    ordersHTML += `<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${renderOrderProducts(order.products,order.id)}
          </div>
        </div>`
  
});



document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
let addedTextTimeoutIds = {};

// Add event listner to all button
document.querySelectorAll(".js-buy-again").forEach((button) => {
    button.addEventListener('click',()=>{
        const {productId,quantity} = button.dataset;
        cart.addToCart(productId,Number(quantity));    
        renderCartQuantity();            
    })
})
}

function renderOrderProducts(orderProducts,orderId) {  
  var productsHTNL ='';
  orderProducts.forEach(productDetails => {
    const product = products.filter(item => item.id === productDetails.productId)[0]; 
    
    productsHTNL += `<div class="product-image-container">
              <img src="${product.image}"">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dayjs(productDetails.estimatedDeliveryTime
                ).format('MMMM D')}
              </div>
              <div class="product-quantity">
                Quantity: ${productDetails.quantity}
              </div>
              <button class="js-buy-again buy-again-button button-primary"
              data-product-id="${productDetails.productId}"
              data-quantity="${productDetails.quantity}"
              >
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${orderId}&productId=${productDetails.productId}&q=${cart.cartQuantity}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`;
  });
  return productsHTNL;
}

  