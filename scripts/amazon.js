
let productsHTML = '';
let cartQuantity = 0;

products.forEach(product => {
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents /100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
  
});
document.querySelector(".js-product-grid").innerHTML = productsHTML;
let addedTextTimeoutIds = {};

// Add event listner to all button
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener('click',()=>{
        const {productId} = button.dataset
        quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        let itemFound = false;
        cart.forEach(item => {
            if (item.productId === productId) {
                item.quantity+=quantity;;
                cartQuantity+=quantity;
                itemFound = true;
            }
        });
        if (!itemFound) {
            cart.push({
                productId  ,
                quantity 
            })
            cartQuantity+=quantity;
        }
        document.getElementById('cart-quantity').innerHTML = cartQuantity;
        const addedTextElement = document.querySelector(`.js-added-${productId}`);
        addedTextElement.classList.add('added');
        if (addedTextTimeoutIds[productId]) {
          
          clearTimeout(addedTextTimeoutIds[productId])
        } 
        addedTextTimeoutIds[productId] = setTimeout(() => {
          addedTextElement.classList.remove('added');
          delete addedTextTimeoutIds[productId];
        }, 2000);
        
    })
})



  