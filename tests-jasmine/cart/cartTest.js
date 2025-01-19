import { addToCart,cart,cartQuantity,loadFromStorage } from "../../data/cart.js";
describe("Test Suite : Add To Cart", ()=>{
    it("adds an existing product to the cart",()=>{
       // Mocking
        // Get  Cart With One Element
        spyOn(localStorage, 'getItem').and.callFake(()=> {
            return JSON.stringify([{
                productId: "04701903-bc79-49c6-bc11-1af7e3651358",
                quantity: 1,
                deliveryOptionId: "1"
            }]);
        });
        // Dont Save to Cart
        spyOn(localStorage, 'setItem');
        // Set New Cart
        loadFromStorage();
        
        let oldQuantity = cartQuantity;
        addToCart("04701903-bc79-49c6-bc11-1af7e3651358",1);
        expect(cartQuantity).toBeGreaterThan(oldQuantity);
    });
    
    it("adds a new product to the cart",()=>{
        // Mocking
        // Get Empty Cart
        spyOn(localStorage, 'getItem').and.callFake(()=> {
            return JSON.stringify([]);
        });
        // Dont Save to Cart
        spyOn(localStorage, 'setItem');
        // Set Cart to Empty
        loadFromStorage();
        
        addToCart("aad29d11-ea98-41ee-9285-b916638cac4a",1);
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
    
})

