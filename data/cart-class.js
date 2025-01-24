class Cart {
  constructor(storageKey) {
    this.#localStorageKey = storageKey;
    this.#loadFromStorage();
    this.cartQuantity = this.getQuantity();
  }
  cartItems ;
  #localStorageKey ; // Make it private
  cartQuantity;

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    
  }

  #saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  getQuantity() {
    var quantity = 0;
    this.cartItems.forEach((cartItem) => {
      quantity += cartItem.quantity;
    });
    
    return quantity;
  }

  addToCart(productId, quantity) {
    let itemFound = false;
    this.cartItems.forEach((item) => {
      if (item.productId === productId) {
        item.quantity += quantity;
        itemFound = true;
      }
    });
    if (!itemFound) {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });
    }
    this.cartQuantity += quantity;
    this.#saveToStorage();
  }

  updateCartQunatity(productId, quantity) {
    this.cartItems.forEach((item) => {
      if (item.productId === productId) {
        this.cartQuantity -= item.quantity;

        item.quantity = quantity;
      }
    });

    this.cartQuantity += quantity;
    this.#saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter((cartItem) => {
      if (cartItem.productId !== productId) {
        return true;
      } else {
        this.cartQuantity -= cartItem.quantity;
        return false;
      }
    });

    this.#saveToStorage();
  }
  updateCartDeliveryOption(productId, deliveryOptionId) {
    this.cartItems.forEach((item) => {
      if (item.productId === productId) {
        item.deliveryOptionId = deliveryOptionId;
      }
    });
    this.this.#saveToStorage();
  }
}


const userCart = new Cart(
    'cart-oop'
)
const businessCart = new  Cart(
    'cart-business'
)
userCart.addToCart("15b6fc6f-327a-4ec4-896f-486349e85a3d",10);
businessCart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",10);
console.log(userCart);
console.log(businessCart);



