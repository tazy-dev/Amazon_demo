export let cart = JSON.parse(localStorage.getItem('cart')) || [];
export let cartQuantity = getQuantity();


function saveToStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function getQuantity() {
    var quantity = 0;
    cart.forEach(cartItem => {
        quantity += cartItem.quantity; 
    });
    return quantity;
}

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
          saveToStorage(cart);
  }

  export function removeFromCart(productId) { 
    cart = cart.filter(cartItem=> {
        if (cartItem.productId !== productId) {
            return true;
        } else {
            cartQuantity-=cartItem.quantity;            
            return false;
        }
    });

    saveToStorage(cart);
  }
  