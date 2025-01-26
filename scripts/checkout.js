
import { renderOrderSummary } from "./checkout/order-summery.js";
import { renderPaymentSummary } from "./checkout/payment-summery.js"
import { loadProjects} from "../data/products.js";

// import '../data/cart-class.js'

//import '../data/backend-practice.js'

// Practice Promises
// It Creates a Seperate line of excution
 new Promise((resolve)=>{
    console.log("Start");
    loadProjects(()=>{
        console.log("Finished Loading");
        resolve("Rendering Layout");
    })
 }).then((value)=>{
    console.log(value);
    renderOrderSummary(); 
    renderPaymentSummary();
 })
// loadProjects(()=>{
//     renderOrderSummary();

//     renderPaymentSummary();
// })

