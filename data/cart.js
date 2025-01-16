const cart = [];
let cartQuantity = 0;
export function addToCart(productId,quantity) {
    let itemFound = false;
          cart.forEach(item => {
              if (item.productId === productId) {
                  item.quantity+=quantity;;
                  itemFound = true;
              }
          });
          if (!itemFound) {
              cart.push({
                  productId  ,
                  quantity 
              })
             
          }
          cartQuantity+=quantity;
          document.getElementById('cart-quantity').innerHTML = cartQuantity;

  }
  