export let cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity : 1
      },
      {
        productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        quantity : 2

      },
      {
        productId: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
        quantity : 3

      },
];
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

  export function removeFromCart(productId) { 
    cart = cart.filter(cartItem=> cartItem.productId !== productId);
  }
  