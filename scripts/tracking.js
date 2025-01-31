import { products , loadProdects} from "../data/products.js";
import { orders } from "../data/orders.js";

var url = new URL(window.location.href);
await loadProdects();
renderCartQuantity();
function renderCartQuantity(cartQuantity) {
  document.querySelector('.js-cart-q').innerHTML = url.searchParams.get('q');
}
renderTracking();


function renderTracking() {
  var productId = url.searchParams.get('productId');
  const product = products.filter(item => item.id ===productId )[0]; 
  const order = orders.filter(item => item.id === url.searchParams.get('orderId'))[0]; 
  const orderDetails = order.products.filter(item => item.productId === productId)[0]; 

  const today = dayjs();
  const deliverDay = dayjs(orderDetails.estimatedDeliveryTime);
  const orderday = dayjs(order.orderTime);
  
  const deliverPercentage = Math.round(today.diff(orderday, 'days') / deliverDay.diff(orderday, 'days') * 100);
  
  
  let trackHTML = `
  <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(deliverDay).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${orderDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${deliverPercentage < 50 ?"current-status":"" }">
            Preparing
          </div>
          <div class="progress-label ${(deliverPercentage >= 50 && deliverPercentage < 100) ?"current-status":"" }">
            Shipped
          </div>
          <div class="progress-label" ${deliverPercentage >= 100 ?"current-status":"" }">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${deliverPercentage}%"></div>
        </div>
  `;

document.querySelector(".js-track").innerHTML = trackHTML;

}

  