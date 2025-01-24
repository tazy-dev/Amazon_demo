function Cart(localStorageKey) {
    const cart = {
        cartItems : undefined ,
        cartQuantity: 0,
    
          loadFromStorage() {
            this.cartItems =  JSON.parse(localStorage.getItem(localStorageKey)) || [];
         },
    
          saveToStorage(cart) {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
         getQuantity() {
            var quantity = 0;
            this.cartItems.forEach(cartItem => {
                quantity += cartItem.quantity; 
            });
            return quantity;
        }
        ,
          addToCart(productId,quantity) {
            let itemFound = false;
                  this.cartItems.forEach(item => {
                      if (item.productId === productId) {
                          item.quantity+=quantity;;
                          itemFound = true;
                      }
                  });
                  if (!itemFound) {
                      this.cartItems.push({
                          productId  ,
                          quantity ,
                          deliveryOptionId : "1"
                      })
                     
                  }
                  this.cartQuantity+=quantity;
                  this.saveToStorage(this.cartItems);
          }
        
        , updateCartQunatity(productId,quantity) {
                  this.cartItems.forEach(item => {
                      if (item.productId === productId) {
                        this.cartQuantity-=item.quantity;
        
                          item.quantity=quantity;;
                      }
                  });
        
                  this.cartQuantity+=quantity;
                  this.saveToStorage(this.cartItems);
          }
        
          , removeFromCart(productId) { 
            this.cartItems = this.cartItems.filter(cartItem=> {
                if (cartItem.productId !== productId) {
                    return true;
                } else {
                    this.cartQuantity-=cartItem.quantity;            
                    return false;
                }
            });
        
            this.saveToStorage(this.cartItems);
          }
          , updateCartDeliveryOption(productId,deliveryOptionId) {
            this.cartItems.forEach(item => {
                if (item.productId === productId) {
        
                    item.deliveryOptionId=deliveryOptionId;;
                }
            });
            this.this.saveToStorage(this.cartItems);
        }
          
    };
    return cart;
}

const userCart = Cart(
    'cart-opp'
)
const businessCart = Cart(
    'cart-business'
)


userCart.loadFromStorage();
businessCart.loadFromStorage();
userCart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d",10);
businessCart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",10);
console.log(userCart);
console.log(businessCart);



